// WRITABLE: Challenges runtime data (note: primary key is integer 'id')
import { supabaseAdmin } from '../../supabaseClient';
import { Tables } from '../types';
import { asReadableSupabaseError } from '../errors';

export interface ListFilters { profileid?: string; challengenumber?: number; }
export interface ListOptions { limit?: number; offset?: number; filters?: ListFilters; }

export async function list({ limit = 50, offset = 0, filters }: ListOptions = {}) {
  try {
    let query = supabaseAdmin.from('challenges').select('id,profileid,challengenumber,startedat,completedat,totaltasks,completedtasks').range(offset, offset + limit - 1);
    if (filters?.profileid) query = query.eq('profileid', filters.profileid);
    if (filters?.challengenumber !== undefined) query = query.eq('challengenumber', filters.challengenumber);
    const { data, error } = await query;
    if (error) throw error;
    return data as Tables.challenges[];
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'challenges', 'list'));
  }
}

export async function getById(id: number) {
  try {
    const { data, error } = await supabaseAdmin.from('challenges').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Tables.challenges;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'challenges', 'getById'));
  }
}

export async function insert(payload: Omit<Tables.challenges, 'id'>) {
  try {
    const { data, error } = await supabaseAdmin.from('challenges').insert(payload).select().single();
    if (error) throw error;
    return data as Tables.challenges;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'challenges', 'insert'));
  }
}

export async function update(id: number, patch: Partial<Omit<Tables.challenges, 'id'>>) {
  try {
    const { data, error } = await supabaseAdmin.from('challenges').update(patch).eq('id', id).select().single();
    if (error) throw error;
    return data as Tables.challenges;
  } catch (e) {
    throw new Error(asReadableSupabaseError(e, 'challenges', 'update'));
  }
}
