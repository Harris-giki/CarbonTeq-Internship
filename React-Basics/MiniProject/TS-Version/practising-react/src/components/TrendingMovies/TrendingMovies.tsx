import React from "react";
import type { TrendingMovie } from "../../types";

interface TrendingMoviesProps {
  trending: TrendingMovie[];
}

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ trending }) => (
  <section className="trending">
    <h2>Most Searched Movies</h2>
    <ul>
      {trending.map((movie, index) => (
        <li key={movie.$id}>
          <p>{index + 1}</p>
          <img src={movie.poster_url} alt={movie.title || "Movie Poster"} />
        </li>
      ))}
    </ul>
  </section>
);

export default TrendingMovies; 