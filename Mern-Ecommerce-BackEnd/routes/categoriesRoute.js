import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl
} from "../controllers/categoriesCtrl.js";
import upload, { uploadResult } from "../config/fileUpload.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn,upload.array("img"),uploadResult, createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", isLoggedIn, getSingleCategoryCtrl);
categoriesRouter.put("/:id", isLoggedIn, updateCategoryCtrl);
categoriesRouter.delete("/:id", isLoggedIn, deleteCategoryCtrl);

export default categoriesRouter;
