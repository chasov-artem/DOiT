"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <IconButton
      color="inherit"
      onClick={onToggle}
      className={styles.themeToggle}
    >
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
