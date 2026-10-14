export function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
}

export function errorHandler(err, req, res, next) {
  // Always log the full error server-side
  console.error("💥 Error:", err);

  const isProduction = process.env.NODE_ENV === "production";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 && isProduction
        ? "Something went wrong. Please try again later."
        : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}