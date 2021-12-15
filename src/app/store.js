import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer";
import newsReducer from "../features/news/newsReducer";
import activitiesSlice from "../features/activities/activitiesSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});
