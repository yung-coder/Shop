const express = require("express");
const {
  deletOrder,
  getAllOrders,
  getLoginedUserOrder,
  getSingleOrder,
  newOrder,
  updateOrder,
} =  require("../controllers/orderController");
const { isAuthenticated, authorizeRoles } = require("../middlewear/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/order/me").get(isAuthenticated, getLoginedUserOrder);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deletOrder);

module.exports = router;
