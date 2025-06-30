import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Calculator, 
  Zap, 
  Clock, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Plus,
  Activity
} from "lucide-react";

interface OpioidConversion {
  fromMed: string;
  toMed: string;
  conversionFactor: number;
  routeFrom: string;
  routeTo: string;
  notes?: string;
  evidenceLevel: string;
}

interface PainAssessment {
  id: string;
  sessionId: string;
  painType: string;
  location: string;
  scale: number;
  quality: string;
  duration: string;
  exacerbatingFactors: string;
  relievingFactors: string;
  functionalImpact: string;
  notes: string;
  createdAt: string;
}

const painLadder = [
  {
    step: 1,
    title: "Mild Pain (1-3)",
    medications: ["Acetaminophen", "NSAIDs", "Topical analgesics"],
    description: "Non-opioid analgesics, adjuvant therapy"
  },
  {
    step: 2,
    title: "Moderate Pain (4-6)",
    medications: ["Weak opioids", "Codeine", "Tramadol", "Low-dose morphine"],
    description: "Step 1 + weak opioids, adjuvant therapy"
  },
  {
    step: 3,
    title: "Severe Pain (7-10)",
    medications: ["Strong opioids", "Morphine", "Oxycodone", "Fentanyl", "Hydromorphone"],
    description: "Step 1 + strong opioids, adjuvant therapy"
  }
];

const opioidMedications = [
  "Morphine PO", "Morphine IV", "Oxycodone PO", "Hydromorphone PO", "Hydromorphone IV",
  "Fentanyl Patch", "Fentanyl IV", "Codeine PO", "Tramadol PO", "Methadone PO"
];

const routes = ["PO", "IV", "SC", "Patch", "Rectal", "Intranasal"];

export default function EnhancedPainManagement() {
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [painAssessment, setPainAssessment] = useState({
    painType: "",
    location: "",
    scale: 0,
    quality: "",
    duration: "",
    exacerbatingFactors: "",
    relievingFactors: "",
    functionalImpact: "",
    notes: ""
  });

  const [conversionData, setConversionData] = useState({
    fromMed: "",
    fromDose: "",
    fromRoute: "",
    toMed: "",
    toRoute: ""
  });

  const [breakthroughData, setBreakthroughData] = useState({
    medicationGiven: "",
    dose: "",
    route: "",
    responseRating: 0,
    timeToOnset: "",
    duration: "",
    sideEffects: "",
    notes: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch opioid conversion data
  const { data: conversions = [] } = useQuery({
    queryKey: ['/api/palliative/opioid-conversions'],
    queryFn: async () => {
      const response = await fetch('/api/palliative/opioid-conversions');
      if (!response.ok) throw new Error('Failed to fetch conversions');
      return response.json();
    }
  });

  // Fetch pain assessments
  const { data: assessments = [] } = useQuery({
    queryKey: ['/api/palliative/pain-assessments', sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/palliative/pain-assessments?sessionId=${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch assessments');
      return response.json();
    }
  });

  // Save pain assessment mutation
  const saveAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/palliative/pain-assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sessionId })
      });
      if (!response.ok) throw new Error('Failed to save assessment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/palliative/pain-assessments'] });
      toast({ title: "Pain assessment saved successfully" });
    }
  });

  // Save breakthrough pain mutation
  const saveBreakthroughMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/palliative/breakthrough-pain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sessionId })
      });
      if (!response.ok) throw new Error('Failed to save breakthrough pain data');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Breakthrough pain data saved successfully" });
      setBreakthroughData({
        medicationGiven: "",
        dose: "",
        route: "",
        responseRating: 0,
        timeToOnset: "",
        duration: "",
        sideEffects: "",
        notes: ""
      });
    }
  });

  const calculateOpioidConversion = () => {
    const conversion = conversions.find((c: OpioidConversion) => 
      c.fromMed === conversionData.fromMed && 
      c.toMed === conversionData.toMed &&
      c.routeFrom === conversionData.fromRoute &&
      c.routeTo === conversionData.toRoute
    );

    if (!conversion) {
      toast({ 
        title: "Conversion not found", 
        description: "No conversion factor available for this combination",
        variant: "destructive"
      });
      return null;
    }

    const fromDose = parseFloat(conversionData.fromDose);
    if (isNaN(fromDose)) {
      toast({ 
        title: "Invalid dose", 
        description: "Please enter a valid numeric dose",
        variant: "destructive" 
      });
      return null;
    }

    const convertedDose = fromDose * conversion.conversionFactor;
    return {
      convertedDose: convertedDose.toFixed(2),
      conversion
    };
  };

  const getPainLadderStep = (score: number) => {
    if (score <= 3) return painLadder[0];
    if (score <= 6) return painLadder[1];
    return painLadder[2];
  };

  const handleSaveAssessment = () => {
    saveAssessmentMutation.mutate(painAssessment);
  };

  const handleSaveBreakthrough = () => {
    const numericData = {
      ...breakthroughData,
      timeToOnset: breakthroughData.timeToOnset ? parseInt(breakthroughData.timeToOnset) : null,
      duration: breakthroughData.duration ? parseInt(breakthroughData.duration) : null
    };
    saveBreakthroughMutation.mutate(numericData);
  };

  const conversionResult = calculateOpioidConversion();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment">Pain Assessment</TabsTrigger>
          <TabsTrigger value="ladder">WHO Pain Ladder</TabsTrigger>
          <TabsTrigger value="conversion">Opioid Converter</TabsTrigger>
          <TabsTrigger value="breakthrough">Breakthrough Pain</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-600" />
                Comprehensive Pain Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="painType">Pain Type</Label>
                  <Select value={painAssessment.painType} onValueChange={(value) => 
                    setPainAssessment(prev => ({ ...prev, painType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pain type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nociceptive">Nociceptive</SelectItem>
                      <SelectItem value="neuropathic">Neuropathic</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                      <SelectItem value="breakthrough">Breakthrough</SelectItem>
                      <SelectItem value="incident">Incident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    value={painAssessment.location}
                    onChange={(e) => setPainAssessment(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Lower back, chest, abdomen"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scale">Pain Scale (0-10)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={painAssessment.scale}
                      onChange={(e) => setPainAssessment(prev => ({ ...prev, scale: parseInt(e.target.value) || 0 }))}
                      className="w-20"
                    />
                    <Badge className={
                      painAssessment.scale === 0 ? "bg-gray-100 text-gray-800" :
                      painAssessment.scale <= 3 ? "bg-green-100 text-green-800" :
                      painAssessment.scale <= 6 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {painAssessment.scale === 0 ? "No Pain" :
                       painAssessment.scale <= 3 ? "Mild" :
                       painAssessment.scale <= 6 ? "Moderate" : "Severe"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality</Label>
                  <Select value={painAssessment.quality} onValueChange={(value) => 
                    setPainAssessment(prev => ({ ...prev, quality: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Describe pain quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sharp">Sharp</SelectItem>
                      <SelectItem value="dull">Dull</SelectItem>
                      <SelectItem value="burning">Burning</SelectItem>
                      <SelectItem value="throbbing">Throbbing</SelectItem>
                      <SelectItem value="cramping">Cramping</SelectItem>
                      <SelectItem value="shooting">Shooting</SelectItem>
                      <SelectItem value="stabbing">Stabbing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={painAssessment.duration} onValueChange={(value) => 
                    setPainAssessment(prev => ({ ...prev, duration: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acute">Acute (&lt; 3 months)</SelectItem>
                      <SelectItem value="chronic">Chronic (&gt; 3 months)</SelectItem>
                      <SelectItem value="intermittent">Intermittent</SelectItem>
                      <SelectItem value="constant">Constant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="functionalImpact">Functional Impact</Label>
                  <Select value={painAssessment.functionalImpact} onValueChange={(value) => 
                    setPainAssessment(prev => ({ ...prev, functionalImpact: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                      <SelectItem value="complete">Complete limitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exacerbating">Exacerbating Factors</Label>
                  <Textarea
                    value={painAssessment.exacerbatingFactors}
                    onChange={(e) => setPainAssessment(prev => ({ ...prev, exacerbatingFactors: e.target.value }))}
                    placeholder="What makes the pain worse?"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relieving">Relieving Factors</Label>
                  <Textarea
                    value={painAssessment.relievingFactors}
                    onChange={(e) => setPainAssessment(prev => ({ ...prev, relievingFactors: e.target.value }))}
                    placeholder="What helps relieve the pain?"
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  value={painAssessment.notes}
                  onChange={(e) => setPainAssessment(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional clinical observations..."
                  className="min-h-[100px]"
                />
              </div>

              {painAssessment.scale >= 7 && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-200 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Severe Pain Alert</span>
                  </div>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Consider immediate intervention with strong opioids (WHO Step 3) and adjuvant therapy. 
                    Reassess in 30-60 minutes.
                  </p>
                </div>
              )}

              <Button onClick={handleSaveAssessment} disabled={saveAssessmentMutation.isPending}>
                <FileText className="h-4 w-4 mr-2" />
                Save Assessment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ladder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                WHO Analgesic Ladder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {painLadder.map((step, index) => (
                  <Card key={index} className={`p-4 ${
                    painAssessment.scale > 0 && getPainLadderStep(painAssessment.scale).step === step.step
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : ''
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.medications.map((med, medIndex) => (
                            <Badge key={medIndex} variant="secondary">
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                Opioid Equianalgesic Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">From Medication</h3>
                  <div className="space-y-2">
                    <Label>Medication</Label>
                    <Select value={conversionData.fromMed} onValueChange={(value) => 
                      setConversionData(prev => ({ ...prev, fromMed: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication" />
                      </SelectTrigger>
                      <SelectContent>
                        {opioidMedications.map(med => (
                          <SelectItem key={med} value={med}>{med}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dose (mg/day)</Label>
                    <Input
                      type="number"
                      value={conversionData.fromDose}
                      onChange={(e) => setConversionData(prev => ({ ...prev, fromDose: e.target.value }))}
                      placeholder="Enter daily dose"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Route</Label>
                    <Select value={conversionData.fromRoute} onValueChange={(value) => 
                      setConversionData(prev => ({ ...prev, fromRoute: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map(route => (
                          <SelectItem key={route} value={route}>{route}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">To Medication</h3>
                  <div className="space-y-2">
                    <Label>Medication</Label>
                    <Select value={conversionData.toMed} onValueChange={(value) => 
                      setConversionData(prev => ({ ...prev, toMed: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication" />
                      </SelectTrigger>
                      <SelectContent>
                        {opioidMedications.map(med => (
                          <SelectItem key={med} value={med}>{med}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Route</Label>
                    <Select value={conversionData.toRoute} onValueChange={(value) => 
                      setConversionData(prev => ({ ...prev, toRoute: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map(route => (
                          <SelectItem key={route} value={route}>{route}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {conversionResult && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Conversion Result</h3>
                  <p className="text-green-700 dark:text-green-300">
                    <strong>{conversionData.fromDose}mg/day {conversionData.fromMed} {conversionData.fromRoute}</strong>
                    {' '}is equivalent to{' '}
                    <strong>{conversionResult.convertedDose}mg/day {conversionData.toMed} {conversionData.toRoute}</strong>
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Evidence Level: {conversionResult.conversion.evidenceLevel}
                  </p>
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Clinical Note:</strong> Consider reducing by 25-50% for cross-tolerance and titrate to effect.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakthrough" className="space-y-6">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Breakthrough Pain Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Medication Given</Label>
                  <Select value={breakthroughData.medicationGiven} onValueChange={(value) => 
                    setBreakthroughData(prev => ({ ...prev, medicationGiven: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select medication" />
                    </SelectTrigger>
                    <SelectContent>
                      {opioidMedications.map(med => (
                        <SelectItem key={med} value={med}>{med}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dose</Label>
                  <Input
                    value={breakthroughData.dose}
                    onChange={(e) => setBreakthroughData(prev => ({ ...prev, dose: e.target.value }))}
                    placeholder="e.g., 5mg, 0.2ml"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Route</Label>
                  <Select value={breakthroughData.route} onValueChange={(value) => 
                    setBreakthroughData(prev => ({ ...prev, route: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select route" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map(route => (
                        <SelectItem key={route} value={route}>{route}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Response Rating (1-5)</Label>
                  <Select value={breakthroughData.responseRating.toString()} onValueChange={(value) => 
                    setBreakthroughData(prev => ({ ...prev, responseRating: parseInt(value) }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate response" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - No relief</SelectItem>
                      <SelectItem value="2">2 - Minimal relief</SelectItem>
                      <SelectItem value="3">3 - Moderate relief</SelectItem>
                      <SelectItem value="4">4 - Good relief</SelectItem>
                      <SelectItem value="5">5 - Complete relief</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time to Onset (minutes)</Label>
                  <Input
                    type="number"
                    value={breakthroughData.timeToOnset}
                    onChange={(e) => setBreakthroughData(prev => ({ ...prev, timeToOnset: e.target.value }))}
                    placeholder="e.g., 15"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={breakthroughData.duration}
                    onChange={(e) => setBreakthroughData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 120"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Side Effects</Label>
                <Textarea
                  value={breakthroughData.sideEffects}
                  onChange={(e) => setBreakthroughData(prev => ({ ...prev, sideEffects: e.target.value }))}
                  placeholder="Document any side effects observed..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Clinical Notes</Label>
                <Textarea
                  value={breakthroughData.notes}
                  onChange={(e) => setBreakthroughData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional clinical observations..."
                  className="min-h-[80px]"
                />
              </div>

              <Button onClick={handleSaveBreakthrough} disabled={saveBreakthroughMutation.isPending}>
                <Plus className="h-4 w-4 mr-2" />
                Record Breakthrough Episode
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}