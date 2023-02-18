import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorhandler.js";

import catchasyncerror from "../middlewear/asyncerrors.js";
import ApiFeatures from "../utils/apifeatures.js";

// Creating Product  -- admin
export const createProduct = catchasyncerror(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Product

export const getAllProducts = catchasyncerror(async (req, res) => {
  const resultPerPage = 5;

  const productCount = await Product.countDocuments();
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// update product -- admin

export const updateProduct = catchasyncerror(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delet product

export const deletProduct = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});

// get product details

export const productDetails = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
