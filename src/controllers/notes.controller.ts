/**
 * NotesController - HTTP request handlers
 * Maps HTTP requests to NotesService methods
 */

import { Request, Response } from 'express';
import { NotesService } from '../services/notes.service';
import { CreateNoteDTO, UpdateNoteDTO } from '../models/Note';

export class NotesController {
  private notesService: NotesService;

  constructor() {
    this.notesService = new NotesService();
  }

  /**
   * POST /notes - Create new note
   */
  async createNote(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const dto: CreateNoteDTO = req.body;

      // Validate required fields
      if (!dto.content || !dto.sectionId || !dto.projectId) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: content, sectionId, projectId',
        });
        return;
      }

      const note = await this.notesService.createNote(userId, dto);

      res.status(201).json({
        success: true,
        data: note,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * GET /projects/:projectId/sections/:sectionId/notes - Get notes by section
   */
  async getNotesBySection(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const { projectId, sectionId } = req.params;

      if (!projectId || !sectionId) {
        res.status(400).json({
          success: false,
          error: 'Missing projectId or sectionId in URL',
        });
        return;
      }

      const limit = parseInt((req.query.limit as string) || '50');
      const offset = parseInt((req.query.offset as string) || '0');

      const result = await this.notesService.getNotesBySection(
        userId,
        projectId,
        sectionId,
        limit,
        offset
      );

      res.json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * GET /notes/:noteId - Get single note
   */
  async getNoteById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const { noteId } = req.params;

      if (!noteId) {
        res.status(400).json({
          success: false,
          error: 'Missing noteId in URL',
        });
        return;
      }

      const note = await this.notesService.getNoteById(userId, noteId);

      res.json({
        success: true,
        data: note,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * PUT /notes/:noteId - Update note
   */
  async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const { noteId } = req.params;

      if (!noteId) {
        res.status(400).json({
          success: false,
          error: 'Missing noteId in URL',
        });
        return;
      }

      const dto: UpdateNoteDTO = req.body;

      const note = await this.notesService.updateNote(userId, noteId, dto);

      res.json({
        success: true,
        data: note,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * DELETE /notes/:noteId - Soft delete note
   */
  async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const { noteId } = req.params;

      if (!noteId) {
        res.status(400).json({
          success: false,
          error: 'Missing noteId in URL',
        });
        return;
      }

      await this.notesService.deleteNote(userId, noteId);

      res.json({
        success: true,
        message: 'Note deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * POST /notes/:noteId/images - Upload image (future feature)
   */
  async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const { noteId } = req.params;

      if (!noteId) {
        res.status(400).json({
          success: false,
          error: 'Missing noteId in URL',
        });
        return;
      }

      // Verify note belongs to user
      await this.notesService.getNoteById(userId, noteId);

      // TODO: Implement storage service upload
      res.status(501).json({
        success: false,
        error: 'Image upload not implemented yet (Phase 3)',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * POST /notes/:noteId/audio - Upload audio (future feature)
   */
  async uploadAudio(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const { noteId } = req.params;

      if (!noteId) {
        res.status(400).json({
          success: false,
          error: 'Missing noteId in URL',
        });
        return;
      }

      // Verify note belongs to user
      await this.notesService.getNoteById(userId, noteId);

      // TODO: Implement storage service upload + Whisper transcription
      res.status(501).json({
        success: false,
        error: 'Audio upload not implemented yet (Phase 3)',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
