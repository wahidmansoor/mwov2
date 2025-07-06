import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Bed, Users, AlertTriangle, Clock, CheckCircle2, Info } from 'lucide-react';

interface AdmissionCriteria {
  id: string;
  criteriaName: string;
  cancerType: string;
  admissionType: string;
  clinicalIndications: string[];
  exclusionCriteria: string[];
  riskFactors: string[];
  requiredAssessments: string[];
  nccnReference: string;
  evidenceLevel: string;
  priority: string;
  estimatedLOS: number;
  specialRequirements: string[];
}

export const AdmissionProtocols: React.FC = () => {
  const [selectedCancerType, setSelectedCancerType] = useState<string>("");
  const [selectedAdmissionType, setSelectedAdmissionType] = useState<string>("");

  const { data: admissionCriteria, isLoading } = useQuery({
    queryKey: ['/api/inpatient/admission-criteria', selectedCancerType, selectedAdmissionType],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCancerType) params.append('cancerType', selectedCancerType);
      if (selectedAdmissionType) params.append('admissionType', selectedAdmissionType);
      
      const response = await fetch(`/api/inpatient/admission-criteria?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch admission criteria');
      }
      return response.json();
    },
    initialData: []
  });

  const uniqueCancerTypes = [...new Set(admissionCriteria?.map((criteria: AdmissionCriteria) => criteria.cancerType) || [])];
  const uniqueAdmissionTypes = [...new Set(admissionCriteria?.map((criteria: AdmissionCriteria) => criteria.admissionType) || [])];

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'bg-medical-orange';
      case 'emergent': return 'bg-red-500';
      case 'standard': return 'bg-medical-blue';
      default: return 'bg-slate-500';
    }
  };

  const getAdmissionIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'emergency': return AlertTriangle;
      case 'urgent': return Clock;
      case 'planned': return CheckCircle2;
      default: return Bed;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
          <Bed className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admission Protocols</h2>
          <p className="text-slate-600 dark:text-slate-400">Evidence-based admission criteria and assessment workflows</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cancer Type</label>
          <Select value={selectedCancerType} onValueChange={setSelectedCancerType}>
            <SelectTrigger>
              <SelectValue placeholder="Select cancer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cancer Types</SelectItem>
              {uniqueCancerTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Admission Type</label>
          <Select value={selectedAdmissionType} onValueChange={setSelectedAdmissionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select admission type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Admission Types</SelectItem>
              {uniqueAdmissionTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-blue mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Loading admission protocols...</p>
        </div>
      )}

      {/* Admission Criteria Cards */}
      <div className="grid gap-6">
        {admissionCriteria?.map((criteria: AdmissionCriteria) => {
          const IconComponent = getAdmissionIcon(criteria.admissionType);
          
          return (
            <Card key={criteria.id} className="shadow-sm border border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(criteria.priority)}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{criteria.criteriaName}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <span>{criteria.cancerType}</span>
                        <span>•</span>
                        <span className="capitalize">{criteria.admissionType}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`${getPriorityColor(criteria.priority)} text-white border-0`}>
                      {criteria.priority}
                    </Badge>
                    {criteria.estimatedLOS && (
                      <Badge variant="secondary">
                        {criteria.estimatedLOS} days LOS
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Clinical Indications */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Clinical Indications</h4>
                  <div className="grid gap-2">
                    {criteria.clinicalIndications?.map((indication, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-medical-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{indication}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Assessments */}
                {criteria.requiredAssessments?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Assessments</h4>
                    <div className="grid gap-2">
                      {criteria.requiredAssessments.map((assessment, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Users className="w-4 h-4 text-medical-blue mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{assessment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Factors */}
                {criteria.riskFactors?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Risk Factors</h4>
                    <div className="grid gap-2">
                      {criteria.riskFactors.map((factor, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-medical-orange mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Requirements */}
                {criteria.specialRequirements?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Special Requirements</h4>
                    <div className="grid gap-2">
                      {criteria.specialRequirements.map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Info className="w-4 h-4 text-medical-purple mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exclusion Criteria */}
                {criteria.exclusionCriteria?.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-red-600">Exclusion Criteria</h4>
                      <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700 dark:text-red-300">
                          <div className="space-y-1">
                            {criteria.exclusionCriteria.map((exclusion, index) => (
                              <div key={index}>• {exclusion}</div>
                            ))}
                          </div>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </>
                )}

                {/* NCCN Reference */}
                {criteria.nccnReference && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{criteria.evidenceLevel}</Badge>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        NCCN Reference: {criteria.nccnReference}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {!isLoading && (!admissionCriteria || admissionCriteria.length === 0) && (
        <Card className="text-center py-8">
          <CardContent>
            <Bed className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Admission Criteria Found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your filters or contact support for additional protocols.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
