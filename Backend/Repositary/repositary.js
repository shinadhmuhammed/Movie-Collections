import bcrypt from "bcrypt";
import User from "../Models/userModel.js";
import Director from "../Models/directorModel.js";
import Genre from "../Models/genreModel.js";
import Actor from "../Models/actorModel.js";
import Movie from "../Models/movieModel.js";

const signup = async (data) => {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new Error("Username or email already exists");
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = new User({
        name: data.name,
        email: data.email,
        contact: data.contact,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      return { success: true, user: savedUser };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return { success: false, status: 400, message: "User not found" };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, status: 400, message: "Invalid credentials" };
      }
      return {
        success: true,
        status: 200,
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      console.error(error);
      return { success: false, status: 500, message: "Server error" };
    }
  };

  const addMovie = async (title, releaseYear, genres, actors, director, imagePath) => {
    try {
      let movieDirector = await Director.findOne({ name: director });
      if (!movieDirector) {
        movieDirector = new Director({ name: director });
        await movieDirector.save();
      }
      const movieGenres = await Promise.all(
        genres.map(async (genreName) => {
          let genre = await Genre.findOne({ name: genreName });
          if (!genre) {
            genre = new Genre({ name: genreName });
            await genre.save();
          }
          return genre;
        })
      );
  
      const movieActors = await Promise.all(
        actors.map(async (actorName) => {
          let actor = await Actor.findOne({ name: actorName });
          if (!actor) {
            actor = new Actor({ name: actorName });
            await actor.save();
          }
          return actor;
        })
      );
  
      const newMovie = new Movie({
        title,
        releaseYear,
        genres: movieGenres.map((g) => g._id),
        actors: movieActors.map((a) => a._id),
        director: movieDirector._id,
        image: imagePath
      });
  
      await newMovie.save();
  
      await Promise.all(
        movieActors.map(async (actor) => {
          await Actor.findByIdAndUpdate(actor._id, {
            $push: { movies: newMovie._id }
          });
        })
      );

      await Director.findByIdAndUpdate(movieDirector._id, {
        $push: { movies: newMovie._id }
      });
  
      return newMovie;
  
    } catch (error) {
      console.error('Error in repository while adding movie:', error);
      throw new Error('Failed to add movie to the database');
    }
  };
  
  const getActorsWithMovies=async()=>{
    try {
      const actors = await Actor.find()
      .populate({
        path: 'movies',
        select: 'title image', 
      })
      .exec();
      return actors
    } catch (error) {
      console.error('Error in repository while get actor with movies:', error);
    }
  }


  const getDirectorWithMovies=async()=>{
    try {
      const director = await Director.find()
      .populate({
        path: 'movies',
        select: 'title image', 
      })
      .exec();
      return director
    } catch (error) {
      console.error('Error in repository while get director with movies:', error);
    }
  }


  export default {signup,login,addMovie,getActorsWithMovies,getDirectorWithMovies}