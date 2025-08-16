// READ-ONLY: Admission criteria guidelines/reference data
// This table contains guideline reference data and should not be modified via app operations

import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  cancer_type?: string;
  admission_type?: string;
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
      .from('admission_criteria')
      .select('id,criteria_name,cancer_type,admission_type,priority,estimated_los,is_active,evidence_level,nccn_reference')
      .range(offset, offset + limit - 1);

    if (filters?.cancer_type) {
      query = query.eq('cancer_type', filters.cancer_type);
    }
    if (filters?.admission_type) {
      query = query.eq('admission_type', filters.admission_type);
    }
    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.admission_criteria[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'admission_criteria', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('admission_criteria')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.admission_criteria;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'admission_criteria', 'getById'));
  }
}
