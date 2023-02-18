import ErrorHandler from "../utils/errorhandler.js";

export const Customerror = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal  server error";

  // wrong db error

  if ((err.name = "CastError")) {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json web tokem expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
