import { supabase } from "../lib/supabaseClient";

export type CalculatorKind = "pps" | "ecog" | "opioid-rotation" | "custom";

export type PalliativeCalculator = {
  id: string;
  slug: string;
  title: string;
  kind: CalculatorKind;
  config: Record<string, unknown>;
  created_at: string | null;
};

function mapRow(r: any): PalliativeCalculator {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    kind: r.kind,
    config: r.config ?? {},
    created_at: r.created_at ?? null,
  };
}

/** Fetch all calculators (ordered by title ASC). */
export async function fetchCalculators(): Promise<PalliativeCalculator[]> {
  try {
    if (!supabase) throw new Error("supabase-not-configured");
    const { data, error } = await supabase
      .from("palliative_calculators")
      .select("id, slug, title, kind, config, created_at")
      .order("title", { ascending: true });

    if (error) throw error;

    // If Supabase returns no data, use the local fallback
    if (!data || data.length === 0) {
      throw new Error("empty-data-from-supabase");
    }

    return (data ?? []).map(mapRow);
  } catch (e) {
    // Optional: very light fallback to local stubs (titles only)
    try {
      const mod = await import("../data/calculators");
      const fallback = (mod.CALCULATORS as Array<{ id: string; title: string }>);
      return fallback.map((c) =>
        ({
          id: c.id,
          slug: c.id,
          title: c.title,
          kind: "custom",
          config: {},
          created_at: null,
        } as PalliativeCalculator)
      );
    } catch {
      // If even local fallback is unavailable, return empty
      return [];
    }
  }
}

/** Fetch a single calculator by slug. Returns null if not found. */
export async function fetchCalculatorBySlug(
  slug: string
): Promise<PalliativeCalculator | null> {
  try {
    if (!supabase) throw new Error("supabase-not-configured");
    const { data, error } = await supabase
      .from("palliative_calculators")
      .select("id, slug, title, kind, config, created_at")
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data ? mapRow(data) : null;
  } catch (e) {
    // Fallback: map from local list if present
    try {
      const mod = await import("../data/calculators");
      const list = mod.CALCULATORS as Array<{ id: string; title: string }>;
      const hit = list.find((c) => c.id === slug);
      return hit
        ? ({
            id: hit.id,
            slug: hit.id,
            title: hit.title,
            kind: "custom",
            config: {},
            created_at: null,
          } as PalliativeCalculator)
        : null;
    } catch {
      return null;
    }
  }
}
