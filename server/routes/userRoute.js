import express from "express";
import {
  deletUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  UpdateUserPassword,
  UpdateUserProfile,
  UpdateUserRole,
} from "../controllers/userContrller.js";
import { authorizeRoles, isAuthenticated } from "../middlewear/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, UpdateUserPassword);
router.route("/me/update").put(isAuthenticated, UpdateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), UpdateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deletUser);

export default router;
