// WRITABLE: Follow up protocols management
import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export async function list({ limit = 50, offset = 0 } = {}) {
  try {
    const { data, error } = await supabase.from('follow_up_protocols').select('*').range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Tables.follow_up_protocols[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'follow_up_protocols', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabase.from('follow_up_protocols').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.follow_up_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'follow_up_protocols', 'getById'));
  }
}

export async function insert(data: Omit<Tables.follow_up_protocols, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase.from('follow_up_protocols').insert([data]).select().single();
    if (error) throw error;
    return result as Tables.follow_up_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'follow_up_protocols', 'insert'));
  }
}

export async function update(id: number, data: Partial<Omit<Tables.follow_up_protocols, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: result, error } = await supabase.from('follow_up_protocols').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result as Tables.follow_up_protocols;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'follow_up_protocols', 'update'));
  }
}

export async function remove(id: number) {
  try {
    const { error } = await supabase.from('follow_up_protocols').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'follow_up_protocols', 'remove'));
  }
}
