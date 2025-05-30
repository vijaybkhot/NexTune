import { gql } from "@apollo/client";

const GET_ARTISTS = gql`
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

const EDIT_ARTIST = gql`
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
const ADD_ARTIST = gql`
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

const DELETE_ARTIST = gql`
  mutation RemoveArtist($id: String!) {
    removeArtist(_id: $id) {
      _id
      name
    }
  }
`;

const GET_ARTIST_BY_ID = gql`
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

const SEARCH_ARTIST_BY_NAME = gql`
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

const GET_SONGS_BY_ARTIST_ID = gql`
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

const GET_ALBUMS = gql`
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

const GET_ALBUM_BY_ID = gql`
  query GetAlbumById($id: String!) {
    getAlbumById(_id: $id) {
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

const ADD_ALBUM = gql`
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

const EDIT_ALBUM = gql`
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

const DELETE_ALBUM = gql`
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

const ALBUMS_BY_GENRE = gql`
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

const GET_COMPANIES = gql`
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
const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($id: String!) {
    getCompanyById(_id: $id) {
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

const ADD_COMPANY = gql`
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

const EDIT_COMPANY = gql`
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

const DELETE_COMPANY = gql`
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

const COMPANIES_BY_FOUNDED_YEAR = gql`
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

const ADD_SONG = gql`
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

const DELETE_SONG = gql`
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

const EDIT_SONG = gql`
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

const GET_SONG_BY_ID = gql`
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

const SEARCH_SONG_BY_TITLE = gql`
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

let exported = {
  GET_ARTISTS,
  EDIT_ARTIST,
  ADD_ARTIST,
  DELETE_ARTIST,
  GET_ARTIST_BY_ID,
  SEARCH_ARTIST_BY_NAME,
  GET_SONGS_BY_ARTIST_ID,
  GET_ALBUMS,
  GET_ALBUM_BY_ID,
  ADD_ALBUM,
  EDIT_ALBUM,
  DELETE_ALBUM,
  ALBUMS_BY_GENRE,
  GET_COMPANIES,
  GET_COMPANY_BY_ID,
  ADD_COMPANY,
  EDIT_COMPANY,
  DELETE_COMPANY,
  COMPANIES_BY_FOUNDED_YEAR,
  ADD_SONG,
  EDIT_SONG,
  DELETE_SONG,
  GET_SONG_BY_ID,
  SEARCH_SONG_BY_TITLE,
};

export default exported;
