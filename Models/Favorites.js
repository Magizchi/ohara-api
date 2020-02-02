const mongoose = require("mongoose");

const Favorites = new mongoose.Schema({
  user_id: { type: String },
  mal_id: { type: Number },
  url: { type: String },
  title: { type: String },
  image_url: { type: String },
  synopsis: { type: String },
  type: { type: String },
  airing_start: { type: String },
  episodes: { type: String },
  members: {
    type: Array,
    default: [
      {
        mal_id: { type: Number },
        type: { type: String },
        name: { type: String },
        url: { type: Number }
      }
    ]
  },
  source: { type: String },
  producers: { type: Array },
  score: { type: Number },
  licensors: { type: Array },
  r18: { type: Boolean },
  kids: { type: Boolean },
  continuing: { type: Boolean }
});

module.exports = mongoose.model("Favorite", Favorites);
