// READ-ONLY: Oncology medications reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  classification?: string;
  is_chemotherapy?: boolean;
  is_immunotherapy?: boolean;
  is_targeted_therapy?: boolean;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('oncology_medications')
      .select('id,name,classification,mechanism,administration,summary,is_chemotherapy,is_immunotherapy,is_targeted_therapy')
      .range(offset, offset + limit - 1);

    if (filters?.classification) query = query.eq('classification', filters.classification);
    if (filters?.is_chemotherapy !== undefined) query = query.eq('is_chemotherapy', filters.is_chemotherapy);
    if (filters?.is_immunotherapy !== undefined) query = query.eq('is_immunotherapy', filters.is_immunotherapy);
    if (filters?.is_targeted_therapy !== undefined) query = query.eq('is_targeted_therapy', filters.is_targeted_therapy);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.oncology_medications[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'oncology_medications', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('oncology_medications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.oncology_medications;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'oncology_medications', 'getById'));
  }
}
