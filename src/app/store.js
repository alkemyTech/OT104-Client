import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authReducer';
import newsReducer from '../features/news/newsReducer';
import backofficeReducer from "../features/backoffice_members/backofficeMembersReducer";
export default configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    getBackofficeMembers: backofficeReducer,
  },
});
