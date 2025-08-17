import { z } from "zod";

// Common validation schemas for clinical data
export const patientIdSchema = z.string().uuid("Invalid patient ID format");

export const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.number().positive("Dosage must be positive"),
  unit: z.string().min(1, "Unit is required"),
  frequency: z.string().min(1, "Frequency is required")
});

// Calculator validation schemas
export const opioidConversionSchema = z.object({
  drug: z.string().min(1, "Source drug is required"),
  dose: z.number().positive("Dose must be positive"),
  target: z.string().min(1, "Target drug is required"),
  patientWeight: z.number().positive().optional(),
  renalFunction: z.enum(['normal', 'mild', 'moderate', 'severe']).optional()
});

export const renalDoseSchema = z.object({
  drug: z.string().min(1, "Drug name is required"),
  creatinine: z.number().positive("Creatinine must be positive"),
  age: z.number().min(0).max(150, "Age must be between 0 and 150"),
  weight: z.number().positive("Weight must be positive"),
  gender: z.enum(['male', 'female']).optional()
});

export const prognosticSchema = z.object({
  kps: z.number().min(0).max(100, "KPS must be between 0 and 100"),
  dyspnea: z.boolean(),
  anorexia: z.boolean(),
  fatigue: z.boolean(),
  pain: z.number().min(0).max(10, "Pain score must be between 0 and 10").optional(),
  weight_loss: z.number().min(0).max(100, "Weight loss percentage must be between 0 and 100").optional()
});

// Protocol validation schemas
export const protocolSearchSchema = z.object({
  q: z.string().min(1, "Search query is required"),
  type: z.enum(['symptom', 'emergency', 'all']).default('all'),
  category: z.string().optional(),
  limit: z.number().min(1).max(100).default(20)
});

// AI service validation schemas
export const aiSummarizeSchema = z.object({
  slug: z.string().min(1, "Protocol slug is required"),
  type: z.enum(['symptom', 'emergency']).optional(),
  length: z.enum(['brief', 'detailed']).default('brief')
});

export const aiExplainSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  level: z.enum(['resident', 'fellow', 'attending']).default('resident'),
  context: z.string().optional()
});

export const aiCompareSchema = z.object({
  guidelines: z.array(z.string().min(1)).min(2, "At least 2 guidelines required").max(5, "Maximum 5 guidelines allowed"),
  focus: z.string().optional()
});

// Analytics validation schemas
export const analyticsLogSchema = z.object({
  module: z.string().min(1, "Module name is required"),
  action: z.string().min(1, "Action is required"),
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string().datetime().optional()
});

export const analyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  module: z.string().optional(),
  groupBy: z.enum(['hour', 'day', 'week', 'month']).default('day'),
  limit: z.number().min(1).max(1000).default(100)
});

// Clinical assessment schemas
export const symptomAssessmentSchema = z.object({
  patientId: patientIdSchema,
  symptoms: z.array(z.object({
    name: z.string().min(1),
    severity: z.number().min(0).max(10),
    duration: z.string(),
    quality: z.string().optional(),
    location: z.string().optional(),
    triggers: z.array(z.string()).optional(),
    relievers: z.array(z.string()).optional()
  })).min(1, "At least one symptom is required"),
  clinicalNotes: z.string().optional(),
  urgency: z.enum(['routine', 'urgent', 'emergent']).default('routine')
});

export const treatmentPlanSchema = z.object({
  patientId: patientIdSchema,
  diagnosis: z.string().min(1, "Diagnosis is required"),
  medications: z.array(medicationSchema),
  interventions: z.array(z.string()),
  followUp: z.object({
    interval: z.string(),
    parameters: z.array(z.string())
  }),
  goals: z.array(z.string()),
  contraindications: z.array(z.string()).optional()
});

// Export commonly used validation functions
export const validateUUID = (value: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

export const validateDosage = (dosage: number, unit: string): boolean => {
  const validUnits = ['mg', 'g', 'mcg', 'ml', 'tablets', 'capsules', 'patches'];
  return dosage > 0 && validUnits.includes(unit.toLowerCase());
};
