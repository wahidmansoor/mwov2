import { pgTable, text, serial, integer, boolean, timestamp, uuid, jsonb, decimal, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User management with medical roles
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(), // medical_oncologist, radiation_oncologist, etc.
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
export type AuditLogEntry = typeof auditLog.$inferSelect;
