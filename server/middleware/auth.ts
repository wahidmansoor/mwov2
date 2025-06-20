import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

// Extend Express Request type to include user information
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Check for session-based authentication
    if (req.session?.userId) {
      const user = await storage.getUser(req.session.userId);
      if (user && user.isActive) {
        req.userId = user.id;
        req.user = user;
        return next();
      }
    }

    // Check for Authorization header (for API tokens)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // In a real implementation, this would validate JWT tokens
      // For demo purposes, we'll accept a specific demo token
      if (token === 'demo-token') {
        // Get the demo user
        const demoUser = await storage.getUserByEmail('dr.jane.doe@oncovista.ai');
        if (demoUser) {
          req.userId = demoUser.id;
          req.user = demoUser;
          return next();
        }
      }
    }

    // For development/demo purposes, allow unauthenticated requests to proceed
    // with a default demo user context
    if (process.env.NODE_ENV === 'development') {
      const demoUser = await storage.getUserByEmail('dr.jane.doe@oncovista.ai');
      if (demoUser) {
        req.userId = demoUser.id;
        req.user = demoUser;
        return next();
      }
    }

    // No valid authentication found
    res.status(401).json({ 
      message: "Authentication required",
      error: "Please log in to access this resource"
    });
    
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(500).json({ 
      message: "Authentication error",
      error: "Internal server error during authentication"
    });
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.userId) {
    return res.status(401).json({ 
      message: "Authentication required",
      error: "User must be authenticated to access this resource"
    });
  }
  next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  // This middleware extracts user info if available but doesn't require it
  authMiddleware(req, res, (err) => {
    if (err) {
      // Log the error but don't block the request
      console.warn("Optional auth failed:", err);
    }
    // Continue regardless of authentication status
    next();
  });
}
