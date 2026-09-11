const mongoose = require('mongoose');

/**
 * Global cached database connection object for serverless lifecycle reuse.
 */
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  let mongoURI = (process.env.MONGODB_URI || '').trim();
  // Strip any accidental wrapping quotes entered in Vercel UI
  mongoURI = mongoURI.replace(/^["']|["']$/g, '').trim();

  if (!mongoURI) {
    const errorMsg = 'MONGODB_URI is not defined in environment variables.';
    console.error(`❌ [MongoDB] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 6000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    console.log('🔄 [MongoDB] Initiating connection to MongoDB Atlas...');
    cached.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log('✅ [MongoDB] Connected successfully to Atlas');
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
