import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
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
    >
      <DialogTitle>Коментарі</DialogTitle>
      <DialogContent>
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div">
                      {comment.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        className={styles.email}
                      >
                        {comment.email}
                      </Typography>
                      <Typography
                        component="p"
                        variant="body2"
                        className={styles.commentBody}
                      >
                        {comment.body}
                      </Typography>
                    </>
                  }
                />
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
