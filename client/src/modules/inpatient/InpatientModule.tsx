import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Bed, 
  AlertTriangle, 
  Shield, 
  Activity, 
  Clock, 
  Heart,
  Thermometer,
  Droplets,
  Zap,
  FileText,
  CheckCircle,
  Calendar,
  Users,
  Stethoscope,
  Pill,
  TrendingUp
} from "lucide-react";

const inpatientSections = [
  { 
    id: "admission", 
    name: "Admission Protocols", 
    icon: Bed,
    description: "Evidence-based admission criteria and initial assessment workflows"
  },
  { 
    id: "emergency", 
    name: "Emergency Regimens", 
    icon: AlertTriangle,
    description: "Critical oncology emergencies and management protocols"
  },
  { 
    id: "monitoring", 
    name: "Monitoring Workflows", 
    icon: Activity,
    description: "Daily assessment guides and clinical monitoring parameters"
  },
  { 
    id: "supportive", 
    name: "Supportive Care", 
    icon: Heart,
    description: "Symptom management and supportive care protocols"
  },
  { 
    id: "discharge", 
    name: "Discharge Planning", 
    icon: FileText,
    description: "Discharge criteria and transition planning tools"
  }
];

// NCCN Treatment-Related Adverse Events Component
const NCCNAdverseEvents = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-red-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          NCCN Treatment-Related Adverse Events (BINV-M)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="febrile-neutropenia">
            <AccordionTrigger>Febrile Neutropenia Management</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">High-Risk Criteria (Category 1)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ANC &lt;500 cells/mcL expected to persist &gt;7 days</li>
                    <li>• Hemodynamic instability or hypotension</li>
                    <li>• Pneumonia or other serious infection</li>
                    <li>• Severe mucositis preventing oral intake</li>
                    <li>• Age &gt;65 with comorbidities</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">Empiric Antibiotics</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Piperacillin-tazobactam 4.5g IV q6h</li>
                      <li>• OR Cefepime 2g IV q8h</li>
                      <li>• Add vancomycin if MRSA risk</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">G-CSF Administration</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Filgrastim 5 mcg/kg/day SC</li>
                      <li>• Until ANC &gt;1000 for 2 consecutive days</li>
                      <li>• Consider pegfilgrastim for prevention</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tumor-lysis">
            <AccordionTrigger>Tumor Lysis Syndrome Prevention</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">High-Risk Tumors</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Burkitt lymphoma, lymphoblastic lymphoma</li>
                    <li>• Acute leukemia with WBC &gt;50,000</li>
                    <li>• Bulky lymphadenopathy (&gt;10 cm)</li>
                    <li>• Elevated LDH (&gt;2x ULN)</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <h5 className="font-medium text-sm mb-2">Prophylaxis Protocol</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Allopurinol 300mg PO daily × 3 days</li>
                      <li>• OR Rasburicase 0.2mg/kg IV daily</li>
                      <li>• Aggressive hydration 3L/m²/day</li>
                      <li>• Monitor electrolytes q6h</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <h5 className="font-medium text-sm mb-2">Laboratory Monitoring</h5>
                    <ul className="text-xs space-y-1">
                      <li>• K+, PO4, Ca2+, Mg2+, uric acid</li>
                      <li>• BUN, creatinine, LDH</li>
                      <li>• Monitor every 6-12 hours</li>
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

// NCCN Colon Cancer Inpatient Protocols
const NCCNInpatientProtocols = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-5 w-5 text-blue-600" />
          NCCN Small Cell Lung Cancer Inpatient Management (SCLC-1)
        </CardTitle>
        <CardDescription>Comprehensive Inpatient SCLC Protocols - Version 4.2025</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="perioperative-management">
            <AccordionTrigger>Perioperative Colon Cancer Management</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Pre-operative Assessment</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Complete colonoscopy with biopsy</li>
                    <li>• CT chest/abdomen/pelvis with IV contrast</li>
                    <li>• CEA level baseline</li>
                    <li>• CBC, comprehensive metabolic panel</li>
                    <li>• Performance status evaluation</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">Surgical Planning</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Multidisciplinary team evaluation</li>
                      <li>• Adequate lymph node harvest (≥12 nodes)</li>
                      <li>• Consider en bloc resection for T4 tumors</li>
                      <li>• Intraoperative assessment of liver</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">Post-operative Monitoring</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Daily CBC and basic metabolic panel</li>
                      <li>• Monitor for anastomotic leak</li>
                      <li>• Early mobilization protocols</li>
                      <li>• DVT prophylaxis per guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="metastatic-management">
            <AccordionTrigger>Metastatic Disease Management</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Resectable Metastases</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Multidisciplinary evaluation required</li>
                    <li>• Consider neoadjuvant chemotherapy</li>
                    <li>• Hepatic artery infusion for liver-limited disease</li>
                    <li>• SBRT for oligometastatic disease</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <h5 className="font-medium text-sm mb-2">Liver Metastases</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Consider hepatic resection if feasible</li>
                      <li>• Thermal ablation for lesions ≤3 cm</li>
                      <li>• Portal vein embolization for future liver remnant</li>
                      <li>• Two-stage hepatectomy consideration</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <h5 className="font-medium text-sm mb-2">Lung Metastases</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Pulmonary resection if limited disease</li>
                      <li>• SBRT for inoperable lesions</li>
                      <li>• Consider simultaneous vs staged resection</li>
                      <li>• Adequate pulmonary function assessment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="post-surgical">
            <AccordionTrigger>Post-Surgical Management (BINV-8)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Post-Mastectomy Care</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Drain output monitoring (&lt;30mL/day before removal)</li>
                    <li>• Arm exercises to prevent lymphedema</li>
                    <li>• Infection surveillance at surgical site</li>
                    <li>• Pain management with multimodal approach</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <h5 className="font-medium text-sm mb-2">Lymphedema Prevention</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Baseline arm measurements</li>
                      <li>• Patient education on precautions</li>
                      <li>• Early referral to therapy if needed</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                    <h5 className="font-medium text-sm mb-2">Adjuvant Planning</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Final pathology review</li>
                      <li>• Multidisciplinary team discussion</li>
                      <li>• Radiation oncology consultation</li>
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

// Admission Protocols Component
const AdmissionProtocols = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Admission Criteria Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Primary Indication</label>
              <div className="space-y-2 mt-2">
                {[
                  "Neutropenic fever (ANC <500)",
                  "Severe mucositis/unable to swallow",
                  "Tumor-related emergency",
                  "Severe treatment toxicity",
                  "Pain requiring IV opioids",
                  "Planned complex procedure"
                ].map((indication, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input type="checkbox" id={`indication${i}`} />
                    <label htmlFor={`indication${i}`} className="text-sm">{indication}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Risk Stratification</label>
              <div className="space-y-3 mt-2">
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>High Risk:</strong> Hypotension, altered mental status, severe sepsis
                  </AlertDescription>
                </Alert>
                <Alert className="bg-yellow-50 border-yellow-200">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Moderate Risk:</strong> Stable vitals, able to take oral medications
                  </AlertDescription>
                </Alert>
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Low Risk:</strong> Well-appearing, good performance status
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h4 className="font-medium">Initial Assessment Checklist</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Vital signs q15min x 1hr",
              "Complete blood count with diff",
              "Comprehensive metabolic panel",
              "Blood cultures x2 sets",
              "Lactate level",
              "Chest X-ray",
              "ECG if indicated",
              "Urinalysis and culture",
              "Performance status assessment"
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input type="checkbox" id={`checklist${i}`} />
                <label htmlFor={`checklist${i}`} className="text-sm">{item}</label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Emergency Regimens Component
const EmergencyRegimens = () => (
  <div className="space-y-6">
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="neutropenic-fever" className="border rounded-lg">
        <AccordionTrigger className="px-4 py-3 bg-red-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-600" />
            <span className="font-medium">Neutropenic Fever Protocol</span>
            <Badge className="bg-red-100 text-red-800">Emergency</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3">
          <div className="space-y-4">
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Immediate Action Required:</strong> Temperature ≥38.3°C or ≥38°C sustained &gt;1hr + ANC &lt;500
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">First Hour Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    • Blood cultures x2 (central & peripheral)<br/>
                    • CBC with differential<br/>
                    • Comprehensive metabolic panel<br/>
                    • Lactate, procalcitonin<br/>
                    • Chest X-ray<br/>
                    • Urinalysis and culture<br/>
                    • Start empiric antibiotics within 1 hour
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Empiric Antibiotic Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <strong>Standard Risk:</strong><br/>
                    • Cefepime 2g IV q8h OR<br/>
                    • Piperacillin-tazobactam 4.5g IV q6h<br/><br/>
                    <strong>High Risk/Sepsis:</strong><br/>
                    • Add vancomycin 15-20mg/kg IV q12h<br/>
                    • Consider antifungal coverage
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="tumor-lysis" className="border rounded-lg">
        <AccordionTrigger className="px-4 py-3 bg-orange-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            <span className="font-medium">Tumor Lysis Syndrome</span>
            <Badge className="bg-orange-100 text-orange-800">Critical</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Laboratory Criteria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    • Uric acid &gt;8 mg/dL<br/>
                    • Potassium &gt;6 mEq/L<br/>
                    • Phosphate &gt;4.5 mg/dL<br/>
                    • Calcium &lt;7 mg/dL<br/>
                    • Creatinine ≥1.5x baseline
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Management Protocol</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    • IV hydration 3L/m²/day<br/>
                    • Rasburicase 0.2mg/kg IV daily<br/>
                    • Monitor electrolytes q6h<br/>
                    • Nephrology consult<br/>
                    • Consider dialysis if severe
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="hypercalcemia" className="border rounded-lg">
        <AccordionTrigger className="px-4 py-3 bg-purple-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Hypercalcemia Management</span>
            <Badge className="bg-purple-100 text-purple-800">Urgent</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3">
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Mild (10.5-11.9 mg/dL)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  • Increase oral fluids<br/>
                  • Monitor symptoms<br/>
                  • Outpatient follow-up
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Moderate (12-13.9 mg/dL)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  • Normal saline 1-2L IV<br/>
                  • Furosemide after rehydration<br/>
                  • Bisphosphonate therapy
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Severe (≥14 mg/dL)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  • Aggressive IV hydration<br/>
                  • Zoledronic acid 4mg IV<br/>
                  • Calcitonin if symptomatic<br/>
                  • ICU monitoring
                </CardContent>
              </Card>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

// Monitoring Workflows Component
const MonitoringWorkflows = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Daily Assessment Protocol
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Vital Parameters (q8h minimum)</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input placeholder="Temperature" />
                <Input placeholder="Blood Pressure" />
                <Input placeholder="Heart Rate" />
                <Input placeholder="Respiratory Rate" />
                <Input placeholder="O2 Saturation" />
                <Input placeholder="Pain Score (0-10)" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Performance Status</label>
              <div className="space-y-2 mt-2">
                {[
                  "ECOG 0: Fully active",
                  "ECOG 1: Restricted in strenuous activity",
                  "ECOG 2: Ambulatory &gt;50% of day",
                  "ECOG 3: Limited self-care",
                  "ECOG 4: Completely disabled"
                ].map((status, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input type="radio" name="ecog" id={`ecog${i}`} />
                    <label htmlFor={`ecog${i}`} className="text-sm">{status}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            Clinical Monitoring Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Neurological assessment (confusion, focal deficits)",
              "Cardiovascular examination (murmurs, edema)",
              "Respiratory status (breath sounds, dyspnea)",
              "Gastrointestinal function (nausea, bowel movements)",
              "Genitourinary assessment (urine output, retention)",
              "Skin integrity (rash, pressure areas, IV sites)",
              "Mucositis grading (WHO scale 0-4)",
              "Nutritional status (intake, weight changes)"
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-2">
                <input type="checkbox" id={`monitor${i}`} className="mt-1" />
                <label htmlFor={`monitor${i}`} className="text-sm">{item}</label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          Laboratory Monitoring Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Daily Labs</h4>
            <div className="text-sm space-y-1">
              • Complete Blood Count<br/>
              • Basic Metabolic Panel<br/>
              • Liver Function Tests<br/>
              • Magnesium, Phosphorus
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Twice Weekly</h4>
            <div className="text-sm space-y-1">
              • Albumin, Pre-albumin<br/>
              • PT/INR, PTT<br/>
              • Urinalysis<br/>
              • Blood cultures if febrile
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Weekly/PRN</h4>
            <div className="text-sm space-y-1">
              • Thyroid function<br/>
              • B12, Folate<br/>
              • Tumor markers<br/>
              • Imaging per protocol
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Supportive Care Component
const SupportiveCare = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-purple-600" />
            Antiemetic Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm">High Emetogenic Risk</h4>
              <div className="text-sm mt-2 p-3 bg-purple-50 rounded">
                • Ondansetron 8mg IV q8h<br/>
                • Dexamethasone 12mg IV daily<br/>
                • Aprepitant 125mg PO day 1, then 80mg daily<br/>
                • Metoclopramide 10mg IV q6h PRN
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm">Breakthrough Nausea</h4>
              <div className="text-sm mt-2 p-3 bg-gray-50 rounded">
                • Prochlorperazine 10mg IV q6h<br/>
                • Promethazine 25mg IV q6h<br/>
                • Lorazepam 0.5-1mg PO q6h<br/>
                • Consider olanzapine 5mg PO daily
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Pain Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm">Mild Pain (1-3/10)</h4>
              <div className="text-sm mt-2 p-3 bg-green-50 rounded">
                • Acetaminophen 650mg PO q6h<br/>
                • Ibuprofen 400mg PO q8h<br/>
                • Topical analgesics PRN
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm">Moderate-Severe Pain (4-10/10)</h4>
              <div className="text-sm mt-2 p-3 bg-red-50 rounded">
                • Morphine 2-4mg IV q2h PRN<br/>
                • Oxycodone 5-10mg PO q4h<br/>
                • Consider PCA pump<br/>
                • Adjuvant: gabapentin for neuropathic pain
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Infection Prevention
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Neutropenia Precautions</h4>
            <div className="text-sm space-y-1">
              • Private room preferred<br/>
              • Hand hygiene compliance<br/>
              • No fresh flowers/plants<br/>
              • Avoid rectal procedures<br/>
              • Daily oral care protocol
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Prophylactic Measures</h4>
            <div className="text-sm space-y-1">
              • Fluconazole 400mg PO daily<br/>
              • Acyclovir 400mg PO BID<br/>
              • Pneumocystis prophylaxis if indicated<br/>
              • G-CSF per protocol
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Monitoring Parameters</h4>
            <div className="text-sm space-y-1">
              • Temperature q4h<br/>
              • Daily CBC with diff<br/>
              • Weekly blood cultures<br/>
              • Surveillance cultures PRN
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Discharge Planning Component
const DischargePlanning = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Discharge Readiness Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Clinical Stability</h4>
              <div className="space-y-2">
                {[
                  "Afebrile for 24-48 hours",
                  "Stable vital signs",
                  "Adequate oral intake",
                  "Controlled pain/symptoms",
                  "ANC recovery (&gt;500 if applicable)",
                  "Stable performance status"
                ].map((criterion, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input type="checkbox" id={`stable${i}`} />
                    <label htmlFor={`stable${i}`} className="text-sm">{criterion}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Social/Safety Factors</h4>
              <div className="space-y-2">
                {[
                  "Safe home environment",
                  "Adequate caregiver support",
                  "Transportation arrangements",
                  "Understanding of medications",
                  "Follow-up appointments scheduled",
                  "Emergency contact information"
                ].map((factor, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input type="checkbox" id={`social${i}`} />
                    <label htmlFor={`social${i}`} className="text-sm">{factor}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Discharge Instructions Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Activity Level</label>
              <Textarea 
                placeholder="e.g., No lifting >10lbs, gradual return to normal activities..."
                className="h-16 text-sm"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Diet Restrictions</label>
              <Textarea 
                placeholder="e.g., Neutropenic diet, avoid raw foods, adequate hydration..."
                className="h-16 text-sm"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Warning Signs</label>
              <Textarea 
                placeholder="e.g., Fever >100.4°F, persistent vomiting, severe pain..."
                className="h-16 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Follow-up Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Oncology Follow-up</label>
              <Input placeholder="Within 1-2 weeks or per protocol" className="text-sm" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Laboratory Studies</label>
              <Input placeholder="CBC, CMP in 2-3 days" className="text-sm" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Imaging/Procedures</label>
              <Input placeholder="CT scan in 4 weeks, restaging" className="text-sm" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Specialist Referrals</label>
              <Textarea 
                placeholder="e.g., Palliative care, nutrition, physical therapy..."
                className="h-16 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function InpatientModule() {
  const [activeSection, setActiveSection] = useState("admission");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "admission":
        return <NCCNInpatientProtocols />;
      case "emergency":
        return <NCCNAdverseEvents />;
      case "monitoring":
        return <MonitoringWorkflows />;
      case "supportive":
        return <SupportiveCare />;
      case "discharge":
        return <DischargePlanning />;
      default:
        return <NCCNInpatientProtocols />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inpatient Oncology</h2>
          <p className="text-muted-foreground">
            Comprehensive inpatient management protocols and clinical decision support tools
          </p>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          {inpatientSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center gap-2 data-[state=active]:bg-medical-orange data-[state=active]:text-white"
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-medical-orange">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentSection = inpatientSections.find(s => s.id === activeSection);
                  const IconComponent = currentSection?.icon || Bed;
                  return <IconComponent className="h-5 w-5 text-medical-orange" />;
                })()}
                {inpatientSections.find(s => s.id === activeSection)?.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {inpatientSections.find(s => s.id === activeSection)?.description}
              </p>
            </CardHeader>
          </Card>

          {renderActiveSection()}
        </div>
      </Tabs>
    </div>
  );
}