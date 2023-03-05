const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("../middlewear/asyncerrors");
const ApiFeatures = require("../utils/apifeatures");

// Creating Product  -- admin
exports.createProduct = catchasyncerror(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Product

exports.getAllProducts = catchasyncerror(async (req, res) => {
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
    resultPerPage,
  });
});

// update product -- admin

exports.updateProduct = catchasyncerror(async (req, res) => {
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

exports.deletProduct = catchasyncerror(async (req, res, next) => {
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

exports.productDetails = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.createProductReview = catchasyncerror(async (req, res, next) => {
  const { rating, productId, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (!isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product  not found", 404));
  }

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

exports.deletReview = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.query.productid);

  if (!product) {
    return next(new ErrorHandler("Product  not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numofReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
