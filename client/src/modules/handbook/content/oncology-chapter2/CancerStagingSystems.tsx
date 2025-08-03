import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Hash, BarChart3, TrendingUp } from "lucide-react";

export default function CancerStagingSystems() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          2.5 Cancer Staging Systems
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          TNM Classification and AJCC Guidelines
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">AJCC 8th Edition</Badge>
          <Badge variant="secondary">UICC TNM</Badge>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            TNM Classification System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-center text-gray-900 dark:text-gray-100">T - Primary Tumor</h4>
              <div className="space-y-2">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">TX</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Primary tumor cannot be assessed</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">T0</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">No evidence of primary tumor</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">Tis</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Carcinoma in situ</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">T1-T4</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Increasing size/extent of primary tumor</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-center text-gray-900 dark:text-gray-100">N - Regional Lymph Nodes</h4>
              <div className="space-y-2">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">NX</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Regional nodes cannot be assessed</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">N0</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">No regional lymph node metastasis</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">N1-N3</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Increasing involvement of regional nodes</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-center text-gray-900 dark:text-gray-100">M - Distant Metastasis</h4>
              <div className="space-y-2">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">M0</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">No distant metastasis</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">M1</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Distant metastasis present</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                  <div className="font-medium text-sm mb-1">M1a, M1b, M1c</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Site-specific metastatic categories</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Hash className="h-5 w-5 text-green-600 dark:text-green-400" />
              Stage Groupings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Stage 0</span>
                  <Badge variant="outline">In Situ</Badge>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Tis N0 M0 - Abnormal cells present but not spread</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Stage I</span>
                  <Badge variant="default">Early</Badge>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Small tumor confined to organ of origin</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Stage II-III</span>
                  <Badge variant="secondary">Locally Advanced</Badge>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Larger tumor and/or regional lymph node involvement</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Stage IV</span>
                  <Badge variant="destructive">Metastatic</Badge>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Distant metastasis present</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Additional Staging Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Prognostic Factors</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Grade (G):</span> Degree of differentiation
                  <ul className="ml-4 mt-1 text-gray-700 dark:text-gray-300">
                    <li>• GX: Cannot be assessed</li>
                    <li>• G1: Well differentiated (low grade)</li>
                    <li>• G2: Moderately differentiated</li>
                    <li>• G3-G4: Poorly/undifferentiated (high grade)</li>
                  </ul>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Lymphovascular Invasion (LVI):</span>
                  <ul className="ml-4 mt-1 text-gray-700 dark:text-gray-300">
                    <li>• L0: No lymphatic invasion</li>
                    <li>• L1: Lymphatic invasion present</li>
                    <li>• V0: No venous invasion</li>
                    <li>• V1: Venous invasion present</li>
                  </ul>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Perineural Invasion (PNI):</span>
                  <ul className="ml-4 mt-1 text-gray-700 dark:text-gray-300">
                    <li>• Pn0: No perineural invasion</li>
                    <li>• Pn1: Perineural invasion present</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}