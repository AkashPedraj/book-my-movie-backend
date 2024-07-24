module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", movies.findAllMovies);
    router.get("/:movieId", movies.findOne);
    router.get("/:movieId/shows", movies.findShows);
  
    app.use('/api/movies', router);
  };
  