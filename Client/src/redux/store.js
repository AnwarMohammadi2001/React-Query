// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import usersReducer from "../features/users/usersSlice";
import darkModeReducer from "../features/darkMode/darkModeSlice";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
    darkMode: darkModeReducer,
  },
});
