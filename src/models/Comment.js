/**
 * Comment Model
 *
 * TODO: Replace with Prisma model when database is connected
 * Schema defined in README.md - use Prisma to generate types
 */

const { comments, generateCommentId } = require('../data/store');

const Comment = {
  /**
   * Find all comments for a post
   * TODO: Replace with prisma.comment.findMany({ where: { postId } })
   */
  findByPostId(postId) {
    return comments.filter(comment => comment.postId === postId);
  },

  /**
   * Find comment by ID
   * TODO: Replace with prisma.comment.findUnique({ where: { id } })
   */
  findById(id) {
    return comments.find(comment => comment.id === id) || null;
  },

  /**
   * Create a new comment
   * TODO: Replace with prisma.comment.create({ data })
   *
   * @param {Object} data - Comment data
   * @param {string} data.postId - ID of the post this comment belongs to
   * @param {string} data.authorName - Comment author name (2-100 chars per README spec)
   * @param {string} data.content - Comment content (1-1000 chars per README spec)
   */
  create(data) {
    const newComment = {
      id: generateCommentId(),
      postId: data.postId,
      authorName: data.authorName,
      content: data.content,
      createdAt: new Date().toISOString()
    };
    comments.push(newComment);
    return newComment;
  },

  /**
   * Delete a comment
   * TODO: Replace with prisma.comment.delete({ where: { id } })
   */
  delete(id) {
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) return false;
    comments.splice(index, 1);
    return true;
  }
};

module.exports = Comment;
