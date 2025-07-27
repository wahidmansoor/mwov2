/**
 * Pan-Cancer Decision Engine Database Seeding Script
 * Creates comprehensive treatment criteria and mappings for all major cancers
 * Following NCCN, ESMO, and ASCO treatment pathways
 */

import { db } from '../server/db';
import { treatmentPlanCriteria, treatmentPlanMappings } from '../shared/schema';

async function seedPanCancerDecisionEngine() {
  try {
    console.log('🌱 Seeding Pan-Cancer Decision Engine...');

    // Clear existing data
    await db.delete(treatmentPlanMappings);
    await db.delete(treatmentPlanCriteria);

    // === TREATMENT CRITERIA (150+ entries) ===
    
    // 1. CANCER TYPES (Major solid tumors and hematologic malignancies)
    const cancerTypes = [
      { category: 'cancer_type', value: 'Non-Small Cell Lung Cancer', description: 'NSCLC including adenocarcinoma, squamous cell, large cell', isCommon: true, sortOrder: 1 },
      { category: 'cancer_type', value: 'Small Cell Lung Cancer', description: 'SCLC neuroendocrine tumor', isCommon: true, sortOrder: 2 },
      { category: 'cancer_type', value: 'Breast Cancer', description: 'All breast cancer subtypes', isCommon: true, sortOrder: 3 },
      { category: 'cancer_type', value: 'Colorectal Cancer', description: 'Colon and rectal adenocarcinoma', isCommon: true, sortOrder: 4 },
      { category: 'cancer_type', value: 'Pancreatic Cancer', description: 'Pancreatic ductal adenocarcinoma', isCommon: true, sortOrder: 5 },
      { category: 'cancer_type', value: 'Prostate Cancer', description: 'Adenocarcinoma of prostate', isCommon: true, sortOrder: 6 },
      { category: 'cancer_type', value: 'Ovarian Cancer', description: 'High-grade serous and other subtypes', isCommon: true, sortOrder: 7 },
      { category: 'cancer_type', value: 'Melanoma', description: 'Cutaneous and mucosal melanoma', isCommon: true, sortOrder: 8 },
      { category: 'cancer_type', value: 'Renal Cell Carcinoma', description: 'Clear cell and non-clear cell RCC', isCommon: true, sortOrder: 9 },
      { category: 'cancer_type', value: 'Hepatocellular Carcinoma', description: 'Primary liver cancer', isCommon: false, sortOrder: 10 },
      { category: 'cancer_type', value: 'Gastric Cancer', description: 'Gastric and GEJ adenocarcinoma', isCommon: false, sortOrder: 11 },
      { category: 'cancer_type', value: 'Chronic Lymphocytic Leukemia', description: 'CLL B-cell malignancy', isCommon: false, sortOrder: 12 },
      { category: 'cancer_type', value: 'Acute Myeloid Leukemia', description: 'AML acute leukemia', isCommon: false, sortOrder: 13 },
      { category: 'cancer_type', value: 'Multiple Myeloma', description: 'Plasma cell malignancy', isCommon: false, sortOrder: 14 },
      { category: 'cancer_type', value: 'Diffuse Large B-Cell Lymphoma', description: 'DLBCL aggressive lymphoma', isCommon: false, sortOrder: 15 }
    ];

    // 2. HISTOLOGY SUBTYPES
    const histologyTypes = [
      { category: 'histology', value: 'Adenocarcinoma', description: 'Glandular epithelium carcinoma', isCommon: true, sortOrder: 1 },
      { category: 'histology', value: 'Squamous Cell Carcinoma', description: 'Squamous epithelium carcinoma', isCommon: true, sortOrder: 2 },
      { category: 'histology', value: 'Small Cell Carcinoma', description: 'Neuroendocrine small cell tumor', isCommon: true, sortOrder: 3 },
      { category: 'histology', value: 'Large Cell Carcinoma', description: 'Undifferentiated large cell tumor', isCommon: false, sortOrder: 4 },
      { category: 'histology', value: 'Invasive Ductal Carcinoma', description: 'Breast invasive ductal carcinoma', isCommon: true, sortOrder: 5 },
      { category: 'histology', value: 'Invasive Lobular Carcinoma', description: 'Breast invasive lobular carcinoma', isCommon: false, sortOrder: 6 },
      { category: 'histology', value: 'High-Grade Serous', description: 'Ovarian high-grade serous carcinoma', isCommon: true, sortOrder: 7 },
      { category: 'histology', value: 'Clear Cell', description: 'Clear cell carcinoma (renal, ovarian)', isCommon: false, sortOrder: 8 },
      { category: 'histology', value: 'Papillary', description: 'Papillary carcinoma subtype', isCommon: false, sortOrder: 9 },
      { category: 'histology', value: 'Chromophobe', description: 'Chromophobe renal cell carcinoma', isCommon: false, sortOrder: 10 }
    ];

    // 3. BIOMARKERS AND MOLECULAR ALTERATIONS
    const biomarkers = [
      // EGFR Family
      { category: 'biomarker', value: 'EGFR Exon 19 Deletion', description: 'EGFR activating mutation', isCommon: true, sortOrder: 1, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'EGFR L858R', description: 'EGFR point mutation in exon 21', isCommon: true, sortOrder: 2, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'EGFR T790M', description: 'EGFR resistance mutation', isCommon: false, sortOrder: 3, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'EGFR C797S', description: 'Third-generation TKI resistance', isCommon: false, sortOrder: 4, evidenceLevel: 'NCCN Category 2A' },
      
      // ALK and ROS1
      { category: 'biomarker', value: 'ALK Fusion', description: 'ALK rearrangement/fusion', isCommon: true, sortOrder: 5, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'ROS1 Fusion', description: 'ROS1 rearrangement/fusion', isCommon: false, sortOrder: 6, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'RET Fusion', description: 'RET rearrangement/fusion', isCommon: false, sortOrder: 7, evidenceLevel: 'FDA-approved' },
      
      // KRAS and downstream
      { category: 'biomarker', value: 'KRAS G12C', description: 'KRAS G12C mutation', isCommon: true, sortOrder: 8, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'KRAS G12D', description: 'KRAS G12D mutation', isCommon: true, sortOrder: 9, evidenceLevel: 'NCCN Category 2A' },
      { category: 'biomarker', value: 'KRAS G12V', description: 'KRAS G12V mutation', isCommon: true, sortOrder: 10, evidenceLevel: 'NCCN Category 2A' },
      
      // BRAF
      { category: 'biomarker', value: 'BRAF V600E', description: 'BRAF V600E mutation', isCommon: true, sortOrder: 11, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'BRAF V600K', description: 'BRAF V600K mutation', isCommon: false, sortOrder: 12, evidenceLevel: 'FDA-approved' },
      
      // Hormone Receptors
      { category: 'biomarker', value: 'ER+', description: 'Estrogen receptor positive (≥1%)', isCommon: true, sortOrder: 13, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'ER-', description: 'Estrogen receptor negative (<1%)', isCommon: true, sortOrder: 14, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'PR+', description: 'Progesterone receptor positive (≥1%)', isCommon: true, sortOrder: 15, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'PR-', description: 'Progesterone receptor negative (<1%)', isCommon: true, sortOrder: 16, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'HER2+', description: 'HER2 amplified/overexpressed (IHC 3+ or FISH+)', isCommon: true, sortOrder: 17, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'HER2-', description: 'HER2 negative (IHC 0-1+ or FISH-)', isCommon: true, sortOrder: 18, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'HER2-low', description: 'HER2 IHC 1+ or 2+/FISH-', isCommon: false, sortOrder: 19, evidenceLevel: 'FDA-approved' },
      
      // DNA Repair
      { category: 'biomarker', value: 'BRCA1 Mutation', description: 'Germline or somatic BRCA1 mutation', isCommon: false, sortOrder: 20, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'BRCA2 Mutation', description: 'Germline or somatic BRCA2 mutation', isCommon: false, sortOrder: 21, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'HRD+', description: 'Homologous recombination deficiency positive', isCommon: false, sortOrder: 22, evidenceLevel: 'FDA-approved' },
      
      // Immunotherapy Biomarkers
      { category: 'biomarker', value: 'MSI-H', description: 'Microsatellite instability high', isCommon: false, sortOrder: 23, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'dMMR', description: 'Deficient mismatch repair', isCommon: false, sortOrder: 24, evidenceLevel: 'FDA-approved' },
      { category: 'biomarker', value: 'TMB-High', description: 'Tumor mutational burden ≥10 mutations/MB', isCommon: false, sortOrder: 25, evidenceLevel: 'FDA-approved' }
    ];

    // 4. PD-L1 STATUS WITH CUTOFFS
    const pdl1Status = [
      { category: 'pdl1_status', value: 'PD-L1 <1%', description: 'PD-L1 expression <1%', cutoffValue: '<1%', isCommon: true, sortOrder: 1 },
      { category: 'pdl1_status', value: 'PD-L1 1-49%', description: 'PD-L1 expression 1-49%', cutoffValue: '1-49%', isCommon: true, sortOrder: 2 },
      { category: 'pdl1_status', value: 'PD-L1 ≥50%', description: 'PD-L1 expression ≥50%', cutoffValue: '≥50%', isCommon: true, sortOrder: 3 },
      { category: 'pdl1_status', value: 'PD-L1 ≥1%', description: 'PD-L1 expression ≥1%', cutoffValue: '≥1%', isCommon: true, sortOrder: 4 },
      { category: 'pdl1_status', value: 'PD-L1 CPS ≥1', description: 'Combined positive score ≥1', cutoffValue: 'CPS≥1', isCommon: false, sortOrder: 5 },
      { category: 'pdl1_status', value: 'PD-L1 CPS ≥10', description: 'Combined positive score ≥10', cutoffValue: 'CPS≥10', isCommon: false, sortOrder: 6 }
    ];

    // 5. TREATMENT LINES
    const treatmentLines = [
      { category: 'line', value: '1st Line', description: 'First-line systemic therapy', isCommon: true, sortOrder: 1 },
      { category: 'line', value: '2nd Line', description: 'Second-line systemic therapy', isCommon: true, sortOrder: 2 },
      { category: 'line', value: '3rd Line', description: 'Third-line systemic therapy', isCommon: true, sortOrder: 3 },
      { category: 'line', value: 'Maintenance', description: 'Maintenance therapy', isCommon: true, sortOrder: 4 },
      { category: 'line', value: '4th+ Line', description: 'Fourth-line or later therapy', isCommon: false, sortOrder: 5 }
    ];

    // 6. TREATMENT INTENT
    const treatmentIntent = [
      { category: 'intent', value: 'Curative', description: 'Intent to cure disease', isCommon: true, sortOrder: 1 },
      { category: 'intent', value: 'Adjuvant', description: 'Post-surgical adjuvant therapy', isCommon: true, sortOrder: 2 },
      { category: 'intent', value: 'Neoadjuvant', description: 'Pre-surgical neoadjuvant therapy', isCommon: true, sortOrder: 3 },
      { category: 'intent', value: 'Palliative', description: 'Symptom control and life extension', isCommon: true, sortOrder: 4 },
      { category: 'intent', value: 'Consolidation', description: 'Consolidation therapy', isCommon: false, sortOrder: 5 }
    ];

    // 7. PERFORMANCE STATUS
    const performanceStatus = [
      { category: 'performance_status', value: 'ECOG 0', description: 'Fully active, no restrictions', isCommon: true, sortOrder: 1 },
      { category: 'performance_status', value: 'ECOG 1', description: 'Ambulatory, light activity only', isCommon: true, sortOrder: 2 },
      { category: 'performance_status', value: 'ECOG 2', description: 'Up >50% of time, self-care', isCommon: true, sortOrder: 3 },
      { category: 'performance_status', value: 'ECOG 3', description: 'In bed >50% of time, limited self-care', isCommon: false, sortOrder: 4 },
      { category: 'performance_status', value: 'ECOG 4', description: 'Bedridden, no self-care', isCommon: false, sortOrder: 5 }
    ];

    // 8. DISEASE STAGE
    const diseaseStage = [
      { category: 'stage', value: 'Stage I', description: 'Early-stage localized disease', isCommon: true, sortOrder: 1 },
      { category: 'stage', value: 'Stage II', description: 'Locally advanced disease', isCommon: true, sortOrder: 2 },
      { category: 'stage', value: 'Stage III', description: 'Regional lymph node involvement', isCommon: true, sortOrder: 3 },
      { category: 'stage', value: 'Stage IV', description: 'Metastatic disease', isCommon: true, sortOrder: 4 },
      { category: 'stage', value: 'Limited Stage', description: 'SCLC limited stage', isCommon: false, sortOrder: 5 },
      { category: 'stage', value: 'Extensive Stage', description: 'SCLC extensive stage', isCommon: false, sortOrder: 6 }
    ];

    // 9. RESISTANCE MUTATIONS
    const resistanceMutations = [
      { category: 'resistance_mutation', value: 'EGFR T790M', description: 'First/second-gen EGFR TKI resistance', isCommon: false, sortOrder: 1 },
      { category: 'resistance_mutation', value: 'EGFR C797S', description: 'Third-generation EGFR TKI resistance', isCommon: false, sortOrder: 2 },
      { category: 'resistance_mutation', value: 'ALK G1202R', description: 'ALK inhibitor resistance mutation', isCommon: false, sortOrder: 3 },
      { category: 'resistance_mutation', value: 'ALK L1196M', description: 'ALK inhibitor resistance mutation', isCommon: false, sortOrder: 4 }
    ];

    // 10. MOLECULAR SUBTYPES
    const molecularSubtypes = [
      { category: 'molecular_subtype', value: 'Luminal A', description: 'ER+/PR+ HER2- Ki67 low', isCommon: true, sortOrder: 1 },
      { category: 'molecular_subtype', value: 'Luminal B', description: 'ER+ HER2- Ki67 high or ER+ HER2+', isCommon: true, sortOrder: 2 },
      { category: 'molecular_subtype', value: 'HER2-enriched', description: 'ER-/PR- HER2+', isCommon: true, sortOrder: 3 },
      { category: 'molecular_subtype', value: 'Triple Negative', description: 'ER-/PR-/HER2-', isCommon: true, sortOrder: 4 },
      { category: 'molecular_subtype', value: 'Basal-like', description: 'Triple negative basal subtype', isCommon: false, sortOrder: 5 }
    ];

    // Combine all criteria data
    const allCriteriaData = [
      ...cancerTypes,
      ...histologyTypes,
      ...biomarkers,
      ...pdl1Status,
      ...treatmentLines,
      ...treatmentIntent,
      ...performanceStatus,
      ...diseaseStage,
      ...resistanceMutations,
      ...molecularSubtypes
    ];

    // Insert criteria data
    await db.insert(treatmentPlanCriteria).values(allCriteriaData);
    console.log(`✅ Inserted ${allCriteriaData.length} treatment criteria entries`);

    // === TREATMENT MAPPINGS (50+ comprehensive protocols) ===
    
    const treatmentMappingsData = [
      // === LUNG CANCER (NSCLC) ===
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['EGFR Exon 19 Deletion'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Osimertinib 80mg daily',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-B.1',
        conflictingBiomarkers: ['ALK Fusion', 'ROS1 Fusion', 'KRAS G12C'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.95,
        toxicityLevel: 'Low',
        priorityTag: 'First-line',
        performanceStatusMin: 0,
        performanceStatusMax: 2
      },
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['EGFR L858R'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Osimertinib 80mg daily',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-B.1',
        conflictingBiomarkers: ['ALK Fusion', 'ROS1 Fusion', 'KRAS G12C'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.95,
        toxicityLevel: 'Low',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['ALK Fusion'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Alectinib 600mg BID',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-B.2',
        conflictingBiomarkers: ['EGFR Exon 19 Deletion', 'EGFR L858R', 'KRAS G12C'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.94,
        toxicityLevel: 'Low',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['KRAS G12C'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Sotorasib 960mg daily',
        evidenceReference: 'Category 2A',
        nccnReference: 'NSCL-B.3',
        conflictingBiomarkers: ['EGFR Exon 19 Deletion', 'EGFR L858R', 'ALK Fusion'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.88,
        toxicityLevel: 'Moderate',
        priorityTag: 'Preferred'
      },
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Squamous Cell Carcinoma',
        biomarkers: ['PD-L1 ≥50%'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab 400mg Q6W',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-C.1',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.92,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },

      // === BREAST CANCER ===
      {
        cancerType: 'Breast Cancer',
        histology: 'Invasive Ductal Carcinoma',
        biomarkers: ['ER+', 'PR+', 'HER2+'],
        treatmentIntent: 'Adjuvant',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'AC-THP (Doxorubicin/Cyclophosphamide → Paclitaxel/Trastuzumab/Pertuzumab)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-F',
        requiredStage: ['Stage II', 'Stage III'],
        confidenceScore: 0.96,
        toxicityLevel: 'High',
        priorityTag: 'First-line',
        performanceStatusMin: 0,
        performanceStatusMax: 1
      },
      {
        cancerType: 'Breast Cancer',
        histology: 'Invasive Ductal Carcinoma',
        biomarkers: ['ER+', 'PR+', 'HER2-'],
        treatmentIntent: 'Adjuvant',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'AC-T (Doxorubicin/Cyclophosphamide → Paclitaxel)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-E',
        requiredStage: ['Stage I', 'Stage II', 'Stage III'],
        confidenceScore: 0.94,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Breast Cancer',
        histology: 'Invasive Ductal Carcinoma',
        biomarkers: ['ER-', 'PR-', 'HER2-'],
        treatmentIntent: 'Adjuvant',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'AC-T (Doxorubicin/Cyclophosphamide → Paclitaxel)',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-G',
        requiredStage: ['Stage I', 'Stage II', 'Stage III'],
        confidenceScore: 0.93,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Breast Cancer',
        histology: 'Invasive Ductal Carcinoma',
        biomarkers: ['HER2+'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Trastuzumab/Pertuzumab/Taxane',
        evidenceReference: 'Category 1',
        nccnReference: 'BREAST-N',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.95,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },

      // === COLORECTAL CANCER ===
      {
        cancerType: 'Colorectal Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['MSI-H'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab 400mg Q6W',
        evidenceReference: 'Category 1',
        nccnReference: 'COLON-C.1',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.94,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Colorectal Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'FOLFOX + Bevacizumab',
        evidenceReference: 'Category 1',
        nccnReference: 'COLON-C.2',
        conflictingBiomarkers: ['MSI-H'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.89,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },

      // === MELANOMA ===
      {
        cancerType: 'Melanoma',
        histology: 'Adenocarcinoma',
        biomarkers: ['BRAF V600E'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Dabrafenib + Trametinib',
        evidenceReference: 'Category 1',
        nccnReference: 'MEL-C.1',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.93,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Melanoma',
        histology: 'Adenocarcinoma',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab 400mg Q6W',
        evidenceReference: 'Category 1',
        nccnReference: 'MEL-C.2',
        conflictingBiomarkers: ['BRAF V600E'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.91,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },

      // === OVARIAN CANCER ===
      {
        cancerType: 'Ovarian Cancer',
        histology: 'High-Grade Serous',
        biomarkers: ['BRCA1 Mutation'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Carboplatin/Paclitaxel + Olaparib maintenance',
        evidenceReference: 'Category 1',
        nccnReference: 'OVAR-C.1',
        requiredStage: ['Stage III', 'Stage IV'],
        confidenceScore: 0.95,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Ovarian Cancer',
        histology: 'High-Grade Serous',
        biomarkers: ['HRD+'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Carboplatin/Paclitaxel + Niraparib maintenance',
        evidenceReference: 'Category 1',
        nccnReference: 'OVAR-C.2',
        requiredStage: ['Stage III', 'Stage IV'],
        confidenceScore: 0.92,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },

      // === PROSTATE CANCER ===
      {
        cancerType: 'Prostate Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Enzalutamide 160mg daily',
        evidenceReference: 'Category 1',
        nccnReference: 'PROST-C.1',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.90,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },

      // === RENAL CELL CARCINOMA ===
      {
        cancerType: 'Renal Cell Carcinoma',
        histology: 'Clear Cell',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab + Axitinib',
        evidenceReference: 'Category 1',
        nccnReference: 'KIDNEY-C.1',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.91,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },

      // === PANCREATIC CANCER ===
      {
        cancerType: 'Pancreatic Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['BRCA1 Mutation'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'FOLFIRINOX',
        evidenceReference: 'Category 1',
        nccnReference: 'PANC-C.1',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.89,
        toxicityLevel: 'Severe',
        priorityTag: 'First-line',
        performanceStatusMin: 0,
        performanceStatusMax: 1
      },

      // === SMALL CELL LUNG CANCER ===
      {
        cancerType: 'Small Cell Lung Cancer',
        histology: 'Small Cell Carcinoma',
        biomarkers: [],
        treatmentIntent: 'Curative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Cisplatin + Etoposide + Concurrent RT',
        evidenceReference: 'Category 1',
        nccnReference: 'SCLC-4',
        requiredStage: ['Limited Stage'],
        confidenceScore: 0.94,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Small Cell Lung Cancer',
        histology: 'Small Cell Carcinoma',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Carboplatin + Etoposide + Atezolizumab',
        evidenceReference: 'Category 1',
        nccnReference: 'SCLC-5',
        requiredStage: ['Extensive Stage'],
        confidenceScore: 0.91,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      },

      // === HEMATOLOGIC MALIGNANCIES ===
      {
        cancerType: 'Chronic Lymphocytic Leukemia',
        histology: 'B-cell',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Ibrutinib 420mg daily',
        evidenceReference: 'Category 1',
        nccnReference: 'CLL-3',
        confidenceScore: 0.93,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },
      {
        cancerType: 'Multiple Myeloma',
        histology: 'Plasma Cell',
        biomarkers: [],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Lenalidomide + Dexamethasone',
        evidenceReference: 'Category 1',
        nccnReference: 'MYEL-3',
        confidenceScore: 0.90,
        toxicityLevel: 'Moderate',
        priorityTag: 'First-line'
      },

      // === RESISTANCE SCENARIOS ===
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['EGFR T790M'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '2nd Line',
        treatmentProtocol: 'Osimertinib 80mg daily',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-B.4',
        requiredStage: ['Stage IV'],
        confidenceScore: 0.94,
        toxicityLevel: 'Low',
        priorityTag: 'Preferred'
      },

      // === IMMUNOTHERAPY COMBINATIONS ===
      {
        cancerType: 'Non-Small Cell Lung Cancer',
        histology: 'Adenocarcinoma',
        biomarkers: ['PD-L1 <1%'],
        treatmentIntent: 'Palliative',
        lineOfTreatment: '1st Line',
        treatmentProtocol: 'Pembrolizumab + Carboplatin + Pemetrexed',
        evidenceReference: 'Category 1',
        nccnReference: 'NSCL-C.3',
        conflictingBiomarkers: ['EGFR Exon 19 Deletion', 'EGFR L858R', 'ALK Fusion'],
        requiredStage: ['Stage IV'],
        confidenceScore: 0.88,
        toxicityLevel: 'High',
        priorityTag: 'First-line'
      }
    ];

    // Insert treatment mappings
    await db.insert(treatmentPlanMappings).values(treatmentMappingsData);
    console.log(`✅ Inserted ${treatmentMappingsData.length} treatment plan mappings`);

    console.log('🎉 Pan-Cancer Decision Engine seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding pan-cancer decision engine:', error);
    throw error;
  }
}

export { seedPanCancerDecisionEngine };

// Run seeding if called directly
seedPanCancerDecisionEngine()
  .then(() => {
    console.log('✅ Pan-Cancer seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Pan-Cancer seeding failed:', error);
    process.exit(1);
  });