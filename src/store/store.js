import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postsReducer,
  },
});
