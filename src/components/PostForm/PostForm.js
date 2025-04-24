/**
 * Компонент форми створення нового поста
 * Реалізує покроковий процес створення з використанням Material-UI Stepper
 * Включає:
 * - Введення заголовку
 * - Введення тексту поста
 * - Попередній перегляд
 */

"use client";

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
  useTheme,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Save as SaveIcon, Title as TitleIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createPost } from "@/store/postsSlice";
import styles from "./PostForm.module.css";

// Кроки створення поста
const steps = ["Заголовок", "Тіло", "Попередній перегляд"];

const PostForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  // Стан форми
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  /**
   * Обробка переходу до наступного кроку
   * На передостанньому кроці відкриває діалог попереднього перегляду
   */
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

  /**
   * Обробка відправки форми
   * Створює новий пост та перенаправляє на сторінку постів
   */
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

  /**
   * Повертає вміст форми в залежності від активного кроку
   */
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
            className={styles.input}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
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
            multiline
            rows={6}
            className={styles.input}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
          />
        );
      case 2:
        return (
          <Box className={styles.preview}>
            <Typography variant="h6" className={styles.previewTitle}>
              Попередній перегляд
            </Typography>
            <Box className={styles.previewContent}>
              <Typography variant="h6" className={styles.postTitle}>
                {formData.title}
              </Typography>
              <Typography variant="body1" className={styles.previewBody}>
                {formData.body}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return "Невідомий крок";
    }
  };

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={styles.formPaper}>
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
            className={`${styles.button} ${styles.backButton}`}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            className={styles.button}
            color="primary"
            endIcon={<SaveIcon />}
          >
            {activeStep === steps.length - 1 ? "Створити" : "Далі"}
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.background.paper,
            "& .MuiDialogTitle-root": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "16px 24px",
            },
            "& .MuiDialogContent-root": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "20px 24px",
            },
            "& .MuiDialogActions-root": {
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "8px 24px",
            },
          },
        }}
      >
        <DialogTitle className={styles.previewTitle}>
          Попередній перегляд
        </DialogTitle>
        <DialogContent className={styles.previewContent}>
          <Typography variant="h6" className={styles.postTitle}>
            {formData.title}
          </Typography>
          <Typography variant="body1" className={styles.previewBody}>
            {formData.body}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPreviewOpen(false)}
            className={styles.button}
          >
            Редагувати
          </Button>
          <Button
            onClick={() => {
              setPreviewOpen(false);
              setActiveStep((prevStep) => prevStep + 1);
            }}
            variant="contained"
            className={styles.button}
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
