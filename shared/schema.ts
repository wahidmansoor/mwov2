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
