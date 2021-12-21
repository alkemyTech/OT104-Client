import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActivities } from "../../Services/activitiesService";

export const getActividades = createAsyncThunk(
  "activities/getActivities",
  async (_, { rejectWithValue }) => {
    try {
      let res = await getActivities();
      if (!res.data.success) {
        return rejectWithValue(res.message);
      }
      return res.data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  data: [],
  status: "",
  message: "",
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getActividades.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getActividades.fulfilled, (_, { payload }) => {
        return {
          data: payload.data,
          status: "fulfilled",
          message: payload.message,
        };
      })
      .addCase(getActividades.rejected, (_, { payload }) => {
        return {
          data: undefined,
          status: "rejected",
          message: payload,
        };
      });
  },
});

export default activitiesSlice.reducer;
