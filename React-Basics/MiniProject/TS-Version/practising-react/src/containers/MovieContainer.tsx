import React, { useState } from "react";
import Search from "../components/Search/Search";
import MovieList from "../components/MovieList/MovieList";
import TrendingMovies from "../components/TrendingMovies/TrendingMovies";
import Spinner from "../components/Spinner/Spinner";
import { useMovies } from "../hooks/useMovies";
import { useTrendingMovies } from "../hooks/useTrendingMovies";

const MovieContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, isLoading, error } = useMovies(searchTerm);
  const { trending, loading: trendingLoading } = useTrendingMovies();

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="text-center">
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trending.length > 0 && !trendingLoading && <TrendingMovies trending={trending} />}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <MovieList movies={movies} />
          )}
        </section>
      </div>
    </main>
  );
};

export default MovieContainer; 