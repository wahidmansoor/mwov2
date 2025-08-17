import { Request, Response } from "express";
import { analyticsService } from "../services/analyticsService.js";
import { logger } from "../utils/logger.js";
import { asyncHandler } from "../utils/errorHandler.js";
import { analyticsLogSchema, analyticsQuerySchema } from "../utils/validation.js";

export const logUsage = asyncHandler(async (req: Request, res: Response) => {
  const input = analyticsLogSchema.parse(req.body);
  
  // Add request metadata
  const enrichedData = {
    ...input,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: input.timestamp || new Date().toISOString(),
    sessionId: req.headers['x-session-id'] || 'unknown'
  };
  
  await analyticsService.logUsage(enrichedData);
  
  logger.info({ module: input.module, action: input.action }, 'Usage logged');
  res.json({ 
    success: true,
    timestamp: enrichedData.timestamp,
    message: "Usage logged successfully"
  });
});

export const getSummary = asyncHandler(async (req: Request, res: Response) => {
  const query = analyticsQuerySchema.parse(req.query);
  const summary = await analyticsService.getSummary(query);
  
  logger.info({ query }, 'Analytics summary retrieved');
  res.json({
    ...summary,
    query_parameters: query,
    timestamp: new Date().toISOString()
  });
});

export const getUsageTrends = asyncHandler(async (req: Request, res: Response) => {
  const query = analyticsQuerySchema.parse(req.query);
  const trends = await analyticsService.getUsageTrends(query);
  
  logger.info({ query }, 'Usage trends retrieved');
  res.json({
    trends,
    query_parameters: query,
    timestamp: new Date().toISOString()
  });
});

export const getUserAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const query = analyticsQuerySchema.parse(req.query);
  
  const userStats = await analyticsService.getUserAnalytics(userId, query);
  
  logger.info({ userId, query }, 'User analytics retrieved');
  res.json({
    user_id: userId,
    analytics: userStats,
    query_parameters: query,
    timestamp: new Date().toISOString(),
    privacy_note: "User data is anonymized for privacy protection"
  });
});
