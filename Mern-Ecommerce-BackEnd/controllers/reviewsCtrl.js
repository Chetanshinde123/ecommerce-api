import asyncHandler from "express-async-handler";
import Review from "../model/Reviews.js";
import Product from "../model/Product.js";

// @desc    create new review
// @route   POST /api/v1/reviews
// @access  Private/Admin

export const createReviewsCtrl = asyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;

  //   1. Finding the product
  const { productId } = req.params;

  const productFound = await Product.findById(productId).populate("reviews"); 
  // Use .populate() gives full Object of productFound which is needed in reviews, if not use we get only productFound id only
  // .populate() method is used to replace the productFound ObjectId field with the whole document consisting of all the productFound data
  if (!productFound) {
    throw new Error("Product does not exists create the product");
  }

  //   2 Check if user already reviewed this product or no
  const hasReviewed = productFound?.reviews?.find(review => {

    console.log(review?.user) // It will be in Object
    review?.user.toString() // It will be in sting
    
    // .toString() convert _id into  string , so that it compare or else it gets object id.
    return review?.user.toString() === req?.userAuthId.toString(); //Note : Here we get
  });

  if (hasReviewed) {
    throw new Error("You have review this product");
  }
  // Create Review

  const review = await Review.create({
    rating,
    message,
    product: productFound?._id,
    user: req.userAuthId
  });
  //  Push review into product found id
  productFound.reviews.push(review._id);
  // Save the review
  await productFound.save();
  res.json({
    status: "Success",
    message: "Review Created successfully",
    productFound
  });
});
