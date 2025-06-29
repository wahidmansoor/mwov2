import type { Request, Response } from "express";

// Local development user credentials
const LOCAL_USER = {
  email: 'local@test.com',
  password: 'test1234', // Plain text for development
  id: '9bd3c162-767d-4e15-83ac-3515b6e31979', // Use existing user ID
  firstName: 'Local',
  lastName: 'Dev',
  profileImageUrl: null
};

export async function handleLocalLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  // Simple plain-text comparison for development
  if (email === LOCAL_USER.email && password === LOCAL_USER.password) {
    try {
      // Create session data for existing local user
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

      // Store user data in session for development
      if (req.session) {
        (req.session as any).user = sessionUser;
        (req as any).user = sessionUser;
      } else {
        (req as any).user = sessionUser;
      }

      console.log("Local development login successful for:", email);
      res.json({ success: true, user: sessionUser.claims });
    } catch (error) {
      console.error("Error during local login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export function isLocalDevMode(): boolean {
  return process.env.DEV_MODE === 'true';
}