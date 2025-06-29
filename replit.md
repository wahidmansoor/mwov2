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
1. **OPD Module** - Outpatient diagnosis, screening, and referral management
2. **CDU Module** - Cancer Day Unit protocols, dosage calculations, toxicity monitoring
3. **Inpatient Oncology Module** - Admission protocols, emergency regimens, monitoring workflows
4. **Palliative Care Module** - Symptom management, pain control, psychosocial support
5. **AI Chat Assistant** - Interactive guideline queries with NCCN, ASCO, ESMO support
6. **Clinical Tools** - Calculators, red flag alerts, lab interpretation guides
7. **Notes Export** - Clinical documentation templates for educational purposes
8. **Analytics Dashboard** - Usage metrics, guideline compliance, training insights

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

### Advanced Clinical Intelligence Hub Implementation (COMPLETED)
- Successfully implemented comprehensive real-time clinical decision support enhancements
- Created Real-Time Clinical Alert System with NCCN protocol compliance monitoring, drug interaction alerts, and biomarker threshold notifications
- Built Intelligent Biomarker Trend Analysis with visual trending, clinical interpretation, and automated recommendation generation
- Developed Cross-Module Patient Journey Tracker with treatment phase monitoring, NCCN compliance metrics, and quality milestone tracking
- Implemented Smart Referral Generation System with automated NCCN-compliant referral letters and specialty-specific templates
- Enhanced main dashboard with tabbed Clinical Intelligence Hub providing comprehensive decision support across all cancer types
- Integrated authentic clinical scenarios based on implemented NCCN guidelines for bone cancer, ampullary adenocarcinoma, and SCLC
- Added real-time progress tracking, alert prioritization, and cross-module clinical workflow integration
- All components feature responsive design, dark mode support, and professional medical-grade interfaces

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

### NCCN Version 4.2025 Small Cell Lung Cancer (SCLC) Integration (COMPLETED)
- Successfully integrated comprehensive NCCN Version 4.2025 SCLC guidelines across all OncoVista modules
- Created dedicated SCLC module with 6 comprehensive sections: Overview, Diagnosis, Staging, Treatment, Surveillance, and Calculators
- Enhanced Clinical Tools module with SCLC-specific Carboplatin AUC calculator using Calvert formula
- Enhanced Clinical Tools Red Flag Alerts with SCLC emergency protocols: SVCS, SIADH, Lambert-Eaton syndrome, brain metastases
- Enhanced Inpatient module with NCCN Small Cell Lung Cancer inpatient management protocols (SCLC-1)
- Integrated authentic NCCN v4.2025 treatment protocols including limited stage, extensive stage, and subsequent therapy options
- Added comprehensive staging tables with AJCC TNM and VA Limited/Extensive classification systems
- Implemented drug dosing protocols for cisplatin/etoposide, carboplatin/etoposide, atezolizumab, and durvalumab combinations
- Added surveillance schedules differentiated by disease stage with specific imaging and follow-up protocols
- Added SCLC module to navigation system and routing for seamless platform integration

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

### CDU Module Enhancement (COMPLETED)
- Successfully integrated comprehensive CD protocols database with real clinical data
- Created cdProtocols table with full schema (27 fields including dosing, monitoring, contraindications)
- Enhanced CDU Treatment Protocols segment with database-driven functionality
- Added protocol search, filtering, and detailed view capabilities
- Implemented AC-T breast cancer protocol as reference data from SQL file
- Verified API endpoints working correctly with authentic clinical protocol data
- Fixed all syntax errors and completed database-driven CDU enhancement

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