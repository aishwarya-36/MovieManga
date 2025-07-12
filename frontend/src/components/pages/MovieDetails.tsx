import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router";
import Footer from "../layout/Footer";
import { FaStar } from "react-icons/fa";
import { fetchMovieDetails } from "../../utils/fetchDetails";
import type { MovieData } from "../../types/type";

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const location = useLocation();
  const [movie, setMovie] = useState<MovieData | null>(null);
  let error: string | null = null;
  const [loading, setLoading] = useState<boolean>(true);

  // Extract search term from the state passed via navigation or from sessionStorage
  const searchTerm = location.state?.searchTerm || sessionStorage.getItem('lastSearchTerm') || '';

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      const movieDetails = await fetchMovieDetails(imdbID ?? "");
      setMovie(movieDetails);
      setLoading(false);
    };

    if (imdbID) {
      loadMovieDetails();
    }
  }, [imdbID]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-[#d20f39]">{error}</div>;

  // Create the home link with search parameter if it exists
  const homeLink = searchTerm ? `/?search=${encodeURIComponent(searchTerm)}` : '/';
console.log(homeLink," Home Link");
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content container */}
      <div className="flex-1 w-[50%] mt-10 mx-auto bg-[#fffdfb] text-[#4c4769] dark:bg-[#24273a] dark:text-[#cdd6f4] rounded-lg shadow-md mb-6">
        <div className="p-4">
          <a
            href={homeLink}
            className="inline-block mb-4 px-4 py-2 bg-[#4c4769] text-white dark:bg-[#cdd6f4] dark:text-[#24273a] rounded-xl hover:opacity-90 transition"
          >
            ← Back to Results
          </a>
          {movie && (
            <div className="flex flex-col lg:flex-row gap-6">
              <img
                src={movie.Poster}
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = "/fallback.jpg";
                }}
                alt={movie.Title}
                className="w-full lg:w-1/2 lg:object-fill rounded-3xl"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {movie.Title} ({movie.Year})
                </h1>
                <p className="mb-2 text-justify">{movie.Plot || "N/A"}</p>
                <p className="mb-2">
                  <strong>IMDb Rating:</strong>{" "}
                  <FaStar className="text-yellow-400 mr-1 inline-block mb-1" />
                  {isNaN(Number(movie.imdbRating)) ? "N/A" : movie.imdbRating}
                </p>
                <p className="mb-2">
                  <strong>Language:</strong> {movie.Language.toString() || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Genre:</strong> {movie.Genre.toString() || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Director:</strong> {movie.Director.toString() || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Actors:</strong> {movie.Actors.toString() || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Runtime:</strong> {movie.Runtime.toString() || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MovieDetails;