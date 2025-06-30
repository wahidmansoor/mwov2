import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Syringe, 
  Calculator, 
  AlertTriangle, 
  Shield,
  Activity,
  Heart,
  Brain,
  Search,
  Eye,
  Download,
  Filter,
  FileText,
  Zap,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Printer,
  CheckCircle,
  XCircle
} from "lucide-react";

// Enhanced Protocol Interface with Safety Features
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
    biomarkers: {
      required: string[];
      preferred: string[];
      contraindicated: string[];
    };
  };
  drugs: {
    name: string;
    dose: string;
    route: string;
    schedule: string;
    cumulativeLimit?: string;
    allergyRisk: 'low' | 'medium' | 'high';
    premedRequired: boolean;
  }[];
  safety: {
    contraindications: string[];
    drugInteractions: string[];
    warnings: string[];
    monitoringRequired: string[];
  };
  toxicityProfile: {
    common: string[];
    serious: string[];
    doseModifications: { grade: number; action: string; }[];
  };
  aiConfidence?: number;
  cycleInfo: {
    length: string;
    totalCycles: string;
    administrationTime: string;
  };
}

// Comprehensive Cancer Types (Issue #8)
const CANCER_TYPES = [
  "Breast Cancer", "Lung Cancer (NSCLC)", "Lung Cancer (SCLC)", "Colorectal Cancer",
  "Gastric Cancer", "Pancreatic Cancer", "Hepatocellular Carcinoma", "Ovarian Cancer",
  "Prostate Cancer", "Melanoma", "Renal Cell Carcinoma", "Bladder Cancer",
  "Head and Neck Cancer", "Lymphoma (Hodgkin)", "Lymphoma (Non-Hodgkin)", "Leukemia (AML)",
  "Glioblastoma", "Mesothelioma", "Sarcoma", "Thyroid Cancer", "Cervical Cancer",
  "Endometrial Cancer", "Esophageal Cancer", "Bile Duct Cancer", "Neuroendocrine Tumors"
];

// Safety Alert System (Issue #2)
const SafetyGuardrails = ({ protocol, patientData }: { protocol: EnhancedProtocol; patientData?: any }) => {
  const alerts = useMemo(() => {
    const safetyAlerts = [];
    
    // Drug interaction alerts
    if (protocol.drugs.some(d => d.name.toLowerCase().includes('cisplatin'))) {
      safetyAlerts.push({
        type: 'warning',
        message: 'Nephrotoxic agent detected - Monitor creatinine and ensure adequate hydration',
        severity: 'high'
      });
    }
    
    if (protocol.drugs.some(d => d.name.toLowerCase().includes('paclitaxel'))) {
      safetyAlerts.push({
        type: 'info',
        message: 'Paclitaxel hypersensitivity risk - Premedication required and test dose recommended',
        severity: 'medium'
      });
    }
    
    if (protocol.drugs.some(d => d.name.toLowerCase().includes('doxorubicin'))) {
      safetyAlerts.push({
        type: 'warning',
        message: 'Anthracycline cardiotoxicity - ECHO/MUGA required before treatment',
        severity: 'high'
      });
    }
    
    // AI confidence alert (Issue #3)
    if (protocol.aiConfidence && protocol.aiConfidence < 70) {
      safetyAlerts.push({
        type: 'warning',
        message: 'Low AI confidence score - Verify against local guidelines',
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
          alert.severity === 'medium' ? 'border-orange-500 bg-orange-50' : 
          'border-blue-500 bg-blue-50'
        }>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

// AI Confidence Indicator (Issue #3)
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
        <div 
          className={`h-2 rounded-full ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs">{score}%</span>
      {score < 70 && (
        <AlertTriangle className="h-3 w-3 text-orange-500" />
      )}
    </div>
  );
};

// Evidence Base Display (Issue #7)
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
          <div 
            className={`h-1.5 rounded-full ${evidenceBase.complianceScore >= 80 ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{ width: `${evidenceBase.complianceScore}%` }}
          />
        </div>
        <span className="text-xs">{evidenceBase.complianceScore}%</span>
        <button 
          className="text-xs text-blue-600 hover:underline"
          title="100% = exact match to guidelines | <80% = deviation alert"
        >
          ?
        </button>
      </div>
    </div>
  </div>
);

// Collapsible Drug Display (Issue #10)
const DrugCard = ({ drug, index }: { drug: EnhancedProtocol['drugs'][0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="font-medium flex items-center gap-2">
            {drug.name}
            {drug.allergyRisk === 'high' && (
              <Badge variant="destructive" className="text-xs">High Allergy Risk</Badge>
            )}
            {drug.premedRequired && (
              <Badge variant="outline" className="text-xs">Premed Required</Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {drug.dose} • {drug.route} • {drug.schedule}
          </div>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>
      
      {isExpanded && (
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Route:</span> {drug.route}
            </div>
            <div>
              <span className="font-medium">Schedule:</span> {drug.schedule}
            </div>
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

// Biomarker Integration (Issue #4)
const BiomarkerFilter = ({ 
  biomarkers, 
  selectedBiomarkers, 
  onBiomarkerChange 
}: { 
  biomarkers: string[]; 
  selectedBiomarkers: string[]; 
  onBiomarkerChange: (biomarkers: string[]) => void;
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
          <label htmlFor={biomarker} className="text-sm">
            {biomarker}
          </label>
        </div>
      ))}
    </div>
  </div>
);

// Workflow Integration (Issue #9)
const WorkflowActions = ({ protocol }: { protocol: EnhancedProtocol }) => {
  const generatePDF = () => {
    // PDF generation logic
    console.log('Generating PDF for protocol:', protocol.code);
  };
  
  const generateTumorBoardSummary = () => {
    // Tumor board summary generation
    console.log('Generating tumor board summary for:', protocol.code);
  };
  
  return (
    <div className="flex gap-2">
      <Button onClick={generatePDF} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
      <Button onClick={generateTumorBoardSummary} variant="outline" size="sm">
        <Users className="h-4 w-4 mr-2" />
        Tumor Board Summary
      </Button>
      <Button variant="outline" size="sm">
        <Printer className="h-4 w-4 mr-2" />
        Print-Friendly View
      </Button>
    </div>
  );
};

// Toxicity Monitoring Integration (Issue #5)
const ToxicityMonitor = ({ protocol }: { protocol: EnhancedProtocol }) => {
  const [toxicityGrades, setToxicityGrades] = useState<Record<string, number>>({});
  
  const getDoseModification = (toxicity: string, grade: number) => {
    const modification = protocol.toxicityProfile.doseModifications.find(
      mod => mod.grade === grade
    );
    return modification?.action || 'Continue current dose';
  };
  
  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Toxicity Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {protocol.toxicityProfile.common.map((toxicity, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">{toxicity}</span>
              <div className="flex items-center gap-2">
                <Select 
                  value={toxicityGrades[toxicity]?.toString() || "0"}
                  onValueChange={(value) => setToxicityGrades(prev => ({
                    ...prev, 
                    [toxicity]: parseInt(value)
                  }))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
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

// Mock Data - Real protocols would come from database
const mockProtocols: EnhancedProtocol[] = [
  {
    id: "1",
    code: "AC-T",
    name: "Doxorubicin/Cyclophosphamide followed by Paclitaxel",
    cancerType: "Breast Cancer",
    treatmentIntent: "Adjuvant",
    summary: "Standard adjuvant chemotherapy for early-stage breast cancer",
    evidenceBase: {
      guidelines: ["NCCN Breast v3.2025", "ESMO 2024"],
      lastReviewed: "2024-12-15",
      evidenceLevel: "Category 1",
      complianceScore: 95
    },
    eligibility: {
      criteria: ["Stage I-III breast cancer", "ECOG 0-1", "Adequate organ function"],
      biomarkers: {
        required: ["HER2-", "Node positive OR high-risk node negative"],
        preferred: ["Ki67 >20%"],
        contraindicated: ["HER2+ (use HER2-targeted therapy)"]
      }
    },
    drugs: [
      {
        name: "Doxorubicin",
        dose: "60 mg/m²",
        route: "IV",
        schedule: "Every 2-3 weeks × 4 cycles",
        cumulativeLimit: "450 mg/m² lifetime",
        allergyRisk: "low",
        premedRequired: false
      },
      {
        name: "Cyclophosphamide", 
        dose: "600 mg/m²",
        route: "IV",
        schedule: "Every 2-3 weeks × 4 cycles",
        allergyRisk: "low",
        premedRequired: false
      },
      {
        name: "Paclitaxel",
        dose: "175 mg/m²",
        route: "IV",
        schedule: "Every 2-3 weeks × 4 cycles OR 80 mg/m² weekly × 12",
        allergyRisk: "high",
        premedRequired: true
      }
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
    cycleInfo: {
      length: "21 days",
      totalCycles: "8 cycles",
      administrationTime: "4-6 hours"
    }
  }
  // Additional protocols would be added here...
];

// Main Protocol Display Component
const ProtocolCard = ({ protocol }: { protocol: EnhancedProtocol }) => {
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
        <CardDescription>
          {protocol.cancerType} • {protocol.treatmentIntent}
        </CardDescription>
        <ConfidenceIndicator score={protocol.aiConfidence} />
      </CardHeader>
      
      <CardContent>
        <SafetyGuardrails protocol={protocol} />
        
        <p className="text-sm text-muted-foreground mb-4">
          {protocol.summary}
        </p>
        
        <EvidenceDisplay evidenceBase={protocol.evidenceBase} />
        
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Syringe className="h-4 w-4" />
            Treatment Regimen
          </h4>
          {protocol.drugs.map((drug, index) => (
            <DrugCard key={index} drug={drug} index={index} />
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <WorkflowActions protocol={protocol} />
        
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4"
        >
          {isExpanded ? 'Show Less' : 'Show Full Details'}
          {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <ToxicityMonitor protocol={protocol} />
            
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

// Enhanced Protocol Search (Issue #8 - Extended Cancer Types)
const ProtocolSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCancerType, setSelectedCancerType] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("");
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([]);
  
  // Filter protocols based on biomarkers (Issue #4)
  const filteredProtocols = useMemo(() => {
    return mockProtocols.filter(protocol => {
      const matchesSearch = protocol.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.cancerType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCancerType = !selectedCancerType || protocol.cancerType === selectedCancerType;
      const matchesIntent = !selectedIntent || protocol.treatmentIntent === selectedIntent;
      
      // Biomarker filtering
      const matchesBiomarkers = selectedBiomarkers.length === 0 || 
        selectedBiomarkers.some(biomarker => 
          protocol.eligibility.biomarkers.required.includes(biomarker) ||
          protocol.eligibility.biomarkers.preferred.includes(biomarker)
        );
      
      return matchesSearch && matchesCancerType && matchesIntent && matchesBiomarkers;
    });
  }, [searchTerm, selectedCancerType, selectedIntent, selectedBiomarkers]);
  
  const availableBiomarkers = ["HER2+", "HER2-", "ER+", "ER-", "PR+", "PR-", "EGFR+", "ALK+", "KRAS+", "MSI-H", "PD-L1+"];
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search protocols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={selectedCancerType} onValueChange={setSelectedCancerType}>
          <SelectTrigger>
            <SelectValue placeholder="All cancer types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All cancer types</SelectItem>
            {CANCER_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedIntent} onValueChange={setSelectedIntent}>
          <SelectTrigger>
            <SelectValue placeholder="All intents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All intents</SelectItem>
            <SelectItem value="Adjuvant">Adjuvant</SelectItem>
            <SelectItem value="Neoadjuvant">Neoadjuvant</SelectItem>
            <SelectItem value="Palliative">Palliative</SelectItem>
            <SelectItem value="Curative">Curative</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm("");
            setSelectedCancerType("");
            setSelectedIntent("");
            setSelectedBiomarkers([]);
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>
      
      <BiomarkerFilter 
        biomarkers={availableBiomarkers}
        selectedBiomarkers={selectedBiomarkers}
        onBiomarkerChange={setSelectedBiomarkers}
      />
      
      <div className="space-y-4">
        {filteredProtocols.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>
      
      {filteredProtocols.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No protocols found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or biomarker filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Main CDU Module Component (Simplified Architecture - Issue #1)
export default function CDUModuleEnhanced() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Chemotherapy Day Unit (CDU)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Clinical guidance tool for oncology treatment protocols
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Non-EHR Guidance Tool
        </Badge>
      </div>
      
      <Tabs defaultValue="protocols" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="protocols">Treatment Protocols</TabsTrigger>
          <TabsTrigger value="calculator">Dosage Calculator</TabsTrigger>
          <TabsTrigger value="toxicity">Toxicity Management</TabsTrigger>
          <TabsTrigger value="monitoring">Safety Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="protocols" className="space-y-6">
          <ProtocolSearch />
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  BSA Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Calculate body surface area for dosing calculations
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Carboplatin AUC Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Calculate carboplatin dose using Calvert formula
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="toxicity" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Current toxicity alerts and interventions
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Cardiotoxicity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor cumulative anthracycline exposure
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Neurotoxicity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Peripheral neuropathy assessment and management
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safety Monitoring Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive safety monitoring and alerts system
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}