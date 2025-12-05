/**
 * Post Model
 *
 * TODO: Replace with Prisma model when database is connected
 * Schema defined in README.md - use Prisma to generate types
 */

const { posts, comments, generatePostId } = require('../data/store');

/**
 * Valid post statuses as defined in the Prisma schema
 * @see README.md for PostStatus enum definition
 */
const VALID_STATUSES = ['draft', 'published'];

const Post = {
  /**
   * Find all posts
   * TODO: Replace with prisma.post.findMany()
   */
  findAll() {
    return [...posts];
  },

  /**
   * Find post by ID
   * TODO: Replace with prisma.post.findUnique({ where: { id } })
   */
  findById(id) {
    return posts.find(post => post.id === id) || null;
  },

  /**
   * Create a new post
   * TODO: Replace with prisma.post.create({ data })
   *
   * @param {Object} data - Post data
   * @param {string} data.title - Post title (5-200 chars per README spec)
   * @param {string} data.content - Post content (min 10 chars per README spec)
   * @param {string} data.authorName - Author name (2-100 chars per README spec)
   * @param {string} [data.status='draft'] - Post status (draft or published)
   */
  create(data) {
    const now = new Date().toISOString();
    const newPost = {
      id: generatePostId(),
      title: data.title,
      content: data.content,
      authorName: data.authorName,
      status: data.status || 'draft', // Default to draft per README spec
      createdAt: now,
      updatedAt: now
    };
    posts.push(newPost);
    return newPost;
  },

  /**
   * Update a post
   * TODO: Replace with prisma.post.update({ where: { id }, data })
   */
  update(id, data) {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;

    const updatedPost = {
      ...posts[index],
      ...data,
      id: posts[index].id, // Prevent ID modification
      createdAt: posts[index].createdAt, // Prevent createdAt modification
      updatedAt: new Date().toISOString()
    };
    posts[index] = updatedPost;
    return updatedPost;
  },

  /**
   * Delete a post and its associated comments
   * TODO: Replace with prisma.post.delete({ where: { id } })
   * Note: Prisma schema has onDelete: Cascade for comments
   */
  delete(id) {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return false;

    // Remove associated comments (cascade delete)
    // TODO: This is handled automatically by Prisma with onDelete: Cascade
    for (let i = comments.length - 1; i >= 0; i--) {
      if (comments[i].postId === id) {
        comments.splice(i, 1);
      }
    }

    posts.splice(index, 1);
    return true;
  },

  /**
   * Check if status is valid
   */
  isValidStatus(status) {
    return VALID_STATUSES.includes(status);
  }
};

module.exports = Post;
