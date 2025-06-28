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

## Recent Changes (June 28, 2025)

### Database Schema Fixes
- Fixed column name mismatches (session_id vs patient_id)
- Resolved database connectivity issues
- Restored dashboard functionality with working stats and activities

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