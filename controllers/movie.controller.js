const db = require("../models");
const Movie = db.Movie;
const Genre = db.Genre;
const Artist = db.Artist;

exports.findAllMovies = async (req, res) => {
  try {
    const { status, title, genres, artists, start_date, end_date } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (title) {
      filter.title = new RegExp(title, "i");
    }

    if (genres) {
      filter.genres = { $in: genres.split(",") };
    }

    if (artists) {
      filter.artists = { $in: artists.split(",") };
    }

    if (start_date || end_date) {
      filter.releaseDate = {};
      if (start_date) {
        filter.releaseDate.$gte = new Date(start_date);
      }
      if (end_date) {
        filter.releaseDate.$lte = new Date(end_date);
      }
    }

    const movies = await Movie.find(filter).populate("genres").populate("artists");
    res.json(movies);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving movies."
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.movieId;

  try {
    const movie = await Movie.findById(id).populate("genres").populate("artists");
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send({
        message: `Cannot find Movie with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Movie with id=" + id
    });
  }
};

exports.findShows = async (req, res) => {
  const id = req.params.movieId;

  try {
    const movie = await Movie.findById(id).populate("shows");
    if (movie) {
      res.json(movie.shows);
    } else {
      res.status(404).send({
        message: `Cannot find Shows for Movie with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Shows for Movie with id=" + id
    });
  }
};
