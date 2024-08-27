import Movie from "../Models/movieModel.js";
import repositary from "../Repositary/repositary.js";

const signup = async (req, res) => {
  try {
    const data = req.body;
    const response = await repositary.signup(data);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in signup" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await repositary.login(email, password);
    if (response.success) {
      res.status(response.status).json(response);
    } else {
      res.status(response.status).json({ message: response.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in login" });
  }
};

const addMovie = async (req, res) => {
  try {
    const { title, releaseYear, genres, actors, director } = req.body;

    if (!title || !releaseYear || !genres || !actors || !director) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const genresArray = Array.isArray(genres)
      ? genres
      : genres.split(",").map((g) => g.trim());
    const actorsArray = Array.isArray(actors)
      ? actors
      : actors.split(",").map((a) => a.trim());
    const imagePath = req.file.path.replace("\\", "/");

    const newMovie = await repositary.addMovie(
      title,
      releaseYear,
      genresArray,
      actorsArray,
      director,
      imagePath
    );

    return res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Error adding movie" });
  }
};

const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("genres", "name")
      .populate("actors", "name")
      .populate("director", "name");
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

const getActorsWithMovies=async(req,res)=>{
      try {
        const actors=await repositary.getActorsWithMovies()
        res.status(200).json(actors)
      } catch (error) {
        console.error("Error fetching actor with movies:", error);
    res.status(500).json({ message: "Failed to fetch actor with movies" });
      }
}

const getDirectorWithMovies=async(req,res)=>{
  try {
    const directors=await repositary.getDirectorWithMovies()
    res.status(200).json(directors)
  } catch (error) {
    console.error("Error fetching director with movies:", error);
    res.status(500).json({ message: "Failed to fetch director with movies" });
  }
}

export default {
  signup,
  login,
  addMovie,
  getMovie,
  getActorsWithMovies,
  getDirectorWithMovies
};
