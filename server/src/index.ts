import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import pino from "pino-http";
import { router as appRoutes } from "./routes/index.js";
import { errorHandler } from "./utils/errorHandler.js";
import { logger } from "./utils/logger.js";

const app = express();

// Initialize structured logging
const pinoLogger = pino({
  logger,
  redact: ['req.headers.authorization', 'req.headers.cookie'],
  customLogLevel: (res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
    if (res.statusCode >= 500 || err) return 'error';
    return 'info';
  }
});

// Apply HTTP request logging first
app.use(pinoLogger);

// Middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enhanced security with CSP for OncoVista medical app
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.openai.com", process.env.SUPABASE_URL].filter(Boolean),
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      manifestSrc: ["'self'"],
      workerSrc: ["'self'", "blob:"]
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
}));

app.use(compression({
  threshold: 1024,
  level: 6,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Trust proxy for deployments (Netlify, Railway, etc.)
app.set('trust proxy', 1);

// Custom timing middleware for clinical application monitoring
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      const logData = {
        method: req.method,
        path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip
      };

      if (duration > 5000) {
        logger.warn(logData, 'Slow API response detected');
      } else {
        logger.info(logData, 'API request completed');
      }
    }
  });

  next();
});

// Routes
app.use("/api", appRoutes);

// Global Error Handler
app.use(errorHandler);

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  return (code: number) => {
    logger.info(`Received ${signal} with code ${code}. Starting graceful shutdown...`);
    
    // Close server and cleanup resources
    process.exit(0);
  };
};

process.on('SIGINT', gracefulShutdown('SIGINT'));
process.on('SIGTERM', gracefulShutdown('SIGTERM'));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  logger.info({
    port: PORT,
    host: HOST,
    env: process.env.NODE_ENV || 'development'
  }, `🚀 OncoVista API Server running on ${HOST}:${PORT}`);
  
  console.log(`🚀 OncoVista API Server running on ${HOST}:${PORT}`);
});

// Configure server timeouts for medical application reliability
server.headersTimeout = 65000;
server.requestTimeout = 60000;
server.keepAliveTimeout = 60000;
server.timeout = 120000;

export default app;
export { logger };
