// src/index.js
const express = require('express');
const { connectDB } = require('./configs/database');
const { connectRedis } = require('./configs/redis');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { PORT } = require('./configs/environment');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  await connectDB();
  await connectRedis();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
