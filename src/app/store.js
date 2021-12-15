import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import newsReducer from '../features/news/newsReducer';
import backOficeUsersReducer from '../features/backOfficeUsers/backOfficeUsersSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    users: backOficeUsersReducer
  },
});
