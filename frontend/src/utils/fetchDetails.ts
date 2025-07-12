export const fetchMovieDetails = async (imdbID: string) => {
  const url = `http://127.0.0.1:8000/movie-details?imdbID=${imdbID}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
