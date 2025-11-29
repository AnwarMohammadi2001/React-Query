// features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  return data.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      const user = state.users.find((u) => u.username === action.payload);
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;
