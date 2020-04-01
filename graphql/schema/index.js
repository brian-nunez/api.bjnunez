const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Artist {
    _id: ID!
    name: String!
    handle: String!
    albums: [Album]!
    date: String!
  }

  type Album {
    _id: ID!
    artist: Artist!
    albumID: String!
    name: String!
    released: Float!
    songLength: Int!
    cover: String!
    listenTime: Int!
    songs: [Song!]!
    date: String!
  }

  type Song {
    _id: ID!
    name: String!
    songID: String!
    length: Int!
    artist: Artist!
    album: Album!
    released: Float!
    explicit: Boolean!
    video: VideoData!
    youtube: String
    date: String!
  }

  type VideoData {
    url: [String!]!
    thumbnail: [String!]!
  }

  input VideoDataInput {
    url: [String!]!
    thumbnail: [String!]!
  }

  input SongInput {
    name: String!
    songID: String!
    length: Int!
    artist: ID!
    album: ID!
    released: Float!
    explicit: Boolean!
    video: VideoDataInput!
    youtube: String
  }

  input AlbumInput {
    artist: ID
    albumID: String!
    name: String!
    released: Float!
    songLength: Int!
    cover: String!
    listenTime: Int!
    songs: [SongInput!]!
  }

  input ArtistInput {
    name: String!
    handle: String!
    albums: [AlbumInput!]!
  }

  type RootQuery {
    artists(handle: String): [Artist]!
    albums(albumID: String): [Album!]!
    songs: [Song!]!
  }

  type RootMutation {
    createArtist(artistInput: ArtistInput): Artist
    createAlbum(albumInput: AlbumInput): Album
    createSong(songInput: SongInput): Song
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
