import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import { fetchMovies } from "../utils/fetch";
import type { Movie } from "../types/type";

interface MovieGridProps {
  searchTerm: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ searchTerm }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!searchTerm) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [searchTerm, loading]);
  useEffect(() => {
    if (!searchTerm) return;

    const loadMovies = async () => {
      setLoading(true);
      const newMovies = await fetchMovies(searchTerm, page);
      setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));
      setLoading(false);
    };

    loadMovies();
  }, [page, searchTerm]);
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 m-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}

      {/* Skeletons */}
      {loading &&
        Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      <div
        ref={sentinelRef}
        className="col-span-full text-center text-sm text-gray-500 dark:text-gray-400"
      >
        {loading ? "Loading..." : ""}
      </div>
    </div>
  );
};

export default MovieGrid;
