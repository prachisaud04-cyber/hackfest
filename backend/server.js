const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const registrationRoutes = require('./routes/registrationRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev mode for smooth onboarding
      }
    },
    credentials: true,
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root metadata route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to HackFest 2026 Registration API',
    endpoints: {
      health: 'GET /api/health',
      events: 'GET /api/events',
      register: 'POST /api/registrations',
      checkStatus: 'GET /api/registrations/:email',
      adminList: 'GET /api/admin/registrations',
    },
  });
});

// API Routes
app.use('/api', registrationRoutes);

// Catch-all 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
  });
});

// Connect to MongoDB Atlas and Start Server
async function startServer() {
  const mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

  if (!mongoURI) {
    console.log('---------------------------------------------------------');
    console.log('⚠️  [MongoDB] MONGODB_URI is not set in backend/.env');
    console.log('   Please paste your MongoDB Atlas connection string into:');
    console.log('   backend/.env');
    console.log('   Example: MONGODB_URI=mongodb+srv://user:pass@cluster0.../hackfest');
    console.log('---------------------------------------------------------');
  } else {
    try {
      await mongoose.connect(mongoURI);
      console.log('---------------------------------------------------------');
      console.log('✅ MongoDB connected successfully');
      console.log('---------------------------------------------------------');
    } catch (error) {
      console.error('---------------------------------------------------------');
      console.error('❌ MongoDB connection error:', error.message);
      console.error('   Please verify your IP whitelist, username, and password in Atlas.');
      console.error('---------------------------------------------------------');
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 HackFest 2026 Server running on http://localhost:${PORT}`);
    console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
  });
}

startServer();

module.exports = app;
