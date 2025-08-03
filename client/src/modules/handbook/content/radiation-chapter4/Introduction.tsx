import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, Users, TrendingUp } from "lucide-react";

export default function ClinicalRadiationOncologyIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 4: Clinical Radiation Oncology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Clinical Application and Patient Management
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">Clinical Practice</Badge>
          <Badge variant="secondary">Toxicity Management</Badge>
          <Badge variant="secondary">Multidisciplinary</Badge>
        </div>
      </div>

      <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Clinical Practice Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Clinical radiation oncology integrates technical expertise with comprehensive 
            patient care, emphasizing treatment intent, toxicity management, and 
            multidisciplinary collaboration to optimize therapeutic outcomes.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Treatment Intent
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Curative Intent
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 ml-5 space-y-1">
                    <li>• Definitive radiation therapy</li>
                    <li>• Adjuvant treatment</li>
                    <li>• Neoadjuvant therapy</li>
                    <li>• Boost techniques</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Palliative Intent
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 ml-5 space-y-1">
                    <li>• Symptom relief</li>
                    <li>• Pain management</li>
                    <li>• Bleeding control</li>
                    <li>• Airway obstruction</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Toxicity Management
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Acute Toxicities:</strong> During and immediately after treatment</li>
                <li>• <strong>Late Effects:</strong> Months to years post-treatment</li>
                <li>• <strong>CTCAE Grading:</strong> Standardized toxicity assessment</li>
                <li>• <strong>Dose Constraints:</strong> Normal tissue tolerance limits</li>
                <li>• <strong>Supportive Care:</strong> Symptom management protocols</li>
                <li>• <strong>Quality of Life:</strong> Functional outcome optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Fractionation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Conventional fractionation</li>
              <li>• Hypofractionation</li>
              <li>• Hyperfractionation</li>
              <li>• Accelerated schedules</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Surgery coordination</li>
              <li>• Chemotherapy sequencing</li>
              <li>• Immunotherapy timing</li>
              <li>• Supportive care</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Local control rates</li>
              <li>• Survival endpoints</li>
              <li>• Toxicity profiles</li>
              <li>• Quality of life</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}