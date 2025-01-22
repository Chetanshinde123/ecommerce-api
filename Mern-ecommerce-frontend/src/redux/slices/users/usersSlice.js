import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction } from "../globalActions/globalActions";

// initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  }
};




// Register action 
export const registerUserAction = createAsyncThunk(
  "users/register",
  async ({email,password, fullname}, { rejectWithValue, getState, dispatch}) => {
    try {
        const {data} = await axios.post(`${baseURL}/users/register`, {
            fullname,
            email,
            password 
        })

        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
  }
);

// login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({email,password}, { rejectWithValue, getState, dispatch}) => {
    try {
        const {data} = await axios.post(`${baseURL}/users/login`, {
            email,
            password 
        })
        
        // Save user to local 
        localStorage.setItem("userInfo",JSON.stringify(data))   // UserInfo = Key any variable ; 2nd parameter = data we need to store but should be stringyfy

        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
  }
);

// users slice
const usersSlice = createSlice({
    name : "users",
    initialState,
    extraReducers :  (builder) => {
      // login
        builder.addCase(loginUserAction.pending, (state, action) =>{
            state.userAuth.loading = true
        })
        builder.addCase(loginUserAction.fulfilled, (state, action) =>{
            state.userAuth.userInfo = action.payload
            state.userAuth.loading = false
        })
        builder.addCase(loginUserAction.rejected, (state, action) =>{
            state.userAuth.error = action.payload
            state.userAuth.loading = false
        })

        // register
        builder.addCase(registerUserAction.pending, (state, action) =>{
          state.loading = true
      })
      builder.addCase(registerUserAction.fulfilled, (state, action) =>{
          state.user = action.payload
          state.loading = false
      })
      builder.addCase(registerUserAction.rejected, (state, action) =>{
          state.error = action.payload
          state.loading = false
      })
      // reset err action
      builder.addCase(resetErrAction.pending, (state)=>{
        state.error = null
        state.userAuth.error = null;
      })
    }
})

// generate reducer
const usersReducer = usersSlice.reducer

export default usersReducer