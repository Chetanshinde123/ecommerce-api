import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";

// @desc    create a new coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin

export const createCouponCtrl = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;

  //   Check User
  // const user = await User.findById(req.userAuthId);

  // check if coupon already exists
  const couponsExist = await Coupon.findOne({ code });

  if (couponsExist) {
    throw new Error("Coupon already exists");
  }

  // check if discount is number
  if (isNaN(discount)) {
    throw new Error("Discount value must be number");
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    startDate,
    endDate,
    discount,
    user: req.userAuthId
  });

  res.status(201).json({
    status: "success",
    message: "Coupon created successfully",
    coupon
  });
});

// @desc    Get all coupon
// @route   GET /api/v1/coupons
// @access  Private/Admin

export const getAllCouponCtrl = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    status: "success",
    message: "All coupons",
    coupons
  });
});

// @desc    Get single coupon
// @route   GET /api/v1/coupons
// @access  Private/Admin

export const getSingleCouponCtrl = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  res.json({
    status: "success",
    message: "Coupon fetched",
    coupon
  });
});

// @desc    update coupon
// @route   PUT /api/v1/coupons
// @access  Private/Admin

export const updateCouponCtrl = asyncHandler(async (req, res) => {
  const { code, discount, startDate, endDate } = req.body;
  const id = req.params.id;
  const coupon = await Coupon.findByIdAndUpdate(
    id,
    { code: code.toUpperCase(), discount, startDate, endDate },
    { new: true }
  );

  res.json({
    status: "success",
    message: "Coupon fetched",
    coupon
  });
});


export const deleteCouponCtrl = asyncHandler(async(req,res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id)

  res.json({
    status: "success",
    message: "Coupon deleted",
    coupon
  });
})

