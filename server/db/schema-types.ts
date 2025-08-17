// Authoritative type definitions matching the actual Supabase schema
// Generated from schema audit on August 17, 2025

export interface Users {
  id: string;                    // character varying, PRIMARY KEY
  email: string;                 // character varying, UNIQUE  
  first_name: string;            // character varying
  last_name: string;             // character varying
  profile_image_url: string;     // character varying
  role: string;                  // text
  department: string;            // text
  license_number: string;        // text
  is_active: boolean;            // boolean
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
}

export interface AiInteractions {
  id: string;                    // uuid, PRIMARY KEY
  user_id: string;               // character varying, FK to users(id)
  session_id: string;            // character varying(255)
  module_type: string;           // character varying(100)
  intent: string;                // character varying(100)
  input_context: Record<string, any>; // jsonb
  ai_response: Record<string, any>;   // jsonb
  confidence_score: number;      // numeric(3,2)
  user_feedback: string;         // character varying(50)
  response_time_ms: number;      // integer
  model_version: string;         // character varying(100)
  created_at: string;            // timestamp without time zone
}

export interface CdProtocols {
  id: string;                    // uuid, PRIMARY KEY
  code: string;                  // character varying(50), UNIQUE
  tumour_group: string;          // character varying(100)
  tumour_supergroup: string;     // character varying(100)
  treatment_intent: string;      // character varying(50)
  summary: string;               // text
  eligibility: Record<string, any>; // jsonb
  precautions: Record<string, any>; // jsonb
  treatment: Record<string, any>;   // jsonb
  tests: Record<string, any>;       // jsonb
  dose_modifications: Record<string, any>; // jsonb
  reference_list: Record<string, any>;     // jsonb
  cycle_info: Record<string, any>;         // jsonb
  pre_medications: Record<string, any>;    // jsonb
  post_medications: Record<string, any>;   // jsonb
  supportive_care: Record<string, any>;    // jsonb
  rescue_agents: Record<string, any>;      // jsonb
  monitoring: Record<string, any>;         // jsonb
  toxicity_monitoring: Record<string, any>; // jsonb
  interactions: Record<string, any>;       // jsonb
  contraindications: Record<string, any>;  // jsonb
  version: string;               // character varying(20)
  status: string;                // character varying(20)
  created_by: string;            // character varying, FK to users(id)
  updated_by: string;            // character varying, FK to users(id)
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
  last_reviewed: string;         // timestamp without time zone
}

export interface NccnGuidelines {
  id: string;                    // uuid, PRIMARY KEY
  reference_code: string;        // character varying(50)
  title: string;                 // character varying(500)
  category: string;              // character varying(100)
  cancer_type: string;           // character varying(100)
  version: string;               // character varying(50)
  release_date: string;          // character varying(50)
  content: Record<string, any>;  // jsonb
  evidence_level: string;        // character varying(50)
  consensus_level: string;       // character varying(50)
  applicable_stages: Record<string, any>;     // jsonb
  biomarker_requirements: Record<string, any>; // jsonb
  treatment_settings: Record<string, any>;     // jsonb
  special_populations: Record<string, any>;    // jsonb
  cross_references: Record<string, any>;       // jsonb
  evidence_references: Record<string, any>;    // jsonb
  updates_from_previous: string;               // text
  clinical_decision_points: Record<string, any>; // jsonb
  monitoring_requirements: Record<string, any>;  // jsonb
  contraindications: Record<string, any>;        // jsonb
  alternative_approaches: Record<string, any>;   // jsonb
  quality_measures: Record<string, any>;         // jsonb
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
}

export interface OncologyMedications {
  id: string;                    // uuid, PRIMARY KEY
  name: string;                  // character varying(255)
  brand_names: Record<string, any>; // jsonb
  classification: string;        // character varying(255)
  mechanism: string;             // text
  administration: string;        // text
  indications: Record<string, any>; // jsonb
  dosing: Record<string, any>;      // jsonb
  side_effects: Record<string, any>; // jsonb
  monitoring: Record<string, any>;   // jsonb
  interactions: Record<string, any>; // jsonb
  reference_sources: Record<string, any>; // jsonb
  summary: string;               // text
  black_box_warning: string;     // text
  special_considerations: Record<string, any>; // jsonb
  pharmacokinetics: Record<string, any>;       // jsonb
  contraindications: Record<string, any>;      // jsonb
  routine_monitoring: Record<string, any>;     // jsonb
  pre_treatment_tests: Record<string, any>;    // jsonb
  is_chemotherapy: boolean;      // boolean
  is_immunotherapy: boolean;     // boolean
  is_targeted_therapy: boolean;  // boolean
  is_orphan_drug: boolean;       // boolean
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
}

export interface AdmissionCriteria {
  id: string;                    // uuid, PRIMARY KEY
  criteria_name: string;         // character varying(255)
  cancer_type: string;           // character varying(100)
  admission_type: string;        // character varying(100)
  clinical_indications: Record<string, any>; // jsonb
  exclusion_criteria: Record<string, any>;   // jsonb
  risk_factors: Record<string, any>;         // jsonb
  required_assessments: Record<string, any>; // jsonb
  nccn_reference: string;        // character varying(50)
  evidence_level: string;        // character varying(50)
  priority: string;              // character varying(50)
  estimated_los: number;         // integer
  special_requirements: Record<string, any>; // jsonb
  contraindications: Record<string, any>;    // jsonb
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
  is_active: boolean;            // boolean
}

export interface EmergencyProtocols {
  id: string;                    // uuid, PRIMARY KEY
  scenario_id: string;           // uuid, FK to emergency_scenarios(id)
  protocol_name: string;         // character varying(255)
  step_number: number;           // integer
  action: string;                // text
  time_frame: string;            // character varying(100)
  required_personnel: Record<string, any>; // jsonb
  medications: Record<string, any>;        // jsonb
  monitoring: Record<string, any>;         // jsonb
  expected_outcome: string;      // text
  next_step_trigger: string;     // text
  alternative_actions: Record<string, any>; // jsonb
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
}

export interface EmergencyScenarios {
  id: string;                    // uuid, PRIMARY KEY
  scenario_name: string;         // character varying(255)
  severity: string;              // character varying(50)
  cancer_type: string;           // character varying(100)
  treatment_related: boolean;    // boolean
  clinical_presentation: Record<string, any>; // jsonb
  diagnostic_criteria: Record<string, any>;   // jsonb
  risk_factors: Record<string, any>;          // jsonb
  immediate_actions: Record<string, any>;     // jsonb
  time_to_intervention: string;  // character varying(100)
  required_resources: Record<string, any>;    // jsonb
  consultation_required: Record<string, any>; // jsonb
  nccn_reference: string;        // character varying(50)
  evidence_level: string;        // character varying(50)
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
  is_active: boolean;            // boolean
}

export interface MonitoringParameters {
  id: string;                    // uuid, PRIMARY KEY
  parameter_name: string;        // character varying(255)
  category: string;              // character varying(100)
  cancer_type: string;           // character varying(100)
  treatment_phase: string;       // character varying(100)
  frequency: string;             // character varying(100)
  normal_range: Record<string, any>;          // jsonb
  alert_thresholds: Record<string, any>;      // jsonb
  critical_values: Record<string, any>;       // jsonb
  action_required: Record<string, any>;       // jsonb
  documentation_required: boolean; // boolean
  nursing_protocol: Record<string, any>;      // jsonb
  physician_notification: Record<string, any>; // jsonb
  equipment_required: Record<string, any>;    // jsonb
  special_instructions: string;  // text
  nccn_reference: string;        // character varying(50)
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
  is_active: boolean;            // boolean
}

export interface SupportiveCareProtocols {
  id: string;                    // uuid, PRIMARY KEY
  protocol_name: string;         // character varying(255)
  category: string;              // character varying(100)
  indication: string;            // text
  cancer_type: string;           // character varying(100)
  treatment_phase: string;       // character varying(100)
  patient_population: string;    // character varying(200)
  interventions: Record<string, any>;         // jsonb
  medications: Record<string, any>;           // jsonb
  non_pharmacological: Record<string, any>;   // jsonb
  monitoring_protocol: Record<string, any>;   // jsonb
  expected_outcomes: Record<string, any>;     // jsonb
  adjustment_criteria: Record<string, any>;   // jsonb
  escalation_criteria: Record<string, any>;   // jsonb
  consultation_triggers: Record<string, any>; // jsonb
  patient_education: Record<string, any>;     // jsonb
  caregiver_instructions: Record<string, any>; // jsonb
  quality_of_life_considerations: Record<string, any>; // jsonb
  nccn_reference: string;        // character varying(50)
  evidence_level: string;        // character varying(50)
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
  is_active: boolean;            // boolean
}

export interface DischargeCriteria {
  id: string;                    // uuid, PRIMARY KEY
  criteria_name: string;         // character varying(255)
  cancer_type: string;           // character varying(100)
  treatment_type: string;        // character varying(100)
  admission_type: string;        // character varying(100)
  clinical_stability_criteria: Record<string, any>; // jsonb
  vital_sign_requirements: Record<string, any>;     // jsonb
  laboratory_requirements: Record<string, any>;     // jsonb
  symptom_control: Record<string, any>;             // jsonb
  functional_status: Record<string, any>;           // jsonb
  social_requirements: Record<string, any>;         // jsonb
  home_care_criteria: Record<string, any>;          // jsonb
  medication_management: Record<string, any>;       // jsonb
  follow_up_arrangements: Record<string, any>;      // jsonb
  transportation_arrangements: Record<string, any>; // jsonb
  emergency_contact_info: Record<string, any>;      // jsonb
  red_flag_symptoms: Record<string, any>;           // jsonb
  patient_education_completed: boolean; // boolean
  caregiver_education_completed: boolean; // boolean
  nccn_reference: string;        // character varying(50)
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
  is_active: boolean;            // boolean
}

export interface PalliativeSymptomProtocols {
  id: string;                    // uuid, PRIMARY KEY
  slug: string;                  // text, UNIQUE
  title: string;                 // text
  category: string;              // text (CHECK: 'Pain', 'Resp', 'Neuro', 'GI', 'Psych')
  overview: string;              // text
  evidence: string;              // text (CHECK: 'A', 'B', 'C')
  updated: string;               // date
  tags: string[];                // text[]
  red_flags: string[];           // text[]
  citations: Record<string, any>; // jsonb
  steps: Record<string, any>;     // jsonb
  created_at: string;            // timestamp with time zone
  updated_at: string;            // timestamp with time zone
}

export interface PalliativeEmergencyGuidelines {
  id: string;                    // uuid, PRIMARY KEY
  slug: string;                  // text, UNIQUE
  title: string;                 // text
  overview: string;              // text
  evidence: string;              // text (CHECK: 'A', 'B', 'C')
  updated: string;               // date
  urgency: string;               // text (CHECK: 'red', 'amber')
  tags: string[];                // text[]
  immediate: string[];           // text[]
  steps: Record<string, any>;    // jsonb
  post: Record<string, any>;     // jsonb
  created_at: string;            // timestamp with time zone
  updated_at: string;            // timestamp with time zone
}

export interface PalliativeCalculators {
  id: string;                    // uuid, PRIMARY KEY
  slug: string;                  // text, UNIQUE
  title: string;                 // text
  kind: string;                  // text (CHECK: 'pps', 'ecog', 'opioid-rotation', 'custom')
  config: Record<string, any>;   // jsonb
  created_at: string;            // timestamp with time zone
}

export interface TreatmentPlanCriteria {
  id: number;                    // bigint, PRIMARY KEY
  category: string;              // text
  value: string;                 // text
  description: string;           // text
  is_common: boolean;            // boolean
  sort_order: number;            // bigint
  is_active: boolean;            // boolean
  created_at: Record<string, any>; // jsonb
  cancer_specific: string;       // text
  clinical_context: string;      // text
  cutoff_value: string;          // text
  parent_category: string;       // text
  evidence_level: string;        // text
}

export interface TreatmentPlanMappings {
  id: number;                    // bigint, PRIMARY KEY
  cancer_type: string;           // text
  histology: string;             // text
  biomarkers: Record<string, any>; // jsonb
  treatment_intent: string;      // text
  line_of_treatment: string;     // text
  treatment_protocol: string;    // text
  evidence_reference: string;    // text
  nccn_reference: string;        // text
  conflicting_biomarkers: Record<string, any>; // jsonb
  required_stage: Record<string, any>;         // jsonb
  confidence_score: number;      // double precision
  is_active: boolean;            // boolean
  created_at: Record<string, any>; // jsonb
  updated_at: Record<string, any>; // jsonb
  requires_combination_match: boolean; // boolean
  toxicity_level: string;        // text
  priority_tag: string;          // text
  performance_status_min: string; // text
  performance_status_max: number; // bigint
}

export interface TreatmentProtocols {
  id: string;                    // uuid, PRIMARY KEY
  protocol_code: string;         // character varying(100), UNIQUE
  tumour_group: string;          // character varying(100)
  protocol_name: string;         // character varying(255)
  indications: Record<string, any>; // jsonb
  contraindications: Record<string, any>; // jsonb
  dosing_schedule: Record<string, any>;   // jsonb
  toxicity_profile: Record<string, any>;  // jsonb
  monitoring_requirements: Record<string, any>; // jsonb
  created_at: string;            // timestamp without time zone
  updated_at: string;            // timestamp without time zone
}

export interface AuditLog {
  id: string;                    // uuid, PRIMARY KEY
  user_id: string;               // character varying, FK to users(id)
  user_role: string;             // character varying(100)
  action: string;                // character varying(255)
  resource: string;              // character varying(255)
  resource_id: string;           // character varying(255)
  old_values: Record<string, any>; // jsonb
  new_values: Record<string, any>; // jsonb
  ip_address: string;            // text
  user_agent: string;            // text
  timestamp: string;             // timestamp without time zone
  sensitive_data: boolean;       // boolean
}

// Additional interfaces for other tables can be added as needed...

// Union type for all table names that actually exist
export type TableName = 
  | 'users'
  | 'ai_interactions'
  | 'cd_protocols'
  | 'nccn_guidelines'
  | 'oncology_medications'
  | 'admission_criteria'
  | 'emergency_protocols'
  | 'emergency_scenarios'
  | 'monitoring_parameters'
  | 'supportive_care_protocols'
  | 'discharge_criteria'
  | 'palliative_symptom_protocols'
  | 'palliative_emergency_guidelines'
  | 'palliative_calculators'
  | 'treatment_plan_criteria'
  | 'treatment_plan_mappings'
  | 'treatment_protocols'
  | 'audit_log'
  | 'adverse_events'
  | 'adverse_event_management'
  | 'antibiotic_protocols'
  | 'antiemetic_protocols'
  | 'biomarker_guidelines'
  | 'challenges'
  | 'clinical_decision_rules'
  | 'clinical_decision_support'
  | 'clinical_protocols'
  | 'daily_assessment_protocols'
  | 'decision_support_inputs'
  | 'drug_toxicity_profiles'
  | 'esmo_guidelines'
  | 'follow_up_protocols'
  | 'pain_management_protocols'
  | 'performance_status_scales'
  | 'profiles'
  | 'sessions'
  | 'symptom_management';
