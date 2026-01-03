import { ENV } from "../config/env.js";

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (ENV.NODE_ENV !== "production") {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: err.message || "Something went wrong",
  });
};
