import React, { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, Info, Loader2, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { TreatmentSelectionCriteria } from "./types";

interface EnhancedInputPanelProps {
  criteria: TreatmentSelectionCriteria;
  onCriteriaChange: (updates: Partial<TreatmentSelectionCriteria>) => void;
  isLoading: boolean;
}

const CANCER_TYPES = [
  "Breast Cancer", "Lung Cancer (NSCLC)", "Lung Cancer (SCLC)", "Colorectal Cancer", 
  "Gastric Cancer", "Pancreatic Cancer", "Liver Cancer", "Kidney Cancer", 
  "Bladder Cancer", "Prostate Cancer", "Ovarian Cancer", "Cervical Cancer",
  "Head and Neck Cancer", "Melanoma", "Lymphoma", "Leukemia", "Sarcoma", 
  "Brain Cancer", "Thyroid Cancer", "Esophageal Cancer", "Bone Cancer",
  "Ampullary Adenocarcinoma", "Anal Cancer", "Testicular Cancer", "Multiple Myeloma"
];

const STAGES = ["0", "I", "IA", "IB", "II", "IIA", "IIB", "III", "IIIA", "IIIB", "IIIC", "IV", "IVA", "IVB"];

export const EnhancedInputPanel = memo<EnhancedInputPanelProps>(({ 
  criteria, 
  onCriteriaChange, 
  isLoading 
}) => {
  // Fetch dynamic treatment criteria from database
  const { data: treatmentCriteria, isLoading: criteriaLoading } = useQuery({
    queryKey: ['/api/treatment-criteria'],
    queryFn: async () => {
      const response = await fetch('/api/treatment-criteria');
      if (!response.ok) throw new Error('Failed to fetch treatment criteria');
      return response.json();
    },
    staleTime: 5 * 60 * 1000 // Cache for 5 minutes
  });

  // Organize criteria by category
  const organizedCriteria = React.useMemo(() => {
    if (!treatmentCriteria) return {};
    
    return treatmentCriteria.reduce((acc: any, item: any) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [treatmentCriteria]);

  // Separate common and rare biomarkers for better UX
  const { commonBiomarkers, rareBiomarkers } = React.useMemo(() => {
    const biomarkers = organizedCriteria.biomarker || [];
    return {
      commonBiomarkers: biomarkers.filter((b: any) => b.isCommon),
      rareBiomarkers: biomarkers.filter((b: any) => !b.isCommon)
    };
  }, [organizedCriteria]);

  // Biomarker conflict detection
  const biomarkerConflicts = React.useMemo(() => {
    const conflicts = [];
    const selected = criteria.biomarkers;
    
    // Check for conflicting pairs
    const conflictPairs = [
      ['ER+', 'ER-'], ['PR+', 'PR-'], ['HER2+', 'HER2-'], 
      ['PD-L1+', 'PD-L1-'], ['MSI-H', 'MSS']
    ];
    
    conflictPairs.forEach(([pos, neg]) => {
      if (selected.includes(pos) && selected.includes(neg)) {
        conflicts.push(`${pos} and ${neg} are mutually exclusive`);
      }
    });
    
    return conflicts;
  }, [criteria.biomarkers]);

  const handleBiomarkerChange = (biomarker: string, checked: boolean) => {
    const currentBiomarkers = criteria.biomarkers;
    let newBiomarkers;
    
    if (checked) {
      newBiomarkers = [...currentBiomarkers, biomarker];
    } else {
      newBiomarkers = currentBiomarkers.filter(b => b !== biomarker);
    }
    
    onCriteriaChange({ biomarkers: newBiomarkers });
  };

  if (criteriaLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Loader2 className="h-8 w-8 mx-auto text-blue-500 mb-4 animate-spin" />
          <h3 className="font-medium mb-2">Loading Treatment Criteria</h3>
          <p className="text-sm text-muted-foreground">Fetching comprehensive NCCN-aligned parameters...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Enhanced Treatment Selection Criteria
          </CardTitle>
          <CardDescription>
            Select patient and disease characteristics using comprehensive NCCN-aligned criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {/* Disease Stage */}
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

          {/* Histology */}
          <div>
            <label className="text-sm font-medium mb-2 block">Histology</label>
            <Select value={criteria.histology} onValueChange={(value) => onCriteriaChange({ histology: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select histology" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All histologies</SelectItem>
                {(organizedCriteria.histology || []).map((hist: any) => (
                  <SelectItem key={hist.value} value={hist.value}>
                    <div className="flex items-center gap-2">
                      {hist.value}
                      {hist.description && (
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">{hist.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Biomarkers */}
          <div>
            <label className="text-sm font-medium mb-2 block">Biomarkers</label>
            
            {/* Common Biomarkers */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Common Biomarkers</h4>
              <div className="grid grid-cols-2 gap-2">
                {commonBiomarkers.map((marker: any) => (
                  <div key={marker.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={marker.value}
                      checked={criteria.biomarkers.includes(marker.value)}
                      onCheckedChange={(checked) => handleBiomarkerChange(marker.value, checked as boolean)}
                    />
                    <label htmlFor={marker.value} className="text-sm cursor-pointer">
                      {marker.value}
                    </label>
                    {marker.description && (
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">{marker.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rare/Advanced Biomarkers */}
            {rareBiomarkers.length > 0 && (
              <>
                <Separator />
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Advanced/Emerging Biomarkers</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {rareBiomarkers.map((marker: any) => (
                      <div key={marker.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={marker.value}
                          checked={criteria.biomarkers.includes(marker.value)}
                          onCheckedChange={(checked) => handleBiomarkerChange(marker.value, checked as boolean)}
                        />
                        <label htmlFor={marker.value} className="text-sm cursor-pointer">
                          {marker.value}
                        </label>
                        {marker.description && (
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-3 w-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-xs">{marker.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Biomarker Conflicts Alert */}
            {biomarkerConflicts.length > 0 && (
              <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Biomarker Conflicts Detected</span>
                </div>
                <ul className="mt-1 text-sm text-orange-600">
                  {biomarkerConflicts.map((conflict, index) => (
                    <li key={index}>• {conflict}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Treatment Intent */}
          <div>
            <label className="text-sm font-medium mb-2 block">Treatment Intent</label>
            <Select value={criteria.treatmentIntent} onValueChange={(value) => onCriteriaChange({ treatmentIntent: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select intent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All intents</SelectItem>
                {(organizedCriteria.intent || []).map((intent: any) => (
                  <SelectItem key={intent.value} value={intent.value}>
                    <div className="flex items-center gap-2">
                      {intent.value}
                      {intent.description && (
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">{intent.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Treatment Line */}
          <div>
            <label className="text-sm font-medium mb-2 block">Line of Treatment</label>
            <Select value={criteria.treatmentLine} onValueChange={(value) => onCriteriaChange({ treatmentLine: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All lines</SelectItem>
                {(organizedCriteria.line || []).map((line: any) => (
                  <SelectItem key={line.value} value={line.value}>
                    <div className="flex items-center gap-2">
                      {line.value}
                      {line.description && (
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">{line.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reason for Treatment Change */}
          <div>
            <label className="text-sm font-medium mb-2 block">Reason for Treatment Change</label>
            <Select value={criteria.changeReason} onValueChange={(value) => onCriteriaChange({ changeReason: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All reasons</SelectItem>
                {(organizedCriteria.reason || []).map((reason: any) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    <div className="flex items-center gap-2">
                      {reason.value}
                      {reason.description && (
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">{reason.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selection Summary */}
          {criteria.biomarkers.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Selected Biomarkers</h4>
              <div className="flex flex-wrap gap-1">
                {criteria.biomarkers.map((marker) => (
                  <Badge key={marker} variant="secondary" className="text-xs">
                    {marker}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Validation Messages */}
          {criteria.cancerType === "all" && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-600">
                <Info className="h-4 w-4" />
                <span className="text-sm">Select a specific cancer type for precise recommendations</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
});

EnhancedInputPanel.displayName = "EnhancedInputPanel";