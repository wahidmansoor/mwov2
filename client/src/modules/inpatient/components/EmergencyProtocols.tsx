import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmergencyScenarios } from '@/lib/hooks/useInpatientData';
import { AlertTriangle, Zap, Clock, Pill, Activity, Download, Filter, RefreshCw, Target, Users, Timer, Stethoscope } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const EmergencyProtocols = () => {
  const [selectedCancerType, setSelectedCancerType] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  
  const { data: emergencyScenarios, isLoading, error, refetch } = useEmergencyScenarios({
    cancerType: selectedCancerType || undefined,
    severity: selectedSeverity || undefined
  });

  const severityColors = {
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
    urgent: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
    critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300'
  };

  const severityIcons = {
    moderate: Activity,
    urgent: AlertTriangle,
    critical: Zap
  };

  const cancerTypes = Array.from(new Set(emergencyScenarios?.map(scenario => scenario.cancerType) || []));
  const severityLevels = ['moderate', 'urgent', 'critical'];

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load emergency protocols. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and Controls */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Emergency Protocols & Management
              </CardTitle>
              <CardDescription>
                Critical oncology emergencies and evidence-based management protocols
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium">Total Scenarios</p>
                <p className="text-2xl font-bold text-red-600">
                  {emergencyScenarios?.length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Zap className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Critical</p>
                <p className="text-2xl font-bold text-orange-600">
                  {emergencyScenarios?.filter(s => s.severity === 'critical').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Urgent</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {emergencyScenarios?.filter(s => s.severity === 'urgent').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Treatment Related</p>
                <p className="text-2xl font-bold text-blue-600">
                  {emergencyScenarios?.filter(s => s.treatmentRelated).length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={selectedCancerType} onValueChange={setSelectedCancerType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Cancer Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cancer Types</SelectItem>
                {cancerTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                {severityLevels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(selectedCancerType || selectedSeverity) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCancerType('');
                  setSelectedSeverity('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Scenarios */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading emergency protocols...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {emergencyScenarios?.map(scenario => {
            const SeverityIcon = severityIcons[scenario.severity as keyof typeof severityIcons];
            
            return (
              <Card key={scenario.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SeverityIcon className="h-5 w-5 text-red-600" />
                      <div>
                        <CardTitle className="text-lg">{scenario.scenarioName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge className={severityColors[scenario.severity as keyof typeof severityColors]}>
                            {scenario.severity.toUpperCase()}
                          </Badge>
                          <span>•</span>
                          <span>{scenario.cancerType}</span>
                          {scenario.treatmentRelated && (
                            <>
                              <span>•</span>
                              <Badge variant="outline">Treatment Related</Badge>
                            </>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      <span>{scenario.timeToIntervention}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="presentation">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4" />
                          Clinical Presentation & Diagnostic Criteria
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Clinical Presentation</h4>
                            <div className="space-y-2">
                              {Object.entries(scenario.clinicalPresentation).map(([category, symptoms]) => (
                                <div key={category} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                  <h5 className="font-medium text-xs uppercase tracking-wide text-blue-600 mb-2">
                                    {category.replace('_', ' ')}
                                  </h5>
                                  <ul className="text-sm space-y-1">
                                    {symptoms.map((symptom, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1.5 text-xs">•</span>
                                        <span>{symptom}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-green-700 dark:text-green-300">Diagnostic Criteria</h4>
                            <div className="space-y-2">
                              {Object.entries(scenario.diagnosticCriteria).map(([category, criteria]) => (
                                <div key={category} className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                                  <h5 className="font-medium text-xs uppercase tracking-wide text-green-600 mb-2">
                                    {category.replace('_', ' ')}
                                  </h5>
                                  <ul className="text-sm space-y-1">
                                    {criteria.map((criterion, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1.5 text-xs">•</span>
                                        <span>{criterion}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="actions">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Immediate Actions & Interventions
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-red-700 dark:text-red-300">Immediate Actions</h4>
                            <ol className="space-y-2">
                              {scenario.immediateActions.map((action, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                                  <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </span>
                                  <span className="text-sm">{action}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm mb-3 text-purple-700 dark:text-purple-300">Required Resources</h4>
                              <div className="space-y-2">
                                {scenario.requiredResources.map((resource, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                                    <Target className="h-4 w-4 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm">{resource}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-sm mb-3 text-orange-700 dark:text-orange-300">Consultation Required</h4>
                              <div className="space-y-2">
                                {scenario.consultationRequired.map((consult, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                                    <Users className="h-4 w-4 text-orange-600 flex-shrink-0" />
                                    <span className="text-sm">{consult}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="risk-factors">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Risk Factors
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {scenario.riskFactors.map((factor, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                              <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                              <span className="text-sm">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Evidence Level: {scenario.evidenceLevel}</span>
                    <span>NCCN: {scenario.nccnReference}</span>
                    <Badge variant="outline" className="text-xs">
                      {scenario.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {!emergencyScenarios || emergencyScenarios.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No emergency scenarios found for the selected criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  setSelectedCancerType('');
                  setSelectedSeverity('');
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
