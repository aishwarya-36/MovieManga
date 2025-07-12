import { Link } from "react-router";
import type { Movie } from "../types/type";

const MovieCard: React.FC<Movie> = ({
  posterUrl,
  title,
  year,
  imdbID,
}) => {
  return (
    <Link to={`/movie/${imdbID}`}>
      <div className="relative w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 transition-transform duration-500 group">
        <img
          src={posterUrl}
          alt={title}
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = "/fallback.jpg";
          }}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50"
        />
        <div className="absolute inset-0 p-4 text-white flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm">
            <span className="font-semibold">Year:</span> {year}
          </p>
          
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;