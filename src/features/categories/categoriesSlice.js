import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../Services/categoriesService";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      let res = await categoryService.getAll();
      if (!res.data.success) {
        return rejectWithValue(res.message);
      }
      return res.data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      let res = await categoryService.get(id);
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
      })
      .addCase(getCategoryById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCategoryById.fulfilled, (_, { payload }) => {
        return {
          data: payload.data,
          status: "fulfilled",
          message: payload.message,
        };
      })
      .addCase(getCategoryById.rejected, (_, { payload }) => {
        return {
          data: undefined,
          status: "rejected",
          message: payload,
        };
      });
  },
});

export default categoriesSlice.reducer;
