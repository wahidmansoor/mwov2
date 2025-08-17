// client/src/modules/palliative-v2/pages/tools/BowelRegimenWizard.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "../../components/ui";

const STEPS = [
  {
    title: "Prevent",
    bullets: [
      "Hydration, mobility, fiber if appropriate",
      "Start stimulant + softener with constipating meds"
    ],
    tips: ["Assess risk factors early."]
  },
  {
    title: "Treat",
    bullets: [
      "Escalate stimulant ± osmotic",
      "Assess for impaction, obstruction"
    ],
    tips: ["Check for impaction before escalation."]
  },
  {
    title: "Refractory",
    bullets: [
      "Consider per rectum options per local policy",
      "Review opioids and adjuvants"
    ],
    tips: ["Consult local guidelines for PR options."]
  }
];

export default function BowelRegimenWizard() {
  const [step, setStep] = useState(0);
  const next = () => setStep(s => Math.min(2, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));
  const current = STEPS[step];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6" data-testid="bowel-wizard">
      <Card className="border-l-4 border-l-orange-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-orange-600 font-bold">Bowel Regimen</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">tool</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-2">Step-wise regimen for prevention and treatment. Read-only. Verify local policies and dosing.</div>
        </CardContent>
      </Card>
      <div className="flex items-center gap-2 justify-center mb-2">
        {STEPS.map((s, i) => (
          <span key={s.title} aria-current={i === step} className={`rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 ${i === step ? "border-orange-600 bg-orange-50 text-orange-700" : "border-gray-300 bg-white text-gray-400"}`}>{i + 1}</span>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Step {step + 1} — {current.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm">
                {current.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-orange-50 border-l-4 border-l-orange-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-orange-700">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-xs">
                {current.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={prev} disabled={step === 0} aria-disabled={step === 0}>Back</Button>
        <Button onClick={next} disabled={step === 2} aria-disabled={step === 2}>Next</Button>
      </div>
      <div className="text-xs text-muted-foreground">Verify local policies and dosing.</div>
    </div>
  );
}
