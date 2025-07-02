import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { useInpatientStats } from '@/lib/hooks/useInpatientData';
import { AdmissionProtocols } from './components/AdmissionProtocols';
import { EmergencyProtocols } from './components/EmergencyProtocols';
import { MonitoringWorkflows } from './components/MonitoringWorkflows';
import { SupportiveCare } from './components/SupportiveCare';
import { DischargePlanning } from './components/DischargePlanning';
import { 
  Bed, 
  AlertTriangle, 
  Activity, 
  Heart,
  FileText,
  Sun,
  Moon,
  Database,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";

const inpatientSections = [
  { 
    id: "admission", 
    name: "Admission Protocols", 
    icon: Bed,
    description: "Evidence-based admission criteria and initial assessment workflows"
  },
  { 
    id: "emergency", 
    name: "Emergency Regimens", 
    icon: AlertTriangle,
    description: "Critical oncology emergencies and management protocols"
  },
  { 
    id: "monitoring", 
    name: "Monitoring Workflows", 
    icon: Activity,
    description: "Daily assessment guides and clinical monitoring parameters"
  },
  { 
    id: "supportive", 
    name: "Supportive Care", 
    icon: Heart,
    description: "Symptom management and supportive care protocols"
  },
  { 
    id: "discharge", 
    name: "Discharge Planning", 
    icon: FileText,
    description: "Discharge criteria and transition planning tools"
  }
];

export default function InpatientModule() {
  const [activeSection, setActiveSection] = useState("admission");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const { data: stats, isLoading: statsLoading } = useInpatientStats();

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "admission":
        return <AdmissionProtocols />;
      case "emergency":
        return <EmergencyProtocols />;
      case "monitoring":
        return <MonitoringWorkflows />;
      case "supportive":
        return <SupportiveCare />;
      case "discharge":
        return <DischargePlanning />;
      default:
        return <AdmissionProtocols />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inpatient Oncology</h2>
          <p className="text-muted-foreground">
            Comprehensive inpatient management protocols and clinical decision support tools
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDarkMode ? 'Light' : 'Dark'}
          </Button>
        </div>
      </div>

      {/* Module Statistics Dashboard */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Inpatient Module Overview
          </CardTitle>
          <CardDescription>Real-time statistics and module status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Protocols</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : stats?.totalProtocols || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emergency Protocols</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : stats?.emergencyProtocols || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monitoring Parameters</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : stats?.monitoringParameters || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Update</p>
                <p className="text-sm font-medium">
                  {statsLoading ? '...' : stats?.lastUpdate || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          {inpatientSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentSection = inpatientSections.find(s => s.id === activeSection);
                  const IconComponent = currentSection?.icon || Bed;
                  return <IconComponent className="h-5 w-5 text-blue-600" />;
                })()}
                {inpatientSections.find(s => s.id === activeSection)?.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {inpatientSections.find(s => s.id === activeSection)?.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Evidence-Based
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-800">
                  <Database className="h-3 w-3 mr-1" />
                  Database-Driven
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-800">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  NCCN Guidelines
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {renderActiveSection()}
        </div>
      </Tabs>
    </div>
  );
}
