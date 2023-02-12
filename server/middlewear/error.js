import ErrorHandler from "../utils/errorhandler.js";

export const Customerror = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal  server error";

  // wrong db error

  if ((err.name = "CastError")) {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
