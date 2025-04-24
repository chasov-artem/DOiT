/**
 * Slice для управління темою додатку
 * Відповідає за перемикання між світлою та темною темами
 */

import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  // Початковий стан: світла тема
  initialState: {
    isDarkMode: false,
  },
  // Редюсери для зміни теми
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
