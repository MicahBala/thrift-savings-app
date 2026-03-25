const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const {
  fundGroup,
  disburseFunds,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validatorMiddleware');

router.post(
  '/fund',
  protect,
  [
    body('transactionReference')
      .notEmpty()
      .withMessage(
        'Transaction reference is required from the payment gateway'
      ),
  ],
  validateRequest,
  fundGroup
);

router.post(
  '/disburse',
  protect,
  [
    body('receiverId')
      .notEmpty()
      .withMessage('Receiver ID is required for disbursement'),
  ],
  validateRequest,
  disburseFunds
);

module.exports = router;
