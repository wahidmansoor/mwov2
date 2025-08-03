import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Microscope, Target, AlertTriangle, CheckCircle } from "lucide-react";

export default function BiopsyHistopathology() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          2.4 Biopsy and Histopathology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tissue Acquisition and Pathological Diagnosis
        </p>
      </div>

      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
            Biopsy Techniques and Indications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Tissue Acquisition Methods</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    Core Needle Biopsy
                    <Badge variant="secondary">14-18G</Badge>
                  </h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Image-guided (US, CT, MRI)</li>
                    <li>• Adequate tissue for histologic diagnosis</li>
                    <li>• Allows for immunohistochemistry</li>
                    <li>• Minimal complications</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2">Fine Needle Aspiration (FNA)</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Cytologic evaluation only</li>
                    <li>• Limited architectural information</li>
                    <li>• Useful for lymph nodes, thyroid</li>
                    <li>• Quick, minimally invasive</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2">Surgical Biopsy</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Incisional vs. excisional</li>
                    <li>• When needle biopsy inadequate</li>
                    <li>• Lymphoma diagnosis</li>
                    <li>• Planning surgical margins</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Pathological Analysis</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2">Histologic Examination</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• H&amp;E staining for basic morphology</li>
                    <li>• Grade and differentiation</li>
                    <li>• Vascular and perineural invasion</li>
                    <li>• Margin assessment</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2">Immunohistochemistry</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Tumor origin determination</li>
                    <li>• Prognostic markers (ER, PR, HER2)</li>
                    <li>• Predictive biomarkers</li>
                    <li>• Lineage-specific markers</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2">Molecular Testing</h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Next-generation sequencing</li>
                    <li>• FISH for gene rearrangements</li>
                    <li>• Microsatellite instability</li>
                    <li>• Tumor mutational burden</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
              Critical Considerations for Tissue Handling
            </h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Adequate sample size for diagnosis and biomarker testing</li>
              <li>• Proper fixation in 10% neutral buffered formalin</li>
              <li>• Fresh tissue for molecular studies when indicated</li>
              <li>• Communication with pathologist regarding clinical suspicion</li>
              <li>• Multidisciplinary discussion for challenging cases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}