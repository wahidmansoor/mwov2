// exportDB.ts
import { db } from '../server/db.ts';
import {
  nccnGuidelines,
  clinicalDecisionSupport,
  biomarkerGuidelines,
  cdProtocols,
  clinicalDecisionRules,
  clinicalProtocols,
  decisionSupportInputs,
  oncologyMedications,
  symptomManagement,
  treatmentProtocols,
  sessions,
  users,
  aiInteractions,
  auditLog
} from '../shared/schema.ts';
import * as fs from 'fs';

// All table mappings here
const tables = {
  nccnGuidelines,
  clinicalDecisionSupport,
  biomarkerGuidelines,
  cdProtocols,
  clinicalDecisionRules,
  clinicalProtocols,
  decisionSupportInputs,
  oncologyMedications,
  symptomManagement,
  treatmentProtocols,
  sessions,
  users,
  aiInteractions,
  auditLog
};

async function exportAllTables() {
  if (!fs.existsSync('./exports')) {
    fs.mkdirSync('./exports');
  }

  for (const [name, schema] of Object.entries(tables)) {
    try {
      const rows = await db.select().from(schema);
      fs.writeFileSync(`./exports/${name}.json`, JSON.stringify(rows, null, 2));
      console.log(`✅ Exported ${rows.length} rows from ${name}`);
    } catch (err) {
      console.error(`❌ Failed to export ${name}:`, err);
    }
  }

  console.log('🎉 All table exports complete!');
}

exportAllTables();
