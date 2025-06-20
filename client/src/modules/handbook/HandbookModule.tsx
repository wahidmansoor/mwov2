import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Search, 
  AlertTriangle,
  Clock,
  Pill,
  FileText,
  Zap,
  Shield,
  Activity,
  Heart,
  Brain,
  Stethoscope
} from "lucide-react";

const DrugReference = () => (
  <div className="space-y-6">
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <Input placeholder="Search medications..." className="w-full" />
      </div>
      <Button>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Pill className="h-5 w-5 text-blue-600" />
            Chemotherapy Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { drug: "Carboplatin", class: "Platinum", dose: "AUC 5-6", frequency: "q3 weeks" },
              { drug: "Paclitaxel", class: "Taxane", dose: "175 mg/m²", frequency: "q3 weeks" },
              { drug: "Doxorubicin", class: "Anthracycline", dose: "60 mg/m²", frequency: "q3 weeks" }
            ].map((drug, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="font-medium">{drug.drug}</h4>
                <p className="text-sm text-muted-foreground">{drug.class}</p>
                <div className="text-xs mt-1">
                  <p>Standard dose: {drug.dose}</p>
                  <p>Frequency: {drug.frequency}</p>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-green-600" />
            Supportive Care
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { drug: "Ondansetron", indication: "Nausea/Vomiting", dose: "8mg PO/IV", frequency: "q8h" },
              { drug: "Filgrastim", indication: "Neutropenia", dose: "5 mcg/kg", frequency: "daily" },
              { drug: "Dexamethasone", indication: "Anti-emetic", dose: "12mg IV", frequency: "pre-chemo" }
            ].map((drug, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="font-medium">{drug.drug}</h4>
                <p className="text-sm text-muted-foreground">{drug.indication}</p>
                <div className="text-xs mt-1">
                  <p>Dose: {drug.dose}</p>
                  <p>Frequency: {drug.frequency}</p>
                </div>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  View Protocol
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Emergency Drugs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { drug: "Epinephrine", indication: "Anaphylaxis", dose: "0.3-0.5mg IM", route: "Thigh" },
              { drug: "Hydrocortisone", indication: "Severe reaction", dose: "100mg IV", route: "IV push" },
              { drug: "Diphenhydramine", indication: "Allergic reaction", dose: "25-50mg IV", route: "Slow push" }
            ].map((drug, i) => (
              <div key={i} className="p-3 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-900">{drug.drug}</h4>
                <p className="text-sm text-red-700">{drug.indication}</p>
                <div className="text-xs mt-1 text-red-600">
                  <p>Dose: {drug.dose}</p>
                  <p>Route: {drug.route}</p>
                </div>
                <Button size="sm" className="w-full mt-2" variant="destructive">
                  Emergency Protocol
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Drug Interaction Checker</CardTitle>
        <CardDescription>Check for drug-drug interactions and contraindications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Primary Drug</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select primary medication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carboplatin">Carboplatin</SelectItem>
                <SelectItem value="paclitaxel">Paclitaxel</SelectItem>
                <SelectItem value="doxorubicin">Doxorubicin</SelectItem>
                <SelectItem value="cyclophosphamide">Cyclophosphamide</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Secondary Drug</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select secondary medication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phenytoin">Phenytoin</SelectItem>
                <SelectItem value="warfarin">Warfarin</SelectItem>
                <SelectItem value="digoxin">Digoxin</SelectItem>
                <SelectItem value="aprepitant">Aprepitant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full mt-4">
          Check Interactions
        </Button>
      </CardContent>
    </Card>
  </div>
);

const Protocols = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Clinical Protocols by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="emergency">
            <AccordionTrigger>Emergency Protocols</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-900">Anaphylaxis Protocol</h4>
                  <div className="text-sm text-red-700 space-y-1 mt-2">
                    <p>1. Discontinue infusion immediately</p>
                    <p>2. Epinephrine 0.3-0.5mg IM (thigh)</p>
                    <p>3. IV access if not present</p>
                    <p>4. Normal saline 1-2L rapid infusion</p>
                    <p>5. Hydrocortisone 100mg IV</p>
                    <p>6. Diphenhydramine 25-50mg IV</p>
                    <p>7. Consider albuterol if bronchospasm</p>
                    <p>8. Monitor vitals continuously</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50">
                  <h4 className="font-medium text-amber-900">Extravasation Protocol</h4>
                  <div className="text-sm text-amber-700 space-y-1 mt-2">
                    <p>1. Stop infusion immediately</p>
                    <p>2. Leave needle/catheter in place</p>
                    <p>3. Aspirate residual drug</p>
                    <p>4. Remove needle/catheter</p>
                    <p>5. Mark affected area</p>
                    <p>6. Apply appropriate antidote</p>
                    <p>7. Elevate affected limb</p>
                    <p>8. Photo documentation</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="premedication">
            <AccordionTrigger>Premedication Protocols</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Standard Premedication</h4>
                  <div className="text-sm space-y-1 mt-2">
                    <p>• Dexamethasone 12mg IV</p>
                    <p>• Ondansetron 8mg IV</p>
                    <p>• Diphenhydramine 25mg IV</p>
                    <p>• Ranitidine 50mg IV</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">30 minutes before chemotherapy</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Taxane Premedication</h4>
                  <div className="text-sm space-y-1 mt-2">
                    <p>• Dexamethasone 20mg PO</p>
                    <p>• Diphenhydramine 50mg IV</p>
                    <p>• Ranitidine 50mg IV</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">12 &amp; 6 hours before, plus 30 min before</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Highly Emetogenic</h4>
                  <div className="text-sm space-y-1 mt-2">
                    <p>• Dexamethasone 12mg IV</p>
                    <p>• Ondansetron 8mg IV</p>
                    <p>• Aprepitant 125mg PO</p>
                    <p>• Olanzapine 10mg PO</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Day 1 of cycle</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Infusion Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { drug: "Carboplatin", rate: "15-60 minutes", diluent: "D5W or NS", volume: "250-500mL" },
              { drug: "Paclitaxel", rate: "3 hours", diluent: "NS", volume: "250-500mL" },
              { drug: "Doxorubicin", rate: "Push over 3-5 min", diluent: "NS", volume: "10-20mL" },
              { drug: "Cyclophosphamide", rate: "30-60 minutes", diluent: "NS", volume: "100-250mL" }
            ].map((infusion, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="font-medium">{infusion.drug}</h4>
                <div className="text-sm space-y-1 mt-1">
                  <p><span className="font-medium">Rate:</span> {infusion.rate}</p>
                  <p><span className="font-medium">Diluent:</span> {infusion.diluent}</p>
                  <p><span className="font-medium">Volume:</span> {infusion.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Monitoring Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Pre-treatment</h4>
              <div className="text-sm space-y-1 mt-1">
                <p>• Complete blood count</p>
                <p>• Comprehensive metabolic panel</p>
                <p>• Performance status assessment</p>
                <p>• Vital signs</p>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">During Infusion</h4>
              <div className="text-sm space-y-1 mt-1">
                <p>• Vital signs q15 minutes x 1 hour</p>
                <p>• IV site assessment</p>
                <p>• Symptom monitoring</p>
                <p>• Intake/output</p>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Post-treatment</h4>
              <div className="text-sm space-y-1 mt-1">
                <p>• Vital signs stable x 30 minutes</p>
                <p>• No acute reactions</p>
                <p>• Discharge education</p>
                <p>• Follow-up instructions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Guidelines = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-purple-600" />
            NCCN Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Breast Cancer",
              "Lung Cancer",
              "Colorectal Cancer",
              "Prostate Cancer",
              "Lymphoma"
            ].map((guideline, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="font-medium">{guideline}</h4>
                <p className="text-sm text-muted-foreground">NCCN Guidelines v.2024</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  View Guideline
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            ESMO Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Early Breast Cancer",
              "Advanced Breast Cancer",
              "Non-Small Cell Lung Cancer",
              "Colorectal Cancer",
              "Gastric Cancer"
            ].map((guideline, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="font-medium">{guideline}</h4>
                <p className="text-sm text-muted-foreground">ESMO Clinical Practice Guidelines</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  View Guideline
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-green-600" />
            Supportive Care
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Antiemetic Guidelines",
              "Febrile Neutropenia",
              "Mucositis Management",
              "Cardiotoxicity Monitoring",
              "Fertility Preservation"
            ].map((guideline, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="font-medium">{guideline}</h4>
                <p className="text-sm text-muted-foreground">ASCO/NCCN Supportive Care</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  View Protocol
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Treatment Algorithm Search</CardTitle>
        <CardDescription>Find evidence-based treatment algorithms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
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
                <SelectItem value="prostate">Prostate Cancer</SelectItem>
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
          <div>
            <label className="text-sm font-medium">Setting</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="adjuvant">Adjuvant</SelectItem>
                <SelectItem value="neoadjuvant">Neoadjuvant</SelectItem>
                <SelectItem value="palliative">Palliative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full">
          Find Treatment Algorithm
        </Button>
      </CardContent>
    </Card>
  </div>
);

const CalculatorTools = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Creatinine Clearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Age (years)</label>
                <Input type="number" placeholder="65" />
              </div>
              <div>
                <label className="text-sm font-medium">Weight (kg)</label>
                <Input type="number" placeholder="70" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Serum Creatinine (mg/dL)</label>
              <Input type="number" step="0.1" placeholder="1.2" />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              Calculate CrCl
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            ECOG Performance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { score: "0", description: "Fully active, no restrictions" },
              { score: "1", description: "Restricted in strenuous activity, able to do light work" },
              { score: "2", description: "Ambulatory, up &gt;50% of waking hours, unable to work" },
              { score: "3", description: "Limited self-care, confined to bed/chair &gt;50% of day" },
              { score: "4", description: "Completely disabled, confined to bed/chair" }
            ].map((status, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-100 text-green-800">ECOG {status.score}</Badge>
                  <p className="text-sm">{status.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Carboplatin AUC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Target AUC</label>
              <Select>
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
            <div>
              <label className="text-sm font-medium">CrCl (mL/min)</label>
              <Input type="number" placeholder="60" />
            </div>
            <Button className="w-full">
              Calculate Dose
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chemotherapy Cycles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="text-sm font-medium">Cycle Length (days)</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="21">21 days</SelectItem>
                  <SelectItem value="28">28 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Number of Cycles</label>
              <Input type="number" placeholder="6" />
            </div>
            <Button className="w-full">
              Calculate Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Toxicity Grading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Toxicity Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select toxicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="neutropenia">Neutropenia</SelectItem>
                  <SelectItem value="thrombocytopenia">Thrombocytopenia</SelectItem>
                  <SelectItem value="neuropathy">Neuropathy</SelectItem>
                  <SelectItem value="diarrhea">Diarrhea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Lab Value/Symptom</label>
              <Input placeholder="Enter value or description" />
            </div>
            <Button className="w-full">
              Grade Toxicity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function HandbookModule() {
  const [activeTab, setActiveTab] = useState("drugs");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Clinical Handbook
              </h1>
              <p className="text-muted-foreground">
                Comprehensive Medical Reference and Guidelines
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="drugs" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Drug Reference
            </TabsTrigger>
            <TabsTrigger value="protocols" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Protocols
            </TabsTrigger>
            <TabsTrigger value="guidelines" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Guidelines
            </TabsTrigger>
            <TabsTrigger value="calculators" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Calculators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drugs">
            <DrugReference />
          </TabsContent>
          
          <TabsContent value="protocols">
            <Protocols />
          </TabsContent>
          
          <TabsContent value="guidelines">
            <Guidelines />
          </TabsContent>
          
          <TabsContent value="calculators">
            <CalculatorTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}