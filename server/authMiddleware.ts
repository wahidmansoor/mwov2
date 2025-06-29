import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Load environment variables from .env.local for development
dotenv.config({ path: '.env.local' });

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if DEV_MODE is enabled
  if (process.env.DEV_MODE === 'true') {
    console.log("Auth bypassed for dev");
    
    // Check if user is already authenticated via session (from local login)
    if (req.session && (req.session as any).user) {
      (req as any).user = (req.session as any).user;
      return next();
    }
    
    // If no session user, check if user is already set on request
    if ((req as any).user) {
      return next();
    }
    
    // Create a default mock user session for development (fallback)
    (req as any).user = {
      claims: {
        sub: 'dev-user-123',
        email: 'local@test.com',
        first_name: 'Local',
        last_name: 'User',
        profile_image_url: null
      },
      access_token: 'dev-token',
      expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    };
    return next();
  }

  // Use the existing Replit Auth middleware for production
  // Check if user is authenticated via session or passport
  const user = (req as any).user;
  
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check token expiration if exists
  if (user.expires_at) {
    const now = Math.floor(Date.now() / 1000);
    if (now > user.expires_at) {
      return res.status(401).json({ message: "Token expired" });
    }
  }

  next();
};