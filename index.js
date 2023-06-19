const express = require("express");
const app = express();
const cors = require("cors");
// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let movies = [
  {
    id: 1,
    title: "The Godfather",
    watchList: true,
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    watchList: false,
  },
  {
    id: 3,
    title: "The Lord of the Rings: The Return of the King",
    watchList: true,
  },
];

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === Number(req.params.id));
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

app.post("/api/movies", (req, res) => {
  const { title, watchList } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newMovie = {
    id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
    title,
    watchList: watchList || false,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
