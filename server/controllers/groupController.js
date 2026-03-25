const crypto = require('crypto');
const Group = require('../models/Group');
const User = require('../models/User');

// @desc    Create a new savings group
// @route   POST /api/v1/groups/create
// @access  Private
const createGroup = async (req, res, next) => {
  try {
    const { groupName, contributionAmount, cycleGoal, frequency } = req.body;

    // Check if user is already in a group (optional MVP constraint, but good practice)
    if (req.user.groupId) {
      res.status(400);
      throw new Error('You are already part of a group');
    }

    // Generate a random 6-character invite code
    const inviteCode = crypto.randomBytes(3).toString('hex').toUpperCase();

    const group = await Group.create({
      groupName,
      inviteCode,
      contributionAmount,
      cycleGoal,
      frequency,
      adminId: req.user._id, // req.user comes from the JWT middleware
    });

    // Update the creator's user profile
    await User.findByIdAndUpdate(req.user._id, {
      role: 'admin',
      groupId: group._id,
    });

    res.status(201).json({
      status: 'success',
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Join an existing savings group
// @route   POST /api/v1/groups/join
// @access  Private
const joinGroup = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;

    if (req.user.groupId) {
      res.status(400);
      throw new Error('You are already part of a group');
    }

    // Find the group by invite code
    const group = await Group.findOne({ inviteCode: inviteCode.toUpperCase() });

    if (!group) {
      res.status(404);
      throw new Error('Invalid invite code. Group not found.');
    }

    if (!group.isCycleActive) {
      res.status(400);
      throw new Error('This group is not currently accepting new members.');
    }

    // Update the user's profile to join the group
    await User.findByIdAndUpdate(req.user._id, {
      groupId: group._id,
      // Role defaults to 'member' based on our User schema, so no need to update it
    });

    res.status(200).json({
      status: 'success',
      message: `Successfully joined ${group.groupName}`,
      data: {
        groupId: group._id,
        groupName: group.groupName,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGroup, joinGroup };
