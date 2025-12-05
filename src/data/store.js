/**
 * In-memory data store for development
 *
 * TODO: Replace this entire file with Prisma client queries
 * once the Supabase database connection is configured.
 * See README.md for the Prisma schema definition.
 */

const posts = [
  {
    id: '1',
    title: 'Getting Started with Express.js',
    content: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. In this post, we will explore the basics of setting up an Express server.',
    authorName: 'Jane Developer',
    status: 'published',
    createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString()
  },
  {
    id: '2',
    title: 'Building RESTful APIs',
    content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. This guide covers best practices for building RESTful APIs with proper HTTP methods and status codes.',
    authorName: 'John Coder',
    status: 'published',
    createdAt: new Date('2024-01-20T14:30:00Z').toISOString(),
    updatedAt: new Date('2024-01-21T09:15:00Z').toISOString()
  },
  {
    id: '3',
    title: 'Draft: Upcoming Features',
    content: 'This is a draft post about upcoming features we are planning to add to the blog platform.',
    authorName: 'Jane Developer',
    status: 'draft',
    createdAt: new Date('2024-01-25T16:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-25T16:00:00Z').toISOString()
  }
];

const comments = [
  {
    id: '1',
    postId: '1',
    authorName: 'Reader One',
    content: 'Great introduction! Very helpful for beginners.',
    createdAt: new Date('2024-01-16T08:00:00Z').toISOString()
  },
  {
    id: '2',
    postId: '1',
    authorName: 'Developer Joe',
    content: 'Could you also cover middleware in a future post?',
    createdAt: new Date('2024-01-17T12:30:00Z').toISOString()
  },
  {
    id: '3',
    postId: '2',
    authorName: 'API Enthusiast',
    content: 'This is exactly what I needed for my project!',
    createdAt: new Date('2024-01-22T11:00:00Z').toISOString()
  }
];

// Simple ID generator
// TODO: Use UUID from Prisma/database when connected
let nextPostId = 4;
let nextCommentId = 4;

function generatePostId() {
  return String(nextPostId++);
}

function generateCommentId() {
  return String(nextCommentId++);
}

module.exports = {
  posts,
  comments,
  generatePostId,
  generateCommentId
};
