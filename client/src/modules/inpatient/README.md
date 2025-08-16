# Inpatient Oncology Module - Usage Guide

## Overview
This is a complete, read-only inpatient oncology guidance module that provides evidence-based protocols without any database dependencies or write operations.

## Quick Start

### Import Components
```tsx
// Main module (already in place)
import InpatientModule from '@/modules/inpatient/InpatientModule';

// Individual components (if needed)
import { AdmissionProtocols } from '@/modules/inpatient/components/AdmissionProtocols';
import { EmergencyProtocols } from '@/modules/inpatient/components/EmergencyProtocols';
// ... etc
```

### Use Data Hook
```tsx
import { useInpatientStats } from '@/lib/hooks/useInpatientData';

function MyComponent() {
  const { data, isLoading } = useInpatientStats();
  
  // Access stats
  console.log('Total protocols:', data.totalProtocols);
  console.log('Emergency protocols:', data.emergencyProtocols);
  
  // Access raw content
  console.log('All admission criteria:', data.content.admission);
}
```

### Access Static Content Directly
```tsx
import { getInpatientContent } from '@/lib/inpatient/data';

const content = getInpatientContent();
console.log('Admission protocols:', content.admission);
console.log('Emergency scenarios:', content.emergencies);
```

## Content Structure

### Available Sections
1. **Admission Protocols** - Evidence-based admission criteria
2. **Emergency Regimens** - Time-critical emergency management  
3. **Monitoring Workflows** - Monitoring parameters and escalation
4. **Supportive Care** - Supportive care protocols and coordination
5. **Discharge Planning** - Discharge criteria and safety planning

### Content Types
Each section contains structured data with:
- Stable IDs for deep linking
- Evidence tags (NCCN, ASCO, ESMO, etc.)
- Reference labels
- Organized action items and criteria

## Deep Linking
All content supports deep linking with predictable anchor patterns:
- Section level: `#admission`, `#emergency`, etc.
- Item level: `#emergency-neutropenic-sepsis`, `#supportive-vte-prophylaxis`, etc.

## Extending Content
To add new protocols, edit `/lib/inpatient/data.ts`:

```tsx
// Add to appropriate section in getInpatientContent()
{
  id: "admit-my-new-protocol", // stable, unique ID
  title: "My New Admission Protocol",
  description: "Clear description of when to use this protocol",
  inclusion: ["Include if criteria 1", "Include if criteria 2"],
  exclusion: ["Exclude if criteria"], // optional
  initialActions: ["First action", "Second action"],
  references: [{ label: "NCCN Guidelines" }], // optional
  evidence: ["NCCN"] // optional
}
```

## TypeScript Support
Full type definitions available in `/lib/inpatient/types.ts`:
- `InpatientContent` - Complete data structure
- `AdmissionCriterion` - Admission protocol type  
- `EmergencyItem` - Emergency scenario type
- `MonitoringChecklist` - Monitoring workflow type
- `SupportiveTopic` - Supportive care topic type
- `DischargeBundle` - Discharge planning type

## Content Guidelines
- Keep wording general and non-prescriptive
- No specific drug dosing (defer to local protocols)
- Include evidence tags where applicable  
- Maintain stable IDs for deep linking
- Use clear, actionable language

## Important Notes
- **Read-only**: This module provides guidance only, no data storage
- **Static content**: All data embedded at build time, no API calls
- **Institutional policies**: This supplements but does not replace local protocols
- **Evidence-based**: References major oncology guidelines (NCCN, ASCO, ESMO)

---
**Implementation Status**: ✅ Complete and Production Ready
