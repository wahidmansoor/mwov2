# OncoVista AI - Administrator Manual

## Table of Contents
1. [System Overview](#system-overview)
2. [Database Management](#database-management)
3. [User Management](#user-management)
4. [Content Management](#content-management)
5. [Template Import/Export](#template-importexport)
6. [Security & Monitoring](#security--monitoring)
7. [Troubleshooting](#troubleshooting)
8. [System Recovery](#system-recovery)

## System Overview

OncoVista AI is a comprehensive clinical decision support platform for oncology professionals. The system is built on:

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Authentication with admin approval workflow
- **AI Integration**: OpenAI API for clinical recommendations

### Key Modules
1. **OPD Module** - Outpatient diagnosis and screening
2. **CDU Module** - Cancer Day Unit protocols and dosage calculations
3. **Inpatient Module** - Admission protocols and emergency regimens
4. **Palliative Care Module** - Symptom management and pain control
5. **AI Chat Assistant** - Interactive guideline queries
6. **Clinical Tools** - Calculators and red flag alerts
7. **Notes Export** - Clinical documentation templates
8. **Analytics Dashboard** - Usage metrics and training insights
9. **Education Module** - AI-powered adaptive learning system

## Database Management

### Core Tables Overview

#### User Management
- `users` - User profiles and authentication
- `sessions` - Authentication sessions
- `approval_logs` - Admin approval audit trail

#### Clinical Content
- `nccn_guidelines` - Clinical guidelines (75+ cancer types)
- `clinical_decision_support` - Decision support protocols
- `biomarker_guidelines` - Biomarker testing guidelines
- `oncology_medications` - Medication database
- `cd_protocols` - Treatment protocols
- `treatment_plan_criteria` - Treatment selection criteria

#### Educational System
- `educational_topics` - Learning content
- `clinical_scenarios` - Case studies
- `question_bank` - Assessment questions
- `learning_sessions` - Progress tracking

#### Palliative Care
- `palliative_sessions` - Care sessions
- `symptom_assessments` - Symptom tracking
- `pain_assessments` - Pain management
- `medication_conversions` - Drug conversions

### Adding New Content

Use SQL commands or API endpoints to add content:

```sql
-- Add new guideline
INSERT INTO nccn_guidelines (reference_code, name, version, category, summary) 
VALUES ('NEW-CANCER-1', 'New Cancer Guidelines', 'v1.2025', 'Solid Tumors', 'Guidelines summary');

-- Add educational content
INSERT INTO educational_topics (title, category, difficulty, content) 
VALUES ('New Topic', 'Treatment', 'Fellow', 'Educational content');
```

## User Management

### User Approval Process
1. Users register via Replit Authentication
2. Admin receives notification email
3. Review user at `/api/admin/pending-users`
4. Approve via `/api/admin/approve-user/:userId`

### Role Management
- **Admin**: Full system access
- **Medical Oncologist**: Clinical modules and AI
- **Resident/Fellow**: Educational content access

## Content Management

### Clinical Guidelines
- Import via database scripts
- Validate medical accuracy
- Map to appropriate modules
- Test functionality after import

### Educational Content
Structure by difficulty:
- **Attending**: Advanced decision-making
- **Fellow**: Subspecialty training
- **Resident**: Foundational principles

## Template Import/Export

### Export Format
```json
{
  "metadata": {
    "timestamp": "2025-06-30T17:00:00Z",
    "version": "1.0"
  },
  "modules": {
    "opd": {"sections": [...], "data": {...}},
    "cdu": {"sections": [...], "data": {...}}
  }
}
```

### Import Commands
```bash
npm run import:guidelines -- --file=guidelines.json
npm run import:medications -- --file=medications.json
```

## Security & Monitoring

### Auto-Logout
- 15-minute inactivity timeout
- Warning at 13 minutes
- Secure session clearing

### Security Checks
- Monitor failed logins
- Track unauthorized access
- Review usage patterns
- Audit API calls

## Troubleshooting

### Common Issues
1. **Authentication**: Check Replit Auth config
2. **Database**: Verify PostgreSQL connection
3. **AI Service**: Check OpenAI API key

### Recovery Commands
```bash
npm run health-check
npm run backup:daily
npm run recovery:database
```

## System Recovery

### Backup Procedures
- Daily automated backups
- Weekly full system backup
- Monthly archive storage

### Recovery Steps
1. Identify backup timestamp
2. Stop services
3. Restore database
4. Verify integrity
5. Restart services

---

*Administrator Manual v1.0 - June 30, 2025*