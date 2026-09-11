const mongoose = require('mongoose');
const Registration = require('../models/Registration');

/**
 * Helper function to generate sequential, unique Registration IDs:
 * Format: HF26-00001, HF26-00002, etc.
 */
async function generateNextRegistrationId() {
  try {
    // Find the latest registration document sorted by creation date or registration ID
    const lastRegistration = await Registration.findOne(
      { registrationId: { $regex: /^HF26-\d{5}$/ } },
      { registrationId: 1 }
    ).sort({ createdAt: -1, _id: -1 });

    if (!lastRegistration || !lastRegistration.registrationId) {
      return 'HF26-00001';
    }

    // Extract the numeric portion
    const currentNumberStr = lastRegistration.registrationId.replace('HF26-', '');
    const currentNumber = parseInt(currentNumberStr, 10);

    if (isNaN(currentNumber)) {
      return `HF26-${String(Math.floor(10000 + Math.random() * 90000))}`;
    }

    const nextNumber = currentNumber + 1;
    return `HF26-${String(nextNumber).padStart(5, '0')}`;
  } catch (error) {
    // Fallback in case of database lookup hiccup
    return `HF26-${String(Math.floor(10000 + Math.random() * 90000))}`;
  }
}

/**
 * Helper to check MongoDB connection status before executing queries
 */
function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * @route   POST /api/registrations
 * @desc    Register a new participant / team
 * @access  Public
 */
exports.createRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      teamName,
      teamSize,
      role,
      track,
    } = req.body;

    // 1. Validate required fields presence
    if (!fullName || !email || !phone || !college || !teamName || !teamSize || !role || !track) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: fullName, email, phone, college, teamName, teamSize, role, track.',
      });
    }

    // 2. Validate email format
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 3. Validate team size (must be 2, 3, or 4)
    const numericTeamSize = Number(teamSize);
    if (![2, 3, 4].includes(numericTeamSize)) {
      return res.status(400).json({
        success: false,
        message: 'Team size must be 2, 3, or 4 members.',
      });
    }

    // 4. Verify MongoDB connection
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please ensure MONGODB_URI is set in backend/.env',
      });
    }

    // 5. Check for duplicate email registration (409 Conflict)
    const existingRegistration = await Registration.findOne({ email: cleanEmail });
    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: 'This email address is already registered for HackFest 2026.',
        existingRegistrationId: existingRegistration.registrationId,
      });
    }

    // 6. Generate next unique Registration ID
    const registrationId = await generateNextRegistrationId();

    // 7. Create and persist document
    const newRegistration = new Registration({
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      college: college.trim(),
      teamName: teamName.trim(),
      teamSize: numericTeamSize,
      role: role.trim(),
      track: track.trim(),
      registrationId,
      status: 'registered',
    });

    const savedRegistration = await newRegistration.save();

    // 8. Return 201 Created response
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      registration: {
        registrationId: savedRegistration.registrationId,
        fullName: savedRegistration.fullName,
        email: savedRegistration.email,
        phone: savedRegistration.phone,
        college: savedRegistration.college,
        teamName: savedRegistration.teamName,
        teamSize: savedRegistration.teamSize,
        role: savedRegistration.role,
        track: savedRegistration.track,
        status: savedRegistration.status,
        createdAt: savedRegistration.createdAt,
      },
    });
  } catch (error) {
    // Handle Mongoose duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate key error: Email or Registration ID already exists in the system.',
      });
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Registration error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing registration.',
    });
  }
};

/**
 * @route   GET /api/registrations/:email
 * @desc    Find a participant's registration by email address
 * @access  Public
 */
exports.getRegistrationByEmail = async (req, res) => {
  try {
    const rawEmail = req.params.email;
    if (!rawEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email parameter in the URL.',
      });
    }

    const cleanEmail = rawEmail.trim().toLowerCase();

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please ensure MONGODB_URI is set in backend/.env',
      });
    }

    const registration = await Registration.findOne({ email: cleanEmail });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: `No active registration found for email: ${cleanEmail}`,
      });
    }

    return res.status(200).json({
      success: true,
      registration: {
        registrationId: registration.registrationId,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        college: registration.college,
        teamName: registration.teamName,
        teamSize: registration.teamSize,
        role: registration.role,
        track: registration.track,
        status: registration.status,
        createdAt: registration.createdAt,
      },
    });
  } catch (error) {
    console.error('Get registration error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while retrieving registration.',
    });
  }
};

/**
 * @route   GET /api/admin/registrations
 * @desc    Retrieve all registrations for organizer management dashboard
 * @access  Public (Organizer)
 */
exports.getAllRegistrations = async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please ensure MONGODB_URI is set in backend/.env',
      });
    }

    const registrations = await Registration.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error('Get all registrations error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while retrieving registrations.',
    });
  }
};

/**
 * @route   GET /api/events
 * @desc    Retrieve HackFest 2026 event metadata
 * @access  Public
 */
exports.getEventInfo = (req, res) => {
  return res.status(200).json({
    success: true,
    event: {
      name: 'HackFest 2026',
      tagline: 'Build. Break. Innovate.',
      date: '13–14 September 2026',
      location: 'Information Technology department, Gauhati University',
      mode: 'Hybrid',
      teamSize: '2–4',
      entryFee: 'Free',
      tracks: [
        'AI & Machine Learning',
        'Web & App Development',
        'Cybersecurity',
        'HealthTech',
        'Sustainability',
        'Open Innovation',
      ],
    },
  });
};
