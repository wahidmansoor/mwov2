import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/aiService";
import { clinicalDecisionEngine } from "./services/clinicalDecisionEngine";
import { insertDecisionSupportInputSchema, insertAiInteractionSchema } from "@shared/schema";
import { dataRoutes } from "./routes-data.js";
import { z } from "zod";

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

  // Database query endpoints using new Supabase helpers
  app.get('/api/nccn-guidelines', async (req, res) => {
    try {
      const { nccnGuidelines } = await import('../src/lib/db');
      const { limit = 50, offset = 0, category, cancer_type } = req.query;
      
      const filters: any = {};
      if (category) filters.category = category as string;
      if (cancer_type) filters.cancer_type = cancer_type as string;
      
      const guidelines = await nccnGuidelines.list({ 
        limit: parseInt(limit as string), 
        offset: parseInt(offset as string),
        filters 
      });
      res.json(guidelines);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NCCN guidelines" });
    }
  });

  app.get('/api/oncology-medications', async (req, res) => {
    try {
      const { oncologyMedications } = await import('../src/lib/db');
      const { limit = 50, offset = 0, classification } = req.query;
      
      const filters: any = {};
      if (classification) filters.classification = classification as string;
      
      const medications = await oncologyMedications.list({ 
        limit: parseInt(limit as string), 
        offset: parseInt(offset as string),
        filters 
      });
      res.json(medications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch oncology medications" });
    }
  });

  app.get('/api/treatment-protocols', async (req, res) => {
    try {
      const { treatmentProtocols } = await import('../src/lib/db');
      const { limit = 50, offset = 0, tumour_group } = req.query;
      
      const filters: any = {};
      if (tumour_group) filters.tumour_group = tumour_group as string;
      
      const protocols = await treatmentProtocols.list({ 
        limit: parseInt(limit as string), 
        offset: parseInt(offset as string),
        filters 
      });
      res.json(protocols);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch treatment protocols" });
    }
  });

  // Generic catch-all for other API routes
  app.all('/api/*', (req, res) => {
    res.status(404).json({ message: `API endpoint ${req.path} not found` });
  });

  const server = createServer(app);
  return server;
}
