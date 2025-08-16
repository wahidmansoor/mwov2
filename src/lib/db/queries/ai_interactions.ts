// WRITABLE: AI interactions logging/runtime data
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  user_id?: string;
  session_id?: string;
  module_type?: string;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabaseAdmin
      .from('ai_interactions')
      .select('id,user_id,session_id,module_type,intent,confidence_score,user_feedback,created_at')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (filters?.user_id) query = query.eq('user_id', filters.user_id);
    if (filters?.session_id) query = query.eq('session_id', filters.session_id);
    if (filters?.module_type) query = query.eq('module_type', filters.module_type);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.ai_interactions[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'ai_interactions', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('ai_interactions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.ai_interactions;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'ai_interactions', 'getById'));
  }
}

export async function insert(payload: Omit<Tables.ai_interactions, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('ai_interactions')
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.ai_interactions;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'ai_interactions', 'insert'));
  }
}

export async function update(id: string, patch: Partial<Omit<Tables.ai_interactions, 'id' | 'created_at'>>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('ai_interactions')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.ai_interactions;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'ai_interactions', 'update'));
  }
}
