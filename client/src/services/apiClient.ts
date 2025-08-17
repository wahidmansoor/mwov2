// Client API service - Uses server endpoints instead of direct Supabase calls
// This is the proper way to link client and server according to the documentation

import type { 
  ApiResponse, 
  PaginatedResponse 
} from '../../../shared/types/database.js';

// Base API configuration
const API_BASE_URL = '/api'; // Relative URL for same-origin requests

// Generic fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Helper to build query string from parameters
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
}

// NCCN Guidelines API
export const nccnAPI = {
  async list(params: {
    cancer_type?: string;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(params);
    return apiRequest(`/nccn-guidelines?${queryString}`);
  },

  async search(searchTerm: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/nccn-guidelines?cancer_type=${encodeURIComponent(searchTerm)}&limit=${limit}`);
  }
};

// Clinical Protocols API
export const clinicalProtocolsAPI = {
  async list(params: {
    cancer_type?: string;
    protocol_type?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(params);
    return apiRequest(`/clinical-protocols?${queryString}`);
  }
};

// CD Protocols API
export const cdProtocolsAPI = {
  async list(params: {
    tumour_group?: string;
    code?: string;
    status?: string;
    limit?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(params);
    return apiRequest(`/cd-protocols?${queryString}`);
  },

  async searchByTumourGroup(tumourGroup: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/cd-protocols?tumour_group=${encodeURIComponent(tumourGroup)}&limit=${limit}`);
  },

  async searchByCode(code: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/cd-protocols?code=${encodeURIComponent(code)}&limit=${limit}`);
  }
};

// Treatment Protocols API
export const treatmentProtocolsAPI = {
  async list(params: {
    tumour_group?: string;
    code?: string;
    name?: string;
    limit?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(params);
    return apiRequest(`/treatment-protocols?${queryString}`);
  }
};

// Oncology Medications API
export const medicationsAPI = {
  async list(params: {
    classification?: string;
    search?: string;
    is_chemotherapy?: boolean;
    is_immunotherapy?: boolean;
    is_targeted_therapy?: boolean;
    limit?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(params);
    return apiRequest(`/oncology-medications?${queryString}`);
  },

  async searchByName(name: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/oncology-medications?search=${encodeURIComponent(name)}&limit=${limit}`);
  },

  async getByClassification(classification: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/oncology-medications?classification=${encodeURIComponent(classification)}&limit=${limit}`);
  }
};

// Admission Criteria API
export const admissionCriteriaAPI = {
  async list(params: {
    cancer_type?: string;
    admission_type?: string;
    limit?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(params);
    return apiRequest(`/admission-criteria?${queryString}`);
  },

  async getByCancerType(cancerType: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/admission-criteria?cancer_type=${encodeURIComponent(cancerType)}&limit=${limit}`);
  },

  async getByAdmissionType(admissionType: string, limit = 50): Promise<PaginatedResponse<any>> {
    return apiRequest(`/admission-criteria?admission_type=${encodeURIComponent(admissionType)}&limit=${limit}`);
  }
};

// Palliative Care APIs
export const palliativeAPI = {
  symptomProtocols: {
    async list(params: {
      category?: string;
      slug?: string;
      limit?: number;
    } = {}): Promise<PaginatedResponse<any>> {
      const queryString = buildQueryString(params);
      return apiRequest(`/palliative/symptom-protocols?${queryString}`);
    },

    async getByCategory(category: string, limit = 50): Promise<PaginatedResponse<any>> {
      return apiRequest(`/palliative/symptom-protocols?category=${encodeURIComponent(category)}&limit=${limit}`);
    },

    async getBySlug(slug: string): Promise<PaginatedResponse<any>> {
      return apiRequest(`/palliative/symptom-protocols?slug=${encodeURIComponent(slug)}&limit=1`);
    }
  },

  emergencyGuidelines: {
    async list(params: {
      urgency?: string;
      slug?: string;
      limit?: number;
    } = {}): Promise<PaginatedResponse<any>> {
      const queryString = buildQueryString(params);
      return apiRequest(`/palliative/emergency-guidelines?${queryString}`);
    },

    async getByUrgency(urgency: string, limit = 50): Promise<PaginatedResponse<any>> {
      return apiRequest(`/palliative/emergency-guidelines?urgency=${encodeURIComponent(urgency)}&limit=${limit}`);
    },

    async getBySlug(slug: string): Promise<PaginatedResponse<any>> {
      return apiRequest(`/palliative/emergency-guidelines?slug=${encodeURIComponent(slug)}&limit=1`);
    }
  },

  calculators: {
    async list(params: {
      kind?: string;
      slug?: string;
      limit?: number;
    } = {}): Promise<PaginatedResponse<any>> {
      const queryString = buildQueryString(params);
      return apiRequest(`/palliative/calculators?${queryString}`);
    },

    async getByKind(kind: string, limit = 50): Promise<PaginatedResponse<any>> {
      return apiRequest(`/palliative/calculators?kind=${encodeURIComponent(kind)}&limit=${limit}`);
    },

    async getBySlug(slug: string): Promise<PaginatedResponse<any>> {
      return apiRequest(`/palliative/calculators?slug=${encodeURIComponent(slug)}&limit=1`);
    }
  }
};

// AI and Decision Support APIs
export const aiAPI = {
  async analyze(context: any, query: string): Promise<ApiResponse<any>> {
    return apiRequest('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ context, query })
    });
  }
};

export const decisionSupportAPI = {
  async create(input: any): Promise<ApiResponse<any>> {
    return apiRequest('/decision-support', {
      method: 'POST',
      body: JSON.stringify(input)
    });
  },

  async list(filters: {
    createdBy?: string;
    moduleType?: string;
    limit?: number;
  } = {}): Promise<PaginatedResponse<any>> {
    const queryString = buildQueryString(filters);
    return apiRequest(`/decision-support?${queryString}`);
  }
};

// Auth API
export const authAPI = {
  async getUser(): Promise<ApiResponse<any>> {
    return apiRequest('/auth/user');
  },

  async getMe(): Promise<ApiResponse<any>> {
    return apiRequest('/auth/me');
  },

  async logout(): Promise<ApiResponse<any>> {
    return apiRequest('/auth/logout', { method: 'POST' });
  }
};

// Health API
export const healthAPI = {
  async check(): Promise<ApiResponse<any>> {
    return apiRequest('/health');
  },

  async checkDatabase(): Promise<ApiResponse<any>> {
    return apiRequest('/db/health');
  }
};

// Export all APIs as a single object for convenience
export const api = {
  nccn: nccnAPI,
  clinicalProtocols: clinicalProtocolsAPI,
  cdProtocols: cdProtocolsAPI,
  treatmentProtocols: treatmentProtocolsAPI,
  medications: medicationsAPI,
  admissionCriteria: admissionCriteriaAPI,
  palliative: palliativeAPI,
  ai: aiAPI,
  decisionSupport: decisionSupportAPI,
  auth: authAPI,
  health: healthAPI
};

export default api;
