import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Microscope } from "lucide-react";

export default function DiagnosticWorkupIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 2: Diagnostic Workup and Staging
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comprehensive Guide to Cancer Diagnosis and Classification
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">NCCN Guidelines</Badge>
          <Badge variant="secondary">AJCC 8th Edition</Badge>
          <Badge variant="secondary">WHO Classification</Badge>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Chapter Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            This chapter covers the systematic approach to cancer diagnosis, from initial 
            clinical evaluation through definitive pathological diagnosis and staging. 
            Understanding proper diagnostic workup is essential for treatment planning 
            and prognosis determination.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Learning Objectives
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Master systematic history taking and physical examination techniques</li>
                <li>• Understand the role of various imaging modalities in cancer diagnosis</li>
                <li>• Learn proper biopsy techniques and tissue handling</li>
                <li>• Apply TNM staging principles across different cancer types</li>
                <li>• Interpret tumor markers and laboratory findings</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                Key Topics Covered
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• History and Physical Examination</li>
                <li>• Diagnostic Imaging (CT, MRI, PET)</li>
                <li>• Tumor Markers and Laboratory Tests</li>
                <li>• Biopsy and Histopathology</li>
                <li>• Cancer Staging Systems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Clinical Relevance:</strong> Accurate diagnosis and staging form the foundation 
          of evidence-based cancer treatment. This chapter provides the essential knowledge for 
          making informed therapeutic decisions.
        </p>
      </div>
    </div>
  );
}