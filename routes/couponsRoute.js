import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createCouponCtrl,
  deleteCouponCtrl,
  getAllCouponCtrl,
  getSingleCouponCtrl,
  updateCouponCtrl
} from "../controllers/couponsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRouter = express.Router();

couponRouter.post("/", isLoggedIn, isAdmin, isLoggedIn, createCouponCtrl);
couponRouter.get("/", getAllCouponCtrl);
couponRouter.get("/:id", isLoggedIn, isAdmin, getSingleCouponCtrl);
couponRouter.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);
couponRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponCtrl);

export default couponRouter;
