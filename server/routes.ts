import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authMiddleware } from "./middleware/auth";
import { rbacMiddleware } from "./middleware/rbac";
import { aiService } from "./services/aiService";
import { clinicalDecisionEngine } from "./services/clinicalDecisionEngine";
import { insertDecisionSupportInputSchema, insertAiInteractionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      // Mock authentication for demo
      const { email, password } = req.body;
      
      if (email && password) {
        const user = await storage.getUserByEmail(email);
        if (user) {
          // In production, verify password hash
          req.session.userId = user.id;
          res.json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            department: user.department
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(400).json({ message: "Email and password required" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", authMiddleware, async (req, res) => {
    try {
      const user = await storage.getUser(req.userId!);
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
  app.post("/api/patient-evaluations", authMiddleware, rbacMiddleware(["create_evaluations"]), async (req, res) => {
    try {
      const validatedData = insertDecisionSupportInputSchema.parse({
        ...req.body,
        createdBy: req.userId
      });
      
      const evaluation = await storage.createDecisionSupportInput(validatedData);
      
      // Log the activity
      await storage.createAuditLog({
        userId: req.userId!,
        userRole: req.user?.role || "unknown",
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

  app.get("/api/patient-evaluations", authMiddleware, rbacMiddleware(["view_patient_data"]), async (req, res) => {
    try {
      const evaluations = await storage.getDecisionSupportInputs();
      res.json(evaluations);
    } catch (error) {
      console.error("Get evaluations error:", error);
      res.status(500).json({ message: "Failed to get evaluations" });
    }
  });

  app.get("/api/patient-evaluations/:id", authMiddleware, rbacMiddleware(["view_patient_data"]), async (req, res) => {
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

  // AI analysis routes
  app.post("/api/ai/analyze-patient", authMiddleware, rbacMiddleware(["use_ai_recommendations"]), async (req, res) => {
    try {
      const startTime = Date.now();
      
      // Analyze with AI service
      const analysis = await aiService.analyzeClinicalCase(req.body);
      
      const responseTime = Date.now() - startTime;
      
      // Log AI interaction
      const aiInteraction = {
        userId: req.userId!,
        sessionId: req.sessionID,
        moduleType: "opd",
        intent: "patient_analysis",
        inputContext: req.body,
        aiResponse: analysis,
        confidenceScore: analysis.overallRiskScore / 100,
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
  app.get("/api/clinical-protocols", authMiddleware, rbacMiddleware(["view_protocols"]), async (req, res) => {
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
  app.get("/api/dashboard/stats", authMiddleware, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({ message: "Failed to get dashboard stats" });
    }
  });

  app.get("/api/dashboard/activities", authMiddleware, async (req, res) => {
    try {
      const activities = await storage.getRecentActivities();
      res.json(activities);
    } catch (error) {
      console.error("Get activities error:", error);
      res.status(500).json({ message: "Failed to get activities" });
    }
  });

  // Treatment protocols routes
  app.get("/api/treatment-protocols", authMiddleware, rbacMiddleware(["view_protocols"]), async (req, res) => {
    try {
      const protocols = await storage.getTreatmentProtocols();
      res.json(protocols);
    } catch (error) {
      console.error("Get treatment protocols error:", error);
      res.status(500).json({ message: "Failed to get treatment protocols" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
