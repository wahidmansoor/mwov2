import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// TypeScript interfaces for inpatient data
export interface AdmissionCriteria {
  id: string;
  criteriaName: string;
  cancerType: string;
  admissionType: 'planned' | 'emergency' | 'urgent';
  clinicalIndications: {
    primary: string[];
    secondary?: string[];
  };
  exclusionCriteria: {
    absolute: string[];
    relative: string[];
  };
  riskFactors: string[];
  requiredAssessments: string[];
  nccnReference: string;
  evidenceLevel: string;
  priority: string;
  estimatedLOS: number;
  specialRequirements: {
    nursing?: string;
    pharmacy?: string;
    laboratory?: string;
    isolation?: string;
    monitoring?: string;
  };
  contraindications: string[];
  isActive: boolean;
}

export interface EmergencyScenario {
  id: string;
  scenarioName: string;
  severity: 'critical' | 'urgent' | 'moderate';
  cancerType: string;
  treatmentRelated: boolean;
  clinicalPresentation: Record<string, string[]>;
  diagnosticCriteria: Record<string, string[]>;
  riskFactors: string[];
  immediateActions: string[];
  timeToIntervention: string;
  requiredResources: string[];
  consultationRequired: string[];
  nccnReference: string;
  evidenceLevel: string;
  isActive: boolean;
}

export interface EmergencyProtocol {
  id: string;
  scenarioId: string;
  protocolName: string;
  stepNumber: number;
  action: string;
  timeFrame: string;
  requiredPersonnel: string[];
  medications: Array<{
    drug: string;
    dose: string;
    route: string;
    frequency: string;
    alternative?: string;
  }>;
  monitoring: string[];
  expectedOutcome: string;
  nextStepTrigger: string;
  alternativeActions: string[];
}

export interface MonitoringParameter {
  id: string;
  parameterName: string;
  category: 'vital_signs' | 'labs' | 'symptoms' | 'performance';
  cancerType: string;
  treatmentPhase: string;
  frequency: string;
  normalRange: Record<string, string>;
  alertThresholds: Record<string, string>;
  criticalValues: Record<string, string>;
  actionRequired: Record<string, string[]>;
  documentationRequired: boolean;
  nursingProtocol: Record<string, string>;
  physicianNotification: Record<string, string>;
  equipmentRequired: string[];
  specialInstructions: string;
  nccnReference: string;
  isActive: boolean;
}

export interface SupportiveCareProtocol {
  id: string;
  protocolName: string;
  category: string;
  indication: string;
  cancerType: string;
  treatmentPhase: string;
  patientPopulation: string;
  interventions: {
    pharmacological: string[];
    non_pharmacological: string[];
  };
  medications: Record<string, any>;
  monitoringProtocol: string[];
  expectedOutcomes: string[];
  adjustmentCriteria: string[];
  escalationCriteria: string[];
  consultationTriggers: string[];
  patientEducation: string[];
  caregiverInstructions: string[];
  qualityOfLifeConsiderations: string[];
  nccnReference: string;
  evidenceLevel: string;
  isActive: boolean;
}

export interface DischargeCriteria {
  id: string;
  criteriaName: string;
  cancerType: string;
  treatmentType: string;
  admissionType: string;
  clinicalStabilityCriteria: string[];
  vitalSignRequirements: Record<string, string>;
  laboratoryRequirements: {
    required: string[];
    acceptable_ranges: Record<string, string>;
  };
  symptomControl: string[];
  functionalStatus: string[];
  socialRequirements: string[];
  homeCareCriteria: string[];
  medicationManagement: string[];
  followUpArrangements: string[];
  redFlagSymptoms: string[];
  patientEducationCompleted: boolean;
  caregiverEducationCompleted: boolean;
  nccnReference: string;
  isActive: boolean;
}

export interface InpatientStats {
  totalAdmissions: number;
  activePatients: number;
  emergencyProtocols: number;
  completedDischarges: number;
  averageLOS: number;
  protocolCompliance: number;
  recentUpdates: number;
  criticalAlerts: number;
}

// Development mode detection
const isDevelopment = process.env.NODE_ENV === 'development';

// Mock API service for development
const mockInpatientAPI = {
  async getAdmissionCriteria(filters?: { cancerType?: string; admissionType?: string }): Promise<AdmissionCriteria[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: '1',
        criteriaName: 'Planned Chemotherapy Admission',
        cancerType: 'Multiple',
        admissionType: 'planned',
        clinicalIndications: {
          primary: [
            'High-dose chemotherapy requiring inpatient monitoring',
            'Complex multi-agent regimens with high toxicity risk',
            'First cycle of highly emetogenic chemotherapy',
            'Patients with poor performance status requiring close monitoring'
          ],
          secondary: [
            'Social factors preventing safe outpatient administration',
            'Geographic distance from emergency care',
            'Patient anxiety requiring supervised administration'
          ]
        },
        exclusionCriteria: {
          absolute: [
            'Active uncontrolled infection',
            'Severe organ dysfunction (Grade 4)',
            'ECOG performance status 4-5 without reversible cause'
          ],
          relative: [
            'Platelet count <50,000 without transfusion support',
            'Neutrophil count <1,000 without growth factor support'
          ]
        },
        riskFactors: [
          'Age >65 years',
          'Multiple comorbidities',
          'Previous severe treatment-related toxicity',
          'Compromised organ function'
        ],
        requiredAssessments: [
          'Complete blood count with differential',
          'Comprehensive metabolic panel',
          'Performance status evaluation',
          'Toxicity assessment from previous cycles',
          'Symptom assessment'
        ],
        nccnReference: 'NCCN-SUPP-1',
        evidenceLevel: 'Category 1',
        priority: 'standard',
        estimatedLOS: 3,
        specialRequirements: {
          nursing: 'Oncology-trained nursing staff',
          pharmacy: '24/7 oncology pharmacy coverage',
          laboratory: 'Stat lab availability'
        },
        contraindications: [
          'Uncontrolled bleeding',
          'Severe infection requiring ICU care',
          'Cardiac instability'
        ],
        isActive: true
      }
    ];
  },

  async getEmergencyScenarios(filters?: { severity?: string; cancerType?: string }): Promise<EmergencyScenario[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        scenarioName: 'Tumor Lysis Syndrome',
        severity: 'critical',
        cancerType: 'Hematologic Malignancies',
        treatmentRelated: true,
        clinicalPresentation: {
          metabolic: [
            'Hyperuricemia (>8 mg/dL)',
            'Hyperkalemia (>6 mEq/L)',
            'Hyperphosphatemia (>4.5 mg/dL)',
            'Hypocalcemia (<7 mg/dL)'
          ],
          clinical: [
            'Oliguria or anuria',
            'Cardiac arrhythmias',
            'Muscle cramps or tetany',
            'Altered mental status',
            'Seizures'
          ]
        },
        diagnosticCriteria: {
          laboratory: [
            '≥2 metabolic abnormalities within 3 days of treatment',
            '25% increase from baseline in any parameter'
          ],
          clinical: ['Renal dysfunction', 'Cardiac arrhythmias', 'Seizures']
        },
        riskFactors: [
          'High tumor burden',
          'Rapidly proliferating tumors',
          'High baseline LDH',
          'Dehydration',
          'Preexisting renal dysfunction'
        ],
        immediateActions: [
          'Aggressive IV hydration (3-4 L/day if tolerated)',
          'Allopurinol 300-600 mg daily or rasburicase',
          'Frequent electrolyte monitoring (q6h)',
          'Nephrology consultation',
          'Consider dialysis for severe cases'
        ],
        timeToIntervention: 'within 1 hour',
        requiredResources: [
          'ICU bed availability',
          'Dialysis capability',
          'Cardiac monitoring',
          'Frequent lab draws'
        ],
        consultationRequired: [
          'Nephrology - immediate',
          'Cardiology if arrhythmias',
          'Critical care if unstable'
        ],
        nccnReference: 'NCCN-SUPP-20',
        evidenceLevel: 'Category 1',
        isActive: true
      }
    ];
  },

  async getMonitoringParameters(filters?: { category?: string; cancerType?: string }): Promise<MonitoringParameter[]> {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    return [
      {
        id: '1',
        parameterName: 'Temperature Monitoring',
        category: 'vital_signs',
        cancerType: 'Multiple',
        treatmentPhase: 'Active treatment',
        frequency: 'Every 4 hours',
        normalRange: {
          oral: '36.1-37.2°C (97-99°F)',
          axillary: '35.5-36.7°C (96-98°F)',
          rectal: '36.6-37.9°C (98-100°F)'
        },
        alertThresholds: {
          fever: '≥38°C (100.4°F)',
          high_fever: '≥38.3°C (101°F)'
        },
        criticalValues: {
          severe_fever: '>39.4°C (103°F)',
          hypothermia: '<35°C (95°F)'
        },
        actionRequired: {
          fever_with_neutropenia: [
            'Obtain blood cultures immediately',
            'Start empiric antibiotics within 1 hour',
            'Notify physician immediately'
          ],
          high_fever: [
            'Cooling measures',
            'Frequent monitoring (q1h)',
            'Consider sepsis workup'
          ]
        },
        documentationRequired: true,
        nursingProtocol: {
          method: 'Use consistent method for same patient',
          avoid_rectal: 'In neutropenic patients due to infection risk'
        },
        physicianNotification: {
          immediate: 'Temperature ≥38.3°C with neutropenia',
          routine: 'Temperature trends and patterns'
        },
        equipmentRequired: ['Thermometer', 'Disposable probe covers'],
        specialInstructions: 'Avoid rectal temperatures in neutropenic or thrombocytopenic patients',
        nccnReference: 'NCCN-PREV-10',
        isActive: true
      }
    ];
  },

  async getSupportiveCareProtocols(filters?: { category?: string; cancerType?: string }): Promise<SupportiveCareProtocol[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        protocolName: 'Chemotherapy-Induced Nausea and Vomiting Prevention',
        category: 'nausea',
        indication: 'Prevention of CINV in patients receiving moderately to highly emetogenic chemotherapy',
        cancerType: 'Multiple',
        treatmentPhase: 'Active chemotherapy',
        patientPopulation: 'Adults receiving emetogenic chemotherapy',
        interventions: {
          pharmacological: [
            '5-HT3 antagonists (ondansetron, granisetron)',
            'NK1 antagonists (aprepitant, fosaprepitant)',
            'Corticosteroids (dexamethasone)',
            'Dopamine antagonists (metoclopramide, prochlorperazine)'
          ],
          non_pharmacological: [
            'Dietary modifications',
            'Acupuncture/acupressure',
            'Behavioral interventions',
            'Environmental modifications'
          ]
        },
        medications: {
          high_emetogenic: [
            {
              day: 'Day 1',
              regimen: 'Ondansetron 8mg IV + Dexamethasone 12mg IV + Aprepitant 125mg PO'
            }
          ]
        },
        monitoringProtocol: [
          'Daily nausea/vomiting assessment',
          'Fluid and electrolyte status',
          'Nutritional intake',
          'Quality of life measures'
        ],
        expectedOutcomes: [
          'Complete response (no vomiting, no rescue medications) in >70% of patients',
          'Maintained oral intake',
          'Preserved quality of life'
        ],
        adjustmentCriteria: [
          'Breakthrough nausea/vomiting',
          'Intolerable side effects',
          'Patient preference changes'
        ],
        escalationCriteria: [
          'Persistent vomiting despite optimal antiemetics',
          'Dehydration or electrolyte imbalance',
          'Unable to maintain oral intake'
        ],
        consultationTriggers: [
          'Refractory nausea/vomiting',
          'Nutritional concerns',
          'Quality of life significantly impacted'
        ],
        patientEducation: [
          'Take antiemetics as prescribed, not PRN',
          'Report breakthrough symptoms promptly',
          'Maintain adequate fluid intake'
        ],
        caregiverInstructions: [
          'Monitor for signs of dehydration',
          'Assist with medication compliance',
          'Encourage small frequent meals'
        ],
        qualityOfLifeConsiderations: [
          'Impact on daily activities',
          'Nutritional status',
          'Psychological well-being'
        ],
        nccnReference: 'NCCN-ANTI-1',
        evidenceLevel: 'Category 1',
        isActive: true
      }
    ];
  },

  async getDischargeCriteria(filters?: { cancerType?: string; treatmentType?: string }): Promise<DischargeCriteria[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: '1',
        criteriaName: 'Post-Chemotherapy Discharge Criteria',
        cancerType: 'Multiple',
        treatmentType: 'Inpatient chemotherapy',
        admissionType: 'planned',
        clinicalStabilityCriteria: [
          'Vital signs stable for 24 hours',
          'No active bleeding',
          'Adequate oral intake',
          'Pain controlled with oral medications',
          'No signs of infection'
        ],
        vitalSignRequirements: {
          temperature: '<38°C for 24 hours',
          blood_pressure: 'Within patient\'s baseline range',
          heart_rate: '60-100 bpm or baseline',
          respiratory_rate: '12-20/min',
          oxygen_saturation: '>92% on room air'
        },
        laboratoryRequirements: {
          required: [
            'CBC with differential',
            'Basic metabolic panel',
            'Liver function tests if indicated'
          ],
          acceptable_ranges: {
            hemoglobin: '>8 g/dL or stable',
            platelets: '>50,000/mm³ or baseline',
            creatinine: 'Within 1.5x baseline'
          }
        },
        symptomControl: [
          'Nausea/vomiting controlled',
          'Pain score <4/10',
          'No severe mucositis',
          'Adequate bowel function'
        ],
        functionalStatus: [
          'Able to ambulate independently or with assistive device',
          'Can perform activities of daily living',
          'Cognitive function at baseline'
        ],
        socialRequirements: [
          'Safe discharge environment identified',
          'Caregiver available if needed',
          'Transportation arranged',
          'Emergency contact information current'
        ],
        homeCareCriteria: [
          'Patient/caregiver educated on medication management',
          'Understands when to seek medical attention',
          'Follow-up appointments scheduled',
          'Home care services arranged if needed'
        ],
        medicationManagement: [
          'Patient understands medication regimen',
          'Adequate supply of medications',
          'Instructions for medication administration',
          'Knowledge of side effects to monitor'
        ],
        followUpArrangements: [
          'Oncology follow-up within 1-2 weeks',
          'Laboratory follow-up scheduled',
          'Emergency contact information provided',
          'Clear instructions for urgent concerns'
        ],
        redFlagSymptoms: [
          'Fever ≥38°C (100.4°F)',
          'Signs of infection',
          'Uncontrolled bleeding',
          'Severe nausea/vomiting',
          'Difficulty breathing',
          'Chest pain',
          'Severe fatigue or weakness'
        ],
        patientEducationCompleted: true,
        caregiverEducationCompleted: true,
        nccnReference: 'NCCN-SUPP-5',
        isActive: true
      }
    ];
  },

  async getInpatientStats(): Promise<InpatientStats> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      totalAdmissions: 1247,
      activePatients: 89,
      emergencyProtocols: 23,
      completedDischarges: 1158,
      averageLOS: 4.2,
      protocolCompliance: 94.8,
      recentUpdates: 12,
      criticalAlerts: 3
    };
  }
};

// Real API functions (to be implemented when backend is ready)
const realInpatientAPI = {
  async getAdmissionCriteria(filters?: { cancerType?: string; admissionType?: string }): Promise<AdmissionCriteria[]> {
    const queryParams = new URLSearchParams();
    if (filters?.cancerType) queryParams.append('cancerType', filters.cancerType);
    if (filters?.admissionType) queryParams.append('admissionType', filters.admissionType);
    const url = `/api/inpatient/admission-criteria${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiRequest('GET', url).then(res => res.json());
  },

  async getEmergencyScenarios(filters?: { severity?: string; cancerType?: string }): Promise<EmergencyScenario[]> {
    const queryParams = new URLSearchParams();
    if (filters?.severity) queryParams.append('severity', filters.severity);
    if (filters?.cancerType) queryParams.append('cancerType', filters.cancerType);
    const url = `/api/inpatient/emergency-scenarios${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiRequest('GET', url).then(res => res.json());
  },

  async getMonitoringParameters(filters?: { category?: string; cancerType?: string }): Promise<MonitoringParameter[]> {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.cancerType) queryParams.append('cancerType', filters.cancerType);
    const url = `/api/inpatient/monitoring-parameters${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiRequest('GET', url).then(res => res.json());
  },

  async getSupportiveCareProtocols(filters?: { category?: string; cancerType?: string }): Promise<SupportiveCareProtocol[]> {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.cancerType) queryParams.append('cancerType', filters.cancerType);
    const url = `/api/inpatient/supportive-care-protocols${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiRequest('GET', url).then(res => res.json());
  },

  async getDischargeCriteria(filters?: { cancerType?: string; treatmentType?: string }): Promise<DischargeCriteria[]> {
    const queryParams = new URLSearchParams();
    if (filters?.cancerType) queryParams.append('cancerType', filters.cancerType);
    if (filters?.treatmentType) queryParams.append('treatmentType', filters.treatmentType);
    const url = `/api/inpatient/discharge-criteria${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiRequest('GET', url).then(res => res.json());
  },

  async getInpatientStats(): Promise<InpatientStats> {
    return apiRequest('GET', '/api/inpatient/stats').then(res => res.json());
  }
};

// Choose API based on environment
const inpatientAPI = isDevelopment ? mockInpatientAPI : realInpatientAPI;

// React Query hooks
export const useAdmissionCriteria = (filters?: { cancerType?: string; admissionType?: string }) => {
  return useQuery({
    queryKey: ['admissionCriteria', filters],
    queryFn: () => inpatientAPI.getAdmissionCriteria(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
};

export const useEmergencyScenarios = (filters?: { severity?: string; cancerType?: string }) => {
  return useQuery({
    queryKey: ['emergencyScenarios', filters],
    queryFn: () => inpatientAPI.getEmergencyScenarios(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
};

export const useMonitoringParameters = (filters?: { category?: string; cancerType?: string }) => {
  return useQuery({
    queryKey: ['monitoringParameters', filters],
    queryFn: () => inpatientAPI.getMonitoringParameters(filters),
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false
  });
};

export const useSupportiveCareProtocols = (filters?: { category?: string; cancerType?: string }) => {
  return useQuery({
    queryKey: ['supportiveCareProtocols', filters],
    queryFn: () => inpatientAPI.getSupportiveCareProtocols(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
};

export const useDischargeCriteria = (filters?: { cancerType?: string; treatmentType?: string }) => {
  return useQuery({
    queryKey: ['dischargeCriteria', filters],
    queryFn: () => inpatientAPI.getDischargeCriteria(filters),
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false
  });
};

export const useInpatientStats = () => {
  return useQuery({
    queryKey: ['inpatientStats'],
    queryFn: () => inpatientAPI.getInpatientStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true
  });
};
