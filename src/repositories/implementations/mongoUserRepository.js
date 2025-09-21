// src/repositories/implementations/mongoUserRepository.js
const IUserRepository = require('../contracts/IUserRepository');
const User = require('../../models/User');
const { AppError } = require('../../utils/errors');

class MongoUserRepository extends IUserRepository {
  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new AppError('Failed to create user', 500, error);
    }
  }

  async findUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new AppError('Failed to find user by email', 500, error);
    }
  }

  async findUserById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new AppError('Failed to find user by ID', 500, error);
    }
  }

  async updateUser(id, userData) {
    try {
      return await User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      throw new AppError('Failed to update user', 500, error);
    }
  }
}

module.exports = MongoUserRepository;
