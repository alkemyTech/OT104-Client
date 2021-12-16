import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "../../Services/publicApiService";

const initialState = {
  members: [],
  loading: false,
  error: null,
};

export const getMembers = createAsyncThunk(
  "backoffice/getMembers",
  async (_, { rejectWithValue }) => {
    try {
      let res = await get("http://ongapi.alkemy.org/api/members");
      if (!res.data.success) {
        return rejectWithValue(res.message);
      }
      return res.data.data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

const backofficeReducer = createSlice({
  name: "backoffice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMembers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.members = action.payload;
    });
    builder.addCase(getMembers.rejected, (state) => {
      state.loading = false;
      state.error = "Error get backoffice members";
    });
  },
});

export default backofficeReducer.reducer;
