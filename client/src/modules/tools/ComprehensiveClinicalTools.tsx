import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calculator, AlertTriangle, Activity, Droplets, Heart, TrendingUp, 
  Zap, Shield, Clock, Brain, Stethoscope, TestTube, Target, 
  Users, FileText, BarChart3, PieChart, Gauge, Calendar,
  Pill, FlaskConical, Microscope, Dna, Waves, Timer, XCircle
} from "lucide-react";

// Comprehensive Clinical Tools Categories
const CLINICAL_TOOL_CATEGORIES = [
  {
    id: "dosing",
    name: "Dosing & Calculations",
    icon: Calculator,
    description: "Drug dosing, BSA, renal function calculations"
  },
  {
    id: "assessment",
    name: "Clinical Assessment",
    icon: Stethoscope,
    description: "Performance status, symptom scales, prognostic tools"
  },
  {
    id: "biomarkers",
    name: "Biomarker Tools",
    icon: Dna,
    description: "Genetic testing, molecular profiling, interpretation"
  },
  {
    id: "staging",
    name: "Staging & Response",
    icon: Target,
    description: "TNM staging, response criteria, imaging assessment"
  },
  {
    id: "toxicity",
    name: "Toxicity Management",
    icon: AlertTriangle,
    description: "CTCAE grading, dose modifications, safety monitoring"
  },
  {
    id: "predictive",
    name: "Predictive Models",
    icon: TrendingUp,
    description: "Survival prediction, risk stratification, prognostic calculators"
  },
  {
    id: "labs",
    name: "Laboratory Tools",
    icon: TestTube,
    description: "Lab interpretation, reference ranges, critical values"
  },
  {
    id: "electrolytes",
    name: "Electrolyte Corrections",
    icon: FlaskConical,
    description: "Sodium, potassium, calcium, magnesium correction calculators"
  },
  {
    id: "supportive",
    name: "Supportive Care",
    icon: Shield,
    description: "Antiemetics, growth factors, premedication protocols"
  },
  {
    id: "emergency",
    name: "Emergency Protocols",
    icon: Zap,
    description: "Oncologic emergencies, rapid response protocols"
  }
];

// Dosing & Calculations Tools
const DosingCalculations = () => {
  const [bsaHeight, setBsaHeight] = useState("");
  const [bsaWeight, setBsaWeight] = useState("");
  const [bsaResult, setBsaResult] = useState("");
  
  const [carboAge, setCarboAge] = useState("");
  const [carboWeight, setCarboWeight] = useState("");
  const [carboSex, setCarboSex] = useState("");
  const [carboCreatinine, setCarboCreatinine] = useState("");
  const [carboAuc, setCarboAuc] = useState("");
  const [carboResult, setCarboResult] = useState("");

  const [ccrHeight, setCcrHeight] = useState("");
  const [ccrWeight, setCcrWeight] = useState("");
  const [ccrAge, setCcrAge] = useState("");
  const [ccrSex, setCcrSex] = useState("");
  const [ccrCreatinine, setCcrCreatinine] = useState("");
  const [ccrResult, setCcrResult] = useState("");

  const calculateBSA = () => {
    const height = parseFloat(bsaHeight);
    const weight = parseFloat(bsaWeight);
    if (height && weight) {
      const bsa = Math.sqrt((height * weight) / 3600);
      setBsaResult(bsa.toFixed(2));
    }
  };

  const calculateCarboplatin = () => {
    const age = parseFloat(carboAge);
    const weight = parseFloat(carboWeight);
    const creatinine = parseFloat(carboCreatinine);
    const auc = parseFloat(carboAuc);
    
    if (age && weight && creatinine && auc && carboSex) {
      // Cockcroft-Gault formula
      let crCl = ((140 - age) * weight) / (72 * creatinine);
      if (carboSex === "female") {
        crCl *= 0.85;
      }
      // Calvert formula
      const dose = auc * (crCl + 25);
      setCarboResult(dose.toFixed(0));
    }
  };

  const calculateCrCl = () => {
    const age = parseFloat(ccrAge);
    const weight = parseFloat(ccrWeight);
    const creatinine = parseFloat(ccrCreatinine);
    
    if (age && weight && creatinine && ccrSex) {
      let crCl = ((140 - age) * weight) / (72 * creatinine);
      if (ccrSex === "female") {
        crCl *= 0.85;
      }
      setCcrResult(crCl.toFixed(1));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* BSA Calculator */}
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
                    DuBois Formula: √(height × weight / 3600)
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Carboplatin Calculator */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-purple-600" />
              Carboplatin AUC Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Age (years)</label>
                  <Input 
                    value={carboAge}
                    onChange={(e) => setCarboAge(e.target.value)}
                    placeholder="65"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={carboWeight}
                    onChange={(e) => setCarboWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Sex</label>
                  <Select value={carboSex} onValueChange={setCarboSex}>
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
                    value={carboCreatinine}
                    onChange={(e) => setCarboCreatinine(e.target.value)}
                    placeholder="1.0"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Target AUC</label>
                <Select value={carboAuc} onValueChange={setCarboAuc}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AUC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">AUC 4</SelectItem>
                    <SelectItem value="5">AUC 5</SelectItem>
                    <SelectItem value="6">AUC 6</SelectItem>
                    <SelectItem value="7">AUC 7</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={calculateCarboplatin} className="w-full">
                Calculate Carboplatin Dose
              </Button>
              {carboResult && (
                <Alert className="bg-purple-50 border-purple-200">
                  <Pill className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Carboplatin Dose: {carboResult} mg</strong><br/>
                    Calvert Formula: AUC × (CrCl + 25)
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Creatinine Clearance Calculator */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-green-600" />
              Creatinine Clearance (CrCl)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Age (years)</label>
                  <Input 
                    value={ccrAge}
                    onChange={(e) => setCcrAge(e.target.value)}
                    placeholder="65"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={ccrWeight}
                    onChange={(e) => setCcrWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Sex</label>
                  <Select value={ccrSex} onValueChange={setCcrSex}>
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
                    value={ccrCreatinine}
                    onChange={(e) => setCcrCreatinine(e.target.value)}
                    placeholder="1.0"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
              <Button onClick={calculateCrCl} className="w-full">
                Calculate CrCl
              </Button>
              {ccrResult && (
                <Alert className="bg-green-50 border-green-200">
                  <Droplets className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>CrCl: {ccrResult} mL/min</strong><br/>
                    Cockcroft-Gault Formula
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Biomarker Tools
const BiomarkerTools = () => {
  const [selectedCancer, setSelectedCancer] = useState("");
  const [testResults, setTestResults] = useState({
    her2: "",
    erpr: "",
    pdl1: "",
    msi: "",
    brca: "",
    egfr: "",
    alk: "",
    ros1: ""
  });

  const biomarkersByCancel = {
    "breast": {
      required: ["ER", "PR", "HER2"],
      optional: ["Ki-67", "BRCA1/2", "PD-L1"],
      description: "Essential biomarkers for breast cancer treatment selection"
    },
    "lung": {
      required: ["EGFR", "ALK", "ROS1", "BRAF", "PD-L1"],
      optional: ["KRAS", "MET", "RET", "NTRK"],
      description: "Comprehensive molecular profiling for lung cancer"
    },
    "colorectal": {
      required: ["MSI/MMR", "KRAS", "NRAS", "BRAF"],
      optional: ["PIK3CA", "HER2", "POLE"],
      description: "Biomarkers for colorectal cancer therapy selection"
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-5 w-5 text-green-600" />
              Biomarker Testing Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cancer Type</label>
                <Select value={selectedCancer} onValueChange={setSelectedCancer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cancer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breast">Breast Cancer</SelectItem>
                    <SelectItem value="lung">Lung Cancer</SelectItem>
                    <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedCancer && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-green-700">Required Biomarkers</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {biomarkersByCancel[selectedCancer as keyof typeof biomarkersByCancel].required.map((marker) => (
                        <Badge key={marker} variant="default" className="bg-green-100 text-green-800">
                          {marker}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700">Optional Biomarkers</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {biomarkersByCancel[selectedCancer as keyof typeof biomarkersByCancel].optional.map((marker) => (
                        <Badge key={marker} variant="outline" className="border-blue-200 text-blue-700">
                          {marker}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Alert className="bg-green-50 border-green-200">
                    <Dna className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {biomarkersByCancel[selectedCancer as keyof typeof biomarkersByCancel].description}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-purple-600" />
              Biomarker Interpretation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">HER2 Status</label>
                  <Select value={testResults.her2} onValueChange={(value) => setTestResults(prev => ({...prev, her2: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="negative">Negative (0, 1+)</SelectItem>
                      <SelectItem value="equivocal">Equivocal (2+)</SelectItem>
                      <SelectItem value="positive">Positive (3+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">ER/PR Status</label>
                  <Select value={testResults.erpr} onValueChange={(value) => setTestResults(prev => ({...prev, erpr: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive (≥1%)</SelectItem>
                      <SelectItem value="negative">Negative (&lt;1%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">PD-L1 Expression</label>
                  <Select value={testResults.pdl1} onValueChange={(value) => setTestResults(prev => ({...prev, pdl1: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (≥50%)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-49%)</SelectItem>
                      <SelectItem value="negative">Negative (&lt;1%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">MSI Status</label>
                  <Select value={testResults.msi} onValueChange={(value) => setTestResults(prev => ({...prev, msi: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="msi-h">MSI-H/dMMR</SelectItem>
                      <SelectItem value="mss">MSS/pMMR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                Generate Treatment Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Staging & Response Tools
const StagingResponseTools = () => {
  const [cancerType, setCancerType] = useState("");
  const [tStage, setTStage] = useState("");
  const [nStage, setNStage] = useState("");
  const [mStage, setMStage] = useState("");

  const tnmStaging = {
    "breast": {
      T: ["T1", "T2", "T3", "T4"],
      N: ["N0", "N1", "N2", "N3"],
      M: ["M0", "M1"],
      description: "TNM staging for breast cancer per AJCC 8th edition"
    },
    "lung": {
      T: ["T1a", "T1b", "T1c", "T2a", "T2b", "T3", "T4"],
      N: ["N0", "N1", "N2", "N3"],
      M: ["M0", "M1a", "M1b", "M1c"],
      description: "TNM staging for lung cancer per AJCC 8th edition"
    },
    "colorectal": {
      T: ["T1", "T2", "T3", "T4a", "T4b"],
      N: ["N0", "N1a", "N1b", "N1c", "N2a", "N2b"],
      M: ["M0", "M1a", "M1b", "M1c"],
      description: "TNM staging for colorectal cancer per AJCC 8th edition"
    }
  };

  const responseCategories = [
    {
      criteria: "RECIST 1.1",
      responses: ["Complete Response (CR)", "Partial Response (PR)", "Stable Disease (SD)", "Progressive Disease (PD)"],
      description: "Standard response criteria for solid tumors"
    },
    {
      criteria: "Cheson 2014",
      responses: ["Complete Response (CR)", "Partial Response (PR)", "Stable Disease (SD)", "Progressive Disease (PD)"],
      description: "Response criteria for lymphoma"
    },
    {
      criteria: "Prostate Cancer Working Group 3",
      responses: ["Complete Response", "Partial Response", "Stable Disease", "Progressive Disease"],
      description: "Response criteria for prostate cancer"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              TNM Staging Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cancer Type</label>
                <Select value={cancerType} onValueChange={setCancerType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cancer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breast">Breast Cancer</SelectItem>
                    <SelectItem value="lung">Lung Cancer</SelectItem>
                    <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {cancerType && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium">T Stage</label>
                      <Select value={tStage} onValueChange={setTStage}>
                        <SelectTrigger>
                          <SelectValue placeholder="T" />
                        </SelectTrigger>
                        <SelectContent>
                          {tnmStaging[cancerType as keyof typeof tnmStaging].T.map((stage) => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">N Stage</label>
                      <Select value={nStage} onValueChange={setNStage}>
                        <SelectTrigger>
                          <SelectValue placeholder="N" />
                        </SelectTrigger>
                        <SelectContent>
                          {tnmStaging[cancerType as keyof typeof tnmStaging].N.map((stage) => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">M Stage</label>
                      <Select value={mStage} onValueChange={setMStage}>
                        <SelectTrigger>
                          <SelectValue placeholder="M" />
                        </SelectTrigger>
                        <SelectContent>
                          {tnmStaging[cancerType as keyof typeof tnmStaging].M.map((stage) => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">
                    Calculate Overall Stage
                  </Button>
                  <Alert className="bg-blue-50 border-blue-200">
                    <Target className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      {tnmStaging[cancerType as keyof typeof tnmStaging].description}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Response Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responseCategories.map((category, index) => (
                <div key={index} className="p-3 border rounded">
                  <h4 className="font-medium text-green-700">{category.criteria}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.responses.map((response) => (
                      <Badge key={response} variant="outline" className="text-xs">
                        {response}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Toxicity Management Tools
const ToxicityManagement = () => {
  const [selectedToxicity, setSelectedToxicity] = useState("");
  const [toxicityGrade, setToxicityGrade] = useState("");

  const ctcaeToxicities = {
    "neutropenia": {
      grades: {
        "1": "ANC 1.5-1.9 × 10⁹/L",
        "2": "ANC 1.0-1.4 × 10⁹/L",
        "3": "ANC 0.5-0.9 × 10⁹/L",
        "4": "ANC &lt;0.5 × 10⁹/L"
      },
      management: {
        "1": "Monitor CBC weekly",
        "2": "Monitor CBC weekly, patient education",
        "3": "Hold treatment, G-CSF support",
        "4": "Urgent hospitalization, antibiotics, G-CSF"
      },
      doseModification: {
        "1": "Continue full dose",
        "2": "Continue full dose with monitoring",
        "3": "Delay until Grade ≤1, then 75% dose",
        "4": "Delay until Grade ≤1, then 50% dose"
      }
    },
    "diarrhea": {
      grades: {
        "1": "Increase of &lt;4 stools/day",
        "2": "Increase of 4-6 stools/day",
        "3": "Increase of ≥7 stools/day, hospitalization",
        "4": "Life-threatening, urgent intervention"
      },
      management: {
        "1": "Dietary modifications, loperamide",
        "2": "Loperamide, dietary modifications",
        "3": "Hospitalization, IV fluids, antibiotics",
        "4": "ICU care, aggressive fluid resuscitation"
      },
      doseModification: {
        "1": "Continue full dose",
        "2": "Continue with supportive care",
        "3": "Hold until Grade ≤1, then 75% dose",
        "4": "Hold until Grade ≤1, then 50% dose"
      }
    },
    "neuropathy": {
      grades: {
        "1": "Asymptomatic, clinical findings only",
        "2": "Moderate symptoms, limiting ADLs",
        "3": "Severe symptoms, limiting self-care",
        "4": "Life-threatening, urgent intervention"
      },
      management: {
        "1": "Monitor, patient education",
        "2": "Gabapentin, pregabalin, dose reduction",
        "3": "Hold treatment, neuropathy management",
        "4": "Discontinue, aggressive neuropathy treatment"
      },
      doseModification: {
        "1": "Continue full dose",
        "2": "Reduce dose by 25%",
        "3": "Hold until Grade ≤1, then 50% dose",
        "4": "Discontinue treatment"
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            CTCAE Toxicity Grading & Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Toxicity Type</label>
                <Select value={selectedToxicity} onValueChange={setSelectedToxicity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select toxicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutropenia">Neutropenia</SelectItem>
                    <SelectItem value="diarrhea">Diarrhea</SelectItem>
                    <SelectItem value="neuropathy">Peripheral Neuropathy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">CTCAE Grade</label>
                <Select value={toxicityGrade} onValueChange={setToxicityGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedToxicity && toxicityGrade && (
              <div className="space-y-4">
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Grade {toxicityGrade}: {ctcaeToxicities[selectedToxicity as keyof typeof ctcaeToxicities].grades[toxicityGrade as keyof typeof ctcaeToxicities[keyof typeof ctcaeToxicities]['grades']]}</strong>
                  </AlertDescription>
                </Alert>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{ctcaeToxicities[selectedToxicity as keyof typeof ctcaeToxicities].management[toxicityGrade as keyof typeof ctcaeToxicities[keyof typeof ctcaeToxicities]['management']]}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Dose Modification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{ctcaeToxicities[selectedToxicity as keyof typeof ctcaeToxicities].doseModification[toxicityGrade as keyof typeof ctcaeToxicities[keyof typeof ctcaeToxicities]['doseModification']]}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Predictive Models
const PredictiveModels = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [modelInputs, setModelInputs] = useState({
    age: "",
    stage: "",
    grade: "",
    size: "",
    nodes: "",
    er: "",
    pr: "",
    her2: ""
  });

  const predictiveModels = [
    {
      name: "Adjuvant! Online",
      cancer: "Breast Cancer",
      description: "Predicts 10-year overall survival and disease-free survival",
      factors: ["Age", "Tumor size", "Grade", "Nodes", "ER", "PR", "HER2"]
    },
    {
      name: "PREDICT Plus",
      cancer: "Breast Cancer", 
      description: "UK-based breast cancer prognostic tool",
      factors: ["Age", "Tumor size", "Grade", "Nodes", "ER", "PR", "HER2", "Ki-67"]
    },
    {
      name: "Oncotype DX",
      cancer: "Breast Cancer",
      description: "21-gene recurrence score for treatment decision",
      factors: ["Gene expression profile", "Tumor characteristics"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Prognostic & Predictive Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Predictive Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {predictiveModels.map((model, index) => (
                    <SelectItem key={index} value={model.name}>
                      {model.name} - {model.cancer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedModel && (
              <div className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>{selectedModel}</strong><br/>
                    {predictiveModels.find(model => model.name === selectedModel)?.description}
                  </AlertDescription>
                </Alert>
                
                <div className="grid md:grid-cols-2 gap-3">
                  <Input placeholder="Age" value={modelInputs.age} onChange={(e) => setModelInputs(prev => ({...prev, age: e.target.value}))} />
                  <Input placeholder="Tumor size (cm)" value={modelInputs.size} onChange={(e) => setModelInputs(prev => ({...prev, size: e.target.value}))} />
                  <Input placeholder="Number of nodes" value={modelInputs.nodes} onChange={(e) => setModelInputs(prev => ({...prev, nodes: e.target.value}))} />
                  <Select value={modelInputs.grade} onValueChange={(value) => setModelInputs(prev => ({...prev, grade: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Grade 1</SelectItem>
                      <SelectItem value="2">Grade 2</SelectItem>
                      <SelectItem value="3">Grade 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">
                  Calculate Prognosis
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Electrolyte Corrections
const ElectrolyteCorrections = () => {
  const [sodiumCurrent, setSodiumCurrent] = useState("");
  const [sodiumTarget, setSodiumTarget] = useState("");
  const [sodiumWeight, setSodiumWeight] = useState("");
  const [sodiumResult, setSodiumResult] = useState("");
  
  const [potassiumCurrent, setPotassiumCurrent] = useState("");
  const [potassiumTarget, setPotassiumTarget] = useState("");
  const [potassiumWeight, setPotassiumWeight] = useState("");
  const [potassiumResult, setPotassiumResult] = useState("");
  
  const [calciumCurrent, setCalciumCurrent] = useState("");
  const [calciumAlbumin, setCalciumAlbumin] = useState("");
  const [calciumCorrected, setCalciumCorrected] = useState("");
  
  const [magnesiumCurrent, setMagnesiumCurrent] = useState("");
  const [magnesiumTarget, setMagnesiumTarget] = useState("");
  const [magnesiumResult, setMagnesiumResult] = useState("");

  const calculateSodiumCorrection = () => {
    const current = parseFloat(sodiumCurrent);
    const target = parseFloat(sodiumTarget);
    const weight = parseFloat(sodiumWeight);
    
    if (current && target && weight) {
      const deficit = target - current;
      const tbw = weight * 0.6; // Total body water
      const sodiumNeeded = deficit * tbw;
      setSodiumResult(`${sodiumNeeded.toFixed(0)} mEq of sodium needed. 
        Use 3% NaCl (513 mEq/L): ${(sodiumNeeded / 513 * 1000).toFixed(0)} mL
        Correct slowly: max 8-10 mEq/L in 24h`);
    }
  };

  const calculatePotassiumCorrection = () => {
    const current = parseFloat(potassiumCurrent);
    const target = parseFloat(potassiumTarget);
    const weight = parseFloat(potassiumWeight);
    
    if (current && target && weight) {
      const deficit = target - current;
      const potassiumNeeded = deficit * weight * 0.4; // Approximate distribution
      setPotassiumResult(`${potassiumNeeded.toFixed(0)} mEq of potassium needed.
        IV: Max 10 mEq/hr via central line, 40 mEq/L peripheral
        PO: KCl 20-40 mEq TID. Monitor ECG if severe.`);
    }
  };

  const calculateCorrectedCalcium = () => {
    const calcium = parseFloat(calciumCurrent);
    const albumin = parseFloat(calciumAlbumin);
    
    if (calcium && albumin) {
      const corrected = calcium + 0.8 * (4.0 - albumin);
      setCalciumCorrected(`Corrected Calcium: ${corrected.toFixed(1)} mg/dL
        Normal range: 8.5-10.5 mg/dL
        Formula: Ca + 0.8 × (4.0 - Albumin)`);
    }
  };

  const calculateMagnesiumCorrection = () => {
    const current = parseFloat(magnesiumCurrent);
    const target = parseFloat(magnesiumTarget);
    
    if (current && target) {
      const deficit = target - current;
      const magnesiumNeeded = deficit * 24; // Rough estimate
      setMagnesiumResult(`${magnesiumNeeded.toFixed(0)} mEq of magnesium needed.
        IV: MgSO4 1-2g (8-16 mEq) q6h × 3-4 doses
        PO: Mg oxide 400mg BID-TID. Check after 24-48h.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sodium Correction */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Sodium Correction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium">Current Na+ (mEq/L)</label>
                  <Input 
                    value={sodiumCurrent}
                    onChange={(e) => setSodiumCurrent(e.target.value)}
                    placeholder="120"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Target Na+ (mEq/L)</label>
                  <Input 
                    value={sodiumTarget}
                    onChange={(e) => setSodiumTarget(e.target.value)}
                    placeholder="135"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={sodiumWeight}
                    onChange={(e) => setSodiumWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>
              <Button onClick={calculateSodiumCorrection} className="w-full">
                Calculate Sodium Correction
              </Button>
              {sodiumResult && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <pre className="whitespace-pre-wrap text-xs">{sodiumResult}</pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Potassium Correction */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              Potassium Correction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium">Current K+ (mEq/L)</label>
                  <Input 
                    value={potassiumCurrent}
                    onChange={(e) => setPotassiumCurrent(e.target.value)}
                    placeholder="2.8"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Target K+ (mEq/L)</label>
                  <Input 
                    value={potassiumTarget}
                    onChange={(e) => setPotassiumTarget(e.target.value)}
                    placeholder="4.0"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={potassiumWeight}
                    onChange={(e) => setPotassiumWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>
              <Button onClick={calculatePotassiumCorrection} className="w-full">
                Calculate Potassium Correction
              </Button>
              {potassiumResult && (
                <Alert className="bg-green-50 border-green-200">
                  <Zap className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <pre className="whitespace-pre-wrap text-xs">{potassiumResult}</pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Corrected Calcium */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-purple-600" />
              Corrected Calcium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Total Calcium (mg/dL)</label>
                  <Input 
                    value={calciumCurrent}
                    onChange={(e) => setCalciumCurrent(e.target.value)}
                    placeholder="7.5"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Albumin (g/dL)</label>
                  <Input 
                    value={calciumAlbumin}
                    onChange={(e) => setCalciumAlbumin(e.target.value)}
                    placeholder="2.8"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
              <Button onClick={calculateCorrectedCalcium} className="w-full">
                Calculate Corrected Calcium
              </Button>
              {calciumCorrected && (
                <Alert className="bg-purple-50 border-purple-200">
                  <TestTube className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <pre className="whitespace-pre-wrap text-xs">{calciumCorrected}</pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Magnesium Correction */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-orange-600" />
              Magnesium Correction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Current Mg++ (mg/dL)</label>
                  <Input 
                    value={magnesiumCurrent}
                    onChange={(e) => setMagnesiumCurrent(e.target.value)}
                    placeholder="1.2"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Target Mg++ (mg/dL)</label>
                  <Input 
                    value={magnesiumTarget}
                    onChange={(e) => setMagnesiumTarget(e.target.value)}
                    placeholder="1.8"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
              <Button onClick={calculateMagnesiumCorrection} className="w-full">
                Calculate Magnesium Correction
              </Button>
              {magnesiumResult && (
                <Alert className="bg-orange-50 border-orange-200">
                  <FlaskConical className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <pre className="whitespace-pre-wrap text-xs">{magnesiumResult}</pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Critical Electrolyte Info */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Critical Electrolyte Values & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <h4 className="font-semibold text-red-800">Severe Hyponatremia (&lt;120 mEq/L)</h4>
                <p className="text-sm text-red-700">Seizures, coma risk. 3% NaCl 1-2 mL/kg/h. Max 8 mEq/L/24h correction.</p>
              </div>
              <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                <h4 className="font-semibold text-orange-800">Severe Hypokalemia (&lt;2.5 mEq/L)</h4>
                <p className="text-sm text-orange-700">Cardiac arrhythmia risk. Monitor ECG. Central line for high-rate infusion.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                <h4 className="font-semibold text-purple-800">Severe Hypocalcemia (&lt;7.0 mg/dL)</h4>
                <p className="text-sm text-purple-700">Tetany, seizures. IV calcium gluconate 1-2g q6h. Check Mg++ too.</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h4 className="font-semibold text-blue-800">Severe Hypomagnesemia (&lt;1.2 mg/dL)</h4>
                <p className="text-sm text-blue-700">Refractory K+/Ca++ deficiency. Replace Mg++ first. Monitor closely.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Supportive Care Tools
const SupportiveCare = () => {
  const [patientWeight, setPatientWeight] = useState("");
  const [emetogenicRisk, setEmetogenicRisk] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [renal, setRenal] = useState("");
  
  const antiemeticProtocols = {
    high: {
      name: "High Emetogenic Risk",
      examples: "Cisplatin, AC, high-dose cyclophosphamide",
      regimen: [
        "Day 1: Ondansetron 8mg IV + Dexamethasone 12mg IV + Aprepitant 125mg PO",
        "Day 2-3: Aprepitant 80mg PO daily + Dexamethasone 8mg PO daily",
        "Breakthrough: Metoclopramide 10mg q6h PRN"
      ]
    },
    moderate: {
      name: "Moderate Emetogenic Risk", 
      examples: "Oxaliplatin, Carboplatin, Doxorubicin",
      regimen: [
        "Day 1: Ondansetron 8mg IV + Dexamethasone 12mg IV",
        "Optional: Aprepitant 125mg PO on day 1",
        "Breakthrough: Prochlorperazine 10mg q6h PRN"
      ]
    },
    low: {
      name: "Low Emetogenic Risk",
      examples: "Weekly Taxanes, Gemcitabine, 5-FU",
      regimen: [
        "Day 1: Ondansetron 8mg IV or Dexamethasone 8mg IV",
        "Breakthrough: Metoclopramide 10mg q6h PRN",
        "Consider antihistamines for delayed nausea"
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Antiemetic Calculator */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-green-600" />
              Antiemetic Protocol Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={patientWeight}
                    onChange={(e) => setPatientWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Age (years)</label>
                  <Input 
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="65"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Emetogenic Risk</label>
                <Select value={emetogenicRisk} onValueChange={setEmetogenicRisk}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="moderate">Moderate Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {emetogenicRisk && (
                <div className="space-y-3">
                  <Alert className="bg-green-50 border-green-200">
                    <Pill className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>{antiemeticProtocols[emetogenicRisk as keyof typeof antiemeticProtocols].name}</strong><br/>
                      <small>{antiemeticProtocols[emetogenicRisk as keyof typeof antiemeticProtocols].examples}</small>
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    {antiemeticProtocols[emetogenicRisk as keyof typeof antiemeticProtocols].regimen.map((item, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Growth Factor Guidelines */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Growth Factor Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Activity className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Primary Prophylaxis Indications</strong><br/>
                  Febrile neutropenia risk ≥20% based on regimen
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded">
                  <h4 className="font-medium text-green-800">Filgrastim (Neupogen)</h4>
                  <p className="text-sm text-green-700">5 mcg/kg daily SC starting 24-72h post-chemo × 10-14 days</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <h4 className="font-medium text-blue-800">Pegfilgrastim (Neulasta)</h4>
                  <p className="text-sm text-blue-700">6mg SC once per cycle, 24-72h post-chemo</p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <h4 className="font-medium text-purple-800">Secondary Prophylaxis</h4>
                  <p className="text-sm text-purple-700">After febrile neutropenia episode with same regimen</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Laboratory Tools
const LaboratoryTools = () => {
  const [selectedLab, setSelectedLab] = useState("");
  const [labValue, setLabValue] = useState("");

  const labReferenceRanges = {
    "hemoglobin": {
      male: "14.0-18.0 g/dL",
      female: "12.0-16.0 g/dL",
      critical: "&lt;7.0 or &gt;20.0 g/dL",
      interpretation: "Oxygen-carrying capacity marker"
    },
    "anc": {
      normal: "1.5-8.0 × 10⁹/L",
      mild: "1.0-1.5 × 10⁹/L",
      moderate: "0.5-1.0 × 10⁹/L",
      severe: "&lt;0.5 × 10⁹/L",
      interpretation: "Infection risk assessment"
    },
    "platelets": {
      normal: "150-450 × 10⁹/L",
      mild: "100-150 × 10⁹/L",
      moderate: "50-100 × 10⁹/L",
      severe: "&lt;50 × 10⁹/L",
      interpretation: "Bleeding risk assessment"
    },
    "creatinine": {
      male: "0.7-1.3 mg/dL",
      female: "0.6-1.1 mg/dL",
      critical: "&gt;3.0 mg/dL",
      interpretation: "Renal function marker"
    }
  };

  const tumorMarkers = {
    "cea": {
      normal: "&lt;3.0 ng/mL (non-smoker), &lt;5.0 ng/mL (smoker)",
      cancers: "Colorectal, breast, lung, gastric",
      interpretation: "Follow-up marker for colorectal cancer"
    },
    "ca125": {
      normal: "&lt;35 U/mL",
      cancers: "Ovarian, peritoneal, fallopian tube",
      interpretation: "Ovarian cancer screening and monitoring"
    },
    "psa": {
      normal: "&lt;4.0 ng/mL",
      cancers: "Prostate",
      interpretation: "Prostate cancer screening and monitoring"
    },
    "afp": {
      normal: "&lt;10 ng/mL",
      cancers: "Hepatocellular carcinoma, testicular",
      interpretation: "Liver and testicular cancer marker"
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-green-600" />
              Laboratory Reference Ranges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Laboratory Test</label>
                <Select value={selectedLab} onValueChange={setSelectedLab}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lab test" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hemoglobin">Hemoglobin</SelectItem>
                    <SelectItem value="anc">Absolute Neutrophil Count</SelectItem>
                    <SelectItem value="platelets">Platelets</SelectItem>
                    <SelectItem value="creatinine">Creatinine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedLab && (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded">
                    <h4 className="font-medium text-green-700">Reference Ranges</h4>
                    <div className="text-sm space-y-1">
                      {Object.entries(labReferenceRanges[selectedLab as keyof typeof labReferenceRanges]).map(([key, value]) => (
                        key !== 'interpretation' && (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  <Alert className="bg-green-50 border-green-200">
                    <TestTube className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {labReferenceRanges[selectedLab as keyof typeof labReferenceRanges].interpretation}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-purple-600" />
              Tumor Markers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tumorMarkers).map(([marker, data]) => (
                <div key={marker} className="p-3 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-purple-700 uppercase">{marker}</h4>
                    <Badge variant="outline" className="text-xs">{data.normal}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Cancers:</strong> {data.cancers}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {data.interpretation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Emergency Protocols
const EmergencyProtocols = () => {
  const oncologyEmergencies = [
    {
      name: "Neutropenic Fever",
      priority: "High",
      criteria: "ANC &lt;1000 + fever &gt;38.3°C",
      management: [
        "Immediate blood cultures (peripheral + central if applicable)",
        "Broad-spectrum antibiotics within 1 hour",
        "Piperacillin-tazobactam 4.5g IV q6h OR cefepime 2g IV q8h",
        "Daily monitoring of ANC, vital signs",
        "Consider G-CSF if prolonged neutropenia"
      ],
      contraindications: ["Delay in antibiotic administration", "Oral antibiotics for high-risk patients"]
    },
    {
      name: "Tumor Lysis Syndrome",
      priority: "High",
      criteria: "↑K+, ↑PO4, ↑uric acid, ↓Ca2+",
      management: [
        "Aggressive IV hydration 3L/m²/day",
        "Allopurinol 300mg PO BID or rasburicase",
        "Monitor K+, PO4, Ca2+, uric acid q6h",
        "Treat hyperkalemia, hyperphosphatemia",
        "Consider hemodialysis if severe"
      ],
      contraindications: ["Rasburicase in G6PD deficiency", "Inadequate hydration"]
    },
    {
      name: "Hypercalcemia of Malignancy",
      priority: "Medium",
      criteria: "Ca2+ &gt;11.5 mg/dL with symptoms",
      management: [
        "IV normal saline 1-2L bolus, then 200-300 mL/hr",
        "Pamidronate 90mg IV over 2-4 hours",
        "Or zoledronic acid 4mg IV over 15 minutes",
        "Monitor calcium, phosphorus, magnesium",
        "Treat underlying malignancy"
      ],
      contraindications: ["Thiazide diuretics", "Calcium supplementation"]
    }
  ];

  return (
    <div className="space-y-6">
      {oncologyEmergencies.map((emergency, index) => (
        <Card key={index} className={`border-l-4 ${emergency.priority === 'High' ? 'border-l-red-500' : 'border-l-orange-500'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className={`h-5 w-5 ${emergency.priority === 'High' ? 'text-red-600' : 'text-orange-600'}`} />
              {emergency.name}
              <Badge variant={emergency.priority === 'High' ? 'destructive' : 'secondary'}>
                {emergency.priority} Priority
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className={`${emergency.priority === 'High' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                <AlertTriangle className={`h-4 w-4 ${emergency.priority === 'High' ? 'text-red-600' : 'text-orange-600'}`} />
                <AlertDescription className={emergency.priority === 'High' ? 'text-red-800' : 'text-orange-800'}>
                  <strong>Criteria:</strong> {emergency.criteria}
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Immediate Management</h4>
                  <ul className="space-y-1 text-sm">
                    {emergency.management.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <Badge variant="outline" className="text-xs mt-0.5">{stepIndex + 1}</Badge>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Contraindications</h4>
                  <ul className="space-y-1 text-sm">
                    {emergency.contraindications.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Clinical Assessment Tools
const ClinicalAssessment = () => {
  const [ecogScore, setEcogScore] = useState("");
  const [karnofskyScore, setKarnofskyScore] = useState("");
  const [esasScores, setEsasScores] = useState({
    pain: 0,
    fatigue: 0,
    nausea: 0,
    depression: 0,
    anxiety: 0,
    drowsiness: 0,
    appetite: 0,
    wellbeing: 0,
    breathlessness: 0,
    other: 0
  });

  const ecogDescriptions = {
    "0": "Fully active, no performance restrictions",
    "1": "Restricted in physically strenuous activity but ambulatory",
    "2": "Ambulatory and capable of self-care but unable to work",
    "3": "Capable of limited self-care, confined to bed/chair &gt;50% of time",
    "4": "Completely disabled, cannot carry out any self-care"
  };

  const karnofskyDescriptions = {
    "100": "Normal, no complaints, no evidence of disease",
    "90": "Able to carry on normal activity; minor symptoms",
    "80": "Normal activity with effort; some symptoms",
    "70": "Cares for self; unable to carry on normal activity",
    "60": "Requires occasional assistance but cares for most needs",
    "50": "Requires considerable assistance and frequent medical care",
    "40": "Disabled; requires special care and assistance",
    "30": "Severely disabled; hospitalization indicated",
    "20": "Very sick; hospitalization necessary",
    "10": "Moribund; fatal processes progressing rapidly"
  };

  const calculateEsasTotal = () => {
    return Object.values(esasScores).reduce((sum, score) => sum + score, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* ECOG Performance Status */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              ECOG Performance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">ECOG Score</label>
                <Select value={ecogScore} onValueChange={setEcogScore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ECOG score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ecogDescriptions).map(([score, description]) => (
                      <SelectItem key={score} value={score}>
                        ECOG {score} - {description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {ecogScore && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>ECOG {ecogScore}</strong><br/>
                    {ecogDescriptions[ecogScore as keyof typeof ecogDescriptions]}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Karnofsky Performance Scale */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-purple-600" />
              Karnofsky Performance Scale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Karnofsky Score</label>
                <Select value={karnofskyScore} onValueChange={setKarnofskyScore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Karnofsky score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(karnofskyDescriptions).map(([score, description]) => (
                      <SelectItem key={score} value={score}>
                        KPS {score} - {description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {karnofskyScore && (
                <Alert className="bg-purple-50 border-purple-200">
                  <Gauge className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>KPS {karnofskyScore}</strong><br/>
                    {karnofskyDescriptions[karnofskyScore as keyof typeof karnofskyDescriptions]}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ESAS Assessment */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            Edmonton Symptom Assessment System (ESAS)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Rate each symptom from 0 (no symptom) to 10 (worst possible symptom)
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(esasScores).map(([symptom, score]) => (
                <div key={symptom} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium capitalize">{symptom}</label>
                    <span className="text-sm font-bold">{score}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={score}
                    onChange={(e) => setEsasScores(prev => ({
                      ...prev,
                      [symptom]: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <Alert className="bg-orange-50 border-orange-200">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Total ESAS Score: {calculateEsasTotal()}/100</strong><br/>
                Score ≥7 for any symptom indicates moderate to severe distress
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Component
export default function ComprehensiveClinicalTools() {
  const [selectedCategory, setSelectedCategory] = useState("dosing");

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case "dosing":
        return <DosingCalculations />;
      case "assessment":
        return <ClinicalAssessment />;
      case "biomarkers":
        return <BiomarkerTools />;
      case "staging":
        return <StagingResponseTools />;
      case "toxicity":
        return <ToxicityManagement />;
      case "predictive":
        return <PredictiveModels />;
      case "labs":
        return <LaboratoryTools />;
      case "electrolytes":
        return <ElectrolyteCorrections />;
      case "supportive":
        return <SupportiveCare />;
      case "emergency":
        return <EmergencyProtocols />;
      default:
        return <DosingCalculations />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Comprehensive Clinical Tools</h2>
          <p className="text-muted-foreground">
            Advanced calculators, assessment tools, and clinical decision support for comprehensive cancer management
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Brain className="h-3 w-3 mr-1" />
          NCCN Guidelines Based
        </Badge>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          {CLINICAL_TOOL_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {CLINICAL_TOOL_CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            {renderCategoryContent()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}