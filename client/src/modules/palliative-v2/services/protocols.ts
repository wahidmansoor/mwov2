import { supabase } from "../lib/supabaseClient";
import type { Protocol } from "../lib/types";

const SELECT_COLS =
  "slug,title,category,overview,evidence,updated,tags,red_flags,citations,steps";

function mapRow(r: any): Protocol {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    overview: r.overview,
    evidence: r.evidence,
    updated: r.updated,
    tags: r.tags ?? [],
    redFlags: r.red_flags ?? [],
    citations: r.citations ?? [],
    steps: r.steps ?? [],
  };
}

export async function fetchProtocols(): Promise<Protocol[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("palliative_symptom_protocols")
        .select(SELECT_COLS)
        .order("title", { ascending: true });
      if (error) throw error;
      return (data || []).map(mapRow);
    }
    // fallback
    const mod = await import("../data/protocols");
    return (mod.PROTOCOLS as Protocol[]);
  } catch (e) {
    console.warn("[palliative-v2] fetchProtocols failed; using local fallback", e);
    const mod = await import("../data/protocols");
    return (mod.PROTOCOLS as Protocol[]);
  }
}

export async function fetchProtocolBySlug(slug: string): Promise<Protocol | null> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("palliative_symptom_protocols")
        .select(SELECT_COLS)
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? mapRow(data) : null;
    }
    // fallback
    const mod = await import("../data/protocols");
    return (mod.PROTOCOLS as Protocol[]).find((p) => p.slug === slug) ?? null;
  } catch (e) {
    console.warn("[palliative-v2] fetchProtocolBySlug failed; using local fallback", e);
    const mod = await import("../data/protocols");
    return (mod.PROTOCOLS as Protocol[]).find((p) => p.slug === slug) ?? null;
  }
}
