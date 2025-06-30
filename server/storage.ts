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
  treatmentPlanCriteria,
  treatmentPlanMappings,
  symptomScores,
  symptomProtocols,
  painAssessments,
  opioidConversions,
  breakthroughPain,
  educationalTopics,
  clinicalScenarios,
  questionBank,
  learningSessions,
  learningProgress,
  educationalAiInteractions,
  examPreparation,
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
  type TreatmentPlanCriteria,
  type InsertTreatmentPlanCriteria,
  type TreatmentPlanMapping,
  type InsertTreatmentPlanMapping,
  type SymptomScore,
  type InsertSymptomScore,
  type SymptomProtocol,
  type InsertSymptomProtocol,
  type PainAssessment,
  type InsertPainAssessment,
  type OpioidConversion,
  type InsertOpioidConversion,
  type BreakthroughPain,
  type InsertBreakthroughPain,
  type EducationalTopic,
  type InsertEducationalTopic,
  type ClinicalScenario,
  type InsertClinicalScenario,
  type Question,
  type InsertQuestion,
  type LearningSession,
  type InsertLearningSession,
  type LearningProgress,
  type InsertLearningProgress,
  type EducationalAiInteraction,
  type InsertEducationalAiInteraction,
  type ExamPreparation,
  type InsertExamPreparation
} from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

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
  
  // Treatment Plan Criteria (NEW)
  getTreatmentCriteria(filters?: { category?: string; isCommon?: boolean }): Promise<TreatmentPlanCriteria[]>;
  getTreatmentCriteriaByCategory(category: string): Promise<TreatmentPlanCriteria[]>;
  createTreatmentCriteria(criteria: InsertTreatmentPlanCriteria): Promise<TreatmentPlanCriteria>;
  
  // Treatment Plan Mappings (NEW)
  getTreatmentPlanMappings(filters?: { cancerType?: string; histology?: string; treatmentIntent?: string }): Promise<TreatmentPlanMapping[]>;
  getTreatmentPlanMapping(id: number): Promise<TreatmentPlanMapping | undefined>;
  generateTreatmentRecommendation(criteria: {
    cancerType: string;
    histology?: string;
    biomarkers: string[];
    treatmentIntent?: string;
    lineOfTreatment?: string;
    stage?: string;
  }): Promise<TreatmentPlanMapping[]>;
  createTreatmentPlanMapping(mapping: InsertTreatmentPlanMapping): Promise<TreatmentPlanMapping>;
  
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

  // Palliative care functionality
  getSymptomScores(filters?: { sessionId?: string; symptom?: string }): Promise<SymptomScore[]>;
  createSymptomScore(score: InsertSymptomScore): Promise<SymptomScore>;
  getSymptomProtocols(filters?: { symptom?: string; severityLevel?: string }): Promise<SymptomProtocol[]>;
  createSymptomProtocol(protocol: InsertSymptomProtocol): Promise<SymptomProtocol>;
  getPainAssessments(filters?: { sessionId?: string }): Promise<PainAssessment[]>;
  createPainAssessment(assessment: InsertPainAssessment): Promise<PainAssessment>;
  getOpioidConversions(filters?: { fromMed?: string; toMed?: string }): Promise<OpioidConversion[]>;
  createOpioidConversion(conversion: InsertOpioidConversion): Promise<OpioidConversion>;
  getBreakthroughPain(filters?: { sessionId?: string }): Promise<BreakthroughPain[]>;
  createBreakthroughPain(episode: InsertBreakthroughPain): Promise<BreakthroughPain>;
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

  // Dashboard data
  async getDashboardStats(): Promise<{
    activePatients: number;
    aiRecommendations: number;
    criticalAlerts: number;
    protocolsUpdated: number;
  }> {
    const evaluationsCount = await db.select().from(decisionSupportInputs);
    const aiInteractionsCount = await db.select().from(aiInteractions);
    
    return {
      activePatients: evaluationsCount.length,
      aiRecommendations: aiInteractionsCount.length,
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

  // OPD Module Enhanced Storage Methods
  async getCancerScreeningProtocols(filters?: { cancerType?: string; ageRange?: string }): Promise<CancerScreeningProtocol[]> {
    let query = db.select().from(cancerScreeningProtocols);
    
    if (filters?.cancerType) {
      query = query.where(eq(cancerScreeningProtocols.cancerType, filters.cancerType));
    }
    
    if (filters?.ageRange) {
      query = query.where(eq(cancerScreeningProtocols.ageRange, filters.ageRange));
    }
    
    return await query.orderBy(cancerScreeningProtocols.cancerType, cancerScreeningProtocols.ageRange);
  }

  async getDiagnosticWorkupSteps(filters?: { cancerType?: string; symptom?: string }): Promise<DiagnosticWorkupStep[]> {
    let query = db.select().from(diagnosticWorkupSteps);
    
    if (filters?.cancerType) {
      query = query.where(eq(diagnosticWorkupSteps.cancerType, filters.cancerType));
    }
    
    if (filters?.symptom) {
      query = query.where(like(diagnosticWorkupSteps.symptomOrFinding, `%${filters.symptom}%`));
    }
    
    return await query.orderBy(diagnosticWorkupSteps.cancerType, diagnosticWorkupSteps.urgencyLevel);
  }

  async getBiomarkers(filters?: { cancerType?: string; testingRequired?: boolean }): Promise<Biomarker[]> {
    let query = db.select().from(biomarkers);
    
    if (filters?.cancerType) {
      query = query.where(eq(biomarkers.cancerType, filters.cancerType));
    }
    
    if (filters?.testingRequired !== undefined) {
      query = query.where(eq(biomarkers.testingRequired, filters.testingRequired));
    }
    
    return await query.orderBy(biomarkers.cancerType, biomarkers.biomarkerName);
  }

  async getReferralGuidelines(filters?: { cancerType?: string; urgency?: string; specialist?: string }): Promise<ReferralGuideline[]> {
    let query = db.select().from(referralGuidelines);
    
    if (filters?.cancerType) {
      query = query.where(eq(referralGuidelines.cancerType, filters.cancerType));
    }
    
    if (filters?.urgency) {
      query = query.where(eq(referralGuidelines.urgency, filters.urgency));
    }
    
    if (filters?.specialist) {
      query = query.where(eq(referralGuidelines.toSpecialist, filters.specialist));
    }
    
    return await query.orderBy(referralGuidelines.urgency, referralGuidelines.cancerType);
  }

  async getRiskStratificationScores(filters?: { cancerType?: string; scoreName?: string }): Promise<RiskStratificationScore[]> {
    let query = db.select().from(riskStratificationScores);
    
    if (filters?.cancerType) {
      query = query.where(eq(riskStratificationScores.cancerType, filters.cancerType));
    }
    
    if (filters?.scoreName) {
      query = query.where(like(riskStratificationScores.scoreName, `%${filters.scoreName}%`));
    }
    
    return await query.orderBy(riskStratificationScores.cancerType, riskStratificationScores.scoreName);
  }

  async createCancerScreeningProtocol(insertProtocol: InsertCancerScreeningProtocol): Promise<CancerScreeningProtocol> {
    const [protocol] = await db
      .insert(cancerScreeningProtocols)
      .values(insertProtocol)
      .returning();
    return protocol;
  }

  async createDiagnosticWorkupStep(insertStep: InsertDiagnosticWorkupStep): Promise<DiagnosticWorkupStep> {
    const [step] = await db
      .insert(diagnosticWorkupSteps)
      .values(insertStep)
      .returning();
    return step;
  }

  async createBiomarker(insertBiomarker: InsertBiomarker): Promise<Biomarker> {
    const [biomarker] = await db
      .insert(biomarkers)
      .values(insertBiomarker)
      .returning();
    return biomarker;
  }

  async createReferralGuideline(insertGuideline: InsertReferralGuideline): Promise<ReferralGuideline> {
    const [guideline] = await db
      .insert(referralGuidelines)
      .values(insertGuideline)
      .returning();
    return guideline;
  }

  async createRiskStratificationScore(insertScore: InsertRiskStratificationScore): Promise<RiskStratificationScore> {
    const [score] = await db
      .insert(riskStratificationScores)
      .values(insertScore)
      .returning();
    return score;
  }

  // Treatment Plan Criteria Implementation
  async getTreatmentCriteria(filters?: { category?: string; isCommon?: boolean }): Promise<TreatmentPlanCriteria[]> {
    let query = db.select().from(treatmentPlanCriteria);
    
    if (filters?.category) {
      query = query.where(eq(treatmentPlanCriteria.category, filters.category));
    }
    
    if (filters?.isCommon !== undefined) {
      query = query.where(eq(treatmentPlanCriteria.isCommon, filters.isCommon));
    }
    
    return await query.orderBy(treatmentPlanCriteria.sortOrder, treatmentPlanCriteria.value);
  }

  async getTreatmentCriteriaByCategory(category: string): Promise<TreatmentPlanCriteria[]> {
    return await db.select()
      .from(treatmentPlanCriteria)
      .where(eq(treatmentPlanCriteria.category, category))
      .orderBy(treatmentPlanCriteria.sortOrder, treatmentPlanCriteria.value);
  }

  async createTreatmentCriteria(insertCriteria: InsertTreatmentPlanCriteria): Promise<TreatmentPlanCriteria> {
    const [criteria] = await db
      .insert(treatmentPlanCriteria)
      .values(insertCriteria)
      .returning();
    return criteria;
  }

  // Treatment Plan Mappings Implementation
  async getTreatmentPlanMappings(filters?: { cancerType?: string; histology?: string; treatmentIntent?: string }): Promise<TreatmentPlanMapping[]> {
    let query = db.select().from(treatmentPlanMappings);
    
    if (filters?.cancerType) {
      query = query.where(eq(treatmentPlanMappings.cancerType, filters.cancerType));
    }
    
    if (filters?.histology) {
      query = query.where(eq(treatmentPlanMappings.histology, filters.histology));
    }
    
    if (filters?.treatmentIntent) {
      query = query.where(eq(treatmentPlanMappings.treatmentIntent, filters.treatmentIntent));
    }
    
    return await query.orderBy(sql`${treatmentPlanMappings.confidenceScore} DESC`);
  }

  async getTreatmentPlanMapping(id: number): Promise<TreatmentPlanMapping | undefined> {
    const [mapping] = await db.select().from(treatmentPlanMappings).where(eq(treatmentPlanMappings.id, id));
    return mapping || undefined;
  }

  async generateTreatmentRecommendation(criteria: {
    cancerType: string;
    histology?: string;
    biomarkers: string[];
    treatmentIntent?: string;
    lineOfTreatment?: string;
    stage?: string;
  }): Promise<TreatmentPlanMapping[]> {
    let query = db.select().from(treatmentPlanMappings);
    
    // Cancer type matching (required)
    query = query.where(eq(treatmentPlanMappings.cancerType, criteria.cancerType));
    
    // Histology matching (optional)
    if (criteria.histology) {
      query = query.where(eq(treatmentPlanMappings.histology, criteria.histology));
    }
    
    // Treatment intent matching (optional)
    if (criteria.treatmentIntent) {
      query = query.where(eq(treatmentPlanMappings.treatmentIntent, criteria.treatmentIntent));
    }
    
    // Line of treatment matching (optional)
    if (criteria.lineOfTreatment) {
      query = query.where(eq(treatmentPlanMappings.lineOfTreatment, criteria.lineOfTreatment));
    }
    
    // Stage matching (optional) - check if stage is in required_stage array
    if (criteria.stage) {
      query = query.where(sql`${criteria.stage} = ANY(${treatmentPlanMappings.requiredStage})`);
    }
    
    // Get all potential matches
    const allMappings = await query.orderBy(sql`${treatmentPlanMappings.confidenceScore} DESC`);
    
    // Apply biomarker filtering in memory for complex array matching
    const filteredMappings = allMappings.filter(mapping => {
      // Skip if no biomarkers specified in criteria
      if (!criteria.biomarkers.length) return true;
      
      // Skip if mapping has no biomarker requirements
      if (!mapping.biomarkers || !mapping.biomarkers.length) return true;
      
      // Check if all required biomarkers are present
      const requiredBiomarkers = mapping.biomarkers;
      const hasBiomarkers = criteria.biomarkers;
      
      // All required biomarkers must be present in the patient's biomarker profile
      return requiredBiomarkers.every(required => hasBiomarkers.includes(required));
    });
    
    return filteredMappings.slice(0, 5); // Return top 5 matches
  }

  async createTreatmentPlanMapping(insertMapping: InsertTreatmentPlanMapping): Promise<TreatmentPlanMapping> {
    const [mapping] = await db
      .insert(treatmentPlanMappings)
      .values(insertMapping)
      .returning();
    return mapping;
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

  // Palliative care implementation methods
  async getSymptomScores(filters?: { sessionId?: string; symptom?: string }): Promise<SymptomScore[]> {
    let query = db.select().from(symptomScores);
    
    if (filters?.sessionId) {
      query = query.where(eq(symptomScores.sessionId, filters.sessionId));
    }
    
    if (filters?.symptom) {
      query = query.where(eq(symptomScores.symptom, filters.symptom));
    }
    
    return await query.orderBy(symptomScores.createdAt);
  }

  async createSymptomScore(score: InsertSymptomScore): Promise<SymptomScore> {
    const [result] = await db.insert(symptomScores).values(score).returning();
    return result;
  }

  async getSymptomProtocols(filters?: { symptom?: string; severityLevel?: string }): Promise<SymptomProtocol[]> {
    let query = db.select().from(symptomProtocols);
    
    if (filters?.symptom) {
      query = query.where(eq(symptomProtocols.symptom, filters.symptom));
    }
    
    if (filters?.severityLevel) {
      query = query.where(eq(symptomProtocols.severityLevel, filters.severityLevel));
    }
    
    return await query;
  }

  async createSymptomProtocol(protocol: InsertSymptomProtocol): Promise<SymptomProtocol> {
    const [result] = await db.insert(symptomProtocols).values(protocol).returning();
    return result;
  }

  async getPainAssessments(filters?: { sessionId?: string }): Promise<PainAssessment[]> {
    let query = db.select().from(painAssessments);
    
    if (filters?.sessionId) {
      query = query.where(eq(painAssessments.sessionId, filters.sessionId));
    }
    
    return await query.orderBy(painAssessments.createdAt);
  }

  async createPainAssessment(assessment: InsertPainAssessment): Promise<PainAssessment> {
    const [result] = await db.insert(painAssessments).values(assessment).returning();
    return result;
  }

  async getOpioidConversions(filters?: { fromMed?: string; toMed?: string }): Promise<OpioidConversion[]> {
    let query = db.select().from(opioidConversions);
    
    if (filters?.fromMed) {
      query = query.where(eq(opioidConversions.fromMed, filters.fromMed));
    }
    
    if (filters?.toMed) {
      query = query.where(eq(opioidConversions.toMed, filters.toMed));
    }
    
    return await query;
  }

  async createOpioidConversion(conversion: InsertOpioidConversion): Promise<OpioidConversion> {
    const [result] = await db.insert(opioidConversions).values(conversion).returning();
    return result;
  }

  async getBreakthroughPain(filters?: { sessionId?: string }): Promise<BreakthroughPain[]> {
    let query = db.select().from(breakthroughPain);
    
    if (filters?.sessionId) {
      query = query.where(eq(breakthroughPain.sessionId, filters.sessionId));
    }
    
    return await query.orderBy(breakthroughPain.createdAt);
  }

  async createBreakthroughPain(episode: InsertBreakthroughPain): Promise<BreakthroughPain> {
    const [result] = await db.insert(breakthroughPain).values(episode).returning();
    return result;
  }

  // Educational Content Management - Real NCCN/ASCO/ESMO Integration
  async getEducationalTopics(filters?: { 
    category?: string; 
    subspecialty?: string; 
    organSite?: string; 
    difficulty?: string;
    guidelineReference?: string;
  }): Promise<EducationalTopic[]> {
    let query = db.select().from(educationalTopics).where(eq(educationalTopics.isActive, true));
    
    if (filters?.category) {
      query = query.where(eq(educationalTopics.category, filters.category));
    }
    if (filters?.subspecialty) {
      query = query.where(eq(educationalTopics.subspecialty, filters.subspecialty));
    }
    if (filters?.organSite) {
      query = query.where(eq(educationalTopics.organSite, filters.organSite));
    }
    if (filters?.difficulty) {
      query = query.where(eq(educationalTopics.difficulty, filters.difficulty));
    }
    if (filters?.guidelineReference) {
      const searchTerm = `%${filters.guidelineReference}%`;
      query = query.where(sql`${educationalTopics.guidelineReference} LIKE ${searchTerm}`);
    }
    
    return await query.orderBy(educationalTopics.createdAt);
  }

  async createEducationalTopic(insertTopic: InsertEducationalTopic): Promise<EducationalTopic> {
    const [topic] = await db
      .insert(educationalTopics)
      .values(insertTopic)
      .returning();
    return topic;
  }

  async getClinicalScenarios(filters?: { 
    topicId?: string; 
    difficulty?: string; 
    organSite?: string;
    scenario?: string;
    guidelineReference?: string;
  }): Promise<ClinicalScenario[]> {
    let query = db.select().from(clinicalScenarios).where(eq(clinicalScenarios.isActive, true));
    
    if (filters?.topicId) {
      query = query.where(eq(clinicalScenarios.topicId, filters.topicId));
    }
    if (filters?.difficulty) {
      query = query.where(eq(clinicalScenarios.difficulty, filters.difficulty));
    }
    if (filters?.guidelineReference) {
      const searchTerm = `%${filters.guidelineReference}%`;
      query = query.where(sql`${clinicalScenarios.guidelineReference} LIKE ${searchTerm}`);
    }
    
    return await query.orderBy(clinicalScenarios.createdAt);
  }

  async createClinicalScenario(insertScenario: InsertClinicalScenario): Promise<ClinicalScenario> {
    const [scenario] = await db
      .insert(clinicalScenarios)
      .values(insertScenario)
      .returning();
    return scenario;
  }

  async getQuestionBank(filters?: { 
    topicId?: string; 
    scenarioId?: string;
    questionType?: string;
    difficulty?: string;
    examRelevance?: string[];
  }): Promise<Question[]> {
    let query = db.select().from(questionBank).where(eq(questionBank.isActive, true));
    
    if (filters?.topicId) {
      query = query.where(eq(questionBank.topicId, filters.topicId));
    }
    if (filters?.scenarioId) {
      query = query.where(eq(questionBank.scenarioId, filters.scenarioId));
    }
    if (filters?.questionType) {
      query = query.where(eq(questionBank.questionType, filters.questionType));
    }
    if (filters?.difficulty) {
      query = query.where(eq(questionBank.difficulty, filters.difficulty));
    }
    
    return await query.orderBy(questionBank.createdAt);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db
      .insert(questionBank)
      .values(insertQuestion)
      .returning();
    return question;
  }

  async getQuestions(filters?: { 
    topicId?: string; 
    difficulty?: string; 
    questionType?: string;
  }): Promise<Question[]> {
    let query = db.select().from(questionBank).where(eq(questionBank.isActive, true));
    
    if (filters?.topicId) {
      query = query.where(eq(questionBank.topicId, filters.topicId));
    }
    if (filters?.difficulty) {
      query = query.where(eq(questionBank.difficulty, filters.difficulty));
    }
    if (filters?.questionType) {
      query = query.where(eq(questionBank.questionType, filters.questionType));
    }
    
    return await query.orderBy(questionBank.createdAt);
  }

  async createLearningSession(insertSession: InsertLearningSession): Promise<LearningSession> {
    const [session] = await db
      .insert(learningSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async updateLearningSession(sessionId: string, updates: Partial<InsertLearningSession>): Promise<LearningSession> {
    const [session] = await db
      .update(learningSessions)
      .set({ ...updates, endTime: new Date() })
      .where(eq(learningSessions.sessionId, sessionId))
      .returning();
    return session;
  }

  async getLearningProgress(sessionId: string, topicId?: string): Promise<LearningProgress[]> {
    let query = db.select().from(learningProgress).where(eq(learningProgress.sessionId, sessionId));
    
    if (topicId) {
      query = query.where(eq(learningProgress.topicId, topicId));
    }
    
    return await query.orderBy(learningProgress.lastStudied);
  }

  async updateLearningProgress(sessionId: string, topicId: string, progressData: Partial<InsertLearningProgress>): Promise<LearningProgress> {
    const existing = await db
      .select()
      .from(learningProgress)
      .where(and(
        eq(learningProgress.sessionId, sessionId),
        eq(learningProgress.topicId, topicId)
      ))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(learningProgress)
        .set({ ...progressData, updatedAt: new Date() })
        .where(and(
          eq(learningProgress.sessionId, sessionId),
          eq(learningProgress.topicId, topicId)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(learningProgress)
        .values({
          sessionId,
          topicId,
          masteryLevel: "0",
          ...progressData
        })
        .returning();
      return created;
    }
  }

  async createAiInteraction(insertInteraction: InsertAiInteraction): Promise<AiInteraction> {
    const [interaction] = await db
      .insert(aiInteractions)
      .values(insertInteraction)
      .returning();
    return interaction;
  }

  async createLearningProgress(insertProgress: InsertLearningProgress): Promise<LearningProgress> {
    const [progress] = await db
      .insert(learningProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async createEducationalAiInteraction(insertInteraction: InsertEducationalAiInteraction): Promise<EducationalAiInteraction> {
    const [interaction] = await db
      .insert(educationalAiInteractions)
      .values(insertInteraction)
      .returning();
    return interaction;
  }

  async getExamPreparation(sessionId: string, examType?: string): Promise<ExamPreparation[]> {
    let query = db.select().from(examPreparation).where(eq(examPreparation.sessionId, sessionId));
    
    if (examType) {
      query = query.where(eq(examPreparation.examType, examType));
    }
    
    return await query.orderBy(examPreparation.updatedAt);
  }

  async updateExamPreparation(sessionId: string, examType: string, prepData: Partial<InsertExamPreparation>): Promise<ExamPreparation> {
    const existing = await db
      .select()
      .from(examPreparation)
      .where(and(
        eq(examPreparation.sessionId, sessionId),
        eq(examPreparation.examType, examType)
      ))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(examPreparation)
        .set({ ...prepData, updatedAt: new Date() })
        .where(and(
          eq(examPreparation.sessionId, sessionId),
          eq(examPreparation.examType, examType)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(examPreparation)
        .values({
          sessionId,
          examType,
          studyPlan: {},
          ...prepData
        })
        .returning();
      return created;
    }
  }

  async getTopicMasteryAnalytics(sessionId: string): Promise<any> {
    const progress = await this.getLearningProgress(sessionId);
    
    return {
      totalTopics: progress.length,
      masteredTopics: progress.filter(p => Number(p.masteryLevel) >= 0.8).length,
      weakAreas: progress
        .filter(p => Number(p.masteryLevel) < 0.6)
        .map(p => ({ topicId: p.topicId, masteryLevel: p.masteryLevel }))
        .sort((a, b) => Number(a.masteryLevel) - Number(b.masteryLevel)),
      averageMastery: progress.length > 0 
        ? progress.reduce((sum, p) => sum + Number(p.masteryLevel), 0) / progress.length 
        : 0,
      studyRecommendations: progress
        .filter(p => Number(p.masteryLevel) < 0.7)
        .flatMap(p => p.recommendedReview)
        .slice(0, 5)
    };
  }
}

export const storage = new DatabaseStorage();