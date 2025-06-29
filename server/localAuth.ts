import type { Request, Response } from "express";
import { storage } from "./storage";

// Local development user credentials
const LOCAL_USER = {
  email: 'local@test.com',
  password: 'test1234', // Plain text for development
  id: 'dev-user-123',
  firstName: 'Local',
  lastName: 'User',
  profileImageUrl: null
};

export async function handleLocalLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  // Simple plain-text comparison for development
  if (email === LOCAL_USER.email && password === LOCAL_USER.password) {
    // Create or update the local user in the database
    try {
      await storage.upsertUser({
        id: LOCAL_USER.id,
        email: LOCAL_USER.email,
        firstName: LOCAL_USER.firstName,
        lastName: LOCAL_USER.lastName,
        profileImageUrl: LOCAL_USER.profileImageUrl,
      });

      // Create session data
      const sessionUser = {
        claims: {
          sub: LOCAL_USER.id,
          email: LOCAL_USER.email,
          first_name: LOCAL_USER.firstName,
          last_name: LOCAL_USER.lastName,
          profile_image_url: LOCAL_USER.profileImageUrl
        },
        access_token: 'dev-token',
        expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      };

      // Store in session
      (req as any).user = sessionUser;
      (req.session as any).user = sessionUser;

      console.log("Local development login successful for:", email);
      res.json({ success: true, user: sessionUser.claims });
    } catch (error) {
      console.error("Error creating local user:", error);
      res.status(500).json({ message: "Login failed" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export function isLocalDevMode(): boolean {
  return process.env.DEV_MODE === 'true';
}