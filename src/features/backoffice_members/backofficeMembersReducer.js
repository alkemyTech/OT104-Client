import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "../../../Services/publicApiService";

const initialState = {
  membersList: [],
  loading: false,
  error: null,
};

export const getMembers = createAsyncThunk(
  "backoffice/getMembers",
  async () => {
    try {
      const response = await get("http://ongapi.alkemy.org/api/members", null);
      return response.data.data;
    } catch (error) {
      throw new Error("Error get members backoffice");
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
      state.membersList = action.payload;
    });
    builder.addCase(getMembers.rejected, (state) => {
      state.loading = false;
      state.error = "Error get backoffice members";
    });
  },
});

export default backofficeReducer.reducer;
