// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // If the status code is 200 but an error was thrown, default to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    // Only show the stack trace in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
