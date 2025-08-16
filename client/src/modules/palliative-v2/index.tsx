// client/src/modules/palliative-v2/index.tsx
import React from "react";
import { useLocation, useRoute } from "wouter";
import { Activity, AlertTriangle, Calculator, Stethoscope, Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "./components/ui";
import SymptomBrowser from "./components/SymptomBrowser";
import EmergenciesList from "./components/EmergenciesList";
import CalculatorsGrid from "./components/CalculatorsGrid";
import AssessmentsStrip from "./components/AssessmentsStrip";
import ToolsStrip from "./components/ToolsStrip";

export default function PalliativeCareV2() {
  const [, setLocation] = useLocation();
  const [isSymptoms] = useRoute("/palliative/symptoms");
  const [isSymptomDetail, paramsSym] = useRoute("/palliative/symptoms/:slug");
  const [isEmergencies] = useRoute("/palliative/emergencies");
  const [isEmergencyDetail, paramsEmg] = useRoute("/palliative/emergencies/:slug");
  const [isCalcs] = useRoute("/palliative/calculators");
  const [isCalcDetail, paramsCalc] = useRoute("/palliative/calculators/:id");

  // Route-aware rendering
  if (isSymptomDetail) {
    return <SymptomBrowser mode="detail" slug={paramsSym?.slug!} onBack={() => setLocation("/palliative/symptoms")} />;
  }
  if (isEmergencyDetail) {
    return <EmergenciesList mode="detail" slug={paramsEmg?.slug!} onBack={() => setLocation("/palliative/emergencies")} />;
  }
  if (isCalcs && isCalcDetail) {
    return <CalculatorsGrid mode="detail" id={paramsCalc?.id!} onBack={() => setLocation("/palliative/calculators")} />;
  }

  if (isSymptoms) {
    return (
      <div className="p-4 grid gap-4" data-testid="palliative-symptoms">
        <Header />
        <Card>
          <CardHeader><CardTitle><Stethoscope className="inline mr-2"/>Symptom Protocols</CardTitle></CardHeader>
          <CardContent><SymptomBrowser mode="list" /></CardContent>
        </Card>
      </div>
    );
  }

  if (isEmergencies) {
    return (
      <div className="p-4 grid gap-4" data-testid="palliative-emergencies">
        <Header />
        <Card>
          <CardHeader><CardTitle><AlertTriangle className="inline mr-2"/>Emergency Protocols</CardTitle></CardHeader>
          <CardContent><EmergenciesList mode="list" /></CardContent>
        </Card>
      </div>
    );
  }

  if (isCalcs) {
    return (
      <div className="p-4 grid gap-4" data-testid="palliative-calculators">
        <Header />
        <Card>
          <CardHeader><CardTitle><Calculator className="inline mr-2"/>Calculators</CardTitle></CardHeader>
          <CardContent><CalculatorsGrid mode="list" /></CardContent>
        </Card>
      </div>
    );
  }

  // Default: Dashboard
  return (
    <div className="p-4 grid gap-4" data-testid="palliative-dashboard-v2">
      <Header />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle><Stethoscope className="inline mr-2"/>Symptom Protocols</CardTitle></CardHeader>
          <CardContent><SymptomBrowser mode="list" limit={9} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><AlertTriangle className="inline mr-2"/>Emergencies</CardTitle></CardHeader>
          <CardContent><EmergenciesList mode="list" limit={6} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><Calculator className="inline mr-2"/>Calculators</CardTitle></CardHeader>
          <CardContent><CalculatorsGrid mode="list" limit={6} /></CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle><Activity className="inline mr-2"/>Assessments</CardTitle></CardHeader>
          <CardContent><AssessmentsStrip /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><Wrench className="inline mr-2"/>Clinical Tools</CardTitle></CardHeader>
          <CardContent><ToolsStrip /></CardContent>
        </Card>
      </div>
      <Disclaimer />
    </div>
  );
}

function Header() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold">Palliative Care</h1>
        <div className="mt-2 flex gap-2">
          <Badge variant="outline">Read-only</Badge>
          <Badge variant="outline">Offline-ready</Badge>
          <Badge variant="outline">Evidence-tagged</Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setLocation("/palliative/symptoms")}>Open Symptoms</Button>
        <Button onClick={() => setLocation("/palliative/emergencies")} variant="ghost">Open Emergencies</Button>
        <Button onClick={() => setLocation("/palliative/calculators")} variant="ghost">Open Calculators</Button>
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="text-xs text-slate-500 mt-4">
      Guidance only; not a substitute for institutional policies or clinician judgement. Verify doses and local pathways.
    </div>
  );
}
