# OncoVista AI - Database Table and Module Mapping Documentation

This document provides a comprehensive mapping of OncoVista platform modules, their segments/sections, and corresponding database tables. This is essential for understanding data flow, API endpoints, and system architecture.

## Table of Contents
1. [Overview](#overview)
2. [Core Module Mappings](#core-module-mappings)
3. [Database Schema Summary](#database-schema-summary)
4. [Cross-Module Data Relationships](#cross-module-data-relationships)
5. [API Endpoint Mappings](#api-endpoint-mappings)

---

## Overview

OncoVista AI uses PostgreSQL with Drizzle ORM for data management. Each module connects to specific database tables that store relevant clinical data, user interactions, and system configurations.

**Key Database Design Principles:**
- Anonymous clinical decision support (no patient identifiers)
- Comprehensive audit logging for compliance
- Evidence-based guideline storage
- Role-based access control integration

---

## Core Module Mappings

### 1. OPD (Outpatient Department) Module

**Module Segments:**
- Screening Protocols
- Risk Assessment
- Diagnostic Workflows
- NCCN Protocol Integration
- Biomarker Testing

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `clinical_protocols` | Diagnostic and screening protocols | Protocol steps, evidence levels, approval status |
| `nccn_guidelines` | NCCN clinical guidelines integration | Guidelines by cancer type, version info, recommendations |
| `biomarker_guidelines` | Biomarker testing protocols | Test requirements, interpretation guidelines |
| `clinical_decision_support` | AI-driven recommendations | Decision trees, confidence scores, evidence references |
| `decision_support_inputs` | Anonymous clinical inputs | Age groups, symptoms, risk factors, clinical findings |
| `audit_log` | Compliance and activity tracking | User actions, access logs, protocol adherence |

**API Endpoints:**
- `/api/opd/protocols` → `clinical_protocols`
- `/api/nccn-guidelines` → `nccn_guidelines`
- `/api/biomarker-guidelines` → `biomarker_guidelines`
- `/api/decision-support` → `clinical_decision_support`

---

### 2. CDU (Cancer Day Unit) Module

**Module Segments:**
- Treatment Plan Selector
- Dosage Calculator
- CD Protocols
- Drug Safety Monitoring
- Toxicity Management

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `cd_protocols` | Cancer Day Unit treatment protocols | Protocol names, indications, drug combinations, dosing |
| `treatment_plan_criteria` | Treatment selection criteria | Histology types, biomarkers, treatment lines |
| `treatment_plan_mappings` | Protocol matching logic | Criteria-to-protocol mappings |
| `oncology_medications` | Comprehensive drug database | Drug info, dosing, interactions, safety profiles |
| `ai_interactions` | AI recommendation tracking | Query types, responses, confidence levels |
| `decision_support_inputs` | Treatment planning inputs | Clinical parameters, biomarker status |

**API Endpoints:**
- `/api/cd-protocols` → `cd_protocols`
- `/api/treatment-criteria` → `treatment_plan_criteria`
- `/api/treatment-plan-mappings` → `treatment_plan_mappings`
- `/api/medications` → `oncology_medications`
- `/api/ai-interactions` → `ai_interactions`

---

### 3. Inpatient Oncology Module

**Module Segments:**
- Admission Protocols
- Emergency Management
- Monitoring Workflows
- Discharge Planning
- Complication Management

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `clinical_protocols` | Inpatient management protocols | Admission criteria, monitoring schedules |
| `treatment_protocols` | Inpatient treatment regimens | Emergency protocols, supportive care |
| `ai_interactions` | Clinical decision support | Urgent recommendations, risk stratification |
| `audit_log` | Patient safety tracking | Critical decisions, protocol compliance |
| `nccn_guidelines` | Evidence-based protocols | Inpatient management guidelines |

**API Endpoints:**
- `/api/inpatient/protocols` → `clinical_protocols`
- `/api/treatment-protocols` → `treatment_protocols`
- `/api/emergency-protocols` → `clinical_protocols` (filtered)

---

### 4. Palliative Care Module

**Module Segments:**
- Symptom Assessment
- Pain Management
- Psychosocial Support
- Quality of Life
- End-of-Life Care

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `palliative_care_assessments` | Symptom tracking and management | Assessment tools, symptom scores, interventions |
| `clinical_protocols` | Palliative care protocols | Pain management, symptom control protocols |
| `treatment_protocols` | Supportive care regimens | Medication protocols, non-pharmacological interventions |
| `ai_interactions` | Palliative care recommendations | Symptom management suggestions |
| `decision_support_inputs` | Assessment data | Symptom severity, functional status |

**API Endpoints:**
- `/api/palliative/assessments` → `palliative_care_assessments`
- `/api/palliative/protocols` → `clinical_protocols` (filtered)
- `/api/symptom-management` → `treatment_protocols` (filtered)

---

### 5. AI Chat Assistant Module

**Module Segments:**
- Guideline Queries
- Clinical Recommendations
- Evidence Synthesis
- Interactive Support

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `ai_interactions` | Chat history and analysis | Queries, responses, context, confidence |
| `nccn_guidelines` | Reference guidelines | Searchable clinical content |
| `clinical_decision_support` | Decision support data | Evidence-based recommendations |
| `audit_log` | AI usage tracking | Query patterns, user interactions |

**API Endpoints:**
- `/api/chat/query` → `ai_interactions`
- `/api/chat/guidelines` → `nccn_guidelines`
- `/api/chat/history` → `ai_interactions` (filtered)

---

### 6. Clinical Tools Module

**Module Segments:**
- BSA Calculator
- GFR Calculator
- Red Flag Alerts
- Lab Interpretation
- Risk Assessment

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `clinical_calculations` | Calculator results and validations | Calculation inputs, outputs, formulas |
| `clinical_protocols` | Clinical alert criteria | Red flag definitions, thresholds |
| `ai_interactions` | Tool usage analytics | Calculator usage, interpretation requests |
| `decision_support_inputs` | Calculation inputs | Patient parameters, lab values |

**API Endpoints:**
- `/api/calculators/bsa` → `clinical_calculations`
- `/api/calculators/gfr` → `clinical_calculations`
- `/api/red-flags` → `clinical_protocols` (filtered)

---

### 7. Notes Export Module

**Module Segments:**
- Clinical Documentation
- Template Generation
- Export Functionality
- Documentation Standards

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `clinical_notes_templates` | Documentation templates | Template structures, required fields |
| `export_logs` | Export activity tracking | Export requests, templates used |
| `audit_log` | Documentation compliance | Template usage, export history |

**API Endpoints:**
- `/api/export/templates` → `clinical_notes_templates`
- `/api/export/generate` → Multiple tables (data aggregation)
- `/api/export/history` → `export_logs`

---

### 8. Analytics Dashboard Module

**Module Segments:**
- Usage Metrics
- Performance Analytics
- Compliance Tracking
- Training Insights

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `analytics_metrics` | Platform usage statistics | Module usage, feature adoption |
| `audit_log` | Comprehensive activity log | All user interactions, timestamps |
| `ai_interactions` | AI performance metrics | Accuracy, user satisfaction |
| `training_progress` | Educational analytics | Learning completion, assessment scores |

**API Endpoints:**
- `/api/analytics/dashboard` → `analytics_metrics`
- `/api/analytics/usage` → `audit_log` (aggregated)
- `/api/analytics/ai-performance` → `ai_interactions` (analyzed)

---

### 9. Oncology Education Module

**Module Segments:**
- AI Teaching Assistant
- Learning Analytics
- Question Generation
- Progress Tracking

**Connected Database Tables:**

| Table Name | Purpose | Key Data |
|------------|---------|----------|
| `educational_topics` | Learning content organization | Topics, difficulty levels, learning objectives |
| `clinical_scenarios` | Case-based learning | Patient scenarios, decision points |
| `question_bank` | Assessment questions | Questions, answers, explanations |
| `learning_progress` | Student progress tracking | Completion rates, performance metrics |
| `ai_interactions` | Educational AI conversations | Teaching interactions, feedback |

**API Endpoints:**
- `/api/education/topics` → `educational_topics`
- `/api/education/scenarios` → `clinical_scenarios`
- `/api/education/questions` → `question_bank`
- `/api/education/progress` → `learning_progress`

---

## Database Schema Summary

### Authentication & User Management
- `users` - User profiles and authentication
- `sessions` - Session management (Replit Auth)
- `approval_logs` - Admin approval workflow tracking

### Clinical Data Core
- `nccn_guidelines` - Evidence-based clinical guidelines
- `clinical_protocols` - Institutional protocols and procedures
- `treatment_protocols` - Treatment regimens and protocols
- `clinical_decision_support` - AI-driven recommendations
- `biomarker_guidelines` - Biomarker testing and interpretation

### Module-Specific Tables
- `cd_protocols` - Cancer Day Unit specific protocols
- `oncology_medications` - Comprehensive drug database
- `treatment_plan_criteria` - Treatment selection criteria
- `treatment_plan_mappings` - Protocol matching logic
- `palliative_care_assessments` - Palliative care evaluations
- `educational_topics` - Learning content structure
- `clinical_scenarios` - Educational case studies
- `question_bank` - Assessment and evaluation questions

### System & Analytics
- `decision_support_inputs` - Anonymous clinical input data
- `ai_interactions` - AI conversation and recommendation logs
- `audit_log` - Comprehensive system activity tracking
- `analytics_metrics` - Platform usage and performance data
- `learning_progress` - Educational progress tracking

---

## Cross-Module Data Relationships

### Shared Data Elements
1. **NCCN Guidelines** (`nccn_guidelines`)
   - Used by: OPD, CDU, Inpatient, Palliative, AI Chat, Education
   - Purpose: Standardized evidence-based recommendations

2. **Clinical Decision Support** (`clinical_decision_support`)
   - Used by: All clinical modules
   - Purpose: AI-driven recommendations and decision trees

3. **Audit Logging** (`audit_log`)
   - Used by: All modules
   - Purpose: Compliance, security, and performance tracking

4. **AI Interactions** (`ai_interactions`)
   - Used by: CDU, Chat Assistant, Clinical Tools, Education
   - Purpose: AI conversation tracking and performance analysis

### Data Flow Patterns
1. **Clinical Input → AI Analysis → Recommendation → Audit**
2. **Guideline Query → Evidence Retrieval → Decision Support → Logging**
3. **Educational Content → Progress Tracking → Analytics → Improvement**

---

## API Endpoint Mappings

### Authentication Endpoints
```
GET  /api/auth/user           → users
POST /api/auth/register       → users, approval_logs
GET  /api/admin/pending-users → users (filtered)
POST /api/admin/approve-user  → users, approval_logs
```

### Clinical Data Endpoints
```
GET  /api/nccn-guidelines             → nccn_guidelines
GET  /api/clinical-protocols         → clinical_protocols
GET  /api/biomarker-guidelines       → biomarker_guidelines
POST /api/decision-support           → clinical_decision_support, decision_support_inputs
```

### Module-Specific Endpoints
```
# CDU Module
GET  /api/cd-protocols               → cd_protocols
GET  /api/treatment-criteria         → treatment_plan_criteria
POST /api/generate-recommendation    → treatment_plan_mappings, ai_interactions

# Education Module
GET  /api/education/topics           → educational_topics
GET  /api/education/scenarios        → clinical_scenarios
GET  /api/education/questions        → question_bank
POST /api/education/progress         → learning_progress

# Analytics
GET  /api/dashboard/stats            → analytics_metrics, audit_log
GET  /api/dashboard/activities       → audit_log (filtered)
```

---

## Usage Guidelines

### For Developers
1. **Always use the storage interface** defined in `server/storage.ts`
2. **Maintain data consistency** across related tables
3. **Implement proper error handling** for database operations
4. **Follow audit logging** requirements for compliance

### For Database Operations
1. **Use Drizzle ORM** for all database interactions
2. **Implement proper indexing** for performance
3. **Maintain referential integrity** between related tables
4. **Regular backup and monitoring** of critical data

### For API Development
1. **Validate input data** using Zod schemas
2. **Implement proper authentication** middleware
3. **Follow RESTful conventions** for endpoint design
4. **Include comprehensive error responses**

---

## Maintenance Notes

- **Database migrations** should be managed through Drizzle
- **Schema changes** require updates to both storage interface and API routes
- **New modules** should follow established patterns for database integration
- **Performance monitoring** should focus on frequently accessed tables

Last Updated: June 30, 2025