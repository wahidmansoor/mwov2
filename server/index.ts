import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes-no-auth";
import { setupVite, serveStatic, log } from "./vite";
import { env } from "./env.js";
import { applySecurity } from "./security.js";
import { createLogger, createHttpLogger, addHealthEndpoints } from "./observability.js";
import { attachShutdown } from "./shutdown.js";

const app = express();

// Initialize logger
const logger = createLogger(env);
const httpLogger = createHttpLogger(logger);

// Apply HTTP request logging first
app.use(httpLogger);

// Apply security middleware (includes CORS, helmet, compression, rate limiting, body parsing)
applySecurity(app, env);

// Add health endpoints
addHealthEndpoints(app);

// Custom request/response timing middleware (keep existing functionality)
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
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error({ err, status }, `Request error: ${message}`);
    res.status(status).json({ message });
  });

  // Set Node.js server timeouts
  server.headersTimeout = 65000;
  server.requestTimeout = 60000;
  server.keepAliveTimeout = 60000;

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development" || env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use environment-driven configuration with safe fallbacks
  server.listen({
    port: env.PORT,
    host: env.HOST,
    reusePort: true,
  }, () => {
    logger.info({
      port: env.PORT,
      host: env.HOST,
      env: env.NODE_ENV,
      origin: env.ORIGIN
    }, `Server listening on ${env.HOST}:${env.PORT}`);
    
    // Keep backward compatibility with existing log format
    log(`serving on port ${env.PORT}`);
  });

  // Attach graceful shutdown handlers
  attachShutdown(server, logger);
})();

// Export logger for use by other modules if needed
export { logger };
