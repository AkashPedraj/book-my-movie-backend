const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  wiki_url: String,
  profile_url: String,
  movies: [String],
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);
