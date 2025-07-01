import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        mb: 4,
      }}
    >
      <TextField
        sx={{
          width: "100%",
          maxWidth: 600,
          input: {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#141414",
            borderRadius: "10px",
            "& fieldset": {
              borderColor: "#646cff",
            },
            "&:hover fieldset": {
              borderColor: "#7f8cff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a5b4fc",
              boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.3)",
            },
          },
        }}
        variant="outlined"
        placeholder="Search through thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src="search.svg"
                alt="search"
                style={{ width: 20, height: 20, filter: "invert(78%)" }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
