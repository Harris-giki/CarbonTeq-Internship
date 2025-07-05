import React, { useState } from "react";
import Search from "../components/Search/Search";
import MovieList from "../components/MovieList/MovieList";
import TrendingMovies from "../components/TrendingMovies/TrendingMovies";
import Spinner from "../components/Spinner/Spinner";
import { useMovies } from "../hooks/useMovies";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const MovieContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, isLoading, error } = useMovies(searchTerm);
  const { trending, loading: trendingLoading } = useTrendingMovies();
  // donot use any ui only call components , no use of html tags (last resort html)
  // importance of containerization?
  return (
    <Box sx={{ background: "#181818", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Box textAlign="center" mb={4}>
            <img src="./hero.png" alt="Hero Banner" style={{ maxWidth: 180, marginBottom: 16 }} />
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Find <span style={{ color: "#646cff" }}>Movies</span> You'll Enjoy Without the Hassle
            </Typography>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Box>
          {trending.length > 0 && !trendingLoading && <TrendingMovies trending={trending} />}
          <Box mt={6}>
            <Typography variant="h4" fontWeight={600} mb={2}>
              All Movies
            </Typography>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <Typography color="error" align="center">{error}</Typography>
            ) : (
              <MovieList movies={movies} />
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MovieContainer;
