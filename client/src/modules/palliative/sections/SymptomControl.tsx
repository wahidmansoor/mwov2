import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  TrendingUp, 
  Download, 
  Save, 
  AlertTriangle,
  Heart,
  Zap,
  Moon,
  Utensils,
  Wind,
  Brain,
  Droplets,
  Thermometer
} from "lucide-react";

const symptoms = [
  { id: "pain", name: "Pain", icon: Zap, color: "text-red-600" },
  { id: "fatigue", name: "Fatigue", icon: Activity, color: "text-orange-600" },
  { id: "nausea", name: "Nausea", icon: Droplets, color: "text-green-600" },
  { id: "dyspnea", name: "Dyspnea", icon: Wind, color: "text-blue-600" },
  { id: "sleep", name: "Sleep Disturbance", icon: Moon, color: "text-purple-600" },
  { id: "appetite", name: "Appetite Loss", icon: Utensils, color: "text-yellow-600" },
  { id: "anxiety", name: "Anxiety", icon: Brain, color: "text-pink-600" },
  { id: "depression", name: "Depression", icon: Heart, color: "text-gray-600" },
  { id: "fever", name: "Fever", icon: Thermometer, color: "text-red-500" }
];

const getSeverityLevel = (score: number): string => {
  if (score === 0) return "None";
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

// FORCE BROWSER CACHE REFRESH - ENHANCED INTERACTIVE SYMPTOM CONTROL v2.0
export default function SymptomControl() {
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [currentScores, setCurrentScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch historical symptom scores for trends
  const { data: historicalScores = [] } = useQuery({
    queryKey: ['/api/palliative/symptom-scores', sessionId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/palliative/symptom-scores?sessionId=${sessionId}`);
        if (!response.ok) return [];
        return response.json();
      } catch {
        return [];
      }
    }
  });

  // Save symptom score mutation
  const saveScoreMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/palliative/symptom-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to save symptom score');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/palliative/symptom-scores'] });
      toast({ title: "Symptom score saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save symptom score", variant: "destructive" });
    }
  });

  const handleScoreChange = (symptomId: string, value: number[]) => {
    setCurrentScores(prev => ({ ...prev, [symptomId]: value[0] }));
  };

  const handleSaveScore = (symptomId: string) => {
    const score = currentScores[symptomId] || 0;
    const symptomName = symptoms.find(s => s.id === symptomId)?.name || symptomId;
    
    saveScoreMutation.mutate({
      sessionId,
      symptom: symptomName,
      score,
      severity: getSeverityLevel(score),
      notes: notes[symptomId] || ""
    });
  };

  const handleSaveAllScores = () => {
    symptoms.forEach(symptom => {
      if (currentScores[symptom.id] !== undefined) {
        handleSaveScore(symptom.id);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              🎯 ENHANCED INTERACTIVE SYMPTOM CONTROL LOADED - v2.0
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveAllScores} size="sm" disabled={saveScoreMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Use the interactive sliders below to assess symptom severity on a scale of 0-10. 
              Real-time scoring provides immediate severity classification and clinical recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptoms.map((symptom) => {
                const Icon = symptom.icon;
                const score = currentScores[symptom.id] || 0;
                const severity = getSeverityLevel(score);

                return (
                  <Card key={symptom.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${symptom.color}`} />
                          <h3 className="font-medium">{symptom.name}</h3>
                        </div>
                        <Badge className={getSeverityColor(score)}>
                          {severity}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>0 - None</span>
                          <span className="font-medium text-lg">{score}/10</span>
                          <span>10 - Severe</span>
                        </div>
                        <Slider
                          value={[score]}
                          onValueChange={(value) => handleScoreChange(symptom.id, value)}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <Textarea
                        placeholder="Additional notes..."
                        value={notes[symptom.id] || ""}
                        onChange={(e) => setNotes(prev => ({ ...prev, [symptom.id]: e.target.value }))}
                        className="min-h-[60px] text-sm"
                      />

                      {score >= 7 && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">High severity - Consider urgent intervention</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={() => handleSaveScore(symptom.id)}
                        size="sm" 
                        className="w-full"
                        disabled={saveScoreMutation.isPending}
                      >
                        Save Score
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Symptom Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {symptoms.filter(s => getSeverityLevel(currentScores[s.id] || 0) === "None").length}
              </div>
              <div className="text-sm text-muted-foreground">No Symptoms</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {symptoms.filter(s => getSeverityLevel(currentScores[s.id] || 0) === "Mild").length}
              </div>
              <div className="text-sm text-muted-foreground">Mild</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {symptoms.filter(s => getSeverityLevel(currentScores[s.id] || 0) === "Moderate").length}
              </div>
              <div className="text-sm text-muted-foreground">Moderate</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {symptoms.filter(s => getSeverityLevel(currentScores[s.id] || 0) === "Severe").length}
              </div>
              <div className="text-sm text-muted-foreground">Severe</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}