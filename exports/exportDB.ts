// exportDB.ts
import { db } from '../server/db.ts';
import {
  // Core tables
  sessions,
  users,
  auditLog,
  aiInteractions,
  biomarkerGuidelines,
  cdProtocols,
  clinicalDecisionRules,
  clinicalDecisionSupport,
  clinicalProtocols,
  decisionSupportInputs,
  nccnGuidelines,
  oncologyMedications,
  symptomManagement,
  treatmentProtocols,
  // Additional available tables
  admissionCriteria,
  emergencyScenarios,
  emergencyProtocols,
  antibioticProtocols,
  monitoringParameters,
  dailyAssessmentProtocols,
  performanceStatusScales,
  adverseEvents,
  adverseEventManagement,
  drugToxicityProfiles,
  supportiveCareProtocols,
  antiemeticProtocols,
  painManagementProtocols,
  dischargeCriteria,
  followUpProtocols,
} from '../shared/schema.ts';

import * as fs from 'fs';
import path from 'path';

// 💾 Map of all tables to be exported
const tables = {
  sessions,
  users,
  auditLog,
  aiInteractions,
  biomarkerGuidelines,
  cdProtocols,
  clinicalDecisionRules,
  clinicalDecisionSupport,
  clinicalProtocols,
  decisionSupportInputs,
  nccnGuidelines,
  oncologyMedications,
  symptomManagement,
  treatmentProtocols,
  // Additional available tables
  admissionCriteria,
  emergencyScenarios,
  emergencyProtocols,
  antibioticProtocols,
  monitoringParameters,
  dailyAssessmentProtocols,
  performanceStatusScales,
  adverseEvents,
  adverseEventManagement,
  drugToxicityProfiles,
  supportiveCareProtocols,
  antiemeticProtocols,
  painManagementProtocols,
  dischargeCriteria,
  followUpProtocols,
};

// 🧠 Export everything into /exports folder
async function exportAllTables() {
  const exportPath = './exports';
  if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath);
  }

  for (const [name, schema] of Object.entries(tables)) {
    try {
      const rows = await db.select().from(schema);
      fs.writeFileSync(path.join(exportPath, `${name}.json`), JSON.stringify(rows, null, 2));
      console.log(`✅ Exported ${rows.length} rows from ${name}`);
    } catch (err: any) {
      console.error(`❌ Failed to export ${name}: ${err.message}`);
    }
  }

  console.log('🎉 All table exports complete!');
}

// Run
exportAllTables();
