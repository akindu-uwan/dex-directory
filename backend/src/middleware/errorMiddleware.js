export function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  // If no status was set, use 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
}
