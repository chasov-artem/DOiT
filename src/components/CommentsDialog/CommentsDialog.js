"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import styles from "./CommentsDialog.module.css";

const CommentsDialog = ({ open, onClose, comments }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className={styles.dialog}
      PaperProps={{
        className: styles.paper,
        sx: {
          backgroundColor: "background.paper",
          color: "text.primary",
          opacity: 1,
          boxShadow: 24,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <DialogTitle>Коментарі</DialogTitle>
      <DialogContent>
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <Box sx={{ width: "100%" }}>
                  <Typography variant="subtitle1" component="div">
                    {comment.name}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    className={styles.email}
                  >
                    {comment.email}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    className={styles.commentBody}
                  >
                    {comment.body}
                  </Typography>
                </Box>
              </ListItem>
              {index < comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
