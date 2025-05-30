import { ObjectId } from "mongodb";
import {
  invalidInputError,
  notFoundError,
} from "../Utilities/Errors/GQLErrors.js";
import {
  getDocumentFromCache,
  addDocumentToCache,
  deleteDocumentsFromCache,
  deleteDocumentsFromCacheWithPrefix,
  addDocumentToFullPageCache,
  getDocumentFromFullPageCache,
} from "../Utilities/Caching/redisFunctions.js";
import { normalizeCountryName } from "../Utilities/helpers.js";
import {
  recordcompanies as recordcompaniesCollection,
  albums as albumCollection,
  artists as artistsCollection,
  songs as songsCollection,
} from "../Config/mongoCollections.js";

export const getAllRecordCompanies = async (_, args, context) => {
  const { redisClient } = context;
  try {
    // Check if document is cached
    const cachedDocs = await getDocumentFromCache(
      "allCompanies",
      "",
      redisClient
    );
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const companies = await recordcompaniesCollection();
    const allCompanies = await companies.find({}).toArray();
    if (!allCompanies) {
      throw notFoundError("No Record Companies in database.");
    }
    // Add all artits query to cache
    await addDocumentToCache(
      "allCompanies",
      "",
      allCompanies,
      redisClient,
      3600
    );
    return allCompanies;
  } catch (error) {
    throw error;
  }
};

export const filterCompaniesByFoundedYear = async (_, args, context) => {
  const { redisClient } = context;
  try {
    let { min, max } = args;
    if (min < 1900 || max > 2025 || max < min) {
      throw invalidInputError(
        "Invalid input: min and max should be numbers, min >= 1900, max <= 2025, and max >= min."
      );
    }
    // Check if document is cached
    const cachedDocs = await getDocumentFromFullPageCache(
      `companyByFoundedYear:${min}-${max}`,
      redisClient
    );
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const companies = await recordcompaniesCollection();
    const allCompanies = await companies
      .find({
        foundedYear: { $gte: min, $lte: max },
      })
      .toArray();
    if (!allCompanies) {
      throw notFoundError(
        "No Record Companies in database founded between the given years.."
      );
    }

    // Add all companies query to cache
    await addDocumentToFullPageCache(
      `companyByFoundedYear:${min}-${max}`,
      allCompanies,
      redisClient,
      3600
    );

    return allCompanies;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyById = async (_, args, context) => {
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
    const cachedDocs = await getDocumentFromCache("company", _id, redisClient);
    if (cachedDocs) {
      // return cached document
      return cachedDocs;
    }
    const companies = await recordcompaniesCollection();
    const company = await companies.findOne({ _id });
    if (!company) {
      throw notFoundError(`Company with _id ${_id} not in database.`);
    }
    // Add artist query to cache
    await addDocumentToCache("company", _id, company, redisClient, null);
    return company;
  } catch (error) {
    throw error;
  }
};

export const createNewCompany = async (_, args, context) => {
  const { redisClient } = context;
  try {
    const companies = await recordcompaniesCollection();
    let { name, founded_year, country } = args;
    let foundedYear = founded_year;
    name = name.trim();
    country = country.trim();

    // Validate name
    if (name === "" || !/^[A-Za-z]+$/.test(name))
      throw invalidInputError(
        "Name should be a string containing only alphabets. No numbers or special characters."
      );

    // Validate country
    if (country === "")
      throw invalidInputError("Country cannot be empty blank spaces");
    // Capitalize country
    country = normalizeCountryName(country);

    // Validate founded year
    if (!foundedYear || foundedYear < 1900 || foundedYear > 2025)
      throw invalidInputError(
        "Company founded year should be between 1900 and 2025"
      );

    const newCompany = {
      _id: new ObjectId(),
      name,
      foundedYear,
      country,
      albums: [],
    };

    let insertCompany = await companies.insertOne(newCompany);
    if (!insertCompany.acknowledged || !insertCompany.insertedId) {
      throw internalServerError(`Could not Add Record Company`);
    }

    // Manage cache
    // Delete all companies cache if present
    await deleteDocumentsFromCache(
      [{ documentName: "allCompanies", _id: "" }],
      redisClient
    );
    await deleteDocumentsFromCacheWithPrefix(
      "companyByFoundedYear",
      redisClient
    );
    await addDocumentToCache(
      "company",
      newCompany._id,
      newCompany,
      redisClient,
      null
    );
    return newCompany;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (_, args, context) => {
  const { redisClient } = context;
  const companies = await recordcompaniesCollection();

  try {
    let { _id, name, founded_year, country } = args;
    let foundedYear = founded_year;

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
    const existingCompany = await companies.findOne({ _id });
    if (!existingCompany) {
      throw notFoundError(
        `The company with the given ID ${_id} does not exist. Cannot edit.`
      );
    }

    let updateObject = {};
    // Validate and update name
    if (name) {
      name = name.trim();
      if (name === "" || !/^[A-Za-z]+$/.test(name)) {
        throw invalidInputError(
          "Name should be a string containing only alphabets and spaces, and cannot be empty."
        );
      }
      if (name !== existingCompany.name) {
        updateObject.name = name;
      }
    }

    // Validate and update foundedYear
    if (foundedYear) {
      if (
        !Number.isInteger(foundedYear) ||
        foundedYear < 1900 ||
        foundedYear > 2025
      ) {
        throw invalidInputError(
          "Company founded year should be an integer between 1900 and 2025."
        );
      }
      if (foundedYear !== existingCompany.foundedYear) {
        updateObject.foundedYear = foundedYear;
      }
    }

    // Validate and update country
    if (country) {
      country = country.trim();
      if (country === "") {
        throw invalidInputError("Country cannot be empty or blank spaces.");
      }

      country = normalizeCountryName(country);

      if (existingCompany.country !== country) {
        updateObject.country = country;
      }
    }

    // Check if anything to update
    if (Object.keys(updateObject).length === 0) {
      throw invalidInputError(
        "Cannot update. Please provide at least one updated value."
      );
    }

    // Update company in the database
    const updatedCompany = await companies.findOneAndUpdate(
      { _id },
      { $set: updateObject },
      { returnDocument: "after" }
    );

    if (!updatedCompany) {
      throw internalServerError("Failed to edit record company.");
    }

    // Delete company from cache
    await deleteDocumentsFromCache(
      [
        { documentName: "company", _id: updatedCompany._id },
        { documentName: "allCompanies", _id: "" },
      ],
      redisClient
    );

    // Delete all cache with prefix matching companyByFoundedYear
    await deleteDocumentsFromCacheWithPrefix(
      "companyByFoundedYear",
      redisClient
    );

    // Add updated company to cache
    await addDocumentToCache(
      "company",
      updatedCompany._id,
      updatedCompany,
      redisClient,
      null
    );

    return updatedCompany;
  } catch (error) {
    throw error;
  }
};

export const deleteCompany = async (_, args, context) => {
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

    // Check if company exists
    const existingCompany = await companies.findOne({ _id });
    if (!existingCompany) {
      throw notFoundError(`The company with given _id ${_id} does not exist.`);
    }

    // Update artist in the database
    const deletedCompany = await companies.findOneAndDelete({ _id });
    ////////////////////////////////////////
    // Delete albums distributed by the company

    if (!deletedCompany) {
      throw internalServerError("Failed to delete company");
    }
    // Delete albums, companies and related documents from cache
    ////////////////////////////////////////
    // Delete albums distributed by the company
    // If albums are present, delete albums and remove them from cache
    if (
      Array.isArray(deletedCompany.albums) &&
      deletedCompany.albums.length > 0
    ) {
      const albumIdsToDelete = deletedCompany.albums;

      // Fetch albums to get their song IDs
      const albumsToDelete = await albums
        .find({ _id: { $in: albumIdsToDelete } })
        .toArray(); // Convert cursor to array

      const songIdsToDelete =
        albumsToDelete.flatMap((album) => album.songs) || [];

      // Find affected artists whose albums are being deleted
      const affectedArtists = await artists
        .find({ albums: { $in: albumIdsToDelete } }, { projection: { _id: 1 } })
        .toArray();

      const artistIdsToDelete = affectedArtists.map((artist) => artist._id);

      // Delete the albums by their IDs
      const deletedAlbums = await albums.deleteMany({
        _id: { $in: albumIdsToDelete },
      });

      if (deletedAlbums.deletedCount > 0) {
        // Remove albums from respective artist documents
        await artists.updateMany(
          { albums: { $in: albumIdsToDelete } },
          { $pull: { albums: { $in: albumIdsToDelete } } }
        );

        // Delete all songs related to these albums
        if (songIdsToDelete.length > 0) {
          const deletedSongs = await songs.deleteMany({
            _id: { $in: songIdsToDelete },
          });

          if (deletedSongs.deletedCount > 0) {
            // Remove songs from cache
            for (const songId of songIdsToDelete) {
              await deleteDocumentsFromCache(
                [{ documentName: "song", _id: songId }],
                redisClient
              );
            }
          }
        }

        // Remove albums from cache
        for (const albumId of albumIdsToDelete) {
          await deleteDocumentsFromCache(
            [{ documentName: "album", _id: albumId }],
            redisClient
          );
        }

        // Remove affected artists from cache
        for (const artistId of artistIdsToDelete) {
          await deleteDocumentsFromCache(
            [{ documentName: "artist", _id: artistId }],
            redisClient
          );
        }
      }
    }
    await deleteDocumentsFromCacheWithPrefix("getAlbumsByGenre", redisClient);
    await deleteDocumentsFromCacheWithPrefix("songsByArtistId", redisClient);
    await deleteDocumentsFromCache(
      [
        { documentName: "company", _id: deletedCompany._id },
        { documentName: "allCompanies", _id: "" },
        { documentName: "allAlbums", _id: "" },
      ],
      redisClient
    );
    // Delete all cache with prefix matching companyByFoundedYear
    await deleteDocumentsFromCacheWithPrefix(
      "companyByFoundedYear",
      redisClient
    );
    return deletedCompany;
  } catch (error) {
    throw error;
  }
};
