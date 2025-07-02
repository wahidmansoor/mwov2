# OncoVista - Complete Tech Stack Analysis

## Project Overview
**OncoVista** is a comprehensive oncology application for clinical decision support, patient management, and medical education.

## Tech Stack Summary

### Frontend (Client)
- **Framework**: React 18.3.1 + TypeScript
- **Bundler**: Vite 5.4.19
- **Routing**: Wouter 3.3.5 (lightweight React router)
- **State Management**: Zustand 5.0.5
- **Data Fetching**: TanStack React Query 5.60.5
- **Styling**: Tailwind CSS 3.4.17 + TailwindCSS Animate
- **UI Components**: 
  - Radix UI (comprehensive component library)
  - Lucide React (icons)
  - Framer Motion (animations)
  - React Hook Form (forms) + Hookform Resolvers
- **Charts**: Recharts 2.15.2
- **Date Handling**: date-fns 3.6.0, React Day Picker
- **Theming**: next-themes 0.4.6

### Backend (Server)
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js 4.21.2
- **Database ORM**: Drizzle ORM 0.39.1 + Drizzle Kit 0.30.4
- **Database**: PostgreSQL (via Neon/Supabase)
- **Validation**: Zod 3.24.2
- **Authentication**: 
  - Replit Auth (production)
  - Passport.js + Local Strategy (development)
  - Express Session + Connect-PG-Simple
- **AI Integration**: 
  - OpenAI 5.5.1
  - Anthropic SDK 0.37.0
- **Email**: Nodemailer 7.0.4
- **WebSockets**: ws 8.18.0
- **Build**: esbuild 0.25.0

### Key Features & Modules

#### Clinical Modules
1. **OPD (Outpatient Department)** - Patient consultations and treatment plans
2. **CDU (Clinical Decision Unit)** - Clinical protocols and decision support
3. **Inpatient Management** - Hospital patient management
4. **Palliative Care** - Specialized palliative care workflows
5. **Analytics** - Clinical data analysis and reporting
6. **Chat Assistant** - AI-powered clinical assistance
7. **Education Module** - Medical oncology education content
8. **Handbook** - Medical reference materials
   - Medical Oncology View
   - Radiation Oncology View
   - Palliative Care View

#### Technical Features
- **AI-Powered Clinical Decision Support**
- **Risk Calculation Algorithms** 
- **RBAC (Role-Based Access Control)**
- **Session Management & Auto-logout**
- **Clinical Protocol Versioning**
- **Educational Content Management**
- **Data Export/Import Capabilities**
- **Real-time Chat & Notifications**

### Database Schema (PostgreSQL)
Key tables include:
- `users` - User management with roles (oncologist, radiation_oncologist, etc.)
- `sessions` - Session storage (required for Replit Auth)
- `clinical_protocols` - Versioned clinical protocols
- `decision_support_inputs` - Clinical decision data
- `ai_interactions` - AI conversation logs
- `inpatient_*` tables - Hospital patient management
- `palliative_care_*` tables - Palliative care workflows
- Educational content tables
- Analytics and reporting tables

### Environment Variables Required
```bash
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...

# Email
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

# Authentication & Sessions
SESSION_SECRET=...
NODE_ENV=development|production

# Replit-specific (production only)
REPL_ID=...
REPL_SLUG=...
```

### Development Tools
- **Build System**: Vite + esbuild
- **Type Checking**: TypeScript 5.6.3
- **Package Manager**: npm
- **Development Server**: tsx 4.20.3
- **Database Migrations**: Drizzle Kit
- **CSS**: PostCSS + Autoprefixer

### Deployment Architecture
- **Development**: Local development with SQLite fallback
- **Production**: Netlify + Supabase
- **Database**: Supabase PostgreSQL
- **CDN**: Netlify Edge
- **Functions**: Netlify Serverless Functions

### API Endpoints Structure
- `/api/auth/*` - Authentication endpoints
- `/api/patients/*` - Patient management
- `/api/protocols/*` - Clinical protocols
- `/api/ai/*` - AI interaction endpoints
- `/api/inpatient/*` - Inpatient management
- `/api/palliative/*` - Palliative care
- `/api/education/*` - Educational content
- `/api/analytics/*` - Analytics and reporting
- `/api/export/*` - Data export functionality

### Key Dependencies Analysis
- **Critical**: React, Express, Drizzle ORM, PostgreSQL, Zod
- **Authentication**: Passport, Express Session, Replit Auth
- **AI/ML**: OpenAI, Anthropic
- **UI/UX**: Radix UI, Tailwind, Framer Motion
- **Development**: Vite, TypeScript, esbuild

### Migration Considerations
- **Database**: Already migrated to Supabase PostgreSQL
- **Authentication**: Dual-mode (Replit + local dev)
- **Environment**: Configured for both local and Netlify deployment
- **Build Process**: Optimized for Netlify deployment
- **Dependencies**: All dependencies compatible with Node.js deployment

### Security Features
- Role-based access control (RBAC)
- Session management with auto-logout
- Environment variable protection
- Input validation with Zod schemas
- HTTPS enforcement in production
- Database connection security
