import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Brain, Activity, Target, Users, ArrowRight, Stethoscope } from "lucide-react";

export default function OrganSystemOncology() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-indigo-600" />
            Chapter 3: Organ System Oncology
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Site-Specific</Badge>
            <Badge variant="outline">Multidisciplinary</Badge>
            <Badge variant="outline">Treatment Algorithms</Badge>
            <Badge variant="outline">NCCN Guidelines</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Organ system oncology represents the clinical application of cancer medicine organized by anatomical site and tumor origin. Each organ system presents unique challenges in terms of biology, staging, treatment approaches, and multidisciplinary care coordination.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter provides systematic coverage of major cancer types, emphasizing evidence-based treatment algorithms, site-specific considerations, and integration of surgical, medical, and radiation oncology approaches according to current NCCN and international guidelines.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-600" />
              Thoracic Malignancies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Non-Small Cell Lung Cancer (NSCLC)</h4>
                  <Badge variant="secondary" className="text-xs">85% of lung cancers</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Histology:</strong> Adenocarcinoma (40%), squamous cell (25%), large cell (10%)</li>
                  <li>• <strong>Molecular Testing:</strong> EGFR, ALK, ROS1, BRAF, PD-L1, KRAS G12C</li>
                  <li>• <strong>Staging:</strong> TNM 8th edition, mediastinal evaluation critical</li>
                  <li>• <strong>Treatment:</strong> Surgery, stereotactic radiotherapy, targeted therapy, immunotherapy</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Small Cell Lung Cancer (SCLC)</h4>
                  <Badge variant="secondary" className="text-xs">15% of lung cancers</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Characteristics:</strong> Rapid growth, early metastasis, chemosensitive</li>
                  <li>• <strong>Staging:</strong> Limited vs extensive stage classification</li>
                  <li>• <strong>Treatment:</strong> Platinum-etoposide chemotherapy, concurrent radiation</li>
                  <li>• <strong>Immunotherapy:</strong> Atezolizumab + chemotherapy for extensive stage</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Mesothelioma</h4>
                  <Badge variant="secondary" className="text-xs">Asbestos-related</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Subtypes:</strong> Epithelioid (best prognosis), sarcomatoid, biphasic</li>
                  <li>• <strong>Diagnosis:</strong> Pleural biopsy, immunohistochemistry essential</li>
                  <li>• <strong>Treatment:</strong> Trimodal therapy, pemetrexed-platinum, immunotherapy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-blue-600" />
              Gastrointestinal Cancers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Colorectal Cancer</h4>
                  <Badge variant="secondary" className="text-xs">3rd most common</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Molecular Testing:</strong> MSI/MMR, KRAS/NRAS/BRAF, HER2</li>
                  <li>• <strong>Staging:</strong> TNM, CEA levels, multiphase CT imaging</li>
                  <li>• <strong>Treatment:</strong> Surgery, FOLFOX/FOLFIRI, targeted agents</li>
                  <li>• <strong>Immunotherapy:</strong> Pembrolizumab for MSI-high tumors</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Pancreatic Adenocarcinoma</h4>
                  <Badge variant="secondary" className="text-xs">Poor prognosis</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Diagnosis:</strong> CT pancreas protocol, CA 19-9, tissue confirmation</li>
                  <li>• <strong>Resectability:</strong> Resectable, borderline, locally advanced, metastatic</li>
                  <li>• <strong>Treatment:</strong> Whipple procedure, FOLFIRINOX, gemcitabine-based therapy</li>
                  <li>• <strong>Targeted Therapy:</strong> PARP inhibitors for BRCA mutations</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Hepatocellular Carcinoma</h4>
                  <Badge variant="secondary" className="text-xs">Cirrhosis-related</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Risk Factors:</strong> Hepatitis B/C, alcohol, NAFLD, aflatoxin</li>
                  <li>• <strong>Staging:</strong> Barcelona Clinic Liver Cancer (BCLC) system</li>
                  <li>• <strong>Treatment:</strong> Resection, transplant, ablation, sorafenib</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Hematologic Malignancies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Blood cancers represent a diverse group of malignancies arising from hematopoietic and lymphoid tissues, requiring specialized diagnostic approaches and treatment strategies.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Acute Leukemias
              </h4>
              <div className="space-y-2">
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <div className="font-medium text-xs">Acute Lymphoblastic Leukemia (ALL)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">B-cell and T-cell subtypes, cytogenetics crucial</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <div className="font-medium text-xs">Acute Myeloid Leukemia (AML)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">WHO classification, molecular mutations</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Lymphomas
              </h4>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Hodgkin Lymphoma</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Reed-Sternberg cells, excellent cure rates</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Non-Hodgkin Lymphoma</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Indolent vs aggressive subtypes</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Plasma Cell Disorders
              </h4>
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Multiple Myeloma</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">CRAB criteria, novel agents</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">MGUS</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Monoclonal gammopathy surveillance</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>Multidisciplinary Care Coordination:</strong> Effective organ system oncology requires seamless integration of surgical, medical, radiation oncology, pathology, radiology, and supportive care services. Tumor boards provide essential forums for case discussion and treatment planning optimization.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-green-600" />
            Treatment Algorithm Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Initial Assessment Components</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-500" />
                    Clinical Evaluation
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Performance status assessment (ECOG/Karnofsky)</li>
                    <li>• Comorbidity evaluation and organ function</li>
                    <li>• Social support and treatment goals discussion</li>
                    <li>• Baseline symptom and quality of life assessment</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    Staging Workup
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Site-appropriate imaging studies</li>
                    <li>• Tissue acquisition and pathologic confirmation</li>
                    <li>• Molecular and genetic testing</li>
                    <li>• Multidisciplinary staging consensus</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Treatment Planning Process</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Evidence-Based Guidelines</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• NCCN Clinical Practice Guidelines integration</li>
                    <li>• ASCO, ESMO international consensus</li>
                    <li>• Clinical trial availability assessment</li>
                    <li>• Institution-specific protocols and pathways</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Individualized Approach</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Patient preference incorporation</li>
                    <li>• Risk-benefit analysis and shared decision making</li>
                    <li>• Toxicity mitigation strategies</li>
                    <li>• Support service integration and coordination</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
        <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Precision Medicine Integration</h4>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          Modern organ system oncology increasingly incorporates precision medicine approaches, utilizing 
          comprehensive genomic profiling, liquid biopsies, and artificial intelligence-assisted decision 
          support tools. Integration of real-world evidence and patient-reported outcomes enhances 
          treatment personalization and quality of care measurement.
        </p>
      </div>
    </div>
  );
}