import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMonitoringParameters } from '@/lib/hooks/useInpatientData';
import { Activity, Monitor, TrendingUp, AlertTriangle, Clock, Download, Filter, RefreshCw, Target, Stethoscope, FileText, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const MonitoringWorkflows = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCancerType, setSelectedCancerType] = useState<string>('');
  
  const { data: monitoringParameters, isLoading, error, refetch } = useMonitoringParameters({
    category: selectedCategory || undefined,
    cancerType: selectedCancerType || undefined
  });

  const categoryColors = {
    vital_signs: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
    labs: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    symptoms: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
    performance: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300'
  };

  const categoryIcons = {
    vital_signs: Activity,
    labs: Monitor,
    symptoms: Stethoscope,
    performance: TrendingUp
  };

  const cancerTypes = Array.from(new Set(monitoringParameters?.map(param => param.cancerType) || []));
  const categories = ['vital_signs', 'labs', 'symptoms', 'performance'];

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load monitoring protocols. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and Controls */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Monitoring Workflows & Parameters
              </CardTitle>
              <CardDescription>
                Evidence-based monitoring protocols for inpatient oncology care
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
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Parameters</p>
                <p className="text-2xl font-bold text-green-600">
                  {monitoringParameters?.length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Monitor className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium">Vital Signs</p>
                <p className="text-2xl font-bold text-red-600">
                  {monitoringParameters?.filter(p => p.category === 'vital_signs').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Lab Parameters</p>
                <p className="text-2xl font-bold text-blue-600">
                  {monitoringParameters?.filter(p => p.category === 'labs').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Bell className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Critical Alerts</p>
                <p className="text-2xl font-bold text-orange-600">
                  {monitoringParameters?.filter(p => Object.keys(p.criticalValues).length > 0).length || 0}
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
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

            {(selectedCategory || selectedCancerType) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedCancerType('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Parameters */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading monitoring parameters...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {monitoringParameters?.map(parameter => {
            const CategoryIcon = categoryIcons[parameter.category as keyof typeof categoryIcons];
            
            return (
              <Card key={parameter.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <CardTitle className="text-lg">{parameter.parameterName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge className={categoryColors[parameter.category as keyof typeof categoryColors]}>
                            {parameter.category.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span>•</span>
                          <span>{parameter.cancerType}</span>
                          <span>•</span>
                          <span>{parameter.treatmentPhase}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{parameter.frequency}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="ranges-thresholds">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Normal Ranges & Thresholds
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-green-700 dark:text-green-300">Normal Range</h4>
                            <div className="space-y-2">
                              {Object.entries(parameter.normalRange).map(([key, value]) => (
                                <div key={key} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-xs uppercase tracking-wide text-green-600">
                                      {key.replace('_', ' ')}
                                    </span>
                                    <span className="text-sm font-mono">{value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-yellow-700 dark:text-yellow-300">Alert Thresholds</h4>
                            <div className="space-y-2">
                              {Object.entries(parameter.alertThresholds).map(([key, value]) => (
                                <div key={key} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-xs uppercase tracking-wide text-yellow-600">
                                      {key.replace('_', ' ')}
                                    </span>
                                    <span className="text-sm font-mono">{value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-red-700 dark:text-red-300">Critical Values</h4>
                            <div className="space-y-2">
                              {Object.entries(parameter.criticalValues).map(([key, value]) => (
                                <div key={key} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-xs uppercase tracking-wide text-red-600">
                                      {key.replace('_', ' ')}
                                    </span>
                                    <span className="text-sm font-mono">{value}</span>
                                  </div>
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
                          <AlertTriangle className="h-4 w-4" />
                          Required Actions & Protocols
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {Object.entries(parameter.actionRequired).map(([threshold, actions]) => (
                            <div key={threshold} className="space-y-2">
                              <h4 className="font-medium text-sm text-orange-700 dark:text-orange-300">
                                Actions for {threshold.replace('_', ' ').charAt(0).toUpperCase() + threshold.slice(1)}
                              </h4>
                              <div className="space-y-2">
                                {actions.map((action, index) => (
                                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-400">
                                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                      {index + 1}
                                    </span>
                                    <span className="text-sm">{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="protocols">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Nursing & Documentation Protocols
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Nursing Protocol</h4>
                            <div className="space-y-2">
                              {Object.entries(parameter.nursingProtocol).map(([key, value]) => (
                                <div key={key} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                  <h5 className="font-medium text-xs uppercase tracking-wide text-blue-600 mb-2">
                                    {key.replace('_', ' ')}
                                  </h5>
                                  <p className="text-sm">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-purple-700 dark:text-purple-300">Physician Notification</h4>
                            <div className="space-y-2">
                              {Object.entries(parameter.physicianNotification).map(([key, value]) => (
                                <div key={key} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                                  <h5 className="font-medium text-xs uppercase tracking-wide text-purple-600 mb-2">
                                    {key.replace('_', ' ')}
                                  </h5>
                                  <p className="text-sm">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {parameter.equipmentRequired.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Required Equipment</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {parameter.equipmentRequired.map((equipment, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                  <Monitor className="h-4 w-4 text-gray-600 flex-shrink-0" />
                                  <span className="text-sm">{equipment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {parameter.specialInstructions && (
                          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200">
                            <h4 className="font-medium text-sm mb-2 text-indigo-700 dark:text-indigo-300">Special Instructions</h4>
                            <p className="text-sm text-indigo-800 dark:text-indigo-200">{parameter.specialInstructions}</p>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Documentation Required: {parameter.documentationRequired ? 'Yes' : 'No'}</span>
                    <span>NCCN: {parameter.nccnReference}</span>
                    <Badge variant="outline" className="text-xs">
                      {parameter.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {!monitoringParameters || monitoringParameters.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No monitoring parameters found for the selected criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedCancerType('');
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
