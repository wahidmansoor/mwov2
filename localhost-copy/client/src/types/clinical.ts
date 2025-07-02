export interface PatientEvaluation {
  id: string;
  patientId: string;
  age: number;
  symptoms: string[];
  riskFactors: string[];
  examinationFindings?: Record<string, any>;
  aiRecommendations?: AIRecommendation[];
  clinicianNotes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIRecommendation {
  id: string;
  type: "diagnostic" | "risk_alert" | "protocol_reference" | "treatment_suggestion";
  title: string;
  description: string;
  confidence: number;
  priority: "low" | "medium" | "high";
  evidenceLevel?: string;
  source?: string;
  timestamp: string;
}

export interface ClinicalProtocol {
  id: string;
  name: string;
  version: string;
  protocolType: string;
  cancerType?: string;
  stage?: string;
  content: Record<string, any>;
  evidenceLevel?: string;
  guidelineSource?: string;
  status: string;
}

export interface TreatmentProtocol {
  id: string;
  protocolCode: string;
  tumourGroup: string;
  protocolName: string;
  indications: Record<string, any>;
  contraindications: Record<string, any>;
  dosingSchedule: Record<string, any>;
  toxicityProfile: Record<string, any>;
  monitoringRequirements: Record<string, any>;
}

export interface SymptomAssessment {
  symptom: string;
  severity: number; // 1-10 scale
  duration: string;
  characteristics: string[];
}

export interface RiskFactorAssessment {
  factor: string;
  present: boolean;
  details?: string;
  timeframe?: string;
}
