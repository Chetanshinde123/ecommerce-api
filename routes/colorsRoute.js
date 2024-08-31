import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

import {
  createColorsCtrl,
  deleteColorsCtrl,
  getAllColorsCtrl,
  getSingleColorCtrl,
  updateColorsCtrl
} from "../controllers/colorsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorsRouter = express.Router();

colorsRouter.post("/", isLoggedIn, isAdmin, createColorsCtrl);
colorsRouter.get("/", getAllColorsCtrl);
colorsRouter.get("/:id", isLoggedIn, getSingleColorCtrl);
colorsRouter.put("/:id", isLoggedIn, isAdmin, updateColorsCtrl);
colorsRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteColorsCtrl);

export default colorsRouter;
