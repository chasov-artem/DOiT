"use client";

import React from "react";
import { Typography, Button, Container, Box, useTheme } from "@mui/material";
import { List as ListIcon, AddCircle as AddCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

const Home = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container className={styles.container}>
      <Box
        className={styles.hero}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(25, 118, 210, 0.4) 0%, rgba(123, 31, 162, 0.4) 100%)"
              : "linear-gradient(135deg, rgba(161, 239, 253, 0.3) 0%, rgba(234, 152, 245, 0.3) 100%)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "none"
              : "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "none",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          className={styles.title}
          sx={{
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            background: "none",
            WebkitBackgroundClip: "unset",
            WebkitTextFillColor: "unset",
            backgroundClip: "unset",
            fontWeight: 400,
            fontSize: "48px",
          }}
        >
          Ласкаво просимо до DOiT MVP
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          className={styles.subtitle}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.7)",
          }}
        >
          Ми працюємо над MVP освітньої платформи. Приєднуйтесь до команди!
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/posts")}
            className={styles.button}
            startIcon={<ListIcon />}
          >
            Переглянути пости
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push("/posts/create")}
            className={styles.button}
            startIcon={<AddCircle />}
          >
            Додати пост
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
