import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, AlertTriangle, TrendingUp } from "lucide-react";

export default function ClinicalManagementIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 4: Principles of Clinical Management
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comprehensive Patient Care and Treatment Decision-Making
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">NCCN Guidelines</Badge>
          <Badge variant="secondary">ASCO Standards</Badge>
          <Badge variant="secondary">Quality Metrics</Badge>
        </div>
      </div>

      <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Clinical Management Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Clinical management in oncology encompasses the comprehensive care of cancer 
            patients, integrating evidence-based treatment with individualized patient 
            factors, supportive care, and long-term survivorship planning.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Core Management Principles
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Performance Status Assessment:</strong> ECOG, Karnofsky scales</li>
                <li>• <strong>Multidisciplinary Care:</strong> Team-based approach</li>
                <li>• <strong>Shared Decision-Making:</strong> Patient preferences and values</li>
                <li>• <strong>Supportive Care Integration:</strong> Symptom management</li>
                <li>• <strong>Toxicity Monitoring:</strong> Early detection and management</li>
                <li>• <strong>Survivorship Planning:</strong> Long-term care coordination</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Key Focus Areas
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">Performance Status</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Functional capacity assessment for treatment planning</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">Supportive Care</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pain management, nutrition, psychosocial support</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">Toxicity Management</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Prevention, monitoring, and intervention strategies</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">Survivorship</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Long-term follow-up and quality of life</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          Treatment Decision Framework
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700 dark:text-blue-300">
          <div>
            <strong>Patient Factors:</strong>
            <ul className="ml-4 mt-1">
              <li>• Age and comorbidities</li>
              <li>• Performance status</li>
              <li>• Patient preferences</li>
            </ul>
          </div>
          <div>
            <strong>Disease Factors:</strong>
            <ul className="ml-4 mt-1">
              <li>• Stage and prognosis</li>
              <li>• Histology and biomarkers</li>
              <li>• Previous treatments</li>
            </ul>
          </div>
          <div>
            <strong>Treatment Factors:</strong>
            <ul className="ml-4 mt-1">
              <li>• Efficacy and toxicity</li>
              <li>• Quality of life impact</li>
              <li>• Resource availability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}