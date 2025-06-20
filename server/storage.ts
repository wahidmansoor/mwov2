import { 
  users, 
  patientEvaluations, 
  clinicalProtocols, 
  aiInteractions, 
  auditLog, 
  treatmentProtocols,
  type User, 
  type InsertUser,
  type PatientEvaluation,
  type InsertPatientEvaluation,
  type ClinicalProtocol,
  type InsertClinicalProtocol,
  type AiInteraction,
  type InsertAiInteraction,
  type TreatmentProtocol,
  type AuditLogEntry
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Enhanced storage interface for OncoVista AI
export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Patient evaluations
  createPatientEvaluation(evaluation: InsertPatientEvaluation): Promise<PatientEvaluation>;
  getPatientEvaluations(filters?: { createdBy?: string; limit?: number }): Promise<PatientEvaluation[]>;
  getPatientEvaluation(id: string): Promise<PatientEvaluation | undefined>;
  updatePatientEvaluation(id: string, updates: Partial<PatientEvaluation>): Promise<PatientEvaluation | undefined>;
  deletePatientEvaluation(id: string): Promise<boolean>;
  
  // Clinical protocols
  getClinicalProtocols(filters?: { cancerType?: string; stage?: string }): Promise<ClinicalProtocol[]>;
  getClinicalProtocol(id: string): Promise<ClinicalProtocol | undefined>;
  createClinicalProtocol(protocol: InsertClinicalProtocol): Promise<ClinicalProtocol>;
  
  // AI interactions
  createAiInteraction(interaction: InsertAiInteraction): Promise<AiInteraction>;
  getAiInteractions(filters?: { userId?: string; moduleType?: string }): Promise<AiInteraction[]>;
  
  // Audit logging
  createAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry>;
  getAuditLogs(filters?: { userId?: string; action?: string }): Promise<AuditLogEntry[]>;
  
  // Treatment protocols
  getTreatmentProtocols(filters?: { tumourGroup?: string }): Promise<TreatmentProtocol[]>;
  getTreatmentProtocol(id: string): Promise<TreatmentProtocol | undefined>;
  
  // Dashboard data
  getDashboardStats(): Promise<{
    activePatients: number;
    aiRecommendations: number;
    criticalAlerts: number;
    protocolsUpdated: number;
  }>;
  getRecentActivities(): Promise<Array<{
    id: string;
    type: "evaluation" | "ai_recommendation" | "alert";
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "alert";
  }>>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Patient evaluations
  async createPatientEvaluation(insertEvaluation: InsertPatientEvaluation): Promise<PatientEvaluation> {
    const [evaluation] = await db
      .insert(patientEvaluations)
      .values(insertEvaluation)
      .returning();
    return evaluation;
  }

  async getPatientEvaluations(filters?: { createdBy?: string; limit?: number }): Promise<PatientEvaluation[]> {
    let query = db.select().from(patientEvaluations);
    
    if (filters?.createdBy) {
      query = query.where(eq(patientEvaluations.createdBy, filters.createdBy));
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    return await query;
  }

  async getPatientEvaluation(id: string): Promise<PatientEvaluation | undefined> {
    const [evaluation] = await db.select().from(patientEvaluations).where(eq(patientEvaluations.id, id));
    return evaluation || undefined;
  }

  async updatePatientEvaluation(id: string, updates: Partial<PatientEvaluation>): Promise<PatientEvaluation | undefined> {
    const [evaluation] = await db
      .update(patientEvaluations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(patientEvaluations.id, id))
      .returning();
    return evaluation || undefined;
  }

  async deletePatientEvaluation(id: string): Promise<boolean> {
    const result = await db.delete(patientEvaluations).where(eq(patientEvaluations.id, id));
    return result.rowCount > 0;
  }

  // Clinical protocols
  async getClinicalProtocols(filters?: { cancerType?: string; stage?: string }): Promise<ClinicalProtocol[]> {
    let query = db.select().from(clinicalProtocols);
    
    if (filters?.cancerType) {
      query = query.where(eq(clinicalProtocols.cancerType, filters.cancerType));
    }
    
    return await query;
  }

  async getClinicalProtocol(id: string): Promise<ClinicalProtocol | undefined> {
    const [protocol] = await db.select().from(clinicalProtocols).where(eq(clinicalProtocols.id, id));
    return protocol || undefined;
  }

  async createClinicalProtocol(insertProtocol: InsertClinicalProtocol): Promise<ClinicalProtocol> {
    const [protocol] = await db
      .insert(clinicalProtocols)
      .values(insertProtocol)
      .returning();
    return protocol;
  }

  // AI interactions
  async createAiInteraction(insertInteraction: InsertAiInteraction): Promise<AiInteraction> {
    const [interaction] = await db
      .insert(aiInteractions)
      .values(insertInteraction)
      .returning();
    return interaction;
  }

  async getAiInteractions(filters?: { userId?: string; moduleType?: string }): Promise<AiInteraction[]> {
    let query = db.select().from(aiInteractions);
    
    if (filters?.userId) {
      query = query.where(eq(aiInteractions.userId, filters.userId));
    }
    
    return await query;
  }

  // Audit logging
  async createAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const [auditEntry] = await db
      .insert(auditLog)
      .values({ ...entry, timestamp: new Date() })
      .returning();
    return auditEntry;
  }

  async getAuditLogs(filters?: { userId?: string; action?: string }): Promise<AuditLogEntry[]> {
    let query = db.select().from(auditLog);
    
    if (filters?.userId) {
      query = query.where(eq(auditLog.userId, filters.userId));
    }
    
    return await query;
  }

  // Treatment protocols
  async getTreatmentProtocols(filters?: { tumourGroup?: string }): Promise<TreatmentProtocol[]> {
    let query = db.select().from(treatmentProtocols);
    
    if (filters?.tumourGroup) {
      query = query.where(eq(treatmentProtocols.tumourGroup, filters.tumourGroup));
    }
    
    return await query;
  }

  async getTreatmentProtocol(id: string): Promise<TreatmentProtocol | undefined> {
    const [protocol] = await db.select().from(treatmentProtocols).where(eq(treatmentProtocols.id, id));
    return protocol || undefined;
  }

  // Dashboard data
  async getDashboardStats(): Promise<{
    activePatients: number;
    aiRecommendations: number;
    criticalAlerts: number;
    protocolsUpdated: number;
  }> {
    const evaluationsCount = await db.select().from(patientEvaluations);
    const aiInteractionsCount = await db.select().from(aiInteractions);
    
    return {
      activePatients: evaluationsCount.length,
      aiRecommendations: aiInteractionsCount.length,
      criticalAlerts: 0, // Placeholder - would need additional logic
      protocolsUpdated: 1 // Placeholder - would need additional logic
    };
  }

  async getRecentActivities(): Promise<Array<{
    id: string;
    type: "evaluation" | "ai_recommendation" | "alert";
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "alert";
  }>> {
    const evaluations = await db.select().from(patientEvaluations).limit(5);
    const interactions = await db.select().from(aiInteractions).limit(5);
    
    const activities: Array<{
      id: string;
      type: "evaluation" | "ai_recommendation" | "alert";
      title: string;
      description: string;
      timestamp: string;
      status: "completed" | "pending" | "alert";
    }> = [];
    
    evaluations.forEach(evaluation => {
      activities.push({
        id: evaluation.id,
        type: "evaluation",
        title: "Patient Evaluation",
        description: `Clinical assessment completed${evaluation.patientId ? ` for patient ${evaluation.patientId}` : ''}`,
        timestamp: evaluation.createdAt?.toISOString() || new Date().toISOString(),
        status: "completed"
      });
    });
    
    interactions.forEach(interaction => {
      activities.push({
        id: interaction.id,
        type: "ai_recommendation",
        title: "AI Analysis",
        description: `AI recommendation generated for ${interaction.moduleType || 'clinical'} module`,
        timestamp: interaction.createdAt?.toISOString() || new Date().toISOString(),
        status: "completed"
      });
    });
    
    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);
  }
}

export const storage = new DatabaseStorage();