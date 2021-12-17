import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrgData = createAsyncThunk(
    "about/fetchOrgData",
    async () =>  {
    const response = await axios.get("http://ongapi.alkemy.org/api/organization")
    if (response.success) {
        return response.data.data;
    }
        throw new Error
});

export const fetchMembersData = createAsyncThunk(
    "about/fetchMembersData",
    async () => {
    const response = await axios.get("http://ongapi.alkemy.org/api/members")
    if (response.success) {
        return response.data.data;
    }
        throw new Error
});

export const aboutReducer = createSlice({
    name: "about",
    initialState: {
        orgData: [],
        membersData: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrgData.pending, (state) => {
            state.status = "loading"
        }),
        builder.addCase(fetchOrgData.fulfilled, (state, action) => {
            state.orgData = action.payload
            state.status = "success"
        }),
        builder.addCase(fetchOrgData.rejected, (state) => {
            state.status = "failed"
        }),
        builder.addCase(fetchMembersData.pending, (state) => {
            state.status = "loading"
        }),
        builder.addCase(fetchMembersData.fulfilled, (state, action) => {
            state.membersData = action.payload
            state.status = "success"
        }),
        builder.addCase(fetchMembersData.rejected, (state) => {
            state.status = "failed"
        })
    }
});

export default aboutReducer.reducer;
