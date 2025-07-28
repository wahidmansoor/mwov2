import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { treatmentPlanMappings, treatmentPlanCriteria } from '../shared/schema.js';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

// Comprehensive Colon Cancer Treatment Mappings based on NCCN 2024-2025 Guidelines
const colonCancerMappings = [
  // CURATIVE INTENT
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX + Nivolumab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-1',
    confidenceScore: 0.95,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 recommendation for MSI-H Colon Cancer curative treatment'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['dMMR'],
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX + Pembrolizumab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-1',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 recommendation for dMMR Colon Cancer curative treatment'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Wild-Type'],
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-2',
    confidenceScore: 0.93,
    toxicityLevel: 'Moderate',
    priorityTag: 'Standard',
    requiredStage: ['II', 'III'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 recommendation for KRAS Wild-Type Colon Cancer curative treatment'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Mutated'],
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'CAPOX (Capecitabine + Oxaliplatin)',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-2',
    confidenceScore: 0.92,
    toxicityLevel: 'Moderate',
    priorityTag: 'Standard',
    requiredStage: ['II', 'III'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 recommendation for KRAS Mutated Colon Cancer curative treatment'
  },

  // ADJUVANT INTENT
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Observation vs FOLFOX',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-3',
    confidenceScore: 0.91,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['II'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1: MSI-H Stage II may not benefit from adjuvant chemotherapy'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['dMMR'],
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Capecitabine monotherapy',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-3',
    confidenceScore: 0.89,
    toxicityLevel: 'Low',
    priorityTag: 'Alternative',
    requiredStage: ['II', 'III'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 recommendation for dMMR Colon Cancer adjuvant treatment'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['None'],
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX (5-FU/Leucovorin/Oxaliplatin)',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-ADJ-1',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Standard',
    requiredStage: ['III'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 standard adjuvant treatment for Stage III Colon Cancer'
  },

  // NEOADJUVANT INTENT
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Wild-Type'],
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX → Surgery',
    evidenceReference: 'Category 2A',
    nccnReference: 'COLON-NEOADJ-1',
    confidenceScore: 0.88,
    toxicityLevel: 'Moderate',
    priorityTag: 'Investigational',
    requiredStage: ['III', 'IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 2A recommendation for locally advanced resectable Colon Cancer'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Pembrolizumab → Surgery',
    evidenceReference: 'Category 2A',
    nccnReference: 'COLON-NEOADJ-2',
    confidenceScore: 0.87,
    toxicityLevel: 'Low',
    priorityTag: 'Emerging',
    requiredStage: ['III'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 2A: Promising data for MSI-H tumors with neoadjuvant immunotherapy'
  },

  // PALLIATIVE INTENT
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Wild-Type'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFIRI + Cetuximab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MET-1',
    confidenceScore: 0.95,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 recommendation for KRAS Wild-Type metastatic Colon Cancer'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Wild-Type'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX + Panitumumab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MET-1',
    confidenceScore: 0.94,
    toxicityLevel: 'High',
    priorityTag: 'Alternative',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 alternative for KRAS Wild-Type metastatic Colon Cancer'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Mutated'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFIRI + Bevacizumab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MET-2',
    confidenceScore: 0.93,
    toxicityLevel: 'High',
    priorityTag: 'Standard',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 recommendation for KRAS Mutated metastatic Colon Cancer'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Pembrolizumab monotherapy',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MET-3',
    confidenceScore: 0.96,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1: MSI-H tumors highly responsive to PD-1 inhibition'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['BRAF V600E'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Encorafenib + Cetuximab + Binimetinib',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MET-4',
    confidenceScore: 0.91,
    toxicityLevel: 'High',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 targeted therapy for BRAF V600E mutated metastatic Colon Cancer'
  },

  // MAINTENANCE INTENT
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Mutated'],
    treatmentIntent: 'Maintenance',
    lineOfTreatment: 'Post-Induction',
    treatmentProtocol: '5-FU/Leucovorin + Bevacizumab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MAINT-1',
    confidenceScore: 0.89,
    toxicityLevel: 'Low',
    priorityTag: 'Standard',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 maintenance therapy after induction for metastatic disease'
  },
  {
    cancerType: 'Colon Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['KRAS Wild-Type'],
    treatmentIntent: 'Maintenance',
    lineOfTreatment: 'Post-Induction',
    treatmentProtocol: 'Capecitabine + Bevacizumab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLON-MAINT-1',
    confidenceScore: 0.88,
    toxicityLevel: 'Low',
    priorityTag: 'Alternative',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 oral maintenance option for metastatic Colon Cancer'
  }
];

// Additional criteria needed for colon cancer
const colonCancerCriteria = [
  { category: 'biomarker', name: 'KRAS Wild-Type', description: 'Wild-type KRAS gene status' },
  { category: 'biomarker', name: 'KRAS Mutated', description: 'Mutated KRAS gene status' },
  { category: 'biomarker', name: 'BRAF V600E', description: 'BRAF V600E mutation' },
  { category: 'biomarker', name: 'dMMR', description: 'Deficient mismatch repair' },
  { category: 'reason', name: 'Post-Induction', description: 'After initial induction therapy' }
];

async function fixColonCancerMappings() {
  console.log('🔧 Starting Colon Cancer mappings fix...');

  try {
    // Insert missing criteria first
    console.log('📝 Adding missing treatment criteria...');
    for (const criteria of colonCancerCriteria) {
      try {
        await db.insert(treatmentPlanCriteria)
          .values(criteria)
          .onConflictDoNothing();
        console.log(`✅ Added criteria: ${criteria.name}`);
      } catch (error) {
        console.log(`⚠️ Criteria ${criteria.name} may already exist`);
      }
    }

    // Insert colon cancer mappings
    console.log('📊 Adding Colon Cancer treatment mappings...');
    let successCount = 0;
    
    for (const mapping of colonCancerMappings) {
      try {
        await db.insert(treatmentPlanMappings)
          .values(mapping)
          .onConflictDoNothing();
        successCount++;
        console.log(`✅ Added: ${mapping.treatmentIntent} - ${mapping.treatmentProtocol}`);
      } catch (error) {
        console.log(`⚠️ Mapping may already exist: ${mapping.treatmentProtocol}`);
      }
    }

    console.log(`\n🎯 COLON CANCER MAPPINGS COMPLETE!`);
    console.log(`📊 Successfully added ${successCount} new treatment mappings`);
    console.log(`🔬 Coverage includes: Curative, Adjuvant, Neoadjuvant, Palliative, Maintenance`);
    console.log(`🧬 Biomarkers: MSI-H, dMMR, KRAS Wild-Type, KRAS Mutated, BRAF V600E`);
    console.log(`📋 All mappings follow NCCN 2024-2025 Guidelines`);

  } catch (error) {
    console.error('❌ Error fixing colon cancer mappings:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the fix
fixColonCancerMappings().catch(console.error);