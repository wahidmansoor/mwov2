import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pill, Target, Shield, Zap, Activity, AlertTriangle } from "lucide-react";

export default function SystemicTherapiesOverview() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-blue-600" />
            2.1 Systemic Therapies in Oncology
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Chemotherapy</Badge>
            <Badge variant="outline">Targeted Therapy</Badge>
            <Badge variant="outline">Immunotherapy</Badge>
            <Badge variant="outline">Hormonal Therapy</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Systemic therapies represent the cornerstone of medical oncology, encompassing chemotherapy, targeted therapies, immunotherapy, and hormonal treatments. These approaches treat cancer throughout the body, making them essential for metastatic disease and as adjuvant or neoadjuvant treatments.
          </p>
          
          <p className="text-sm leading-relaxed">
            The selection of systemic therapy depends on multiple factors including tumor type, stage, molecular characteristics, patient performance status, comorbidities, and previous treatments. Modern precision medicine approaches increasingly rely on biomarker-driven therapy selection.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-purple-600" />
              Cytotoxic Chemotherapy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">
              Traditional chemotherapy agents work by interfering with cell division, primarily targeting rapidly dividing cells. Categories include alkylating agents, antimetabolites, topoisomerase inhibitors, and mitotic inhibitors.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Alkylating Agents:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Cisplatin, Carboplatin, Cyclophosphamide</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Antimetabolites:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">5-FU, Gemcitabine, Methotrexate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Taxanes:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Paclitaxel, Docetaxel, Nab-paclitaxel</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-green-600" />
              Targeted Therapies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">
              Targeted therapies specifically inhibit molecular pathways critical for cancer cell survival and proliferation. These agents often require companion diagnostics to identify patients most likely to benefit.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Tyrosine Kinase Inhibitors:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Imatinib, Erlotinib, Sunitinib</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Monoclonal Antibodies:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Trastuzumab, Bevacizumab, Cetuximab</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">CDK4/6 Inhibitors:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Palbociclib, Ribociclib, Abemaciclib</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            Immunotherapy Approaches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Immunotherapy harnesses the body's immune system to fight cancer. Checkpoint inhibitors have revolutionized treatment for many cancer types, while CAR-T cell therapy offers promising results in hematologic malignancies.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Checkpoint Inhibitors</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• PD-1/PD-L1 inhibitors (Pembrolizumab, Nivolumab)</li>
                <li>• CTLA-4 inhibitors (Ipilimumab)</li>
                <li>• Combination approaches</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Adoptive Cell Therapy</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• CAR-T cell therapy</li>
                <li>• Tumor-infiltrating lymphocytes</li>
                <li>• NK cell therapy</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Cancer Vaccines</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Sipuleucel-T (prostate cancer)</li>
                <li>• Neoantigen vaccines</li>
                <li>• Viral vector vaccines</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Biomarker Testing:</strong> Contemporary oncology practice requires systematic biomarker testing to guide therapy selection. Key biomarkers include microsatellite instability (MSI), tumor mutational burden (TMB), PD-L1 expression, HER2 amplification, EGFR mutations, ALK rearrangements, and BRCA mutations, among others.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Treatment Planning Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Patient Factors</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Performance status (ECOG/Karnofsky)</li>
                <li>• Organ function (hepatic, renal, cardiac)</li>
                <li>• Comorbidities and contraindications</li>
                <li>• Previous treatment exposure</li>
                <li>• Patient preferences and goals</li>
                <li>• Quality of life considerations</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Tumor Factors</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Histologic type and grade</li>
                <li>• Stage and disease burden</li>
                <li>• Molecular characteristics</li>
                <li>• Rate of disease progression</li>
                <li>• Sites of metastatic disease</li>
                <li>• Treatment resistance patterns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Clinical Practice Integration</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Successful systemic therapy requires multidisciplinary coordination, careful patient selection, 
          appropriate supportive care, systematic toxicity monitoring, and timely assessment of treatment 
          response. Integration with surgery and radiation therapy is often necessary for optimal outcomes.
        </p>
      </div>
    </div>
  );
}