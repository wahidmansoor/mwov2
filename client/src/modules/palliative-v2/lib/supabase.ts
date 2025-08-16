// client/src/modules/palliative-v2/lib/supabase.ts
export function getSupabase(){
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null; // demo/offline mode
  // Lazy import to avoid bundling if unused
  // @ts-ignore
  return import("@supabase/supabase-js").then(({ createClient }) => createClient(url, key));
}
