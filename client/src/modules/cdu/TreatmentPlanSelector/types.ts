import { z } from "zod";

// Core data types for treatment selection
export const treatmentSelectionCriteriaSchema = z.object({
  cancerType: z.string(),
  stage: z.string(),
  histology: z.string(),
  biomarkers: z.array(z.string()),
  treatmentIntent: z.string(),
  treatmentLine: z.string(),
  previousTreatments: z.array(z.string()),
  changeReason: z.string(),
  // Enhanced clinical decision support fields
  performanceStatus: z.number().optional(),
  performanceStatusScale: z.string().optional(),
  comorbidities: z.array(z.string()).optional(),
  currentMedications: z.array(z.string()).optional(),
  organFunction: z.object({
    renal: z.number().optional(),
    hepatic: z.string().optional(),
    cardiac: z.number().optional()
  }).optional()
});

export type TreatmentSelectionCriteria = z.infer<typeof treatmentSelectionCriteriaSchema>;

export interface TreatmentRecommendation {
  id: string;
  protocol: string;
  intent: string;
  guidelines: string[];
  drugs: string[];
  alerts: string[];
  aiScore: number;
  biomarkerMatch: number;
  personalizedReasoning: string;
  safetyFlags: string[];
  drugInteractions: DrugInteractionResult[];
  clinicalWarnings: string[];
  evidenceLevel: string;
  nccnReferences: string[];
  expectedResponse?: string;
  monitoringPlan?: string[];
  // Enhanced clinical decision support fields
  comorbidityImpact?: ComorbidityImpactResult;
  performanceStatusGuidance?: PerformanceStatusResult;
  contraindications?: string[];
  doseAdjustments?: any[];
  monitoringRequirements?: string[];
}

export interface DrugInteractionResult {
  drug1: string;
  drug2: string;
  severity: string;
  mechanism: string;
  clinicalEffect: string;
  recommendation: string;
}

export interface ComorbidityImpactResult {
  contraindications: string[];
  doseAdjustments: any[];
  monitoringRequirements: string[];
  riskFactors: string[];
}

export interface PerformanceStatusResult {
  eligibleTreatments: string[];
  treatmentLimitations: string[];
  monitoringRequirements: string[];
  prognosticFactors: string[];
}

export interface RecommendationResult {
  primary: TreatmentRecommendation | null;
  alternatives: TreatmentRecommendation[];
  confidence: number;
  evidence: string;
  alerts: string[];
  // Enhanced fields for AI fallback support as per uploaded document
  fallbackUsed?: boolean;
  fallbackNote?: string;
  overallConfidence?: number;
  aiEnhanced?: boolean;
}

export interface ProtocolRule {
  id: string;
  cancerType: string;
  stage: string[];
  histology: string[];
  requiredBiomarkers: string[];
  preferredBiomarkers: string[];
  contraindications: string[];
  treatmentIntent: string;
  lineOfTreatment: string[];
  protocol: {
    name: string;
    drugs: Array<{
      name: string;
      dose: string;
      schedule: string;
      route: string;
    }>;
    duration: string;
    evidenceLevel: string;
    nccnReference: string;
  };
  alternatives?: Array<{
    name: string;
    condition: string;
    evidenceLevel: string;
  }>;
}

export const CANCER_TYPES = [
  "Breast Cancer", "Lung Cancer (NSCLC)", "Lung Cancer (SCLC)", "Colorectal Cancer",
  "Gastric Cancer", "Pancreatic Cancer", "Hepatocellular Carcinoma", "Ovarian Cancer",
  "Prostate Cancer", "Melanoma", "Renal Cell Carcinoma", "Bladder Cancer",
  "Head and Neck Cancer", "Lymphoma (Hodgkin)", "Lymphoma (Non-Hodgkin)", "Leukemia (AML)",
  "Glioblastoma", "Mesothelioma", "Sarcoma", "Thyroid Cancer", "Cervical Cancer",
  "Endometrial Cancer", "Esophageal Cancer", "Bile Duct Cancer", "Neuroendocrine Tumors"
];

export const STAGES = ["0", "I", "IA", "IB", "II", "IIA", "IIB", "III", "IIIA", "IIIB", "IIIC", "IV", "IVA", "IVB"];

export const HISTOLOGIES = {
  "Breast Cancer": ["Ductal", "Lobular", "Mucinous", "Tubular", "Inflammatory"],
  "Lung Cancer (NSCLC)": ["Adenocarcinoma", "Squamous Cell", "Large Cell"],
  "Lung Cancer (SCLC)": ["Small Cell"],
  "Colorectal Cancer": ["Adenocarcinoma", "Mucinous", "Signet Ring"],
  "default": ["Adenocarcinoma", "Squamous Cell", "Large Cell", "Small Cell", "Ductal", "Lobular"]
};

export const BIOMARKERS = {
  "Breast Cancer": ["ER+", "ER-", "PR+", "PR-", "HER2+", "HER2-", "Ki67 High", "Ki67 Low", "BRCA1+", "BRCA2+"],
  "Lung Cancer (NSCLC)": ["PD-L1+", "PD-L1-", "EGFR+", "ALK+", "ROS1+", "BRAF+", "MET+", "RET+", "KRAS+"],
  "Lung Cancer (SCLC)": ["PD-L1+", "PD-L1-", "TP53+", "RB1+"],
  "Colorectal Cancer": ["MSI-H", "MSS", "KRAS+", "BRAF+", "PIK3CA+", "HER2+", "PD-L1+"],
  "default": ["ER+", "ER-", "PR+", "PR-", "HER2+", "HER2-", "PD-L1+", "PD-L1-", "MSI-H", "MSS", "ALK+", "EGFR+", "KRAS+", "BRAF+"]
};

export const TREATMENT_INTENTS = ["Curative", "Palliative", "Adjuvant", "Neoadjuvant"];
export const TREATMENT_LINES = ["1st Line", "2nd Line", "3rd Line", "Adjuvant", "Neoadjuvant", "Maintenance"];
export const PREVIOUS_TREATMENTS = ["Surgery", "Chemotherapy", "Radiation", "Immunotherapy", "Targeted Therapy", "Hormone Therapy"];
export const CHANGE_REASONS = ["Disease Progression", "Toxicity/Intolerance", "Resistance", "Completion of Treatment", "Patient Preference"];

// Enhanced clinical decision support constants
export const PERFORMANCE_STATUS_SCALES = ["ECOG", "Karnofsky"];
export const ECOG_SCORES = [
  { value: 0, label: "0 - Fully active, no restrictions" },
  { value: 1, label: "1 - Restricted strenuous activity, ambulatory" },
  { value: 2, label: "2 - Ambulatory >50% of time, self-care" },
  { value: 3, label: "3 - Self-care limited, bedridden >50% of time" },
  { value: 4, label: "4 - Completely disabled, bedridden" }
];

export const KARNOFSKY_SCORES = [
  { value: 100, label: "100% - Normal, no complaints" },
  { value: 90, label: "90% - Minor symptoms, normal activity" },
  { value: 80, label: "80% - Normal activity with effort" },
  { value: 70, label: "70% - Cares for self, unable to work" },
  { value: 60, label: "60% - Requires occasional assistance" },
  { value: 50, label: "50% - Requires considerable assistance" },
  { value: 40, label: "40% - Disabled, requires special care" },
  { value: 30, label: "30% - Severely disabled" },
  { value: 20, label: "20% - Very sick, hospitalization necessary" },
  { value: 10, label: "10% - Moribund" }
];

export const COMMON_COMORBIDITIES = [
  "Diabetes Mellitus", "Hypertension", "Coronary Artery Disease", "Heart Failure",
  "Chronic Kidney Disease", "Liver Disease", "COPD", "Asthma", "Stroke/CVA",
  "Peripheral Vascular Disease", "Arthritis", "Depression", "Anxiety", "Obesity",
  "Osteoporosis", "Thyroid Disease", "Previous Cancer", "Autoimmune Disease"
];

export const COMMON_MEDICATIONS = [
  "Metformin", "Insulin", "Lisinopril", "Metoprolol", "Amlodipine", "Atorvastatin",
  "Aspirin", "Warfarin", "Clopidogrel", "Prednisone", "Levothyroxine", "Furosemide",
  "Albuterol", "Omeprazole", "Methotrexate", "Hydroxychloroquine", "Digoxin",
  "Phenytoin", "Carbamazepine", "Valproic Acid", "Lithium", "Cyclosporine"
];