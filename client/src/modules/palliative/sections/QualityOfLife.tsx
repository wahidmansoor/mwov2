import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Brain, 
  Target,
  CheckCircle,
  Stethoscope,
  BarChart3,
  Save,
  FileText,
  Info,
  Scale,
  Zap
} from "lucide-react";

// Authentic ESAS-r (Edmonton Symptom Assessment System - Revised)
const ESAS_SYMPTOMS = [
  { id: 'pain', label: 'Pain', description: 'Physical discomfort or suffering' },
  { id: 'fatigue', label: 'Tiredness', description: 'Lack of energy or feeling worn out' },
  { id: 'nausea', label: 'Nausea', description: 'Feeling sick to your stomach' },
  { id: 'depression', label: 'Depression', description: 'Feeling sad or down' },
  { id: 'anxiety', label: 'Anxiety', description: 'Feeling nervous or worried' },
  { id: 'drowsiness', label: 'Drowsiness', description: 'Feeling sleepy or less alert' },
  { id: 'appetite', label: 'Appetite', description: 'Desire to eat (0=normal, 10=no appetite)' },
  { id: 'wellbeing', label: 'Wellbeing', description: 'How you feel overall' },
  { id: 'dyspnea', label: 'Shortness of Breath', description: 'Difficulty breathing' }
];

// Authentic IPOS (Integrated Palliative care Outcome Scale) - Available for future implementation
// const IPOS_ITEMS = [
//   { domain: 'physical', item: 'Pain', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Shortness of breath', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Weakness or lack of energy', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Nausea', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Vomiting', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Poor appetite', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Constipation', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Sore or dry mouth', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Drowsiness', scale: 'severity', timeframe: '3 days' },
//   { domain: 'physical', item: 'Poor mobility', scale: 'severity', timeframe: '3 days' },
//   { domain: 'emotional', item: 'Patient anxiety or worry', scale: 'severity', timeframe: '3 days' },
//   { domain: 'emotional', item: 'Family anxiety or worry', scale: 'severity', timeframe: '3 days' },
//   { domain: 'emotional', item: 'Depression', scale: 'severity', timeframe: '3 days' },
//   { domain: 'communication', item: 'Patient feeling at peace', scale: 'agreement', timeframe: '3 days' },
//   { domain: 'communication', item: 'Share feelings with family/friends', scale: 'agreement', timeframe: '3 days' },
//   { domain: 'practical', item: 'Information needs met', scale: 'agreement', timeframe: '3 days' },
//   { domain: 'practical', item: 'Practical problems addressed', scale: 'agreement', timeframe: '3 days' }
// ];

// Palliative Performance Scale (PPS) - authentic clinical tool
const PPS_LEVELS = [
  { score: 100, ambulation: 'Full', activity: 'Normal', evidence: 'None', selfcare: 'Complete', intake: 'Normal', consciousness: 'Full' },
  { score: 90, ambulation: 'Full', activity: 'Normal', evidence: 'Some', selfcare: 'Complete', intake: 'Normal', consciousness: 'Full' },
  { score: 80, ambulation: 'Full', activity: 'Normal', evidence: 'Some', selfcare: 'Complete', intake: 'Normal/Reduced', consciousness: 'Full' },
  { score: 70, ambulation: 'Reduced', activity: 'Unable', evidence: 'Some', selfcare: 'Complete', intake: 'Normal/Reduced', consciousness: 'Full' },
  { score: 60, ambulation: 'Reduced', activity: 'Unable', evidence: 'Significant', selfcare: 'Occasional assistance', intake: 'Normal/Reduced', consciousness: 'Full/Confusion' },
  { score: 50, ambulation: 'Mainly sit/lie', activity: 'Unable', evidence: 'Significant', selfcare: 'Considerable assistance', intake: 'Normal/Reduced', consciousness: 'Full/Confusion' },
  { score: 40, ambulation: 'Mainly in bed', activity: 'Unable', evidence: 'Significant', selfcare: 'Mainly assistance', intake: 'Normal/Reduced', consciousness: 'Full/Drowsy/Confusion' },
  { score: 30, ambulation: 'Totally bed bound', activity: 'Unable', evidence: 'Significant', selfcare: 'Total care', intake: 'Reduced', consciousness: 'Full/Drowsy/Confusion' },
  { score: 20, ambulation: 'Totally bed bound', activity: 'Unable', evidence: 'Significant', selfcare: 'Total care', intake: 'Minimal sips', consciousness: 'Full/Drowsy/Confusion' },
  { score: 10, ambulation: 'Totally bed bound', activity: 'Unable', evidence: 'Significant', selfcare: 'Total care', intake: 'Mouth care only', consciousness: 'Drowsy/Coma' },
  { score: 0, ambulation: 'Death', activity: '-', evidence: '-', selfcare: '-', intake: '-', consciousness: '-' }
];

// Quality indicators based on research
const QUALITY_INDICATORS = [
  {
    category: "Symptom Management",
    indicators: [
      { metric: "Pain assessment frequency", target: "≥ Every 24 hours", rationale: "WHO guidelines for cancer pain" },
      { metric: "Pain score ≤4/10 achievement", target: "≥ 80% of assessments", rationale: "Clinically meaningful pain relief" },
      { metric: "Breakthrough pain episodes", target: "≤ 2 per day", rationale: "Optimal opioid titration" },
      { metric: "ESAS total distress score", target: "≤ 40/80 points", rationale: "Multi-symptom burden reduction" }
    ]
  },
  {
    category: "Functional Status",
    indicators: [
      { metric: "PPS documentation", target: "100% initial assessments", rationale: "Prognostic accuracy and care planning" },
      { metric: "Functional decline rate", target: "Monitor weekly changes", rationale: "Early intervention opportunities" },
      { metric: "Independence in ADLs", target: "Maximize within limits", rationale: "Quality of life preservation" }
    ]
  },
  {
    category: "Psychosocial Care",
    indicators: [
      { metric: "Spiritual assessment completion", target: "≥ 95% within 5 days", rationale: "Joint Commission standards" },
      { metric: "Family meeting frequency", target: "≥ Every 2 weeks", rationale: "Communication and support needs" },
      { metric: "Depression screening (PHQ-2)", target: "≥ Every visit", rationale: "High prevalence in palliative populations" }
    ]
  },
  {
    category: "Communication",
    indicators: [
      { metric: "Goals of care documentation", target: "100% of patients", rationale: "Patient-centered decision making" },
      { metric: "Advance directive discussion", target: "Within 7 days admission", rationale: "Legal and ethical requirements" },
      { metric: "Family satisfaction scores", target: "≥ 8/10 rating", rationale: "Care quality perception" }
    ]
  }
];

export default function QualityOfLife() {
  const [activeTab, setActiveTab] = useState("assessment");
  const [esasScores, setEsasScores] = useState<Record<string, number>>(
    ESAS_SYMPTOMS.reduce((acc, symptom) => ({ ...acc, [symptom.id]: 0 }), {})
  );
  // Future IPOS implementation
  // const [iposScores, setIposScores] = useState<Record<string, number>>({});
  const [selectedPPS, setSelectedPPS] = useState<number>(70);
  const [patientName, setPatientName] = useState("");
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateESASTotalDistress = () => {
    return Object.values(esasScores).reduce((sum, score) => sum + score, 0);
  };

  const getESASSeverityLevel = (score: number) => {
    if (score <= 3) return { level: "Mild", color: "text-green-600", bg: "bg-green-50" };
    if (score <= 6) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { level: "Severe", color: "text-red-600", bg: "bg-red-50" };
  };

  const getPPSPrognosis = (score: number) => {
    if (score >= 70) return { prognosis: "Months to years", color: "text-green-600" };
    if (score >= 50) return { prognosis: "Weeks to months", color: "text-yellow-600" };
    if (score >= 30) return { prognosis: "Days to weeks", color: "text-orange-600" };
    return { prognosis: "Hours to days", color: "text-red-600" };
  };

  const renderESASAssessment = () => (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          ESAS-r: Rate each symptom intensity over the past 24 hours. 0 = no symptom, 10 = worst possible.
          Used in 30+ countries with validated translations.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {ESAS_SYMPTOMS.map((symptom) => {
          const severity = getESASSeverityLevel(esasScores[symptom.id]);
          return (
            <Card key={symptom.id} className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <Label className="text-base font-medium">{symptom.label}</Label>
                  <p className="text-sm text-gray-500">{symptom.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${severity.bg} ${severity.color}`}>
                  {esasScores[symptom.id]}/10 - {severity.level}
                </div>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={[esasScores[symptom.id]]}
                  onValueChange={(value) => setEsasScores(prev => ({ ...prev, [symptom.id]: value[0] }))}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 - No {symptom.label.toLowerCase()}</span>
                  <span>10 - Worst possible</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">ESAS Total Distress Score</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {calculateESASTotalDistress()}/80
            </div>
            <Progress value={(calculateESASTotalDistress() / 80) * 100} className="w-full max-w-md mx-auto mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Research threshold: ≥40 indicates high symptom burden requiring intensive intervention
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPPSAssessment = () => {
    const selectedLevel = PPS_LEVELS.find(level => level.score === selectedPPS);
    const prognosis = getPPSPrognosis(selectedPPS);
    
    return (
      <div className="space-y-6">
        <Alert>
          <Scale className="h-4 w-4" />
          <AlertDescription>
            Palliative Performance Scale: Observer-rated functional assessment correlating with prognosis.
            Validated for hospice eligibility (≤50%) and care planning.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Current PPS Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>PPS Score: {selectedPPS}%</Label>
              <Slider
                value={[selectedPPS]}
                onValueChange={(value) => setSelectedPPS(value[0])}
                min={0}
                max={100}
                step={10}
                className="w-full mt-2"
              />
            </div>

            {selectedLevel && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <strong>Ambulation:</strong> {selectedLevel.ambulation}
                </div>
                <div>
                  <strong>Activity:</strong> {selectedLevel.activity}
                </div>
                <div>
                  <strong>Evidence of Disease:</strong> {selectedLevel.evidence}
                </div>
                <div>
                  <strong>Self-care:</strong> {selectedLevel.selfcare}
                </div>
                <div>
                  <strong>Intake:</strong> {selectedLevel.intake}
                </div>
                <div>
                  <strong>Consciousness:</strong> {selectedLevel.consciousness}
                </div>
              </div>
            )}

            <div className={`p-4 rounded-lg border-l-4 ${prognosis.color === 'text-green-600' ? 'border-green-400 bg-green-50' : 
              prognosis.color === 'text-yellow-600' ? 'border-yellow-400 bg-yellow-50' : 
              prognosis.color === 'text-orange-600' ? 'border-orange-400 bg-orange-50' : 'border-red-400 bg-red-50'}`}>
              <h4 className="font-semibold mb-1">Prognostic Indication</h4>
              <p className={`${prognosis.color} font-medium`}>
                Typical survival: {prognosis.prognosis}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Note: PPS is one factor in prognostic assessment. Consider disease trajectory, comorbidities, and clinical judgment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderQualityIndicators = () => (
    <div className="space-y-6">
      <Alert>
        <BarChart3 className="h-4 w-4" />
        <AlertDescription>
          Evidence-based quality metrics from AAHPM "Measuring What Matters" initiative and CMS Quality Reporting Program.
        </AlertDescription>
      </Alert>

      {QUALITY_INDICATORS.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Quality Metric</th>
                    <th className="text-left p-3 font-semibold">Target</th>
                    <th className="text-left p-3 font-semibold">Evidence Base</th>
                  </tr>
                </thead>
                <tbody>
                  {category.indicators.map((indicator, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3 font-medium">{indicator.metric}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {indicator.target}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-gray-600">{indicator.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderInterventionProtocols = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Evidence-Based Intervention Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="pain-protocol">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-red-500" />
                  Pain Management Protocol (WHO Guidelines)
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-2">Step 1: Mild Pain (1-3/10)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Paracetamol 1g QID</li>
                        <li>• NSAIDs if appropriate</li>
                        <li>• Non-pharmacologic measures</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-yellow-600 mb-2">Step 2: Moderate Pain (4-6/10)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Tramadol 50-100mg QID</li>
                        <li>• Codeine 30-60mg QID</li>
                        <li>• Continue Step 1 medications</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-red-600 mb-2">Step 3: Severe Pain (7-10/10)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Morphine 5-15mg PO q4h</li>
                        <li>• Oxycodone 5-10mg PO q4h</li>
                        <li>• Fentanyl patch consideration</li>
                      </ul>
                    </div>
                  </div>
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Breakthrough pain:</strong> 10-15% of regular dose q1h PRN. Reassess total daily requirements every 24-48h.
                    </AlertDescription>
                  </Alert>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fatigue-protocol">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  Cancer-Related Fatigue Management
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Pharmacologic Interventions</h4>
                      <ul className="text-sm space-y-2">
                        <li><strong>Methylphenidate:</strong> 5-10mg BID (morning/noon)</li>
                        <li><strong>Modafinil:</strong> 100-200mg daily (morning)</li>
                        <li><strong>Dexamphetamine:</strong> 2.5-5mg BID</li>
                        <li><strong>American ginseng:</strong> 2000mg daily</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Non-Pharmacologic Approaches</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Structured exercise programs</li>
                        <li>• Energy conservation techniques</li>
                        <li>• Sleep hygiene optimization</li>
                        <li>• Cognitive behavioral therapy</li>
                        <li>• Mindfulness-based interventions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="depression-protocol">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-purple-500" />
                  Depression & Anxiety Management
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Screening Tools</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>PHQ-2:</strong> Initial screen (≥3 positive)</li>
                      <li>• <strong>PHQ-9:</strong> Full assessment if PHQ-2 positive</li>
                      <li>• <strong>GAD-7:</strong> Anxiety severity (≥10 moderate-severe)</li>
                      <li>• <strong>Distress Thermometer:</strong> ≥4 requires intervention</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">First-Line Medications</h4>
                      <ul className="text-sm space-y-2">
                        <li><strong>Sertraline:</strong> 25-50mg daily → 100-200mg</li>
                        <li><strong>Escitalopram:</strong> 10mg daily → 20mg</li>
                        <li><strong>Citalopram:</strong> 20mg daily → 40mg</li>
                        <li><strong>Mirtazapine:</strong> 15mg HS (appetite/sleep)</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Rapid-Acting Options</h4>
                      <ul className="text-sm space-y-2">
                        <li><strong>Methylphenidate:</strong> 5-10mg BID</li>
                        <li><strong>Ketamine:</strong> 0.5mg/kg IV (specialist use)</li>
                        <li><strong>Benzodiazepines:</strong> Short-term anxiety</li>
                        <li><strong>Dignity therapy:</strong> 3-4 sessions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Quality of Life Assessment & Management
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Evidence-based assessment tools and intervention protocols from international palliative care organizations.
          </p>
        </CardHeader>
      </Card>

      {/* Patient Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="patient-name">Patient Name/ID</Label>
              <Input
                id="patient-name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient identifier"
              />
            </div>
            <div>
              <Label htmlFor="assessment-date">Assessment Date</Label>
              <Input
                id="assessment-date"
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Assessment Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-2">
              <TabsTrigger value="assessment" className="flex items-center gap-2 p-3">
                <Stethoscope className="h-4 w-4" />
                ESAS Assessment
              </TabsTrigger>
              <TabsTrigger value="functional" className="flex items-center gap-2 p-3">
                <Activity className="h-4 w-4" />
                Performance Scale
              </TabsTrigger>
              <TabsTrigger value="quality" className="flex items-center gap-2 p-3">
                <BarChart3 className="h-4 w-4" />
                Quality Indicators
              </TabsTrigger>
              <TabsTrigger value="interventions" className="flex items-center gap-2 p-3">
                <Zap className="h-4 w-4" />
                Treatment Protocols
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="assessment" className="mt-0">
              {renderESASAssessment()}
            </TabsContent>

            <TabsContent value="functional" className="mt-0">
              {renderPPSAssessment()}
            </TabsContent>

            <TabsContent value="quality" className="mt-0">
              {renderQualityIndicators()}
            </TabsContent>

            <TabsContent value="interventions" className="mt-0">
              {renderInterventionProtocols()}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Research & Validation Notice */}
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          <strong>Research Validation:</strong> ESAS-r validated in 20+ languages across diverse populations. 
          PPS correlates with prognosis (r=0.89 with physician estimates). Quality indicators derived from 
          systematic reviews and expert consensus (AAHPM, CMS Quality Reporting Program).
        </AlertDescription>
      </Alert>
    </div>
  );
}