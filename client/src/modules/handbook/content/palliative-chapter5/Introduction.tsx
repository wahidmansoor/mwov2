import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Airplay, Brain } from "lucide-react";

export default function DiseaseSpecificPalliativeIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 5: Disease-Specific Palliative Approaches
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tailored Palliative Care for Different Conditions
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">Disease-Specific</Badge>
          <Badge variant="secondary">Symptom Patterns</Badge>
          <Badge variant="secondary">Trajectory-Based Care</Badge>
        </div>
      </div>

      <Card className="border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Disease-Specific Palliative Care
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Different diseases present unique patterns of symptoms, prognosis, and care 
            needs. This chapter provides disease-specific approaches to palliative care, 
            addressing the particular challenges and opportunities for symptom management 
            and quality of life improvement across various conditions.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Major Disease Categories
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">Cancer</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Pain, symptom burden, oncology integration</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="font-medium text-sm">Heart Failure</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Dyspnea, fatigue, device considerations</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Airplay className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Chronic Lung Disease</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">COPD, ILD, respiratory distress</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Neurologic Disorders</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ALS, stroke, Parkinson's, dementia</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Care Considerations</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Disease Trajectory:</strong> Predictable vs. unpredictable decline</li>
                <li>• <strong>Symptom Patterns:</strong> Disease-specific symptom clusters</li>
                <li>• <strong>Prognostic Indicators:</strong> Disease-specific markers</li>
                <li>• <strong>Treatment Integration:</strong> Disease-modifying therapy coordination</li>
                <li>• <strong>Specialty Collaboration:</strong> Disease-specific expert involvement</li>
                <li>• <strong>Timing of Referral:</strong> Optimal integration points</li>
                <li>• <strong>Family Education:</strong> Disease-specific information needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Renal Disease</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Chronic kidney disease</li>
              <li>• Dialysis decisions</li>
              <li>• Conservative management</li>
              <li>• Uremic symptoms</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Liver Disease</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• End-stage liver disease</li>
              <li>• Ascites management</li>
              <li>• Hepatic encephalopathy</li>
              <li>• Transplant considerations</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Infectious Disease</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Advanced HIV/AIDS</li>
              <li>• Opportunistic infections</li>
              <li>• Antiretroviral considerations</li>
              <li>• Stigma and social issues</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Geriatric Syndromes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Frailty syndrome</li>
              <li>• Multimorbidity</li>
              <li>• Polypharmacy</li>
              <li>• Functional decline</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}