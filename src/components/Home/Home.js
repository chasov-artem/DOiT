"use client";

import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { List as ListIcon, Add as AddIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

const Home = () => {
  const router = useRouter();

  return (
    <Container className={styles.container}>
      <Box className={styles.hero}>
        <Typography variant="h3" component="h1" className={styles.title}>
          Ласкаво просимо до DOiT MVP
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          className={styles.subtitle}
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
            startIcon={<AddIcon />}
          >
            Додати пост
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
