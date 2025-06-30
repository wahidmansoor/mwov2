/**
 * Quick Action Panel for OPD Module
 * Provides floating action buttons for common tasks and streamlined workflows
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  AlertTriangle, 
  Stethoscope, 
  FileText, 
  Search,
  Zap,
  Clock,
  Target,
  Plus,
  X
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'assessment' | 'screening' | 'emergency' | 'documentation';
  urgency?: 'high' | 'medium' | 'low';
}

interface QuickActionPanelProps {
  onRiskAssessment: () => void;
  onSymptomAnalysis: () => void;
  onScreeningProtocol: () => void;
  onEmergencyProtocol: () => void;
  onGeneticCounseling: () => void;
  onDocumentation: () => void;
  currentTab: string;
  patientContext?: {
    hasSymptoms: boolean;
    riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
    age: number;
    urgentFlags: string[];
  };
}

export function QuickActionPanel({
  onRiskAssessment,
  onSymptomAnalysis,
  onScreeningProtocol,
  onEmergencyProtocol,
  onGeneticCounseling,
  onDocumentation,
  currentTab,
  patientContext
}: QuickActionPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: 'risk-assessment',
      label: 'Quick Risk Assessment',
      icon: <Target className="h-4 w-4" />,
      action: onRiskAssessment,
      category: 'assessment'
    },
    {
      id: 'symptom-analysis',
      label: 'Symptom Analysis',
      icon: <Stethoscope className="h-4 w-4" />,
      action: onSymptomAnalysis,
      category: 'assessment',
      urgency: patientContext?.hasSymptoms ? 'high' : 'medium'
    },
    {
      id: 'screening-protocol',
      label: 'Screening Guidelines',
      icon: <Search className="h-4 w-4" />,
      action: onScreeningProtocol,
      category: 'screening'
    },
    {
      id: 'emergency-protocol',
      label: 'Emergency Protocols',
      icon: <AlertTriangle className="h-4 w-4" />,
      action: onEmergencyProtocol,
      category: 'emergency',
      urgency: (patientContext?.urgentFlags?.length || 0) > 0 ? 'high' : 'low'
    },
    {
      id: 'genetic-counseling',
      label: 'Genetic Risk',
      icon: <Calculator className="h-4 w-4" />,
      action: onGeneticCounseling,
      category: 'assessment',
      urgency: patientContext?.riskLevel === 'high' || patientContext?.riskLevel === 'very-high' ? 'high' : 'medium'
    },
    {
      id: 'documentation',
      label: 'Generate Report',
      icon: <FileText className="h-4 w-4" />,
      action: onDocumentation,
      category: 'documentation'
    }
  ];

  const getContextualActions = (): QuickAction[] => {
    let filteredActions = quickActions;

    // Filter based on current tab
    switch (currentTab) {
      case 'risk-assessment':
        filteredActions = quickActions.filter(action => 
          ['assessment', 'emergency'].includes(action.category)
        );
        break;
      case 'screening-guidance':
        filteredActions = quickActions.filter(action => 
          ['screening', 'assessment'].includes(action.category)
        );
        break;
      case 'educational-resources':
        filteredActions = quickActions.filter(action => 
          ['documentation', 'assessment'].includes(action.category)
        );
        break;
    }

    // Prioritize based on patient context
    if (patientContext?.urgentFlags?.length) {
      filteredActions = filteredActions.sort((a, b) => {
        if (a.category === 'emergency') return -1;
        if (b.category === 'emergency') return 1;
        return 0;
      });
    }

    return filteredActions.slice(0, 4); // Show max 4 actions
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-orange-500 hover:bg-orange-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const contextualActions = getContextualActions();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Action Panel */}
      {isExpanded && (
        <Card className="mb-4 w-64 shadow-lg border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Quick Actions</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Patient Context Summary */}
            {patientContext && (
              <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={
                    patientContext.riskLevel === 'high' || patientContext.riskLevel === 'very-high' 
                      ? 'destructive' 
                      : patientContext.riskLevel === 'moderate' 
                        ? 'default' 
                        : 'secondary'
                  }>
                    {patientContext.riskLevel} risk
                  </Badge>
                  {patientContext.urgentFlags.length > 0 && (
                    <Badge variant="destructive">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {patientContext.urgentFlags.length} alerts
                    </Badge>
                  )}
                </div>
                {patientContext.hasSymptoms && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Symptomatic patient requiring evaluation
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              {contextualActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="w-full justify-start text-xs h-8"
                >
                  <span className={`p-1 rounded mr-2 text-white ${getUrgencyColor(action.urgency)}`}>
                    {action.icon}
                  </span>
                  {action.label}
                  {action.urgency === 'high' && (
                    <AlertTriangle className="h-3 w-3 ml-auto text-red-500" />
                  )}
                </Button>
              ))}
            </div>

            {/* Workflow Suggestions */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 mb-2">Suggested Workflow:</p>
              <div className="flex flex-wrap gap-1">
                {patientContext?.hasSymptoms ? (
                  <>
                    <Badge variant="outline" className="text-xs">1. Symptoms</Badge>
                    <Badge variant="outline" className="text-xs">2. Risk</Badge>
                    <Badge variant="outline" className="text-xs">3. Screening</Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="text-xs">1. Risk</Badge>
                    <Badge variant="outline" className="text-xs">2. Screening</Badge>
                    <Badge variant="outline" className="text-xs">3. Education</Badge>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Action Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`rounded-full h-14 w-14 shadow-lg transition-all duration-200 ${
          isExpanded ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        size="lg"
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <Zap className="h-6 w-6" />
            {patientContext?.urgentFlags?.length ? (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {patientContext.urgentFlags.length}
                </span>
              </div>
            ) : null}
          </div>
        )}
      </Button>

      {/* Quick Access Floating Buttons (when collapsed) */}
      {!isExpanded && (patientContext?.urgentFlags?.length || 0) > 0 && (
        <div className="absolute bottom-16 right-0 space-y-2">
          <Button
            onClick={onSymptomAnalysis}
            className="rounded-full h-10 w-10 bg-red-500 hover:bg-red-600 shadow-md"
            size="sm"
            title="Urgent Symptom Analysis"
          >
            <Stethoscope className="h-4 w-4" />
          </Button>
          <Button
            onClick={onEmergencyProtocol}
            className="rounded-full h-10 w-10 bg-orange-500 hover:bg-orange-600 shadow-md"
            size="sm"
            title="Emergency Protocols"
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Smart Timing Indicator */}
      {patientContext && (
        <div className="absolute -top-8 right-0 bg-white dark:bg-gray-800 rounded px-2 py-1 shadow-md border text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {patientContext.urgentFlags.length > 0 ? 'Urgent' : 
               patientContext.hasSymptoms ? 'Priority' : 'Routine'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}