// READ-ONLY: Decision support inputs
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('decision_support_inputs').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.decision_support_inputs[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'decision_support_inputs', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('decision_support_inputs').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.decision_support_inputs;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'decision_support_inputs', 'getById'));
  }
}
