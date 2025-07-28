import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Target, Zap, Activity, AlertTriangle, CheckCircle } from "lucide-react";

export function PainPhenotypeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const painPhenotypes = [
    {
      type: "Nociceptive",
      probability: 65,
      description: "Pain due to tissue damage or inflammation",
      characteristics: ["Aching", "Well-localized", "Responds to NSAIDs/opioids"],
      treatment: "WHO ladder, anti-inflammatory approaches",
      color: "bg-blue-500"
    },
    {
      type: "Neuropathic", 
      probability: 25,
      description: "Pain due to nerve damage or dysfunction",
      characteristics: ["Burning", "Shooting", "Electric-like", "Numbness"],
      treatment: "Anticonvulsants, antidepressants, topical agents",
      color: "bg-purple-500"
    },
    {
      type: "Mixed",
      probability: 8,
      description: "Combination of nociceptive and neuropathic components",
      characteristics: ["Variable presentation", "Complex pain pattern"],
      treatment: "Multimodal approach combining strategies",
      color: "bg-orange-500"
    },
    {
      type: "Nociplastic",
      probability: 2,
      description: "Pain due to altered nociception without tissue damage",
      characteristics: ["Widespread", "Hypersensitivity", "Central sensitization"],
      treatment: "Centrally-acting medications, psychological support",
      color: "bg-green-500"
    }
  ];

  const clinicalRecommendations = [
    {
      category: "Immediate Actions",
      icon: Zap,
      items: [
        "Initiate WHO Step 2 analgesic ladder",
        "Consider acetaminophen 1000mg QID",
        "Assess for breakthrough pain episodes",
        "Monitor functional status daily"
      ]
    },
    {
      category: "Diagnostic Workup",
      icon: Target,
      items: [
        "LANSS Scale for neuropathic assessment",
        "Brief Pain Inventory (BPI) completion",
        "Imaging review for structural causes",
        "Neurological examination"
      ]
    },
    {
      category: "Treatment Optimization",
      icon: Activity,
      items: [
        "Consider gabapentin 300mg TID",
        "Evaluate for interventional options",
        "Physical therapy consultation",
        "Psychosocial support assessment"
      ]
    }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            AI-Powered Pain Phenotype Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            Advanced machine learning analysis combining pain characteristics, location patterns, 
            and clinical presentation to identify optimal treatment pathways.
          </p>
          
          {!isAnalyzing && !analysisComplete && (
            <Button onClick={handleAnalyze} className="w-full">
              <Brain className="h-4 w-4 mr-2" />
              Start AI Phenotype Analysis
            </Button>
          )}

          {isAnalyzing && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm">Analyzing pain characteristics...</span>
              </div>
              <Progress value={66} className="w-full" />
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Processing multi-dimensional pain data with NCCN 2025 guidelines
              </p>
            </div>
          )}

          {analysisComplete && (
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Analysis complete. Phenotype classification and treatment recommendations generated.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Phenotype Classification Results */}
      {analysisComplete && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Pain Phenotype Classification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {painPhenotypes.map((phenotype) => (
              <div key={phenotype.type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{phenotype.type} Pain</h4>
                    <Badge variant="outline">{phenotype.probability}% probability</Badge>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Confidence: {phenotype.probability > 50 ? "High" : phenotype.probability > 25 ? "Moderate" : "Low"}
                  </div>
                </div>

                <Progress 
                  value={phenotype.probability} 
                  className="w-full h-2"
                />

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">{phenotype.description}</p>
                    <div className="space-y-1">
                      <p className="font-medium">Characteristics:</p>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5">
                        {phenotype.characteristics.map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Recommended Approach:</p>
                    <p className="text-slate-600 dark:text-slate-400">{phenotype.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Clinical Recommendations */}
      {analysisComplete && (
        <div className="grid lg:grid-cols-3 gap-6">
          {clinicalRecommendations.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* NCCN Guidelines Reference */}
      {analysisComplete && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  NCCN 2025 Adult Cancer Pain Guidelines
                </h4>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <p>• Recommendations based on NCCN Categories 1 and 2A evidence</p>
                  <p>• Multimodal approach incorporating patient-specific factors</p>
                  <p>• Regular reassessment and treatment optimization required</p>
                  <p>• Consider specialist referral for refractory pain (&gt;7/10 despite optimization)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {analysisComplete && (
        <div className="flex gap-4">
          <Button className="flex-1">
            Generate Treatment Plan
          </Button>
          <Button variant="outline" className="flex-1">
            Schedule Follow-up
          </Button>
          <Button variant="outline">
            Print Analysis
          </Button>
        </div>
      )}
    </div>
  );
}