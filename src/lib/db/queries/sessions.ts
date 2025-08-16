// WRITABLE: Sessions runtime data (note: primary key is 'sid', not 'id')
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListOptions {
  limit?: number;
  offset?: number;
}

export async function list({ limit = 50, offset = 0 }: ListOptions = {}) {
  try {
    const { data, error } = await supabaseAdmin
      .from('sessions')
      .select('sid,expire')
      .range(offset, offset + limit - 1)
      .order('expire', { ascending: false });

    if (error) throw error;
    return data as Tables.sessions[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'sessions', 'list'));
  }
}

export async function getBySid(sid: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('sessions')
      .select('*')
      .eq('sid', sid)
      .single();
    
    if (error) throw error;
    return data as Tables.sessions;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'sessions', 'getBySid'));
  }
}

export async function insert(payload: Tables.sessions) {
  try {
    const { data, error } = await supabaseAdmin
      .from('sessions')
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.sessions;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'sessions', 'insert'));
  }
}

export async function update(sid: string, patch: Partial<Omit<Tables.sessions, 'sid'>>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('sessions')
      .update(patch)
      .eq('sid', sid)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.sessions;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'sessions', 'update'));
  }
}

export async function remove(sid: string) {
  try {
    const { error } = await supabaseAdmin
      .from('sessions')
      .delete()
      .eq('sid', sid);
    
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'sessions', 'remove'));
  }
}
