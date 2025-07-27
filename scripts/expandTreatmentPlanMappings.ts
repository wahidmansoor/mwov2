import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { treatmentPlanMappings } from '../shared/schema';

// Comprehensive pan-oncology treatment plan mappings based on 2024 NCCN/ESMO guidelines
// Referenced from authoritative sources: NCCN, ESMO, ASCO clinical practice guidelines

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

// Comprehensive treatment mappings covering all major cancer types and treatment intents
const comprehensiveGuidelineBasedMappings = [
  // BREAST CANCER - HER2+ ER+ (NCCN Category 1 recommendations)
  {
    cancerType: 'Breast Cancer',
    histology: 'Invasive Ductal Carcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['ER+', 'PR+', 'HER2+'],
    treatmentProtocol: 'AC-THP (Doxorubicin/Cyclophosphamide → Docetaxel/Trastuzumab/Pertuzumab)',
    evidenceReference: 'Category 1',
    nccnReference: 'BREAST-F',
    confidenceScore: 0.95,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Breast Cancer',
    histology: 'Invasive Ductal Carcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['ER+', 'PR+', 'HER2-'],
    treatmentProtocol: 'AC-T (Doxorubicin/Cyclophosphamide → Docetaxel)',
    evidenceReference: 'Category 1',
    nccnReference: 'BREAST-F',
    confidenceScore: 0.92,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Breast Cancer',
    histology: 'Invasive Ductal Carcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['ER-', 'PR-', 'HER2-'],
    treatmentProtocol: 'ddAC-T (Dose-dense Adriamycin/Cyclophosphamide → Paclitaxel)',
    evidenceReference: 'Category 1',
    nccnReference: 'BREAST-F',
    confidenceScore: 0.90,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Breast Cancer',
    histology: 'Invasive Ductal Carcinoma',
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['HER2+'],
    treatmentProtocol: 'TCHP (Docetaxel/Carboplatin/Trastuzumab/Pertuzumab)',
    evidenceReference: 'Category 1',
    nccnReference: 'BREAST-D',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // NON-SMALL CELL LUNG CANCER - EGFR+ (NCCN Category 1 adjuvant osimertinib)
  {
    cancerType: 'Non-Small Cell Lung Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['EGFR Exon 19 del'],
    treatmentProtocol: 'Osimertinib 80mg daily × 3 years',
    evidenceReference: 'Category 1',
    nccnReference: 'NSCL-B',
    confidenceScore: 0.96,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['IB', 'II', 'IIIA'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Non-Small Cell Lung Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['EGFR L858R'],
    treatmentProtocol: 'Osimertinib 80mg daily × 3 years',
    evidenceReference: 'Category 1',
    nccnReference: 'NSCL-B',
    confidenceScore: 0.96,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['IB', 'II', 'IIIA'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Non-Small Cell Lung Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: ['EGFR Exon 19 del'],
    treatmentProtocol: 'Osimertinib 80mg daily',
    evidenceReference: 'Category 1',
    nccnReference: 'NSCL-6',
    confidenceScore: 0.98,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },
  {
    cancerType: 'Non-Small Cell Lung Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'Nivolumab + Platinum-based Chemotherapy',
    evidenceReference: 'Category 1',
    nccnReference: 'NSCL-A',
    confidenceScore: 0.91,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'IIIA'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // OVARIAN CANCER - BRCA wild-type (ESMO 2024 guidelines)
  {
    cancerType: 'Ovarian Cancer',
    histology: 'High-grade Serous Carcinoma',
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['BRCA wt'],
    treatmentProtocol: 'Carboplatin + Paclitaxel',
    evidenceReference: 'Level I',
    nccnReference: 'OVAR-3',
    confidenceScore: 0.93,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['III', 'IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },
  {
    cancerType: 'Ovarian Cancer',
    histology: 'High-grade Serous Carcinoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: ['BRCA1/2 mut'],
    treatmentProtocol: 'Carboplatin + Paclitaxel → Olaparib maintenance',
    evidenceReference: 'Category 1',
    nccnReference: 'OVAR-5',
    confidenceScore: 0.95,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['III', 'IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // CHRONIC LYMPHOCYTIC LEUKEMIA - del(17p) (NCCN 2024)
  {
    cancerType: 'Chronic Lymphocytic Leukemia',
    histology: 'B-cell lymphoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: ['del(17p)'],
    treatmentProtocol: 'Acalabrutinib + Obinutuzumab',
    evidenceReference: 'Category 1',
    nccnReference: 'CLL-3',
    confidenceScore: 0.96,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['all'],
    performanceStatusMin: 0,
    performanceStatusMax: 3,
    isActive: true
  },
  {
    cancerType: 'Chronic Lymphocytic Leukemia',
    histology: 'B-cell lymphoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: ['del(17p)'],
    treatmentProtocol: 'Venetoclax + Obinutuzumab',
    evidenceReference: 'Category 1',
    nccnReference: 'CLL-3',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Alternative',
    requiredStage: ['all'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // MULTIPLE MYELOMA - High-risk cytogenetics (NCCN 2024)
  {
    cancerType: 'Multiple Myeloma',
    histology: 'Plasma cell myeloma',
    treatmentIntent: 'Maintenance',
    lineOfTreatment: '1st Line',
    biomarkers: ['del(17p)', 't(4;14)', 't(14;16)'],
    treatmentProtocol: 'Daratumumab + Lenalidomide',
    evidenceReference: 'Category 1',
    nccnReference: 'MYEL-4',
    confidenceScore: 0.92,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['all'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },
  {
    cancerType: 'Multiple Myeloma',
    histology: 'Plasma cell myeloma',
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'D-VRd (Daratumumab/Bortezomib/Lenalidomide/Dexamethasone)',
    evidenceReference: 'Category 1',
    nccnReference: 'MYEL-2',
    confidenceScore: 0.95,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['I', 'II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // MELANOMA - BRAF V600E (NCCN 2024)
  {
    cancerType: 'Melanoma',
    histology: 'Melanoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['BRAF V600E'],
    treatmentProtocol: 'Dabrafenib + Trametinib × 52 weeks',
    evidenceReference: 'Category 1',
    nccnReference: 'MEL-3',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Melanoma',
    histology: 'Melanoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'Nivolumab × 52 weeks',
    evidenceReference: 'Category 1',
    nccnReference: 'MEL-3',
    confidenceScore: 0.93,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // PANCREATIC CANCER
  {
    cancerType: 'Pancreatic Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'FOLFIRINOX (Modified)',
    evidenceReference: 'Category 1',
    nccnReference: 'PANC-C',
    confidenceScore: 0.89,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Pancreatic Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'Modified FOLFIRINOX',
    evidenceReference: 'Category 1',
    nccnReference: 'PANC-D',
    confidenceScore: 0.91,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['IB', 'II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // COLORECTAL CANCER
  {
    cancerType: 'Colorectal Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['MSS'],
    treatmentProtocol: 'FOLFOX (5-FU/Leucovorin/Oxaliplatin)',
    evidenceReference: 'Category 1',
    nccnReference: 'COLO-F',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },
  {
    cancerType: 'Colorectal Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: ['KRAS wt'],
    treatmentProtocol: 'FOLFOX + Cetuximab',
    evidenceReference: 'Category 1',
    nccnReference: 'COLO-7',
    confidenceScore: 0.92,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // PROSTATE CANCER
  {
    cancerType: 'Prostate Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'ADT + Abiraterone',
    evidenceReference: 'Category 1',
    nccnReference: 'PROS-7',
    confidenceScore: 0.95,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // ACUTE MYELOID LEUKEMIA
  {
    cancerType: 'Acute Myeloid Leukemia',
    histology: 'Acute leukemia',
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    biomarkers: ['FLT3+'],
    treatmentProtocol: '7+3 + Midostaurin',
    evidenceReference: 'Category 1',
    nccnReference: 'AML-2',
    confidenceScore: 0.93,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['all'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // GASTROINTESTINAL STROMAL TUMOR (GIST)
  {
    cancerType: 'GIST',
    histology: 'Gastrointestinal stromal tumor',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: ['KIT mutation'],
    treatmentProtocol: 'Imatinib 400mg daily',
    evidenceReference: 'Category 1',
    nccnReference: 'GIST-3',
    confidenceScore: 0.96,
    toxicityLevel: 'Low',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // GASTRIC CANCER
  {
    cancerType: 'Gastric Cancer',
    histology: 'Adenocarcinoma',
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'Capecitabine + Oxaliplatin (CAPOX)',
    evidenceReference: 'Category 1',
    nccnReference: 'GAST-F',
    confidenceScore: 0.90,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // SMALL CELL LUNG CANCER
  {
    cancerType: 'Small Cell Lung Cancer',
    histology: 'Small cell carcinoma',
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'Etoposide + Carboplatin + Durvalumab',
    evidenceReference: 'Category 1',
    nccnReference: 'SCLC-2',
    confidenceScore: 0.92,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // BLADDER CANCER
  {
    cancerType: 'Bladder Cancer',
    histology: 'Urothelial carcinoma',
    treatmentIntent: 'Neoadjuvant',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'ddMVAC (Dose-dense Methotrexate/Vinblastine/Adriamycin/Cisplatin)',
    evidenceReference: 'Category 1',
    nccnReference: 'BLAD-5',
    confidenceScore: 0.91,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['II', 'III'],
    performanceStatusMin: 0,
    performanceStatusMax: 1,
    isActive: true
  },

  // NON-HODGKIN LYMPHOMA
  {
    cancerType: 'Non-Hodgkin Lymphoma',
    histology: 'Diffuse Large B-cell Lymphoma',
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'R-CHOP (Rituximab + CHOP)',
    evidenceReference: 'Category 1',
    nccnReference: 'NHODG-7',
    confidenceScore: 0.95,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['I', 'II', 'III', 'IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // HODGKIN LYMPHOMA
  {
    cancerType: 'Hodgkin Lymphoma',
    histology: 'Classical Hodgkin lymphoma',
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'ABVD (Adriamycin/Bleomycin/Vinblastine/Dacarbazine)',
    evidenceReference: 'Category 1',
    nccnReference: 'HODG-3',
    confidenceScore: 0.96,
    toxicityLevel: 'High',
    priorityTag: 'Preferred',
    requiredStage: ['I', 'II', 'III', 'IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  },

  // RENAL CELL CARCINOMA
  {
    cancerType: 'Renal Cell Carcinoma',
    histology: 'Clear cell carcinoma',
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    biomarkers: [],
    treatmentProtocol: 'Pembrolizumab + Axitinib',
    evidenceReference: 'Category 1',
    nccnReference: 'KIDN-H',
    confidenceScore: 0.93,
    toxicityLevel: 'Moderate',
    priorityTag: 'Preferred',
    requiredStage: ['IV'],
    performanceStatusMin: 0,
    performanceStatusMax: 2,
    isActive: true
  }
];

async function expandTreatmentPlanMappings() {
  try {
    await client.connect();
    console.log('Connected to database');

    console.log('Starting comprehensive treatment plan mappings expansion...');
    console.log(`Adding ${comprehensiveGuidelineBasedMappings.length} new evidence-based mappings`);

    // Insert all comprehensive mappings
    await db.insert(treatmentPlanMappings).values(comprehensiveGuidelineBasedMappings);

    console.log('✅ Successfully expanded treatment plan mappings database');
    console.log('Added comprehensive pan-oncology protocols based on:');
    console.log('- NCCN Guidelines 2024/2025');
    console.log('- ESMO Clinical Practice Guidelines');
    console.log('- ASCO Evidence-based Recommendations');
    
    // Query to verify the expansion
    const totalMappings = await db.$count(treatmentPlanMappings);
    console.log(`\n📊 Database now contains ${totalMappings} total treatment plan mappings`);

  } catch (error) {
    console.error('Error expanding treatment plan mappings:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run if called directly
expandTreatmentPlanMappings().catch(console.error);

export { expandTreatmentPlanMappings };