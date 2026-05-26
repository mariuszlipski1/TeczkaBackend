/**
 * TypeScript interfaces for Notes Module
 * Based on: ARCHITEKTURA MODUŁU NOTATEK - Aplikacja Remontowa
 */

// Image attachment structure
export interface ImageAttachment {
  url: string;
  thumbnail: string;
  uploadedAt: string;
  sizeBytes: number;
}

// Audio attachment structure
export interface AudioAttachment {
  url: string;
  duration: number; // seconds
  transcription: string; // Whisper API result
  uploadedAt: string;
  sizeBytes: number;
}

// Main Note entity
export interface Note {
  id: string;
  userId: string;
  projectId: string;
  sectionId: string;

  // Content
  content: string; // Markdown format
  status: 'draft' | 'saved' | 'archived';

  // Multi-modal attachments
  images: ImageAttachment[];
  audio: AudioAttachment | null;

  // Metadata
  tags: string[];
  contractorName?: string;

  // Timestamps
  createdAt: string; // ISO 8601
  updatedAt: string;
  deletedAt?: string | null;

  // Versioning
  versionNumber: number;
}

// DTO for creating a new note
export interface CreateNoteDTO {
  content: string;
  sectionId: string;
  projectId: string;
  tags?: string[];
  contractorName?: string;
  // Files will be uploaded separately
}

// DTO for updating an existing note
export interface UpdateNoteDTO {
  content?: string;
  tags?: string[];
  status?: 'draft' | 'saved' | 'archived';
}

// Response wrapper for paginated results
export interface NotesListResponse {
  notes: Note[];
  total: number;
}

// Database row type (snake_case from PostgreSQL)
export interface NoteRow {
  id: string;
  user_id: string;
  project_id: string;
  section_id: string;
  content: string;
  status: 'draft' | 'saved' | 'archived';
  images: any; // JSONB from PostgreSQL
  audio: any; // JSONB from PostgreSQL
  tags: string[];
  contractor_name?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  version_number: number;
}
