# OncoVista AI Coding Agent Instructions

## Project Overview
OncoVista is a comprehensive oncology application for clinical decision support, patient management, and medical education. Built as a modular React + Node.js app with PostgreSQL/Supabase backend, it serves oncologists with evidence-based clinical tools.

## Architecture Fundamentals

### Monorepo Structure
```
client/           # React frontend (Vite + TypeScript)
server/           # Express.js backend
shared/           # Shared types and schemas
netlify/          # Netlify deployment functions
```

### Key Technologies
- **Frontend**: React 18 + TypeScript, Vite, Wouter (routing), Zustand (state), TanStack Query (data fetching)
- **Backend**: Express.js + TypeScript, Drizzle ORM, PostgreSQL via Neon/Supabase
- **UI**: Tailwind CSS + Radix UI components, custom UI kit in `client/src/components/ui/`
- **Auth**: Replit Auth (production) + local bypass (development)

### Module Architecture Pattern
Each clinical module follows this structure:
```
client/src/modules/{module-name}/
├── components/          # Module-specific components
├── pages/              # Route components
├── services/           # API calls
├── lib/               # Utilities and types
└── README.md          # Module documentation
```

## Development Workflows

### Essential Commands
```bash
# Development (runs both client & server)
npm run dev

# Database operations
npm run db:push              # Push schema changes
npm run smoke:supabase       # Test database connectivity

# Build & deployment
npm run build:netlify        # Build for Netlify deployment
```

### Database Schema Location
- **Schema Definition**: `shared/schema.ts` (single source of truth)
- **Migrations**: Auto-generated in `migrations/` folder
- **Connection**: Uses `DATABASE_URL` environment variable

### API Service Pattern
Frontend services extend the base `ApiService` class:
```typescript
// client/src/services/api.js
class ApiService {
  constructor(tableName) {
    this.tableName = tableName
    this.table = db.query(tableName)
  }
  // Provides: getAll(), getById(), create(), update(), delete()
}

// Usage example
export const protocolService = {
  ...new ApiService('cd_protocols'),
  async getByTumourGroup(tumourGroup) { /* custom method */ }
}
```

## Critical Code Patterns

### Component Composition
Use the established UI component pattern:
```tsx
import { Card, CardContent } from "@/components/ui"
import { Button, Badge } from "@/components/ui"

// Always use absolute imports with @ alias
// Follow Radix UI + Tailwind CSS patterns
```

### Data Fetching
Use TanStack Query for all data operations:
```tsx
import { useQuery } from "@tanstack/react-query"
import { protocolService } from "@/services/api"

const { data, error, isLoading } = useQuery({
  queryKey: ['protocols', filters],
  queryFn: () => protocolService.getAll(filters)
})
```

### Route Configuration
Routes use Wouter and follow this pattern in `App.tsx`:
```tsx
<Route path="/module/:section?" component={ModuleComponent} />
```

### Authentication Check
Use environment-based auth bypass:
```typescript
// server/middleware/auth.ts
if (process.env.DEV_MODE === 'true') {
  // Local development bypass
} else {
  // Replit Auth verification
}
```

## Database Conventions

### Table Naming
- Snake_case for table/column names: `clinical_protocols`, `ai_interactions`
- UUID primary keys with `defaultRandom()`
- Consistent timestamp fields: `createdAt`, `updatedAt`

### Schema Extensions
When adding new tables, follow the pattern in `shared/schema.ts`:
```typescript
export const newTable = pgTable("new_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  // ... other fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

## Module Development Guidelines

### Adding New Clinical Modules
1. Create module directory in `client/src/modules/{name}/`
2. Add route configuration in `App.tsx`
3. Implement service layer extending `ApiService`
4. Follow the palliative-v2 module as reference (self-contained with README)

### Component Patterns
- Use TypeScript interfaces from `shared/types.ts`
- Implement responsive design with Tailwind grid systems
- Follow accessibility patterns from Radix UI
- Use consistent error boundaries and loading states

### Data Flow
1. **API Layer**: Express routes in `server/routes/`
2. **Storage Layer**: Database operations in `server/storage.ts`
3. **Service Layer**: Frontend services in `client/src/services/`
4. **State Management**: Zustand stores for global state, React Query for server state

## Deployment Considerations

### Environment Setup
Critical environment variables:
```bash
DATABASE_URL=          # Neon/Supabase connection string
DEV_MODE=true         # Local development bypass
OPENAI_API_KEY=       # AI features (optional)
```

### Build Process
- Netlify deployment uses `npm run build:netlify`
- Serverless functions in `netlify/functions/api.ts`
- Static assets served from `dist/public/`

## Common Pitfalls to Avoid

1. **Don't bypass the ApiService pattern** - Always extend the base class for consistency
2. **Don't modify shared schema without migration** - Use `npm run db:push` after schema changes
3. **Don't hardcode API endpoints** - Use the service layer abstractions
4. **Don't ignore the module README pattern** - Each module should be self-documenting
5. **Don't break the monorepo structure** - Keep client/server/shared boundaries clear

## Code Quality Standards

- TypeScript strict mode enabled - use proper typing
- Use Zod schemas for validation at API boundaries
- Follow React Hook patterns for state and effects
- Implement proper error handling with user-friendly messages
- Use semantic HTML and ARIA labels for accessibility

## Testing Strategy

- Test database connectivity with `npm run smoke:supabase`
- Clinical modules should have unit tests for core logic
- Use the established patterns in existing modules as reference
- Validate against real clinical data scenarios where possible
