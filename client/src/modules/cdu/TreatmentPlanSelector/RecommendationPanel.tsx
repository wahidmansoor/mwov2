import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  AlertTriangle, 
  Syringe, 
  FileText, 
  ExternalLink, 
  Brain,
  Shield,
  Target,
  Activity,
  TrendingUp
} from "lucide-react";
import { TreatmentSelectionCriteria, RecommendationResult, TreatmentRecommendation, DrugInteractionResult, ComorbidityImpactResult, PerformanceStatusResult } from "./types";

interface RecommendationPanelProps {
  recommendations: RecommendationResult | null;
  criteria: TreatmentSelectionCriteria;
  isLoading: boolean;
  error: any;
}

export function RecommendationPanel({ recommendations, criteria, isLoading, error }: RecommendationPanelProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Activity className="h-8 w-8 mx-auto text-blue-500 mb-4 animate-spin" />
            <h3 className="font-medium mb-2">Analyzing Treatment Options</h3>
            <p className="text-sm text-muted-foreground">Processing NCCN protocols and biomarker data...</p>
            <Progress value={75} className="w-64 mx-auto mt-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              Unable to generate recommendations. Please check your criteria and try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations || !recommendations.primary) {
    // Enhanced no-results handling as per uploaded document requirements
    const showNoResultsMessage = criteria.cancerType !== "all" && criteria.treatmentIntent !== "all";
    
    if (showNoResultsMessage) {
      return (
        <Card>
          <CardContent className="py-8">
            <Alert className="border-amber-200 bg-amber-50 mb-4">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>No mapped treatment found for this intent.</strong><br />
                Please try an alternate treatment intent or consult guidelines. The current criteria may need adjustment for available protocols.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No Treatment Recommendations Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Current selection: {criteria.cancerType} - {criteria.treatmentIntent} - {criteria.histology || "Any histology"}
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Suggestions:</strong></p>
                <p>• Try selecting "Palliative" or "Curative" treatment intent</p>
                <p>• Broaden biomarker selection or try "All" for general protocols</p>
                <p>• Check if this cancer type has protocols for the selected intent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">Select Criteria to Begin</h3>
            <p className="text-sm text-muted-foreground">
              Choose cancer type and other parameters to receive evidence-based treatment recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { primary, alternatives, confidence, evidence, alerts, fallbackUsed, fallbackNote, aiEnhanced } = recommendations;

  return (
    <div className="space-y-6">
      {/* AI Fallback Banner - Show when fallback logic was used */}
      {fallbackUsed && fallbackNote && (
        <Alert className="border-blue-200 bg-blue-50">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>AI Fallback Applied:</strong> {fallbackNote}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Enhanced AI note for low confidence or AI-enhanced results */}
      {aiEnhanced && !fallbackUsed && (
        <Alert className="border-purple-200 bg-purple-50">
          <TrendingUp className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            AI-enhanced recommendation with confidence scoring applied.
          </AlertDescription>
        </Alert>
      )}

      {/* Primary Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Primary Recommendation
          </CardTitle>
          <CardDescription>
            Top-ranked protocol based on selected criteria and NCCN guidelines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{primary.protocol}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{primary.intent}</Badge>
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" />
                Confidence: {Math.round(confidence * 100)}%
              </Badge>
              <Badge variant="outline">{evidence}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {primary.personalizedReasoning}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Guidelines: {primary.guidelines.join(", ")}</span>
            </div>
          </div>

          <Separator />

          {/* Drug Regimen */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Syringe className="h-4 w-4" />
              Treatment Regimen
            </h4>
            <div className="space-y-2">
              {primary.drugs.map((drug, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium">{drug}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Clinical Alerts */}
          {primary.alerts.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Clinical Alerts
              </h4>
              <div className="space-y-2">
                {primary.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-orange-700 dark:text-orange-300">{alert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Information */}
          {(primary.safetyFlags.length > 0 || primary.drugInteractions.length > 0) && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  Safety Considerations
                </h4>
                <div className="space-y-2">
                  {primary.safetyFlags.map((flag, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-700 dark:text-red-300">{flag}</span>
                    </div>
                  ))}
                  {primary.drugInteractions.map((interaction, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-700 dark:text-red-300">{interaction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Evidence Details */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <h5 className="font-medium text-sm mb-2">Evidence Summary</h5>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Evidence Level:</span>
                <span className="ml-2 font-medium">{primary.evidenceLevel}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Biomarker Match:</span>
                <span className="ml-2 font-medium">{Math.round(primary.biomarkerMatch * 100)}%</span>
              </div>
            </div>
            {primary.nccnReferences.length > 0 && (
              <div className="mt-2">
                <span className="text-muted-foreground text-xs">NCCN References:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {primary.nccnReferences.map((ref, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{ref}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Recommendations */}
      {alternatives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Alternative Options
            </CardTitle>
            <CardDescription>
              Additional treatment protocols for consideration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alternatives.map((alt, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{alt.protocol}</h4>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(alt.aiScore * 100)}% match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alt.personalizedReasoning}</p>
                <div className="flex flex-wrap gap-1">
                  {alt.drugs.slice(0, 3).map((drug, drugIndex) => (
                    <Badge key={drugIndex} variant="secondary" className="text-xs">
                      {drug.split(' ')[0]}
                    </Badge>
                  ))}
                  {alt.drugs.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{alt.drugs.length - 3} more</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* System-wide Alerts */}
      {alerts.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {alerts.map((alert, index) => (
                <div key={index}>{alert}</div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* ENHANCED CLINICAL DECISION SUPPORT SECTIONS */}
      
      {/* Drug Interactions Display */}
      {recommendations.primary.drugInteractions && recommendations.primary.drugInteractions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Drug Interactions
            </CardTitle>
            <CardDescription>
              Potential interactions with current medications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.primary.drugInteractions.map((interaction: DrugInteractionResult, index: number) => (
              <div key={index} className={`p-3 rounded-lg border ${
                interaction.severity === 'High' ? 'border-red-200 bg-red-50' :
                interaction.severity === 'Moderate' ? 'border-amber-200 bg-amber-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{interaction.drug1} + {interaction.drug2}</div>
                  <Badge variant={
                    interaction.severity === 'High' ? 'destructive' :
                    interaction.severity === 'Moderate' ? 'secondary' : 'default'
                  }>
                    {interaction.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{interaction.clinicalEffect}</p>
                <div className="text-sm">
                  <strong>Mechanism:</strong> {interaction.mechanism}
                </div>
                <div className="text-sm mt-1">
                  <strong>Recommendation:</strong> {interaction.recommendation}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Comorbidity Impact Display */}
      {recommendations.primary.comorbidityImpact && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Comorbidity Assessment
            </CardTitle>
            <CardDescription>
              Impact of comorbidities on treatment selection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.primary.comorbidityImpact.contraindications.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-2">Contraindications</h4>
                <div className="space-y-1">
                  {recommendations.primary.comorbidityImpact.contraindications.map((contra: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-red-50 border border-red-200 rounded">
                      {contra}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {recommendations.primary.comorbidityImpact.doseAdjustments.length > 0 && (
              <div>
                <h4 className="font-medium text-amber-600 mb-2">Dose Adjustments Required</h4>
                <div className="space-y-1">
                  {recommendations.primary.comorbidityImpact.doseAdjustments.map((adjustment: any, index: number) => (
                    <div key={index} className="text-sm p-2 bg-amber-50 border border-amber-200 rounded">
                      <strong>{adjustment.drug}:</strong> {adjustment.adjustment} ({adjustment.reason})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendations.primary.comorbidityImpact.monitoringRequirements.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Enhanced Monitoring</h4>
                <div className="space-y-1">
                  {recommendations.primary.comorbidityImpact.monitoringRequirements.map((req: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-blue-50 border border-blue-200 rounded">
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Performance Status Guidance Display */}
      {recommendations.primary.performanceStatusGuidance && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Performance Status Guidance
            </CardTitle>
            <CardDescription>
              Treatment eligibility based on performance status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.primary.performanceStatusGuidance.eligibleTreatments.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-2">Eligible Treatments</h4>
                <div className="grid grid-cols-1 gap-2">
                  {recommendations.primary.performanceStatusGuidance.eligibleTreatments.map((treatment: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-green-50 border border-green-200 rounded flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {treatment}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendations.primary.performanceStatusGuidance.treatmentLimitations.length > 0 && (
              <div>
                <h4 className="font-medium text-amber-600 mb-2">Treatment Limitations</h4>
                <div className="space-y-1">
                  {recommendations.primary.performanceStatusGuidance.treatmentLimitations.map((limitation: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-amber-50 border border-amber-200 rounded">
                      {limitation}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Generate Treatment Plan
        </Button>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Guidelines
        </Button>
      </div>
    </div>
  );
}