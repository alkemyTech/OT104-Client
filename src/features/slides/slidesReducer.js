import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api/slides";

export const getSlides = createAsyncThunk("slides/getAllSlides", async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.data;
  } catch (error) {
    throw new Error("Error al intentar obtener las Imagenes");
  }
});

const slidesSlice = createSlice({
  name: "slices",
  initialState: { photos: [], loading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSlides.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSlides.fulfilled, (state, action) => {
      state.loading = false;
      state.photos = action.payload;
    });
    builder.addCase(getSlides.rejected, (state) => {
      state.loading = false;
      state.error = "Error al obtener las noticias";
    });
  },
});

// export const { setSlidesArray } = slidesSlice.actions;

export default slidesSlice.reducer;
