import catchasyncerror from "../middlewear/asyncerrors.js";
import ErrorHandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const isAuthenticated = catchasyncerror(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please  Login to access this response", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to acces this role`,
          403
        )
      );
    }

    next();
  };
};
