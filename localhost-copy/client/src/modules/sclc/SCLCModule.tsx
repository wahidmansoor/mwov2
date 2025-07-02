import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Stethoscope, 
  Activity, 
  Calculator, 
  FileText, 
  TestTube,
  Target,
  Clock,
  AlertTriangle,
  Heart,
  Brain,
  Zap,
  Search
} from "lucide-react";

export default function SCLCModule() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">NCCN Small Cell Lung Cancer</h2>
          <p className="text-muted-foreground">
            NCCN Guidelines Version 4.2025 - Comprehensive SCLC Management Protocols
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Version 4.2025
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="diagnosis" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Diagnosis
          </TabsTrigger>
          <TabsTrigger value="staging" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Staging
          </TabsTrigger>
          <TabsTrigger value="treatment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Treatment
          </TabsTrigger>
          <TabsTrigger value="surveillance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Surveillance
          </TabsTrigger>
          <TabsTrigger value="calculators" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Calculators
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SCLCOverview />
        </TabsContent>
        
        <TabsContent value="diagnosis">
          <SCLCDiagnosis />
        </TabsContent>
        
        <TabsContent value="staging">
          <SCLCStagingTables />
        </TabsContent>
        
        <TabsContent value="treatment">
          <SCLCTreatmentProtocols />
        </TabsContent>
        
        <TabsContent value="surveillance">
          <SCLCSurveillance />
        </TabsContent>
        
        <TabsContent value="calculators">
          <SCLCCalculators />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const SCLCOverview = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-blue-600" />
          Small Cell Lung Cancer Overview
        </CardTitle>
        <CardDescription>NCCN Guidelines v4.2025 - Clinical Characteristics and Behavior</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Clinical Characteristics</h4>
              <ul className="text-sm space-y-1">
                <li>• Aggressive neuroendocrine carcinoma</li>
                <li>• Rapid doubling time and early metastasis</li>
                <li>• Strong association with smoking</li>
                <li>• Responds well to initial chemotherapy</li>
                <li>• High recurrence rate despite treatment</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Epidemiology</h4>
              <ul className="text-sm space-y-1">
                <li>• 10-15% of all lung cancers</li>
                <li>• Median age at diagnosis: 65 years</li>
                <li>• Strong male predominance</li>
                <li>• 95% associated with smoking history</li>
                <li>• 70% present with extensive stage disease</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Paraneoplastic Syndromes</h4>
              <ul className="text-sm space-y-1">
                <li>• SIADH (syndrome of inappropriate ADH)</li>
                <li>• Lambert-Eaton myasthenic syndrome</li>
                <li>• Cushing syndrome (ectopic ACTH)</li>
                <li>• Neurological paraneoplastic syndromes</li>
                <li>• Occur in 10-20% of patients</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Prognostic Factors</h4>
              <ul className="text-sm space-y-1">
                <li>• Performance status (most important)</li>
                <li>• Disease stage (limited vs extensive)</li>
                <li>• LDH level elevation</li>
                <li>• Weight loss at presentation</li>
                <li>• Age and comorbidities</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const SCLCDiagnosis = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-green-600" />
          SCLC Diagnostic Workup
        </CardTitle>
        <CardDescription>Initial Evaluation and Pathological Assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="initial-evaluation">
            <AccordionTrigger>Initial Evaluation (Category 1)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Essential Studies</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-1">
                      <li>• History and physical examination</li>
                      <li>• Pathology review with IHC</li>
                      <li>• Complete blood count (CBC)</li>
                      <li>• Comprehensive metabolic panel</li>
                      <li>• Liver function tests</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li>• CT chest/abdomen/pelvis with contrast</li>
                      <li>• Brain MRI (preferred) or CT with contrast</li>
                      <li>• FDG-PET/CT (skull base to mid-thigh)</li>
                      <li>• Pulmonary function tests (if surgery)</li>
                      <li>• Performance status assessment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="pathology">
            <AccordionTrigger>Pathological Features</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">Morphology</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Small cells with high nuclear/cytoplasmic ratio</li>
                      <li>• Fine granular chromatin</li>
                      <li>• Inconspicuous nucleoli</li>
                      <li>• Frequent mitoses and apoptosis</li>
                      <li>• Necrosis commonly present</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h5 className="font-medium text-sm mb-2">Immunohistochemistry</h5>
                    <ul className="text-xs space-y-1">
                      <li>• TTF-1 positive (80-90%)</li>
                      <li>• Synaptophysin positive</li>
                      <li>• Chromogranin A positive</li>
                      <li>• CD56 positive</li>
                      <li>• Ki-67 proliferation index &gt;80%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="molecular-profiling">
            <AccordionTrigger>Molecular Profiling (Category 2A)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Recommended For</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Extensive stage/relapsed SCLC patients</li>
                    <li>• Non-smokers or light smokers</li>
                    <li>• Patients with remote smoking history</li>
                    <li>• Diagnostic or therapeutic dilemma cases</li>
                    <li>• At time of relapse if not previously done</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
);

const SCLCStagingTables = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          SCLC Staging Systems
        </CardTitle>
        <CardDescription>AJCC TNM and VA Limited/Extensive Stage Classification</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="va-staging">
            <AccordionTrigger>VA Staging System (Limited vs Extensive)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Limited Stage</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Stage I-III (T any, N any, M0)</li>
                      <li>• Disease confined to one hemithorax</li>
                      <li>• Can be safely encompassed in radiation field</li>
                      <li>• Excludes malignant pleural effusion</li>
                      <li>• Approximately 30% of patients</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Extensive Stage</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Stage IV (T any, N any, M1a/b/c)</li>
                      <li>• Disease beyond one hemithorax</li>
                      <li>• Too extensive for radiation field</li>
                      <li>• Includes contralateral lung involvement</li>
                      <li>• Approximately 70% of patients</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tnm-staging">
            <AccordionTrigger>AJCC TNM Staging (8th Edition)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Stage</th>
                        <th className="text-left p-2 font-medium">T</th>
                        <th className="text-left p-2 font-medium">N</th>
                        <th className="text-left p-2 font-medium">M</th>
                        <th className="text-left p-2 font-medium">VA Stage</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr className="border-b">
                        <td className="p-2 font-medium">IA1</td>
                        <td className="p-2">T1a</td>
                        <td className="p-2">N0</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IA2</td>
                        <td className="p-2">T1b</td>
                        <td className="p-2">N0</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IA3</td>
                        <td className="p-2">T1c</td>
                        <td className="p-2">N0</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IB</td>
                        <td className="p-2">T2a</td>
                        <td className="p-2">N0</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IIA</td>
                        <td className="p-2">T2b</td>
                        <td className="p-2">N0</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IIIA</td>
                        <td className="p-2">T3</td>
                        <td className="p-2">N0-N2</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IIIB</td>
                        <td className="p-2">T1-T3</td>
                        <td className="p-2">N3</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IIIC</td>
                        <td className="p-2">T3-T4</td>
                        <td className="p-2">N3</td>
                        <td className="p-2">M0</td>
                        <td className="p-2 text-green-600">Limited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">IV</td>
                        <td className="p-2">Any T</td>
                        <td className="p-2">Any N</td>
                        <td className="p-2">M1</td>
                        <td className="p-2 text-red-600">Extensive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
);

const SCLCTreatmentProtocols = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-600" />
          SCLC Treatment Protocols
        </CardTitle>
        <CardDescription>Stage-Specific Treatment Recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="limited-stage">
            <AccordionTrigger>Limited Stage SCLC Treatment</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Standard Regimens (Category 1)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                        <h5 className="font-medium text-sm mb-2">Cisplatin + Etoposide (Preferred)</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Cisplatin 75 mg/m² day 1</li>
                          <li>• Etoposide 100 mg/m² days 1-3</li>
                          <li>• Every 21 days × 4 cycles</li>
                          <li>• Concurrent thoracic RT</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                        <h5 className="font-medium text-sm mb-2">Alternative Cisplatin Dosing</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Cisplatin 60 mg/m² day 1</li>
                          <li>• Etoposide 120 mg/m² days 1-3</li>
                          <li>• Every 21 days × 4 cycles</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                        <h5 className="font-medium text-sm mb-2">Carboplatin + Etoposide</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Carboplatin AUC 5-6 day 1</li>
                          <li>• Etoposide 100 mg/m² days 1-3</li>
                          <li>• Every 21 days × 4 cycles</li>
                          <li>• Concurrent thoracic RT</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                        <h5 className="font-medium text-sm mb-2">Durvalumab Consolidation</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Durvalumab 1500 mg day 1</li>
                          <li>• Every 28 days × 24 months</li>
                          <li>• After chemo-RT completion</li>
                          <li>• If no disease progression</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="extensive-stage">
            <AccordionTrigger>Extensive Stage SCLC Treatment</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">First-Line Immunotherapy Combinations (Category 1)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                        <h5 className="font-medium text-sm mb-2">Carboplatin + Etoposide + Atezolizumab</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Carboplatin AUC 5 day 1</li>
                          <li>• Etoposide 100 mg/m² days 1-3</li>
                          <li>• Atezolizumab 1200 mg day 1</li>
                          <li>• Every 21 days × 4 cycles</li>
                          <li>• Then atezolizumab maintenance</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                        <h5 className="font-medium text-sm mb-2">Carboplatin + Etoposide + Durvalumab</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Carboplatin AUC 5-6 day 1</li>
                          <li>• Etoposide 80-100 mg/m² days 1-3</li>
                          <li>• Durvalumab 1500 mg day 1</li>
                          <li>• Every 21 days × 4 cycles</li>
                          <li>• Then durvalumab maintenance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="second-line">
            <AccordionTrigger>Second-Line and Subsequent Therapy</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Subsequent Therapy Options (Category 2A)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                      <h5 className="font-medium text-sm mb-2">Lurbinectedin</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Preferred for CTFI ≤6 months</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                      <h5 className="font-medium text-sm mb-2">Topotecan</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Oral or IV administration</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-900 rounded border">
                      <h5 className="font-medium text-sm mb-2">Tarlatamab-dlle</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">DLL3-targeted therapy</p>
                    </div>
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

const SCLCSurveillance = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-indigo-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          SCLC Surveillance Protocols
        </CardTitle>
        <CardDescription>Follow-up Schedules and Monitoring Guidelines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Limited Stage Surveillance</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Years 1-2:</strong> Every 3 months</li>
                <li>• <strong>Year 3:</strong> Every 6 months</li>
                <li>• <strong>Years 4+:</strong> Annually</li>
                <li>• Brain MRI every 3-4 months (year 1)</li>
                <li>• Then every 6 months (year 2+)</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Imaging Schedule</h4>
              <ul className="text-sm space-y-1">
                <li>• CT chest/abdomen/pelvis as clinically indicated</li>
                <li>• Brain MRI (preferred) or CT with contrast</li>
                <li>• PET/CT not recommended for routine follow-up</li>
                <li>• New pulmonary nodule requires workup</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Extensive Stage Surveillance</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Year 1:</strong> Every 2 months</li>
                <li>• <strong>Years 2-3:</strong> Every 3-4 months</li>
                <li>• <strong>Years 4-5:</strong> Every 6 months</li>
                <li>• <strong>Years 5+:</strong> Annually</li>
                <li>• More frequent monitoring due to higher recurrence risk</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Survivorship Care</h4>
              <ul className="text-sm space-y-1">
                <li>• Smoking cessation intervention</li>
                <li>• Survivorship care plan provided</li>
                <li>• Pulmonary rehabilitation if indicated</li>
                <li>• Psychological support services</li>
                <li>• Second primary cancer screening</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const SCLCCalculators = () => {
  const [carboAUC, setCarboAUC] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [carboResult, setCarboResult] = useState("");

  const calculateCarboplatin = () => {
    if (!carboAUC || !creatinine || !age || !weight || !sex) return;
    
    // Calvert formula: Dose = AUC × (GFR + 25)
    // Cockcroft-Gault: CrCl = ((140-age) × weight × (0.85 if female)) / (72 × creatinine)
    const sexMultiplier = sex === "female" ? 0.85 : 1.0;
    const crCl = ((140 - parseInt(age)) * parseInt(weight) * sexMultiplier) / (72 * parseFloat(creatinine));
    const dose = parseFloat(carboAUC) * (crCl + 25);
    
    setCarboResult(`${Math.round(dose)}mg (CrCl: ${Math.round(crCl)} mL/min)`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            SCLC Dosing Calculators
          </CardTitle>
          <CardDescription>Carboplatin AUC Calculator (Calvert Formula)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Target AUC</label>
                  <Select value={carboAUC} onValueChange={setCarboAUC}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AUC" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">AUC 5</SelectItem>
                      <SelectItem value="6">AUC 6</SelectItem>
                      <SelectItem value="5.5">AUC 5.5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Age (years)</label>
                  <Input 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="65"
                    type="number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Sex</label>
                  <Select value={sex} onValueChange={setSex}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Serum Creatinine (mg/dL)</label>
                <Input 
                  value={creatinine}
                  onChange={(e) => setCreatinine(e.target.value)}
                  placeholder="1.0"
                  type="number"
                  step="0.1"
                />
              </div>
              <Button onClick={calculateCarboplatin} className="w-full">
                Calculate Carboplatin Dose
              </Button>
              {carboResult && (
                <Alert className="bg-green-50 border-green-200">
                  <Calculator className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Carboplatin Dose: {carboResult}</strong><br/>
                    Formula: AUC × (CrCl + 25)
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Dosing Guidelines</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Standard AUC:</strong> 5-6 for combination therapy</li>
                  <li>• <strong>Elderly patients (&gt;70):</strong> Consider AUC 5</li>
                  <li>• <strong>Prior treatment:</strong> May require dose reduction</li>
                  <li>• <strong>Performance status:</strong> Factor in overall condition</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Safety Considerations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Monitor for thrombocytopenia</li>
                  <li>• Check CBC before each cycle</li>
                  <li>• Dose reduction for grade 3-4 toxicity</li>
                  <li>• Consider G-CSF support if indicated</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};