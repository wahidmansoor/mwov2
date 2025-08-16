// WRITABLE: Pain management protocols
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('pain_management_protocols').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.pain_management_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'pain_management_protocols', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('pain_management_protocols').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.pain_management_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'pain_management_protocols', 'getById'));
  }
}

export async function insert(data: Omit<Tables.pain_management_protocols, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase.from('pain_management_protocols').insert([data]).select().single();
    if (error) throw error;
    return result as Tables.pain_management_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'pain_management_protocols', 'insert'));
  }
}

export async function update(id: number, data: Partial<Omit<Tables.pain_management_protocols, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: result, error } = await supabase.from('pain_management_protocols').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result as Tables.pain_management_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'pain_management_protocols', 'update'));
  }
}

export async function remove(id: number) {
  try {
    const { error } = await supabase.from('pain_management_protocols').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'pain_management_protocols', 'remove'));
  }
}
