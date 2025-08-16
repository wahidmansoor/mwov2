// WRITABLE: Profiles runtime/config data
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  user_id?: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabaseAdmin
      .from('profiles')
      .select('id,name,age,theme,traits,preferences,user_id')
      .range(offset, offset + limit - 1);

    if (filters?.user_id) query = query.eq('user_id', filters.user_id);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.profiles[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'profiles', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.profiles;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'profiles', 'getById'));
  }
}

export async function insert(payload: Tables.profiles) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.profiles;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'profiles', 'insert'));
  }
}

export async function update(id: string, patch: Partial<Omit<Tables.profiles, 'id'>>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.profiles;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'profiles', 'update'));
  }
}

export async function remove(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'profiles', 'remove'));
  }
}
