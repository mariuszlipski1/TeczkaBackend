/**
 * Express App Configuration
 * Initializes middleware and routes
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRoutesNoAuth from './routes/notes.routes.noauth';
import notesRoutesWithAuth from './routes/notes.routes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Teczka Budowlanca API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    authEnabled: process.env.REQUIRE_AUTH === 'true',
  });
});

// API Routes - Choose based on environment
// For MVP testing: use NO AUTH routes
// For production: use WITH AUTH routes
const useAuth = process.env.REQUIRE_AUTH === 'true';
app.use('/api', useAuth ? notesRoutesWithAuth : notesRoutesNoAuth);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
