// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/role');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (require authentication)
router.get('/:id', authMiddleware, userController.getUser);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), userController.updateUser);

module.exports = router;
