import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Users/Forms/Login.jsx"; // Adjust the path if necessary
import Admin from "./components/Admin/Admin.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AdminRoute from "./components/AuthRoutes/AdminRoute.jsx";
import Register from "./components/Users/Forms/Register.jsx";
import axios from "axios";
import { useEffect } from "react";
import AddProduct from "./components/Admin/Products/AddProduct.jsx";

function App() {
  // useEffect(() => {
  //   async function product() {
  //     try {
  //       const response = await axios.get("https://dummyjson.com/products");
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   product();
  // }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* You can add more routes here, e.g. admin or dashboard route */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
