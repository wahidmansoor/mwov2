import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";

interface PainAssessmentFormProps {
  onScoreChange: (score: number) => void;
  onAssessmentComplete: (complete: boolean) => void;
}

export function PainAssessmentForm({ onScoreChange, onAssessmentComplete }: PainAssessmentFormProps) {
  const [currentPain, setCurrentPain] = useState([0]);
  const [worstPain, setWorstPain] = useState([0]);
  const [averagePain, setAveragePain] = useState([0]);
  const [painLocation, setPainLocation] = useState<string[]>([]);
  const [painQuality, setPainQuality] = useState<string[]>([]);
  const [painPattern, setPainPattern] = useState("");
  const [functionalImpact, setFunctionalImpact] = useState([0]);
  const [moodImpact, setMoodImpact] = useState([0]);
  const [triggeringFactors, setTriggeringFactors] = useState("");
  const [relievingFactors, setRelievingFactors] = useState("");

  const painQualities = [
    "Sharp", "Burning", "Aching", "Shooting", "Stabbing", "Throbbing",
    "Cramping", "Tingling", "Numbness", "Electric-like", "Deep", "Gnawing"
  ];

  const painLocations = [
    "Head/Neck", "Chest", "Abdomen", "Back", "Arms", "Legs", 
    "Hands", "Feet", "Pelvis", "Widespread", "Other"
  ];

  const painPatterns = [
    { value: "constant", label: "Constant" },
    { value: "intermittent", label: "Intermittent" },
    { value: "breakthrough", label: "Breakthrough" },
    { value: "incident", label: "Incident-related" }
  ];

  useEffect(() => {
    onScoreChange(currentPain[0]);
  }, [currentPain, onScoreChange]);

  useEffect(() => {
    const isComplete = 
      currentPain[0] > 0 || 
      painLocation.length > 0 || 
      painQuality.length > 0 || 
      painPattern !== "";
    onAssessmentComplete(isComplete);
  }, [currentPain, painLocation, painQuality, painPattern, onAssessmentComplete]);

  const getPainSeverity = (score: number) => {
    if (score === 0) return { label: "No Pain", color: "bg-green-500" };
    if (score <= 3) return { label: "Mild", color: "bg-yellow-500" };
    if (score <= 6) return { label: "Moderate", color: "bg-orange-500" };
    return { label: "Severe", color: "bg-red-500" };
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setPainLocation([...painLocation, location]);
    } else {
      setPainLocation(painLocation.filter(l => l !== location));
    }
  };

  const handleQualityChange = (quality: string, checked: boolean) => {
    if (checked) {
      setPainQuality([...painQuality, quality]);
    } else {
      setPainQuality(painQuality.filter(q => q !== quality));
    }
  };

  const currentSeverity = getPainSeverity(currentPain[0]);
  const worstSeverity = getPainSeverity(worstPain[0]);

  return (
    <div className="space-y-6">
      {/* Pain Intensity Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Pain Intensity Assessment
            <Badge variant="outline">Numerical Rating Scale (0-10)</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Pain */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Current Pain Level</Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{currentPain[0]}</span>
                <Badge className={`${currentSeverity.color} text-white`}>
                  {currentSeverity.label}
                </Badge>
              </div>
            </div>
            <Slider
              value={currentPain}
              onValueChange={setCurrentPain}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>No Pain</span>
              <span>Worst Possible Pain</span>
            </div>
          </div>

          {/* Worst Pain in 24h */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Worst Pain (Last 24 hours)</Label>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{worstPain[0]}</span>
                <Badge className={`${worstSeverity.color} text-white`}>
                  {worstSeverity.label}
                </Badge>
              </div>
            </div>
            <Slider
              value={worstPain}
              onValueChange={setWorstPain}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Average Pain */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Average Pain (Last Week)</Label>
              <span className="text-xl font-bold">{averagePain[0]}</span>
            </div>
            <Slider
              value={averagePain}
              onValueChange={setAveragePain}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pain Characteristics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pain Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Pain Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {painLocations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={painLocation.includes(location)}
                    onCheckedChange={(checked) => 
                      handleLocationChange(location, checked as boolean)
                    }
                  />
                  <Label htmlFor={location} className="text-sm">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pain Quality */}
        <Card>
          <CardHeader>
            <CardTitle>Pain Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {painQualities.map((quality) => (
                <div key={quality} className="flex items-center space-x-2">
                  <Checkbox
                    id={quality}
                    checked={painQuality.includes(quality)}
                    onCheckedChange={(checked) => 
                      handleQualityChange(quality, checked as boolean)
                    }
                  />
                  <Label htmlFor={quality} className="text-sm">
                    {quality}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pain Pattern and Impact */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pain Pattern
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={painPattern} onValueChange={setPainPattern}>
              <SelectTrigger>
                <SelectValue placeholder="Select pain pattern" />
              </SelectTrigger>
              <SelectContent>
                {painPatterns.map((pattern) => (
                  <SelectItem key={pattern.value} value={pattern.value}>
                    {pattern.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Functional Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Impact on Daily Activities (0-10)</Label>
              <Slider
                value={functionalImpact}
                onValueChange={setFunctionalImpact}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="text-center text-sm font-medium">
                {functionalImpact[0]}/10
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Impact on Mood (0-10)</Label>
              <Slider
                value={moodImpact}
                onValueChange={setMoodImpact}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="text-center text-sm font-medium">
                {moodImpact[0]}/10
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modifying Factors */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Triggering Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What makes the pain worse? (movement, position, activity, time of day, etc.)"
              value={triggeringFactors}
              onChange={(e) => setTriggeringFactors(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relieving Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What helps reduce the pain? (rest, position, heat/cold, medications, etc.)"
              value={relievingFactors}
              onChange={(e) => setRelievingFactors(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
      </div>

      {/* Assessment Summary */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-green-800 dark:text-green-200">
                Assessment Progress
              </h4>
              <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <div>• Pain Intensity: {currentPain[0]}/10 ({currentSeverity.label})</div>
                <div>• Location(s): {painLocation.length > 0 ? painLocation.join(", ") : "Not specified"}</div>
                <div>• Quality: {painQuality.length > 0 ? painQuality.join(", ") : "Not specified"}</div>
                <div>• Pattern: {painPattern || "Not specified"}</div>
                <div>• Functional Impact: {functionalImpact[0]}/10</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1">
          Generate AI Analysis
        </Button>
        <Button variant="outline" className="flex-1">
          Save Assessment
        </Button>
        <Button variant="outline">
          Print Report
        </Button>
      </div>
    </div>
  );
}