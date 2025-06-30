import React from "react";
import Search from "./components/search.jsx";
import { useEffect, useState } from "react";

// API setup - using popular movies endpoint instead
const API_BASE_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    // Fixed: Remove duplicate "Authorization:" text
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2RjNTdhNjdmM2VjMTcwNWQwNWU1N2Y5N2Y4M2E0YiIsIm5iZiI6MTc1MTI3MjM4Ni45MTUsInN1YiI6IjY4NjI0YmMyODYzYzI5YTgwNzBkOTZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JXtjmjwU8JqmsF5ryIJFZKIxnqssD4nyzAD5euq5jOY`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // Using popular movies endpoint with page parameter
      const endpoint = `${API_BASE_URL}?language=en-US&page=1`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error(`Error Fetching Movies:`, error);
      setErrorMessage(`Failed to fetch movies: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            <img src="./hero.png" alt="Hero Banner" />
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            without a Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
};

export default App;
