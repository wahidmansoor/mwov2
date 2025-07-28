import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function OpioidConverter() {
  const [fromOpioid, setFromOpioid] = useState("");
  const [toOpioid, setToOpioid] = useState("");
  const [currentDose, setCurrentDose] = useState("");
  const [route, setRoute] = useState("");
  const [conversionResult, setConversionResult] = useState<any>(null);

  const opioids = [
    { value: "morphine-oral", label: "Morphine (Oral)", mmeFactor: 1 },
    { value: "morphine-iv", label: "Morphine (IV)", mmeFactor: 3 },
    { value: "oxycodone", label: "Oxycodone (Oral)", mmeFactor: 1.5 },
    { value: "hydromorphone-oral", label: "Hydromorphone (Oral)", mmeFactor: 4 },
    { value: "hydromorphone-iv", label: "Hydromorphone (IV)", mmeFactor: 20 },
    { value: "fentanyl-patch", label: "Fentanyl Patch (mcg/hr)", mmeFactor: 2.4 },
    { value: "methadone", label: "Methadone (Oral)", mmeFactor: 4 },
    { value: "tramadol", label: "Tramadol (Oral)", mmeFactor: 0.1 },
    { value: "codeine", label: "Codeine (Oral)", mmeFactor: 0.15 }
  ];

  const routes = [
    { value: "oral", label: "Oral" },
    { value: "iv", label: "Intravenous" },
    { value: "transdermal", label: "Transdermal" },
    { value: "sublingual", label: "Sublingual" }
  ];

  const calculateConversion = () => {
    if (!fromOpioid || !toOpioid || !currentDose) return;

    const fromOpioidData = opioids.find(o => o.value === fromOpioid);
    const toOpioidData = opioids.find(o => o.value === toOpioid);
    
    if (!fromOpioidData || !toOpioidData) return;

    const currentMME = parseFloat(currentDose) * fromOpioidData.mmeFactor;
    const newDose = currentMME / toOpioidData.mmeFactor;
    const reducedDose = newDose * 0.75; // 25% reduction for cross-tolerance

    setConversionResult({
      currentMME,
      theoreticalDose: newDose,
      recommendedDose: reducedDose,
      fromOpioid: fromOpioidData.label,
      toOpioid: toOpioidData.label
    });
  };

  const breakthroughProtocols = [
    {
      title: "Immediate Release Morphine",
      description: "10-15% of total daily dose every 2-4 hours PRN",
      indication: "Standard breakthrough pain protocol"
    },
    {
      title: "Sublingual Fentanyl",
      description: "Start 100-200 mcg, titrate based on response",
      indication: "Rapid onset breakthrough pain"
    },
    {
      title: "Transmucosal Fentanyl",
      description: "Individualized dosing, not based on around-the-clock dose",
      indication: "Incident or procedural pain"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Conversion Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Equianalgesic Dose Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Current Opioid</Label>
              <Select value={fromOpioid} onValueChange={setFromOpioid}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current opioid" />
                </SelectTrigger>
                <SelectContent>
                  {opioids.map((opioid) => (
                    <SelectItem key={opioid.value} value={opioid.value}>
                      {opioid.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Opioid</Label>
              <Select value={toOpioid} onValueChange={setToOpioid}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target opioid" />
                </SelectTrigger>
                <SelectContent>
                  {opioids.map((opioid) => (
                    <SelectItem key={opioid.value} value={opioid.value}>
                      {opioid.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Current Daily Dose (mg)</Label>
              <Input
                type="number"
                placeholder="Enter dose"
                value={currentDose}
                onChange={(e) => setCurrentDose(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateConversion} className="w-full" disabled={!fromOpioid || !toOpioid || !currentDose}>
            Calculate Conversion
          </Button>
        </CardContent>
      </Card>

      {/* Conversion Results */}
      {conversionResult && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              Conversion Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Morphine Milligram Equivalents (MME):</span>
                  <Badge variant="outline">{conversionResult.currentMME.toFixed(1)} mg/day</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Theoretical Equivalent Dose:</span>
                  <span className="text-lg font-bold">{conversionResult.theoreticalDose.toFixed(1)} mg/day</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-700 dark:text-green-300">Recommended Starting Dose:</span>
                  <span className="text-lg font-bold text-green-700 dark:text-green-300">
                    {conversionResult.recommendedDose.toFixed(1)} mg/day
                  </span>
                </div>
              </div>

              <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Safety Note:</strong> Dose reduced by 25% to account for incomplete cross-tolerance. 
                  Monitor closely and titrate based on patient response. Consider additional reduction for 
                  elderly patients or those with renal/hepatic impairment.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breakthrough Pain Protocols */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Breakthrough Pain Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-4">
            {breakthroughProtocols.map((protocol, index) => (
              <Card key={index} className="border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{protocol.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {protocol.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {protocol.indication}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Guidelines */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                NCCN 2025 Opioid Conversion Guidelines
              </h4>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p>• Always reduce calculated dose by 25-50% when switching opioids</p>
                <p>• Monitor closely for 48-72 hours after conversion</p>
                <p>• Methadone conversions require specialist consultation</p>
                <p>• Fentanyl patch conversions need careful timing considerations</p>
                <p>• Document rationale for opioid rotation in medical record</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Table Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference: Equianalgesic Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Oral Opioids (vs Morphine 30mg)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Morphine</span>
                  <span className="font-medium">30 mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Oxycodone</span>
                  <span className="font-medium">20 mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Hydromorphone</span>
                  <span className="font-medium">7.5 mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Codeine</span>
                  <span className="font-medium">200 mg</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Parenteral Opioids (vs Morphine 10mg IV)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Morphine IV</span>
                  <span className="font-medium">10 mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Hydromorphone IV</span>
                  <span className="font-medium">1.5 mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Fentanyl IV</span>
                  <span className="font-medium">100 mcg</span>
                </div>
                <div className="flex justify-between">
                  <span>Fentanyl Patch</span>
                  <span className="font-medium">25 mcg/hr</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}