// client/src/modules/palliative-v2/index.tsx
// ...existing code...
import { useLocation, useRoute } from "wouter";
import {
  Activity,
  AlertTriangle,
  Calculator,
  Stethoscope,
  Wrench,
} from "lucide-react";

// Helper to allow className prop on Lucide icons
const LucideIcon = (Icon: any, props: any) => <Icon {...props} />;
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
} from "./components/ui";
import SymptomBrowser from "./components/SymptomBrowser";
import EmergenciesList from "./components/EmergenciesList";
import CalculatorsGrid from "./components/CalculatorsGrid";
import CalculatorDetail from "./components/CalculatorDetail";
import AssessmentsStrip from "./components/AssessmentsStrip";
import ToolsStrip from "./components/ToolsStrip";

export default function PalliativeCareV2() {
  const [location, setLocation] = useLocation();
  const [isSymptoms] = useRoute("/palliative/symptoms");
  const [isSymptomDetail, paramsSym] = useRoute("/palliative/symptoms/:slug");
  const [isEmergencies] = useRoute("/palliative/emergencies");
  const [isEmergencyDetail, paramsEmg] = useRoute(
    "/palliative/emergencies/:slug",
  );
  const [isCalcDetail, paramsCalc] = useRoute("/palliative/calculators/:key");

  // Check for exact calculators route
  const isCalcsExact = location === "/palliative/calculators";

  // Route-aware rendering
  if (isSymptomDetail) {
    return (
      <SymptomBrowser
        mode="detail"
        slug={paramsSym?.slug!}
        onBack={() => setLocation("/palliative/symptoms")}
      />
    );
  }
  if (isEmergencyDetail) {
    return (
      <EmergenciesList
        mode="detail"
        slug={paramsEmg?.slug!}
        onBack={() => setLocation("/palliative/emergencies")}
      />
    );
  }
  if (isCalcDetail) {
    return <CalculatorDetail key={paramsCalc?.key} />;
  }

  if (isSymptoms) {
    return (
      <div
        className="flex-1 space-y-4 p-4 md:p-8 pt-6"
        data-testid="palliative-symptoms"
      >
        <Header />
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(Stethoscope, { className: "h-5 w-5 text-blue-600" })}
              Symptom Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SymptomBrowser mode="list" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEmergencies) {
    return (
      <div
        className="flex-1 space-y-4 p-4 md:p-8 pt-6"
        data-testid="palliative-emergencies"
      >
        <Header />
        <Card className="border-l-4 border-l-red-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(AlertTriangle, { className: "h-5 w-5 text-red-600" })}
              Emergency Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmergenciesList mode="list" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCalcsExact) {
    return (
      <div
        className="flex-1 space-y-4 p-4 md:p-8 pt-6"
        data-testid="palliative-calculators"
      >
        <Header />
        <Card className="border-l-4 border-l-green-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(Calculator, { className: "h-5 w-5 text-green-600" })}
              Calculators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalculatorsGrid mode="list" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default: Dashboard
  return (
    <div
      className="flex-1 space-y-4 p-4 md:p-8 pt-6"
      data-testid="palliative-dashboard-v2"
    >
      <Header />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="md:col-span-2 border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(Stethoscope, { className: "h-5 w-5 text-blue-600" })}
              Symptom Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SymptomBrowser mode="list" limit={9} />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(AlertTriangle, { className: "h-5 w-5 text-red-600" })}
              Emergencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmergenciesList mode="list" limit={6} variant="compact" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(Calculator, { className: "h-5 w-5 text-green-600" })}
              Calculators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalculatorsGrid mode="list" limit={6} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 border-l-4 border-l-purple-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(Activity, { className: "h-5 w-5 text-purple-600" })}
              Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AssessmentsStrip />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {LucideIcon(Wrench, { className: "h-5 w-5 text-orange-600" })}
              Clinical Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ToolsStrip />
          </CardContent>
        </Card>
      </div>
      <Disclaimer />
    </div>
  );
}

function Header() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Palliative Care</h2>
        <p className="text-muted-foreground">
          Comprehensive palliative care protocols and clinical decision support
          tools
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="bg-green-50 text-green-800">
            Evidence-Based
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-800">
            Offline-ready
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-800">
            NCCN Guidelines
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setLocation("/palliative/symptoms")}>
          Open Symptoms
        </Button>
        <Button
          onClick={() => setLocation("/palliative/emergencies")}
          variant="ghost"
        >
          Open Emergencies
        </Button>
        <Button
          onClick={() => setLocation("/palliative/calculators")}
          variant="ghost"
        >
          Open Calculators
        </Button>
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="text-xs text-muted-foreground mt-4">
      Guidance only; not a substitute for institutional policies or clinician
      judgement. Verify doses and local pathways.
    </div>
  );
}
