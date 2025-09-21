// src/repositories/implementations/redisCacheRepository.js
const ICacheRepository = require('../contracts/ICacheRepository');
const { redisClient } = require('../../configs/redis');
const { AppError } = require('../../utils/errors');

class RedisCacheRepository extends ICacheRepository {
  async get(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new AppError('Failed to get cache', 500, error);
    }
  }

  async set(key, value, ttl) {
    try {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      throw new AppError('Failed to set cache', 500, error);
    }
  }

  async del(key) {
    try {
      await redisClient.del(key);
    } catch (error) {
      throw new AppError('Failed to delete cache', 500, error);
    }
  }
}

module.exports = RedisCacheRepository;
