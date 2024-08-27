import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  }],
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true,
  }],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
});


const Movie = mongoose.model('Movie', movieSchema);

export default Movie
