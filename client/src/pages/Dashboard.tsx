import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import ClinicalAlertSystem from "@/components/clinical/ClinicalAlertSystem";
import BiomarkerTrendAnalysis from "@/components/clinical/BiomarkerTrendAnalysis";
import PatientJourneyTracker from "@/components/clinical/PatientJourneyTracker";
import SmartReferralSystem from "@/components/clinical/SmartReferralSystem";
import {
  Users,
  Brain,
  AlertTriangle,
  ClipboardCheck,
  UserCheck,
  Bot,
  Plus,
  Search,
  ChartLine,
  Bell,
  ArrowUp,
  CheckCircle,
  Activity,
  Zap
} from "lucide-react";

interface DashboardStats {
  activePatients: number;
  aiRecommendations: number;
  criticalAlerts: number;
  protocolsUpdated: number;
}

interface Activity {
  id: string;
  type: "evaluation" | "ai_recommendation" | "alert";
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "alert";
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [aiEngineActive, setAiEngineActive] = useState(true);

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch recent activity
  const { data: activities, isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/dashboard/activities"],
    refetchInterval: 30000,
  });

  const quickActions = [
    {
      title: "New Patient Evaluation",
      description: "Start comprehensive patient assessment",
      icon: Plus,
      color: "medical-blue",
      action: () => setLocation("/opd/patient-evaluation")
    },
    {
      title: "Protocol Lookup",
      description: "Search treatment protocols",
      icon: Search,
      color: "medical-purple",
      action: () => setLocation("/handbook")
    },
    {
      title: "Treatment Monitoring",
      description: "Monitor ongoing treatments",
      icon: ChartLine,
      color: "medical-green",
      action: () => setLocation("/cdu")
    },
    {
      title: "Review Alerts",
      description: "Check critical notifications",
      icon: Bell,
      color: "medical-orange",
      action: () => {} // TODO: Implement alerts modal
    }
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "evaluation":
        return UserCheck;
      case "ai_recommendation":
        return Bot;
      case "alert":
        return AlertTriangle;
      default:
        return UserCheck;
    }
  };

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return "status-active";
      case "pending":
        return "status-info";
      case "alert":
        return "status-warning";
      default:
        return "status-info";
    }
  };

  if (statsLoading) {
    return (
      <div className="p-6">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">
            Welcome back, {user?.firstName || "Doctor"}. Monitor patient care and clinical workflows.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* AI Status Indicator */}
          <div className="flex items-center space-x-2 bg-medical-green-light border border-green-200 rounded-lg px-3 py-2">
            <div className={`w-2 h-2 bg-medical-green rounded-full ${aiEngineActive ? 'animate-pulse' : ''}`} />
            <span className="text-medical-green text-sm font-medium">
              AI Engine {aiEngineActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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
                  <p className="text-slate-600 text-sm">Active Patients</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats?.activePatients || 0}
                  </p>
                  <p className="text-medical-green text-sm flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    12% increase
                  </p>
                </div>
                <div className="w-12 h-12 bg-medical-blue-light rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-medical-blue" />
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
                  <p className="text-slate-600 text-sm">AI Recommendations</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats?.aiRecommendations || 0}
                  </p>
                  <p className="text-medical-purple text-sm flex items-center">
                    <Brain className="w-3 h-3 mr-1" />
                    Today
                  </p>
                </div>
                <div className="w-12 h-12 bg-medical-purple-light rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-medical-purple" />
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
                  <p className="text-slate-600 text-sm">Critical Alerts</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats?.criticalAlerts || 0}
                  </p>
                  <p className="text-medical-orange text-sm flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Requires attention
                  </p>
                </div>
                <div className="w-12 h-12 bg-medical-orange-light rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-medical-orange" />
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
                  <p className="text-slate-600 text-sm">Protocols Updated</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats?.protocolsUpdated || 0}
                  </p>
                  <p className="text-medical-green text-sm flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    This week
                  </p>
                </div>
                <div className="w-12 h-12 bg-medical-green-light rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-medical-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Clinical Activity</CardTitle>
              <p className="text-slate-600 text-sm">Latest patient interactions and AI recommendations</p>
            </CardHeader>
            <CardContent>
              {activitiesLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="skeleton h-16 rounded-lg" />
                  ))}
                </div>
              ) : activities && activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.slice(0, 5).map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div className="w-10 h-10 bg-medical-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-medical-blue" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{activity.title}</p>
                          <p className="text-slate-600 text-sm">{activity.description}</p>
                          <p className="text-slate-500 text-xs">{activity.timestamp}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">No recent activity to display</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <p className="text-slate-600 text-sm">Common clinical workflows</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={action.title}
                  variant="ghost"
                  onClick={action.action}
                  className={`w-full justify-start p-4 h-auto bg-${action.color}-light hover:bg-${action.color}-light/80 text-left`}
                >
                  <action.icon className={`w-5 h-5 mr-3 text-${action.color}`} />
                  <div>
                    <div className={`font-medium text-${action.color}`}>{action.title}</div>
                    <div className="text-slate-600 text-sm">{action.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Advanced Clinical Intelligence Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8"
      >
        <Card className="border-2 border-medical-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <Zap className="h-6 w-6 text-medical-blue" />
              Advanced Clinical Intelligence Hub
              <span className="text-sm bg-medical-blue text-white px-2 py-1 rounded-full">
                Real-Time
              </span>
            </CardTitle>
            <p className="text-slate-600">
              Comprehensive clinical decision support with intelligent alerts, biomarker analytics, patient journey tracking, and automated referral systems
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="alerts" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Clinical Alerts
                </TabsTrigger>
                <TabsTrigger value="biomarkers" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Biomarker Trends
                </TabsTrigger>
                <TabsTrigger value="journey" className="flex items-center gap-2">
                  <ChartLine className="h-4 w-4" />
                  Patient Journey
                </TabsTrigger>
                <TabsTrigger value="referrals" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Smart Referrals
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="alerts" className="mt-6">
                <ClinicalAlertSystem />
              </TabsContent>
              
              <TabsContent value="biomarkers" className="mt-6">
                <BiomarkerTrendAnalysis />
              </TabsContent>
              
              <TabsContent value="journey" className="mt-6">
                <PatientJourneyTracker />
              </TabsContent>
              
              <TabsContent value="referrals" className="mt-6">
                <SmartReferralSystem />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
