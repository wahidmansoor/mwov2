// Server API functions - Single source of truth for database operations
// These functions should be used by the client instead of direct Supabase calls

import { getRepo } from '../db/index.js';
import type { 
  ApiResponse,
  PaginatedResponse,
  ApiError
} from '../../shared/types/database.js';

// Helper function to handle errors consistently
function handleError(error: any): ApiError {
  console.error('API Error:', error);
  return {
    message: error.message || 'An unexpected error occurred',
    status: error.status || 500,
    code: error.code || 'INTERNAL_ERROR'
  };
}

// Helper function to check if repo is available
function checkRepo() {
  const repo = getRepo();
  if (!repo) {
    throw new Error('Database not configured');
  }
  return repo;
}

// NCCN Guidelines API
export async function getNccnGuidelines(params: {
  cancer_type?: string;
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { cancer_type, limit = 50 } = params;
    
    if (!cancer_type) {
      return { error: 'cancer_type parameter is required' };
    }

    const items = await repo.nccnByCancerType(cancer_type, limit);
    return { items, total: items.length };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

export async function searchNccnGuidelines(searchTerm: string, limit = 50): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    // For now, use cancer type search - could be enhanced with full-text search
    const items = await repo.nccnByCancerType(searchTerm, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// Clinical Protocols API
export async function getClinicalProtocols(params: {
  cancer_type?: string;
  protocol_type?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { cancer_type, limit = 50 } = params;
    
    if (!cancer_type) {
      return { error: 'cancer_type parameter is required' };
    }

    const items = await repo.protocolsByCancer(cancer_type, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// CD Protocols API
export async function getCdProtocols(params: {
  tumour_group?: string;
  code?: string;
  status?: string;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { tumour_group, limit = 50 } = params;

    const items = await repo.cdProtocolsByTumour(tumour_group, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

export async function searchCdProtocols(searchTerm: string, limit = 50): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const items = await repo.cdProtocolsByTumour(searchTerm, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// Treatment Protocols API
export async function getTreatmentProtocols(params: {
  tumour_group?: string;
  code?: string;
  name?: string;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { tumour_group, code, name, limit = 50 } = params;

    const items = await repo.treatmentProtocols({ tumour_group, code, name }, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// Oncology Medications API - Note: Need to check if this method exists in repo
export async function getOncologyMedications(params: {
  classification?: string;
  search?: string;
  is_chemotherapy?: boolean;
  is_immunotherapy?: boolean;
  is_targeted_therapy?: boolean;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { classification, search, limit = 50 } = params;

    // Note: Need to implement this method in the repository
    // For now, return empty result
    return { items: [], message: 'Medications API not yet implemented in repository' };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// Admission Criteria API
export async function getAdmissionCriteria(params: {
  cancer_type?: string;
  admission_type?: string;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { cancer_type, admission_type, limit = 50 } = params;

    const items = await repo.admissionCriteria({ cancer_type, admission_type }, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// Palliative Care APIs
export async function getPalliativeSymptomProtocols(params: {
  category?: string;
  slug?: string;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { category, slug, limit = 50 } = params;

    const items = await repo.palliativeSymptomProtocols({ category, slug }, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

export async function getPalliativeEmergencyGuidelines(params: {
  urgency?: string;
  slug?: string;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { slug, limit = 50 } = params;

    const items = await repo.palliativeEmergencyGuidelines({ slug }, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

export async function getPalliativeCalculators(params: {
  kind?: string;
  slug?: string;
  limit?: number;
}): Promise<PaginatedResponse<any>> {
  try {
    const repo = checkRepo();
    const { kind, slug, limit = 50 } = params;

    const items = await repo.palliativeCalculators({ kind, slug }, limit);
    return { items };
  } catch (error) {
    return { error: handleError(error).message };
  }
}

// Health check API
export async function checkDatabaseHealth(): Promise<ApiResponse<{ healthy: boolean }>> {
  try {
    const repo = checkRepo();
    const healthy = await repo.health();
    return { data: { healthy } };
  } catch (error) {
    return { error: handleError(error).message };
  }
}
