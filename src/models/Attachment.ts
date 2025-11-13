/**
 * Attachment interfaces for multi-modal content
 * Used for S3 storage and file management
 */

// Request for uploading attachment
export interface AttachmentUploadRequest {
  noteId: string;
  type: 'image' | 'audio' | 'video' | 'document';
  file: Buffer;
  mimeType: string;
}

// Metadata for attachments
export interface AttachmentMetadata {
  type: string;
  mimeType: string;
  sizeBytes: number;
  duration?: number; // for audio/video
  transcription?: string; // for audio
  imageMetadata?: {
    width: number;
    height: number;
    format: string;
  };
}

// Database row type for note_attachments table
export interface AttachmentRow {
  id: string;
  note_id: string;
  type: 'image' | 'audio' | 'video' | 'document';
  mime_type: string;
  file_url: string;
  storage_key: string;
  file_size_bytes: number;
  duration_seconds?: number;
  transcription?: string;
  image_metadata?: any; // JSONB
  created_at: string;
}
