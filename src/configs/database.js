// src/config/database.js
const mongoose = require('mongoose');
const { MONGO_URI } = require('./environment');
const logger = require('../utils/logger');

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
