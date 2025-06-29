import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator,
  AlertTriangle,
  Activity,
  Droplets,
  Heart,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Brain,
  Stethoscope,
  TestTube
} from "lucide-react";

const toolSections = [
  { 
    id: "calculators", 
    name: "Clinical Calculators", 
    icon: Calculator,
    description: "Medical calculations for oncology practice"
  },
  { 
    id: "redflag", 
    name: "Red Flag Alerts", 
    icon: AlertTriangle,
    description: "Critical warning signs and emergency protocols"
  },
  { 
    id: "labs", 
    name: "Lab Interpretation", 
    icon: TestTube,
    description: "Laboratory value interpretation guides"
  },
  { 
    id: "references", 
    name: "Quick References", 
    icon: Brain,
    description: "Staging systems and response criteria"
  }
];

// Clinical Calculators Component
const ClinicalCalculators = () => {
  const [bsaHeight, setBsaHeight] = useState("");
  const [bsaWeight, setBsaWeight] = useState("");
  const [bsaResult, setBsaResult] = useState("");
  
  const [gfrAge, setGfrAge] = useState("");
  const [gfrWeight, setGfrWeight] = useState("");
  const [gfrSex, setGfrSex] = useState("");
  const [gfrCreatinine, setGfrCreatinine] = useState("");
  const [gfrResult, setGfrResult] = useState("");

  const calculateBSA = () => {
    const height = parseFloat(bsaHeight);
    const weight = parseFloat(bsaWeight);
    if (height && weight) {
      const bsa = Math.sqrt((height * weight) / 3600);
      setBsaResult(bsa.toFixed(2));
    }
  };

  const calculateGFR = () => {
    const age = parseFloat(gfrAge);
    const weight = parseFloat(gfrWeight);
    const creatinine = parseFloat(gfrCreatinine);
    if (age && weight && creatinine && gfrSex) {
      let gfr = ((140 - age) * weight) / (72 * creatinine);
      if (gfrSex === "female") {
        gfr *= 0.85;
      }
      setGfrResult(gfr.toFixed(1));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Body Surface Area (BSA)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Height (cm)</label>
                  <Input 
                    value={bsaHeight}
                    onChange={(e) => setBsaHeight(e.target.value)}
                    placeholder="170"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={bsaWeight}
                    onChange={(e) => setBsaWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>
              <Button onClick={calculateBSA} className="w-full">
                Calculate BSA
              </Button>
              {bsaResult && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>BSA: {bsaResult} m²</strong><br/>
                    Formula: √(height × weight / 3600)
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-purple-600" />
              NCCN SCLC Carboplatin AUC Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Target AUC</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AUC" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">AUC 5 (Elderly &gt;70)</SelectItem>
                      <SelectItem value="5.5">AUC 5.5</SelectItem>
                      <SelectItem value="6">AUC 6 (Standard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Age (years)</label>
                  <Input placeholder="65" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input placeholder="70" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Serum Creatinine (mg/dL)</label>
                  <Input placeholder="1.0" type="number" step="0.1" />
                </div>
              </div>
              <Button className="w-full">
                Calculate Carboplatin Dose
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              NCCN Colon Cancer Risk Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">T Stage</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select T stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t1">T1 - Submucosa</SelectItem>
                      <SelectItem value="t2">T2 - Muscularis propria</SelectItem>
                      <SelectItem value="t3">T3 - Subserosa/perirectal tissue</SelectItem>
                      <SelectItem value="t4">T4 - Adjacent organs/structures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">N Stage</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select N stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="n0">N0 - No regional nodes</SelectItem>
                      <SelectItem value="n1">N1 - 1-3 regional nodes</SelectItem>
                      <SelectItem value="n2">N2 - 4+ regional nodes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">MMR Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select MMR status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pmmr">pMMR/MSS (Proficient)</SelectItem>
                      <SelectItem value="dmmr">dMMR/MSI-H (Deficient)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Grade</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="well">Well differentiated</SelectItem>
                      <SelectItem value="moderate">Moderately differentiated</SelectItem>
                      <SelectItem value="poor">Poorly differentiated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                Calculate Risk & Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-amber-600" />
              NCCN Ampullary Adenocarcinoma Genetic Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-800/20 rounded border-l-4 border-amber-400">
                <p className="text-sm font-medium">NCCN Category 1 Recommendation</p>
                <p className="text-xs text-muted-foreground">Genetic testing required for all confirmed ampullary adenocarcinoma patients</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Family History</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select family history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive for cancer</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Previous Cancer History</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No previous cancer</SelectItem>
                      <SelectItem value="breast">Breast cancer</SelectItem>
                      <SelectItem value="colorectal">Colorectal cancer</SelectItem>
                      <SelectItem value="pancreatic">Pancreatic cancer</SelectItem>
                      <SelectItem value="other">Other cancer type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Recommended Gene Panel (NCCN v2.2025)</label>
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <Badge variant="outline">ATM</Badge>
                    <Badge variant="outline">BRCA1</Badge>
                    <Badge variant="outline">BRCA2</Badge>
                    <Badge variant="outline">CDKN2A</Badge>
                    <Badge variant="outline">MLH1</Badge>
                    <Badge variant="outline">MSH2</Badge>
                    <Badge variant="outline">MSH6</Badge>
                    <Badge variant="outline">PALB2</Badge>
                    <Badge variant="outline">PMS2</Badge>
                    <Badge variant="outline">STK11</Badge>
                    <Badge variant="outline">TP53</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full" variant="default">
                  Generate Genetic Counseling Referral
                </Button>
                <Button className="w-full" variant="outline">
                  View NCCN Testing Guidelines
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-green-600" />
              Creatinine Clearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Age (years)</label>
                  <Input 
                    value={gfrAge}
                    onChange={(e) => setGfrAge(e.target.value)}
                    placeholder="65"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={gfrWeight}
                    onChange={(e) => setGfrWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Sex</label>
                  <Select value={gfrSex} onValueChange={setGfrSex}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Creatinine (mg/dL)</label>
                  <Input 
                    value={gfrCreatinine}
                    onChange={(e) => setGfrCreatinine(e.target.value)}
                    placeholder="1.2"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
              <Button onClick={calculateGFR} className="w-full">
                Calculate CrCl
              </Button>
              {gfrResult && (
                <Alert className="bg-green-50 border-green-200">
                  <Droplets className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>CrCl: {gfrResult} mL/min</strong><br/>
                    Cockcroft-Gault formula
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              ECOG Performance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { score: "0", description: "Fully active, no restrictions" },
                { score: "1", description: "Restricted in strenuous activity" },
                { score: "2", description: "Ambulatory >50% of day" },
                { score: "3", description: "Limited self-care" },
                { score: "4", description: "Completely disabled" }
              ].map((status, i) => (
                <div key={i} className="p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">ECOG {status.score}</Badge>
                    <span className="text-sm">{status.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-orange-600" />
              Pain Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded">
                <h4 className="font-medium text-sm mb-2">Numeric Rating Scale</h4>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <div className="text-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold">0</div>
                    <span>No pain</span>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold">2</div>
                    <span>Mild</span>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold">5</div>
                    <span>Moderate</span>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold">8</div>
                    <span>Severe</span>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 bg-red-800 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold">10</div>
                    <span>Worst</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              Prognostic Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-2 border rounded">
                <strong>Palliative Performance Scale</strong><br/>
                Ambulation, activity, self-care, intake, consciousness
              </div>
              <div className="p-2 border rounded">
                <strong>Karnofsky Performance Status</strong><br/>
                0-100% functional capability scale
              </div>
              <div className="p-2 border rounded">
                <strong>Charlson Comorbidity Index</strong><br/>
                Predicts 10-year survival based on comorbidities
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Red Flag Alerts Component
const RedFlagAlerts = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            NCCN SCLC Emergency Signs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Superior Vena Cava Syndrome</strong><br/>
                Face/neck swelling, dyspnea, chest pain: urgent CT chest & oncology consult
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-orange-50 border-orange-200">
              <Zap className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>SIADH (Hyponatremia)</strong><br/>
                Na+ &lt;130 mEq/L with confusion: fluid restriction & demeclocycline
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-purple-50 border-purple-200">
              <Droplets className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-800">
                <strong>Lambert-Eaton Syndrome</strong><br/>
                Proximal weakness, hyporeflexia: EMG & anti-VGCC antibodies
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Brain Metastases</strong><br/>
                Headache, seizures, focal deficits: urgent brain MRI & neurosurgery
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            Critical Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded bg-red-50">
              <h4 className="font-medium text-sm text-red-800">Immediate Action</h4>
              <ul className="text-sm text-red-700 mt-1 space-y-1">
                <li>• ANC &lt;100 cells/μL</li>
                <li>• Platelets &lt;10,000/μL</li>
                <li>• Hemoglobin &lt;7 g/dL</li>
                <li>• Calcium &gt;14 mg/dL</li>
                <li>• Potassium &gt;6.5 mEq/L</li>
              </ul>
            </div>
            
            <div className="p-3 border rounded bg-yellow-50">
              <h4 className="font-medium text-sm text-yellow-800">Monitor Closely</h4>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                <li>• ANC 100-500 cells/μL</li>
                <li>• Platelets 10,000-50,000/μL</li>
                <li>• Creatinine &gt;3x baseline</li>
                <li>• Bilirubin &gt;5x ULN</li>
                <li>• LDH &gt;10x ULN</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Lab Interpretation Component
const LabInterpretation = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Hematology Normal Ranges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>WBC:</span>
              <span className="font-mono">4.5-11.0 K/μL</span>
            </div>
            <div className="flex justify-between">
              <span>ANC:</span>
              <span className="font-mono">&gt;1500 cells/μL</span>
            </div>
            <div className="flex justify-between">
              <span>Hemoglobin:</span>
              <span className="font-mono">12-16 g/dL</span>
            </div>
            <div className="flex justify-between">
              <span>Platelets:</span>
              <span className="font-mono">150-450 K/μL</span>
            </div>
            <div className="flex justify-between">
              <span>Neutrophils:</span>
              <span className="font-mono">50-70%</span>
            </div>
            <div className="flex justify-between">
              <span>Lymphocytes:</span>
              <span className="font-mono">20-40%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Chemistry Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sodium:</span>
              <span className="font-mono">136-145 mEq/L</span>
            </div>
            <div className="flex justify-between">
              <span>Potassium:</span>
              <span className="font-mono">3.5-5.0 mEq/L</span>
            </div>
            <div className="flex justify-between">
              <span>Chloride:</span>
              <span className="font-mono">98-107 mEq/L</span>
            </div>
            <div className="flex justify-between">
              <span>CO2:</span>
              <span className="font-mono">22-28 mEq/L</span>
            </div>
            <div className="flex justify-between">
              <span>BUN:</span>
              <span className="font-mono">7-20 mg/dL</span>
            </div>
            <div className="flex justify-between">
              <span>Creatinine:</span>
              <span className="font-mono">0.6-1.2 mg/dL</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Liver Function
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Bilirubin:</span>
              <span className="font-mono">0.3-1.2 mg/dL</span>
            </div>
            <div className="flex justify-between">
              <span>Direct Bilirubin:</span>
              <span className="font-mono">0.0-0.3 mg/dL</span>
            </div>
            <div className="flex justify-between">
              <span>ALT:</span>
              <span className="font-mono">7-56 U/L</span>
            </div>
            <div className="flex justify-between">
              <span>AST:</span>
              <span className="font-mono">10-40 U/L</span>
            </div>
            <div className="flex justify-between">
              <span>Alk Phos:</span>
              <span className="font-mono">44-147 U/L</span>
            </div>
            <div className="flex justify-between">
              <span>Albumin:</span>
              <span className="font-mono">3.5-5.0 g/dL</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Quick References Component
const QuickReferences = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            TNM Staging Basics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded">
              <strong>T (Primary Tumor)</strong><br/>
              Tx: Cannot assess<br/>
              T0: No evidence<br/>
              Tis: Carcinoma in situ<br/>
              T1-T4: Size/extent of primary
            </div>
            <div className="p-3 bg-green-50 rounded">
              <strong>N (Regional Lymph Nodes)</strong><br/>
              Nx: Cannot assess<br/>
              N0: No regional nodes<br/>
              N1-N3: Number/extent of nodes
            </div>
            <div className="p-3 bg-red-50 rounded">
              <strong>M (Distant Metastasis)</strong><br/>
              M0: No distant metastasis<br/>
              M1: Distant metastasis present
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Response Criteria (RECIST 1.1)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-green-50 rounded">
              <strong>Complete Response (CR)</strong><br/>
              Disappearance of all target lesions
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <strong>Partial Response (PR)</strong><br/>
              ≥30% decrease in sum of diameters
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <strong>Stable Disease (SD)</strong><br/>
              Neither PR nor PD criteria met
            </div>
            <div className="p-3 bg-red-50 rounded">
              <strong>Progressive Disease (PD)</strong><br/>
              ≥20% increase in sum of diameters
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function ToolsBar() {
  const [activeSection, setActiveSection] = useState("calculators");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "calculators":
        return <ClinicalCalculators />;
      case "redflag":
        return <RedFlagAlerts />;
      case "labs":
        return <LabInterpretation />;
      case "references":
        return <QuickReferences />;
      default:
        return <ClinicalCalculators />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clinical Tools</h2>
          <p className="text-muted-foreground">
            Essential calculators, alerts, and quick reference guides for oncology practice
          </p>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {toolSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center gap-2 data-[state=active]:bg-medical-blue data-[state=active]:text-white"
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-medical-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentSection = toolSections.find(s => s.id === activeSection);
                  const IconComponent = currentSection?.icon || Calculator;
                  return <IconComponent className="h-5 w-5 text-medical-blue" />;
                })()}
                {toolSections.find(s => s.id === activeSection)?.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {toolSections.find(s => s.id === activeSection)?.description}
              </p>
            </CardHeader>
          </Card>

          {renderActiveSection()}
        </div>
      </Tabs>
    </div>
  );
}