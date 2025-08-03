import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, AlertTriangle, Baby } from "lucide-react";

export default function SpecialTopicsIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 6: Special Topics in Oncology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Specialized Populations and Emergency Management
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">NCCN Guidelines</Badge>
          <Badge variant="secondary">Special Populations</Badge>
          <Badge variant="secondary">Emergency Management</Badge>
        </div>
      </div>

      <Card className="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Special Populations Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Special populations in oncology require tailored approaches that consider 
            unique physiological, social, and clinical factors. This chapter addresses 
            the management of cancer in vulnerable populations and oncological emergencies.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Special Populations
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Geriatric Oncology</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Age-specific considerations and frailty assessment</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Baby className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">AYA Oncology</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Adolescent and young adult considerations</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                    <span className="text-white text-xs">♀</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Pregnancy & Cancer</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Maternal-fetal considerations</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Oncological Emergencies
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">Tumor Lysis Syndrome</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Prevention and management protocols</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <div>
                    <div className="font-medium text-sm">Hypercalcemia</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Malignancy-associated hypercalcemia</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div>
                    <div className="font-medium text-sm">Spinal Cord Compression</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Neurological emergency management</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium text-sm">Superior Vena Cava Syndrome</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Vascular emergency intervention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
          Key Considerations for Special Populations
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-700 dark:text-amber-300">
          <div>
            <strong>Geriatric Factors:</strong>
            <ul className="ml-4 mt-1">
              <li>• Comprehensive geriatric assessment</li>
              <li>• Comorbidity management</li>
              <li>• Functional status evaluation</li>
            </ul>
          </div>
          <div>
            <strong>AYA Considerations:</strong>
            <ul className="ml-4 mt-1">
              <li>• Fertility preservation</li>
              <li>• Psychosocial support</li>
              <li>• Survivorship planning</li>
            </ul>
          </div>
          <div>
            <strong>Emergency Management:</strong>
            <ul className="ml-4 mt-1">
              <li>• Rapid recognition</li>
              <li>• Immediate intervention</li>
              <li>• Multidisciplinary coordination</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}