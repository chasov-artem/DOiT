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
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deletePost } from "@/store/postsSlice";
import styles from "./PostCard.module.css";

const PostCard = ({ post }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleView = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={
          <Avatar className={styles.avatar}>
            {post.title.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
        title={post.title}
        subheader={`Post #${post.id}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.content}
        >
          {post.body.length > 150
            ? `${post.body.substring(0, 150)}...`
            : post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleView}>
          Читати далі
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
