# Complete Component Migration Guide

## Overview
This guide shows you exactly how to migrate your existing components from direct Supabase calls to the proper client-server architecture we've established.

## 📁 File Structure Created
```
shared/types/database.ts        ← Shared types for client and server
server/api/clinical.ts          ← Server API functions
client/src/services/apiClient.ts ← Client API service
client/src/hooks/useApi.ts      ← React hooks for data fetching
client/src/components/ui/       ← Basic UI components for examples
```

## 🔄 Migration Process

### Step 1: Identify Direct Supabase Usage
Look for patterns like this in your components:

```javascript
// ❌ OLD: Direct Supabase calls
import { supabase } from '../lib/supabase';

const { data, error } = await supabase
  .from('cd_protocols')
  .select('*')
  .eq('tumour_group', tumourGroup);
```

### Step 2: Replace with API Hooks
Replace them with our new typed hooks:

```javascript
// ✅ NEW: Proper API hooks
import { useCdProtocolsByTumourGroup } from '../hooks/useApi.js';

const { data, isLoading, error } = useCdProtocolsByTumourGroup(tumourGroup, 10);
```

## 📋 Complete Migration Examples

### Example 1: NCCN Guidelines Component

**Before (Direct Supabase):**
```javascript
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function NCCNGuidelines({ cancerType }) {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGuidelines() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('nccn_guidelines')
          .select('*')
          .eq('cancer_type', cancerType)
          .limit(20);
        
        if (error) throw error;
        setGuidelines(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGuidelines();
  }, [cancerType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {guidelines.map(guideline => (
        <div key={guideline.id}>
          <h3>{guideline.title}</h3>
          <p>{guideline.description}</p>
        </div>
      ))}
    </div>
  );
}
```

**After (Proper API Hooks):**
```javascript
import { useNccnGuidelines } from '../hooks/useApi.js';

function NCCNGuidelines({ cancerType }) {
  const { data: guidelines, isLoading, error } = useNccnGuidelines({
    cancer_type: cancerType,
    limit: 20
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {guidelines?.items?.map(guideline => (
        <div key={guideline.id}>
          <h3>{guideline.title}</h3>
          <p>{guideline.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: CD Protocols Search

**Before (Direct Supabase):**
```javascript
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

function ProtocolSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cd_protocols')
        .select('*')
        .or(`code.ilike.%${searchTerm}%,treatment_intent.ilike.%${searchTerm}%`)
        .limit(10);
      
      if (error) throw error;
      setProtocols(data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search protocols..."
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading && <div>Searching...</div>}
      {protocols.map(protocol => (
        <div key={protocol.id}>
          <h4>{protocol.code}</h4>
          <p>{protocol.treatment_intent}</p>
        </div>
      ))}
    </div>
  );
}
```

**After (Proper API Hooks):**
```javascript
import { useState } from 'react';
import { useCdProtocolsSearch } from '../hooks/useApi.js';

function ProtocolSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: protocols, isLoading, refetch } = useCdProtocolsSearch(searchTerm, 10, {
    enabled: false // Only search when triggered
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      refetch();
    }
  };

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search protocols..."
      />
      <button onClick={handleSearch}>Search</button>
      
      {isLoading && <div>Searching...</div>}
      {protocols?.items?.map(protocol => (
        <div key={protocol.id}>
          <h4>{protocol.code}</h4>
          <p>{protocol.treatment_intent}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Palliative Care Protocols

**Before (Direct Supabase):**
```javascript
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function PalliativeCareProtocols({ category }) {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProtocols() {
      const { data } = await supabase
        .from('palliative_symptom_protocols')
        .select('*')
        .eq('category', category)
        .order('title');
      
      setProtocols(data || []);
      setLoading(false);
    }

    loadProtocols();
  }, [category]);

  return (
    <div>
      {loading ? (
        <div>Loading protocols...</div>
      ) : (
        protocols.map(protocol => (
          <div key={protocol.id}>
            <h3>{protocol.title}</h3>
            <p>Category: {protocol.category}</p>
            <p>Evidence: {protocol.evidence}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

**After (Proper API Hooks):**
```javascript
import { usePalliativeSymptomProtocolsByCategory } from '../hooks/useApi.js';

function PalliativeCareProtocols({ category }) {
  const { data: protocols, isLoading } = usePalliativeSymptomProtocolsByCategory(category);

  return (
    <div>
      {isLoading ? (
        <div>Loading protocols...</div>
      ) : (
        protocols?.items?.map(protocol => (
          <div key={protocol.id}>
            <h3>{protocol.title}</h3>
            <p>Category: {protocol.category}</p>
            <p>Evidence: {protocol.evidence}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

## 🎯 Available Hooks

### NCCN Guidelines
```javascript
useNccnGuidelines(filters, options)          // List with filters
useNccnGuidelinesSearch(searchTerm, limit)   // Search functionality
useNccnGuidelineById(id)                     // Single guideline
```

### CD Protocols
```javascript
useCdProtocols(limit, options)               // List all
useCdProtocolsByTumourGroup(group, limit)    // Filter by tumour group
useCdProtocolsSearch(searchTerm, limit)      // Search protocols
useCdProtocolById(id)                        // Single protocol
```

### Palliative Care
```javascript
usePalliativeSymptomProtocols(limit)         // List all
usePalliativeSymptomProtocolsByCategory(cat) // Filter by category
usePalliativeSymptomProtocolById(id)         // Single protocol
```

### Admission Criteria
```javascript
useAdmissionCriteria(limit)                  // List all
useAdmissionCriteriaByCancerType(type, limit) // Filter by cancer type
useAdmissionCriteriaById(id)                 // Single criteria
```

### Medications
```javascript
useMedications(limit)                        // List all
useMedicationsSearch(searchTerm, limit)      // Search medications
useMedicationById(id)                        // Single medication
```

## 🔧 Error Handling Patterns

### Old Error Handling
```javascript
try {
  const { data, error } = await supabase.from('table').select('*');
  if (error) throw error;
  // Handle data
} catch (err) {
  console.error(err.message);
}
```

### New Error Handling
```javascript
const { data, isLoading, error } = useHookName();

if (error) {
  return <div>Error: {error.message}</div>;
}
```

## 🚀 Migration Checklist

For each component you're migrating:

- [ ] **Identify Supabase imports** - Look for `import { supabase }`
- [ ] **Find direct database calls** - Look for `.from('table_name')`
- [ ] **Remove manual state management** - Delete useState for data, loading, error
- [ ] **Remove useEffect for data fetching** - Delete useEffect hooks
- [ ] **Import appropriate hook** - Add hook from `../hooks/useApi.js`
- [ ] **Update component logic** - Use hook return values
- [ ] **Test the component** - Ensure data loads correctly
- [ ] **Update error handling** - Use hook error states
- [ ] **Remove old imports** - Delete supabase import

## 📝 Testing Your Migration

1. **Start the server**: Make sure your server is running with the new API endpoints
2. **Check network tab**: Verify API calls are going to `/api/` endpoints instead of Supabase
3. **Test error scenarios**: Ensure error handling works correctly
4. **Verify type safety**: Check that TypeScript shows proper types

## 🎉 Benefits After Migration

- ✅ **Type Safety**: Full TypeScript support with shared types
- ✅ **Automatic Caching**: React Query handles caching and revalidation
- ✅ **Error Handling**: Consistent error handling across all components
- ✅ **Loading States**: Built-in loading state management
- ✅ **Server Control**: Server is single source of truth for business logic
- ✅ **Better Performance**: Optimized queries and caching
- ✅ **Easier Testing**: Mock API calls instead of database calls

## 🔗 Next Steps

1. Start migrating your most critical components first
2. Test each component after migration
3. Remove old Supabase dependencies once migration is complete
4. Add any missing API endpoints to the server as needed

The infrastructure is now in place - happy migrating! 🚀
