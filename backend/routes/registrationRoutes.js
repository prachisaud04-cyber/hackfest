const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const {
  createRegistration,
  getRegistrationByEmail,
  getAllRegistrations,
  getEventInfo,
} = require('../controllers/registrationController');

// 1. Health & Database Diagnostic Check
router.get('/health', async (req, res) => {
  const hasMongoUri = Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim());
  let dbStatus = 'disconnected';
  let dbError = null;

  if (hasMongoUri) {
    try {
      await connectDB();
      dbStatus = 'connected';
    } catch (err) {
      dbStatus = 'error';
      dbError = err.message || 'Connection failed';
    }
  } else {
    dbStatus = 'missing_env_var';
    dbError = 'MONGODB_URI environment variable is not configured in Vercel';
  }

  const isHealthy = dbStatus === 'connected';

  return res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    status: isHealthy ? 'healthy' : 'degraded',
    message: isHealthy
      ? 'HackFest API is running and connected to MongoDB Atlas'
      : 'API is running but database connection is pending or failed',
    database: {
      status: dbStatus,
      hasMongoUri,
      error: dbError,
    },
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
