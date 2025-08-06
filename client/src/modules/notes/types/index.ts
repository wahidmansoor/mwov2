// REFACTOR: Extract and enhance type definitions with Zod validation
import { z } from 'zod';

// Note Type Schema with strict validation
export const NoteTypeSchema = z.enum(['progress', 'assessment', 'plan', 'review', 'consultation']);
export type NoteType = z.infer<typeof NoteTypeSchema>;

// Enhanced Note Entry Schema with comprehensive validation
export const NoteEntrySchema = z.object({
  id: z.string().min(1, "ID is required"),
  date: z.string().datetime("Invalid date format"),
  type: NoteTypeSchema,
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(10, "Content must be at least 10 characters").max(5000, "Content too long"),
  author: z.string().min(1, "Author is required").max(100, "Author name too long"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
  tags: z.array(z.string()).optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export type NoteEntry = z.infer<typeof NoteEntrySchema>;

// Report Type Schema
export const ReportTypeSchema = z.enum(['comprehensive', 'summary', 'progress', 'assessment']);
export type ReportType = z.infer<typeof ReportTypeSchema>;

// Report Settings Schema with validation
export const ReportSettingsSchema = z.object({
  patientId: z.string().optional(),
  reportType: ReportTypeSchema,
  dateRange: z.string().default('30'),
  includeRecommendations: z.boolean().default(true),
  format: z.enum(['json', 'pdf', 'text']).default('json'),
  anonymize: z.boolean().default(true),
});

export type ReportSettings = z.infer<typeof ReportSettingsSchema>;

// Compiled Report Schema
export const CompiledReportSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  reportType: ReportTypeSchema,
  dateRange: z.string(),
  sections: z.object({
    summary: z.string(),
    progressNotes: z.string(),
    assessmentAndPlan: z.string(),
    clinicalRecommendations: z.string(),
    metadata: z.object({
      totalNotes: z.number(),
      notesBreakdown: z.record(z.number()),
      generationTime: z.number(),
    }).optional(),
  }),
  generatedAt: z.string(),
  generatedBy: z.string(),
  version: z.string().default('1.0'),
});

export type CompiledReport = z.infer<typeof CompiledReportSchema>;

// Export Format Schema
export const ExportFormatSchema = z.enum(['pdf', 'docx', 'json', 'csv', 'hl7-fhir']);
export type ExportFormat = z.infer<typeof ExportFormatSchema>;

// Export Options Schema
export const ExportOptionsSchema = z.object({
  format: ExportFormatSchema,
  includeMetadata: z.boolean().default(true),
  dateRange: z.object({
    start: z.date().optional(),
    end: z.date().optional(),
  }).optional(),
  includeAttachments: z.boolean().default(false),
  anonymize: z.boolean().default(true),
  templateId: z.string().optional(),
});

export type ExportOptions = z.infer<typeof ExportOptionsSchema>;

// API Response Schema
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  timestamp: z.date().default(() => new Date()),
});

export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & {
  data?: T;
};

// Validation Helper Functions
export const validateNoteEntry = (data: unknown): NoteEntry => {
  return NoteEntrySchema.parse(data);
};

export const validateReportSettings = (data: unknown): ReportSettings => {
  return ReportSettingsSchema.parse(data);
};

export const validateExportOptions = (data: unknown): ExportOptions => {
  return ExportOptionsSchema.parse(data);
};
