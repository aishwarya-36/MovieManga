export const fetchMovies = async (query: string, page: number = 1) => {
  const url = `http://127.0.0.1:8000/search-movies?query=${encodeURIComponent(
    query
  )}&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      const mappedData = data.Search.map((movie: any) => {
        return {
          title: movie.Title,
          year: movie.Year,
          posterUrl: movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg",
          imdbID: movie.imdbID,
          source: movie.Source,
        };
      });
      return mappedData;
    }

    return [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
