import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  NccnGuidelineSchema, ClinicalProtocolSchema, TreatmentProtocolSchema,
  CdProtocolSchema, OncologyMedicationSchema, AdverseEventSchema,
  AdverseEventManagementSchema, EmergencyScenarioSchema, EmergencyProtocolSchema,
  SymptomManagementSchema, PainManagementProtocolSchema, MonitoringParameterSchema,
  PerformanceStatusScaleSchema, BiomarkerGuidelineSchema, FollowUpProtocolSchema,
  AdmissionCriteriaSchema, DischargeCriteriaSchema, TreatmentPlanCriteriaSchema,
  TreatmentPlanMappingSchema,
  type NccnGuideline, type ClinicalProtocol, type TreatmentProtocol,
  type CdProtocol, type OncologyMedication, type AdverseEvent,
  type AdverseEventManagement, type EmergencyScenario, type EmergencyProtocol,
  type SymptomManagement, type PainManagementProtocol, type MonitoringParameter,
  type PerformanceStatusScale, type BiomarkerGuideline, type FollowUpProtocol,
  type AdmissionCriteria, type DischargeCriteria, type TreatmentPlanCriteria,
  type TreatmentPlanMapping
} from './models.js';
import { z } from 'zod';

export class SupabaseRepository {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  async health(): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('nccn_guidelines')
        .select('id')
        .limit(1);
      return !error;
    } catch {
      return false;
    }
  }

  async nccnByCancerType(cancerType: string, limit = 50): Promise<NccnGuideline[]> {
    try {
      const { data, error } = await this.supabase
        .from('nccn_guidelines')
        .select('id, reference_code, title, category, cancer_type, version, release_date, content, evidence_level, consensus_level, applicable_stages, biomarker_requirements, treatment_settings, special_populations, cross_references, evidence_references, updates_from_previous, clinical_decision_points, monitoring_requirements, contraindications, alternative_approaches, quality_measures, created_at, updated_at')
        .ilike('cancer_type', `%${cancerType}%`)
        .limit(Math.min(limit, 200));

      if (error || !data) return [];
      return z.array(NccnGuidelineSchema).parse(data);
    } catch {
      return [];
    }
  }

  async protocolsByCancer(cancerType: string, limit = 50): Promise<ClinicalProtocol[]> {
    try {
      const { data, error } = await this.supabase
        .from('clinical_protocols')
        .select('id, name, version, protocol_type, cancer_type, stage, content, evidence_level, guideline_source, created_by, created_at, updated_at, status, approval_status, approved_by, approved_at')
        .ilike('cancer_type', `%${cancerType}%`)
        .limit(Math.min(limit, 200));

      if (error || !data) return [];
      return z.array(ClinicalProtocolSchema).parse(data);
    } catch {
      return [];
    }
  }

  async cdProtocolsByTumour(tumourGroup?: string, limit = 50): Promise<CdProtocol[]> {
    try {
      let query = this.supabase
        .from('cd_protocols')
        .select('id, code, tumour_group, tumour_supergroup, treatment_intent, summary, eligibility, precautions, treatment, tests, dose_modifications, reference_list, cycle_info, pre_medications, post_medications, supportive_care, rescue_agents, monitoring, toxicity_monitoring, interactions, contraindications, version, status, created_by, updated_by, created_at, updated_at, last_reviewed')
        .limit(Math.min(limit, 200));

      if (tumourGroup) {
        query = query.ilike('tumour_group', `%${tumourGroup}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(CdProtocolSchema).parse(data);
    } catch {
      return [];
    }
  }

  async treatmentProtocols(query: { tumour_group?: string; code?: string; name?: string }, limit = 50): Promise<TreatmentProtocol[]> {
    try {
      let supabaseQuery = this.supabase
        .from('treatment_protocols')
        .select('id, protocol_code, tumour_group, protocol_name, indications, contraindications, dosing_schedule, toxicity_profile, monitoring_requirements, created_at, updated_at')
        .limit(Math.min(limit, 200));

      if (query.tumour_group) {
        supabaseQuery = supabaseQuery.ilike('tumour_group', `%${query.tumour_group}%`);
      }
      if (query.code) {
        supabaseQuery = supabaseQuery.ilike('protocol_code', `%${query.code}%`);
      }
      if (query.name) {
        supabaseQuery = supabaseQuery.ilike('protocol_name', `%${query.name}%`);
      }

      const { data, error } = await supabaseQuery;
      if (error || !data) return [];
      return z.array(TreatmentProtocolSchema).parse(data);
    } catch {
      return [];
    }
  }

  async medicationsSearch(q: string, flags?: { chemo?: boolean; immuno?: boolean; targeted?: boolean }, limit = 25): Promise<OncologyMedication[]> {
    try {
      let query = this.supabase
        .from('oncology_medications')
        .select('id, name, brand_names, classification, mechanism, administration, indications, dosing, side_effects, monitoring, interactions, reference_sources, summary, black_box_warning, special_considerations, pharmacokinetics, contraindications, routine_monitoring, pre_treatment_tests, is_chemotherapy, is_immunotherapy, is_targeted_therapy, is_orphan_drug, created_at, updated_at')
        .limit(Math.min(limit, 100));

      // Search in name, brand_names (as text), and summary
      if (q) {
        query = query.or(`name.ilike.%${q}%,summary.ilike.%${q}%`);
      }

      if (flags?.chemo) {
        query = query.eq('is_chemotherapy', true);
      }
      if (flags?.immuno) {
        query = query.eq('is_immunotherapy', true);
      }
      if (flags?.targeted) {
        query = query.eq('is_targeted_therapy', true);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(OncologyMedicationSchema).parse(data);
    } catch {
      return [];
    }
  }

  async adverseEvents(filter?: { event_name?: string; grade?: number }, limit = 50): Promise<AdverseEvent[]> {
    try {
      let query = this.supabase
        .from('adverse_events')
        .select('id, event_name, category, ctcae_code, ctcae_version, grade, description, clinical_presentation, risk_factors, associated_treatments, time_to_onset, duration, reversibility, frequency, prevention_strategies, created_at, updated_at')
        .limit(Math.min(limit, 200));

      if (filter?.event_name) {
        query = query.ilike('event_name', `%${filter.event_name}%`);
      }
      if (filter?.grade !== undefined) {
        query = query.eq('grade', filter.grade);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(AdverseEventSchema).parse(data);
    } catch {
      return [];
    }
  }

  async adverseEventManagement(adverse_event_id: string, grade?: number): Promise<AdverseEventManagement[]> {
    try {
      let query = this.supabase
        .from('adverse_event_management')
        .select('id, adverse_event_id, grade, immediate_actions, treatment_modifications, supportive_care, medications, monitoring_requirements, consultation_required, patient_education, follow_up_protocol, rechallenge_criteria, reporting_requirements, nccn_reference, evidence_level, created_at, updated_at')
        .eq('adverse_event_id', adverse_event_id);

      if (grade !== undefined) {
        query = query.eq('grade', grade);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(AdverseEventManagementSchema).parse(data);
    } catch {
      return [];
    }
  }

  async emergencyScenarios(filter?: { cancer_type?: string; severity?: string; activeOnly?: boolean }, limit = 50): Promise<EmergencyScenario[]> {
    try {
      let query = this.supabase
        .from('emergency_scenarios')
        .select('id, scenario_name, severity, cancer_type, treatment_related, clinical_presentation, diagnostic_criteria, risk_factors, immediate_actions, time_to_intervention, required_resources, consultation_required, nccn_reference, evidence_level, created_at, updated_at, is_active')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.severity) {
        query = query.ilike('severity', `%${filter.severity}%`);
      }
      if (filter?.activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(EmergencyScenarioSchema).parse(data);
    } catch {
      return [];
    }
  }

  async emergencyProtocolsForScenario(scenario_id: string): Promise<EmergencyProtocol[]> {
    try {
      const { data, error } = await this.supabase
        .from('emergency_protocols')
        .select('id, scenario_id, protocol_name, step_number, action, time_frame, required_personnel, medications, monitoring, expected_outcome, next_step_trigger, alternative_actions, created_at, updated_at')
        .eq('scenario_id', scenario_id)
        .order('step_number', { ascending: true });

      if (error || !data) return [];
      return z.array(EmergencyProtocolSchema).parse(data);
    } catch {
      return [];
    }
  }

  async symptomManagement(symptom?: string, limit = 50): Promise<SymptomManagement[]> {
    try {
      let query = this.supabase
        .from('symptom_management')
        .select('id, symptom, assessment_tools, interventions, medications, monitoring_parameters, updated_at')
        .limit(Math.min(limit, 200));

      if (symptom) {
        query = query.ilike('symptom', `%${symptom}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(SymptomManagementSchema).parse(data);
    } catch {
      return [];
    }
  }

  async painProtocols(filter?: { pain_type?: string; severity?: string; activeOnly?: boolean }, limit = 50): Promise<PainManagementProtocol[]> {
    try {
      let query = this.supabase
        .from('pain_management_protocols')
        .select('id, protocol_name, pain_type, pain_severity, cancer_type, pain_location, pain_mechanism, assessment_tools, pharmacological_approach, non_pharmacological_approach, interventional_options, opioid_guidelines, adjuvant_therapies, side_effect_management, monitoring_protocol, escalation_criteria, special_considerations, patient_education, caregiver_education, nccn_reference, evidence_level, created_at, updated_at, is_active')
        .limit(Math.min(limit, 200));

      if (filter?.pain_type) {
        query = query.ilike('pain_type', `%${filter.pain_type}%`);
      }
      if (filter?.severity) {
        query = query.ilike('pain_severity', `%${filter.severity}%`);
      }
      if (filter?.activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(PainManagementProtocolSchema).parse(data);
    } catch {
      return [];
    }
  }

  async monitoringParams(filter?: { cancer_type?: string; treatment_phase?: string; category?: string }, limit = 100): Promise<MonitoringParameter[]> {
    try {
      let query = this.supabase
        .from('monitoring_parameters')
        .select('id, parameter_name, category, cancer_type, treatment_phase, frequency, normal_range, alert_thresholds, critical_values, action_required, documentation_required, nursing_protocol, physician_notification, equipment_required, special_instructions, nccn_reference, created_at, updated_at, is_active')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.treatment_phase) {
        query = query.ilike('treatment_phase', `%${filter.treatment_phase}%`);
      }
      if (filter?.category) {
        query = query.ilike('category', `%${filter.category}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(MonitoringParameterSchema).parse(data);
    } catch {
      return [];
    }
  }

  async performanceScale(scale_name: string): Promise<PerformanceStatusScale[]> {
    try {
      const { data, error } = await this.supabase
        .from('performance_status_scales')
        .select('id, scale_name, scale_type, score_value, description, functional_capacity, activity_level, care_requirements, prognostic_implication, treatment_implications, monitoring_frequency, created_at, updated_at')
        .ilike('scale_name', `%${scale_name}%`)
        .order('score_value', { ascending: true });

      if (error || !data) return [];
      return z.array(PerformanceStatusScaleSchema).parse(data);
    } catch {
      return [];
    }
  }

  async biomarkers(filter?: { cancer_type?: string; biomarker_name?: string }, limit = 50): Promise<BiomarkerGuideline[]> {
    try {
      let query = this.supabase
        .from('biomarker_guidelines')
        .select('id, biomarker_name, testing_method, cancer_type, clinical_indications, nccn_reference, evidence_level, testing_timing, interpretation_criteria, therapeutic_implications, quality_requirements, reporting_standards, cost_considerations, special_considerations, created_at, updated_at')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.biomarker_name) {
        query = query.ilike('biomarker_name', `%${filter.biomarker_name}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(BiomarkerGuidelineSchema).parse(data);
    } catch {
      return [];
    }
  }

  async followupProtocols(filter?: { cancer_type?: string; phase?: string }, limit = 50): Promise<FollowUpProtocol[]> {
    try {
      let query = this.supabase
        .from('follow_up_protocols')
        .select('id, protocol_name, cancer_type, treatment_phase, time_frame, contact_method, assessment_components, vital_signs_required, laboratory_tests, imaging_requirements, symptom_assessment, medication_review, adherence_assessment, toxicity_assessment, functional_assessment, psychosocial_assessment, caregiver_assessment, action_plans, escalation_criteria, documentation_requirements, nccn_reference, evidence_level, created_at, updated_at, is_active')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.phase) {
        query = query.ilike('treatment_phase', `%${filter.phase}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(FollowUpProtocolSchema).parse(data);
    } catch {
      return [];
    }
  }

  async admissionCriteria(filter?: { cancer_type?: string; admission_type?: string }, limit = 50): Promise<AdmissionCriteria[]> {
    try {
      let query = this.supabase
        .from('admission_criteria')
        .select('id, criteria_name, cancer_type, admission_type, clinical_indications, exclusion_criteria, risk_factors, required_assessments, nccn_reference, evidence_level, priority, estimated_los, special_requirements, contraindications, created_at, updated_at, is_active')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.admission_type) {
        query = query.ilike('admission_type', `%${filter.admission_type}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(AdmissionCriteriaSchema).parse(data);
    } catch {
      return [];
    }
  }

  async dischargeCriteria(filter?: { cancer_type?: string; treatment_type?: string }, limit = 50): Promise<DischargeCriteria[]> {
    try {
      let query = this.supabase
        .from('discharge_criteria')
        .select('id, criteria_name, cancer_type, treatment_type, admission_type, clinical_stability_criteria, vital_sign_requirements, laboratory_requirements, symptom_control, functional_status, social_requirements, home_care_criteria, medication_management, follow_up_arrangements, transportation_arrangements, emergency_contact_info, red_flag_symptoms, patient_education_completed, caregiver_education_completed, nccn_reference, created_at, updated_at, is_active')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.treatment_type) {
        query = query.ilike('treatment_type', `%${filter.treatment_type}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(DischargeCriteriaSchema).parse(data);
    } catch {
      return [];
    }
  }

  async treatmentPlanCriteria(filter?: { category?: string; cancer_specific?: string }, limit = 200): Promise<TreatmentPlanCriteria[]> {
    try {
      let query = this.supabase
        .from('treatment_plan_criteria')
        .select('id, category, value, description, is_common, sort_order, is_active, created_at, cancer_specific, clinical_context, cutoff_value, parent_category, evidence_level')
        .limit(Math.min(limit, 200));

      if (filter?.category) {
        query = query.ilike('category', `%${filter.category}%`);
      }
      if (filter?.cancer_specific) {
        query = query.ilike('cancer_specific', `%${filter.cancer_specific}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(TreatmentPlanCriteriaSchema).parse(data);
    } catch {
      return [];
    }
  }

  async treatmentPlanMappings(filter?: { cancer_type?: string; histology?: string; intent?: string; line?: string }, limit = 100): Promise<TreatmentPlanMapping[]> {
    try {
      let query = this.supabase
        .from('treatment_plan_mappings')
        .select('id, cancer_type, histology, biomarkers, treatment_intent, line_of_treatment, treatment_protocol, evidence_reference, nccn_reference, conflicting_biomarkers, required_stage, confidence_score, is_active, created_at, updated_at, requires_combination_match, toxicity_level, priority_tag, performance_status_min, performance_status_max')
        .limit(Math.min(limit, 200));

      if (filter?.cancer_type) {
        query = query.ilike('cancer_type', `%${filter.cancer_type}%`);
      }
      if (filter?.histology) {
        query = query.ilike('histology', `%${filter.histology}%`);
      }
      if (filter?.intent) {
        query = query.ilike('treatment_intent', `%${filter.intent}%`);
      }
      if (filter?.line) {
        query = query.ilike('line_of_treatment', `%${filter.line}%`);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return z.array(TreatmentPlanMappingSchema).parse(data);
    } catch {
      return [];
    }
  }
}
