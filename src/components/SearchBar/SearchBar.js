import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Пошук за заголовком..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchBar}
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
