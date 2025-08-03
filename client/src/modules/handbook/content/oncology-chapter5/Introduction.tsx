import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Lungs, Activity } from "lucide-react";

export default function OrganBasedOncologyIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 5: Organ-based Oncology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Site-Specific Cancer Management
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">NCCN Guidelines</Badge>
          <Badge variant="secondary">ASCO Recommendations</Badge>
          <Badge variant="secondary">Biomarker-Driven</Badge>
        </div>
      </div>

      <Card className="border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Organ-Specific Oncology Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Organ-based oncology focuses on the unique biological, clinical, and 
            therapeutic characteristics of cancers arising from specific anatomical sites. 
            This chapter provides comprehensive coverage of major cancer types with 
            emphasis on evidence-based, biomarker-driven treatment approaches.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Major Cancer Sites
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <div>
                    <div className="font-medium text-sm">Breast Cancer</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Molecular subtypes, targeted therapy</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium text-sm">Lung Cancer</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">NSCLC, SCLC, biomarker testing</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium text-sm">Gastrointestinal</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Colorectal, gastric, pancreatic</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div>
                    <div className="font-medium text-sm">Genitourinary</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Prostate, bladder, renal cell</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Treatment Approach
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Molecular Profiling:</strong> Comprehensive genomic testing</li>
                <li>• <strong>Biomarker-Driven Therapy:</strong> Precision medicine approach</li>
                <li>• <strong>Multidisciplinary Care:</strong> Surgery, radiation, medical oncology</li>
                <li>• <strong>Stage-Specific Management:</strong> Early vs. advanced disease</li>
                <li>• <strong>Clinical Trial Integration:</strong> Novel therapy access</li>
                <li>• <strong>Quality of Life Focus:</strong> Functional preservation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Solid Tumors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Breast</li>
              <li>• Lung</li>
              <li>• Colorectal</li>
              <li>• Prostate</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">CNS Tumors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Glioblastoma</li>
              <li>• Meningioma</li>
              <li>• Brain mets</li>
              <li>• Spinal tumors</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Gynecologic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Ovarian</li>
              <li>• Cervical</li>
              <li>• Endometrial</li>
              <li>• Vulvar</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Hematologic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Lymphomas</li>
              <li>• Leukemias</li>
              <li>• Myeloma</li>
              <li>• MDS/MPN</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}