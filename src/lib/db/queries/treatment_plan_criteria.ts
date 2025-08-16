// WRITABLE: Treatment plan criteria curated data
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  category?: string;
  cancer_specific?: string;
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
      .from('treatment_plan_criteria')
      .select('id,category,value,description,is_common,cancer_specific,is_active,evidence_level')
      .range(offset, offset + limit - 1)
      .order('sort_order', { ascending: true });

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.cancer_specific) query = query.eq('cancer_specific', filters.cancer_specific);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.treatment_plan_criteria[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_criteria', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from('treatment_plan_criteria')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.treatment_plan_criteria;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_criteria', 'getById'));
  }
}

export async function insert(payload: Omit<Tables.treatment_plan_criteria, 'id'>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('treatment_plan_criteria')
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.treatment_plan_criteria;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_criteria', 'insert'));
  }
}

export async function update(id: number, patch: Partial<Omit<Tables.treatment_plan_criteria, 'id'>>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('treatment_plan_criteria')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tables.treatment_plan_criteria;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'treatment_plan_criteria', 'update'));
  }
}
