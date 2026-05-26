# Teczka Budowlanca - Backend API

Backend API for Notes Module built with Node.js, Express, TypeScript, and Supabase.

## Features

- **CRUD Operations** for notes
- **Multi-modal content** support (text, images, audio)
- **Section-based isolation** (Electrical, Plumbing, etc.)
- **JWT Authentication** via Supabase
- **Soft delete** for notes
- **Pagination** support
- **TypeScript** for type safety
- **Sorting**: DESC by created_at (newest first)

## Prerequisites

- Node.js 18+ installed
- Supabase account with project created
- PostgreSQL database set up (via Supabase)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your Supabase credentials
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_SERVICE_KEY=your-service-role-key
```

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Server will start on http://localhost:3001
```

## Production

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Notes

**Create Note**
```
POST /api/notes
Authorization: Bearer <token>
Body: {
  "content": "string",
  "projectId": "uuid",
  "sectionId": "uuid",
  "tags": ["tag1", "tag2"],
  "contractorName": "string"
}
```

**Get Notes by Section**
```
GET /api/projects/:projectId/sections/:sectionId/notes?limit=50&offset=0
Authorization: Bearer <token>
```

**Get Single Note**
```
GET /api/notes/:noteId
Authorization: Bearer <token>
```

**Update Note**
```
PUT /api/notes/:noteId
Authorization: Bearer <token>
Body: {
  "content": "string",
  "tags": ["tag1"],
  "status": "saved"
}
```

**Delete Note (Soft)**
```
DELETE /api/notes/:noteId
Authorization: Bearer <token>
```

## Project Structure

```
src/
├── config/
│   └── supabase.ts          # Supabase client configuration
├── models/
│   ├── Note.ts              # TypeScript interfaces
│   └── Attachment.ts        # Attachment interfaces
├── services/
│   └── notes.service.ts     # Business logic (CRUD)
├── controllers/
│   └── notes.controller.ts  # HTTP request handlers
├── routes/
│   └── notes.routes.ts      # API routes
├── middleware/
│   ├── auth.middleware.ts   # JWT verification
│   └── errorHandler.ts      # Global error handler
├── app.ts                   # Express app configuration
└── server.ts                # Server entry point
```

## Database Schema

See `docs/DDL_Baza_Danych.md` for complete database schema.

### Main Table: `notes`
- `id` - UUID primary key
- `user_id` - FK to auth.users
- `project_id` - FK to projects
- `section_id` - FK to sections
- `content` - Markdown text
- `status` - draft | saved | archived
- `images` - JSONB array
- `audio` - JSONB object
- `tags` - TEXT[]
- `contractor_name` - VARCHAR
- `created_at`, `updated_at`, `deleted_at`
- `version_number` - INT

## Environment Variables

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Server
PORT=3001
NODE_ENV=development
```

## Next Steps (Phase 2-3)

- [ ] Storage service for S3 uploads
- [ ] Whisper API integration for audio transcription
- [ ] AI integration (Claude API) for contractor questions
- [ ] Offline sync queue

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **File uploads**: Multer

## License

ISC
