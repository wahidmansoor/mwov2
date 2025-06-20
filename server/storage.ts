import { 
  users, 
  patientEvaluations, 
  clinicalProtocols, 
  aiInteractions, 
  auditLog, 
  treatmentProtocols,
  symptomManagement,
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

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private patientEvaluations: Map<string, PatientEvaluation> = new Map();
  private clinicalProtocols: Map<string, ClinicalProtocol> = new Map();
  private aiInteractions: Map<string, AiInteraction> = new Map();
  private auditLogs: Map<string, AuditLogEntry> = new Map();
  private treatmentProtocols: Map<string, TreatmentProtocol> = new Map();
  
  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create demo medical user
    const demoUser: User = {
      id: "demo-user-id",
      username: "dr.jane.doe",
      email: "dr.jane.doe@oncovista.ai",
      password: "hashed-password", // In production, this would be properly hashed
      firstName: "Jane",
      lastName: "Doe",
      role: "medical_oncologist",
      department: "Oncology",
      licenseNumber: "MD123456",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(demoUser.id, demoUser);

    // Initialize sample clinical protocols
    const sampleProtocol: ClinicalProtocol = {
      id: "protocol-1",
      name: "Lung Cancer Screening Protocol",
      version: "2024.1",
      protocolType: "screening",
      cancerType: "lung",
      stage: "early",
      content: {
        criteria: "Age 50-80, smoking history",
        recommendations: "Annual low-dose CT",
        followUp: "Based on findings"
      },
      evidenceLevel: "1A",
      guidelineSource: "NCCN",
      createdBy: demoUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
      approvalStatus: "approved",
      approvedBy: demoUser.id,
      approvedAt: new Date()
    };
    this.clinicalProtocols.set(sampleProtocol.id, sampleProtocol);

    // Initialize sample treatment protocols
    const sampleTreatmentProtocol: TreatmentProtocol = {
      id: "treatment-1",
      protocolCode: "LUNG-ADJ-001",
      tumourGroup: "lung",
      protocolName: "Adjuvant Chemotherapy for NSCLC",
      indications: {
        stage: "IB-IIIA",
        histology: "Non-small cell",
        performance_status: "0-1"
      },
      contraindications: {
        renal_impairment: "severe",
        cardiac_function: "ejection fraction < 50%"
      },
      dosingSchedule: {
        cycle_length: "21 days",
        total_cycles: 4,
        medications: [
          { name: "Cisplatin", dose: "75 mg/m2", day: 1 },
          { name: "Vinorelbine", dose: "25 mg/m2", day: [1, 8] }
        ]
      },
      toxicityProfile: {
        common: ["nausea", "fatigue", "neuropathy"],
        serious: ["nephrotoxicity", "ototoxicity", "myelosuppression"]
      },
      monitoringRequirements: {
        labs: ["CBC", "CMP", "Mg", "audiometry"],
        frequency: "weekly during treatment"
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.treatmentProtocols.set(sampleTreatmentProtocol.id, sampleTreatmentProtocol);
  }

  // User management methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const user: User = {
      ...insertUser,
      id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Patient evaluation methods
  async createPatientEvaluation(insertEvaluation: InsertPatientEvaluation): Promise<PatientEvaluation> {
    const id = `eval-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const evaluation: PatientEvaluation = {
      ...insertEvaluation,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.patientEvaluations.set(id, evaluation);
    return evaluation;
  }

  async getPatientEvaluations(filters?: { createdBy?: string; limit?: number }): Promise<PatientEvaluation[]> {
    let evaluations = Array.from(this.patientEvaluations.values());
    
    if (filters?.createdBy) {
      evaluations = evaluations.filter(eval => eval.createdBy === filters.createdBy);
    }
    
    // Sort by creation date, newest first
    evaluations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    if (filters?.limit) {
      evaluations = evaluations.slice(0, filters.limit);
    }
    
    return evaluations;
  }

  async getPatientEvaluation(id: string): Promise<PatientEvaluation | undefined> {
    return this.patientEvaluations.get(id);
  }

  async updatePatientEvaluation(id: string, updates: Partial<PatientEvaluation>): Promise<PatientEvaluation | undefined> {
    const evaluation = this.patientEvaluations.get(id);
    if (!evaluation) return undefined;
    
    const updatedEvaluation = { ...evaluation, ...updates, updatedAt: new Date() };
    this.patientEvaluations.set(id, updatedEvaluation);
    return updatedEvaluation;
  }

  async deletePatientEvaluation(id: string): Promise<boolean> {
    return this.patientEvaluations.delete(id);
  }

  // Clinical protocol methods
  async getClinicalProtocols(filters?: { cancerType?: string; stage?: string }): Promise<ClinicalProtocol[]> {
    let protocols = Array.from(this.clinicalProtocols.values());
    
    if (filters?.cancerType) {
      protocols = protocols.filter(p => p.cancerType === filters.cancerType);
    }
    
    if (filters?.stage) {
      protocols = protocols.filter(p => p.stage === filters.stage);
    }
    
    return protocols.filter(p => p.status === 'active');
  }

  async getClinicalProtocol(id: string): Promise<ClinicalProtocol | undefined> {
    return this.clinicalProtocols.get(id);
  }

  async createClinicalProtocol(insertProtocol: InsertClinicalProtocol): Promise<ClinicalProtocol> {
    const id = `protocol-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const protocol: ClinicalProtocol = {
      ...insertProtocol,
      id,
      status: 'active',
      approvalStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.clinicalProtocols.set(id, protocol);
    return protocol;
  }

  // AI interaction methods
  async createAiInteraction(insertInteraction: InsertAiInteraction): Promise<AiInteraction> {
    const id = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const interaction: AiInteraction = {
      ...insertInteraction,
      id,
      createdAt: new Date()
    };
    this.aiInteractions.set(id, interaction);
    return interaction;
  }

  async getAiInteractions(filters?: { userId?: string; moduleType?: string }): Promise<AiInteraction[]> {
    let interactions = Array.from(this.aiInteractions.values());
    
    if (filters?.userId) {
      interactions = interactions.filter(i => i.userId === filters.userId);
    }
    
    if (filters?.moduleType) {
      interactions = interactions.filter(i => i.moduleType === filters.moduleType);
    }
    
    return interactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Audit log methods
  async createAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const id = `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const auditEntry: AuditLogEntry = {
      ...entry,
      id,
      timestamp: new Date()
    };
    this.auditLogs.set(id, auditEntry);
    return auditEntry;
  }

  async getAuditLogs(filters?: { userId?: string; action?: string }): Promise<AuditLogEntry[]> {
    let logs = Array.from(this.auditLogs.values());
    
    if (filters?.userId) {
      logs = logs.filter(log => log.userId === filters.userId);
    }
    
    if (filters?.action) {
      logs = logs.filter(log => log.action === filters.action);
    }
    
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Treatment protocol methods
  async getTreatmentProtocols(filters?: { tumourGroup?: string }): Promise<TreatmentProtocol[]> {
    let protocols = Array.from(this.treatmentProtocols.values());
    
    if (filters?.tumourGroup) {
      protocols = protocols.filter(p => p.tumourGroup === filters.tumourGroup);
    }
    
    return protocols;
  }

  async getTreatmentProtocol(id: string): Promise<TreatmentProtocol | undefined> {
    return this.treatmentProtocols.get(id);
  }

  // Dashboard methods
  async getDashboardStats(): Promise<{
    activePatients: number;
    aiRecommendations: number;
    criticalAlerts: number;
    protocolsUpdated: number;
  }> {
    const evaluationsCount = this.patientEvaluations.size;
    const aiInteractionsToday = Array.from(this.aiInteractions.values())
      .filter(interaction => {
        const today = new Date();
        const interactionDate = new Date(interaction.createdAt);
        return interactionDate.toDateString() === today.toDateString();
      }).length;
    
    return {
      activePatients: evaluationsCount,
      aiRecommendations: aiInteractionsToday,
      criticalAlerts: Math.floor(Math.random() * 5), // Simulated for demo
      protocolsUpdated: this.clinicalProtocols.size
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
    const activities = [];
    
    // Get recent evaluations
    const recentEvaluations = Array.from(this.patientEvaluations.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    
    for (const evaluation of recentEvaluations) {
      activities.push({
        id: `activity-eval-${evaluation.id}`,
        type: "evaluation" as const,
        title: "Patient evaluation completed",
        description: `Patient ID: ${evaluation.patientId} - Assessment completed`,
        timestamp: this.getRelativeTime(evaluation.createdAt),
        status: "completed" as const
      });
    }
    
    // Get recent AI interactions
    const recentAI = Array.from(this.aiInteractions.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2);
    
    for (const interaction of recentAI) {
      activities.push({
        id: `activity-ai-${interaction.id}`,
        type: "ai_recommendation" as const,
        title: "AI recommendation generated",
        description: `Clinical analysis completed for ${interaction.moduleType} module`,
        timestamp: this.getRelativeTime(interaction.createdAt),
        status: "completed" as const
      });
    }
    
    return activities.sort((a, b) => {
      // Sort by timestamp, newest first
      const timeA = this.parseRelativeTime(a.timestamp);
      const timeB = this.parseRelativeTime(b.timestamp);
      return timeA - timeB;
    }).slice(0, 5);
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  private parseRelativeTime(timeString: string): number {
    if (timeString === "Just now") return 0;
    
    const match = timeString.match(/(\d+)\s+(minute|hour|day)s?\s+ago/);
    if (!match) return 0;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case "minute": return value;
      case "hour": return value * 60;
      case "day": return value * 60 * 24;
      default: return 0;
    }
  }
}

export const storage = new MemStorage();
