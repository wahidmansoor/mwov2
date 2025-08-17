import { Router } from "express";
import calculators from "./calculators.js";
import protocols from "./protocols.js";
import ai from "./ai.js";
import analytics from "./analytics.js";
import health from "./health.js";

export const router = Router();

// Health check should be first for load balancers
router.use("/health", health);

// Core clinical modules
router.use("/calculators", calculators);
router.use("/protocols", protocols);
router.use("/ai", ai);
router.use("/analytics", analytics);

// API root endpoint
router.get('/', (req, res) => {
  res.json({ 
    message: 'OncoVista API - Restructured Medical Decision Support System',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      calculators: '/api/calculators',
      protocols: '/api/protocols',
      ai: '/api/ai',
      analytics: '/api/analytics',
      health: '/api/health'
    },
    documentation: '/api/docs',
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint (placeholder for future Swagger integration)
router.get('/docs', (req, res) => {
  res.json({
    message: 'API Documentation',
    version: '2.0.0',
    swagger: '/api/docs/swagger.json',
    postman: '/api/docs/postman.json',
    endpoints: {
      'POST /api/calculators/opioid-conversion': 'Convert opioid dosages between different medications',
      'POST /api/calculators/renal-dose-adjustment': 'Adjust medication doses based on renal function',
      'POST /api/calculators/prognostic-index': 'Calculate prognostic indices for palliative care',
      'GET /api/protocols/symptoms/:slug': 'Retrieve symptom management protocols',
      'GET /api/protocols/emergencies/:slug': 'Retrieve emergency management protocols',
      'GET /api/protocols/search': 'Search protocols by keywords',
      'POST /api/ai/summarize-protocol': 'AI-powered protocol summarization',
      'POST /api/ai/explain-education': 'AI-powered educational content explanation',
      'POST /api/ai/compare-guidelines': 'AI-powered guideline comparison',
      'POST /api/analytics/log': 'Log usage analytics',
      'GET /api/analytics/summary': 'Get usage analytics summary',
      'GET /api/analytics/trends': 'Get usage trends over time'
    }
  });
});

export default router;
