const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = require('../config/db.config').url;

db.user = require('./user.model')(mongoose);
db.movie = require('./movie.model')(mongoose);
db.artist = require('./artist.model')(mongoose);
db.genre = require('./genre.model')(mongoose);

module.exports = db;
