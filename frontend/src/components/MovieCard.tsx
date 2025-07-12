import { Link } from "react-router";
import type { Movie } from "../types/type";

const MovieCard: React.FC<Movie> = ({
  posterUrl,
  title,
  year,
  imdbID,
  source,
}) => {

  return (
    <Link to={`/movie/${imdbID}`}>
      <div className="relative w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 transition-transform duration-500">
        <img
          src={
            posterUrl
          }
          alt={title}
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = "/fallback.jpg";
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 text-white flex flex-col justify-end">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm">
            <span className="font-semibold">Year :</span> {year}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Source :</span> {source}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
