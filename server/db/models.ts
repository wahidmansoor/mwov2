import { z } from 'zod';

// Helper schema for handling unknown JSON fields
const UnknownJson = z.unknown();

// Users Schema (matches authoritative schema)
export const UserSchema = z.object({
  id: z.string(),                    // character varying, PRIMARY KEY
  email: z.string().nullable(),      // character varying, UNIQUE
  first_name: z.string().nullable(), // character varying
  last_name: z.string().nullable(),  // character varying
  profile_image_url: z.string().nullable(), // character varying
  role: z.string().nullable(),       // text
  department: z.string().nullable(), // text
  license_number: z.string().nullable(), // text
  is_active: z.boolean().nullable(), // boolean
  created_at: z.string().nullable(), // timestamp without time zone
  updated_at: z.string().nullable()  // timestamp without time zone
});

// AI Interactions Schema (fixed column names to match schema)
export const AiInteractionSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  session_id: z.string().nullable(),
  module_type: z.string().nullable(),   // Fixed: was service_type
  intent: z.string().nullable(),
  input_context: UnknownJson.nullable(), // Fixed: was input_data
  ai_response: UnknownJson.nullable(),   // Fixed: was output_data
  confidence_score: z.number().nullable(),
  user_feedback: z.string().nullable(),
  response_time_ms: z.number().nullable(),
  model_version: z.string().nullable(),
  created_at: z.string().nullable()
});

// NCCN Guidelines Schema
export const NccnGuidelineSchema = z.object({
  id: z.string(),
  reference_code: z.string().nullable(),
  title: z.string(),
  category: z.string().nullable(),
  cancer_type: z.string().nullable(),
  version: z.string().nullable(),
  release_date: z.string().nullable(),
  content: UnknownJson.nullable(),
  evidence_level: z.string().nullable(),
  consensus_level: z.string().nullable(),
  applicable_stages: UnknownJson.nullable(),
  biomarker_requirements: UnknownJson.nullable(),
  treatment_settings: UnknownJson.nullable(),
  special_populations: UnknownJson.nullable(),
  cross_references: UnknownJson.nullable(),
  evidence_references: UnknownJson.nullable(),
  updates_from_previous: z.string().nullable(),  // Fixed: text not UnknownJson
  clinical_decision_points: UnknownJson.nullable(),
  monitoring_requirements: UnknownJson.nullable(),
  contraindications: UnknownJson.nullable(),
  alternative_approaches: UnknownJson.nullable(),
  quality_measures: UnknownJson.nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable()
});

// Clinical Protocols Schema
export const ClinicalProtocolSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string().nullable(),
  protocol_type: z.string().nullable(),
  cancer_type: z.string().nullable(),
  stage: z.string().nullable(),
  content: UnknownJson.nullable(),
  evidence_level: z.string().nullable(),
  guideline_source: z.string().nullable(),
  created_by: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  status: z.string().nullable(),
  approval_status: z.string().nullable(),
  approved_by: z.string().nullable(),
  approved_at: z.string().nullable()
});

// Treatment Protocols Schema
export const TreatmentProtocolSchema = z.object({
  id: z.string(),
  protocol_code: z.string().nullable(),
  tumour_group: z.string().nullable(),
  protocol_name: z.string().nullable(),
  indications: UnknownJson.nullable(),
  contraindications: UnknownJson.nullable(),
  dosing_schedule: UnknownJson.nullable(),
  toxicity_profile: UnknownJson.nullable(),
  monitoring_requirements: UnknownJson.nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// CD Protocols Schema (matches authoritative schema exactly)
export const CdProtocolSchema = z.object({
  id: z.string(),
  code: z.string().nullable(),              // character varying(50), UNIQUE
  tumour_group: z.string().nullable(),      // character varying(100)
  tumour_supergroup: z.string().nullable(), // character varying(100)
  treatment_intent: z.string().nullable(),  // character varying(50)
  summary: z.string().nullable(),           // text (not string)
  eligibility: UnknownJson.nullable(),      // jsonb
  precautions: UnknownJson.nullable(),      // jsonb
  treatment: UnknownJson.nullable(),        // jsonb
  tests: UnknownJson.nullable(),            // jsonb
  dose_modifications: UnknownJson.nullable(), // jsonb
  reference_list: UnknownJson.nullable(),   // jsonb
  cycle_info: UnknownJson.nullable(),       // jsonb
  pre_medications: UnknownJson.nullable(),  // jsonb
  post_medications: UnknownJson.nullable(), // jsonb
  supportive_care: UnknownJson.nullable(),  // jsonb
  rescue_agents: UnknownJson.nullable(),    // jsonb
  monitoring: UnknownJson.nullable(),       // jsonb
  toxicity_monitoring: UnknownJson.nullable(), // jsonb
  interactions: UnknownJson.nullable(),     // jsonb
  contraindications: UnknownJson.nullable(), // jsonb
  version: z.string().nullable(),           // character varying(20)
  status: z.string().nullable(),            // character varying(20)
  created_by: z.string().nullable(),        // character varying, FK to users(id)
  updated_by: z.string().nullable(),        // character varying, FK to users(id)
  created_at: z.string().nullable(),        // timestamp without time zone
  updated_at: z.string().nullable(),        // timestamp without time zone
  last_reviewed: z.string().nullable()      // timestamp without time zone
});

// Oncology Medications Schema
export const OncologyMedicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand_names: UnknownJson.nullable(),
  classification: z.string().nullable(),
  mechanism: z.string().nullable(),
  administration: UnknownJson.nullable(),
  indications: UnknownJson.nullable(),
  dosing: UnknownJson.nullable(),
  side_effects: UnknownJson.nullable(),
  monitoring: UnknownJson.nullable(),
  interactions: UnknownJson.nullable(),
  reference_sources: UnknownJson.nullable(),
  summary: z.string().nullable(),
  black_box_warning: z.string().nullable(),
  special_considerations: UnknownJson.nullable(),
  pharmacokinetics: UnknownJson.nullable(),
  contraindications: UnknownJson.nullable(),
  routine_monitoring: UnknownJson.nullable(),
  pre_treatment_tests: UnknownJson.nullable(),
  is_chemotherapy: z.boolean().nullable(),
  is_immunotherapy: z.boolean().nullable(),
  is_targeted_therapy: z.boolean().nullable(),
  is_orphan_drug: z.boolean().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Adverse Events Schema
export const AdverseEventSchema = z.object({
  id: z.string(),
  event_name: z.string(),
  category: z.string().nullable(),
  ctcae_code: z.string().nullable(),
  ctcae_version: z.string().nullable(),
  grade: z.number().nullable(),
  description: z.string().nullable(),
  clinical_presentation: UnknownJson.nullable(),
  risk_factors: UnknownJson.nullable(),
  associated_treatments: UnknownJson.nullable(),
  time_to_onset: z.string().nullable(),
  duration: z.string().nullable(),
  reversibility: z.string().nullable(),
  frequency: z.string().nullable(),
  prevention_strategies: UnknownJson.nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Adverse Event Management Schema
export const AdverseEventManagementSchema = z.object({
  id: z.string(),
  adverse_event_id: z.string(),
  grade: z.number().nullable(),
  immediate_actions: UnknownJson.nullable(),
  treatment_modifications: UnknownJson.nullable(),
  supportive_care: UnknownJson.nullable(),
  medications: UnknownJson.nullable(),
  monitoring_requirements: UnknownJson.nullable(),
  consultation_required: z.boolean().nullable(),
  patient_education: UnknownJson.nullable(),
  follow_up_protocol: UnknownJson.nullable(),
  rechallenge_criteria: UnknownJson.nullable(),
  reporting_requirements: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Emergency Scenarios Schema
export const EmergencyScenarioSchema = z.object({
  id: z.string(),
  scenario_name: z.string(),
  severity: z.string().nullable(),
  cancer_type: z.string().nullable(),
  treatment_related: z.boolean().nullable(),
  clinical_presentation: UnknownJson.nullable(),
  diagnostic_criteria: UnknownJson.nullable(),
  risk_factors: UnknownJson.nullable(),
  immediate_actions: UnknownJson.nullable(),
  time_to_intervention: z.string().nullable(),
  required_resources: UnknownJson.nullable(),
  consultation_required: z.boolean().nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Emergency Protocols Schema
export const EmergencyProtocolSchema = z.object({
  id: z.string(),
  scenario_id: z.string(),
  protocol_name: z.string(),
  step_number: z.number().nullable(),
  action: z.string().nullable(),
  time_frame: z.string().nullable(),
  required_personnel: UnknownJson.nullable(),
  medications: UnknownJson.nullable(),
  monitoring: UnknownJson.nullable(),
  expected_outcome: z.string().nullable(),
  next_step_trigger: z.string().nullable(),
  alternative_actions: UnknownJson.nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Symptom Management Schema
export const SymptomManagementSchema = z.object({
  id: z.string(),
  symptom: z.string(),
  assessment_tools: UnknownJson.nullable(),
  interventions: UnknownJson.nullable(),
  medications: UnknownJson.nullable(),
  monitoring_parameters: UnknownJson.nullable(),
  updated_at: z.string().nullable()
});

// Pain Management Protocols Schema
export const PainManagementProtocolSchema = z.object({
  id: z.string(),
  protocol_name: z.string(),
  pain_type: z.string().nullable(),
  pain_severity: z.string().nullable(),
  cancer_type: z.string().nullable(),
  pain_location: z.string().nullable(),
  pain_mechanism: z.string().nullable(),
  assessment_tools: UnknownJson.nullable(),
  pharmacological_approach: UnknownJson.nullable(),
  non_pharmacological_approach: UnknownJson.nullable(),
  interventional_options: UnknownJson.nullable(),
  opioid_guidelines: UnknownJson.nullable(),
  adjuvant_therapies: UnknownJson.nullable(),
  side_effect_management: UnknownJson.nullable(),
  monitoring_protocol: UnknownJson.nullable(),
  escalation_criteria: UnknownJson.nullable(),
  special_considerations: UnknownJson.nullable(),
  patient_education: UnknownJson.nullable(),
  caregiver_education: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Monitoring Parameters Schema
export const MonitoringParameterSchema = z.object({
  id: z.string(),
  parameter_name: z.string(),
  category: z.string().nullable(),
  cancer_type: z.string().nullable(),
  treatment_phase: z.string().nullable(),
  frequency: z.string().nullable(),
  normal_range: z.string().nullable(),
  alert_thresholds: UnknownJson.nullable(),
  critical_values: UnknownJson.nullable(),
  action_required: UnknownJson.nullable(),
  documentation_required: z.boolean().nullable(),
  nursing_protocol: UnknownJson.nullable(),
  physician_notification: UnknownJson.nullable(),
  equipment_required: UnknownJson.nullable(),
  special_instructions: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Performance Status Scales Schema
export const PerformanceStatusScaleSchema = z.object({
  id: z.string(),
  scale_name: z.string(),
  scale_type: z.string().nullable(),
  score_value: z.number().nullable(),
  description: z.string().nullable(),
  functional_capacity: z.string().nullable(),
  activity_level: z.string().nullable(),
  care_requirements: z.string().nullable(),
  prognostic_implication: z.string().nullable(),
  treatment_implications: UnknownJson.nullable(),
  monitoring_frequency: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Biomarker Guidelines Schema
export const BiomarkerGuidelineSchema = z.object({
  id: z.string(),
  biomarker_name: z.string(),
  testing_method: z.string().nullable(),
  cancer_type: z.string().nullable(),
  clinical_indications: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  testing_timing: z.string().nullable(),
  interpretation_criteria: UnknownJson.nullable(),
  therapeutic_implications: UnknownJson.nullable(),
  quality_requirements: UnknownJson.nullable(),
  reporting_standards: UnknownJson.nullable(),
  cost_considerations: UnknownJson.nullable(),
  special_considerations: UnknownJson.nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable()
});

// Follow-up Protocols Schema
export const FollowUpProtocolSchema = z.object({
  id: z.string(),
  protocol_name: z.string(),
  cancer_type: z.string().nullable(),
  treatment_phase: z.string().nullable(),
  time_frame: z.string().nullable(),
  contact_method: z.string().nullable(),
  assessment_components: UnknownJson.nullable(),
  vital_signs_required: z.boolean().nullable(),
  laboratory_tests: UnknownJson.nullable(),
  imaging_requirements: UnknownJson.nullable(),
  symptom_assessment: UnknownJson.nullable(),
  medication_review: z.boolean().nullable(),
  adherence_assessment: UnknownJson.nullable(),
  toxicity_assessment: UnknownJson.nullable(),
  functional_assessment: UnknownJson.nullable(),
  psychosocial_assessment: UnknownJson.nullable(),
  caregiver_assessment: UnknownJson.nullable(),
  action_plans: UnknownJson.nullable(),
  escalation_criteria: UnknownJson.nullable(),
  documentation_requirements: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Admission Criteria Schema
export const AdmissionCriteriaSchema = z.object({
  id: z.string(),
  criteria_name: z.string(),
  cancer_type: z.string().nullable(),
  admission_type: z.string().nullable(),
  clinical_indications: UnknownJson.nullable(),
  exclusion_criteria: UnknownJson.nullable(),
  risk_factors: UnknownJson.nullable(),
  required_assessments: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  priority: z.string().nullable(),
  estimated_los: z.string().nullable(),
  special_requirements: UnknownJson.nullable(),
  contraindications: UnknownJson.nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Discharge Criteria Schema
export const DischargeCriteriaSchema = z.object({
  id: z.string(),
  criteria_name: z.string(),
  cancer_type: z.string().nullable(),
  treatment_type: z.string().nullable(),
  admission_type: z.string().nullable(),
  clinical_stability_criteria: UnknownJson.nullable(),
  vital_sign_requirements: UnknownJson.nullable(),
  laboratory_requirements: UnknownJson.nullable(),
  symptom_control: UnknownJson.nullable(),
  functional_status: z.string().nullable(),
  social_requirements: UnknownJson.nullable(),
  home_care_criteria: UnknownJson.nullable(),
  medication_management: UnknownJson.nullable(),
  follow_up_arrangements: UnknownJson.nullable(),
  transportation_arrangements: UnknownJson.nullable(),
  emergency_contact_info: UnknownJson.nullable(),
  red_flag_symptoms: UnknownJson.nullable(),
  patient_education_completed: z.boolean().nullable(),
  caregiver_education_completed: z.boolean().nullable(),
  nccn_reference: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Treatment Plan Criteria Schema
export const TreatmentPlanCriteriaSchema = z.object({
  id: z.string(),
  category: z.string().nullable(),
  value: z.string().nullable(),
  description: z.string().nullable(),
  is_common: z.boolean().nullable(),
  sort_order: z.number().nullable(),
  is_active: z.boolean().nullable(),
  created_at: z.string(),
  cancer_specific: z.string().nullable(),
  clinical_context: z.string().nullable(),
  cutoff_value: z.string().nullable(),
  parent_category: z.string().nullable(),
  evidence_level: z.string().nullable()
});

// Treatment Plan Mappings Schema
export const TreatmentPlanMappingSchema = z.object({
  id: z.string(),
  cancer_type: z.string().nullable(),
  histology: z.string().nullable(),
  biomarkers: UnknownJson.nullable(),
  treatment_intent: z.string().nullable(),
  line_of_treatment: z.string().nullable(),
  treatment_protocol: z.string().nullable(),
  evidence_reference: z.string().nullable(),
  nccn_reference: z.string().nullable(),
  conflicting_biomarkers: UnknownJson.nullable(),
  required_stage: z.string().nullable(),
  confidence_score: z.number().nullable(),
  is_active: z.boolean().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  requires_combination_match: z.boolean().nullable(),
  toxicity_level: z.string().nullable(),
  priority_tag: z.string().nullable(),
  performance_status_min: z.number().nullable(),
  performance_status_max: z.number().nullable()
});

// Supportive Care Protocols Schema
export const SupportiveCareProtocolSchema = z.object({
  id: z.string(),
  protocol_name: z.string(),
  category: z.string(),
  indication: z.string(),
  cancer_type: z.string().nullable(),
  treatment_phase: z.string().nullable(),
  patient_population: z.string().nullable(),
  interventions: UnknownJson.nullable(),
  medications: UnknownJson.nullable(),
  non_pharmacological: UnknownJson.nullable(),
  monitoring_protocol: UnknownJson.nullable(),
  expected_outcomes: UnknownJson.nullable(),
  adjustment_criteria: UnknownJson.nullable(),
  escalation_criteria: UnknownJson.nullable(),
  consultation_triggers: UnknownJson.nullable(),
  patient_education: UnknownJson.nullable(),
  caregiver_instructions: UnknownJson.nullable(),
  quality_of_life_considerations: UnknownJson.nullable(),
  nccn_reference: z.string().nullable(),
  evidence_level: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  is_active: z.boolean().nullable()
});

// Palliative Symptom Protocols Schema
export const PalliativeSymptomProtocolSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  overview: z.string(),
  evidence: z.string(),
  updated: z.string(),
  tags: z.array(z.string()).nullable(),
  red_flags: z.array(z.string()).nullable(),
  citations: UnknownJson.nullable(),
  steps: UnknownJson.nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable()
});

// Palliative Emergency Guidelines Schema
export const PalliativeEmergencyGuidelineSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  overview: z.string(),
  evidence: z.string(),
  updated: z.string(),
  urgency: z.string(),
  tags: z.array(z.string()).nullable(),
  immediate: z.array(z.string()).nullable(),
  steps: UnknownJson.nullable(),
  post: UnknownJson.nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable()
});

// Palliative Calculators Schema
export const PalliativeCalculatorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  kind: z.string(),
  config: UnknownJson.nullable(),
  created_at: z.string().nullable()
});

// TypeScript types inferred from Zod schemas
export type User = z.infer<typeof UserSchema>;
export type AiInteraction = z.infer<typeof AiInteractionSchema>;
export type NccnGuideline = z.infer<typeof NccnGuidelineSchema>;
export type ClinicalProtocol = z.infer<typeof ClinicalProtocolSchema>;
export type TreatmentProtocol = z.infer<typeof TreatmentProtocolSchema>;
export type CdProtocol = z.infer<typeof CdProtocolSchema>;
export type OncologyMedication = z.infer<typeof OncologyMedicationSchema>;
export type AdverseEvent = z.infer<typeof AdverseEventSchema>;
export type AdverseEventManagement = z.infer<typeof AdverseEventManagementSchema>;
export type EmergencyScenario = z.infer<typeof EmergencyScenarioSchema>;
export type EmergencyProtocol = z.infer<typeof EmergencyProtocolSchema>;
export type SymptomManagement = z.infer<typeof SymptomManagementSchema>;
export type PainManagementProtocol = z.infer<typeof PainManagementProtocolSchema>;
export type MonitoringParameter = z.infer<typeof MonitoringParameterSchema>;
export type PerformanceStatusScale = z.infer<typeof PerformanceStatusScaleSchema>;
export type BiomarkerGuideline = z.infer<typeof BiomarkerGuidelineSchema>;
export type FollowUpProtocol = z.infer<typeof FollowUpProtocolSchema>;
export type AdmissionCriteria = z.infer<typeof AdmissionCriteriaSchema>;
export type DischargeCriteria = z.infer<typeof DischargeCriteriaSchema>;
export type TreatmentPlanCriteria = z.infer<typeof TreatmentPlanCriteriaSchema>;
export type TreatmentPlanMapping = z.infer<typeof TreatmentPlanMappingSchema>;
export type SupportiveCareProtocol = z.infer<typeof SupportiveCareProtocolSchema>;
export type PalliativeSymptomProtocol = z.infer<typeof PalliativeSymptomProtocolSchema>;
export type PalliativeEmergencyGuideline = z.infer<typeof PalliativeEmergencyGuidelineSchema>;
export type PalliativeCalculator = z.infer<typeof PalliativeCalculatorSchema>;
