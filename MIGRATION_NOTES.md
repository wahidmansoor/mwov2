# Supabase Migration Notes

## Schema Oddities & Concerns

### JSONB Fields with Timestamp Strings

Two tables have concerning JSONB timestamp fields that may require special handling:

#### `treatment_plan_criteria`
- **Fields**: `eligibility_criteria`, `biomarker_requirements`, `timing_specifications`
- **Issue**: JSONB fields contain timestamp strings that may need conversion
- **Migration Action**: Monitor data type coercion when reading/writing these fields

#### `treatment_plan_mappings`  
- **Fields**: `mapping_configuration`, `validation_rules`, `dependency_relationships`
- **Issue**: JSONB fields contain timestamp strings that may need conversion
- **Migration Action**: Monitor data type coercion when reading/writing these fields

### Suspicious Schema Types

- `treatment_plan_criteria.created_at` and `treatment_plan_mappings.created_at`/`updated_at` are `jsonb` (not timestamp). This is likely a mistake. **Recommendation:** Change to `timestamp without time zone` if you want to track creation/update times.

### Primary Key Variations

Database tables use different primary key types:
- **UUID**: `nccn_guidelines`, `users`, `sessions`, `profiles`, `ai_interactions`
- **Integer**: All protocol and management tables
- **String**: Some lookup/reference tables

### Read/Write Split Implementation

#### READ-ONLY Tables (Reference Data)
- `nccn_guidelines` - NCCN cancer treatment guidelines
- `oncology_medications` - Medication reference data  
- `biomarker_guidelines` - Biomarker reference data
- `performance_status_scales` - Performance status scales
- `emergency_scenarios` - Emergency scenario reference
- `clinical_decision_support` - Decision support reference
- `drug_toxicity_profiles` - Drug toxicity reference
- `decision_support_inputs` - Decision support inputs

#### WRITABLE Tables (Clinical Protocols & Management)
- All `*_protocols` tables (treatment, clinical, emergency, etc.)
- All `*_management` tables (adverse_event, symptom, pain)
- All `*_criteria` tables (admission, discharge, treatment_plan)
- Assessment and monitoring tables
- User/session management tables

### Database Defaults
- Most `id` columns are `uuid` with default `gen_random_uuid()`.
- `is_active` defaults to `true` in many tables.
- `ctcae_version` in `adverse_events` defaults to `'5.0'`.
- `status` in `clinical_protocols` defaults to `'active'`, `approval_status` to `'pending'`.
- `updated_at` is set by DB default where defined; do not set in code unless required.

### Zod Validation Approach

All JSONB fields use permissive `z.unknown()` schemas with TODO comments for future strict validation implementation. This allows for flexible data ingestion while maintaining type safety at the TypeScript level.

### Error Handling

Custom error wrapper `asReadableSupabaseError()` provides consistent error messaging across all query helpers, making debugging easier during migration period.

## Row Level Security (RLS)

If you see RLS errors in the smoke test, review your Supabase Row Level Security policies for the affected tables/operations.

## Migration Checklist

- [x] Core infrastructure (supabaseClient, types, validators, errors)
- [x] All 33 query helper files created
- [x] Read/write operation split implemented  
- [x] Smoke test script with JSONB validation
- [ ] Search and replace old Replit DB usage
- [ ] Run smoke test against live Supabase instance
- [ ] Performance testing on large JSONB queries
- [ ] Production deployment validation
