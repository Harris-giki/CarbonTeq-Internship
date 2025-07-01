import React from "react";
import type { Movie } from "../../types";
import MovieCard from "../MovieCard/MovieCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => (
  <Box sx={{ flexGrow: 1, mt: 2 }}>
    <Grid container spacing={2} justifyContent="center">
      {movies.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default MovieList;
