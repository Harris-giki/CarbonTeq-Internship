import React from "react";
import type { TrendingMovie } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

interface TrendingMoviesProps {
  trending: TrendingMovie[];
}

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ trending }) => (
  <Box sx={{ my: 4 }}>
    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
      Most Searched Movies
    </Typography>
    <List sx={{ display: "flex", flexDirection: "row", gap: 2, p: 0 }}>
      {trending.map((movie, index) => (
        <ListItem key={movie.$id} sx={{ width: "auto", flexDirection: "column", alignItems: "center", p: 0 }}>
          <ListItemAvatar>
            <Avatar
              src={movie.poster_url}
              alt={movie.title || "Movie Poster"}
              variant="rounded"
              sx={{ width: 60, height: 90, mb: 1 }}
            />
          </ListItemAvatar>
          <Typography variant="caption" color="text.secondary">
            #{index + 1}
          </Typography>
          <ListItemText
            primary={movie.title || "Untitled"}
            primaryTypographyProps={{ variant: "body2", noWrap: true, sx: { maxWidth: 60, textAlign: "center" } }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default TrendingMovies; 