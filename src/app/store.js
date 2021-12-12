import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categories/categoriesSlice";
import authReducer from "../features/auth/authReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesSlice,
  },
});
