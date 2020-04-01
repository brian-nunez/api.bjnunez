const Artist = require('../../models/Artist');
const Album = require('../../models/Album');

const addAlbum = async ({
  artist,
  albumID,
  name,
  released,
  songLength,
  cover,
  listenTime,
  songs,
}) => {
  try {
    const artistLookup = await Artist.findById(artist).populate('albums');
    if (!artistLookup) throw new Error('Artist not found');
    const albumIds = artistLookup._doc.albums.map(album => album.albumID);
    if (albumIds.includes(albumID)) throw new Error('Album already exists');

    const album = new Album({
      artist,
      albumID,
      name,
      released,
      songLength,
      cover,
      listenTime,
      songs,
    });

    const savedAlbum = await album.save();
    artistLookup.albums.push(savedAlbum);
    artistLookup.save();

    return savedAlbum;
  } catch (e) {
    throw e;
  }
};

const resolvers = {
  albums: async ({
    albumID,
  }) => {
    const query = {};
    if (albumID) query.albumID = albumID;
    try {
      const albums = await Album.find(query).populate('songs');
      if (!albums) throw new Error('Albums not found!');
      return albums;
    } catch (e) {
      throw e;
    }
  },

  createAlbum: async ({ albumInput }) => {
    const { artist } = albumInput;
    try {
      const album = await addAlbum(albumInput);
      console.log(albumInput);

      return album;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = resolvers;
