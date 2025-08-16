// WRITABLE: Emergency protocols management
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('emergency_protocols').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.emergency_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_protocols', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('emergency_protocols').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.emergency_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_protocols', 'getById'));
  }
}

export async function insert(data: Omit<Tables.emergency_protocols, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase.from('emergency_protocols').insert([data]).select().single();
    if (error) throw error;
    return result as Tables.emergency_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_protocols', 'insert'));
  }
}

export async function update(id: number, data: Partial<Omit<Tables.emergency_protocols, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: result, error } = await supabase.from('emergency_protocols').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result as Tables.emergency_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_protocols', 'update'));
  }
}

export async function remove(id: number) {
  try {
    const { error } = await supabase.from('emergency_protocols').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'emergency_protocols', 'remove'));
  }
}
