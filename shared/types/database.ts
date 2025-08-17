// Shared database types - single source of truth for both client and server
// Generated from the authoritative schema

export interface AdmissionCriteria {
  id: string;
  criteria_name: string;
  cancer_type: string;
  admission_type: string;
  clinical_indications: Record<string, any>;
  exclusion_criteria?: Record<string, any> | null;
  risk_factors?: Record<string, any> | null;
  required_assessments?: Record<string, any> | null;
  nccn_reference?: string | null;
  evidence_level?: string | null;
  priority?: string | null;
  estimated_los?: number | null;
  special_requirements?: Record<string, any> | null;
  contraindications?: Record<string, any> | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_active?: boolean | null;
}

export interface AdverseEvents {
  id: string;
  event_name: string;
  category: string;
  ctcae_code?: string | null;
  ctcae_version?: string | null;
  grade: number;
  description: string;
  clinical_presentation?: Record<string, any> | null;
  risk_factors?: Record<string, any> | null;
  associated_treatments?: Record<string, any> | null;
  time_to_onset?: string | null;
  duration?: string | null;
  reversibility?: string | null;
  frequency?: string | null;
  prevention_strategies?: Record<string, any> | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AiInteractions {
  id: string;
  user_id?: string | null;
  session_id?: string | null;
  module_type?: string | null;
  intent?: string | null;
  input_context?: Record<string, any> | null;
  ai_response?: Record<string, any> | null;
  confidence_score?: number | null;
  user_feedback?: string | null;
  response_time_ms?: number | null;
  model_version?: string | null;
  created_at?: string | null;
}

export interface ClinicalProtocols {
  id: string;
  name: string;
  version: string;
  protocol_type: string;
  cancer_type?: string | null;
  stage?: string | null;
  content: Record<string, any>;
  evidence_level?: string | null;
  guideline_source?: string | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  status?: string | null;
  approval_status?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
}

export interface CdProtocols {
  id: string;
  code: string;
  tumour_group: string;
  tumour_supergroup?: string | null;
  treatment_intent: string;
  summary: string;
  eligibility: Record<string, any>;
  precautions: Record<string, any>;
  treatment: Record<string, any>;
  tests?: Record<string, any> | null;
  dose_modifications?: Record<string, any> | null;
  reference_list?: Record<string, any> | null;
  cycle_info?: Record<string, any> | null;
  pre_medications?: Record<string, any> | null;
  post_medications?: Record<string, any> | null;
  supportive_care?: Record<string, any> | null;
  rescue_agents?: Record<string, any> | null;
  monitoring?: Record<string, any> | null;
  toxicity_monitoring?: Record<string, any> | null;
  interactions?: Record<string, any> | null;
  contraindications?: Record<string, any> | null;
  version: string;
  status?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  last_reviewed?: string | null;
}

export interface NccnGuidelines {
  id: string;
  reference_code: string;
  title: string;
  category: string;
  cancer_type?: string | null;
  version: string;
  release_date?: string | null;
  content: Record<string, any>;
  evidence_level?: string | null;
  consensus_level?: string | null;
  applicable_stages?: Record<string, any> | null;
  biomarker_requirements?: Record<string, any> | null;
  treatment_settings?: Record<string, any> | null;
  special_populations?: Record<string, any> | null;
  cross_references?: Record<string, any> | null;
  evidence_references?: Record<string, any> | null;
  updates_from_previous?: string | null;
  clinical_decision_points?: Record<string, any> | null;
  monitoring_requirements?: Record<string, any> | null;
  contraindications?: Record<string, any> | null;
  alternative_approaches?: Record<string, any> | null;
  quality_measures?: Record<string, any> | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OncologyMedications {
  id: string;
  name: string;
  brand_names?: Record<string, any> | null;
  classification: string;
  mechanism: string;
  administration: string;
  indications: Record<string, any>;
  dosing: Record<string, any>;
  side_effects?: Record<string, any> | null;
  monitoring?: Record<string, any> | null;
  interactions?: Record<string, any> | null;
  reference_sources?: Record<string, any> | null;
  summary?: string | null;
  black_box_warning?: string | null;
  special_considerations?: Record<string, any> | null;
  pharmacokinetics?: Record<string, any> | null;
  contraindications?: Record<string, any> | null;
  routine_monitoring?: Record<string, any> | null;
  pre_treatment_tests?: Record<string, any> | null;
  is_chemotherapy?: boolean | null;
  is_immunotherapy?: boolean | null;
  is_targeted_therapy?: boolean | null;
  is_orphan_drug?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface TreatmentProtocols {
  id: string;
  protocol_code?: string | null;
  tumour_group?: string | null;
  protocol_name?: string | null;
  indications?: Record<string, any> | null;
  contraindications?: Record<string, any> | null;
  dosing_schedule?: Record<string, any> | null;
  toxicity_profile?: Record<string, any> | null;
  monitoring_requirements?: Record<string, any> | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Users {
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
}

export interface PalliativeSymptomProtocols {
  id: string;
  slug: string;
  title: string;
  category: string;
  overview: string;
  evidence: string;
  updated: string;
  tags?: string[] | null;
  red_flags?: string[] | null;
  citations?: Record<string, any> | null;
  steps: Record<string, any>;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PalliativeEmergencyGuidelines {
  id: string;
  slug: string;
  title: string;
  overview: string;
  evidence: string;
  updated: string;
  urgency: string;
  tags?: string[] | null;
  immediate: string[];
  steps: Record<string, any>;
  post?: Record<string, any> | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PalliativeCalculators {
  id: string;
  slug: string;
  title: string;
  kind: string;
  config: Record<string, any>;
  created_at?: string | null;
}

// Database namespace for compatibility
export interface DatabaseTables {
  admission_criteria: AdmissionCriteria;
  adverse_events: AdverseEvents;
  ai_interactions: AiInteractions;
  clinical_protocols: ClinicalProtocols;
  cd_protocols: CdProtocols;
  nccn_guidelines: NccnGuidelines;
  oncology_medications: OncologyMedications;
  treatment_protocols: TreatmentProtocols;
  users: Users;
  palliative_symptom_protocols: PalliativeSymptomProtocols;
  palliative_emergency_guidelines: PalliativeEmergencyGuidelines;
  palliative_calculators: PalliativeCalculators;
}

export type TableNames = keyof DatabaseTables;
export type Row<T extends TableNames> = DatabaseTables[T];
export type Insert<T extends TableNames> = Omit<DatabaseTables[T], 'id' | 'created_at' | 'updated_at'>;
export type Update<T extends TableNames> = Partial<Insert<T>>;

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  items?: T[];
  total?: number;
  limit?: number;
  offset?: number;
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, any>;
}
