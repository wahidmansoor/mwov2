import { useCallback, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Brain, Activity, RefreshCw, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { EnhancedInputPanel } from "./EnhancedInputPanel";
import { RecommendationPanel } from "./RecommendationPanel";
import { ExportPanel } from "./ExportPanel";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useResilientRecommendations } from "../../../hooks/useResilientRecommendations";
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
    performanceStatus: 1 // Default ECOG PS
  });

  // Use resilient recommendations hook with comprehensive fallback strategy
  const {
    data: recommendations,
    isLoading,
    error,
    source,
    confidence,
    fallbackUsed,
    retryCount,
    isOffline,
    retry,
    workOffline
  } = useResilientRecommendations({
    criteria,
    enabled: criteria.cancerType !== "all"
  });

  // Generate session ID on mount
  useEffect(() => {
    if (!sessionStorage.getItem('session-id')) {
      sessionStorage.setItem('session-id', crypto.randomUUID());
    }
  }, []);

  // Resilience status indicator
  const getStatusIndicator = () => {
    if (isOffline) {
      return { icon: WifiOff, text: 'Offline Mode', variant: 'destructive' as const };
    }
    if (source === 'api') {
      return { icon: Wifi, text: 'Live Data', variant: 'default' as const };
    }
    if (source === 'cache') {
      return { icon: Activity, text: 'Cached Data', variant: 'secondary' as const };
    }
    if (source === 'fallback') {
      return { icon: AlertTriangle, text: 'Fallback Mode', variant: 'destructive' as const };
    }
    return { icon: Brain, text: 'AI Powered', variant: 'default' as const };
  };

  const statusInfo = getStatusIndicator();

  // Debounced criteria update
  const updateCriteria = useCallback((updates: Partial<TreatmentSelectionCriteria>) => {
    setCriteria(prev => ({ ...prev, ...updates }));
  }, [setCriteria]);

  // Enhanced loading state with retry information
  if (isLoading) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <Activity className="h-8 w-8 mx-auto text-blue-500 mb-4 animate-spin" />
          <h3 className="font-medium mb-2">Loading Treatment Decision Engine</h3>
          <p className="text-sm text-muted-foreground">
            Generating NCCN-aligned recommendations with AI fallback logic...
          </p>
          {retryCount > 0 && (
            <p className="text-xs text-amber-600 mt-2">
              Retry attempt {retryCount} of 3...
            </p>
          )}
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
            <div className="ml-auto flex items-center gap-2">
              <statusInfo.icon className="h-4 w-4" />
              <span className={`text-xs px-2 py-1 rounded-full border ${
                statusInfo.variant === 'destructive' ? 'bg-red-50 text-red-700 border-red-200' :
                statusInfo.variant === 'secondary' ? 'bg-gray-50 text-gray-700 border-gray-200' :
                'bg-green-50 text-green-700 border-green-200'
              }`}>
                {statusInfo.text}
              </span>
            </div>
          </CardTitle>
          <CardDescription>
            Evidence-based treatment recommendations using NCCN protocols and AI-powered clinical decision support
            {confidence && (
              <span className="block mt-1 text-xs">
                Confidence: {Math.round(confidence * 100)}% | Source: {source}
              </span>
            )}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Enhanced Error Handling with Recovery Options */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <p className="font-medium">Recommendation System Error</p>
              <p className="text-sm mt-1">{error.message}</p>
              {fallbackUsed && (
                <p className="text-xs mt-1 text-amber-600">
                  Fallback recommendations are being used. Please verify with current guidelines.
                </p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                onClick={retry}
                disabled={isLoading}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
              {!isOffline && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={workOffline}
                >
                  <WifiOff className="h-3 w-3 mr-1" />
                  Work Offline
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Fallback Mode Warning */}
      {fallbackUsed && !error && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium">Limited Connectivity Mode</p>
            <p className="text-sm mt-1">
              The system is using {source === 'cache' ? 'cached protocols' : 'basic fallback rules'}. 
              Recommendations should be verified with current NCCN guidelines.
            </p>
          </AlertDescription>
        </Alert>
      )}

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
      
      {/* Debug Information (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-4 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <p>Session ID: {sessionStorage.getItem('session-id')}</p>
            <p>Source: {source} | Confidence: {confidence ? (confidence * 100).toFixed(1) : 'N/A'}%</p>
            <p>Fallback Used: {fallbackUsed ? 'Yes' : 'No'} | Retry Count: {retryCount}</p>
            <p>Network Status: {isOffline ? 'Offline' : 'Online'}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}