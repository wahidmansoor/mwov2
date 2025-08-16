// WRITABLE: Monitoring parameters management
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('monitoring_parameters').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.monitoring_parameters[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'monitoring_parameters', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('monitoring_parameters').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.monitoring_parameters;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'monitoring_parameters', 'getById'));
  }
}

export async function insert(data: Omit<Tables.monitoring_parameters, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase.from('monitoring_parameters').insert([data]).select().single();
    if (error) throw error;
    return result as Tables.monitoring_parameters;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'monitoring_parameters', 'insert'));
  }
}

export async function update(id: number, data: Partial<Omit<Tables.monitoring_parameters, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: result, error } = await supabase.from('monitoring_parameters').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result as Tables.monitoring_parameters;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'monitoring_parameters', 'update'));
  }
}

export async function remove(id: number) {
  try {
    const { error } = await supabase.from('monitoring_parameters').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'monitoring_parameters', 'remove'));
  }
}
