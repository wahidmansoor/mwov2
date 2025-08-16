// client/src/modules/palliative-v2/components/CalculatorsGrid.tsx
import React from "react";
import { useLocation } from "wouter";
import { CALCULATORS } from "../data/calculators";
import { Card, CardContent, Button } from "./ui";

export default function CalculatorsGrid({ mode, id, limit, onBack }:{
  mode:"list"|"detail"; id?:string; limit?:number; onBack?:()=>void;
}) {
  const [, setLocation] = useLocation();

  if (mode==="detail" && id) {
    const c = CALCULATORS.find(x=>x.id===id);
    if (!c) return <div className="p-4">Not found</div>;
    return (
      <div className="p-4 grid gap-3">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <h2 className="text-xl font-semibold">{c.title}</h2>
        <p className="text-sm">{c.summary}</p>
        <div className="text-sm text-slate-500">This is a placeholder; calculators are read-only helpers.</div>
      </div>
    );
  }

  const list = typeof limit==="number" ? CALCULATORS.slice(0,limit) : CALCULATORS;
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {list.map(c=>(
        <Card key={c.id}><CardContent>
          <div className="font-medium">{c.title}</div>
          <div className="text-xs text-slate-500 mb-2">{c.summary}</div>
          <Button className="ml-auto" onClick={()=>setLocation(`/palliative/calculators/${c.id}`)}>Open</Button>
        </CardContent></Card>
      ))}
    </div>
  );
}
