import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import aboutReducer from "../features/about/aboutReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
  },
});
