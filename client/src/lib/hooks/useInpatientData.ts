"use client";

import { useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabaseClient, hasSupabaseConfig } from "@/lib/supabase/client";
import type {
  AdmissionCriterionRow, EmergencyProtocolRow, MonitoringWorkflowRow,
  SupportiveCareRow, DischargePlanningRow, InpatientCounts, EvidenceTag
} from "@/lib/inpatient/types";

const staleTime = 5 * 60 * 1000;

// Mock data for development when Supabase is not configured
const mockAdmissionCriteria: AdmissionCriterionRow[] = [
  {
    id: '1',
    title: 'Neutropenic Fever (Demo)',
    description: 'Adult patients with ANC < 500/μL and fever ≥ 38.3°C',
    inclusion: ['ANC < 500/μL', 'Temperature ≥ 38.3°C', 'Recent chemotherapy'],
    exclusion: ['Drug fever', 'Transfusion reaction'],
    initial_actions: ['Blood cultures', 'Start antibiotics within 1 hour', 'CBC with diff'],
    references: null,
    evidence: ['NCCN', 'ASCO'],
    slug: 'neutropenic-fever',
    order_index: 1
  }
];

const mockEmergencyProtocols: EmergencyProtocolRow[] = [
  {
    id: '1',
    name: 'Spinal Cord Compression (Demo)',
    red_flags: ['Motor weakness', 'Bladder dysfunction', 'Sensory level'],
    immediate_actions: ['Urgent MRI', 'Dexamethasone', 'Neurosurgery consult'],
    diagnostics: ['MRI spine with contrast', 'Neurological exam'],
    ongoing_management: ['High-dose steroids', 'Radiation planning'],
    disposition: ['ICU if unstable', 'Ward with neuro checks'],
    references: null,
    evidence: ['NCCN'],
    slug: 'spinal-cord-compression',
    order_index: 1
  }
];

const mockMonitoringWorkflows: MonitoringWorkflowRow[] = [
  {
    id: '1',
    title: 'Neutropenic Monitoring (Demo)',
    frequency: 'q8h' as const,
    parameters: ['Vital signs', 'Temperature trend', 'Infection screening'],
    escalation_rules: ['Temperature > 38.3°C: notify MD', 'New confusion'],
    references: null,
    evidence: ['NCCN'],
    slug: 'neutropenic-monitoring',
    order_index: 1
  }
];

const mockSupportiveCare: SupportiveCareRow[] = [
  {
    id: '1',
    title: 'CINV Management (Demo)',
    indications: ['High emetogenic chemo', 'Breakthrough nausea'],
    non_pharmacologic: ['Dietary changes', 'Ginger', 'Relaxation'],
    precautions: ['QTc monitoring', 'Drug interactions'],
    coordination: ['Pharmacy consult', 'Dietitian'],
    references: null,
    evidence: ['NCCN', 'ASCO'],
    slug: 'cinv-management',
    order_index: 1
  }
];

const mockDischargePlanning: DischargePlanningRow[] = [
  {
    id: '1',
    title: 'Neutropenic Discharge (Demo)',
    criteria: ['ANC > 500', 'Afebrile 24h', 'Stable vitals'],
    teach_back: ['Temperature monitoring', 'When to seek help'],
    handoff: ['CBC results', 'Follow-up scheduled'],
    safety_netting: ['Fever ≥ 100.4°F: ED immediately', 'New symptoms'],
    references: null,
    evidence: ['Institutional'],
    slug: 'neutropenic-discharge',
    order_index: 1
  }
];

async function fetchTable<T>(table: string): Promise<T[]> {
  if (!hasSupabaseConfig) {
    // Return mock data when Supabase is not configured
    switch (table) {
      case 'admission_criteria': return mockAdmissionCriteria as unknown as T[];
      case 'emergency_protocols': return mockEmergencyProtocols as unknown as T[];
      case 'monitoring_workflows': return mockMonitoringWorkflows as unknown as T[];
      case 'supportive_care': return mockSupportiveCare as unknown as T[];
      case 'discharge_planning': return mockDischargePlanning as unknown as T[];
      default: return [];
    }
  }
  
  const { data, error } = await supabaseClient
    .from(table)
    .select("*")
    .order("order_index", { ascending: true })
    .order("title", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data as unknown as T[];
}

export function useAdmissionCriteria() {
  return useQuery({
    queryKey: ["inpatient", "admission_criteria"],
    queryFn: () => fetchTable<AdmissionCriterionRow>("admission_criteria"),
    staleTime,
  });
}
export function useEmergencyProtocols() {
  return useQuery({
    queryKey: ["inpatient", "emergency_protocols"],
    queryFn: () => fetchTable<EmergencyProtocolRow>("emergency_protocols"),
    staleTime,
  });
}
export function useMonitoringWorkflowsQ() {
  return useQuery({
    queryKey: ["inpatient", "monitoring_workflows"],
    queryFn: () => fetchTable<MonitoringWorkflowRow>("monitoring_workflows"),
    staleTime,
  });
}
export function useSupportiveCareQ() {
  return useQuery({
    queryKey: ["inpatient", "supportive_care"],
    queryFn: () => fetchTable<SupportiveCareRow>("supportive_care"),
    staleTime,
  });
}
export function useDischargePlanningQ() {
  return useQuery({
    queryKey: ["inpatient", "discharge_planning"],
    queryFn: () => fetchTable<DischargePlanningRow>("discharge_planning"),
    staleTime,
  });
}

export function useInpatientStats() {
  const adm = useAdmissionCriteria();
  const emg = useEmergencyProtocols();
  const mon = useMonitoringWorkflowsQ();
  const sup = useSupportiveCareQ();
  const dis = useDischargePlanningQ();

  const isLoading = adm.isLoading || emg.isLoading || mon.isLoading || sup.isLoading || dis.isLoading;

  const data: InpatientCounts | undefined = useMemo(() => {
    if (!adm.data || !emg.data || !mon.data || !sup.data || !dis.data) return undefined;
    const totalProtocols =
      adm.data.length + emg.data.length + mon.data.length + sup.data.length + dis.data.length;
    const emergencyProtocols = emg.data.length;
    const monitoringParameters = mon.data.reduce((acc, m) => acc + (m.parameters?.length || 0), 0);
    return {
      totalProtocols,
      emergencyProtocols,
      monitoringParameters,
      lastUpdate: new Date().toISOString().slice(0, 10),
    };
  }, [adm.data, emg.data, mon.data, sup.data, dis.data]);

  return { data, isLoading, queries: { adm, emg, mon, sup, dis } };
}

/** Client-side helpers */
export function filterByEvidence<T extends { evidence: EvidenceTag[] | null }>(rows: T[], active: EvidenceTag[] | null) {
  if (!active || active.length === 0) return rows;
  return rows.filter(r => (r.evidence || []).some(tag => active.includes(tag)));
}
export function searchRows<T extends { title?: string; name?: string; description?: string | null }>(rows: T[], q: string) {
  if (!q) return rows;
  const s = q.toLowerCase();
  return rows.filter(r =>
    (r["title"] || r["name"] || "").toLowerCase().includes(s) ||
    (r["description"] || "").toLowerCase().includes(s)
  );
}

/** Bookmarks (localStorage) */
export function useBookmarks() {
  const key = "inpatient_bookmarks_v1";
  const cache = useRef<Set<string>>(new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) cache.current = new Set(JSON.parse(raw));
    } catch {}
  }, []);
  function toggle(id: string) {
    if (cache.current.has(id)) cache.current.delete(id);
    else cache.current.add(id);
    localStorage.setItem(key, JSON.stringify(Array.from(cache.current)));
  }
  function isBookmarked(id: string) { return cache.current.has(id); }
  function all() { return Array.from(cache.current); }
  return { toggle, isBookmarked, all };
}
