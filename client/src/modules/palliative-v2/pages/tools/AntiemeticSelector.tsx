// client/src/modules/palliative-v2/pages/tools/AntiemeticSelector.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Badge } from "../../components/ui";

const CAUSES = [
  "Gastric stasis",
  "Vestibular",
  "Raised ICP",
  "Bowel obstruction",
  "Chemo-induced",
  "Opioid-induced"
] as const;
const MAP: Record<typeof CAUSES[number], string[]> = {
  "Gastric stasis": ["Prokinetic (metoclopramide)", "Haloperidol"],
  "Vestibular": ["Antihistamine (cyclizine)", "Anticholinergic (hyoscine)"],
  "Raised ICP": ["Dexamethasone", "Set pathway per local protocol"],
  "Bowel obstruction": ["Antisecretory (octreotide)", "Anticholinergic", "Haloperidol"],
  "Chemo-induced": ["Set protocol (5HT3, NK1, dex)",],
  "Opioid-induced": ["Haloperidol", "Dose review"]
};

export default function AntiemeticSelector() {
  const [q, setQ] = useState("");
  const causes = CAUSES.filter(c => c.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6" data-testid="antiemetic-selector">
      <Card className="border-l-4 border-l-orange-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-orange-600 font-bold">Antiemetic Selector</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">tool</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-2">Map cause → class → example agents. Read-only. Use institutional protocols for dosing.</div>
          <Input placeholder="Filter causes…" value={q} onChange={(e: any) => setQ((e.target as HTMLInputElement).value)} aria-label="Filter causes" />
        </CardContent>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {causes.map(c => (
          <Card key={c} className="border-l-4 border-l-orange-600">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="truncate">{c}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">cause</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm">
                {MAP[c].map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Note: Use institutional antiemetic protocols and dosing references.</div>
    </div>
  );
}
