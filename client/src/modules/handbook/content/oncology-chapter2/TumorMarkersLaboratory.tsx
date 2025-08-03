import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestTube, TrendingUp, AlertCircle, Target } from "lucide-react";

export default function TumorMarkersLaboratory() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          2.3 Tumor Markers and Laboratory Tests
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Biomarkers in Cancer Diagnosis and Monitoring
        </p>
      </div>

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-green-600 dark:text-green-400" />
            Common Tumor Markers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Serum Tumor Markers</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">PSA (Prostate-Specific Antigen)</span>
                    <Badge variant="secondary">Prostate</Badge>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Normal: &lt;4.0 ng/mL (age-adjusted)</li>
                    <li>• Screening and monitoring prostate cancer</li>
                    <li>• Elevated: Prostate cancer, BPH, prostatitis</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">CEA (Carcinoembryonic Antigen)</span>
                    <Badge variant="secondary">Colorectal</Badge>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Normal: &lt;3.0 ng/mL (non-smokers)</li>
                    <li>• Monitoring colorectal cancer recurrence</li>
                    <li>• Not recommended for screening</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">CA 19-9</span>
                    <Badge variant="secondary">Pancreatic</Badge>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Normal: &lt;37 U/mL</li>
                    <li>• Pancreatic adenocarcinoma monitoring</li>
                    <li>• Elevated in cholangiocarcinoma, gastric cancer</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Specialized Markers</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">AFP (Alpha-fetoprotein)</span>
                    <Badge variant="secondary">Hepatocellular</Badge>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Normal: &lt;10 ng/mL</li>
                    <li>• Hepatocellular carcinoma, germ cell tumors</li>
                    <li>• Elevated in liver disease, pregnancy</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">CA 125</span>
                    <Badge variant="secondary">Ovarian</Badge>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Normal: &lt;35 U/mL</li>
                    <li>• Ovarian cancer monitoring</li>
                    <li>• Elevated: Endometriosis, fibroids</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Beta-hCG</span>
                    <Badge variant="secondary">Germ Cell</Badge>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Normal: &lt;5 mIU/mL (non-pregnant)</li>
                    <li>• Testicular, ovarian germ cell tumors</li>
                    <li>• Choriocarcinoma monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Laboratory Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Baseline Laboratory Studies</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Complete Blood Count:</strong> Cytopenias, blast cells</li>
                <li>• <strong>Comprehensive Metabolic Panel:</strong> Renal, hepatic function</li>
                <li>• <strong>Liver Function Tests:</strong> Hepatic metastases</li>
                <li>• <strong>Lactate Dehydrogenase:</strong> Tumor burden marker</li>
                <li>• <strong>Uric Acid:</strong> Tumor lysis syndrome risk</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Coagulation Studies</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• PT/INR and aPTT: Baseline coagulopathy</li>
                <li>• D-dimer: Thromboembolic risk</li>
                <li>• Fibrinogen: DIC evaluation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              Marker Limitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Clinical Considerations</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>False Positives:</strong> Benign conditions, medications</li>
                <li>• <strong>False Negatives:</strong> Early disease, non-secreting tumors</li>
                <li>• <strong>Half-life Considerations:</strong> Treatment response timing</li>
                <li>• <strong>Reference Range Variations:</strong> Laboratory-specific values</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Appropriate Use</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Monitoring known malignancy</li>
                <li>• Assessing treatment response</li>
                <li>• Detecting recurrence</li>
                <li>• Generally not for screening asymptomatic patients</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}