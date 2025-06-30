import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { 
  symptomProtocols, 
  opioidConversions,
  resourceLinks,
  type InsertSymptomProtocol,
  type InsertOpioidConversion,
  type InsertResourceLink
} from './shared/schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(connectionString);
const db = drizzle(client);

// Comprehensive symptom management protocols based on NCCN/ASCO guidelines
const symptomProtocolsData: InsertSymptomProtocol[] = [
  // Pain Management Protocols
  {
    symptom: "Pain",
    severityLevel: "Mild (1-3)",
    recommendations: {
      nonPharmacological: ["Heat/cold therapy", "Gentle exercise", "Relaxation techniques"],
      pharmacological: ["Acetaminophen 1000mg q6h", "NSAIDs if appropriate"],
      monitoring: ["Daily pain scores", "Functional assessment"],
      escalation: "If pain >3/10 or affecting function"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Adult Cancer Pain Guidelines v1.2025"
  },
  {
    symptom: "Pain", 
    severityLevel: "Moderate (4-6)",
    recommendations: {
      nonPharmacological: ["Physical therapy", "TENS unit", "Mindfulness"],
      pharmacological: ["Morphine 5-10mg PO q4h PRN", "Oxycodone 5mg PO q4h PRN"],
      monitoring: ["Q4h pain assessment", "Bowel regimen", "Sedation score"],
      escalation: "If pain >6/10 or uncontrolled"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Adult Cancer Pain Guidelines v1.2025"
  },
  {
    symptom: "Pain",
    severityLevel: "Severe (7-10)",
    recommendations: {
      nonPharmacological: ["Immediate comfort measures", "Family support"],
      pharmacological: ["Morphine 10-20mg PO q4h", "Consider IV/SQ route", "Breakthrough dosing"],
      monitoring: ["Hourly assessment", "Respiratory status", "Sedation"],
      escalation: "Pain specialist consultation within 24h"
    },
    evidenceLevel: "Category 1", 
    guidelineSource: "NCCN Adult Cancer Pain Guidelines v1.2025"
  },

  // Nausea and Vomiting Protocols
  {
    symptom: "Nausea",
    severityLevel: "Mild",
    recommendations: {
      nonPharmacological: ["Small frequent meals", "Ginger tea", "Aromatherapy"],
      pharmacological: ["Ondansetron 4mg PO q8h PRN", "Metoclopramide 10mg PO qid"],
      monitoring: ["Daily symptom assessment", "Nutritional intake"],
      escalation: "If persistent >48h or affecting nutrition"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Antiemesis Guidelines v2.2025"
  },
  {
    symptom: "Nausea",
    severityLevel: "Moderate", 
    recommendations: {
      nonPharmacological: ["Dietary modifications", "Acupressure"],
      pharmacological: ["Ondansetron 8mg PO q8h", "Add dexamethasone 4mg daily"],
      monitoring: ["Q8h assessment", "Weight monitoring"],
      escalation: "If grade 3-4 or dehydration"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Antiemesis Guidelines v2.2025"
  },
  {
    symptom: "Nausea",
    severityLevel: "Severe",
    recommendations: {
      nonPharmacological: ["NPO if vomiting", "IV hydration"],
      pharmacological: ["Ondansetron 4mg IV q6h", "Dexamethasone 8mg IV", "Consider aprepitant"],
      monitoring: ["Continuous monitoring", "Electrolytes", "I/O"],
      escalation: "Consider hospitalization if persistent"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Antiemesis Guidelines v2.2025"
  },

  // Dyspnea Management
  {
    symptom: "Dyspnea",
    severityLevel: "Mild",
    recommendations: {
      nonPharmacological: ["Fan therapy", "Positioning", "Breathing exercises"],
      pharmacological: ["Bronchodilators if appropriate", "Low-dose morphine 2.5mg PO q4h"],
      monitoring: ["Respiratory rate", "Oxygen saturation"],
      escalation: "If RR >24 or O2 sat <90%"
    },
    evidenceLevel: "Category 2A",
    guidelineSource: "NCCN Palliative Care Guidelines v1.2025"
  },
  {
    symptom: "Dyspnea",
    severityLevel: "Moderate",
    recommendations: {
      nonPharmacological: ["Oxygen therapy", "Fan", "Anxiety management"],
      pharmacological: ["Morphine 5mg PO q4h", "Lorazepam 0.5mg PO q8h PRN"],
      monitoring: ["Continuous pulse oximetry", "ABG if indicated"],
      escalation: "If respiratory distress or hypoxemia"
    },
    evidenceLevel: "Category 2A",
    guidelineSource: "NCCN Palliative Care Guidelines v1.2025"
  },
  {
    symptom: "Dyspnea",
    severityLevel: "Severe",
    recommendations: {
      nonPharmacological: ["High-flow oxygen", "Positioning", "Family presence"],
      pharmacological: ["Morphine 10mg PO/IV q2-4h", "Anxiolytics", "Nebulized morphine"],
      monitoring: ["Continuous monitoring", "Comfort measures"],
      escalation: "Palliative care consultation urgently"
    },
    evidenceLevel: "Category 2A",
    guidelineSource: "NCCN Palliative Care Guidelines v1.2025"
  },

  // Fatigue Management  
  {
    symptom: "Fatigue",
    severityLevel: "Mild",
    recommendations: {
      nonPharmacological: ["Energy conservation", "Light exercise", "Sleep hygiene"],
      pharmacological: ["Correct reversible causes", "Consider methylphenidate"],
      monitoring: ["Daily energy levels", "Activity tolerance"],
      escalation: "If interfering with ADLs"
    },
    evidenceLevel: "Category 2A",
    guidelineSource: "NCCN Cancer-Related Fatigue Guidelines v1.2025"
  },
  {
    symptom: "Fatigue",
    severityLevel: "Moderate",
    recommendations: {
      nonPharmacological: ["Structured exercise program", "Cognitive behavioral therapy"],
      pharmacological: ["Methylphenidate 5mg BID", "Modafinil 100mg daily"],
      monitoring: ["Weekly assessment", "Functional status"],
      escalation: "If severe impact on quality of life"
    },
    evidenceLevel: "Category 2A",
    guidelineSource: "NCCN Cancer-Related Fatigue Guidelines v1.2025"
  },

  // Constipation Management
  {
    symptom: "Constipation",
    severityLevel: "Mild",
    recommendations: {
      nonPharmacological: ["Increased fiber", "Hydration", "Activity"],
      pharmacological: ["Docusate 100mg BID", "Senna 2 tabs daily"],
      monitoring: ["Daily bowel movements", "Abdominal assessment"],
      escalation: "If no BM >3 days"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Palliative Care Guidelines v1.2025"
  },
  {
    symptom: "Constipation",
    severityLevel: "Moderate",
    recommendations: {
      nonPharmacological: ["Dietary modifications", "Abdominal massage"],
      pharmacological: ["Bisacodyl 10mg daily", "Polyethylene glycol 17g daily"],
      monitoring: ["Daily assessment", "Abdominal distension"],
      escalation: "If impaction suspected"
    },
    evidenceLevel: "Category 1",
    guidelineSource: "NCCN Palliative Care Guidelines v1.2025"
  }
];

// Evidence-based opioid conversion factors
const opioidConversionsData: InsertOpioidConversion[] = [
  {
    fromMed: "Morphine",
    toMed: "Oxycodone", 
    conversionFactor: 0.67,
    routeFrom: "PO",
    routeTo: "PO",
    notes: "1.5:1 ratio morphine to oxycodone",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Morphine",
    toMed: "Hydromorphone",
    conversionFactor: 0.2,
    routeFrom: "PO", 
    routeTo: "PO",
    notes: "5:1 ratio morphine to hydromorphone",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Morphine",
    toMed: "Fentanyl",
    conversionFactor: 0.01,
    routeFrom: "PO",
    routeTo: "TD",
    notes: "100:1 ratio, use 50% dose reduction for cross-tolerance",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Oxycodone",
    toMed: "Morphine",
    conversionFactor: 1.5,
    routeFrom: "PO",
    routeTo: "PO", 
    notes: "1:1.5 ratio oxycodone to morphine",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Hydromorphone",
    toMed: "Morphine",
    conversionFactor: 5.0,
    routeFrom: "PO",
    routeTo: "PO",
    notes: "1:5 ratio hydromorphone to morphine",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Morphine",
    toMed: "Morphine",
    conversionFactor: 0.33,
    routeFrom: "PO",
    routeTo: "IV",
    notes: "3:1 ratio PO to IV morphine",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Morphine",
    toMed: "Morphine", 
    conversionFactor: 3.0,
    routeFrom: "IV",
    routeTo: "PO",
    notes: "1:3 ratio IV to PO morphine",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Fentanyl",
    toMed: "Morphine",
    conversionFactor: 100.0,
    routeFrom: "TD",
    routeTo: "PO",
    notes: "1:100 ratio fentanyl patch to morphine PO",
    evidenceLevel: "Category 1"
  },
  {
    fromMed: "Tramadol",
    toMed: "Morphine",
    conversionFactor: 0.1,
    routeFrom: "PO", 
    routeTo: "PO",
    notes: "10:1 ratio tramadol to morphine, ceiling effect at 400mg/day",
    evidenceLevel: "Category 2A"
  },
  {
    fromMed: "Codeine",
    toMed: "Morphine",
    conversionFactor: 0.15,
    routeFrom: "PO",
    routeTo: "PO",
    notes: "6.7:1 ratio codeine to morphine, consider CYP2D6 status",
    evidenceLevel: "Category 2A"
  }
];

// Comprehensive resource links for palliative care
const resourceLinksData: InsertResourceLink[] = [
  {
    category: "Pain Management",
    title: "NCCN Adult Cancer Pain Guidelines",
    url: "https://www.nccn.org/professionals/physician_gls/pdf/pain.pdf",
    description: "Comprehensive evidence-based pain management guidelines",
    targetAudience: "Healthcare Providers",
    isActive: true
  },
  {
    category: "Symptom Control", 
    title: "Palliative Care Network of Wisconsin Fast Facts",
    url: "https://www.mypcnow.org/fast-facts/",
    description: "Quick reference guides for symptom management",
    targetAudience: "Healthcare Providers",
    isActive: true
  },
  {
    category: "Family Support",
    title: "National Cancer Institute Coping Support",
    url: "https://www.cancer.gov/about-cancer/coping",
    description: "Resources for patients and families coping with cancer",
    targetAudience: "Patients and Families",
    isActive: true
  },
  {
    category: "Goals of Care",
    title: "Conversation Project Starter Kit", 
    url: "https://theconversationproject.org/get-started/",
    description: "Tools for advance care planning conversations",
    targetAudience: "Patients and Families",
    isActive: true
  },
  {
    category: "Spiritual Care",
    title: "Association of Professional Chaplains Resources",
    url: "https://www.professionalchaplains.org/",
    description: "Spiritual care resources and chaplaincy support",
    targetAudience: "Healthcare Providers",
    isActive: true
  },
  {
    category: "Bereavement",
    title: "National Hospice and Palliative Care Organization Grief Support",
    url: "https://www.nhpco.org/patients-and-caregivers/grief-and-bereavement/",
    description: "Grief support resources and bereavement care",
    targetAudience: "Families and Caregivers",
    isActive: true
  },
  {
    category: "Professional Education",
    title: "Center to Advance Palliative Care",
    url: "https://www.capc.org/",
    description: "Professional development and training in palliative care",
    targetAudience: "Healthcare Providers", 
    isActive: true
  },
  {
    category: "Pediatric Palliative Care",
    title: "Together for Short Lives",
    url: "https://www.togetherforshortlives.org.uk/",
    description: "Resources for children's palliative care",
    targetAudience: "Healthcare Providers",
    isActive: true
  }
];

async function seedPalliativeCareData() {
  try {
    console.log('🌱 Starting palliative care data seeding...');

    // Insert symptom protocols
    console.log('📊 Inserting symptom management protocols...');
    await db.insert(symptomProtocols).values(symptomProtocolsData);
    console.log(`✅ Inserted ${symptomProtocolsData.length} symptom protocols`);

    // Insert opioid conversions  
    console.log('💊 Inserting opioid conversion data...');
    await db.insert(opioidConversions).values(opioidConversionsData);
    console.log(`✅ Inserted ${opioidConversionsData.length} opioid conversions`);

    // Insert resource links
    console.log('🔗 Inserting resource links...');
    await db.insert(resourceLinks).values(resourceLinksData);
    console.log(`✅ Inserted ${resourceLinksData.length} resource links`);

    console.log('🎉 Palliative care data seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding palliative care data:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the seeding if this file is executed directly
seedPalliativeCareData()
  .then(() => {
    console.log('✨ Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });

export { seedPalliativeCareData };