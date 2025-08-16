// READ-ONLY: Drug toxicity profiles reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('drug_toxicity_profiles').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.drug_toxicity_profiles[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'drug_toxicity_profiles', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('drug_toxicity_profiles').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.drug_toxicity_profiles;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'drug_toxicity_profiles', 'getById'));
  }
}
