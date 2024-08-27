import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import createAxios from '../Services/Axios';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    releaseYear: '',
    genres: '',
    actors: '',
    director: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const axiosUser = createAxios();

    const genresArray = movieData.genres.split(',').map(genre => genre.trim());
    const actorsArray = movieData.actors.split(',').map(actor => actor.trim());

    const formData = new FormData();
    formData.append('title', movieData.title);
    formData.append('releaseYear', movieData.releaseYear);
    formData.append('genres', genresArray);
    formData.append('actors', actorsArray);
    formData.append('director', movieData.director);
    formData.append('image', image);

    try {
      const response = await axiosUser.post('/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMessage('Movie added successfully!');
        setMovieData({
          title: '',
          releaseYear: '',
          genres: '',
          actors: '',
          director: ''
        });
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setMessage('Failed to add movie. Please try again.');
    }
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Welcome to our Movie Database</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Add New Movie</h2>
            <p className="mt-2 text-gray-500">You can add your favorite movies here. Fill in the details below to contribute to our collection.</p>
            
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseYear">Release Year</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="releaseYear"
                  value={movieData.releaseYear}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genres">Genres (comma-separated)</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="genres"
                  value={movieData.genres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actors">Actors (comma-separated)</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="actors"
                  value={movieData.actors}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="director">Director</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="director"
                  value={movieData.director}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Add Movie
                </button>
                <Link to="/movies" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  View Existing Movies
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Logout
                </button>
              </div>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;