import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

// @desc    create new color
// @route   POST /api/v1/colors
// @access  Private/Admin

export const createColorsCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // ---- Brand Exists or not ----
  const colorFound = await Color.findOne({
    name: { $regex: name, $options: "i" }
  });

  if (colorFound) {
    throw new Error("Color already Exists");
  }

  // ----- Create color ------
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId
  });

  res.json({
    status: "Success",
    message: "Color Created successfully",
    color
  });
});

// @desc    get all colors
// @route   GET /api/v1/colors
// @access  Admin

export const getAllColorsCtrl = asyncHandler(async (req, res) => {
  const colors = await Color.find();

  res.json({
    status: "Success",
    message: "Color fetched successfully",
    colors
  });
});

// @desc    get single colors
// @route   GET /api/v1/colors/:id
// @access  Private/Admin

export const getSingleColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Color fetched successfully",
    color
  });
});

// @desc    update colors
// @route   PUT /api/v1/colors/:id
// @access  Private/Admin

export const updateColorsCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {  name: name.toLowerCase() },
    { new: true }
  );

  res.json({
    status: "Success",
    message: "Color updated successfully",
    color
  });
});

// @desc    Delete colors
// @route   DELETE /api/v1/colors/delete/:id
// @access  Private/Admin

export const deleteColorsCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findByIdAndDelete(req.params.id);

  res.json({
    status: "Success",
    message: "Color deleted successfully",
    color
  });
});
