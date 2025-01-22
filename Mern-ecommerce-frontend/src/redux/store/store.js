// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "../slices/users/usersSlice";

// // store
// const store = configureStore({
//   reducer: {
//     users: usersReducer
//   }
// });

// export default store;
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice.js"; // Import your slice reducers
import productReducer from "../slices/products/productSlices.js";
import categoryReducer from "../slices/categories/categoriesSlices.js";
import brandReducer from "../slices/brands/brandSlices,js";
import colorReducer from "../slices/colors/colorSlices,js";

const store = configureStore({
  reducer: {
    users: userReducer, // Add your reducers here
    product: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer
  }
});

export default store;
