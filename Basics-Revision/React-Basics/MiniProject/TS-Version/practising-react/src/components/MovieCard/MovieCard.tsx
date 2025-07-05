import React from "react";
import type { Movie } from "../../types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, vote_average, poster_path, release_date, original_language } = movie;
  return (
    <Card sx={{ maxWidth: 250, m: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="375"
        image={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <img src="star.svg" alt="Star Icon" style={{ width: 18, height: 18 }} />
          <Typography variant="body2" color="text.secondary">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </Typography>
          <span>•</span>
          <Typography variant="body2" color="text.secondary">
            {original_language}
          </Typography>
          <span>•</span>
          <Typography variant="body2" color="text.secondary">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard; 