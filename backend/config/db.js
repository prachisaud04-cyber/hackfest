const mongoose = require('mongoose');

/**
 * Global cached database connection object for serverless lifecycle reuse.
 */
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  const mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

  if (!mongoURI) {
    const errorMsg = 'MONGODB_URI is not set in environment variables.';
    console.error(`❌ [MongoDB] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 20000,
    };

    console.log('🔄 [MongoDB] Establishing connection to MongoDB Atlas...');
    cached.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log('✅ [MongoDB] Successfully connected to MongoDB Atlas');
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.error('❌ [MongoDB] Connection error:', err.message);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

module.exports = connectDB;
