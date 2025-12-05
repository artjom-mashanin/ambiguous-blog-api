const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// TODO: Apply authentication middleware to protected routes
// const { requireAuth } = require('../middleware/auth');

/**
 * Comment routes (standalone)
 * Note: Most comment operations are nested under /api/posts/:postId/comments
 * This router handles operations that don't require the post context
 */

// DELETE /api/comments/:id - Delete a comment
// TODO: Add requireAuth middleware - only comment author or post author can delete
router.delete('/:id', commentsController.delete);

module.exports = router;
