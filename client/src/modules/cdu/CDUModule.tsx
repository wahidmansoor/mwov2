import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
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
  Brain
} from "lucide-react";

const TreatmentProtocols = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-blue-600" />
            Active Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "FOLFOX", indication: "Colorectal", cycles: "12", status: "active" },
              { name: "AC-T", indication: "Breast", cycles: "8", status: "active" },
              { name: "Carboplatin-Paclitaxel", indication: "Lung", cycles: "6", status: "review" }
            ].map((protocol, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{protocol.name}</h4>
                  <Badge className={protocol.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                    {protocol.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{protocol.indication} • {protocol.cycles} cycles</p>
                <Button className="w-full mt-2" size="sm" variant="outline">
                  View Protocol
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-purple-600" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Cancer Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select cancer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breast">Breast Cancer</SelectItem>
                  <SelectItem value="lung">Lung Cancer</SelectItem>
                  <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
                  <SelectItem value="lymphoma">Lymphoma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Stage</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early">Early Stage</SelectItem>
                  <SelectItem value="locally-advanced">Locally Advanced</SelectItem>
                  <SelectItem value="metastatic">Metastatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Find Protocols
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-green-600" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-sm">09:00 - Cycle 3 Day 1</p>
              <p className="text-xs text-muted-foreground">FOLFOX Protocol</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium text-sm">11:30 - Pre-medications</p>
              <p className="text-xs text-muted-foreground">AC Protocol Day 1</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="font-medium text-sm">14:00 - Follow-up Labs</p>
              <p className="text-xs text-muted-foreground">Carboplatin monitoring</p>
            </div>
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Protocol Library</CardTitle>
        <CardDescription>Evidence-based treatment protocols by indication</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="breast">
            <AccordionTrigger>Breast Cancer Protocols</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">AC-T (Adjuvant)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Doxorubicin + Cyclophosphamide → Paclitaxel
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• 4 cycles AC q2-3 weeks</p>
                    <p>• 4 cycles Paclitaxel weekly</p>
                    <p>• Duration: ~4-5 months</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">TCH (HER2+)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Docetaxel + Carboplatin + Trastuzumab
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• 6 cycles q3 weeks</p>
                    <p>• Trastuzumab continuation</p>
                    <p>• Duration: 1 year total</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lung">
            <AccordionTrigger>Lung Cancer Protocols</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Carboplatin-Paclitaxel</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Standard first-line NSCLC
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• 4-6 cycles q3 weeks</p>
                    <p>• Maintenance options</p>
                    <p>• PD-L1 combinations</p>
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
            <TabsTrigger value="dosage" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Dosage Calculator
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
          
          <TabsContent value="dosage">
            <DosageCalculator />
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