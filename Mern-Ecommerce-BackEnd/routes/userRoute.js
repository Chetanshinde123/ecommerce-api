// Using router through express

// import express from "express"
// const userRoutes = express.Router()

// --------------------------------------------------------
// Calling default Router and use of it
import { Router } from "express";
import {
  getUserProfileCtrl,
  loginUserCtrl,
  registerUserCtrl,
  updateShippingAddressCtrl
} from "../controllers/usersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);
userRoutes.get("/update/shipping", isLoggedIn, updateShippingAddressCtrl);

export default userRoutes;
