import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
