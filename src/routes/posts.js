const express = require('express');
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// TODO: Apply authentication middleware to protected routes
// Protected routes: POST, PUT, DELETE (see README planned features)
// const { requireAuth } = require('../middleware/auth');

/**
 * Post routes
 * See README.md for full API documentation
 */

// GET /api/posts - List all posts
router.get('/', postsController.getAll);

// GET /api/posts/:id - Get single post
router.get('/:id', postsController.getById);

// POST /api/posts - Create new post
// TODO: Add requireAuth middleware when authentication is implemented
router.post('/', postsController.create);

// PUT /api/posts/:id - Update post
// TODO: Add requireAuth middleware when authentication is implemented
router.put('/:id', postsController.update);

// DELETE /api/posts/:id - Delete post
// TODO: Add requireAuth middleware when authentication is implemented
router.delete('/:id', postsController.delete);

/**
 * Nested comment routes under posts
 */

// GET /api/posts/:postId/comments - Get comments for a post
router.get('/:postId/comments', commentsController.getByPostId);

// POST /api/posts/:postId/comments - Add comment to a post
router.post('/:postId/comments', commentsController.create);

module.exports = router;
