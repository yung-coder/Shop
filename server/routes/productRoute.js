import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deletProduct,
  productDetails,
} from "../controllers/productController.js";
import { isAuthenticated, authorizeRoles } from "../middlewear/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deletProduct)
  .get(productDetails);

export default router;
