// src/middlewares/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/environment');
const { AppError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication token required', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }
};
