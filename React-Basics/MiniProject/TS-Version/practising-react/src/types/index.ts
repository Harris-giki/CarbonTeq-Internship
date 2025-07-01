// Movie type for TMDB API results
export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  release_date: string;
  original_language: string;
}

// Trending movie type for Appwrite DB
export interface TrendingMovie {
  $id: string;
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
  title?: string;
} 