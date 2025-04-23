"use client";

import React from "react";
import { TextField, InputAdornment, useTheme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange }) => {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Пошук за заголовком..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchBar}
      sx={{
        marginBottom: "24px",
        "& .MuiOutlinedInput-root": {
          background:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          "& fieldset": {
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          },
          "&:hover fieldset": {
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.2)",
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
        "& .MuiInputBase-input": {
          color:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(0, 0, 0, 0.9)",
        },
        "& .MuiInputAdornment-root": {
          color:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.54)",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
