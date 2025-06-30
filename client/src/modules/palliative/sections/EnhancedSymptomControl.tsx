import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface SymptomScore {
  id: string;
  sessionId: string;
  symptom: string;
  score: number;
  location?: string;
  severity: string;
  notes?: string;
  createdAt: string;
}

interface SymptomProtocol {
  symptom: string;
  severityLevel: string;
  recommendations: any;
  evidenceLevel: string;
  guidelineSource: string;
}

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

export default function EnhancedSymptomControl() {
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [currentScores, setCurrentScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch historical symptom scores for trends
  const { data: historicalScores = [] } = useQuery({
    queryKey: ['/api/palliative/symptom-scores', sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/palliative/symptom-scores?sessionId=${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch symptom scores');
      return response.json();
    }
  });

  // Fetch symptom protocols for recommendations
  const { data: protocols = [] } = useQuery({
    queryKey: ['/api/palliative/symptom-protocols'],
    queryFn: async () => {
      const response = await fetch('/api/palliative/symptom-protocols');
      if (!response.ok) throw new Error('Failed to fetch protocols');
      return response.json();
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

  const getRecommendations = (symptomName: string, score: number) => {
    const severity = getSeverityLevel(score);
    const protocol = protocols.find((p: SymptomProtocol) => 
      p.symptom.toLowerCase() === symptomName.toLowerCase() && 
      p.severityLevel.toLowerCase() === severity.toLowerCase()
    );
    return protocol?.recommendations || null;
  };

  // Prepare trend data for selected symptom
  const getTrendData = (symptomName: string) => {
    return historicalScores
      .filter((score: SymptomScore) => score.symptom === symptomName)
      .sort((a: SymptomScore, b: SymptomScore) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((score: SymptomScore) => ({
        date: new Date(score.createdAt).toLocaleDateString(),
        score: score.score,
        severity: score.severity
      }));
  };

  // Export symptom data
  const handleExport = () => {
    const exportData = symptoms.map(symptom => ({
      symptom: symptom.name,
      currentScore: currentScores[symptom.id] || 0,
      severity: getSeverityLevel(currentScores[symptom.id] || 0),
      notes: notes[symptom.id] || "",
      recommendations: getRecommendations(symptom.name, currentScores[symptom.id] || 0)
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symptom-assessment-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: "Symptom data exported successfully" });
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              🎯 Enhanced Symptom Control - Interactive Assessment
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveAllScores} size="sm" disabled={saveScoreMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
              <Button onClick={handleExport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((symptom) => {
              const Icon = symptom.icon;
              const score = currentScores[symptom.id] || 0;
              const severity = getSeverityLevel(score);
              const recommendations = getRecommendations(symptom.name, score);

              return (
                <Card key={symptom.id} className="p-4">
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
                        <span className="font-medium">{score}/10</span>
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

                    {score > 0 && recommendations && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Recommendations:</h4>
                        <div className="text-blue-700 dark:text-blue-300">
                          {Array.isArray(recommendations.interventions) ? (
                            <ul className="space-y-1">
                              {recommendations.interventions.map((intervention: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-blue-600">•</span>
                                  {intervention}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{recommendations.primary || recommendations.description || "Standard palliative care protocols apply."}</p>
                          )}
                        </div>
                      </div>
                    )}

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
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Symptom Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedSymptom} onValueChange={setSelectedSymptom}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select symptom to view trend" />
              </SelectTrigger>
              <SelectContent>
                {symptoms.map(symptom => (
                  <SelectItem key={symptom.id} value={symptom.name}>
                    {symptom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedSymptom && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getTrendData(selectedSymptom)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Symptom Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Symptom Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={symptoms.map(symptom => ({
                name: symptom.name,
                score: currentScores[symptom.id] || 0,
                severity: getSeverityLevel(currentScores[symptom.id] || 0)
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}