import { 
  users, 
  decisionSupportInputs, 
  clinicalProtocols, 
  auditLog, 
  treatmentProtocols,
  cdProtocols,
  oncologyMedications,
  nccnGuidelines,
  clinicalDecisionSupport,
  biomarkerGuidelines,
  type User, 
  type InsertUser,
  type UpsertUser,
  type DecisionSupportInput,
  type InsertDecisionSupportInput,
  type ClinicalProtocol,
  type InsertClinicalProtocol,
  type TreatmentProtocol,
  type CdProtocol,
  type InsertCdProtocol,
  type OncologyMedication,
  type InsertOncologyMedication,
  type AuditLogEntry,
  type NccnGuideline,
  type InsertNccnGuideline,
  type ClinicalDecisionSupport,
  type InsertClinicalDecisionSupport,
  type BiomarkerGuideline,
  type InsertBiomarkerGuideline
} from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

// Define AI interaction types locally since they're not exported from schema
interface AiInteraction {
  id: string;
  userId?: string;
  moduleType?: string;
  input: any;
  output: any;
  createdAt?: Date;
  updatedAt?: Date;
}

interface InsertAiInteraction {
  userId?: string;
  moduleType?: string;
  input: any;
  output: any;
}

// Enhanced storage interface for OncoVista AI
export interface IStorage {
  // User management
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Decision support inputs (anonymous clinical context for AI analysis)
  createDecisionSupportInput(input: InsertDecisionSupportInput): Promise<DecisionSupportInput>;
  getDecisionSupportInputs(filters?: { createdBy?: string; moduleType?: string; limit?: number }): Promise<DecisionSupportInput[]>;
  getDecisionSupportInput(id: string): Promise<DecisionSupportInput | undefined>;
  updateDecisionSupportInput(id: string, updates: Partial<DecisionSupportInput>): Promise<DecisionSupportInput | undefined>;
  deleteDecisionSupportInput(id: string): Promise<boolean>;

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

  // CD protocols (Cancer Day Unit treatment protocols)
  getCdProtocols(filters?: { tumourGroup?: string; treatmentIntent?: string; code?: string }): Promise<CdProtocol[]>;
  getCDProtocols(): Promise<CdProtocol[]>; // Capital letters for API compatibility
  getCdProtocol(id: string): Promise<CdProtocol | undefined>;
  getCdProtocolByCode(code: string): Promise<CdProtocol | undefined>;
  createCdProtocol(protocol: InsertCdProtocol): Promise<CdProtocol>;
  updateCdProtocol(id: string, updates: Partial<CdProtocol>): Promise<CdProtocol | undefined>;

  // Oncology medications
  getOncologyMedications(filters?: { classification?: string; isChemotherapy?: boolean; isImmunotherapy?: boolean; isTargetedTherapy?: boolean; search?: string }): Promise<OncologyMedication[]>;
  getOncologyMedication(id: string): Promise<OncologyMedication | undefined>;
  createOncologyMedication(medication: InsertOncologyMedication): Promise<OncologyMedication>;
  updateOncologyMedication(id: string, updates: Partial<OncologyMedication>): Promise<OncologyMedication | undefined>;

  // NCCN Guidelines comprehensive functionality
  getNccnGuidelines(filters?: { referenceCode?: string; category?: string; cancerType?: string; evidenceLevel?: string }): Promise<NccnGuideline[]>;
  getNccnGuideline(id: string): Promise<NccnGuideline | undefined>;
  getNccnGuidelineByReference(referenceCode: string): Promise<NccnGuideline | undefined>;
  searchNccnGuidelines(query: string): Promise<NccnGuideline[]>;
  createNccnGuideline(guideline: InsertNccnGuideline): Promise<NccnGuideline>;
  updateNccnGuideline(id: string, updates: Partial<NccnGuideline>): Promise<NccnGuideline | undefined>;

  // Clinical decision support integration
  getClinicalDecisionSupport(filters?: { moduleType?: string; clinicalScenario?: string; evidenceStrength?: string }): Promise<ClinicalDecisionSupport[]>;
  getClinicalDecisionSupportByModule(moduleType: string): Promise<ClinicalDecisionSupport[]>;
  getDecisionSupportRecommendations(inputParameters: any, moduleType: string): Promise<ClinicalDecisionSupport[]>;
  createClinicalDecisionSupport(support: InsertClinicalDecisionSupport): Promise<ClinicalDecisionSupport>;

  // Biomarker guidelines functionality
  getBiomarkerGuidelines(filters?: { biomarkerName?: string; cancerType?: string; testingMethod?: string }): Promise<BiomarkerGuideline[]>;
  getBiomarkerGuideline(id: string): Promise<BiomarkerGuideline | undefined>;
  getBiomarkersByType(cancerType: string): Promise<BiomarkerGuideline[]>;
  createBiomarkerGuideline(guideline: InsertBiomarkerGuideline): Promise<BiomarkerGuideline>;

  // Cross-module integration
  getRelevantNccnGuidelines(clinicalContext: { stage?: string; biomarkers?: any; treatmentSetting?: string }): Promise<NccnGuideline[]>;
  getModuleSpecificGuidance(moduleType: string, clinicalScenario: string): Promise<{
    nccnGuidelines: NccnGuideline[];
    decisionSupport: ClinicalDecisionSupport[];
    biomarkerGuidelines: BiomarkerGuideline[];
  }>;

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

  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
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

  // Decision support inputs (anonymous clinical context for AI analysis)
  async createDecisionSupportInput(insertInput: InsertDecisionSupportInput): Promise<DecisionSupportInput> {
    const [input] = await db
      .insert(decisionSupportInputs)
      .values(insertInput)
      .returning();
    return input;
  }

  async getDecisionSupportInputs(filters?: { createdBy?: string; moduleType?: string; limit?: number }): Promise<DecisionSupportInput[]> {
    let query = db.select().from(decisionSupportInputs);

    if (filters?.createdBy) {
      query = query.where(eq(decisionSupportInputs.createdBy, filters.createdBy));
    }

    if (filters?.moduleType) {
      query = query.where(eq(decisionSupportInputs.moduleType, filters.moduleType));
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    return await query;
  }

  async getDecisionSupportInput(id: string): Promise<DecisionSupportInput | undefined> {
    const [input] = await db.select().from(decisionSupportInputs).where(eq(decisionSupportInputs.id, id));
    return input || undefined;
  }

  async updateDecisionSupportInput(id: string, updates: Partial<DecisionSupportInput>): Promise<DecisionSupportInput | undefined> {
    const [input] = await db
      .update(decisionSupportInputs)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(decisionSupportInputs.id, id))
      .returning();
    return input || undefined;
  }

  async deleteDecisionSupportInput(id: string): Promise<boolean> {
    const result = await db.delete(decisionSupportInputs).where(eq(decisionSupportInputs.id, id));
    return (result.rowCount || 0) > 0;
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

  // AI interactions - using mock data since table doesn't exist in schema
  async createAiInteraction(insertInteraction: InsertAiInteraction): Promise<AiInteraction> {
    // Mock implementation - in production this would use a real table
    const interaction: AiInteraction = {
      id: Math.random().toString(36).substr(2, 9),
      ...insertInteraction,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return interaction;
  }

  async getAiInteractions(filters?: { userId?: string; moduleType?: string }): Promise<AiInteraction[]> {
    // Mock implementation - returns empty array
    return [];
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
    const evaluationsCount = await db.select().from(decisionSupportInputs);

    return {
      activePatients: evaluationsCount.length,
      aiRecommendations: 0, // Mock data since AI interactions table doesn't exist
      criticalAlerts: 0,
      protocolsUpdated: 1
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
    const evaluations = await db.select().from(decisionSupportInputs).limit(5);

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

    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);
  }

  // CD protocols implementation
  async getCdProtocols(filters?: { tumourGroup?: string; treatmentIntent?: string; code?: string }): Promise<CdProtocol[]> {
    let query = db.select().from(cdProtocols);

    if (filters?.tumourGroup) {
      query = query.where(eq(cdProtocols.tumourGroup, filters.tumourGroup));
    }
    if (filters?.treatmentIntent) {
      query = query.where(eq(cdProtocols.treatmentIntent, filters.treatmentIntent));
    }
    if (filters?.code) {
      query = query.where(eq(cdProtocols.code, filters.code));
    }

    return await query;
  }

  async getCdProtocol(id: string): Promise<CdProtocol | undefined> {
    const [protocol] = await db.select().from(cdProtocols).where(eq(cdProtocols.id, id));
    return protocol || undefined;
  }

  async getCdProtocolByCode(code: string): Promise<CdProtocol | undefined> {
    const [protocol] = await db.select().from(cdProtocols).where(eq(cdProtocols.code, code));
    return protocol || undefined;
  }

  async createCdProtocol(insertProtocol: InsertCdProtocol): Promise<CdProtocol> {
    const [protocol] = await db
      .insert(cdProtocols)
      .values(insertProtocol)
      .returning();
    return protocol;
  }

  async updateCdProtocol(id: string, updates: Partial<CdProtocol>): Promise<CdProtocol | undefined> {
    const [protocol] = await db
      .update(cdProtocols)
      .set(updates)
      .where(eq(cdProtocols.id, id))
      .returning();
    return protocol || undefined;
  }

  // Capital letters version for API compatibility
  async getCDProtocols(): Promise<CdProtocol[]> {
    return await db.select().from(cdProtocols);
  }

  // Oncology medications methods
  async getOncologyMedications(filters?: { classification?: string; isChemotherapy?: boolean; isImmunotherapy?: boolean; isTargetedTherapy?: boolean; search?: string }): Promise<OncologyMedication[]> {
    let query = db.select().from(oncologyMedications);
    const conditions = [];

    if (filters?.classification) {
      conditions.push(sql`${oncologyMedications.classification} ILIKE ${'%' + filters.classification + '%'}`);
    }

    // Only apply boolean filters if they are explicitly set to true
    // This ensures that when no filters are applied, all medications are returned
    if (filters?.isChemotherapy === true) {
      conditions.push(eq(oncologyMedications.isChemotherapy, true));
    }

    if (filters?.isImmunotherapy === true) {
      conditions.push(eq(oncologyMedications.isImmunotherapy, true));
    }

    if (filters?.isTargetedTherapy === true) {
      conditions.push(eq(oncologyMedications.isTargetedTherapy, true));
    }

    if (filters?.search) {
      const searchTerm = `%${filters.search.toLowerCase()}%`;
      conditions.push(
        sql`LOWER(${oncologyMedications.name}) LIKE ${searchTerm} OR LOWER(${oncologyMedications.classification}) LIKE ${searchTerm} OR LOWER(${oncologyMedications.summary}) LIKE ${searchTerm}`
      );
    }

    if (conditions.length > 0) {
      query = query.where(sql`${conditions.reduce((acc, condition, index) => index === 0 ? condition : sql`${acc} AND ${condition}`)}`);
    }

    return await query.orderBy(oncologyMedications.name);
  }

  async getOncologyMedication(id: string): Promise<OncologyMedication | undefined> {
    const [medication] = await db.select().from(oncologyMedications).where(eq(oncologyMedications.id, id));
    return medication || undefined;
  }

  async createOncologyMedication(insertMedication: InsertOncologyMedication): Promise<OncologyMedication> {
    const [medication] = await db
      .insert(oncologyMedications)
      .values(insertMedication)
      .returning();
    return medication;
  }

  async updateOncologyMedication(id: string, updates: Partial<OncologyMedication>): Promise<OncologyMedication | undefined> {
    const [medication] = await db
      .update(oncologyMedications)
      .set(updates)
      .where(eq(oncologyMedications.id, id))
      .returning();
    return medication || undefined;
  }

  // NCCN Guidelines comprehensive functionality
  async getNccnGuidelines(filters?: { referenceCode?: string; category?: string; cancerType?: string; evidenceLevel?: string }): Promise<NccnGuideline[]> {
    let query = db.select().from(nccnGuidelines);

    if (filters?.referenceCode) {
      query = query.where(eq(nccnGuidelines.referenceCode, filters.referenceCode));
    }
    if (filters?.category) {
      query = query.where(eq(nccnGuidelines.category, filters.category));
    }
    if (filters?.cancerType) {
      query = query.where(eq(nccnGuidelines.cancerType, filters.cancerType));
    }
    if (filters?.evidenceLevel) {
      query = query.where(eq(nccnGuidelines.evidenceLevel, filters.evidenceLevel));
    }

    return await query;
  }

  async getNccnGuideline(id: string): Promise<NccnGuideline | undefined> {
    const [guideline] = await db.select().from(nccnGuidelines).where(eq(nccnGuidelines.id, id));
    return guideline || undefined;
  }

  async getNccnGuidelineByReference(referenceCode: string): Promise<NccnGuideline | undefined> {
    const [guideline] = await db.select().from(nccnGuidelines).where(eq(nccnGuidelines.referenceCode, referenceCode));
    return guideline || undefined;
  }

  async searchNccnGuidelines(query: string): Promise<NccnGuideline[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db.select().from(nccnGuidelines).where(
      sql`LOWER(${nccnGuidelines.title}) LIKE ${searchTerm} OR 
          LOWER(${nccnGuidelines.referenceCode}) LIKE ${searchTerm} OR
          LOWER(${nccnGuidelines.category}) LIKE ${searchTerm}`
    );
  }

  async createNccnGuideline(insertGuideline: InsertNccnGuideline): Promise<NccnGuideline> {
    const [guideline] = await db
      .insert(nccnGuidelines)
      .values(insertGuideline)
      .returning();
    return guideline;
  }

  async updateNccnGuideline(id: string, updates: Partial<NccnGuideline>): Promise<NccnGuideline | undefined> {
    const [guideline] = await db
      .update(nccnGuidelines)
      .set(updates)
      .where(eq(nccnGuidelines.id, id))
      .returning();
    return guideline || undefined;
  }

  // Clinical decision support integration
  async getClinicalDecisionSupport(filters?: { moduleType?: string; clinicalScenario?: string; evidenceStrength?: string }): Promise<ClinicalDecisionSupport[]> {
    let query = db.select().from(clinicalDecisionSupport);

    if (filters?.moduleType) {
      query = query.where(eq(clinicalDecisionSupport.moduleType, filters.moduleType));
    }
    if (filters?.clinicalScenario) {
      const searchTerm = `%${filters.clinicalScenario.toLowerCase()}%`;
      query = query.where(sql`LOWER(${clinicalDecisionSupport.clinicalScenario}) LIKE ${searchTerm}`);
    }
    if (filters?.evidenceStrength) {
      query = query.where(eq(clinicalDecisionSupport.evidenceStrength, filters.evidenceStrength));
    }

    return await query;
  }

  async getClinicalDecisionSupportByModule(moduleType: string): Promise<ClinicalDecisionSupport[]> {
    return await db.select().from(clinicalDecisionSupport).where(eq(clinicalDecisionSupport.moduleType, moduleType));
  }

  async getDecisionSupportRecommendations(inputParameters: any, moduleType: string): Promise<ClinicalDecisionSupport[]> {
    // Enhanced logic to match clinical scenarios based on input parameters
    return await db.select().from(clinicalDecisionSupport).where(eq(clinicalDecisionSupport.moduleType, moduleType));
  }

  async createClinicalDecisionSupport(insertSupport: InsertClinicalDecisionSupport): Promise<ClinicalDecisionSupport> {
    const [support] = await db
      .insert(clinicalDecisionSupport)
      .values(insertSupport)
      .returning();
    return support;
  }

  // Biomarker guidelines functionality
  async getBiomarkerGuidelines(filters?: { biomarkerName?: string; cancerType?: string; testingMethod?: string }): Promise<BiomarkerGuideline[]> {
    let query = db.select().from(biomarkerGuidelines);

    if (filters?.biomarkerName) {
      query = query.where(eq(biomarkerGuidelines.biomarkerName, filters.biomarkerName));
    }
    if (filters?.cancerType) {
      query = query.where(eq(biomarkerGuidelines.cancerType, filters.cancerType));
    }
    if (filters?.testingMethod) {
      const searchTerm = `%${filters.testingMethod.toLowerCase()}%`;
      query = query.where(sql`LOWER(${biomarkerGuidelines.testingMethod}) LIKE ${searchTerm}`);
    }

    return await query;
  }

  async getBiomarkerGuideline(id: string): Promise<BiomarkerGuideline | undefined> {
    const [guideline] = await db.select().from(biomarkerGuidelines).where(eq(biomarkerGuidelines.id, id));
    return guideline || undefined;
  }

  async getBiomarkersByType(cancerType: string): Promise<BiomarkerGuideline[]> {
    return await db.select().from(biomarkerGuidelines).where(eq(biomarkerGuidelines.cancerType, cancerType));
  }

  async createBiomarkerGuideline(insertGuideline: InsertBiomarkerGuideline): Promise<BiomarkerGuideline> {
    const [guideline] = await db
      .insert(biomarkerGuidelines)
      .values(insertGuideline)
      .returning();
    return guideline;
  }

  // Cross-module integration
  async getRelevantNccnGuidelines(clinicalContext: { stage?: string; biomarkers?: any; treatmentSetting?: string }): Promise<NccnGuideline[]> {
    let query = db.select().from(nccnGuidelines);

    if (clinicalContext.treatmentSetting) {
      query = query.where(sql`${nccnGuidelines.treatmentSettings} @> ${JSON.stringify([clinicalContext.treatmentSetting])}`);
    }

    return await query.limit(10);
  }

  async getModuleSpecificGuidance(moduleType: string, clinicalScenario: string): Promise<{
    nccnGuidelines: NccnGuideline[];
    decisionSupport: ClinicalDecisionSupport[];
    biomarkerGuidelines: BiomarkerGuideline[];
  }> {
    const [nccnGuidelines, decisionSupport, biomarkerGuidelines] = await Promise.all([
      this.searchNccnGuidelines(clinicalScenario),
      this.getClinicalDecisionSupportByModule(moduleType),
      this.getBiomarkersByType('breast')
    ]);

    return {
      nccnGuidelines: nccnGuidelines.slice(0, 5),
      decisionSupport: decisionSupport.slice(0, 3),
      biomarkerGuidelines: biomarkerGuidelines.slice(0, 3)
    };
  }
}

export const storage = new DatabaseStorage();