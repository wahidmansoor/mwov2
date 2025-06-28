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

const DiseaseProgressTracker = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { metric: "Response Rate", value: "85%", change: "+5%", trend: "up" },
        { metric: "Progression-Free", value: "8.2 mo", change: "+0.8", trend: "up" },
        { metric: "Dose Intensity", value: "92%", change: "-3%", trend: "down" },
        { metric: "Toxicity Rate", value: "23%", change: "-8%", trend: "down" }
      ].map((metric, i) => (
        <Card key={i} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{metric.metric}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                <span className="text-sm">{metric.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Treatment Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "2024-01-15", event: "Treatment Start", status: "completed", details: "FOLFOX Cycle 1" },
              { date: "2024-02-05", event: "First Response", status: "completed", details: "Partial Response (30% reduction)" },
              { date: "2024-03-10", event: "Mid-treatment", status: "completed", details: "Continued response" },
              { date: "2024-04-15", event: "Next Assessment", status: "upcoming", details: "Cycle 8 evaluation" }
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  event.status === 'completed' ? 'bg-green-500' : 
                  event.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.details}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Response Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Current Response</h4>
              <p className="text-2xl font-bold text-green-800">Partial Response</p>
              <p className="text-sm text-green-700">45% reduction in target lesions</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Imaging Results</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Baseline</span>
                  <span className="text-sm font-medium">120mm (sum)</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Cycle 4</span>
                  <span className="text-sm font-medium">85mm (-29%)</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Cycle 6</span>
                  <span className="text-sm font-medium">66mm (-45%)</span>
                </div>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Schedule Next Imaging
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

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
              Disease Progress Tracker
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
            <DiseaseProgressTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}