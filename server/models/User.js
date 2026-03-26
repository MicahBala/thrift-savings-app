const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    bankName: { type: String, required: false },
    accountNumber: { type: String, required: false },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'defaulted', 'pending'],
      default: 'pending',
    },
    lastPaidDate: { type: Date, default: null },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
