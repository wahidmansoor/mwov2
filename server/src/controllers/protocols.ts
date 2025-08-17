import { Request, Response } from "express";
import { protocolService } from "../services/protocolService.js";
import { logger, logClinicalEvent } from "../utils/logger.js";
import { asyncHandler, NotFoundError } from "../utils/errorHandler.js";
import { protocolSearchSchema } from "../utils/validation.js";

export const getSymptomProtocol = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const protocol = await protocolService.getSymptomProtocol(slug);
  
  if (!protocol) {
    throw new NotFoundError(`Symptom protocol '${slug}'`);
  }
  
  logClinicalEvent('protocol_access', {
    type: 'symptom',
    slug,
    userId: req.headers['x-user-id'] || 'anonymous'
  });
  
  logger.info({ slug, protocolId: protocol.id }, 'Symptom protocol retrieved');
  res.json({
    ...protocol,
    timestamp: new Date().toISOString(),
    disclaimer: "This protocol is for clinical guidance only. Always consider individual patient factors."
  });
});

export const getEmergencyProtocol = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const protocol = await protocolService.getEmergencyProtocol(slug);
  
  if (!protocol) {
    throw new NotFoundError(`Emergency protocol '${slug}'`);
  }
  
  logClinicalEvent('protocol_access', {
    type: 'emergency',
    slug,
    userId: req.headers['x-user-id'] || 'anonymous'
  });
  
  logger.info({ slug, protocolId: protocol.id }, 'Emergency protocol retrieved');
  res.json({
    ...protocol,
    timestamp: new Date().toISOString(),
    disclaimer: "This is an emergency protocol. Ensure immediate clinical assessment and intervention."
  });
});

export const searchProtocols = asyncHandler(async (req: Request, res: Response) => {
  const validatedQuery = protocolSearchSchema.parse(req.query);
  const results = await protocolService.searchProtocols(validatedQuery);
  
  logClinicalEvent('protocol_search', {
    query: validatedQuery.q,
    type: validatedQuery.type,
    resultCount: results.length,
    userId: req.headers['x-user-id'] || 'anonymous'
  });
  
  logger.info({ 
    query: validatedQuery.q, 
    type: validatedQuery.type,
    resultCount: results.length 
  }, 'Protocol search performed');
  
  res.json({
    results,
    count: results.length,
    query: validatedQuery,
    timestamp: new Date().toISOString()
  });
});

export const getAllProtocols = asyncHandler(async (req: Request, res: Response) => {
  const { category, type } = req.query;
  const protocols = await protocolService.getAllProtocols({ 
    category: category as string, 
    type: type as 'symptom' | 'emergency' 
  });
  
  logger.info({ 
    category, 
    type, 
    count: protocols.length 
  }, 'All protocols retrieved');
  
  res.json({
    protocols,
    count: protocols.length,
    filters: { category, type },
    timestamp: new Date().toISOString()
  });
});
