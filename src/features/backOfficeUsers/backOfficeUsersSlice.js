import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../Services/userService';

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, { rejectWithValue } ) => {
        try{
            const response = await userService.get();
            if(!response.data.success){
                return rejectWithValue(response.message);
            }
            return response.data.data;
        }catch({message}){
            return rejectWithValue(message);
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
    [getUsers.pending]: (state, _) => {
        state.status = "Loading"
    },
    [getUsers.fulfilled]: (state, action) => {
        state.status = "Success";
        state.users = action.payload
    },
    [getUsers.rejected]: (state, _) => {
        state.status = "Failed";
    },
  },
})

export const { renderUsersList } = backOfficeUsersSlice.actions

export default backOfficeUsersSlice.reducer