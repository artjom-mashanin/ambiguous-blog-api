require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

// TODO: Initialize Prisma client connection here when database is ready
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Blog API server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
