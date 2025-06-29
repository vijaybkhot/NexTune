import { ObjectId } from "mongodb";

import {
  artists as artistsCollection,
  albums as albumCollection,
  recordcompanies as recordcompaniesCollection,
  songs as songsCollection,
} from "../config/mongoCollections.js";

import {
  deleteDocumentsFromCache,
  addDocumentToCache,
  deleteDocumentsFromCacheWithPrefix,
  getDocumentFromCache,
  addDocumentToFullPageCache,
  getDocumentFromFullPageCache,
} from "../Utilities/Caching/redisFunctions.js";
import { isValidDate, validateDate } from "../Utilities/helpers.js";
import {
  invalidInputError,
  notFoundError,
  internalServerError,
} from "../Utilities/Errors/GQLErrors.js";

export const removeAlbum = async (_id, redisClient) => {
  const albums = await albumCollection();
  const companies = await recordcompaniesCollection();
  const artists = await artistsCollection();
  const songs = await songsCollection();

  try {
    _id = _id.trim();

    // Validate _id
    if (!_id || !ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid id ${_id}. The id should be a valid MongoDB ObjectId.`
      );
    }

    _id = new ObjectId(_id);

    // Check if album exists
    const existingAlbum = await albums.findOne({ _id });
    if (!existingAlbum) {
      throw notFoundError(`The album with given _id ${_id} does not exist.`);
    }

    // Delete album from database
    const deletedAlbum = await albums.findOneAndDelete({ _id });

    if (!deletedAlbum) {
      throw internalServerError("Failed to delete album");
    }

    // Remove the above album from respective artist and company collection
    const updatedArtist = await artists.findOneAndUpdate(
      { _id: existingAlbum.artistId },
      { $pull: { albums: _id } },
      { returnDocument: "after" }
    );

    const updatedCompany = await companies.findOneAndUpdate(
      { _id: existingAlbum.recordCompanyId },
      { $pull: { albums: _id } },
      { returnDocument: "after" }
    );

    ///////////////////////////////////////////////////////////////////
    // Remove all songs from this album

    if (Array.isArray(existingAlbum.songs) && existingAlbum.songs.length > 0) {
      const songsToDelete = existingAlbum.songs;
      // Delete songs from the database
      await songs.deleteMany({ _id: { $in: songsToDelete } });

      // Delete songs from cache
      for (const songId of songsToDelete) {
        await deleteDocumentsFromCache(
          [{ documentName: "song", _id: songId }],
          redisClient
        );
      }
    }
    ///////////////////////////////////////////////////////////////////
    // Delete all related cache:
    // Delete allArtists cache, artist ID cache, searchArtistByName cache,
    // Delete allCompanies cache, company Id cache, companyByFoundedYear cache
    // Delete allAlbums cache and Delete the album for albumId cache

    await deleteDocumentsFromCache(
      [
        { documentName: "artist", _id: deletedAlbum.artistId },
        { documentName: "allArtists", _id: "" },
        { documentName: "allCompanies", _id: "" },
        { documentName: "company", _id: deletedAlbum.recordCompanyId },
        { documentName: "allAlbums", _id: "" },
        { documentName: "allSongs", _id: "" },
        { documentName: "album", _id: deletedAlbum._id },
      ],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(
      "getArtistByArtistName",
      redisClient
    );

    await deleteDocumentsFromCacheWithPrefix(
      "companyByFoundedYear",
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix("songsByArtistId", redisClient);

    await deleteDocumentsFromCacheWithPrefix(
      `getSongsByAlbumId:${_id}`,
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(`searchSongByTitle`, redisClient);
    return deletedAlbum;
  } catch (error) {
    console.error("Error removing album:", error);
    throw error;
  }
};

export const editAlbum = async (_, args, context) => {
  const { redisClient } = context;
  const albums = await albumCollection();
  const artists = await artistsCollection();
  const companies = await recordcompaniesCollection();

  try {
    let { _id, title, releaseDate, genre, artistId, companyId } = args;

    // Validate _id
    if (!_id || typeof _id !== "string") {
      throw invalidInputError("Invalid ID. ID must be a non-empty string.");
    }

    _id = _id.trim();
    if (!ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid ID ${_id}. The ID should be a valid MongoDB ObjectId.`
      );
    }

    _id = new ObjectId(_id);

    // Check if company exists
    const existingAlbum = await albums.findOne({ _id });
    if (!existingAlbum) {
      throw notFoundError(
        `The album with the given ID ${_id} does not exist. Cannot edit.`
      );
    }

    let updateObject = {};

    // Validate and update title
    if (title) {
      title = title.trim();
      if (title === "")
        throw invalidInputError(
          "Album Title should be a string and not just blank spaces."
        );
      if (title !== existingAlbum.title) {
        updateObject.title = title;
      }
    }

    if (releaseDate) {
      // Validate releaseDate
      if (releaseDate === "")
        throw invalidInputError("releaseDate cannot be empty blank spaces");
      if (!isValidDate(releaseDate))
        throw invalidInputError(
          "releaseDate should be a valid date in the format MM/DD/YYYY"
        );

      if (!validateDate(releaseDate))
        throw invalidInputError(
          "Invalid date. The releaseDate should not be greater than today's date."
        );

      if (releaseDate !== existingAlbum.releaseDate) {
        updateObject.releaseDate = releaseDate;
      }
    }

    if (artistId) {
      // Validate artistId
      artistId = artistId.trim();
      if (!artistId || !ObjectId.isValid(artistId)) {
        throw invalidInputError(
          `Invalid id ${artistId}. The id should be a valid MongoDB ObjectId.`
        );
      }
      artistId = new ObjectId(artistId);
      // Check if the artistId corresponds to any artist in the database:
      const artist = await artists.findOne({ _id: artistId });
      if (!artist) {
        throw notFoundError(
          `The artist with the input artistId does not exist.`
        );
      }
      if (
        existingAlbum.artistId &&
        artistId.toString() !== existingAlbum.artistId.toString()
      ) {
        updateObject.artistId = artistId;
      }
    }

    if (companyId) {
      // Validate companyId
      companyId = companyId.trim();
      if (!companyId || !ObjectId.isValid(companyId)) {
        throw invalidInputError(
          `Invalid id ${companyId}. The id should be a valid MongoDB ObjectId.`
        );
      }
      companyId = new ObjectId(companyId);
      // Check if the companyId corresponds to any artist in the database:
      const company = await companies.findOne({ _id: companyId });
      if (!company) {
        throw notFoundError(
          `The company with the input companyId does not exist.`
        );
      }
      if (companyId.toString() !== existingAlbum.recordCompanyId.toString()) {
        updateObject.recordCompanyId = companyId;
      }
    }

    if (genre) {
      genre = genre.trim();
      if (genre !== existingAlbum.genre) {
        updateObject.genre = genre;
      }
    }

    // Check if anything to update
    if (Object.keys(updateObject).length === 0) {
      throw invalidInputError(
        "Cannot update. Please provide at least one updated value."
      );
    }

    // Update company in the database
    const updatedAlbum = await albums.findOneAndUpdate(
      { _id },
      { $set: updateObject },
      { returnDocument: "after" }
    );

    if (!updatedAlbum) {
      throw internalServerError("Failed to edit album.");
    }

    // Update affected artists and compnay
    if (
      existingAlbum.artistId.toString() !== updatedAlbum.artistId.toString()
    ) {
      // Remove album from existingAlbum.artistId
      const updatedArtistRemoveAlbum = await artists.findOneAndUpdate(
        { _id: existingAlbum.artistId },
        { $pull: { albums: _id } },
        { returnDocument: "after" }
      );
      // Add Album to updatedAlbum.artistId.
      const updatedArtistAddAlbum = await artists.findOneAndUpdate(
        { _id: updatedAlbum.artistId },
        { $push: { albums: _id } },
        { returnDocument: "after" }
      );

      // Remove affected documents from cache
      await deleteDocumentsFromCache(
        [
          { documentName: "allArtists", _id: "" },
          { documentName: "artist", _id: updatedAlbum.artistId },
          { documentName: "artist", _id: existingAlbum.artistId },
        ],
        redisClient
      );
    }

    if (
      existingAlbum.recordCompanyId.toString() !==
      updatedAlbum.recordCompanyId.toString()
    ) {
      // Remove album from existingAlbum.artistId
      const updatedCompanyRemoveAlbum = await companies.findOneAndUpdate(
        { _id: existingAlbum.recordCompanyId },
        { $pull: { albums: _id } },
        { returnDocument: "after" }
      );
      // Add Album to updatedAlbum.artistId.
      const updatedCompanyAddAlbum = await companies.findOneAndUpdate(
        { _id: updatedAlbum.recordCompanyId },
        { $push: { albums: _id } },
        { returnDocument: "after" }
      );
      // Remove affected documents from cache
      await deleteDocumentsFromCache(
        [
          { documentName: "allCompanies", _id: "" },
          { documentName: "company", _id: updatedAlbum.recordCompanyId },
          { documentName: "company", _id: existingAlbum.recordCompanyId },
        ],
        redisClient
      );
    }
    // Delete all related cache:
    // Delete allAlbums cache and Delete the album for albumId cache

    await deleteDocumentsFromCache(
      [
        { documentName: "allAlbums", _id: "" },
        { documentName: "album", _id: updatedAlbum._id },
      ],
      redisClient
    );

    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix("songsByArtistId", redisClient);

    // Add updated album to cache
    await addDocumentToCache(
      "album",
      updatedAlbum._id,
      updatedAlbum,
      redisClient,
      null
    );

    return updatedAlbum;
  } catch (error) {
    console.error("Error editing album:", error);
    throw error;
  }
};

export const addAlbum = async (_, args, context) => {
  const { redisClient } = context;
  try {
    // Get all collections
    const albums = await albumCollection();
    const artists = await artistsCollection();
    const companies = await recordcompaniesCollection();

    let { title, releaseDate, genre, artistId, companyId } = args;
    title = title.trim();
    releaseDate = releaseDate.trim();

    // Validate title
    if (title === "")
      throw invalidInputError(
        "Album Title should be a string and not just blank spaces."
      );

    // Validate releaseDate
    if (releaseDate === "")
      throw invalidInputError("releaseDate cannot be empty blank spaces");
    if (!isValidDate(releaseDate))
      throw invalidInputError(
        "releaseDate should be a valid date in the format MM/DD/YYYY"
      );

    if (!validateDate(releaseDate))
      throw invalidInputError(
        "Invalid date. The releaseDate should not be greater than today's date."
      );

    // Validate artistId
    artistId = artistId.trim();
    if (!artistId || !ObjectId.isValid(artistId)) {
      throw invalidInputError(
        `Invalid id ${artistId}. The id should be a valid MongoDB ObjectId.`
      );
    }
    artistId = new ObjectId(artistId);
    // Check if the artistId corresponds to any artist in the database:
    const artist = await artists.findOne({ _id: artistId });
    if (!artist) {
      throw notFoundError(`The artist with the input artistId does not exist.`);
    }

    // Validate companyId
    companyId = companyId.trim();
    if (!companyId || !ObjectId.isValid(companyId)) {
      throw invalidInputError(
        `Invalid id ${companyId}. The id should be a valid MongoDB ObjectId.`
      );
    }
    companyId = new ObjectId(companyId);
    // Check if the companyId corresponds to any artist in the database:
    const company = await companies.findOne({ _id: companyId });
    if (!company) {
      throw notFoundError(
        `The company with the input companyId does not exist.`
      );
    }

    const newAlbum = {
      _id: new ObjectId(),
      title,
      releaseDate,
      genre,
      songs: [],
      artistId: artistId,
      recordCompanyId: companyId,
    };

    let insertAlbum = await albums.insertOne(newAlbum);

    if (!insertAlbum.acknowledged) {
      throw internalServerError(`Could not Add Album ${title}`);
    }

    const albumId = insertAlbum.insertedId;
    // Add album to the albums array in the respective artist and record company
    const updatedArtist = await artists.findOneAndUpdate(
      { _id: artistId },
      { $push: { albums: albumId } },
      { returnDocument: "after" }
    );

    const updatedCompany = await companies.findOneAndUpdate(
      { _id: companyId },
      { $push: { albums: albumId } },
      { returnDocument: "after" }
    );

    if (!updatedArtist || !updatedCompany) {
      throw new Error("Failed to update artist or company with new album");
    }

    // Delete all related cache:
    // Delete allArtists cache, artist ID cache, searchArtistByName cache,
    // Delete allCompanies cache, company Id cache, companyByFoundedYear cache
    // Delete allAlbums cache

    await deleteDocumentsFromCache(
      [
        { documentName: "artist", _id: artistId },
        { documentName: "allArtists", _id: "" },
        { documentName: "allCompanies", _id: "" },
        { documentName: "company", _id: companyId },
        { documentName: "allAlbums", _id: "" },
      ],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(
      "getArtistByArtistName",
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(
      "companyByFoundedYear",
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix(
      `songsByArtistId:${artistId}`,
      redisClient
    );

    // Add new album query to cache
    await addDocumentToCache(
      "album",
      insertAlbum.insertedId,
      newAlbum,
      redisClient,
      null
    );
    // return new album
    return newAlbum;
  } catch (error) {
    throw error;
  }
};

export const getAllAlbums = async (_, args, context) => {
  const { redisClient } = context;
  try {
    // Check if document is cached
    const cachedDocs = await getDocumentFromCache("allAlbums", "", redisClient);
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const albums = await albumCollection();
    const allAlbums = await albums.find({}).toArray();

    if (!allAlbums) {
      throw notFoundError("No albums in database.");
    }
    // Add all artits query to cache
    await addDocumentToCache("allAlbums", "", allAlbums, redisClient, 3600);
    return allAlbums;
  } catch (error) {
    throw error;
  }
};

export const getOneAlbum = async (_, args, context) => {
  const { redisClient } = context;
  let { _id } = args;

  try {
    _id = _id.trim();
    if (!_id || !ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid id ${_id}. The id should be a valid MongoDB ObjectId.`
      );
    }
    _id = new ObjectId(_id);

    // Check if document is cached
    const cachedDocs = await getDocumentFromCache("album", _id, redisClient);
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const albums = await albumCollection();
    const album = await albums.findOne({ _id });
    if (!album) {
      throw notFoundError(`Album with _id ${_id} not in database.`);
    }
    // Add album query to cache
    await addDocumentToCache("album", _id, album, redisClient, null);
    return album;
  } catch (error) {
    throw error;
  }
};

export const songsByArtistId = async (_, args, context) => {
  const { redisClient } = context;
  let { artistId } = args;
  try {
    artistId = artistId.trim();
    if (!artistId || !ObjectId.isValid(artistId)) {
      throw invalidInputError(
        `Invalid id ${artistId}. The id should be a valid MongoDB ObjectId.`
      );
    }
    artistId = new ObjectId(artistId);

    // Check if document is cached
    const cachedDocs = await getDocumentFromFullPageCache(
      `songsByArtistId:${artistId}`,
      redisClient
    );
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }

    // Get all songs from all albums for the given atristId
    const albums = await albumCollection();
    const songIds = (
      await albums
        .aggregate([
          { $match: { artistId: new ObjectId(artistId) } },
          { $unwind: "$songs" },
          { $project: { _id: 0, songs: 1 } },
        ])
        .toArray()
    ).map((songObject) => songObject.songs);

    if (!songIds) {
      throw notFoundError(`No songs for artist with _id ${_id} in database.`);
    }
    const songs = await songsCollection();
    const songsByArtist = await songs.find({ _id: { $in: songIds } }).toArray();
    // Add songs query to list cache
    await addDocumentToFullPageCache(
      `songsByArtistId:${artistId}`,
      songsByArtist,
      redisClient,
      3600
    );
    return songsByArtist;
  } catch (error) {
    throw error;
  }
};

export const getAlbumsByGenre = async (_, args, context) => {
  const { redisClient } = context;
  let { genre } = args;
  try {
    genre = genre.trim();
    if (genre === "")
      throw invalidInputError(
        "The genre to seach albums cannot be blank or just blank spaces."
      );
    // Check if document is cached
    const cachedDocs = await getDocumentFromFullPageCache(
      `getAlbumsByGenre:${genre}`,
      redisClient
    );
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }

    // Get all songs from all albums for the given atristId
    const albums = await albumCollection();
    const albumsByGenre = await albums
      .find({ genre: { $regex: new RegExp(`^${genre}$`, "i") } })
      .toArray();

    if (!albumsByGenre) {
      throw notFoundError(`No albums for given genre ${genre} in database.`);
    }
    // Add songs query to list cache
    await addDocumentToFullPageCache(
      `getAlbumsByGenre:${genre}`,
      albumsByGenre,
      redisClient,
      3600
    );
    return albumsByGenre;
  } catch (error) {
    throw error;
  }
};
