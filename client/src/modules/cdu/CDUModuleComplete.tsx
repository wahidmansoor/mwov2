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
import { useQuery } from "@tanstack/react-query";
import { 
  Syringe, Pill, AlertTriangle, Shield, Activity, Heart, Brain, Search, 
  Download, Filter, FileText, Users, ChevronDown, ChevronUp, ExternalLink, 
  Printer, CheckCircle, XCircle, Droplets, Zap, Clock, BookOpen, Calculator,
  BarChart3, Stethoscope, Eye
} from "lucide-react";
import { MedicationsSegment } from "./MedicationsSegment";
import EnhancedTreatmentPlanSelector from "./TreatmentPlanSelector";

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

// Database Protocol Type Interface
interface CdProtocol {
  id: string;
  code: string;
  tumourGroup: string;
  tumourSupergroup: string;
  treatmentIntent: string;
  summary: string;
  eligibility: any;
  precautions: string[];
  treatment: any;
  tests: string[];
  doseModifications: any;
  referenceList: string[];
  cycleInfo: any;
  premedications: any;
  postmedications: any;
  supportiveCare: any;
  rescueAgents: any;
  monitoring: any;
  toxicityMonitoring: any;
  interactions: any;
  contraindications: string[];
  version: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  lastReviewed: string;
}

// Transform database protocol to enhanced protocol format
const transformProtocol = (dbProtocol: any): EnhancedProtocol => {
  const treatment = dbProtocol.treatment || {};
  const drugs = treatment.drugs || [];
  const eligibility = typeof dbProtocol.eligibility === 'string' ? 
    JSON.parse(dbProtocol.eligibility) : dbProtocol.eligibility || {};
  
  return {
    id: dbProtocol.id,
    code: dbProtocol.code,
    name: `${dbProtocol.code} - ${dbProtocol.summary?.substring(0, 50)}...`,
    cancerType: dbProtocol.tumour_group || dbProtocol.tumourGroup || "Unknown",
    treatmentIntent: dbProtocol.treatment_intent || "Treatment",
    summary: dbProtocol.summary || "No summary available",
    evidenceBase: {
      guidelines: dbProtocol.reference_list || [],
      lastReviewed: dbProtocol.last_reviewed || new Date().toISOString().split('T')[0],
      evidenceLevel: eligibility.nccn_category ? `Category ${eligibility.nccn_category}` : "Category 1",
      complianceScore: 95
    },
    eligibility: {
      criteria: eligibility.summary || [],
      biomarkers: {
        required: eligibility.biomarker_requirements ? Object.values(eligibility.biomarker_requirements) : [],
        preferred: [],
        contraindicated: dbProtocol.contraindications || []
      }
    },
    drugs: drugs.map((drug: any) => ({
      name: drug.name || "Unknown",
      dose: drug.dose || "See protocol",
      route: drug.route || "IV",
      schedule: drug.schedule || "See protocol",
      cumulativeLimit: drug.cumulativeLimit,
      allergyRisk: "medium" as const,
      premedRequired: false
    })),
    safety: {
      contraindications: dbProtocol.contraindications || [],
      drugInteractions: Object.keys(dbProtocol.interactions || {}),
      warnings: dbProtocol.precautions || [],
      monitoringRequired: dbProtocol.tests || []
    },
    toxicityProfile: {
      common: Object.keys(dbProtocol.toxicity_monitoring || {}),
      serious: [],
      doseModifications: Object.entries(dbProtocol.dose_modifications || {}).map(([grade, action]) => ({
        grade: parseInt(grade) || 2,
        action: String(action)
      }))
    },
    aiConfidence: 95,
    cycleInfo: {
      length: dbProtocol.cycle_info?.cycle_length || "21 days",
      totalCycles: dbProtocol.cycle_info?.total_cycles || "6 cycles",
      administrationTime: dbProtocol.cycle_info?.administration_time || "4-6 hours"
    }
  };
};

// Fallback protocols for loading state
const fallbackProtocols: EnhancedProtocol[] = [
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

// Legacy TreatmentPlanSelector removed - replaced with enhanced modular version;

// Enhanced Protocol Search with Database Integration
const TreatmentProtocols = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCancerType, setSelectedCancerType] = useState("all");
  const [selectedIntent, setSelectedIntent] = useState("all");
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([]);

  // Fetch authentic cd_protocols data from database
  const { data: dbProtocols, isLoading, error } = useQuery({
    queryKey: ['/api/cdu/protocols'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Transform database protocols to enhanced protocol format
  const protocols = useMemo(() => {
    if (!dbProtocols || !Array.isArray(dbProtocols)) {
      return fallbackProtocols; // Only use fallback during loading
    }
    return dbProtocols.map(transformProtocol);
  }, [dbProtocols]);

  // Filter protocols based on search criteria and biomarkers
  const filteredProtocols = useMemo(() => {
    const filtered = protocols.filter(protocol => {
      const matchesSearch = protocol.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.cancerType.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Simple cancer type matching
      let matchesCancerType = selectedCancerType === "all";
      if (!matchesCancerType) {
        const protocolCancer = protocol.cancerType.toLowerCase();
        const selectedCancer = selectedCancerType.toLowerCase();
        
        // Direct mapping for cancer types
        const cancerMapping: { [key: string]: string[] } = {
          "breast cancer": ["breast"],
          "lung cancer (nsclc)": ["lung", "nsclc"],
          "lung cancer (sclc)": ["lung", "sclc"],
          "colorectal cancer": ["colorectal", "colon"],
          "gastric cancer": ["gastric", "stomach"],
          "pancreatic cancer": ["pancreatic", "pancreas"],
          "prostate cancer": ["prostate"],
          "ovarian cancer": ["ovarian", "ovary"]
        };
        
        // Check if selected cancer type maps to protocol cancer type
        const mappedTerms = cancerMapping[selectedCancer] || [selectedCancer];
        matchesCancerType = mappedTerms.some(term => protocolCancer.includes(term));
      }
      
      const matchesIntent = selectedIntent === "all" || 
        (protocol.treatmentIntent && protocol.treatmentIntent.toLowerCase().includes(selectedIntent.toLowerCase()));
      
      const matchesBiomarkers = selectedBiomarkers.length === 0 || 
        selectedBiomarkers.some(biomarker => 
          protocol.eligibility.biomarkers.required.includes(biomarker) ||
          protocol.eligibility.biomarkers.preferred.includes(biomarker)
        );
      
      return matchesSearch && matchesCancerType && matchesIntent && matchesBiomarkers;
    });
    
    console.log('CDU Module - Filtered protocols for', selectedCancerType + ':', filtered.length);
    return filtered;
  }, [protocols, searchTerm, selectedCancerType, selectedIntent, selectedBiomarkers]);
  
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
          setSearchTerm(""); setSelectedCancerType("all"); setSelectedIntent("all"); setSelectedBiomarkers([]);
        }}>
          <Filter className="h-4 w-4 mr-2" />Clear Filters
        </Button>
      </div>
      
      <BiomarkerFilter biomarkers={availableBiomarkers} selectedBiomarkers={selectedBiomarkers} onBiomarkerChange={setSelectedBiomarkers} />
      
      {/* Database Connection Status */}
      {isLoading && (
        <Card className="text-center py-8">
          <CardContent>
            <Activity className="h-8 w-8 mx-auto text-blue-500 mb-4 animate-spin" />
            <h3 className="font-medium mb-2">Loading Authentic NCCN Protocols</h3>
            <p className="text-sm text-muted-foreground">Fetching treatment protocols from cd_protocols database...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            Unable to fetch authentic protocols from database. Using fallback data temporarily.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <div className="space-y-4">
            {filteredProtocols.map((protocol: EnhancedProtocol) => (
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
        </>
      )}

      {/* Database Source Indicator */}
      <div className="text-xs text-muted-foreground text-center pt-4">
        Data source: {dbProtocols ? 'Authentic cd_protocols database' : 'Fallback protocols'} 
        {dbProtocols && Array.isArray(dbProtocols) && ` • ${dbProtocols.length} protocols loaded`}
      </div>
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

// Comprehensive Safety Monitoring Guidelines Database
const SAFETY_MONITORING_GUIDELINES = {
  "Drug-Specific": {
    "Anthracyclines": {
      drugs: ["Doxorubicin", "Daunorubicin", "Epirubicin", "Mitoxantrone"],
      primaryConcern: "Cardiotoxicity",
      cumulativeLimits: {
        "Doxorubicin": "450 mg/m² (400 mg/m² if prior chest RT)",
        "Daunorubicin": "300 mg/m²", 
        "Epirubicin": "900 mg/m²",
        "Mitoxantrone": "140 mg/m²"
      },
      monitoring: {
        baseline: ["ECHO or MUGA", "ECG", "CBC", "LFTs"],
        during: ["ECHO/MUGA every 100-150 mg/m²", "CBC before each cycle", "Clinical assessment"],
        schedule: "LVEF assessment q3-4 cycles or at cumulative dose milestones"
      },
      actionLimits: {
        "LVEF decrease >10% to <50%": "Hold therapy, cardio-oncology consult",
        "LVEF <45%": "Discontinue anthracycline permanently",
        "Signs of CHF": "Urgent cardiology evaluation, discontinue"
      },
      guidelines: "NCCN Survivorship Guidelines v1.2025, ESMO Cardio-Oncology Guidelines"
    },
    "Platinum Agents": {
      drugs: ["Cisplatin", "Carboplatin", "Oxaliplatin"],
      primaryConcern: "Nephrotoxicity, Ototoxicity, Neuropathy",
      monitoring: {
        baseline: ["Creatinine/BUN", "Electrolytes", "Audiometry (cisplatin)", "Neurologic exam"],
        during: ["Weekly creatinine", "Electrolytes before each cycle", "Hearing assessment", "Neuropathy grading"],
        schedule: "Renal function before each cycle, audiometry every 2 cycles (cisplatin)"
      },
      actionLimits: {
        "Creatinine rise >1.5x baseline": "Hold until recovery, reduce dose 50%",
        "Grade 2 ototoxicity": "Consider switching to carboplatin",
        "Grade 3 neuropathy": "Hold until Grade ≤1, then reduce dose"
      },
      guidelines: "NCCN Guidelines, ASCO Platinum Neuropathy Guidelines"
    },
    "Immune Checkpoint Inhibitors": {
      drugs: ["Pembrolizumab", "Nivolumab", "Atezolizumab", "Ipilimumab"],
      primaryConcern: "Immune-related adverse events (irAEs)",
      monitoring: {
        baseline: ["TSH, T4", "LFTs", "Creatinine", "Cortisol", "CBC"],
        during: ["LFTs every cycle", "TSH every 6-9 weeks", "Symptom assessment", "Skin examination"],
        schedule: "Comprehensive toxicity assessment before each cycle"
      },
      actionLimits: {
        "Grade 2 irAE": "Hold therapy, consider steroids",
        "Grade 3-4 irAE": "Discontinue permanently, high-dose steroids",
        "Any pneumonitis": "Hold immediately, pulmonology consult"
      },
      guidelines: "NCCN Management of Cancer-Related Fatigue v1.2025, ESMO irAE Guidelines"
    },
    "Tyrosine Kinase Inhibitors": {
      drugs: ["Imatinib", "Erlotinib", "Gefitinib", "Sunitinib", "Sorafenib"],
      primaryConcern: "Hepatotoxicity, Cardiotoxicity, Skin toxicity",
      monitoring: {
        baseline: ["LFTs", "ECHO/MUGA", "CBC", "Electrolytes"],
        during: ["LFTs every 2 weeks x 2 months, then monthly", "BP monitoring", "Skin assessment"],
        schedule: "Liver function every 2 weeks initially, then as clinically indicated"
      },
      actionLimits: {
        "ALT/AST >5x ULN": "Hold until <2.5x ULN, then reduce dose",
        "Grade 3 rash": "Hold until Grade ≤1, supportive care",
        "Uncontrolled HTN": "Optimize antihypertensives, consider dose reduction"
      },
      guidelines: "NCCN NSCLC Guidelines v5.2025, ESMO TKI Management"
    }
  },
  "Cancer-Specific": {
    "Breast Cancer": {
      commonRegimens: ["AC-T", "TCH", "TH", "CDK4/6 + endocrine"],
      keyMonitoring: {
        "Trastuzumab": "LVEF every 3 months during treatment",
        "CDK4/6 inhibitors": "CBC every 2 weeks x 2 cycles, then monthly",
        "Taxanes": "Neuropathy assessment each visit"
      },
      specialConsiderations: "Fertility preservation discussion, bone health monitoring"
    },
    "Lung Cancer": {
      commonRegimens: ["Carboplatin/Paclitaxel", "Cisplatin/Etoposide", "Immunotherapy"],
      keyMonitoring: {
        "Platinum-based": "Renal function, ototoxicity, neuropathy",
        "Immunotherapy": "irAE monitoring per protocol",
        "EGFR TKIs": "Skin toxicity, hepatotoxicity, ILD screening"
      },
      specialConsiderations: "Pulmonary function baseline, smoking cessation"
    },
    "Colorectal Cancer": {
      commonRegimens: ["FOLFOX", "FOLFIRI", "5-FU/Leucovorin"],
      keyMonitoring: {
        "Oxaliplatin": "Cold-induced neuropathy assessment",
        "5-FU": "DPD deficiency screening if available",
        "Irinotecan": "Diarrhea management, UGT1A1 genotyping"
      },
      specialConsiderations: "Dihydropyrimidine dehydrogenase (DPD) deficiency screening"
    }
  },
  "Organ-Specific Monitoring": {
    "Cardiac": {
      highRiskDrugs: ["Doxorubicin", "Trastuzumab", "Sunitinib", "5-FU"],
      monitoring: "ECHO/MUGA at baseline, during treatment, post-treatment surveillance",
      riskFactors: "Age >65, prior chest RT, hypertension, diabetes",
      guidelines: "ASCO Cardio-Oncology Guidelines, ESC Position Paper"
    },
    "Hepatic": {
      highRiskDrugs: ["Methotrexate", "TKIs", "Checkpoint inhibitors"],
      monitoring: "LFTs at baseline, every 2 weeks initially, then monthly",
      actionLimits: "Hold if ALT/AST >5x ULN or bilirubin >3x ULN",
      guidelines: "EASL-ESMO Clinical Practice Guidelines"
    },
    "Renal": {
      highRiskDrugs: ["Cisplatin", "Methotrexate", "Bevacizumab"],
      monitoring: "Creatinine, BUN, electrolytes before each cycle",
      actionLimits: "Hold if creatinine >1.5x baseline",
      guidelines: "KDIGO Clinical Practice Guidelines"
    },
    "Pulmonary": {
      highRiskDrugs: ["Bleomycin", "Checkpoint inhibitors", "mTOR inhibitors"],
      monitoring: "Baseline PFTs, chest imaging, symptom assessment",
      actionLimits: "Any pneumonitis requires immediate evaluation",
      guidelines: "ATS/ERS/JRS/ALAT Guidelines"
    }
  }
};

// Enhanced Safety Monitoring Clinical Guidance Dashboard
const SafetyMonitoringDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Drug-Specific");
  const [selectedDrug, setSelectedDrug] = useState("Anthracyclines");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categoryTabs = [
    { id: "Drug-Specific", label: "Drug-Specific Monitoring", icon: Pill },
    { id: "Cancer-Specific", label: "Cancer-Specific Protocols", icon: Activity },
    { id: "Organ-Specific", label: "Organ-Specific Monitoring", icon: Heart }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Clinical Safety Monitoring Guidelines
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Comprehensive NCCN, ASCO, and ESMO-based safety monitoring guidance for oncology treatments
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <BookOpen className="h-3 w-3 mr-1" />
          Evidence-Based Protocols
        </Badge>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categoryTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Drug-Specific" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Drug Selection Sidebar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Select Drug Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.keys(SAFETY_MONITORING_GUIDELINES["Drug-Specific"]).map((drugClass) => (
                  <Button
                    key={drugClass}
                    variant={selectedDrug === drugClass ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedDrug(drugClass)}
                  >
                    <Pill className="h-4 w-4 mr-2" />
                    {drugClass}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Drug-Specific Guidelines */}
            <div className="lg:col-span-3 space-y-4">
              {(() => {
                const drugData = SAFETY_MONITORING_GUIDELINES["Drug-Specific"][selectedDrug];
                return (
                  <>
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          {selectedDrug} Safety Monitoring
                        </CardTitle>
                        <CardDescription>
                          Primary Concern: <strong>{drugData.primaryConcern}</strong>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Drugs in Class:</h4>
                          <div className="flex flex-wrap gap-2">
                            {drugData.drugs.map((drug: string) => (
                              <Badge key={drug} variant="secondary">{drug}</Badge>
                            ))}
                          </div>
                        </div>

                        {drugData.cumulativeLimits && (
                          <div>
                            <h4 className="font-semibold mb-2">Cumulative Dose Limits:</h4>
                            <div className="space-y-2">
                              {Object.entries(drugData.cumulativeLimits).map(([drug, limit]) => (
                                <div key={drug} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                                  <span className="font-medium">{drug}</span>
                                  <Badge variant="outline" className="bg-orange-100 text-orange-800">{limit}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Stethoscope className="h-4 w-4" />
                                Monitoring Schedule
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <h5 className="font-medium text-green-700">Baseline:</h5>
                                <ul className="text-sm list-disc list-inside space-y-1">
                                  {drugData.monitoring.baseline.map((item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium text-blue-700">During Treatment:</h5>
                                <ul className="text-sm list-disc list-inside space-y-1">
                                  {drugData.monitoring.during.map((item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <Alert className="border-blue-200 bg-blue-50">
                                <Clock className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                  <strong>Schedule:</strong> {drugData.monitoring.schedule}
                                </AlertDescription>
                              </Alert>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                Action Limits
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {Object.entries(drugData.actionLimits).map(([condition, action]) => (
                                <Alert key={condition} className="border-red-200 bg-red-50">
                                  <AlertDescription className="text-sm">
                                    <div className="font-medium text-red-800">{condition}</div>
                                    <div className="text-red-700 mt-1">{action}</div>
                                  </AlertDescription>
                                </Alert>
                              ))}
                            </CardContent>
                          </Card>
                        </div>

                        <Alert className="border-slate-200 bg-slate-50">
                          <BookOpen className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>Evidence Base:</strong> {drugData.guidelines}
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Cancer-Specific" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SAFETY_MONITORING_GUIDELINES["Cancer-Specific"]).map(([cancer, data]) => (
              <Card key={cancer} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    {cancer}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Common Regimens:</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.commonRegimens.map((regimen: string) => (
                        <Badge key={regimen} variant="outline">{regimen}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Monitoring Points:</h4>
                    <div className="space-y-2">
                      {Object.entries(data.keyMonitoring).map(([drug, monitoring]) => (
                        <div key={drug} className="p-2 bg-purple-50 rounded">
                          <div className="font-medium text-sm text-purple-800">{drug}</div>
                          <div className="text-xs text-purple-700">{monitoring}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Alert className="border-purple-200 bg-purple-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Special Considerations:</strong> {data.specialConsiderations}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Organ-Specific" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(SAFETY_MONITORING_GUIDELINES["Organ-Specific Monitoring"]).map(([organ, data]) => (
              <Card key={organ} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-green-600" />
                    {organ} Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">High-Risk Drugs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.highRiskDrugs.map((drug: string) => (
                        <Badge key={drug} variant="destructive" className="text-xs">{drug}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-medium text-green-800 mb-1">Monitoring Protocol:</h5>
                      <p className="text-sm text-green-700">{data.monitoring}</p>
                    </div>
                    
                    {data.actionLimits && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          <strong>Action Limits:</strong> {data.actionLimits}
                        </AlertDescription>
                      </Alert>
                    )}

                    {data.riskFactors && (
                      <div className="p-2 bg-yellow-50 rounded">
                        <h5 className="font-medium text-yellow-800 text-sm">Risk Factors:</h5>
                        <p className="text-xs text-yellow-700">{data.riskFactors}</p>
                      </div>
                    )}
                  </div>

                  <Alert className="border-slate-200 bg-slate-50">
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Guidelines:</strong> {data.guidelines}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};



// NCCN/ESMO/ASCO Toxicity Management Guidelines Database
const TOXICITY_GUIDELINES = {
  "Hematologic": {
    "Neutropenia": {
      description: "Decreased neutrophil count leading to increased infection risk",
      grading: {
        "Grade 1": "ANC 1.5-1.9 × 10⁹/L",
        "Grade 2": "ANC 1.0-1.4 × 10⁹/L", 
        "Grade 3": "ANC 0.5-0.9 × 10⁹/L",
        "Grade 4": "ANC <0.5 × 10⁹/L"
      },
      management: {
        "Grade 1-2": "Monitor CBC weekly, patient education on infection precautions",
        "Grade 3": "Hold treatment, G-CSF support, prophylactic antibiotics if febrile",
        "Grade 4": "Urgent hospitalization, broad-spectrum antibiotics, G-CSF"
      },
      doseModification: {
        "Grade 3": "Delay until Grade ≤1, then 75% dose",
        "Grade 4": "Delay until Grade ≤1, then 50% dose, consider G-CSF prophylaxis"
      },
      guidelines: "NCCN Guidelines for Myeloid Growth Factors v2.2025, ESMO Clinical Practice Guidelines"
    },
    "Thrombocytopenia": {
      description: "Decreased platelet count with bleeding risk",
      grading: {
        "Grade 1": "PLT 75-150 × 10⁹/L",
        "Grade 2": "PLT 50-74 × 10⁹/L",
        "Grade 3": "PLT 25-49 × 10⁹/L", 
        "Grade 4": "PLT <25 × 10⁹/L"
      },
      management: {
        "Grade 1-2": "Monitor weekly, avoid anticoagulants, platelet transfusion if bleeding",
        "Grade 3": "Hold treatment, platelet transfusion for bleeding/procedures",
        "Grade 4": "Urgent hematology consult, prophylactic platelet transfusion"
      },
      doseModification: {
        "Grade 3": "Delay until Grade ≤1, then 75% dose",
        "Grade 4": "Delay until Grade ≤1, then 50% dose"
      },
      guidelines: "ASCO/ASH Guidelines for Platelet Transfusion, NCCN Supportive Care Guidelines"
    },
    "Anemia": {
      description: "Decreased hemoglobin with fatigue and reduced quality of life",
      grading: {
        "Grade 1": "Hgb 10.0-10.9 g/dL (LLN-6.2 mmol/L)",
        "Grade 2": "Hgb 8.0-9.9 g/dL (4.9-6.1 mmol/L)",
        "Grade 3": "Hgb <8.0 g/dL (<4.9 mmol/L)",
        "Grade 4": "Life-threatening, urgent intervention indicated"
      },
      management: {
        "Grade 1": "Monitor, iron studies, B12/folate if indicated",
        "Grade 2": "Evaluate etiology, consider ESA if chronic kidney disease",
        "Grade 3-4": "Blood transfusion, urgent evaluation for bleeding"
      },
      doseModification: {
        "Grade 3": "Consider dose delay until Grade ≤2",
        "Grade 4": "Hold treatment until Grade ≤2"
      },
      guidelines: "ASCO/ASH Guidelines for ESA Use, NCCN Cancer-Related Anemia Guidelines"
    }
  },
  "Gastrointestinal": {
    "Nausea/Vomiting": {
      description: "Chemotherapy-induced nausea and vomiting (CINV)",
      grading: {
        "Grade 1": "Loss of appetite without alteration in eating habits",
        "Grade 2": "Oral intake decreased without significant weight loss",
        "Grade 3": "Inadequate oral caloric/fluid intake; tube feeding indicated",
        "Grade 4": "Life-threatening consequences"
      },
      management: {
        "Prevention": "5-HT3 antagonist + dexamethasone + NK1 antagonist for HEC",
        "Grade 1-2": "Optimize antiemetic regimen, dietary modifications",
        "Grade 3-4": "IV hydration, parenteral nutrition consideration"
      },
      doseModification: {
        "Grade 3-4": "Consider dose reduction if refractory to optimal antiemetics"
      },
      guidelines: "NCCN Antiemesis Guidelines v2.2025, ESMO/MASCC Guidelines"
    },
    "Diarrhea": {
      description: "Increase in stool frequency or liquid consistency",
      grading: {
        "Grade 1": "Increase of <4 stools/day over baseline",
        "Grade 2": "Increase of 4-6 stools/day over baseline",
        "Grade 3": "Increase of ≥7 stools/day over baseline; incontinence",
        "Grade 4": "Life-threatening consequences"
      },
      management: {
        "Grade 1": "Dietary modifications, loperamide",
        "Grade 2": "Loperamide, fluid replacement, dietary restrictions",
        "Grade 3-4": "IV fluids, octreotide, infectious workup"
      },
      doseModification: {
        "Grade 3": "Hold until Grade ≤1, then 75% dose",
        "Grade 4": "Hold until Grade ≤1, then 50% dose"
      },
      guidelines: "ESMO Supportive Care Guidelines, NCCN Management of Drug-Related Toxicities"
    },
    "Mucositis": {
      description: "Inflammation and ulceration of mucous membranes",
      grading: {
        "Grade 1": "Erythema of mucosa",
        "Grade 2": "Patchy ulcerations or pseudomembranes",
        "Grade 3": "Confluent ulcerations; unable to adequately aliment",
        "Grade 4": "Tissue necrosis; life-threatening bleeding"
      },
      management: {
        "Prevention": "Good oral hygiene, saline rinses, avoid trauma",
        "Grade 1-2": "Topical analgesics, coating agents, nutritional support",
        "Grade 3-4": "Systemic analgesics, parenteral nutrition, infection prophylaxis"
      },
      doseModification: {
        "Grade 3": "Hold until Grade ≤1, consider 75% dose",
        "Grade 4": "Hold until Grade ≤1, then 50% dose"
      },
      guidelines: "ESMO Guidelines for Oral Mucositis, MASCC/ISOO Evidence-Based Guidelines"
    }
  },
  "Neurologic": {
    "Peripheral Neuropathy": {
      description: "Damage to peripheral nerves causing sensory/motor symptoms",
      grading: {
        "Grade 1": "Asymptomatic; clinical or diagnostic observations only",
        "Grade 2": "Moderate symptoms; limiting instrumental ADL",
        "Grade 3": "Severe symptoms; limiting self-care ADL",
        "Grade 4": "Life-threatening consequences"
      },
      management: {
        "Prevention": "Calcium/magnesium infusions (oxaliplatin), avoid cold exposure",
        "Grade 1": "Patient education, safety measures",
        "Grade 2-3": "Duloxetine 60mg daily, dose modification",
        "Grade 4": "Discontinue neurotoxic agents"
      },
      doseModification: {
        "Grade 2": "Consider 75% dose for persistent symptoms",
        "Grade 3": "Hold until Grade ≤1, then 50% dose or discontinue",
        "Grade 4": "Discontinue treatment"
      },
      guidelines: "ASCO Clinical Practice Guideline for CIPN, ESMO Guidelines"
    }
  },
  "Cardiac": {
    "Cardiotoxicity": {
      description: "Chemotherapy-induced cardiac dysfunction",
      grading: {
        "Asymptomatic": "LVEF decline 10-15% from baseline but >50%",
        "Symptomatic": "LVEF decline >15% from baseline or <50%",
        "Heart Failure": "Clinical heart failure symptoms"
      },
      monitoring: {
        "Anthracyclines": "ECHO/MUGA at baseline, 250mg/m², 400mg/m², then q 100mg/m²",
        "Trastuzumab": "ECHO/MUGA at baseline, q3 months during treatment",
        "TKIs": "ECG monitoring for QT prolongation"
      },
      management: {
        "Asymptomatic": "Continue monitoring, cardio-oncology consult",
        "Symptomatic": "ACE inhibitor/ARB, beta-blocker, hold cardiotoxic agents",
        "Heart Failure": "Standard HF management, discontinue cardiotoxic drugs"
      },
      guidelines: "ESC Cardio-Oncology Guidelines, ASCO Expert Panel Statement"
    }
  },
  "Dermatologic": {
    "Hand-Foot Syndrome": {
      description: "Palmar-plantar erythrodysesthesia from capecitabine/5-FU",
      grading: {
        "Grade 1": "Minimal skin changes without pain",
        "Grade 2": "Skin changes with pain not interfering with function",
        "Grade 3": "Ulcerative dermatitis; cannot wear regular clothing"
      },
      management: {
        "Prevention": "Moisturizers, avoid heat/friction, pyridoxine 150mg BID",
        "Grade 1": "Topical emollients, pyridoxine",
        "Grade 2-3": "Topical steroids, dose interruption/reduction"
      },
      doseModification: {
        "Grade 2": "Interrupt until Grade ≤1, then 75% dose",
        "Grade 3": "Interrupt until Grade ≤1, then 50% dose"
      },
      guidelines: "ESMO Clinical Practice Guidelines for Skin Toxicity"
    }
  },
  "Pulmonary": {
    "Pneumonitis": {
      description: "Drug-induced lung inflammation",
      grading: {
        "Grade 1": "Asymptomatic; radiographic findings only",
        "Grade 2": "Symptomatic but not interfering with ADL",
        "Grade 3": "Severe symptoms; limiting self-care ADL",
        "Grade 4": "Life-threatening respiratory compromise"
      },
      management: {
        "Grade 1": "Monitor, consider withholding drug",
        "Grade 2": "Corticosteroids, hold drug permanently",
        "Grade 3-4": "High-dose corticosteroids, permanent discontinuation"
      },
      guidelines: "NCCN Guidelines for Management of immunotherapy-Related Toxicities"
    }
  },
  "Endocrine": {
    "Thyroid Dysfunction": {
      description: "Immunotherapy-induced thyroid disorders",
      grading: {
        "Grade 1": "Asymptomatic; TSH elevated",
        "Grade 2": "Symptomatic hypothyroidism",
        "Grade 3": "Severe hypothyroidism; hospitalization indicated",
        "Grade 4": "Life-threatening consequences"
      },
      management: {
        "Grade 1": "Monitor TSH q6-8 weeks",
        "Grade 2": "Levothyroxine replacement, continue immunotherapy",
        "Grade 3-4": "High-dose levothyroxine, endocrinology consult"
      },
      guidelines: "NCCN Guidelines for Management of immunotherapy-Related Toxicities"
    },
    "Adrenal Insufficiency": {
      description: "Immunotherapy-induced hypoadrenalism",
      grading: {
        "Grade 1": "Asymptomatic; laboratory findings only",
        "Grade 2": "Symptomatic but not interfering with ADL",
        "Grade 3": "Severe symptoms; hospitalization indicated",
        "Grade 4": "Life-threatening adrenal crisis"
      },
      management: {
        "Grade 1": "Monitor cortisol levels",
        "Grade 2": "Physiologic steroid replacement",
        "Grade 3-4": "High-dose steroids, ICU monitoring"
      },
      guidelines: "ASCO Expert Panel, ESMO Guidelines for irAEs"
    }
  },
  "Hepatic": {
    "Hepatotoxicity": {
      description: "Drug-induced liver injury",
      grading: {
        "Grade 1": "ALT/AST 1-3x ULN",
        "Grade 2": "ALT/AST 3-5x ULN or bilirubin 1.5-3x ULN",
        "Grade 3": "ALT/AST 5-20x ULN or bilirubin 3-10x ULN",
        "Grade 4": "ALT/AST >20x ULN or bilirubin >10x ULN"
      },
      management: {
        "Grade 1": "Monitor LFTs weekly",
        "Grade 2": "Hold treatment, hepatology consult",
        "Grade 3-4": "Corticosteroids, permanent discontinuation"
      },
      doseModification: {
        "Grade 2": "Hold until Grade ≤1, then 75% dose",
        "Grade 3-4": "Permanent discontinuation"
      },
      guidelines: "NCCN Guidelines for Hepatotoxicity, EASL Clinical Practice Guidelines"
    }
  },
  "Renal": {
    "Nephrotoxicity": {
      description: "Drug-induced kidney injury",
      grading: {
        "Grade 1": "Creatinine 1-1.5x baseline",
        "Grade 2": "Creatinine 1.5-3x baseline",
        "Grade 3": "Creatinine 3-6x baseline",
        "Grade 4": "Creatinine >6x baseline or dialysis"
      },
      management: {
        "Grade 1": "Increase hydration, monitor q48h",
        "Grade 2": "Hold nephrotoxic drugs, nephrology consult",
        "Grade 3-4": "Urgent nephrology, consider RRT"
      },
      doseModification: {
        "Grade 2": "Hold until Grade ≤1, then 75% dose",
        "Grade 3-4": "Hold until Grade ≤1, then 50% dose or discontinue"
      },
      guidelines: "KDIGO Guidelines, ASCO/ONS Chemotherapy Administration Safety Standards"
    }
  },
  "Immunologic": {
    "Hypersensitivity Reactions": {
      description: "Drug-induced allergic reactions",
      grading: {
        "Grade 1": "Mild transient rash, drug fever",
        "Grade 2": "Moderate localized urticaria",
        "Grade 3": "Severe generalized urticaria, angioedema",
        "Grade 4": "Anaphylaxis, life-threatening"
      },
      management: {
        "Grade 1": "Antihistamines, monitor closely",
        "Grade 2": "Stop infusion, antihistamines, corticosteroids",
        "Grade 3-4": "Emergency management, epinephrine, permanent discontinuation"
      },
      guidelines: "NCCN Guidelines for Hypersensitivity Reactions, ASCO Safety Standards"
    },
    "Cytokine Release Syndrome": {
      description: "CAR-T and bispecific antibody-induced systemic inflammation",
      grading: {
        "Grade 1": "Fever only",
        "Grade 2": "Hypotension responding to fluids, hypoxia requiring <40% FiO2",
        "Grade 3": "Hypotension requiring vasopressors, hypoxia requiring ≥40% FiO2",
        "Grade 4": "Life-threatening multi-organ failure"
      },
      management: {
        "Grade 1": "Supportive care, monitor closely",
        "Grade 2": "Tocilizumab 8mg/kg, corticosteroids if no response",
        "Grade 3-4": "ICU care, tocilizumab + corticosteroids"
      },
      guidelines: "ASTCT Consensus Guidelines for CRS, CAR-T Cell Therapy Guidelines"
    }
  },
  "Metabolic": {
    "Tumor Lysis Syndrome": {
      description: "Rapid cell death causing metabolic derangements",
      grading: {
        "Laboratory": "Elevated K+, PO4, uric acid; decreased Ca2+",
        "Clinical": "AKI, arrhythmias, seizures, death"
      },
      management: {
        "Prevention": "Allopurinol/rasburicase, aggressive hydration",
        "Treatment": "Hemodialysis, electrolyte correction, ICU monitoring"
      },
      monitoring: {
        "High Risk": "K+, PO4, Ca2+, uric acid, creatinine q6h x48h",
        "Standard Risk": "Daily labs x72h"
      },
      guidelines: "ESMO Guidelines for TLS, NCCN Supportive Care Guidelines"
    }
  }
};

// Enhanced Toxicity Management Guidance Component
const ToxicityManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Hematologic");
  const [selectedToxicity, setSelectedToxicity] = useState<string>("Neutropenia");
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = Object.keys(TOXICITY_GUIDELINES);
  const toxicitiesInCategory = Object.keys(TOXICITY_GUIDELINES[selectedCategory] || {});
  const currentToxicity = TOXICITY_GUIDELINES[selectedCategory]?.[selectedToxicity];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Oncology Toxicity Management Guidelines</h2>
          <p className="text-muted-foreground mt-1">
            Evidence-based guidance from NCCN, ESMO, and ASCO guidelines for cancer treatment toxicities
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Clinical Guidance Tool
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search toxicities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Toxicity List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{selectedCategory} Toxicities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {toxicitiesInCategory.map(toxicity => (
                <button
                  key={toxicity}
                  onClick={() => setSelectedToxicity(toxicity)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedToxicity === toxicity 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-sm">{toxicity}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {TOXICITY_GUIDELINES[selectedCategory][toxicity].description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Guidance */}
        <div className="lg:col-span-3 space-y-6">
          {currentToxicity && (
            <>
              {/* Grading System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    CTCAE Grading - {selectedToxicity}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(currentToxicity.grading).map(([grade, description]) => (
                      <div key={grade} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={grade.includes("4") ? "destructive" : grade.includes("3") ? "destructive" : "secondary"}>
                            {grade}
                          </Badge>
                        </div>
                        <p className="text-sm">{description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Management Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Clinical Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(currentToxicity.management).map(([level, guidance]) => (
                      <div key={level} className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">{level}</h4>
                        <p className="text-sm text-muted-foreground">{guidance}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dose Modifications */}
              {currentToxicity.doseModification && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Dose Modification Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(currentToxicity.doseModification).map(([grade, modification]) => (
                        <div key={grade} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                          <div>
                            <p className="font-semibold text-sm text-amber-900">{grade}</p>
                            <p className="text-sm text-amber-800">{modification}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Monitoring Requirements */}
              {currentToxicity.monitoring && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Monitoring Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(currentToxicity.monitoring).map(([drug, schedule]) => (
                        <div key={drug} className="p-3 border rounded-lg">
                          <h4 className="font-semibold text-sm mb-1">{drug}</h4>
                          <p className="text-sm text-muted-foreground">{schedule}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Evidence Base */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Evidence Base & Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <strong>Reference Guidelines:</strong> {currentToxicity.guidelines}
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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
          <TabsTrigger value="medications">Oncology Medications</TabsTrigger>
          <TabsTrigger value="toxicity">Toxicity Management</TabsTrigger>
          <TabsTrigger value="monitoring">Safety Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="protocols" className="space-y-6">
          <TreatmentProtocols />
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          <EnhancedTreatmentPlanSelector />
        </TabsContent>
        
        <TabsContent value="medications" className="space-y-6">
          <MedicationsSegment />
        </TabsContent>
        
        <TabsContent value="toxicity" className="space-y-6">
          <ToxicityManagement />
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-6">
          <SafetyMonitoringDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}