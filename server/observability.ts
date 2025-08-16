import pino from 'pino';
import pinoHttp from 'pino-http';
import type { Env } from './env.js';
import type { Express, Request, Response } from 'express';

export function createLogger(env: Env) {
  return pino({
    level: env.LOG_LEVEL,
    redact: ['req.headers.authorization', 'req.headers.cookie'],
    ...(env.NODE_ENV === 'development' ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    } : {})
  });
}

export function createHttpLogger(logger: pino.Logger) {
  return pinoHttp({
    logger,
    redact: ['req.headers.authorization', 'req.headers.cookie'],
    customLogLevel: function (res: any, err: any) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      }
      return 'info';
    },
    customSuccessMessage: function (req: any, res: any, responseTime: number) {
      if (req.url?.startsWith('/api')) {
        return `${req.method} ${req.url} ${res.statusCode}`;
      }
      return `request completed in ${responseTime}ms`; // Default message for non-API routes
    }
  });
}

export function addHealthEndpoints(app: Express): void {
  // Add new healthz endpoint (keep existing /api/health untouched)
  app.get('/api/healthz', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });
}
