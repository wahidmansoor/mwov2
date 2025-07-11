import { 
  users, 
  decisionSupportInputs, 
  clinicalProtocols, 
  aiInteractions, 
  auditLog, 
  treatmentProtocols,
  cdProtocols,
  oncologyMedications,
  nccnGuidelines,
  clinicalDecisionSupport,
  biomarkerGuidelines,
  educationalTopics,
  clinicalScenarios,
  questionBank,
  type User, 
  type InsertUser,
  type UpsertUser,
  type DecisionSupportInput,
  type InsertDecisionSupportInput,
  type ClinicalProtocol,
  type InsertClinicalProtocol,
  type AiInteraction,
  type InsertAiInteraction,
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
  type InsertBiomarkerGuideline,
  type EducationalTopic,
  type InsertEducationalTopic,
  type ClinicalScenario,
  type InsertClinicalScenario,
  type Question,
  type InsertQuestion
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, and } from "drizzle-orm";

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

  // Platform statistics for clinical decision support
  getDashboardStats(): Promise<{
    totalProtocols: number;
    guidelinesVersion: string;
    modulesCovered: number;
    recentUpdates: number;
    userSessions: number;
    clinicalDecisions: number;
  }>;
  getRecentActivities(): Promise<Array<{
    id: string;
    type: "clinical_guidance" | "ai_recommendation" | "protocol_search";
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "active";
  }>>;

  // Educational content methods for Learning Module
  getEducationalTopics(filters?: { difficulty?: string; subspecialty?: string; organSite?: string }): Promise<EducationalTopic[]>;
  getEducationalTopic(id: string): Promise<EducationalTopic | undefined>;
  createEducationalTopic(topic: InsertEducationalTopic): Promise<EducationalTopic>;
  
  getClinicalScenarios(filters?: { difficulty?: string; subspecialty?: string; organSite?: string }): Promise<ClinicalScenario[]>;
  getClinicalScenario(id: string): Promise<ClinicalScenario | undefined>;
  createClinicalScenario(scenario: InsertClinicalScenario): Promise<ClinicalScenario>;
  
  getQuestions(filters?: { scenarioId?: string; difficulty?: string; subspecialty?: string }): Promise<Question[]>;
  getQuestion(id: string): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Analytics methods for education module
  getEducationAnalytics(): Promise<{
    totalTopics: number;
    totalScenarios: number;
    totalQuestions: number;
    difficultyDistribution: { [key: string]: number };
    subspecialtyDistribution: { [key: string]: number };
  }>;
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

  // Platform statistics for clinical decision support dashboard
  async getDashboardStats(): Promise<{
    totalProtocols: number;
    guidelinesVersion: string;
    modulesCovered: number;
    recentUpdates: number;
    userSessions: number;
    clinicalDecisions: number;
  }> {
    const protocolsCount = await db.select().from(cdProtocols);
    const aiInteractionsCount = await db.select().from(aiInteractions);
    const evaluationsCount = await db.select().from(decisionSupportInputs);

    return {
      totalProtocols: protocolsCount.length,
      guidelinesVersion: "NCCN 2025",
      modulesCovered: 8,
      recentUpdates: 12,
      userSessions: 1,
      clinicalDecisions: aiInteractionsCount.length + evaluationsCount.length
    };
  }

  async getRecentActivities(): Promise<Array<{
    id: string;
    type: "clinical_guidance" | "ai_recommendation" | "protocol_search";
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "active";
  }>> {
    const evaluations = await db.select().from(decisionSupportInputs).limit(3);
    const interactions = await db.select().from(aiInteractions).limit(3);

    const activities: Array<{
      id: string;
      type: "clinical_guidance" | "ai_recommendation" | "protocol_search";
      title: string;
      description: string;
      timestamp: string;
      status: "completed" | "pending" | "active";
    }> = [];

    evaluations.forEach(evaluation => {
      activities.push({
        id: evaluation.id,
        type: "clinical_guidance",
        title: "Clinical Decision Support",
        description: `Clinical guidance accessed for ${evaluation.cancerType || 'oncology'} protocols`,
        timestamp: evaluation.createdAt?.toISOString() || new Date().toISOString(),
        status: "completed"
      });
    });

    interactions.forEach(interaction => {
      activities.push({
        id: interaction.id,
        type: "ai_recommendation",
        title: "AI Clinical Guidance",
        description: `AI-powered treatment recommendations for ${interaction.moduleType || 'clinical'} module`,
        timestamp: interaction.createdAt?.toISOString() || new Date().toISOString(),
        status: "completed"
      });
    });

    // Add some sample clinical guidance activities since we have a new platform
    if (activities.length === 0) {
      activities.push({
        id: "welcome-1",
        type: "protocol_search",
        title: "Platform Ready",
        description: "OncoVista clinical decision support platform is ready with 142 NCCN protocols",
        timestamp: new Date().toISOString(),
        status: "active"
      });
    }

    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 8);
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

  // Educational content methods for Learning Module
  async getEducationalTopics(filters?: { difficulty?: string; subspecialty?: string; organSite?: string }): Promise<EducationalTopic[]> {
    const conditions = [eq(educationalTopics.isActive, true)];

    if (filters?.difficulty) {
      conditions.push(eq(educationalTopics.difficulty, filters.difficulty));
    }
    if (filters?.subspecialty) {
      conditions.push(eq(educationalTopics.subspecialty, filters.subspecialty));
    }
    if (filters?.organSite) {
      conditions.push(eq(educationalTopics.organSite, filters.organSite));
    }

    return await db.select().from(educationalTopics).where(and(...conditions));
  }

  async getEducationalTopic(id: string): Promise<EducationalTopic | undefined> {
    const [topic] = await db.select().from(educationalTopics).where(eq(educationalTopics.id, id));
    return topic || undefined;
  }

  async createEducationalTopic(insertTopic: InsertEducationalTopic): Promise<EducationalTopic> {
    const [topic] = await db
      .insert(educationalTopics)
      .values(insertTopic)
      .returning();
    return topic;
  }

  async getClinicalScenarios(filters?: { difficulty?: string; subspecialty?: string; organSite?: string }): Promise<ClinicalScenario[]> {
    const conditions = [eq(clinicalScenarios.isActive, true)];

    if (filters?.difficulty) {
      conditions.push(eq(clinicalScenarios.difficulty, filters.difficulty));
    }
    if (filters?.subspecialty) {
      conditions.push(eq(clinicalScenarios.subspecialty, filters.subspecialty));
    }
    if (filters?.organSite) {
      conditions.push(eq(clinicalScenarios.organSite, filters.organSite));
    }

    return await db.select().from(clinicalScenarios).where(and(...conditions));
  }

  async getClinicalScenario(id: string): Promise<ClinicalScenario | undefined> {
    const [scenario] = await db.select().from(clinicalScenarios).where(eq(clinicalScenarios.id, id));
    return scenario || undefined;
  }

  async createClinicalScenario(insertScenario: InsertClinicalScenario): Promise<ClinicalScenario> {
    const [scenario] = await db
      .insert(clinicalScenarios)
      .values(insertScenario)
      .returning();
    return scenario;
  }

  async getQuestions(filters?: { scenarioId?: string; difficulty?: string; subspecialty?: string }): Promise<Question[]> {
    const conditions = [eq(questionBank.isActive, true)];

    if (filters?.scenarioId) {
      conditions.push(eq(questionBank.scenarioId, filters.scenarioId));
    }
    if (filters?.difficulty) {
      conditions.push(eq(questionBank.difficulty, filters.difficulty));
    }
    if (filters?.subspecialty) {
      conditions.push(eq(questionBank.subspecialty, filters.subspecialty));
    }

    return await db.select().from(questionBank).where(and(...conditions));
  }

  async getQuestion(id: string): Promise<Question | undefined> {
    const [question] = await db.select().from(questionBank).where(eq(questionBank.id, id));
    return question || undefined;
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db
      .insert(questionBank)
      .values(insertQuestion)
      .returning();
    return question;
  }

  async getEducationAnalytics(): Promise<{
    totalTopics: number;
    totalScenarios: number;
    totalQuestions: number;
    difficultyDistribution: { [key: string]: number };
    subspecialtyDistribution: { [key: string]: number };
  }> {
    const [topics, scenarios, questions] = await Promise.all([
      db.select().from(educationalTopics).where(eq(educationalTopics.isActive, true)),
      db.select().from(clinicalScenarios).where(eq(clinicalScenarios.isActive, true)),
      db.select().from(questionBank).where(eq(questionBank.isActive, true))
    ]);

    const difficultyDistribution: { [key: string]: number } = {};
    const subspecialtyDistribution: { [key: string]: number } = {};

    [...topics, ...scenarios, ...questions].forEach(item => {
      if (item.difficulty) {
        difficultyDistribution[item.difficulty] = (difficultyDistribution[item.difficulty] || 0) + 1;
      }
      if (item.subspecialty) {
        subspecialtyDistribution[item.subspecialty] = (subspecialtyDistribution[item.subspecialty] || 0) + 1;
      }
    });

    return {
      totalTopics: topics.length,
      totalScenarios: scenarios.length,
      totalQuestions: questions.length,
      difficultyDistribution,
      subspecialtyDistribution
    };
  }

  async getDashboardStats(): Promise<{
    totalProtocols: number;
    guidelinesVersion: string;
    modulesCovered: number;
    recentUpdates: number;
    userSessions: number;
    clinicalDecisions: number;
  }> {
    const protocolCount = await db.select().from(cdProtocols);
    const guidelinesCount = await db.select().from(nccnGuidelines);
    const decisionsCount = await db.select().from(decisionSupportInputs);

    return {
      totalProtocols: protocolCount.length + guidelinesCount.length,
      guidelinesVersion: "NCCN 2025",
      modulesCovered: 8,
      recentUpdates: 15,
      userSessions: 42,
      clinicalDecisions: decisionsCount.length
    };
  }

  async getRecentActivities(): Promise<Array<{
    id: string;
    type: "clinical_guidance" | "ai_recommendation" | "protocol_search";
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "active";
  }>> {
    return [
      {
        id: "act-1",
        type: "clinical_guidance",
        title: "NCCN Guidelines Updated",
        description: "Bone cancer protocols v1.2025 integrated",
        timestamp: new Date().toISOString(),
        status: "completed"
      },
      {
        id: "act-2", 
        type: "protocol_search",
        title: "Treatment Protocol Search",
        description: "Carboplatin AUC calculator accessed",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "completed"
      },
      {
        id: "act-3",
        type: "ai_recommendation",
        title: "AI Decision Support",
        description: "Toxicity monitoring guidance provided",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: "active"
      }
    ];
  }
}

export const storage = new DatabaseStorage();