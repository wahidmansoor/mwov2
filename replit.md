# OncoVista AI - Clinical Decision Support Platform

## Overview
OncoVista AI is a comprehensive clinical decision support system designed specifically for oncology professionals. The platform serves as an educational and guidance tool for medical oncologists, radiation oncologists, palliative care specialists, and other healthcare professionals involved in cancer care. The system is built as a non-EHR platform focused on providing evidence-based protocols, AI-powered recommendations, and clinical guidance rather than patient record management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with ShadCN UI component library for consistent medical-grade interface
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand stores for global state management (auth, clinical data)
- **UI Components**: Radix UI primitives with custom medical theming
- **Animations**: Framer Motion for smooth transitions and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js for REST API endpoints
- **Language**: TypeScript for consistent type safety across the stack
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL for scalable data storage
- **Authentication**: Session-based auth with role-based access control (RBAC)
- **AI Integration**: OpenAI GPT-4 for clinical decision support and recommendations

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── modules/        # Feature-specific modules (OPD, CDU, etc.)
│   │   ├── stores/         # Zustand state management
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript type definitions
├── server/                 # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database abstraction layer
│   ├── services/          # Business logic services
│   └── middleware/        # Authentication and RBAC middleware
├── shared/                # Shared types and schemas
│   └── schema.ts          # Drizzle database schema
└── migrations/            # Database migration files
```

## Key Components

### Clinical Modules
1. **OPD Module**: Outpatient diagnosis, screening protocols, and referral management
2. **CDU Module**: Cancer Day Unit protocols, dosage calculations, and toxicity monitoring
3. **Palliative Care Module**: Symptom management and psychosocial support frameworks
4. **Handbook Module**: Evidence-based guidelines and protocol reference
5. **Inpatient Module**: Admission protocols and emergency regimens (planned)

### AI Services
- **Clinical Decision Engine**: Rule-based recommendations for screening and protocols
- **AI Service**: OpenAI integration for natural language clinical guidance
- **Decision Support**: Context-aware recommendations based on clinical scenarios

### Authentication & Authorization
- **Role-Based Access**: Medical oncologist, radiation oncologist, palliative care specialist, etc.
- **Permission System**: Granular permissions for different clinical actions
- **Session Management**: Secure session handling with user context

## Data Flow

### Clinical Decision Support Flow
1. User inputs clinical scenario (symptoms, age, risk factors)
2. Clinical Decision Engine processes input against rule database
3. AI Service provides additional context-aware recommendations
4. System returns structured recommendations with confidence scores
5. Audit trail captures all interactions for compliance

### Authentication Flow
1. User logs in with credentials
2. System validates against user database
3. Session established with role-based permissions
4. RBAC middleware validates access to protected resources
5. User context maintained throughout session

### Module Navigation
1. Authenticated users access dashboard
2. Module selection based on role permissions
3. Tab-based navigation within modules
4. Context preservation between module switches

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React routing
- **framer-motion**: Animation and transitions
- **@anthropic-ai/sdk**: AI integration capabilities

### UI Framework
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Medical and general purpose icons

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety across the stack
- **tsx**: TypeScript execution for server development

## Deployment Strategy

### Development Environment
- Vite dev server for hot module replacement
- TSX for server-side TypeScript execution
- Environment variable validation for API keys
- Replit integration for cloud development

### Production Build
- Vite builds optimized client bundle to `dist/public`
- ESBuild compiles server to `dist/index.js`
- Single deployment artifact with embedded client assets
- Environment-specific configuration management

### Database Management
- Drizzle migrations for schema versioning
- PostgreSQL schema defined in shared directory
- Connection pooling for serverless environments
- Automated schema synchronization

### API Integration
- OpenAI API for clinical decision support
- Graceful fallback to mock data when API unavailable
- Rate limiting and error handling for external services
- Secure API key management through environment variables

The system prioritizes clinical workflow efficiency, evidence-based recommendations, and user experience while maintaining strict separation from patient data management, positioning it as a pure clinical decision support and educational platform.

## Changelog
```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```