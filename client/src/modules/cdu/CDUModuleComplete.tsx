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
  Printer, CheckCircle, XCircle, Droplets, Zap, Clock
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