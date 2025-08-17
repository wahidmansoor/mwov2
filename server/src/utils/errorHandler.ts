import { Request, Response, NextFunction } from "express";
import { logger } from "./logger.js";
import { ZodError } from "zod";

export interface CustomError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Enhanced error logging for medical application
  const errorDetails = {
    err: {
      message: err.message,
      stack: err.stack,
      code: err.code
    },
    req: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    },
    status,
    timestamp: new Date().toISOString()
  };

  // Log different severity levels based on error type
  if (status >= 500) {
    logger.error(errorDetails, `Server error: ${message}`);
  } else if (status >= 400) {
    logger.warn(errorDetails, `Client error: ${message}`);
  } else {
    logger.info(errorDetails, `Request error: ${message}`);
  }

  // Handle specific error types
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid input data",
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
        code: e.code
      })),
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }

  // Handle database errors
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(503).json({
      error: "Service Unavailable",
      message: "Database connection failed",
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }

  // Handle OpenAI API errors
  if (err.code === 'insufficient_quota' || err.message?.includes('quota')) {
    return res.status(503).json({
      error: "AI Service Unavailable",
      message: "AI service quota exceeded",
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }

  // Default error response
  const errorResponse: any = {
    error: status >= 500 ? "Internal Server Error" : message,
    message: status >= 500 ? "An unexpected error occurred" : message,
    timestamp: new Date().toISOString(),
    path: req.path,
    requestId: req.headers['x-request-id'] || 'unknown'
  };

  // Only include sensitive details in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.details = {
      stack: err.stack,
      code: err.code,
      originalMessage: err.message
    };
  }

  res.status(status).json(errorResponse);
};

// Async error wrapper for route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error classes for clinical applications
export class ValidationError extends Error {
  status = 400;
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  status = 404;
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  status = 401;
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ClinicalDataError extends Error {
  status = 422;
  constructor(message: string, public clinicalContext?: any) {
    super(message);
    this.name = 'ClinicalDataError';
  }
}
