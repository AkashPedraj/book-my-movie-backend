const db = require("../models");
const Artist = db.Artist;

exports.findAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving artists."
    });
  }
};
