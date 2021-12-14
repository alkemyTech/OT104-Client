import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import activitiesServices from '../../Services/activitiesService';

export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async (_, { rejectWithValue }) => {
    try {
      let res = await activitiesServices.getActivities();
      if (!res.success) {
        return rejectWithValue(res.message);
      }
      return res;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  data: [],
  status: '',
  message: '',
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getActivities.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getActivities.fulfilled, (_, { payload }) => {
        return {
          data: payload.data,
          status: 'fulfilled',
          message: payload.message,
        };
      })
      .addCase(getActivities.rejected, (_, { payload }) => {
        return {
          data: undefined,
          status: 'rejected',
          message: payload,
        };
      });
  },
});

export default activitiesSlice.reducer;