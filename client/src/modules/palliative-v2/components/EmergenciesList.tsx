// client/src/modules/palliative-v2/components/EmergenciesList.tsx
import React from "react";
import { useLocation } from "wouter";
import { EMERGENCIES } from "../data/emergencies";
import { Card, CardContent, Button, Badge } from "./ui";

export default function EmergenciesList({ mode, slug, limit, onBack }:{
  mode:"list"|"detail"; slug?:string; limit?:number; onBack?:()=>void;
}) {
  const [, setLocation] = useLocation();

  if (mode==="detail" && slug) {
    const e = EMERGENCIES.find(x => x.slug===slug);
    if (!e) return <div className="p-4">Not found</div>;
    return (
      <div className="p-4 grid gap-3">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <h2 className="text-xl font-semibold">{e.title} <Badge variant="outline">Ev {e.evidence}</Badge></h2>
        <p className="text-sm">{e.overview}</p>
        <Card><CardContent>
          <ol className="list-decimal pl-5 space-y-1">{e.actions.map((a,i)=><li key={i}>{a}</li>)}</ol>
        </CardContent></Card>
        <div className="flex gap-2">
          <Button onClick={()=>window.print()}>Print</Button>
        </div>
      </div>
    );
  }

  const list = typeof limit==="number" ? EMERGENCIES.slice(0, limit) : EMERGENCIES;
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {list.map(e => (
        <Card key={e.slug}><CardContent>
          <div className="font-medium">{e.title}</div>
          <div className="text-xs text-slate-500 mb-2">{e.overview}</div>
          <div className="flex gap-2">
            <Badge variant="outline">Ev {e.evidence}</Badge>
            <Button className="ml-auto" onClick={()=>setLocation(`/palliative/emergencies/${e.slug}`)}>Open</Button>
          </div>
        </CardContent></Card>
      ))}
    </div>
  );
}
