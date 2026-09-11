const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getRegistrationByEmail,
  getAllRegistrations,
  getEventInfo,
} = require('../controllers/registrationController');

// 1. Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HackFest API is running',
    timestamp: new Date().toISOString(),
  });
});

// 2. Event Information
router.get('/events', getEventInfo);

// 3. Participant Registration (POST)
router.post('/registrations', createRegistration);

// 4. Participant Registration Status by Email (GET)
router.get('/registrations/:email', getRegistrationByEmail);

// 5. Admin / Organizer All Registrations (GET)
router.get('/admin/registrations', getAllRegistrations);

module.exports = router;
