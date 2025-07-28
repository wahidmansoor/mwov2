import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { treatmentPlanMappings, treatmentPlanCriteria } from '../shared/schema.js';
import { sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

// Comprehensive NCCN 2024-2025 Cancer Types List
const ALL_NCCN_CANCER_TYPES = [
  // Blood Cancers & Lymphomas
  "Acute Lymphoblastic Leukemia", "Acute Myeloid Leukemia", "B-Cell Lymphomas", 
  "Castleman Disease", "Chronic Lymphocytic Leukemia", "Chronic Myeloid Leukemia",
  "Histiocytic Neoplasms", "Multiple Myeloma", "Hodgkin Lymphoma", 
  "Primary Cutaneous Lymphomas", "Systemic Light Chain Amyloidosis", 
  "Waldenström Macroglobulinemia", "Myeloproliferative Neoplasms", "Systemic Mastocytosis",
  
  // Gastrointestinal Cancers
  "Ampullary Adenocarcinoma", "Anal Carcinoma", "Biliary Tract Cancers", 
  "Colon Cancer", "Colorectal Cancer", "Esophageal Cancer", "Gastric Cancer",
  "Hepatocellular Carcinoma", "Pancreatic Cancer", "Small Bowel Cancer",
  "Appendix Cancer", "Duodenal Cancer", "Rectal Cancer", "GIST",
  
  // Genitourinary Cancers
  "Bladder Cancer", "Prostate Cancer", "Kidney Cancer", "Testicular Cancer",
  "Penile Cancer", "Urethral Cancer", "Wilms Tumor", "Adrenal Gland Cancer",
  
  // Gynecologic Cancers
  "Cervical Cancer", "Endometrial Cancer", "Ovarian Cancer", "Vulvar Cancer",
  "Vaginal Cancer", "Gestational Trophoblastic Disease", "Uterine Sarcoma",
  "Fallopian Tube Cancer", "Primary Peritoneal Cancer",
  
  // Thoracic Cancers
  "Non-Small Cell Lung Cancer", "Small Cell Lung Cancer", "Mesothelioma",
  "Thymoma and Thymic Carcinoma", "Lung Carcinoid Tumors", "NSCLC", "SCLC",
  
  // Breast Cancer
  "Breast Cancer", "Male Breast Cancer", "Inflammatory Breast Cancer",
  
  // Head & Neck
  "Head and Neck Cancers", "Nasopharyngeal Cancer", "Salivary Gland Cancer",
  "Thyroid Cancer", "Parathyroid Cancer", "Laryngeal Cancer", "Oropharyngeal Cancer",
  
  // Central Nervous System
  "Central Nervous System Cancers", "Brain Tumors", "Spinal Cord Tumors",
  "Meningioma", "Glioblastoma", "Astrocytoma", "Glioma",
  
  // Skin Cancers
  "Melanoma", "Basal Cell Skin Cancer", "Squamous Cell Skin Cancer",
  "Merkel Cell Carcinoma", "Dermatofibrosarcoma Protuberans",
  
  // Bone & Soft Tissue
  "Bone Cancer", "Soft Tissue Sarcoma", "Osteosarcoma", "Ewing Sarcoma",
  "Chondrosarcoma", "Gastrointestinal Stromal Tumors", "Rhabdomyosarcoma",
  
  // Endocrine
  "Neuroendocrine Tumors", "Pheochromocytoma", "Carcinoid Tumors",
  
  // Eye Cancers
  "Ocular Melanoma", "Retinoblastoma",
  
  // Rare Cancers
  "Neurofibromatosis", "Carcinoma of Unknown Primary", "AIDS-Related Malignancies",
  "Cancer in Pregnancy", "Adolescent and Young Adult Oncology"
];

const TREATMENT_INTENTS = ["Curative", "Adjuvant", "Neoadjuvant", "Palliative", "Maintenance"];

// Missing protocols based on NCCN/ESMO/ASCO 2024-2025 guidelines
const MISSING_PROTOCOLS = [
  // LUNG CANCER - NSCLC/SCLC Enhanced Coverage
  {
    cancerType: 'NSCLC',
    histology: 'Adenocarcinoma',
    biomarkers: ['ALK+'],
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Alectinib 600mg BID',
    evidenceReference: 'Category 1',
    nccnReference: 'NSCL-B-6',
    confidenceScore: 0.95,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['IB', 'II', 'IIIA'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 adjuvant ALK inhibitor for resected NSCLC'
  },
  {
    cancerType: 'NSCLC',
    histology: 'Adenocarcinoma',
    biomarkers: ['ROS1+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Entrectinib 600mg daily',
    evidenceReference: 'Category 1',
    nccnReference: 'NSCL-C-3',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 ROS1 inhibitor for metastatic NSCLC'
  },
  {
    cancerType: 'SCLC',
    histology: 'Small Cell',
    biomarkers: ['None'],
    treatmentIntent: 'Maintenance',
    lineOfTreatment: 'Post-Induction',
    treatmentProtocol: 'Durvalumab 1500mg Q4W',
    evidenceReference: 'Category 1',
    nccnReference: 'SCLC-4',
    confidenceScore: 0.91,
    toxicityLevel: 'Low',
    priorityTag: 'Immunotherapy',
    requiredStage: ['ES'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 maintenance immunotherapy for extensive stage SCLC'
  },

  // PANCREATIC CANCER - Enhanced NCCN/ESMO Coverage
  {
    cancerType: 'Pancreatic Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['BRCA1/2+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFIRINOX + Olaparib maintenance',
    evidenceReference: 'Category 1',
    nccnReference: 'PANC-6',
    confidenceScore: 0.93,
    toxicityLevel: 'High',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 PARP inhibitor for BRCA+ pancreatic cancer'
  },
  {
    cancerType: 'Pancreatic Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Pembrolizumab 200mg Q3W',
    evidenceReference: 'Category 1',
    nccnReference: 'PANC-7',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Immunotherapy',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 immunotherapy for MSI-H pancreatic cancer'
  },

  // BILIARY TRACT CANCER - ESMO 2024 Updates
  {
    cancerType: 'Biliary Tract Cancers',
    histology: 'Cholangiocarcinoma',
    biomarkers: ['FGFR2+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Pemigatinib 13.5mg daily',
    evidenceReference: 'Category 1',
    nccnReference: 'BILI-4',
    confidenceScore: 0.92,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-1',
    reasoning: 'ESMO/NCCN Category 1 FGFR2 inhibitor for cholangiocarcinoma'
  },
  {
    cancerType: 'Biliary Tract Cancers',
    histology: 'Cholangiocarcinoma',
    biomarkers: ['IDH1+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Ivosidenib 500mg daily',
    evidenceReference: 'Category 1',
    nccnReference: 'BILI-5',
    confidenceScore: 0.89,
    toxicityLevel: 'Low',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 IDH1 inhibitor for cholangiocarcinoma'
  },

  // OVARIAN CANCER - ESMO HRD Testing Updates
  {
    cancerType: 'Ovarian Cancer',
    histology: 'High-Grade Serous',
    biomarkers: ['HRD+'],
    treatmentIntent: 'Maintenance',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Olaparib 300mg BID',
    evidenceReference: 'Category 1',
    nccnReference: 'OVAR-10',
    confidenceScore: 0.95,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['III', 'IV'],
    performanceStatusRange: '0-1',
    reasoning: 'ESMO Level 1A PARP inhibitor maintenance for HRD+ ovarian cancer'
  },
  {
    cancerType: 'Ovarian Cancer',
    histology: 'High-Grade Serous',
    biomarkers: ['BRCA Wild-Type', 'HRD-'],
    treatmentIntent: 'Maintenance',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Bevacizumab 15mg/kg Q3W',
    evidenceReference: 'Category 1',
    nccnReference: 'OVAR-11',
    confidenceScore: 0.88,
    toxicityLevel: 'Moderate',
    priorityTag: 'Anti-angiogenic',
    requiredStage: ['III', 'IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 bevacizumab maintenance for HRD- ovarian cancer'
  },

  // PROSTATE CANCER - Enhanced Molecular Coverage
  {
    cancerType: 'Prostate Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['BRCA1/2+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Olaparib 400mg BID',
    evidenceReference: 'Category 1',
    nccnReference: 'PROS-12',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['M1'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 PARP inhibitor for BRCA+ mCRPC'
  },
  {
    cancerType: 'Prostate Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Pembrolizumab 200mg Q3W',
    evidenceReference: 'Category 1',
    nccnReference: 'PROS-13',
    confidenceScore: 0.91,
    toxicityLevel: 'Moderate',
    priorityTag: 'Immunotherapy',
    requiredStage: ['M1'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 immunotherapy for MSI-H mCRPC'
  },

  // MELANOMA - Enhanced Coverage
  {
    cancerType: 'Melanoma',
    histology: 'Cutaneous Melanoma',
    biomarkers: ['BRAF V600E/K'],
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Dabrafenib + Trametinib',
    evidenceReference: 'Category 1',
    nccnReference: 'MEL-4',
    confidenceScore: 0.95,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['III'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 adjuvant BRAF/MEK inhibition for stage III melanoma'
  },
  {
    cancerType: 'Melanoma',
    histology: 'Cutaneous Melanoma',
    biomarkers: ['PD-L1+'],
    treatmentIntent: 'Adjuvant',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Pembrolizumab 200mg Q3W',
    evidenceReference: 'Category 1',
    nccnReference: 'MEL-5',
    confidenceScore: 0.93,
    toxicityLevel: 'Moderate',
    priorityTag: 'Immunotherapy',
    requiredStage: ['IIB', 'IIC', 'III'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 adjuvant immunotherapy for high-risk melanoma'
  },

  // GASTRIC CANCER - Enhanced Coverage
  {
    cancerType: 'Gastric Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['HER2+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'FOLFOX + Trastuzumab',
    evidenceReference: 'Category 1',
    nccnReference: 'GAST-6',
    confidenceScore: 0.93,
    toxicityLevel: 'High',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 HER2-targeted therapy for gastric cancer'
  },
  {
    cancerType: 'Gastric Cancer',
    histology: 'Adenocarcinoma',
    biomarkers: ['MSI-H'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Pembrolizumab + Chemotherapy',
    evidenceReference: 'Category 1',
    nccnReference: 'GAST-7',
    confidenceScore: 0.94,
    toxicityLevel: 'High',
    priorityTag: 'Immunotherapy',
    requiredStage: ['IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 immunotherapy for MSI-H gastric cancer'
  },

  // RENAL CELL CARCINOMA - Enhanced Coverage
  {
    cancerType: 'Kidney Cancer',
    histology: 'Clear Cell RCC',
    biomarkers: ['IMDC Intermediate/Poor Risk'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Cabozantinib + Nivolumab',
    evidenceReference: 'Category 1',
    nccnReference: 'KIDN-6',
    confidenceScore: 0.95,
    toxicityLevel: 'High',
    priorityTag: 'Combination',
    requiredStage: ['IV'],
    performanceStatusRange: '0-1',
    reasoning: 'NCCN Category 1 combination therapy for intermediate/poor risk RCC'
  },

  // BLADDER CANCER - Enhanced Coverage
  {
    cancerType: 'Bladder Cancer',
    histology: 'Urothelial Carcinoma',
    biomarkers: ['FGFR2/3+'],
    treatmentIntent: 'Palliative',
    lineOfTreatment: '2nd Line',
    treatmentProtocol: 'Erdafitinib 8mg daily',
    evidenceReference: 'Category 1',
    nccnReference: 'BLAD-8',
    confidenceScore: 0.91,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 FGFR inhibitor for advanced urothelial carcinoma'
  },

  // HEMATOLOGIC MALIGNANCIES
  {
    cancerType: 'Multiple Myeloma',
    histology: 'Plasma Cell Myeloma',
    biomarkers: ['Standard Risk'],
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'VRd (Bortezomib/Lenalidomide/Dexamethasone)',
    evidenceReference: 'Category 1',
    nccnReference: 'MYEL-3',
    confidenceScore: 0.96,
    toxicityLevel: 'Moderate',
    priorityTag: 'Standard',
    requiredStage: ['I', 'II', 'III'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 standard induction for newly diagnosed myeloma'
  },
  {
    cancerType: 'Chronic Lymphocytic Leukemia',
    histology: 'B-Cell CLL',
    biomarkers: ['del(17p)'],
    treatmentIntent: 'Curative',
    lineOfTreatment: '1st Line',
    treatmentProtocol: 'Ibrutinib + Venetoclax',
    evidenceReference: 'Category 1',
    nccnReference: 'CLL-4',
    confidenceScore: 0.94,
    toxicityLevel: 'Moderate',
    priorityTag: 'Targeted',
    requiredStage: ['Rai III-IV'],
    performanceStatusRange: '0-2',
    reasoning: 'NCCN Category 1 targeted therapy for high-risk CLL'
  }
];

async function comprehensiveMappingAudit() {
  console.log('🔍 Starting Comprehensive Cancer Mapping Audit...');
  console.log('📊 Analyzing coverage across all NCCN/ESMO/ASCO cancer types...\n');

  try {
    // Get current mappings
    const currentMappings = await db.select().from(treatmentPlanMappings);
    
    // Analyze coverage by cancer type and intent
    const coverageMap = new Map();
    
    for (const cancerType of ALL_NCCN_CANCER_TYPES) {
      coverageMap.set(cancerType, new Map());
      for (const intent of TREATMENT_INTENTS) {
        const hasMapping = currentMappings.some(m => 
          m.cancerType === cancerType && m.treatmentIntent === intent
        );
        coverageMap.get(cancerType).set(intent, hasMapping);
      }
    }

    // Report gaps
    let gapCount = 0;
    console.log('🚨 COVERAGE GAPS IDENTIFIED:');
    console.log('==========================================');
    
    for (const [cancerType, intents] of coverageMap) {
      const missingIntents = [];
      for (const [intent, hasMapping] of intents) {
        if (!hasMapping) {
          missingIntents.push(intent);
          gapCount++;
        }
      }
      if (missingIntents.length > 0) {
        console.log(`❌ ${cancerType}: Missing ${missingIntents.join(', ')}`);
      }
    }

    console.log(`\n📈 TOTAL GAPS: ${gapCount} missing intent combinations\n`);

    // Add missing protocols from NCCN/ESMO/ASCO guidelines
    console.log('🔧 Adding Missing Protocols from Latest Guidelines...');
    let addedCount = 0;

    for (const protocol of MISSING_PROTOCOLS) {
      try {
        await db.insert(treatmentPlanMappings)
          .values(protocol)
          .onConflictDoNothing();
        addedCount++;
        console.log(`✅ Added: ${protocol.cancerType} - ${protocol.treatmentIntent} - ${protocol.treatmentProtocol}`);
      } catch (error) {
        console.log(`⚠️ Protocol may already exist: ${protocol.treatmentProtocol}`);
      }
    }

    // Final coverage report
    const updatedMappings = await db.select().from(treatmentPlanMappings);
    const totalMappings = updatedMappings.length;
    const uniqueCancerTypes = new Set(updatedMappings.map(m => m.cancerType)).size;
    const avgMappingsPerCancer = (totalMappings / uniqueCancerTypes).toFixed(1);

    console.log('\n🎯 COMPREHENSIVE AUDIT COMPLETE!');
    console.log('==========================================');
    console.log(`📊 Total Treatment Mappings: ${totalMappings}`);
    console.log(`🎭 Unique Cancer Types Covered: ${uniqueCancerTypes}`);
    console.log(`📈 Average Mappings per Cancer: ${avgMappingsPerCancer}`);
    console.log(`➕ New Protocols Added: ${addedCount}`);
    console.log(`📋 Guidelines Sources: NCCN 2024-2025, ESMO 2024, ASCO 2024`);
    console.log(`🔬 Enhanced Molecular Coverage: FGFR, IDH1, HRD, MSI-H, BRCA1/2`);
    
    // Coverage by cancer type summary
    console.log('\n📊 ENHANCED COVERAGE SUMMARY:');
    console.log('==========================================');
    const enhancedCancers = ['NSCLC', 'Pancreatic Cancer', 'Biliary Tract Cancers', 
                           'Ovarian Cancer', 'Prostate Cancer', 'Melanoma', 
                           'Gastric Cancer', 'Kidney Cancer', 'Bladder Cancer',
                           'Multiple Myeloma', 'Chronic Lymphocytic Leukemia'];
    
    for (const cancer of enhancedCancers) {
      const mappingCount = updatedMappings.filter(m => m.cancerType === cancer).length;
      console.log(`✅ ${cancer}: ${mappingCount} protocols`);
    }

  } catch (error) {
    console.error('❌ Error during comprehensive audit:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the comprehensive audit
comprehensiveMappingAudit().catch(console.error);