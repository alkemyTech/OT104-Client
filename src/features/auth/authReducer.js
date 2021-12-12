import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  status: "",
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await axios.post("http://ongapi.alkemy.org/api/login", data);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error("Login Failed");
  }
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const response = await axios.post(
    "http://ongapi.alkemy.org/api/register",
    data
  );
  return await response.data.data;
});

export const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected", action);
        state.status = "rejected";
      });

    builder
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;
