// READ-ONLY: CD protocols guidelines/reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  tumour_group?: string;
  treatment_intent?: string;
  status?: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('cd_protocols')
      .select('id,code,tumour_group,tumour_supergroup,treatment_intent,summary,version,status')
      .range(offset, offset + limit - 1);

    if (filters?.tumour_group) query = query.eq('tumour_group', filters.tumour_group);
    if (filters?.treatment_intent) query = query.eq('treatment_intent', filters.treatment_intent);
    if (filters?.status) query = query.eq('status', filters.status);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.cd_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'cd_protocols', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('cd_protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.cd_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'cd_protocols', 'getById'));
  }
}
