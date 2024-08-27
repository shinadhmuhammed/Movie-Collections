import mongoose from 'mongoose';

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], 
});

const Director = mongoose.model('Director', directorSchema);

export default Director;
