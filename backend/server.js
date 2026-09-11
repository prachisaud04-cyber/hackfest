const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
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

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL.trim());
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Match localhost or any *.vercel.app domain
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        /^https:\/\/.*\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }

      // Allow in dev / staging environments
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
  })
);

// Pre-flight OPTIONS handling
app.options('*', cors());

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

// Mount API Routes
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
  console.error('❌ Unhandled Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
  });
});

// Connect to DB and Start HTTP Listener (Standalone / Local Mode)
async function startServer() {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    } else {
      console.warn('⚠️ [MongoDB] MONGODB_URI is not set in environment variables.');
    }
  } catch (err) {
    console.error('⚠️ [MongoDB] Initial connection error:', err.message);
  }

  // Only start listener if not required by another module (like Vercel serverless)
  if (require.main === module || process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`🚀 HackFest 2026 Server running on http://localhost:${PORT}`);
      console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
    });
  }
}

startServer();

module.exports = app;
