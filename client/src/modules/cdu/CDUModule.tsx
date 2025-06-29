import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Syringe, 
  Calculator, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  FileText,
  Zap,
  Shield,
  Activity,
  Heart,
  Droplets,
  Brain,
  Search,
  Eye,
  Download,
  Filter,
  Pill
} from "lucide-react";
import MedicationsTab from "./MedicationsTab";

interface CdProtocol {
  id: string;
  code: string;
  tumourGroup: string;
  tumourSupergroup?: string;
  treatmentIntent: string;
  summary: string;
  eligibility: any;
  precautions: string[];
  treatment: any;
  tests?: string[];
  doseModifications?: any;
  referenceList?: string[];
  cycleInfo?: any;
  preMedications?: any;
  postMedications?: any;
  supportiveCare?: any;
  rescueAgents?: any;
  monitoring?: any;
  toxicityMonitoring?: any;
  interactions?: any;
  contraindications?: string[];
  version: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ProtocolDetailDialog = ({ protocol }: { protocol: CdProtocol }) => (
  <DialogContent className="max-w-4xl max-h-[90vh]">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <FileText className="h-5 w-5" />
        {protocol.code} - {protocol.tumourGroup} Cancer Protocol
      </DialogTitle>
    </DialogHeader>
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-6 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Treatment Intent</h4>
            <Badge className="bg-blue-100 text-blue-800">{protocol.treatmentIntent}</Badge>
          </div>
          <div>
            <h4 className="font-medium mb-2">Version</h4>
            <span className="text-sm">{protocol.version}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Summary</h4>
          <p className="text-sm text-muted-foreground">{protocol.summary}</p>
        </div>

        <Separator />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              Eligibility Criteria
            </h4>
            {protocol.eligibility?.summary && (
              <div className="space-y-2">
                {protocol.eligibility.summary.map((item: string, i: number) => (
                  <div key={i} className="text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    {item}
                  </div>
                ))}
              </div>
            )}
            {protocol.eligibility?.criteria && (
              <div className="mt-3 space-y-1">
                {Object.entries(protocol.eligibility.criteria).map(([key, value], i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium">{key}:</span> {value as string}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Precautions
            </h4>
            <div className="space-y-2">
              {protocol.precautions?.map((precaution: string, i: number) => (
                <div key={i} className="text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded border-l-2 border-amber-400">
                  {precaution}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Syringe className="h-4 w-4 text-blue-500" />
            Treatment Regimen
          </h4>
          {protocol.treatment?.drugs && (
            <div className="space-y-3">
              <div className="grid gap-3">
                {protocol.treatment.drugs.map((drug: any, i: number) => (
                  <div key={i} className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="font-medium">{drug.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {drug.dose} • {drug.route} • {drug.schedule}
                    </div>
                  </div>
                ))}
              </div>
              {protocol.treatment.cycles && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded">
                  <span className="font-medium">Cycles:</span> {protocol.treatment.cycles}
                </div>
              )}
            </div>
          )}
        </div>

        {protocol.cycleInfo && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-500" />
              Cycle Information
            </h4>
            <div className="grid md:grid-cols-3 gap-3">
              {protocol.cycleInfo.cycle_length && (
                <div className="p-3 border rounded">
                  <div className="font-medium text-sm">Cycle Length</div>
                  <div className="text-sm text-muted-foreground">{protocol.cycleInfo.cycle_length}</div>
                </div>
              )}
              {protocol.cycleInfo.total_cycles && (
                <div className="p-3 border rounded">
                  <div className="font-medium text-sm">Total Cycles</div>
                  <div className="text-sm text-muted-foreground">{protocol.cycleInfo.total_cycles}</div>
                </div>
              )}
              {protocol.cycleInfo.administration_time && (
                <div className="p-3 border rounded">
                  <div className="font-medium text-sm">Administration Time</div>
                  <div className="text-sm text-muted-foreground">{protocol.cycleInfo.administration_time}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {protocol.monitoring && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Monitoring Requirements
            </h4>
            <div className="space-y-3">
              {Object.entries(protocol.monitoring).map(([key, tests], i) => (
                <div key={i} className="p-3 border rounded">
                  <div className="font-medium text-sm capitalize">{key.replace('_', ' ')}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {Array.isArray(tests) ? tests.join(', ') : tests as string}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {protocol.contraindications && protocol.contraindications.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Contraindications
            </h4>
            <div className="space-y-2">
              {protocol.contraindications.map((contraindication: string, i: number) => (
                <div key={i} className="text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded border-l-2 border-red-500">
                  {contraindication}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  </DialogContent>
);

const TreatmentProtocols = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTumourGroup, setSelectedTumourGroup] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("");

  const { data: protocols = [], isLoading } = useQuery<CdProtocol[]>({
    queryKey: ['/api/cd-protocols', selectedTumourGroup, selectedIntent],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedTumourGroup) params.append('tumourGroup', selectedTumourGroup);
      if (selectedIntent) params.append('treatmentIntent', selectedIntent);
      
      const response = await fetch(`/api/cd-protocols?${params}`);
      if (!response.ok) throw new Error('Failed to fetch protocols');
      return response.json();
    }
  });

  const filteredProtocols = protocols.filter(protocol =>
    protocol.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocol.tumourGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocol.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tumourGroups = Array.from(new Set(protocols.map(p => p.tumourGroup)));
  const treatmentIntents = Array.from(new Set(protocols.map(p => p.treatmentIntent)));

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search protocols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={selectedTumourGroup} onValueChange={setSelectedTumourGroup}>
          <SelectTrigger>
            <SelectValue placeholder="All cancer types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cancer types</SelectItem>
            {tumourGroups.map(group => (
              <SelectItem key={group} value={group}>{group}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedIntent} onValueChange={setSelectedIntent}>
          <SelectTrigger>
            <SelectValue placeholder="All intents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All intents</SelectItem>
            {treatmentIntents.map(intent => (
              <SelectItem key={intent} value={intent}>{intent}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm("");
            setSelectedTumourGroup("all");
            setSelectedIntent("all");
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProtocols.map((protocol) => (
            <Card key={protocol.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{protocol.code}</CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    {protocol.status}
                  </Badge>
                </div>
                <CardDescription>
                  {protocol.tumourGroup} • {protocol.treatmentIntent}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {protocol.summary}
                </p>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <ProtocolDetailDialog protocol={protocol} />
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProtocols.length === 0 && !isLoading && (
        <Card className="text-center py-8">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No protocols found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

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
              <Calculator className="h-5 w-5 text-blue-600" />
              BSA Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
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
              </div>
              <Button onClick={calculateBSA} className="w-full">
                Calculate BSA
              </Button>
              {bsa > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium">BSA: {bsa} m²</p>
                  <p className="text-sm text-muted-foreground">
                    Dubois & Dubois formula
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-green-600" />
              Dose Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Creatinine Clearance</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select CrCl range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">≥60 mL/min (Normal)</SelectItem>
                    <SelectItem value="mild">45-59 mL/min (Mild)</SelectItem>
                    <SelectItem value="moderate">30-44 mL/min (Moderate)</SelectItem>
                    <SelectItem value="severe">&lt;30 mL/min (Severe)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Hepatic Function</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select liver function" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="mild">Mild impairment</SelectItem>
                    <SelectItem value="moderate">Moderate impairment</SelectItem>
                    <SelectItem value="severe">Severe impairment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" variant="outline">
                Calculate Adjusted Dose
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Dosing Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { drug: "Doxorubicin", dose: "60 mg/m²", frequency: "q3 weeks", cumulative: "450 mg/m²" },
              { drug: "Cyclophosphamide", dose: "600 mg/m²", frequency: "q3 weeks", cumulative: "N/A" },
              { drug: "Paclitaxel", dose: "175 mg/m²", frequency: "q3 weeks", cumulative: "N/A" },
              { drug: "Carboplatin", dose: "AUC 5-6", frequency: "q3 weeks", cumulative: "N/A" },
              { drug: "Cisplatin", dose: "75-100 mg/m²", frequency: "q3 weeks", cumulative: "Monitor" },
              { drug: "5-FU", dose: "400-500 mg/m²", frequency: "Weekly", cumulative: "N/A" }
            ].map((drug, i) => (
              <Card key={i} className="p-4">
                <h4 className="font-medium mb-2">{drug.drug}</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Dose:</span> {drug.dose}</p>
                  <p><span className="font-medium">Frequency:</span> {drug.frequency}</p>
                  <p><span className="font-medium">Cumulative:</span> {drug.cumulative}</p>
                </div>
                <Button className="w-full mt-3" size="sm" variant="outline">
                  Calculate
                </Button>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ToxicityManagement = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Active Alerts
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
            <Button className="w-full" size="sm">
              Review All Alerts
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-blue-600" />
            Cardiotoxicity Monitor
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
                <span>Baseline LVEF</span>
                <span>65%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last ECHO</span>
                <span>62% (Normal)</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              Schedule ECHO
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-purple-600" />
            Neurotoxicity
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
            <div className="space-y-2">
              <Button className="w-full" size="sm" variant="outline">
                Document Assessment
              </Button>
              <Button className="w-full" size="sm">
                Dose Modification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Toxicity Management Guidelines</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="hematologic">
            <AccordionTrigger>Hematologic Toxicities</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Neutropenia Management</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <p className="font-medium">Grade 3 (ANC 0.5-1.0)</p>
                      <p>• Consider G-CSF</p>
                      <p>• Monitor closely</p>
                      <p>• Delay if febrile</p>
                    </div>
                    <div className="p-2 border rounded">
                      <p className="font-medium">Grade 4 (ANC &lt;0.5)</p>
                      <p>• G-CSF support</p>
                      <p>• 25% dose reduction</p>
                      <p>• Prophylactic antibiotics</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Thrombocytopenia</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <p className="font-medium">Grade 3 (25-50k)</p>
                      <p>• Hold therapy</p>
                      <p>• Daily monitoring</p>
                      <p>• Consider delay</p>
                    </div>
                    <div className="p-2 border rounded">
                      <p className="font-medium">Grade 4 (&lt;25k)</p>
                      <p>• Emergency consultation</p>
                      <p>• Platelet transfusion</p>
                      <p>• Dose reduction 25-50%</p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gastrointestinal">
            <AccordionTrigger>Gastrointestinal Toxicities</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Nausea/Vomiting</h4>
                  <div className="text-sm space-y-1">
                    <p>• 5-HT3 antagonists</p>
                    <p>• NK1 antagonists</p>
                    <p>• Dexamethasone</p>
                    <p>• Olanzapine (breakthrough)</p>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Diarrhea</h4>
                  <div className="text-sm space-y-1">
                    <p>• Loperamide first-line</p>
                    <p>• Octreotide if severe</p>
                    <p>• Fluid/electrolyte support</p>
                    <p>• Rule out C. diff</p>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Mucositis</h4>
                  <div className="text-sm space-y-1">
                    <p>• Oral care protocol</p>
                    <p>• Magic mouthwash</p>
                    <p>• Systemic analgesia</p>
                    <p>• Dose modification</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
);

const TreatmentPlanSelector = () => {
  const [selectedCancerType, setSelectedCancerType] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedHistology, setSelectedHistology] = useState("");
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([]);
  const [selectedMolecularProfile, setSelectedMolecularProfile] = useState("");
  const [selectedTreatmentIntent, setSelectedTreatmentIntent] = useState("");
  const [selectedLineOfTreatment, setSelectedLineOfTreatment] = useState("");
  const [selectedPreviousTreatments, setSelectedPreviousTreatments] = useState<string[]>([]);
  const [selectedReasonForChange, setSelectedReasonForChange] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Treatment selection data constants
  const cancerTypes = [
    "Breast Cancer", "Lung Cancer (NSCLC)", "Lung Cancer (SCLC)", "Colorectal Cancer", 
    "Gastric Cancer", "Pancreatic Cancer", "Hepatocellular Carcinoma", "Ovarian Cancer",
    "Prostate Cancer", "Melanoma", "Renal Cell Carcinoma", "Bladder Cancer",
    "Head and Neck Cancer", "Lymphoma (Hodgkin)", "Lymphoma (Non-Hodgkin)", "Leukemia (AML)"
  ];

  const stages = ["Stage 0", "Stage I", "Stage IA", "Stage IB", "Stage II", "Stage IIA", "Stage IIB", 
                 "Stage III", "Stage IIIA", "Stage IIIB", "Stage IIIC", "Stage IV", "Stage IVA", "Stage IVB"];

  const histologyOptions = {
    "Breast Cancer": ["Invasive Ductal Carcinoma", "Invasive Lobular Carcinoma", "Mucinous", "Tubular", "Inflammatory"],
    "Lung Cancer (NSCLC)": ["Adenocarcinoma", "Squamous Cell", "Large Cell", "NSCLC-NOS"],
    "Colorectal Cancer": ["Adenocarcinoma", "Mucinous", "Signet Ring", "Neuroendocrine"],
    "default": ["Adenocarcinoma", "Squamous Cell", "Undifferentiated", "Mixed"]
  };

  const biomarkerOptions = {
    "Breast Cancer": ["ER+", "ER-", "PR+", "PR-", "HER2+", "HER2-", "Triple Negative"],
    "Lung Cancer (NSCLC)": ["EGFR+", "ALK+", "ROS1+", "BRAF+", "KRAS+", "PD-L1 High", "PD-L1 Low"],
    "Colorectal Cancer": ["KRAS Wild-type", "KRAS Mutant", "BRAF+", "MSI-H", "MSS", "HER2+"],
    "default": ["PD-L1 High", "PD-L1 Low", "MSI-H", "MSS", "HER2+", "HER2-"]
  };

  const molecularProfiles = ["KRAS G12C", "BRAF V600E", "NTRK Fusion", "RET Fusion", "PIK3CA", "TP53", "BRCA1/2"];
  const treatmentIntents = ["Curative", "Palliative", "Neoadjuvant", "Adjuvant"];
  const lineOfTreatments = ["1st Line", "2nd Line", "3rd Line", "Maintenance", "Adjuvant", "Neoadjuvant"];
  const previousTreatments = ["Surgery", "Radiation", "Chemotherapy", "Immunotherapy", "Targeted Therapy", "Hormone Therapy"];
  const reasonsForChange = ["Disease Progression", "Toxicity/Intolerance", "Treatment Completion", "Patient Choice"];

  const generateRecommendations = () => {
    if (!selectedCancerType || !selectedStage || !selectedTreatmentIntent) {
      return null;
    }

    // Generate protocol recommendations based on selections
    const protocols = [];
    
    if (selectedCancerType === "Breast Cancer" && selectedBiomarkers.includes("HER2+")) {
      protocols.push({
        name: "TCH (Docetaxel + Carboplatin + Trastuzumab)",
        intent: selectedTreatmentIntent,
        guidelines: ["NCCN v3.2025", "ESMO 2024"],
        drugs: ["Docetaxel 75mg/m²", "Carboplatin AUC 6", "Trastuzumab 8mg/kg loading"],
        alerts: ["Cardiac monitoring required", "Consider fertility preservation"]
      });
    }

    if (selectedCancerType === "Lung Cancer (NSCLC)" && selectedBiomarkers.includes("EGFR+")) {
      protocols.push({
        name: "Osimertinib Monotherapy",
        intent: selectedTreatmentIntent,
        guidelines: ["NCCN v1.2025", "ESMO 2024"],
        drugs: ["Osimertinib 80mg PO daily"],
        alerts: ["Monitor for QTc prolongation", "Consider CNS imaging"]
      });
    }

    if (selectedCancerType === "Colorectal Cancer" && selectedBiomarkers.includes("KRAS Wild-type")) {
      protocols.push({
        name: "FOLFIRI + Cetuximab",
        intent: selectedTreatmentIntent,
        guidelines: ["NCCN v3.2025", "ESMO 2024"],
        drugs: ["Irinotecan 180mg/m²", "5-FU 400mg/m² bolus", "Leucovorin 400mg/m²", "Cetuximab 400mg/m²"],
        alerts: ["Skin toxicity monitoring", "UGT1A1 testing recommended"]
      });
    }

    // Default fallback recommendations
    if (protocols.length === 0) {
      protocols.push({
        name: "Standard Chemotherapy Protocol",
        intent: selectedTreatmentIntent,
        guidelines: ["NCCN 2025", "ESMO 2024"],
        drugs: ["Protocol-specific agents based on cancer type"],
        alerts: ["Complete staging required", "Multidisciplinary team consultation recommended"]
      });
    }

    return protocols;
  };

  const recommendations = showRecommendations ? generateRecommendations() : null;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Treatment Selection Criteria
            </CardTitle>
            <CardDescription>
              Select patient and disease characteristics to receive evidence-based treatment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cancer Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Cancer Type *</label>
              <Select value={selectedCancerType} onValueChange={setSelectedCancerType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cancer type" />
                </SelectTrigger>
                <SelectContent>
                  {cancerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stage */}
            <div>
              <label className="text-sm font-medium mb-2 block">Stage *</label>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Histology */}
            {selectedCancerType && (
              <div>
                <label className="text-sm font-medium mb-2 block">Histology/Subtype</label>
                <Select value={selectedHistology} onValueChange={setSelectedHistology}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select histology" />
                  </SelectTrigger>
                  <SelectContent>
                    {(histologyOptions[selectedCancerType as keyof typeof histologyOptions] || histologyOptions.default).map(hist => (
                      <SelectItem key={hist} value={hist}>{hist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Biomarkers */}
            {selectedCancerType && (
              <div>
                <label className="text-sm font-medium mb-2 block">IHC/Biomarkers</label>
                <div className="grid grid-cols-2 gap-2">
                  {(biomarkerOptions[selectedCancerType as keyof typeof biomarkerOptions] || biomarkerOptions.default).map(marker => (
                    <div key={marker} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={marker}
                        checked={selectedBiomarkers.includes(marker)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBiomarkers([...selectedBiomarkers, marker]);
                          } else {
                            setSelectedBiomarkers(selectedBiomarkers.filter(m => m !== marker));
                          }
                        }}
                        className="rounded"
                      />
                      <label htmlFor={marker} className="text-sm">{marker}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treatment Intent */}
            <div>
              <label className="text-sm font-medium mb-2 block">Treatment Intent *</label>
              <Select value={selectedTreatmentIntent} onValueChange={setSelectedTreatmentIntent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intent" />
                </SelectTrigger>
                <SelectContent>
                  {treatmentIntents.map(intent => (
                    <SelectItem key={intent} value={intent}>{intent}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Line of Treatment */}
            <div>
              <label className="text-sm font-medium mb-2 block">Line of Treatment</label>
              <Select value={selectedLineOfTreatment} onValueChange={setSelectedLineOfTreatment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select line" />
                </SelectTrigger>
                <SelectContent>
                  {lineOfTreatments.map(line => (
                    <SelectItem key={line} value={line}>{line}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => setShowRecommendations(true)}
              className="w-full"
              disabled={!selectedCancerType || !selectedStage || !selectedTreatmentIntent}
            >
              <Search className="h-4 w-4 mr-2" />
              Generate Treatment Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5 text-green-600" />
              Treatment Recommendations
            </CardTitle>
            <CardDescription>
              Evidence-based treatment options for selected criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showRecommendations ? (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Complete the selection criteria to view treatment recommendations
                </p>
              </div>
            ) : recommendations && recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((protocol, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-lg">{protocol.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">{protocol.intent}</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Supporting Guidelines</h5>
                        <div className="space-y-1">
                          {protocol.guidelines.map((guideline, j) => (
                            <Badge key={j} variant="outline" className="mr-1">{guideline}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2">Drug Regimen</h5>
                        <div className="space-y-1">
                          {protocol.drugs.map((drug, j) => (
                            <div key={j} className="text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                              {drug}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {protocol.alerts.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-1 text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          Clinical Alerts
                        </h5>
                        <div className="space-y-1">
                          {protocol.alerts.map((alert, j) => (
                            <div key={j} className="text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded border-l-2 border-amber-400">
                              {alert}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                <p className="text-muted-foreground">
                  No specific recommendations available for the selected criteria.
                  Consider multidisciplinary team consultation.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function CDUModule() {
  const [activeTab, setActiveTab] = useState("protocols");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <Syringe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CDU Module
              </h1>
              <p className="text-muted-foreground">
                Cancer Day Unit Treatment Management
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="protocols" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Treatment Protocols
            </TabsTrigger>
            <TabsTrigger value="medications" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Medications
            </TabsTrigger>
            <TabsTrigger value="toxicity" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Toxicity Management
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              🧬 Treatment Plan Selector
            </TabsTrigger>
          </TabsList>

          <TabsContent value="protocols">
            <TreatmentProtocols />
          </TabsContent>
          
          <TabsContent value="medications">
            <MedicationsTab />
          </TabsContent>
          
          <TabsContent value="toxicity">
            <ToxicityManagement />
          </TabsContent>
          
          <TabsContent value="progress">
            <TreatmentPlanSelector />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}