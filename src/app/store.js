import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categories/categoriesSlice";
import authReducer from "../features/auth/authReducer";
import newsReducer from "../features/news/newsReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesSlice,
    news: newsReducer,
  },
});
