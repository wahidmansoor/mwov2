import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDischargeCriteria } from '@/lib/hooks/useInpatientData';
import { FileText, CheckCircle, Users, AlertTriangle, Clock, Calendar, Download, Filter, RefreshCw, ChevronRight, Home, Pill, BookOpen, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const DischargePlanning = () => {
  const [selectedCancerType, setSelectedCancerType] = useState<string>('');
  const [selectedTreatmentType, setSelectedTreatmentType] = useState<string>('');
  
  const { data: dischargeCriteria, isLoading, error, refetch } = useDischargeCriteria({
    cancerType: selectedCancerType || undefined,
    treatmentType: selectedTreatmentType || undefined
  });

  const admissionTypeColors = {
    'planned': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    'emergency': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
    'urgent': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300'
  };

  const cancerTypes = Array.from(new Set(dischargeCriteria?.map(criteria => criteria.cancerType) || []));
  const treatmentTypes = Array.from(new Set(dischargeCriteria?.map(criteria => criteria.treatmentType) || []));

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load discharge planning protocols. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and Controls */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Discharge Planning & Criteria
              </CardTitle>
              <CardDescription>
                Evidence-based discharge criteria and transition planning protocols
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
            <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm font-medium">Discharge Criteria</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {dischargeCriteria?.length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Active Protocols</p>
                <p className="text-2xl font-bold text-green-600">
                  {dischargeCriteria?.filter(c => c.isActive).length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Planned Admissions</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dischargeCriteria?.filter(c => c.admissionType === 'planned').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Education Complete</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dischargeCriteria?.filter(c => c.patientEducationCompleted && c.caregiverEducationCompleted).length || 0}
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

            <Select value={selectedTreatmentType} onValueChange={setSelectedTreatmentType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Treatment Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Treatment Types</SelectItem>
                {treatmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(selectedCancerType || selectedTreatmentType) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCancerType('');
                  setSelectedTreatmentType('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Discharge Criteria */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading discharge criteria...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {dischargeCriteria?.map(criteria => (
            <Card key={criteria.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <div>
                      <CardTitle className="text-lg">{criteria.criteriaName}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge className={admissionTypeColors[criteria.admissionType as keyof typeof admissionTypeColors]}>
                          {criteria.admissionType.toUpperCase()}
                        </Badge>
                        <span>•</span>
                        <span>{criteria.cancerType}</span>
                        <span>•</span>
                        <span>{criteria.treatmentType}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {criteria.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="stability">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Clinical Stability & Vital Signs
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-green-700 dark:text-green-300">Clinical Stability Criteria</h4>
                          <div className="space-y-2">
                            {criteria.clinicalStabilityCriteria.map((criterion, index) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{criterion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Vital Sign Requirements</h4>
                          <div className="space-y-2">
                            {Object.entries(criteria.vitalSignRequirements).map(([parameter, requirement]) => (
                              <div key={parameter} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-xs uppercase tracking-wide text-blue-600">
                                    {parameter.replace('_', ' ')}
                                  </span>
                                  <span className="text-sm font-mono">{requirement}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="laboratory">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Laboratory Requirements
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-purple-700 dark:text-purple-300">Required Tests</h4>
                          <div className="space-y-2">
                            {criteria.laboratoryRequirements.required.map((test, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                                <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
                                <span className="text-sm">{test}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-orange-700 dark:text-orange-300">Acceptable Ranges</h4>
                          <div className="space-y-2">
                            {Object.entries(criteria.laboratoryRequirements.acceptable_ranges).map(([test, range]) => (
                              <div key={test} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-400">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-xs uppercase tracking-wide text-orange-600">
                                    {test.replace('_', ' ')}
                                  </span>
                                  <span className="text-sm font-mono">{range}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="functional">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Functional & Social Requirements
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Symptom Control</h4>
                          <div className="space-y-2">
                            {criteria.symptomControl.map((symptom, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                <span className="text-sm">{symptom}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-green-700 dark:text-green-300">Functional Status</h4>
                          <div className="space-y-2">
                            {criteria.functionalStatus.map((status, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                <Users className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm">{status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-purple-700 dark:text-purple-300">Social Requirements</h4>
                          <div className="space-y-2">
                            {criteria.socialRequirements.map((requirement, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                                <Home className="h-4 w-4 text-purple-600 flex-shrink-0" />
                                <span className="text-sm">{requirement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="care-management">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Home Care & Medication Management
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-teal-700 dark:text-teal-300">Home Care Criteria</h4>
                          <div className="space-y-2">
                            {criteria.homeCareCriteria.map((criterion, index) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border-l-4 border-teal-400">
                                <Home className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{criterion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-indigo-700 dark:text-indigo-300">Medication Management</h4>
                          <div className="space-y-2">
                            {criteria.medicationManagement.map((management, index) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-400">
                                <Pill className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{management}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="follow-up">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Follow-up & Education
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Follow-up Arrangements</h4>
                          <div className="space-y-2">
                            {criteria.followUpArrangements.map((arrangement, index) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                                <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{arrangement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-3 text-red-700 dark:text-red-300">Red Flag Symptoms</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {criteria.redFlagSymptoms.map((symptom, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                <span className="text-sm">{symptom}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-sm text-green-700 dark:text-green-300">Patient Education</span>
                            </div>
                            <Badge variant={criteria.patientEducationCompleted ? "default" : "secondary"} className="text-xs">
                              {criteria.patientEducationCompleted ? 'Completed' : 'Pending'}
                            </Badge>
                          </div>
                          
                          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-orange-600" />
                              <span className="font-medium text-sm text-orange-700 dark:text-orange-300">Caregiver Education</span>
                            </div>
                            <Badge variant={criteria.caregiverEducationCompleted ? "default" : "secondary"} className="text-xs">
                              {criteria.caregiverEducationCompleted ? 'Completed' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>NCCN: {criteria.nccnReference}</span>
                  <Badge variant="outline" className="text-xs">
                    {criteria.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {!dischargeCriteria || dischargeCriteria.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No discharge criteria found for the selected filters.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  setSelectedCancerType('');
                  setSelectedTreatmentType('');
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
