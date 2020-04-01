const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  albums: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Album',
    }],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Artist', ArtistSchema);
