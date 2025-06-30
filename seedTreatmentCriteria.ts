/**
 * Comprehensive Treatment Plan Criteria Database Seeding
 * Seeds expanded histology types, biomarkers, treatment intents, lines, and reasons
 * Following NCCN Guidelines and modern oncology standards
 */

import { db } from './server/db';
import { treatmentPlanCriteria, treatmentPlanMappings } from './shared/schema';

async function seedTreatmentCriteria() {
  console.log('🌱 Seeding comprehensive treatment plan criteria...');
  
  try {
    // Clear existing data
    await db.delete(treatmentPlanCriteria);
    await db.delete(treatmentPlanMappings);
    
    // Expanded Histology Types (Primary + Recommended)
    const histologyData = [
      // Common histologies (isCommon: true)
      { category: 'histology', value: 'Adenocarcinoma', description: 'Most common type of cancer arising from glandular tissue', isCommon: true, sortOrder: 1 },
      { category: 'histology', value: 'Squamous Cell', description: 'Cancer arising from squamous epithelial cells', isCommon: true, sortOrder: 2 },
      { category: 'histology', value: 'Large Cell', description: 'Undifferentiated non-small cell lung cancer', isCommon: true, sortOrder: 3 },
      { category: 'histology', value: 'Small Cell', description: 'Neuroendocrine carcinoma with rapid growth', isCommon: true, sortOrder: 4 },
      { category: 'histology', value: 'Ductal', description: 'Invasive ductal carcinoma, most common breast cancer type', isCommon: true, sortOrder: 5 },
      { category: 'histology', value: 'Lobular', description: 'Invasive lobular carcinoma of the breast', isCommon: true, sortOrder: 6 },
      
      // Less common histologies (isCommon: false)
      { category: 'histology', value: 'Neuroendocrine', description: 'Cancer arising from neuroendocrine cells', isCommon: false, sortOrder: 10 },
      { category: 'histology', value: 'Sarcoma', description: 'Cancer arising from connective tissue', isCommon: false, sortOrder: 11 },
      { category: 'histology', value: 'Melanoma', description: 'Cancer arising from melanocytes', isCommon: false, sortOrder: 12 },
      { category: 'histology', value: 'Transitional Cell', description: 'Urothelial carcinoma', isCommon: false, sortOrder: 13 },
      { category: 'histology', value: 'Medullary', description: 'Rare breast cancer subtype', isCommon: false, sortOrder: 14 },
      { category: 'histology', value: 'Papillary', description: 'Papillary carcinoma', isCommon: false, sortOrder: 15 },
      { category: 'histology', value: 'Clear Cell', description: 'Renal cell carcinoma subtype', isCommon: false, sortOrder: 16 },
      { category: 'histology', value: 'Mucinous', description: 'Mucin-producing adenocarcinoma', isCommon: false, sortOrder: 17 },
      { category: 'histology', value: 'Signet Ring Cell', description: 'Aggressive adenocarcinoma variant', isCommon: false, sortOrder: 18 },
      { category: 'histology', value: 'Undifferentiated', description: 'Poorly differentiated carcinoma', isCommon: false, sortOrder: 19 },
      { category: 'histology', value: 'Anaplastic', description: 'Highly aggressive undifferentiated cancer', isCommon: false, sortOrder: 20 }
    ];

    // Comprehensive Biomarkers (Common + Future-Ready)
    const biomarkerData = [
      // Hormone receptors (common)
      { category: 'biomarker', value: 'ER+', description: 'Estrogen receptor positive', isCommon: true, sortOrder: 1 },
      { category: 'biomarker', value: 'ER-', description: 'Estrogen receptor negative', isCommon: true, sortOrder: 2 },
      { category: 'biomarker', value: 'PR+', description: 'Progesterone receptor positive', isCommon: true, sortOrder: 3 },
      { category: 'biomarker', value: 'PR-', description: 'Progesterone receptor negative', isCommon: true, sortOrder: 4 },
      { category: 'biomarker', value: 'HER2+', description: 'Human epidermal growth factor receptor 2 positive', isCommon: true, sortOrder: 5 },
      { category: 'biomarker', value: 'HER2-', description: 'Human epidermal growth factor receptor 2 negative', isCommon: true, sortOrder: 6 },
      
      // Immunotherapy markers (common)
      { category: 'biomarker', value: 'PD-L1+', description: 'Programmed death-ligand 1 positive (≥1%)', isCommon: true, sortOrder: 7 },
      { category: 'biomarker', value: 'PD-L1-', description: 'Programmed death-ligand 1 negative (<1%)', isCommon: true, sortOrder: 8 },
      { category: 'biomarker', value: 'MSI-H', description: 'Microsatellite instability high', isCommon: true, sortOrder: 9 },
      { category: 'biomarker', value: 'MSS', description: 'Microsatellite stable', isCommon: true, sortOrder: 10 },
      
      // Targeted therapy markers (common)
      { category: 'biomarker', value: 'ALK+', description: 'Anaplastic lymphoma kinase rearrangement', isCommon: true, sortOrder: 11 },
      { category: 'biomarker', value: 'EGFR+', description: 'Epidermal growth factor receptor mutation', isCommon: true, sortOrder: 12 },
      { category: 'biomarker', value: 'KRAS+', description: 'KRAS oncogene mutation', isCommon: true, sortOrder: 13 },
      { category: 'biomarker', value: 'BRAF+', description: 'BRAF oncogene mutation', isCommon: true, sortOrder: 14 },
      
      // Hereditary markers (less common)
      { category: 'biomarker', value: 'BRCA1+', description: 'BRCA1 gene mutation', isCommon: false, sortOrder: 20 },
      { category: 'biomarker', value: 'BRCA2+', description: 'BRCA2 gene mutation', isCommon: false, sortOrder: 21 },
      { category: 'biomarker', value: 'TMB-High', description: 'Tumor mutational burden high (≥10 mutations/Mb)', isCommon: false, sortOrder: 22 },
      
      // Emerging targets (future-ready)
      { category: 'biomarker', value: 'RET+', description: 'RET gene rearrangement', isCommon: false, sortOrder: 30 },
      { category: 'biomarker', value: 'ROS1+', description: 'ROS1 gene rearrangement', isCommon: false, sortOrder: 31 },
      { category: 'biomarker', value: 'MET+', description: 'MET gene amplification or exon 14 skipping', isCommon: false, sortOrder: 32 },
      { category: 'biomarker', value: 'FGFR2/3+', description: 'FGFR2 or FGFR3 gene alteration', isCommon: false, sortOrder: 33 },
      { category: 'biomarker', value: 'IDH1/2+', description: 'IDH1 or IDH2 gene mutation', isCommon: false, sortOrder: 34 },
      { category: 'biomarker', value: 'CTLA-4+', description: 'CTLA-4 expression for immunotherapy', isCommon: false, sortOrder: 35 },
      { category: 'biomarker', value: 'TP53+', description: 'TP53 tumor suppressor gene mutation', isCommon: false, sortOrder: 36 }
    ];

    // Treatment Intent
    const intentData = [
      { category: 'intent', value: 'Curative', description: 'Treatment with curative intent', isCommon: true, sortOrder: 1 },
      { category: 'intent', value: 'Palliative', description: 'Treatment for symptom control and quality of life', isCommon: true, sortOrder: 2 },
      { category: 'intent', value: 'Adjuvant', description: 'Treatment after primary therapy to prevent recurrence', isCommon: true, sortOrder: 3 },
      { category: 'intent', value: 'Neoadjuvant', description: 'Treatment before primary therapy to downsize tumor', isCommon: true, sortOrder: 4 }
    ];

    // Treatment Line
    const lineData = [
      { category: 'line', value: '1st Line', description: 'First-line treatment', isCommon: true, sortOrder: 1 },
      { category: 'line', value: '2nd Line', description: 'Second-line treatment', isCommon: true, sortOrder: 2 },
      { category: 'line', value: '3rd Line', description: 'Third-line treatment', isCommon: true, sortOrder: 3 },
      { category: 'line', value: 'Maintenance', description: 'Maintenance therapy after response', isCommon: true, sortOrder: 4 },
      { category: 'line', value: 'Adjuvant', description: 'Adjuvant therapy', isCommon: true, sortOrder: 5 },
      { category: 'line', value: 'Neoadjuvant', description: 'Neoadjuvant therapy', isCommon: true, sortOrder: 6 }
    ];

    // Reasons for Treatment Change
    const reasonData = [
      { category: 'reason', value: 'Not applicable', description: 'First treatment selection', isCommon: true, sortOrder: 1 },
      { category: 'reason', value: 'Disease Progression', description: 'Radiographic or clinical progression', isCommon: true, sortOrder: 2 },
      { category: 'reason', value: 'Toxicity/Intolerance', description: 'Unacceptable side effects', isCommon: true, sortOrder: 3 },
      { category: 'reason', value: 'Resistance', description: 'Development of treatment resistance', isCommon: true, sortOrder: 4 },
      { category: 'reason', value: 'Completion of Treatment', description: 'Planned treatment completed', isCommon: true, sortOrder: 5 },
      { category: 'reason', value: 'Patient Preference', description: 'Patient choice to change therapy', isCommon: true, sortOrder: 6 }
    ];

    // Combine all criteria data
    const allCriteriaData = [
      ...histologyData,
      ...biomarkerData,
      ...intentData,
      ...lineData,
      ...reasonData
    ];

    // Insert criteria data
    await db.insert(treatmentPlanCriteria).values(allCriteriaData);
    console.log(`✅ Inserted ${allCriteriaData.length} treatment criteria entries`);

    // Sample Treatment Plan Mappings with NCCN-aligned protocols
    const mappingData = [
      // Breast Cancer HER2+ mappings
      {
        cancerType: 'Breast Cancer',
        histology: 'Ductal',
        biomarkers: ['HER2+', 'ER+'],
        treatmentIntent: 'Curative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'TCH (Docetaxel + Carboplatin + Trastuzumab)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-4',
        requiredStage: ['II', 'III'],
        confidenceScore: '0.92'
      },
      {
        cancerType: 'Breast Cancer',
        histology: 'Ductal',
        biomarkers: ['HER2+', 'ER-'],
        treatmentIntent: 'Curative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'AC-TH (Doxorubicin + Cyclophosphamide → Docetaxel + Trastuzumab)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-4',
        requiredStage: ['II', 'III'],
        confidenceScore: '0.90'
      },

      // Lung Cancer NSCLC mappings
      {
        cancerType: 'Lung Cancer (NSCLC)',
        histology: 'Adenocarcinoma',
        biomarkers: ['PD-L1+'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab Monotherapy',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-8',
        requiredStage: ['IV'],
        confidenceScore: '0.88'
      },
      {
        cancerType: 'Lung Cancer (NSCLC)',
        histology: 'Adenocarcinoma',
        biomarkers: ['EGFR+'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Osimertinib',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-9',
        requiredStage: ['IV'],
        confidenceScore: '0.95'
      },

      // Colorectal Cancer mappings
      {
        cancerType: 'Colorectal Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['MSI-H'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab + Chemotherapy',
        evidenceReference: 'Category 2A',
        nccnReference: 'COLON-C',
        requiredStage: ['IV'],
        confidenceScore: '0.85'
      },
      {
        cancerType: 'Colorectal Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['KRAS+', 'MSS'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'FOLFOX + Bevacizumab',
        evidenceReference: 'Category 1',
        nccnReference: 'COLON-C',
        requiredStage: ['IV'],
        confidenceScore: '0.87'
      },

      // Small Cell Lung Cancer mappings
      {
        cancerType: 'Lung Cancer (SCLC)',
        histology: 'Small Cell',
        biomarkers: [],
        treatmentIntent: 'Curative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Cisplatin + Etoposide + Concurrent RT',
        evidenceReference: 'Category 1',
        nccnReference: 'SCLC-4',
        requiredStage: ['III'],
        confidenceScore: '0.90'
      },
      {
        cancerType: 'Lung Cancer (SCLC)',
        histology: 'Small Cell',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Carboplatin + Etoposide + Atezolizumab',
        evidenceReference: 'Category 1',
        nccnReference: 'SCLC-5',
        requiredStage: ['IV'],
        confidenceScore: '0.88'
      }
    ];

    // Insert mapping data
    await db.insert(treatmentPlanMappings).values(mappingData);
    console.log(`✅ Inserted ${mappingData.length} treatment plan mappings`);

    console.log('🎉 Treatment criteria seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding treatment criteria:', error);
    throw error;
  }
}

export { seedTreatmentCriteria };

// Run seeding
seedTreatmentCriteria()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });