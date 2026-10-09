export function notFoundMiddleware(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    errors: [],
  });
}

export function errorMiddleware(err, req, res, next) {
  console.error(err);

  let status = err.status || 500;
  let message = err.message || "Internal server error";
  let errors = [];

  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map(
      (e) => e.message
    );
  }

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid resource id";
  }

  if (err.code === 11000) {
    status = 409;
    message = "Duplicate value";
    errors = Object.keys(
      err.keyPattern || {}
    );
  }

  if (err.name === "MulterError") {
    status = 400;
    message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Product image must be between 50 KB and 60 KB."
        : err.message;
  }

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" &&
      status === 500
        ? "Internal server error"
        : message,
    errors,
  });
}