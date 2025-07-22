import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Activity, AlertCircle, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalculatorResult {
  value: number | string;
  interpretation: string;
  evidenceLevel: string;
  reference: string;
  recommendations?: string[];
}

export default function ClinicalCalculatorsWidget() {
  const [activeCalculator, setActiveCalculator] = useState<string>("bsa");
  const [results, setResults] = useState<CalculatorResult | null>(null);
  
  // BSA Calculator
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  
  // Carboplatin AUC Calculator
  const [creatinine, setCreatinine] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [targetAUC, setTargetAUC] = useState<string>("5");
  
  // Creatinine Clearance Calculator
  const [gender, setGender] = useState<string>("male");

  const calculateBSA = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w || h <= 0 || w <= 0) {
      setResults({
        value: "Invalid Input",
        interpretation: "Please enter valid height and weight values",
        evidenceLevel: "N/A",
        reference: "N/A"
      });
      return;
    }
    
    // Mosteller formula: BSA = √((height × weight) / 3600)
    const bsa = Math.sqrt((h * w) / 3600);
    
    setResults({
      value: `${bsa.toFixed(2)} m²`,
      interpretation: bsa < 1.5 ? "Below average BSA" : bsa > 2.5 ? "Above average BSA" : "Normal BSA range",
      evidenceLevel: "Standard Formula",
      reference: "Mosteller Formula (1987)",
      recommendations: [
        "Most commonly used formula for chemotherapy dosing",
        "Consider dose capping at BSA 2.0 m² for some protocols",
        "Verify with institutional guidelines for specific regimens"
      ]
    });
  };

  const calculateCarboplatinDose = () => {
    const cr = parseFloat(creatinine);
    const ageNum = parseFloat(age);
    const auc = parseFloat(targetAUC);
    
    if (!cr || !ageNum || !auc || cr <= 0 || ageNum <= 0 || auc <= 0) {
      setResults({
        value: "Invalid Input",
        interpretation: "Please enter valid creatinine, age, and target AUC values",
        evidenceLevel: "N/A",
        reference: "N/A"
      });
      return;
    }
    
    // Calvert Formula: Dose = AUC × (GFR + 25)
    // Cockcroft-Gault for GFR estimation
    const genderMultiplier = gender === "female" ? 0.85 : 1.0;
    const gfr = ((140 - ageNum) * 70 * genderMultiplier) / (72 * cr); // Assuming 70kg average weight
    const dose = auc * (gfr + 25);
    
    setResults({
      value: `${Math.round(dose)} mg`,
      interpretation: `Estimated GFR: ${gfr.toFixed(1)} mL/min`,
      evidenceLevel: "Category 1",
      reference: "Calvert Formula (NCCN Guidelines)",
      recommendations: [
        "Verify actual body weight for more accurate GFR calculation",
        "Consider dose modifications based on prior toxicity",
        "Monitor renal function during treatment",
        "Maximum single dose typically 800-1000mg"
      ]
    });
  };

  const calculateCreatinineClearance = () => {
    const cr = parseFloat(creatinine);
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    
    if (!cr || !ageNum || !weightNum || cr <= 0 || ageNum <= 0 || weightNum <= 0) {
      setResults({
        value: "Invalid Input",
        interpretation: "Please enter valid creatinine, age, and weight values",
        evidenceLevel: "N/A",
        reference: "N/A"
      });
      return;
    }
    
    // Cockcroft-Gault Formula
    const genderMultiplier = gender === "female" ? 0.85 : 1.0;
    const clcr = ((140 - ageNum) * weightNum * genderMultiplier) / (72 * cr);
    
    let interpretation = "";
    if (clcr >= 90) interpretation = "Normal kidney function";
    else if (clcr >= 60) interpretation = "Mild decrease in kidney function";
    else if (clcr >= 30) interpretation = "Moderate decrease in kidney function";
    else if (clcr >= 15) interpretation = "Severe decrease in kidney function";
    else interpretation = "Kidney failure";
    
    setResults({
      value: `${clcr.toFixed(1)} mL/min`,
      interpretation,
      evidenceLevel: "Standard Formula",
      reference: "Cockcroft-Gault Equation",
      recommendations: [
        clcr < 60 ? "Consider dose modifications for renally-cleared drugs" : "No dose adjustment typically needed",
        clcr < 30 ? "Nephrology consultation recommended" : "Monitor renal function regularly",
        "Consider cystatin C or 24-hour urine collection for more accurate assessment"
      ]
    });
  };

  const renderCalculatorForm = () => {
    switch (activeCalculator) {
      case "bsa":
        return (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Height (cm)</label>
              <Input
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Weight (kg)</label>
              <Input
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button onClick={calculateBSA} className="w-full">
              Calculate BSA
            </Button>
          </div>
        );
      
      case "carboplatin":
        return (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Serum Creatinine (mg/dL)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="1.0"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Age (years)</label>
              <Input
                type="number"
                placeholder="65"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Target AUC</label>
              <Select value={targetAUC} onValueChange={setTargetAUC}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">AUC 4 (Low intensity)</SelectItem>
                  <SelectItem value="5">AUC 5 (Standard)</SelectItem>
                  <SelectItem value="6">AUC 6 (High intensity)</SelectItem>
                  <SelectItem value="7">AUC 7 (Very high intensity)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateCarboplatinDose} className="w-full">
              Calculate Carboplatin Dose
            </Button>
          </div>
        );
      
      case "creatinine":
        return (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Serum Creatinine (mg/dL)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="1.0"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Age (years)</label>
              <Input
                type="number"
                placeholder="65"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Weight (kg)</label>
              <Input
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateCreatinineClearance} className="w-full">
              Calculate Creatinine Clearance
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-green-600" />
          Clinical Calculators
          <Badge variant="secondary" className="ml-auto">
            Evidence-Based
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calculator Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Select Calculator</label>
          <Select value={activeCalculator} onValueChange={setActiveCalculator}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bsa">Body Surface Area (BSA)</SelectItem>
              <SelectItem value="carboplatin">Carboplatin Dosing (Calvert Formula)</SelectItem>
              <SelectItem value="creatinine">Creatinine Clearance (Cockcroft-Gault)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Calculator Form */}
        {renderCalculatorForm()}

        {/* Results */}
        {results && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {results.value.toString().includes("Invalid") ? (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                <span className="font-medium">Result:</span>
                <span className="text-lg font-bold">{results.value}</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Interpretation:</span> {results.interpretation}
                </p>
                
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {results.evidenceLevel}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {results.reference}
                  </Badge>
                </div>
              </div>
              
              {results.recommendations && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Clinical Recommendations:</p>
                  <ul className="text-xs space-y-1 pl-4">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="list-disc text-muted-foreground">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}