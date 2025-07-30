/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "mutation AddAlbum($title: String!, $releaseDate: String!, $genre: MusicGenre!, $artistId: String!, $companyId: String!) {\n  addAlbum(\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    artist {\n      name\n      _id\n    }\n    recordCompany {\n      _id\n      name\n    }\n    releaseDate\n    genre\n    songs {\n      _id\n    }\n  }\n}": typeof types.AddAlbumDocument;
  "mutation AddArtist($name: String!, $dateFormed: String!, $members: [String!]!) {\n  addArtist(name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}": typeof types.AddArtistDocument;
  "mutation AddCompany($name: String!, $foundedYear: Int!, $country: String!) {\n  addCompany(name: $name, founded_year: $foundedYear, country: $country) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}": typeof types.AddCompanyDocument;
  "mutation AddSong($title: String!, $duration: String!, $albumId: String!) {\n  addSong(title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}": typeof types.AddSongDocument;
  "mutation EditAlbum($id: String!, $title: String, $releaseDate: String, $genre: MusicGenre, $songs: [String!], $artistId: String, $companyId: String) {\n  editAlbum(\n    _id: $id\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    songs: $songs\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}": typeof types.EditAlbumDocument;
  "mutation EditArtist($id: String!, $name: String, $dateFormed: String, $members: [String!]) {\n  editArtist(_id: $id, name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n  }\n}": typeof types.EditArtistDocument;
  "mutation EditCompany($id: String!, $name: String, $foundedYear: Int, $country: String) {\n  editCompany(\n    _id: $id\n    name: $name\n    founded_year: $foundedYear\n    country: $country\n  ) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}": typeof types.EditCompanyDocument;
  "mutation EditSong($id: String!, $title: String, $duration: String, $albumId: String) {\n  editSong(_id: $id, title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}": typeof types.EditSongDocument;
  "mutation RemoveAlbum($id: String!) {\n  removeAlbum(_id: $id) {\n    _id\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n    title\n  }\n}": typeof types.RemoveAlbumDocument;
  "mutation RemoveArtist($id: String!) {\n  removeArtist(_id: $id) {\n    _id\n    name\n  }\n}": typeof types.RemoveArtistDocument;
  "mutation RemoveCompany($id: String!) {\n  removeCompany(_id: $id) {\n    _id\n    name\n    albums {\n      _id\n      title\n    }\n  }\n}": typeof types.RemoveCompanyDocument;
  "mutation RemoveSong($id: String!) {\n  removeSong(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}": typeof types.RemoveSongDocument;
  "query Albums {\n  albums {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n  }\n}": typeof types.AlbumsDocument;
  "query AlbumsByGenre($genre: MusicGenre!) {\n  albumsByGenre(genre: $genre) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n    }\n  }\n}": typeof types.AlbumsByGenreDocument;
  "query Artists {\n  artists {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n  }\n}": typeof types.ArtistsDocument;
  "query CompanyByFoundedYear($min: Int!, $max: Int!) {\n  companyByFoundedYear(min: $min, max: $max) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}": typeof types.CompanyByFoundedYearDocument;
  "query GetAlbumById($id: String!) {\n  getAlbumById(_id: $id) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n      dateFormed\n      members\n    }\n    recordCompany {\n      _id\n      name\n      foundedYear\n      country\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}": typeof types.GetAlbumByIdDocument;
  "query GetArtistById($id: String!) {\n  getArtistById(_id: $id) {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n    }\n  }\n}": typeof types.GetArtistByIdDocument;
  "query GetCompanyById($id: String!) {\n  getCompanyById(_id: $id) {\n    _id\n    name\n    foundedYear\n    country\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n      artist {\n        _id\n        name\n      }\n      songs {\n        _id\n        title\n      }\n    }\n  }\n}": typeof types.GetCompanyByIdDocument;
  "query GetSongById($id: String!) {\n  getSongById(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n      genre\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}": typeof types.GetSongByIdDocument;
  "query GetSongsByArtistId($artistId: String!) {\n  getSongsByArtistId(artistId: $artistId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      genre\n      releaseDate\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}": typeof types.GetSongsByArtistIdDocument;
  "query RecordCompanies {\n  recordCompanies {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}": typeof types.RecordCompaniesDocument;
  "query SearchArtistByArtistName($searchTerm: String!) {\n  searchArtistByArtistName(searchTerm: $searchTerm) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}": typeof types.SearchArtistByArtistNameDocument;
  "query SearchSongByTitle($searchTitleTerm: String!) {\n  searchSongByTitle(searchTitleTerm: $searchTitleTerm) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}": typeof types.SearchSongByTitleDocument;
};
const documents: Documents = {
  "mutation AddAlbum($title: String!, $releaseDate: String!, $genre: MusicGenre!, $artistId: String!, $companyId: String!) {\n  addAlbum(\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    artist {\n      name\n      _id\n    }\n    recordCompany {\n      _id\n      name\n    }\n    releaseDate\n    genre\n    songs {\n      _id\n    }\n  }\n}":
    types.AddAlbumDocument,
  "mutation AddArtist($name: String!, $dateFormed: String!, $members: [String!]!) {\n  addArtist(name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}":
    types.AddArtistDocument,
  "mutation AddCompany($name: String!, $foundedYear: Int!, $country: String!) {\n  addCompany(name: $name, founded_year: $foundedYear, country: $country) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}":
    types.AddCompanyDocument,
  "mutation AddSong($title: String!, $duration: String!, $albumId: String!) {\n  addSong(title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}":
    types.AddSongDocument,
  "mutation EditAlbum($id: String!, $title: String, $releaseDate: String, $genre: MusicGenre, $songs: [String!], $artistId: String, $companyId: String) {\n  editAlbum(\n    _id: $id\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    songs: $songs\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}":
    types.EditAlbumDocument,
  "mutation EditArtist($id: String!, $name: String, $dateFormed: String, $members: [String!]) {\n  editArtist(_id: $id, name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n  }\n}":
    types.EditArtistDocument,
  "mutation EditCompany($id: String!, $name: String, $foundedYear: Int, $country: String) {\n  editCompany(\n    _id: $id\n    name: $name\n    founded_year: $foundedYear\n    country: $country\n  ) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}":
    types.EditCompanyDocument,
  "mutation EditSong($id: String!, $title: String, $duration: String, $albumId: String) {\n  editSong(_id: $id, title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}":
    types.EditSongDocument,
  "mutation RemoveAlbum($id: String!) {\n  removeAlbum(_id: $id) {\n    _id\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n    title\n  }\n}":
    types.RemoveAlbumDocument,
  "mutation RemoveArtist($id: String!) {\n  removeArtist(_id: $id) {\n    _id\n    name\n  }\n}":
    types.RemoveArtistDocument,
  "mutation RemoveCompany($id: String!) {\n  removeCompany(_id: $id) {\n    _id\n    name\n    albums {\n      _id\n      title\n    }\n  }\n}":
    types.RemoveCompanyDocument,
  "mutation RemoveSong($id: String!) {\n  removeSong(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}":
    types.RemoveSongDocument,
  "query Albums {\n  albums {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n  }\n}":
    types.AlbumsDocument,
  "query AlbumsByGenre($genre: MusicGenre!) {\n  albumsByGenre(genre: $genre) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n    }\n  }\n}":
    types.AlbumsByGenreDocument,
  "query Artists {\n  artists {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n  }\n}":
    types.ArtistsDocument,
  "query CompanyByFoundedYear($min: Int!, $max: Int!) {\n  companyByFoundedYear(min: $min, max: $max) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}":
    types.CompanyByFoundedYearDocument,
  "query GetAlbumById($id: String!) {\n  getAlbumById(_id: $id) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n      dateFormed\n      members\n    }\n    recordCompany {\n      _id\n      name\n      foundedYear\n      country\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}":
    types.GetAlbumByIdDocument,
  "query GetArtistById($id: String!) {\n  getArtistById(_id: $id) {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n    }\n  }\n}":
    types.GetArtistByIdDocument,
  "query GetCompanyById($id: String!) {\n  getCompanyById(_id: $id) {\n    _id\n    name\n    foundedYear\n    country\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n      artist {\n        _id\n        name\n      }\n      songs {\n        _id\n        title\n      }\n    }\n  }\n}":
    types.GetCompanyByIdDocument,
  "query GetSongById($id: String!) {\n  getSongById(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n      genre\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}":
    types.GetSongByIdDocument,
  "query GetSongsByArtistId($artistId: String!) {\n  getSongsByArtistId(artistId: $artistId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      genre\n      releaseDate\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}":
    types.GetSongsByArtistIdDocument,
  "query RecordCompanies {\n  recordCompanies {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}":
    types.RecordCompaniesDocument,
  "query SearchArtistByArtistName($searchTerm: String!) {\n  searchArtistByArtistName(searchTerm: $searchTerm) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}":
    types.SearchArtistByArtistNameDocument,
  "query SearchSongByTitle($searchTitleTerm: String!) {\n  searchSongByTitle(searchTitleTerm: $searchTitleTerm) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}":
    types.SearchSongByTitleDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation AddAlbum($title: String!, $releaseDate: String!, $genre: MusicGenre!, $artistId: String!, $companyId: String!) {\n  addAlbum(\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    artist {\n      name\n      _id\n    }\n    recordCompany {\n      _id\n      name\n    }\n    releaseDate\n    genre\n    songs {\n      _id\n    }\n  }\n}"
): (typeof documents)["mutation AddAlbum($title: String!, $releaseDate: String!, $genre: MusicGenre!, $artistId: String!, $companyId: String!) {\n  addAlbum(\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    artist {\n      name\n      _id\n    }\n    recordCompany {\n      _id\n      name\n    }\n    releaseDate\n    genre\n    songs {\n      _id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation AddArtist($name: String!, $dateFormed: String!, $members: [String!]!) {\n  addArtist(name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"
): (typeof documents)["mutation AddArtist($name: String!, $dateFormed: String!, $members: [String!]!) {\n  addArtist(name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation AddCompany($name: String!, $foundedYear: Int!, $country: String!) {\n  addCompany(name: $name, founded_year: $foundedYear, country: $country) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"
): (typeof documents)["mutation AddCompany($name: String!, $foundedYear: Int!, $country: String!) {\n  addCompany(name: $name, founded_year: $foundedYear, country: $country) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation AddSong($title: String!, $duration: String!, $albumId: String!) {\n  addSong(title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}"
): (typeof documents)["mutation AddSong($title: String!, $duration: String!, $albumId: String!) {\n  addSong(title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation EditAlbum($id: String!, $title: String, $releaseDate: String, $genre: MusicGenre, $songs: [String!], $artistId: String, $companyId: String) {\n  editAlbum(\n    _id: $id\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    songs: $songs\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}"
): (typeof documents)["mutation EditAlbum($id: String!, $title: String, $releaseDate: String, $genre: MusicGenre, $songs: [String!], $artistId: String, $companyId: String) {\n  editAlbum(\n    _id: $id\n    title: $title\n    releaseDate: $releaseDate\n    genre: $genre\n    songs: $songs\n    artistId: $artistId\n    companyId: $companyId\n  ) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation EditArtist($id: String!, $name: String, $dateFormed: String, $members: [String!]) {\n  editArtist(_id: $id, name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n  }\n}"
): (typeof documents)["mutation EditArtist($id: String!, $name: String, $dateFormed: String, $members: [String!]) {\n  editArtist(_id: $id, name: $name, date_formed: $dateFormed, members: $members) {\n    _id\n    name\n    dateFormed\n    members\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation EditCompany($id: String!, $name: String, $foundedYear: Int, $country: String) {\n  editCompany(\n    _id: $id\n    name: $name\n    founded_year: $foundedYear\n    country: $country\n  ) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"
): (typeof documents)["mutation EditCompany($id: String!, $name: String, $foundedYear: Int, $country: String) {\n  editCompany(\n    _id: $id\n    name: $name\n    founded_year: $foundedYear\n    country: $country\n  ) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation EditSong($id: String!, $title: String, $duration: String, $albumId: String) {\n  editSong(_id: $id, title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}"
): (typeof documents)["mutation EditSong($id: String!, $title: String, $duration: String, $albumId: String) {\n  editSong(_id: $id, title: $title, duration: $duration, albumId: $albumId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation RemoveAlbum($id: String!) {\n  removeAlbum(_id: $id) {\n    _id\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n    title\n  }\n}"
): (typeof documents)["mutation RemoveAlbum($id: String!) {\n  removeAlbum(_id: $id) {\n    _id\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n    title\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation RemoveArtist($id: String!) {\n  removeArtist(_id: $id) {\n    _id\n    name\n  }\n}"
): (typeof documents)["mutation RemoveArtist($id: String!) {\n  removeArtist(_id: $id) {\n    _id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation RemoveCompany($id: String!) {\n  removeCompany(_id: $id) {\n    _id\n    name\n    albums {\n      _id\n      title\n    }\n  }\n}"
): (typeof documents)["mutation RemoveCompany($id: String!) {\n  removeCompany(_id: $id) {\n    _id\n    name\n    albums {\n      _id\n      title\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation RemoveSong($id: String!) {\n  removeSong(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}"
): (typeof documents)["mutation RemoveSong($id: String!) {\n  removeSong(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Albums {\n  albums {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n  }\n}"
): (typeof documents)["query Albums {\n  albums {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query AlbumsByGenre($genre: MusicGenre!) {\n  albumsByGenre(genre: $genre) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n    }\n  }\n}"
): (typeof documents)["query AlbumsByGenre($genre: MusicGenre!) {\n  albumsByGenre(genre: $genre) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n    }\n    recordCompany {\n      _id\n      name\n    }\n    songs {\n      _id\n      title\n      duration\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Artists {\n  artists {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n  }\n}"
): (typeof documents)["query Artists {\n  artists {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query CompanyByFoundedYear($min: Int!, $max: Int!) {\n  companyByFoundedYear(min: $min, max: $max) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"
): (typeof documents)["query CompanyByFoundedYear($min: Int!, $max: Int!) {\n  companyByFoundedYear(min: $min, max: $max) {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetAlbumById($id: String!) {\n  getAlbumById(_id: $id) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n      dateFormed\n      members\n    }\n    recordCompany {\n      _id\n      name\n      foundedYear\n      country\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}"
): (typeof documents)["query GetAlbumById($id: String!) {\n  getAlbumById(_id: $id) {\n    _id\n    title\n    releaseDate\n    genre\n    artist {\n      _id\n      name\n      dateFormed\n      members\n    }\n    recordCompany {\n      _id\n      name\n      foundedYear\n      country\n    }\n    songs {\n      _id\n      title\n      duration\n      album {\n        _id\n        title\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetArtistById($id: String!) {\n  getArtistById(_id: $id) {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n    }\n  }\n}"
): (typeof documents)["query GetArtistById($id: String!) {\n  getArtistById(_id: $id) {\n    _id\n    name\n    dateFormed\n    members\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetCompanyById($id: String!) {\n  getCompanyById(_id: $id) {\n    _id\n    name\n    foundedYear\n    country\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n      artist {\n        _id\n        name\n      }\n      songs {\n        _id\n        title\n      }\n    }\n  }\n}"
): (typeof documents)["query GetCompanyById($id: String!) {\n  getCompanyById(_id: $id) {\n    _id\n    name\n    foundedYear\n    country\n    numOfAlbums\n    albums {\n      _id\n      title\n      genre\n      releaseDate\n      artist {\n        _id\n        name\n      }\n      songs {\n        _id\n        title\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetSongById($id: String!) {\n  getSongById(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n      genre\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}"
): (typeof documents)["query GetSongById($id: String!) {\n  getSongById(_id: $id) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n      genre\n      artist {\n        _id\n        name\n      }\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetSongsByArtistId($artistId: String!) {\n  getSongsByArtistId(artistId: $artistId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      genre\n      releaseDate\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}"
): (typeof documents)["query GetSongsByArtistId($artistId: String!) {\n  getSongsByArtistId(artistId: $artistId) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      genre\n      releaseDate\n      recordCompany {\n        _id\n        name\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query RecordCompanies {\n  recordCompanies {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"
): (typeof documents)["query RecordCompanies {\n  recordCompanies {\n    _id\n    name\n    foundedYear\n    country\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query SearchArtistByArtistName($searchTerm: String!) {\n  searchArtistByArtistName(searchTerm: $searchTerm) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"
): (typeof documents)["query SearchArtistByArtistName($searchTerm: String!) {\n  searchArtistByArtistName(searchTerm: $searchTerm) {\n    _id\n    name\n    dateFormed\n    members\n    albums {\n      _id\n      title\n    }\n    numOfAlbums\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query SearchSongByTitle($searchTitleTerm: String!) {\n  searchSongByTitle(searchTitleTerm: $searchTitleTerm) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}"
): (typeof documents)["query SearchSongByTitle($searchTitleTerm: String!) {\n  searchSongByTitle(searchTitleTerm: $searchTitleTerm) {\n    _id\n    title\n    duration\n    album {\n      _id\n      title\n      releaseDate\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
