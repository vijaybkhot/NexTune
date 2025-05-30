import { ObjectId } from "mongodb";

import {
  artists as artistsCollection,
  albums as albumCollection,
  recordcompanies as recordcompaniesCollection,
  songs as songsCollection,
} from "../Config/mongoCollections.js";

import {
  getDocumentFromCache,
  deleteDocumentsFromCache,
  addDocumentToCache,
  getDocumentFromFullPageCache,
  addDocumentToFullPageCache,
  deleteDocumentsFromCacheWithPrefix,
} from "../Utilities/Caching/redisFunctions.js";
import { isValidDate, validateDate } from "../Utilities/helpers.js";
import {
  invalidInputError,
  notFoundError,
  internalServerError,
  handleGraphQLError,
} from "../Utilities/Errors/GQLErrors.js";

export const getAllArtists = async (_, args, context) => {
  const { redisClient } = context;
  try {
    // Check if document is cached
    const cachedDocs = await getDocumentFromCache(
      "allArtists",
      "",
      redisClient
    );
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const artists = await artistsCollection();
    const allArtists = await artists.find({}).toArray();
    if (!allArtists) {
      throw notFoundError("No Artists in database.");
    }
    // Add all artits query to cache
    await addDocumentToCache("allArtists", "", allArtists, redisClient, 3600);
    return allArtists;
  } catch (error) {
    throw error;
  }
};

export const getOneArtist = async (_, args, context) => {
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
    const cachedDocs = await getDocumentFromCache("artist", _id, redisClient);
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const artists = await artistsCollection();
    const artist = await artists.findOne({ _id });
    if (!artist) {
      throw notFoundError(`Artist with _id ${_id} not in database.`);
    }
    // Add artist query to cache
    await addDocumentToCache("artist", _id, artist, redisClient, null);
    return artist;
  } catch (error) {
    throw error;
  }
};

export const getArtistByArtistName = async (_, args, context) => {
  const { redisClient } = context;
  let { searchTerm } = args;
  try {
    searchTerm = searchTerm.trim();
    if (searchTerm === "") {
      throw invalidInputError("Search term cannot be empty blank spaces");
    }
    searchTerm = searchTerm.toLowerCase();

    // Check if document is cached
    const cachedDocs = await getDocumentFromFullPageCache(
      `getArtistByArtistName:${searchTerm}`,
      redisClient
    );
    if (cachedDocs) {
      return cachedDocs;
    }
    const artists = await artistsCollection();
    const artistsBySearchTerm = await artists
      .find({ name: { $regex: searchTerm, $options: "i" } })
      .toArray();
    if (!artistsBySearchTerm) {
      throw notFoundError(
        `No artists matching the  search term ${searchTerm} in database.`
      );
    }
    // Add artist query to cache
    await addDocumentToFullPageCache(
      `getArtistByArtistName:${searchTerm}`,
      artistsBySearchTerm,
      redisClient,
      3600
    );
    return artistsBySearchTerm;
  } catch (error) {
    throw error;
  }
};

export const createNewArtist = async (_, args, context) => {
  const { redisClient } = context;
  try {
    const artists = await artistsCollection();
    let { name, date_formed, members } = args;
    name = name.trim();
    let dateFormed = date_formed.trim();
    // Validate name
    if (name === "")
      throw invalidInputError("Name cannot be empty blank spaces");

    // Validate dateFormed
    if (!isValidDate(dateFormed))
      throw invalidInputError(
        "Invalid date. The date_formed argument should be a valid date string in the format MM/DD/YYYY"
      );

    // Validate if date_formed is from the future
    if (!validateDate(dateFormed))
      throw invalidInputError(
        "Invalid date. The date_formed should not be greater than today's date."
      );

    // Validate members
    if (!Array.isArray(members) || members.length < 1)
      throw invalidInputError(
        "Invalid members: Members must be a non empty array."
      );
    for (let i in members) {
      members[i] = members[i].trim();
      if (members[i] === "" || !/^[A-Za-z]+$/.test(members[i])) {
        throw invalidInputError(
          "Each member should be a string containing only alphabets and not just blank spaces."
        );
      }
    }

    const newArtist = {
      _id: new ObjectId(),
      name,
      dateFormed,
      members,
      albums: [],
    };

    let insertArtist = await artists.insertOne(newArtist);
    if (!insertArtist.acknowledged || !insertArtist.insertedId) {
      throw internalServerError(`Could not Add Artist`);
    }

    // Manage cache
    await deleteDocumentsFromCache(
      [{ documentName: "allArtists", _id: "" }],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(
      "getArtistByArtistName",
      redisClient
    );
    await addDocumentToCache(
      "artist",
      insertArtist.insertedId,
      newArtist,
      redisClient,
      null
    );
    return newArtist;
  } catch (error) {
    handleGraphQLError(
      error,
      "Failed to create new artist. Please try again later."
    );
  }
};

export const updateArtist = async (_, args, context) => {
  const { redisClient } = context;
  const artists = await artistsCollection();
  try {
    let { _id, name, date_formed, members } = args;
    let dateFormed = date_formed;
    console.log("dateFormed", dateFormed);
    console.log(args);
    // Validate _id
    _id = _id.trim();
    if (!_id || !ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid id ${_id}. The id should be a valid MongoDB ObjectId.`
      );
    }

    _id = new ObjectId(_id);

    // Check if artist exists
    const existingArtist = await artists.findOne({ _id });
    if (!existingArtist) {
      throw notFoundError(`The artist with given _id ${_id} does not exist.`);
    }

    let updateObject = {};

    // Validate and update name
    if (name) {
      name = name.trim();
      if (name === "") {
        throw invalidInputError("Name cannot be empty or blank spaces");
      }
      if (name !== existingArtist.name) {
        updateObject.name = name;
      }
    }

    // Validate and update dateFormed
    if (dateFormed) {
      dateFormed = dateFormed.trim();
      if (dateFormed === "") {
        throw invalidInputError("dateFormed cannot be empty or blank spaces");
      }
      if (!isValidDate(dateFormed))
        throw invalidInputError(
          "Invalid date. The date_formed argument should be a valid date string in the format MM/DD/YYYY"
        );

      // Validate if date_formed is from the future
      if (!validateDate(dateFormed))
        throw invalidInputError(
          "Invalid date. The date_formed should not be greater than today's date."
        );

      if (dateFormed !== existingArtist.dateFormed) {
        updateObject.dateFormed = dateFormed;
      }
    }

    // Validate and update members
    if (members) {
      if (!Array.isArray(members) || members.length < 1) {
        throw invalidInputError("Members must be a non-empty array.");
      }

      members = members.map((member) => member.trim());

      for (let i in members) {
        members[i] = members[i].trim();
        if (members[i] === "" || !/^[A-Za-z]+$/.test(members[i])) {
          throw invalidInputError(
            "Each member should be a string containing only alphabets and not just blank spaces."
          );
        }
      }

      if (JSON.stringify(members) !== JSON.stringify(existingArtist.members)) {
        updateObject.members = members;
      }
    }

    // Check if  anything to update
    if (Object.keys(updateObject).length === 0) {
      throw invalidInputError(
        "Cannot update. Please provide at least one updated value to update artist."
      );
    }

    // Update artist in the database
    const updatedArtist = await artists.findOneAndUpdate(
      { _id },
      { $set: updateObject },
      { returnDocument: "after" }
    );

    if (!updatedArtist) {
      throw internalServerError("Failed to edit artist");
    }

    // Delete artist from cache
    await deleteDocumentsFromCacheWithPrefix(
      "getArtistByArtistName",
      redisClient
    );
    await deleteDocumentsFromCache(
      [
        { documentName: "artist", _id: updatedArtist._id },
        { documentName: "allArtists", _id: "" },
      ],
      redisClient
    );

    // Add the updated artist to cache
    await addDocumentToCache(
      "artist",
      updatedArtist._id,
      updatedArtist,
      redisClient,
      null
    );
    return updatedArtist;
  } catch (error) {
    throw error;
  }
};

export const deleteArtist = async (_, args, context) => {
  const { redisClient } = context;
  const companies = await recordcompaniesCollection();
  const albums = await albumCollection();
  const artists = await artistsCollection();
  const songs = await songsCollection();
  try {
    let { _id } = args;
    _id = _id.trim();
    // Validate _id
    if (!_id || !ObjectId.isValid(_id)) {
      throw invalidInputError(
        `Invalid id ${_id}. The id should be a valid MongoDB ObjectId.`
      );
    }

    _id = new ObjectId(_id);

    // Check if artist exists
    const existingArtist = await artists.findOne({ _id });
    if (!existingArtist) {
      throw notFoundError(`The artist with given _id ${_id} does not exist.`);
    }

    // Update artist in the database
    const deletedArtist = await artists.findOneAndDelete({ _id });
    ////////////////////////////////////////
    // Delete albums recorded by the artist

    if (!deletedArtist) {
      throw internalServerError("Failed to delete artist");
    }
    // Delete artist and related documents from cache
    ////////////////////////////////////////
    // Delete albums recorded by the artist, and all related documents also and delete cache for each album

    if (
      Array.isArray(deletedArtist.albums) &&
      deletedArtist.albums.length > 0
    ) {
      const albumIdsToDelete = deletedArtist.albums;

      const albumsToDelete = await albums
        .find({ _id: { $in: albumIdsToDelete } })
        .toArray();

      const songIdsToDelete = albumsToDelete.flatMap((album) => album.songs);

      // Delete songs related to these albums
      if (songIdsToDelete.length > 0) {
        await songs.deleteMany({ _id: { $in: songIdsToDelete } });

        // Delete songs from cache
        for (const songId of songIdsToDelete) {
          await deleteDocumentsFromCache(
            [{ documentName: "song", _id: songId }],
            redisClient
          );
        }
      }

      // Delete all albums
      const deletedAlbums = await albums.deleteMany({
        _id: { $in: albumIdsToDelete },
      });

      if (deletedAlbums.deletedCount > 0) {
        // Remove every deleted album from cache also
        for (const albumId of albumIdsToDelete) {
          await deleteDocumentsFromCache(
            [{ documentName: "album", _id: albumId }],
            redisClient
          );
        }

        // Delete these albums from all record companies
        const affectedCompanies = await companies
          .find({ albums: { $in: albumIdsToDelete } })
          .toArray();

        await companies.updateMany(
          { albums: { $in: albumIdsToDelete } },
          { $pull: { albums: { $in: albumIdsToDelete } } }
        );

        // Remove affected companies from cache
        for (const company of affectedCompanies) {
          await deleteDocumentsFromCache(
            [{ documentName: "recordCompany", _id: company._id }],
            redisClient
          );
        }
      }
    }

    await deleteDocumentsFromCacheWithPrefix(
      "getArtistByArtistName",
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(
      `songsByArtistId:${deletedArtist._id}`,
      redisClient
    );
    await deleteDocumentsFromCache(
      [
        { documentName: "artist", _id: deletedArtist._id },
        { documentName: "allArtists", _id: "" },
      ],
      redisClient
    );

    if (
      Array.isArray(deletedArtist.albums) &&
      deletedArtist.albums.length > 0
    ) {
      await deleteDocumentsFromCache(
        [{ documentName: "allAlbums", _id: "" }],
        redisClient
      );
      await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    }

    return deletedArtist;
  } catch (error) {
    throw error;
  }
};
