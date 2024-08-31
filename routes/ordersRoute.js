import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createOrderCtrl,
  getOrdersCtrl,
  getOrderStatsCtrl,
  getsingleOrderCtrl,
  updateOrderCtrl
} from "../controllers/ordersCtrl.js";

const orderRouters = express.Router();

orderRouters.post("/", isLoggedIn, createOrderCtrl);
orderRouters.get("/", isLoggedIn, getOrdersCtrl);
orderRouters.get("/sales/stats", isLoggedIn, getOrderStatsCtrl);
orderRouters.get("/:id", isLoggedIn, getsingleOrderCtrl);
orderRouters.put("/update/:id", isLoggedIn, updateOrderCtrl);

export default orderRouters;
