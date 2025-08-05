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

// Educational Content Tables for Learning Module
export const educationalTopics = pgTable("educational_topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(), // Main educational content with structured data
  difficulty: varchar("difficulty", { length: 50 }).notNull(), // Resident, Fellow, Attending
  subspecialty: varchar("subspecialty", { length: 100 }).notNull(), // Medical Oncology, Radiation Oncology, etc.
  organSite: varchar("organ_site", { length: 100 }), // Breast, Lung, GI, etc.
  topicTags: jsonb("topic_tags"), // Array of tags for categorization
  learningObjectives: jsonb("learning_objectives").notNull(),
  keyPoints: jsonb("key_points").notNull(),
  clinicalApplications: jsonb("clinical_applications"),
  evidenceReferences: jsonb("evidence_references"), // NCCN, ASCO, ESMO citations
  estimatedReadTime: integer("estimated_read_time"), // Minutes
  examRelevance: varchar("exam_relevance", { length: 100 }), // Board exam relevance
  prerequisites: jsonb("prerequisites"), // Required prior knowledge
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clinicalScenarios = pgTable("clinical_scenarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  patientPresentation: jsonb("patient_presentation").notNull(), // Case details without identifiers
  clinicalContext: jsonb("clinical_context").notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  subspecialty: varchar("subspecialty", { length: 100 }).notNull(),
  organSite: varchar("organ_site", { length: 100 }),
  decisionPoints: jsonb("decision_points").notNull(), // Key clinical decisions to be made
  learningGoals: jsonb("learning_goals").notNull(),
  evidenceBasis: jsonb("evidence_basis").notNull(), // Supporting guidelines/research
  estimatedTime: integer("estimated_time"), // Minutes to complete
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const questionBank = pgTable("question_bank", {
  id: uuid("id").primaryKey().defaultRandom(),
  scenarioId: uuid("scenario_id").references(() => clinicalScenarios.id),
  questionText: text("question_text").notNull(),
  questionType: varchar("question_type", { length: 50 }).notNull(), // multiple_choice, case_analysis, etc.
  options: jsonb("options"), // Answer options for multiple choice
  correctAnswer: text("correct_answer").notNull(),
  rationale: text("rationale").notNull(), // Detailed explanation
  clinicalPearls: jsonb("clinical_pearls"), // Additional teaching points
  evidenceReferences: jsonb("evidence_references"),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  subspecialty: varchar("subspecialty", { length: 100 }).notNull(),
  organSite: varchar("organ_site", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEducationalTopicSchema = createInsertSchema(educationalTopics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClinicalScenarioSchema = createInsertSchema(clinicalScenarios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuestionSchema = createInsertSchema(questionBank).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Admission Criteria and Protocols
export const admissionCriteria = pgTable("admission_criteria", {
  id: uuid("id").primaryKey().defaultRandom(),
  criteriaName: varchar("criteria_name", { length: 255 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  admissionType: varchar("admission_type", { length: 100 }).notNull(), // planned, emergency, urgent
  clinicalIndications: jsonb("clinical_indications").notNull(),
  exclusionCriteria: jsonb("exclusion_criteria"),
  riskFactors: jsonb("risk_factors"),
  requiredAssessments: jsonb("required_assessments"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  priority: varchar("priority", { length: 50 }).default("standard"), // urgent, emergent, standard
  estimatedLOS: integer("estimated_los"), // Length of stay in days
  specialRequirements: jsonb("special_requirements"),
  contraindications: jsonb("contraindications"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Emergency Scenarios and Protocols
export const emergencyScenarios = pgTable("emergency_scenarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  scenarioName: varchar("scenario_name", { length: 255 }).notNull(),
  severity: varchar("severity", { length: 50 }).notNull(), // critical, urgent, moderate
  cancerType: varchar("cancer_type", { length: 100 }),
  treatmentRelated: boolean("treatment_related").default(false),
  clinicalPresentation: jsonb("clinical_presentation").notNull(),
  diagnosticCriteria: jsonb("diagnostic_criteria"),
  riskFactors: jsonb("risk_factors"),
  immediateActions: jsonb("immediate_actions").notNull(),
  timeToIntervention: varchar("time_to_intervention", { length: 100 }), // minutes, hours
  requiredResources: jsonb("required_resources"),
  consultationRequired: jsonb("consultation_required"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const emergencyProtocols = pgTable("emergency_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  scenarioId: uuid("scenario_id").references(() => emergencyScenarios.id),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  stepNumber: integer("step_number").notNull(),
  action: text("action").notNull(),
  timeFrame: varchar("time_frame", { length: 100 }),
  requiredPersonnel: jsonb("required_personnel"),
  medications: jsonb("medications"),
  monitoring: jsonb("monitoring"),
  expectedOutcome: text("expected_outcome"),
  nextStepTrigger: text("next_step_trigger"),
  alternativeActions: jsonb("alternative_actions"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const antibioticProtocols = pgTable("antibiotic_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  indication: varchar("indication", { length: 255 }).notNull(),
  patientPopulation: varchar("patient_population", { length: 200 }),
  neutropeniaGrade: varchar("neutropenia_grade", { length: 50 }),
  empiricTherapy: jsonb("empiric_therapy").notNull(),
  targetedTherapy: jsonb("targeted_therapy"),
  duration: varchar("duration", { length: 100 }),
  monitoringParameters: jsonb("monitoring_parameters"),
  adjustmentCriteria: jsonb("adjustment_criteria"),
  discontinuationCriteria: jsonb("discontinuation_criteria"),
  sideEffects: jsonb("side_effects"),
  drugInteractions: jsonb("drug_interactions"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Monitoring Parameters and Workflows
export const monitoringParameters = pgTable("monitoring_parameters", {
  id: uuid("id").primaryKey().defaultRandom(),
  parameterName: varchar("parameter_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // vital_signs, labs, symptoms, performance
  cancerType: varchar("cancer_type", { length: 100 }),
  treatmentPhase: varchar("treatment_phase", { length: 100 }),
  frequency: varchar("frequency", { length: 100 }).notNull(),
  normalRange: jsonb("normal_range"),
  alertThresholds: jsonb("alert_thresholds"),
  criticalValues: jsonb("critical_values"),
  actionRequired: jsonb("action_required"),
  documentationRequired: boolean("documentation_required").default(true),
  nursingProtocol: jsonb("nursing_protocol"),
  physicianNotification: jsonb("physician_notification"),
  equipmentRequired: jsonb("equipment_required"),
  specialInstructions: text("special_instructions"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const dailyAssessmentProtocols = pgTable("daily_assessment_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }),
  treatmentPhase: varchar("treatment_phase", { length: 100 }),
  dayOfTreatment: integer("day_of_treatment"),
  assessmentComponents: jsonb("assessment_components").notNull(),
  requiredVitals: jsonb("required_vitals"),
  labRequirements: jsonb("lab_requirements"),
  symptomAssessment: jsonb("symptom_assessment"),
  performanceStatusCheck: boolean("performance_status_check").default(true),
  nursingAssessment: jsonb("nursing_assessment"),
  physicianRounding: jsonb("physician_rounding"),
  patientEducation: jsonb("patient_education"),
  familyUpdates: jsonb("family_updates"),
  dischargePreparation: jsonb("discharge_preparation"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const performanceStatusScales = pgTable("performance_status_scales", {
  id: uuid("id").primaryKey().defaultRandom(),
  scaleName: varchar("scale_name", { length: 100 }).notNull(), // ECOG, Karnofsky, etc.
  scaleType: varchar("scale_type", { length: 50 }).notNull(),
  scoreValue: integer("score_value").notNull(),
  description: text("description").notNull(),
  functionalCapacity: text("functional_capacity"),
  activityLevel: text("activity_level"),
  careRequirements: text("care_requirements"),
  prognosticImplication: text("prognostic_implication"),
  treatmentImplications: jsonb("treatment_implications"),
  monitoringFrequency: varchar("monitoring_frequency", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Adverse Events and Management
export const adverseEvents = pgTable("adverse_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventName: varchar("event_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // hematologic, gastrointestinal, etc.
  ctcaeCode: varchar("ctcae_code", { length: 50 }),
  ctcaeVersion: varchar("ctcae_version", { length: 20 }).default("5.0"),
  grade: integer("grade").notNull(), // 1-5
  description: text("description").notNull(),
  clinicalPresentation: jsonb("clinical_presentation"),
  riskFactors: jsonb("risk_factors"),
  associatedTreatments: jsonb("associated_treatments"),
  timeToOnset: varchar("time_to_onset", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  reversibility: varchar("reversibility", { length: 100 }),
  frequency: varchar("frequency", { length: 100 }),
  preventionStrategies: jsonb("prevention_strategies"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const adverseEventManagement = pgTable("adverse_event_management", {
  id: uuid("id").primaryKey().defaultRandom(),
  adverseEventId: uuid("adverse_event_id").references(() => adverseEvents.id),
  grade: integer("grade").notNull(),
  immediateActions: jsonb("immediate_actions").notNull(),
  treatmentModifications: jsonb("treatment_modifications"),
  supportiveCare: jsonb("supportive_care"),
  medications: jsonb("medications"),
  monitoringRequirements: jsonb("monitoring_requirements"),
  consultationRequired: jsonb("consultation_required"),
  patientEducation: jsonb("patient_education"),
  followUpProtocol: jsonb("follow_up_protocol"),
  rechallengeCriteria: jsonb("rechallenge_criteria"),
  reportingRequirements: jsonb("reporting_requirements"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const drugToxicityProfiles = pgTable("drug_toxicity_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  drugName: varchar("drug_name", { length: 255 }).notNull(),
  genericName: varchar("generic_name", { length: 255 }),
  drugClass: varchar("drug_class", { length: 100 }),
  commonToxicities: jsonb("common_toxicities").notNull(),
  rareToxicities: jsonb("rare_toxicities"),
  doseRelatedToxicities: jsonb("dose_related_toxicities"),
  cumulativeToxicities: jsonb("cumulative_toxicities"),
  organSpecificToxicities: jsonb("organ_specific_toxicities"),
  monitoringSchedule: jsonb("monitoring_schedule"),
  baselineAssessments: jsonb("baseline_assessments"),
  warningBoxes: jsonb("warning_boxes"),
  contraindications: jsonb("contraindications"),
  drugInteractions: jsonb("drug_interactions"),
  specialPopulations: jsonb("special_populations"),
  pregnancyCategory: varchar("pregnancy_category", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Supportive Care Protocols
export const supportiveCareProtocols = pgTable("supportive_care_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // nausea, pain, infection, etc.
  indication: text("indication").notNull(),
  cancerType: varchar("cancer_type", { length: 100 }),
  treatmentPhase: varchar("treatment_phase", { length: 100 }),
  patientPopulation: varchar("patient_population", { length: 200 }),
  interventions: jsonb("interventions").notNull(),
  medications: jsonb("medications"),
  nonPharmacological: jsonb("non_pharmacological"),
  monitoringProtocol: jsonb("monitoring_protocol"),
  expectedOutcomes: jsonb("expected_outcomes"),
  adjustmentCriteria: jsonb("adjustment_criteria"),
  escalationCriteria: jsonb("escalation_criteria"),
  consultationTriggers: jsonb("consultation_triggers"),
  patientEducation: jsonb("patient_education"),
  caregiverInstructions: jsonb("caregiver_instructions"),
  qualityOfLifeConsiderations: jsonb("quality_of_life_considerations"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const antiemeticProtocols = pgTable("antiemetic_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  emetogenicRisk: varchar("emetogenic_risk", { length: 50 }).notNull(), // high, moderate, low, minimal
  treatmentRegimen: varchar("treatment_regimen", { length: 255 }),
  dayOfCycle: integer("day_of_cycle"),
  premedications: jsonb("premedications"),
  acutePhase: jsonb("acute_phase"), // 0-24 hours
  delayedPhase: jsonb("delayed_phase"), // 24-120 hours
  anticipatoryPhase: jsonb("anticipatory_phase"),
  breakthroughMedications: jsonb("breakthrough_medications"),
  contraindications: jsonb("contraindications"),
  drugInteractions: jsonb("drug_interactions"),
  sideEffects: jsonb("side_effects"),
  monitoringParameters: jsonb("monitoring_parameters"),
  patientInstructions: jsonb("patient_instructions"),
  efficacyMarkers: jsonb("efficacy_markers"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const painManagementProtocols = pgTable("pain_management_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  painType: varchar("pain_type", { length: 100 }).notNull(), // acute, chronic, breakthrough, neuropathic
  painSeverity: varchar("pain_severity", { length: 50 }), // mild, moderate, severe
  cancerType: varchar("cancer_type", { length: 100 }),
  painLocation: varchar("pain_location", { length: 100 }),
  painMechanism: varchar("pain_mechanism", { length: 100 }),
  assessmentTools: jsonb("assessment_tools"),
  pharmacologicalApproach: jsonb("pharmacological_approach"),
  nonPharmacologicalApproach: jsonb("non_pharmacological_approach"),
  interventionalOptions: jsonb("interventional_options"),
  opioidGuidelines: jsonb("opioid_guidelines"),
  adjuvantTherapies: jsonb("adjuvant_therapies"),
  sideEffectManagement: jsonb("side_effect_management"),
  monitoringProtocol: jsonb("monitoring_protocol"),
  escalationCriteria: jsonb("escalation_criteria"),
  specialConsiderations: jsonb("special_considerations"),
  patientEducation: jsonb("patient_education"),
  caregiverEducation: jsonb("caregiver_education"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Discharge Planning and Protocols
export const dischargeCriteria = pgTable("discharge_criteria", {
  id: uuid("id").primaryKey().defaultRandom(),
  criteriaName: varchar("criteria_name", { length: 255 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }),
  treatmentType: varchar("treatment_type", { length: 100 }),
  admissionType: varchar("admission_type", { length: 100 }),
  clinicalStabilityCriteria: jsonb("clinical_stability_criteria").notNull(),
  vitalSignRequirements: jsonb("vital_sign_requirements"),
  laboratoryRequirements: jsonb("laboratory_requirements"),
  symptomControl: jsonb("symptom_control"),
  functionalStatus: jsonb("functional_status"),
  socialRequirements: jsonb("social_requirements"),
  homeCareCriteria: jsonb("home_care_criteria"),
  medicationManagement: jsonb("medication_management"),
  followUpArrangements: jsonb("follow_up_arrangements"),
  transportationArrangements: jsonb("transportation_arrangements"),
  emergencyContactInfo: jsonb("emergency_contact_info"),
  redFlagSymptoms: jsonb("red_flag_symptoms"),
  patientEducationCompleted: boolean("patient_education_completed").default(false),
  caregiverEducationCompleted: boolean("caregiver_education_completed").default(false),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const followUpProtocols = pgTable("follow_up_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  treatmentPhase: varchar("treatment_phase", { length: 100 }),
  timeFrame: varchar("time_frame", { length: 100 }).notNull(), // 24-48 hours, 1 week, etc.
  contactMethod: varchar("contact_method", { length: 100 }), // phone, visit, telehealth
  assessmentComponents: jsonb("assessment_components").notNull(),
  vitalSignsRequired: boolean("vital_signs_required").default(false),
  laboratoryTests: jsonb("laboratory_tests"),
  imagingRequirements: jsonb("imaging_requirements"),
  symptomAssessment: jsonb("symptom_assessment"),
  medicationReview: jsonb("medication_review"),
  adherenceAssessment: jsonb("adherence_assessment"),
  toxicityAssessment: jsonb("toxicity_assessment"),
  functionalAssessment: jsonb("functional_assessment"),
  psychosocialAssessment: jsonb("psychosocial_assessment"),
  caregiverAssessment: jsonb("caregiver_assessment"),
  actionPlans: jsonb("action_plans"),
  escalationCriteria: jsonb("escalation_criteria"),
  documentationRequirements: jsonb("documentation_requirements"),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Daily Oncology Facts
export const dailyOncologyFacts = pgTable("daily_oncology_facts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  fact: text("fact").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // treatment, diagnosis, research, prevention, etc.
  source: varchar("source", { length: 100 }).notNull(), // NCCN, ASCO, ESMO
  sourceReference: varchar("source_reference", { length: 255 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  tags: text("tags").array(),
  difficulty: integer("difficulty").notNull(), // 1-5 scale
  isActive: boolean("is_active").default(true),
  displayDate: timestamp("display_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Daily Oncology Quiz
export const dailyOncologyQuiz = pgTable("daily_oncology_quiz", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of answer options
  correctAnswer: varchar("correct_answer", { length: 10 }).notNull(), // A, B, C, D
  explanation: text("explanation").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  subcategory: varchar("subcategory", { length: 100 }),
  source: varchar("source", { length: 100 }).notNull(), // NCCN, ASCO, ESMO
  sourceReference: varchar("source_reference", { length: 255 }),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  difficulty: integer("difficulty").notNull().default(5), // Fixed at 5/5 difficulty
  tags: text("tags").array(),
  isActive: boolean("is_active").default(true),
  displayDate: timestamp("display_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Quiz Responses (for tracking performance)
export const userQuizResponses = pgTable("user_quiz_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").references(() => users.id),
  quizId: uuid("quiz_id").references(() => dailyOncologyQuiz.id),
  selectedAnswer: varchar("selected_answer", { length: 10 }).notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent"), // seconds
  responseDate: timestamp("response_date").defaultNow(),
});

// Clinical Audit Trail System
export const clinicalDecisionAuditLog = pgTable("clinical_decision_audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  requestTimestamp: timestamp("request_timestamp").defaultNow(),
  criteria: jsonb("criteria").notNull(), // Complete selection criteria
  apiResponse: jsonb("api_response"), // API response (if successful)
  fallbackUsed: boolean("fallback_used").default(false),
  recommendationSource: varchar("recommendation_source", { length: 50 }), // api, cache, fallback, error
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }),
  decisionRationale: text("decision_rationale"),
  errorDetails: jsonb("error_details"), // Error information if applicable
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  responseTimeMs: integer("response_time_ms"),
  cacheHit: boolean("cache_hit").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Drug Interaction Matrix for Complex Biomarker Analysis
export const drugInteractionMatrix = pgTable("drug_interaction_matrix", {
  id: uuid("id").primaryKey().defaultRandom(),
  drug1: varchar("drug1", { length: 200 }).notNull(),
  drug2: varchar("drug2", { length: 200 }).notNull(),
  interactionType: varchar("interaction_type", { length: 50 }).notNull(), // major, moderate, minor, contraindicated
  mechanism: text("mechanism").notNull(),
  clinicalSignificance: text("clinical_significance").notNull(),
  management: text("management"),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  severity: integer("severity").notNull(), // 1-5 scale
  frequency: varchar("frequency", { length: 50 }), // rare, uncommon, common
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Biomarker Resistance Patterns
export const biomarkerResistancePatterns = pgTable("biomarker_resistance_patterns", {
  id: uuid("id").primaryKey().defaultRandom(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  primaryBiomarker: varchar("primary_biomarker", { length: 100 }).notNull(),
  resistanceMutation: varchar("resistance_mutation", { length: 100 }).notNull(),
  resistanceMechanism: text("resistance_mechanism").notNull(),
  timeToResistance: varchar("time_to_resistance", { length: 100 }), // median months
  alternativeTargets: text("alternative_targets").array(),
  nextLineOptions: jsonb("next_line_options").notNull(),
  biomarkerEvolution: jsonb("biomarker_evolution"), // temporal changes
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  nccnReference: varchar("nccn_reference", { length: 50 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Treatment Outcomes Data for Evidence Integration
export const treatmentOutcomesData = pgTable("treatment_outcomes_data", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocolName: varchar("protocol_name", { length: 255 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  stage: varchar("stage", { length: 20 }),
  biomarkerProfile: jsonb("biomarker_profile"),
  responseRate: decimal("response_rate", { precision: 5, scale: 2 }), // percentage
  progressionFreeSurvival: decimal("progression_free_survival", { precision: 5, scale: 2 }), // months
  overallSurvival: decimal("overall_survival", { precision: 5, scale: 2 }), // months
  toxicityProfile: jsonb("toxicity_profile"),
  studyType: varchar("study_type", { length: 50 }), // phase_i, phase_ii, phase_iii, real_world
  publicationDate: timestamp("publication_date"),
  evidenceStrength: varchar("evidence_strength", { length: 50 }),
  sampleSize: integer("sample_size"),
  followUpMonths: decimal("follow_up_months", { precision: 4, scale: 1 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Protocol Cache for Offline Functionality
export const protocolCache = pgTable("protocol_cache", {
  id: uuid("id").primaryKey().defaultRandom(),
  cacheKey: varchar("cache_key", { length: 255 }).notNull().unique(),
  cancerType: varchar("cancer_type", { length: 100 }).notNull(),
  protocolData: jsonb("protocol_data").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  version: varchar("version", { length: 50 }).default("1.0"),
  isActive: boolean("is_active").default(true),
  hitCount: integer("hit_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Treatment Plan Selector Tables (CDU Module) - Enhanced for Pan-Cancer Support
export const treatmentPlanCriteria = pgTable("treatment_plan_criteria", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // histology, biomarker, intent, line, reason, pdl1_status, genomic_alteration, previous_regimen, performance_status, resistance_mutation, molecular_subtype
  value: text("value").notNull(),
  description: text("description"),
  cancerSpecific: text("cancer_specific").array(), // Which cancer types this applies to
  clinicalContext: text("clinical_context"), // Additional context for complex criteria
  cutoffValue: text("cutoff_value"), // For PD-L1 percentages, biomarker thresholds
  isCommon: boolean("is_common").default(true), // Common vs advanced/rare
  sortOrder: integer("sort_order").default(1),
  parentCategory: text("parent_category"), // For hierarchical grouping
  evidenceLevel: text("evidence_level"), // FDA-approved, NCCN Category 1, 2A, 2B
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const treatmentPlanMappings = pgTable("treatment_plan_mappings", {
  id: serial("id").primaryKey(), // Changed to match actual DB structure
  cancerType: text("cancer_type").notNull(),
  histology: text("histology"),
  biomarkers: text("biomarkers").array(), // Array of biomarker strings
  treatmentIntent: text("treatment_intent"),
  lineOfTreatment: text("line_of_treatment"),
  treatmentProtocol: text("treatment_protocol").notNull(),
  evidenceReference: text("evidence_reference"), // Category 1, 2A, 2B
  nccnReference: text("nccn_reference"),
  conflictingBiomarkers: text("conflicting_biomarkers").array(), // Mutual exclusions
  requiredStage: text("required_stage").array(), // Array of applicable stages
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }), // 0.00-1.00
  requiresCombinationMatch: boolean("requires_combination_match").default(false),
  toxicityLevel: text("toxicity_level"), // Low, Moderate, High, Severe
  priorityTag: text("priority_tag"), // First-line, Preferred, Alternative, Last-resort
  performanceStatusMin: integer("performance_status_min"), // ECOG 0-4
  performanceStatusMax: integer("performance_status_max"), // ECOG 0-4
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertDailyOncologyFactSchema = createInsertSchema(dailyOncologyFacts);
export const insertDailyOncologyQuizSchema = createInsertSchema(dailyOncologyQuiz);
export const insertUserQuizResponseSchema = createInsertSchema(userQuizResponses);
export const insertTreatmentPlanCriteriaSchema = createInsertSchema(treatmentPlanCriteria).omit({
  id: true,
  createdAt: true,
  isActive: true,
});
export const insertTreatmentPlanMappingsSchema = createInsertSchema(treatmentPlanMappings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

// Enhanced schema exports
export const insertClinicalDecisionAuditLogSchema = createInsertSchema(clinicalDecisionAuditLog).omit({
  id: true,
  createdAt: true,
});
export const insertDrugInteractionMatrixSchema = createInsertSchema(drugInteractionMatrix).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertBiomarkerResistancePatternsSchema = createInsertSchema(biomarkerResistancePatterns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertTreatmentOutcomesDataSchema = createInsertSchema(treatmentOutcomesData).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertProtocolCacheSchema = createInsertSchema(protocolCache).omit({
  id: true,
  createdAt: true,
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
// Inpatient module types
export type AdmissionCriteria = typeof admissionCriteria.$inferSelect;
export type EmergencyScenario = typeof emergencyScenarios.$inferSelect;
export type EmergencyProtocol = typeof emergencyProtocols.$inferSelect;
export type AntibioticProtocol = typeof antibioticProtocols.$inferSelect;
export type MonitoringParameter = typeof monitoringParameters.$inferSelect;
export type DailyAssessmentProtocol = typeof dailyAssessmentProtocols.$inferSelect;
export type PerformanceStatusScale = typeof performanceStatusScales.$inferSelect;
export type AdverseEvent = typeof adverseEvents.$inferSelect;
export type AdverseEventManagement = typeof adverseEventManagement.$inferSelect;
export type DrugToxicityProfile = typeof drugToxicityProfiles.$inferSelect;
export type SupportiveCareProtocol = typeof supportiveCareProtocols.$inferSelect;
export type AntiemeticProtocol = typeof antiemeticProtocols.$inferSelect;
export type PainManagementProtocol = typeof painManagementProtocols.$inferSelect;
export type DischargeCriteria = typeof dischargeCriteria.$inferSelect;
export type FollowUpProtocol = typeof followUpProtocols.$inferSelect;
// Educational content types
export type EducationalTopic = typeof educationalTopics.$inferSelect;
export type InsertEducationalTopic = z.infer<typeof insertEducationalTopicSchema>;
export type ClinicalScenario = typeof clinicalScenarios.$inferSelect;
export type InsertClinicalScenario = z.infer<typeof insertClinicalScenarioSchema>;
export type Question = typeof questionBank.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
// Daily feature types
export type DailyOncologyFact = typeof dailyOncologyFacts.$inferSelect;
export type InsertDailyOncologyFact = z.infer<typeof insertDailyOncologyFactSchema>;
export type DailyOncologyQuiz = typeof dailyOncologyQuiz.$inferSelect;
export type InsertDailyOncologyQuiz = z.infer<typeof insertDailyOncologyQuizSchema>;
export type UserQuizResponse = typeof userQuizResponses.$inferSelect;
export type InsertUserQuizResponse = z.infer<typeof insertUserQuizResponseSchema>;
// Treatment Plan Selector types
export type TreatmentPlanCriteria = typeof treatmentPlanCriteria.$inferSelect;
export type InsertTreatmentPlanCriteria = z.infer<typeof insertTreatmentPlanCriteriaSchema>;
export type TreatmentPlanMapping = typeof treatmentPlanMappings.$inferSelect;
export type InsertTreatmentPlanMapping = z.infer<typeof insertTreatmentPlanMappingsSchema>;
// Enhanced audit and resilience types
export type ClinicalDecisionAuditLog = typeof clinicalDecisionAuditLog.$inferSelect;
export type InsertClinicalDecisionAuditLog = z.infer<typeof insertClinicalDecisionAuditLogSchema>;
export type DrugInteractionMatrix = typeof drugInteractionMatrix.$inferSelect;
export type InsertDrugInteractionMatrix = z.infer<typeof insertDrugInteractionMatrixSchema>;
export type BiomarkerResistancePattern = typeof biomarkerResistancePatterns.$inferSelect;
export type InsertBiomarkerResistancePattern = z.infer<typeof insertBiomarkerResistancePatternsSchema>;
export type TreatmentOutcomesData = typeof treatmentOutcomesData.$inferSelect;
export type InsertTreatmentOutcomesData = z.infer<typeof insertTreatmentOutcomesDataSchema>;
export type ProtocolCache = typeof protocolCache.$inferSelect;
export type InsertProtocolCache = z.infer<typeof insertProtocolCacheSchema>;

// =====================================================
// ENHANCED PALLIATIVE CARE TABLES
// =====================================================

// Validated Symptom Assessments (ESAS-R, IPOS, etc.)
export const validatedSymptomAssessments = pgTable("validated_symptom_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  assessmentType: varchar("assessment_type", { length: 100 }).notNull(),
  assessmentData: jsonb("assessment_data").notNull(),
  totalScore: decimal("total_score", { precision: 5, scale: 2 }),
  severityLevel: varchar("severity_level", { length: 50 }),
  clinicalInterpretation: text("clinical_interpretation"),
  aiAnalysis: jsonb("ai_analysis"),
  recommendedInterventions: jsonb("recommended_interventions"),
  followUpRequired: boolean("follow_up_required").default(false),
  nextAssessmentDate: timestamp("next_assessment_date"),
  nccnReference: varchar("nccn_reference", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Pain Phenotypes Assessment
export const painPhenotypes = pgTable("pain_phenotypes", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  painType: varchar("pain_type", { length: 100 }).notNull(),
  painMechanism: varchar("pain_mechanism", { length: 100 }),
  painLocation: jsonb("pain_location").notNull(),
  painQuality: jsonb("pain_quality"),
  painPattern: varchar("pain_pattern", { length: 100 }),
  painIntensityCurrent: integer("pain_intensity_current"),
  painIntensityWorst: integer("pain_intensity_worst"),
  painIntensityAverage: integer("pain_intensity_average"),
  painImpactFunction: jsonb("pain_impact_function"),
  painImpactMood: jsonb("pain_impact_mood"),
  triggeringFactors: jsonb("triggering_factors"),
  relievingFactors: jsonb("relieving_factors"),
  currentMedications: jsonb("current_medications"),
  previousTreatments: jsonb("previous_treatments"),
  comorbidities: jsonb("comorbidities"),
  assessmentToolsUsed: jsonb("assessment_tools_used"),
  aiPhenotypePrediction: jsonb("ai_phenotype_prediction"),
  recommendedApproach: jsonb("recommended_approach"),
  specialistReferralNeeded: boolean("specialist_referral_needed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Communication Logs (SPIKES, Goals of Care)
export const communicationLogs = pgTable("communication_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  communicationType: varchar("communication_type", { length: 100 }).notNull(),
  conversationFramework: varchar("conversation_framework", { length: 100 }),
  participants: jsonb("participants"),
  conversationContext: jsonb("conversation_context"),
  communicationSteps: jsonb("communication_steps"),
  patientUnderstanding: jsonb("patient_understanding"),
  emotionalResponses: jsonb("emotional_responses"),
  questionsConcerns: jsonb("questions_concerns"),
  decisionsMade: jsonb("decisions_made"),
  followUpPlanned: jsonb("follow_up_planned"),
  goalsIdentified: jsonb("goals_identified"),
  advanceDirectivesDiscussed: boolean("advance_directives_discussed").default(false),
  codeStatusDiscussed: boolean("code_status_discussed").default(false),
  culturalConsiderations: jsonb("cultural_considerations"),
  communicationBarriers: jsonb("communication_barriers"),
  interpreterUsed: boolean("interpreter_used").default(false),
  satisfactionRating: integer("satisfaction_rating"),
  aiCommunicationInsights: jsonb("ai_communication_insights"),
  improvementRecommendations: jsonb("improvement_recommendations"),
  nccnReference: varchar("nccn_reference", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Spiritual Assessments (FICA, HOPE)
export const spiritualAssessments = pgTable("spiritual_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  assessmentType: varchar("assessment_type", { length: 100 }).notNull(),
  faithTradition: varchar("faith_tradition", { length: 100 }),
  faithImportanceRating: integer("faith_importance_rating"),
  spiritualCommunity: varchar("spiritual_community", { length: 255 }),
  spiritualPractices: jsonb("spiritual_practices"),
  spiritualSupportSources: jsonb("spiritual_support_sources"),
  spiritualConcerns: jsonb("spiritual_concerns"),
  meaningMaking: jsonb("meaning_making"),
  hopeSources: jsonb("hope_sources"),
  forgivenessIssues: jsonb("forgiveness_issues"),
  endOfLifeBeliefs: jsonb("end_of_life_beliefs"),
  ritualPreferences: jsonb("ritual_preferences"),
  chaplaincyReferralNeeded: boolean("chaplaincy_referral_needed").default(false),
  chaplaincyReferralMade: boolean("chaplaincy_referral_made").default(false),
  spiritualCarePlan: jsonb("spiritual_care_plan"),
  culturalConsiderations: jsonb("cultural_considerations"),
  familySpiritualNeeds: jsonb("family_spiritual_needs"),
  aiSpiritualInsights: jsonb("ai_spiritual_insights"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Oncological Emergencies
export const oncologicalEmergencies = pgTable("oncological_emergencies", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  emergencyType: varchar("emergency_type", { length: 100 }).notNull(),
  presentationSymptoms: jsonb("presentation_symptoms").notNull(),
  severityLevel: varchar("severity_level", { length: 50 }).notNull(),
  timeToRecognition: varchar("time_to_recognition", { length: 100 }),
  diagnosticWorkup: jsonb("diagnostic_workup"),
  nccnProtocolFollowed: varchar("nccn_protocol_followed", { length: 100 }),
  immediateInterventions: jsonb("immediate_interventions"),
  responseToTreatment: jsonb("response_to_treatment"),
  complications: jsonb("complications"),
  specialistConsultations: jsonb("specialist_consultations"),
  imagingStudies: jsonb("imaging_studies"),
  laboratoryValues: jsonb("laboratory_values"),
  monitoringParameters: jsonb("monitoring_parameters"),
  familyNotification: boolean("family_notification").default(false),
  familyCommunicationLog: jsonb("family_communication_log"),
  dischargePlanning: jsonb("discharge_planning"),
  qualityMetrics: jsonb("quality_metrics"),
  lessonsLearned: jsonb("lessons_learned"),
  aiEmergencyAnalysis: jsonb("ai_emergency_analysis"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Quality Metrics Dashboard
export const palliativeQualityMetrics = pgTable("palliative_quality_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }),
  userId: uuid("user_id").references(() => users.id),
  metricCategory: varchar("metric_category", { length: 100 }).notNull(),
  metricName: varchar("metric_name", { length: 255 }).notNull(),
  metricValue: decimal("metric_value", { precision: 10, scale: 3 }),
  metricUnit: varchar("metric_unit", { length: 50 }),
  targetValue: decimal("target_value", { precision: 10, scale: 3 }),
  performanceLevel: varchar("performance_level", { length: 50 }),
  measurementPeriodStart: timestamp("measurement_period_start"),
  measurementPeriodEnd: timestamp("measurement_period_end"),
  patientPopulation: varchar("patient_population", { length: 255 }),
  nccnQualityIndicator: varchar("nccn_quality_indicator", { length: 100 }),
  dataSource: varchar("data_source", { length: 100 }),
  calculationMethod: text("calculation_method"),
  statisticalSignificance: decimal("statistical_significance", { precision: 5, scale: 3 }),
  confidenceInterval: jsonb("confidence_interval"),
  trendDirection: varchar("trend_direction", { length: 50 }),
  benchmarkComparison: jsonb("benchmark_comparison"),
  actionItems: jsonb("action_items"),
  responsibleTeam: jsonb("responsible_team"),
  improvementTimeline: jsonb("improvement_timeline"),
  aiQualityInsights: jsonb("ai_quality_insights"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Caregiver Assessments (Zarit Burden Interview)
export const caregiverAssessments = pgTable("caregiver_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  caregiverRelationship: varchar("caregiver_relationship", { length: 100 }),
  assessmentType: varchar("assessment_type", { length: 100 }).notNull(),
  burdenScore: integer("burden_score"),
  strainLevel: varchar("strain_level", { length: 50 }),
  physicalHealthImpact: jsonb("physical_health_impact"),
  emotionalHealthImpact: jsonb("emotional_health_impact"),
  socialImpact: jsonb("social_impact"),
  financialImpact: jsonb("financial_impact"),
  workImpact: jsonb("work_impact"),
  supportSystems: jsonb("support_systems"),
  copingStrategies: jsonb("coping_strategies"),
  educationalNeeds: jsonb("educational_needs"),
  respiteCareNeeds: boolean("respite_care_needs").default(false),
  professionalSupportNeeded: jsonb("professional_support_needed"),
  supportGroupInterest: boolean("support_group_interest").default(false),
  aiCaregiverInsights: jsonb("ai_caregiver_insights"),
  interventionPlan: jsonb("intervention_plan"),
  followUpSchedule: jsonb("follow_up_schedule"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Enhanced Psychosocial Assessments
export const enhancedPsychosocialAssessments = pgTable("enhanced_psychosocial_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => users.id),
  assessmentType: varchar("assessment_type", { length: 100 }).notNull(),
  depressionScore: integer("depression_score"),
  anxietyScore: integer("anxiety_score"),
  distressLevel: integer("distress_level"),
  suicideRiskLevel: varchar("suicide_risk_level", { length: 50 }),
  copingStrategies: jsonb("coping_strategies"),
  socialSupportNetwork: jsonb("social_support_network"),
  financialConcerns: jsonb("financial_concerns"),
  workConcerns: jsonb("work_concerns"),
  insuranceIssues: jsonb("insurance_issues"),
  transportationBarriers: jsonb("transportation_barriers"),
  childcareEldercareNeeds: jsonb("childcare_eldercare_needs"),
  housingStability: jsonb("housing_stability"),
  substanceUseHistory: jsonb("substance_use_history"),
  traumaHistory: jsonb("trauma_history"),
  mentalHealthHistory: jsonb("mental_health_history"),
  culturalFactors: jsonb("cultural_factors"),
  bodyImageConcerns: jsonb("body_image_concerns"),
  sexualityIntimacyConcerns: jsonb("sexuality_intimacy_concerns"),
  existentialConcerns: jsonb("existential_concerns"),
  aiPsychosocialInsights: jsonb("ai_psychosocial_insights"),
  interventionRecommendations: jsonb("intervention_recommendations"),
  referralNeeds: jsonb("referral_needs"),
  safetyPlanning: jsonb("safety_planning"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Insert schemas for new tables
export const insertValidatedSymptomAssessmentSchema = createInsertSchema(validatedSymptomAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPainPhenotypeSchema = createInsertSchema(painPhenotypes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommunicationLogSchema = createInsertSchema(communicationLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSpiritualAssessmentSchema = createInsertSchema(spiritualAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOncologicalEmergencySchema = createInsertSchema(oncologicalEmergencies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPalliativeQualityMetricSchema = createInsertSchema(palliativeQualityMetrics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCaregiverAssessmentSchema = createInsertSchema(caregiverAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEnhancedPsychosocialAssessmentSchema = createInsertSchema(enhancedPsychosocialAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Enhanced Palliative Care types
export type ValidatedSymptomAssessment = typeof validatedSymptomAssessments.$inferSelect;
export type InsertValidatedSymptomAssessment = z.infer<typeof insertValidatedSymptomAssessmentSchema>;
export type PainPhenotype = typeof painPhenotypes.$inferSelect;
export type InsertPainPhenotype = z.infer<typeof insertPainPhenotypeSchema>;
export type CommunicationLog = typeof communicationLogs.$inferSelect;
export type InsertCommunicationLog = z.infer<typeof insertCommunicationLogSchema>;
export type SpiritualAssessment = typeof spiritualAssessments.$inferSelect;
export type InsertSpiritualAssessment = z.infer<typeof insertSpiritualAssessmentSchema>;
export type OncologicalEmergency = typeof oncologicalEmergencies.$inferSelect;
export type InsertOncologicalEmergency = z.infer<typeof insertOncologicalEmergencySchema>;
export type PalliativeQualityMetric = typeof palliativeQualityMetrics.$inferSelect;
export type InsertPalliativeQualityMetric = z.infer<typeof insertPalliativeQualityMetricSchema>;
export type CaregiverAssessment = typeof caregiverAssessments.$inferSelect;
export type InsertCaregiverAssessment = z.infer<typeof insertCaregiverAssessmentSchema>;
export type EnhancedPsychosocialAssessment = typeof enhancedPsychosocialAssessments.$inferSelect;
export type InsertEnhancedPsychosocialAssessment = z.infer<typeof insertEnhancedPsychosocialAssessmentSchema>;
