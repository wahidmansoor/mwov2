import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Atom, Activity } from "lucide-react";

export default function RadiationModalitiesIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 3: Radiation Modalities and Techniques
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Advanced Radiation Therapy Technologies
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">IMRT/VMAT</Badge>
          <Badge variant="secondary">Stereotactic</Badge>
          <Badge variant="secondary">Particle Therapy</Badge>
        </div>
      </div>

      <Card className="border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            Radiation Modalities Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Modern radiation oncology encompasses a wide range of treatment modalities 
            and delivery techniques, each optimized for specific clinical scenarios. 
            This chapter explores the physics, clinical applications, and comparative 
            advantages of contemporary radiation therapy approaches.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Target className="h-4 w-4" />
                External Beam Techniques
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium text-sm">3D-CRT</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Three-dimensional conformal radiation therapy</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium text-sm">IMRT</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Intensity-modulated radiation therapy</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div>
                    <div className="font-medium text-sm">VMAT</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Volumetric modulated arc therapy</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">IGRT</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Image-guided radiation therapy</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Atom className="h-4 w-4" />
                Specialized Techniques
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-sm">Stereotactic Radiosurgery</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SRS for intracranial lesions</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Target className="h-5 w-5 text-teal-600" />
                  <div>
                    <div className="font-medium text-sm">SBRT</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Stereotactic body radiation therapy</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-white text-xs">B</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Brachytherapy</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">HDR and LDR internal radiation</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Atom className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="font-medium text-sm">Particle Therapy</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Proton and carbon ion therapy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Photon Therapy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Linear accelerators</li>
              <li>• 6-18 MV energies</li>
              <li>• Multileaf collimators</li>
              <li>• Portal imaging</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Electron Therapy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Superficial treatments</li>
              <li>• 6-20 MeV energies</li>
              <li>• Limited penetration</li>
              <li>• Skin and surface lesions</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Particle Beams</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Bragg peak advantage</li>
              <li>• Pediatric applications</li>
              <li>• Base of skull tumors</li>
              <li>• Dose sparing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}