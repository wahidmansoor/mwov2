import { useEffect, useMemo, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCalculatorBySlugOrId, type PalliativeCalculator } from "../services/calculators";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from "./ui";

export default function CalculatorDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/palliative/calculators/:key");
  const key = params?.key ?? "";

  const { data, isLoading, isError } = useQuery<PalliativeCalculator | null>({
    queryKey: ["palliative", "calculator", key],
    queryFn: () => getCalculatorBySlugOrId(key),
    enabled: !!key
  });

  useEffect(() => { if (!match) setLocation("/palliative/calculators"); }, [match, setLocation]);

  if (isLoading) return <div className="p-4 text-sm text-muted-foreground">Loading calculator…</div>;
  if (isError || !data) {
    return (
      <div className="p-6 rounded-xl border bg-card">
        <div className="text-lg font-semibold mb-2">Calculator not found</div>
        <Button onClick={() => setLocation("/palliative/calculators")}>Back to Calculators</Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {data.title}
          <Badge variant="secondary">{data.kind}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.kind === "ecog" && <EcogRenderer config={data.config} />}
        {data.kind === "pps" && <PpsRenderer config={data.config} />}
        {data.kind === "opioid-rotation" && <OpioidRotationRenderer config={data.config} />}
        {data.kind === "custom" && <div className="text-sm text-muted-foreground">Custom calculator (not implemented)</div>}
        <div><Button variant="outline" onClick={() => setLocation("/palliative/calculators")}>Back</Button></div>
      </CardContent>
    </Card>
  );
}

/* --- Renderers --- */
function EcogRenderer({ config }: { config: any }) {
  const scale = config?.scale ?? [
    { score: 0, label: "Fully active; no restrictions" },
    { score: 1, label: "Restricted in strenuous activity; ambulatory and able to do light work" },
    { score: 2, label: "Ambulatory; self-care; up >50% of day; unable to work" },
    { score: 3, label: "Limited self care; bed/chair >50% of waking hours" },
    { score: 4, label: "Completely disabled; totally confined" },
    { score: 5, label: "Dead" }
  ];
  const [val, setVal] = useState<number | null>(null);
  const hint = useMemo(() => {
    if (val === null) return "";
    if (val <= 1) return "Good performance; consider disease-directed options if goals align.";
    if (val === 2) return "Intermediate; prioritize symptom control ± selective disease options.";
    return "Poor performance; prioritize comfort and palliative measures.";
  }, [val]);
  return (
    <div>
      <div className="mb-3 font-medium">Choose ECOG score:</div>
      <div className="space-y-2">
        {scale.map((row: any) => (
          <label key={row.score} className="flex items-start gap-3">
            <input type="radio" name="ecog" value={row.score} onChange={() => setVal(row.score)} className="mt-1" />
            <span><b>{row.score}</b> — {row.label}</span>
          </label>
        ))}
      </div>
      {val !== null && <div className="mt-4 p-3 rounded-lg bg-muted text-sm">Selected: ECOG {val}. {hint}</div>}
    </div>
  );
}

function PpsRenderer({ config }: { config: any }) {
  const columns: number[] = config?.columns ?? [100,90,80,70,60,50,40,30,20,10,0];
  const [pps, setPps] = useState<number | null>(null);
  const advise = useMemo(() => {
    if (pps === null) return "";
    if (pps >= 60) return "Likely community living; consider disease management and rehab if goals align.";
    if (pps >= 40) return "Consider home supports or inpatient palliative unit.";
    return "Advanced phase; prioritize comfort and anticipatory medications.";
  }, [pps]);
  return (
    <div>
      <div className="mb-3 font-medium">Select PPS percentage that best fits overall:</div>
      <div className="flex flex-wrap gap-2">
        {columns.map((col) => (
          <Button key={col} variant={pps === col ? "default" : "outline"} onClick={() => setPps(col)}>
            {col}%
          </Button>
        ))}
      </div>
      {pps !== null && <div className="mt-4 p-3 rounded-lg bg-muted text-sm">Selected: PPS {pps}%. {advise}</div>}
    </div>
  );
}

function OpioidRotationRenderer({ config }: { config: any }) {
  const drugs = config?.drugs ?? [
    { name: "Morphine oral", routes: ["PO"], ome_factor: 1.0 },
    { name: "Morphine IV/SC", routes: ["IV","SC"], ome_factor: 3.0 },
    { name: "Oxycodone oral", routes: ["PO"], ome_factor: 1.5 },
    { name: "Hydromorphone oral", routes: ["PO"], ome_factor: 4.0 },
    { name: "Hydromorphone IV/SC", routes: ["IV","SC"], ome_factor: 20.0 }
  ];
  const defaultReduce = config?.cross_tolerance?.default_reduce_percent ?? 33;

  const [from, setFrom] = useState(drugs[0]?.name ?? "");
  const [to, setTo] = useState(drugs[0]?.name ?? "");
  const [dose, setDose] = useState<number>(0);

  const fromFactor = drugs.find(d => d.name === from)?.ome_factor ?? 1.0;
  const toFactor = drugs.find(d => d.name === to)?.ome_factor ?? 1.0;

  const omePerDay = dose * fromFactor;
  const suggestedNew = (omePerDay / toFactor) * (1 - defaultReduce / 100);

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <div className="text-sm mb-1">From opioid</div>
          <select className="w-full border rounded-md p-2" value={from} onChange={e => setFrom(e.target.value)}>
            {drugs.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <div className="text-sm mb-1">To opioid</div>
          <select className="w-full border rounded-md p-2" value={to} onChange={e => setTo(e.target.value)}>
            {drugs.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <div className="text-sm mb-1">Current total daily dose</div>
          <Input type="number" min={0} value={dose} onChange={e => setDose(parseFloat(e.target.value) || 0)} />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-muted text-sm space-y-1">
        <div><b>OME/day:</b> {Number.isFinite(omePerDay) ? omePerDay.toFixed(1) : "-"}</div>
        <div><b>Suggested starting dose (after {defaultReduce}% reduction):</b> {Number.isFinite(suggestedNew) ? suggestedNew.toFixed(1) : "-"}</div>
        <div className="text-muted-foreground">This is a guide only—use clinical judgment and titrate to effect.</div>
      </div>
    </div>
  );
}
