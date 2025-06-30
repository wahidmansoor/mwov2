import { useState, useCallback, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Brain, AlertTriangle } from "lucide-react";
import { 
  TreatmentSelectionCriteria, 
  CANCER_TYPES, 
  STAGES, 
  HISTOLOGIES, 
  BIOMARKERS, 
  TREATMENT_INTENTS, 
  TREATMENT_LINES, 
  PREVIOUS_TREATMENTS, 
  CHANGE_REASONS 
} from "./types";
// Simple debounce hook inline
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface InputPanelProps {
  criteria: TreatmentSelectionCriteria;
  onCriteriaChange: (updates: Partial<TreatmentSelectionCriteria>) => void;
  isLoading: boolean;
}

export function InputPanel({ criteria, onCriteriaChange, isLoading }: InputPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Get context-specific options based on cancer type
  const availableHistologies = useMemo(() => {
    if (criteria.cancerType === "all") return HISTOLOGIES.default;
    return HISTOLOGIES[criteria.cancerType as keyof typeof HISTOLOGIES] || HISTOLOGIES.default;
  }, [criteria.cancerType]);

  const availableBiomarkers = useMemo(() => {
    if (criteria.cancerType === "all") return BIOMARKERS.default;
    return BIOMARKERS[criteria.cancerType as keyof typeof BIOMARKERS] || BIOMARKERS.default;
  }, [criteria.cancerType]);

  // Validation alerts
  const validationAlerts = useMemo(() => {
    const alerts = [];
    
    // Check for conflicting biomarkers
    if (criteria.biomarkers.includes("ER+") && criteria.biomarkers.includes("ER-")) {
      alerts.push("Conflicting ER status selected");
    }
    if (criteria.biomarkers.includes("PR+") && criteria.biomarkers.includes("PR-")) {
      alerts.push("Conflicting PR status selected");
    }
    if (criteria.biomarkers.includes("HER2+") && criteria.biomarkers.includes("HER2-")) {
      alerts.push("Conflicting HER2 status selected");
    }
    if (criteria.biomarkers.includes("PD-L1+") && criteria.biomarkers.includes("PD-L1-")) {
      alerts.push("Conflicting PD-L1 status selected");
    }

    // Check for inappropriate combinations
    if (criteria.cancerType === "Lung Cancer (SCLC)" && criteria.biomarkers.includes("HER2+")) {
      alerts.push("HER2 testing not standard for Small Cell Lung Cancer");
    }

    return alerts;
  }, [criteria.biomarkers, criteria.cancerType]);

  const handleBiomarkerChange = useCallback((marker: string, checked: boolean) => {
    const currentMarkers = criteria.biomarkers;
    
    if (checked) {
      // Auto-remove conflicting markers
      let newMarkers = [...currentMarkers, marker];
      
      if (marker.endsWith("+")) {
        const negativeMarker = marker.replace("+", "-");
        newMarkers = newMarkers.filter(m => m !== negativeMarker);
      } else if (marker.endsWith("-")) {
        const positiveMarker = marker.replace("-", "+");
        newMarkers = newMarkers.filter(m => m !== positiveMarker);
      }
      
      onCriteriaChange({ biomarkers: newMarkers });
    } else {
      onCriteriaChange({ 
        biomarkers: currentMarkers.filter(m => m !== marker) 
      });
    }
  }, [criteria.biomarkers, onCriteriaChange]);

  const clearAllFilters = useCallback(() => {
    onCriteriaChange({
      cancerType: "all",
      stage: "all",
      histology: "all",
      biomarkers: [],
      treatmentIntent: "all",
      treatmentLine: "all",
      previousTreatments: [],
      changeReason: "all"
    });
    setSearchTerm("");
  }, [onCriteriaChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Treatment Selection Criteria
        </CardTitle>
        <CardDescription>
          Enter patient and disease characteristics for evidence-based treatment recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Validation Alerts */}
        {validationAlerts.length > 0 && (
          <div className="space-y-2">
            {validationAlerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-orange-700 dark:text-orange-300">{alert}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quick Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Quick Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cancer types, protocols, or drugs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Cancer Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Cancer Type *</label>
          <Select value={criteria.cancerType} onValueChange={(value) => onCriteriaChange({ cancerType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select cancer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All cancer types</SelectItem>
              {CANCER_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stage and Histology Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Disease Stage</label>
            <Select value={criteria.stage} onValueChange={(value) => onCriteriaChange({ stage: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stages</SelectItem>
                {STAGES.map(stage => (
                  <SelectItem key={stage} value={stage}>Stage {stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Histology</label>
            <Select value={criteria.histology} onValueChange={(value) => onCriteriaChange({ histology: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select histology" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All histologies</SelectItem>
                {availableHistologies.map(hist => (
                  <SelectItem key={hist} value={hist}>{hist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Biomarkers */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Biomarkers
            {criteria.biomarkers.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {criteria.biomarkers.length} selected
              </Badge>
            )}
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded">
            {availableBiomarkers.map(marker => (
              <div key={marker} className="flex items-center space-x-2">
                <Checkbox
                  id={marker}
                  checked={criteria.biomarkers.includes(marker)}
                  onCheckedChange={(checked) => handleBiomarkerChange(marker, checked as boolean)}
                />
                <label htmlFor={marker} className="text-sm cursor-pointer">{marker}</label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Treatment Context */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Treatment Intent</label>
            <Select value={criteria.treatmentIntent} onValueChange={(value) => onCriteriaChange({ treatmentIntent: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select intent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All intents</SelectItem>
                {TREATMENT_INTENTS.map(intent => (
                  <SelectItem key={intent} value={intent}>{intent}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Line of Treatment</label>
            <Select value={criteria.treatmentLine} onValueChange={(value) => onCriteriaChange({ treatmentLine: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All lines</SelectItem>
                {TREATMENT_LINES.map(line => (
                  <SelectItem key={line} value={line}>{line}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Previous Treatments */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Previous Treatments
            {criteria.previousTreatments.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {criteria.previousTreatments.length} selected
              </Badge>
            )}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PREVIOUS_TREATMENTS.map(treatment => (
              <div key={treatment} className="flex items-center space-x-2">
                <Checkbox
                  id={treatment}
                  checked={criteria.previousTreatments.includes(treatment)}
                  onCheckedChange={(checked) => {
                    const current = criteria.previousTreatments;
                    if (checked) {
                      onCriteriaChange({ previousTreatments: [...current, treatment] });
                    } else {
                      onCriteriaChange({ previousTreatments: current.filter(t => t !== treatment) });
                    }
                  }}
                />
                <label htmlFor={treatment} className="text-sm cursor-pointer">{treatment}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Change Reason */}
        <div>
          <label className="text-sm font-medium mb-2 block">Reason for Treatment Change</label>
          <Select value={criteria.changeReason} onValueChange={(value) => onCriteriaChange({ changeReason: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Not applicable</SelectItem>
              {CHANGE_REASONS.map(reason => (
                <SelectItem key={reason} value={reason}>{reason}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="flex-1"
            disabled={isLoading}
          >
            <Filter className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Selection Summary */}
        {(criteria.cancerType !== "all" || criteria.biomarkers.length > 0) && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <h4 className="text-sm font-medium mb-2">Selection Summary</h4>
            <div className="space-y-1 text-xs">
              {criteria.cancerType !== "all" && (
                <div>Cancer: <Badge variant="outline" className="text-xs">{criteria.cancerType}</Badge></div>
              )}
              {criteria.stage !== "all" && (
                <div>Stage: <Badge variant="outline" className="text-xs">{criteria.stage}</Badge></div>
              )}
              {criteria.biomarkers.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  Biomarkers: {criteria.biomarkers.map(marker => (
                    <Badge key={marker} variant="secondary" className="text-xs">{marker}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}