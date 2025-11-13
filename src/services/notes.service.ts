/**
 * NotesService - Business logic for CRUD operations
 * Implements: Create, Read (all/one), Update, Delete
 * Sorting: DESC by created_at (newest first)
 */

import { supabase } from '../config/supabase';
import {
  Note,
  NoteRow,
  CreateNoteDTO,
  UpdateNoteDTO,
  NotesListResponse,
} from '../models/Note';

export class NotesService {
  /**
   * CREATE - Create a new note
   */
  async createNote(userId: string, dto: CreateNoteDTO): Promise<Note> {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert({
          user_id: userId,
          project_id: dto.projectId,
          section_id: dto.sectionId,
          content: dto.content,
          tags: dto.tags || [],
          contractor_name: dto.contractorName,
          status: 'draft',
          images: [],
          audio: null,
        })
        .select('*')
        .single();

      if (error) {
        throw new Error(`Failed to create note: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from insert operation');
      }

      return this.mapToNoteEntity(data);
    } catch (error: any) {
      throw new Error(`Create note error: ${error.message}`);
    }
  }

  /**
   * READ - Get all notes in a section (with pagination)
   * Sorting: DESC by created_at (newest first!)
   */
  async getNotesBySection(
    userId: string,
    projectId: string,
    sectionId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<NotesListResponse> {
    try {
      // Query with filters
      const { data, count, error } = await supabase
        .from('notes')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .eq('section_id', sectionId)
        .is('deleted_at', null) // Exclude soft-deleted
        .order('created_at', { ascending: false }) // Najnowsze u góry!
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(`Failed to fetch notes: ${error.message}`);
      }

      return {
        notes: (data || []).map((row) => this.mapToNoteEntity(row)),
        total: count || 0,
      };
    } catch (error: any) {
      throw new Error(`Get notes by section error: ${error.message}`);
    }
  }

  /**
   * READ - Get single note by ID
   */
  async getNoteById(userId: string, noteId: string): Promise<Note> {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .single();

      if (error) {
        throw new Error(`Note not found: ${error.message}`);
      }

      if (!data) {
        throw new Error('Note not found');
      }

      return this.mapToNoteEntity(data);
    } catch (error: any) {
      throw new Error(`Get note by ID error: ${error.message}`);
    }
  }

  /**
   * UPDATE - Update existing note
   */
  async updateNote(
    userId: string,
    noteId: string,
    dto: UpdateNoteDTO
  ): Promise<Note> {
    try {
      const updateData: any = {};

      if (dto.content !== undefined) updateData.content = dto.content;
      if (dto.tags !== undefined) updateData.tags = dto.tags;
      if (dto.status !== undefined) updateData.status = dto.status;

      // updated_at will be auto-updated by trigger in DB
      const { data, error } = await supabase
        .from('notes')
        .update(updateData)
        .eq('id', noteId)
        .eq('user_id', userId)
        .select('*')
        .single();

      if (error) {
        throw new Error(`Failed to update note: ${error.message}`);
      }

      if (!data) {
        throw new Error('Note not found or update failed');
      }

      return this.mapToNoteEntity(data);
    } catch (error: any) {
      throw new Error(`Update note error: ${error.message}`);
    }
  }

  /**
   * DELETE - Soft delete (set deleted_at)
   */
  async deleteNote(userId: string, noteId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', noteId)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`Failed to delete note: ${error.message}`);
      }
    } catch (error: any) {
      throw new Error(`Delete note error: ${error.message}`);
    }
  }

  /**
   * HARD DELETE - Permanent deletion (admin only)
   */
  async hardDeleteNote(userId: string, noteId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`Failed to hard delete note: ${error.message}`);
      }
    } catch (error: any) {
      throw new Error(`Hard delete note error: ${error.message}`);
    }
  }

  /**
   * HELPER - Map DB row (snake_case) to domain entity (camelCase)
   */
  private mapToNoteEntity(row: any): Note {
    return {
      id: row.id,
      userId: row.user_id,
      projectId: row.project_id,
      sectionId: row.section_id,
      content: row.content,
      status: row.status,
      images: Array.isArray(row.images) ? row.images : [],
      audio: row.audio || null,
      tags: Array.isArray(row.tags) ? row.tags : [],
      contractorName: row.contractor_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      versionNumber: row.version_number || 1,
    };
  }

  /**
   * AI HELPER - Generate contractor questions (future feature)
   * Will integrate with Claude API
   */
  async generateContractorQuestions(note: Note): Promise<string[]> {
    // TODO: Claude API integration
    // For now, return empty array
    return [];
  }
}
