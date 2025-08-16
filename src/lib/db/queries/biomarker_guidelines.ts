// READ-ONLY: Biomarker guidelines reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters { cancer_type?: string; testing_method?: string; }
export interface ListOptions { limit?: number; offset?: number; filters?: ListFilters; }

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase.from('biomarker_guidelines').select('id,biomarker_name,testing_method,cancer_type,evidence_level').range(offset, offset + limit - 1);
    if (filters?.cancer_type) query = query.eq('cancer_type', filters.cancer_type);
    if (filters?.testing_method) query = query.eq('testing_method', filters.testing_method);
    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.biomarker_guidelines[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'biomarker_guidelines', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase.from('biomarker_guidelines').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.biomarker_guidelines;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'biomarker_guidelines', 'getById'));
  }
}
