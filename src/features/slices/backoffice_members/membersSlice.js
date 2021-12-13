import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBackofficeMembers = createAsyncThunk(
  "backofficeMembers/getBackofficeMembers",
  async (_, { rejectWithValue }) => {
    try {
      let res = await fetch("http://ongapi.alkemy.org/api/users").then((data) =>
        data.json()
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
  status: "",
  message: "",
};

const backofficeMembersSlice = createSlice({
  name: "backofficeMembers",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getBackofficeMembers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBackofficeMembers.fulfilled, (_, { payload }) => {
        return {
          data: payload.data,
          status: "fulfilled",
          message: payload.message,
        };
      })
      .addCase(getBackofficeMembers.rejected, (_, { payload }) => {
        return {
          data: undefined,
          status: "rejected",
          message: payload,
        };
      });
  },
});

export default backofficeMembersSlice.reducer;
