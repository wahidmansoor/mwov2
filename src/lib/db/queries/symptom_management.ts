// WRITABLE: Symptom management protocols
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('symptom_management').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.symptom_management[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'symptom_management', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('symptom_management').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.symptom_management;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'symptom_management', 'getById'));
  }
}

export async function insert(data: Omit<Tables.symptom_management, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase.from('symptom_management').insert([data]).select().single();
    if (error) throw error;
    return result as Tables.symptom_management;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'symptom_management', 'insert'));
  }
}

export async function update(id: number, data: Partial<Omit<Tables.symptom_management, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: result, error } = await supabase.from('symptom_management').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result as Tables.symptom_management;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'symptom_management', 'update'));
  }
}

export async function remove(id: number) {
  try {
    const { error } = await supabase.from('symptom_management').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'symptom_management', 'remove'));
  }
}
