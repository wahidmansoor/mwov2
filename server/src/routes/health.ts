import { Router } from "express";
import { logger } from "../utils/logger.js";

const router = Router();

router.get("/", (req, res) => {
  const healthData = {
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: "MB"
    },
    version: process.env.npm_package_version || "2.0.0",
    environment: process.env.NODE_ENV || "development"
  };
  
  logger.info(healthData, 'Health check performed');
  res.json(healthData);
});

router.get("/detailed", async (req, res) => {
  try {
    // Perform various health checks
    const healthChecks = {
      api: "operational",
      memory: process.memoryUsage().heapUsed < 512 * 1024 * 1024 ? "good" : "warning",
      uptime: process.uptime() > 0 ? "good" : "error",
      environment: process.env.NODE_ENV || "unknown"
    };
    
    // Check AI service status
    let aiStatus = "not_configured";
    if (process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY) {
      aiStatus = "configured";
    }
    
    const detailed = {
      status: "healthy",
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      services: {
        api: healthChecks.api,
        ai: aiStatus,
        analytics: "operational",
        protocols: "operational",
        calculators: "operational"
      },
      system: {
        memory: {
          ...process.memoryUsage(),
          formatted: {
            heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
            heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB"
          }
        },
        cpu: process.cpuUsage(),
        platform: process.platform,
        node_version: process.version,
        pid: process.pid
      },
      application: {
        name: "OncoVista API",
        version: process.env.npm_package_version || "2.0.0",
        environment: process.env.NODE_ENV || "development",
        started_at: new Date(Date.now() - process.uptime() * 1000).toISOString()
      },
      health_checks: healthChecks
    };
    
    // Determine overall status
    const hasErrors = Object.values(healthChecks).includes("error");
    const hasWarnings = Object.values(healthChecks).includes("warning");
    
    const status = hasErrors ? 500 : hasWarnings ? 200 : 200;
    const overallStatus = hasErrors ? "unhealthy" : hasWarnings ? "degraded" : "healthy";
    
    detailed.status = overallStatus;
    
    res.status(status).json(detailed);
  } catch (err) {
    logger.error({ err }, 'Detailed health check failed');
    res.status(500).json({ 
      status: "unhealthy", 
      error: "Health check failed",
      timestamp: new Date().toISOString()
    });
  }
});

// Readiness probe (for Kubernetes/container orchestration)
router.get("/ready", (req, res) => {
  // Check if all critical services are ready
  const criticalServices = {
    api: true, // API is always ready if we get here
    memory: process.memoryUsage().heapUsed < 1024 * 1024 * 1024, // Less than 1GB
  };
  
  const allReady = Object.values(criticalServices).every(Boolean);
  
  const response = {
    ready: allReady,
    services: criticalServices,
    timestamp: new Date().toISOString()
  };
  
  res.status(allReady ? 200 : 503).json(response);
});

// Liveness probe (for Kubernetes/container orchestration)
router.get("/live", (req, res) => {
  // Simple liveness check - if we can respond, we're alive
  res.json({
    alive: true,
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime())
  });
});

// Metrics endpoint (basic metrics for monitoring)
router.get("/metrics", (req, res) => {
  const memUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  // Return metrics in a simple key-value format
  const metrics = [
    `# OncoVista API Metrics`,
    `oncovista_uptime_seconds ${Math.round(process.uptime())}`,
    `oncovista_memory_heap_used_bytes ${memUsage.heapUsed}`,
    `oncovista_memory_heap_total_bytes ${memUsage.heapTotal}`,
    `oncovista_memory_rss_bytes ${memUsage.rss}`,
    `oncovista_cpu_user_microseconds ${cpuUsage.user}`,
    `oncovista_cpu_system_microseconds ${cpuUsage.system}`,
    `# Process info`,
    `oncovista_process_pid ${process.pid}`,
    `oncovista_node_version_info{version="${process.version}"} 1`,
    `oncovista_platform_info{platform="${process.platform}"} 1`
  ].join('\n');
  
  res.set('Content-Type', 'text/plain').send(metrics);
});

export default router;
