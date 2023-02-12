import Product from "../models/productModel.js";

// Creating Product  -- admin
export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Get all Product

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// update product -- admin

export const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: true,
      message: "Product not found",
    });
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
};

// delet product

export const deletProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
};
