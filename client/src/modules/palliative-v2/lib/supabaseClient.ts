import { createClient } from "@supabase/supabase-js";

/** Works with both Next.js (NEXT_PUBLIC_*) and Vite (VITE_*) */
function readEnv(name: string): string | undefined {
  // Vite style - direct access
  const viteKey = `VITE_${name}`;
  if (import.meta.env && import.meta.env[viteKey]) {
    return import.meta.env[viteKey];
  }
  
  // Next.js style
  if (typeof process !== "undefined") {
    const nextVal = (process.env as any)?.[`NEXT_PUBLIC_${name}`];
    if (nextVal) return nextVal;
  }
  
  // Window override for demos
  const winVal = (globalThis as any)?.[name];
  return winVal;
}

const url = readEnv("SUPABASE_URL");
const anon = readEnv("SUPABASE_ANON_KEY");

export const supabase = url && anon
  ? createClient(url, anon, { auth: { persistSession: false } })
  : null;

if (!supabase) {
  console.warn("[palliative-v2] Supabase env not found. Falling back to local data.");
}
