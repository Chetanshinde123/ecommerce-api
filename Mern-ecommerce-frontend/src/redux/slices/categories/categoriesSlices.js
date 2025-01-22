import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";

// Initial State
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false
};

// Create Category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name
      } = payload;
      
      // Token 
      const token = getState()?.user?.userInfo?.token;
      console.log(token)

      // Config
      const config = {
        headers : {
          Authorization : `Bearer ${token}`,
        }
      }

      // make req
      const { data } = await axios.post(`${baseURL}/categories`, {
        name
      },
      config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
);

// Get Categorries action
export const getCategoryAction = createAsyncThunk(
  "categories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // make req
      const { data } = await axios.get(`${baseURL}/categories`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  }
);





// Category slices
const categorySlice = createSlice({
  name : "categories",
  initialState,
  extraReducers : (builder) => {
    // create category
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true
    })
    .addCase(createCategoryAction.fulfilled, (state,action) => {
      state.loading = false;
      state.category = action.payload
      state.isAdded = true
    })
    .addCase(createCategoryAction.rejected, (state,action) => {
      state.loading = false
      state.category = null
      state.isAdded = false
      state.error = action.payload 
    })

    // Fetch category
    builder.addCase(getCategoryAction.pending, (state) => {
      state.loading = true
    })
    .addCase(getCategoryAction.fulfilled, (state,action) => {
      state.loading = false;
      state.categories = action.payload
      state.isAdded = true
    })
    .addCase(getCategoryAction.rejected, (state,action) => {
      state.loading = false
      state.categories = null
      state.isAdded = false
      state.error = action.payload 
    })
  }
})

const categoryReducer = categorySlice.reducer;
export default categoryReducer