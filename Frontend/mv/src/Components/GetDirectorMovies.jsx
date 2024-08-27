import React, { useEffect, useState } from "react";
import createAxios from "../Services/Axios";

const GetDirectorMovies = () => {
  const [director, setDirector] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDirector = async () => {
      const axiosUser = createAxios();
      try {
        const response = await axiosUser.get("/director-with-movies");
        setDirector(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching director:", err);
        setError("Failed to load director");
        setLoading(false);
      }
    };

    fetchDirector();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Directors and Their Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {director.map((actor) => (
            <div key={actor._id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{actor.name}</h3>
              <div className="grid grid-cols-1 gap-4">
                {actor.movies.length > 0 ? (
                  actor.movies.map((movie) => (
                    <div key={movie._id} className="bg-gray-200 p-4 rounded-lg">
                      <h4 className="text-lg font-medium mb-2">
                        {movie.title}
                      </h4>
                      <img
                        src={`http://localhost:3001/${movie.image}`}
                        alt={movie.title}
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  ))
                ) : (
                  <p>No movies available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetDirectorMovies;
