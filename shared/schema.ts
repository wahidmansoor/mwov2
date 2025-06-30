import { pgTable, uuid, varchar, timestamp, integer, text, jsonb, boolean, numeric, date, index } from 'drizzle-orm/pg-core'
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Sessions & Users
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable('users', {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").default("oncologist"),
  department: text("department"),
  licenseNumber: text("license_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Breakthrough Pain
export const breakthroughPain = pgTable('breakthrough_pain', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }),
  onsetTime: timestamp('onset_time'),
  peakIntensity: integer('peak_intensity'),
  durationMinutes: integer('duration_minutes'),
  triggerFactors: text('trigger_factors'),
  reliefMeasures: text('relief_measures'),
  medicationTaken: varchar('medication_taken', { length: 255 }),
  effectivenessScore: integer('effectiveness_score'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Caregiver Scores
export const caregiverScores = pgTable('caregiver_scores', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }),
  caregiverName: varchar('caregiver_name', { length: 255 }),
  burdenScore: integer('burden_score'),
  stressLevel: varchar('stress_level', { length: 255 }),
  supportNeeds: jsonb('support_needs'),
  copingStrategies: jsonb('coping_strategies'),
  resourceUtilization: jsonb('resource_utilization'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Educational AI Interactions
export const educationalAiInteractions = pgTable('educational_ai_interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }),
  sessionId: uuid('session_id'),
  interactionType: varchar('interaction_type', { length: 255 }),
  userMessage: text('user_message'),
  aiResponse: text('ai_response'),
  contextData: jsonb('context_data'),
  confidenceScore: numeric('confidence_score'),
  feedbackRating: integer('feedback_rating'),
  learningImpact: varchar('learning_impact', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
})

// Exam Preparation
export const examPreparation = pgTable('exam_preparation', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }),
  examType: varchar('exam_type', { length: 255 }),
  targetDate: date('target_date'),
  preparationLevel: varchar('preparation_level', { length: 255 }),
  studyPlan: jsonb('study_plan'),
  progressTracking: jsonb('progress_tracking'),
  weakAreas: jsonb('weak_areas'),
  strongAreas: jsonb('strong_areas'),
  practiceScores: jsonb('practice_scores'),
  recommendedResources: jsonb('recommended_resources'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Goals of Care
export const goalsOfCare = pgTable('goals_of_care', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }),
  careGoals: jsonb('care_goals'),
  treatmentPreferences: jsonb('treatment_preferences'),
  advanceDirectives: jsonb('advance_directives'),
  decisionMakers: jsonb('decision_makers'),
  communicationPreferences: jsonb('communication_preferences'),
  qualityOfLifePriorities: jsonb('quality_of_life_priorities'),
  spiritualNeeds: text('spiritual_needs'),
  familyDynamics: text('family_dynamics'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Learning Progress
export const learningProgress = pgTable('learning_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }),
  topicId: uuid('topic_id'),
  completionPercentage: numeric('completion_percentage'),
  masteryLevel: varchar('mastery_level', { length: 255 }),
  timeSpentMinutes: integer('time_spent_minutes'),
  lastAccessed: timestamp('last_accessed'),
  knowledgeGaps: jsonb('knowledge_gaps'),
  strengths: jsonb('strengths'),
  recommendedNextTopics: jsonb('recommended_next_topics'),
  performanceMetrics: jsonb('performance_metrics'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Learning Sessions
export const learningSessions = pgTable('learning_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }),
  topicId: uuid('topic_id'),
  sessionType: varchar('session_type', { length: 255 }),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  durationMinutes: integer('duration_minutes'),
  questionsAttempted: integer('questions_attempted'),
  questionsCorrect: integer('questions_correct'),
  confidenceScores: jsonb('confidence_scores'),
  learningPath: varchar('learning_path', { length: 255 }),
  sessionData: jsonb('session_data'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Psychosocial Screening
export const psychosocialScreening = pgTable('psychosocial_screening', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }),
  screeningType: varchar('screening_type', { length: 255 }),
  screeningDate: timestamp('screening_date'),
  riskLevel: varchar('risk_level', { length: 255 }),
  identifiedConcerns: jsonb('identified_concerns'),
  interventionsNeeded: jsonb('interventions_needed'),
  referralsMade: jsonb('referrals_made'),
  followUpPlan: text('follow_up_plan'),
  screeningToolUsed: varchar('screening_tool_used', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Referral Tracking
export const referralTracking = pgTable('referral_tracking', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }),
  referralType: varchar('referral_type', { length: 255 }),
  specialty: varchar('specialty', { length: 255 }),
  providerName: varchar('provider_name', { length: 255 }),
  urgencyLevel: varchar('urgency_level', { length: 255 }),
  reasonForReferral: text('reason_for_referral'),
  referralDate: timestamp('referral_date'),
  appointmentScheduled: boolean('appointment_scheduled'),
  appointmentDate: timestamp('appointment_date'),
  status: varchar('status', { length: 255 }),
  outcome: text('outcome'),
  followUpNeeded: boolean('follow_up_needed'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Resource Links
export const resourceLinks = pgTable('resource_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: varchar('category', { length: 255 }),
  title: varchar('title', { length: 255 }),
  url: text('url'),
  description: text('description'),
  targetAudience: varchar('target_audience', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Session Logs
export const sessionLogs = pgTable('session_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }),
  userId: varchar('user_id', { length: 255 }),
  moduleName: varchar('module_name', { length: 255 }),
  activityType: varchar('activity_type', { length: 255 }),
  activityData: jsonb('activity_data'),
  timestamp: timestamp('timestamp').defaultNow(),
  durationMinutes: integer('duration_minutes'),
  outcomes: text('outcomes'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Schema exports for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBreakthroughPainSchema = createInsertSchema(breakthroughPain).omit({
  id: true,
  createdAt: true,
});

export const insertCaregiverScoresSchema = createInsertSchema(caregiverScores).omit({
  id: true,
  createdAt: true,
});

export const insertEducationalAiInteractionsSchema = createInsertSchema(educationalAiInteractions).omit({
  id: true,
  createdAt: true,
});

export const insertExamPreparationSchema = createInsertSchema(examPreparation).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGoalsOfCareSchema = createInsertSchema(goalsOfCare).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLearningProgressSchema = createInsertSchema(learningProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLearningSessionsSchema = createInsertSchema(learningSessions).omit({
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

export const insertResourceLinksSchema = createInsertSchema(resourceLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSessionLogsSchema = createInsertSchema(sessionLogs).omit({
  id: true,
  createdAt: true,
});

// UpsertUser type for Replit Auth
export type UpsertUser = typeof users.$inferInsert;

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Session = typeof sessions.$inferSelect;
export type BreakthroughPain = typeof breakthroughPain.$inferSelect;
export type InsertBreakthroughPain = z.infer<typeof insertBreakthroughPainSchema>;
export type CaregiverScores = typeof caregiverScores.$inferSelect;
export type InsertCaregiverScores = z.infer<typeof insertCaregiverScoresSchema>;
export type EducationalAiInteractions = typeof educationalAiInteractions.$inferSelect;
export type InsertEducationalAiInteractions = z.infer<typeof insertEducationalAiInteractionsSchema>;
export type ExamPreparation = typeof examPreparation.$inferSelect;
export type InsertExamPreparation = z.infer<typeof insertExamPreparationSchema>;
export type GoalsOfCare = typeof goalsOfCare.$inferSelect;
export type InsertGoalsOfCare = z.infer<typeof insertGoalsOfCareSchema>;
export type LearningProgress = typeof learningProgress.$inferSelect;
export type InsertLearningProgress = z.infer<typeof insertLearningProgressSchema>;
export type LearningSessions = typeof learningSessions.$inferSelect;
export type InsertLearningSessions = z.infer<typeof insertLearningSessionsSchema>;
export type PsychosocialScreening = typeof psychosocialScreening.$inferSelect;
export type InsertPsychosocialScreening = z.infer<typeof insertPsychosocialScreeningSchema>;
export type ReferralTracking = typeof referralTracking.$inferSelect;
export type InsertReferralTracking = z.infer<typeof insertReferralTrackingSchema>;
export type ResourceLinks = typeof resourceLinks.$inferSelect;
export type InsertResourceLinks = z.infer<typeof insertResourceLinksSchema>;
export type SessionLogs = typeof sessionLogs.$inferSelect;
export type InsertSessionLogs = z.infer<typeof insertSessionLogsSchema>;