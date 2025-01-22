import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReviewsCtrl } from "../controllers/reviewsCtrl.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId", isLoggedIn, createReviewsCtrl);

export default reviewRouter;
