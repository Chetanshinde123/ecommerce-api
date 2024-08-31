import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

// @desc    Create new category
// @route   Post /api/v1/categories
// @access  Private/Admin

export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // console.log(req.files)

  const convertedImg = req.files.map((file) => file.path)
  // console.log(convertedImg)

  
  // Category Exists
  const categoryFound = await Category.findOne({
    name: { $regex: name, $options: "i" }
  });
  if (categoryFound) {
    throw new Error("Category already Exists");
  }

  // ---- Create
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
    image : convertedImg
  });

  res.json({
    status: "success",
    message: "Category created Successfully",
    category
  });
});

// @desc    Get all category
// @route   GET /api/v1/categories
// @access  Private/Admin

export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "success",
    message: "Categories fetch Successfully",
    categories
  });
});

// @desc    Get single category
// @route   GET /api/v1/categories
// @access  Private/Admin

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.json({
    status: "success",
    message: "Category fetch Successfully",
    category
  });
});

// @desc     Update category
// @route    PUT /api/v1/categories
// @access   Private/Admin

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {  name: name.toLowerCase() },
    { new: true }
  );

  res.json({
    status: "success",
    message: "Category updated Successfully",
    category
  });
});

// @desc     Delete category
// @route    DELETE /api/v1/categories
// @access   Private/Admin

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Category deleted Successfully",
    category
  });
});
