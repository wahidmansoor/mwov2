// client/src/modules/palliative-v2/pages/assessments/FourATPage.tsx
import React, { useMemo, useState } from "react";
import { Card, CardContent, Button } from "../../components/ui";

export default function FourATPage(){
  const [alertness, setA] = useState<0|4>(0);
  const [amt4, setB] = useState<0|1|2>(0);
  const [attention, setC] = useState<0|1|2>(0);
  const [acute, setD] = useState<0|4>(0);

  const total = useMemo(()=>alertness + amt4 + attention + acute, [alertness,amt4,attention,acute]);
  const interp = total>=4 ? "Possible delirium" : total>=1 ? "Possible cognitive impairment" : "Delirium unlikely (screen)";

  const onExport = () => {
    const exportObj = { type:"4AT", alertness, amt4, attention, acute, total, interp, ts: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportObj,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob); const a=document.createElement("a");
    a.href=url; a.download=`4at-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 grid gap-4" data-testid="fourat-page">
      <h1 className="text-xl font-semibold">4AT Delirium Screen</h1>
      <Card><CardContent className="grid gap-3">
        <RadioRow label="A. Alertness (0 normal, 4 clearly abnormal)" opts={[{v:0,l:"0"},{v:4,l:"4"}]} value={alertness} onChange={v=>setA(v as 0|4)}/>
        <RadioRow label="B. AMT4 (0 none/1 one error/2 two+ or untestable)" opts={[{v:0,l:"0"},{v:1,l:"1"},{v:2,l:"2"}]} value={amt4} onChange={v=>setB(v as 0|1|2)}/>
        <RadioRow label="C. Attention (0 normal / 1 partial / 2 none or untestable)" opts={[{v:0,l:"0"},{v:1,l:"1"},{v:2,l:"2"}]} value={attention} onChange={v=>setC(v as 0|1|2)}/>
        <RadioRow label="D. Acute change or fluctuating course (0 no / 4 yes)" opts={[{v:0,l:"0"},{v:4,l:"4"}]} value={acute} onChange={v=>setD(v as 0|4)}/>
      </CardContent></Card>

      <Card><CardContent className="flex items-center gap-3">
        <div className="text-sm">Total: {total} — <span className="font-medium">{interp}</span></div>
        <Button onClick={()=>window.print()}>Print</Button>
        <Button variant="ghost" onClick={onExport}>Export JSON</Button>
      </CardContent></Card>
    </div>
  );
}

function RadioRow({label, opts, value, onChange}:{label:string; opts:{v:number; l:string}[]; value:number; onChange:(v:number)=>void}) {
  return (
    <div className="text-sm">
      <div className="mb-1">{label}</div>
      <div className="flex gap-3">
        {opts.map(o=>(
          <label key={o.v} className="flex items-center gap-1">
            <input type="radio" checked={value===o.v} onChange={()=>onChange(o.v)} /> {o.l}
          </label>
        ))}
      </div>
    </div>
  );
}
