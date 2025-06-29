import { db } from './server/db.ts';
import { 
  nccnGuidelines, 
  clinicalDecisionSupport, 
  biomarkerGuidelines 
} from './shared/schema.ts';

/**
 * NCCN Ampullary Adenocarcinoma Guidelines v2.2025 Integration
 * Comprehensive data extraction and database population
 */

async function importAmpullaryGuidelines() {
  console.log('Starting NCCN Ampullary Adenocarcinoma v2.2025 guidelines import...');

  try {
    // Core Ampullary Adenocarcinoma Guidelines Data
    const ampullaryGuidelinesData = [
      {
        referenceCode: 'AMP-1',
        title: 'Clinical Suspicion of Ampullary Neoplasm',
        category: 'Diagnosis',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          workup: [
            'Digital rectal examination (DRE)',
            'Inguinal lymph node evaluation',
            'Consider biopsy or fine needle aspiration (FNA) if suspicious nodes',
            'Chest/abdomen/pelvis CT or MRI',
            'Consider FDG-PET/CT or FDG-PET/MRI',
            'Anoscopy',
            'HIV testing (if HIV status unknown)',
            'Gynecologic exam, including screening for cervical cancer',
            'Fertility risk discussion/counseling in appropriate patients'
          ],
          geneticTesting: {
            indication: 'Recommended for any patient with confirmed ampullary adenocarcinoma or positive family history',
            genes: ['ATM', 'BRCA1', 'BRCA2', 'CDKN2A', 'MLH1', 'MSH2', 'MSH6', 'PALB2', 'PMS2', 'STK11', 'TP53'],
            counseling: 'Required for positive mutations and positive family history'
          }
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All stages'],
        biomarkerRequirements: ['ATM', 'BRCA1', 'BRCA2', 'CDKN2A', 'MLH1', 'MSH2', 'MSH6', 'PALB2', 'PMS2', 'STK11', 'TP53'],
        treatmentSettings: ['Initial Workup', 'Diagnostic'],
        specialPopulations: ['Hereditary Cancer Syndromes', 'HIV Positive'],
        crossReferences: ['AMP-A', 'ST-1'],
        updatesFromPrevious: 'References updated throughout guidelines',
        clinicalDecisionPoints: ['Genetic testing indication', 'Imaging modality selection', 'Biopsy consideration'],
        monitoringRequirements: ['Follow-up imaging', 'Genetic counseling outcomes'],
        contraindications: [],
        alternativeApproaches: ['Alternative imaging if CT/MRI contraindicated'],
        qualityMeasures: ['Genetic testing completion rate', 'Imaging protocol adherence']
      },
      {
        referenceCode: 'AMP-2',
        title: 'Ampullary Adenoma Treatment',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          treatmentOptions: [
            {
              approach: 'Endoscopic removal',
              preference: 'Preferred',
              indication: 'Suitable adenomas without high-risk features'
            },
            {
              approach: 'Surgical ampullectomy',
              preference: 'Alternative',
              indication: 'Complex adenomas not amenable to endoscopic removal'
            },
            {
              approach: 'Pancreatoduodenectomy',
              preference: 'Last resort',
              indication: 'Large adenomas or suspicion of malignancy'
            }
          ],
          surgicalPrinciples: 'Follow AMP-C principles of surgical technique'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Adenoma'],
        treatmentSettings: ['Curative Intent'],
        crossReferences: ['AMP-C'],
        clinicalDecisionPoints: ['Treatment modality selection', 'Surgical approach'],
        monitoringRequirements: ['Post-procedure surveillance'],
        alternativeApproaches: ['Multiple surgical approaches available']
      },
      {
        referenceCode: 'AMP-3',
        title: 'Adenocarcinoma Treatment Algorithm',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          treatmentAlgorithm: {
            confirmed: 'Adenocarcinoma confirmed',
            stageI_II: {
              approach: 'Curative intent',
              options: ['Surgical resection', 'Adjuvant therapy consideration']
            },
            stageIII_IV: {
              approach: 'Palliative/systemic therapy',
              options: ['Systemic therapy', 'Palliative management']
            }
          },
          geneticTesting: {
            timing: 'If not previously noted',
            genes: ['ATM', 'BRCA1', 'BRCA2', 'CDKN2A', 'MLH1', 'MSH2', 'MSH6', 'PALB2', 'PMS2', 'STK11', 'TP53'],
            counseling: 'Required for positive mutations and family history'
          }
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All Stages'],
        biomarkerRequirements: ['ATM', 'BRCA1', 'BRCA2', 'CDKN2A', 'MLH1', 'MSH2', 'MSH6', 'PALB2', 'PMS2', 'STK11', 'TP53'],
        treatmentSettings: ['Curative Intent', 'Palliative'],
        specialPopulations: ['Hereditary Cancer Syndromes'],
        clinicalDecisionPoints: ['Stage determination', 'Treatment intent', 'Genetic testing timing'],
        monitoringRequirements: ['Disease progression', 'Treatment response']
      },
      {
        referenceCode: 'AMP-4',
        title: 'Localized Disease Management',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          primaryTreatment: {
            preferred: 'Pancreatoduodenectomy with or without adjuvant chemoradiation',
            indication: 'Medically able to tolerate major surgery',
            adjuvant: 'See GAST-F for regimens'
          },
          alternativeApproaches: {
            perioperative: 'Chemoradiation or systemic therapy',
            msiH_dMMR: {
              approach: 'Perioperative immunotherapy',
              category: '2A',
              consultation: 'Multidisciplinary team required'
            }
          },
          biomarkerTesting: ['MSI-H', 'dMMR'],
          surgicalRole: 'Role unclear after complete response on neoadjuvant immunotherapy'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Localized'],
        biomarkerRequirements: ['MSI-H', 'dMMR'],
        treatmentSettings: ['Curative Intent', 'Perioperative'],
        crossReferences: ['GAST-B', 'GAST-C', 'GAST-E', 'GAST-F'],
        clinicalDecisionPoints: ['Surgical candidacy', 'Adjuvant therapy selection', 'MSI-H/dMMR testing'],
        monitoringRequirements: ['Surgical outcomes', 'Adjuvant therapy tolerance'],
        contraindications: ['Medical inability to tolerate major surgery'],
        alternativeApproaches: ['Chemoradiation for non-surgical candidates']
      },
      {
        referenceCode: 'AMP-5',
        title: 'Postoperative Adjuvant Treatment',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          adjuvantOptions: [
            {
              approach: 'Chemotherapy with or without chemoradiation',
              reference: 'GAST-F (systemic therapy principles)'
            },
            {
              approach: 'Chemoradiation and chemotherapy',
              reference: 'GAST-G (radiation therapy principles)'
            }
          ],
          surgicalOutcomes: 'For patients who have received systemic therapy (GAST-5)',
          individualizedApproach: 'Based on patient factors and surgical outcomes'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Postoperative'],
        treatmentSettings: ['Adjuvant'],
        crossReferences: ['GAST-5', 'GAST-F', 'GAST-G'],
        clinicalDecisionPoints: ['Adjuvant regimen selection', 'Treatment duration'],
        monitoringRequirements: ['Treatment tolerance', 'Disease recurrence']
      },
      {
        referenceCode: 'AMP-6',
        title: 'Metastatic Disease Management',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          primaryApproach: 'Palliative Management (GAST-9)',
          systemicTherapy: 'For appropriate candidates based on performance status',
          supportiveCare: 'Quality of life focused interventions',
          biomarkerTesting: 'Required for targeted therapy selection'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Metastatic'],
        treatmentSettings: ['Palliative'],
        crossReferences: ['GAST-9', 'GAST-B', 'GAST-C'],
        clinicalDecisionPoints: ['Treatment goals', 'Performance status assessment'],
        monitoringRequirements: ['Symptom control', 'Quality of life measures']
      },
      {
        referenceCode: 'AMP-7',
        title: 'Disease Progression Management',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          primaryApproach: 'Palliative Management (GAST-9)',
          supportiveCare: 'Best supportive care measures',
          clinicalTrials: 'Consider appropriate clinical trial opportunities',
          transitionOfCare: 'Hospice referral when indicated'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Progressive'],
        treatmentSettings: ['Palliative'],
        clinicalDecisionPoints: ['Treatment discontinuation', 'Hospice referral timing'],
        monitoringRequirements: ['Symptom burden', 'Functional status']
      },
      {
        referenceCode: 'AMP-A',
        title: 'Principles of Diagnosis, Imaging, and Staging',
        category: 'Diagnostic',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          radiationDose: {
            standard: '45–50.4 Gy (1.8 Gy/day)',
            fractions: '25–28 total fractions',
            boost: 'Higher doses may be used for positive surgical margins in selected cases'
          },
          imagingProtocols: 'Standardized approach for diagnosis and staging',
          stagingPrinciples: 'Comprehensive staging evaluation required'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All Stages'],
        treatmentSettings: ['Diagnostic', 'Treatment Planning'],
        clinicalDecisionPoints: ['Imaging modality selection', 'Radiation dose planning'],
        monitoringRequirements: ['Imaging response', 'Radiation toxicity']
      },
      {
        referenceCode: 'AMP-E',
        title: 'Principles of Systemic Therapy',
        category: 'Treatment',
        cancerType: 'Ampullary Adenocarcinoma',
        version: 'v2.2025',
        releaseDate: '2025-01-10',
        content: {
          firstLineTherapy: [
            {
              regimen: 'Fluoropyrimidine (fluorouracil or capecitabine), oxaliplatin, and trastuzumab',
              indication: 'HER2 overexpression positive',
              category: 'Category 1'
            },
            {
              regimen: 'Fluoropyrimidine, oxaliplatin, trastuzumab, and pembrolizumab',
              indication: 'HER2+ and PD-L1 CPS ≥1',
              category: 'Category 1'
            },
            {
              regimen: 'Fluoropyrimidine, cisplatin, and trastuzumab',
              indication: 'HER2 overexpression positive',
              category: 'Category 1'
            },
            {
              regimen: 'Fluoropyrimidine, oxaliplatin, and nivolumab',
              indication: 'PD-L1 CPS ≥1',
              category: 'Category 1 for PD-L1 CPS ≥5'
            },
            {
              regimen: 'Fluoropyrimidine, oxaliplatin, and pembrolizumab',
              indication: 'PD-L1 CPS ≥1',
              category: 'Category 1 for PD-L1 CPS ≥5'
            },
            {
              regimen: 'Fluoropyrimidine, oxaliplatin, and zolbetuximab-clzb',
              indication: 'CLDN18.2 positive',
              category: 'Category 1'
            },
            {
              regimen: 'Pembrolizumab monotherapy',
              indication: 'MSI-H/dMMR tumors (independent of PD-L1 status)',
              category: 'Category 1'
            },
            {
              regimen: 'Dostarlimab-gxly monotherapy',
              indication: 'MSI-H/dMMR tumors',
              category: 'Category 1'
            },
            {
              regimen: 'Nivolumab and ipilimumab',
              indication: 'Advanced disease',
              category: 'Category 2A'
            }
          ],
          biomarkerTesting: ['HER2', 'PD-L1', 'MSI-H', 'dMMR', 'CLDN18.2'],
          regimenSelection: 'Based on biomarker results and patient factors'
        },
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Advanced', 'Recurrent', 'Metastatic'],
        biomarkerRequirements: ['HER2', 'PD-L1', 'MSI-H', 'dMMR', 'CLDN18.2'],
        treatmentSettings: ['First-Line', 'Advanced Disease'],
        clinicalDecisionPoints: ['Biomarker results', 'Performance status', 'Prior therapy'],
        monitoringRequirements: ['Treatment response', 'Biomarker expression'],
        alternativeApproaches: ['Multiple regimen options based on biomarkers']
      }
    ];

    // Insert NCCN Guidelines
    console.log('Inserting NCCN Ampullary Adenocarcinoma guidelines...');
    for (const guideline of ampullaryGuidelinesData) {
      await db.insert(nccnGuidelines).values(guideline).onConflictDoNothing();
    }

    // Clinical Decision Support Entries
    const decisionSupportData = createDecisionSupportEntries();
    console.log('Inserting clinical decision support entries...');
    for (const support of decisionSupportData) {
      await db.insert(clinicalDecisionSupport).values(support).onConflictDoNothing();
    }

    // Biomarker Guidelines
    const biomarkerData = createBiomarkerGuidelines();
    console.log('Inserting biomarker guidelines...');
    for (const biomarker of biomarkerData) {
      await db.insert(biomarkerGuidelines).values(biomarker).onConflictDoNothing();
    }

    console.log('✅ NCCN Ampullary Adenocarcinoma v2.2025 guidelines import completed successfully!');
    console.log(`📊 Imported: ${ampullaryGuidelinesData.length} guidelines, ${decisionSupportData.length} decision support entries, ${biomarkerData.length} biomarker guidelines`);

  } catch (error) {
    console.error('❌ Error importing NCCN Ampullary Adenocarcinoma guidelines:', error);
    throw error;
  }
}

function createDecisionSupportEntries() {
  return [
    {
      moduleType: 'OPD',
      clinicalScenario: 'Ampullary Adenocarcinoma Screening',
      inputParameters: {
        cancerType: 'Ampullary Adenocarcinoma',
        riskFactors: ['Family history', 'Hereditary cancer syndromes'],
        symptoms: ['Abdominal pain', 'Jaundice', 'Weight loss']
      },
      recommendedActions: [
        'Digital rectal examination and inguinal lymph node evaluation',
        'Chest/abdomen/pelvis CT or MRI imaging',
        'Consider FDG-PET/CT for staging',
        'Genetic testing for hereditary cancer syndromes',
        'HIV testing if status unknown'
      ],
      evidenceStrength: 'Category 1',
      confidenceScore: 0.95,
      nccnReferences: ['AMP-1'],
      lastUpdated: '2025-01-10'
    },
    {
      moduleType: 'CDU',
      clinicalScenario: 'Ampullary Adenocarcinoma Treatment Protocols',
      inputParameters: {
        stage: 'Localized',
        biomarkers: ['HER2', 'MSI-H', 'dMMR'],
        performanceStatus: 'Good'
      },
      recommendedActions: [
        'Pancreatoduodenectomy with adjuvant chemoradiation',
        'Perioperative immunotherapy for MSI-H/dMMR tumors',
        'HER2-targeted therapy for HER2+ tumors',
        'Multidisciplinary team consultation'
      ],
      evidenceStrength: 'Category 1',
      confidenceScore: 0.92,
      nccnReferences: ['AMP-4'],
      lastUpdated: '2025-01-10'
    },
    {
      moduleType: 'Inpatient',
      clinicalScenario: 'Postoperative Ampullary Adenocarcinoma Management',
      inputParameters: {
        surgicalStatus: 'Post-pancreatoduodenectomy',
        pathology: 'R0 resection',
        complications: 'None'
      },
      recommendedActions: [
        'Adjuvant chemotherapy with or without chemoradiation',
        'Follow GAST-F systemic therapy principles',
        'Regular surveillance imaging',
        'Nutritional support and pancreatic enzyme replacement'
      ],
      evidenceStrength: 'Category 1',
      confidenceScore: 0.88,
      nccnReferences: ['AMP-5'],
      lastUpdated: '2025-01-10'
    },
    {
      moduleType: 'Palliative',
      clinicalScenario: 'Metastatic Ampullary Adenocarcinoma',
      inputParameters: {
        stage: 'Metastatic',
        performanceStatus: 'ECOG 2',
        symptoms: ['Pain', 'Jaundice', 'Fatigue']
      },
      recommendedActions: [
        'Palliative care consultation',
        'Symptom-directed management',
        'Biliary stenting for jaundice',
        'Nutritional support',
        'Psychosocial support'
      ],
      evidenceStrength: 'Category 1',
      confidenceScore: 0.85,
      nccnReferences: ['AMP-6'],
      lastUpdated: '2025-01-10'
    },
    {
      moduleType: 'Clinical Tools',
      clinicalScenario: 'Ampullary Adenocarcinoma Risk Assessment',
      inputParameters: {
        geneticTesting: 'Required',
        familyHistory: 'Positive',
        biomarkers: ['BRCA1', 'BRCA2', 'MLH1', 'MSH2']
      },
      recommendedActions: [
        'Genetic counseling referral',
        'Comprehensive gene panel testing',
        'Family screening recommendations',
        'Risk-reducing strategies discussion'
      ],
      evidenceStrength: 'Category 1',
      confidenceScore: 0.94,
      nccnReferences: ['AMP-1'],
      lastUpdated: '2025-01-10'
    }
  ];
}

function createBiomarkerGuidelines() {
  return [
    {
      biomarkerName: 'HER2',
      cancerType: 'Ampullary Adenocarcinoma',
      testingMethod: 'IHC/FISH',
      clinicalIndications: ['Advanced ampullary adenocarcinoma', 'Metastatic disease', 'Treatment selection'],
      interpretationCriteria: 'HER2 overexpression positive: IHC 3+ or FISH amplified',
      treatmentImplications: 'HER2+ patients eligible for trastuzumab-containing regimens',
      evidenceLevel: 'Category 1',
      nccnReferences: ['AMP-E'],
      lastUpdated: '2025-01-10'
    },
    {
      biomarkerName: 'PD-L1',
      cancerType: 'Ampullary Adenocarcinoma',
      testingMethod: 'IHC (CPS scoring)',
      clinicalIndications: ['Advanced disease', 'Immunotherapy selection', 'First-line treatment planning'],
      interpretationCriteria: 'CPS ≥1 for pembrolizumab eligibility, CPS ≥5 for optimal benefit',
      treatmentImplications: 'PD-L1+ patients eligible for pembrolizumab, nivolumab, or tislelizumab',
      evidenceLevel: 'Category 1',
      nccnReferences: ['AMP-E'],
      lastUpdated: '2025-01-10'
    },
    {
      biomarkerName: 'MSI-H/dMMR',
      cancerType: 'Ampullary Adenocarcinoma',
      testingMethod: 'IHC for MMR proteins or PCR/NGS for MSI',
      clinicalIndications: ['Treatment planning', 'Immunotherapy eligibility', 'Perioperative therapy selection'],
      interpretationCriteria: 'MSI-H or dMMR indicates deficient DNA repair',
      treatmentImplications: 'MSI-H/dMMR patients eligible for pembrolizumab or dostarlimab monotherapy',
      evidenceLevel: 'Category 1',
      nccnReferences: ['AMP-E', 'AMP-4'],
      lastUpdated: '2025-01-10'
    },
    {
      biomarkerName: 'CLDN18.2',
      cancerType: 'Ampullary Adenocarcinoma',
      testingMethod: 'IHC',
      clinicalIndications: ['Advanced disease', 'Targeted therapy selection', 'First-line treatment'],
      interpretationCriteria: 'CLDN18.2 positive by IHC',
      treatmentImplications: 'CLDN18.2+ patients eligible for zolbetuximab-clzb combination therapy',
      evidenceLevel: 'Category 1',
      nccnReferences: ['AMP-E'],
      lastUpdated: '2025-01-10'
    },
    {
      biomarkerName: 'Hereditary Cancer Panel',
      cancerType: 'Ampullary Adenocarcinoma',
      testingMethod: 'Germline genetic testing',
      clinicalIndications: ['All confirmed ampullary adenocarcinoma patients', 'Positive family history', 'Risk assessment'],
      interpretationCriteria: 'Test for ATM, BRCA1, BRCA2, CDKN2A, MLH1, MSH2, MSH6, PALB2, PMS2, STK11, TP53',
      treatmentImplications: 'Positive results impact treatment selection and family screening',
      evidenceLevel: 'Category 1',
      nccnReferences: ['AMP-1'],
      lastUpdated: '2025-01-10'
    }
  ];
}

// Execute import if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importAmpullaryGuidelines()
    .then(() => {
      console.log('Import completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Import failed:', error);
      process.exit(1);
    });
}

export { importAmpullaryGuidelines };