const express = require('express');
const rateLimit = require('express-rate-limit');
const { signup, signin } = require('../controllers/authController');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message: {
    status: 'error',
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  },
});

router.post('/signup', authLimiter, signup);
router.post('/signin', authLimiter, signin);

module.exports = router;
