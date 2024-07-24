const db = require("../models");
const Genre = db.Genre;

exports.findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving genres."
    });
  }
};
