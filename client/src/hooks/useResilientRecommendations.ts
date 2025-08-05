import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TreatmentSelectionCriteria, RecommendationResult } from '../modules/cdu/TreatmentPlanSelector/types';

interface UseResilientRecommendationsOptions {
  criteria: TreatmentSelectionCriteria;
  enabled?: boolean;
}

interface CircuitBreakerState {
  failures: number;
  lastFailure: number;
  state: 'closed' | 'open' | 'half-open';
}

interface RecommendationResponse {
  data: RecommendationResult | null;
  isLoading: boolean;
  error: Error | null;
  source: 'api' | 'cache' | 'fallback' | 'offline';
  confidence: number;
  fallbackUsed: boolean;
  retryCount: number;
  isOffline: boolean;
}

const CIRCUIT_BREAKER_THRESHOLD = 5;
const CIRCUIT_BREAKER_TIMEOUT = 60000; // 1 minute
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff

// Circuit breaker state management
let circuitBreaker: CircuitBreakerState = {
  failures: 0,
  lastFailure: 0,
  state: 'closed'
};

// Offline detection
const getNetworkStatus = (): boolean => {
  return navigator.onLine && !window.location.hostname.includes('offline');
};

// Exponential backoff retry function
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const shouldAllowRequest = (): boolean => {
  const now = Date.now();
  
  switch (circuitBreaker.state) {
    case 'closed':
      return true;
    case 'open':
      if (now - circuitBreaker.lastFailure > CIRCUIT_BREAKER_TIMEOUT) {
        circuitBreaker.state = 'half-open';
        return true;
      }
      return false;
    case 'half-open':
      return true;
    default:
      return true;
  }
};

const recordSuccess = (): void => {
  circuitBreaker.failures = 0;
  circuitBreaker.state = 'closed';
};

const recordFailure = (): void => {
  circuitBreaker.failures++;
  circuitBreaker.lastFailure = Date.now();
  
  if (circuitBreaker.failures >= CIRCUIT_BREAKER_THRESHOLD) {
    circuitBreaker.state = 'open';
  }
};

// Enhanced API call with retry logic and timeout
const makeApiRequest = async (
  criteria: TreatmentSelectionCriteria,
  retryCount: number = 0
): Promise<{ data: any; source: string; responseTime: number }> => {
  const startTime = Date.now();
  
  if (!shouldAllowRequest()) {
    throw new Error('Circuit breaker is open - API temporarily unavailable');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch('/api/generate-recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cancerType: criteria.cancerType,
        histology: criteria.histology !== "all" ? criteria.histology : undefined,
        biomarkers: criteria.biomarkers,
        treatmentIntent: criteria.treatmentIntent !== "all" ? criteria.treatmentIntent : undefined,
        lineOfTreatment: criteria.treatmentLine !== "all" ? criteria.treatmentLine : undefined,
        stage: criteria.stage !== "all" ? criteria.stage : undefined,
        performanceStatus: criteria.performanceStatus || 1,
        sessionId: crypto.randomUUID(),
        requestTimestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const apiResponse = await response.json();
    recordSuccess();
    
    return {
      data: apiResponse,
      source: 'api',
      responseTime: Date.now() - startTime
    };

  } catch (error) {
    clearTimeout(timeoutId);
    recordFailure();

    // Retry with exponential backoff
    if (retryCount < MAX_RETRIES && error instanceof Error && !error.message.includes('aborted')) {
      console.warn(`API request failed, retrying... (${retryCount + 1}/${MAX_RETRIES})`, error.message);
      await delay(RETRY_DELAYS[retryCount]);
      return makeApiRequest(criteria, retryCount + 1);
    }

    throw error;
  }
};

// Local cache fallback
const getCachedRecommendations = async (criteria: TreatmentSelectionCriteria): Promise<any> => {
  try {
    const cacheKey = `recommendations-${JSON.stringify(criteria)}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache valid for 24 hours
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      }
    }
    
    return null;
  } catch (error) {
    console.warn('Cache retrieval failed:', error);
    return null;
  }
};

// Basic rule engine fallback
const getFallbackRecommendations = (criteria: TreatmentSelectionCriteria): RecommendationResult => {
  // Basic rule-based recommendations as absolute fallback
  const basicProtocols: Record<string, string[]> = {
    'Breast Cancer': ['AC-T (Doxorubicin/Cyclophosphamide → Paclitaxel)', 'TCH (Docetaxel, Carboplatin, Trastuzumab)'],
    'Non-Small Cell Lung Cancer': ['Carboplatin + Paclitaxel', 'Pembrolizumab monotherapy'],
    'Colorectal Cancer': ['FOLFOX (5-FU, Leucovorin, Oxaliplatin)', 'FOLFIRI (5-FU, Leucovorin, Irinotecan)'],
    'default': ['Standard of care protocol', 'Alternative standard protocol']
  };

  const protocols = basicProtocols[criteria.cancerType] || basicProtocols['default'];
  
  return {
    primary: {
      id: `fallback-${Date.now()}`,
      protocol: protocols[0],
      intent: criteria.treatmentIntent,
      guidelines: ['NCCN Guidelines (Fallback Mode)'],
      drugs: protocols[0].split(' + '),
      alerts: ['This is a fallback recommendation - verify with current guidelines'],
      aiScore: 0.5,
      biomarkerMatch: 0.3,
      personalizedReasoning: 'Fallback recommendation based on standard protocols. Please verify with current NCCN guidelines.',
      safetyFlags: ['Verify dosing and contraindications'],
      drugInteractions: [],
      clinicalWarnings: ['Limited data available - use clinical judgment'],
      evidenceLevel: 'Category 2B',
      nccnReferences: ['Fallback Mode'],
      expectedResponse: 'Variable - consult current guidelines',
      monitoringPlan: ['Standard monitoring per protocol']
    },
    alternatives: protocols.slice(1).map((protocol, index) => ({
      id: `fallback-alt-${Date.now()}-${index}`,
      protocol,
      intent: criteria.treatmentIntent,
      guidelines: ['NCCN Guidelines (Fallback Mode)'],
      drugs: protocol.split(' + '),
      alerts: ['Alternative fallback recommendation'],
      aiScore: 0.4,
      biomarkerMatch: 0.2,
      personalizedReasoning: 'Alternative fallback recommendation',
      safetyFlags: ['Verify appropriateness'],
      drugInteractions: [],
      clinicalWarnings: ['Limited data available'],
      evidenceLevel: 'Category 2B',
      nccnReferences: ['Fallback Mode'],
      expectedResponse: 'Variable',
      monitoringPlan: ['Standard monitoring']
    })),
    confidence: 0.3,
    evidence: 'Fallback mode - limited evidence available',
    alerts: ['System operating in fallback mode - verify recommendations independently'],
    fallbackUsed: true,
    fallbackNote: 'API unavailable - using basic rule engine',
    overallConfidence: 0.3,
    aiEnhanced: false
  };
};

// Cache successful responses
const cacheResponse = (criteria: TreatmentSelectionCriteria, data: any): void => {
  try {
    const cacheKey = `recommendations-${JSON.stringify(criteria)}`;
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Failed to cache response:', error);
  }
};

// Audit logging
const logDecision = async (
  criteria: TreatmentSelectionCriteria,
  result: any,
  source: string,
  responseTime: number,
  error?: Error
): Promise<void> => {
  try {
    const auditData = {
      sessionId: sessionStorage.getItem('session-id') || crypto.randomUUID(),
      criteria,
      apiResponse: error ? null : result,
      fallbackUsed: source !== 'api',
      recommendationSource: source,
      confidenceScore: result?.overallConfidence || 0,
      decisionRationale: result?.primary?.personalizedReasoning || 'N/A',
      errorDetails: error ? { message: error.message, stack: error.stack } : null,
      userAgent: navigator.userAgent,
      responseTimeMs: responseTime
    };

    // Send audit log to backend (fire and forget)
    fetch('/api/audit/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auditData)
    }).catch(console.warn);

    // Also store locally as backup
    const localAudit = JSON.parse(localStorage.getItem('decision-audit') || '[]');
    localAudit.push({ ...auditData, timestamp: new Date().toISOString() });
    // Keep only last 100 entries
    if (localAudit.length > 100) localAudit.splice(0, localAudit.length - 100);
    localStorage.setItem('decision-audit', JSON.stringify(localAudit));

  } catch (error) {
    console.warn('Failed to log decision:', error);
  }
};

export const useResilientRecommendations = ({
  criteria,
  enabled = true
}: UseResilientRecommendationsOptions): RecommendationResponse => {
  const [isOffline, setIsOffline] = useState(!getNetworkStatus());
  const [retryCount, setRetryCount] = useState(0);
  const queryClient = useQueryClient();

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queryKey = ['recommendations-resilient', criteria];

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: async (): Promise<{
      result: RecommendationResult;
      source: string;
      confidence: number;
      fallbackUsed: boolean;
    }> => {
      const startTime = Date.now();
      let source = 'api';
      let fallbackUsed = false;
      let result: RecommendationResult | null = null;

      // Skip API if criteria not complete
      if (criteria.cancerType === "all") {
        return {
          result: getFallbackRecommendations(criteria),
          source: 'fallback',
          confidence: 0.1,
          fallbackUsed: true
        };
      }

      try {
        // Phase 1: Try API first
        if (!isOffline) {
          try {
            const apiResult = await makeApiRequest(criteria, 0);
            source = apiResult.source;
            
            // Transform API response
            if (apiResult.data?.recommendations?.length > 0) {
              const primaryRec = apiResult.data.recommendations[0];
              result = {
                primary: {
                  id: primaryRec.id,
                  protocol: primaryRec.treatmentProtocol,
                  intent: criteria.treatmentIntent,
                  guidelines: [primaryRec.evidenceReference],
                  drugs: primaryRec.treatmentProtocol.split(' + '),
                  alerts: primaryRec.contraindications || [],
                  aiScore: primaryRec.confidenceScore,
                  biomarkerMatch: primaryRec.confidenceScore,
                  personalizedReasoning: primaryRec.reasoning,
                  safetyFlags: primaryRec.contraindications || [],
                  drugInteractions: [],
                  clinicalWarnings: [],
                  evidenceLevel: primaryRec.evidenceReference || 'Category 2B',
                  nccnReferences: [primaryRec.nccnReference],
                  expectedResponse: "Response varies by patient",
                  monitoringPlan: ["Regular monitoring per protocol"]
                },
                alternatives: apiResult.data.recommendations.slice(1, 3).map((rec: any) => ({
                  id: rec.id,
                  protocol: rec.treatmentProtocol,
                  intent: criteria.treatmentIntent,
                  guidelines: [rec.evidenceReference],
                  drugs: rec.treatmentProtocol.split(' + '),
                  alerts: rec.contraindications || [],
                  aiScore: rec.confidenceScore,
                  biomarkerMatch: rec.confidenceScore,
                  personalizedReasoning: rec.reasoning,
                  safetyFlags: rec.contraindications || [],
                  drugInteractions: [],
                  clinicalWarnings: [],
                  evidenceLevel: rec.evidenceReference || 'Category 2B',
                  nccnReferences: [rec.nccnReference],
                  expectedResponse: "Response varies by patient",
                  monitoringPlan: ["Regular monitoring per protocol"]
                })),
                confidence: apiResult.data.overallConfidence || 0.8,
                evidence: 'NCCN-aligned protocols with AI enhancement',
                alerts: [],
                fallbackUsed: apiResult.data.fallbackUsed || false,
                fallbackNote: apiResult.data.fallbackNote,
                overallConfidence: apiResult.data.overallConfidence || 0.8,
                aiEnhanced: apiResult.data.aiEnhanced || true
              };

              // Cache successful response
              cacheResponse(criteria, result);
            }

            await logDecision(criteria, result, source, Date.now() - startTime);
            
            if (result) {
              return {
                result,
                source,
                confidence: result.confidence,
                fallbackUsed: result.fallbackUsed || false
              };
            }
          } catch (apiError) {
            console.warn('API request failed, trying cache:', apiError);
            setRetryCount(prev => prev + 1);
          }
        }

        // Phase 2: Try cache
        const cachedResult = await getCachedRecommendations(criteria);
        if (cachedResult) {
          source = 'cache';
          result = cachedResult;
          
          await logDecision(criteria, result, source, Date.now() - startTime);
          
          return {
            result,
            source,
            confidence: result.confidence * 0.8, // Reduce confidence for cached data
            fallbackUsed: false
          };
        }

        // Phase 3: Fallback to basic rules
        source = 'fallback';
        fallbackUsed = true;
        result = getFallbackRecommendations(criteria);
        
        await logDecision(criteria, result, source, Date.now() - startTime);
        
        return {
          result,
          source,
          confidence: 0.3,
          fallbackUsed: true
        };

      } catch (error) {
        console.error('All recommendation sources failed:', error);
        
        // Final fallback
        result = getFallbackRecommendations(criteria);
        source = 'offline';
        fallbackUsed = true;
        
        await logDecision(criteria, result, source, Date.now() - startTime, error as Error);
        
        return {
          result,
          source,
          confidence: 0.1,
          fallbackUsed: true
        };
      }
    },
    enabled: enabled && criteria.cancerType !== "all",
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: false, // Handle retries manually
    refetchOnWindowFocus: false,
    refetchOnReconnect: true
  });

  const retry = useCallback(() => {
    setRetryCount(0);
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  const workOffline = useCallback(() => {
    setIsOffline(true);
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  return {
    data: data?.result || null,
    isLoading,
    error: error as Error | null,
    source: data?.source || 'unknown',
    confidence: data?.confidence || 0,
    fallbackUsed: data?.fallbackUsed || false,
    retryCount,
    isOffline,
    retry,
    workOffline
  } as RecommendationResponse & { retry: () => void; workOffline: () => void };
};