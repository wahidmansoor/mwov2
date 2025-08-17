import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/aiService";
import { clinicalDecisionEngine } from "./services/clinicalDecisionEngine";
import { insertDecisionSupportInputSchema, insertAiInteractionSchema } from "@shared/schema";
import { dataRoutes } from "./routes-data.js";
import { z } from "zod";
import * as clinicalApi from "./api/clinical.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // CSP test endpoint
  app.get('/api/test-csp', (req, res) => {
    res.json({ 
      message: 'CSP headers should be applied by helmet middleware',
      headers: {
        'Content-Security-Policy': res.getHeaders()['content-security-policy'] || 'Not set'
      }
    });
  });

  // Development mode check endpoint (always return dev mode for simplicity)
  app.get('/api/dev-mode-check', (req, res) => {
    res.json({ devMode: true });
  });

  // Simple auth endpoints that return mock data
  app.get('/api/auth/user', async (req, res) => {
    // Return a mock user for development
    const mockUser = {
      id: 'dev-user-123',
      name: 'Development User',
      email: 'dev@oncovista.local',
      role: 'doctor',
      department: 'oncology'
    };
    res.json(mockUser);
  });

  app.get('/api/auth/me', async (req, res) => {
    const mockUser = {
      id: 'dev-user-123',
      name: 'Development User',
      email: 'dev@oncovista.local',
      role: 'doctor',
      department: 'oncology'
    };
    res.json(mockUser);
  });

  app.post('/api/auth/logout', (req, res) => {
    res.json({ success: true });
  });

  // Decision Support API endpoints (no auth required)
  app.post('/api/decision-support', async (req, res) => {
    try {
      const input = insertDecisionSupportInputSchema.parse(req.body);
      const result = await storage.createDecisionSupportInput({
        ...input,
        createdBy: 'dev-user-123', // Use mock user ID
      });
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create decision support input" });
    }
  });

  app.get('/api/decision-support', async (req, res) => {
    try {
      const { createdBy, moduleType, limit } = req.query;
      const filters = {
        createdBy: createdBy as string,
        moduleType: moduleType as string,
        limit: limit ? parseInt(limit as string) : undefined,
      };
      const inputs = await storage.getDecisionSupportInputs(filters);
      res.json(inputs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch decision support inputs" });
    }
  });

  // AI Service endpoints (no auth required)
  app.post('/api/ai/analyze', async (req, res) => {
    try {
      const { context, query } = req.body;
      
      // Simple mock AI response for now
      const result = {
        response: "AI analysis completed (authentication disabled mode)",
        confidence: 0.8,
        recommendations: ["Consult oncologist", "Review latest NCCN guidelines"],
        timestamp: new Date().toISOString()
      };
      
      // Log AI interaction
      await storage.createAiInteraction({
        userId: 'dev-user-123',
        moduleType: context?.moduleType || 'general',
        intent: context?.intent || 'analysis',
        inputContext: context || {},
        aiResponse: result,
        confidenceScore: result.confidence.toString(),
        responseTimeMs: 100,
        modelVersion: 'mock-ai',
      });
      
      res.json(result);
    } catch (error) {
      console.error('AI analyze error:', error);
      res.status(500).json({ message: "Failed to analyze query" });
    }
  });

  // Clinical Decision Engine endpoints (no auth required)
  app.post('/api/clinical-decision', async (req, res) => {
    try {
      const { patientContext, clinicalQuestion } = req.body;
      
      // Simple mock clinical decision response
      const recommendation = {
        decision: "Clinical recommendation generated (authentication disabled mode)",
        confidence: 0.85,
        evidence: ["NCCN Guidelines v2024", "Recent clinical studies"],
        nextSteps: ["Order additional tests", "Schedule follow-up"],
        timestamp: new Date().toISOString()
      };
      
      res.json(recommendation);
    } catch (error) {
      console.error('Clinical decision error:', error);
      res.status(500).json({ message: "Failed to generate clinical recommendation" });
    }
  });

  // Mount new clinical data API routes
  app.use('/api', dataRoutes);

  // Database query endpoints using new Clinical API
  app.get('/api/nccn-guidelines', async (req, res) => {
    const { limit = 50, offset = 0, category, cancer_type } = req.query;
    
    const result = await clinicalApi.getNccnGuidelines({
      cancer_type: cancer_type as string,
      category: category as string,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/clinical-protocols', async (req, res) => {
    const { limit = 50, offset = 0, cancer_type, protocol_type } = req.query;
    
    const result = await clinicalApi.getClinicalProtocols({
      cancer_type: cancer_type as string,
      protocol_type: protocol_type as string,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/cd-protocols', async (req, res) => {
    const { limit = 50, tumour_group, code, status } = req.query;
    
    const result = await clinicalApi.getCdProtocols({
      tumour_group: tumour_group as string,
      code: code as string,
      status: status as string,
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/treatment-protocols', async (req, res) => {
    const { limit = 50, tumour_group, code, name } = req.query;
    
    const result = await clinicalApi.getTreatmentProtocols({
      tumour_group: tumour_group as string,
      code: code as string,
      name: name as string,
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/oncology-medications', async (req, res) => {
    const { limit = 50, classification, search, is_chemotherapy, is_immunotherapy, is_targeted_therapy } = req.query;
    
    const result = await clinicalApi.getOncologyMedications({
      classification: classification as string,
      search: search as string,
      is_chemotherapy: is_chemotherapy === 'true',
      is_immunotherapy: is_immunotherapy === 'true',
      is_targeted_therapy: is_targeted_therapy === 'true',
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/admission-criteria', async (req, res) => {
    const { limit = 50, cancer_type, admission_type } = req.query;
    
    const result = await clinicalApi.getAdmissionCriteria({
      cancer_type: cancer_type as string,
      admission_type: admission_type as string,
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  // Palliative Care endpoints
  app.get('/api/palliative/symptom-protocols', async (req, res) => {
    const { limit = 50, category, slug } = req.query;
    
    const result = await clinicalApi.getPalliativeSymptomProtocols({
      category: category as string,
      slug: slug as string,
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/palliative/emergency-guidelines', async (req, res) => {
    const { limit = 50, urgency, slug } = req.query;
    
    const result = await clinicalApi.getPalliativeEmergencyGuidelines({
      urgency: urgency as string,
      slug: slug as string,
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  app.get('/api/palliative/calculators', async (req, res) => {
    const { limit = 50, kind, slug } = req.query;
    
    const result = await clinicalApi.getPalliativeCalculators({
      kind: kind as string,
      slug: slug as string,
      limit: parseInt(limit as string)
    });
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.json(result);
  });

  // Database health check
  app.get('/api/db/health', async (req, res) => {
    const result = await clinicalApi.checkDatabaseHealth();
    if (result.error) {
      return res.status(500).json({ message: result.error });
    }
    res.json(result.data);
  });

  // Generic catch-all for other API routes
  app.all('/api/*', (req, res) => {
    res.status(404).json({ message: `API endpoint ${req.path} not found` });
  });

  const server = createServer(app);
  return server;
}
