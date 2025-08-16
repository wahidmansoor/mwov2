// Human-readable Supabase error unwrapping
import { PostgrestError } from '@supabase/supabase-js';

export function asReadableSupabaseError(e: unknown, table?: string, operation?: string): string {
  if (typeof e === 'object' && e && 'message' in e) {
    const err = e as PostgrestError;
    if (err.code === '42501' || /rls|row level security/i.test(err.message)) {
      return `RLS policy denied for table '${table}' during '${operation}'. Check Supabase policies.`;
    }
    return `Supabase error${table ? ` [${table}]` : ''}${operation ? ` (${operation})` : ''}: ${err.message}`;
  }
  return `Unknown error${table ? ` [${table}]` : ''}${operation ? ` (${operation})` : ''}: ${String(e)}`;
}
