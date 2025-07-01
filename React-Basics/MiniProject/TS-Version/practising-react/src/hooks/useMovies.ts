import { useState, useEffect } from "react";
import type { Movie } from "../types";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // resuable hooks/custom hookes

  useEffect(() => {
    const fetchMovies = async () => {
      //make method in services (GET-PUT-POST)
      setIsLoading(true);
      setError("");
      try {
        const endpoint = query.trim()
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
              query
            )}&language=en-US&page=1`
          : `${API_BASE_URL}/movie/popular?language=en-US&page=1`;
        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError("Error fetching movies. Please try again later.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return { movies, isLoading, error };
}
