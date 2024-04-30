import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import todoReducer from "./todo/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;
