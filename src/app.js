const express = require('express');

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

// Middleware
app.use(express.json());

// TODO: Add authentication middleware when JWT is implemented
// const authMiddleware = require('./middleware/auth');
// app.use('/api/posts', authMiddleware.optionalAuth);

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
});

module.exports = app;
