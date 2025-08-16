// client/src/modules/palliative-v2/pages/tools/AntiemeticSelector.tsx
import React, { useMemo, useState } from "react";
import { Card, CardContent, Input } from "../../components/ui";

const CAUSES = ["Gastric stasis","Vestibular","Raised ICP","Bowel obstruction","Chemo-induced","Opioid-induced"] as const;
const MAP: Record<typeof CAUSES[number], string[]> = {
  "Gastric stasis":["Prokinetic (metoclopramide)","Haloperidol"],
  "Vestibular":["Antihistamine (cyclizine)","Anticholinergic (hyoscine)"],
  "Raised ICP":["Dexamethasone","Set pathway per local protocol"],
  "Bowel obstruction":["Antisecretory (octreotide)","Anticholinergic","Haloperidol"],
  "Chemo-induced":["Set protocol (5HT3, NK1, dex)"],
  "Opioid-induced":["Haloperidol","Dose review"]
};

export default function AntiemeticSelector(){
  const [q,setQ] = useState("");
  const causes = useMemo(()=>CAUSES.filter(c=>c.toLowerCase().includes(q.toLowerCase())),[q]);
  return (
    <div className="p-4 grid gap-3" data-testid="antiemetic-selector">
      <h1 className="text-xl font-semibold">Antiemetic selector (read-only)</h1>
      <Input placeholder="Filter causes…" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {causes.map(c=>(
          <Card key={c}><CardContent>
            <div className="font-medium">{c}</div>
            <ul className="list-disc pl-5 text-sm">
              {MAP[c].map((m,i)=><li key={i}>{m}</li>)}
            </ul>
          </CardContent></Card>
        ))}
      </div>
      <div className="text-xs text-slate-500">Note: Use institutional antiemetic protocols and dosing references.</div>
    </div>
  );
}
