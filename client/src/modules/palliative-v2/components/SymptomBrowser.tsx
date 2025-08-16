// client/src/modules/palliative-v2/components/SymptomBrowser.tsx
import React, { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, Button, Badge } from "./ui";
import SymptomFilters from "./SymptomFilters";
import { PROTOCOLS, type Protocol } from "../data/protocols";
import ProtocolRenderer from "./ProtocolRenderer";

export default function SymptomBrowser({
  mode, slug, limit, onBack,
}: {
  mode: "list" | "detail"; slug?: string; limit?: number; onBack?: () => void;
}) {
  const [, setLocation] = useLocation();

  // DETAIL VIEW
  if (mode === "detail" && slug) {
    const p = PROTOCOLS.find((x) => x.slug === slug);
    if (!p) return <div className="p-4">Not found</div>;

    const printMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("print") === "1";

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
          <div className="text-xs text-slate-500">Updated: {new Date(p.updated).toLocaleDateString()}</div>
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
              {p.tags.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          ) : null}
        </div>

        <ProtocolRenderer protocol={p} />

        {p.citations?.length ? (
          <Card>
            <CardContent className="text-xs text-slate-600">
              <div className="font-medium mb-1">Citations</div>
              <ul className="list-disc pl-5">
                {p.citations.map((c, i) => (
                  <li key={i}>{c.label}: {c.ref}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}
      </div>
    );
  }

  // LIST VIEW
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [evidence, setEvidence] = useState<"A" | "B" | "C" | "">("");

  const list = useMemo(() => {
    let arr: Protocol[] = PROTOCOLS;
    if (category) arr = arr.filter((p) => p.category === category);
    if (evidence) arr = arr.filter((p) => p.evidence === evidence);
    if (q.trim()) {
      const needle = q.toLowerCase();
      arr = arr.filter((p) => {
        const hay = (p.title + " " + p.overview + " " + (p.tags || []).join(" ")).toLowerCase();
        return hay.includes(needle);
      });
    }
    return typeof limit === "number" ? arr.slice(0, limit) : arr;
  }, [q, category, evidence, limit]);

  return (
    <div className="grid gap-3" data-testid="protocol-list">
      <SymptomFilters q={q} onQ={setQ} category={category} onCategory={setCategory} evidence={evidence} onEvidence={setEvidence} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((p) => (
          <Card key={p.slug}>
            <CardContent>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-slate-500 mb-2">{p.overview}</div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{p.category}</Badge>
                <Badge variant="outline">Ev {p.evidence}</Badge>
                <Button className="ml-auto" onClick={() => setLocation(`/palliative/symptoms/${p.slug}`)}>Open</Button>
              </div>
              {p.redFlags?.length ? (
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.redFlags.map((r, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] border border-red-200">{r}</span>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
