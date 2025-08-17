// Database schema definition for OncoVista API
// Updated to match authoritative Supabase schema on August 17, 2025
// This file now correctly references only tables that exist in the schema

import { TableName } from './schema-types';

// Valid table interfaces that match the actual schema
export interface TableSchemaMap {
  users: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    role: string;
    department: string;
    license_number: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };

  ai_interactions: {
    id: string;
    user_id: string;
    session_id: string;
    module_type: string;  // Fixed: was service_type
    intent: string;
    input_context: any;   // Fixed: was input_data
    ai_response: any;     // Fixed: was output_data
    confidence_score: number;
    user_feedback: string;
    response_time_ms: number;
    model_version: string;
    created_at: string;
  };

  cd_protocols: {
    id: string;
    code: string;
    tumour_group: string;
    tumour_supergroup: string;
    treatment_intent: string;
    summary: string;
    eligibility: any;
    precautions: any;
    treatment: any;
    tests: any;
    dose_modifications: any;
    reference_list: any;
    cycle_info: any;
    pre_medications: any;
    post_medications: any;
    supportive_care: any;
    rescue_agents: any;
    monitoring: any;
    toxicity_monitoring: any;
    interactions: any;
    contraindications: any;
    version: string;
    status: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    last_reviewed: string;
  };

  nccn_guidelines: {
    id: string;
    reference_code: string;
    title: string;
    category: string;
    cancer_type: string;
    version: string;
    release_date: string;
    content: any;
    evidence_level: string;
    consensus_level: string;
    applicable_stages: any;
    biomarker_requirements: any;
    treatment_settings: any;
    special_populations: any;
    cross_references: any;
    evidence_references: any;
    updates_from_previous: string;
    clinical_decision_points: any;
    monitoring_requirements: any;
    contraindications: any;
    alternative_approaches: any;
    quality_measures: any;
    created_at: string;
    updated_at: string;
  };

  oncology_medications: {
    id: string;
    name: string;
    brand_names: any;
    classification: string;
    mechanism: string;
    administration: string;
    indications: any;
    dosing: any;
    side_effects: any;
    monitoring: any;
    interactions: any;
    reference_sources: any;
    summary: string;
    black_box_warning: string;
    special_considerations: any;
    pharmacokinetics: any;
    contraindications: any;
    routine_monitoring: any;
    pre_treatment_tests: any;
    is_chemotherapy: boolean;
    is_immunotherapy: boolean;
    is_targeted_therapy: boolean;
    is_orphan_drug: boolean;
    created_at: string;
    updated_at: string;
  };

  admission_criteria: {
    id: string;
    criteria_name: string;
    cancer_type: string;
    admission_type: string;
    clinical_indications: any;
    exclusion_criteria: any;
    risk_factors: any;
    required_assessments: any;
    nccn_reference: string;
    evidence_level: string;
    priority: string;
    estimated_los: number;
    special_requirements: any;
    contraindications: any;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };

  emergency_protocols: {
    id: string;
    scenario_id: string;
    protocol_name: string;
    step_number: number;
    action: string;
    time_frame: string;
    required_personnel: any;
    medications: any;
    monitoring: any;
    expected_outcome: string;
    next_step_trigger: string;
    alternative_actions: any;
    created_at: string;
    updated_at: string;
  };

  emergency_scenarios: {
    id: string;
    scenario_name: string;
    severity: string;
    cancer_type: string;
    treatment_related: boolean;
    clinical_presentation: any;
    diagnostic_criteria: any;
    risk_factors: any;
    immediate_actions: any;
    time_to_intervention: string;
    required_resources: any;
    consultation_required: any;
    nccn_reference: string;
    evidence_level: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };

  monitoring_parameters: {
    id: string;
    parameter_name: string;
    category: string;
    cancer_type: string;
    treatment_phase: string;
    frequency: string;
    normal_range: any;
    alert_thresholds: any;
    critical_values: any;
    action_required: any;
    documentation_required: boolean;
    nursing_protocol: any;
    physician_notification: any;
    equipment_required: any;
    special_instructions: string;
    nccn_reference: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };

  supportive_care_protocols: {
    id: string;
    protocol_name: string;
    category: string;
    indication: string;
    cancer_type: string;
    treatment_phase: string;
    patient_population: string;
    interventions: any;
    medications: any;
    non_pharmacological: any;
    monitoring_protocol: any;
    expected_outcomes: any;
    adjustment_criteria: any;
    escalation_criteria: any;
    consultation_triggers: any;
    patient_education: any;
    caregiver_instructions: any;
    quality_of_life_considerations: any;
    nccn_reference: string;
    evidence_level: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };

  discharge_criteria: {
    id: string;
    criteria_name: string;
    cancer_type: string;
    treatment_type: string;
    admission_type: string;
    clinical_stability_criteria: any;
    vital_sign_requirements: any;
    laboratory_requirements: any;
    symptom_control: any;
    functional_status: any;
    social_requirements: any;
    home_care_criteria: any;
    medication_management: any;
    follow_up_arrangements: any;
    transportation_arrangements: any;
    emergency_contact_info: any;
    red_flag_symptoms: any;
    patient_education_completed: boolean;
    caregiver_education_completed: boolean;
    nccn_reference: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };

  palliative_symptom_protocols: {
    id: string;
    slug: string;
    title: string;
    category: string;
    overview: string;
    evidence: string;
    updated: string;
    tags: string[];
    red_flags: string[];
    citations: any;
    steps: any;
    created_at: string;
    updated_at: string;
  };

  palliative_emergency_guidelines: {
    id: string;
    slug: string;
    title: string;
    overview: string;
    evidence: string;
    updated: string;
    urgency: string;
    tags: string[];
    immediate: string[];
    steps: any;
    post: any;
    created_at: string;
    updated_at: string;
  };

  palliative_calculators: {
    id: string;
    slug: string;
    title: string;
    kind: string;
    config: any;
    created_at: string;
  };

  treatment_plan_criteria: {
    id: number;
    category: string;
    value: string;
    description: string;
    is_common: boolean;
    sort_order: number;
    is_active: boolean;
    created_at: any;
    cancer_specific: string;
    clinical_context: string;
    cutoff_value: string;
    parent_category: string;
    evidence_level: string;
  };

  treatment_plan_mappings: {
    id: number;
    cancer_type: string;
    histology: string;
    biomarkers: any;
    treatment_intent: string;
    line_of_treatment: string;
    treatment_protocol: string;
    evidence_reference: string;
    nccn_reference: string;
    conflicting_biomarkers: any;
    required_stage: any;
    confidence_score: number;
    is_active: boolean;
    created_at: any;
    updated_at: any;
    requires_combination_match: boolean;
    toxicity_level: string;
    priority_tag: string;
    performance_status_min: string;
    performance_status_max: number;
  };

  treatment_protocols: {
    id: string;
    protocol_code: string;
    tumour_group: string;
    protocol_name: string;
    indications: any;
    contraindications: any;
    dosing_schedule: any;
    toxicity_profile: any;
    monitoring_requirements: any;
    created_at: string;
    updated_at: string;
  };

  audit_log: {
    id: string;
    user_id: string;
    user_role: string;
    action: string;
    resource: string;
    resource_id: string;
    old_values: any;
    new_values: any;
    ip_address: string;
    user_agent: string;
    timestamp: string;
    sensitive_data: boolean;
  };
}

// Helper type to get table schema
export type GetTableSchema<T extends TableName> = T extends keyof TableSchemaMap 
  ? TableSchemaMap[T] 
  : never;

// Sample data insertion functions for tables that actually exist
export const insertSampleData = `
  -- Insert sample CD protocols
  INSERT INTO cd_protocols (code, tumour_group, treatment_intent, summary, eligibility, precautions, treatment, version, status) VALUES
  ('LUNG-ADJ-001', 'Lung', 'Adjuvant', 'Standard adjuvant chemotherapy for NSCLC', 
   '{"stage": ["IB", "II", "IIIA"], "ps": "0-1"}',
   '{"monitoring": ["CBC", "LFTs"], "contraindications": ["severe_neuropathy"]}',
   '{"regimen": "carboplatin_paclitaxel", "cycles": 4}',
   '2024.1', 'active'),
  
  ('BREAST-NEO-001', 'Breast', 'Neoadjuvant', 'Neoadjuvant chemotherapy for breast cancer',
   '{"stage": ["T2", "T3", "T4"], "receptor_status": "any"}',
   '{"cardiac_monitoring": "required", "fertility_counseling": "recommended"}',
   '{"regimen": "AC_T", "cycles": 8}',
   '2024.1', 'active');

  -- Insert sample admission criteria
  INSERT INTO admission_criteria (criteria_name, cancer_type, admission_type, clinical_indications, is_active) VALUES
  ('Neutropenic Fever', 'Any', 'Emergency', '{"anc": "<500", "temp": ">=38.3", "recent_chemo": true}', true),
  ('Tumor Lysis Syndrome', 'Hematologic', 'Emergency', '{"high_risk_tumor": true, "elevated_ldh": true}', true);

  -- Insert sample medications  
  INSERT INTO oncology_medications (name, classification, mechanism, administration, indications, is_chemotherapy) VALUES
  ('Cisplatin', 'Platinum compound', 'DNA crosslinking agent', 'Intravenous', '["lung", "ovarian", "bladder"]', true),
  ('Pembrolizumab', 'Monoclonal antibody', 'PD-1 inhibitor', 'Intravenous', '["melanoma", "lung", "kidney"]', false);
`;

// Function to setup tables with proper constraints and indexes
export const setupDatabase = `
  -- Enable Row Level Security where needed
  ALTER TABLE cd_protocols ENABLE ROW LEVEL SECURITY;
  ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

  -- Create policies for secure access
  CREATE POLICY "Allow read access to active protocols" ON cd_protocols
    FOR SELECT USING (status = 'active');

  CREATE POLICY "Users can access their own AI interactions" ON ai_interactions
    FOR ALL USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

  CREATE POLICY "Users can access their own audit logs" ON audit_log
    FOR SELECT USING (user_id = current_setting('request.jwt.claims')::json->>'sub');

  ${insertSampleData}
`;

// Export table name validation
export function isValidTableName(name: string): name is TableName {
  const validTables: TableName[] = [
    'users', 'ai_interactions', 'cd_protocols', 'nccn_guidelines', 
    'oncology_medications', 'admission_criteria', 'emergency_protocols',
    'emergency_scenarios', 'monitoring_parameters', 'supportive_care_protocols',
    'discharge_criteria', 'palliative_symptom_protocols', 'palliative_emergency_guidelines',
    'palliative_calculators', 'treatment_plan_criteria', 'treatment_plan_mappings',
    'treatment_protocols', 'audit_log', 'adverse_events', 'adverse_event_management',
    'antibiotic_protocols', 'antiemetic_protocols', 'biomarker_guidelines',
    'challenges', 'clinical_decision_rules', 'clinical_decision_support',
    'clinical_protocols', 'daily_assessment_protocols', 'decision_support_inputs',
    'drug_toxicity_profiles', 'esmo_guidelines', 'follow_up_protocols',
    'pain_management_protocols', 'performance_status_scales', 'profiles',
    'sessions', 'symptom_management'
  ];
  
  return validTables.includes(name as TableName);
}
