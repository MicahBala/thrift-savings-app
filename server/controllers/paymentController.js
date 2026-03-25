const Group = require('../models/Group');
const User = require('../models/User');

// @desc    Simulate funding the group vault via Interswitch
// @route   POST /api/v1/payments/fund
// @access  Private
const fundGroup = async (req, res, next) => {
  try {
    const { transactionReference } = req.body;

    if (!transactionReference) {
      res.status(400);
      throw new Error('Interswitch transaction reference is required');
    }

    if (!req.user.groupId) {
      res.status(400);
      throw new Error('You must be in a group to make a contribution');
    }

    const group = await Group.findById(req.user.groupId);
    const user = await User.findById(req.user._id);

    if (user.status === 'active') {
      res.status(400);
      throw new Error('You have already made your contribution for this cycle');
    }

    // Add the contribution amount to the Group's vault
    group.totalPool += group.contributionAmount;
    await group.save();

    // Update the user's status to 'active' (which means Paid) and set the timestamp
    user.status = 'active';
    user.lastPaidDate = Date.now();
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Payment verified and vault updated',
      data: {
        newVaultBalance: group.totalPool,
        userStatus: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Simulate admin disbursing funds to a member
// @route   POST /api/v1/payments/disburse
// @access  Private (Admin Only)
const disburseFunds = async (req, res, next) => {
  try {
    const { receiverId } = req.body;

    if (!req.user.groupId) {
      res.status(400);
      throw new Error('You are not assigned to a group');
    }

    const group = await Group.findById(req.user.groupId);

    // 1. Verify the requester is the Admin of this group
    if (group.adminId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Unauthorized: Only the group admin can disburse funds');
    }

    if (group.totalPool === 0) {
      res.status(400);
      throw new Error('The vault is currently empty');
    }

    // 2. Empty the vault (simulate the payout)
    const disbursedAmount = group.totalPool;
    group.totalPool = 0;
    await group.save();

    // 3. Reset all group members back to 'pending' for the next cycle
    await User.updateMany(
      { groupId: group._id },
      { $set: { status: 'pending', lastPaidDate: null } }
    );

    res.status(200).json({
      status: 'success',
      message: `Successfully disbursed ₦${disbursedAmount} to member ${receiverId}`,
      data: {
        newVaultBalance: group.totalPool,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { fundGroup, disburseFunds };
