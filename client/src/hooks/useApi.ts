// React hooks for the OncoVista API - proper client-server linking
// These hooks should be used instead of direct Supabase calls in components

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/apiClient.js';

// NCCN Guidelines hooks
export function useNccnGuidelines(params: {
  cancer_type?: string;
  category?: string;
  limit?: number;
  offset?: number;
} = {}) {
  return useQuery({
    queryKey: ['nccn-guidelines', params],
    queryFn: () => api.nccn.list(params),
    enabled: !!params.cancer_type, // Only fetch if cancer_type is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchNccnGuidelines(searchTerm: string, limit = 50) {
  return useQuery({
    queryKey: ['nccn-guidelines-search', searchTerm, limit],
    queryFn: () => api.nccn.search(searchTerm, limit),
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 5 * 60 * 1000,
  });
}

// Clinical Protocols hooks
export function useClinicalProtocols(params: {
  cancer_type?: string;
  protocol_type?: string;
  limit?: number;
  offset?: number;
} = {}) {
  return useQuery({
    queryKey: ['clinical-protocols', params],
    queryFn: () => api.clinicalProtocols.list(params),
    enabled: !!params.cancer_type,
    staleTime: 5 * 60 * 1000,
  });
}

// CD Protocols hooks
export function useCdProtocols(params: {
  tumour_group?: string;
  code?: string;
  status?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['cd-protocols', params],
    queryFn: () => api.cdProtocols.list(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCdProtocolsByTumourGroup(tumourGroup: string, limit = 50) {
  return useQuery({
    queryKey: ['cd-protocols-by-tumour', tumourGroup, limit],
    queryFn: () => api.cdProtocols.searchByTumourGroup(tumourGroup, limit),
    enabled: !!tumourGroup,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCdProtocolsByCode(code: string, limit = 50) {
  return useQuery({
    queryKey: ['cd-protocols-by-code', code, limit],
    queryFn: () => api.cdProtocols.searchByCode(code, limit),
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
  });
}

// Treatment Protocols hooks
export function useTreatmentProtocols(params: {
  tumour_group?: string;
  code?: string;
  name?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['treatment-protocols', params],
    queryFn: () => api.treatmentProtocols.list(params),
    staleTime: 5 * 60 * 1000,
  });
}

// Oncology Medications hooks
export function useOncologyMedications(params: {
  classification?: string;
  search?: string;
  is_chemotherapy?: boolean;
  is_immunotherapy?: boolean;
  is_targeted_therapy?: boolean;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['oncology-medications', params],
    queryFn: () => api.medications.list(params),
    staleTime: 10 * 60 * 1000, // 10 minutes - medications don't change often
  });
}

export function useSearchMedications(name: string, limit = 50) {
  return useQuery({
    queryKey: ['medications-search', name, limit],
    queryFn: () => api.medications.searchByName(name, limit),
    enabled: !!name && name.length > 2,
    staleTime: 10 * 60 * 1000,
  });
}

export function useMedicationsByClassification(classification: string, limit = 50) {
  return useQuery({
    queryKey: ['medications-by-classification', classification, limit],
    queryFn: () => api.medications.getByClassification(classification, limit),
    enabled: !!classification,
    staleTime: 10 * 60 * 1000,
  });
}

// Admission Criteria hooks
export function useAdmissionCriteria(params: {
  cancer_type?: string;
  admission_type?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['admission-criteria', params],
    queryFn: () => api.admissionCriteria.list(params),
    staleTime: 10 * 60 * 1000,
  });
}

export function useAdmissionCriteriaByCancerType(cancerType: string, limit = 50) {
  return useQuery({
    queryKey: ['admission-criteria-by-cancer', cancerType, limit],
    queryFn: () => api.admissionCriteria.getByCancerType(cancerType, limit),
    enabled: !!cancerType,
    staleTime: 10 * 60 * 1000,
  });
}

export function useAdmissionCriteriaByType(admissionType: string, limit = 50) {
  return useQuery({
    queryKey: ['admission-criteria-by-type', admissionType, limit],
    queryFn: () => api.admissionCriteria.getByAdmissionType(admissionType, limit),
    enabled: !!admissionType,
    staleTime: 10 * 60 * 1000,
  });
}

// Palliative Care hooks
export function usePalliativeSymptomProtocols(params: {
  category?: string;
  slug?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['palliative-symptom-protocols', params],
    queryFn: () => api.palliative.symptomProtocols.list(params),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePalliativeSymptomProtocolsByCategory(category: string, limit = 50) {
  return useQuery({
    queryKey: ['palliative-symptom-protocols-by-category', category, limit],
    queryFn: () => api.palliative.symptomProtocols.getByCategory(category, limit),
    enabled: !!category,
    staleTime: 10 * 60 * 1000,
  });
}

export function usePalliativeSymptomProtocolBySlug(slug: string) {
  return useQuery({
    queryKey: ['palliative-symptom-protocol', slug],
    queryFn: () => api.palliative.symptomProtocols.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function usePalliativeEmergencyGuidelines(params: {
  urgency?: string;
  slug?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['palliative-emergency-guidelines', params],
    queryFn: () => api.palliative.emergencyGuidelines.list(params),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePalliativeEmergencyGuidelineBySlug(slug: string) {
  return useQuery({
    queryKey: ['palliative-emergency-guideline', slug],
    queryFn: () => api.palliative.emergencyGuidelines.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function usePalliativeCalculators(params: {
  kind?: string;
  slug?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['palliative-calculators', params],
    queryFn: () => api.palliative.calculators.list(params),
    staleTime: 15 * 60 * 1000, // 15 minutes - calculators rarely change
  });
}

export function usePalliativeCalculatorBySlug(slug: string) {
  return useQuery({
    queryKey: ['palliative-calculator', slug],
    queryFn: () => api.palliative.calculators.getBySlug(slug),
    enabled: !!slug,
    staleTime: 15 * 60 * 1000,
  });
}

// AI and Decision Support hooks
export function useAiAnalysis() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ context, query }: { context: any; query: string }) => 
      api.ai.analyze(context, query),
    onSuccess: () => {
      // Invalidate related queries if needed
      queryClient.invalidateQueries({ queryKey: ['ai-interactions'] });
    },
  });
}

export function useCreateDecisionSupport() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: any) => api.decisionSupport.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decision-support'] });
    },
  });
}

export function useDecisionSupportInputs(filters: {
  createdBy?: string;
  moduleType?: string;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: ['decision-support', filters],
    queryFn: () => api.decisionSupport.list(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes - more recent data
  });
}

// Auth hooks
export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => api.auth.getUser(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: false, // Don't retry auth failures
  });
}

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => api.auth.getMe(),
    staleTime: 15 * 60 * 1000,
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => api.auth.logout(),
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
}

// Health hooks
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.health.check(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

export function useDatabaseHealth() {
  return useQuery({
    queryKey: ['database-health'],
    queryFn: () => api.health.checkDatabase(),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}
