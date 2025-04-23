"use client";

import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { store } from "@/store/store";
import { useSelector } from "react-redux";

const ThemeWrapper = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#2196f3",
        light: "#64b5f6",
        dark: "#1976d2",
      },
      secondary: {
        main: "#9c27b0",
        light: "#ba68c8",
        dark: "#7b1fa2",
      },
      background: {
        default: isDarkMode ? "#121212" : "#f5f5f5",
        paper: isDarkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
        secondary: isDarkMode
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(0, 0, 0, 0.7)",
      },
    },
    typography: {
      h3: {
        fontWeight: 700,
        fontSize: "2.5rem",
        "@media (max-width:600px)": {
          fontSize: "2rem",
        },
      },
      subtitle1: {
        fontSize: "1.1rem",
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "uppercase",
            fontWeight: 500,
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            },
          },
          outlined: {
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
};
