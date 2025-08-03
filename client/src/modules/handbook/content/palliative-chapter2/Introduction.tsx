import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Thermometer, Activity, Brain } from "lucide-react";

export default function SymptomManagementIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 2: Symptom Management
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comprehensive Palliative Symptom Control
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">WHO Guidelines</Badge>
          <Badge variant="secondary">NCCN Palliative</Badge>
          <Badge variant="secondary">Evidence-Based</Badge>
        </div>
      </div>

      <Card className="border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            Symptom Management Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Effective symptom management is fundamental to palliative care, focusing on 
            improving quality of life through comprehensive assessment and multimodal 
            interventions. This chapter provides evidence-based approaches to managing 
            the most common symptoms in palliative care.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Core Symptoms
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">Pain</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Acute, chronic, breakthrough pain management</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium text-sm">Dyspnea</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Breathlessness and respiratory distress</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium text-sm">Nausea & Vomiting</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Antiemetic strategies and pathways</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div>
                    <div className="font-medium text-sm">Delirium</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Confusion and agitation management</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Assessment Framework
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Comprehensive History:</strong> Onset, duration, quality, severity</li>
                <li>• <strong>Physical Examination:</strong> Focused symptom-specific assessment</li>
                <li>• <strong>Validated Tools:</strong> Numeric rating scales, ESAS-R</li>
                <li>• <strong>Functional Impact:</strong> Activities of daily living assessment</li>
                <li>• <strong>Psychosocial Factors:</strong> Anxiety, depression, spiritual distress</li>
                <li>• <strong>Regular Reassessment:</strong> Response to interventions</li>
                <li>• <strong>Family Perspective:</strong> Caregiver observations and concerns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <Brain className="h-5 w-5" />
              Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Systematic assessment</li>
              <li>• Multimodal interventions</li>
              <li>• Patient-centered goals</li>
              <li>• Interdisciplinary team</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Interventions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Pharmacological</li>
              <li>• Non-pharmacological</li>
              <li>• Procedural options</li>
              <li>• Complementary therapies</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Regular reassessment</li>
              <li>• Functional outcomes</li>
              <li>• Quality of life measures</li>
              <li>• Adverse effects</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}