import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct);

export default router;
