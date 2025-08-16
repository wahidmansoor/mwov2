# Inpatient Oncology Module - Supabase Migration

## Overview
This migration transforms the Inpatient Oncology module from static data to Supabase-backed content with enhanced interactivity while keeping `InpatientModule.tsx` unchanged.

## Features Added ✨

### 🗄️ Supabase Integration
- **Read-only data**: All 5 sections now pull from Supabase tables
- **Performance**: React Query with 5-minute staleTime
- **Type safety**: Full TypeScript support with proper interfaces

### 🔍 Enhanced Search & Filtering
- **Global search**: Press `/` to focus search (works across all content)
- **Evidence filters**: Click chips to filter by NCCN, ASCO, ESMO, Institutional, ExpertConsensus
- **Real-time filtering**: Client-side for instant results

### 📖 Navigation & UX
- **Bookmarks**: Click bookmark button on any item, stored in localStorage
- **Copy links**: Each item has stable deep-links you can copy/share
- **Collapse controls**: Expand/collapse all items per section
- **Print sections**: Print individual sections
- **Sticky TOC**: Available on desktop (XL+ breakpoints)

### ♿ Accessibility
- **Semantic HTML**: Proper headings, aria-expanded attributes
- **Keyboard support**: Tab navigation, Enter/Space activation
- **Focus management**: Visible focus indicators

## Files Created/Updated

### Core Infrastructure
- ✅ `/client/src/lib/supabase/client.ts` - Supabase client configuration
- ✅ `/client/src/lib/inpatient/types.ts` - TypeScript interfaces for Supabase tables
- ✅ `/client/src/lib/hooks/useInpatientData.ts` - React Query hooks + utilities

### UI Components
- ✅ `/client/src/modules/inpatient/components/_shared.tsx` - Shared UI components
- ✅ `/client/src/modules/inpatient/components/AdmissionProtocols.tsx` - Enhanced with Supabase
- ✅ `/client/src/modules/inpatient/components/EmergencyProtocols.tsx` - Enhanced with Supabase
- ✅ `/client/src/modules/inpatient/components/MonitoringWorkflows.tsx` - Enhanced with Supabase
- ✅ `/client/src/modules/inpatient/components/SupportiveCare.tsx` - Enhanced with Supabase
- ✅ `/client/src/modules/inpatient/components/DischargePlanning.tsx` - Enhanced with Supabase
- ✅ `/client/src/modules/inpatient/components/InpatientTOC.tsx` - Table of contents component

### Database
- ✅ `supabase-inpatient-setup.sql` - Complete database setup with sample data

## Setup Instructions

### 1. Environment Variables
Add these to your `.env.local`:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the entire content of `supabase-inpatient-setup.sql`
4. Execute the script

This will create:
- 5 tables with proper schemas and sample data
- Row Level Security (RLS) policies for read-only access
- Indexes for performance
- Auto-update triggers

### 3. Verify Installation
1. Start your development server: `npm run dev`
2. Navigate to the Inpatient module
3. You should see:
   - Data loading from Supabase
   - Search functionality (press `/`)
   - Evidence filter chips
   - Bookmark functionality
   - Copy link buttons

## Data Model

### Tables Created
- `admission_criteria` - Admission protocols and criteria
- `emergency_protocols` - Emergency management protocols
- `monitoring_workflows` - Clinical monitoring parameters
- `supportive_care` - Supportive care protocols
- `discharge_planning` - Discharge criteria and planning

### Common Fields
- `id` - UUID primary key
- `title/name` - Display name
- `slug` - URL-friendly identifier for deep links
- `evidence` - Array of evidence tags (NCCN, ASCO, etc.)
- `order_index` - For custom sorting
- `references` - JSONB array of reference objects
- `created_at/updated_at` - Timestamps

## Security

### Read-Only Implementation
- ✅ **No write operations** in frontend code
- ✅ **RLS policies** allow only SELECT operations
- ✅ **No patient data** stored or transmitted
- ✅ **Evidence-based content** only

### Data Privacy
- No personal health information (PHI)
- Clinical guidance content only
- All data is anonymized and educational

## Performance

### Optimizations Applied
- ✅ React Query with 5-minute staleTime
- ✅ Client-side filtering (no network requests)
- ✅ Optimistic UI updates
- ✅ Conditional rendering for large lists
- ✅ Database indexes on commonly queried fields

## Usage Examples

### Adding Content
Add new rows to Supabase tables via SQL or Supabase dashboard:

```sql
INSERT INTO public.admission_criteria (
  title, description, inclusion, initial_actions, evidence, slug, order_index
) VALUES (
  'New Protocol',
  'Description here',
  '["criteria 1", "criteria 2"]'::jsonb,
  '["action 1", "action 2"]'::jsonb,
  ARRAY['NCCN'],
  'new-protocol',
  10
);
```

### Customizing Evidence Tags
Update the `EvidenceChips` component in `_shared.tsx` to add new evidence sources.

## Troubleshooting

### Common Issues
1. **Data not loading**: Check Supabase URL/keys in environment
2. **TypeScript errors**: Ensure all imports resolve correctly
3. **Search not working**: Verify `/` key handler is active

### Development
```bash
# Type checking
npx tsc --noEmit

# Build test
npm run build

# Run development server
npm run dev
```

## Next Steps (Optional Enhancements)

### Phase 2 Possibilities
- Full-text search with Supabase
- Real-time updates with Supabase subscriptions
- Content versioning and approval workflows
- Analytics on most-used protocols
- Integration with clinical decision support systems

---

**Ready to use!** 🚀 The module now provides a rich, interactive experience while maintaining the read-only, evidence-based approach required for clinical settings.
