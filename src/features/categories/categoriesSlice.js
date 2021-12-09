import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      let res = await fetch("http://ongapi.alkemy.org/api/categories").then(
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
  status: "",
  message: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCategories.fulfilled, (_, { payload }) => {
        return {
          data: payload.data,
          status: "fulfilled",
          message: payload.message,
        };
      })
      .addCase(getCategories.rejected, (_, { payload }) => {
        return {
          data: undefined,
          status: "rejected",
          message: payload,
        };
      });
  },
});

export default categoriesSlice.reducer;
