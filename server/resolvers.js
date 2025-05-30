import { ObjectId } from "mongodb";

import { handleGraphQLError } from "./Utilities/Errors/GQLErrors.js";

import {
  artists as artistsCollection,
  albums as albumCollection,
  recordcompanies as recordcompaniesCollection,
  songs as songsCollection,
} from "./Config/mongoCollections.js";

import {
  addAlbum,
  editAlbum,
  getAlbumsByGenre,
  getAllAlbums,
  getOneAlbum,
  removeAlbum,
  songsByArtistId,
} from "./services/albumServices.js";

import {
  createNewArtist,
  deleteArtist,
  getAllArtists,
  getArtistByArtistName,
  getOneArtist,
  updateArtist,
} from "./services/artistServices.js";

import {
  createNewCompany,
  deleteCompany,
  fetchCompanyById,
  filterCompaniesByFoundedYear,
  getAllRecordCompanies,
  updateCompany,
} from "./services/recordCompaniesServices.js";
import {
  addNewSong,
  deleteSong,
  getOneSong,
  getSongByTitle,
  getSongsByAlbumId,
  updateSong,
} from "./services/songServices.js";

export const resolvers = {
  Query: {
    artists: async (_, args, context) => {
      try {
        const allArtists = await getAllArtists(_, args, context);
        return allArtists;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch artists. Please try again later."
        );
      }
    },
    getArtistById: async (_, args, context) => {
      try {
        const artist = await getOneArtist(_, args, context);
        return artist;
      } catch (error) {
        handleGraphQLError(
          "Failed to fetch artist by ID. Please try again later."
        );
      }
    },
    searchArtistByArtistName: async (_, args, context) => {
      try {
        const artistsBySearchTerm = await getArtistByArtistName(
          _,
          args,
          context
        );
        return artistsBySearchTerm;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch artist by search term. Please try again later."
        );
      }
    },
    recordCompanies: async (_, args, context) => {
      try {
        const allCompanies = await getAllRecordCompanies(_, args, context);

        return allCompanies;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch record companies. Please try again later."
        );
      }
    },
    companyByFoundedYear: async (_, args, context) => {
      try {
        const allCompaniesInRange = await filterCompaniesByFoundedYear(
          _,
          args,
          context
        );
        return allCompaniesInRange;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch record companiesfounded between the given year range. Please try again later."
        );
      }
    },
    getCompanyById: async (_, args, context) => {
      try {
        const company = await fetchCompanyById(_, args, context);
        return company;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch company for give ID. Please try again later."
        );
      }
    },
    albums: async (_, args, context) => {
      try {
        const allAlbums = await getAllAlbums(_, args, context);
        return allAlbums;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch albums. Please try again later."
        );
      }
    },
    getAlbumById: async (_, args, context) => {
      try {
        const album = await getOneAlbum(_, args, context);
        return album;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch company. Please try again later."
        );
      }
    },
    getSongsByArtistId: async (_, args, context) => {
      try {
        const songs = await songsByArtistId(_, args, context);
        return songs;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch songs for given artist Id. Please try again later."
        );
      }
    },
    albumsByGenre: async (_, args, context) => {
      try {
        const albums = await getAlbumsByGenre(_, args, context);
        return albums;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch albums for given genre. Please try again later."
        );
      }
    },
    getSongById: async (_, args, context) => {
      try {
        const song = await getOneSong(_, args, context);
        return song;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch song. Please try again later."
        );
      }
    },
    getSongsByAlbumId: async (_, args, context) => {
      try {
        const songs = await getSongsByAlbumId(_, args, context);
        return songs;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to fetch songs by albumId. Please try again later."
        );
      }
    },
    searchSongByTitle: async (_, args, context) => {
      try {
        const songs = await getSongByTitle(_, args, context);
        return songs;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to search song by title. Please try again later."
        );
      }
    },
  },

  Mutation: {
    addArtist: async (_, args, context) => {
      try {
        const newArtist = await createNewArtist(_, args, context);
        return newArtist;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to create new artist. Please try again later."
        );
      }
    },
    editArtist: async (_, args, context) => {
      try {
        const updatedArtist = await updateArtist(_, args, context);
        return updatedArtist;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to edit artist. Please try again later."
        );
      }
    },
    removeArtist: async (_, args, context) => {
      try {
        const deletedArtist = await deleteArtist(_, args, context);
        return deletedArtist;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to remove artist. Please try again later."
        );
      }
    },
    addCompany: async (_, args, context) => {
      try {
        const newCompany = await createNewCompany(_, args, context);
        return newCompany;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to add company. Please try again later."
        );
      }
    },
    editCompany: async (_, args, context) => {
      try {
        const updatedCompany = await updateCompany(_, args, context);
        return updatedCompany;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to edit company. Please try again later."
        );
      }
    },
    removeCompany: async (_, args, context) => {
      try {
        const deletedCompany = await deleteCompany(_, args, context);
        return deletedCompany;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to remove company. Please try again later."
        );
      }
    },
    addAlbum: async (parent, args, context) => {
      try {
        const newAlbum = await addAlbum(parent, args, context);
        return newAlbum;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to create album. Please try again later."
        );
      }
    },
    editAlbum: async (_, args, context) => {
      try {
        const updatedAlbum = await editAlbum(_, args, context);
        return updatedAlbum;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to edit album. Please try again later."
        );
      }
    },
    removeAlbum: async (_, args, context) => {
      const { redisClient } = context;
      const { _id } = args;
      try {
        const deletedAlbum = await removeAlbum(_id, redisClient);
        return deletedAlbum;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to remove album. Please try again later."
        );
      }
    },
    addSong: async (_, args, context) => {
      try {
        const newSong = await addNewSong(_, args, context);
        return newSong;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to create new song. Please try again later."
        );
      }
    },
    editSong: async (_, args, context) => {
      try {
        const updatedSong = await updateSong(_, args, context);
        return updatedSong;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to edit song. Please try again later."
        );
      }
    },
    removeSong: async (_, args, context) => {
      try {
        const deletedSong = await deleteSong(_, args, context);
        return deletedSong;
      } catch (error) {
        handleGraphQLError(
          error,
          "Failed to edit song. Please try again later."
        );
      }
    },
  },

  Album: {
    artist: async (album, args, context) => {
      const artists = await artistsCollection();
      const artist = await artists.findOne({
        _id: new ObjectId(album.artistId),
      });
      return artist;
    },
    recordCompany: async (album, args, context) => {
      const companies = await recordcompaniesCollection();
      const company = await companies.findOne({
        _id: new ObjectId(album.recordCompanyId),
      });

      return company;
    },
    songs: async (album, args, context) => {
      const songs = await songsCollection();
      const songIds = album.songs;
      const songObjects = await Promise.all(
        songIds.map(async (songId) => {
          return await songs.findOne({ _id: new ObjectId(songId) });
        })
      );

      const validSongs = songObjects.filter((song) => song !== null);
      return validSongs;
    },
  },
  Artist: {
    numOfAlbums: async (artist, args, context) => {
      const albumsCollection = await albumCollection();
      const albumsIds = artist.albums;

      const albumObjects = await Promise.all(
        albumsIds.map(async (albumId) => {
          return await albumsCollection.findOne({ _id: new ObjectId(albumId) });
        })
      );

      const validAlbums = albumObjects.filter((album) => album !== null);

      return validAlbums.length;
    },
    albums: async (artist, args, context) => {
      // If albums array is empty, return immediately
      if (!artist.albums || artist.albums.length === 0) {
        return [];
      }
      const albumsCollection = await albumCollection();
      const albumsIds = artist.albums;

      const albumObjects = await Promise.all(
        albumsIds.map(async (albumId) => {
          return await albumsCollection.findOne({ _id: new ObjectId(albumId) });
        })
      );
      const validAlbums = albumObjects.filter((album) => album !== null);
      return validAlbums;
    },
  },
  RecordCompany: {
    albums: async (company, args, context) => {
      // If albums array is empty, return immediately
      if (!company.albums || company.albums.length === 0) {
        return [];
      }
      const albumsCollection = await albumCollection();
      const albumsIds = company.albums;

      const albumObjects = await Promise.all(
        albumsIds.map(async (albumId) => {
          return await albumsCollection.findOne({ _id: new ObjectId(albumId) });
        })
      );
      const validAlbums = albumObjects.filter((album) => album !== null);
      return validAlbums;
    },
    numOfAlbums: async (company, args, context) => {
      const albumsCollection = await albumCollection();
      const albumsIds = company.albums;

      const albumObjects = await Promise.all(
        albumsIds.map(async (albumId) => {
          return await albumsCollection.findOne({ _id: new ObjectId(albumId) });
        })
      );

      const validAlbums = albumObjects.filter((album) => album !== null);

      return validAlbums.length;
    },
  },
  Song: {
    album: async (song, args, context) => {
      const albums = await albumCollection();
      const album = await albums.findOne({
        _id: new ObjectId(song.albumId),
      });
      return album;
    },
  },
};
