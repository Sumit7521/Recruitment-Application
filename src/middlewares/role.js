// src/middlewares/role.js
const { AppError } = require('../utils/errors');

module.exports = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new AppError('Access denied: insufficient permissions', 403);
  }
  next();
};
