import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Zap, Activity, Eye } from "lucide-react";

export default function DiagnosticImaging() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          2.2 Diagnostic Imaging
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Imaging Modalities in Cancer Diagnosis and Staging
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              CT and MRI Imaging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Computed Tomography (CT)</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Excellent for chest, abdomen, pelvis evaluation</li>
                <li>• Rapid acquisition, widely available</li>
                <li>• Contrast enhancement for vascular assessment</li>
                <li>• Portal venous phase for liver metastases</li>
                <li>• IV contrast contraindications: renal impairment</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Magnetic Resonance Imaging (MRI)</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Superior soft tissue contrast resolution</li>
                <li>• No ionizing radiation exposure</li>
                <li>• Brain and spinal cord imaging gold standard</li>
                <li>• Liver lesion characterization with hepatocyte-specific agents</li>
                <li>• Contraindications: certain implants, claustrophobia</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              PET and Functional Imaging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">PET/CT Imaging</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• 18F-FDG uptake in metabolically active tumors</li>
                <li>• Whole-body staging in single examination</li>
                <li>• Detection of occult metastases</li>
                <li>• Treatment response assessment</li>
                <li>• False positives: infection, inflammation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Specialized PET Tracers</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• 68Ga-DOTATATE: Neuroendocrine tumors</li>
                <li>• 18F-Fluciclovine: Prostate cancer recurrence</li>
                <li>• 18F-FET: Brain tumor imaging</li>
                <li>• 68Ga-PSMA: Prostate-specific membrane antigen</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Imaging Selection Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-center">Primary Diagnosis</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• CT chest/abdomen/pelvis: Most solid tumors</li>
                <li>• MRI brain: CNS symptoms</li>
                <li>• MRI pelvis: Gynecologic, rectal cancers</li>
                <li>• Mammography: Breast masses</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-center">Staging Workup</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• PET/CT: Lymphoma, lung cancer, melanoma</li>
                <li>• Bone scan: Prostate, breast cancer</li>
                <li>• MRI liver: Colorectal liver metastases</li>
                <li>• Echocardiogram: Cardiotoxic therapy planned</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-center">Response Assessment</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• RECIST 1.1 criteria: Solid tumors</li>
                <li>• Lugano criteria: Lymphomas</li>
                <li>• iRECIST: Immunotherapy responses</li>
                <li>• Tumor markers: Serial monitoring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}