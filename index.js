// require movie model
const Movie = require("./models/movie");
require("dotenv").config();
// express
const express = require("express");
const app = express();
const cors = require("cors");
// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.get("/api/movies", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

app.get("/api/movies/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).json({ error: "Movie not found" });
  } else {
    res.json(movie);
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === Number(req.params.id));
  if (!movie) {
    res.status(404).json({ error: "Movie not found" });
  } else {
    movies = movies.filter((movie) => movie.id !== Number(req.params.id));
    res.status(200).json({ message: "Movie deleted successfully" });
  }
});

app.post("/api/movies", async (req, res) => {
  const { title, watchList } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  console.log("watchList: ", watchList); //
  const movie = new Movie({ title: title, watchList: watchList || false });
  const savedMovie = await movie.save();
  res.json(savedMovie);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
