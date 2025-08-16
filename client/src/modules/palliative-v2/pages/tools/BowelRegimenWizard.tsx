// client/src/modules/palliative-v2/pages/tools/BowelRegimenWizard.tsx
import React, { useState } from "react";
import { Card, CardContent, Button } from "../../components/ui";

export default function BowelRegimenWizard(){
  const [step, setStep] = useState(1);
  const next = () => setStep(s=>Math.min(3,s+1));
  const prev = () => setStep(s=>Math.max(1,s-1));

  return (
    <div className="p-4 grid gap-3" data-testid="bowel-wizard">
      <h1 className="text-xl font-semibold">Bowel regimen (read-only)</h1>
      <Card><CardContent>
        {step===1 && <div className="text-sm">
          <div className="font-medium mb-1">Step 1 — Prevent</div>
          <ul className="list-disc pl-5">
            <li>Hydration, mobility, fiber if appropriate</li>
            <li>Start stimulant + softener with constipating meds</li>
          </ul>
        </div>}
        {step===2 && <div className="text-sm">
          <div className="font-medium mb-1">Step 2 — Treat</div>
          <ul className="list-disc pl-5">
            <li>Escalate stimulant ± osmotic</li>
            <li>Assess for impaction, obstruction</li>
          </ul>
        </div>}
        {step===3 && <div className="text-sm">
          <div className="font-medium mb-1">Step 3 — Refractory</div>
          <ul className="list-disc pl-5">
            <li>Consider per rectum options per local policy</li>
            <li>Review opioids and adjuvants</li>
          </ul>
        </div>}
      </CardContent></Card>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={prev} disabled={step===1}>Back</Button>
        <Button onClick={next} disabled={step===3}>Next</Button>
      </div>
    </div>
  );
}
