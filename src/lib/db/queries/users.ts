// WRITABLE: Users runtime/config data
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  role?: string;
  department?: string;
  is_active?: boolean;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabaseAdmin
      .from('users')
      .select('id,email,first_name,last_name,role,department,is_active,created_at')
      .range(offset, offset + limit - 1);

    if (filters?.role) query = query.eq('role', filters.role);
    if (filters?.department) query = query.eq('department', filters.department);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.users[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'users', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.users;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'users', 'getById'));
  }
}

export async function insert(payload: Omit<Tables.users, 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.users;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'users', 'insert'));
  }
}

export async function update(id: string, patch: Partial<Omit<Tables.users, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.users;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'users', 'update'));
  }
}
