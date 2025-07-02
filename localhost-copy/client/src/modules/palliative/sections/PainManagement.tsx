import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  Calculator, 
  TrendingUp, 
  Save, 
  AlertTriangle,
  Clock,
  MapPin,
  Pill
} from "lucide-react";

const painTypes = [
  "Nociceptive", "Neuropathic", "Mixed", "Breakthrough", "Incident", "Visceral", "Somatic"
];

const painLocations = [
  "Head/Neck", "Chest", "Abdomen", "Back", "Arms", "Legs", "Generalized", "Other"
];

const painQualities = [
  "Sharp", "Dull", "Burning", "Shooting", "Cramping", "Throbbing", "Stabbing", "Aching"
];

const getSeverityLevel = (score: number): string => {
  if (score === 0) return "No Pain";
  if (score <= 3) return "Mild";
  if (score <= 6) return "Moderate";
  return "Severe";
};

const getSeverityColor = (score: number): string => {
  if (score === 0) return "bg-gray-100 text-gray-800";
  if (score <= 3) return "bg-green-100 text-green-800";
  if (score <= 6) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getPainLadderStep = (score: number) => {
  if (score <= 3) return {
    step: 1,
    title: "Mild Pain (1-3)",
    medications: ["Acetaminophen", "NSAIDs", "Topical analgesics"],
    color: "bg-green-50 border-green-200"
  };
  if (score <= 6) return {
    step: 2,
    title: "Moderate Pain (4-6)",
    medications: ["Weak opioids", "Codeine", "Tramadol", "+ Step 1"],
    color: "bg-yellow-50 border-yellow-200"
  };
  return {
    step: 3,
    title: "Severe Pain (7-10)",
    medications: ["Strong opioids", "Morphine", "Oxycodone", "Fentanyl", "+ Step 1"],
    color: "bg-red-50 border-red-200"
  };
};

export default function PainManagement() {
  const [painScore, setPainScore] = useState([0]);
  const [painType, setPainType] = useState("");
  const [painLocation, setPainLocation] = useState("");
  const [painQuality, setPainQuality] = useState("");
  const [painNotes, setPainNotes] = useState("");
  
  const currentScore = painScore[0];
  const severity = getSeverityLevel(currentScore);
  const ladderStep = getPainLadderStep(currentScore);

  const handleSaveAssessment = () => {
    console.log("Pain assessment saved:", {
      score: currentScore,
      type: painType,
      location: painLocation,
      quality: painQuality,
      notes: painNotes
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-red-600" />
            Enhanced Pain Management Assessment
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pain Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-red-600" />
              Pain Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pain Score Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Pain Intensity (0-10)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{currentScore}</span>
                  <Badge className={getSeverityColor(currentScore)}>
                    {severity}
                  </Badge>
                </div>
              </div>
              <Slider
                value={painScore}
                onValueChange={setPainScore}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 - No Pain</span>
                <span>5 - Moderate</span>
                <span>10 - Worst Possible</span>
              </div>
            </div>

            {/* Pain Details */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="painType">Pain Type</Label>
                <Select value={painType} onValueChange={setPainType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pain type" />
                  </SelectTrigger>
                  <SelectContent>
                    {painTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="painLocation">Location</Label>
                <Select value={painLocation} onValueChange={setPainLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {painLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="painQuality">Quality</Label>
                <Select value={painQuality} onValueChange={setPainQuality}>
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

              <div>
                <Label htmlFor="painNotes">Clinical Notes</Label>
                <Textarea
                  id="painNotes"
                  placeholder="Additional assessment notes..."
                  value={painNotes}
                  onChange={(e) => setPainNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {currentScore >= 7 && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Severe Pain Alert</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  High pain score requires immediate attention and aggressive pain management.
                </p>
              </div>
            )}

            <Button onClick={handleSaveAssessment} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Assessment
            </Button>
          </CardContent>
        </Card>

        {/* WHO Pain Ladder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              WHO Pain Ladder Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg border-2 ${ladderStep.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {ladderStep.step}
                </div>
                <h3 className="font-semibold text-lg">{ladderStep.title}</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recommended Medications:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ladderStep.medications.map((med, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {med}
                      </Badge>
                    ))}
                  </div>
                </div>

                {ladderStep.step === 1 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>• Start with non-opioid analgesics</p>
                    <p>• Consider adjuvant medications</p>
                    <p>• Assess for breakthrough pain</p>
                  </div>
                )}

                {ladderStep.step === 2 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>• Add weak opioids to Step 1 medications</p>
                    <p>• Monitor for side effects</p>
                    <p>• Consider dose titration</p>
                  </div>
                )}

                {ladderStep.step === 3 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>• Strong opioids required</p>
                    <p>• Continue Step 1 medications</p>
                    <p>• Monitor closely for adverse effects</p>
                    <p>• Consider specialist referral</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-green-600" />
            Quick Pain Management Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Breakthrough Pain</h3>
                <p className="text-sm text-gray-600">Short-acting opioid PRN</p>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Opioid Conversion</h3>
                <p className="text-sm text-gray-600">Morphine equivalent calculator</p>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Regional Therapy</h3>
                <p className="text-sm text-gray-600">Nerve blocks and procedures</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}