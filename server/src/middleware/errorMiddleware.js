export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode || res.statusCode || 500;
  let message = error.message || "Something went wrong.";

  if (statusCode < 400) {
    statusCode = 500;
  }

  if (error.name === "CastError") {
    statusCode = 404;
    message = "The requested resource was not found.";
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "A record with that value already exists.";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
