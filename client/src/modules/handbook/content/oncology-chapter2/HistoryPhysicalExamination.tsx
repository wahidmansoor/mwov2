import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, User, Clock, AlertTriangle } from "lucide-react";

export default function HistoryPhysicalExamination() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          2.1 History and Physical Examination
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Systematic Approach to Clinical Assessment
        </p>
      </div>

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-green-600 dark:text-green-400" />
            Clinical Assessment Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <User className="h-4 w-4" />
                History Taking Components
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Chief Complaint:</strong> Primary symptoms and duration</li>
                <li>• <strong>Present Illness:</strong> Detailed symptom characterization</li>
                <li>• <strong>Past Medical History:</strong> Previous cancers, treatments</li>
                <li>• <strong>Family History:</strong> Hereditary cancer syndromes</li>
                <li>• <strong>Social History:</strong> Tobacco, alcohol, occupational exposures</li>
                <li>• <strong>Medications:</strong> Current and recent treatments</li>
                <li>• <strong>Review of Systems:</strong> Constitutional symptoms</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Physical Examination
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>General Appearance:</strong> Performance status, cachexia</li>
                <li>• <strong>Vital Signs:</strong> Weight loss, fever patterns</li>
                <li>• <strong>Lymph Nodes:</strong> Comprehensive nodal examination</li>
                <li>• <strong>Primary Site:</strong> Focused examination of suspected primary</li>
                <li>• <strong>Abdomen:</strong> Hepatosplenomegaly, masses</li>
                <li>• <strong>Neurologic:</strong> Focal deficits, paraneoplastic signs</li>
                <li>• <strong>Skin:</strong> Metastatic deposits, paraneoplastic dermatoses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Red Flag Symptoms Requiring Urgent Evaluation
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Unexplained weight loss &gt;10% in 6 months</li>
              <li>• New neurological symptoms</li>
              <li>• Persistent pain without obvious cause</li>
              <li>• Changes in bowel or bladder habits</li>
              <li>• Persistent cough or hoarseness</li>
              <li>• Unusual bleeding or discharge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}