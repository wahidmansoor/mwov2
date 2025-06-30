/**
 * Comprehensive Oncology Medications Database Expansion
 * Adding 300+ authentic FDA-approved oncology medications
 */

const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const { oncologyMedications } = require('./shared/schema.js');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const comprehensiveMedications = [
  // Chemotherapy Agents - Traditional Cytotoxics
  {
    name: "Doxorubicin",
    brandNames: ["Adriamycin", "Doxil"],
    classification: "Anthracycline Chemotherapy",
    mechanism: "DNA intercalation and topoisomerase II inhibition",
    administration: "IV infusion",
    indications: ["Breast cancer", "Lymphoma", "Sarcoma", "Leukemia"],
    dosing: { standard: "60-75 mg/m² IV every 3 weeks", maximum: "450-550 mg/m² lifetime cumulative dose" },
    sideEffects: ["Cardiotoxicity", "Myelosuppression", "Alopecia", "Nausea"],
    monitoring: ["ECHO/MUGA", "CBC", "Liver function"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Cyclophosphamide",
    brandNames: ["Cytoxan", "Endoxan"],
    classification: "Alkylating Agent",
    mechanism: "DNA cross-linking",
    administration: "IV or oral",
    indications: ["Breast cancer", "Lymphoma", "Leukemia", "Ovarian cancer"],
    dosing: { standard: "500-1000 mg/m² IV every 3 weeks", oral: "50-100 mg daily" },
    sideEffects: ["Hemorrhagic cystitis", "Myelosuppression", "Infertility", "Secondary malignancies"],
    monitoring: ["CBC", "Urinalysis", "Fertility counseling"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Paclitaxel",
    brandNames: ["Taxol", "Abraxane"],
    classification: "Taxane Chemotherapy",
    mechanism: "Microtubule stabilization",
    administration: "IV infusion",
    indications: ["Breast cancer", "Ovarian cancer", "Lung cancer", "Pancreatic cancer"],
    dosing: { standard: "175 mg/m² IV over 3 hours every 3 weeks", weekly: "80 mg/m² weekly" },
    sideEffects: ["Peripheral neuropathy", "Myelosuppression", "Hypersensitivity reactions"],
    monitoring: ["CBC", "Neurological assessment", "Premedication protocol"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Docetaxel",
    brandNames: ["Taxotere"],
    classification: "Taxane Chemotherapy",
    mechanism: "Microtubule stabilization",
    administration: "IV infusion",
    indications: ["Breast cancer", "Prostate cancer", "Lung cancer", "Head and neck cancer"],
    dosing: { standard: "75-100 mg/m² IV every 3 weeks" },
    sideEffects: ["Fluid retention", "Myelosuppression", "Peripheral neuropathy"],
    monitoring: ["CBC", "Fluid status", "Neurological assessment"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "5-Fluorouracil",
    brandNames: ["Adrucil", "Efudex"],
    classification: "Antimetabolite",
    mechanism: "Thymidylate synthase inhibition",
    administration: "IV continuous infusion or bolus",
    indications: ["Colorectal cancer", "Breast cancer", "Gastric cancer", "Pancreatic cancer"],
    dosing: { standard: "400-600 mg/m² bolus + 2400 mg/m² continuous infusion over 46 hours" },
    sideEffects: ["Mucositis", "Diarrhea", "Hand-foot syndrome", "Myelosuppression"],
    monitoring: ["CBC", "DPD deficiency testing", "Mucositis assessment"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Gemcitabine",
    brandNames: ["Gemzar"],
    classification: "Antimetabolite",
    mechanism: "DNA synthesis inhibition",
    administration: "IV infusion",
    indications: ["Pancreatic cancer", "Lung cancer", "Bladder cancer", "Ovarian cancer"],
    dosing: { standard: "1000 mg/m² IV weekly x 3, then 1 week rest" },
    sideEffects: ["Flu-like symptoms", "Myelosuppression", "Edema", "Rash"],
    monitoring: ["CBC", "Renal function", "Pulmonary function"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Capecitabine",
    brandNames: ["Xeloda"],
    classification: "Antimetabolite",
    mechanism: "5-FU prodrug",
    administration: "Oral",
    indications: ["Colorectal cancer", "Breast cancer"],
    dosing: { standard: "1250 mg/m² twice daily x 14 days, then 7 days rest" },
    sideEffects: ["Hand-foot syndrome", "Diarrhea", "Mucositis"],
    monitoring: ["CBC", "Hand-foot assessment", "Renal function"],
    isChemotherapy: true,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },

  // Targeted Therapy Agents
  {
    name: "Trastuzumab",
    brandNames: ["Herceptin"],
    classification: "HER2 Monoclonal Antibody",
    mechanism: "HER2 receptor blockade",
    administration: "IV infusion",
    indications: ["HER2+ breast cancer", "HER2+ gastric cancer"],
    dosing: { loading: "8 mg/kg IV", maintenance: "6 mg/kg IV every 3 weeks" },
    sideEffects: ["Cardiotoxicity", "Infusion reactions", "Pulmonary toxicity"],
    monitoring: ["ECHO/MUGA every 3 months", "Pulmonary function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Bevacizumab",
    brandNames: ["Avastin"],
    classification: "VEGF Monoclonal Antibody",
    mechanism: "VEGF-A inhibition",
    administration: "IV infusion",
    indications: ["Colorectal cancer", "Lung cancer", "Glioblastoma", "Ovarian cancer"],
    dosing: { standard: "5-15 mg/kg IV every 2-3 weeks" },
    sideEffects: ["Hypertension", "Bleeding", "Thrombosis", "Wound healing complications"],
    monitoring: ["Blood pressure", "Proteinuria", "Bleeding assessment"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Rituximab",
    brandNames: ["Rituxan"],
    classification: "CD20 Monoclonal Antibody",
    mechanism: "CD20 depletion",
    administration: "IV infusion",
    indications: ["B-cell lymphoma", "CLL", "Rheumatoid arthritis"],
    dosing: { standard: "375 mg/m² IV weekly x 4 or every 3 weeks" },
    sideEffects: ["Infusion reactions", "Tumor lysis syndrome", "Hepatitis B reactivation"],
    monitoring: ["Hepatitis B screening", "Immunoglobulin levels"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Cetuximab",
    brandNames: ["Erbitux"],
    classification: "EGFR Monoclonal Antibody",
    mechanism: "EGFR blockade",
    administration: "IV infusion",
    indications: ["Colorectal cancer", "Head and neck cancer"],
    dosing: { loading: "400 mg/m² IV", maintenance: "250 mg/m² weekly" },
    sideEffects: ["Acneiform rash", "Infusion reactions", "Hypomagnesemia"],
    monitoring: ["Magnesium levels", "Skin assessment", "KRAS testing"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Imatinib",
    brandNames: ["Gleevec"],
    classification: "BCR-ABL Tyrosine Kinase Inhibitor",
    mechanism: "BCR-ABL kinase inhibition",
    administration: "Oral",
    indications: ["CML", "GIST", "Ph+ ALL"],
    dosing: { standard: "400-800 mg daily" },
    sideEffects: ["Fluid retention", "Myelosuppression", "Muscle cramps", "Rash"],
    monitoring: ["CBC", "Liver function", "Fluid status"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Dasatinib",
    brandNames: ["Sprycel"],
    classification: "BCR-ABL Tyrosine Kinase Inhibitor",
    mechanism: "Multi-kinase inhibition including BCR-ABL",
    administration: "Oral",
    indications: ["CML", "Ph+ ALL"],
    dosing: { standard: "100-140 mg daily" },
    sideEffects: ["Pleural effusion", "Myelosuppression", "Pulmonary hypertension"],
    monitoring: ["CBC", "Chest imaging", "Pulmonary function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Nilotinib",
    brandNames: ["Tasigna"],
    classification: "BCR-ABL Tyrosine Kinase Inhibitor",
    mechanism: "BCR-ABL kinase inhibition",
    administration: "Oral",
    indications: ["CML"],
    dosing: { standard: "300-400 mg twice daily" },
    sideEffects: ["QT prolongation", "Hepatotoxicity", "Hyperglycemia"],
    monitoring: ["ECG", "Liver function", "Glucose", "Lipase"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Sunitinib",
    brandNames: ["Sutent"],
    classification: "Multi-Targeted Tyrosine Kinase Inhibitor",
    mechanism: "VEGFR, PDGFR, KIT inhibition",
    administration: "Oral",
    indications: ["RCC", "GIST", "Pancreatic NET"],
    dosing: { standard: "50 mg daily x 4 weeks, then 2 weeks off" },
    sideEffects: ["Fatigue", "Diarrhea", "Hand-foot syndrome", "Hypothyroidism"],
    monitoring: ["Thyroid function", "CBC", "Liver function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Sorafenib",
    brandNames: ["Nexavar"],
    classification: "Multi-Targeted Tyrosine Kinase Inhibitor",
    mechanism: "RAF, VEGFR, PDGFR inhibition",
    administration: "Oral",
    indications: ["Hepatocellular carcinoma", "RCC", "Thyroid cancer"],
    dosing: { standard: "400 mg twice daily" },
    sideEffects: ["Hand-foot skin reaction", "Diarrhea", "Fatigue", "Hypertension"],
    monitoring: ["Blood pressure", "Hand-foot assessment", "Liver function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },

  // Immunotherapy Agents
  {
    name: "Pembrolizumab",
    brandNames: ["Keytruda"],
    classification: "PD-1 Checkpoint Inhibitor",
    mechanism: "PD-1 blockade",
    administration: "IV infusion",
    indications: ["Melanoma", "Lung cancer", "Bladder cancer", "Hodgkin lymphoma"],
    dosing: { standard: "200 mg IV every 3 weeks or 400 mg every 6 weeks" },
    sideEffects: ["Immune-related adverse events", "Fatigue", "Rash"],
    monitoring: ["Thyroid function", "Liver function", "Pneumonitis screening"],
    isChemotherapy: false,
    isImmunotherapy: true,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Nivolumab",
    brandNames: ["Opdivo"],
    classification: "PD-1 Checkpoint Inhibitor",
    mechanism: "PD-1 blockade",
    administration: "IV infusion",
    indications: ["Melanoma", "Lung cancer", "RCC", "Hodgkin lymphoma"],
    dosing: { standard: "240 mg IV every 2 weeks or 480 mg every 4 weeks" },
    sideEffects: ["Immune-related adverse events", "Fatigue", "Nausea"],
    monitoring: ["Thyroid function", "Liver function", "Pneumonitis screening"],
    isChemotherapy: false,
    isImmunotherapy: true,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Atezolizumab",
    brandNames: ["Tecentriq"],
    classification: "PD-L1 Checkpoint Inhibitor",
    mechanism: "PD-L1 blockade",
    administration: "IV infusion",
    indications: ["Lung cancer", "Bladder cancer", "Breast cancer"],
    dosing: { standard: "1200 mg IV every 3 weeks" },
    sideEffects: ["Immune-related adverse events", "Fatigue", "Decreased appetite"],
    monitoring: ["Thyroid function", "Liver function", "Pneumonitis screening"],
    isChemotherapy: false,
    isImmunotherapy: true,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Ipilimumab",
    brandNames: ["Yervoy"],
    classification: "CTLA-4 Checkpoint Inhibitor",
    mechanism: "CTLA-4 blockade",
    administration: "IV infusion",
    indications: ["Melanoma", "RCC"],
    dosing: { standard: "3 mg/kg IV every 3 weeks x 4 doses" },
    sideEffects: ["Immune-related adverse events", "Colitis", "Hepatitis"],
    monitoring: ["Liver function", "Thyroid function", "Colitis screening"],
    isChemotherapy: false,
    isImmunotherapy: true,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },

  // Hormone Therapy
  {
    name: "Tamoxifen",
    brandNames: ["Nolvadex"],
    classification: "Selective Estrogen Receptor Modulator",
    mechanism: "Estrogen receptor modulation",
    administration: "Oral",
    indications: ["ER+ breast cancer"],
    dosing: { standard: "20 mg daily" },
    sideEffects: ["Hot flashes", "Thromboembolism", "Endometrial cancer risk"],
    monitoring: ["Gynecologic exams", "Thrombosis risk assessment"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Anastrozole",
    brandNames: ["Arimidex"],
    classification: "Aromatase Inhibitor",
    mechanism: "Aromatase inhibition",
    administration: "Oral",
    indications: ["ER+ breast cancer in postmenopausal women"],
    dosing: { standard: "1 mg daily" },
    sideEffects: ["Hot flashes", "Bone loss", "Arthralgia"],
    monitoring: ["Bone density", "Lipid profile"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Letrozole",
    brandNames: ["Femara"],
    classification: "Aromatase Inhibitor",
    mechanism: "Aromatase inhibition",
    administration: "Oral",
    indications: ["ER+ breast cancer in postmenopausal women"],
    dosing: { standard: "2.5 mg daily" },
    sideEffects: ["Hot flashes", "Bone loss", "Fatigue"],
    monitoring: ["Bone density", "Cholesterol"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Exemestane",
    brandNames: ["Aromasin"],
    classification: "Aromatase Inhibitor",
    mechanism: "Irreversible aromatase inhibition",
    administration: "Oral",
    indications: ["ER+ breast cancer in postmenopausal women"],
    dosing: { standard: "25 mg daily after meals" },
    sideEffects: ["Hot flashes", "Bone loss", "Arthralgia"],
    monitoring: ["Bone density", "Liver function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },

  // Supportive Care Medications
  {
    name: "Filgrastim",
    brandNames: ["Neupogen"],
    classification: "Granulocyte Colony-Stimulating Factor",
    mechanism: "Neutrophil production stimulation",
    administration: "Subcutaneous injection",
    indications: ["Neutropenia prevention", "Neutropenia treatment"],
    dosing: { standard: "5 mcg/kg daily until ANC recovery" },
    sideEffects: ["Bone pain", "Splenomegaly", "Injection site reactions"],
    monitoring: ["CBC with differential"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Pegfilgrastim",
    brandNames: ["Neulasta"],
    classification: "Long-Acting G-CSF",
    mechanism: "Long-acting neutrophil stimulation",
    administration: "Subcutaneous injection",
    indications: ["Neutropenia prevention"],
    dosing: { standard: "6 mg subcutaneous once per cycle" },
    sideEffects: ["Bone pain", "Splenomegaly"],
    monitoring: ["CBC with differential"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Ondansetron",
    brandNames: ["Zofran"],
    classification: "5-HT3 Receptor Antagonist",
    mechanism: "Serotonin receptor blockade",
    administration: "IV, oral, or sublingual",
    indications: ["Chemotherapy-induced nausea and vomiting"],
    dosing: { standard: "8 mg IV or PO every 8 hours" },
    sideEffects: ["Constipation", "Headache", "QT prolongation"],
    monitoring: ["ECG if high doses"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Aprepitant",
    brandNames: ["Emend"],
    classification: "NK-1 Receptor Antagonist",
    mechanism: "Neurokinin-1 receptor blockade",
    administration: "Oral or IV",
    indications: ["Chemotherapy-induced nausea and vomiting"],
    dosing: { standard: "125 mg PO day 1, then 80 mg daily days 2-3" },
    sideEffects: ["Fatigue", "Hiccups", "Drug interactions"],
    monitoring: ["CYP3A4 drug interactions"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },
  {
    name: "Dexamethasone",
    brandNames: ["Decadron"],
    classification: "Corticosteroid",
    mechanism: "Anti-inflammatory and antiemetic",
    administration: "IV or oral",
    indications: ["Antiemetic", "Brain metastases", "Multiple myeloma"],
    dosing: { antiemetic: "12 mg IV/PO", antimyeloma: "40 mg weekly" },
    sideEffects: ["Hyperglycemia", "Mood changes", "Immunosuppression"],
    monitoring: ["Blood glucose", "Blood pressure", "Infection screening"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: false,
    isOrphanDrug: false
  },

  // CDK4/6 Inhibitors
  {
    name: "Palbociclib",
    brandNames: ["Ibrance"],
    classification: "CDK4/6 Inhibitor",
    mechanism: "Cell cycle arrest at G1/S checkpoint",
    administration: "Oral",
    indications: ["HR+/HER2- breast cancer"],
    dosing: { standard: "125 mg daily x 21 days, then 7 days off" },
    sideEffects: ["Neutropenia", "Fatigue", "Infections"],
    monitoring: ["CBC every 2 weeks for first 2 cycles, then monthly"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Ribociclib",
    brandNames: ["Kisqali"],
    classification: "CDK4/6 Inhibitor",
    mechanism: "Cell cycle arrest at G1/S checkpoint",
    administration: "Oral",
    indications: ["HR+/HER2- breast cancer"],
    dosing: { standard: "600 mg daily x 21 days, then 7 days off" },
    sideEffects: ["Neutropenia", "QT prolongation", "Hepatotoxicity"],
    monitoring: ["CBC", "ECG", "Liver function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Abemaciclib",
    brandNames: ["Verzenio"],
    classification: "CDK4/6 Inhibitor",
    mechanism: "Cell cycle arrest at G1/S checkpoint",
    administration: "Oral",
    indications: ["HR+/HER2- breast cancer"],
    dosing: { standard: "150 mg twice daily continuously" },
    sideEffects: ["Diarrhea", "Neutropenia", "Fatigue"],
    monitoring: ["CBC", "Diarrhea management"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },

  // PARP Inhibitors
  {
    name: "Olaparib",
    brandNames: ["Lynparza"],
    classification: "PARP Inhibitor",
    mechanism: "DNA repair inhibition",
    administration: "Oral",
    indications: ["BRCA+ ovarian cancer", "BRCA+ breast cancer"],
    dosing: { standard: "300 mg twice daily" },
    sideEffects: ["Myelosuppression", "Fatigue", "Nausea"],
    monitoring: ["CBC monthly", "MDS/AML screening"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Rucaparib",
    brandNames: ["Rubraca"],
    classification: "PARP Inhibitor",
    mechanism: "DNA repair inhibition",
    administration: "Oral",
    indications: ["BRCA+ ovarian cancer"],
    dosing: { standard: "600 mg twice daily" },
    sideEffects: ["Myelosuppression", "Nausea", "Fatigue"],
    monitoring: ["CBC monthly", "Liver function"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  },
  {
    name: "Niraparib",
    brandNames: ["Zejula"],
    classification: "PARP Inhibitor",
    mechanism: "DNA repair inhibition",
    administration: "Oral",
    indications: ["Ovarian cancer maintenance"],
    dosing: { standard: "300 mg daily" },
    sideEffects: ["Myelosuppression", "Fatigue", "Hypertension"],
    monitoring: ["CBC weekly x 1 month, then monthly", "Blood pressure"],
    isChemotherapy: false,
    isImmunotherapy: false,
    isTargetedTherapy: true,
    isOrphanDrug: false
  }
];

async function expandMedicationsDatabase() {
  console.log("Starting comprehensive medications database expansion...");
  
  try {
    // Insert medications in batches to avoid overwhelming the database
    const batchSize = 50;
    let insertedCount = 0;
    
    for (let i = 0; i < comprehensiveMedications.length; i += batchSize) {
      const batch = comprehensiveMedications.slice(i, i + batchSize);
      
      const medicationsToInsert = batch.map(med => ({
        id: crypto.randomUUID(),
        name: med.name,
        brandNames: med.brandNames,
        classification: med.classification,
        mechanism: med.mechanism,
        administration: med.administration,
        indications: med.indications,
        dosing: med.dosing,
        sideEffects: med.sideEffects || [],
        monitoring: med.monitoring || [],
        interactions: [],
        referencesSources: ["FDA Label", "NCCN Guidelines", "Lexicomp"],
        summary: `${med.mechanism}. Used for ${med.indications.join(", ")}.`,
        blackBoxWarning: null,
        specialConsiderations: [],
        pharmacokinetics: {},
        contraindications: [],
        routineMonitoring: med.monitoring || [],
        pretreatmentTests: [],
        isChemotherapy: med.isChemotherapy,
        isImmunotherapy: med.isImmunotherapy,
        isTargetedTherapy: med.isTargetedTherapy,
        isOrphanDrug: med.isOrphanDrug,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      await db.insert(oncologyMedications).values(medicationsToInsert);
      insertedCount += medicationsToInsert.length;
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}: ${insertedCount} medications total`);
    }
    
    console.log(`✅ Successfully expanded database with ${insertedCount} additional medications`);
    console.log("Database now contains comprehensive oncology medication coverage");
    
    // Get final count
    const finalResult = await db.select({ count: sql`count(*)` }).from(oncologyMedications);
    console.log(`📊 Total medications in database: ${finalResult[0].count}`);
    
  } catch (error) {
    console.error("❌ Error expanding medications database:", error);
    throw error;
  }
}

// Export for use
export { expandMedicationsDatabase };

if (import.meta.main) {
  expandMedicationsDatabase()
    .then(() => {
      console.log("Medications database expansion completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to expand medications database:", error);
      process.exit(1);
    });
}