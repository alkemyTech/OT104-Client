import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../Services/publicApiService";

export const fetchOrgData = createAsyncThunk(
  "about/fetchOrgData",
  async (_, { rejectWithValue }) => {
    try {
      let res = await get(process.env.REACT_APP_URL_ORGANIZATION);
      if (!res.data.success) {
        return rejectWithValue(res.message);
      }
      return res.data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const fetchMembersData = createAsyncThunk(
  "about/fetchMembersData",
  async (_, { rejectWithValue }) => {
    try {
      let res = await getRequest(process.env.REACT_APP_MEMBERS_BASE_URL);
      if (!res.data.success) {
        return rejectWithValue(res.message);
      }
      return res.data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const aboutReducer = createSlice({
  name: "about",
  initialState: {
    orgData: [],
    membersData: [],
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrgData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrgData.fulfilled, (state, { payload }) => {
        state.orgData = payload.data;
        state.status = "success";
      })
      .addCase(fetchOrgData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMembersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembersData.fulfilled, (state, { payload }) => {
        state.membersData = payload.data;
        state.status = "success";
      })
      .addCase(fetchMembersData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default aboutReducer.reducer;
