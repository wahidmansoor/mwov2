// READ-ONLY: Emergency scenarios reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('emergency_scenarios').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.emergency_scenarios[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_scenarios', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('emergency_scenarios').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.emergency_scenarios;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_scenarios', 'getById'));
  }
}
