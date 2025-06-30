/**
 * Enhanced OPD Module - 3-Tab Interface with Advanced Clinical Decision Support
 * Implements improved UI/UX, cancer-specific AI prompts, and dynamic risk assessment
 */

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Shield, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  User,
  Activity,
  Brain,
  TrendingUp,
  Zap,
  FileText
} from "lucide-react";

import { QuickActionPanel } from "./components/QuickActionPanel";
import { RiskCalculationEngine, PatientProfile, RiskAssessmentResult } from "./services/RiskCalculationEngine";
import { SymptomAnalysisEngine, SymptomData, SymptomAnalysisResult } from "./services/SymptomAnalysisEngine";
import { getCancerSpecificPrompt } from "./prompts/CancerSpecificPrompts";

interface OPDModuleState {
  currentTab: string;
  patientProfile: Partial<PatientProfile>;
  symptoms: SymptomData[];
  riskAssessment: RiskAssessmentResult | null;
  symptomAnalysis: SymptomAnalysisResult | null;
  selectedCancerType: string;
  screeningRecommendations: any[];
  aiRecommendations: any[];
  isLoading: boolean;
  error: string | null;
}

export function OPDModuleEnhanced() {
  const [state, setState] = useState<OPDModuleState>({
    currentTab: 'risk-assessment',
    patientProfile: {
      demographics: { age: 0, gender: 'female', race: '', ethnicity: '' },
      familyHistory: { firstDegreeRelatives: [], secondDegreeRelatives: [], consanguinity: false },
      personalHistory: { priorCancers: [], benignConditions: [], surgicalHistory: [] },
      lifestyle: { smokingStatus: 'never', alcoholUse: 'none', physicalActivity: 'moderate', diet: 'average', bmi: 0 },
      medical: { comorbidities: [], medications: [], immunosuppression: false },
      environmental: { occupationalExposures: [], radiationExposure: false, chemicalExposures: [], geographicFactors: [] },
      genetic: { knownMutations: [] }
    },
    symptoms: [],
    riskAssessment: null,
    symptomAnalysis: null,
    selectedCancerType: 'breast',
    screeningRecommendations: [],
    aiRecommendations: [],
    isLoading: false,
    error: null
  });

  const riskEngine = new RiskCalculationEngine();
  const symptomEngine = new SymptomAnalysisEngine();

  const handleRiskAssessment = useCallback(async () => {
    if (!state.patientProfile.demographics?.age) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      let result: RiskAssessmentResult;
      
      switch (state.selectedCancerType) {
        case 'breast':
          result = riskEngine.calculateBreastCancerRisk(state.patientProfile as PatientProfile);
          break;
        case 'colon':
          result = riskEngine.calculateColonCancerRisk(state.patientProfile as PatientProfile);
          break;
        case 'lung':
          result = riskEngine.calculateLungCancerRisk(state.patientProfile as PatientProfile);
          break;
        default:
          result = riskEngine.calculateBreastCancerRisk(state.patientProfile as PatientProfile);
      }

      setState(prev => ({ 
        ...prev, 
        riskAssessment: result, 
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Risk assessment failed. Please check patient data.', 
        isLoading: false 
      }));
    }
  }, [state.patientProfile, state.selectedCancerType, riskEngine]);

  const handleSymptomAnalysis = useCallback(async () => {
    if (state.symptoms.length === 0) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = symptomEngine.analyzeSymptoms(state.symptoms);
      setState(prev => ({ 
        ...prev, 
        symptomAnalysis: result, 
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Symptom analysis failed. Please check symptom data.', 
        isLoading: false 
      }));
    }
  }, [state.symptoms, symptomEngine]);

  const generateAIRecommendations = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const context = {
        demographics: state.patientProfile.demographics,
        riskFactors: state.riskAssessment?.contributingFactors || [],
        symptoms: state.symptoms.map(s => s.name).join(', '),
        familyHistory: state.patientProfile.familyHistory
      };

      const prompt = getCancerSpecificPrompt(state.selectedCancerType, 'basePrompt', context);
      
      // Here you would call your AI service
      // const aiResponse = await aiService.query(prompt, context);
      
      // Mock response for now
      const mockRecommendations = [
        {
          type: 'screening',
          recommendation: `NCCN-compliant ${state.selectedCancerType} cancer screening based on risk level`,
          evidenceLevel: 'Category 1',
          confidence: 85
        }
      ];

      setState(prev => ({ 
        ...prev, 
        aiRecommendations: mockRecommendations, 
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'AI recommendations failed to generate.', 
        isLoading: false 
      }));
    }
  }, [state.patientProfile, state.riskAssessment, state.symptoms, state.selectedCancerType]);

  const updatePatientProfile = (field: string, value: any) => {
    setState(prev => ({
      ...prev,
      patientProfile: {
        ...prev.patientProfile,
        [field]: value
      }
    }));
  };

  const addSymptom = (symptom: SymptomData) => {
    setState(prev => ({
      ...prev,
      symptoms: [...prev.symptoms, symptom]
    }));
  };

  const getPatientContext = () => ({
    hasSymptoms: state.symptoms.length > 0,
    riskLevel: state.riskAssessment?.riskCategory || 'low' as const,
    age: state.patientProfile.demographics?.age || 0,
    urgentFlags: state.symptomAnalysis?.redFlagAssessment.redFlagSymptoms || []
  });

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Enhanced OPD Module</h1>
            <p className="text-gray-600 dark:text-gray-400">
              AI-Powered Cancer Screening & Risk Assessment Platform
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">
              Patient: {state.patientProfile.demographics?.age ? 
                `${state.patientProfile.demographics.age}y ${state.patientProfile.demographics.gender}` : 
                'Not specified'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="text-sm">Cancer Type: {state.selectedCancerType}</span>
          </div>
          {state.riskAssessment && (
            <Badge variant={
              state.riskAssessment.riskCategory === 'high' || state.riskAssessment.riskCategory === 'very-high' 
                ? 'destructive' 
                : state.riskAssessment.riskCategory === 'moderate' 
                  ? 'default' 
                  : 'secondary'
            }>
              {state.riskAssessment.riskCategory} risk
            </Badge>
          )}
          {state.symptomAnalysis?.redFlagAssessment.hasRedFlags && (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Red flags detected
            </Badge>
          )}
        </div>
      </div>

      {state.error && (
        <Alert className="mb-4" variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <Tabs 
        value={state.currentTab} 
        onValueChange={(tab) => setState(prev => ({ ...prev, currentTab: tab }))}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="risk-assessment" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Risk Assessment
          </TabsTrigger>
          <TabsTrigger value="screening-guidance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Screening Guidance
          </TabsTrigger>
          <TabsTrigger value="educational-resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Educational Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk-assessment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Patient Information Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
                <CardDescription>
                  Enter patient demographics and risk factors for comprehensive assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Age</label>
                    <Input
                      type="number"
                      placeholder="Age"
                      value={state.patientProfile.demographics?.age || ''}
                      onChange={(e) => updatePatientProfile('demographics', {
                        ...state.patientProfile.demographics,
                        age: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <Select
                      value={state.patientProfile.demographics?.gender || ''}
                      onValueChange={(value) => updatePatientProfile('demographics', {
                        ...state.patientProfile.demographics,
                        gender: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Cancer Type Focus</label>
                  <Select
                    value={state.selectedCancerType}
                    onValueChange={(value) => setState(prev => ({ ...prev, selectedCancerType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cancer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breast">Breast Cancer</SelectItem>
                      <SelectItem value="colon">Colorectal Cancer</SelectItem>
                      <SelectItem value="lung">Lung Cancer</SelectItem>
                      <SelectItem value="prostate">Prostate Cancer</SelectItem>
                      <SelectItem value="pancreatic">Pancreatic Cancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">BMI</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="BMI"
                      value={state.patientProfile.lifestyle?.bmi || ''}
                      onChange={(e) => updatePatientProfile('lifestyle', {
                        ...state.patientProfile.lifestyle,
                        bmi: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Smoking Status</label>
                    <Select
                      value={state.patientProfile.lifestyle?.smokingStatus || ''}
                      onValueChange={(value) => updatePatientProfile('lifestyle', {
                        ...state.patientProfile.lifestyle,
                        smokingStatus: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="former">Former</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleRiskAssessment}
                  disabled={state.isLoading || !state.patientProfile.demographics?.age}
                  className="w-full"
                >
                  {state.isLoading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Calculating Risk...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Calculate Risk Assessment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Risk Assessment Results */}
            {state.riskAssessment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Risk Assessment Results
                  </CardTitle>
                  <CardDescription>
                    AI-powered risk stratification with evidence-based recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold mb-2">
                      {(state.riskAssessment.overallRisk * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Lifetime Risk
                    </div>
                    <Badge 
                      variant={
                        state.riskAssessment.riskCategory === 'high' || state.riskAssessment.riskCategory === 'very-high' 
                          ? 'destructive' 
                          : state.riskAssessment.riskCategory === 'moderate' 
                            ? 'default' 
                            : 'secondary'
                      }
                      className="mt-2"
                    >
                      {state.riskAssessment.riskCategory.toUpperCase()} RISK
                    </Badge>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence Level</span>
                      <span>{state.riskAssessment.confidence}%</span>
                    </div>
                    <Progress value={state.riskAssessment.confidence} className="h-2" />
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Contributing Risk Factors</h4>
                    <div className="space-y-2">
                      {state.riskAssessment.contributingFactors.map((factor, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm">{factor.name}</span>
                          <Badge variant="outline">
                            {factor.weight.toFixed(1)}x
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {state.riskAssessment.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={generateAIRecommendations}
                    variant="outline"
                    className="w-full"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Generate AI Recommendations
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="screening-guidance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                NCCN Screening Guidelines
              </CardTitle>
              <CardDescription>
                Evidence-based screening recommendations based on risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Complete risk assessment to view personalized screening guidelines
                </p>
                {!state.riskAssessment && (
                  <Button 
                    onClick={() => setState(prev => ({ ...prev, currentTab: 'risk-assessment' }))}
                    className="mt-4"
                  >
                    Start Risk Assessment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="educational-resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Educational Resources
              </CardTitle>
              <CardDescription>
                Clinical guidelines, patient education materials, and decision support tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Educational resources and guidelines will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <QuickActionPanel
        onRiskAssessment={handleRiskAssessment}
        onSymptomAnalysis={handleSymptomAnalysis}
        onScreeningProtocol={() => setState(prev => ({ ...prev, currentTab: 'screening-guidance' }))}
        onEmergencyProtocol={() => {}}
        onGeneticCounseling={() => {}}
        onDocumentation={() => {}}
        currentTab={state.currentTab}
        patientContext={getPatientContext()}
      />
    </div>
  );
}