import { useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Brain, Activity } from "lucide-react";
import { EnhancedInputPanel } from "./EnhancedInputPanel";
import { RecommendationPanel } from "./RecommendationPanel";
import { ExportPanel } from "./ExportPanel";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { TreatmentSelectionCriteria } from "./types";

export default function TreatmentPlanSelector() {
  // Persistent state with localStorage fallback
  const [criteria, setCriteria] = useLocalStorage<TreatmentSelectionCriteria>('treatment-selector-criteria', {
    cancerType: "all",
    stage: "all",
    histology: "all",
    biomarkers: [],
    treatmentIntent: "all",
    treatmentLine: "all",
    previousTreatments: [],
    changeReason: "all",
    // Enhanced clinical decision support defaults
    performanceStatus: undefined,
    performanceStatusScale: undefined,
    comorbidities: [],
    currentMedications: [],
    organFunction: undefined
  });

  // Enhanced API call to generate treatment recommendations with AI fallback
  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['/api/generate-recommendation', criteria],
    queryFn: async () => {
      if (criteria.cancerType === "all") return null;
      
      const response = await fetch('/api/generate-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cancerType: criteria.cancerType,
          histology: criteria.histology !== "all" ? criteria.histology : undefined,
          biomarkers: criteria.biomarkers,
          treatmentIntent: criteria.treatmentIntent !== "all" ? criteria.treatmentIntent : undefined,
          lineOfTreatment: criteria.treatmentLine !== "all" ? criteria.treatmentLine : undefined,
          stage: criteria.stage !== "all" ? criteria.stage : undefined,
          // Enhanced clinical decision support fields
          performanceStatus: criteria.performanceStatus,
          performanceStatusScale: criteria.performanceStatusScale,
          comorbidities: criteria.comorbidities,
          currentMedications: criteria.currentMedications,
          organFunction: criteria.organFunction
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate recommendations');
      const apiResponse = await response.json();
      
      // Transform API response to match frontend expectations
      if (!apiResponse.recommendations || apiResponse.recommendations.length === 0) {
        return null;
      }
      
      const primaryRec = apiResponse.recommendations[0];
      return {
        primary: {
          id: primaryRec.id,
          protocol: primaryRec.treatmentProtocol,
          intent: criteria.treatmentIntent,
          guidelines: [primaryRec.evidenceReference],
          drugs: primaryRec.treatmentProtocol.split(' + '),
          alerts: primaryRec.contraindications || [],
          aiScore: primaryRec.confidenceScore,
          biomarkerMatch: primaryRec.confidenceScore,
          personalizedReasoning: primaryRec.reasoning,
          safetyFlags: primaryRec.contraindications || [],
          drugInteractions: [],
          clinicalWarnings: [],
          evidenceLevel: primaryRec.evidenceReference || 'Category 2B',
          nccnReferences: [primaryRec.nccnReference],
          expectedResponse: "Response varies by patient",
          monitoringPlan: ["Regular monitoring per protocol"]
        },
        alternatives: apiResponse.recommendations.slice(1, 3).map((rec: any) => ({
          id: rec.id,
          protocol: rec.treatmentProtocol,
          intent: criteria.treatmentIntent,
          guidelines: [rec.evidenceReference],
          drugs: rec.treatmentProtocol.split(' + '),
          alerts: rec.contraindications || [],
          aiScore: rec.confidenceScore,
          biomarkerMatch: rec.confidenceScore,
          personalizedReasoning: rec.reasoning,
          safetyFlags: rec.contraindications || [],
          drugInteractions: [],
          clinicalWarnings: [],
          evidenceLevel: rec.evidenceReference || 'Category 2B',
          nccnReferences: [rec.nccnReference],
          expectedResponse: "Response varies by patient",
          monitoringPlan: ["Regular monitoring per protocol"]
        })),
        confidence: apiResponse.overallConfidence || 0.8,
        evidence: primaryRec.evidenceReference || 'Category 2B',
        alerts: [],
        fallbackUsed: apiResponse.fallbackUsed,
        fallbackNote: apiResponse.fallbackNote,
        overallConfidence: apiResponse.overallConfidence,
        aiEnhanced: apiResponse.aiEnhanced
      };
    },
    enabled: criteria.cancerType !== "all",
    staleTime: 5 * 60 * 1000 // 5 minutes cache
  });

  // Debounced criteria update
  const updateCriteria = useCallback((updates: Partial<TreatmentSelectionCriteria>) => {
    setCriteria(prev => ({ ...prev, ...updates }));
  }, [setCriteria]);

  if (isLoading) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <Activity className="h-8 w-8 mx-auto text-blue-500 mb-4 animate-spin" />
          <h3 className="font-medium mb-2">Loading Treatment Decision Engine</h3>
          <p className="text-sm text-muted-foreground">Generating NCCN-aligned recommendations with AI fallback logic...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Enhanced Treatment Plan Selector
          </CardTitle>
          <CardDescription>
            Evidence-based treatment recommendations using NCCN protocols and AI-powered clinical decision support
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <EnhancedInputPanel 
          criteria={criteria}
          onCriteriaChange={updateCriteria}
        />
        
        <RecommendationPanel 
          recommendations={recommendations}
          criteria={criteria}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <ExportPanel 
        recommendations={recommendations}
        criteria={criteria}
      />
    </div>
  );
}