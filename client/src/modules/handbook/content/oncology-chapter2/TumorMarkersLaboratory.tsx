import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TestTube, TrendingUp, Target, AlertCircle, CheckCircle, BarChart3 } from "lucide-react";

export default function TumorMarkersLaboratory() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-green-600" />
            2.4 Tumor Markers and Laboratory Studies
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Serum Markers</Badge>
            <Badge variant="outline">Tissue Markers</Badge>
            <Badge variant="outline">Liquid Biopsy</Badge>
            <Badge variant="outline">Monitoring</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Tumor markers are substances produced by cancer cells or by the body in response to cancer. While most are not specific enough for cancer screening, they play crucial roles in diagnosis, prognosis, treatment monitoring, and surveillance for recurrence.
          </p>
          
          <p className="text-sm leading-relaxed">
            Laboratory studies provide essential information about organ function, treatment toxicity, and disease status. Understanding the appropriate use and limitations of tumor markers is critical for effective clinical decision-making.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-600" />
              Serum Tumor Markers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">CEA (Carcinoembryonic Antigen)</h4>
                  <Badge variant="secondary" className="text-xs">Colorectal</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Normal: &lt;5 ng/mL (non-smokers), &lt;10 ng/mL (smokers)
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Monitoring colorectal cancer treatment response</li>
                  <li>• Surveillance for recurrence</li>
                  <li>• Also elevated in gastric, pancreatic, lung cancers</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">CA 19-9</h4>
                  <Badge variant="secondary" className="text-xs">Pancreatic</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Normal: &lt;37 U/mL
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Pancreatic adenocarcinoma monitoring</li>
                  <li>• Biliary tract cancers</li>
                  <li>• Not useful in Lewis antigen-negative patients (7%)</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">CA 125</h4>
                  <Badge variant="secondary" className="text-xs">Ovarian</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Normal: &lt;35 U/mL
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Ovarian cancer monitoring</li>
                  <li>• Elevated in benign conditions</li>
                  <li>• Peritoneal and fallopian tube cancers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Specialized Markers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">PSA (Prostate-Specific Antigen)</h4>
                  <Badge variant="secondary" className="text-xs">Prostate</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Normal: &lt;4 ng/mL (age-dependent)
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Prostate cancer screening and monitoring</li>
                  <li>• Free PSA ratio improves specificity</li>
                  <li>• PSA velocity and doubling time</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">AFP (Alpha-Fetoprotein)</h4>
                  <Badge variant="secondary" className="text-xs">Hepatocellular</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Normal: &lt;10 ng/mL
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Hepatocellular carcinoma</li>
                  <li>• Germ cell tumors (testicular)</li>
                  <li>• Monitoring treatment response</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">β-hCG (Human Chorionic Gonadotropin)</h4>
                  <Badge variant="secondary" className="text-xs">Germ Cell</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Normal: &lt;2 mIU/mL (males), &lt;5 mIU/mL (non-pregnant females)
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Testicular and ovarian germ cell tumors</li>
                  <li>• Gestational trophoblastic disease</li>
                  <li>• Essential for risk stratification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Liquid Biopsy and Circulating Biomarkers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Liquid biopsy represents a paradigm shift in cancer diagnostics, allowing detection of circulating tumor DNA (ctDNA), circulating tumor cells (CTCs), and other biomarkers from blood samples.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Circulating Tumor DNA
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Mutation detection and monitoring</li>
                <li>• Minimal residual disease assessment</li>
                <li>• Resistance mutation identification</li>
                <li>• Real-time tumor evolution tracking</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Circulating Tumor Cells
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Prognostic biomarker</li>
                <li>• Treatment response monitoring</li>
                <li>• Metastatic potential assessment</li>
                <li>• Single-cell analysis capabilities</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Exosomal RNA
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• MicroRNA profiling</li>
                <li>• Protein expression analysis</li>
                <li>• Immune system communication</li>
                <li>• Drug resistance mechanisms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Clinical Interpretation Guidelines:</strong> Tumor markers should never be used in isolation for diagnosis. Interpretation must consider clinical context, baseline values, rate of change, and half-life characteristics. False positives can occur with benign conditions, inflammation, and organ dysfunction.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Clinical Applications and Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Monitoring Principles</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Baseline Establishment</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Obtain pre-treatment levels for all relevant markers to establish individual baseline values
                  </p>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Response Assessment</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Serial measurements every 2-3 cycles during treatment to assess response trends
                  </p>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Surveillance</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Regular monitoring during follow-up for early detection of recurrence
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Laboratory Considerations</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Sample Handling:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Proper collection, storage, and processing protocols</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Assay Standardization:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Use same laboratory and method for serial measurements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Clinical Correlation:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Always interpret results in context of clinical and imaging findings</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Trend Analysis:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Focus on patterns and kinetics rather than single values</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Future Directions</h4>
        <p className="text-sm text-green-700 dark:text-green-300">
          Emerging technologies including multiomics approaches, artificial intelligence-enhanced interpretation, 
          and ultra-sensitive detection methods are expanding the clinical utility of tumor markers. Integration 
          with imaging and clinical data through machine learning algorithms promises to improve diagnostic accuracy 
          and treatment personalization.
        </p>
      </div>
    </div>
  );
}