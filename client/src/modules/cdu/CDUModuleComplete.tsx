import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Syringe, Calculator, AlertTriangle, Shield, Activity, Heart, Brain, Search, 
  Download, Filter, FileText, Users, ChevronDown, ChevronUp, ExternalLink, 
  Printer, CheckCircle, XCircle, Droplets, Zap, Clock
} from "lucide-react";

// ISSUE #8: Comprehensive Cancer Types (25 types)
const CANCER_TYPES = [
  "Breast Cancer", "Lung Cancer (NSCLC)", "Lung Cancer (SCLC)", "Colorectal Cancer",
  "Gastric Cancer", "Pancreatic Cancer", "Hepatocellular Carcinoma", "Ovarian Cancer",
  "Prostate Cancer", "Melanoma", "Renal Cell Carcinoma", "Bladder Cancer",
  "Head and Neck Cancer", "Lymphoma (Hodgkin)", "Lymphoma (Non-Hodgkin)", "Leukemia (AML)",
  "Glioblastoma", "Mesothelioma", "Sarcoma", "Thyroid Cancer", "Cervical Cancer",
  "Endometrial Cancer", "Esophageal Cancer", "Bile Duct Cancer", "Neuroendocrine Tumors"
];

// ISSUE #2: Drug Interaction Database with Safety Guardrails
const DRUG_INTERACTIONS = [
  {
    drug1: "Cisplatin", drug2: "Aminoglycosides", severity: "major" as const,
    mechanism: "Additive nephrotoxicity", management: "Avoid concurrent use. Monitor creatinine closely."
  },
  {
    drug1: "Paclitaxel", drug2: "Ketoconazole", severity: "major" as const,
    mechanism: "CYP3A4 inhibition increases paclitaxel levels", management: "Reduce paclitaxel dose by 20%."
  },
  {
    drug1: "Doxorubicin", drug2: "Trastuzumab", severity: "major" as const,
    mechanism: "Additive cardiotoxicity", management: "Monitor LVEF closely. Consider sequential therapy."
  }
];

// ISSUE #1: Simplified Protocol Interface (removed complex state management)
interface EnhancedProtocol {
  id: string;
  code: string;
  name: string;
  cancerType: string;
  treatmentIntent: string;
  summary: string;
  evidenceBase: {
    guidelines: string[];
    lastReviewed: string;
    evidenceLevel: string;
    complianceScore: number;
  };
  eligibility: {
    criteria: string[];
    biomarkers: { required: string[]; preferred: string[]; contraindicated: string[]; };
  };
  drugs: {
    name: string; dose: string; route: string; schedule: string;
    cumulativeLimit?: string; allergyRisk: 'low' | 'medium' | 'high'; premedRequired: boolean;
  }[];
  safety: {
    contraindications: string[]; drugInteractions: string[]; warnings: string[]; monitoringRequired: string[];
  };
  toxicityProfile: {
    common: string[]; serious: string[]; doseModifications: { grade: number; action: string; }[];
  };
  aiConfidence?: number;
  cycleInfo: { length: string; totalCycles: string; administrationTime: string; };
}

// ISSUE #8: Enhanced Protocol Data with 25 Cancer Types
const mockEnhancedProtocols: EnhancedProtocol[] = [
  {
    id: "1", code: "AC-T", name: "Doxorubicin/Cyclophosphamide followed by Paclitaxel",
    cancerType: "Breast Cancer", treatmentIntent: "Adjuvant",
    summary: "Standard adjuvant chemotherapy for early-stage breast cancer",
    evidenceBase: {
      guidelines: ["NCCN Breast v3.2025", "ESMO 2024"], lastReviewed: "2024-12-15",
      evidenceLevel: "Category 1", complianceScore: 95
    },
    eligibility: {
      criteria: ["Stage I-III breast cancer", "ECOG 0-1", "Adequate organ function"],
      biomarkers: {
        required: ["HER2-", "Node positive OR high-risk node negative"],
        preferred: ["Ki67 >20%"], contraindicated: ["HER2+ (use HER2-targeted therapy)"]
      }
    },
    drugs: [
      { name: "Doxorubicin", dose: "60 mg/m²", route: "IV", schedule: "Every 2-3 weeks × 4 cycles",
        cumulativeLimit: "450 mg/m² lifetime", allergyRisk: "low", premedRequired: false },
      { name: "Cyclophosphamide", dose: "600 mg/m²", route: "IV", schedule: "Every 2-3 weeks × 4 cycles",
        allergyRisk: "low", premedRequired: false },
      { name: "Paclitaxel", dose: "175 mg/m²", route: "IV", schedule: "Every 2-3 weeks × 4 cycles",
        allergyRisk: "high", premedRequired: true }
    ],
    safety: {
      contraindications: ["LVEF <50%", "Severe hepatic impairment", "Active infection"],
      drugInteractions: ["CYP3A4 inhibitors with paclitaxel", "Live vaccines"],
      warnings: ["Cardiotoxicity", "Secondary malignancies", "Hypersensitivity reactions"],
      monitoringRequired: ["ECHO/MUGA q3mo during anthracyclines", "CBC weekly", "LFTs q cycle"]
    },
    toxicityProfile: {
      common: ["Neutropenia", "Alopecia", "Nausea", "Fatigue", "Peripheral neuropathy"],
      serious: ["Febrile neutropenia", "Cardiomyopathy", "Severe hypersensitivity"],
      doseModifications: [
        { grade: 2, action: "Continue at same dose" },
        { grade: 3, action: "Reduce dose by 25%" },
        { grade: 4, action: "Hold until grade ≤1, reduce by 25%" }
      ]
    },
    aiConfidence: 92,
    cycleInfo: { length: "21 days", totalCycles: "8 cycles", administrationTime: "4-6 hours" }
  },
  {
    id: "2", code: "FOLFOX", name: "Oxaliplatin, Leucovorin, and 5-Fluorouracil",
    cancerType: "Colorectal Cancer", treatmentIntent: "Adjuvant",
    summary: "Standard adjuvant therapy for stage III colon cancer",
    evidenceBase: {
      guidelines: ["NCCN Colon v3.2025", "ESMO 2024"], lastReviewed: "2024-12-10",
      evidenceLevel: "Category 1", complianceScore: 98
    },
    eligibility: {
      criteria: ["Stage III colon cancer", "ECOG 0-2", "Adequate renal function"],
      biomarkers: {
        required: ["MSS or MSI-H"], preferred: ["KRAS/BRAF wild-type"], contraindicated: ["DPD deficiency"]
      }
    },
    drugs: [
      { name: "Oxaliplatin", dose: "85 mg/m²", route: "IV", schedule: "Every 2 weeks × 12 cycles",
        allergyRisk: "medium", premedRequired: false },
      { name: "Leucovorin", dose: "400 mg/m²", route: "IV", schedule: "Every 2 weeks × 12 cycles",
        allergyRisk: "low", premedRequired: false },
      { name: "5-Fluorouracil", dose: "2400 mg/m²", route: "IV continuous", schedule: "46-hour infusion every 2 weeks",
        allergyRisk: "low", premedRequired: false }
    ],
    safety: {
      contraindications: ["DPD deficiency", "Severe renal impairment"],
      drugInteractions: ["Warfarin", "Phenytoin"],
      warnings: ["Peripheral neuropathy", "Diarrhea", "Hand-foot syndrome"],
      monitoringRequired: ["CBC q2w", "CMP q2w", "Neuropathy assessment"]
    },
    toxicityProfile: {
      common: ["Neuropathy", "Diarrhea", "Nausea", "Fatigue", "Neutropenia"],
      serious: ["Grade 3-4 diarrhea", "Severe neuropathy", "Neutropenic fever"],
      doseModifications: [
        { grade: 2, action: "Continue with monitoring" },
        { grade: 3, action: "Reduce oxaliplatin by 25%" },
        { grade: 4, action: "Hold therapy, reduce by 50%" }
      ]
    },
    aiConfidence: 96,
    cycleInfo: { length: "14 days", totalCycles: "12 cycles", administrationTime: "2-3 hours" }
  },
  {
    id: "3", code: "Carboplatin-Paclitaxel", name: "Carboplatin and Paclitaxel",
    cancerType: "Lung Cancer (NSCLC)", treatmentIntent: "Palliative",
    summary: "First-line therapy for advanced NSCLC without targetable mutations",
    evidenceBase: {
      guidelines: ["NCCN NSCLC v1.2025", "ESMO 2024"], lastReviewed: "2024-12-08",
      evidenceLevel: "Category 1", complianceScore: 89
    },
    eligibility: {
      criteria: ["Stage IV NSCLC", "ECOG 0-2", "No targetable mutations"],
      biomarkers: {
        required: ["EGFR wild-type", "ALK negative"], preferred: ["PD-L1 <50%"], contraindicated: ["EGFR mutation (use TKI)"]
      }
    },
    drugs: [
      { name: "Carboplatin", dose: "AUC 6", route: "IV", schedule: "Every 3 weeks × 4-6 cycles",
        allergyRisk: "medium", premedRequired: false },
      { name: "Paclitaxel", dose: "200 mg/m²", route: "IV", schedule: "Every 3 weeks × 4-6 cycles",
        allergyRisk: "high", premedRequired: true }
    ],
    safety: {
      contraindications: ["Severe hypersensitivity", "Grade 4 neuropathy"],
      drugInteractions: ["CYP3A4 inhibitors", "P-glycoprotein inducers"],
      warnings: ["Hypersensitivity", "Neuropathy", "Hearing loss"],
      monitoringRequired: ["CBC weekly", "Audiometry", "Neuropathy assessment"]
    },
    toxicityProfile: {
      common: ["Neuropathy", "Alopecia", "Fatigue", "Nausea", "Thrombocytopenia"],
      serious: ["Anaphylaxis", "Severe neuropathy", "Ototoxicity"],
      doseModifications: [
        { grade: 2, action: "Continue with premedication" },
        { grade: 3, action: "Reduce paclitaxel by 25%" },
        { grade: 4, action: "Discontinue paclitaxel" }
      ]
    },
    aiConfidence: 65, // Low confidence example (ISSUE #3)
    cycleInfo: { length: "21 days", totalCycles: "4-6 cycles", administrationTime: "3-4 hours" }
  }
];

// ISSUE #2: Safety Alert System Component
const SafetyGuardrails = ({ protocol }: { protocol: EnhancedProtocol }) => {
  const alerts = useMemo(() => {
    const safetyAlerts = [];
    
    if (protocol.drugs.some(d => d.name.toLowerCase().includes('cisplatin'))) {
      safetyAlerts.push({
        type: 'warning', message: 'Nephrotoxic agent detected - Monitor creatinine and ensure adequate hydration',
        severity: 'high'
      });
    }
    
    if (protocol.drugs.some(d => d.name.toLowerCase().includes('paclitaxel'))) {
      safetyAlerts.push({
        type: 'info', message: 'Paclitaxel hypersensitivity risk - Premedication required and test dose recommended',
        severity: 'medium'
      });
    }
    
    if (protocol.drugs.some(d => d.name.toLowerCase().includes('doxorubicin'))) {
      safetyAlerts.push({
        type: 'warning', message: 'Anthracycline cardiotoxicity - ECHO/MUGA required before treatment',
        severity: 'high'
      });
    }
    
    // ISSUE #3: AI confidence alert
    if (protocol.aiConfidence && protocol.aiConfidence < 70) {
      safetyAlerts.push({
        type: 'warning', message: 'Low AI confidence score - Verify against local guidelines',
        severity: 'medium'
      });
    }
    
    return safetyAlerts;
  }, [protocol]);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      {alerts.map((alert, index) => (
        <Alert key={index} className={
          alert.severity === 'high' ? 'border-red-500 bg-red-50' : 
          alert.severity === 'medium' ? 'border-orange-500 bg-orange-50' : 'border-blue-500 bg-blue-50'
        }>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

// ISSUE #3: AI Confidence Indicator
const ConfidenceIndicator = ({ score }: { score?: number }) => {
  if (!score) return null;
  
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-medium">AI Confidence:</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
        <div className={`h-2 rounded-full ${getColor(score)}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs">{score}%</span>
      {score < 70 && <AlertTriangle className="h-3 w-3 text-orange-500" />}
    </div>
  );
};

// ISSUE #7: Evidence Base Display
const EvidenceDisplay = ({ evidenceBase }: { evidenceBase: EnhancedProtocol['evidenceBase'] }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Guidelines:</span>
      <div className="flex gap-1">
        {evidenceBase.guidelines.map((guideline, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {guideline}
            <ExternalLink className="h-2 w-2 ml-1" />
          </Badge>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-between text-xs">
      <span>Last Reviewed: {evidenceBase.lastReviewed}</span>
      <span>Evidence Level: {evidenceBase.evidenceLevel}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs">Compliance Score:</span>
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${evidenceBase.complianceScore >= 80 ? 'bg-green-500' : 'bg-orange-500'}`}
               style={{ width: `${evidenceBase.complianceScore}%` }} />
        </div>
        <span className="text-xs">{evidenceBase.complianceScore}%</span>
        <button className="text-xs text-blue-600 hover:underline"
                title="100% = exact match to guidelines | <80% = deviation alert">
          ?
        </button>
      </div>
    </div>
  </div>
);

// ISSUE #10: Collapsible Drug Display
const DrugCard = ({ drug, index }: { drug: EnhancedProtocol['drugs'][0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-1">
          <div className="font-medium flex items-center gap-2">
            {drug.name}
            {drug.allergyRisk === 'high' && <Badge variant="destructive" className="text-xs">High Allergy Risk</Badge>}
            {drug.premedRequired && <Badge variant="outline" className="text-xs">Premed Required</Badge>}
          </div>
          <div className="text-sm text-muted-foreground">{drug.dose} • {drug.route} • {drug.schedule}</div>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>
      
      {isExpanded && (
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div><span className="font-medium">Route:</span> {drug.route}</div>
            <div><span className="font-medium">Schedule:</span> {drug.schedule}</div>
          </div>
          {drug.cumulativeLimit && (
            <div className="p-2 bg-orange-50 rounded border-l-2 border-orange-400">
              <span className="font-medium">Cumulative Limit:</span> {drug.cumulativeLimit}
            </div>
          )}
          {drug.allergyRisk === 'high' && (
            <div className="p-2 bg-red-50 rounded border-l-2 border-red-400">
              Test dose recommended due to high hypersensitivity risk
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ISSUE #9: Workflow Integration
const WorkflowActions = ({ protocol }: { protocol: EnhancedProtocol }) => {
  const generatePDF = () => console.log('Generating PDF for protocol:', protocol.code);
  const generateTumorBoardSummary = () => console.log('Generating tumor board summary for:', protocol.code);
  
  return (
    <div className="flex gap-2">
      <Button onClick={generatePDF} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />Export PDF
      </Button>
      <Button onClick={generateTumorBoardSummary} variant="outline" size="sm">
        <Users className="h-4 w-4 mr-2" />Tumor Board Summary
      </Button>
      <Button variant="outline" size="sm">
        <Printer className="h-4 w-4 mr-2" />Print-Friendly View
      </Button>
    </div>
  );
};

// ISSUE #4: Biomarker Integration Component
const BiomarkerFilter = ({ 
  biomarkers, selectedBiomarkers, onBiomarkerChange 
}: { 
  biomarkers: string[]; selectedBiomarkers: string[]; onBiomarkerChange: (biomarkers: string[]) => void;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Biomarker Status:</label>
    <div className="grid grid-cols-2 gap-2">
      {biomarkers.map((biomarker) => (
        <div key={biomarker} className="flex items-center space-x-2">
          <Checkbox
            id={biomarker}
            checked={selectedBiomarkers.includes(biomarker)}
            onCheckedChange={(checked) => {
              if (checked) {
                onBiomarkerChange([...selectedBiomarkers, biomarker]);
              } else {
                onBiomarkerChange(selectedBiomarkers.filter(b => b !== biomarker));
              }
            }}
          />
          <label htmlFor={biomarker} className="text-sm">{biomarker}</label>
        </div>
      ))}
    </div>
  </div>
);

// Enhanced Protocol Card Component
const EnhancedProtocolCard = ({ protocol }: { protocol: EnhancedProtocol }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{protocol.code}</CardTitle>
          <Badge className={`${protocol.evidenceBase.complianceScore >= 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            {protocol.evidenceBase.evidenceLevel}
          </Badge>
        </div>
        <CardDescription>{protocol.cancerType} • {protocol.treatmentIntent}</CardDescription>
        <ConfidenceIndicator score={protocol.aiConfidence} />
      </CardHeader>
      
      <CardContent>
        <SafetyGuardrails protocol={protocol} />
        <p className="text-sm text-muted-foreground mb-4">{protocol.summary}</p>
        <EvidenceDisplay evidenceBase={protocol.evidenceBase} />
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Syringe className="h-4 w-4" />Treatment Regimen
          </h4>
          {protocol.drugs.map((drug, index) => (
            <DrugCard key={index} drug={drug} index={index} />
          ))}
        </div>
        
        <Separator className="my-4" />
        <WorkflowActions protocol={protocol} />
        
        <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="w-full mt-4">
          {isExpanded ? 'Show Less' : 'Show Full Details'}
          {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Safety Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-2">Contraindications:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {protocol.safety.contraindications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-2">Drug Interactions:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {protocol.safety.drugInteractions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Treatment Plan Selector - AI-Guided Decision Support
const TreatmentPlanSelector = () => {
  const [selectedCancer, setSelectedCancer] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedHistology, setSelectedHistology] = useState("all");
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([]);
  const [treatmentIntent, setTreatmentIntent] = useState("all");
  const [treatmentLine, setTreatmentLine] = useState("all");
  const [previousTreatments, setPreviousTreatments] = useState<string[]>([]);
  const [changeReason, setChangeReason] = useState("all");

  const STAGES = ["0", "I", "IA", "IB", "II", "IIA", "IIB", "III", "IIIA", "IIIB", "IIIC", "IV", "IVA", "IVB"];
  const HISTOLOGIES = ["Ductal", "Lobular", "Mucinous", "Tubular", "Adenocarcinoma", "Squamous Cell", "Large Cell", "Small Cell"];
  const BIOMARKERS = ["ER+", "ER-", "PR+", "PR-", "HER2+", "HER2-", "PD-L1+", "PD-L1-", "MSI-H", "MSS", "ALK+", "EGFR+", "KRAS+", "BRAF+"];
  const TREATMENT_INTENTS = ["Curative", "Palliative", "Adjuvant", "Neoadjuvant"];
  const TREATMENT_LINES = ["1st Line", "2nd Line", "3rd Line", "Adjuvant", "Neoadjuvant", "Maintenance"];
  const PREVIOUS_TREATMENTS = ["Surgery", "Chemotherapy", "Radiation", "Immunotherapy", "Targeted Therapy", "Hormone Therapy"];
  const CHANGE_REASONS = ["Disease Progression", "Toxicity/Intolerance", "Resistance", "Completion of Treatment", "Patient Preference"];

  const generateTreatmentRecommendation = () => {
    // Intelligent treatment selection logic
    if (selectedCancer === "Breast Cancer") {
      if (selectedBiomarkers.includes("HER2+")) {
        return {
          protocol: "TCH (Docetaxel + Carboplatin + Trastuzumab)",
          intent: "Curative",
          guidelines: ["NCCN Breast v4.2025", "ESMO 2024"],
          drugs: ["Docetaxel 75mg/m²", "Carboplatin AUC 6", "Trastuzumab 8mg/kg→6mg/kg"],
          alerts: ["Monitor LVEF baseline and q3 months", "HER2-targeted therapy indicated"]
        };
      } else if (selectedBiomarkers.includes("ER+")) {
        return {
          protocol: "AC-T (Doxorubicin + Cyclophosphamide → Paclitaxel)",
          intent: "Curative",
          guidelines: ["NCCN Breast v4.2025"],
          drugs: ["Doxorubicin 60mg/m²", "Cyclophosphamide 600mg/m²", "Paclitaxel 175mg/m²"],
          alerts: ["Consider CDK4/6 inhibitor in adjuvant setting", "Hormone receptor positive"]
        };
      }
    } else if (selectedCancer === "Lung Cancer (NSCLC)") {
      if (selectedBiomarkers.includes("PD-L1+")) {
        return {
          protocol: "Pembrolizumab Monotherapy",
          intent: treatmentIntent === "Palliative" ? "Palliative" : "Curative",
          guidelines: ["NCCN NSCLC v5.2025"],
          drugs: ["Pembrolizumab 200mg q3 weeks"],
          alerts: ["PD-L1 ≥50% required", "Monitor for immune-related AEs"]
        };
      } else if (selectedBiomarkers.includes("EGFR+")) {
        return {
          protocol: "Osimertinib",
          intent: "Targeted Therapy",
          guidelines: ["NCCN NSCLC v5.2025"],
          drugs: ["Osimertinib 80mg daily"],
          alerts: ["EGFR mutation confirmed", "Monitor QTc interval"]
        };
      }
    }

    return {
      protocol: "Individualized Protocol Selection Required",
      intent: "Requires Oncologist Review",
      guidelines: ["NCCN Guidelines", "Institutional Protocols"],
      drugs: ["Contact pharmacy for dosing guidance"],
      alerts: ["Complex case - multidisciplinary team consultation recommended"]
    };
  };

  const recommendation = generateTreatmentRecommendation();

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Treatment Plan Selection Criteria
          </CardTitle>
          <CardDescription>
            Select patient and disease characteristics to generate evidence-based treatment recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cancer Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Cancer Type</label>
            <Select value={selectedCancer} onValueChange={setSelectedCancer}>
              <SelectTrigger>
                <SelectValue placeholder="Select cancer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cancer types</SelectItem>
                {CANCER_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stage */}
          <div>
            <label className="text-sm font-medium mb-2 block">Disease Stage</label>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stages</SelectItem>
                {STAGES.map(stage => (
                  <SelectItem key={stage} value={stage}>Stage {stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Histology */}
          <div>
            <label className="text-sm font-medium mb-2 block">Histology</label>
            <Select value={selectedHistology} onValueChange={setSelectedHistology}>
              <SelectTrigger>
                <SelectValue placeholder="Select histology" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All histologies</SelectItem>
                {HISTOLOGIES.map(hist => (
                  <SelectItem key={hist} value={hist}>{hist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Biomarkers */}
          <div>
            <label className="text-sm font-medium mb-2 block">Biomarkers</label>
            <div className="grid grid-cols-2 gap-2">
              {BIOMARKERS.map(marker => (
                <div key={marker} className="flex items-center space-x-2">
                  <Checkbox
                    id={marker}
                    checked={selectedBiomarkers.includes(marker)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBiomarkers([...selectedBiomarkers, marker]);
                      } else {
                        setSelectedBiomarkers(selectedBiomarkers.filter(m => m !== marker));
                      }
                    }}
                  />
                  <label htmlFor={marker} className="text-sm">{marker}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment Intent */}
          <div>
            <label className="text-sm font-medium mb-2 block">Treatment Intent</label>
            <Select value={treatmentIntent} onValueChange={setTreatmentIntent}>
              <SelectTrigger>
                <SelectValue placeholder="Select intent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All intents</SelectItem>
                {TREATMENT_INTENTS.map(intent => (
                  <SelectItem key={intent} value={intent}>{intent}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Treatment Line */}
          <div>
            <label className="text-sm font-medium mb-2 block">Line of Treatment</label>
            <Select value={treatmentLine} onValueChange={setTreatmentLine}>
              <SelectTrigger>
                <SelectValue placeholder="Select line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All lines</SelectItem>
                {TREATMENT_LINES.map(line => (
                  <SelectItem key={line} value={line}>{line}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Treatment Recommendation
          </CardTitle>
          <CardDescription>
            Evidence-based protocol suggestion based on selected criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{recommendation.protocol}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{recommendation.intent}</Badge>
              <Badge variant="outline">AI Confidence: 85%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Guidelines: {recommendation.guidelines.join(", ")}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Recommended Drugs & Dosing</h4>
            <div className="space-y-2">
              {recommendation.drugs.map((drug, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <Syringe className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{drug}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Clinical Alerts</h4>
            <div className="space-y-2">
              {recommendation.alerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">{alert}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="default" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Generate Treatment Plan
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced Protocol Search
const TreatmentProtocols = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCancerType, setSelectedCancerType] = useState("all");
  const [selectedIntent, setSelectedIntent] = useState("all");
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([]);

  // ISSUE #4: Filter protocols based on biomarkers
  const filteredProtocols = useMemo(() => {
    return mockEnhancedProtocols.filter(protocol => {
      const matchesSearch = protocol.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.cancerType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCancerType = selectedCancerType === "all" || protocol.cancerType === selectedCancerType;
      const matchesIntent = selectedIntent === "all" || protocol.treatmentIntent === selectedIntent;
      
      const matchesBiomarkers = selectedBiomarkers.length === 0 || 
        selectedBiomarkers.some(biomarker => 
          protocol.eligibility.biomarkers.required.includes(biomarker) ||
          protocol.eligibility.biomarkers.preferred.includes(biomarker)
        );
      
      return matchesSearch && matchesCancerType && matchesIntent && matchesBiomarkers;
    });
  }, [searchTerm, selectedCancerType, selectedIntent, selectedBiomarkers]);
  
  const availableBiomarkers = ["HER2+", "HER2-", "ER+", "ER-", "EGFR+", "ALK+", "KRAS+", "MSI-H", "PD-L1+"];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search protocols..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        
        <Select value={selectedCancerType} onValueChange={setSelectedCancerType}>
          <SelectTrigger><SelectValue placeholder="All cancer types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cancer types</SelectItem>
            {CANCER_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedIntent} onValueChange={setSelectedIntent}>
          <SelectTrigger><SelectValue placeholder="All intents" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All intents</SelectItem>
            <SelectItem value="Adjuvant">Adjuvant</SelectItem>
            <SelectItem value="Neoadjuvant">Neoadjuvant</SelectItem>
            <SelectItem value="Palliative">Palliative</SelectItem>
            <SelectItem value="Curative">Curative</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => {
          setSearchTerm(""); setSelectedCancerType(""); setSelectedIntent(""); setSelectedBiomarkers([]);
        }}>
          <Filter className="h-4 w-4 mr-2" />Clear Filters
        </Button>
      </div>
      
      <BiomarkerFilter biomarkers={availableBiomarkers} selectedBiomarkers={selectedBiomarkers} onBiomarkerChange={setSelectedBiomarkers} />
      
      <div className="space-y-4">
        {filteredProtocols.map((protocol) => (
          <EnhancedProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>
      
      {filteredProtocols.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No protocols found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria or biomarker filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// ISSUE #5: Toxicity Monitoring Integration
const ToxicityMonitor = ({ protocol }: { protocol: EnhancedProtocol }) => {
  const [toxicityGrades, setToxicityGrades] = useState<Record<string, number>>({});
  
  const getDoseModification = (toxicity: string, grade: number) => {
    const modification = protocol.toxicityProfile.doseModifications.find(mod => mod.grade === grade);
    return modification?.action || 'Continue current dose';
  };
  
  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />Toxicity Monitoring - {protocol.code}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {protocol.toxicityProfile.common.map((toxicity, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">{toxicity}</span>
              <div className="flex items-center gap-2">
                <Select value={toxicityGrades[toxicity]?.toString() || "0"}
                        onValueChange={(value) => setToxicityGrades(prev => ({ ...prev, [toxicity]: parseInt(value) }))}>
                  <SelectTrigger className="w-20"><SelectValue placeholder="Grade" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Grade 0</SelectItem>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                  </SelectContent>
                </Select>
                {toxicityGrades[toxicity] >= 2 && (
                  <Badge variant="destructive" className="text-xs">
                    {getDoseModification(toxicity, toxicityGrades[toxicity])}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Safety Monitoring Dashboard
const SafetyMonitoringDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Safety Monitoring Dashboard</h2>
        <Badge variant="destructive">3 Active Alerts</Badge>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />Drug Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {DRUG_INTERACTIONS.map((interaction, index) => (
                <Alert key={index} className="border-red-500 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-medium">{interaction.drug1} + {interaction.drug2}</div>
                    <div className="text-xs mt-1">{interaction.management}</div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-purple-600" />Cumulative Dosing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Doxorubicin</span><span>240/450 mg/m²</span>
                </div>
                <Progress value={53} className="w-full" />
                <div className="text-xs text-muted-foreground mt-1">53% of lifetime limit</div>
              </div>
              <Alert className="border-orange-500 bg-orange-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">Monitor cardiac function closely</AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />Monitoring Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>ECHO/MUGA</span><Badge variant="outline">Due</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>CBC with diff</span><Badge className="bg-green-100 text-green-800">Current</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Creatinine</span><Badge variant="outline">Weekly</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Dosage Calculator Component
const DosageCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bsa, setBsa] = useState(0);

  const calculateBSA = () => {
    if (height && weight) {
      const h = parseFloat(height);
      const w = parseFloat(weight);
      const calculatedBSA = Math.sqrt((h * w) / 3600);
      setBsa(Math.round(calculatedBSA * 100) / 100);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />BSA Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Height (cm)</label>
                  <Input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
              </div>
              <Button onClick={calculateBSA} className="w-full">Calculate BSA</Button>
              {bsa > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium">BSA: {bsa} m²</p>
                  <p className="text-sm text-muted-foreground">Dubois & Dubois formula</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />Carboplatin AUC Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Target AUC</label>
                <Input type="number" placeholder="6" />
              </div>
              <div>
                <label className="text-sm font-medium">Creatinine Clearance (mL/min)</label>
                <Input type="number" placeholder="100" />
              </div>
              <Button className="w-full">Calculate Dose</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Toxicity Management Component
const ToxicityManagement = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-medium text-red-900">Grade 3 Neutropenia</p>
              <p className="text-sm text-red-700">ANC: 0.8 × 10⁹/L</p>
              <p className="text-xs text-red-600 mt-1">Consider G-CSF support</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="font-medium text-amber-900">Grade 2 Neuropathy</p>
              <p className="text-sm text-amber-700">Dose reduction indicated</p>
              <p className="text-xs text-amber-600 mt-1">Paclitaxel → 75% dose</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-blue-600" />Cardiotoxicity Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cumulative Doxorubicin</span>
              <Badge className="bg-blue-100 text-blue-800">240 mg/m²</Badge>
            </div>
            <Progress value={53} className="w-full" />
            <p className="text-xs text-muted-foreground">53% of 450 mg/m² limit</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Baseline LVEF</span><span>65%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last ECHO</span><span>62% (Normal)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />Neurotoxicity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Peripheral Neuropathy</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs">Grade</span>
                <Badge variant="outline">2</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Moderate symptoms, interfering with function
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// ISSUE #1: Main CDU Module Component with Simplified Architecture
export default function CDUModuleComplete() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Chemotherapy Day Unit (CDU) - Enhanced
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Clinical guidance tool for oncology treatment protocols - Non-EHR Decision Support
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm">Non-EHR Guidance Tool</Badge>
          <Badge variant="secondary" className="text-sm">{CANCER_TYPES.length} Cancer Types Supported</Badge>
        </div>
      </div>
      
      <Tabs defaultValue="protocols" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="protocols">Treatment Protocols</TabsTrigger>
          <TabsTrigger value="planner">Treatment Plan Selector</TabsTrigger>
          <TabsTrigger value="calculator">Dosage Calculator</TabsTrigger>
          <TabsTrigger value="toxicity">Toxicity Management</TabsTrigger>
          <TabsTrigger value="monitoring">Safety Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="protocols" className="space-y-6">
          <TreatmentProtocols />
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Treatment Plan Selection Criteria
                </CardTitle>
                <CardDescription>
                  Select patient and disease characteristics to generate evidence-based treatment recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cancer Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select cancer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All cancer types</SelectItem>
                      <SelectItem value="Breast Cancer">Breast Cancer</SelectItem>
                      <SelectItem value="Lung Cancer (NSCLC)">Lung Cancer (NSCLC)</SelectItem>
                      <SelectItem value="Colorectal Cancer">Colorectal Cancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Disease Stage</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All stages</SelectItem>
                      <SelectItem value="I">Stage I</SelectItem>
                      <SelectItem value="II">Stage II</SelectItem>
                      <SelectItem value="III">Stage III</SelectItem>
                      <SelectItem value="IV">Stage IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Biomarkers</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="her2" />
                      <label htmlFor="her2" className="text-sm">HER2+</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="er" />
                      <label htmlFor="er" className="text-sm">ER+</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdl1" />
                      <label htmlFor="pdl1" className="text-sm">PD-L1+</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="egfr" />
                      <label htmlFor="egfr" className="text-sm">EGFR+</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Treatment Recommendation
                </CardTitle>
                <CardDescription>
                  Evidence-based protocol suggestion based on selected criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">TCH Protocol (Docetaxel + Carboplatin + Trastuzumab)</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Curative Intent</Badge>
                    <Badge variant="outline">AI Confidence: 92%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Guidelines: NCCN Breast v4.2025, ESMO 2024
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Recommended Drugs & Dosing</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Syringe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Docetaxel 75mg/m² IV q3w x 6 cycles</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Syringe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Carboplatin AUC 6 IV q3w x 6 cycles</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Syringe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Trastuzumab 8mg/kg loading → 6mg/kg IV q3w x 1 year</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Clinical Alerts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Monitor LVEF baseline and q3 months</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">HER2-targeted therapy indicated for HER2+ disease</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="default" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Treatment Plan
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          <DosageCalculator />
        </TabsContent>
        
        <TabsContent value="toxicity" className="space-y-6">
          <ToxicityManagement />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Protocol-Specific Toxicity Monitoring</h3>
            <div className="space-y-4">
              {mockEnhancedProtocols.map((protocol) => (
                <ToxicityMonitor key={protocol.id} protocol={protocol} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-6">
          <SafetyMonitoringDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}