// client/src/modules/palliative-v2/components/SymptomBrowser.tsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, Button, Badge } from "./ui";
import SymptomFilters from "./SymptomFilters";
import ProtocolRenderer from "./ProtocolRenderer";
import type { Evidence, Protocol } from "../lib/types";
import { fetchProtocols, fetchProtocolBySlug } from "../services/protocols";

export default function SymptomBrowser({
  mode, slug, limit, onBack,
}: {
  mode: "list" | "detail"; slug?: string; limit?: number; onBack?: () => void;
}) {
  const [, setLocation] = useLocation();

  const [rows, setRows] = useState<Protocol[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (mode === "detail" && slug) {
        const one = await fetchProtocolBySlug(slug);
        if (!cancelled) setRows(one ? [one] : []);
        return;
      }
      const list = await fetchProtocols();
      if (!cancelled) setRows(list);
    })();
    return () => { cancelled = true; };
  }, [mode, slug]);

  // DETAIL
  if (mode === "detail" && slug) {
    const p = (rows || []).find((x) => x.slug === slug);
    if (!p) return <div className="p-4">Not found</div>;
    const printMode =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("print") === "1";

    return (
      <div className="p-4 grid gap-4" data-testid="protocol-detail">
        {!printMode && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onBack}>← Back</Button>
            <Button variant="ghost" onClick={() => setLocation(`/palliative/symptoms/${slug}?print=1`)}>Print view</Button>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold">
            {p.title} <Badge variant="outline">Ev {p.evidence}</Badge>
          </h2>
          <div className="text-xs text-slate-500">
            Updated: {new Date(p.updated).toLocaleDateString()}
          </div>
          <p className="text-sm mt-2">{p.overview}</p>
          {p.redFlags?.length ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {p.redFlags.map((r, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs border border-red-200">{r}</span>
              ))}
            </div>
          ) : null}
          {p.tags?.length ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {p.tags.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
            </div>
          ) : null}
        </div>

        <ProtocolRenderer protocol={p} />
        {p.citations?.length ? (
          <Card><CardContent className="text-xs text-slate-600">
            <div className="font-medium mb-1">Citations</div>
            <ul className="list-disc pl-5">
              {p.citations.map((c, i) => <li key={i}>{c.label}: {c.ref}</li>)}
            </ul>
          </CardContent></Card>
        ) : null}
      </div>
    );
  }

  // LIST
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [evidence, setEvidence] = useState<Evidence | "">("");

  // Filter protocols
  let list: Protocol[] = rows || [];
  if (category) list = list.filter((p) => p.category === category);
  if (evidence) list = list.filter((p) => p.evidence === evidence);
  if (q.trim()) {
    const needle = q.toLowerCase();
    list = list.filter((p) =>
      (p.title + " " + p.overview + " " + (p.tags || []).join(" ")).toLowerCase().includes(needle)
    );
  }
  if (typeof limit === "number") list = list.slice(0, limit);

  if (!rows) return <div className="p-4 text-sm text-slate-500">Loading…</div>;

  return (
    <div className="grid gap-3" data-testid="protocol-list">
      <SymptomFilters q={q} onQ={setQ} category={category} onCategory={setCategory} evidence={evidence} onEvidence={setEvidence} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {list.map((p) => (
          <Card 
            key={p.slug} 
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setLocation(`/palliative/symptoms/${p.slug}`)}
          >
            <CardContent className="p-3">
              <div className="text-sm font-medium text-center leading-tight">{p.title}</div>
              <div className="flex justify-center mt-1">
                <Badge variant="outline" className="text-xs">{p.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
