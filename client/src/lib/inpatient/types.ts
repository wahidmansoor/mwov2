export type EvidenceTag = "NCCN" | "ASCO" | "ESMO" | "Institutional" | "ExpertConsensus";

export interface RefLite { label: string; url?: string | null; }

export interface AdmissionCriterionRow {
  id: string;
  title: string;
  description: string | null;
  inclusion: string[];   // jsonb
  exclusion: string[] | null;
  initial_actions: string[]; // jsonb
  references: RefLite[] | null; // jsonb
  evidence: EvidenceTag[] | null; // text[]
  slug: string; // stable anchor
  order_index: number | null;
}

export interface EmergencyProtocolRow {
  id: string;
  name: string;
  red_flags: string[]; // jsonb
  immediate_actions: string[];
  diagnostics: string[];
  ongoing_management: string[];
  disposition: string[];
  references: RefLite[] | null;
  evidence: EvidenceTag[] | null;
  slug: string;
  order_index: number | null;
}

export interface MonitoringWorkflowRow {
  id: string;
  title: string;
  frequency: "q4h"|"q6h"|"q8h"|"q12h"|"daily"|"eachShift"|"perPolicy";
  parameters: string[];
  escalation_rules: string[];
  references: RefLite[] | null;
  evidence: EvidenceTag[] | null;
  slug: string;
  order_index: number | null;
}

export interface SupportiveCareRow {
  id: string;
  title: string;
  indications: string[];
  non_pharmacologic: string[];
  precautions: string[];
  coordination: string[];
  references: RefLite[] | null;
  evidence: EvidenceTag[] | null;
  slug: string;
  order_index: number | null;
}

export interface DischargePlanningRow {
  id: string;
  title: string;
  criteria: string[];
  teach_back: string[];
  handoff: string[];
  safety_netting: string[];
  references: RefLite[] | null;
  evidence: EvidenceTag[] | null;
  slug: string;
  order_index: number | null;
}

export interface InpatientCounts {
  totalProtocols: number;
  emergencyProtocols: number;
  monitoringParameters: number; // sum of parameters length
  lastUpdate: string;
}