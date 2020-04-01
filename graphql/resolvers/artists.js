const Artist = require('../../models/Artist');
const Album = require('../../models/Album');

const getAlbumSongs = albumId => {
  return Album.findById(albumId).populate('songs');
};

const resolvers = {
  artists: async ({
    handle,
  }) => {
    const query = {};
    if (handle) query.handle = handle;
    try {
      const artists = await Artist.find(query).populate('albums');
      if (!artists) throw new Error('Artist not found');
      return artists;
    } catch (e) {
      throw e;
    }
  },

  createArtist: async ({ artistInput }) => {
    const {
      name,
      handle,
      albums,
    } = artistInput;

    try {
      const artistLookup = await Artist.findOne({ handle });
      if (artistLookup) throw new Error('Artist already exists');
      const artist = new Artist({
        name,
        handle,
        albums,
      });

      const result = await artist.save();

      return result;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = resolvers;
