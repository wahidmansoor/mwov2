import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Load environment variables from .env.local for development
dotenv.config({ path: '.env.local' });

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if DEV_MODE is enabled
  if (process.env.DEV_MODE === 'true') {
    console.log("Auth bypassed for dev");
    // Create a mock user session for development
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
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as any;
  if (!user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now > user.expires_at) {
    return res.status(401).json({ message: "Token expired" });
  }

  next();
};