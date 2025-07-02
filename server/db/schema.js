import { pgTable, text, timestamp, uuid, varchar, integer, boolean, jsonb, decimal } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Users table for authentication
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  passwordHash: varchar('password_hash', { length: 255 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Patients table
export const patients = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  mrn: varchar('mrn', { length: 50 }).notNull().unique(), // Medical Record Number
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  dateOfBirth: timestamp('date_of_birth').notNull(),
  gender: varchar('gender', { length: 20 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  emergencyContact: jsonb('emergency_contact'),
  insuranceInfo: jsonb('insurance_info'),
  medicalHistory: text('medical_history'),
  allergies: text('allergies'),
  currentMedications: jsonb('current_medications'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Cancer diagnoses
export const diagnoses = pgTable('diagnoses', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  primarySite: varchar('primary_site', { length: 100 }).notNull(),
  histology: varchar('histology', { length: 150 }),
  stage: varchar('stage', { length: 50 }),
  grade: varchar('grade', { length: 50 }),
  diagnosisDate: timestamp('diagnosis_date').notNull(),
  icdCode: varchar('icd_code', { length: 20 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Treatment plans
export const treatmentPlans = pgTable('treatment_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  diagnosisId: uuid('diagnosis_id').notNull().references(() => diagnoses.id),
  planName: varchar('plan_name', { length: 200 }).notNull(),
  intent: varchar('intent', { length: 50 }), // curative, palliative, adjuvant, etc.
  protocol: varchar('protocol', { length: 100 }),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Medications
export const medications = pgTable('medications', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  genericName: varchar('generic_name', { length: 200 }),
  category: varchar('category', { length: 100 }),
  class: varchar('class', { length: 100 }),
  mechanism: text('mechanism'),
  indications: text('indications'),
  contraindications: text('contraindications'),
  sideEffects: text('side_effects'),
  dosing: jsonb('dosing'),
  monitoring: text('monitoring'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Treatment sessions/cycles
export const treatmentSessions = pgTable('treatment_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  treatmentPlanId: uuid('treatment_plan_id').notNull().references(() => treatmentPlans.id),
  sessionNumber: integer('session_number').notNull(),
  cycle: integer('cycle'),
  scheduledDate: timestamp('scheduled_date').notNull(),
  actualDate: timestamp('actual_date'),
  status: varchar('status', { length: 50 }).notNull().default('scheduled'),
  medications: jsonb('medications'),
  dosages: jsonb('dosages'),
  premedications: jsonb('premedications'),
  notes: text('notes'),
  sideEffects: text('side_effects'),
  vitalSigns: jsonb('vital_signs'),
  labResults: jsonb('lab_results'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Lab results
export const labResults = pgTable('lab_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  testName: varchar('test_name', { length: 200 }).notNull(),
  testCode: varchar('test_code', { length: 50 }),
  result: varchar('result', { length: 100 }),
  unit: varchar('unit', { length: 50 }),
  referenceRange: varchar('reference_range', { length: 100 }),
  status: varchar('status', { length: 50 }),
  isAbnormal: boolean('is_abnormal').default(false),
  testDate: timestamp('test_date').notNull(),
  orderedBy: uuid('ordered_by').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Appointments
export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  providerId: uuid('provider_id').references(() => users.id),
  appointmentType: varchar('appointment_type', { length: 100 }).notNull(),
  scheduledDate: timestamp('scheduled_date').notNull(),
  duration: integer('duration').default(30), // minutes
  status: varchar('status', { length: 50 }).notNull().default('scheduled'),
  location: varchar('location', { length: 100 }),
  notes: text('notes'),
  reminderSent: boolean('reminder_sent').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Clinical notes
export const clinicalNotes = pgTable('clinical_notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  appointmentId: uuid('appointment_id').references(() => appointments.id),
  noteType: varchar('note_type', { length: 50 }).notNull(),
  title: varchar('title', { length: 200 }),
  content: text('content').notNull(),
  subjective: text('subjective'),
  objective: text('objective'),
  assessment: text('assessment'),
  plan: text('plan'),
  authorId: uuid('author_id').notNull().references(() => users.id),
  isLocked: boolean('is_locked').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Educational content
export const educationalContent = pgTable('educational_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 300 }).notNull(),
  category: varchar('category', { length: 100 }),
  type: varchar('type', { length: 50 }), // article, video, pdf, etc.
  content: text('content'),
  summary: text('summary'),
  tags: jsonb('tags'),
  targetAudience: varchar('target_audience', { length: 100 }),
  difficulty: varchar('difficulty', { length: 20 }),
  estimatedReadTime: integer('estimated_read_time'),
  isPublished: boolean('is_published').default(false),
  authorId: uuid('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// System logs for audit trail
export const systemLogs = pgTable('system_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entity: varchar('entity', { length: 100 }),
  entityId: uuid('entity_id'),
  details: jsonb('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// Type exports would be here for TypeScript projects
// For JavaScript, types are inferred at runtime
