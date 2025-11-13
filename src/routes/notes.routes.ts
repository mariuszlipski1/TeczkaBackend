/**
 * Notes Routes - API endpoints for notes module
 * All routes require authentication via authMiddleware
 */

import { Router } from 'express';
import { NotesController } from '../controllers/notes.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import multer from 'multer';

// Initialize router
const router = Router();

// Initialize controller
const notesController = new NotesController();

// Initialize multer for file uploads (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @route   POST /api/notes
 * @desc    Create new note
 * @access  Private
 */
router.post('/notes', (req, res) => notesController.createNote(req, res));

/**
 * @route   GET /api/projects/:projectId/sections/:sectionId/notes
 * @desc    Get all notes in a section (paginated)
 * @query   limit=50, offset=0
 * @access  Private
 */
router.get('/projects/:projectId/sections/:sectionId/notes', (req, res) =>
  notesController.getNotesBySection(req, res)
);

/**
 * @route   GET /api/notes/:noteId
 * @desc    Get single note by ID
 * @access  Private
 */
router.get('/notes/:noteId', (req, res) =>
  notesController.getNoteById(req, res)
);

/**
 * @route   PUT /api/notes/:noteId
 * @desc    Update note
 * @access  Private
 */
router.put('/notes/:noteId', (req, res) =>
  notesController.updateNote(req, res)
);

/**
 * @route   DELETE /api/notes/:noteId
 * @desc    Soft delete note
 * @access  Private
 */
router.delete('/notes/:noteId', (req, res) =>
  notesController.deleteNote(req, res)
);

/**
 * @route   POST /api/notes/:noteId/images
 * @desc    Upload image attachment
 * @access  Private
 */
router.post('/notes/:noteId/images', upload.single('image'), (req, res) =>
  notesController.uploadImage(req, res)
);

/**
 * @route   POST /api/notes/:noteId/audio
 * @desc    Upload audio attachment
 * @access  Private
 */
router.post('/notes/:noteId/audio', upload.single('audio'), (req, res) =>
  notesController.uploadAudio(req, res)
);

export default router;
