// READ-ONLY: Treatment protocols reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  tumour_group?: string;
  protocol_code?: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('treatment_protocols')
      .select('id,protocol_code,tumour_group,protocol_name,created_at,updated_at')
      .range(offset, offset + limit - 1);

    if (filters?.tumour_group) query = query.eq('tumour_group', filters.tumour_group);
    if (filters?.protocol_code) query = query.eq('protocol_code', filters.protocol_code);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.treatment_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_protocols', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('treatment_protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.treatment_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_protocols', 'getById'));
  }
}
