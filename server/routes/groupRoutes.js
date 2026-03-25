const express = require('express');
const { body } = require('express-validator');
const { createGroup, joinGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validatorMiddleware');

const router = express.Router();

router.post(
  '/create',
  protect,
  [
    body('groupName').notEmpty().withMessage('Group name is required'),
    body('contributionAmount')
      .isNumeric()
      .withMessage('Contribution amount must be a number'),
    body('cycleGoal').isNumeric().withMessage('Cycle goal must be a number'),
    body('frequency')
      .isIn(['daily', 'weekly', 'monthly'])
      .withMessage('Invalid frequency type'),
  ],
  validateRequest,
  createGroup
);

router.post(
  '/join',
  protect,
  [
    body('inviteCode')
      .isLength({ min: 6, max: 6 })
      .withMessage('Invite code must be exactly 6 characters'),
  ],
  validateRequest,
  joinGroup
);

module.exports = router;
