import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

// @desc    create new brands
// @route   POST /api/v1/brands
// @access  Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // ---- Brand Exists or not ----
  const brandFound = await Brand.findOne({
    name: { $regex: name, $options: "i" }
  });

  if (brandFound) {
    throw new Error("Brand already Exists");
  }

  // ----- Create brand ------
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId
  });

  res.json({
    status: "Success",
    message: "Brand Created successfully",
    brand
  });
});

// @desc    Get all brands
// @route   GET /api/v1/brands
// @access  Private/Admin

export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.json({
    status: "success",
    message: "Brands fetch Successfully",
    brands
  });
});

// @desc    Get single brand
// @route   GET /api/v1/brands
// @access  Private/Admin

export const getSingleBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.findById(req.params.id);

  res.json({
    status: "success",
    message: "Brands fetch Successfully",
    brands
  });
});

// @desc    Update brands
// @route   PUT /api/v1/brands
// @access  Private/Admin

export const updateBrandsCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brands = await Brand.findByIdAndUpdate(
    req.params.id,
    {  name: name.toLowerCase() },
    { new: true }
  );

  res.json({
    status: "success",
    message: "Brands updated Successfully",
    brands
  });
});

// @desc    Delete brands
// @route   DELETE /api/v1/brands
// @access  Private/Admin

export const deleteBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Brands deleted Successfully",
    brands
  });
});
