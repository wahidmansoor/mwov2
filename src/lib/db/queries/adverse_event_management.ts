// READ-ONLY: Adverse event management guidelines/reference data  
// This table contains guideline reference data and should not be modified via app operations

import { supabase } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters {
  adverse_event_id?: string;
  grade?: number;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  filters?: ListFilters;
}

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabase
      .from('adverse_event_management')
      .select('id,adverse_event_id,grade,nccn_reference,evidence_level')
      .range(offset, offset + limit - 1);

    if (filters?.adverse_event_id) {
      query = query.eq('adverse_event_id', filters.adverse_event_id);
    }
    if (filters?.grade !== undefined) {
      query = query.eq('grade', filters.grade);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.adverse_event_management[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'adverse_event_management', 'list'));
  }
}

export async function getById(id: string) {
  try {
    const { data, error } = await supabase
      .from('adverse_event_management')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tables.adverse_event_management;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'adverse_event_management', 'getById'));
  }
}
