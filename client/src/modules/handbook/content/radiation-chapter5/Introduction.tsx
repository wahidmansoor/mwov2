import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, Heart, Activity } from "lucide-react";

export default function SiteSpecificRadiationOncologyIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 5: Site-Specific Radiation Oncology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Anatomical Site-Based Treatment Approaches
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">RTOG Protocols</Badge>
          <Badge variant="secondary">NCCN Guidelines</Badge>
          <Badge variant="secondary">Evidence-Based</Badge>
        </div>
      </div>

      <Card className="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Site-Specific Radiation Oncology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Site-specific radiation oncology addresses the unique anatomical, 
            biological, and technical considerations for treating cancers at different 
            body sites. This chapter provides comprehensive coverage of evidence-based 
            radiation therapy approaches for major cancer locations.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Major Treatment Sites
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Central Nervous System</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Brain tumors, spine, SRS applications</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xs">H</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Head and Neck</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Oropharynx, larynx, nasopharynx</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Thoracic</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Lung cancer, esophageal cancer</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="font-medium text-sm">Breast</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Whole breast, partial breast, chest wall</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Treatment Considerations</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Anatomical Constraints:</strong> Critical organ proximity</li>
                <li>• <strong>Motion Management:</strong> Respiratory and cardiac motion</li>
                <li>• <strong>Dose Fractionation:</strong> Site-specific schedules</li>
                <li>• <strong>Combined Modality:</strong> Surgery and chemotherapy integration</li>
                <li>• <strong>Special Techniques:</strong> IMRT, SBRT, brachytherapy</li>
                <li>• <strong>Pediatric Considerations:</strong> Growth and development</li>
                <li>• <strong>Quality Assurance:</strong> Site-specific protocols</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Gastrointestinal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Rectal cancer</li>
              <li>• Anal cancer</li>
              <li>• Pancreatic cancer</li>
              <li>• Liver tumors</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Genitourinary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Prostate cancer</li>
              <li>• Bladder cancer</li>
              <li>• Testicular cancer</li>
              <li>• Renal tumors</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Gynecologic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Cervical cancer</li>
              <li>• Endometrial cancer</li>
              <li>• Vaginal cancer</li>
              <li>• Vulvar cancer</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-sm text-center">Hematologic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            <ul className="text-xs text-gray-700 dark:text-gray-300">
              <li>• Hodgkin lymphoma</li>
              <li>• Non-Hodgkin lymphoma</li>
              <li>• Total body irradiation</li>
              <li>• CNS prophylaxis</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}