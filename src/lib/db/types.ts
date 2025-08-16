// Auto-generated strict types for Supabase tables
// DO NOT EDIT MANUALLY. Regenerate from schema if needed.

export namespace Tables {
  export type admission_criteria = {
    id: string;
    criteria_name: string;
    cancer_type: string;
    admission_type: string;
    clinical_indications: unknown;
    exclusion_criteria?: unknown | null;
    risk_factors?: unknown | null;
    required_assessments?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    priority?: string | null;
    estimated_los?: number | null;
    special_requirements?: unknown | null;
    contraindications?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type adverse_event_management = {
    id: string;
    adverse_event_id?: string | null;
    grade: number;
    immediate_actions: unknown;
    treatment_modifications?: unknown | null;
    supportive_care?: unknown | null;
    medications?: unknown | null;
    monitoring_requirements?: unknown | null;
    consultation_required?: unknown | null;
    patient_education?: unknown | null;
    follow_up_protocol?: unknown | null;
    rechallenge_criteria?: unknown | null;
    reporting_requirements?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type adverse_events = {
    id: string;
    event_name: string;
    category: string;
    ctcae_code?: string | null;
    ctcae_version?: string | null;
    grade: number;
    description: string;
    clinical_presentation?: unknown | null;
    risk_factors?: unknown | null;
    associated_treatments?: unknown | null;
    time_to_onset?: string | null;
    duration?: string | null;
    reversibility?: string | null;
    frequency?: string | null;
    prevention_strategies?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type ai_interactions = {
    id: string;
    user_id?: string | null;
    session_id?: string | null;
    module_type?: string | null;
    intent?: string | null;
    input_context?: unknown | null;
    ai_response?: unknown | null;
    confidence_score?: string | null;
    user_feedback?: string | null;
    response_time_ms?: number | null;
    model_version?: string | null;
    created_at?: string | null;
  };

  export type antibiotic_protocols = {
    id: string;
    protocol_name: string;
    indication: string;
    patient_population?: string | null;
    neutropenia_grade?: string | null;
    empiric_therapy: unknown;
    targeted_therapy?: unknown | null;
    duration?: string | null;
    monitoring_parameters?: unknown | null;
    adjustment_criteria?: unknown | null;
    discontinuation_criteria?: unknown | null;
    side_effects?: unknown | null;
    drug_interactions?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type antiemetic_protocols = {
    id: string;
    protocol_name: string;
    emetogenic_risk: string;
    treatment_regimen?: string | null;
    day_of_cycle?: number | null;
    premedications?: unknown | null;
    acute_phase?: unknown | null;
    delayed_phase?: unknown | null;
    anticipatory_phase?: unknown | null;
    breakthrough_medications?: unknown | null;
    contraindications?: unknown | null;
    drug_interactions?: unknown | null;
    side_effects?: unknown | null;
    monitoring_parameters?: unknown | null;
    patient_instructions?: unknown | null;
    efficacy_markers?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type audit_log = {
    id: string;
    user_id?: string | null;
    user_role?: string | null;
    action?: string | null;
    resource?: string | null;
    resource_id?: string | null;
    old_values?: unknown | null;
    new_values?: unknown | null;
    ip_address?: string | null;
    user_agent?: string | null;
    timestamp?: string | null;
    sensitive_data?: boolean | null;
  };

  export type biomarker_guidelines = {
    id: string;
    biomarker_name: string;
    testing_method: string;
    cancer_type: string;
    clinical_indications: unknown;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    testing_timing?: string | null;
    interpretation_criteria?: unknown | null;
    therapeutic_implications?: unknown | null;
    quality_requirements?: unknown | null;
    reporting_standards?: unknown | null;
    cost_considerations?: string | null;
    special_considerations?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type cd_protocols = {
    id: string;
    code: string;
    tumour_group: string;
    tumour_supergroup?: string | null;
    treatment_intent: string;
    summary: string;
    eligibility: unknown;
    precautions: unknown;
    treatment: unknown;
    tests?: unknown | null;
    dose_modifications?: unknown | null;
    reference_list?: unknown | null;
    cycle_info?: unknown | null;
    pre_medications?: unknown | null;
    post_medications?: unknown | null;
    supportive_care?: unknown | null;
    rescue_agents?: unknown | null;
    monitoring?: unknown | null;
    toxicity_monitoring?: unknown | null;
    interactions?: unknown | null;
    contraindications?: unknown | null;
    version: string;
    status?: string | null;
    created_by?: string | null;
    updated_by?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    last_reviewed?: string | null;
  };

  export type challenges = {
    id: number;
    profileid?: string | null;
    challengenumber?: number | null;
    startedat?: string | null;
    completedat?: string | null;
    totaltasks?: number | null;
    completedtasks?: number | null;
  };

  export type clinical_decision_rules = {
    id: string;
    rule_name: string;
    module_type: string;
    conditions: unknown;
    recommendations: unknown;
    confidence_threshold?: string | null;
    evidence_references?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type clinical_decision_support = {
    id: string;
    module_type: string;
    clinical_scenario: string;
    input_parameters: unknown;
    nccn_references: unknown;
    recommended_actions: unknown;
    alternative_options?: unknown | null;
    risk_stratification?: string | null;
    evidence_strength?: string | null;
    consensus_level?: string | null;
    applicability_score?: string | null;
    last_reviewed?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type clinical_protocols = {
    id: string;
    name: string;
    version: string;
    protocol_type: string;
    cancer_type?: string | null;
    stage?: string | null;
    content: unknown;
    evidence_level?: string | null;
    guideline_source?: string | null;
    created_by?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    status?: string | null;
    approval_status?: string | null;
    approved_by?: string | null;
    approved_at?: string | null;
  };

  export type daily_assessment_protocols = {
    id: string;
    protocol_name: string;
    cancer_type?: string | null;
    treatment_phase?: string | null;
    day_of_treatment?: number | null;
    assessment_components: unknown;
    required_vitals?: unknown | null;
    lab_requirements?: unknown | null;
    symptom_assessment?: unknown | null;
    performance_status_check?: boolean | null;
    nursing_assessment?: unknown | null;
    physician_rounding?: unknown | null;
    patient_education?: unknown | null;
    family_updates?: unknown | null;
    discharge_preparation?: unknown | null;
    nccn_reference?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type decision_support_inputs = {
    id: string;
    session_id?: string | null;
    age_group?: string | null;
    symptoms?: unknown | null;
    risk_factors?: unknown | null;
    clinical_findings?: unknown | null;
    ai_analysis?: unknown | null;
    module_type?: string | null;
    created_by?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type discharge_criteria = {
    id: string;
    criteria_name: string;
    cancer_type?: string | null;
    treatment_type?: string | null;
    admission_type?: string | null;
    clinical_stability_criteria: unknown;
    vital_sign_requirements?: unknown | null;
    laboratory_requirements?: unknown | null;
    symptom_control?: unknown | null;
    functional_status?: unknown | null;
    social_requirements?: unknown | null;
    home_care_criteria?: unknown | null;
    medication_management?: unknown | null;
    follow_up_arrangements?: unknown | null;
    transportation_arrangements?: unknown | null;
    emergency_contact_info?: unknown | null;
    red_flag_symptoms?: unknown | null;
    patient_education_completed?: boolean | null;
    caregiver_education_completed?: boolean | null;
    nccn_reference?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type drug_toxicity_profiles = {
    id: string;
    drug_name: string;
    generic_name?: string | null;
    drug_class?: string | null;
    common_toxicities: unknown;
    rare_toxicities?: unknown | null;
    dose_related_toxicities?: unknown | null;
    cumulative_toxicities?: unknown | null;
    organ_specific_toxicities?: unknown | null;
    monitoring_schedule?: unknown | null;
    baseline_assessments?: unknown | null;
    warning_boxes?: unknown | null;
    contraindications?: unknown | null;
    drug_interactions?: unknown | null;
    special_populations?: unknown | null;
    pregnancy_category?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type emergency_protocols = {
    id: string;
    scenario_id?: string | null;
    protocol_name: string;
    step_number: number;
    action: string;
    time_frame?: string | null;
    required_personnel?: unknown | null;
    medications?: unknown | null;
    monitoring?: unknown | null;
    expected_outcome?: string | null;
    next_step_trigger?: string | null;
    alternative_actions?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type emergency_scenarios = {
    id: string;
    scenario_name: string;
    severity: string;
    cancer_type?: string | null;
    treatment_related?: boolean | null;
    clinical_presentation: unknown;
    diagnostic_criteria?: unknown | null;
    risk_factors?: unknown | null;
    immediate_actions: unknown;
    time_to_intervention?: string | null;
    required_resources?: unknown | null;
    consultation_required?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type follow_up_protocols = {
    id: string;
    protocol_name: string;
    cancer_type: string;
    treatment_phase?: string | null;
    time_frame: string;
    contact_method?: string | null;
    assessment_components: unknown;
    vital_signs_required?: boolean | null;
    laboratory_tests?: unknown | null;
    imaging_requirements?: unknown | null;
    symptom_assessment?: unknown | null;
    medication_review?: unknown | null;
    adherence_assessment?: unknown | null;
    toxicity_assessment?: unknown | null;
    functional_assessment?: unknown | null;
    psychosocial_assessment?: unknown | null;
    caregiver_assessment?: unknown | null;
    action_plans?: unknown | null;
    escalation_criteria?: unknown | null;
    documentation_requirements?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type monitoring_parameters = {
    id: string;
    parameter_name: string;
    category: string;
    cancer_type?: string | null;
    treatment_phase?: string | null;
    frequency: string;
    normal_range?: unknown | null;
    alert_thresholds?: unknown | null;
    critical_values?: unknown | null;
    action_required?: unknown | null;
    documentation_required?: boolean | null;
    nursing_protocol?: unknown | null;
    physician_notification?: unknown | null;
    equipment_required?: unknown | null;
    special_instructions?: string | null;
    nccn_reference?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type nccn_guidelines = {
    id: string;
    reference_code: string;
    title: string;
    category: string;
    cancer_type?: string | null;
    version: string;
    release_date?: string | null;
    content: unknown;
    evidence_level?: string | null;
    consensus_level?: string | null;
    applicable_stages?: unknown | null;
    biomarker_requirements?: unknown | null;
    treatment_settings?: unknown | null;
    special_populations?: unknown | null;
    cross_references?: unknown | null;
    evidence_references?: unknown | null;
    updates_from_previous?: string | null;
    clinical_decision_points?: unknown | null;
    monitoring_requirements?: unknown | null;
    contraindications?: unknown | null;
    alternative_approaches?: unknown | null;
    quality_measures?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type oncology_medications = {
    id: string;
    name: string;
    brand_names?: unknown | null;
    classification: string;
    mechanism: string;
    administration: string;
    indications: unknown;
    dosing: unknown;
    side_effects?: unknown | null;
    monitoring?: unknown | null;
    interactions?: unknown | null;
    reference_sources?: unknown | null;
    summary?: string | null;
    black_box_warning?: string | null;
    special_considerations?: unknown | null;
    pharmacokinetics?: unknown | null;
    contraindications?: unknown | null;
    routine_monitoring?: unknown | null;
    pre_treatment_tests?: unknown | null;
    is_chemotherapy?: boolean | null;
    is_immunotherapy?: boolean | null;
    is_targeted_therapy?: boolean | null;
    is_orphan_drug?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type pain_management_protocols = {
    id: string;
    protocol_name: string;
    pain_type: string;
    pain_severity?: string | null;
    cancer_type?: string | null;
    pain_location?: string | null;
    pain_mechanism?: string | null;
    assessment_tools?: unknown | null;
    pharmacological_approach?: unknown | null;
    non_pharmacological_approach?: unknown | null;
    interventional_options?: unknown | null;
    opioid_guidelines?: unknown | null;
    adjuvant_therapies?: unknown | null;
    side_effect_management?: unknown | null;
    monitoring_protocol?: unknown | null;
    escalation_criteria?: unknown | null;
    special_considerations?: unknown | null;
    patient_education?: unknown | null;
    caregiver_education?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type performance_status_scales = {
    id: string;
    scale_name: string;
    scale_type: string;
    score_value: number;
    description: string;
    functional_capacity?: string | null;
    activity_level?: string | null;
    care_requirements?: string | null;
    prognostic_implication?: string | null;
    treatment_implications?: unknown | null;
    monitoring_frequency?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type profiles = {
    id: string;
    name?: string | null;
    age?: number | null;
    theme?: string | null;
    traits?: string | null;
    preferences?: string | null;
    user_id?: string | null;
  };

  export type sessions = {
    sid: string;
    sess: unknown;
    expire: string;
  };

  export type supportive_care_protocols = {
    id: string;
    protocol_name: string;
    category: string;
    indication: string;
    cancer_type?: string | null;
    treatment_phase?: string | null;
    patient_population?: string | null;
    interventions: unknown;
    medications?: unknown | null;
    non_pharmacological?: unknown | null;
    monitoring_protocol?: unknown | null;
    expected_outcomes?: unknown | null;
    adjustment_criteria?: unknown | null;
    escalation_criteria?: unknown | null;
    consultation_triggers?: unknown | null;
    patient_education?: unknown | null;
    caregiver_instructions?: unknown | null;
    quality_of_life_considerations?: unknown | null;
    nccn_reference?: string | null;
    evidence_level?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
  };

  export type symptom_management = {
    id: string;
    symptom?: string | null;
    assessment_tools?: unknown | null;
    interventions?: unknown | null;
    medications?: unknown | null;
    monitoring_parameters?: unknown | null;
    updated_at?: string | null;
  };

  // TODO: treatment_plan_criteria.created_at is jsonb (likely meant to be timestamp)
  export type treatment_plan_criteria = {
    id: number;
    category?: string | null;
    value?: string | null;
    description?: string | null;
    is_common?: boolean | null;
    sort_order?: number | null;
    is_active?: boolean | null;
    created_at?: unknown | null; // TODO: This should likely be timestamp, not jsonb
    cancer_specific?: string | null;
    clinical_context?: string | null;
    cutoff_value?: string | null;
    parent_category?: string | null;
    evidence_level?: string | null;
  };

  // TODO: treatment_plan_mappings.created_at & updated_at are jsonb (likely meant to be timestamps)
  export type treatment_plan_mappings = {
    id: number;
    cancer_type?: string | null;
    histology?: string | null;
    biomarkers?: unknown | null;
    treatment_intent?: string | null;
    line_of_treatment?: string | null;
    treatment_protocol?: string | null;
    evidence_reference?: string | null;
    nccn_reference?: string | null;
    conflicting_biomarkers?: unknown | null;
    required_stage?: unknown | null;
    confidence_score?: number | null;
    is_active?: boolean | null;
    created_at?: unknown | null; // TODO: This should likely be timestamp, not jsonb
    updated_at?: unknown | null; // TODO: This should likely be timestamp, not jsonb
    requires_combination_match?: boolean | null;
    toxicity_level?: string | null;
    priority_tag?: string | null;
    performance_status_min?: string | null;
    performance_status_max?: number | null;
  };

  export type treatment_protocols = {
    id: string;
    protocol_code?: string | null;
    tumour_group?: string | null;
    protocol_name?: string | null;
    indications?: unknown | null;
    contraindications?: unknown | null;
    dosing_schedule?: unknown | null;
    toxicity_profile?: unknown | null;
    monitoring_requirements?: unknown | null;
    created_at?: string | null;
    updated_at?: string | null;
  };

  export type users = {
    id: string;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    profile_image_url?: string | null;
    role?: string | null;
    department?: string | null;
    license_number?: string | null;
    is_active?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}
