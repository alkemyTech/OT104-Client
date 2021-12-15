import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api/news"

const initialState = {
  news: [],
  loading: false,
  error: null,
};

export const getNews = createAsyncThunk("news/getNews", async () => {
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
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news = action.payload;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.loading = false;
      state.error = "Error al obtener las noticias"
    });
  }
});

export default newsReducer.reducer
