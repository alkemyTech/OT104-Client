import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async ( dispatch ) => {
        try{
            const response = await axios.get(`http://ongapi.alkemy.org/api/members`);
            return response.data.data;
        }catch(error){
            return error;
        }
    }
)

const initialState = {
  users: [],
  status: null,
  message:""
}

export const backOfficeUsersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [getUsers.pending]: (state, action) => {
        state.status = "Loading"
    },
    [getUsers.fulfilled]: (state, action) => {
        state.status = "Success";
        state.users = action.payload
    },
    [getUsers.rejected]: (state, action) => {
        state.status = "Failed";
    },
  },
})

export const { renderUsersList } = backOfficeUsersSlice.actions

export default backOfficeUsersSlice.reducer