// WRITABLE: Audit log runtime/logging data
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  user_id?: string;
  action?: string;
  resource?: string;
  sensitive_data?: boolean;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabaseAdmin
      .from('audit_log')
      .select('id,user_id,user_role,action,resource,resource_id,timestamp,sensitive_data')
      .range(offset, offset + limit - 1)
      .order('timestamp', { ascending: false });

    if (filters?.user_id) query = query.eq('user_id', filters.user_id);
    if (filters?.action) query = query.eq('action', filters.action);
    if (filters?.resource) query = query.eq('resource', filters.resource);
    if (filters?.sensitive_data !== undefined) query = query.eq('sensitive_data', filters.sensitive_data);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.audit_log[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'audit_log', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('audit_log')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.audit_log;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'audit_log', 'getById'));
  }
}

export async function insert(payload: Omit<Tables.audit_log, 'id' | 'timestamp'>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('audit_log')
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.audit_log;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'audit_log', 'insert'));
  }
}
