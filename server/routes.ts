import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { authMiddleware } from "./authMiddleware";
import { handleLocalLogin, isLocalDevMode } from "./localAuth";
import { rbacMiddleware } from "./middleware/rbac";
import { aiService } from "./services/aiService";
import { clinicalDecisionEngine } from "./services/clinicalDecisionEngine";
import { insertDecisionSupportInputSchema, insertAiInteractionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication and session middleware for both environments
  if (!isLocalDevMode()) {
    // Production: Use Replit Auth (includes session setup)
    await setupAuth(app);
  } else {
    // Development: Setup basic session middleware for local auth
    const { getSession } = await import("./replitAuth");
    app.use(getSession());
  }

  // Development mode check endpoint
  app.get('/api/dev-mode-check', (req, res) => {
    if (isLocalDevMode()) {
      res.json({ devMode: true });
    } else {
      res.status(404).json({ devMode: false });
    }
  });

  // Local development authentication routes
  if (isLocalDevMode()) {
    app.post('/api/local/login', handleLocalLogin);
    
    app.get('/api/local/logout', (req, res) => {
      req.session.destroy(() => {
        res.json({ success: true });
      });
    });
  }

  // Auth routes - works for both local dev and production
  app.get('/api/auth/user', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user) {
        res.json(user);
      } else {
        // If user not found in database, return user claims from session
        const userFromClaims = {
          id: req.user.claims.sub,
          email: req.user.claims.email,
          firstName: req.user.claims.first_name,
          lastName: req.user.claims.last_name,
          profileImageUrl: req.user.claims.profile_image_url,
          role: 'oncologist',
          isActive: true
        };
        res.json(userFromClaims);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/auth/me", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (user) {
        res.json({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          department: user.department
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Patient evaluation routes
  app.post("/api/patient-evaluations", authMiddleware, rbacMiddleware(["create_evaluations"]), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertDecisionSupportInputSchema.parse({
        ...req.body,
        createdBy: userId
      });
      
      const evaluation = await storage.createDecisionSupportInput(validatedData);
      
      // Log the activity
      await storage.createAuditLog({
        userId: userId,
        userRole: "user",
        action: "create_decision_support_input",
        resource: "decision_support_input",
        resourceId: evaluation.id,
        oldValues: null,
        newValues: evaluation,
        ipAddress: req.ip || null,
        userAgent: req.get('User-Agent') || null,
        sensitiveData: false
      });
      
      res.json(evaluation);
    } catch (error) {
      console.error("Create evaluation error:", error);
      res.status(400).json({ message: "Failed to create evaluation" });
    }
  });

  app.get("/api/patient-evaluations", authMiddleware, rbacMiddleware(["view_patient_data"]), async (req: any, res) => {
    try {
      const evaluations = await storage.getDecisionSupportInputs();
      res.json(evaluations);
    } catch (error) {
      console.error("Get evaluations error:", error);
      res.status(500).json({ message: "Failed to get evaluations" });
    }
  });

  app.get("/api/patient-evaluations/:id", authMiddleware, rbacMiddleware(["view_patient_data"]), async (req: any, res) => {
    try {
      const evaluation = await storage.getDecisionSupportInput(req.params.id);
      if (evaluation) {
        res.json(evaluation);
      } else {
        res.status(404).json({ message: "Evaluation not found" });
      }
    } catch (error) {
      console.error("Get evaluation error:", error);
      res.status(500).json({ message: "Failed to get evaluation" });
    }
  });

  // CDU Treatment Protocols API - serving authentic cd_protocols data
  app.get('/api/cdu/protocols', authMiddleware, async (req, res) => {
    try {
      const protocols = await storage.getCDProtocols();
      res.json(protocols);
    } catch (error) {
      console.error('Error fetching cd_protocols:', error);
      res.status(500).json({ error: 'Failed to fetch treatment protocols' });
    }
  });

  // OPD Module Risk Calculation endpoints
  app.post('/api/opd/risk-assessment', authMiddleware, async (req, res) => {
    const { calculateRiskAssessment } = await import('./api/riskCalculation');
    return calculateRiskAssessment(req, res);
  });

  app.get('/api/opd/cache-stats', authMiddleware, async (req, res) => {
    const { getCacheStats } = await import('./api/riskCalculation');
    return getCacheStats(req, res);
  });

  // AI analysis routes
  app.post("/api/ai/analyze-patient", authMiddleware, rbacMiddleware(["use_ai_recommendations"]), async (req: any, res) => {
    try {
      const startTime = Date.now();
      
      // Analyze with AI service
      const analysis = await aiService.analyzeClinicalCase(req.body);
      
      const responseTime = Date.now() - startTime;
      
      // Log AI interaction
      const aiInteraction = {
        userId: req.user.claims.sub,
        sessionId: req.sessionID,
        moduleType: "opd",
        intent: "patient_analysis",
        inputContext: req.body,
        aiResponse: analysis,
        confidenceScore: (analysis.overallRiskScore / 100).toFixed(2),
        responseTimeMs: responseTime,
        modelVersion: "gpt-4o"
      };
      
      await storage.createAiInteraction(aiInteraction);
      
      res.json(analysis);
    } catch (error) {
      console.error("AI analysis error:", error);
      res.status(500).json({ message: "AI analysis failed" });
    }
  });

  // Clinical protocols routes
  app.get("/api/clinical-protocols", authMiddleware, rbacMiddleware(["view_protocols"]), async (req: any, res) => {
    try {
      const { cancerType, stage } = req.query;
      const protocols = await storage.getClinicalProtocols({ 
        cancerType: cancerType as string, 
        stage: stage as string 
      });
      res.json(protocols);
    } catch (error) {
      console.error("Get protocols error:", error);
      res.status(500).json({ message: "Failed to get protocols" });
    }
  });

  // Dashboard routes
  app.get("/api/dashboard/stats", authMiddleware, async (req: any, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({ message: "Failed to get dashboard stats" });
    }
  });

  app.get("/api/dashboard/activities", authMiddleware, async (req: any, res) => {
    try {
      const activities = await storage.getRecentActivities();
      res.json(activities);
    } catch (error) {
      console.error("Get activities error:", error);
      res.status(500).json({ message: "Failed to get activities" });
    }
  });

  // Treatment protocols routes
  app.get("/api/treatment-protocols", isAuthenticated, rbacMiddleware(["view_protocols"]), async (req: any, res) => {
    try {
      const protocols = await storage.getTreatmentProtocols();
      res.json(protocols);
    } catch (error) {
      console.error("Get treatment protocols error:", error);
      res.status(500).json({ message: "Failed to get treatment protocols" });
    }
  });

  // CD Protocols routes
  app.get("/api/cd-protocols", authMiddleware, async (req: any, res) => {
    try {
      const { tumourGroup, treatmentIntent, code } = req.query;
      const protocols = await storage.getCdProtocols({
        tumourGroup: tumourGroup as string,
        treatmentIntent: treatmentIntent as string,
        code: code as string
      });
      res.json(protocols);
    } catch (error) {
      console.error("Failed to get CD protocols:", error);
      res.status(500).json({ message: "Failed to get CD protocols" });
    }
  });

  // CDU Module specific endpoint for treatment protocols
  app.get("/api/cdu/protocols", authMiddleware, async (req: any, res) => {
    try {
      const { tumourGroup, treatmentIntent, code } = req.query;
      const protocols = await storage.getCdProtocols({
        tumourGroup: tumourGroup as string,
        treatmentIntent: treatmentIntent as string,
        code: code as string
      });
      res.json(protocols);
    } catch (error) {
      console.error("Failed to get CDU protocols:", error);
      res.status(500).json({ message: "Failed to get CDU protocols" });
    }
  });

  // CDU Module specific endpoint for oncology medications
  app.get("/api/cdu/medications", authMiddleware, async (req: any, res) => {
    try {
      const { classification, isChemotherapy, isImmunotherapy, isTargetedTherapy, search } = req.query;
      const medications = await storage.getOncologyMedications({
        classification: classification === "all" ? undefined : classification as string,
        isChemotherapy: isChemotherapy === 'true',
        isImmunotherapy: isImmunotherapy === 'true',
        isTargetedTherapy: isTargetedTherapy === 'true',
        search: search as string
      });
      res.json(medications);
    } catch (error) {
      console.error("Failed to get oncology medications:", error);
      res.status(500).json({ message: "Failed to get oncology medications" });
    }
  });

  app.get("/api/cd-protocols/:id", authMiddleware, async (req: any, res) => {
    try {
      const protocol = await storage.getCdProtocol(req.params.id);
      if (protocol) {
        res.json(protocol);
      } else {
        res.status(404).json({ message: "Protocol not found" });
      }
    } catch (error) {
      console.error("Failed to get CD protocol:", error);
      res.status(500).json({ message: "Failed to get CD protocol" });
    }
  });

  app.get("/api/cd-protocols/code/:code", authMiddleware, async (req: any, res) => {
    try {
      const protocol = await storage.getCdProtocolByCode(req.params.code);
      if (protocol) {
        res.json(protocol);
      } else {
        res.status(404).json({ message: "Protocol not found" });
      }
    } catch (error) {
      console.error("Failed to get CD protocol by code:", error);
      res.status(500).json({ message: "Failed to get CD protocol" });
    }
  });

  // Oncology Medications routes
  app.get("/api/oncology-medications", authMiddleware, async (req: any, res) => {
    try {
      const { classification, isChemotherapy, isImmunotherapy, isTargetedTherapy, search } = req.query;
      const medications = await storage.getOncologyMedications({
        classification: classification as string,
        isChemotherapy: isChemotherapy === 'true',
        isImmunotherapy: isImmunotherapy === 'true',
        isTargetedTherapy: isTargetedTherapy === 'true',
        search: search as string
      });
      res.json(medications);
    } catch (error) {
      console.error("Failed to get oncology medications:", error);
      res.status(500).json({ message: "Failed to get oncology medications" });
    }
  });

  app.get("/api/oncology-medications/:id", isAuthenticated, async (req: any, res) => {
    try {
      const medication = await storage.getOncologyMedication(req.params.id);
      if (medication) {
        res.json(medication);
      } else {
        res.status(404).json({ message: "Medication not found" });
      }
    } catch (error) {
      console.error("Failed to get oncology medication:", error);
      res.status(500).json({ message: "Failed to get oncology medication" });
    }
  });

  // NCCN Guidelines comprehensive API endpoints
  app.get("/api/nccn/guidelines", isAuthenticated, async (req: any, res) => {
    try {
      const { referenceCode, category, cancerType, evidenceLevel } = req.query;
      const guidelines = await storage.getNccnGuidelines({
        referenceCode: referenceCode as string,
        category: category as string,
        cancerType: cancerType as string,
        evidenceLevel: evidenceLevel as string
      });
      res.json(guidelines);
    } catch (error) {
      console.error("Failed to get NCCN guidelines:", error);
      res.status(500).json({ message: "Failed to get NCCN guidelines" });
    }
  });

  app.get("/api/nccn/guidelines/:id", isAuthenticated, async (req: any, res) => {
    try {
      const guideline = await storage.getNccnGuideline(req.params.id);
      if (guideline) {
        res.json(guideline);
      } else {
        res.status(404).json({ message: "NCCN guideline not found" });
      }
    } catch (error) {
      console.error("Failed to get NCCN guideline:", error);
      res.status(500).json({ message: "Failed to get NCCN guideline" });
    }
  });

  app.get("/api/nccn/guidelines/reference/:code", isAuthenticated, async (req: any, res) => {
    try {
      const guideline = await storage.getNccnGuidelineByReference(req.params.code);
      if (guideline) {
        res.json(guideline);
      } else {
        res.status(404).json({ message: "NCCN guideline not found" });
      }
    } catch (error) {
      console.error("Failed to get NCCN guideline by reference:", error);
      res.status(500).json({ message: "Failed to get NCCN guideline" });
    }
  });

  app.get("/api/nccn/search", isAuthenticated, async (req: any, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        res.status(400).json({ message: "Search query required" });
        return;
      }
      const guidelines = await storage.searchNccnGuidelines(q as string);
      res.json(guidelines);
    } catch (error) {
      console.error("Failed to search NCCN guidelines:", error);
      res.status(500).json({ message: "Failed to search NCCN guidelines" });
    }
  });

  // Clinical decision support API endpoints
  app.get("/api/clinical-decision-support", isAuthenticated, async (req: any, res) => {
    try {
      const { moduleType, clinicalScenario, evidenceStrength } = req.query;
      const support = await storage.getClinicalDecisionSupport({
        moduleType: moduleType as string,
        clinicalScenario: clinicalScenario as string,
        evidenceStrength: evidenceStrength as string
      });
      res.json(support);
    } catch (error) {
      console.error("Failed to get clinical decision support:", error);
      res.status(500).json({ message: "Failed to get clinical decision support" });
    }
  });

  app.get("/api/clinical-decision-support/module/:moduleType", isAuthenticated, async (req: any, res) => {
    try {
      const support = await storage.getClinicalDecisionSupportByModule(req.params.moduleType);
      res.json(support);
    } catch (error) {
      console.error("Failed to get module decision support:", error);
      res.status(500).json({ message: "Failed to get module decision support" });
    }
  });

  app.post("/api/clinical-decision-support/recommendations", authMiddleware, async (req: any, res) => {
    try {
      const { inputParameters, moduleType } = req.body;
      const recommendations = await storage.getDecisionSupportRecommendations(inputParameters, moduleType);
      res.json(recommendations);
    } catch (error) {
      console.error("Failed to get decision support recommendations:", error);
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  // Biomarker guidelines API endpoints
  app.get("/api/biomarker-guidelines", authMiddleware, async (req: any, res) => {
    try {
      const { biomarkerName, cancerType, testingMethod } = req.query;
      const guidelines = await storage.getBiomarkerGuidelines({
        biomarkerName: biomarkerName as string,
        cancerType: cancerType as string,
        testingMethod: testingMethod as string
      });
      res.json(guidelines);
    } catch (error) {
      console.error("Failed to get biomarker guidelines:", error);
      res.status(500).json({ message: "Failed to get biomarker guidelines" });
    }
  });

  app.get("/api/biomarker-guidelines/cancer/:type", authMiddleware, async (req: any, res) => {
    try {
      const guidelines = await storage.getBiomarkersByType(req.params.type);
      res.json(guidelines);
    } catch (error) {
      console.error("Failed to get biomarkers by type:", error);
      res.status(500).json({ message: "Failed to get biomarkers" });
    }
  });

  // Cross-module integration endpoints
  app.post("/api/guidance/relevant", isAuthenticated, async (req: any, res) => {
    try {
      const { stage, biomarkers, treatmentSetting } = req.body;
      const guidelines = await storage.getRelevantNccnGuidelines({
        stage,
        biomarkers,
        treatmentSetting
      });
      res.json(guidelines);
    } catch (error) {
      console.error("Failed to get relevant guidelines:", error);
      res.status(500).json({ message: "Failed to get relevant guidelines" });
    }
  });

  app.get("/api/guidance/module/:moduleType/:scenario", isAuthenticated, async (req: any, res) => {
    try {
      const { moduleType, scenario } = req.params;
      const guidance = await storage.getModuleSpecificGuidance(moduleType, decodeURIComponent(scenario));
      res.json(guidance);
    } catch (error) {
      console.error("Failed to get module-specific guidance:", error);
      res.status(500).json({ message: "Failed to get module guidance" });
    }
  });

  // Enhanced analytics for NCCN integration
  app.get("/api/analytics/nccn-usage", isAuthenticated, async (req: any, res) => {
    try {
      // Get NCCN guidelines usage statistics
      const guidelines = await storage.getNccnGuidelines();
      const decisionSupport = await storage.getClinicalDecisionSupport();
      const biomarkers = await storage.getBiomarkerGuidelines();
      
      const stats = {
        totalGuidelines: guidelines.length,
        guidelinesByCategory: guidelines.reduce((acc: any, g) => {
          acc[g.category] = (acc[g.category] || 0) + 1;
          return acc;
        }, {}),
        evidenceLevels: guidelines.reduce((acc: any, g) => {
          acc[g.evidenceLevel || 'Unknown'] = (acc[g.evidenceLevel || 'Unknown'] || 0) + 1;
          return acc;
        }, {}),
        decisionSupportByModule: decisionSupport.reduce((acc: any, ds) => {
          acc[ds.moduleType] = (acc[ds.moduleType] || 0) + 1;
          return acc;
        }, {}),
        biomarkersByType: biomarkers.reduce((acc: any, bg) => {
          acc[bg.biomarkerName] = (acc[bg.biomarkerName] || 0) + 1;
          return acc;
        }, {}),
        lastUpdated: new Date().toISOString()
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Failed to get NCCN analytics:", error);
      res.status(500).json({ message: "Failed to get analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
