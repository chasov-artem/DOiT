/**
 * Головний компонент для налаштування провайдерів додатку
 * Включає в себе:
 * - Redux Provider для управління станом
 * - ThemeProvider для налаштування теми Material-UI
 */

"use client";

import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { store } from "@/store/store";
import { useSelector } from "react-redux";

/**
 * Компонент для управління темою додатку
 * Створює та налаштовує тему Material-UI на основі обраного режиму (світла/темна)
 */
const ThemeWrapper = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const theme = createTheme({
    // Налаштування палітри кольорів
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
        default: isDarkMode ? "#121212" : "#ffffff",
        paper: isDarkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
        secondary: isDarkMode
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(0, 0, 0, 0.7)",
      },
    },
    // Налаштування типографії
    typography: {
      h3: {
        fontWeight: 400,
        fontSize: "48px",
        background: "linear-gradient(135deg, #64B5F6 0%, #BA68C8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      },
      subtitle1: {
        fontSize: "18px",
        lineHeight: 1.5,
        color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
      },
    },
    // Налаштування компонентів Material-UI
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            colorScheme: isDarkMode ? "dark" : "light",
          },
          body: {
            backgroundColor: isDarkMode ? "#121212" : "#ffffff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: "14px",
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            },
          },
          outlined: {
            borderWidth: "1px",
            "&:hover": {
              borderWidth: "1px",
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            "& .MuiDialogTitle-root": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              padding: "16px 24px",
            },
            "& .MuiDialogContent-root": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              padding: "20px 24px",
            },
            "& .MuiDialogActions-root": {
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "8px 24px",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
};
