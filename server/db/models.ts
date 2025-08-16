import { z } from 'zod';

// Helper schema for handling unknown JSON fields
const UnknownJson = z.unknown();

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
  updates_from_previous: UnknownJson.nullable(),
  clinical_decision_points: UnknownJson.nullable(),
  monitoring_requirements: UnknownJson.nullable(),
  contraindications: UnknownJson.nullable(),
  alternative_approaches: UnknownJson.nullable(),
  quality_measures: UnknownJson.nullable(),
  created_at: z.string(),
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

// CD Protocols Schema
export const CdProtocolSchema = z.object({
  id: z.string(),
  code: z.string().nullable(),
  tumour_group: z.string().nullable(),
  tumour_supergroup: z.string().nullable(),
  treatment_intent: z.string().nullable(),
  summary: z.string().nullable(),
  eligibility: UnknownJson.nullable(),
  precautions: UnknownJson.nullable(),
  treatment: UnknownJson.nullable(),
  tests: UnknownJson.nullable(),
  dose_modifications: UnknownJson.nullable(),
  reference_list: UnknownJson.nullable(),
  cycle_info: UnknownJson.nullable(),
  pre_medications: UnknownJson.nullable(),
  post_medications: UnknownJson.nullable(),
  supportive_care: UnknownJson.nullable(),
  rescue_agents: UnknownJson.nullable(),
  monitoring: UnknownJson.nullable(),
  toxicity_monitoring: UnknownJson.nullable(),
  interactions: UnknownJson.nullable(),
  contraindications: UnknownJson.nullable(),
  version: z.string().nullable(),
  status: z.string().nullable(),
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  last_reviewed: z.string().nullable()
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

// TypeScript types inferred from Zod schemas
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
