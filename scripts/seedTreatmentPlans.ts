/**
 * Treatment Plan Selector Database Seeding Script
 * Creates real clinical data for treatment_plan_criteria and treatment_plan_mappings tables
 * Following NCCN 2025 Guidelines and Evidence-Based Medicine
 */

import { db } from '../server/db';
import { treatmentPlanCriteria, treatmentPlanMappings } from '../shared/schema';

async function seedTreatmentPlans() {
  try {
    console.log('🌱 Seeding Treatment Plan Selector tables...');

    // Clear existing data
    await db.delete(treatmentPlanMappings);
    await db.delete(treatmentPlanCriteria);

    // Treatment Plan Criteria Data
    const criteriaData = [
      // Histology Types
      { category: 'histology', value: 'Adenocarcinoma', description: 'Glandular tissue carcinoma', isCommon: true, sortOrder: 1 },
      { category: 'histology', value: 'Squamous Cell Carcinoma', description: 'Flat cell carcinoma', isCommon: true, sortOrder: 2 },
      { category: 'histology', value: 'Small Cell Carcinoma', description: 'Small round cell neuroendocrine tumor', isCommon: true, sortOrder: 3 },
      { category: 'histology', value: 'Large Cell Carcinoma', description: 'Large undifferentiated cells', isCommon: false, sortOrder: 4 },
      { category: 'histology', value: 'Neuroendocrine Tumor', description: 'Hormone-producing neoplasm', isCommon: false, sortOrder: 5 },

      // Common Biomarkers
      { category: 'biomarker', value: 'ER+', description: 'Estrogen receptor positive', isCommon: true, sortOrder: 1 },
      { category: 'biomarker', value: 'ER-', description: 'Estrogen receptor negative', isCommon: true, sortOrder: 2 },
      { category: 'biomarker', value: 'HER2+', description: 'HER2 amplified/overexpressed', isCommon: true, sortOrder: 3 },
      { category: 'biomarker', value: 'HER2-', description: 'HER2 negative', isCommon: true, sortOrder: 4 },
      { category: 'biomarker', value: 'PD-L1+', description: 'PD-L1 expression ≥1%', isCommon: true, sortOrder: 5 },
      { category: 'biomarker', value: 'EGFR+', description: 'EGFR mutation positive', isCommon: true, sortOrder: 6 },
      { category: 'biomarker', value: 'ALK+', description: 'ALK rearrangement positive', isCommon: false, sortOrder: 7 },
      { category: 'biomarker', value: 'BRCA1/2+', description: 'BRCA1 or BRCA2 mutation', isCommon: false, sortOrder: 8 },

      // Treatment Intent
      { category: 'intent', value: 'Curative', description: 'Intent to cure disease', isCommon: true, sortOrder: 1 },
      { category: 'intent', value: 'Palliative', description: 'Symptom control and life extension', isCommon: true, sortOrder: 2 },
      { category: 'intent', value: 'Adjuvant', description: 'Post-surgical therapy', isCommon: true, sortOrder: 3 },
      { category: 'intent', value: 'Neoadjuvant', description: 'Pre-surgical therapy', isCommon: true, sortOrder: 4 },
      { category: 'intent', value: 'Maintenance', description: 'Ongoing disease control', isCommon: false, sortOrder: 5 },

      // Line of Treatment
      { category: 'line', value: '1st Line', description: 'First-line therapy', isCommon: true, sortOrder: 1 },
      { category: 'line', value: '2nd Line', description: 'Second-line therapy', isCommon: true, sortOrder: 2 },
      { category: 'line', value: '3rd Line', description: 'Third-line therapy', isCommon: true, sortOrder: 3 },
      { category: 'line', value: '4th Line+', description: 'Fourth-line or later', isCommon: false, sortOrder: 4 },

      // Reasons for Treatment Change
      { category: 'reason', value: 'Not applicable', description: 'First treatment selection', isCommon: true, sortOrder: 1 },
      { category: 'reason', value: 'Disease Progression', description: 'Radiographic or clinical progression', isCommon: true, sortOrder: 2 },
      { category: 'reason', value: 'Toxicity/Intolerance', description: 'Unacceptable side effects', isCommon: true, sortOrder: 3 },
      { category: 'reason', value: 'Patient Preference', description: 'Patient choice to change therapy', isCommon: true, sortOrder: 4 }
    ];

    // Treatment Plan Mappings Data (NCCN-Aligned Protocols)
    const mappingData = [
      // Breast Cancer Protocols
      {
        cancerType: 'Breast Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['ER+', 'HER2+'],
        treatmentIntent: 'Adjuvant',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'AC-TH (Doxorubicin + Cyclophosphamide → Paclitaxel + Trastuzumab)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-F',
        requiredStage: ['II', 'III'],
        confidenceScore: '0.95'
      },
      {
        cancerType: 'Breast Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['ER+', 'HER2-'],
        treatmentIntent: 'Adjuvant',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'AC-T (Doxorubicin + Cyclophosphamide → Paclitaxel)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-E',
        requiredStage: ['I', 'II', 'III'],
        confidenceScore: '0.92'
      },

      // Lung Cancer Protocols
      {
        cancerType: 'Lung Cancer (NSCLC)',
        histology: 'Adenocarcinoma',
        biomarkers: ['EGFR+'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Osimertinib',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-B',
        requiredStage: ['IV'],
        confidenceScore: '0.94'
      },
      {
        cancerType: 'Lung Cancer (SCLC)',
        histology: 'Small Cell Carcinoma',
        biomarkers: [],
        treatmentIntent: 'Curative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Cisplatin + Etoposide + Concurrent RT',
        evidenceReference: 'Category 1',
        nccnReference: 'SCLC-4',
        requiredStage: ['III'],
        confidenceScore: '0.90'
      },

      // Immunotherapy Protocol
      {
        cancerType: 'Lung Cancer (NSCLC)',
        histology: 'Squamous Cell Carcinoma',
        biomarkers: ['PD-L1+'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-C',
        requiredStage: ['IV'],
        confidenceScore: '0.89'
      }
    ];

    // Insert data
    await db.insert(treatmentPlanCriteria).values(criteriaData);
    console.log(`✅ Inserted ${criteriaData.length} treatment criteria`);

    await db.insert(treatmentPlanMappings).values(mappingData);
    console.log(`✅ Inserted ${mappingData.length} treatment mappings`);

    console.log('🎉 Treatment Plan Selector seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding treatment plans:', error);
    throw error;
  }
}

export { seedTreatmentPlans };

// Run seeding 
seedTreatmentPlans()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });