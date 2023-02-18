import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deletProduct,
  productDetails,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewear/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticated, createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deletProduct)
  .get(productDetails);

export default router;
