// READ-ONLY: Supportive care protocols reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  category?: string;
  cancer_type?: string;
  treatment_phase?: string;
  is_active?: boolean;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('supportive_care_protocols')
      .select('id,protocol_name,category,indication,cancer_type,treatment_phase,patient_population,is_active')
      .range(offset, offset + limit - 1);

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.cancer_type) query = query.eq('cancer_type', filters.cancer_type);
    if (filters?.treatment_phase) query = query.eq('treatment_phase', filters.treatment_phase);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.supportive_care_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'supportive_care_protocols', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('supportive_care_protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.supportive_care_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'supportive_care_protocols', 'getById'));
  }
}
