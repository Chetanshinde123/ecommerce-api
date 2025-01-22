import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";
// Initial State
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false
};

// Create product action
// export const createProductAction = createAsyncThunk(
//   "product/create",
//   async (payload, { rejectWithValue, getState, dispatch }) => {
//     console.log(payload);
//     try {
//       const {
//         name,
//         description,
//         category,
//         sizes,
//         brand,
//         colors,
//         price,
//         totalQty,
//         files
//       } = payload;
      
//       // Token 
//       const token = getState()?.users?.userAuth?.userInfo?.token;
//       console.log(token);
      

//       // Config
//       const config = {
//         headers : {
//           Authorization : `Bearer ${token}`,
//         }
//       }

//       // Form Data 
//       const formData = new FormData()
//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("category", category)
      
//       formData.append("brand", brand)
      
//       formData.append("price", price)
//       formData.append("totalQty", totalQty)
      

//       sizes.forEach(size => {
//         formData.append("sizes", size)
//       });
//       colors.forEach(color => {
//         formData.append("colors", color)
//       })
//       files.forEach(file => {
//         formData.append("files", file)
//       })
        
//       // make req
//       const { data } = await axios.post(`${baseURL}/products`, formData ,
//       config
//       );
//       console.log(data)
//       return data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data)
//     }
//   }
// );

export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("totalQty", totalQty);

      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });

      files.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


// Fetch all products
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
    
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      

      const { data } = await axios.post(
        `${baseURL}/products`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


// Product slices
const productSlice = createSlice({
  name : "product",
  initialState,
  extraReducers : (builder) => {
    // create product
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true
    })
    .addCase(createProductAction.fulfilled, (state,action) => {
      state.loading = false;
      state.product = action.payload
      state.isAdded = true
    })
    
    .addCase(createProductAction.rejected, (state,action) => {
      state.loading = false
      state.product = null
      state.isAdded = false
      state.error = action.payload 
    })

    // fetch all products
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchProductsAction.fulfilled, (state,action) => {
      state.loading = false;
      state.products = action.payload
      state.isAdded = true
    })
    
    .addCase(fetchProductsAction.rejected, (state,action) => {
      state.loading = false
      state.products = null
      state.isAdded = false
      state.error = action.payload 
    })
    // reset error 
    .addCase(resetErrAction.pending, (state,action) => {
      // state.loading = true
      state.error = null
    })
    // reset success
    .addCase(resetSuccessAction.pending, (state,action) => {
      // state.loading = true
      state.isAdded = false
    })
  }
})

const productReducer = productSlice.reducer;
export default productReducer