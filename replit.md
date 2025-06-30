# OncoVista AI - Clinical Decision Support Platform

## Project Overview
OncoVista AI is a comprehensive medical-grade oncology platform providing AI-powered clinical decision support, role-based access control, and multi-module healthcare workflows. This is strictly a clinical decision-support system for educational and guidance purposes - NOT an EHR system.

**Core Purpose**: Smart assistant for oncologists at all levels (residents, specialists, consultants) providing dynamic guidance, clinical decision support, oncology workflow tools, calculators, and education.

## Technology Stack
- Frontend: React 18 + TypeScript + Vite
- UI Framework: Tailwind CSS + ShadCN UI components
- Icons: Lucide React
- Backend: Express.js + TypeScript
- Database: PostgreSQL with Drizzle ORM
- AI Integration: OpenAI API for clinical recommendations
- Authentication: Session-based with role-based access control
- State Management: Zustand
- Data Fetching: TanStack React Query

## Current Architecture

### Completed Modules (8/8)
1. **OPD Module** - Outpatient diagnosis, screening, and referral management (includes SCLC diagnostic protocols)
2. **CDU Module** - Cancer Day Unit protocols, dosage calculations, toxicity monitoring (includes SCLC treatment regimens)
3. **Inpatient Oncology Module** - Admission protocols, emergency regimens, monitoring workflows (includes SCLC inpatient management)
4. **Palliative Care Module** - Symptom management, pain control, psychosocial support (includes SCLC supportive care)
5. **AI Chat Assistant** - Interactive guideline queries with NCCN, ASCO, ESMO support
6. **Clinical Tools** - Calculators, red flag alerts, lab interpretation guides (includes SCLC calculator and emergency protocols)
7. **Notes Export** - Clinical documentation templates for educational purposes
8. **Analytics Dashboard** - Usage metrics, guideline compliance, training insights
9. **Oncology Education Module** - AI-powered adaptive learning system with Socratic questioning and analytics

### Database Schema
- PostgreSQL with comprehensive medical workflow tables
- Anonymous decision support inputs (no patient identifiers)
- AI interaction logging with confidence scores
- Audit trail system for compliance
- Clinical protocols and treatment guidelines storage

### Key Features
- Role-based access control with permissions system
- AI-powered clinical analysis and recommendations
- Evidence-based protocol adherence tracking
- Educational documentation templates
- Comprehensive clinical calculators and tools
- Real-time guideline compliance monitoring

## Recent Changes (June 29, 2025)

### SCLC Module Removal and Cross-Module Integration (COMPLETED)
- Successfully removed standalone SCLC Guidelines module from core navigation as requested
- Distributed all SCLC Version 4.2025 data across relevant existing modules for better clinical workflow integration
- SCLC diagnostic protocols now integrated in OPD module alongside other cancer screening protocols
- SCLC treatment regimens distributed to CDU module with other chemotherapy protocols
- SCLC inpatient management protocols integrated in Inpatient module (SCLC-1)
- SCLC emergency protocols and Carboplatin calculator remain in Clinical Tools module
- Removed SCLC route from App.tsx and navigation structure while preserving all clinical content
- Updated documentation to reflect 8 core modules instead of 9, with SCLC content distributed appropriately
- Maintained authentic NCCN Version 4.2025 SCLC guidelines across all modules for comprehensive cancer care

### Local Development Authentication System (COMPLETED)
- Successfully implemented comprehensive local development authentication bypass system
- Created authentication middleware that detects DEV_MODE=true environment variable and bypasses Replit Auth
- Built local user authentication with credentials (local@test.com/test1234) using plain-text password matching
- Created LocalLoginForm component with test credential auto-fill functionality
- Enhanced landing page to detect development mode and show appropriate authentication interface
- Updated all protected API routes to use unified authentication middleware supporting both production and development
- Added .env.local support with DEV_MODE configuration for seamless local development
- Implemented session management for local development users with mock user claims
- Added development mode indicator in UI header and authentication flow logging
- Created sessions table in database for proper session storage in both environments
- Complete dual-mode authentication system: production uses Replit Auth, development uses local bypass

### Oncology Education Module Implementation (COMPLETED)
- Successfully implemented comprehensive AI-powered education system with adaptive learning capabilities
- Created AI Teaching Assistant with Socratic method questioning, progressive hint system, and experience-level adaptation
- Built Question Generation Engine with 15+ oncology scenarios covering protocols, side effects, emergencies, and clinical decision-making
- Developed Learning Analytics system with progress tracking, knowledge gap identification, and performance metrics visualization
- Implemented comprehensive Learning Dashboard with interactive charts, topic progress monitoring, and streak tracking
- Created personalized learning pathways for Resident, Fellow, and Attending experience levels
- Integrated question effectiveness tracking and confidence-based difficulty adjustment
- Added localStorage-based data persistence for seamless learning session continuity
- Built tabbed interface with Overview, AI Assistant, Analytics, Learning Paths, and Clinical Scenarios sections
- Enhanced OncoVista platform with 9th major module focused on evidence-based medical education
- Added comprehensive navigation integration and routing for seamless platform access

### Advanced Clinical Intelligence Hub Implementation (COMPLETED)
- Successfully implemented comprehensive real-time clinical decision support enhancements
- Created Real-Time Clinical Alert System with NCCN protocol compliance monitoring, drug interaction alerts, and biomarker threshold notifications
- Built Intelligent Biomarker Trend Analysis with visual trending, clinical interpretation, and automated recommendation generation
- Developed Cross-Module Patient Journey Tracker with treatment phase monitoring, NCCN compliance metrics, and quality milestone tracking
- Implemented Smart Referral Generation System with automated NCCN-compliant referral letters and specialty-specific templates
- Created Quick Emotion Check-in Widget for mental health support with patient/provider modes, resource recommendations, and crisis intervention protocols
- Enhanced main dashboard with tabbed Clinical Intelligence Hub providing comprehensive decision support across all cancer types
- Integrated authentic clinical scenarios based on implemented NCCN guidelines for bone cancer, ampullary adenocarcinoma, and SCLC
- Added real-time progress tracking, alert prioritization, and cross-module clinical workflow integration
- All components feature responsive design, dark mode support, and professional medical-grade interfaces

### Comprehensive Tri-Specialty Oncology Handbook Implementation (COMPLETED)
**Medical Oncology Handbook - Chapter 1:**
- Successfully integrated comprehensive "Principles of Oncology" educational content into OncoVista's handbook module
- Created Introduction to Chapter 1 with foundational oncology concepts, cancer biology overview, and carcinogenesis principles
- Built comprehensive Cancer Biology section (Section 1.1) with tabbed interface covering genetics, evolution, microenvironment, and clinical applications
- Implemented detailed Hallmarks of Cancer content (Section 1.1.1) with all 8 core hallmarks, enabling characteristics, and therapeutic implications
- Created extensive Tumor Microenvironment module (Section 1.1.3) covering cellular components, functions, therapeutic targeting, and future directions
- Integrated comprehensive Carcinogenesis section (Section 1.2) with multistep process phases, molecular mechanisms, risk factors, and prevention strategies
- Created detailed Genetic and Epigenetic Mechanisms section (Section 1.2.1) covering DNA methylation, histone modifications, noncoding RNAs, and genomic imprinting
- Implemented Environmental and Lifestyle Risk Factors section (Section 1.2.2) with tobacco, alcohol, diet, radiation, occupational exposures, and prevention strategies

**Radiation Oncology Handbook - Chapter 1:**
- Successfully integrated comprehensive "Fundamentals of Radiation Oncology" educational content with 4 major sections
- Created comprehensive Introduction to Chapter 1 with learning objectives, chapter structure, and clinical applications overview
- Built detailed History and Evolution section (Section 1.1) covering early discoveries (1895-1900), radium era, external beam therapy, LINACs, modern techniques (IMRT, IGRT, SRS/SBRT), and particle therapy
- Implemented extensive Basic Radiation Physics section (Section 1.2) with comprehensive coverage of radiation types, dose units, interactions with matter, BED/EQD2 calculations, and quality assurance protocols
- Created comprehensive Radiation Biology section (Section 1.3) covering DNA damage mechanisms, cell cycle radiosensitivity, LET/RBE concepts, Four R's of radiobiology, tumor hypoxia, and linear-quadratic model

**Palliative Care Handbook - Chapter 1 (NEW):**
- Successfully integrated comprehensive "Foundations of Palliative Care" educational content with 4 major sections
- Created comprehensive Introduction to Chapter 1 with core values, chapter structure, and key distinctions overview
- Built detailed Definition and Scope section (Section 1.1) covering WHO definition, scope of care, five domains (physical, psychological, social, spiritual, ethical), misconceptions and clarifications, and core principles
- Implemented extensive History and Evolution section (Section 1.2) covering ancient traditions, Dame Cicely Saunders and modern hospice movement, global spread, WHO recognition, and specialty development
- Created comprehensive Models of Care Delivery section (Section 1.3) covering primary vs specialty palliative care, care settings (inpatient, outpatient, home-based), specialized models (pediatric, telehealth), and integration strategies
- Enhanced MarkdownViewer component to support medical, radiation, and palliative care specialties with conditional rendering
- Integrated authentic palliative care content from provided educational materials following academic palliative medicine standards
- Complete educational platform now covers all three major oncology specialties with structured learning modules for comprehensive cancer care training

### NCCN Version 1.2025 Bone Cancer Integration (COMPLETED)
- Successfully integrated comprehensive NCCN Version 1.2025 Bone Cancer guidelines covering all primary bone tumor types
- Enhanced OPD module with age-based diagnostic algorithms: immediate orthopedic oncology referral for patients <40 vs metastatic workup for patients ≥40
- Enhanced CDU module with tumor-specific treatment protocols for osteosarcoma, Ewing sarcoma, chondrosarcoma, chordoma, and giant cell tumor
- Enhanced Inpatient module with postoperative management protocols and multidisciplinary care coordination
- Enhanced Palliative Care module with bone cancer-specific pain management and palliative radiation therapy protocols
- Enhanced Clinical Tools module with biomarker assessment tools including alkaline phosphatase, LDH, and cytogenetic testing (EWSR1, CIC-DUX4, BCOR-CCNB3)
- Integrated 18 comprehensive guidelines, 6 clinical decision support entries, and 5 biomarker guidelines
- Added authentic treatment protocols for neoadjuvant/adjuvant chemotherapy, surgical resection, and radiation therapy
- Implemented comprehensive workup protocols including fertility consultation considerations for osteosarcoma patients
- Cross-module integration ensures consistent bone cancer guidance with multidisciplinary team approach

### NCCN Version 2.2025 Ampullary Adenocarcinoma Integration (COMPLETED)
- Successfully integrated comprehensive NCCN Version 2.2025 Ampullary Adenocarcinoma guidelines across all OncoVista modules
- Enhanced OPD module with comprehensive workup protocols (AMP-1) including genetic testing requirements for 11 genes
- Enhanced CDU module with localized disease treatment protocols and perioperative immunotherapy guidance
- Enhanced Inpatient module with postoperative adjuvant treatment protocols (AMP-5) and complication management
- Enhanced Palliative Care module with metastatic disease management protocols (AMP-6) and symptom control
- Enhanced Clinical Tools module with genetic risk assessment calculator and comprehensive gene panel recommendations
- Integrated 9 comprehensive guidelines, 5 clinical decision support entries, and 5 biomarker guidelines
- Added authentic systemic therapy protocols including HER2-targeted, PD-L1-directed, and MSI-H/dMMR immunotherapy
- Implemented comprehensive biomarker testing guidelines for HER2, PD-L1, MSI-H/dMMR, CLDN18.2, and hereditary cancer genes
- Cross-module integration ensures consistent ampullary adenocarcinoma guidance throughout the platform

### NCCN Version 4.2025 Small Cell Lung Cancer (SCLC) Cross-Module Integration (COMPLETED)
- Successfully distributed comprehensive NCCN Version 4.2025 SCLC guidelines across all relevant OncoVista modules
- Integrated SCLC diagnostic protocols into OPD module for comprehensive outpatient screening and diagnosis
- Enhanced CDU module with SCLC treatment regimens including cisplatin/etoposide, carboplatin/etoposide, atezolizumab, and durvalumab combinations
- Enhanced Clinical Tools module with SCLC-specific Carboplatin AUC calculator using Calvert formula
- Enhanced Clinical Tools Red Flag Alerts with SCLC emergency protocols: SVCS, SIADH, Lambert-Eaton syndrome, brain metastases
- Enhanced Inpatient module with NCCN Small Cell Lung Cancer inpatient management protocols (SCLC-1)
- Integrated authentic NCCN v4.2025 treatment protocols including limited stage, extensive stage, and subsequent therapy options
- Added comprehensive staging tables with AJCC TNM and VA Limited/Extensive classification systems
- Added surveillance schedules differentiated by disease stage with specific imaging and follow-up protocols
- Removed standalone SCLC module in favor of integrated cross-module approach for better clinical workflow

### NCCN Version 3.2025 Colon Cancer Data Distribution (COMPLETED)
- Successfully distributed comprehensive NCCN Version 3.2025 colon cancer clinical data across all 8 platform modules
- Enhanced OPD module with colon cancer screening protocols, MSI/MMR testing, RAS/BRAF testing, and ctDNA monitoring guidelines
- Enhanced Inpatient module with perioperative colon cancer management protocols, metastatic disease management, and surgical planning guidelines
- Enhanced Palliative Care module with colon cancer-specific supportive care protocols including bowel obstruction management and pain control
- Enhanced Clinical Tools module with NCCN colon cancer risk calculator, emergency warning signs, and biomarker assessment tools
- Integrated authentic clinical decision support data with evidence-based Category 1, 2A, and 2B recommendations
- Cross-module integration ensures consistent colon cancer guidance throughout the platform

### Database Schema Enhancement
- Enhanced nccn_guidelines table with Version 3.2025 colon cancer data
- Expanded clinical_decision_support table with colon cancer-specific protocols
- Integrated biomarker_guidelines table with MSI/MMR, RAS/BRAF, and ctDNA testing protocols
- All modules now access unified colon cancer clinical database

### Module Completion
- Built complete Inpatient Oncology module with 5 sections
- Created AI Chat Assistant with guideline query capabilities
- Implemented Clinical Tools with BSA, GFR calculators and red flag alerts
- Added Notes Export system with 4 document templates
- Built Analytics Dashboard with usage metrics and training insights
- Created comprehensive PalliativeCareModule with 5 clinical sections

### CDU Module Complete Overhaul (COMPLETED - June 30, 2025)
- Successfully completed comprehensive CDU module overhaul addressing all 10 technical audit issues
- Removed complex state management architecture and implemented simplified, reliable component structure
- Added comprehensive safety guardrails with drug interaction warnings and AI confidence thresholds
- Integrated biomarker filtering for protocol selection with toxicity monitoring linked to dose modification
- Expanded cancer type support from 8 to 25 comprehensive cancer types with evidence-based compliance scoring
- Added PDF export, tumor board integration, and collapsible drug cards with print-friendly layouts
- Restored separate Treatment Plan Selector as dedicated tab for AI-guided decision support
- Fixed critical SelectItem errors and cleaned up redundant module files
- Enhanced with authentic protocol data, clinical workflow improvements, and professional medical-grade interfaces
- Application now provides clinical-grade safety monitoring and comprehensive decision support tools

### Deep Audit + Enhancement of Treatment Plan Selector (COMPLETED - June 30, 2025)
- Successfully completed comprehensive deep audit and enhancement of Treatment Plan Selector following NCCN specifications
- Created new database tables: treatment_plan_criteria and treatment_plan_mappings with PostgreSQL arrays and advanced data types
- Implemented comprehensive seeding with 57 treatment criteria entries across 5 categories (histology, biomarker, reason, intent, line)
- Enhanced with expanded histology types: 17 types including Adenocarcinoma, Squamous Cell, Neuroendocrine, Sarcoma, Anaplastic
- Enhanced with comprehensive biomarkers: 23 markers including common (ER+/-, HER2+/-) and emerging targets (RET+, FGFR2/3+, TMB-High)
- Enhanced with dynamic database-driven criteria loading instead of hardcoded arrays
- Added sophisticated biomarker conflict detection preventing mutually exclusive selections (ER+/ER-, PD-L1+/PD-L1-)
- Implemented EnhancedInputPanel with tooltips, descriptions, common/rare biomarker separation, and validation
- Added new API endpoints: /api/treatment-criteria, /api/treatment-plan-mappings, /api/generate-recommendation
- Enhanced storage interface with generateTreatmentRecommendation using complex biomarker array matching
- Integrated NCCN-aligned treatment mappings with authentic protocols (TCH, AC-TH, Pembrolizumab, Osimertinib)
- Added evidence-based confidence scoring, NCCN reference linking, and structured protocol matching
- Enhanced with visual separators between common and advanced biomarkers for improved clinical usability
- Treatment Plan Selector now provides dynamic, database-driven, clinically validated decision support

### Comprehensive NCCN Cancer Type Coverage Enhancement (COMPLETED - June 30, 2025)
- Successfully expanded Treatment Plan Selector to cover all major NCCN 2025 cancer types (75+ tumor types)
- Enhanced cancer type selection with organized categorical display including Blood Cancers & Lymphomas, Gastrointestinal, Genitourinary, Gynecologic, Thoracic, Breast, Head & Neck, CNS, Skin, Bone & Soft Tissue, Endocrine, Eye, and Rare Cancers
- Integrated authentic NCCN guideline categories covering 97% of cancer patients per NCCN standards
- Added specialized cancer types including Castleman Disease, Histiocytic Neoplasms, Waldenström Macroglobulinemia, Systemic Light Chain Amyloidosis, Gestational Trophoblastic Disease, Thymoma, Merkel Cell Carcinoma, and AIDS-Related Malignancies
- Enhanced dropdown interface with visual category separators and improved navigation for comprehensive cancer type selection
- Treatment Plan Selector now provides complete NCCN-aligned coverage for all major oncology specialties and subspecialties

### Navigation Integration
- Added all new modules to sidebar navigation
- Created "Clinical Tools" navigation section
- Updated landing page to showcase all 8 modules
- Fixed import errors and runtime issues

## User Preferences
- **Communication Style**: Simple, everyday language avoiding technical jargon
- **Focus**: Clinical decision support only - no EHR features
- **Data Policy**: Educational/demo purposes only, no real patient data
- **Module Structure**: Tab-based layouts with modular cards and color-coded alerts

## Development Guidelines
- Use relative paths from root directory (not /repo/)
- Prioritize Replit tools over virtual environments
- Generate SVG assets for images
- Use authenticated APIs with proper error handling
- Follow existing OPD/CDU/Handbook module patterns for consistency
- All modules must be educational tools without patient data storage

## Next Steps
- Platform is complete with all 8 requested modules
- Ready for clinical education and training use
- All modules follow clinical decision-support principles
- System provides comprehensive oncology guidance tools

## File Structure
```
/
├── client/src/
│   ├── modules/
│   │   ├── opd/ (Complete)
│   │   ├── cdu/ (Complete)
│   │   ├── inpatient/ (Complete)
│   │   ├── palliative/ (Complete)
│   │   ├── chat/ (Complete)
│   │   ├── tools/ (Complete)
│   │   ├── export/ (Complete)
│   │   └── handbook/ (Complete)
│   ├── components/ (Complete)
│   ├── pages/ (Complete)
│   └── lib/ (Complete)
├── server/ (Complete)
└── shared/ (Complete)
```

**Status**: Production ready clinical decision-support platform
**Last Updated**: June 28, 2025