// client/src/modules/palliative-v2/components/SymptomFilters.tsx
import { Input, Badge } from "./ui";
import type { Evidence } from "../lib/types";

export default function SymptomFilters({
  q, onQ, category, onCategory, evidence, onEvidence,
}: {
  q: string; onQ: (v: string) => void;
  category: string; onCategory: (v: string) => void;
  evidence: Evidence | ""; onEvidence: (v: Evidence | "") => void;
}) {
  return (
    <div className="grid sm:grid-cols-4 gap-2">
      <div className="sm:col-span-2">
        <Input placeholder="Search symptoms…" value={q} onChange={(e: any) => onQ(e.target.value)} />
      </div>
      <select
        value={category}
        onChange={(e: any) => onCategory(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
        aria-label="Category"
      >
        <option value="">All categories</option>
        <option value="Pain">Pain</option>
        <option value="Resp">Resp</option>
        <option value="Neuro">Neuro</option>
        <option value="GI">GI</option>
        <option value="Psych">Psych</option>
      </select>
      <select
        value={evidence}
        onChange={(e: any) => onEvidence(e.target.value as Evidence | "")}
        className="border rounded-md px-3 py-2 text-sm"
        aria-label="Evidence"
      >
        <option value="">All evidence</option>
        <option value="A">A (high)</option>
        <option value="B">B (moderate)</option>
        <option value="C">C (low)</option>
      </select>
      <div className="sm:col-span-4 text-xs text-slate-500 flex items-center gap-2">
        <Badge variant="outline">Read-only</Badge>
        <span>Search applies to title + overview + tags.</span>
      </div>
    </div>
  );
}
