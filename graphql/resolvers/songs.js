const Artist = require('../../models/Artist');
const Album = require('../../models/Album');
const Song = require('../../models/Song');

const addSong = async ({
  name,
  songID,
  length,
  artist,
  album,
  released,
  explicit,
  video,
  youtube,
}) => {
  try {
    const albumLookup = await Album.findById(album).populate('songs');
    if (!albumLookup) throw new Error('Album not found');
    const songIds = albumLookup._doc.songs.map(song => song.songID);
    if (songIds.includes(songID)) throw new Error('Song already exists');
    const song = new Song({
      name,
      songID,
      length,
      artist,
      album,
      released,
      explicit,
      video,
      youtube,
    });

    const savedSong = await song.save();
    albumLookup.songs.push(savedSong);
    await albumLookup.save();

    return savedSong;
  } catch (e) {
    throw e;
  }
};

const resolvers = {
  songs: async () => {
    const songs = await Song.find({}).populate('artist album');
    if (!songs) throw new Error('Songs not found');

    return songs;
  },

  createSong: async ({ songInput }) => {
    const { artist } = songInput;
    try {
      const artistLookup = await Artist.findById(artist);
      if (!artistLookup) throw new Error('Artist not found');

      const song = await addSong(songInput);
      return song;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = resolvers;
