import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard',
      messageFormat: '{service} [{level}]: {msg}'
    }
  } : undefined,
  base: {
    service: 'oncovista-api',
    version: process.env.npm_package_version || '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  },
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token'],
    censor: '[REDACTED]'
  }
});

// Helper function for clinical event logging
export const logClinicalEvent = (eventType: string, data: any) => {
  logger.info({
    eventType,
    timestamp: new Date().toISOString(),
    ...data
  }, `Clinical event: ${eventType}`);
};

// Helper function for audit logging
export const logAuditEvent = (userId: string, action: string, resource: string, details?: any) => {
  logger.info({
    audit: true,
    userId,
    action,
    resource,
    timestamp: new Date().toISOString(),
    details
  }, `Audit: ${action} on ${resource}`);
};
