# Client Migration Guide: From Direct Supabase to Server API

This document explains how to migrate client components from direct Supabase calls to the proper server API endpoints.

## ❌ BEFORE (Incorrect - Direct Supabase Usage)

```typescript
// DON'T DO THIS - Direct Supabase calls in components
import { supabase, db } from '../lib/supabase.js';

function MyComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // ❌ BAD: Direct database call from client
    const fetchData = async () => {
      const { data, error } = await db.query('cd_protocols')
        .select('*')
        .eq('tumour_group', 'Lung')
        .limit(50);
      
      if (error) {
        console.error('Database error:', error);
        return;
      }
      
      setData(data);
    };
    
    fetchData();
  }, []);
  
  return <div>{/* render data */}</div>;
}
```

## ✅ AFTER (Correct - Server API Usage)

```typescript
// ✅ GOOD: Use server API through typed hooks
import { useCdProtocolsByTumourGroup } from '../hooks/useApi.js';

function MyComponent() {
  const { 
    data, 
    isLoading, 
    error 
  } = useCdProtocolsByTumourGroup('Lung', 50);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.items?.map(protocol => (
        <div key={protocol.id}>{protocol.code}</div>
      ))}
    </div>
  );
}
```

## Migration Steps

### 1. Replace Direct fetch() Calls

**Before:**
```typescript
const response = await fetch('/api/nccn-guidelines?cancer_type=lung');
const data = await response.json();
```

**After:**
```typescript
import { useNccnGuidelines } from '../hooks/useApi.js';

const { data, isLoading, error } = useNccnGuidelines({ 
  cancer_type: 'lung' 
});
```

### 2. Replace Direct Supabase Calls

**Before:**
```typescript
import { supabase } from '../lib/supabase.js';

const { data, error } = await supabase
  .from('palliative_symptom_protocols')
  .select('*')
  .eq('category', 'Pain');
```

**After:**
```typescript
import { usePalliativeSymptomProtocolsByCategory } from '../hooks/useApi.js';

const { data, isLoading, error } = usePalliativeSymptomProtocolsByCategory('Pain');
```

### 3. Handle Error States Properly

**Before:**
```typescript
try {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  // Handle data...
} catch (error) {
  console.error('Raw error:', error); // ❌ Raw database errors exposed
}
```

**After:**
```typescript
const { data, isLoading, error } = useCurrentUser();

if (error) {
  // ✅ User-friendly error messages from server
  return <ErrorMessage message={error.message} />;
}
```

### 4. Use Mutations for Data Changes

**Before:**
```typescript
const handleSave = async () => {
  const { error } = await supabase
    .from('decision_support_inputs')
    .insert(formData);
    
  if (error) {
    alert('Error saving data');
  }
};
```

**After:**
```typescript
import { useCreateDecisionSupport } from '../hooks/useApi.js';

const createMutation = useCreateDecisionSupport();

const handleSave = async () => {
  try {
    await createMutation.mutateAsync(formData);
    // Success handled automatically
  } catch (error) {
    // Error handled with proper user message
    setErrorMessage(error.message);
  }
};
```

## Available Hooks

### Clinical Data Hooks
- `useNccnGuidelines(params)` - NCCN guidelines with filters
- `useSearchNccnGuidelines(searchTerm)` - Search NCCN guidelines
- `useClinicalProtocols(params)` - Clinical protocols
- `useCdProtocols(params)` - CD protocols
- `useCdProtocolsByTumourGroup(tumourGroup)` - CD protocols by tumour group
- `useCdProtocolsByCode(code)` - CD protocols by code
- `useTreatmentProtocols(params)` - Treatment protocols
- `useOncologyMedications(params)` - Oncology medications
- `useSearchMedications(name)` - Search medications by name
- `useMedicationsByClassification(classification)` - Medications by classification

### Inpatient/Admission Hooks
- `useAdmissionCriteria(params)` - Admission criteria
- `useAdmissionCriteriaByCancerType(cancerType)` - Admission criteria by cancer type
- `useAdmissionCriteriaByType(admissionType)` - Admission criteria by type

### Palliative Care Hooks
- `usePalliativeSymptomProtocols(params)` - Symptom protocols
- `usePalliativeSymptomProtocolsByCategory(category)` - By category
- `usePalliativeSymptomProtocolBySlug(slug)` - Single protocol by slug
- `usePalliativeEmergencyGuidelines(params)` - Emergency guidelines
- `usePalliativeEmergencyGuidelineBySlug(slug)` - Single guideline by slug
- `usePalliativeCalculators(params)` - Calculators
- `usePalliativeCalculatorBySlug(slug)` - Single calculator by slug

### AI and Decision Support Hooks
- `useAiAnalysis()` - AI analysis mutation
- `useCreateDecisionSupport()` - Create decision support input
- `useDecisionSupportInputs(filters)` - List decision support inputs

### Auth Hooks
- `useCurrentUser()` - Current user data
- `useMe()` - Current user profile
- `useLogout()` - Logout mutation

### Health Hooks
- `useHealthCheck()` - API health check
- `useDatabaseHealth()` - Database health check

## Error Handling

All hooks return standardized error objects:

```typescript
const { data, isLoading, error } = useNccnGuidelines({ cancer_type: 'lung' });

if (error) {
  // error.message contains user-friendly message
  // error.status contains HTTP status code (if applicable)
  // error.code contains error code (if applicable)
}
```

## Benefits of This Approach

1. **Type Safety**: All responses are properly typed
2. **Error Handling**: Consistent, user-friendly error messages
3. **Caching**: Automatic caching and invalidation with React Query
4. **Security**: Server enforces RLS and business logic
5. **Performance**: Optimized queries and response sizes
6. **Maintainability**: Single source of truth for API calls
7. **Testing**: Easier to mock and test API calls

## Security Benefits

- ✅ Server enforces Row Level Security (RLS)
- ✅ No direct database access from client
- ✅ Server validates all inputs
- ✅ Consistent audit logging
- ✅ Rate limiting on server endpoints
- ✅ Proper authentication/authorization checks

## Performance Benefits

- ✅ Automatic caching with React Query
- ✅ Background refetching
- ✅ Optimistic updates for mutations
- ✅ Request deduplication
- ✅ Stale-while-revalidate patterns
- ✅ Configurable cache times per data type
