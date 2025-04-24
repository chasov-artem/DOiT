/**
 * Компонент картки поста
 * Відображає основну інформацію про пост:
 * - Заголовок
 * - Початок тексту (до 150 символів)
 * - Кнопки для видалення та перегляду деталей
 */

"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Button,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deletePost } from "@/store/postsSlice";
import styles from "./PostCard.module.css";

const PostCard = ({ post }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  // Обробка видалення поста
  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  // Перехід до деталей поста
  const handleView = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card
      className={styles.card}
      component={Paper}
      sx={{
        // Стилізація картки в залежності від теми
        background:
          theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.95)"
            : "linear-gradient(135deg, rgba(161, 239, 253, 0.3) 0%, rgba(234, 152, 245, 0.3) 100%)",
        backdropFilter: "blur(10px)",
        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "none",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 12px rgba(0, 0, 0, 0.4)"
            : "0 4px 16px rgba(31, 38, 135, 0.15)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 16px rgba(0, 0, 0, 0.5)"
              : "0 6px 20px rgba(31, 38, 135, 0.2)",
        },
        backgroundColor: "transparent !important",
        backgroundImage: "none",
      }}
      elevation={0}
    >
      <CardHeader
        // Аватар з першою літерою заголовка
        avatar={
          <Avatar
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#424242" : "#e0e0e0",
              color: theme.palette.mode === "dark" ? "#ffffff" : "#424242",
              border: "none",
              background: theme.palette.mode === "dark" ? "#424242" : "#e0e0e0",
            }}
          >
            {post.title.charAt(0).toUpperCase()}
          </Avatar>
        }
        // Кнопка видалення
        action={
          <IconButton
            onClick={handleDelete}
            aria-label="delete"
            sx={{
              color: "#f44336",
              opacity: 0.8,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "#d32f2f",
                opacity: 1,
                transform: "scale(1.1)",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
        // Заголовок поста
        title={
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            {post.title}
          </Typography>
        }
        // Підзаголовок з ID користувача
        subheader={
          <Typography
            variant="subtitle2"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(0, 0, 0, 0.6)",
            }}
          >
            User {post.id}
          </Typography>
        }
      />
      <CardContent>
        {/* Текст поста з обмеженням у 150 символів */}
        <Typography
          variant="body2"
          className={styles.content}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.7)",
            marginBottom: "40px",
          }}
        >
          {post.body.length > 150
            ? `${post.body.substring(0, 150)}...`
            : post.body}
        </Typography>
      </CardContent>
      {/* Кнопка перегляду деталей */}
      <CardActions
        sx={{
          padding: 0,
          position: "absolute",
          bottom: 8,
          left: 16,
          minHeight: "auto",
        }}
      >
        <IconButton
          onClick={handleView}
          size="small"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.7)",
            padding: 0,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              background: "transparent",
              transform: "translateX(4px)",
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
