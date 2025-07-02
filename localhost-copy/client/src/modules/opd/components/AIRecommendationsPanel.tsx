import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Lightbulb, AlertTriangle, ClipboardCheck, FileText, Save, Download } from "lucide-react";

interface AIRecommendation {
  id: string;
  type: "diagnostic" | "risk_alert" | "protocol_reference" | "treatment_suggestion";
  title: string;
  description: string;
  confidence: number;
  priority: "low" | "medium" | "high";
  evidenceLevel?: string;
  source?: string;
  timestamp: string;
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: "1",
    type: "diagnostic",
    title: "Diagnostic Suggestion",
    description: "Based on symptoms, recommend CT chest scan and tumor markers (CEA, CA 19-9). Consider PET-CT if initial scans are inconclusive.",
    confidence: 87,
    priority: "high",
    evidenceLevel: "1A",
    source: "NCCN Guidelines",
    timestamp: "2 minutes ago"
  },
  {
    id: "2", 
    type: "risk_alert",
    title: "Risk Alert",
    description: "High risk factors present - expedite evaluation. Patient meets criteria for urgent oncology referral within 2 weeks.",
    confidence: 92,
    priority: "high",
    timestamp: "2 minutes ago"
  },
  {
    id: "3",
    type: "protocol_reference",
    title: "Protocol Reference",
    description: "Follow NCCN guidelines for lung cancer screening. Consider low-dose CT screening annually based on risk profile.",
    confidence: 95,
    priority: "medium",
    evidenceLevel: "1A",
    source: "NCCN Guidelines v2024",
    timestamp: "3 minutes ago"
  }
];

export default function AIRecommendationsPanel() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Listen for new AI recommendations
  const { data: aiRecommendations, isLoading } = useQuery<AIRecommendation[]>({
    queryKey: ["/api/ai/recommendations"],
    refetchInterval: false,
    initialData: []
  });

  useEffect(() => {
    if (aiRecommendations && aiRecommendations.length > 0) {
      setRecommendations(aiRecommendations);
    } else {
      // Use mock data for demonstration
      setRecommendations(mockRecommendations);
    }
  }, [aiRecommendations]);

  const getRecommendationIcon = (type: AIRecommendation["type"]) => {
    switch (type) {
      case "diagnostic":
        return Lightbulb;
      case "risk_alert":
        return AlertTriangle;
      case "protocol_reference":
        return ClipboardCheck;
      case "treatment_suggestion":
        return FileText;
      default:
        return Lightbulb;
    }
  };

  const getRecommendationColor = (type: AIRecommendation["type"], priority: AIRecommendation["priority"]) => {
    if (priority === "high") {
      return "medical-orange";
    }
    
    switch (type) {
      case "diagnostic":
        return "medical-purple";
      case "risk_alert":
        return "medical-orange";
      case "protocol_reference":
        return "medical-green";
      case "treatment_suggestion":
        return "medical-blue";
      default:
        return "medical-purple";
    }
  };

  const getPriorityBadgeVariant = (priority: AIRecommendation["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log("Generating comprehensive report...");
  };

  const handleSaveRecommendations = () => {
    // TODO: Implement save functionality
    console.log("Saving recommendations...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-medical-purple" />
            <span>AI Recommendations</span>
          </CardTitle>
          <p className="text-slate-600 text-sm">Clinical decision support insights</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-lg" />
              ))}
            </div>
          ) : recommendations.length > 0 ? (
            <AnimatePresence>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => {
                  const IconComponent = getRecommendationIcon(recommendation.type);
                  const color = getRecommendationColor(recommendation.type, recommendation.priority);
                  
                  return (
                    <motion.div
                      key={recommendation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`bg-${color}-light border border-${color.replace('medical-', '')}-200 rounded-lg p-4`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 bg-${color}-light rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                          <IconComponent className={`w-4 h-4 text-${color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className={`font-medium text-${color} text-sm`}>
                              {recommendation.title}
                            </h4>
                            <Badge variant={getPriorityBadgeVariant(recommendation.priority)}>
                              {recommendation.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-slate-700 text-sm mb-3 leading-relaxed">
                            {recommendation.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className={`bg-${color.replace('medical-', '')}-100 text-${color} px-2 py-1 rounded font-medium`}>
                              Confidence: {recommendation.confidence}%
                            </span>
                            
                            {recommendation.evidenceLevel && (
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                Evidence: {recommendation.evidenceLevel}
                              </span>
                            )}
                            
                            {recommendation.source && (
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                {recommendation.source}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-2 text-xs text-slate-500">
                            {recommendation.timestamp}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                AI recommendations will appear here after patient evaluation
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {recommendations.length > 0 && (
            <div className="pt-4 space-y-2 border-t border-slate-200">
              <Button 
                onClick={handleGenerateReport}
                className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white"
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              
              <Button 
                onClick={handleSaveRecommendations}
                variant="outline" 
                className="w-full border-slate-300 hover:bg-slate-50"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Recommendations
              </Button>
            </div>
          )}
          
          {/* AI Status Indicator */}
          <div className="flex items-center justify-center pt-3 border-t border-slate-200">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <div className="w-2 h-2 bg-medical-green rounded-full animate-pulse" />
              <span>AI Engine Active • Real-time Analysis</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
