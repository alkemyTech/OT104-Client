import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authReducer";
import slidesReducer from "../features/slides/slidesReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    slides: slidesReducer,
  },
});
