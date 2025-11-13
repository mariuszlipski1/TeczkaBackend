/**
 * Auth Middleware - JWT token verification
 * Extracts user ID from Supabase JWT token
 */

import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
      };
    }
  }
}

/**
 * Middleware to verify JWT token from Authorization header
 * Sets req.user if token is valid
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: Missing or invalid Authorization header',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or expired token',
      });
      return;
    }

    // Set user in request object
    req.user = {
      id: data.user.id,
      email: data.user.email,
    };

    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Internal server error during authentication',
    });
  }
}
