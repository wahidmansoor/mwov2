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
export type SclcGuideline = typeof sclcGuidelines.$inferSelect;
export type InsertSclcGuideline = z.infer<typeof insertSclcGuidelinesSchema>;
export type SclcProtocol = typeof sclcProtocols.$inferSelect;
export type InsertSclcProtocol = z.infer<typeof insertSclcProtocolsSchema>;
export type SclcStagingTable = typeof sclcStagingTables.$inferSelect;
export type InsertSclcStagingTable = z.infer<typeof insertSclcStagingTablesSchema>;

// Treatment Plan Types
export const insertTreatmentPlanCriteriaSchema = createInsertSchema(treatmentPlanCriteria);
export const insertTreatmentPlanMappingsSchema = createInsertSchema(treatmentPlanMappings);
export type TreatmentPlanCriteria = typeof treatmentPlanCriteria.$inferSelect;
export type InsertTreatmentPlanCriteria = z.infer<typeof insertTreatmentPlanCriteriaSchema>;
export type TreatmentPlanMapping = typeof treatmentPlanMappings.$inferSelect;
export type InsertTreatmentPlanMapping = z.infer<typeof insertTreatmentPlanMappingsSchema>;
