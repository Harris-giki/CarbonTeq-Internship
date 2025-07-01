import { useEffect, useState } from "react";
import type { TrendingMovie } from "../types";
import { getTrendingMovies } from "../services/appwrite";

export function useTrendingMovies() {
  const [trending, setTrending] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then((movies) => setTrending(movies || []))
      .finally(() => setLoading(false));
  }, []);

  return { trending, loading };
} 