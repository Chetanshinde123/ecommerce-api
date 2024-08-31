import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createBrandCtrl,
  deleteBrandsCtrl,
  getAllBrandsCtrl,
  getSingleBrandsCtrl,
  updateBrandsCtrl
} from "../controllers/brandsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRouter = express.Router();

brandsRouter.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandsRouter.get("/", getAllBrandsCtrl);
brandsRouter.get("/:id", isLoggedIn, getSingleBrandsCtrl);
brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrandsCtrl);
brandsRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteBrandsCtrl);

export default brandsRouter;
