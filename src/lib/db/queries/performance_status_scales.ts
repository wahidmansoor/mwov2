// READ-ONLY: Performance status scales reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('performance_status_scales').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.performance_status_scales[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'performance_status_scales', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('performance_status_scales').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.performance_status_scales;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'performance_status_scales', 'getById'));
  }
}
