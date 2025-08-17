import { logger } from "../utils/logger.js";
import { NotFoundError } from "../utils/errorHandler.js";
import { db } from "../db/client.js"; // Import the Supabase client
import { list as listTreatmentProtocols, getById as getTreatmentProtocolById } from '@root_lib/db/queries/treatment_protocols'; // Corrected import path with alias
import * as SupabaseTables from '@root_lib/db/types'; // Import Tables as a namespace for type safety with alias

interface Protocol {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: 'symptom' | 'emergency' | 'treatment'; // Added 'treatment' type
  summary: string;
  steps: string[];
  red_flags: string[];
  contraindications?: string[];
  medications?: Medication[];
  monitoring?: string[];
  follow_up?: string[];
  evidence_level?: string;
  source?: string;
  last_updated: string;
  created_at: string;
}

interface Medication {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  duration?: string;
  notes?: string;
  contraindications?: string[];
}

interface SearchQuery {
  q: string;
  type?: 'symptom' | 'emergency' | 'treatment' | 'all';
  category?: string;
  limit?: number;
}

interface ProtocolFilter {
  category?: string;
  type?: 'symptom' | 'emergency' | 'treatment';
}

// Helper function to map Supabase treatment protocol to local Protocol interface
const mapTreatmentProtocolToProtocol = (tp: SupabaseTables.Tables.treatment_protocols): Protocol => {
  return {
    id: tp.id,
    slug: tp.protocol_code || '', // Ensure string
    title: tp.protocol_name || '', // Ensure string
    category: tp.tumour_group || '', // Ensure string
    type: 'treatment', // Assuming all from this table are 'treatment' type
    summary: `Treatment protocol for ${tp.protocol_name || 'N/A'} in ${tp.tumour_group || 'N/A'}.`, // Placeholder
    steps: [], // Placeholder
    red_flags: [], // Placeholder
    contraindications: [], // Placeholder
    medications: [], // Placeholder
    monitoring: [], // Placeholder
    follow_up: [], // Placeholder
    evidence_level: 'N/A', // Placeholder
    source: 'Supabase treatment_protocols',
    last_updated: tp.updated_at || new Date().toISOString(),
    created_at: tp.created_at || new Date().toISOString(),
  };
};

export const protocolService = {
  getSymptomProtocol: async (slug: string): Promise<Protocol | null> => {
    logger.info({ slug }, 'Retrieving symptom protocol');
    if (!db.isAvailable()) {
      logger.warn('Supabase not available, returning mock symptom protocol');
      // Fallback to mock data if DB is not available
      return {
        id: "mock-sp-001",
        slug: slug,
        title: `Mock Symptom Protocol for ${slug}`,
        category: "mock_symptom",
        type: "symptom",
        summary: "This is a mock symptom protocol summary.",
        steps: ["Mock step 1", "Mock step 2"],
        red_flags: ["Mock red flag"],
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
    }
    try {
      const data = await listTreatmentProtocols({ filters: { protocol_code: slug } });
      if (data && data.length > 0) {
        return mapTreatmentProtocolToProtocol(data[0]);
      }
      logger.warn({ slug }, 'Symptom protocol not found in Supabase');
      return null;
    } catch (error) {
      logger.error({ error, slug }, 'Failed to retrieve symptom protocol from Supabase');
      return null;
    }
  },

  getEmergencyProtocol: async (slug: string): Promise<Protocol | null> => {
    logger.info({ slug }, 'Retrieving emergency protocol');
    if (!db.isAvailable()) {
      logger.warn('Supabase not available, returning mock emergency protocol');
      // Fallback to mock data if DB is not available
      return {
        id: "mock-ep-001",
        slug: slug,
        title: `Mock Emergency Protocol for ${slug}`,
        category: "mock_emergency",
        type: "emergency",
        summary: "This is a mock emergency protocol summary.",
        steps: ["Mock emergency step 1", "Mock emergency step 2"],
        red_flags: ["Mock emergency red flag"],
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
    }
    try {
      const data = await listTreatmentProtocols({ filters: { protocol_code: slug } });
      if (data && data.length > 0) {
        return mapTreatmentProtocolToProtocol(data[0]);
      }
      logger.warn({ slug }, 'Emergency protocol not found in Supabase');
      return null;
    } catch (error) {
      logger.error({ error, slug }, 'Failed to retrieve emergency protocol from Supabase');
      return null;
    }
  },

  searchProtocols: async ({ q, type = 'all', category, limit = 20 }: SearchQuery): Promise<Protocol[]> => {
    logger.info({ query: q, type, category, limit }, 'Searching protocols');
    if (!db.isAvailable()) {
      logger.warn('Supabase not available, returning empty array for search');
      return [];
    }
    try {
      let filters: any = {};
      if (category) filters.tumour_group = category;
      
      const allProtocols = await listTreatmentProtocols({ limit, filters });
      
      const searchTerm = q.toLowerCase();
      const results = allProtocols.filter((protocol: SupabaseTables.Tables.treatment_protocols) => {
        return (
          (protocol.protocol_name || '').toLowerCase().includes(searchTerm) ||
          (protocol.protocol_code || '').toLowerCase().includes(searchTerm) ||
          (protocol.tumour_group || '').toLowerCase().includes(searchTerm)
        );
      }).map(mapTreatmentProtocolToProtocol);
      
      // Sort by relevance (title matches first, then summary, then content)
      results.sort((a: Protocol, b: Protocol) => {
        const aTitle = a.title.toLowerCase().includes(searchTerm);
        const bTitle = b.title.toLowerCase().includes(searchTerm);
        const aCategory = a.category.toLowerCase().includes(searchTerm);
        const bCategory = b.category.toLowerCase().includes(searchTerm);
        
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        if (aCategory && !bCategory) return -1;
        if (!aCategory && bCategory) return 1;
        
        return 0;
      });
      
      return results.slice(0, limit);
    } catch (error) {
      logger.error({ error, query: q }, 'Failed to search protocols from Supabase');
      return [];
    }
  },

  getAllProtocols: async ({ category, type }: ProtocolFilter): Promise<Protocol[]> => {
    logger.info({ category, type }, 'Retrieving all protocols');
    if (!db.isAvailable()) {
      logger.warn('Supabase not available, returning empty array for all protocols');
      return [];
    }
    try {
      let filters: any = {};
      if (category) filters.tumour_group = category;
      
      const allProtocols = await listTreatmentProtocols({ filters });
      
      // Sort by category, then by title
      allProtocols.sort((a: SupabaseTables.Tables.treatment_protocols, b: SupabaseTables.Tables.treatment_protocols) => {
        if (a.tumour_group !== b.tumour_group) {
          return (a.tumour_group || '').localeCompare(b.tumour_group || '');
        }
        return (a.protocol_name || '').localeCompare(b.protocol_name || '');
      });
      
      return allProtocols.map(mapTreatmentProtocolToProtocol);
    } catch (error) {
      logger.error({ error, category, type }, 'Failed to retrieve all protocols from Supabase');
      return [];
    }
  },

  getProtocolById: async (id: string): Promise<Protocol | null> => {
    logger.info({ id }, 'Retrieving protocol by ID');
    if (!db.isAvailable()) {
      logger.warn('Supabase not available, returning null for getProtocolById');
      return null;
    }
    try {
      const data = await getTreatmentProtocolById(id);
      if (data) {
        return mapTreatmentProtocolToProtocol(data);
      }
      logger.warn({ id }, 'Protocol not found by ID in Supabase');
      return null;
    } catch (error) {
      logger.error({ error, id }, 'Failed to retrieve protocol by ID from Supabase');
      return null;
    }
  },

  getRelatedProtocols: async (protocolId: string, limit: number = 3): Promise<Protocol[]> => {
    logger.info({ protocolId, limit }, 'Finding related protocols');
    if (!db.isAvailable()) {
      logger.warn('Supabase not available, returning empty array for related protocols');
      return [];
    }
    try {
      const protocol = await protocolService.getProtocolById(protocolId);
      if (!protocol) {
        return [];
      }
      
      // For related protocols, we can fetch all and filter by tumour_group
      const allProtocols = await listTreatmentProtocols();
      
      const related = allProtocols
        .filter((p: SupabaseTables.Tables.treatment_protocols) => p.id !== protocolId && p.tumour_group === protocol.category)
        .map(mapTreatmentProtocolToProtocol)
        .slice(0, limit);
      
      return related;
    } catch (error) {
      logger.error({ error, protocolId }, 'Failed to retrieve related protocols from Supabase');
      return [];
    }
  }
};
