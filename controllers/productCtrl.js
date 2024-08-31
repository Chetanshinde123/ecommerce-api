import { uploadResult } from "../config/fileUpload.js";
import Brand from "../model/Brand.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

export const createProductCtrl = asyncHandler(async (req, res) => {
  // console.log(req.files)

  const covertedImgs = req.files.map(file => file.path);

  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand
  } = req.body;

  //   Product Exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Errow("Products Already Exists");
  }

  //----- Find the category in Category Model ---------
  const categoryFound = await Category.findOne({
    name: { $regex: category, $options: "i" }
  });

  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check check category name"
    );
  }

  //----- Find the brand in Brand Model ---------
  const brandFound = await Brand.findOne({
    name: { $regex: brand, $options: "i" }
  });

  if (!brandFound) {
    throw new Error(
      "Brand not found, please create brand first or check brand name"
    );
  }

  // Creating Product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    images : covertedImgs,
    brand
  });

  // Pushing the product into category model (This pushes the id of product details)
  categoryFound.products.push(product._id);
  // Resave the data
  await categoryFound.save();

  // Pushing the product into brand model (This pushes the id of product details)
  brandFound.products.push(product._id);

  await brandFound.save();

  res.json({
    status: "Success",
    message: "Product created successfully",
    product
  });
});

// @desc    Get All Products
// @route   GET /api/v1/products
// @access  Public
export const getProductsCtrl = asyncHandler(async (req, res) => {
  console.log(req.query);

  // Query
  let productQuery = Product.find();

  // ---------- Filter out using name -----------
  if (req.query.name) {
    productQuery = productQuery.find({
      // $ regex is use to compare name no matter lower or uppercase
      name: { $regex: req.query.name, $options: "i" }
    });
  }

  // ------- Filterout using colors --------------
  if (req.query.color) {
    productQuery = productQuery.find({
      // option : i (case-insensitively) compare query no matter lower or uppercase
      colors: { $regex: req.query.color, $options: "i" } // $ regex is use to transform uppercase and lowercase in as per data
    });
  }

  // -------- Filter out using brand ------------
  if (req.query.brand) {
    productQuery = productQuery.find({
      // option : i (case-insensitively) compare query no matter lower or uppercase
      brand: { $regex: req.query.brand, $options: "i" }
    });
  }

  // ----------- Filter out sing category ---------
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" }
    });
  }

  // --------- Filter out using sizes -----------
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" }
    });
  }

  // ---------- Filter out using prix=ce range --------
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    // gte = greater than equal to
    // lte = less than equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] }
    });
    console.log(priceRange);
  }

  //  Pagination
  // Page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

  // limit - Data on one page
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

  // startIndex
  const startIndex = (page - 1) * limit;

  // endIndex
  const endIndex = page * limit;

  // total
  const total = await Product.countDocuments().populate("reviews");

  productQuery = productQuery.skip(startIndex).limit(limit);

  //------------- Pagination Result ----------------------
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  // Await means end of operation we cannot perform any action after await
  const products = await productQuery.populate("reviews");
  // console.log(products);

  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    products
  });
});

// @desc    Get single products
// @route   GET /api/v1/products/:id
// @access  Public

export const getProductByIdCtrl = asyncHandler(async (req, res) => {
  console.log(req.params);
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }

  res.json({
    status: "Success",
    message: "Product fetched Successfully",
    product
  });
});

// @desc    update products
// @route   PUT /api/v1/products/:id
// @access  Public

export const updateProductCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand
  } = req.body;

  // Update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand
    },
    { new: true }
  );

  res.json({
    status: "Success",
    message: "Product fetched Successfully",
    product
  });
});

// @desc    Delete product
// @route   Delete /api/v1/products/:id
// @access  Public

export const deleteProductCtrl = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Product deleted Successfully",
    product
  });
});
