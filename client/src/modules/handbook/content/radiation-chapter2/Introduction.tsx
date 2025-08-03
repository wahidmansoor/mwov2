import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Layers, Calculator, Monitor } from "lucide-react";

export default function RadiationTreatmentPlanningIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 2: Radiation Treatment Planning
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comprehensive Guide to Modern Treatment Planning
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">ICRU Guidelines</Badge>
          <Badge variant="secondary">QUANTEC</Badge>
          <Badge variant="secondary">RTOG Protocols</Badge>
        </div>
      </div>

      <Card className="border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            Treatment Planning Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Radiation treatment planning is a complex process that transforms clinical 
            objectives into deliverable treatment plans. This chapter covers the essential 
            components from simulation through dose optimization, ensuring safe and 
            effective radiation delivery.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Planning Process Steps
              </h3>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">1. Simulation & Immobilization</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Patient positioning and CT acquisition</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">2. Target Delineation</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">GTV, CTV, PTV definition</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">3. Normal Structure Contouring</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Organs at risk identification</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">4. Treatment Planning</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Dose optimization and calculation</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-1">5. Plan Evaluation</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">DVH analysis and approval</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Key Technologies
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">CT Simulation</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">4D-CT, contrast protocols</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Image Fusion</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">MRI, PET co-registration</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Dose Calculation</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Monte Carlo, convolution</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Layers className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-sm">Plan Optimization</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">IMRT, VMAT techniques</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
        <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">
          Clinical Objectives
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700 dark:text-emerald-300">
          <div>
            <strong>Target Coverage:</strong>
            <ul className="ml-4 mt-1">
              <li>• Adequate dose to tumor volume</li>
              <li>• Account for organ motion</li>
              <li>• Margin recipes and uncertainties</li>
            </ul>
          </div>
          <div>
            <strong>Normal Tissue Sparing:</strong>
            <ul className="ml-4 mt-1">
              <li>• Respect dose constraints</li>
              <li>• Minimize integral dose</li>
              <li>• Optimize dose gradients</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}