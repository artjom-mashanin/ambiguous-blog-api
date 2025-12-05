# Blog API

A RESTful blog API built with Express.js, designed to be backed by **Supabase PostgreSQL** using **Prisma ORM**.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** JWT (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account (for database)

### Installation

```bash
npm install
cp .env.example .env
# Update .env with your Supabase credentials
npm run dev
```

## API Documentation

### Posts

#### GET /api/posts

Returns all blog posts.

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "authorName": "string",
      "status": "draft" | "published",
      "createdAt": "ISO8601 timestamp",
      "updatedAt": "ISO8601 timestamp"
    }
  ]
}
```

#### GET /api/posts/:id

Returns a single post by ID.

**Response:** `200 OK` or `404 Not Found`

#### POST /api/posts

Creates a new blog post.

**Request Body:**

```json
{
  "title": "string (required, 5-200 characters)",
  "content": "string (required, min 10 characters)",
  "authorName": "string (required, 2-100 characters)",
  "status": "draft" | "published" (optional, defaults to "draft")
}
```

**Response:** `201 Created`

**Validation Rules:**

- `title`: Required, must be between 5 and 200 characters
- `content`: Required, minimum 10 characters
- `authorName`: Required, must be between 2 and 100 characters
- `status`: Optional, must be either "draft" or "published", defaults to "draft"

#### PUT /api/posts/:id

Updates an existing post.

**Request Body:** Same as POST (all fields optional for partial updates)

**Response:** `200 OK` or `404 Not Found`

#### DELETE /api/posts/:id

Deletes a post and all associated comments.

**Response:** `204 No Content` or `404 Not Found`

### Comments

#### GET /api/posts/:postId/comments

Returns all comments for a specific post.

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "string",
      "postId": "string",
      "authorName": "string",
      "content": "string",
      "createdAt": "ISO8601 timestamp"
    }
  ]
}
```

#### POST /api/posts/:postId/comments

Adds a comment to a post.

**Request Body:**

```json
{
  "authorName": "string (required, 2-100 characters)",
  "content": "string (required, 1-1000 characters)"
}
```

**Response:** `201 Created` or `404 Not Found` (if post doesn't exist)

**Validation Rules:**

- `authorName`: Required, must be between 2 and 100 characters
- `content`: Required, must be between 1 and 1000 characters

#### DELETE /api/comments/:id

Deletes a comment.

**Response:** `204 No Content` or `404 Not Found`

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Error Codes

| Code               | HTTP Status | Description                    |
| ------------------ | ----------- | ------------------------------ |
| `VALIDATION_ERROR` | 400         | Request body failed validation |
| `NOT_FOUND`        | 404         | Resource not found             |
| `INTERNAL_ERROR`   | 500         | Unexpected server error        |

## Local development environment

For local development, we will use local postgresql database setup as Docker Container using Docker Compose configuration.
We will run the database in a docker container, while the our backend api will be running locally on the computer (not in docker)

We will not have data seeds and we will start with an empty database

## Database

For database we will be using Postgresql 17 with latest availalbe version of Prisma ORM

### Database schema

The API uses the following Prisma schema (to be implemented):

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String   @db.VarChar(200)
  content   String   @db.Text
  authorName String  @db.VarChar(100)
  status    PostStatus @default(draft)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  comments  Comment[]
}

model Comment {
  id        String   @id @default(uuid())
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorName String  @db.VarChar(100)
  content   String   @db.VarChar(1000)
  createdAt DateTime @default(now())
}

enum PostStatus {
  draft
  published
}
```

## Planned Features

- [ ] **User Authentication:** JWT-based authentication with 24-hour token expiry
  - Login endpoint: `POST /api/auth/login`
  - Register endpoint: `POST /api/auth/register`
  - Protected routes for create/update/delete operations
- [ ] **Prisma Integration:** Connect to Supabase PostgreSQL
- [ ] **Pagination:** Cursor-based pagination for list endpoints
- [ ] **Search:** Full-text search on posts

## Environment Variables

See `.env.example` for required environment variables:

| Variable       | Description                           | Required                   |
| -------------- | ------------------------------------- | -------------------------- |
| `PORT`         | Server port (default: 3000)           | No                         |
| `DATABASE_URL` | Supabase PostgreSQL connection string | Yes (for production)       |
| `JWT_SECRET`   | Secret for signing JWT tokens         | Yes (when auth is enabled) |
| `JWT_EXPIRY`   | Token expiration time (default: 24h)  | No                         |

## License

MIT
