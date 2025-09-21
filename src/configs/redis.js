// src/config/redis.js
const redis = require('redis');
const { REDIS_URL } = require('./environment');
const logger = require('../utils/logger');

const client = redis.createClient({
  url: REDIS_URL,
});

client.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

client.on('connect', () => {
  logger.info('Redis connected successfully');
});

async function connectRedis() {
  try {
    await client.connect();
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}

module.exports = { redisClient: client, connectRedis };
