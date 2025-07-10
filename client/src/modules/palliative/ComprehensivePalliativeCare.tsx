import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Brain, 
  Activity, 
  User, 
  Pill, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Stethoscope,
  FileText,
  Users,
  Home,
  Hospital,
  Phone
} from 'lucide-react';

interface SymptomAssessment {
  symptom: string;
  severity: number;
  frequency: string;
  impact: string;
  managementStrategy: string;
}

interface PainAssessment {
  intensity: number;
  location: string;
  quality: string;
  timing: string;
  aggravatingFactors: string[];
  relievingFactors: string[];
  medications: string[];
}

interface GoalsOfCareDiscussion {
  prognosisUnderstanding: string;
  treatmentGoals: string[];
  valuesAndPreferences: string[];
  codeStatus: string;
  advanceDirectives: boolean;
}

const ComprehensivePalliativeCare = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('assessment');
  
  // Symptom Assessment State
  const [symptoms, setSymptoms] = useState<SymptomAssessment[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    symptom: '',
    severity: 0,
    frequency: '',
    impact: '',
    managementStrategy: ''
  });

  // Pain Assessment State
  const [painAssessment, setPainAssessment] = useState<PainAssessment>({
    intensity: 0,
    location: '',
    quality: '',
    timing: '',
    aggravatingFactors: [],
    relievingFactors: [],
    medications: []
  });

  // Goals of Care State
  const [goalsOfCare, setGoalsOfCare] = useState<GoalsOfCareDiscussion>({
    prognosisUnderstanding: '',
    treatmentGoals: [],
    valuesAndPreferences: [],
    codeStatus: '',
    advanceDirectives: false
  });

  // NCCN Palliative Care Guidelines Data
  const palliativeCareGuidelines = {
    symptomManagement: {
      pain: {
        assessment: "Use validated pain scales (0-10 numeric, Wong-Baker FACES)",
        neuropathic: {
          firstLine: ["Gabapentin 300-1200mg TID", "Pregabalin 75-300mg BID", "Duloxetine 30-60mg daily"],
          secondLine: ["Tricyclic antidepressants", "Topical lidocaine", "Tramadol"]
        },
        breakthrough: {
          opioidNaive: "Morphine 5-15mg PO q2-4h PRN",
          opioidTolerant: "10-20% of total daily dose q1-2h PRN"
        },
        monitoring: ["Pain scores q4h", "Sedation level", "Respiratory rate", "Constipation prevention"]
      },
      dyspnea: {
        assessment: "Modified Borg Scale (0-10), oxygen saturation",
        nonPharmacologic: ["Fan therapy", "Positioning", "Relaxation techniques", "Energy conservation"],
        pharmacologic: ["Morphine 2.5-5mg PO q4h", "Oxygen if hypoxemic", "Anxiolytics if anxiety component"],
        emergency: "Morphine 5-10mg IV/SQ q1-2h titrated to comfort"
      },
      nausea: {
        chemotherapy: ["Ondansetron 8mg q8h", "Dexamethasone 8-12mg daily", "Metoclopramide 10mg q6h"],
        opioid: ["Metoclopramide", "Haloperidol 0.5-1mg q8h", "Prochlorperazine"],
        refractory: ["Olanzapine 2.5-5mg daily", "Scopolamine patch", "Dronabinol"]
      },
      fatigue: {
        evaluation: ["CBC, comprehensive metabolic panel", "Thyroid function", "B12/folate", "Depression screening"],
        nonPharmacologic: ["Exercise therapy", "Sleep hygiene", "Energy conservation", "Nutritional support"],
        pharmacologic: ["Methylphenidate 5-10mg BID", "Modafinil 100-200mg daily", "Dexamethasone (short-term)"]
      }
    },
    psychosocialSupport: {
      communication: {
        badNews: ["Setting", "Perception", "Invitation", "Knowledge", "Emotions", "Strategy and Summary (SPIKES)"],
        prognosisDiscussion: ["Ask-Tell-Ask", "Use clear language", "Allow silence", "Address emotions"],
        familyMeetings: ["Structured agenda", "All stakeholders present", "Clear goals", "Follow-up plan"]
      },
      coping: {
        patientStrategies: ["Meaning-making", "Legacy work", "Spiritual exploration", "Acceptance"],
        familySupport: ["Anticipatory grief", "Caregiver burden", "Resource coordination", "Bereavement planning"]
      }
    },
    emergencies: {
      hyperCalcemia: {
        symptoms: "Altered mental status, nausea, constipation, polyuria",
        treatment: "NS 1-2L, pamidronate 90mg IV, calcitonin if severe",
        monitoring: "Daily calcium, renal function, mental status"
      },
      svc: {
        symptoms: "Facial swelling, dyspnea, arm swelling, cough",
        treatment: "Dexamethasone 4mg q6h, urgent radiation/stent, supportive care",
        precautions: "Avoid blood draws from affected arm, elevate head of bed"
      },
      spinalCord: {
        assessment: "Neurologic exam, MRI within 24h if suspected",
        treatment: "Dexamethasone 10mg IV then 4mg q6h, urgent radiation",
        rehabilitation: "Physical therapy, occupational therapy, equipment needs"
      }
    }
  };

  const commonSymptoms = [
    "Pain", "Fatigue", "Dyspnea", "Nausea/Vomiting", "Constipation", 
    "Anxiety", "Depression", "Insomnia", "Anorexia", "Confusion"
  ];

  const painQualities = [
    "Sharp/Stabbing", "Dull/Aching", "Burning", "Cramping", 
    "Shooting", "Throbbing", "Pressure", "Electric"
  ];

  const addSymptom = () => {
    if (!currentSymptom.symptom) {
      toast({
        title: "Missing Information",
        description: "Please select a symptom to assess.",
        variant: "destructive"
      });
      return;
    }

    const newSymptom: SymptomAssessment = {
      ...currentSymptom,
      managementStrategy: generateManagementStrategy(currentSymptom.symptom, currentSymptom.severity)
    };

    setSymptoms(prev => [...prev, newSymptom]);
    setCurrentSymptom({
      symptom: '',
      severity: 0,
      frequency: '',
      impact: '',
      managementStrategy: ''
    });

    toast({
      title: "Symptom Added",
      description: "Symptom assessment and management plan generated.",
    });
  };

  const generateManagementStrategy = (symptom: string, severity: number): string => {
    const guidelines = palliativeCareGuidelines.symptomManagement;
    
    switch (symptom.toLowerCase()) {
      case 'pain':
        if (severity <= 3) return "Non-opioid analgesics, non-pharmacologic interventions";
        if (severity <= 6) return "Weak opioids, adjuvant medications, multimodal approach";
        return "Strong opioids, specialist referral, comprehensive pain management";
      
      case 'dyspnea':
        if (severity <= 3) return "Fan therapy, positioning, oxygen if hypoxemic";
        if (severity <= 6) return "Low-dose morphine, anxiolytics if indicated";
        return "Morphine titration, continuous oxygen, urgent reassessment";
      
      case 'nausea/vomiting':
        return "Antiemetics per NCCN guidelines, hydration, dietary modifications";
      
      case 'fatigue':
        return "Energy conservation, gentle exercise, psychostimulants if indicated";
      
      default:
        return "Symptom-specific management per NCCN/ASCO palliative care guidelines";
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return "text-green-600";
    if (severity <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeverityDescription = (severity: number) => {
    if (severity <= 3) return "Mild";
    if (severity <= 6) return "Moderate";
    return "Severe";
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Heart className="h-8 w-8 text-pink-600" />
            Comprehensive Palliative Care
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Evidence-based palliative care assessment and management per NCCN/ASCO/ESMO guidelines
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
            NCCN 2025 Guidelines
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            ASCO/ESMO Standards
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="pain">Pain Management</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="psychosocial">Psychosocial</TabsTrigger>
          <TabsTrigger value="goals">Goals of Care</TabsTrigger>
          <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Comprehensive Symptom Assessment
                </CardTitle>
                <CardDescription>
                  Systematic evaluation of all symptoms affecting quality of life
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Symptom</Label>
                    <Select 
                      value={currentSymptom.symptom} 
                      onValueChange={(value) => setCurrentSymptom(prev => ({...prev, symptom: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select symptom" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonSymptoms.map((symptom) => (
                          <SelectItem key={symptom} value={symptom}>
                            {symptom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select 
                      value={currentSymptom.frequency} 
                      onValueChange={(value) => setCurrentSymptom(prev => ({...prev, frequency: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="continuous">Continuous</SelectItem>
                        <SelectItem value="frequent">Frequent (daily)</SelectItem>
                        <SelectItem value="intermittent">Intermittent</SelectItem>
                        <SelectItem value="occasional">Occasional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Severity Score (0-10 scale)</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={currentSymptom.severity}
                      onChange={(e) => setCurrentSymptom(prev => ({...prev, severity: parseInt(e.target.value)}))}
                      className="flex-1"
                    />
                    <span className={`text-lg font-bold w-16 ${getSeverityColor(currentSymptom.severity)}`}>
                      {currentSymptom.severity}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {getSeverityDescription(currentSymptom.severity)} - {currentSymptom.severity === 0 ? "No symptom" : 
                     currentSymptom.severity <= 3 ? "Mild interference" :
                     currentSymptom.severity <= 6 ? "Moderate interference" : "Severe interference with daily activities"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Impact on Daily Activities</Label>
                  <Textarea
                    placeholder="Describe how this symptom affects daily activities, sleep, mood, relationships..."
                    value={currentSymptom.impact}
                    onChange={(e) => setCurrentSymptom(prev => ({...prev, impact: e.target.value}))}
                    rows={3}
                  />
                </div>

                <Button onClick={addSymptom} className="w-full bg-blue-600 hover:bg-blue-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Add Symptom Assessment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Assessment Summary ({symptoms.length} symptoms)
                </CardTitle>
                <CardDescription>
                  Current symptom burden and management priorities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {symptoms.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No symptoms assessed yet</p>
                      <p className="text-sm">Add symptom assessments to generate management plan</p>
                    </div>
                  ) : (
                    symptoms.map((symptom, index) => (
                      <div key={index} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{symptom.symptom}</h4>
                              <Badge variant="outline" className={getSeverityColor(symptom.severity)}>
                                {symptom.severity}/10 - {getSeverityDescription(symptom.severity)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Frequency:</strong> {symptom.frequency}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Impact:</strong> {symptom.impact}
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                              <strong>Management Strategy:</strong> {symptom.managementStrategy}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pain">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-600" />
                  Comprehensive Pain Assessment
                </CardTitle>
                <CardDescription>
                  Detailed pain evaluation per NCCN guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pain Intensity (0-10 scale)</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={painAssessment.intensity}
                      onChange={(e) => setPainAssessment(prev => ({...prev, intensity: parseInt(e.target.value)}))}
                      className="flex-1"
                    />
                    <span className={`text-lg font-bold w-16 ${getSeverityColor(painAssessment.intensity)}`}>
                      {painAssessment.intensity}/10
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Location</Label>
                    <Input
                      placeholder="e.g., Lower back, chest, abdomen"
                      value={painAssessment.location}
                      onChange={(e) => setPainAssessment(prev => ({...prev, location: e.target.value}))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pain Quality</Label>
                    <Select 
                      value={painAssessment.quality} 
                      onValueChange={(value) => setPainAssessment(prev => ({...prev, quality: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {painQualities.map((quality) => (
                          <SelectItem key={quality} value={quality}>
                            {quality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Timing Pattern</Label>
                  <Select 
                    value={painAssessment.timing} 
                    onValueChange={(value) => setPainAssessment(prev => ({...prev, timing: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="constant">Constant</SelectItem>
                      <SelectItem value="intermittent">Intermittent</SelectItem>
                      <SelectItem value="breakthrough">Breakthrough</SelectItem>
                      <SelectItem value="incident">Incident (movement-related)</SelectItem>
                      <SelectItem value="end-of-dose">End-of-dose failure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Aggravating Factors</Label>
                  <Textarea
                    placeholder="What makes the pain worse? (movement, position, stress, etc.)"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relieving Factors</Label>
                  <Textarea
                    placeholder="What helps relieve the pain? (medications, heat, rest, etc.)"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-purple-600" />
                  NCCN Pain Management Guidelines
                </CardTitle>
                <CardDescription>
                  Evidence-based pain management recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Recommended Management Strategy
                  </h4>
                  {painAssessment.intensity === 0 ? (
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      No pain management required at this time.
                    </p>
                  ) : painAssessment.intensity <= 3 ? (
                    <div className="text-sm text-blue-700 dark:text-blue-200 space-y-2">
                      <p><strong>Mild Pain (1-3/10):</strong></p>
                      <ul className="list-disc ml-4">
                        <li>Non-opioid analgesics (acetaminophen, NSAIDs)</li>
                        <li>Non-pharmacologic interventions</li>
                        <li>Address underlying cause if possible</li>
                      </ul>
                    </div>
                  ) : painAssessment.intensity <= 6 ? (
                    <div className="text-sm text-blue-700 dark:text-blue-200 space-y-2">
                      <p><strong>Moderate Pain (4-6/10):</strong></p>
                      <ul className="list-disc ml-4">
                        <li>Weak opioids (tramadol, codeine) or low-dose strong opioids</li>
                        <li>Continue non-opioid adjuvants</li>
                        <li>Consider adjuvant medications</li>
                        <li>Multimodal approach</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="text-sm text-blue-700 dark:text-blue-200 space-y-2">
                      <p><strong>Severe Pain (7-10/10):</strong></p>
                      <ul className="list-disc ml-4">
                        <li>Strong opioids (morphine, oxycodone, fentanyl)</li>
                        <li>Immediate release for breakthrough pain</li>
                        <li>Consider specialist palliative care referral</li>
                        <li>Comprehensive pain management approach</li>
                      </ul>
                    </div>
                  )}
                </div>

                {painAssessment.quality === "Burning" || painAssessment.quality === "Electric" || painAssessment.quality === "Shooting" ? (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                      Neuropathic Pain Considerations
                    </h4>
                    <div className="text-sm text-amber-700 dark:text-amber-200 space-y-2">
                      <p><strong>First-line agents:</strong></p>
                      <ul className="list-disc ml-4">
                        <li>Gabapentin 300-1200mg TID</li>
                        <li>Pregabalin 75-300mg BID</li>
                        <li>Duloxetine 30-60mg daily</li>
                      </ul>
                    </div>
                  </div>
                ) : null}

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Monitoring Parameters
                  </h4>
                  <div className="text-sm text-green-700 dark:text-green-200">
                    <ul className="list-disc ml-4">
                      <li>Pain scores every 4 hours</li>
                      <li>Sedation level assessment</li>
                      <li>Respiratory rate monitoring</li>
                      <li>Constipation prevention (senna + docusate)</li>
                      <li>Functional assessment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="symptoms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(palliativeCareGuidelines.symptomManagement).map(([symptom, guidelines]) => (
              <Card key={symptom}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <Stethoscope className="h-5 w-5 text-indigo-600" />
                    {symptom} Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {symptom === 'pain' && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Assessment</h4>
                        <p className="text-sm">{guidelines.assessment}</p>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Neuropathic Pain - First Line</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.neuropathic.firstLine.map((med, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Breakthrough Pain</h4>
                        <p className="text-sm"><strong>Opioid Naive:</strong> {guidelines.breakthrough.opioidNaive}</p>
                        <p className="text-sm"><strong>Opioid Tolerant:</strong> {guidelines.breakthrough.opioidTolerant}</p>
                      </div>
                    </div>
                  )}

                  {symptom === 'dyspnea' && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Assessment</h4>
                        <p className="text-sm">{guidelines.assessment}</p>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Non-Pharmacologic</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.nonPharmacologic.map((intervention, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3" />
                              {intervention}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Pharmacologic</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.pharmacologic.map((med, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {symptom === 'nausea' && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Chemotherapy-Induced</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.chemotherapy.map((med, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Opioid-Induced</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.opioid.map((med, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Refractory Cases</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.refractory.map((med, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {symptom === 'fatigue' && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Evaluation</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.evaluation.map((test, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Activity className="h-3 w-3" />
                              {test}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Non-Pharmacologic</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.nonPharmacologic.map((intervention, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3" />
                              {intervention}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Pharmacologic</h4>
                        <ul className="text-sm space-y-1">
                          {guidelines.pharmacologic.map((med, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="psychosocial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Communication Framework (SPIKES Protocol)
                </CardTitle>
                <CardDescription>
                  Structured approach to difficult conversations per ASCO guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {palliativeCareGuidelines.psychosocialSupport.communication.badNews.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{step}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {index === 0 && "Ensure appropriate setting, privacy, and support persons present"}
                          {index === 1 && "Assess patient's understanding of their condition"}
                          {index === 2 && "Ask how much the patient wants to know"}
                          {index === 3 && "Share information clearly and compassionately"}
                          {index === 4 && "Respond to patient emotions with empathy"}
                          {index === 5 && "Summarize and plan next steps together"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  Coping and Support Strategies
                </CardTitle>
                <CardDescription>
                  Evidence-based psychosocial interventions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Patient Coping Strategies</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                    {palliativeCareGuidelines.psychosocialSupport.coping.patientStrategies.map((strategy, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Family Support</h4>
                  <ul className="text-sm text-green-700 dark:text-green-200 space-y-1">
                    {palliativeCareGuidelines.psychosocialSupport.coping.familySupport.map((support, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {support}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Prognosis Discussion Best Practices</h4>
                  <ul className="text-sm text-purple-700 dark:text-purple-200 space-y-1">
                    {palliativeCareGuidelines.psychosocialSupport.communication.prognosisDiscussion.map((practice, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Brain className="h-3 w-3" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Goals of Care Discussion
                </CardTitle>
                <CardDescription>
                  Structured framework for values-based care planning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Patient's Understanding of Prognosis</Label>
                  <Textarea
                    placeholder="Document patient's understanding of their illness and prognosis..."
                    value={goalsOfCare.prognosisUnderstanding}
                    onChange={(e) => setGoalsOfCare(prev => ({...prev, prognosisUnderstanding: e.target.value}))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Primary Treatment Goals</Label>
                  <div className="space-y-2">
                    {['Cure/Life Extension', 'Symptom Relief', 'Functional Improvement', 'Comfort Care', 'Family Support'].map((goal) => (
                      <label key={goal} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={goalsOfCare.treatmentGoals.includes(goal)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setGoalsOfCare(prev => ({...prev, treatmentGoals: [...prev.treatmentGoals, goal]}));
                            } else {
                              setGoalsOfCare(prev => ({...prev, treatmentGoals: prev.treatmentGoals.filter(g => g !== goal)}));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Code Status</Label>
                  <Select 
                    value={goalsOfCare.codeStatus} 
                    onValueChange={(value) => setGoalsOfCare(prev => ({...prev, codeStatus: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select code status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Code</SelectItem>
                      <SelectItem value="dnr">DNR</SelectItem>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="dnr-dni">DNR/DNI</SelectItem>
                      <SelectItem value="comfort">Comfort Care Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="advance-directives"
                    checked={goalsOfCare.advanceDirectives}
                    onChange={(e) => setGoalsOfCare(prev => ({...prev, advanceDirectives: e.target.checked}))}
                    className="rounded"
                  />
                  <Label htmlFor="advance-directives">Advance Directives Completed</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Care Planning Recommendations
                </CardTitle>
                <CardDescription>
                  Evidence-based care coordination per ESMO guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Care Setting Recommendations</h4>
                  <div className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                    <div className="flex items-center gap-2">
                      <Hospital className="h-4 w-4" />
                      <span><strong>Inpatient Palliative Care:</strong> Complex symptom management, family meetings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      <span><strong>Outpatient Clinic:</strong> Routine symptom management, care coordination</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span><strong>Home-Based Care:</strong> Comfort care, end-of-life support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span><strong>Telehealth:</strong> Follow-up assessments, medication adjustments</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Team Coordination</h4>
                  <ul className="text-sm text-green-700 dark:text-green-200 space-y-1">
                    <li className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      Oncology team communication
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      Social work consultation
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      Chaplain/spiritual care
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      Pharmacy consultation
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Follow-up Planning</h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-200 space-y-1">
                    <li className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Symptom reassessment in 24-48 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Family meeting within 1 week
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      Goals of care documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      24/7 on-call support access
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergencies">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(palliativeCareGuidelines.emergencies).map(([emergency, details]) => (
              <Card key={emergency}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    {emergency === 'svc' ? 'Superior Vena Cava Syndrome' : 
                     emergency === 'spinalCord' ? 'Spinal Cord Compression' :
                     emergency.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Clinical Presentation</h4>
                    <p className="text-sm text-red-700 dark:text-red-200">{details.symptoms}</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Emergency Treatment</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">{details.treatment}</p>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                      {emergency === 'spinalCord' ? 'Rehabilitation' : 
                       emergency === 'svc' ? 'Precautions' : 'Monitoring'}
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-200">
                      {emergency === 'spinalCord' ? details.rehabilitation :
                       emergency === 'svc' ? details.precautions : details.monitoring}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
        <h3 className="font-bold text-pink-900 dark:text-pink-100 mb-2">Clinical Decision Support Notice</h3>
        <p className="text-sm text-pink-700 dark:text-pink-200">
          This comprehensive palliative care module provides evidence-based guidance per NCCN, ASCO, and ESMO guidelines. 
          All recommendations are for clinical decision support and educational purposes only. Individual patient care decisions 
          should always be made by qualified healthcare professionals based on thorough clinical assessment and current 
          evidence-based guidelines. No patient-identifiable information is stored or transmitted.
        </p>
      </div>
    </div>
  );
};

export default ComprehensivePalliativeCare;