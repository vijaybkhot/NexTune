import { ObjectId } from "mongodb";
import {
  artists as artistsCollection,
  albums as albumCollection,
  recordcompanies as recordcompaniesCollection,
  songs as songsCollection,
} from "../Config/mongoCollections.js";
import {
  deleteDocumentsFromCache,
  addDocumentToCache,
  deleteDocumentsFromCacheWithPrefix,
  getDocumentFromCache,
  addDocumentToFullPageCache,
  getDocumentFromFullPageCache,
} from "../Utilities/Caching/redisFunctions.js";
import {
  invalidInputError,
  notFoundError,
  internalServerError,
} from "../Utilities/Errors/GQLErrors.js";
import { isValidDuration } from "../Utilities/helpers.js";

export const addNewSong = async (_, args, context) => {
  const { redisClient } = context;
  try {
    // Get all collections
    const songs = await songsCollection();
    const albums = await albumCollection();
    const artists = await artistsCollection();
    const companies = await recordcompaniesCollection();

    let { title, duration, albumId } = args;

    // Validate input types
    if (
      typeof title !== "string" ||
      typeof duration !== "string" ||
      typeof albumId !== "string"
    ) {
      throw invalidInputError("Title, duration, and albumId must be strings.");
    }

    title = title.trim();
    duration = duration.trim();
    albumId = albumId.trim();

    // Validate title
    if (title === "") {
      throw invalidInputError("Song Title should be a non-empty string.");
    }

    // Validate duration
    if (duration === "") {
      throw invalidInputError("Duration cannot be empty or just blank spaces.");
    }
    if (!isValidDuration(duration)) {
      throw invalidInputError("Duration should be in a valid MM:SS format.");
    }

    // Validate albumId
    if (!albumId || !ObjectId.isValid(albumId)) {
      throw invalidInputError(
        `Invalid id ${albumId}. The albumId should be a valid MongoDB ObjectId.`
      );
    }
    albumId = new ObjectId(albumId);

    // Check if the albumId corresponds to any album in the database:
    const album = await albums.findOne({ _id: albumId });
    if (!album) {
      throw notFoundError(`The album with the given albumId does not exist.`);
    }

    const newSong = {
      _id: new ObjectId(),
      title,
      duration,
      albumId,
    };

    const insertSong = await songs.insertOne(newSong);

    if (!insertSong.insertedId) {
      throw internalServerError(`Could not add song: ${title}`);
    }

    const songId = insertSong.insertedId;

    // Add song to the songs array in the respective album
    const updatedAlbum = await albums.findOneAndUpdate(
      { _id: albumId },
      { $push: { songs: songId } },
      { returnDocument: "after" }
    );

    if (!updatedAlbum) {
      throw internalServerError("Failed to update album with the new song.");
    }

    // Delete all related cache
    await deleteDocumentsFromCache(
      [
        { documentName: "album", _id: albumId },
        { documentName: "allAlbums", _id: "" },
      ],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix("getSongsByAlbumId", redisClient);
    await deleteDocumentsFromCacheWithPrefix("searchSongByTitle", redisClient);
    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix("songsByArtistId", redisClient);

    // Add new song query to cache
    await addDocumentToCache("song", songId, newSong, redisClient, null);

    // Return new song
    return newSong;
  } catch (error) {
    console.error("Error adding new song:", error);
    throw error;
  }
};

export const updateSong = async (_, args, context) => {
  const { redisClient } = context;
  const songs = await songsCollection();
  const albums = await albumCollection();
  const artists = await artistsCollection();
  const companies = await recordcompaniesCollection();

  try {
    let { _id, title, duration, albumId } = args;

    // Validate _id
    if (!_id || typeof _id !== "string") {
      throw invalidInputError("Invalid ID. ID must be a non-empty string.");
    }

    _id = _id.trim();
    if (!ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid ID ${_id}. The song ID should be a valid MongoDB ObjectId.`
      );
    }

    _id = new ObjectId(_id);

    // Check if song exists
    const existingSong = await songs.findOne({ _id });
    if (!existingSong) {
      throw notFoundError(
        `The song with the given ID ${_id} does not exist. Cannot edit.`
      );
    }

    let updateObject = {};

    // Validate and update title
    if (title) {
      title = title.trim();
      if (title === "")
        throw invalidInputError(
          "Song Title should be a string and not just blank spaces."
        );
      if (title !== existingSong.title) {
        updateObject.title = title;
      }
    }

    // Validate and update duration
    if (duration) {
      duration = duration.trim();
      if (duration === "")
        throw invalidInputError("Duration cannot be empty blank spaces.");
      if (!isValidDuration(duration))
        throw invalidInputError(
          "Duration should be in valid duration format MM:SS."
        );
      if (duration !== existingSong.duration) {
        updateObject.duration = duration;
      }
    }

    // Validate and update albumId
    if (albumId) {
      albumId = albumId.trim();
      if (!ObjectId.isValid(albumId)) {
        throw invalidInputError(
          `Invalid ID ${albumId}. The albumId should be a valid MongoDB ObjectId.`
        );
      }
      albumId = new ObjectId(albumId);

      // Check if album exists
      const album = await albums.findOne({ _id: albumId });
      if (!album) {
        throw notFoundError(`The album with the given albumId does not exist.`);
      }

      if (
        existingSong.albumId &&
        albumId.toString() !== existingSong.albumId.toString()
      ) {
        updateObject.albumId = albumId;
      }
    }

    // Check if there are updates
    if (Object.keys(updateObject).length === 0) {
      throw invalidInputError(
        "Cannot update. Please provide at least one updated value."
      );
    }

    // Update song in the database
    const updatedSong = await songs.findOneAndUpdate(
      { _id },
      { $set: updateObject },
      { returnDocument: "after" }
    );

    if (!updatedSong) {
      throw internalServerError("Failed to edit song.");
    }

    // Remove the song from the original album if albumId has changed
    if (
      existingSong.albumId &&
      updatedSong.albumId &&
      existingSong.albumId.toString() !== updatedSong.albumId.toString()
    ) {
      // Remove song from the old album
      await albums.findOneAndUpdate(
        { _id: existingSong.albumId },
        { $pull: { songs: _id } },
        { returnDocument: "after" }
      );

      // Add song to the new album
      await albums.findOneAndUpdate(
        { _id: updatedSong.albumId },
        { $push: { songs: _id } },
        { returnDocument: "after" }
      );

      // Remove affected documents from cache
      await deleteDocumentsFromCache(
        [
          { documentName: "allAlbums", _id: "" },
          { documentName: "album", _id: updatedSong.albumId },
          { documentName: "album", _id: existingSong.albumId },
        ],
        redisClient
      );
    }

    // Delete all related cache
    await deleteDocumentsFromCache(
      [{ documentName: "song", _id: updatedSong._id }],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix("getSongsByAlbumId", redisClient);
    await deleteDocumentsFromCacheWithPrefix("searchSongByTitle", redisClient);
    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix("songsByArtistId", redisClient);

    // Add updated song to cache
    await addDocumentToCache("song", _id, updatedSong, redisClient, null);

    return updatedSong;
  } catch (error) {
    console.error("Error editing song:", error);
    throw error;
  }
};

export const deleteSong = async (_, args, context) => {
  const { redisClient } = context; // Extract redisClient from context
  const songs = await songsCollection();
  const albums = await albumCollection();
  const companies = await recordcompaniesCollection();
  const artists = await artistsCollection();

  let { _id } = args;

  try {
    // Validate _id before trimming
    if (!_id || typeof _id !== "string") {
      throw invalidInputError("Invalid ID. ID must be a non-empty string.");
    }

    _id = _id.trim();
    if (!ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid ID ${_id}. The songId should be a valid MongoDB ObjectId.`
      );
    }

    _id = new ObjectId(_id);

    // Check if song exists
    const existingSong = await songs.findOne({ _id });
    if (!existingSong) {
      throw notFoundError(`The song with given _id ${_id} does not exist.`);
    }

    // Delete song from database
    const deletedSong = await songs.findOneAndDelete({ _id });

    if (!deletedSong) {
      throw internalServerError("Failed to delete song.");
    }

    // Remove the above song from respective album document
    const updatedAlbum = await albums.findOneAndUpdate(
      { _id: existingSong.albumId }, // Use existingSong.albumId instead
      { $pull: { songs: _id } },
      { returnDocument: "after" }
    );

    if (!updatedAlbum) {
      throw internalServerError(
        "Failed to delete song from the songs array of the album."
      );
    }

    // Delete all related cache:
    await deleteDocumentsFromCache(
      [
        { documentName: "song", _id: deletedSong._id },
        { documentName: "album", _id: existingSong.albumId }, // Use existingSong.albumId
        { documentName: "allAlbums", _id: "" },
      ],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix("getSongsByAlbumId", redisClient);
    await deleteDocumentsFromCacheWithPrefix("searchSongByTitle", redisClient);
    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix("songsByArtistId", redisClient);

    return deletedSong;
  } catch (error) {
    console.error("Error removing song:", error);
    throw error;
  }
};

export const getOneSong = async (_, args, context) => {
  const { redisClient } = context;
  let { _id } = args;
  console.log(_id);
  try {
    _id = _id.trim();
    if (!_id || !ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid id ${_id}. The songId should be a valid MongoDB ObjectId.`
      );
    }
    _id = new ObjectId(_id);

    // Check if document is cached
    const cachedDocs = await getDocumentFromCache("song", _id, redisClient);
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const songs = await songsCollection();
    const song = await songs.findOne({ _id });
    if (!song) {
      throw notFoundError(`Song with _id ${_id} not in database.`);
    }
    // Add song query to cache
    await addDocumentToCache("song", _id, song, redisClient, null);
    return song;
  } catch (error) {
    throw error;
  }
};

export const getSongsByAlbumId = async (_, args, context) => {
  const { redisClient } = context;
  let { _id } = args;
  const songs = await songsCollection();
  try {
    _id = _id.trim();
    if (!_id || !ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid id ${_id}. The songId should be a valid MongoDB ObjectId.`
      );
    }
    _id = new ObjectId(_id);

    // Check if document is cached
    const cachedDocs = await getDocumentFromFullPageCache(
      `getSongsByAlbumId:${_id}`,
      redisClient
    );
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }

    // Get all songs for the give albumId
    const albums = await albumCollection();
    const album = await albums.findOne({ _id });

    if (!album) {
      throw notFoundError(`No album for given albumId ${_id} in database.`);
    }

    const songIds = album.songs;

    const songsForAlbum = await songs.find({ _id: { $in: songIds } }).toArray();

    // Add songs query to list cache
    await addDocumentToFullPageCache(
      `getSongsByAlbumId:${_id}`,
      songsForAlbum,
      redisClient,
      3600
    );

    return songsForAlbum;
  } catch (error) {
    throw error;
  }
};

export const getSongByTitle = async (_, args, context) => {
  const { redisClient } = context;
  let { searchTitleTerm } = args;
  try {
    searchTitleTerm = searchTitleTerm.trim();
    if (searchTitleTerm === "") {
      throw invalidInputError("Search term cannot be empty blank spaces");
    }
    searchTitleTerm = searchTitleTerm.toLowerCase();

    // Check if document is cached
    const cachedDocs = await getDocumentFromFullPageCache(
      `searchSongByTitle:${searchTitleTerm}`,
      redisClient
    );
    if (cachedDocs) {
      return cachedDocs;
    }
    const songs = await songsCollection();
    const songsByTitle = await songs
      .find({ title: { $regex: searchTitleTerm, $options: "i" } })
      .toArray();
    if (!songsByTitle) {
      throw notFoundError(
        `No songs matching the  search term ${searchTitleTerm} in database.`
      );
    }
    // Add artist query to cache
    await addDocumentToFullPageCache(
      `searchSongByTitle:${searchTitleTerm}`,
      songsByTitle,
      redisClient,
      3600
    );
    return songsByTitle;
  } catch (error) {
    throw error;
  }
};
