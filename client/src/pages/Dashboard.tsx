import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import SmartReferralSystem from "@/components/clinical/SmartReferralSystem";
import EmotionCheckInWidget from "@/components/clinical/EmotionCheckInWidget";
import GuidelinesSearchWidget from "@/components/clinical/GuidelinesSearchWidget";
import ClinicalCalculatorsWidget from "@/components/clinical/ClinicalCalculatorsWidget";
import { DailyOncologyFact } from "@/components/DailyOncologyFact";
import { DailyOncologyQuiz } from "@/components/DailyOncologyQuiz";
import {
  Stethoscope,
  Brain,
  AlertTriangle,
  BookOpen,
  Calculator,
  Heart,
  Shield,
  FileText,
  BarChart3,
  Search,
  ChartLine,
  Bell,
  ArrowUp,
  CheckCircle,
  Activity,
  Zap,
  ExternalLink,
  Database,
  Users,
  GraduationCap,
  Target,
  Pill,
  Building2,
  UserCheck,
  MessageSquare,
  Download,
  TrendingUp,
  Clock,
  Sparkles
} from "lucide-react";

interface PlatformStats {
  totalProtocols: number;
  guidelinesVersion: string;
  modulesCovered: number;
  recentUpdates: number;
  userSessions: number;
  clinicalDecisions: number;
}

interface ModuleUsage {
  id: string;
  name: string;
  description: string;
  usageCount: number;
  lastAccessed: string;
  status: "active" | "updated" | "stable";
  icon: any;
  route: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  // Platform statistics
  const platformStats: PlatformStats = {
    totalProtocols: 142,
    guidelinesVersion: "NCCN 2025",
    modulesCovered: 8,
    recentUpdates: 12,
    userSessions: 1,
    clinicalDecisions: 0
  };

  // Clinical modules available in the platform
  const clinicalModules: ModuleUsage[] = [
    {
      id: "opd",
      name: "OPD Module",
      description: "Outpatient diagnosis, screening protocols, and referral management",
      usageCount: 0,
      lastAccessed: "Never",
      status: "active",
      icon: Stethoscope,
      route: "/opd"
    },
    {
      id: "cdu",
      name: "CDU Module", 
      description: "Cancer Day Unit protocols, dosage calculations, toxicity guidance",
      usageCount: 0,
      lastAccessed: "Never",
      status: "updated",
      icon: Activity,
      route: "/cdu"
    },
    {
      id: "inpatient",
      name: "Inpatient Oncology",
      description: "Admission protocols, emergency regimens, monitoring workflows",
      usageCount: 0,
      lastAccessed: "Never", 
      status: "stable",
      icon: Building2,
      route: "/inpatient"
    },
    {
      id: "palliative",
      name: "Palliative Care",
      description: "Symptom management, pain control, psychosocial support",
      usageCount: 0,
      lastAccessed: "Never",
      status: "stable",
      icon: Heart,
      route: "/palliative"
    },
    {
      id: "chat",
      name: "AI Chat Assistant",
      description: "Interactive guideline queries with NCCN, ASCO, ESMO support",
      usageCount: 0,
      lastAccessed: "Never",
      status: "active",
      icon: Brain,
      route: "/chat"
    },
    {
      id: "tools",
      name: "Clinical Tools",
      description: "Calculators, red flag alerts, lab interpretation guides",
      usageCount: 0,
      lastAccessed: "Never",
      status: "stable",
      icon: Calculator,
      route: "/tools"
    },
    {
      id: "education",
      name: "Oncology Education",
      description: "AI-powered adaptive learning with Socratic questioning",
      usageCount: 0,
      lastAccessed: "Never",
      status: "active",
      icon: GraduationCap,
      route: "/education"
    },
    {
      id: "handbook",
      name: "Medical Handbook",
      description: "Comprehensive oncology, radiation, and palliative care references",
      usageCount: 0,
      lastAccessed: "Never",
      status: "stable",
      icon: BookOpen,
      route: "/handbook"
    }
  ];

  const quickActions = [
    {
      title: "Treatment Protocol Search",
      description: "Find evidence-based cancer treatment protocols",
      icon: Search,
      color: "medical-blue",
      action: () => setLocation("/cdu")
    },
    {
      title: "Clinical Decision Support",
      description: "AI-powered treatment recommendations",
      icon: Brain,
      color: "medical-purple", 
      action: () => setLocation("/chat")
    },
    {
      title: "Toxicity Management",
      description: "NCCN/ESMO/ASCO toxicity guidance",
      icon: Shield,
      color: "medical-green",
      action: () => setLocation("/cdu?tab=toxicity")
    },
    {
      title: "Clinical Calculators",
      description: "BSA, GFR, dosage calculations",
      icon: Calculator,
      color: "medical-orange",
      action: () => setLocation("/tools")
    }
  ];

  const getModuleStatusColor = (status: ModuleUsage["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "updated":
        return "bg-blue-100 text-blue-800";
      case "stable":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getModuleStatusIcon = (status: ModuleUsage["status"]) => {
    switch (status) {
      case "active":
        return <Zap className="h-3 w-3" />;
      case "updated":
        return <TrendingUp className="h-3 w-3" />;
      case "stable":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <CheckCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">OncoVista Clinical Decision Support Platform</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Welcome back, {user?.firstName || "Doctor"}. Access comprehensive oncology guidance tools and AI-powered clinical decision support.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Database className="h-3 w-3 mr-1" />
            Live Database Connected
          </Badge>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Clinical Protocols</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {platformStats.totalProtocols}
                  </p>
                  <p className="text-blue-600 text-sm flex items-center">
                    <Database className="w-3 h-3 mr-1" />
                    {platformStats.guidelinesVersion}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Clinical Modules</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {platformStats.modulesCovered}
                  </p>
                  <p className="text-purple-600 text-sm flex items-center">
                    <Target className="w-3 h-3 mr-1" />
                    Active & Ready
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">AI Decision Support</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {platformStats.clinicalDecisions}
                  </p>
                  <p className="text-green-600 text-sm flex items-center">
                    <Brain className="w-3 h-3 mr-1" />
                    Available 24/7
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Recent Updates</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {platformStats.recentUpdates}
                  </p>
                  <p className="text-orange-600 text-sm flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    This month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Clinical Modules Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Decision Support Modules</h2>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {clinicalModules.length} Modules Available
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicalModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setLocation(module.route)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <module.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs flex items-center gap-1 ${getModuleStatusColor(module.status)}`}
                    >
                      {getModuleStatusIcon(module.status)}
                      {module.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {module.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Sessions: {module.usageCount}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.lastAccessed}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Quick Clinical Actions
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Access the most commonly used clinical decision support tools
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={action.title}
                  variant="outline"
                  onClick={action.action}
                  className="h-auto p-4 flex flex-col items-center text-center space-y-2 hover:bg-blue-50 border-slate-200"
                >
                  <action.icon className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white text-sm">{action.title}</div>
                    <div className="text-slate-600 dark:text-slate-300 text-xs">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Clinical Intelligence Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8"
      >
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <Zap className="h-6 w-6 text-blue-600" />
              Advanced Clinical Intelligence Hub
              <Badge variant="default" className="bg-blue-600 text-white">
                Real-Time
              </Badge>
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300">
              Comprehensive clinical decision support with evidence-based guidelines search, clinical calculators, daily learning features, and automated referral systems
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="guidelines" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="guidelines" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Guidelines Search
                </TabsTrigger>
                <TabsTrigger value="calculators" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Clinical Calculators
                </TabsTrigger>
                <TabsTrigger value="daily-learning" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Daily Learning
                </TabsTrigger>
                <TabsTrigger value="referrals" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Smart Referrals
                </TabsTrigger>
                <TabsTrigger value="wellness" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wellness Check
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guidelines" className="mt-6">
                <GuidelinesSearchWidget />
              </TabsContent>
              
              <TabsContent value="calculators" className="mt-6">
                <ClinicalCalculatorsWidget />
              </TabsContent>
              
              <TabsContent value="daily-learning" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <DailyOncologyFact />
                  <DailyOncologyQuiz />
                </div>
              </TabsContent>
              
              <TabsContent value="referrals" className="mt-6">
                <SmartReferralSystem />
              </TabsContent>
              
              <TabsContent value="wellness" className="mt-6">
                <EmotionCheckInWidget />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
