import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Activity, 
  Pill, 
  AlertCircle, 
  Target, 
  Stethoscope,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PainAssessment {
  intensity: number;
  type: string;
  location: string;
  quality: string;
}

export default function PainManagement() {
  const [painScore, setPainScore] = useState([0]);
  const [painType, setPainType] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const painTypes = [
    {
      type: "Nociceptive - Somatic",
      description: "Sharp, localized pain (e.g., bone metastases)",
      example: "Aching, stabbing, throbbing",
      color: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
    },
    {
      type: "Nociceptive - Visceral", 
      description: "Dull, cramping, poorly localized",
      example: "Deep cramping, pressure-like",
      color: "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800"
    },
    {
      type: "Neuropathic",
      description: "Burning, electric, shooting pain from nerve damage",
      example: "Post-chemotherapy neuropathy",
      color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
    },
    {
      type: "Mixed Pain",
      description: "Combination of nociceptive and neuropathic",
      example: "Common in advanced cancer",
      color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
    }
  ];

  const whoLadder = [
    {
      step: "Step 1",
      range: "Mild Pain (1-3)",
      medications: ["Acetaminophen 500-1000mg q6h", "NSAIDs (Ibuprofen 400-600mg q6h)", "Topical agents"],
      adjuvants: ["Heat/cold therapy", "TENS", "Physical therapy"],
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    },
    {
      step: "Step 2", 
      range: "Moderate Pain (4-6)",
      medications: ["Tramadol 50-100mg q6h", "Codeine combinations", "Continue Step 1 agents"],
      adjuvants: ["Gabapentin for neuropathic", "Tricyclic antidepressants", "CBT"],
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    },
    {
      step: "Step 3",
      range: "Severe Pain (7-10)",
      medications: ["Morphine 5-10mg PO q4h", "Oxycodone 5mg PO q4-6h", "Hydromorphone 2mg PO q4-6h"],
      adjuvants: ["Continue effective adjuvants", "Consider nerve blocks", "Palliative procedures"],
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    }
  ];

  const opioidManagement = [
    {
      category: "Starting Principles",
      points: [
        "Start low, go slow with opioid-naive patients",
        "Regular dosing for constant pain, PRN for breakthrough",
        "Immediate-release before long-acting formulations",
        "Monitor for effectiveness and side effects"
      ]
    },
    {
      category: "Side Effect Prevention",
      points: [
        "Prophylactic bowel regimen with all opioids",
        "Antiemetics for first 1-2 weeks if needed",
        "Monitor respiratory status, especially in elderly",
        "Educate about drowsiness (usually temporary)"
      ]
    },
    {
      category: "Dose Conversion",
      points: [
        "Morphine PO:IV ratio 3:1",
        "Cross-tolerance: reduce by 25-50% when switching",
        "Fentanyl patches: only for stable pain requirements",
        "Consult conversion tables for complex switches"
      ]
    }
  ];

  const assessmentTools = [
    { tool: "Numeric Rating Scale (0-10)", use: "Most common, easy to use", note: "Gold standard" },
    { tool: "Visual Analog Scale", use: "Continuous scale measurement", note: "Research applications" },
    { tool: "Wong-Baker FACES", use: "Children, cognitive impairment", note: "Visual representation" },
    { tool: "PQRST Method", use: "Comprehensive pain history", note: "Provocation, Quality, Region, Severity, Timing" }
  ];

  const getPainSeverity = (score: number) => {
    if (score <= 3) return { text: "Mild", color: "text-green-600 dark:text-green-400", step: "Step 1" };
    if (score <= 6) return { text: "Moderate", color: "text-yellow-600 dark:text-yellow-400", step: "Step 2" };
    return { text: "Severe", color: "text-red-600 dark:text-red-400", step: "Step 3" };
  };

  const severity = getPainSeverity(painScore[0]);

  return (
    <div className="space-y-6">
      {/* Pain Assessment Interactive Tool */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-600" />
            Interactive Pain Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-base font-medium">Pain Intensity (0-10 Scale)</Label>
              <div className="mt-2">
                <Slider
                  value={painScore}
                  onValueChange={setPainScore}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>No Pain</span>
                  <span className={cn("font-semibold text-lg", severity.color)}>
                    {painScore[0]} - {severity.text}
                  </span>
                  <span>Worst Pain</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">Pain Type</Label>
              <RadioGroup value={painType} onValueChange={setPainType} className="mt-2">
                {painTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.type} id={type.type} />
                    <Label htmlFor={type.type} className="text-sm">{type.type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          {painScore[0] > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                Recommended Approach: WHO {severity.step}
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                Based on pain score of {painScore[0]}, consider {severity.step} interventions for {severity.text.toLowerCase()} pain management.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* WHO Analgesic Ladder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            WHO Analgesic Ladder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {whoLadder.map((step, index) => (
              <Card key={index} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={step.color}>{step.step}</Badge>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {step.range}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Primary Medications:</h4>
                    <ul className="text-xs space-y-1">
                      {step.medications.map((med, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Pill className="h-3 w-3 mt-0.5 text-gray-400 flex-shrink-0" />
                          {med}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Adjuvant Therapy:</h4>
                    <ul className="text-xs space-y-1">
                      {step.adjuvants.map((adj, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Shield className="h-3 w-3 mt-0.5 text-gray-400 flex-shrink-0" />
                          {adj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pain Types Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-purple-600" />
            Pain Classification & Characteristics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {painTypes.map((type, index) => (
              <Card key={index} className={cn("border-2", type.color)}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{type.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {type.description}
                  </p>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                    <span className="font-medium">Example: </span>
                    <span className="italic">{type.example}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opioid Management Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Opioid Management Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="startingprinciples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="startingprinciples">Starting Principles</TabsTrigger>
              <TabsTrigger value="sideeffectprevention">Side Effects</TabsTrigger>
              <TabsTrigger value="doseconversion">Dose Conversion</TabsTrigger>
            </TabsList>
            
            {opioidManagement.map((section, index) => (
              <TabsContent key={index} value={section.category.toLowerCase().replace(/\s+/g, '')}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {section.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Assessment Tools Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Assessment Tools & Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Assessment Tool</th>
                  <th className="text-left p-3 font-semibold">Primary Use</th>
                  <th className="text-left p-3 font-semibold">Clinical Note</th>
                </tr>
              </thead>
              <tbody>
                {assessmentTools.map((tool, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-3 font-medium">{tool.tool}</td>
                    <td className="p-3">{tool.use}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{tool.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Decision Support Note */}
      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
              Pain Management Considerations
            </h4>
            <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
              <li>• Always assess for underlying causes that may be reversible</li>
              <li>• Consider non-pharmacological interventions as part of comprehensive care</li>
              <li>• Monitor for signs of opioid tolerance, dependence, or misuse</li>
              <li>• Involve interdisciplinary team for complex pain management</li>
              <li>• Regular reassessment and adjustment of pain management plan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}