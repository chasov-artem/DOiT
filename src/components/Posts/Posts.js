"use client";

import React, { useState, useEffect } from "react";
import { Grid, SpeedDial, SpeedDialIcon } from "@mui/material";
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
    return <div>Завантаження...</div>;
  }

  if (status === "failed") {
    return <div>Помилка завантаження постів</div>;
  }

  return (
    <div className={styles.container}>
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
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleCreatePost}
      />
    </div>
  );
};

export default Posts;
