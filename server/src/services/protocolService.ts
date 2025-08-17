import { logger } from "../utils/logger.js";
import { NotFoundError } from "../utils/errorHandler.js";

interface Protocol {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: 'symptom' | 'emergency';
  summary: string;
  steps: string[];
  red_flags: string[];
  contraindications?: string[];
  medications?: Medication[];
  monitoring?: string[];
  follow_up?: string[];
  evidence_level?: string;
  source?: string;
  last_updated: string;
  created_at: string;
}

interface Medication {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  duration?: string;
  notes?: string;
  contraindications?: string[];
}

interface SearchQuery {
  q: string;
  type?: 'symptom' | 'emergency' | 'all';
  category?: string;
  limit?: number;
}

interface ProtocolFilter {
  category?: string;
  type?: 'symptom' | 'emergency';
}

// Mock protocol database - In production, this would be replaced with Supabase queries
const SYMPTOM_PROTOCOLS: Protocol[] = [
  {
    id: "sp-001",
    slug: "cancer-pain",
    title: "Cancer Pain Management",
    category: "pain_management",
    type: "symptom",
    summary: "Comprehensive approach to cancer pain using WHO analgesic ladder",
    steps: [
      "Assess pain intensity using validated scales (0-10 numeric scale)",
      "Step 1: Non-opioid analgesics (acetaminophen, NSAIDs) for mild pain (1-3)",
      "Step 2: Weak opioids (codeine, tramadol) + non-opioids for moderate pain (4-6)",
      "Step 3: Strong opioids (morphine, oxycodone, fentanyl) + non-opioids for severe pain (7-10)",
      "Add adjuvant medications as indicated (anticonvulsants, antidepressants)",
      "Consider non-pharmacological interventions",
      "Reassess and titrate every 24-48 hours until adequate control"
    ],
    red_flags: [
      "Sudden onset severe pain (consider pathological fracture)",
      "Neurological deficits (consider spinal cord compression)",
      "Uncontrolled breakthrough pain despite adequate baseline analgesia",
      "Signs of opioid overdose (respiratory depression, altered mental status)",
      "Suspected malignant spinal cord compression"
    ],
    contraindications: [
      "NSAIDs in severe renal impairment or active bleeding",
      "Opioids in severe respiratory compromise without ventilatory support"
    ],
    medications: [
      {
        name: "Morphine",
        dosage: "5-10mg",
        route: "PO",
        frequency: "q4h PRN",
        notes: "Start low, titrate slowly. Convert to long-acting when stable"
      },
      {
        name: "Acetaminophen",
        dosage: "650-1000mg",
        route: "PO",
        frequency: "q6h",
        notes: "Maximum 4g/day. Reduce in hepatic impairment"
      }
    ],
    monitoring: [
      "Pain scores every 4-6 hours",
      "Sedation scores",
      "Respiratory rate and effort",
      "Bowel function",
      "Functional status"
    ],
    follow_up: [
      "Daily assessment until pain controlled",
      "Weekly medication review",
      "Reassess pain management plan with disease progression"
    ],
    evidence_level: "Level I (WHO Guidelines)",
    source: "WHO Cancer Pain Guidelines 2018, NCCN Adult Cancer Pain 2023",
    last_updated: "2024-01-15",
    created_at: "2023-01-01"
  },
  {
    id: "sp-002", 
    slug: "nausea-vomiting",
    title: "Nausea and Vomiting Management",
    category: "gastrointestinal_symptoms",
    type: "symptom",
    summary: "Evidence-based approach to managing chemotherapy-induced and disease-related nausea/vomiting",
    steps: [
      "Identify underlying cause (chemotherapy, radiation, disease, medications)",
      "Assess severity and impact on oral intake and quality of life",
      "Start with appropriate antiemetic based on emetogenic potential",
      "Use combination therapy for moderate-severe symptoms",
      "Address contributing factors (constipation, anxiety, metabolic issues)",
      "Consider non-pharmacological interventions",
      "Monitor response and adjust therapy within 24-48 hours"
    ],
    red_flags: [
      "Signs of dehydration or electrolyte imbalance",
      "Complete inability to maintain oral intake >24 hours",
      "Signs of bowel obstruction",
      "Severe abdominal pain with vomiting",
      "Hematemesis"
    ],
    medications: [
      {
        name: "Ondansetron",
        dosage: "4-8mg",
        route: "PO/IV",
        frequency: "q8h",
        notes: "5-HT3 antagonist. May cause constipation"
      },
      {
        name: "Metoclopramide",
        dosage: "10mg",
        route: "PO/IV",
        frequency: "q6h",
        notes: "Prokinetic agent. Avoid in bowel obstruction"
      }
    ],
    monitoring: [
      "Nausea/vomiting episodes per day",
      "Oral intake tolerance",
      "Weight and hydration status",
      "Electrolyte levels"
    ],
    evidence_level: "Level I (ASCO/NCCN Guidelines)",
    source: "ASCO Antiemetic Guidelines 2023, NCCN Antiemesis 2023",
    last_updated: "2024-02-01",
    created_at: "2023-01-01"
  },
  {
    id: "sp-003",
    slug: "dyspnea",
    title: "Dyspnea Management",
    category: "respiratory_symptoms",
    type: "symptom", 
    summary: "Systematic approach to managing breathlessness in cancer patients",
    steps: [
      "Assess severity using modified Borg scale or numerical scale",
      "Identify reversible causes (pleural effusion, anemia, heart failure)",
      "Treat underlying causes when appropriate",
      "Initiate opioids for symptomatic relief",
      "Consider bronchodilators if airway obstruction suspected",
      "Implement non-pharmacological strategies",
      "Reassess frequently and adjust treatment"
    ],
    red_flags: [
      "Severe acute dyspnea (respiratory emergency)",
      "Stridor or upper airway obstruction",
      "Cyanosis or signs of severe hypoxemia",
      "Massive pleural effusion",
      "Superior vena cava syndrome"
    ],
    medications: [
      {
        name: "Morphine",
        dosage: "2.5-5mg",
        route: "PO",
        frequency: "q4h PRN",
        notes: "Low dose effective for dyspnea. Monitor respiratory rate"
      },
      {
        name: "Furosemide",
        dosage: "20-40mg",
        route: "PO/IV",
        frequency: "daily-BID",
        notes: "If heart failure component. Monitor electrolytes"
      }
    ],
    monitoring: [
      "Dyspnea severity scores",
      "Respiratory rate and effort",
      "Oxygen saturation",
      "Activity tolerance",
      "Anxiety levels"
    ],
    evidence_level: "Level II (Expert Consensus)",
    source: "European Respiratory Society Guidelines 2023",
    last_updated: "2024-01-20",
    created_at: "2023-01-01"
  }
];

const EMERGENCY_PROTOCOLS: Protocol[] = [
  {
    id: "ep-001",
    slug: "spinal-cord-compression",
    title: "Malignant Spinal Cord Compression",
    category: "oncological_emergencies",
    type: "emergency",
    summary: "Urgent management of suspected malignant spinal cord compression",
    steps: [
      "IMMEDIATE: Assess neurological function and mobility",
      "Order urgent MRI spine (within 24 hours, ideally <4 hours)",
      "Start high-dose dexamethasone immediately",
      "Strict bed rest until imaging complete",
      "Urgent oncology and radiation oncology consultation",
      "Consider neurosurgical consultation if appropriate",
      "Plan definitive treatment (radiation vs surgery)"
    ],
    red_flags: [
      "Progressive motor weakness",
      "Sensory level changes",
      "Bladder or bowel dysfunction",
      "Severe back pain with neurological symptoms",
      "Complete paraplegia"
    ],
    medications: [
      {
        name: "Dexamethasone",
        dosage: "16mg",
        route: "IV",
        frequency: "stat, then 4mg q6h",
        notes: "High initial dose for cord compression. Taper based on response"
      }
    ],
    monitoring: [
      "Neurological examinations every 2-4 hours",
      "Motor and sensory function",
      "Bladder function",
      "Pain assessment",
      "Blood glucose (steroid effect)"
    ],
    follow_up: [
      "Radiation oncology within 24 hours",
      "Neurosurgery consultation if indicated",
      "Daily neurological assessments"
    ],
    evidence_level: "Level I (ASCO Guidelines)",
    source: "ASCO Practice Guidelines 2023, NCCN CNS Cancers 2023",
    last_updated: "2024-01-10",
    created_at: "2023-01-01"
  },
  {
    id: "ep-002",
    slug: "hypercalcemia",
    title: "Hypercalcemia of Malignancy",
    category: "metabolic_emergencies", 
    type: "emergency",
    summary: "Management of malignancy-associated hypercalcemia",
    steps: [
      "Confirm hypercalcemia with corrected calcium or ionized calcium",
      "Assess symptoms and severity",
      "Start aggressive IV fluid resuscitation",
      "Administer bisphosphonate therapy",
      "Monitor electrolytes and renal function closely",
      "Treat underlying malignancy if possible",
      "Consider calcitonin for severe cases"
    ],
    red_flags: [
      "Corrected calcium >14 mg/dL (3.5 mmol/L)",
      "Altered mental status",
      "Cardiac arrhythmias",
      "Severe dehydration",
      "Acute kidney injury"
    ],
    medications: [
      {
        name: "Zoledronic acid",
        dosage: "4mg",
        route: "IV",
        frequency: "single dose over 15 minutes",
        notes: "Most effective bisphosphonate. Check renal function first"
      },
      {
        name: "Calcitonin",
        dosage: "4 IU/kg",
        route: "SC/IM",
        frequency: "q12h",
        notes: "Rapid onset but short duration. Use for severe cases"
      }
    ],
    monitoring: [
      "Serum calcium every 6-12 hours",
      "Electrolytes (phosphate, magnesium)",
      "Renal function",
      "Cardiac monitoring if severe",
      "Mental status"
    ],
    evidence_level: "Level I (ASCO Guidelines)",
    source: "ASCO Supportive Care Guidelines 2023",
    last_updated: "2024-01-05",
    created_at: "2023-01-01"
  }
];

export const protocolService = {
  getSymptomProtocol: async (slug: string): Promise<Protocol | null> => {
    logger.info({ slug }, 'Retrieving symptom protocol');
    
    const protocol = SYMPTOM_PROTOCOLS.find(p => p.slug === slug);
    if (!protocol) {
      logger.warn({ slug }, 'Symptom protocol not found');
      return null;
    }
    
    return protocol;
  },

  getEmergencyProtocol: async (slug: string): Promise<Protocol | null> => {
    logger.info({ slug }, 'Retrieving emergency protocol');
    
    const protocol = EMERGENCY_PROTOCOLS.find(p => p.slug === slug);
    if (!protocol) {
      logger.warn({ slug }, 'Emergency protocol not found');
      return null;
    }
    
    return protocol;
  },

  searchProtocols: async ({ q, type = 'all', category, limit = 20 }: SearchQuery): Promise<Protocol[]> => {
    logger.info({ query: q, type, category, limit }, 'Searching protocols');
    
    let allProtocols: Protocol[] = [];
    
    if (type === 'all' || type === 'symptom') {
      allProtocols = allProtocols.concat(SYMPTOM_PROTOCOLS);
    }
    if (type === 'all' || type === 'emergency') {
      allProtocols = allProtocols.concat(EMERGENCY_PROTOCOLS);
    }
    
    // Filter by category if specified
    if (category) {
      allProtocols = allProtocols.filter(p => p.category === category);
    }
    
    // Search in title, summary, and steps
    const searchTerm = q.toLowerCase();
    const results = allProtocols.filter(protocol => {
      return (
        protocol.title.toLowerCase().includes(searchTerm) ||
        protocol.summary.toLowerCase().includes(searchTerm) ||
        protocol.steps.some(step => step.toLowerCase().includes(searchTerm)) ||
        protocol.red_flags.some(flag => flag.toLowerCase().includes(searchTerm))
      );
    });
    
    // Sort by relevance (title matches first, then summary, then content)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      const aSummary = a.summary.toLowerCase().includes(searchTerm);
      const bSummary = b.summary.toLowerCase().includes(searchTerm);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      if (aSummary && !bSummary) return -1;
      if (!aSummary && bSummary) return 1;
      
      return 0;
    });
    
    return results.slice(0, limit);
  },

  getAllProtocols: async ({ category, type }: ProtocolFilter): Promise<Protocol[]> => {
    logger.info({ category, type }, 'Retrieving all protocols');
    
    let protocols: Protocol[] = [];
    
    if (!type || type === 'symptom') {
      protocols = protocols.concat(SYMPTOM_PROTOCOLS);
    }
    if (!type || type === 'emergency') {
      protocols = protocols.concat(EMERGENCY_PROTOCOLS);
    }
    
    if (category) {
      protocols = protocols.filter(p => p.category === category);
    }
    
    // Sort by category, then by title
    protocols.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.title.localeCompare(b.title);
    });
    
    return protocols;
  },

  getProtocolById: async (id: string): Promise<Protocol | null> => {
    logger.info({ id }, 'Retrieving protocol by ID');
    
    const allProtocols = [...SYMPTOM_PROTOCOLS, ...EMERGENCY_PROTOCOLS];
    const protocol = allProtocols.find(p => p.id === id);
    
    if (!protocol) {
      logger.warn({ id }, 'Protocol not found by ID');
      return null;
    }
    
    return protocol;
  },

  getRelatedProtocols: async (protocolId: string, limit: number = 3): Promise<Protocol[]> => {
    logger.info({ protocolId, limit }, 'Finding related protocols');
    
    const protocol = await protocolService.getProtocolById(protocolId);
    if (!protocol) {
      return [];
    }
    
    const allProtocols = [...SYMPTOM_PROTOCOLS, ...EMERGENCY_PROTOCOLS];
    
    // Find protocols in the same category or type
    const related = allProtocols
      .filter(p => p.id !== protocolId && (p.category === protocol.category || p.type === protocol.type))
      .slice(0, limit);
    
    return related;
  }
};
