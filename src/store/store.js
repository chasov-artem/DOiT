import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    theme: themeReducer,
  },
});
