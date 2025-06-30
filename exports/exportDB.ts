// exportDB.ts
import { db } from '../server/db.ts';
import {
  // Palliative & Clinical
  sessions,
  users,
  auditLog,
  aiInteractions,
  approvalLogs,
  biomarkerGuidelines,
  biomarkers,
  breakthroughPain,
  cancerScreeningProtocols,
  caregiverScores,
  cdProtocols,
  clinicalDecisionRules,
  clinicalDecisionSupport,
  clinicalProtocols,
  clinicalScenarios,
  decisionSupportInputs,
  diagnosticWorkupSteps,
  educationalAiInteractions,
  educationalTopics,
  examPreparation,
  goalsOfCare,
  learningProgress,
  learningSessions,
  nccnGuidelines,
  oncologyMedications,
  opioidConversions,
  painAssessments,
  psychosocialScreening,
  questionBank,
  referralGuidelines,
  referralTracking,
  resourceLinks,
  riskStratificationScores,
  sessionLogs,
  symptomManagement,
  symptomProtocols,
  symptomScores,
  treatmentPlanCriteria,
  treatmentPlanMappings,
  treatmentProtocols,
} from '../shared/schema.ts';

import * as fs from 'fs';
import path from 'path';

// 💾 Map of all tables to be exported
const tables = {
  sessions,
  users,
  auditLog,
  aiInteractions,
  approvalLogs,
  biomarkerGuidelines,
  biomarkers,
  breakthroughPain,
  cancerScreeningProtocols,
  caregiverScores,
  cdProtocols,
  clinicalDecisionRules,
  clinicalDecisionSupport,
  clinicalProtocols,
  clinicalScenarios,
  decisionSupportInputs,
  diagnosticWorkupSteps,
  educationalAiInteractions,
  educationalTopics,
  examPreparation,
  goalsOfCare,
  learningProgress,
  learningSessions,
  nccnGuidelines,
  oncologyMedications,
  opioidConversions,
  painAssessments,
  psychosocialScreening,
  questionBank,
  referralGuidelines,
  referralTracking,
  resourceLinks,
  riskStratificationScores,
  sessionLogs,
  symptomManagement,
  symptomProtocols,
  symptomScores,
  treatmentPlanCriteria,
  treatmentPlanMappings,
  treatmentProtocols,
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
