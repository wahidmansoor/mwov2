// READ-ONLY: Clinical decision support reference data
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('clinical_decision_support').select('id,module_type,clinical_scenario,risk_stratification,evidence_strength').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.clinical_decision_support[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'clinical_decision_support', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase.from('clinical_decision_support').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.clinical_decision_support;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'clinical_decision_support', 'getById'));
  }
}
