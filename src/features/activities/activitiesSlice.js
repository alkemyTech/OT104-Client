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
      return res;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  datos: [],
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
          datos: payload.data.data,
          status: "fulfilled",
          message: payload.message,
        };
      })
      .addCase(getActividades.rejected, (_, { payload }) => {
        return {
          datos: undefined,
          status: "rejected",
          message: payload,
        };
      });
  },
});

export default activitiesSlice.reducer;
