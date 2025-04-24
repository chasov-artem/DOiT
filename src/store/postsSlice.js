/**
 * Slice для управління постами
 * Включає в себе:
 * - Отримання списку постів
 * - Створення нового поста
 * - Видалення поста
 * - Управління кількістю коментарів
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Асинхронні thunk-дії
/**
 * Отримання списку всіх постів з API
 */
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(API_URL);
  return response.json();
});

/**
 * Створення нового поста
 */
export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
});

/**
 * Видалення поста за ідентифікатором
 */
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  // Початковий стан
  initialState: {
    items: [], // Список постів
    status: "idle", // Статус завантаження
    error: null, // Помилка, якщо є
    commentsCount: 0, // Кількість коментарів
  },
  // Синхронні редюсери
  reducers: {
    setCommentsCount: (state, action) => {
      state.commentsCount = action.payload;
    },
  },
  // Обробка асинхронних дій
  extraReducers: (builder) => {
    builder
      // Обробка отримання постів
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Обробка створення поста
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Обробка видалення поста
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export const { setCommentsCount } = postsSlice.actions;
export default postsSlice.reducer;
