import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createPost } from "@/store/postsSlice";
import styles from "./PostForm.module.css";

const steps = ["Заголовок", "Тіло", "Попередній перегляд"];

const PostForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      setPreviewOpen(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createPost(formData)).unwrap();
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/posts");
      }, 2000);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TextField
            fullWidth
            label="Заголовок"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        );
      case 1:
        return (
          <TextField
            fullWidth
            label="Тіло"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
            multiline
            rows={6}
            className={styles.input}
          />
        );
      case 2:
        return (
          <Box className={styles.preview}>
            <Typography variant="h6" gutterBottom>
              {formData.title}
            </Typography>
            <Typography variant="body1" className={styles.previewBody}>
              {formData.body}
            </Typography>
          </Box>
        );
      default:
        return "Невідомий крок";
    }
  };

  return (
    <div className={styles.container}>
      <Stepper activeStep={activeStep} className={styles.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box className={styles.content}>{getStepContent(activeStep)}</Box>

      <Box className={styles.actions}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={styles.button}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          className={styles.button}
        >
          {activeStep === steps.length - 1 ? "Створити" : "Далі"}
        </Button>
      </Box>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Попередній перегляд</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {formData.title}
          </Typography>
          <Typography variant="body1">{formData.body}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Назад</Button>
          <Button
            onClick={() => {
              setPreviewOpen(false);
              setActiveStep((prevStep) => prevStep + 1);
            }}
            variant="contained"
          >
            Підтвердити
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Пост успішно створено!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostForm;
