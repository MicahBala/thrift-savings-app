const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    inviteCode: { type: String, required: true, unique: true },
    contributionAmount: { type: Number, required: true },
    cycleGoal: { type: Number, required: true }, // Total amount to be reached or payout amount
    totalPool: { type: Number, default: 0 },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isCycleActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
