const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deletProduct,
  productDetails,
  createProductReview,
  getProductReviews,
  deletReview,
}  =  require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middlewear/auth");

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

router.route("/review").get(isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deletReview);

module.exports = router;
