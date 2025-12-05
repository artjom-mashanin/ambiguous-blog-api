const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * Comments Controller
 *
 * Handles all comment-related operations.
 * TODO: Add authentication checks when JWT middleware is implemented
 */

/**
 * Validate comment data according to README spec
 * - authorName: 2-100 characters
 * - content: 1-1000 characters
 */
function validateComment(data) {
  const errors = [];

  // Author name validation: 2-100 chars (per README API spec)
  if (!data.authorName) {
    errors.push('authorName is required');
  } else {
    if (data.authorName.length < 2) {
      errors.push('authorName must be at least 2 characters');
    }
    if (data.authorName.length > 100) {
      errors.push('authorName must not exceed 100 characters');
    }
  }

  // Content validation: 1-1000 chars (per README API spec)
  if (!data.content) {
    errors.push('content is required');
  } else {
    if (data.content.length < 1) {
      errors.push('content must be at least 1 character');
    }
    if (data.content.length > 1000) {
      errors.push('content must not exceed 1000 characters');
    }
  }

  return errors;
}

const commentsController = {
  /**
   * GET /api/posts/:postId/comments
   * Returns all comments for a specific post
   * Response: 200 OK with { data: Comment[] }
   */
  getByPostId(req, res) {
    const post = Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Post not found'
        }
      });
    }

    const comments = Comment.findByPostId(req.params.postId);
    res.json({ data: comments });
  },

  /**
   * POST /api/posts/:postId/comments
   * Adds a comment to a post
   * Response: 201 Created or 404 Not Found (per README API spec)
   */
  create(req, res) {
    const post = Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Post not found'
        }
      });
    }

    const errors = validateComment(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join(', ')
        }
      });
    }

    const comment = Comment.create({
      postId: req.params.postId,
      authorName: req.body.authorName,
      content: req.body.content
    });

    // 201 Created per README API spec
    res.status(201).json({ data: comment });
  },

  /**
   * DELETE /api/comments/:id
   * Deletes a comment
   * Response: 204 No Content (per README REST conventions)
   *
   * TODO: Add authentication - only comment author or post author should delete
   */
  delete(req, res) {
    const deleted = Comment.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Comment not found'
        }
      });
    }

    // 204 No Content per README API spec
    res.status(204).send();
  }
};

module.exports = commentsController;
