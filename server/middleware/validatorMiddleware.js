const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a 400 Bad Request with the first error message
    return res.status(400).json({
      status: 'error',
      message: errors.array()[0].msg,
    });
  }
  next();
};

module.exports = { validateRequest };
