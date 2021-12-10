import { configureStore } from '@reduxjs/toolkit';
import activitiesSlice from '../features/categories/activitiesSlice';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    activities: activitiesSlice,
  },
});
