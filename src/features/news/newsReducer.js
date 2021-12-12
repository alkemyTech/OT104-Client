import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api/news"

const initialState = {
  news: [],
  loading: false,
  error: null,
};

export const getAllNews = createAsyncThunk("news/getAllNews", async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.data;
  }
  catch (error) {
    throw new Error("Error al obtener las noticias");
  }
});

const newsReducer = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news = action.payload;
    });
    builder.addCase(getAllNews.rejected, (state) => {
      state.loading = false;
      state.error = "Error al obtener las noticias"
    });
  }
});

export default newsReducer.reducer
