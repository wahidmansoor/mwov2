// MIGRATED COMPONENT - Example of proper client-server linking
// This replaces the old direct Supabase usage with proper API calls

import { 
  useCdProtocolsByTumourGroup, 
  useAdmissionCriteriaByCancerType,
  usePalliativeSymptomProtocolsByCategory 
} from '../../hooks/useApi.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Alert, AlertDescription } from '../ui/alert.jsx';

interface ClinicalDataDashboardProps {
  tumourGroup?: string;
  cancerType?: string;
  palliativeCategory?: string;
}

export function ClinicalDataDashboard({ 
  tumourGroup = 'Lung', 
  cancerType = 'lung',
  palliativeCategory = 'Pain'
}: ClinicalDataDashboardProps) {
  // ✅ GOOD: Using proper API hooks instead of direct Supabase calls
  const { 
    data: cdProtocols, 
    isLoading: protocolsLoading, 
    error: protocolsError 
  } = useCdProtocolsByTumourGroup(tumourGroup, 10);

  const { 
    data: admissionCriteria, 
    isLoading: admissionLoading, 
    error: admissionError 
  } = useAdmissionCriteriaByCancerType(cancerType, 10);

  const { 
    data: palliativeProtocols, 
    isLoading: palliativeLoading, 
    error: palliativeError 
  } = usePalliativeSymptomProtocolsByCategory(palliativeCategory, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* CD Protocols Section */}
      <Card>
        <CardHeader>
          <CardTitle>CD Protocols - {tumourGroup}</CardTitle>
        </CardHeader>
        <CardContent>
          {protocolsLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          )}
          
          {protocolsError && (
            <Alert>
              <AlertDescription>
                Error loading protocols: {protocolsError.message}
              </AlertDescription>
            </Alert>
          )}
          
          {cdProtocols?.items && (
            <div className="space-y-3">
              {cdProtocols.items.map((protocol: any) => (
                <div key={protocol.id} className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium">{protocol.code}</h4>
                  <p className="text-sm text-gray-600">{protocol.treatment_intent}</p>
                  <p className="text-xs text-gray-500 truncate">{protocol.summary}</p>
                </div>
              ))}
              
              {cdProtocols.items.length === 0 && (
                <p className="text-gray-500">No protocols found for {tumourGroup}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admission Criteria Section */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Criteria - {cancerType}</CardTitle>
        </CardHeader>
        <CardContent>
          {admissionLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          )}
          
          {admissionError && (
            <Alert>
              <AlertDescription>
                Error loading admission criteria: {admissionError.message}
              </AlertDescription>
            </Alert>
          )}
          
          {admissionCriteria?.items && (
            <div className="space-y-3">
              {admissionCriteria.items.map((criteria: any) => (
                <div key={criteria.id} className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium">{criteria.criteria_name}</h4>
                  <p className="text-sm text-gray-600">{criteria.admission_type}</p>
                  {criteria.priority && (
                    <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                      {criteria.priority}
                    </span>
                  )}
                </div>
              ))}
              
              {admissionCriteria.items.length === 0 && (
                <p className="text-gray-500">No admission criteria found for {cancerType}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Palliative Protocols Section */}
      <Card>
        <CardHeader>
          <CardTitle>Palliative Protocols - {palliativeCategory}</CardTitle>
        </CardHeader>
        <CardContent>
          {palliativeLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          )}
          
          {palliativeError && (
            <Alert>
              <AlertDescription>
                Error loading palliative protocols: {palliativeError.message}
              </AlertDescription>
            </Alert>
          )}
          
          {palliativeProtocols?.items && (
            <div className="space-y-3">
              {palliativeProtocols.items.map((protocol: any) => (
                <div key={protocol.id} className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-medium">{protocol.title}</h4>
                  <p className="text-sm text-gray-600">{protocol.category}</p>
                  <p className="text-xs text-gray-500">{protocol.evidence}</p>
                  {protocol.tags && protocol.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {protocol.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span key={index} className="inline-block px-1 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {palliativeProtocols.items.length === 0 && (
                <p className="text-gray-500">No palliative protocols found for {palliativeCategory}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ClinicalDataDashboard;
