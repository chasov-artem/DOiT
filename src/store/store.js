/**
 * Конфігурація Redux store
 * Об'єднує всі редюсери додатку в єдиний store
 */

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer, // Редюсер для управління темою
    posts: postsReducer, // Редюсер для управління постами
  },
});
