import { Router } from "express";
import upload, { uploadResult } from "../config/fileUpload.js";
import {
  createProductCtrl,
  deleteProductCtrl,
  getProductByIdCtrl,
  getProductsCtrl,
  updateProductCtrl
} from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const productsRouter = Router();

productsRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.array("files"),
  uploadResult,
  createProductCtrl
);
productsRouter.get("/", getProductsCtrl);
productsRouter.get("/:id", getProductByIdCtrl);
productsRouter.put("/:id", isLoggedIn, isAdmin, isLoggedIn, updateProductCtrl);
productsRouter.delete("/:id/delete", isLoggedIn, isAdmin, deleteProductCtrl);

export default productsRouter;
