/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Album = {
  __typename?: 'Album';
  _id: Scalars['String']['output'];
  artist: Artist;
  genre: MusicGenre;
  recordCompany: RecordCompany;
  releaseDate: Scalars['String']['output'];
  songs: Array<Song>;
  title: Scalars['String']['output'];
};

export type Artist = {
  __typename?: 'Artist';
  _id: Scalars['String']['output'];
  albums: Array<Album>;
  dateFormed: Scalars['String']['output'];
  members: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  numOfAlbums?: Maybe<Scalars['Int']['output']>;
};

export enum MusicGenre {
  Alternative = 'ALTERNATIVE',
  Classical = 'CLASSICAL',
  Country = 'COUNTRY',
  Electronic = 'ELECTRONIC',
  HipHop = 'HIP_HOP',
  Indie = 'INDIE',
  Jazz = 'JAZZ',
  Pop = 'POP',
  Rock = 'ROCK',
  RAndB = 'R_AND_B'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAlbum?: Maybe<Album>;
  addArtist?: Maybe<Artist>;
  addCompany?: Maybe<RecordCompany>;
  addSong?: Maybe<Song>;
  editAlbum?: Maybe<Album>;
  editArtist?: Maybe<Artist>;
  editCompany?: Maybe<RecordCompany>;
  editSong?: Maybe<Song>;
  removeAlbum?: Maybe<Album>;
  removeArtist?: Maybe<Artist>;
  removeCompany?: Maybe<RecordCompany>;
  removeSong?: Maybe<Song>;
};


export type MutationAddAlbumArgs = {
  artistId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  genre: MusicGenre;
  releaseDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddArtistArgs = {
  date_formed: Scalars['String']['input'];
  members: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationAddCompanyArgs = {
  country: Scalars['String']['input'];
  founded_year: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationAddSongArgs = {
  albumId: Scalars['String']['input'];
  duration: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationEditAlbumArgs = {
  _id: Scalars['String']['input'];
  artistId?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<MusicGenre>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  songs?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditArtistArgs = {
  _id: Scalars['String']['input'];
  date_formed?: InputMaybe<Scalars['String']['input']>;
  members?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditCompanyArgs = {
  _id: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  founded_year?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditSongArgs = {
  _id: Scalars['String']['input'];
  albumId?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveAlbumArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveArtistArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveCompanyArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveSongArgs = {
  _id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  albums?: Maybe<Array<Maybe<Album>>>;
  albumsByGenre?: Maybe<Array<Maybe<Album>>>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  companyByFoundedYear?: Maybe<Array<Maybe<RecordCompany>>>;
  getAlbumById?: Maybe<Album>;
  getArtistById?: Maybe<Artist>;
  getCompanyById?: Maybe<RecordCompany>;
  getSongById?: Maybe<Song>;
  getSongsByAlbumId?: Maybe<Array<Maybe<Song>>>;
  getSongsByArtistId?: Maybe<Array<Maybe<Song>>>;
  recordCompanies?: Maybe<Array<Maybe<RecordCompany>>>;
  searchArtistByArtistName?: Maybe<Array<Maybe<Artist>>>;
  searchSongByTitle?: Maybe<Array<Maybe<Song>>>;
};


export type QueryAlbumsByGenreArgs = {
  genre: MusicGenre;
};


export type QueryCompanyByFoundedYearArgs = {
  max: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};


export type QueryGetAlbumByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetArtistByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetCompanyByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetSongByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetSongsByAlbumIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetSongsByArtistIdArgs = {
  artistId: Scalars['String']['input'];
};


export type QuerySearchArtistByArtistNameArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QuerySearchSongByTitleArgs = {
  searchTitleTerm: Scalars['String']['input'];
};

export type RecordCompany = {
  __typename?: 'RecordCompany';
  _id: Scalars['String']['output'];
  albums: Array<Album>;
  country?: Maybe<Scalars['String']['output']>;
  foundedYear: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  numOfAlbums?: Maybe<Scalars['Int']['output']>;
};

export type Song = {
  __typename?: 'Song';
  _id: Scalars['String']['output'];
  album: Album;
  duration: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AddAlbumMutationVariables = Exact<{
  title: Scalars['String']['input'];
  releaseDate: Scalars['String']['input'];
  genre: MusicGenre;
  artistId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
}>;


export type AddAlbumMutation = { __typename?: 'Mutation', addAlbum?: { __typename?: 'Album', _id: string, title: string, releaseDate: string, genre: MusicGenre, artist: { __typename?: 'Artist', name: string, _id: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string }, songs: Array<{ __typename?: 'Song', _id: string }> } | null };

export type AddArtistMutationVariables = Exact<{
  name: Scalars['String']['input'];
  dateFormed: Scalars['String']['input'];
  members: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddArtistMutation = { __typename?: 'Mutation', addArtist?: { __typename?: 'Artist', _id: string, name: string, dateFormed: string, members: Array<string>, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null };

export type AddCompanyMutationVariables = Exact<{
  name: Scalars['String']['input'];
  foundedYear: Scalars['Int']['input'];
  country: Scalars['String']['input'];
}>;


export type AddCompanyMutation = { __typename?: 'Mutation', addCompany?: { __typename?: 'RecordCompany', _id: string, name: string, foundedYear: number, country?: string | null, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null };

export type AddSongMutationVariables = Exact<{
  title: Scalars['String']['input'];
  duration: Scalars['String']['input'];
  albumId: Scalars['String']['input'];
}>;


export type AddSongMutation = { __typename?: 'Mutation', addSong?: { __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string, releaseDate: string } } | null };

export type EditAlbumMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<MusicGenre>;
  songs?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  artistId?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditAlbumMutation = { __typename?: 'Mutation', editAlbum?: { __typename?: 'Album', _id: string, title: string, releaseDate: string, genre: MusicGenre, artist: { __typename?: 'Artist', _id: string, name: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string }, songs: Array<{ __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string } }> } | null };

export type EditArtistMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  dateFormed?: InputMaybe<Scalars['String']['input']>;
  members?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type EditArtistMutation = { __typename?: 'Mutation', editArtist?: { __typename?: 'Artist', _id: string, name: string, dateFormed: string, members: Array<string> } | null };

export type EditCompanyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  foundedYear?: InputMaybe<Scalars['Int']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditCompanyMutation = { __typename?: 'Mutation', editCompany?: { __typename?: 'RecordCompany', _id: string, name: string, foundedYear: number, country?: string | null, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null };

export type EditSongMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  albumId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditSongMutation = { __typename?: 'Mutation', editSong?: { __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string, artist: { __typename?: 'Artist', _id: string, name: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string } } } | null };

export type RemoveAlbumMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveAlbumMutation = { __typename?: 'Mutation', removeAlbum?: { __typename?: 'Album', _id: string, title: string, artist: { __typename?: 'Artist', _id: string, name: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string }, songs: Array<{ __typename?: 'Song', _id: string, title: string }> } | null };

export type RemoveArtistMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveArtistMutation = { __typename?: 'Mutation', removeArtist?: { __typename?: 'Artist', _id: string, name: string } | null };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutation', removeCompany?: { __typename?: 'RecordCompany', _id: string, name: string, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null };

export type RemoveSongMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSongMutation = { __typename?: 'Mutation', removeSong?: { __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string, releaseDate: string } } | null };

export type AlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type AlbumsQuery = { __typename?: 'Query', albums?: Array<{ __typename?: 'Album', _id: string, title: string, releaseDate: string, genre: MusicGenre, artist: { __typename?: 'Artist', _id: string, name: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string }, songs: Array<{ __typename?: 'Song', _id: string, title: string }> } | null> | null };

export type AlbumsByGenreQueryVariables = Exact<{
  genre: MusicGenre;
}>;


export type AlbumsByGenreQuery = { __typename?: 'Query', albumsByGenre?: Array<{ __typename?: 'Album', _id: string, title: string, releaseDate: string, genre: MusicGenre, artist: { __typename?: 'Artist', _id: string, name: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string }, songs: Array<{ __typename?: 'Song', _id: string, title: string, duration: string }> } | null> | null };

export type ArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistsQuery = { __typename?: 'Query', artists?: Array<{ __typename?: 'Artist', _id: string, name: string, dateFormed: string, members: Array<string>, numOfAlbums?: number | null } | null> | null };

export type CompanyByFoundedYearQueryVariables = Exact<{
  min: Scalars['Int']['input'];
  max: Scalars['Int']['input'];
}>;


export type CompanyByFoundedYearQuery = { __typename?: 'Query', companyByFoundedYear?: Array<{ __typename?: 'RecordCompany', _id: string, name: string, foundedYear: number, country?: string | null, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null> | null };

export type GetAlbumByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAlbumByIdQuery = { __typename?: 'Query', getAlbumById?: { __typename?: 'Album', _id: string, title: string, releaseDate: string, genre: MusicGenre, artist: { __typename?: 'Artist', _id: string, name: string, dateFormed: string, members: Array<string> }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string, foundedYear: number, country?: string | null }, songs: Array<{ __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string } }> } | null };

export type GetArtistByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetArtistByIdQuery = { __typename?: 'Query', getArtistById?: { __typename?: 'Artist', _id: string, name: string, dateFormed: string, members: Array<string>, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string, genre: MusicGenre, releaseDate: string }> } | null };

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCompanyByIdQuery = { __typename?: 'Query', getCompanyById?: { __typename?: 'RecordCompany', _id: string, name: string, foundedYear: number, country?: string | null, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string, genre: MusicGenre, releaseDate: string, artist: { __typename?: 'Artist', _id: string, name: string }, songs: Array<{ __typename?: 'Song', _id: string, title: string }> }> } | null };

export type GetSongByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSongByIdQuery = { __typename?: 'Query', getSongById?: { __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string, releaseDate: string, genre: MusicGenre, artist: { __typename?: 'Artist', _id: string, name: string }, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string } } } | null };

export type GetSongsByArtistIdQueryVariables = Exact<{
  artistId: Scalars['String']['input'];
}>;


export type GetSongsByArtistIdQuery = { __typename?: 'Query', getSongsByArtistId?: Array<{ __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string, genre: MusicGenre, releaseDate: string, recordCompany: { __typename?: 'RecordCompany', _id: string, name: string } } } | null> | null };

export type RecordCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecordCompaniesQuery = { __typename?: 'Query', recordCompanies?: Array<{ __typename?: 'RecordCompany', _id: string, name: string, foundedYear: number, country?: string | null, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null> | null };

export type SearchArtistByArtistNameQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchArtistByArtistNameQuery = { __typename?: 'Query', searchArtistByArtistName?: Array<{ __typename?: 'Artist', _id: string, name: string, dateFormed: string, members: Array<string>, numOfAlbums?: number | null, albums: Array<{ __typename?: 'Album', _id: string, title: string }> } | null> | null };

export type SearchSongByTitleQueryVariables = Exact<{
  searchTitleTerm: Scalars['String']['input'];
}>;


export type SearchSongByTitleQuery = { __typename?: 'Query', searchSongByTitle?: Array<{ __typename?: 'Song', _id: string, title: string, duration: string, album: { __typename?: 'Album', _id: string, title: string, releaseDate: string } } | null> | null };


export const AddAlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAlbum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"releaseDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genre"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicGenre"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAlbum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"releaseDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"releaseDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"genre"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genre"}}},{"kind":"Argument","name":{"kind":"Name","value":"artistId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artistId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<AddAlbumMutation, AddAlbumMutationVariables>;
export const AddArtistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddArtist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateFormed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"members"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addArtist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"date_formed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateFormed"}}},{"kind":"Argument","name":{"kind":"Name","value":"members"},"value":{"kind":"Variable","name":{"kind":"Name","value":"members"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormed"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<AddArtistMutation, AddArtistMutationVariables>;
export const AddCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"foundedYear"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"founded_year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"foundedYear"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"foundedYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<AddCompanyMutation, AddCompanyMutationVariables>;
export const AddSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"duration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"albumId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"duration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"duration"}}},{"kind":"Argument","name":{"kind":"Name","value":"albumId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"albumId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]} as unknown as DocumentNode<AddSongMutation, AddSongMutationVariables>;
export const EditAlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditAlbum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"releaseDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genre"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicGenre"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"songs"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artistId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editAlbum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"releaseDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"releaseDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"genre"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genre"}}},{"kind":"Argument","name":{"kind":"Name","value":"songs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"songs"}}},{"kind":"Argument","name":{"kind":"Name","value":"artistId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artistId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditAlbumMutation, EditAlbumMutationVariables>;
export const EditArtistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditArtist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateFormed"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"members"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editArtist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"date_formed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateFormed"}}},{"kind":"Argument","name":{"kind":"Name","value":"members"},"value":{"kind":"Variable","name":{"kind":"Name","value":"members"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormed"}},{"kind":"Field","name":{"kind":"Name","value":"members"}}]}}]}}]} as unknown as DocumentNode<EditArtistMutation, EditArtistMutationVariables>;
export const EditCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"foundedYear"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"founded_year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"foundedYear"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"foundedYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<EditCompanyMutation, EditCompanyMutationVariables>;
export const EditSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"duration"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"albumId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"duration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"duration"}}},{"kind":"Argument","name":{"kind":"Name","value":"albumId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"albumId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditSongMutation, EditSongMutationVariables>;
export const RemoveAlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAlbum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAlbum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<RemoveAlbumMutation, RemoveAlbumMutationVariables>;
export const RemoveArtistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveArtist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeArtist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveArtistMutation, RemoveArtistMutationVariables>;
export const RemoveCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveCompanyMutation, RemoveCompanyMutationVariables>;
export const RemoveSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveSongMutation, RemoveSongMutationVariables>;
export const AlbumsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<AlbumsQuery, AlbumsQueryVariables>;
export const AlbumsByGenreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AlbumsByGenre"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genre"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicGenre"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"albumsByGenre"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"genre"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genre"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]} as unknown as DocumentNode<AlbumsByGenreQuery, AlbumsByGenreQueryVariables>;
export const ArtistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormed"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<ArtistsQuery, ArtistsQueryVariables>;
export const CompanyByFoundedYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyByFoundedYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"min"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"max"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyByFoundedYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"min"},"value":{"kind":"Variable","name":{"kind":"Name","value":"min"}}},{"kind":"Argument","name":{"kind":"Name","value":"max"},"value":{"kind":"Variable","name":{"kind":"Name","value":"max"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"foundedYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<CompanyByFoundedYearQuery, CompanyByFoundedYearQueryVariables>;
export const GetAlbumByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAlbumById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAlbumById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormed"}},{"kind":"Field","name":{"kind":"Name","value":"members"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"foundedYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAlbumByIdQuery, GetAlbumByIdQueryVariables>;
export const GetArtistByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArtistById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArtistById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormed"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetArtistByIdQuery, GetArtistByIdQueryVariables>;
export const GetCompanyByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanyById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"foundedYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>;
export const GetSongByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSongById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSongById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSongByIdQuery, GetSongByIdQueryVariables>;
export const GetSongsByArtistIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSongsByArtistId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSongsByArtistId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artistId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artistId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"recordCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSongsByArtistIdQuery, GetSongsByArtistIdQueryVariables>;
export const RecordCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecordCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recordCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"foundedYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<RecordCompaniesQuery, RecordCompaniesQueryVariables>;
export const SearchArtistByArtistNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchArtistByArtistName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchArtistByArtistName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormed"}},{"kind":"Field","name":{"kind":"Name","value":"members"}},{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfAlbums"}}]}}]}}]} as unknown as DocumentNode<SearchArtistByArtistNameQuery, SearchArtistByArtistNameQueryVariables>;
export const SearchSongByTitleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSongByTitle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTitleTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchSongByTitle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTitleTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTitleTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]} as unknown as DocumentNode<SearchSongByTitleQuery, SearchSongByTitleQueryVariables>;