import Product from "../models/productModel.js";

// Creating Product
export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

export const getAllProducts = (req, res) => {
  res.status(200).json({ message: "Route check" });
};
