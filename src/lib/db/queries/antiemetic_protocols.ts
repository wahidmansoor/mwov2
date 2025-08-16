// READ-ONLY: Antiemetic protocols guidelines/reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  emetogenic_risk?: string;
  treatment_regimen?: string;
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
      .from('antiemetic_protocols')
      .select('id,protocol_name,emetogenic_risk,treatment_regimen,day_of_cycle,is_active')
      .range(offset, offset + limit - 1);

    if (filters?.emetogenic_risk) query = query.eq('emetogenic_risk', filters.emetogenic_risk);
    if (filters?.treatment_regimen) query = query.eq('treatment_regimen', filters.treatment_regimen);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.antiemetic_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'antiemetic_protocols', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('antiemetic_protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.antiemetic_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'antiemetic_protocols', 'getById'));
  }
}
