import express from "express";

import {
  getAllProducts,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);

export default router;
