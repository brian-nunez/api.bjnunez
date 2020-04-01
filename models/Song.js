const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  songID: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
  },
  released: {
    type: Number,
    required: true,
  },
  explicit: {
    type: Boolean,
    default: false,
  },
  video: {
    url: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: [String],
      required: true,
    },
  },
  youtube: {
    type: String,
    required: false,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Song', SongSchema);
