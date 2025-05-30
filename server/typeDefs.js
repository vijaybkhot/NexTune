export const typeDefs = `#graphql
type Query {
    artists: [Artist]
    getArtistById(_id: String!): Artist
    searchArtistByArtistName (searchTerm: String!): [Artist]
    recordCompanies: [RecordCompany]
    companyByFoundedYear (min: Int!, max: Int!) : [RecordCompany]
    getCompanyById(_id: String!): RecordCompany
    albums: [Album]
    getAlbumById(_id: String!): Album
    getSongsByArtistId(artistId: String!): [Song]
    albumsByGenre (genre: MusicGenre!): [Album]
    getSongById(_id: String!): Song
    getSongsByAlbumId(_id: String!): [Song]
    searchSongByTitle (searchTitleTerm: String!): [Song]
}

type Mutation {
  addArtist(name: String!, date_formed: String!, members: [String!]!): Artist
  editArtist(_id: String!, name: String, date_formed: String, members: [String!]): Artist
  removeArtist(_id: String!): Artist
  addCompany(name: String!, founded_year: Int!, country: String!): RecordCompany
  editCompany(_id: String!, name: String, founded_year: Int, country: String): RecordCompany
  removeCompany(_id: String!): RecordCompany
  addAlbum(title: String!, releaseDate: String!, genre: MusicGenre!, artistId: String!, companyId: String!): Album
  editAlbum(_id: String!, title: String, releaseDate: String, genre: MusicGenre, songs: [String!], artistId: String, companyId: String): Album
  removeAlbum(_id: String!): Album
  addSong(title: String!, duration: String!, albumId: String!): Song
  editSong(_id: String!, title: String, duration: String, albumId: String): Song
  removeSong(_id: String!): Song
}


type Artist {
  _id: String!
  name: String!
  dateFormed: String!
  members: [String!]!
  albums: [Album!]!
  numOfAlbums: Int
}

type Album {
  _id: String!
  title: String!
  releaseDate: String!
  genre: MusicGenre!
  artist: Artist!
  recordCompany: RecordCompany!
  songs: [Song!]!
}

type RecordCompany {
  _id: String!
  name: String!
  foundedYear: Int!
  country: String
  albums: [Album!]!
  numOfAlbums: Int
}


type Song { 
 _id: String! 
 title: String! 
 duration: String! 
 album: Album! 
}

enum MusicGenre {
  POP
  ROCK
  HIP_HOP
  COUNTRY
  JAZZ
  CLASSICAL
  ELECTRONIC
  R_AND_B
  INDIE
  ALTERNATIVE
}

`;
