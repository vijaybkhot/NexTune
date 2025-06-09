import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Album = {
  __typename?: "Album";
  _id: Scalars["String"]["output"];
  artist: Artist;
  genre: MusicGenre;
  recordCompany: RecordCompany;
  releaseDate: Scalars["String"]["output"];
  songs: Array<Song>;
  title: Scalars["String"]["output"];
};

export type Artist = {
  __typename?: "Artist";
  _id: Scalars["String"]["output"];
  albums: Array<Album>;
  dateFormed: Scalars["String"]["output"];
  members: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  numOfAlbums?: Maybe<Scalars["Int"]["output"]>;
};

export enum MusicGenre {
  Alternative = "ALTERNATIVE",
  Classical = "CLASSICAL",
  Country = "COUNTRY",
  Electronic = "ELECTRONIC",
  HipHop = "HIP_HOP",
  Indie = "INDIE",
  Jazz = "JAZZ",
  Pop = "POP",
  Rock = "ROCK",
  RAndB = "R_AND_B",
}

export type Mutation = {
  __typename?: "Mutation";
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
  artistId: Scalars["String"]["input"];
  companyId: Scalars["String"]["input"];
  genre: MusicGenre;
  releaseDate: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationAddArtistArgs = {
  date_formed: Scalars["String"]["input"];
  members: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type MutationAddCompanyArgs = {
  country: Scalars["String"]["input"];
  founded_year: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationAddSongArgs = {
  albumId: Scalars["String"]["input"];
  duration: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationEditAlbumArgs = {
  _id: Scalars["String"]["input"];
  artistId?: InputMaybe<Scalars["String"]["input"]>;
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  genre?: InputMaybe<MusicGenre>;
  releaseDate?: InputMaybe<Scalars["String"]["input"]>;
  songs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationEditArtistArgs = {
  _id: Scalars["String"]["input"];
  date_formed?: InputMaybe<Scalars["String"]["input"]>;
  members?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationEditCompanyArgs = {
  _id: Scalars["String"]["input"];
  country?: InputMaybe<Scalars["String"]["input"]>;
  founded_year?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationEditSongArgs = {
  _id: Scalars["String"]["input"];
  albumId?: InputMaybe<Scalars["String"]["input"]>;
  duration?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRemoveAlbumArgs = {
  _id: Scalars["String"]["input"];
};

export type MutationRemoveArtistArgs = {
  _id: Scalars["String"]["input"];
};

export type MutationRemoveCompanyArgs = {
  _id: Scalars["String"]["input"];
};

export type MutationRemoveSongArgs = {
  _id: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
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
  max: Scalars["Int"]["input"];
  min: Scalars["Int"]["input"];
};

export type QueryGetAlbumByIdArgs = {
  _id: Scalars["String"]["input"];
};

export type QueryGetArtistByIdArgs = {
  _id: Scalars["String"]["input"];
};

export type QueryGetCompanyByIdArgs = {
  _id: Scalars["String"]["input"];
};

export type QueryGetSongByIdArgs = {
  _id: Scalars["String"]["input"];
};

export type QueryGetSongsByAlbumIdArgs = {
  _id: Scalars["String"]["input"];
};

export type QueryGetSongsByArtistIdArgs = {
  artistId: Scalars["String"]["input"];
};

export type QuerySearchArtistByArtistNameArgs = {
  searchTerm: Scalars["String"]["input"];
};

export type QuerySearchSongByTitleArgs = {
  searchTitleTerm: Scalars["String"]["input"];
};

export type RecordCompany = {
  __typename?: "RecordCompany";
  _id: Scalars["String"]["output"];
  albums: Array<Album>;
  country?: Maybe<Scalars["String"]["output"]>;
  foundedYear: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  numOfAlbums?: Maybe<Scalars["Int"]["output"]>;
};

export type Song = {
  __typename?: "Song";
  _id: Scalars["String"]["output"];
  album: Album;
  duration: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type AddAlbumMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  releaseDate: Scalars["String"]["input"];
  genre: MusicGenre;
  artistId: Scalars["String"]["input"];
  companyId: Scalars["String"]["input"];
}>;

export type AddAlbumMutation = {
  __typename?: "Mutation";
  addAlbum?: {
    __typename?: "Album";
    _id: string;
    title: string;
    releaseDate: string;
    genre: MusicGenre;
    artist: { __typename?: "Artist"; name: string; _id: string };
    recordCompany: { __typename?: "RecordCompany"; _id: string; name: string };
    songs: Array<{ __typename?: "Song"; _id: string }>;
  } | null;
};

export type AddArtistMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  dateFormed: Scalars["String"]["input"];
  members: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
}>;

export type AddArtistMutation = {
  __typename?: "Mutation";
  addArtist?: {
    __typename?: "Artist";
    _id: string;
    name: string;
    dateFormed: string;
    members: Array<string>;
    numOfAlbums?: number | null;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null;
};

export type AddCompanyMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  foundedYear: Scalars["Int"]["input"];
  country: Scalars["String"]["input"];
}>;

export type AddCompanyMutation = {
  __typename?: "Mutation";
  addCompany?: {
    __typename?: "RecordCompany";
    _id: string;
    name: string;
    foundedYear: number;
    country?: string | null;
    numOfAlbums?: number | null;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null;
};

export type AddSongMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  duration: Scalars["String"]["input"];
  albumId: Scalars["String"]["input"];
}>;

export type AddSongMutation = {
  __typename?: "Mutation";
  addSong?: {
    __typename?: "Song";
    _id: string;
    title: string;
    duration: string;
    album: {
      __typename?: "Album";
      _id: string;
      title: string;
      releaseDate: string;
    };
  } | null;
};

export type EditAlbumMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  releaseDate?: InputMaybe<Scalars["String"]["input"]>;
  genre?: InputMaybe<MusicGenre>;
  songs?: InputMaybe<
    Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
  >;
  artistId?: InputMaybe<Scalars["String"]["input"]>;
  companyId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type EditAlbumMutation = {
  __typename?: "Mutation";
  editAlbum?: {
    __typename?: "Album";
    _id: string;
    title: string;
    releaseDate: string;
    genre: MusicGenre;
    artist: { __typename?: "Artist"; _id: string; name: string };
    recordCompany: { __typename?: "RecordCompany"; _id: string; name: string };
    songs: Array<{
      __typename?: "Song";
      _id: string;
      title: string;
      duration: string;
      album: { __typename?: "Album"; _id: string; title: string };
    }>;
  } | null;
};

export type EditArtistMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  dateFormed?: InputMaybe<Scalars["String"]["input"]>;
  members?: InputMaybe<
    Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
  >;
}>;

export type EditArtistMutation = {
  __typename?: "Mutation";
  editArtist?: {
    __typename?: "Artist";
    _id: string;
    name: string;
    dateFormed: string;
    members: Array<string>;
  } | null;
};

export type EditCompanyMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  foundedYear?: InputMaybe<Scalars["Int"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type EditCompanyMutation = {
  __typename?: "Mutation";
  editCompany?: {
    __typename?: "RecordCompany";
    _id: string;
    name: string;
    foundedYear: number;
    country?: string | null;
    numOfAlbums?: number | null;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null;
};

export type EditSongMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  duration?: InputMaybe<Scalars["String"]["input"]>;
  albumId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type EditSongMutation = {
  __typename?: "Mutation";
  editSong?: {
    __typename?: "Song";
    _id: string;
    title: string;
    duration: string;
    album: {
      __typename?: "Album";
      _id: string;
      title: string;
      artist: { __typename?: "Artist"; _id: string; name: string };
      recordCompany: {
        __typename?: "RecordCompany";
        _id: string;
        name: string;
      };
    };
  } | null;
};

export type RemoveAlbumMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveAlbumMutation = {
  __typename?: "Mutation";
  removeAlbum?: {
    __typename?: "Album";
    _id: string;
    title: string;
    artist: { __typename?: "Artist"; _id: string; name: string };
    recordCompany: { __typename?: "RecordCompany"; _id: string; name: string };
    songs: Array<{ __typename?: "Song"; _id: string; title: string }>;
  } | null;
};

export type RemoveArtistMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveArtistMutation = {
  __typename?: "Mutation";
  removeArtist?: { __typename?: "Artist"; _id: string; name: string } | null;
};

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveCompanyMutation = {
  __typename?: "Mutation";
  removeCompany?: {
    __typename?: "RecordCompany";
    _id: string;
    name: string;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null;
};

export type RemoveSongMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveSongMutation = {
  __typename?: "Mutation";
  removeSong?: {
    __typename?: "Song";
    _id: string;
    title: string;
    duration: string;
    album: {
      __typename?: "Album";
      _id: string;
      title: string;
      releaseDate: string;
    };
  } | null;
};

export type AlbumsQueryVariables = Exact<{ [key: string]: never }>;

export type AlbumsQuery = {
  __typename?: "Query";
  albums?: Array<{
    __typename?: "Album";
    _id: string;
    title: string;
    releaseDate: string;
    genre: MusicGenre;
    artist: { __typename?: "Artist"; _id: string; name: string };
    recordCompany: { __typename?: "RecordCompany"; _id: string; name: string };
    songs: Array<{ __typename?: "Song"; _id: string; title: string }>;
  } | null> | null;
};

export type AlbumsByGenreQueryVariables = Exact<{
  genre: MusicGenre;
}>;

export type AlbumsByGenreQuery = {
  __typename?: "Query";
  albumsByGenre?: Array<{
    __typename?: "Album";
    _id: string;
    title: string;
    releaseDate: string;
    genre: MusicGenre;
    artist: { __typename?: "Artist"; _id: string; name: string };
    recordCompany: { __typename?: "RecordCompany"; _id: string; name: string };
    songs: Array<{
      __typename?: "Song";
      _id: string;
      title: string;
      duration: string;
    }>;
  } | null> | null;
};

export type ArtistsQueryVariables = Exact<{ [key: string]: never }>;

export type ArtistsQuery = {
  __typename?: "Query";
  artists?: Array<{
    __typename?: "Artist";
    _id: string;
    name: string;
    dateFormed: string;
    members: Array<string>;
    numOfAlbums?: number | null;
  } | null> | null;
};

export type CompanyByFoundedYearQueryVariables = Exact<{
  min: Scalars["Int"]["input"];
  max: Scalars["Int"]["input"];
}>;

export type CompanyByFoundedYearQuery = {
  __typename?: "Query";
  companyByFoundedYear?: Array<{
    __typename?: "RecordCompany";
    _id: string;
    name: string;
    foundedYear: number;
    country?: string | null;
    numOfAlbums?: number | null;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null> | null;
};

export type GetAlbumByIdQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetAlbumByIdQuery = {
  __typename?: "Query";
  getAlbumById?: {
    __typename?: "Album";
    _id: string;
    title: string;
    releaseDate: string;
    genre: MusicGenre;
    artist: {
      __typename?: "Artist";
      _id: string;
      name: string;
      dateFormed: string;
      members: Array<string>;
    };
    recordCompany: {
      __typename?: "RecordCompany";
      _id: string;
      name: string;
      foundedYear: number;
      country?: string | null;
    };
    songs: Array<{
      __typename?: "Song";
      _id: string;
      title: string;
      duration: string;
      album: { __typename?: "Album"; _id: string; title: string };
    }>;
  } | null;
};

export type GetArtistByIdQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetArtistByIdQuery = {
  __typename?: "Query";
  getArtistById?: {
    __typename?: "Artist";
    _id: string;
    name: string;
    dateFormed: string;
    members: Array<string>;
    numOfAlbums?: number | null;
    albums: Array<{
      __typename?: "Album";
      _id: string;
      title: string;
      genre: MusicGenre;
      releaseDate: string;
    }>;
  } | null;
};

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetCompanyByIdQuery = {
  __typename?: "Query";
  getCompanyById?: {
    __typename?: "RecordCompany";
    _id: string;
    name: string;
    foundedYear: number;
    country?: string | null;
    numOfAlbums?: number | null;
    albums: Array<{
      __typename?: "Album";
      _id: string;
      title: string;
      genre: MusicGenre;
      releaseDate: string;
      artist: { __typename?: "Artist"; _id: string; name: string };
      songs: Array<{ __typename?: "Song"; _id: string; title: string }>;
    }>;
  } | null;
};

export type GetSongByIdQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetSongByIdQuery = {
  __typename?: "Query";
  getSongById?: {
    __typename?: "Song";
    _id: string;
    title: string;
    duration: string;
    album: {
      __typename?: "Album";
      _id: string;
      title: string;
      releaseDate: string;
      genre: MusicGenre;
      artist: { __typename?: "Artist"; _id: string; name: string };
      recordCompany: {
        __typename?: "RecordCompany";
        _id: string;
        name: string;
      };
    };
  } | null;
};

export type GetSongsByArtistIdQueryVariables = Exact<{
  artistId: Scalars["String"]["input"];
}>;

export type GetSongsByArtistIdQuery = {
  __typename?: "Query";
  getSongsByArtistId?: Array<{
    __typename?: "Song";
    _id: string;
    title: string;
    duration: string;
    album: {
      __typename?: "Album";
      _id: string;
      title: string;
      genre: MusicGenre;
      releaseDate: string;
      recordCompany: {
        __typename?: "RecordCompany";
        _id: string;
        name: string;
      };
    };
  } | null> | null;
};

export type RecordCompaniesQueryVariables = Exact<{ [key: string]: never }>;

export type RecordCompaniesQuery = {
  __typename?: "Query";
  recordCompanies?: Array<{
    __typename?: "RecordCompany";
    _id: string;
    name: string;
    foundedYear: number;
    country?: string | null;
    numOfAlbums?: number | null;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null> | null;
};

export type SearchArtistByArtistNameQueryVariables = Exact<{
  searchTerm: Scalars["String"]["input"];
}>;

export type SearchArtistByArtistNameQuery = {
  __typename?: "Query";
  searchArtistByArtistName?: Array<{
    __typename?: "Artist";
    _id: string;
    name: string;
    dateFormed: string;
    members: Array<string>;
    numOfAlbums?: number | null;
    albums: Array<{ __typename?: "Album"; _id: string; title: string }>;
  } | null> | null;
};

export type SearchSongByTitleQueryVariables = Exact<{
  searchTitleTerm: Scalars["String"]["input"];
}>;

export type SearchSongByTitleQuery = {
  __typename?: "Query";
  searchSongByTitle?: Array<{
    __typename?: "Song";
    _id: string;
    title: string;
    duration: string;
    album: {
      __typename?: "Album";
      _id: string;
      title: string;
      releaseDate: string;
    };
  } | null> | null;
};

export const AddAlbumDocument = gql`
  mutation AddAlbum(
    $title: String!
    $releaseDate: String!
    $genre: MusicGenre!
    $artistId: String!
    $companyId: String!
  ) {
    addAlbum(
      title: $title
      releaseDate: $releaseDate
      genre: $genre
      artistId: $artistId
      companyId: $companyId
    ) {
      _id
      title
      artist {
        name
        _id
      }
      recordCompany {
        _id
        name
      }
      releaseDate
      genre
      songs {
        _id
      }
    }
  }
`;
export type AddAlbumMutationFn = Apollo.MutationFunction<
  AddAlbumMutation,
  AddAlbumMutationVariables
>;

/**
 * __useAddAlbumMutation__
 *
 * To run a mutation, you first call `useAddAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAlbumMutation, { data, loading, error }] = useAddAlbumMutation({
 *   variables: {
 *      title: // value for 'title'
 *      releaseDate: // value for 'releaseDate'
 *      genre: // value for 'genre'
 *      artistId: // value for 'artistId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useAddAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddAlbumMutation,
    AddAlbumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddAlbumMutation, AddAlbumMutationVariables>(
    AddAlbumDocument,
    options
  );
}
export type AddAlbumMutationHookResult = ReturnType<typeof useAddAlbumMutation>;
export type AddAlbumMutationResult = Apollo.MutationResult<AddAlbumMutation>;
export type AddAlbumMutationOptions = Apollo.BaseMutationOptions<
  AddAlbumMutation,
  AddAlbumMutationVariables
>;
export const AddArtistDocument = gql`
  mutation AddArtist(
    $name: String!
    $dateFormed: String!
    $members: [String!]!
  ) {
    addArtist(name: $name, date_formed: $dateFormed, members: $members) {
      _id
      name
      dateFormed
      members
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;
export type AddArtistMutationFn = Apollo.MutationFunction<
  AddArtistMutation,
  AddArtistMutationVariables
>;

/**
 * __useAddArtistMutation__
 *
 * To run a mutation, you first call `useAddArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addArtistMutation, { data, loading, error }] = useAddArtistMutation({
 *   variables: {
 *      name: // value for 'name'
 *      dateFormed: // value for 'dateFormed'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useAddArtistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddArtistMutation,
    AddArtistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddArtistMutation, AddArtistMutationVariables>(
    AddArtistDocument,
    options
  );
}
export type AddArtistMutationHookResult = ReturnType<
  typeof useAddArtistMutation
>;
export type AddArtistMutationResult = Apollo.MutationResult<AddArtistMutation>;
export type AddArtistMutationOptions = Apollo.BaseMutationOptions<
  AddArtistMutation,
  AddArtistMutationVariables
>;
export const AddCompanyDocument = gql`
  mutation AddCompany($name: String!, $foundedYear: Int!, $country: String!) {
    addCompany(name: $name, founded_year: $foundedYear, country: $country) {
      _id
      name
      foundedYear
      country
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;
export type AddCompanyMutationFn = Apollo.MutationFunction<
  AddCompanyMutation,
  AddCompanyMutationVariables
>;

/**
 * __useAddCompanyMutation__
 *
 * To run a mutation, you first call `useAddCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCompanyMutation, { data, loading, error }] = useAddCompanyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      foundedYear: // value for 'foundedYear'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useAddCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCompanyMutation,
    AddCompanyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCompanyMutation, AddCompanyMutationVariables>(
    AddCompanyDocument,
    options
  );
}
export type AddCompanyMutationHookResult = ReturnType<
  typeof useAddCompanyMutation
>;
export type AddCompanyMutationResult =
  Apollo.MutationResult<AddCompanyMutation>;
export type AddCompanyMutationOptions = Apollo.BaseMutationOptions<
  AddCompanyMutation,
  AddCompanyMutationVariables
>;
export const AddSongDocument = gql`
  mutation AddSong($title: String!, $duration: String!, $albumId: String!) {
    addSong(title: $title, duration: $duration, albumId: $albumId) {
      _id
      title
      duration
      album {
        _id
        title
        releaseDate
      }
    }
  }
`;
export type AddSongMutationFn = Apollo.MutationFunction<
  AddSongMutation,
  AddSongMutationVariables
>;

/**
 * __useAddSongMutation__
 *
 * To run a mutation, you first call `useAddSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSongMutation, { data, loading, error }] = useAddSongMutation({
 *   variables: {
 *      title: // value for 'title'
 *      duration: // value for 'duration'
 *      albumId: // value for 'albumId'
 *   },
 * });
 */
export function useAddSongMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSongMutation,
    AddSongMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddSongMutation, AddSongMutationVariables>(
    AddSongDocument,
    options
  );
}
export type AddSongMutationHookResult = ReturnType<typeof useAddSongMutation>;
export type AddSongMutationResult = Apollo.MutationResult<AddSongMutation>;
export type AddSongMutationOptions = Apollo.BaseMutationOptions<
  AddSongMutation,
  AddSongMutationVariables
>;
export const EditAlbumDocument = gql`
  mutation EditAlbum(
    $id: String!
    $title: String
    $releaseDate: String
    $genre: MusicGenre
    $songs: [String!]
    $artistId: String
    $companyId: String
  ) {
    editAlbum(
      _id: $id
      title: $title
      releaseDate: $releaseDate
      genre: $genre
      songs: $songs
      artistId: $artistId
      companyId: $companyId
    ) {
      _id
      title
      releaseDate
      genre
      artist {
        _id
        name
      }
      recordCompany {
        _id
        name
      }
      songs {
        _id
        title
        duration
        album {
          _id
          title
        }
      }
    }
  }
`;
export type EditAlbumMutationFn = Apollo.MutationFunction<
  EditAlbumMutation,
  EditAlbumMutationVariables
>;

/**
 * __useEditAlbumMutation__
 *
 * To run a mutation, you first call `useEditAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAlbumMutation, { data, loading, error }] = useEditAlbumMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      releaseDate: // value for 'releaseDate'
 *      genre: // value for 'genre'
 *      songs: // value for 'songs'
 *      artistId: // value for 'artistId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useEditAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditAlbumMutation,
    EditAlbumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditAlbumMutation, EditAlbumMutationVariables>(
    EditAlbumDocument,
    options
  );
}
export type EditAlbumMutationHookResult = ReturnType<
  typeof useEditAlbumMutation
>;
export type EditAlbumMutationResult = Apollo.MutationResult<EditAlbumMutation>;
export type EditAlbumMutationOptions = Apollo.BaseMutationOptions<
  EditAlbumMutation,
  EditAlbumMutationVariables
>;
export const EditArtistDocument = gql`
  mutation EditArtist(
    $id: String!
    $name: String
    $dateFormed: String
    $members: [String!]
  ) {
    editArtist(
      _id: $id
      name: $name
      date_formed: $dateFormed
      members: $members
    ) {
      _id
      name
      dateFormed
      members
    }
  }
`;
export type EditArtistMutationFn = Apollo.MutationFunction<
  EditArtistMutation,
  EditArtistMutationVariables
>;

/**
 * __useEditArtistMutation__
 *
 * To run a mutation, you first call `useEditArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editArtistMutation, { data, loading, error }] = useEditArtistMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      dateFormed: // value for 'dateFormed'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useEditArtistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditArtistMutation,
    EditArtistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditArtistMutation, EditArtistMutationVariables>(
    EditArtistDocument,
    options
  );
}
export type EditArtistMutationHookResult = ReturnType<
  typeof useEditArtistMutation
>;
export type EditArtistMutationResult =
  Apollo.MutationResult<EditArtistMutation>;
export type EditArtistMutationOptions = Apollo.BaseMutationOptions<
  EditArtistMutation,
  EditArtistMutationVariables
>;
export const EditCompanyDocument = gql`
  mutation EditCompany(
    $id: String!
    $name: String
    $foundedYear: Int
    $country: String
  ) {
    editCompany(
      _id: $id
      name: $name
      founded_year: $foundedYear
      country: $country
    ) {
      _id
      name
      foundedYear
      country
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;
export type EditCompanyMutationFn = Apollo.MutationFunction<
  EditCompanyMutation,
  EditCompanyMutationVariables
>;

/**
 * __useEditCompanyMutation__
 *
 * To run a mutation, you first call `useEditCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCompanyMutation, { data, loading, error }] = useEditCompanyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      foundedYear: // value for 'foundedYear'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useEditCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditCompanyMutation,
    EditCompanyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditCompanyMutation, EditCompanyMutationVariables>(
    EditCompanyDocument,
    options
  );
}
export type EditCompanyMutationHookResult = ReturnType<
  typeof useEditCompanyMutation
>;
export type EditCompanyMutationResult =
  Apollo.MutationResult<EditCompanyMutation>;
export type EditCompanyMutationOptions = Apollo.BaseMutationOptions<
  EditCompanyMutation,
  EditCompanyMutationVariables
>;
export const EditSongDocument = gql`
  mutation EditSong(
    $id: String!
    $title: String
    $duration: String
    $albumId: String
  ) {
    editSong(_id: $id, title: $title, duration: $duration, albumId: $albumId) {
      _id
      title
      duration
      album {
        _id
        title
        artist {
          _id
          name
        }
        recordCompany {
          _id
          name
        }
      }
    }
  }
`;
export type EditSongMutationFn = Apollo.MutationFunction<
  EditSongMutation,
  EditSongMutationVariables
>;

/**
 * __useEditSongMutation__
 *
 * To run a mutation, you first call `useEditSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSongMutation, { data, loading, error }] = useEditSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      duration: // value for 'duration'
 *      albumId: // value for 'albumId'
 *   },
 * });
 */
export function useEditSongMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditSongMutation,
    EditSongMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditSongMutation, EditSongMutationVariables>(
    EditSongDocument,
    options
  );
}
export type EditSongMutationHookResult = ReturnType<typeof useEditSongMutation>;
export type EditSongMutationResult = Apollo.MutationResult<EditSongMutation>;
export type EditSongMutationOptions = Apollo.BaseMutationOptions<
  EditSongMutation,
  EditSongMutationVariables
>;
export const RemoveAlbumDocument = gql`
  mutation RemoveAlbum($id: String!) {
    removeAlbum(_id: $id) {
      _id
      artist {
        _id
        name
      }
      recordCompany {
        _id
        name
      }
      songs {
        _id
        title
      }
      title
    }
  }
`;
export type RemoveAlbumMutationFn = Apollo.MutationFunction<
  RemoveAlbumMutation,
  RemoveAlbumMutationVariables
>;

/**
 * __useRemoveAlbumMutation__
 *
 * To run a mutation, you first call `useRemoveAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAlbumMutation, { data, loading, error }] = useRemoveAlbumMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveAlbumMutation,
    RemoveAlbumMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveAlbumMutation, RemoveAlbumMutationVariables>(
    RemoveAlbumDocument,
    options
  );
}
export type RemoveAlbumMutationHookResult = ReturnType<
  typeof useRemoveAlbumMutation
>;
export type RemoveAlbumMutationResult =
  Apollo.MutationResult<RemoveAlbumMutation>;
export type RemoveAlbumMutationOptions = Apollo.BaseMutationOptions<
  RemoveAlbumMutation,
  RemoveAlbumMutationVariables
>;
export const RemoveArtistDocument = gql`
  mutation RemoveArtist($id: String!) {
    removeArtist(_id: $id) {
      _id
      name
    }
  }
`;
export type RemoveArtistMutationFn = Apollo.MutationFunction<
  RemoveArtistMutation,
  RemoveArtistMutationVariables
>;

/**
 * __useRemoveArtistMutation__
 *
 * To run a mutation, you first call `useRemoveArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeArtistMutation, { data, loading, error }] = useRemoveArtistMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveArtistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveArtistMutation,
    RemoveArtistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveArtistMutation,
    RemoveArtistMutationVariables
  >(RemoveArtistDocument, options);
}
export type RemoveArtistMutationHookResult = ReturnType<
  typeof useRemoveArtistMutation
>;
export type RemoveArtistMutationResult =
  Apollo.MutationResult<RemoveArtistMutation>;
export type RemoveArtistMutationOptions = Apollo.BaseMutationOptions<
  RemoveArtistMutation,
  RemoveArtistMutationVariables
>;
export const RemoveCompanyDocument = gql`
  mutation RemoveCompany($id: String!) {
    removeCompany(_id: $id) {
      _id
      name
      albums {
        _id
        title
      }
    }
  }
`;
export type RemoveCompanyMutationFn = Apollo.MutationFunction<
  RemoveCompanyMutation,
  RemoveCompanyMutationVariables
>;

/**
 * __useRemoveCompanyMutation__
 *
 * To run a mutation, you first call `useRemoveCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCompanyMutation, { data, loading, error }] = useRemoveCompanyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCompanyMutation,
    RemoveCompanyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveCompanyMutation,
    RemoveCompanyMutationVariables
  >(RemoveCompanyDocument, options);
}
export type RemoveCompanyMutationHookResult = ReturnType<
  typeof useRemoveCompanyMutation
>;
export type RemoveCompanyMutationResult =
  Apollo.MutationResult<RemoveCompanyMutation>;
export type RemoveCompanyMutationOptions = Apollo.BaseMutationOptions<
  RemoveCompanyMutation,
  RemoveCompanyMutationVariables
>;
export const RemoveSongDocument = gql`
  mutation RemoveSong($id: String!) {
    removeSong(_id: $id) {
      _id
      title
      duration
      album {
        _id
        title
        releaseDate
      }
    }
  }
`;
export type RemoveSongMutationFn = Apollo.MutationFunction<
  RemoveSongMutation,
  RemoveSongMutationVariables
>;

/**
 * __useRemoveSongMutation__
 *
 * To run a mutation, you first call `useRemoveSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSongMutation, { data, loading, error }] = useRemoveSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSongMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveSongMutation,
    RemoveSongMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveSongMutation, RemoveSongMutationVariables>(
    RemoveSongDocument,
    options
  );
}
export type RemoveSongMutationHookResult = ReturnType<
  typeof useRemoveSongMutation
>;
export type RemoveSongMutationResult =
  Apollo.MutationResult<RemoveSongMutation>;
export type RemoveSongMutationOptions = Apollo.BaseMutationOptions<
  RemoveSongMutation,
  RemoveSongMutationVariables
>;
export const AlbumsDocument = gql`
  query Albums {
    albums {
      _id
      title
      releaseDate
      genre
      artist {
        _id
        name
      }
      recordCompany {
        _id
        name
      }
      songs {
        _id
        title
      }
    }
  }
`;

/**
 * __useAlbumsQuery__
 *
 * To run a query within a React component, call `useAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlbumsQuery(
  baseOptions?: Apollo.QueryHookOptions<AlbumsQuery, AlbumsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AlbumsQuery, AlbumsQueryVariables>(
    AlbumsDocument,
    options
  );
}
export function useAlbumsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AlbumsQuery, AlbumsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AlbumsQuery, AlbumsQueryVariables>(
    AlbumsDocument,
    options
  );
}
export function useAlbumsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AlbumsQuery, AlbumsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AlbumsQuery, AlbumsQueryVariables>(
    AlbumsDocument,
    options
  );
}
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>;
export type AlbumsLazyQueryHookResult = ReturnType<typeof useAlbumsLazyQuery>;
export type AlbumsSuspenseQueryHookResult = ReturnType<
  typeof useAlbumsSuspenseQuery
>;
export type AlbumsQueryResult = Apollo.QueryResult<
  AlbumsQuery,
  AlbumsQueryVariables
>;
export const AlbumsByGenreDocument = gql`
  query AlbumsByGenre($genre: MusicGenre!) {
    albumsByGenre(genre: $genre) {
      _id
      title
      releaseDate
      genre
      artist {
        _id
        name
      }
      recordCompany {
        _id
        name
      }
      songs {
        _id
        title
        duration
      }
    }
  }
`;

/**
 * __useAlbumsByGenreQuery__
 *
 * To run a query within a React component, call `useAlbumsByGenreQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumsByGenreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumsByGenreQuery({
 *   variables: {
 *      genre: // value for 'genre'
 *   },
 * });
 */
export function useAlbumsByGenreQuery(
  baseOptions: Apollo.QueryHookOptions<
    AlbumsByGenreQuery,
    AlbumsByGenreQueryVariables
  > &
    (
      | { variables: AlbumsByGenreQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AlbumsByGenreQuery, AlbumsByGenreQueryVariables>(
    AlbumsByGenreDocument,
    options
  );
}
export function useAlbumsByGenreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AlbumsByGenreQuery,
    AlbumsByGenreQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AlbumsByGenreQuery, AlbumsByGenreQueryVariables>(
    AlbumsByGenreDocument,
    options
  );
}
export function useAlbumsByGenreSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AlbumsByGenreQuery,
        AlbumsByGenreQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AlbumsByGenreQuery,
    AlbumsByGenreQueryVariables
  >(AlbumsByGenreDocument, options);
}
export type AlbumsByGenreQueryHookResult = ReturnType<
  typeof useAlbumsByGenreQuery
>;
export type AlbumsByGenreLazyQueryHookResult = ReturnType<
  typeof useAlbumsByGenreLazyQuery
>;
export type AlbumsByGenreSuspenseQueryHookResult = ReturnType<
  typeof useAlbumsByGenreSuspenseQuery
>;
export type AlbumsByGenreQueryResult = Apollo.QueryResult<
  AlbumsByGenreQuery,
  AlbumsByGenreQueryVariables
>;
export const ArtistsDocument = gql`
  query Artists {
    artists {
      _id
      name
      dateFormed
      members
      numOfAlbums
    }
  }
`;

/**
 * __useArtistsQuery__
 *
 * To run a query within a React component, call `useArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistsQuery(
  baseOptions?: Apollo.QueryHookOptions<ArtistsQuery, ArtistsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ArtistsQuery, ArtistsQueryVariables>(
    ArtistsDocument,
    options
  );
}
export function useArtistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ArtistsQuery, ArtistsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ArtistsQuery, ArtistsQueryVariables>(
    ArtistsDocument,
    options
  );
}
export function useArtistsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ArtistsQuery, ArtistsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ArtistsQuery, ArtistsQueryVariables>(
    ArtistsDocument,
    options
  );
}
export type ArtistsQueryHookResult = ReturnType<typeof useArtistsQuery>;
export type ArtistsLazyQueryHookResult = ReturnType<typeof useArtistsLazyQuery>;
export type ArtistsSuspenseQueryHookResult = ReturnType<
  typeof useArtistsSuspenseQuery
>;
export type ArtistsQueryResult = Apollo.QueryResult<
  ArtistsQuery,
  ArtistsQueryVariables
>;
export const CompanyByFoundedYearDocument = gql`
  query CompanyByFoundedYear($min: Int!, $max: Int!) {
    companyByFoundedYear(min: $min, max: $max) {
      _id
      name
      foundedYear
      country
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;

/**
 * __useCompanyByFoundedYearQuery__
 *
 * To run a query within a React component, call `useCompanyByFoundedYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyByFoundedYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyByFoundedYearQuery({
 *   variables: {
 *      min: // value for 'min'
 *      max: // value for 'max'
 *   },
 * });
 */
export function useCompanyByFoundedYearQuery(
  baseOptions: Apollo.QueryHookOptions<
    CompanyByFoundedYearQuery,
    CompanyByFoundedYearQueryVariables
  > &
    (
      | { variables: CompanyByFoundedYearQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CompanyByFoundedYearQuery,
    CompanyByFoundedYearQueryVariables
  >(CompanyByFoundedYearDocument, options);
}
export function useCompanyByFoundedYearLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompanyByFoundedYearQuery,
    CompanyByFoundedYearQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CompanyByFoundedYearQuery,
    CompanyByFoundedYearQueryVariables
  >(CompanyByFoundedYearDocument, options);
}
export function useCompanyByFoundedYearSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        CompanyByFoundedYearQuery,
        CompanyByFoundedYearQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CompanyByFoundedYearQuery,
    CompanyByFoundedYearQueryVariables
  >(CompanyByFoundedYearDocument, options);
}
export type CompanyByFoundedYearQueryHookResult = ReturnType<
  typeof useCompanyByFoundedYearQuery
>;
export type CompanyByFoundedYearLazyQueryHookResult = ReturnType<
  typeof useCompanyByFoundedYearLazyQuery
>;
export type CompanyByFoundedYearSuspenseQueryHookResult = ReturnType<
  typeof useCompanyByFoundedYearSuspenseQuery
>;
export type CompanyByFoundedYearQueryResult = Apollo.QueryResult<
  CompanyByFoundedYearQuery,
  CompanyByFoundedYearQueryVariables
>;
export const GetAlbumByIdDocument = gql`
  query GetAlbumById($id: String!) {
    getAlbumById(_id: $id) {
      _id
      title
      releaseDate
      genre
      artist {
        _id
        name
        dateFormed
        members
      }
      recordCompany {
        _id
        name
        foundedYear
        country
      }
      songs {
        _id
        title
        duration
        album {
          _id
          title
        }
      }
    }
  }
`;

/**
 * __useGetAlbumByIdQuery__
 *
 * To run a query within a React component, call `useGetAlbumByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAlbumByIdQuery,
    GetAlbumByIdQueryVariables
  > &
    (
      | { variables: GetAlbumByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAlbumByIdQuery, GetAlbumByIdQueryVariables>(
    GetAlbumByIdDocument,
    options
  );
}
export function useGetAlbumByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAlbumByIdQuery,
    GetAlbumByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAlbumByIdQuery, GetAlbumByIdQueryVariables>(
    GetAlbumByIdDocument,
    options
  );
}
export function useGetAlbumByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAlbumByIdQuery,
        GetAlbumByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAlbumByIdQuery, GetAlbumByIdQueryVariables>(
    GetAlbumByIdDocument,
    options
  );
}
export type GetAlbumByIdQueryHookResult = ReturnType<
  typeof useGetAlbumByIdQuery
>;
export type GetAlbumByIdLazyQueryHookResult = ReturnType<
  typeof useGetAlbumByIdLazyQuery
>;
export type GetAlbumByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetAlbumByIdSuspenseQuery
>;
export type GetAlbumByIdQueryResult = Apollo.QueryResult<
  GetAlbumByIdQuery,
  GetAlbumByIdQueryVariables
>;
export const GetArtistByIdDocument = gql`
  query GetArtistById($id: String!) {
    getArtistById(_id: $id) {
      _id
      name
      dateFormed
      members
      numOfAlbums
      albums {
        _id
        title
        genre
        releaseDate
      }
    }
  }
`;

/**
 * __useGetArtistByIdQuery__
 *
 * To run a query within a React component, call `useGetArtistByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArtistByIdQuery,
    GetArtistByIdQueryVariables
  > &
    (
      | { variables: GetArtistByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetArtistByIdQuery, GetArtistByIdQueryVariables>(
    GetArtistByIdDocument,
    options
  );
}
export function useGetArtistByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArtistByIdQuery,
    GetArtistByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetArtistByIdQuery, GetArtistByIdQueryVariables>(
    GetArtistByIdDocument,
    options
  );
}
export function useGetArtistByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetArtistByIdQuery,
        GetArtistByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetArtistByIdQuery,
    GetArtistByIdQueryVariables
  >(GetArtistByIdDocument, options);
}
export type GetArtistByIdQueryHookResult = ReturnType<
  typeof useGetArtistByIdQuery
>;
export type GetArtistByIdLazyQueryHookResult = ReturnType<
  typeof useGetArtistByIdLazyQuery
>;
export type GetArtistByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetArtistByIdSuspenseQuery
>;
export type GetArtistByIdQueryResult = Apollo.QueryResult<
  GetArtistByIdQuery,
  GetArtistByIdQueryVariables
>;
export const GetCompanyByIdDocument = gql`
  query GetCompanyById($id: String!) {
    getCompanyById(_id: $id) {
      _id
      name
      foundedYear
      country
      numOfAlbums
      albums {
        _id
        title
        genre
        releaseDate
        artist {
          _id
          name
        }
        songs {
          _id
          title
        }
      }
    }
  }
`;

/**
 * __useGetCompanyByIdQuery__
 *
 * To run a query within a React component, call `useGetCompanyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompanyByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyByIdQuery,
    GetCompanyByIdQueryVariables
  > &
    (
      | { variables: GetCompanyByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>(
    GetCompanyByIdDocument,
    options
  );
}
export function useGetCompanyByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyByIdQuery,
    GetCompanyByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>(
    GetCompanyByIdDocument,
    options
  );
}
export function useGetCompanyByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCompanyByIdQuery,
        GetCompanyByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCompanyByIdQuery,
    GetCompanyByIdQueryVariables
  >(GetCompanyByIdDocument, options);
}
export type GetCompanyByIdQueryHookResult = ReturnType<
  typeof useGetCompanyByIdQuery
>;
export type GetCompanyByIdLazyQueryHookResult = ReturnType<
  typeof useGetCompanyByIdLazyQuery
>;
export type GetCompanyByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetCompanyByIdSuspenseQuery
>;
export type GetCompanyByIdQueryResult = Apollo.QueryResult<
  GetCompanyByIdQuery,
  GetCompanyByIdQueryVariables
>;
export const GetSongByIdDocument = gql`
  query GetSongById($id: String!) {
    getSongById(_id: $id) {
      _id
      title
      duration
      album {
        _id
        title
        releaseDate
        genre
        artist {
          _id
          name
        }
        recordCompany {
          _id
          name
        }
      }
    }
  }
`;

/**
 * __useGetSongByIdQuery__
 *
 * To run a query within a React component, call `useGetSongByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSongByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSongByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSongByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSongByIdQuery,
    GetSongByIdQueryVariables
  > &
    (
      | { variables: GetSongByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSongByIdQuery, GetSongByIdQueryVariables>(
    GetSongByIdDocument,
    options
  );
}
export function useGetSongByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSongByIdQuery,
    GetSongByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSongByIdQuery, GetSongByIdQueryVariables>(
    GetSongByIdDocument,
    options
  );
}
export function useGetSongByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSongByIdQuery,
        GetSongByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetSongByIdQuery, GetSongByIdQueryVariables>(
    GetSongByIdDocument,
    options
  );
}
export type GetSongByIdQueryHookResult = ReturnType<typeof useGetSongByIdQuery>;
export type GetSongByIdLazyQueryHookResult = ReturnType<
  typeof useGetSongByIdLazyQuery
>;
export type GetSongByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetSongByIdSuspenseQuery
>;
export type GetSongByIdQueryResult = Apollo.QueryResult<
  GetSongByIdQuery,
  GetSongByIdQueryVariables
>;
export const GetSongsByArtistIdDocument = gql`
  query GetSongsByArtistId($artistId: String!) {
    getSongsByArtistId(artistId: $artistId) {
      _id
      title
      duration
      album {
        _id
        title
        genre
        releaseDate
        recordCompany {
          _id
          name
        }
      }
    }
  }
`;

/**
 * __useGetSongsByArtistIdQuery__
 *
 * To run a query within a React component, call `useGetSongsByArtistIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSongsByArtistIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSongsByArtistIdQuery({
 *   variables: {
 *      artistId: // value for 'artistId'
 *   },
 * });
 */
export function useGetSongsByArtistIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSongsByArtistIdQuery,
    GetSongsByArtistIdQueryVariables
  > &
    (
      | { variables: GetSongsByArtistIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSongsByArtistIdQuery,
    GetSongsByArtistIdQueryVariables
  >(GetSongsByArtistIdDocument, options);
}
export function useGetSongsByArtistIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSongsByArtistIdQuery,
    GetSongsByArtistIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSongsByArtistIdQuery,
    GetSongsByArtistIdQueryVariables
  >(GetSongsByArtistIdDocument, options);
}
export function useGetSongsByArtistIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSongsByArtistIdQuery,
        GetSongsByArtistIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSongsByArtistIdQuery,
    GetSongsByArtistIdQueryVariables
  >(GetSongsByArtistIdDocument, options);
}
export type GetSongsByArtistIdQueryHookResult = ReturnType<
  typeof useGetSongsByArtistIdQuery
>;
export type GetSongsByArtistIdLazyQueryHookResult = ReturnType<
  typeof useGetSongsByArtistIdLazyQuery
>;
export type GetSongsByArtistIdSuspenseQueryHookResult = ReturnType<
  typeof useGetSongsByArtistIdSuspenseQuery
>;
export type GetSongsByArtistIdQueryResult = Apollo.QueryResult<
  GetSongsByArtistIdQuery,
  GetSongsByArtistIdQueryVariables
>;
export const RecordCompaniesDocument = gql`
  query RecordCompanies {
    recordCompanies {
      _id
      name
      foundedYear
      country
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;

/**
 * __useRecordCompaniesQuery__
 *
 * To run a query within a React component, call `useRecordCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecordCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecordCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecordCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RecordCompaniesQuery,
    RecordCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RecordCompaniesQuery, RecordCompaniesQueryVariables>(
    RecordCompaniesDocument,
    options
  );
}
export function useRecordCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RecordCompaniesQuery,
    RecordCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RecordCompaniesQuery,
    RecordCompaniesQueryVariables
  >(RecordCompaniesDocument, options);
}
export function useRecordCompaniesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        RecordCompaniesQuery,
        RecordCompaniesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RecordCompaniesQuery,
    RecordCompaniesQueryVariables
  >(RecordCompaniesDocument, options);
}
export type RecordCompaniesQueryHookResult = ReturnType<
  typeof useRecordCompaniesQuery
>;
export type RecordCompaniesLazyQueryHookResult = ReturnType<
  typeof useRecordCompaniesLazyQuery
>;
export type RecordCompaniesSuspenseQueryHookResult = ReturnType<
  typeof useRecordCompaniesSuspenseQuery
>;
export type RecordCompaniesQueryResult = Apollo.QueryResult<
  RecordCompaniesQuery,
  RecordCompaniesQueryVariables
>;
export const SearchArtistByArtistNameDocument = gql`
  query SearchArtistByArtistName($searchTerm: String!) {
    searchArtistByArtistName(searchTerm: $searchTerm) {
      _id
      name
      dateFormed
      members
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;

/**
 * __useSearchArtistByArtistNameQuery__
 *
 * To run a query within a React component, call `useSearchArtistByArtistNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchArtistByArtistNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchArtistByArtistNameQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchArtistByArtistNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchArtistByArtistNameQuery,
    SearchArtistByArtistNameQueryVariables
  > &
    (
      | { variables: SearchArtistByArtistNameQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SearchArtistByArtistNameQuery,
    SearchArtistByArtistNameQueryVariables
  >(SearchArtistByArtistNameDocument, options);
}
export function useSearchArtistByArtistNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchArtistByArtistNameQuery,
    SearchArtistByArtistNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchArtistByArtistNameQuery,
    SearchArtistByArtistNameQueryVariables
  >(SearchArtistByArtistNameDocument, options);
}
export function useSearchArtistByArtistNameSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchArtistByArtistNameQuery,
        SearchArtistByArtistNameQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SearchArtistByArtistNameQuery,
    SearchArtistByArtistNameQueryVariables
  >(SearchArtistByArtistNameDocument, options);
}
export type SearchArtistByArtistNameQueryHookResult = ReturnType<
  typeof useSearchArtistByArtistNameQuery
>;
export type SearchArtistByArtistNameLazyQueryHookResult = ReturnType<
  typeof useSearchArtistByArtistNameLazyQuery
>;
export type SearchArtistByArtistNameSuspenseQueryHookResult = ReturnType<
  typeof useSearchArtistByArtistNameSuspenseQuery
>;
export type SearchArtistByArtistNameQueryResult = Apollo.QueryResult<
  SearchArtistByArtistNameQuery,
  SearchArtistByArtistNameQueryVariables
>;
export const SearchSongByTitleDocument = gql`
  query SearchSongByTitle($searchTitleTerm: String!) {
    searchSongByTitle(searchTitleTerm: $searchTitleTerm) {
      _id
      title
      duration
      album {
        _id
        title
        releaseDate
      }
    }
  }
`;

/**
 * __useSearchSongByTitleQuery__
 *
 * To run a query within a React component, call `useSearchSongByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSongByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSongByTitleQuery({
 *   variables: {
 *      searchTitleTerm: // value for 'searchTitleTerm'
 *   },
 * });
 */
export function useSearchSongByTitleQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchSongByTitleQuery,
    SearchSongByTitleQueryVariables
  > &
    (
      | { variables: SearchSongByTitleQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SearchSongByTitleQuery,
    SearchSongByTitleQueryVariables
  >(SearchSongByTitleDocument, options);
}
export function useSearchSongByTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchSongByTitleQuery,
    SearchSongByTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchSongByTitleQuery,
    SearchSongByTitleQueryVariables
  >(SearchSongByTitleDocument, options);
}
export function useSearchSongByTitleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchSongByTitleQuery,
        SearchSongByTitleQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SearchSongByTitleQuery,
    SearchSongByTitleQueryVariables
  >(SearchSongByTitleDocument, options);
}
export type SearchSongByTitleQueryHookResult = ReturnType<
  typeof useSearchSongByTitleQuery
>;
export type SearchSongByTitleLazyQueryHookResult = ReturnType<
  typeof useSearchSongByTitleLazyQuery
>;
export type SearchSongByTitleSuspenseQueryHookResult = ReturnType<
  typeof useSearchSongByTitleSuspenseQuery
>;
export type SearchSongByTitleQueryResult = Apollo.QueryResult<
  SearchSongByTitleQuery,
  SearchSongByTitleQueryVariables
>;
