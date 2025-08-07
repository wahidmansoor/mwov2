# 🔍 OncoVista AI - Complete Technical Audit & AI Rebuild Guide

## Document Overview
- **Created**: January 2025  
- **Purpose**: Comprehensive codebase audit with AI-friendly rebuild instructions
- **Scope**: Complete system architecture, modules, and deployment roadmap
- **Target**: AI coding assistants and development teams

---

# 📋 PART 1: FULL AUDIT SUMMARY ✅

## 🏗️ System Architecture Overview

**OncoVista AI** is a **medical-grade oncology clinical decision support platform** built with modern web technologies. It provides AI-powered clinical guidance, treatment planning, educational resources, and comprehensive workflow tools for oncology professionals.

### 🎯 Core Purpose
- **Primary Function**: Clinical decision support for oncology professionals
- **User Base**: Oncologists, nurses, residents, healthcare administrators
- **Data Policy**: Educational/demo use only (no real patient data)
- **Compliance**: HIPAA-ready architecture with anonymization protocols

## 📁 Project Structure Analysis

### Root Level Organization
```
OncoVista/
├── client/                    # React frontend application
├── server/                    # Express.js backend API
├── shared/                    # Shared TypeScript schemas and types
├── attached_assets/           # Medical content and guidelines
├── docs/                      # Comprehensive documentation
├── exports/                   # Database export utilities
├── migrations/                # Database migration scripts
├── netlify/                   # Netlify deployment functions
├── supabase/                  # Supabase database schemas
└── localhost-setup/           # Local development setup
```

### 🛠️ Technology Stack

#### Frontend Stack
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19 (fast development & hot reload)
- **Routing**: Wouter 3.3.5 (lightweight React router)
- **State Management**: Zustand 5.0.5 (simple state management)
- **Data Fetching**: TanStack React Query 5.60.5
- **UI Framework**: Radix UI + ShadCN UI components
- **Styling**: Tailwind CSS 3.4.17 + CSS custom properties
- **Icons**: Lucide React 0.453.0
- **Forms**: React Hook Form 7.55.0 with Zod validation
- **Charts**: Recharts 2.15.2 for analytics visualization

#### Backend Stack
- **Runtime**: Node.js with Express.js 4.21.2
- **Language**: TypeScript 5.6.3 with tsx runtime
- **Database**: PostgreSQL with Drizzle ORM 0.39.1
- **Session Management**: Express Session + Connect PG Simple
- **Authentication**: Replit Auth + local dev bypass
- **AI Integration**: OpenAI 5.5.1 + Anthropic SDK 0.37.0
- **Email**: Nodemailer 7.0.4 for notifications

#### Database & Storage
- **Primary Database**: PostgreSQL (Replit-hosted)
- **ORM**: Drizzle ORM with Zod validation
- **Migration Tool**: Drizzle Kit 0.30.4
- **Session Storage**: PostgreSQL sessions table
- **File Storage**: Replit filesystem for assets

#### Development Tools
- **Package Manager**: npm (lockfile v3)
- **TypeScript**: Strict mode enabled
- **Build System**: ESBuild 0.25.0 for server bundling
- **Dev Server**: Concurrent frontend (Vite) + backend (Express)
- **Environment**: Replit platform with auto-deployment

## 🧩 Module Architecture Analysis

### Core Modules (9 Primary Modules)

#### 1. 📋 OPD (Outpatient Department) Module
- **Location**: `client/src/modules/opd/`
- **Purpose**: Outpatient clinical workflow management
- **Key Features**:
  - Patient assessment tools
  - Treatment recommendation engine
  - Symptom tracking and evaluation
  - Clinical decision support integration
- **Components**: `OPDModuleEnhanced.tsx` (main), `OPDModuleClean.tsx` (backup)
- **Services**: AI-powered assessment, risk calculation
- **Database Integration**: `decisionSupportInputs` table

#### 2. 💊 CDU (Chemotherapy Day Unit) Module
- **Location**: `client/src/modules/cdu/`
- **Purpose**: Chemotherapy administration and treatment planning
- **Key Features**:
  - Treatment Plan Selector (75+ cancer types supported)
  - Dosage calculators and safety protocols
  - Medication management system
  - Biomarker integration and smart fallbacks
- **Components**: `CDUModule.tsx`, `TreatmentPlanSelector/`, `MedicationsSegment.tsx`
- **Database Integration**: `cdProtocols`, `treatmentProtocols`, `oncologyMedications`
- **Special Logic**: Complex treatment mapping with NCCN guidelines

#### 3. 🏥 Inpatient Oncology Module
- **Location**: `client/src/modules/inpatient/`
- **Purpose**: Inpatient care management and monitoring
- **Key Features**:
  - Admission assessments
  - Daily progress tracking
  - Discharge planning workflows
  - Complication management protocols
- **Database Schema**: `shared/inpatient-schema.ts`
- **Integration**: Hospital workflow systems

#### 4. 🕊️ Palliative Care Module
- **Location**: `client/src/modules/palliative/` & `client/src/modules/palliative-care/`
- **Purpose**: Comprehensive palliative and end-of-life care support
- **Key Features**:
  - Symptom management protocols
  - Quality of life assessments
  - Family support resources
  - Pain management calculators
  - Spiritual care coordination
- **Components**: `ComprehensivePalliativeCare.tsx`, specialized sub-modules
- **Enhanced Features**: Emergency care, communication tools, quality metrics

#### 5. 🤖 AI Chat Assistant Module
- **Location**: `client/src/modules/chat/`
- **Purpose**: Interactive AI-powered clinical guidance
- **Key Features**:
  - Natural language query processing
  - Real-time guideline lookup
  - Contextual medical recommendations
  - Learning from user interactions
- **AI Services**: OpenAI GPT integration with medical context
- **Database Tracking**: `aiInteractions` table for usage analytics

#### 6. ⚙️ Clinical Tools Module
- **Location**: `client/src/modules/tools/`
- **Purpose**: Specialized medical calculators and assessment tools
- **Key Features**:
  - Comprehensive dosage calculators
  - Risk assessment algorithms
  - Prognostic indicator tools
  - Biomarker interpretation utilities
- **Component**: `ComprehensiveClinicalTools.tsx`
- **Backend Integration**: `server/api/riskCalculation.ts`

#### 7. 📄 Notes Compiler & Export Module
- **Location**: `client/src/modules/notes/` & `client/src/modules/export/`
- **Purpose**: Clinical documentation management and export
- **Key Features**:
  - Multi-format export (PDF, JSON, CSV, HL7-FHIR)
  - Note compilation and analysis
  - Anonymization capabilities
  - Audit trail maintenance
- **Services**: `exportService.ts`, `reportCompiler.ts`
- **Export Formats**: JSON, PDF, CSV, HL7-FHIR compliance

#### 8. 📚 Oncology Education Module
- **Location**: `client/src/modules/education/`
- **Purpose**: AI-powered adaptive learning platform
- **Key Features**:
  - Interactive learning modules
  - Assessment and quiz systems
  - Progress tracking analytics
  - Personalized learning paths
- **AI Integration**: Adaptive content delivery
- **Analytics**: Learning performance tracking

#### 9. 📊 Analytics Dashboard Module
- **Location**: `client/src/modules/analytics/`
- **Purpose**: Usage analytics and clinical outcome tracking
- **Key Features**:
  - User engagement metrics
  - Clinical decision support usage
  - Performance monitoring dashboards
  - Quality indicator reporting
- **Visualization**: Recharts integration for data presentation

### 📖 Medical Handbook System
- **Location**: `client/src/modules/handbook/`
- **Structure**: Multi-discipline approach
  - Medical Oncology (`MedicalOncologyView.tsx`)
  - Radiation Oncology (`RadiationOncologyView.tsx`) 
  - Palliative Care (`PalliativeCareView.tsx`)
- **Content Management**: Markdown-based content system
- **Navigation**: Hierarchical chapter/section structure
- **Integration**: Evidence-based protocols from NCCN, ASCO, ESMO

## 🗄️ Database Schema Analysis

### Core Database Tables (15+ Tables)

#### Authentication & User Management
```typescript
// Users table - Replit Auth integration
users: {
  id: varchar (primary key)
  email: varchar (unique)
  firstName, lastName: varchar
  profileImageUrl: varchar
  role: text (default: "oncologist")
  department, licenseNumber: text
  isActive: boolean (default: true)
  createdAt, updatedAt: timestamp
}

// Sessions table - Replit Auth requirement
sessions: {
  sid: varchar (primary key)
  sess: jsonb
  expire: timestamp
}
```

#### Clinical Data Tables
```typescript
// Clinical protocols with versioning
clinicalProtocols: {
  id: uuid (primary key)
  name: varchar(255)
  version: varchar(50)
  protocolType: varchar(100)
  cancerType: varchar(100)
  stage: varchar(50)
  content: jsonb
  evidenceLevel: varchar(50)
  guidelineSource: varchar(100)
  createdBy: uuid (FK to users)
  status: varchar(50) default "active"
  approvalStatus: varchar(50) default "pending"
  approvedBy: uuid (FK to users)
  createdAt, updatedAt, approvedAt: timestamp
}

// Treatment protocols for CDU
treatmentProtocols: {
  id: uuid (primary key)
  protocolCode: varchar(100) unique
  tumourGroup: varchar(100)
  protocolName: varchar(255)
  indications: jsonb
  contraindications: jsonb
  dosingSchedule: jsonb
  toxicityProfile: jsonb
  monitoringRequirements: jsonb
  createdAt, updatedAt: timestamp
}

// Comprehensive CDU protocols
cdProtocols: {
  id: uuid (primary key)
  code: varchar(50) unique
  tumourGroup: varchar(100)
  tumourSupergroup: varchar(100)
  treatmentIntent: varchar(50)
  summary: text
  eligibility: jsonb
  precautions: jsonb
  treatment: jsonb
  tests: jsonb
  doseModifications: jsonb
  referenceList: jsonb
  cycleInfo: jsonb
  preMedications: jsonb
  postMedications: jsonb
  supportiveCare: jsonb
  rescueAgents: jsonb
  monitoring: jsonb
  toxicityMonitoring: jsonb
  interactions: jsonb
  contraindications: jsonb
  version: varchar(20)
  status: varchar(20) default "active"
  createdBy, updatedBy: uuid (FK to users)
  createdAt, updatedAt, lastReviewed: timestamp
}

// Comprehensive oncology medications database
oncologyMedications: {
  id: uuid (primary key)
  name: varchar(255)
  brandNames: jsonb
  classification: varchar(255)
  mechanism: text
  administration: text
  indications: jsonb
  dosing: jsonb
  sideEffects: jsonb
  monitoring: jsonb
  interactions: jsonb
  referenceSources: jsonb
  summary: text
  blackBoxWarning: text
  specialConsiderations: jsonb
  pharmacokinetics: jsonb
  contraindications: jsonb
  routineMonitoring: jsonb
  preTreatmentTests: jsonb
  isChemotherapy: boolean default false
  isImmunotherapy: boolean default false
  isTargetedTherapy: boolean default false
  isOrphanDrug: boolean default false
  createdAt, updatedAt: timestamp
}
```

#### NCCN Guidelines Integration
```typescript
// NCCN guidelines comprehensive storage
nccnGuidelines: {
  id: uuid (primary key)
  referenceCode: varchar(50) // BINV-1, DCIS-1, etc.
  title: varchar(500)
  category: varchar(100) // invasive, dcis, special_considerations
  cancerType: varchar(100) default "breast"
  version: varchar(50) default "4.2025"
  releaseDate: varchar(50)
  content: jsonb // Full guideline content
  evidenceLevel: varchar(50) // Category 1, 2A, 2B
  consensusLevel: varchar(50) // uniform, consensus
  applicableStages: jsonb // Array of cancer stages
  biomarkerRequirements: jsonb // HER2, ER, PR, etc.
  treatmentSettings: jsonb // adjuvant, neoadjuvant, metastatic
  specialPopulations: jsonb // pregnancy, elderly, male
  crossReferences: jsonb // Related NCCN sections
  evidenceReferences: jsonb // Scientific citations
  updatesFromPrevious: text // Version changes
  clinicalDecisionPoints: jsonb // Key decision nodes
  monitoringRequirements: jsonb // Follow-up protocols
  contraindications: jsonb // Safety considerations
  alternativeApproaches: jsonb // Other options
  qualityMeasures: jsonb // Performance indicators
  createdAt, updatedAt: timestamp
}
```

#### AI & Analytics Tables
```typescript
// AI interaction tracking
aiInteractions: {
  id: uuid (primary key)
  userId: uuid (FK to users)
  sessionId: varchar(255)
  moduleType: varchar(100)
  intent: varchar(100)
  inputContext: jsonb
  aiResponse: jsonb
  confidenceScore: decimal(3,2)
  userFeedback: varchar(50)
  responseTimeMs: integer
  modelVersion: varchar(100)
  createdAt: timestamp
}

// Anonymous clinical decision inputs
decisionSupportInputs: {
  id: uuid (primary key)
  sessionId: varchar(255) // Anonymous session
  ageGroup: varchar(50) // Age ranges, not exact
  symptoms: jsonb // Clinical symptoms
  riskFactors: jsonb // Risk factor patterns
  clinicalFindings: jsonb // Findings without identifiers
  aiAnalysis: jsonb // AI recommendations
  moduleType: varchar(50) // OPD, CDU, Palliative
  createdBy: uuid (FK to users) // Clinician using tool
  createdAt, updatedAt: timestamp
}

// Comprehensive audit trail
auditLog: {
  id: uuid (primary key)
  userId: uuid (FK to users)
  userRole: varchar(100)
  action: varchar(255)
  resource: varchar(255)
  resourceId: varchar(255)
  oldValues: jsonb
  newValues: jsonb
  ipAddress: text
  userAgent: text
  timestamp: timestamp
  sensitiveData: boolean default false
}
```

## 🔐 Authentication & Security Architecture

### Authentication Flow
1. **Production**: Replit Auth with OAuth integration
2. **Development**: Local bypass with mock user data
3. **Session Management**: PostgreSQL-backed sessions
4. **Role-Based Access Control (RBAC)**: Middleware-enforced permissions

### Security Features
- **Data Anonymization**: Built-in patient data anonymization
- **Audit Logging**: Comprehensive activity tracking
- **Auto-Logout**: Configurable timeout security
- **RBAC Middleware**: Permission-based access control
- **HIPAA-Ready**: Architecture designed for healthcare compliance

### Authentication Middleware Stack
```typescript
// authMiddleware.ts - Universal auth handler
// rbac.ts - Role-based access control
// localAuth.ts - Development mode bypass
// replitAuth.ts - Production Replit integration
```

## 🌐 API Routes & Endpoints

### Core API Structure
```typescript
// Authentication routes
GET  /api/auth/user           // Get current user data
GET  /api/auth/me             // Get user profile
GET  /api/dev-mode-check      // Development mode status
POST /api/local/login         // Local development login
GET  /api/local/logout        // Local development logout

// Clinical decision support
POST /api/patient-evaluations // Create clinical evaluation
GET  /api/patient-evaluations // List evaluations
GET  /api/clinical-protocols  // Get clinical protocols
POST /api/clinical-protocols  // Create new protocol

// AI integration
POST /api/ai/chat             // AI chat interactions
POST /api/ai/analyze          // Clinical analysis
GET  /api/ai/interactions     // AI usage history

// Treatment planning
GET  /api/treatments/protocols // Treatment protocols
POST /api/treatments/recommend // Treatment recommendations
GET  /api/medications         // Oncology medications database

// Analytics and reporting
GET  /api/analytics/usage     // Usage statistics
GET  /api/analytics/outcomes  // Clinical outcomes
POST /api/reports/generate    // Generate clinical reports

// NCCN guidelines
GET  /api/guidelines/nccn     // NCCN guidelines data
GET  /api/guidelines/search   // Search guidelines
POST /api/guidelines/update   // Update guidelines
```

## ⚙️ Build & Deployment Configuration

### Development Environment
```json
// package.json scripts
{
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "db:push": "drizzle-kit push",
  "check": "tsc"
}
```

### Vite Configuration
- **Root**: Client directory structure
- **Aliases**: `@` (client/src), `@shared` (shared), `@assets` (attached_assets)
- **Build Output**: `dist/public` for static assets
- **Development**: Hot reload with runtime error overlay

### Environment Variables
```bash
# Required for production
DATABASE_URL=postgresql://...
NODE_ENV=production

# Optional development
VITE_AUTH0_DOMAIN=...
VITE_AUTH0_CLIENT_ID=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# AI services
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
```

### Deployment Targets
1. **Primary**: Replit platform (auto-deployment)
2. **Netlify**: Serverless functions (`netlify/functions/`)
3. **Localhost**: Development setup (`localhost-setup/`)

## 🔍 Code Quality & Architecture Patterns

### Frontend Patterns
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Business logic abstraction (`useAuth`, `useAutoLogout`)
- **Form Management**: React Hook Form + Zod validation
- **Error Boundaries**: Comprehensive error handling
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query with caching

### Backend Patterns  
- **Service Layer**: Separated business logic (`services/`)
- **Middleware Chain**: Authentication → RBAC → Route handlers
- **Storage Abstraction**: Clean database interface (`storage.ts`)
- **Validation**: Zod schemas for API request/response
- **Error Handling**: Consistent error responses
- **Audit Logging**: Comprehensive activity tracking

### Database Patterns
- **Schema-First Design**: Drizzle schemas with TypeScript types
- **JSONB Usage**: Flexible clinical data storage
- **Versioning**: Protocol and guideline version management
- **Anonymization**: Privacy-first clinical data handling
- **Indexing**: Performance optimization for queries

## 🚨 Identified Issues & Areas for Improvement

### High Priority Issues
1. **Port Conflicts**: Development server occasionally fails to start
2. **Missing Error Handling**: Some API endpoints lack comprehensive error handling
3. **Incomplete Features**: Some TODO markers in treatment protocols
4. **Documentation Gaps**: Some modules lack comprehensive documentation

### Medium Priority Issues
1. **Performance Optimization**: Large JSONB queries could be optimized
2. **Caching Strategy**: Limited caching for frequently accessed data
3. **Testing Coverage**: Unit tests are minimal or missing
4. **Mobile Responsiveness**: Some modules need mobile optimization

### Low Priority Issues
1. **Code Organization**: Some modules could benefit from further refactoring
2. **Asset Management**: Attached assets could be better organized
3. **Logging Strategy**: More structured logging could be beneficial
4. **Monitoring**: Application performance monitoring not implemented

---

# 🧠 PART 2: AI-FRIENDLY REBUILD PROMPT

## Complete OncoVista AI Rebuild Instructions

You are tasked with building **OncoVista AI**, a comprehensive medical-grade oncology clinical decision support platform. This system provides AI-powered clinical guidance, treatment planning, educational resources, and workflow tools for oncology professionals.

### 🎯 Application Overview
- **Name**: OncoVista AI
- **Purpose**: Clinical decision support platform for oncology professionals
- **User Types**: Oncologists, nurses, residents, healthcare administrators
- **Data Policy**: Educational/demo use only (no real patient data)
- **Compliance**: HIPAA-ready with anonymization protocols

### 🏗️ Technical Architecture Requirements

#### Frontend Stack
Build a React 18+ application with TypeScript using:
- **Build Tool**: Vite (fast development with hot reload)
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: Zustand (simple, efficient state management)
- **Data Fetching**: TanStack React Query v5 (caching, background updates)
- **UI Framework**: Radix UI components + ShadCN UI system
- **Styling**: Tailwind CSS with custom CSS properties
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for analytics visualization

#### Backend Stack
Create an Express.js server with TypeScript using:
- **Runtime**: Node.js with tsx for development
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with Replit Auth integration
- **Session Storage**: PostgreSQL-backed sessions
- **AI Integration**: OpenAI API for clinical recommendations
- **Email**: Nodemailer for user notifications
- **Validation**: Zod schemas for API validation
- **Security**: RBAC middleware with audit logging

### 📋 Core Module Requirements

#### 1. Authentication System
Create a robust authentication system with:
- Replit Auth integration for production
- Local development bypass with mock users
- Session management with PostgreSQL storage
- Role-based access control (RBAC) middleware
- Auto-logout functionality with configurable timeout
- Comprehensive audit logging for all actions

#### 2. Dashboard & Navigation
Build a responsive dashboard with:
- Tab-based navigation between modules
- Role-based feature access
- Quick action shortcuts
- Daily oncology facts and quizzes
- Usage analytics overview
- Responsive design for mobile/tablet use

#### 3. OPD (Outpatient Department) Module
Develop an outpatient workflow system with:
- Patient assessment forms (anonymous clinical data only)
- AI-powered treatment recommendations
- Symptom tracking and evaluation tools
- Risk factor analysis
- Evidence-based protocol suggestions
- Clinical decision support integration

#### 4. CDU (Chemotherapy Day Unit) Module  
Create a comprehensive chemotherapy management system with:
- Treatment Plan Selector supporting 75+ cancer types
- Dynamic protocol selection based on clinical parameters
- Dosage calculators with safety validations
- Medication interaction checking
- Biomarker integration and interpretation
- NCCN guideline compliance checking
- Smart fallback logic for edge cases

#### 5. Inpatient Oncology Module
Build inpatient care management tools with:
- Admission assessment workflows
- Daily progress tracking forms
- Discharge planning checklists
- Complication management protocols
- Care team coordination tools
- Quality metrics tracking

#### 6. Palliative Care Module
Develop comprehensive palliative care support with:
- Symptom management protocols
- Quality of life assessment tools
- Pain management calculators
- Family support resources
- Spiritual care coordination
- End-of-life planning tools
- Emergency care protocols
- Communication assistance tools

#### 7. AI Chat Assistant
Implement an intelligent chat system with:
- Natural language processing for clinical queries
- Context-aware medical recommendations
- Real-time guideline lookup capabilities
- Multi-turn conversation handling
- Confidence scoring for recommendations
- User feedback collection and learning
- Integration with clinical knowledge bases

#### 8. Clinical Tools Module
Create specialized medical calculation tools with:
- Comprehensive dosage calculators
- Risk assessment algorithms
- Prognostic indicator calculations
- Biomarker interpretation tools
- Drug interaction checkers
- Toxicity prediction models
- Performance status assessments

#### 9. Notes Compiler & Export System
Build a clinical documentation system with:
- Multi-format export capabilities (PDF, JSON, CSV, HL7-FHIR)
- Note compilation and analysis
- Anonymization features for data protection
- Template-based report generation
- Audit trail maintenance
- Batch processing capabilities

#### 10. Medical Handbook System
Develop an interactive handbook with:
- Three main sections: Medical Oncology, Radiation Oncology, Palliative Care
- Hierarchical chapter/section navigation
- Markdown-based content management
- Search functionality across all content
- Interactive protocols and guidelines
- Evidence-based recommendations from NCCN, ASCO, ESMO

#### 11. Education Module
Create an AI-powered learning platform with:
- Interactive learning modules
- Adaptive content delivery based on user progress
- Assessment and quiz systems
- Performance analytics and tracking
- Personalized learning paths
- Continuing education credit tracking

#### 12. Analytics Dashboard
Build comprehensive analytics with:
- User engagement metrics
- Clinical decision support usage statistics
- AI interaction analytics
- Quality indicator reporting
- Performance benchmarking
- Export capabilities for reporting

### 🗄️ Database Schema Requirements

#### Core Tables
Create PostgreSQL tables using Drizzle ORM:

```typescript
// Authentication tables (required for Replit Auth)
sessions: { sid, sess, expire }
users: { id, email, firstName, lastName, profileImageUrl, role, department, licenseNumber, isActive, createdAt, updatedAt }

// Clinical data tables
clinicalProtocols: { id, name, version, protocolType, cancerType, stage, content, evidenceLevel, guidelineSource, createdBy, status, approvalStatus, approvedBy, createdAt, updatedAt, approvedAt }

treatmentProtocols: { id, protocolCode, tumourGroup, protocolName, indications, contraindications, dosingSchedule, toxicityProfile, monitoringRequirements, createdAt, updatedAt }

cdProtocols: { id, code, tumourGroup, tumourSupergroup, treatmentIntent, summary, eligibility, precautions, treatment, tests, doseModifications, referenceList, cycleInfo, preMedications, postMedications, supportiveCare, rescueAgents, monitoring, toxicityMonitoring, interactions, contraindications, version, status, createdBy, updatedBy, createdAt, updatedAt, lastReviewed }

oncologyMedications: { id, name, brandNames, classification, mechanism, administration, indications, dosing, sideEffects, monitoring, interactions, referenceSources, summary, blackBoxWarning, specialConsiderations, pharmacokinetics, contraindications, routineMonitoring, preTreatmentTests, isChemotherapy, isImmunotherapy, isTargetedTherapy, isOrphanDrug, createdAt, updatedAt }

// NCCN guidelines integration
nccnGuidelines: { id, referenceCode, title, category, cancerType, version, releaseDate, content, evidenceLevel, consensusLevel, applicableStages, biomarkerRequirements, treatmentSettings, specialPopulations, crossReferences, evidenceReferences, updatesFromPrevious, clinicalDecisionPoints, monitoringRequirements, contraindications, alternativeApproaches, qualityMeasures, createdAt, updatedAt }

// AI and analytics tables  
aiInteractions: { id, userId, sessionId, moduleType, intent, inputContext, aiResponse, confidenceScore, userFeedback, responseTimeMs, modelVersion, createdAt }

decisionSupportInputs: { id, sessionId, ageGroup, symptoms, riskFactors, clinicalFindings, aiAnalysis, moduleType, createdBy, createdAt, updatedAt }

auditLog: { id, userId, userRole, action, resource, resourceId, oldValues, newValues, ipAddress, userAgent, timestamp, sensitiveData }
```

Use JSONB fields for flexible clinical data storage and ensure all schemas include proper TypeScript types using Drizzle-Zod integration.

### 🌐 API Endpoints Requirements

Implement RESTful APIs with the following endpoints:

#### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/auth/me` - Get user profile
- `POST /api/local/login` - Development login
- `GET /api/local/logout` - Development logout

#### Clinical Decision Support
- `POST /api/patient-evaluations` - Create evaluation
- `GET /api/patient-evaluations` - List evaluations
- `GET /api/clinical-protocols` - Get protocols
- `POST /api/clinical-protocols` - Create protocol

#### AI Integration
- `POST /api/ai/chat` - Chat interactions
- `POST /api/ai/analyze` - Clinical analysis
- `GET /api/ai/interactions` - Usage history

#### Treatment Planning
- `GET /api/treatments/protocols` - Treatment protocols
- `POST /api/treatments/recommend` - Recommendations
- `GET /api/medications` - Medications database

#### Analytics & Reporting
- `GET /api/analytics/usage` - Usage statistics
- `GET /api/analytics/outcomes` - Clinical outcomes
- `POST /api/reports/generate` - Generate reports

### 🔐 Security & Compliance Features

Implement comprehensive security:
- **Authentication**: Multi-environment auth (Replit + local dev)
- **Authorization**: Role-based access control middleware
- **Data Protection**: Anonymization for clinical data
- **Audit Logging**: Complete activity tracking
- **Session Security**: Auto-logout with configurable timeout
- **HIPAA Readiness**: Architecture designed for healthcare compliance
- **Input Validation**: Zod schemas for all API requests
- **Error Handling**: Secure error responses without data leaks

### 🎨 UI/UX Requirements

Design a medical-grade interface with:
- **Professional Design**: Clean, clinical appearance
- **Responsive Layout**: Desktop, tablet, and mobile support
- **Accessibility**: WCAG 2.1 compliance
- **Dark Mode**: Theme switching capability
- **Color Coding**: Consistent visual hierarchy for clinical alerts
- **Loading States**: Skeleton screens and progress indicators
- **Error States**: User-friendly error messages and recovery
- **Touch Friendly**: Optimized for clinical tablet workflows

### 🚀 Deployment Requirements

Set up deployment for multiple platforms:
- **Primary**: Replit platform with auto-deployment
- **Netlify**: Serverless functions setup
- **Local Development**: Complete localhost setup
- **Environment Variables**: Comprehensive configuration management
- **Build Pipeline**: Vite + ESBuild optimization
- **Database Migrations**: Drizzle Kit integration

### 📊 Integration Requirements

Integrate with medical standards:
- **NCCN Guidelines**: Comprehensive guideline database
- **HL7-FHIR**: Healthcare interoperability standard
- **Medical Calculations**: Evidence-based clinical algorithms
- **AI Services**: OpenAI integration for clinical reasoning
- **Email Notifications**: User communication system

### 🧪 Quality Assurance

Implement quality controls:
- **TypeScript**: Strict type checking
- **Zod Validation**: Runtime type validation
- **Error Boundaries**: React error handling
- **Loading States**: Comprehensive loading management
- **Form Validation**: Client and server validation
- **Audit Trails**: Complete action logging

---

# 🗺️ PART 3: AI REBUILD ROADMAP

## Development Milestones & Implementation Plan

### 🏁 MILESTONE 1: Foundation & Backend Setup (Week 1-2)

#### 🔧 Backend Tasks
1. **Project Initialization**
   - Create TypeScript Node.js project with Express
   - Set up Vite configuration with aliases (`@`, `@shared`, `@assets`)
   - Configure ESBuild for server bundling
   - Initialize package.json with all required dependencies

2. **Database Schema & ORM Setup**
   - Install and configure Drizzle ORM with PostgreSQL
   - Create comprehensive schema in `shared/schema.ts`:
     - Sessions table (Replit Auth requirement)
     - Users table with role-based fields
     - Clinical protocols and treatment protocols
     - NCCN guidelines with comprehensive fields
     - AI interactions and decision support inputs
     - Audit log with security tracking
   - Generate TypeScript types using Drizzle-Zod
   - Set up database migrations with Drizzle Kit

3. **Authentication System**
   - Implement Replit Auth integration in `server/replitAuth.ts`
   - Create local development bypass in `server/localAuth.ts`
   - Build authentication middleware in `server/authMiddleware.ts`
   - Implement RBAC middleware in `server/middleware/rbac.ts`
   - Set up session management with PostgreSQL storage

4. **Core API Routes**
   - Create base Express server in `server/index.ts`
   - Implement authentication routes (`/api/auth/*`)
   - Build clinical decision support endpoints (`/api/patient-evaluations`)
   - Add AI integration routes (`/api/ai/*`)
   - Implement audit logging for all endpoints

**AI Prompt for Backend**: *"Create a TypeScript Express server with Drizzle ORM, PostgreSQL database, Replit Auth integration, RBAC middleware, and comprehensive API routes for a medical platform. Include session management, audit logging, and Zod validation."*

#### 🗄️ Database Tasks
1. **Schema Implementation**
   - Generate all 15+ database tables using Drizzle syntax
   - Implement foreign key relationships between tables
   - Add proper indexes for performance optimization
   - Create Zod schemas for validation

2. **Data Seeding**
   - Create seed scripts for oncology medications database
   - Import NCCN guidelines data structure
   - Set up treatment protocols for 75+ cancer types
   - Initialize clinical decision rules

**AI Prompt for Database**: *"Generate comprehensive PostgreSQL schemas using Drizzle ORM for a medical platform including users, clinical protocols, treatment data, NCCN guidelines, AI interactions, and audit logs. Include proper relationships, indexes, and TypeScript types."*

### 🏁 MILESTONE 2: Core Frontend Architecture (Week 2-3)

#### 🎨 Frontend Foundation
1. **React Application Setup**
   - Initialize React 18 with TypeScript and Vite
   - Configure Tailwind CSS with custom medical theme
   - Set up Radix UI + ShadCN component system
   - Install and configure Wouter for routing
   - Implement Zustand for state management

2. **Authentication & Layout**
   - Create authentication hooks (`useAuth`, `useAutoLogout`)
   - Build responsive Layout component with navigation
   - Implement role-based route protection
   - Create Landing Page and Dashboard components
   - Set up TanStack Query for data fetching

3. **Core UI Components**
   - Build reusable medical-grade UI components
   - Create form components with React Hook Form + Zod
   - Implement loading states and error boundaries
   - Design responsive navigation with mobile support
   - Add dark mode theme switching

**AI Prompt for Frontend Core**: *"Create a React 18 + TypeScript application with Vite, Tailwind CSS, Wouter routing, Zustand state management, and TanStack Query. Include authentication, responsive layout, medical-themed UI components, and comprehensive error handling."*

### 🏁 MILESTONE 3: Clinical Modules Development (Week 3-5)

#### 📋 Module Implementation Priority
1. **OPD Module (`client/src/modules/opd/`)**
   - Patient assessment forms with anonymous data collection
   - AI-powered risk assessment integration
   - Clinical decision support recommendations
   - Symptom tracking and evaluation tools

2. **CDU Module (`client/src/modules/cdu/`)**
   - Treatment Plan Selector with 75+ cancer type support
   - Dynamic protocol selection based on biomarkers
   - Dosage calculators with safety validations
   - Medication interaction checking system

3. **Palliative Care Module (`client/src/modules/palliative/`)**
   - Comprehensive symptom management protocols
   - Quality of life assessment tools
   - Pain management calculators
   - Family support and communication tools

4. **Inpatient Module (`client/src/modules/inpatient/`)**
   - Admission workflow management
   - Daily progress tracking systems
   - Discharge planning checklists
   - Care coordination tools

**AI Prompt for Clinical Modules**: *"Create React TypeScript modules for medical workflows including OPD patient assessment, CDU treatment planning with 75+ cancer types, comprehensive palliative care with symptom management, and inpatient workflow tools. Include forms, calculators, and AI integration."*

### 🏁 MILESTONE 4: AI Integration & Advanced Features (Week 5-6)

#### 🤖 AI-Powered Features
1. **AI Chat Assistant (`client/src/modules/chat/`)**
   - Natural language processing for clinical queries
   - Context-aware medical recommendations
   - Multi-turn conversation handling with memory
   - Confidence scoring and user feedback collection

2. **Clinical Decision Engine (`server/services/clinicalDecisionEngine.ts`)**
   - Evidence-based recommendation algorithms
   - NCCN guideline compliance checking
   - Risk stratification calculations
   - Treatment optimization suggestions

3. **AI Service Layer (`server/services/aiService.ts`)**
   - OpenAI API integration for clinical reasoning
   - Anthropic integration for complex analysis
   - Response caching and optimization
   - Usage analytics and monitoring

**AI Prompt for AI Integration**: *"Implement AI-powered clinical decision support using OpenAI API including chat assistant, clinical reasoning engine, guideline compliance checking, and comprehensive analytics. Include context management and confidence scoring."*

### 🏁 MILESTONE 5: Documentation & Tools (Week 6-7)

#### 📚 Educational & Documentation Systems
1. **Medical Handbook (`client/src/modules/handbook/`)**
   - Three-section handbook (Medical, Radiation, Palliative Oncology)
   - Markdown-based content management system
   - Interactive navigation with search functionality
   - Evidence-based protocol integration

2. **Education Module (`client/src/modules/education/`)**
   - Adaptive learning platform with AI personalization
   - Assessment and quiz system with progress tracking
   - Continuing education credit management
   - Performance analytics dashboard

3. **Clinical Tools (`client/src/modules/tools/`)**
   - Comprehensive medical calculators
   - Risk assessment algorithms
   - Biomarker interpretation tools
   - Drug interaction checkers

**AI Prompt for Educational Tools**: *"Create comprehensive medical education platform with adaptive learning, interactive handbook system, clinical calculators, and assessment tools. Include markdown content management and AI-powered personalization."*

### 🏁 MILESTONE 6: Export & Analytics (Week 7-8)

#### 📄 Export & Reporting Systems
1. **Notes Compiler (`client/src/modules/notes/`)**
   - Multi-format export system (PDF, JSON, CSV, HL7-FHIR)
   - Clinical note compilation and analysis
   - Anonymization features for data protection
   - Template-based report generation

2. **Analytics Dashboard (`client/src/modules/analytics/`)**
   - User engagement and usage metrics
   - Clinical decision support analytics
   - AI interaction performance monitoring
   - Quality indicator reporting with visualizations

3. **Export Services (`client/src/modules/export/`)**
   - Batch processing capabilities
   - Audit trail maintenance
   - Healthcare standard compliance (HL7-FHIR)
   - Secure data handling protocols

**AI Prompt for Export Systems**: *"Build comprehensive clinical documentation and analytics system with multi-format export (PDF, HL7-FHIR, CSV), usage analytics dashboard, report compilation, and healthcare compliance features."*

### 🏁 MILESTONE 7: Integration Testing & Optimization (Week 8-9)

#### 🧪 Testing & Quality Assurance
1. **Integration Testing**
   - API endpoint testing with clinical scenarios
   - Database integrity and performance testing
   - AI service integration validation
   - Authentication and security testing

2. **Performance Optimization**
   - Database query optimization for JSONB fields
   - Frontend bundle size optimization
   - API response caching implementation
   - Mobile performance testing and optimization

3. **Security Audit**
   - RBAC permission validation
   - Data anonymization testing
   - Audit log verification
   - Security vulnerability assessment

**AI Prompt for Testing**: *"Create comprehensive integration tests for medical platform including API endpoints, database operations, AI services, authentication flows, and security validation. Include performance optimization and mobile testing."*

### 🏁 MILESTONE 8: Deployment & Documentation (Week 9-10)

#### 🚀 Production Deployment
1. **Multi-Platform Deployment**
   - Replit platform configuration with auto-deployment
   - Netlify serverless functions setup
   - Environment variable management
   - Database migration deployment

2. **Documentation & Guides**
   - Complete API documentation
   - User manual for clinical staff
   - Administrator setup guide
   - Troubleshooting and support documentation

3. **Monitoring & Maintenance**
   - Application performance monitoring
   - Error tracking and alerting
   - Usage analytics implementation
   - Automated backup systems

**AI Prompt for Deployment**: *"Set up production deployment for medical platform on multiple platforms (Replit, Netlify) with comprehensive documentation, monitoring, error tracking, and automated maintenance systems."*

## 📋 Implementation Checklist

### ✅ Backend Completion Criteria
- [ ] PostgreSQL database with 15+ tables using Drizzle ORM
- [ ] Replit Auth + local dev authentication system
- [ ] Comprehensive API with 25+ endpoints
- [ ] RBAC middleware with audit logging
- [ ] AI service integration (OpenAI + Anthropic)
- [ ] Email notification system
- [ ] Clinical decision engine with NCCN guidelines

### ✅ Frontend Completion Criteria
- [ ] React 18 + TypeScript with Vite build system
- [ ] 12+ fully functional clinical modules
- [ ] Responsive design with mobile optimization
- [ ] Dark mode theme switching
- [ ] Comprehensive form validation with Zod
- [ ] TanStack Query data management
- [ ] Medical-grade UI components

### ✅ Integration Completion Criteria
- [ ] Multi-format export system (PDF, HL7-FHIR, CSV, JSON)
- [ ] AI-powered clinical recommendations
- [ ] Real-time analytics dashboard
- [ ] Comprehensive audit trails
- [ ] Healthcare compliance features
- [ ] Performance monitoring

### ✅ Deployment Completion Criteria
- [ ] Production deployment on Replit platform
- [ ] Netlify serverless function deployment
- [ ] Complete documentation suite
- [ ] Automated testing pipeline
- [ ] Security validation and compliance
- [ ] Performance optimization and monitoring

---

## 🎯 Final Notes for AI Implementation

This rebuild guide provides comprehensive instructions for recreating OncoVista AI from scratch. Each milestone includes specific AI prompts that can be used with coding assistants to generate the required components. The system architecture emphasizes:

- **Medical-grade quality** with proper validation and security
- **Scalable architecture** supporting multiple deployment platforms  
- **Comprehensive clinical workflows** for real-world oncology practice
- **AI-powered decision support** with evidence-based recommendations
- **Healthcare compliance** with anonymization and audit trails
- **Professional user experience** optimized for clinical environments

The roadmap ensures systematic development from foundation to deployment, with each milestone building upon the previous work to create a complete, production-ready medical platform.

---

*Document prepared for AI coding assistants and development teams*  
*OncoVista AI Technical Architecture Team - January 2025*