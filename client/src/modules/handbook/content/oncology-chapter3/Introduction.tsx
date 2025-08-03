import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Zap, Shield, Target } from "lucide-react";

export default function SystemicTherapiesIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 3: Systemic Cancer Therapies
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comprehensive Guide to Medical Oncology Treatments
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">NCCN Guidelines</Badge>
          <Badge variant="secondary">FDA Approved</Badge>
          <Badge variant="secondary">Evidence-Based</Badge>
        </div>
      </div>

      <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Systemic Therapy Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Systemic cancer therapies represent the cornerstone of medical oncology, 
            providing treatment options that can reach cancer cells throughout the body. 
            This chapter covers the major classes of systemic therapies, their mechanisms 
            of action, clinical applications, and toxicity management.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Treatment Modalities
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Chemotherapy</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cytotoxic agents targeting rapidly dividing cells</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Targeted Therapy</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Precision medicine targeting specific pathways</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Immunotherapy</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Harnessing immune system against cancer</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Hormonal Therapy</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Blocking hormone-driven cancer growth</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Key Concepts</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Mechanism of Action:</strong> Understanding how drugs work at cellular level</li>
                <li>• <strong>Pharmacokinetics:</strong> Drug absorption, distribution, metabolism, excretion</li>
                <li>• <strong>Dose Optimization:</strong> Balancing efficacy with tolerability</li>
                <li>• <strong>Resistance Mechanisms:</strong> Primary and acquired resistance patterns</li>
                <li>• <strong>Combination Strategies:</strong> Synergistic and additive effects</li>
                <li>• <strong>Biomarker-Driven Selection:</strong> Predictive and prognostic markers</li>
                <li>• <strong>Toxicity Management:</strong> Prevention and management of adverse effects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Treatment Intent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <Badge variant="default" className="mb-2">Curative</Badge>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Adjuvant therapy</li>
                <li>• Neoadjuvant therapy</li>
                <li>• Definitive treatment</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Treatment Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">Control</Badge>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Disease stabilization</li>
                <li>• Prolonged survival</li>
                <li>• Quality of life</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="text-lg text-center">Palliative Care</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <Badge variant="outline" className="mb-2">Comfort</Badge>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Symptom management</li>
                <li>• Pain relief</li>
                <li>• Functional improvement</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}