// READ-ONLY: Antibiotic protocols guidelines/reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  indication?: string;
  neutropenia_grade?: string;
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
      .from('antibiotic_protocols')
      .select('id,protocol_name,indication,patient_population,neutropenia_grade,duration,is_active')
      .range(offset, offset + limit - 1);

    if (filters?.indication) query = query.eq('indication', filters.indication);
    if (filters?.neutropenia_grade) query = query.eq('neutropenia_grade', filters.neutropenia_grade);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.antibiotic_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'antibiotic_protocols', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('antibiotic_protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.antibiotic_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'antibiotic_protocols', 'getById'));
  }
}
