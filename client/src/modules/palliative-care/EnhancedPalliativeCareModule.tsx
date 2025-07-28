import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, HeartHandshake, MessageSquare, Phone, Shield, BarChart3, Stethoscope } from "lucide-react";
import { PainManagementModule } from "./pain-management/PainManagementModule";
import { SymptomControlModule } from "./symptom-control/SymptomControlModule";
import { CommunicationModule } from "./communication/CommunicationModule";
import { SpiritualCareModule } from "./spiritual-care/SpiritualCareModule";
import { EmergencyCareModule } from "./emergency-care/EmergencyCareModule";
import { QualityMetricsModule } from "./quality-metrics/QualityMetricsModule";

/**
 * Enhanced Palliative Care Module - World-Class AI-Powered Clinical Decision Support
 * Provides comprehensive palliative care management with NCCN 2025 guidelines integration,
 * validated assessment tools, communication frameworks, and AI-powered clinical intelligence.
 * 
 * Features:
 * - ESAS-R, IPOS, PHQ-9, GAD-7 validated assessments
 * - Multi-dimensional pain phenotyping
 * - SPIKES communication framework
 * - FICA/HOPE spiritual assessments
 * - Oncological emergency protocols
 * - Real-time quality metrics dashboard
 * - AI-powered symptom clustering and prediction
 */
export function EnhancedPalliativeCareModule() {
  const [activeTab, setActiveTab] = useState("pain-management");

  const modules = [
    {
      id: "pain-management",
      title: "Pain Management",
      icon: Activity,
      description: "Multi-dimensional pain assessment with WHO ladder and interventional protocols",
      badge: "NCCN 2025",
      color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
    },
    {
      id: "symptom-control",
      title: "Symptom Control",
      icon: Stethoscope,
      description: "ESAS-R, IPOS assessments with AI-powered clustering and prediction",
      badge: "Validated Tools",
      color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
    },
    {
      id: "communication",
      title: "Communication",
      icon: MessageSquare,
      description: "SPIKES protocol, goals of care, and family meeting facilitation",
      badge: "Evidence-Based",
      color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    },
    {
      id: "spiritual-care",
      title: "Spiritual Care",
      icon: HeartHandshake,
      description: "FICA/HOPE assessments with cultural competency frameworks",
      badge: "Holistic",
      color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800"
    },
    {
      id: "emergency-care",
      title: "Emergency Care",
      icon: Phone,
      description: "Oncological emergencies: SVCS, spinal compression, hypercalcemia",
      badge: "Rapid Response",
      color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800"
    },
    {
      id: "quality-metrics",
      title: "Quality Metrics",
      icon: BarChart3,
      description: "Real-time dashboard with NCCN indicators and outcome tracking",
      badge: "Performance",
      color: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Enhanced Palliative Care
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            World-class AI-powered clinical decision support system with comprehensive NCCN 2025 guidelines integration,
            validated assessment tools, and evidence-based communication frameworks.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <Shield className="h-3 w-3 mr-1" />
              NCCN 2025 Compliant
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered Intelligence
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
              <Activity className="h-3 w-3 mr-1" />
              Validated Instruments
            </Badge>
          </div>
        </div>

        {/* Module Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={module.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  activeTab === module.id ? module.color : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setActiveTab(module.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className={`h-6 w-6 ${
                      activeTab === module.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`} />
                    <Badge variant="outline" className="text-xs">
                      {module.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 h-auto p-2 bg-slate-100 dark:bg-slate-800">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <TabsTrigger
                    key={module.id}
                    value={module.id}
                    className="flex flex-col items-center gap-2 p-4 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{module.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="p-6">
              <TabsContent value="pain-management" className="mt-0">
                <PainManagementModule />
              </TabsContent>

              <TabsContent value="symptom-control" className="mt-0">
                <SymptomControlModule />
              </TabsContent>

              <TabsContent value="communication" className="mt-0">
                <CommunicationModule />
              </TabsContent>

              <TabsContent value="spiritual-care" className="mt-0">
                <SpiritualCareModule />
              </TabsContent>

              <TabsContent value="emergency-care" className="mt-0">
                <EmergencyCareModule />
              </TabsContent>

              <TabsContent value="quality-metrics" className="mt-0">
                <QualityMetricsModule />
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Clinical Safety Notice */}
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Clinical Safety Notice:</strong> All AI-generated recommendations and clinical decision support tools 
                are provided for educational purposes only. Always verify recommendations with current clinical guidelines 
                and exercise independent clinical judgment. This system does not replace professional medical expertise.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}