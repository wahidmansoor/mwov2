import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Stethoscope, 
  Search, 
  Shield, 
  ArrowRight, 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User
} from "lucide-react";

const NCCNScreeningProtocols = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          NCCN Breast Cancer Screening Guidelines
        </CardTitle>
        <CardDescription>Evidence-based screening protocols from NCCN Guidelines Version 4.2025</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="average-risk">
            <AccordionTrigger>Average Risk Population</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Ages 40-49</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual mammography (Category 2B)</li>
                      <li>• Clinical breast examination</li>
                      <li>• Breast self-awareness education</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Ages 50-74</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual mammography (Category 1)</li>
                      <li>• Clinical breast examination</li>
                      <li>• Continue until life expectancy &lt;10 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="high-risk">
            <AccordionTrigger>High-Risk Population Screening</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">BRCA1/2 Mutation Carriers</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Annual mammography + MRI starting age 25-30</li>
                    <li>• Consider breast MRI if mammography/clinical findings negative</li>
                    <li>• Genetic counseling and risk-reducing strategies</li>
                    <li>• Clinical breast examination every 6-12 months</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Li-Fraumeni Syndrome</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Annual breast MRI starting age 20-25</li>
                    <li>• Consider mammography based on family history</li>
                    <li>• Avoid radiation exposure when possible</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="family-history">
            <AccordionTrigger>Family History Assessment</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Risk Factors to Assess</h4>
                    <ul className="text-sm space-y-1">
                      <li>• First-degree relatives with breast/ovarian cancer</li>
                      <li>• Age at diagnosis in relatives</li>
                      <li>• Bilateral breast cancer in family</li>
                      <li>• Male breast cancer in family</li>
                      <li>• Ashkenazi Jewish ancestry</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Genetic Testing Criteria</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Personal history of breast cancer ≤45 years</li>
                      <li>• Triple-negative breast cancer ≤60 years</li>
                      <li>• Family history meeting NCCN criteria</li>
                      <li>• Male breast cancer</li>
                    </ul>
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

const NCCNBiomarkerTesting = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          NCCN Biomarker Testing Protocols (BINV-A)
        </CardTitle>
        <CardDescription>Principles of Biomarker Testing for Breast Cancer</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="er-pr-testing">
            <AccordionTrigger>Estrogen/Progesterone Receptor Testing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">ER/PR Testing Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Required on all invasive breast cancers (Category 1)</li>
                    <li>• Immunohistochemistry (IHC) is standard method</li>
                    <li>• Positive if ≥1% of tumor nuclei stain</li>
                    <li>• Quality assurance with appropriate controls</li>
                    <li>• Consider repeat testing if discordant with clinical findings</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">ER-Positive Criteria</h5>
                    <p className="text-sm">≥1% nuclear staining</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Eligible for endocrine therapy</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">PR-Positive Criteria</h5>
                    <p className="text-sm">≥1% nuclear staining</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Predictive of ER pathway activity</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="her2-testing">
            <AccordionTrigger>HER2 Testing Protocol</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">HER2 Testing Algorithm</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Initial testing by IHC or ISH (Category 1)</li>
                    <li>• IHC 3+ or ISH amplified = HER2-positive</li>
                    <li>• IHC 2+ requires ISH confirmation</li>
                    <li>• IHC 0 or 1+ = HER2-negative</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200">
                    <h5 className="font-medium text-sm mb-2 text-red-800 dark:text-red-300">HER2-Positive</h5>
                    <ul className="text-xs space-y-1">
                      <li>• IHC 3+</li>
                      <li>• ISH ratio ≥2.0</li>
                      <li>• HER2 copy number ≥6.0</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200">
                    <h5 className="font-medium text-sm mb-2 text-yellow-800 dark:text-yellow-300">Equivocal</h5>
                    <ul className="text-xs space-y-1">
                      <li>• IHC 2+</li>
                      <li>• ISH ratio 1.8-2.2</li>
                      <li>• Requires reflex testing</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">HER2-Negative</h5>
                    <ul className="text-xs space-y-1">
                      <li>• IHC 0 or 1+</li>
                      <li>• ISH ratio &lt;1.8</li>
                      <li>• HER2 copy number &lt;4.0</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="gene-expression">
            <AccordionTrigger>Gene Expression Assays (BINV-N)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Clinical Applications</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ER-positive, HER2-negative, node-negative disease</li>
                    <li>• Select ER-positive, HER2-negative, 1-3 positive nodes</li>
                    <li>• Guide adjuvant chemotherapy decisions</li>
                    <li>• Validated assays: Oncotype DX, MammaPrint, EndoPredict</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">Oncotype DX</h5>
                    <ul className="text-xs space-y-1">
                      <li>• 21-gene recurrence score</li>
                      <li>• Low (&lt;26): Consider endocrine therapy</li>
                      <li>• High (≥26): Consider chemotherapy</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">MammaPrint</h5>
                    <ul className="text-xs space-y-1">
                      <li>• 70-gene signature</li>
                      <li>• Low risk vs High risk</li>
                      <li>• Use with clinical-pathological features</li>
                    </ul>
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

const NCCNDiagnosticWorkup = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-orange-600" />
          NCCN Diagnostic Workup (BINV-1)
        </CardTitle>
        <CardDescription>Clinical Stage and Workup Protocols</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="initial-workup">
            <AccordionTrigger>Initial Diagnostic Workup</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Essential Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-1">
                      <li>• History and physical examination</li>
                      <li>• Bilateral mammography ± tomosynthesis</li>
                      <li>• Breast MRI (if indicated)</li>
                      <li>• Consider baseline lymphedema screening</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li>• Core needle biopsy with image guidance</li>
                      <li>• ER, PR, HER2 testing on invasive cancer</li>
                      <li>• Ki-67 if considering neoadjuvant therapy</li>
                      <li>• Genetic counseling if indicated</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Clinical T1-T2, N0</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CBC with differential</li>
                      <li>• Comprehensive metabolic panel</li>
                      <li>• No routine imaging for staging</li>
                      <li>• Consider axillary ultrasound</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Clinical T3-T4 or N+</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CBC, comprehensive metabolic panel</li>
                      <li>• CT chest/abdomen/pelvis or</li>
                      <li>• FDG-PET/CT (consider FES-PET/CT for ER+)</li>
                      <li>• Bone scan or sodium fluoride PET</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="imaging-guidelines">
            <AccordionTrigger>NCCN Imaging Guidelines (BINV-B)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Breast MRI Indications</h4>
                  <ul className="text-sm space-y-1">
                    <li>• BRCA1/2 mutation carriers (high-risk screening)</li>
                    <li>• Suspected multicentric/multifocal disease</li>
                    <li>• Invasive lobular carcinoma extent assessment</li>
                    <li>• Occult primary with axillary metastases</li>
                    <li>• Monitoring response to neoadjuvant therapy</li>
                    <li>• Problem-solving for equivocal findings</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">MRI Timing</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Premenopausal: Days 7-14 of cycle</li>
                      <li>• Postmenopausal: Any time</li>
                      <li>• Contrast-enhanced required</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">MRI Limitations</h5>
                    <ul className="text-xs space-y-1">
                      <li>• High sensitivity, variable specificity</li>
                      <li>• May detect benign lesions</li>
                      <li>• Requires experienced interpretation</li>
                    </ul>
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

const ClinicalOverview = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-blue-600" />
            Clinical Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Age Group</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-30">18-30 years</SelectItem>
                  <SelectItem value="31-50">31-50 years</SelectItem>
                  <SelectItem value="51-70">51-70 years</SelectItem>
                  <SelectItem value="70+">70+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Primary Concern</label>
              <Textarea placeholder="Enter clinical presentation..." className="h-20" />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Generate Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Risk Stratification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Overall Risk</span>
              <Badge className="bg-amber-100 text-amber-800">Moderate</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Family History</span>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Environmental</span>
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Lifestyle</span>
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Detailed Risk Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-purple-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Next Steps</p>
              <p className="text-xs text-blue-700 mt-1">
                Consider imaging studies based on clinical presentation
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Protocol Match</p>
              <p className="text-xs text-green-700 mt-1">
                NCCN Guidelines v2024 - Early Detection
              </p>
            </div>
            <Button variant="ghost" className="w-full text-purple-600">
              View Full Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Recent Clinical Sessions</CardTitle>
        <CardDescription>Anonymous decision support inputs for quality review</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Clinical Assessment #{i + 1}</p>
                <p className="text-sm text-muted-foreground">Age group: 45-65, Risk factors: 3</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Completed</Badge>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const DiagnosticPathways = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Symptom-Based Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="respiratory">
              <AccordionTrigger>Respiratory Symptoms</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-l-blue-500 bg-blue-50">
                    <p className="font-medium">Persistent Cough (&gt;3 weeks)</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      → Chest X-ray → Consider CT if abnormal
                    </p>
                  </div>
                  <div className="p-3 border-l-4 border-l-amber-500 bg-amber-50">
                    <p className="font-medium">Hemoptysis</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      → Urgent imaging → Bronchoscopy consideration
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gastrointestinal">
              <AccordionTrigger>Gastrointestinal Symptoms</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-l-green-500 bg-green-50">
                    <p className="font-medium">Change in Bowel Habits</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      → Stool studies → Colonoscopy if indicated
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evidence-Based Algorithms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Lung Cancer Screening</h4>
              <div className="text-sm space-y-1">
                <p>• Age 50-80 years</p>
                <p>• 20+ pack-year smoking history</p>
                <p>• Current smoker or quit ≤15 years</p>
              </div>
              <Button className="mt-3" size="sm">
                Apply Criteria
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Colorectal Screening</h4>
              <div className="text-sm space-y-1">
                <p>• Age 45-75 years (average risk)</p>
                <p>• Earlier if family history</p>
                <p>• Multiple modality options</p>
              </div>
              <Button className="mt-3" size="sm" variant="outline">
                View Guidelines
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const CancerScreening = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Population Screening Programs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Breast Cancer", age: "40-74 years", interval: "2 years", method: "Mammography" },
            { name: "Cervical Cancer", age: "21-65 years", interval: "3 years", method: "Pap smear" },
            { name: "Colorectal Cancer", age: "45-75 years", interval: "10 years", method: "Colonoscopy" },
            { name: "Lung Cancer", age: "50-80 years", interval: "1 year", method: "Low-dose CT" },
            { name: "Prostate Cancer", age: "50-70 years", interval: "1-2 years", method: "PSA + DRE" },
            { name: "Skin Cancer", age: "All ages", interval: "Annual", method: "Clinical exam" }
          ].map((screening) => (
            <Card key={screening.name} className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{screening.name}</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Age:</span> {screening.age}</p>
                  <p><span className="font-medium">Interval:</span> {screening.interval}</p>
                  <p><span className="font-medium">Method:</span> {screening.method}</p>
                </div>
                <Button className="w-full mt-3" size="sm" variant="outline">
                  View Protocol
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const ReferralGuidelines = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Urgent Referral Criteria</CardTitle>
          <CardDescription>Two-week wait referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="lung">
              <AccordionTrigger className="text-red-700">Lung Cancer (Urgent)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>• Chest X-ray suggestive of lung cancer</p>
                  <p>• Age ≥40 with unexplained haemoptysis</p>
                  <p>• Age ≥40 with persistent cough (≥3 weeks)</p>
                  <p>• Finger clubbing</p>
                  <p>• Chest signs consistent with pleural effusion</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="colorectal">
              <AccordionTrigger className="text-red-700">Colorectal Cancer (Urgent)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>• Age ≥40 with rectal bleeding + change in bowel habit</p>
                  <p>• Age ≥60 with change in bowel habit</p>
                  <p>• Age ≥60 with iron deficiency anaemia</p>
                  <p>• Positive faecal occult blood test</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Non-Urgent Referrals</CardTitle>
          <CardDescription>Routine specialist consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-blue-700">Genetic Counseling</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Strong family history, hereditary cancer syndromes
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-blue-700">Surveillance Programs</h4>
              <p className="text-sm text-muted-foreground mt-1">
                High-risk individuals, previous cancer history
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-blue-700">Second Opinion</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Complex cases, treatment planning
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const FollowUpOncology = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          Surveillance Schedules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Early Stage Follow-up</h4>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Years 1-2</p>
                <p className="text-xs text-muted-foreground">Every 3-6 months</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Years 3-5</p>
                <p className="text-xs text-muted-foreground">Every 6-12 months</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">After 5 years</p>
                <p className="text-xs text-muted-foreground">Annual surveillance</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Advanced Stage Monitoring</h4>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Active Treatment</p>
                <p className="text-xs text-muted-foreground">Every 2-3 cycles</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Maintenance</p>
                <p className="text-xs text-muted-foreground">Every 3 months</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Progression Surveillance</p>
                <p className="text-xs text-muted-foreground">Per protocol</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function OPDModule() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OPD Module
              </h1>
              <p className="text-muted-foreground">
                Outpatient Department Clinical Decision Support
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Clinical Overview
            </TabsTrigger>
            <TabsTrigger value="screening" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              NCCN Screening
            </TabsTrigger>
            <TabsTrigger value="biomarkers" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Biomarker Testing
            </TabsTrigger>
            <TabsTrigger value="diagnostic" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Diagnostic Workup
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Referral Guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ClinicalOverview />
          </TabsContent>
          
          <TabsContent value="screening">
            <NCCNScreeningProtocols />
          </TabsContent>
          
          <TabsContent value="biomarkers">
            <NCCNBiomarkerTesting />
          </TabsContent>
          
          <TabsContent value="diagnostic">
            <NCCNDiagnosticWorkup />
          </TabsContent>
          
          <TabsContent value="referrals">
            <ReferralGuidelines />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}