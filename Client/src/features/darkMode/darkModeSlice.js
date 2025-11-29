// features/darkMode/darkModeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("darkMode")) || false;

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const newState = !state;
      localStorage.setItem("darkMode", JSON.stringify(newState));

      if (newState) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newState; // ✅ با primitive اینجا مشکلی ندارد اما گاهی بهتر است به state مقدار بدهیم
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
