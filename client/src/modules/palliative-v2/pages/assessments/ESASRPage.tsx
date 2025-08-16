// client/src/modules/palliative-v2/pages/assessments/ESASRPage.tsx
import React, { useMemo } from "react";
import { Card, CardContent, Button, Input } from "../../components/ui";
import { useLocalStorage } from "../../lib/useLocalStorage";

type ScoreKey = "pain"|"tiredness"|"drowsiness"|"nausea"|"appetite"|"shortnessOfBreath"|"depression"|"anxiety"|"wellbeing"|"other";
type Scores = Record<ScoreKey, number>;
const DEFAULT: Scores = {
  pain:0,tiredness:0,drowsiness:0,nausea:0,appetite:0,shortnessOfBreath:0,
  depression:0,anxiety:0,wellbeing:0,other:0
};

export default function ESASRPage() {
  const [scores, setScores] = useLocalStorage<Scores>("esasr-scores", DEFAULT);
  const [otherLabel, setOtherLabel] = useLocalStorage<string>("esasr-other-label","Other problem");
  const total = useMemo(()=>Object.values(scores).reduce((a,b)=>a+b,0),[scores]);
  const mean = useMemo(()=>Math.round((total/10)*10)/10,[total]);
  const highestKey = useMemo(()=>{
    const entries = Object.entries(scores) as [ScoreKey,number][];
    const max = Math.max(...entries.map(([,v])=>v));
    return entries.find(([,v])=>v===max)?.[0] ?? "pain";
  },[scores]);

  const set = (k:ScoreKey, v:number) => setScores(s => ({...s, [k]: Math.min(10, Math.max(0, v))}));
  const download = (filename:string, data:any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };
  const onExport = () => {
    const exportObj = { type:"ESAS-r", scores, otherLabel, total, mean, highestKey, ts: new Date().toISOString() };
    download(`esasr-${Date.now()}.json`, exportObj);
  };

  return (
    <div className="p-4 grid gap-4" data-testid="esasr-page">
      <h1 className="text-xl font-semibold">ESAS-r Assessment</h1>
      <Card><CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map(f=>(
            <SliderRow key={f.key} label={f.label} value={scores[f.key]} onChange={v=>set(f.key, v)} />
          ))}
          <div>
            <label className="text-sm">Other label</label>
            <Input value={otherLabel} onChange={e=>setOtherLabel(e.target.value)} />
            <SliderRow label={`${otherLabel} (0–10)`} value={scores.other} onChange={v=>set("other", v)} />
          </div>
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <div className="text-sm">Total: {total} • Mean: {mean} • Highest: {labelFor(highestKey)}</div>
        <div className="flex gap-2 mt-2">
          <Button onClick={()=>window.print()}>Print</Button>
          <Button variant="ghost" onClick={onExport}>Export JSON</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}

const fields: { key: Exclude<ScoreKey,"other">; label:string }[] = [
  { key:"pain", label:"Pain" },
  { key:"tiredness", label:"Tiredness" },
  { key:"drowsiness", label:"Drowsiness" },
  { key:"nausea", label:"Nausea" },
  { key:"appetite", label:"Appetite (poor=10)" },
  { key:"shortnessOfBreath", label:"Shortness of breath" },
  { key:"depression", label:"Depression" },
  { key:"anxiety", label:"Anxiety" },
  { key:"wellbeing", label:"Well-being (worst=10)" },
];

function SliderRow({label, value, onChange}:{label:string; value:number; onChange:(v:number)=>void}) {
  return (
    <div className="grid gap-1">
      <div className="text-sm">{label}: {value}</div>
      <input type="range" min={0} max={10} value={value} onChange={e=>onChange(parseInt(e.target.value,10))}/>
    </div>
  );
}
function labelFor(k:ScoreKey) {
  const m: Record<ScoreKey,string> = {
    pain:"Pain", tiredness:"Tiredness", drowsiness:"Drowsiness", nausea:"Nausea",
    appetite:"Appetite", shortnessOfBreath:"Shortness of breath", depression:"Depression",
    anxiety:"Anxiety", wellbeing:"Well-being", other:"Other"
  }; return m[k];
}
