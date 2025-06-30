import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Stethoscope, 
  Search, 
  Shield, 
  UserPlus, 
  TrendingUp,
  ArrowRight, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  Zap,
  Activity
} from "lucide-react";

// Enhanced OPD Sections with database-driven approach
const opdSections = [
  { 
    id: "cancer-screening", 
    name: "Cancer Screening", 
    icon: Shield,
    description: "Evidence-based screening protocols from NCCN, USPSTF, and ACS"
  },
  { 
    id: "diagnostic-workup", 
    name: "Diagnostic Workup", 
    icon: Search,
    description: "Systematic diagnostic algorithms with real-time clinical data"
  },
  { 
    id: "biomarker-testing", 
    name: "Biomarker Testing", 
    icon: Activity,
    description: "Comprehensive biomarker guidelines and therapeutic implications"
  },
  { 
    id: "risk-stratification", 
    name: "Risk Stratification", 
    icon: TrendingUp,
    description: "Validated risk assessment tools and scoring systems"
  },
  { 
    id: "referral-guidelines", 
    name: "Referral Guidelines", 
    icon: UserPlus,
    description: "Specialist referral criteria with timeframes and documentation"
  }
];

// Cancer Screening Component with Real Data
const CancerScreeningSection = () => {
  const [selectedCancer, setSelectedCancer] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const { data: screeningProtocols, isLoading } = useQuery({
    queryKey: ['/api/opd/cancer-screening-protocols', selectedCancer, selectedAge],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCancer) params.append('cancerType', selectedCancer);
      if (selectedAge) params.append('ageRange', selectedAge);
      
      const response = await fetch(`/api/opd/cancer-screening-protocols?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch screening protocols');
      return response.json();
    },
    enabled: true
  });

  // Extract unique cancer types from the data
  const cancerTypes = screeningProtocols ? 
    Array.from(new Set(screeningProtocols.map((protocol: any) => protocol.cancerType))).sort() : 
    [];

  const ageRanges = [
    "18-39 years", "40-49 years", "50-64 years", 
    "65-74 years", "75+ years"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Evidence-Based Cancer Screening Protocols
          </CardTitle>
          <CardDescription>
            Real-time screening guidelines from NCCN, USPSTF, and American Cancer Society
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cancer Type</label>
              <Select value={selectedCancer} onValueChange={setSelectedCancer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cancer type" />
                </SelectTrigger>
                <SelectContent>
                  {cancerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age Range</label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : screeningProtocols && screeningProtocols.length > 0 ? (
            <div className="space-y-4">
              {screeningProtocols.map((protocol: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{protocol.testName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {protocol.cancerType} • {protocol.ageRange}
                        </p>
                      </div>
                      <Badge variant={protocol.recommendationStrength === 'Category 1' ? 'default' : 'secondary'}>
                        {protocol.recommendationStrength}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Frequency</h5>
                        <p className="text-sm">{protocol.frequency}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Evidence Level</h5>
                        <p className="text-sm">{protocol.evidenceLevel}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Source</h5>
                        <p className="text-sm">{protocol.source}</p>
                      </div>
                    </div>

                    {protocol.riskFactors && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">Risk Factors</h5>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(protocol.riskFactors).map(([category, factors]: [string, any]) => (
                            <div key={category} className="text-xs">
                              <span className="font-medium">{category}:</span> {factors.join(', ')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {protocol.additionalConsiderations && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {protocol.additionalConsiderations}
                        </AlertDescription>
                      </Alert>
                    )}

                    {protocol.followUpProtocol && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1">Follow-up Protocol</h5>
                        <p className="text-sm">{protocol.followUpProtocol}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select cancer type and age range to view evidence-based screening protocols
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Diagnostic Workup Component with Real Data
const DiagnosticWorkupSection = () => {
  const [selectedCancer, setSelectedCancer] = useState("");
  const [symptomSearch, setSymptomSearch] = useState("");

  const { data: workupSteps, isLoading } = useQuery({
    queryKey: ['/api/opd/diagnostic-workup-steps', selectedCancer, symptomSearch],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCancer) params.append('cancerType', selectedCancer);
      if (symptomSearch) params.append('symptomSearch', symptomSearch);
      
      const response = await fetch(`/api/opd/diagnostic-workup-steps?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch diagnostic workup steps');
      return response.json();
    },
    enabled: true
  });

  // Extract unique cancer types from the data
  const cancerTypes = workupSteps ? 
    Array.from(new Set(workupSteps.map((step: any) => step.cancerType))).sort() : 
    [];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-green-600" />
            Evidence-Based Diagnostic Workup
          </CardTitle>
          <CardDescription>
            Systematic diagnostic algorithms from NCCN Guidelines with sensitivity/specificity data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cancer Type</label>
              <Select value={selectedCancer} onValueChange={setSelectedCancer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cancer type" />
                </SelectTrigger>
                <SelectContent>
                  {cancerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Symptom/Finding</label>
              <Input
                placeholder="Search symptoms or findings..."
                value={symptomSearch}
                onChange={(e) => setSymptomSearch(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : workupSteps && workupSteps.length > 0 ? (
            <div className="space-y-4">
              {workupSteps.map((step: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{step.symptomOrFinding}</h4>
                        <p className="text-sm text-muted-foreground">
                          {step.cancerType} • {step.urgencyLevel}
                        </p>
                      </div>
                      <Badge variant={step.urgencyLevel === 'Urgent' ? 'destructive' : 'secondary'}>
                        {step.urgencyLevel}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-sm mb-2">Recommended Test/Imaging</h5>
                      <p className="text-sm font-medium">{step.imagingOrLab}</p>
                      {step.estimatedCost && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Estimated cost: {step.estimatedCost}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          If Positive
                        </h5>
                        <p className="text-sm">{step.nextStepIfPositive}</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1 flex items-center gap-1">
                          <ArrowRight className="h-4 w-4 text-blue-600" />
                          If Negative
                        </h5>
                        <p className="text-sm">{step.nextStepIfNegative}</p>
                      </div>
                    </div>

                    {(step.sensitivity || step.specificity) && (
                      <div className="grid grid-cols-2 gap-4 bg-amber-50 dark:bg-amber-900/20 p-3 rounded">
                        {step.sensitivity && (
                          <div>
                            <h5 className="font-medium text-sm">Sensitivity</h5>
                            <p className="text-lg font-bold text-amber-600">{step.sensitivity}%</p>
                          </div>
                        )}
                        {step.specificity && (
                          <div>
                            <h5 className="font-medium text-sm">Specificity</h5>
                            <p className="text-lg font-bold text-amber-600">{step.specificity}%</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground border-t pt-2">
                      Source: {step.source}
                      {step.linkedStage && ` • Applicable to ${step.linkedStage}`}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select cancer type or search symptoms to view diagnostic workup steps
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Biomarker Testing Component with Real Data
const BiomarkerTestingSection = () => {
  const [selectedCancer, setSelectedCancer] = useState("");
  
  const { data: biomarkers, isLoading } = useQuery({
    queryKey: ['/api/opd/biomarkers', selectedCancer],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCancer) params.append('cancerType', selectedCancer);
      
      const response = await fetch(`/api/opd/biomarkers?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch biomarkers');
      return response.json();
    },
    enabled: true
  });

  // Extract unique cancer types from the data
  const cancerTypes = biomarkers ? 
    Array.from(new Set(biomarkers.map((biomarker: any) => biomarker.cancerType))).sort() : 
    [];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Biomarker Testing Guidelines
          </CardTitle>
          <CardDescription>
            Comprehensive biomarker testing with therapeutic implications from NCCN Guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="text-sm font-medium">Cancer Type</label>
            <Select value={selectedCancer} onValueChange={setSelectedCancer}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select cancer type for biomarker testing" />
              </SelectTrigger>
              <SelectContent>
                {cancerTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : biomarkers && biomarkers.length > 0 ? (
            <div className="space-y-4">
              {biomarkers.map((biomarker: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{biomarker.biomarkerName}</h4>
                        <p className="text-sm text-muted-foreground">{biomarker.cancerType}</p>
                      </div>
                      <Badge variant={biomarker.testingRequired ? 'default' : 'secondary'}>
                        {biomarker.testingRequired ? 'Required' : 'Optional'}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-sm mb-2">Testing Method</h5>
                      <p className="text-sm">{biomarker.testingMethod}</p>
                      {biomarker.turnaroundTime && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Turnaround time: {biomarker.turnaroundTime}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1">Positive Result</h5>
                        <p className="text-sm">{biomarker.positiveImplication}</p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1">Negative Result</h5>
                        <p className="text-sm">{biomarker.negativeImplication}</p>
                      </div>
                    </div>

                    {biomarker.therapyLink && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1">Therapeutic Implications</h5>
                        <p className="text-sm">{biomarker.therapyLink}</p>
                      </div>
                    )}

                    {biomarker.normalRange && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded">
                        <h5 className="font-medium text-sm mb-1">Reference Range</h5>
                        <p className="text-sm">{biomarker.normalRange}</p>
                        {biomarker.criticalValues && (
                          <p className="text-sm font-medium text-amber-600">
                            Critical values: {biomarker.criticalValues}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground border-t pt-2">
                      Source: {biomarker.source}
                      {biomarker.referenceLab && ` • Lab: ${biomarker.referenceLab}`}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select cancer type to view evidence-based biomarker testing guidelines
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Referral Guidelines Component with Real Data
const ReferralGuidelinesSection = () => {
  const [selectedCancer, setSelectedCancer] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");

  const { data: referralGuidelines, isLoading } = useQuery({
    queryKey: ['/api/opd/referral-guidelines', selectedCancer, selectedUrgency],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCancer) params.append('cancerType', selectedCancer);
      if (selectedUrgency) params.append('urgencyLevel', selectedUrgency);
      
      const response = await fetch(`/api/opd/referral-guidelines?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch referral guidelines');
      return response.json();
    },
    enabled: true
  });

  // Extract unique cancer types from the data
  const cancerTypes = referralGuidelines ? 
    Array.from(new Set(referralGuidelines.map((guideline: any) => guideline.cancerType))).sort() : 
    [];

  const urgencyLevels = ["Urgent", "Routine"];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-red-600" />
            NCCN Referral Guidelines
          </CardTitle>
          <CardDescription>
            Evidence-based referral criteria and timeframes from NCCN Guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cancer Type</label>
              <Select value={selectedCancer} onValueChange={setSelectedCancer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cancer type" />
                </SelectTrigger>
                <SelectContent>
                  {cancerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Urgency Level</label>
              <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : referralGuidelines && referralGuidelines.length > 0 ? (
            <div className="space-y-6">
              {referralGuidelines.map((guideline: any, index: number) => (
                <Card key={index} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{guideline.cancerType}</h4>
                        <p className="text-sm text-muted-foreground">{guideline.specialtyRequired}</p>
                      </div>
                      <Badge variant={guideline.urgencyLevel === 'Urgent' ? 'destructive' : 'secondary'}>
                        {guideline.urgencyLevel} - {guideline.timeframe}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Referral Criteria
                          </h5>
                          <div className="space-y-1">
                            {guideline.referralCriteria.map((criteria: string, idx: number) => (
                              <div key={idx} className="text-sm pl-6 relative">
                                <span className="absolute left-0 top-1">•</span>
                                {criteria}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            Required Documentation
                          </h5>
                          <div className="space-y-1">
                            {guideline.requiredDocumentation.map((doc: string, idx: number) => (
                              <div key={idx} className="text-sm pl-6 relative">
                                <span className="absolute left-0 top-1">•</span>
                                {doc}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-purple-600" />
                            Additional Tests
                          </h5>
                          <div className="space-y-1">
                            {guideline.additionalTests.map((test: string, idx: number) => (
                              <div key={idx} className="text-sm pl-6 relative">
                                <span className="absolute left-0 top-1">•</span>
                                {test}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                          <h5 className="font-medium text-sm mb-1">Source</h5>
                          <p className="text-sm">{guideline.source}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select cancer type or urgency level to view NCCN referral guidelines
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// AI-Powered Clinical Recommendation Component
const AIRecommendationSection = () => {
  const [formData, setFormData] = useState({
    cancerType: "",
    symptoms: [],
    riskFactors: [],
    age: "",
    sex: ""
  });
  const [recommendation, setRecommendation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRecommendation = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/opd/generate-ai-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error('Failed to generate recommendation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-600" />
          AI-Powered Clinical Recommendations
        </CardTitle>
        <CardDescription>
          Generate evidence-based clinical recommendations using AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Suspected Cancer Type</label>
              <Select value={formData.cancerType} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, cancerType: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select suspected cancer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breast Cancer">Breast Cancer</SelectItem>
                  <SelectItem value="Lung Cancer">Lung Cancer</SelectItem>
                  <SelectItem value="Colorectal Cancer">Colorectal Cancer</SelectItem>
                  <SelectItem value="Prostate Cancer">Prostate Cancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Age</label>
              <Input
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              />
            </div>
          </div>

          <Button 
            onClick={generateRecommendation}
            disabled={!formData.cancerType || !formData.age || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating AI Recommendation...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Evidence-Based Recommendation
              </>
            )}
          </Button>

          {recommendation && (
            <div className="mt-6 space-y-4">
              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Clinical Recommendation:</strong>
                  <div className="mt-2">{recommendation.recommendation}</div>
                </AlertDescription>
              </Alert>
              
              {recommendation.confidence && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                  <h5 className="font-medium text-sm mb-1">Confidence Score</h5>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${recommendation.confidence * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{Math.round(recommendation.confidence * 100)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Enhanced OPD Module Component
export default function OPDModuleEnhanced() {
  const [activeSection, setActiveSection] = useState("cancer-screening");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "cancer-screening":
        return <CancerScreeningSection />;
      case "diagnostic-workup":
        return <DiagnosticWorkupSection />;
      case "biomarker-testing":
        return <BiomarkerTestingSection />;
      case "risk-stratification":
        return <AIRecommendationSection />;
      case "referral-guidelines":
        return <ReferralGuidelinesSection />;
      default:
        return <CancerScreeningSection />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Module Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-medical-blue rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Enhanced OPD Module
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Evidence-based outpatient oncology guidance with real-time clinical data
            </p>
          </div>
        </div>
        
        {/* Module Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-5 w-full bg-slate-100 dark:bg-slate-800">
            {opdSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center space-x-2 text-sm"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Active Section Content */}
      <div className="mt-8">
        {renderActiveSection()}
      </div>

      {/* Footer Information */}
      <div className="mt-12 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
          Enhanced OPD Module powered by real-time clinical data from NCCN, ASCO, ESMO, and other authoritative sources. 
          For educational and clinical decision support purposes only.
        </p>
      </div>
    </div>
  );
}