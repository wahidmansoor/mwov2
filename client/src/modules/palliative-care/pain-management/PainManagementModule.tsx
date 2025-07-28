import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Brain, Calculator, FileText, Target, Zap } from "lucide-react";
import { PainAssessmentForm } from "./components/PainAssessmentForm";
import { PainPhenotypeAnalyzer } from "./components/PainPhenotypeAnalyzer";
import { OpioidConverter } from "./components/OpioidConverter";
import { InterventionalOptions } from "./components/InterventionalOptions";

/**
 * Pain Management Module - Advanced Multi-Dimensional Pain Assessment
 * 
 * Features:
 * - Comprehensive pain phenotyping (nociceptive, neuropathic, mixed, nociplastic)
 * - Validated assessment tools (BPI, McGill Pain Questionnaire, LANSS, S-LANSS)
 * - WHO analgesic ladder with modern multimodal approaches
 * - Opioid conversion calculator with breakthrough pain protocols
 * - Interventional pain management options
 * - AI-powered pain prediction and treatment optimization
 */
export function PainManagementModule() {
  const [activeTab, setActiveTab] = useState("assessment");
  const [painScore, setPainScore] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const painTabs = [
    {
      id: "assessment",
      title: "Pain Assessment",
      icon: FileText,
      description: "Comprehensive pain evaluation using validated tools"
    },
    {
      id: "phenotype",
      title: "Pain Phenotyping",
      icon: Target,
      description: "AI-powered pain mechanism analysis and classification"
    },
    {
      id: "calculator",
      title: "Opioid Calculator",
      icon: Calculator,
      description: "Equianalgesic dosing and conversion calculations"
    },
    {
      id: "interventional",
      title: "Interventional Options",
      icon: Zap,
      description: "Procedural and advanced pain management approaches"
    }
  ];

  const painMetrics = [
    { label: "Current Pain", value: painScore, max: 10, color: "bg-red-500" },
    { label: "Functional Impact", value: 6, max: 10, color: "bg-orange-500" },
    { label: "Quality of Life", value: 4, max: 10, color: "bg-yellow-500" },
    { label: "Treatment Response", value: 7, max: 10, color: "bg-green-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Header with AI Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg">AI-Powered Pain Intelligence</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Advanced pain phenotyping using machine learning to identify optimal treatment pathways.
                Integration with NCCN 2025 Adult Cancer Pain Guidelines for evidence-based care.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  Multi-dimensional Assessment
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  WHO Ladder Integration
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                  Breakthrough Protocols
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Pain Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {painMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <span className="font-medium">{metric.value}/{metric.max}</span>
                </div>
                <Progress value={(metric.value / metric.max) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-2">
            {painTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-2 p-4 text-xs"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <CardContent className="p-6">
            <TabsContent value="assessment" className="mt-0 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Comprehensive Pain Assessment</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Multi-dimensional evaluation using validated assessment tools
                  </p>
                </div>
                <Badge variant={assessmentComplete ? "default" : "secondary"}>
                  {assessmentComplete ? "Complete" : "In Progress"}
                </Badge>
              </div>
              <PainAssessmentForm 
                onScoreChange={setPainScore}
                onAssessmentComplete={setAssessmentComplete}
              />
            </TabsContent>

            <TabsContent value="phenotype" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Pain Phenotype Analysis</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  AI-powered classification of pain mechanisms and optimal treatment approaches
                </p>
              </div>
              <PainPhenotypeAnalyzer />
            </TabsContent>

            <TabsContent value="calculator" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Opioid Conversion Calculator</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Equianalgesic dosing calculations with breakthrough pain protocols
                </p>
              </div>
              <OpioidConverter />
            </TabsContent>

            <TabsContent value="interventional" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Interventional Pain Management</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Advanced procedural options and specialist referral guidance
                </p>
              </div>
              <InterventionalOptions />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium">Generate Pain Report</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Comprehensive assessment summary
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <h4 className="font-medium">AI Recommendations</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Personalized treatment suggestions
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <h4 className="font-medium">Track Progress</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Monitor treatment outcomes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}