import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  uuid,
  jsonb,
  decimal,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").default("oncologist"), // medical_oncologist, radiation_oncologist, etc.
  department: text("department"),
  licenseNumber: text("license_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Clinical protocols with versioning
export const clinicalProtocols = pgTable("clinical_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  version: varchar("version", { length: 50 }).notNull(),
  protocolType: varchar("protocol_type", { length: 100 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }),
  stage: varchar("stage", { length: 50 }),
  content: jsonb("content").notNull(),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  guidelineSource: varchar("guideline_source", { length: 100 }),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  status: varchar("status", { length: 50 }).default("active"),
  approvalStatus: varchar("approval_status", { length: 50 }).default("pending"),
  approvedBy: uuid("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
});

// Clinical decision support rules
export const clinicalDecisionRules = pgTable("clinical_decision_rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  ruleName: varchar("rule_name", { length: 255 }).notNull(),
  moduleType: varchar("module_type", { length: 100 }).notNull(),
  conditions: jsonb("conditions").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  confidenceThreshold: decimal("confidence_threshold", { precision: 3, scale: 2 }).default("0.80"),
  evidenceReferences: jsonb("evidence_references"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// AI interaction logs
export const aiInteractions = pgTable("ai_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  sessionId: varchar("session_id", { length: 255 }),
  moduleType: varchar("module_type", { length: 100 }),
  intent: varchar("intent", { length: 100 }),
  inputContext: jsonb("input_context"),
  aiResponse: jsonb("ai_response"),
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }),
  userFeedback: varchar("user_feedback", { length: 50 }),
  responseTimeMs: integer("response_time_ms"),
  modelVersion: varchar("model_version", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Treatment plan criteria for dynamic dropdown population
export const treatmentPlanCriteria = pgTable("treatment_plan_criteria", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'histology', 'biomarker', 'reason', 'intent', 'line'
  value: text("value").notNull(),
  description: text("description"),
  isCommon: boolean("is_common").default(true), // Distinguish common vs rare markers
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Treatment plan mappings for structured protocol matching
export const treatmentPlanMappings = pgTable("treatment_plan_mappings", {
  id: serial("id").primaryKey(),
  cancerType: text("cancer_type").notNull(),
  histology: text("histology"),
  biomarkers: text("biomarkers").array(), // Array of required biomarkers
  treatmentIntent: text("treatment_intent"),
  lineOfTreatment: text("line_of_treatment"),
  treatmentProtocol: text("treatment_protocol").notNull(),
  evidenceReference: text("evidence_reference"),
  nccnReference: text("nccn_reference"),
  conflictingBiomarkers: text("conflicting_biomarkers").array(), // Contraindicated markers
  requiredStage: text("required_stage").array(), // Applicable stages
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }).default("0.85"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Audit trail system
export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  userRole: varchar("user_role", { length: 100 }),
  action: varchar("action", { length: 255 }),
  resource: varchar("resource", { length: 255 }),
  resourceId: varchar("resource_id", { length: 255 }),
  oldValues: jsonb("old_values"),
  newValues: jsonb("new_values"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
  sensitiveData: boolean("sensitive_data").default(false),
});

// Anonymous clinical decision support inputs (no patient identifiers)
export const decisionSupportInputs = pgTable("decision_support_inputs", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }), // Anonymous session identifier
  ageGroup: varchar("age_group", { length: 50 }), // Age ranges, not exact age
  symptoms: jsonb("symptoms"), // Clinical symptoms for analysis
  riskFactors: jsonb("risk_factors"), // Risk factor patterns
  clinicalFindings: jsonb("clinical_findings"), // Examination findings without identifiers
  aiAnalysis: jsonb("ai_analysis"), // AI recommendations and analysis
  moduleType: varchar("module_type", { length: 50 }), // OPD, CDU, Palliative
  createdBy: uuid("created_by").references(() => users.id), // Clinician using the tool
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Treatment protocols for CDU module
export const treatmentProtocols = pgTable("treatment_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolCode: varchar("protocol_code", { length: 100 }).unique(),
  tumourGroup: varchar("tumour_group", { length: 100 }),
  protocolName: varchar("protocol_name", { length: 255 }),
  indications: jsonb("indications"),
  contraindications: jsonb("contraindications"),
  dosingSchedule: jsonb("dosing_schedule"),
  toxicityProfile: jsonb("toxicity_profile"),
  monitoringRequirements: jsonb("monitoring_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Symptom management for palliative care
export const symptomManagement = pgTable("symptom_management", {
  id: uuid("id").primaryKey().defaultRandom(),
  symptom: varchar("symptom", { length: 100 }),
  assessmentTools: jsonb("assessment_tools"),
  interventions: jsonb("interventions"),
  medications: jsonb("medications"),
  monitoringParameters: jsonb("monitoring_parameters"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CD (Cancer Day Unit) protocols - comprehensive treatment protocols
export const cdProtocols = pgTable("cd_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  tumourGroup: varchar("tumour_group", { length: 100 }).notNull(),
  tumourSupergroup: varchar("tumour_supergroup", { length: 100 }),
  treatmentIntent: varchar("treatment_intent", { length: 50 }).notNull(),
  summary: text("summary").notNull(),
  eligibility: jsonb("eligibility").notNull(),
  precautions: jsonb("precautions").notNull(),
  treatment: jsonb("treatment").notNull(),
  tests: jsonb("tests"),
  doseModifications: jsonb("dose_modifications"),
  referenceList: jsonb("reference_list"),
  cycleInfo: jsonb("cycle_info"),
  preMedications: jsonb("pre_medications"),
  postMedications: jsonb("post_medications"),
  supportiveCare: jsonb("supportive_care"),
  rescueAgents: jsonb("rescue_agents"),
  monitoring: jsonb("monitoring"),
  toxicityMonitoring: jsonb("toxicity_monitoring"),
  interactions: jsonb("interactions"),
  contraindications: jsonb("contraindications"),
  version: varchar("version", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).default("active"),
  createdBy: uuid("created_by").references(() => users.id),
  updatedBy: uuid("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastReviewed: timestamp("last_reviewed"),
});

// Oncology medications comprehensive database
export const oncologyMedications = pgTable("oncology_medications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  brandNames: jsonb("brand_names"),
  classification: varchar("classification", { length: 255 }).notNull(),
  mechanism: text("mechanism").notNull(),
  administration: text("administration").notNull(),
  indications: jsonb("indications").notNull(),
  dosing: jsonb("dosing").notNull(),
  sideEffects: jsonb("side_effects"),
  monitoring: jsonb("monitoring"),
  interactions: jsonb("interactions"),
  referenceSources: jsonb("reference_sources"),
  summary: text("summary"),
  blackBoxWarning: text("black_box_warning"),
  specialConsiderations: jsonb("special_considerations"),
  pharmacokinetics: jsonb("pharmacokinetics"),
  contraindications: jsonb("contraindications"),
  routineMonitoring: jsonb("routine_monitoring"),
  preTreatmentTests: jsonb("pre_treatment_tests"),
  isChemotherapy: boolean("is_chemotherapy").default(false),
  isImmunotherapy: boolean("is_immunotherapy").default(false),
  isTargetedTherapy: boolean("is_targeted_therapy").default(false),
  isOrphanDrug: boolean("is_orphan_drug").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema exports
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDecisionSupportInputSchema = createInsertSchema(decisionSupportInputs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClinicalProtocolSchema = createInsertSchema(clinicalProtocols).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiInteractionSchema = createInsertSchema(aiInteractions).omit({
  id: true,
  createdAt: true,
});

export const insertCdProtocolSchema = createInsertSchema(cdProtocols).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOncologyMedicationSchema = createInsertSchema(oncologyMedications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// NCCN Guidelines comprehensive database
export const nccnGuidelines = pgTable("nccn_guidelines", {
  id: uuid("id").primaryKey().defaultRandom(),
  referenceCode: varchar("reference_code", { length: 50 }).notNull(), // BINV-1, DCIS-1, etc.
  title: varchar("title", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // invasive, dcis, special_considerations, etc.
  cancerType: varchar("cancer_type", { length: 100 }).default("breast"),
  version: varchar("version", { length: 50 }).notNull().default("4.2025"),
  releaseDate: varchar("release_date", { length: 50 }),
  content: jsonb("content").notNull(), // Full guideline content
  evidenceLevel: varchar("evidence_level", { length: 50 }), // Category 1, 2A, 2B
  consensusLevel: varchar("consensus_level", { length: 50 }), // uniform, consensus, etc.
  applicableStages: jsonb("applicable_stages"), // Array of cancer stages
  biomarkerRequirements: jsonb("biomarker_requirements"), // HER2, ER, PR, etc.
  treatmentSettings: jsonb("treatment_settings"), // adjuvant, neoadjuvant, metastatic
  specialPopulations: jsonb("special_populations"), // pregnancy, elderly, male, etc.
  crossReferences: jsonb("cross_references"), // Related NCCN sections
  evidenceReferences: jsonb("evidence_references"), // Scientific citations
  updatesFromPrevious: text("updates_from_previous"), // Version changes
  clinicalDecisionPoints: jsonb("clinical_decision_points"), // Key decision nodes
  monitoringRequirements: jsonb("monitoring_requirements"), // Follow-up protocols
  contraindications: jsonb("contraindications"), // Safety considerations
  alternativeApproaches: jsonb("alternative_approaches"), // Other options
  qualityMeasures: jsonb("quality_measures"), // Performance indicators
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Clinical decision support lookup table
export const clinicalDecisionSupport = pgTable("clinical_decision_support", {
  id: uuid("id").primaryKey().defaultRandom(),
  moduleType: varchar("module_type", { length: 100 }).notNull(), // opd, cdu, inpatient, etc.
  clinicalScenario: varchar("clinical_scenario", { length: 500 }).notNull(),
  inputParameters: jsonb("input_parameters").notNull(), // Age, stage, biomarkers, etc.
  nccnReferences: jsonb("nccn_references").notNull(), // Array of applicable NCCN sections
  recommendedActions: jsonb("recommended_actions").notNull(),
  alternativeOptions: jsonb("alternative_options"),
  riskStratification: varchar("risk_stratification", { length: 100 }),
  evidenceStrength: varchar("evidence_strength", { length: 50 }),
  consensusLevel: varchar("consensus_level", { length: 50 }),
  applicabilityScore: decimal("applicability_score", { precision: 3, scale: 2 }),
  lastReviewed: timestamp("last_reviewed"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Biomarker testing guidelines
export const biomarkerGuidelines = pgTable("biomarker_guidelines", {
  id: uuid("id").primaryKey().defaultRandom(),
  biomarkerName: varchar("biomarker_name", { length: 100 }).notNull(),
  testingMethod: varchar("testing_method", { length: 200 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  clinicalIndications: jsonb("clinical_indications").notNull(),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  testingTiming: varchar("testing_timing", { length: 200 }),
  interpretationCriteria: jsonb("interpretation_criteria"),
  therapeuticImplications: jsonb("therapeutic_implications"),
  qualityRequirements: jsonb("quality_requirements"),
  reportingStandards: jsonb("reporting_standards"),
  costConsiderations: text("cost_considerations"),
  specialConsiderations: jsonb("special_considerations"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertNccnGuidelinesSchema = createInsertSchema(nccnGuidelines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClinicalDecisionSupportSchema = createInsertSchema(clinicalDecisionSupport).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBiomarkerGuidelinesSchema = createInsertSchema(biomarkerGuidelines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});



// UpsertUser type for Replit Auth
export type UpsertUser = typeof users.$inferInsert;

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type DecisionSupportInput = typeof decisionSupportInputs.$inferSelect;
export type InsertDecisionSupportInput = z.infer<typeof insertDecisionSupportInputSchema>;
export type ClinicalProtocol = typeof clinicalProtocols.$inferSelect;
export type InsertClinicalProtocol = z.infer<typeof insertClinicalProtocolSchema>;
export type AiInteraction = typeof aiInteractions.$inferSelect;
export type InsertAiInteraction = z.infer<typeof insertAiInteractionSchema>;
export type TreatmentProtocol = typeof treatmentProtocols.$inferSelect;
export type CdProtocol = typeof cdProtocols.$inferSelect;
export type InsertCdProtocol = z.infer<typeof insertCdProtocolSchema>;
export type OncologyMedication = typeof oncologyMedications.$inferSelect;
export type InsertOncologyMedication = z.infer<typeof insertOncologyMedicationSchema>;
export type AuditLogEntry = typeof auditLog.$inferSelect;
export type NccnGuideline = typeof nccnGuidelines.$inferSelect;
export type InsertNccnGuideline = z.infer<typeof insertNccnGuidelinesSchema>;
export type ClinicalDecisionSupport = typeof clinicalDecisionSupport.$inferSelect;
export type InsertClinicalDecisionSupport = z.infer<typeof insertClinicalDecisionSupportSchema>;
export type BiomarkerGuideline = typeof biomarkerGuidelines.$inferSelect;
export type InsertBiomarkerGuideline = z.infer<typeof insertBiomarkerGuidelinesSchema>;

// OPD Module Enhanced Tables
export const cancerScreeningProtocols = pgTable("cancer_screening_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  ageRange: varchar("age_range", { length: 50 }).notNull(),
  riskFactors: jsonb("risk_factors").notNull(),
  testName: varchar("test_name", { length: 200 }).notNull(),
  frequency: varchar("frequency", { length: 100 }).notNull(),
  recommendationStrength: varchar("recommendation_strength", { length: 50 }).notNull(),
  source: varchar("source", { length: 100 }).notNull(),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  additionalConsiderations: text("additional_considerations"),
  contraindications: jsonb("contraindications"),
  followUpProtocol: text("follow_up_protocol"),
  costEffectiveness: text("cost_effectiveness"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const diagnosticWorkupSteps = pgTable("diagnostic_workup_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  symptomOrFinding: varchar("symptom_or_finding", { length: 300 }).notNull(),
  imagingOrLab: varchar("imaging_or_lab", { length: 200 }).notNull(),
  nextStepIfPositive: text("next_step_if_positive").notNull(),
  nextStepIfNegative: text("next_step_if_negative").notNull(),
  linkedStage: varchar("linked_stage", { length: 50 }),
  source: varchar("source", { length: 100 }).notNull(),
  urgencyLevel: varchar("urgency_level", { length: 50 }),
  estimatedCost: varchar("estimated_cost", { length: 100 }),
  sensitivity: decimal("sensitivity", { precision: 5, scale: 2 }),
  specificity: decimal("specificity", { precision: 5, scale: 2 }),
  falsePosRisk: text("false_pos_risk"),
  falseNegRisk: text("false_neg_risk"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const biomarkers = pgTable("biomarkers", {
  id: uuid("id").primaryKey().defaultRandom(),
  biomarkerName: varchar("biomarker_name", { length: 100 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  positiveImplication: text("positive_implication").notNull(),
  negativeImplication: text("negative_implication").notNull(),
  testingRequired: boolean("testing_required").default(true),
  testingMethod: varchar("testing_method", { length: 200 }).notNull(),
  therapyLink: text("therapy_link"),
  source: varchar("source", { length: 100 }).notNull(),
  clinicalUtility: text("clinical_utility"),
  turnaroundTime: varchar("turnaround_time", { length: 50 }),
  sampleRequirements: text("sample_requirements"),
  referenceLab: varchar("reference_lab", { length: 200 }),
  normalRange: varchar("normal_range", { length: 100 }),
  criticalValues: varchar("critical_values", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const referralGuidelines = pgTable("referral_guidelines", {
  id: uuid("id").primaryKey().defaultRandom(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  indication: text("indication").notNull(),
  urgency: varchar("urgency", { length: 50 }).notNull(),
  toSpecialist: varchar("to_specialist", { length: 100 }).notNull(),
  reason: text("reason").notNull(),
  followupRequired: boolean("followup_required").default(true),
  source: varchar("source", { length: 100 }).notNull(),
  timeframe: varchar("timeframe", { length: 100 }),
  requiredDocumentation: jsonb("required_documentation"),
  patientPreparation: text("patient_preparation"),
  providerInstructions: text("provider_instructions"),
  insuranceConsiderations: text("insurance_considerations"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const riskStratificationScores = pgTable("risk_stratification_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  scoreName: varchar("score_name", { length: 100 }).notNull(),
  requiredInputs: jsonb("required_inputs").notNull(),
  scoreRange: varchar("score_range", { length: 100 }).notNull(),
  interpretation: text("interpretation").notNull(),
  clinicalAction: text("clinical_action").notNull(),
  source: varchar("source", { length: 100 }).notNull(),
  validationStudies: jsonb("validation_studies"),
  limitations: text("limitations"),
  calculator: jsonb("calculator"), // Formula/algorithm for calculation
  riskCategories: jsonb("risk_categories"), // Low, intermediate, high risk definitions
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema exports for OPD tables
export const insertCancerScreeningProtocolsSchema = createInsertSchema(cancerScreeningProtocols).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDiagnosticWorkupStepsSchema = createInsertSchema(diagnosticWorkupSteps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBiomarkersSchema = createInsertSchema(biomarkers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReferralGuidelinesSchema = createInsertSchema(referralGuidelines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRiskStratificationScoresSchema = createInsertSchema(riskStratificationScores).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports for OPD tables
export type CancerScreeningProtocol = typeof cancerScreeningProtocols.$inferSelect;
export type InsertCancerScreeningProtocol = z.infer<typeof insertCancerScreeningProtocolsSchema>;
export type DiagnosticWorkupStep = typeof diagnosticWorkupSteps.$inferSelect;
export type InsertDiagnosticWorkupStep = z.infer<typeof insertDiagnosticWorkupStepsSchema>;
export type Biomarker = typeof biomarkers.$inferSelect;
export type InsertBiomarker = z.infer<typeof insertBiomarkersSchema>;
export type ReferralGuideline = typeof referralGuidelines.$inferSelect;
export type InsertReferralGuideline = z.infer<typeof insertReferralGuidelinesSchema>;
export type RiskStratificationScore = typeof riskStratificationScores.$inferSelect;
export type InsertRiskStratificationScore = z.infer<typeof insertRiskStratificationScoresSchema>;

// Treatment Plan Types
export const insertTreatmentPlanCriteriaSchema = createInsertSchema(treatmentPlanCriteria);
export const insertTreatmentPlanMappingsSchema = createInsertSchema(treatmentPlanMappings);
export type TreatmentPlanCriteria = typeof treatmentPlanCriteria.$inferSelect;
export type InsertTreatmentPlanCriteria = z.infer<typeof insertTreatmentPlanCriteriaSchema>;
export type TreatmentPlanMapping = typeof treatmentPlanMappings.$inferSelect;
export type InsertTreatmentPlanMapping = z.infer<typeof insertTreatmentPlanMappingsSchema>;

// Palliative Care Module Tables
// Session-based tracking (no patient identifiers)
export const sessionLogs = pgTable("session_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  clinicianId: uuid("clinician_id").references(() => users.id),
  moduleType: varchar("module_type", { length: 100 }).notNull().default("palliative_care"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Symptom Assessment and Tracking
export const symptomScores = pgTable("symptom_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  symptom: varchar("symptom", { length: 100 }).notNull(),
  score: integer("score").notNull(), // 0-10 scale
  location: varchar("location", { length: 100 }),
  severity: varchar("severity", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const symptomProtocols = pgTable("symptom_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  symptom: varchar("symptom", { length: 100 }).notNull(),
  severityLevel: varchar("severity_level", { length: 50 }).notNull(),
  recommendations: jsonb("recommendations").notNull(),
  evidenceLevel: varchar("evidence_level", { length: 10 }),
  guidelineSource: varchar("guideline_source", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Pain Management
export const painAssessments = pgTable("pain_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  painType: varchar("pain_type", { length: 100 }),
  location: varchar("location", { length: 100 }),
  scale: integer("scale").notNull(), // 0-10
  quality: varchar("quality", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  exacerbatingFactors: text("exacerbating_factors"),
  relievingFactors: text("relieving_factors"),
  functionalImpact: varchar("functional_impact", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const opioidConversions = pgTable("opioid_conversions", {
  id: uuid("id").primaryKey().defaultRandom(),
  fromMed: varchar("from_med", { length: 100 }).notNull(),
  toMed: varchar("to_med", { length: 100 }).notNull(),
  conversionFactor: decimal("conversion_factor", { precision: 10, scale: 4 }).notNull(),
  routeFrom: varchar("route_from", { length: 50 }).notNull(),
  routeTo: varchar("route_to", { length: 50 }).notNull(),
  notes: text("notes"),
  evidenceLevel: varchar("evidence_level", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const breakthroughPain = pgTable("breakthrough_pain", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  medicationGiven: varchar("medication_given", { length: 100 }),
  dose: varchar("dose", { length: 50 }),
  route: varchar("route", { length: 50 }),
  responseRating: integer("response_rating"), // 1-5 scale
  timeToOnset: integer("time_to_onset_minutes"),
  duration: integer("duration_minutes"),
  sideEffects: text("side_effects"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Advance Directives and Goals of Care
export const goalsOfCare = pgTable("goals_of_care", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  codeStatus: varchar("code_status", { length: 50 }),
  preferences: jsonb("preferences").notNull(),
  decisionMaker: varchar("decision_maker", { length: 100 }),
  healthcareProxy: varchar("healthcare_proxy", { length: 100 }),
  structuredNotes: text("structured_notes"),
  discussionDate: timestamp("discussion_date"),
  reviewDate: timestamp("review_date"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Family Support and Caregiver Assessment
export const caregiverScores = pgTable("caregiver_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  scaleUsed: varchar("scale_used", { length: 100 }).notNull(), // Zarit, CQOLC, etc.
  totalScore: integer("total_score"),
  subscaleScores: jsonb("subscale_scores"),
  needsFlagged: text("needs_flagged").array(),
  recommendations: text("recommendations"),
  followUpNeeded: boolean("follow_up_needed").default(false),
  assessedBy: uuid("assessed_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resourceLinks = pgTable("resource_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  url: text("url"),
  description: text("description"),
  targetAudience: varchar("target_audience", { length: 100 }),
  language: varchar("language", { length: 50 }).default("English"),
  lastReviewed: timestamp("last_reviewed"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Psychosocial Support
export const psychosocialScreening = pgTable("psychosocial_screening", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  phq9Score: integer("phq9_score"),
  gad7Score: integer("gad7_score"),
  spiritualScale: integer("spiritual_scale"),
  copingAssessment: jsonb("coping_assessment"),
  culturalFactors: text("cultural_factors"),
  socialSupport: varchar("social_support", { length: 100 }),
  financialConcerns: boolean("financial_concerns"),
  followUpNeeded: boolean("follow_up_needed").default(false),
  screenedBy: uuid("screened_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const referralTracking = pgTable("referral_tracking", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  referralType: varchar("referral_type", { length: 100 }).notNull(), // psychology, social work, chaplain, etc.
  urgency: varchar("urgency", { length: 50 }).notNull(),
  reason: text("reason"),
  provider: varchar("provider", { length: 100 }),
  outcome: varchar("outcome", { length: 100 }),
  followUpDate: timestamp("follow_up_date"),
  status: varchar("status", { length: 50 }).default("pending"),
  notes: text("notes"),
  referredBy: uuid("referred_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas for palliative care tables
export const insertSessionLogsSchema = createInsertSchema(sessionLogs).omit({
  id: true,
  createdAt: true,
});

export const insertSymptomScoresSchema = createInsertSchema(symptomScores).omit({
  id: true,
  createdAt: true,
});

export const insertSymptomProtocolsSchema = createInsertSchema(symptomProtocols).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPainAssessmentsSchema = createInsertSchema(painAssessments).omit({
  id: true,
  createdAt: true,
});

export const insertOpioidConversionsSchema = createInsertSchema(opioidConversions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBreakthroughPainSchema = createInsertSchema(breakthroughPain).omit({
  id: true,
  createdAt: true,
});

export const insertGoalsOfCareSchema = createInsertSchema(goalsOfCare).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCaregiverScoresSchema = createInsertSchema(caregiverScores).omit({
  id: true,
  createdAt: true,
});

export const insertResourceLinksSchema = createInsertSchema(resourceLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPsychosocialScreeningSchema = createInsertSchema(psychosocialScreening).omit({
  id: true,
  createdAt: true,
});

export const insertReferralTrackingSchema = createInsertSchema(referralTracking).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports for palliative care tables
export type SessionLog = typeof sessionLogs.$inferSelect;
export type InsertSessionLog = z.infer<typeof insertSessionLogsSchema>;
export type SymptomScore = typeof symptomScores.$inferSelect;
export type InsertSymptomScore = z.infer<typeof insertSymptomScoresSchema>;
export type SymptomProtocol = typeof symptomProtocols.$inferSelect;
export type InsertSymptomProtocol = z.infer<typeof insertSymptomProtocolsSchema>;
export type PainAssessment = typeof painAssessments.$inferSelect;
export type InsertPainAssessment = z.infer<typeof insertPainAssessmentsSchema>;
export type OpioidConversion = typeof opioidConversions.$inferSelect;
export type InsertOpioidConversion = z.infer<typeof insertOpioidConversionsSchema>;
export type BreakthroughPain = typeof breakthroughPain.$inferSelect;
export type InsertBreakthroughPain = z.infer<typeof insertBreakthroughPainSchema>;
export type GoalsOfCare = typeof goalsOfCare.$inferSelect;
export type InsertGoalsOfCare = z.infer<typeof insertGoalsOfCareSchema>;
export type CaregiverScore = typeof caregiverScores.$inferSelect;
export type InsertCaregiverScore = z.infer<typeof insertCaregiverScoresSchema>;
export type ResourceLink = typeof resourceLinks.$inferSelect;
export type InsertResourceLink = z.infer<typeof insertResourceLinksSchema>;
export type PsychosocialScreening = typeof psychosocialScreening.$inferSelect;
export type InsertPsychosocialScreening = z.infer<typeof insertPsychosocialScreeningSchema>;
export type ReferralTracking = typeof referralTracking.$inferSelect;
export type InsertReferralTracking = z.infer<typeof insertReferralTrackingSchema>;

// Educational Content System - Real NCCN/ASCO/ESMO Data Integration
export const educationalTopics = pgTable("educational_topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Staging, Treatment, Biomarkers
  subspecialty: varchar("subspecialty", { length: 100 }).notNull(), // Medical, Radiation, Surgical
  organSite: varchar("organ_site", { length: 100 }), // Breast, Lung, Colon, etc.
  difficulty: varchar("difficulty", { length: 50 }).notNull(), // Resident, Fellow, Attending
  guidelineReference: varchar("guideline_reference", { length: 255 }).notNull(), // NCCN V3.2025
  learningObjectives: text("learning_objectives").array().notNull(),
  keyPoints: text("key_points").array().notNull(),
  evidenceLevel: varchar("evidence_level", { length: 50 }), // Category 1, 2A, 2B
  lastUpdated: timestamp("last_updated").defaultNow(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const clinicalScenarios = pgTable("clinical_scenarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  topicId: uuid("topic_id").references(() => educationalTopics.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  patientPresentation: jsonb("patient_presentation").notNull(), // Age, symptoms, staging
  decisionPoints: jsonb("decision_points").notNull(), // Branching logic steps
  correctPathway: text("correct_pathway").array().notNull(),
  learningOutcomes: text("learning_outcomes").array().notNull(),
  guidelineReference: varchar("guideline_reference", { length: 255 }).notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  estimatedTime: integer("estimated_time"), // minutes
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true)
});

export const questionBank = pgTable("question_bank", {
  id: uuid("id").primaryKey().defaultRandom(),
  topicId: uuid("topic_id").references(() => educationalTopics.id),
  scenarioId: uuid("scenario_id").references(() => clinicalScenarios.id),
  questionType: varchar("question_type", { length: 50 }).notNull(), // MCQ, EMQ, Visual, Case
  questionText: text("question_text").notNull(),
  options: jsonb("options").notNull(), // Array of answer choices
  correctAnswer: varchar("correct_answer", { length: 10 }).notNull(),
  rationale: text("rationale").notNull(),
  explanationDetail: text("explanation_detail"),
  guidelineReferences: text("guideline_references").array().notNull(),
  citations: text("citations").array().notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  examRelevance: text("exam_relevance").array().default([]), // MRCP, ESMO, FRCR
  imageUrl: varchar("image_url", { length: 500 }),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true)
});

export const learningSessions = pgTable("learning_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  topicId: uuid("topic_id").references(() => educationalTopics.id),
  scenarioId: uuid("scenario_id").references(() => clinicalScenarios.id),
  sessionType: varchar("session_type", { length: 50 }).notNull(), // Flashcard, Scenario, QBank
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  questionsAttempted: integer("questions_attempted").default(0),
  questionsCorrect: integer("questions_correct").default(0),
  averageConfidence: decimal("average_confidence", { precision: 3, scale: 2 }),
  timeSpent: integer("time_spent"), // seconds
  learningMode: varchar("learning_mode", { length: 50 }), // Study, Exam, Review
  performance: jsonb("performance"), // Detailed scoring data
  createdAt: timestamp("created_at").defaultNow()
});

export const learningProgress = pgTable("learning_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  topicId: uuid("topic_id").references(() => educationalTopics.id),
  masteryLevel: decimal("mastery_level", { precision: 3, scale: 2 }).notNull(), // 0.0 - 1.0
  attemptCount: integer("attempt_count").default(1),
  lastAttemptScore: decimal("last_attempt_score", { precision: 3, scale: 2 }),
  bestScore: decimal("best_score", { precision: 3, scale: 2 }),
  averageScore: decimal("average_score", { precision: 3, scale: 2 }),
  timeToMastery: integer("time_to_mastery"), // minutes
  weaknessAreas: text("weakness_areas").array().default([]),
  strengthAreas: text("strength_areas").array().default([]),
  recommendedReview: text("recommended_review").array().default([]),
  lastStudied: timestamp("last_studied").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const educationalAiInteractions = pgTable("educational_ai_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  query: text("query").notNull(),
  response: text("response").notNull(),
  queryType: varchar("query_type", { length: 50 }).notNull(), // Guideline, Clinical, Exam
  topicsDiscussed: text("topics_discussed").array().default([]),
  guidelinesReferenced: text("guidelines_referenced").array().default([]),
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }),
  responseTime: integer("response_time"), // milliseconds
  userRating: integer("user_rating"), // 1-5 stars
  followupQuestions: text("followup_questions").array().default([]),
  createdAt: timestamp("created_at").defaultNow()
});

export const examPreparation = pgTable("exam_preparation", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  examType: varchar("exam_type", { length: 100 }).notNull(), // MRCP, ESMO, FRCR, Board
  targetDate: timestamp("target_date"),
  currentReadiness: decimal("current_readiness", { precision: 3, scale: 2 }), // 0.0 - 1.0
  studyPlan: jsonb("study_plan").notNull(),
  weakAreas: text("weak_areas").array().default([]),
  practiceScores: jsonb("practice_scores").default({}),
  recommendedFocus: text("recommended_focus").array().default([]),
  dailyGoals: jsonb("daily_goals").default({}),
  progressMilestones: jsonb("progress_milestones").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Insert schemas for educational content
export const insertEducationalTopicsSchema = createInsertSchema(educationalTopics);
export const insertClinicalScenariosSchema = createInsertSchema(clinicalScenarios);
export const insertQuestionBankSchema = createInsertSchema(questionBank);
export const insertLearningSessionsSchema = createInsertSchema(learningSessions);
export const insertLearningProgressSchema = createInsertSchema(learningProgress);
export const insertEducationalAiInteractionsSchema = createInsertSchema(educationalAiInteractions);
export const insertExamPreparationSchema = createInsertSchema(examPreparation);

// Types for educational content
export type EducationalTopic = typeof educationalTopics.$inferSelect;
export type InsertEducationalTopic = z.infer<typeof insertEducationalTopicsSchema>;
export type ClinicalScenario = typeof clinicalScenarios.$inferSelect;
export type InsertClinicalScenario = z.infer<typeof insertClinicalScenariosSchema>;
export type Question = typeof questionBank.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionBankSchema>;
export type LearningSession = typeof learningSessions.$inferSelect;
export type InsertLearningSession = z.infer<typeof insertLearningSessionsSchema>;
export type LearningProgress = typeof learningProgress.$inferSelect;
export type InsertLearningProgress = z.infer<typeof insertLearningProgressSchema>;
export type EducationalAiInteraction = typeof educationalAiInteractions.$inferSelect;
export type InsertEducationalAiInteraction = z.infer<typeof insertEducationalAiInteractionsSchema>;
export type ExamPreparation = typeof examPreparation.$inferSelect;
export type InsertExamPreparation = z.infer<typeof insertExamPreparationSchema>;
