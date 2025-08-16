// WRITABLE: Treatment plan mappings with JSONB timestamp concerns
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('treatment_plan_mappings').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.treatment_plan_mappings[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_mappings', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('treatment_plan_mappings').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.treatment_plan_mappings;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_mappings', 'getById'));
  }
}

export async function insert(data: Omit<Tables.treatment_plan_mappings, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase.from('treatment_plan_mappings').insert([data]).select().single();
    if (error) throw error;
    return result as Tables.treatment_plan_mappings;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_mappings', 'insert'));
  }
}

export async function update(id: number, data: Partial<Omit<Tables.treatment_plan_mappings, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: result, error } = await supabase.from('treatment_plan_mappings').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result as Tables.treatment_plan_mappings;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_mappings', 'update'));
  }
}

export async function remove(id: number) {
  try {
    const { error } = await supabase.from('treatment_plan_mappings').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_mappings', 'remove'));
  }
}
