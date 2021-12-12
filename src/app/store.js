import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import usReducer from "./slices/us/usSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    us: usReducer
  },
});
