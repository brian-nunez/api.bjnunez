const mongoose = require('mongoose');

const { Schema } = mongoose;

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },
  albumID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  released: {
    type: Number,
    required: true,
  },
  songLength: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  listenTime: {
    type: Number,
    required: true,
  },
  songs: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Song',
    }],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Album', AlbumSchema);
