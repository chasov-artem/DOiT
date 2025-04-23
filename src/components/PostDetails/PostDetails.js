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
  IconButton,
  Badge,
} from "@mui/material";
import { Comment as CommentIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "@/store/postsSlice";
import CommentsDialog from "@/components/CommentsDialog/CommentsDialog";
import styles from "./PostDetails.module.css";

const PostDetails = ({ postId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data = await response.json();
        setPost(data);

        // Fetch comments
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        setCommentsCount(commentsData.length);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleDelete = () => {
    dispatch(deletePost(postId));
    router.push("/posts");
  };

  const handleBack = () => {
    router.push("/posts");
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (!post) {
    return <div>Пост не знайдено</div>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          avatar={
            <Avatar className={styles.avatar}>
              {post.title.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => setCommentsOpen(true)}>
              <Badge badgeContent={commentsCount} color="primary">
                <CommentIcon />
              </Badge>
            </IconButton>
          }
          title={post.title}
          subheader={`Post #${post.id}`}
        />
        <CardContent>
          <Typography variant="body1" className={styles.content}>
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleBack}>
            До списку
          </Button>
          <Button size="small" color="error" onClick={handleDelete}>
            Видалити
          </Button>
        </CardActions>
      </Card>

      <CommentsDialog
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        comments={comments}
      />
    </div>
  );
};

export default PostDetails;
