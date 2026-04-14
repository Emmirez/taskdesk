// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || "Internal server error";

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message    = `An account with that ${field} already exists`;
    statusCode = 409;
  }

  if (err.name === "ValidationError") {
    message    = Object.values(err.errors).map((e) => e.message).join(", ");
    statusCode = 400;
  }

  if (err.name === "CastError") {
    message    = `Invalid ${err.path}: ${err.value}`;
    statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    message    = "Invalid token";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message    = "Token expired — please log in again";
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
