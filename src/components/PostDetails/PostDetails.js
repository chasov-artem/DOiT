/**
 * Компонент деталей поста
 * Відображає повну інформацію про пост та його коментарі
 * Включає в себе:
 * - Повний текст поста
 * - Модальне вікно з коментарями
 * - Кнопки для видалення поста та повернення до списку
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  Comment as CommentIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deletePost, setCommentsCount } from "@/store/postsSlice";
import styles from "./PostDetails.module.css";

const PostDetails = ({ postId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsCount, setLocalCommentsCount] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Завантаження даних поста та коментарів
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Отримання даних поста
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data = await response.json();
        setPost(data);

        // Отримання коментарів
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        const count = commentsData.length;
        setLocalCommentsCount(count);
        dispatch(setCommentsCount(count));
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();

    // Обробник події відкриття коментарів
    const handleOpenComments = () => setCommentsOpen(true);
    window.addEventListener("openComments", handleOpenComments);

    return () => {
      window.removeEventListener("openComments", handleOpenComments);
      // Скидання лічильника коментарів при розмонтуванні
      dispatch(setCommentsCount(0));
    };
  }, [postId, dispatch]);

  // Обробка видалення поста
  const handleDelete = () => {
    dispatch(deletePost(postId));
    router.push("/posts");
  };

  // Повернення до списку постів
  const handleBack = () => {
    router.push("/posts");
  };

  // Відображення стану завантаження
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  // Відображення помилки, якщо пост не знайдено
  if (!post) {
    return <div>Пост не знайдено</div>;
  }

  return (
    <div className={styles.container}>
      {/* Картка з деталями поста */}
      <Card className={styles.card}>
        <CardHeader
          avatar={
            <Avatar className={styles.avatar}>
              {post?.title ? post.title.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={post?.title}
        />
        <CardContent>
          <Typography variant="body1" className={styles.content}>
            {post.body}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              className={styles.deleteButton}
            >
              Видалити
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              className={styles.backButton}
            >
              До списку
            </Button>
          </Box>
        </CardActions>
      </Card>

      {/* Діалог з коментарями */}
      <Dialog
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maxWidth="sm"
        fullWidth
        className={styles.commentsDialog}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <CommentIcon className={styles.commentIcon} />
            <Typography variant="h6" component="span" ml={1}>
              Коментарі ({commentsCount})
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <ListItem
                  alignItems="flex-start"
                  className={styles.commentItem}
                >
                  <Box className={styles.commentContent}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      className={styles.commentName}
                    >
                      {comment.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className={styles.commentEmail}
                    >
                      {comment.email}
                    </Typography>
                    <Typography variant="body1" className={styles.commentBody}>
                      {comment.body}
                    </Typography>
                  </Box>
                </ListItem>
                {index < comments.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDetails;
