import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async (_, { rejectWithValue }) => {
    try {
      let res = await fetch('http://ongapi.alkemy.org/api/activities').then(
        (data) => data.json()
      );
      console.log(res);
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
