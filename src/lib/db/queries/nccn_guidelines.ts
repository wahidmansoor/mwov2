// READ-ONLY: NCCN guidelines reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  category?: string;
  cancer_type?: string;
  version?: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('nccn_guidelines')
      .select('id,reference_code,title,category,cancer_type,version,release_date,evidence_level')
      .range(offset, offset + limit - 1);

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.cancer_type) query = query.eq('cancer_type', filters.cancer_type);
    if (filters?.version) query = query.eq('version', filters.version);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.nccn_guidelines[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'nccn_guidelines', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('nccn_guidelines')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.nccn_guidelines;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'nccn_guidelines', 'getById'));
  }
}
