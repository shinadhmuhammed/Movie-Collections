import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createAxios from "../Services/Axios";

const GetMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const axiosUser = createAxios();
      try {
        const response = await axiosUser.get("/movies");
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Movies List</h2>
      <div className="mb-4 flex space-x-4">
        <Link
          to="/getActorMovies"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Actors with Movies
        </Link>
        <Link
          to="/getDirectorMovies"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Directors with Movies
        </Link>
      </div>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`http://localhost:3001/${movie.image}`}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {movie.title} ({movie.releaseYear})
                </h3>
                <p>
                  <strong>Director:</strong> {movie.director.name}
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <strong>Actors:</strong>{" "}
                  {movie.actors.map((actor) => actor.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default GetMovie;