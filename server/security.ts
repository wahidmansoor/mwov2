import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import type { Env } from './env.js';

export function applySecurity(app: express.Express, env: Env): void {
  // Trust proxy for deployments behind load balancers
  app.set('trust proxy', 1);

  // Apply Helmet for security headers
  app.use(helmet({
    contentSecurityPolicy: env.NODE_ENV === 'development' ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'", 
          "'unsafe-eval'",
          "translate.googleapis.com",
          "translate.google.com", 
          "www.google.com",
          "www.gstatic.com",
          "replit.com",
          "*.replit.com",
          "chrome-extension:"
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "translate.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "translate.googleapis.com"],
        fontSrc: ["'self'", "translate.googleapis.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      }
    } : {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      }
    },
  }));

  // Apply CORS
  const corsOrigins = env.NODE_ENV === 'development' 
    ? ['http://localhost:5173', 'http://localhost:5001']
    : [env.ORIGIN];

  app.use(cors({
    origin: corsOrigins,
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Apply compression
  app.use(compression());

  // Apply body parsing with size limits
  app.use(express.json({ limit: env.REQUEST_SIZE_LIMIT }));
  app.use(express.urlencoded({ 
    extended: false, 
    limit: env.REQUEST_SIZE_LIMIT 
  }));

  // Apply rate limiting (more permissive in development)
  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.NODE_ENV === 'development' ? env.RATE_LIMIT_MAX * 10 : env.RATE_LIMIT_MAX, // 10x limit in dev
    message: {
      error: 'Too many requests',
      retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1000)
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable legacy X-RateLimit-* headers
    // Skip rate limiting for certain paths in development
    skip: env.NODE_ENV === 'development' ? (req) => {
      return req.path.startsWith('/src/') || req.path.endsWith('.tsx') || req.path.endsWith('.ts');
    } : undefined,
  });

  app.use(limiter);
}
