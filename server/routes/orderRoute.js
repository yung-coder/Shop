import express from "express";
import {
  deletOrder,
  getAllOrders,
  getLoginedUserOrder,
  getSingleOrder,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { isAuthenticated, authorizeRoles } from "../middlewear/auth.js";

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
  .updateOrder(isAuthenticated, authorizeRoles("admin"), deletOrder);

export default router;
