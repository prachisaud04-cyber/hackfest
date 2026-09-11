const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    college: {
      type: String,
      required: [true, 'College / Institution name is required'],
      trim: true,
    },
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
    },
    teamSize: {
      type: Number,
      required: [true, 'Team size is required'],
      enum: {
        values: [2, 3, 4],
        message: 'Team size must be 2, 3, or 4 members',
      },
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    track: {
      type: String,
      required: [true, 'Challenge track is required'],
      trim: true,
    },
    registrationId: {
      type: String,
      required: [true, 'Registration ID is required'],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'registered',
      enum: ['registered', 'confirmed', 'waitlisted', 'cancelled'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
