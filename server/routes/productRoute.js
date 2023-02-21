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
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deletProduct);

router.route("/product/:id").get(productDetails);

export default router;
