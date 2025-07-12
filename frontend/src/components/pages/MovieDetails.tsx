import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Footer from "../layout/Footer";
import { FaStar } from "react-icons/fa";
import { fetchMovieDetails } from "../../utils/fetchDetails";
import type { MovieData } from "../../types/type";

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieData | null>(null);
  let error:string|null = null;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      const movieDetails = await fetchMovieDetails(imdbID??"");
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

  return (
    <>
      <div className="w-[50%] h-[calc(100vh-100px)] mt-10 mx-auto bg-[#fffdfb] text-[#4c4769] dark:bg-[#24273a] dark:text-[#cdd6f4] rounded-lg shadow-md">
        <Link
          to="/"
          className="ml-4 px-4 py-2 bg-[#4c4769] text-white dark:bg-[#cdd6f4] dark:text-[#24273a] rounded-xl hover:opacity-90 transition"
        >
          ← Home
        </Link>
        {movie && (
          <div className="flex flex-col md:flex-row gap-6 m-6">
            <img
              src={
               movie.Poster
              }
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = "/fallback.jpg";
              }}
              alt={movie.Title}
              className="w-full md:w-1/3 rounded-3xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {movie.Title} ({movie.Year})
              </h1>
              <p className="mb-2">{movie.Plot || "N/A"}</p>
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
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
