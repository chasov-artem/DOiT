import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

const Home = () => {
  const router = useRouter();

  return (
    <Container className={styles.container}>
      <Box className={styles.hero}>
        <Typography variant="h2" component="h1" className={styles.title}>
          Ласкаво просимо до DOiT Test
        </Typography>
        <Typography variant="h5" component="h2" className={styles.subtitle}>
          Платформа для управління постами
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/posts")}
            className={styles.button}
          >
            Переглянути пости
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push("/posts/create")}
            className={styles.button}
          >
            Додати пост
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
