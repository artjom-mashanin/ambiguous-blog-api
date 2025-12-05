const Post = require('../models/Post');

/**
 * Posts Controller
 *
 * Handles all post-related operations.
 * TODO: Add authentication checks when JWT middleware is implemented
 * Protected routes: create, update, delete (see README planned features)
 */

/**
 * Validate post data according to README spec
 * - title: 5-200 characters
 * - content: minimum 10 characters
 * - authorName: 2-100 characters
 * - status: must be 'draft' or 'published'
 */
function validatePost(data, isUpdate = false) {
  const errors = [];

  // Title validation: 5-200 chars (per README API spec)
  if (!isUpdate || data.title !== undefined) {
    if (!data.title && !isUpdate) {
      errors.push('title is required');
    } else if (data.title) {
      if (data.title.length < 5) {
        errors.push('title must be at least 5 characters');
      }
      if (data.title.length > 200) {
        errors.push('title must not exceed 200 characters');
      }
    }
  }

  // Content validation: min 10 chars (per README API spec)
  if (!isUpdate || data.content !== undefined) {
    if (!data.content && !isUpdate) {
      errors.push('content is required');
    } else if (data.content && data.content.length < 10) {
      errors.push('content must be at least 10 characters');
    }
  }

  // Author name validation: 2-100 chars (per README API spec)
  if (!isUpdate || data.authorName !== undefined) {
    if (!data.authorName && !isUpdate) {
      errors.push('authorName is required');
    } else if (data.authorName) {
      if (data.authorName.length < 2) {
        errors.push('authorName must be at least 2 characters');
      }
      if (data.authorName.length > 100) {
        errors.push('authorName must not exceed 100 characters');
      }
    }
  }

  // Status validation: must be 'draft' or 'published' (per README API spec)
  if (data.status !== undefined && !Post.isValidStatus(data.status)) {
    errors.push('status must be either "draft" or "published"');
  }

  return errors;
}

const postsController = {
  /**
   * GET /api/posts
   * Returns all posts
   * Response: 200 OK with { data: Post[] }
   */
  getAll(req, res) {
    const posts = Post.findAll();
    res.json({ data: posts });
  },

  /**
   * GET /api/posts/:id
   * Returns a single post
   * Response: 200 OK or 404 Not Found
   */
  getById(req, res) {
    const post = Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Post not found'
        }
      });
    }

    res.json({ data: post });
  },

  /**
   * POST /api/posts
   * Creates a new post
   * Response: 201 Created (per README REST conventions)
   *
   * TODO: Add authentication check - only authenticated users should create posts
   */
  create(req, res) {
    const errors = validatePost(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join(', ')
        }
      });
    }

    const post = Post.create({
      title: req.body.title,
      content: req.body.content,
      authorName: req.body.authorName,
      status: req.body.status // defaults to 'draft' in model
    });

    // 201 Created per README API spec
    res.status(201).json({ data: post });
  },

  /**
   * PUT /api/posts/:id
   * Updates an existing post
   * Response: 200 OK or 404 Not Found
   *
   * TODO: Add authentication check - only post author should update
   */
  update(req, res) {
    const existingPost = Post.findById(req.params.id);

    if (!existingPost) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Post not found'
        }
      });
    }

    const errors = validatePost(req.body, true);

    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join(', ')
        }
      });
    }

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.content !== undefined) updateData.content = req.body.content;
    if (req.body.authorName !== undefined) updateData.authorName = req.body.authorName;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    const post = Post.update(req.params.id, updateData);
    res.json({ data: post });
  },

  /**
   * DELETE /api/posts/:id
   * Deletes a post and all associated comments
   * Response: 204 No Content (per README REST conventions)
   *
   * TODO: Add authentication check - only post author should delete
   */
  delete(req, res) {
    const deleted = Post.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Post not found'
        }
      });
    }

    // 204 No Content per README API spec
    res.status(204).send();
  }
};

module.exports = postsController;
