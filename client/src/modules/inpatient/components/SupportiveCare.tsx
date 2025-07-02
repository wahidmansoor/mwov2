import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupportiveCareProtocols } from '@/lib/hooks/useInpatientData';
import { Heart, Pill, Shield, AlertTriangle, Target, Download, Filter, RefreshCw, ChevronRight, Users, BookOpen, TrendingUp, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const SupportiveCare = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCancerType, setSelectedCancerType] = useState<string>('');
  
  const { data: supportiveProtocols, isLoading, error, refetch } = useSupportiveCareProtocols({
    category: selectedCategory || undefined,
    cancerType: selectedCancerType || undefined
  });

  const categoryColors = {
    'pain_management': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
    'nausea': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    'infection_prevention': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    'nutritional_support': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
    'psychosocial': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
    'fatigue': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300'
  };

  const categoryIcons = {
    'pain_management': Shield,
    'nausea': Pill,
    'infection_prevention': Target,
    'nutritional_support': Heart,
    'psychosocial': Users,
    'fatigue': TrendingUp
  };

  const cancerTypes = Array.from(new Set(supportiveProtocols?.map(protocol => protocol.cancerType) || []));
  const categories = Object.keys(categoryColors);

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load supportive care protocols. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and Controls */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-600" />
                Supportive Care Protocols
              </CardTitle>
              <CardDescription>
                Evidence-based supportive care interventions and quality of life protocols
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
            <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Heart className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Protocols</p>
                <p className="text-2xl font-bold text-purple-600">
                  {supportiveProtocols?.length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium">Pain Management</p>
                <p className="text-2xl font-bold text-red-600">
                  {supportiveProtocols?.filter(p => p.category === 'pain_management').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Pill className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Nausea Control</p>
                <p className="text-2xl font-bold text-green-600">
                  {supportiveProtocols?.filter(p => p.category === 'nausea').length || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Infection Prevention</p>
                <p className="text-2xl font-bold text-blue-600">
                  {supportiveProtocols?.filter(p => p.category === 'infection_prevention').length || 0}
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
                <SelectItem value="">All Categories</SelectItem>
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
                <SelectItem value="">All Cancer Types</SelectItem>
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

      {/* Supportive Care Protocols */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading supportive care protocols...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {supportiveProtocols?.map(protocol => {
            const CategoryIcon = categoryIcons[protocol.category as keyof typeof categoryIcons];
            
            return (
              <Card key={protocol.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-5 w-5 text-purple-600" />
                      <div>
                        <CardTitle className="text-lg">{protocol.protocolName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge className={categoryColors[protocol.category as keyof typeof categoryColors]}>
                            {protocol.category.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span>•</span>
                          <span>{protocol.cancerType}</span>
                          <span>•</span>
                          <span>{protocol.treatmentPhase}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{protocol.evidenceLevel}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm"><strong>Indication:</strong> {protocol.indication}</p>
                    <p className="text-sm mt-1"><strong>Patient Population:</strong> {protocol.patientPopulation}</p>
                  </div>

                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="interventions">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4" />
                          Interventions & Medications
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Pharmacological Interventions</h4>
                            <div className="space-y-2">
                              {protocol.interventions.pharmacological.map((intervention, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <Pill className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{intervention}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-green-700 dark:text-green-300">Non-Pharmacological Interventions</h4>
                            <div className="space-y-2">
                              {protocol.interventions.non_pharmacological.map((intervention, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                  <Heart className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{intervention}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {Object.keys(protocol.medications).length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-medium text-sm mb-3 text-purple-700 dark:text-purple-300">Medication Details</h4>
                            <div className="space-y-3">
                              {Object.entries(protocol.medications).map(([key, value]) => (
                                <div key={key} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-400">
                                  <h5 className="font-medium text-xs uppercase tracking-wide text-purple-600 mb-2">
                                    {key.replace('_', ' ')}
                                  </h5>
                                  <div className="text-sm">
                                    {typeof value === 'string' ? value : JSON.stringify(value)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="monitoring">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Monitoring & Outcomes
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-blue-700 dark:text-blue-300">Monitoring Protocol</h4>
                            <div className="space-y-2">
                              {protocol.monitoringProtocol.map((item, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                  <Target className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-green-700 dark:text-green-300">Expected Outcomes</h4>
                            <div className="space-y-2">
                              {protocol.expectedOutcomes.map((outcome, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                  <Star className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="adjustments">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Adjustments & Escalation
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-yellow-700 dark:text-yellow-300">Adjustment Criteria</h4>
                            <div className="space-y-2">
                              {protocol.adjustmentCriteria.map((criteria, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                                  <ChevronRight className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{criteria}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-red-700 dark:text-red-300">Escalation Criteria</h4>
                            <div className="space-y-2">
                              {protocol.escalationCriteria.map((criteria, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{criteria}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium text-sm mb-3 text-orange-700 dark:text-orange-300">Consultation Triggers</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {protocol.consultationTriggers.map((trigger, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                                <Users className="h-4 w-4 text-orange-600 flex-shrink-0" />
                                <span className="text-sm">{trigger}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="education">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Patient & Caregiver Education
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-indigo-700 dark:text-indigo-300">Patient Education</h4>
                            <div className="space-y-2">
                              {protocol.patientEducation.map((education, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                                  <BookOpen className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{education}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-teal-700 dark:text-teal-300">Caregiver Instructions</h4>
                            <div className="space-y-2">
                              {protocol.caregiverInstructions.map((instruction, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 bg-teal-50 dark:bg-teal-900/20 rounded">
                                  <Users className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm">{instruction}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium text-sm mb-3 text-pink-700 dark:text-pink-300">Quality of Life Considerations</h4>
                          <div className="space-y-2">
                            {protocol.qualityOfLifeConsiderations.map((consideration, index) => (
                              <div key={index} className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border-l-4 border-pink-400">
                                <span className="text-sm">{consideration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Evidence Level: {protocol.evidenceLevel}</span>
                    <span>NCCN: {protocol.nccnReference}</span>
                    <Badge variant="outline" className="text-xs">
                      {protocol.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {!supportiveProtocols || supportiveProtocols.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No supportive care protocols found for the selected criteria.</p>
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
