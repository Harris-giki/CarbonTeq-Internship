import React from "react";
import type { Movie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => (
  // donot use html tag directly ** use (every) material ui component
  <ul>
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </ul>
);

export default MovieList;
