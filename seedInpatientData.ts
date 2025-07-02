/**
 * Comprehensive Inpatient Oncology Database Seeding
 * Seeds admission criteria, emergency protocols, monitoring parameters, 
 * supportive care protocols, and discharge criteria
 * Following NCCN Guidelines and modern oncology standards
 */

import { db } from './server/db';

// Mock data structures that would typically be stored in the database
const admissionCriteriaData = [
  {
    id: '1',
    cancerType: 'Lung Cancer (NSCLC)',
    criteria: `• New diagnosis requiring staging workup and treatment planning
• Superior vena cava syndrome with respiratory compromise
• Symptomatic brain metastases requiring immediate evaluation
• Performance status decline requiring supportive care assessment
• Severe treatment-related toxicity requiring close monitoring`,
    urgencyLevel: 'urgent' as const,
    evidenceLevel: 'Category 1',
    nccnReference: 'NSCL-1',
    requiredTests: [
      'CT chest/abdomen/pelvis with contrast',
      'Brain MRI or CT head with contrast',
      'CBC with differential, CMP',
      'Performance status assessment (ECOG)',
      'Pulmonary function tests if surgery planned'
    ],
    contraindications: [
      'Unstable cardiac condition requiring ICU level care',
      'Active uncontrolled infection requiring isolation',
      'Severe coagulopathy with active bleeding'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    cancerType: 'Breast Cancer',
    criteria: `• Post-operative complications requiring monitoring
• Febrile neutropenia during chemotherapy
• Severe treatment-related toxicity (neuropathy, cardiotoxicity)
• Metastatic disease complications (bone pain, hypercalcemia)
• Pre-operative optimization for surgery`,
    urgencyLevel: 'elective' as const,
    evidenceLevel: 'Category 1',
    nccnReference: 'BREAST-1',
    requiredTests: [
      'CBC with differential',
      'Comprehensive metabolic panel',
      'Liver function tests',
      'ECHO or MUGA if anthracycline exposure',
      'Pain assessment and management plan'
    ],
    contraindications: [
      'Uncontrolled diabetes (HbA1c >9%)',
      'Recent MI or unstable angina (<6 months)',
      'Active substance abuse affecting compliance'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    cancerType: 'Hematologic Malignancies',
    criteria: `• Acute leukemia requiring immediate induction chemotherapy
• Tumor lysis syndrome risk with high tumor burden
• Febrile neutropenia with severe immunosuppression
• Bleeding complications with severe thrombocytopenia
• Hyperleukocytosis requiring urgent cytoreduction`,
    urgencyLevel: 'emergent' as const,
    evidenceLevel: 'Category 1',
    nccnReference: 'AML-1',
    requiredTests: [
      'CBC with differential and peripheral smear',
      'Comprehensive metabolic panel including LDH, uric acid',
      'Coagulation studies (PT/INR, aPTT, fibrinogen)',
      'Blood type and screen',
      'Infectious disease workup if febrile'
    ],
    contraindications: [
      'Do not delay treatment for social issues',
      'Avoid live vaccines in immunocompromised patients',
      'Minimize invasive procedures if platelets <50k'
    ],
    lastUpdated: new Date().toISOString()
  }
];

const emergencyProtocolsData = [
  {
    id: '1',
    emergencyType: 'febrile-neutropenia',
    severity: 'critical' as const,
    immediateActions: [
      'Obtain vital signs and assess hemodynamic stability',
      'Draw blood cultures from all lumens before antibiotics',
      'Administer empiric broad-spectrum antibiotics within 1 hour',
      'Check CBC with differential, CMP, lactate',
      'Assess for source of infection (chest X-ray, urinalysis)',
      'Consider ICU transfer if hemodynamically unstable'
    ],
    medications: [
      {
        drug: 'Piperacillin-Tazobactam',
        dose: '4.5g',
        route: 'IV',
        frequency: 'q6h'
      },
      {
        drug: 'Vancomycin (if MRSA risk)',
        dose: '15-20mg/kg',
        route: 'IV',
        frequency: 'q12h (adjust for renal function)'
      },
      {
        drug: 'Filgrastim (G-CSF)',
        dose: '5 mcg/kg',
        route: 'SC',
        frequency: 'daily until ANC >1000'
      }
    ],
    monitoringParameters: [
      'Temperature q4h',
      'Blood pressure and heart rate q4h',
      'Daily CBC with differential',
      'Daily basic metabolic panel',
      'Blood cultures if fever persists >48h',
      'Consider fungal coverage if fever >5 days'
    ],
    evidenceReference: 'Category 1 - NCCN Guidelines',
    nccnReference: 'BINV-A',
    timeToTreatment: '< 1 hour',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    emergencyType: 'tumor-lysis',
    severity: 'high' as const,
    immediateActions: [
      'Initiate aggressive IV hydration (3L/m²/day)',
      'Check electrolytes, phosphorus, calcium, magnesium, uric acid, LDH',
      'Start allopurinol or rasburicase based on risk level',
      'Monitor urine output (goal >2mL/kg/hr)',
      'Avoid potassium and phosphorus in IV fluids',
      'Cardiology consultation if ECG changes'
    ],
    medications: [
      {
        drug: 'Allopurinol',
        dose: '300mg',
        route: 'PO',
        frequency: 'daily'
      },
      {
        drug: 'Rasburicase (high risk)',
        dose: '0.2mg/kg',
        route: 'IV',
        frequency: 'daily x 3-7 days'
      },
      {
        drug: 'Normal Saline',
        dose: '3L/m²/day',
        route: 'IV',
        frequency: 'continuous'
      }
    ],
    monitoringParameters: [
      'Electrolytes q6h for first 48h',
      'Urine output hourly',
      'Daily weight',
      'ECG if electrolyte abnormalities',
      'Nephrology consultation if creatinine rising',
      'Consider hemodialysis for severe cases'
    ],
    evidenceReference: 'Category 1 - NCCN Guidelines',
    nccnReference: 'BINV-B',
    timeToTreatment: '< 2 hours',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    emergencyType: 'hypercalcemia',
    severity: 'moderate' as const,
    immediateActions: [
      'Assess volume status and neurological function',
      'Obtain ionized calcium, albumin, PTH, vitamin D levels',
      'Initiate normal saline hydration',
      'Hold calcium supplements and vitamin D',
      'Consider bisphosphonate therapy',
      'Evaluate for underlying malignancy progression'
    ],
    medications: [
      {
        drug: 'Normal Saline',
        dose: '250-500mL/hr',
        route: 'IV',
        frequency: 'continuous (adjust for heart failure)'
      },
      {
        drug: 'Furosemide',
        dose: '20-40mg',
        route: 'IV',
        frequency: 'q12h (after adequate hydration)'
      },
      {
        drug: 'Zoledronic Acid',
        dose: '4mg',
        route: 'IV',
        frequency: 'single dose (infuse over 15min)'
      }
    ],
    monitoringParameters: [
      'Ionized calcium q12h',
      'Basic metabolic panel q12h',
      'Neurological assessment q4h',
      'Urine output monitoring',
      'ECG for QT interval changes',
      'Response typically seen in 2-4 days'
    ],
    evidenceReference: 'Category 2A - NCCN Guidelines',
    nccnReference: 'BINV-C',
    timeToTreatment: '< 4 hours',
    lastUpdated: new Date().toISOString()
  }
];

const monitoringParametersData = [
  {
    id: '1',
    parameterName: 'Absolute Neutrophil Count (ANC)',
    normalRange: '1500-8000 cells/mcL',
    cancerType: 'All Cancer Types',
    frequency: 'daily',
    alertThresholds: {
      low: '<1000 cells/mcL',
      high: '>50,000 cells/mcL',
      critical: '<500 cells/mcL'
    },
    interventions: [
      'Neutropenia precautions if ANC <1000',
      'Consider G-CSF support if ANC <500',
      'Antibiotic prophylaxis per institutional guidelines',
      'Daily assessment for signs of infection',
      'Avoid invasive procedures if possible'
    ],
    evidenceLevel: 'Category 1',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    parameterName: 'Platelet Count',
    normalRange: '150,000-450,000/mcL',
    cancerType: 'All Cancer Types',
    frequency: 'daily',
    alertThresholds: {
      low: '<50,000/mcL',
      high: '>1,000,000/mcL',
      critical: '<10,000/mcL'
    },
    interventions: [
      'Bleeding precautions if platelets <50k',
      'Consider platelet transfusion if <10k or bleeding',
      'Avoid anticoagulants and NSAIDs',
      'Fall risk assessment and precautions',
      'Monitor for signs of bleeding'
    ],
    evidenceLevel: 'Category 1',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    parameterName: 'Serum Creatinine',
    normalRange: '0.6-1.2 mg/dL',
    cancerType: 'All Cancer Types',
    frequency: 'daily',
    alertThresholds: {
      low: 'N/A',
      high: '>2x baseline',
      critical: '>3x baseline or requiring dialysis'
    },
    interventions: [
      'Nephrology consultation if creatinine >2x baseline',
      'Adjust medication doses for renal function',
      'Evaluate for nephrotoxic medications',
      'Consider contrast nephropathy prevention',
      'Monitor urine output and fluid balance'
    ],
    evidenceLevel: 'Category 1',
    lastUpdated: new Date().toISOString()
  }
];

const supportiveProtocolsData = [
  {
    id: '1',
    symptom: 'nausea-vomiting',
    severity: 'moderate',
    interventions: {
      pharmacologic: [
        'Ondansetron 8mg IV q8h PRN nausea/vomiting',
        'Metoclopramide 10mg IV q6h PRN for gastroparesis',
        'Prochlorperazine 10mg IV q6h PRN breakthrough nausea',
        'Dexamethasone 4mg IV daily for delayed nausea',
        'Lorazepam 0.5mg PO q6h PRN anticipatory nausea'
      ],
      nonPharmacologic: [
        'Small frequent meals, avoid strong odors',
        'Ginger supplements or tea',
        'Acupressure bands (P6 point stimulation)',
        'Progressive muscle relaxation techniques',
        'Cool compress to forehead and neck'
      ]
    },
    evidenceLevel: 'Category 1',
    nccnReference: 'ANTI-1',
    contraindications: [
      'QT prolongation with ondansetron',
      'Extrapyramidal symptoms with metoclopramide',
      'Gastric outlet obstruction'
    ],
    monitoringRequired: [
      'Frequency and severity of episodes',
      'Fluid intake and hydration status',
      'Electrolyte balance',
      'Weight monitoring'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    symptom: 'pain',
    severity: 'severe',
    interventions: {
      pharmacologic: [
        'Morphine 2-4mg IV q2-4h PRN severe pain',
        'Hydromorphone 0.5-1mg IV q2-4h PRN alternative',
        'Fentanyl patch 12-25mcg/hr for chronic pain',
        'Acetaminophen 650mg PO q6h for mild pain',
        'Gabapentin 100-300mg TID for neuropathic pain'
      ],
      nonPharmacologic: [
        'Heat/cold therapy as appropriate',
        'Physical therapy and gentle exercise',
        'Massage therapy and relaxation techniques',
        'Transcutaneous electrical nerve stimulation (TENS)',
        'Cognitive behavioral therapy referral'
      ]
    },
    evidenceLevel: 'Category 1',
    nccnReference: 'PAIN-1',
    contraindications: [
      'Respiratory depression with opioids',
      'Renal impairment with morphine',
      'History of substance abuse (relative)'
    ],
    monitoringRequired: [
      'Pain scores q4h using 0-10 scale',
      'Respiratory rate and sedation level',
      'Constipation prevention',
      'Functional status assessment'
    ],
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    symptom: 'fatigue',
    severity: 'mild',
    interventions: {
      pharmacologic: [
        'Methylphenidate 5-10mg PO BID for severe fatigue',
        'Iron supplementation if deficient',
        'Erythropoietin if anemia present',
        'Thyroid hormone if hypothyroid',
        'Vitamin D supplementation if deficient'
      ],
      nonPharmacologic: [
        'Energy conservation techniques',
        'Graduated exercise program',
        'Sleep hygiene education',
        'Nutritional counseling',
        'Stress management and counseling'
      ]
    },
    evidenceLevel: 'Category 2A',
    nccnReference: 'FATIGUE-1',
    contraindications: [
      'Cardiac arrhythmias with stimulants',
      'Uncontrolled hypertension',
      'History of seizures'
    ],
    monitoringRequired: [
      'Fatigue severity scale assessment',
      'Sleep pattern evaluation',
      'Activity tolerance monitoring',
      'Depression screening'
    ],
    lastUpdated: new Date().toISOString()
  }
];

const dischargeCriteriaData = [
  {
    id: '1',
    cancerType: 'Lung Cancer',
    treatmentType: 'chemotherapy',
    medicalCriteria: [
      'Hemodynamically stable for >24 hours',
      'Afebrile for >24 hours without neutropenia',
      'Pain controlled with oral medications',
      'Tolerating oral intake without nausea/vomiting',
      'Laboratory values stable or improving',
      'Safe mobility or assistive devices arranged'
    ],
    socialCriteria: [
      'Safe home environment assessment completed',
      'Caregiver availability and training provided',
      'Transportation to follow-up appointments arranged',
      'Emergency contact information verified',
      'Insurance authorization for outpatient care'
    ],
    followUpRequirements: [
      'Oncology follow-up within 1-2 weeks',
      'Laboratory studies (CBC, CMP) in 3-5 days',
      'Symptom monitoring and reporting plan',
      'Medication reconciliation completed'
    ],
    warningSignsEducation: [
      'Fever >100.4°F (38°C)',
      'Persistent nausea/vomiting preventing oral intake',
      'Severe shortness of breath or chest pain',
      'Signs of infection (cough, urinary symptoms)',
      'Severe fatigue or confusion'
    ],
    medicationReconciliation: true,
    evidenceLevel: 'Category 1',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    cancerType: 'Breast Cancer',
    treatmentType: 'surgery',
    medicalCriteria: [
      'Surgical site healing appropriately',
      'Pain controlled with oral analgesics',
      'No signs of infection or complications',
      'Drain output <30mL/day (if applicable)',
      'Normal postoperative laboratory values',
      'Independent or assisted ambulation'
    ],
    socialCriteria: [
      'Home health services arranged if needed',
      'Wound care supplies and education provided',
      'Physical therapy referral if indicated',
      'Support system assessment completed',
      'Financial counseling if needed'
    ],
    followUpRequirements: [
      'Surgical follow-up in 1-2 weeks',
      'Oncology consultation for adjuvant therapy planning',
      'Pathology results review appointment',
      'Genetic counseling if indicated'
    ],
    warningSignsEducation: [
      'Increased redness, swelling, or warmth at surgical site',
      'Purulent drainage or foul odor from incision',
      'Fever >101°F or chills',
      'Severe or worsening pain',
      'Numbness or tingling in arm (if axillary surgery)'
    ],
    medicationReconciliation: true,
    evidenceLevel: 'Category 1',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    cancerType: 'Hematologic',
    treatmentType: 'immunotherapy',
    medicalCriteria: [
      'No signs of cytokine release syndrome',
      'Neurological status at baseline',
      'Liver function tests stable',
      'No evidence of tumor lysis syndrome',
      'Adequate performance status (ECOG 0-2)',
      'Laboratory values within acceptable range'
    ],
    socialCriteria: [
      'Lives within 1 hour of treatment center',
      'Reliable transportation for frequent visits',
      'Caregiver trained in symptom recognition',
      'Access to 24-hour medical care',
      'Financial clearance for continued treatment'
    ],
    followUpRequirements: [
      'Return visit in 1-3 days for assessment',
      'Weekly laboratory monitoring initially',
      'Response assessment imaging in 4-6 weeks',
      'Long-term follow-up care plan established'
    ],
    warningSignsEducation: [
      'High fever with rigors or chills',
      'Difficulty breathing or chest tightness',
      'Severe headache or confusion',
      'Rash or other skin changes',
      'Severe fatigue or inability to function'
    ],
    medicationReconciliation: true,
    evidenceLevel: 'Category 1',
    lastUpdated: new Date().toISOString()
  }
];

// Mock API service for development
export class InpatientAPIService {
  static async getAdmissionCriteria(cancerType?: string, urgencyLevel?: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = admissionCriteriaData;
    
    if (cancerType) {
      filtered = filtered.filter(criteria => 
        criteria.cancerType.toLowerCase().includes(cancerType.toLowerCase())
      );
    }
    
    if (urgencyLevel) {
      filtered = filtered.filter(criteria => criteria.urgencyLevel === urgencyLevel);
    }
    
    return filtered;
  }

  static async getEmergencyProtocols(emergencyType?: string, severity?: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = emergencyProtocolsData;
    
    if (emergencyType) {
      filtered = filtered.filter(protocol => protocol.emergencyType === emergencyType);
    }
    
    if (severity) {
      filtered = filtered.filter(protocol => protocol.severity === severity);
    }
    
    return filtered;
  }

  static async getMonitoringParameters(cancerType?: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = monitoringParametersData;
    
    if (cancerType) {
      filtered = filtered.filter(param => 
        param.cancerType === 'All Cancer Types' || 
        param.cancerType.toLowerCase().includes(cancerType.toLowerCase())
      );
    }
    
    return filtered;
  }

  static async getSupportiveCareProtocols(symptom?: string, severity?: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = supportiveProtocolsData;
    
    if (symptom) {
      filtered = filtered.filter(protocol => protocol.symptom === symptom);
    }
    
    if (severity) {
      filtered = filtered.filter(protocol => protocol.severity === severity);
    }
    
    return filtered;
  }

  static async getDischargeCriteria(cancerType?: string, treatmentType?: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = dischargeCriteriaData;
    
    if (cancerType) {
      filtered = filtered.filter(criteria => 
        criteria.cancerType.toLowerCase().includes(cancerType.toLowerCase())
      );
    }
    
    if (treatmentType) {
      filtered = filtered.filter(criteria => criteria.treatmentType === treatmentType);
    }
    
    return filtered;
  }

  static async getInpatientStats() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      totalProtocols: admissionCriteriaData.length + emergencyProtocolsData.length + 
                     monitoringParametersData.length + supportiveProtocolsData.length + 
                     dischargeCriteriaData.length,
      emergencyProtocols: emergencyProtocolsData.length,
      monitoringParameters: monitoringParametersData.length,
      recentUpdates: 5,
      lastUpdate: '24h ago'
    };
  }
}

export {
  admissionCriteriaData,
  emergencyProtocolsData,
  monitoringParametersData,
  supportiveProtocolsData,
  dischargeCriteriaData
};
