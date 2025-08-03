import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { db } from '../db';
import { auditLog } from '../db/schema';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  admin: { windowMs: 15 * 60 * 1000, maxRequests: 1000 },
  oncologist: { windowMs: 15 * 60 * 1000, maxRequests: 500 },
  radiation_oncologist: { windowMs: 15 * 60 * 1000, maxRequests: 500 },
  default: { windowMs: 15 * 60 * 1000, maxRequests: 100 }
};

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for AI/ML endpoints
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: {
    error: 'Too many AI/ML requests, please try again later',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Very strict limiter for potentially sensitive operations
export const sensitiveOpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per hour
  message: {
    error: 'Too many sensitive operations attempted, please try again later',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiEndpointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: async (req: Request) => {
    const userRole = req.user?.role || 'default';
    return RATE_LIMITS[userRole]?.maxRequests || RATE_LIMITS.default.maxRequests;
  },
  handler: async (req: Request, res: Response) => {
    // Log rate limit violation
    await db.insert(auditLog).values({
      userId: req.userId || 'anonymous',
      action: 'RATE_LIMIT_EXCEEDED',
      success: false,
      details: `Rate limit exceeded for ${req.path}`,
      metadata: JSON.stringify({
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        path: req.path,
        method: req.method
      }),
      timestamp: new Date()
    });

    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded',
      retryAfter: res.getHeader('Retry-After')
    });
  }
});
