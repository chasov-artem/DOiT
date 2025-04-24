/**
 * Компонент для відображення списку постів
 * Включає в себе:
 * - Пошук постів за заголовком
 * - Відображення постів у вигляді сітки карток
 * - Кнопку для створення нового поста
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  SpeedDial,
  SpeedDialIcon,
  useTheme,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchPosts } from "@/store/postsSlice";
import PostCard from "@/components/PostCard/PostCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./Posts.module.css";

const Posts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const { items: posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePost = () => {
    router.push("/posts/create");
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography color="error" variant="h6">
          Помилка завантаження постів
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className={styles.container}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <SpeedDial
        ariaLabel="Створити пост"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          "& .MuiSpeedDial-fab": {
            background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            },
          },
        }}
        icon={<SpeedDialIcon />}
        onClick={handleCreatePost}
      />
    </Box>
  );
};

export default Posts;
