// READ-ONLY: Adverse events guidelines/reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  category?: string;
  grade?: number;
  ctcae_version?: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('adverse_events')
      .select('id,event_name,category,grade,description,ctcae_code,ctcae_version')
      .range(offset, offset + limit - 1);

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.grade !== undefined) query = query.eq('grade', filters.grade);
    if (filters?.ctcae_version) query = query.eq('ctcae_version', filters.ctcae_version);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.adverse_events[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'adverse_events', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('adverse_events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.adverse_events;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'adverse_events', 'getById'));
  }
}
