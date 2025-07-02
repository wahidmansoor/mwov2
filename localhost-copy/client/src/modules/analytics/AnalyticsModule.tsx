import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Activity,
  Zap
} from "lucide-react";

const analyticsSection = [
  { 
    id: "usage", 
    name: "Usage Metrics", 
    icon: BarChart3,
    description: "Module access patterns and user engagement"
  },
  { 
    id: "guidelines", 
    name: "Guideline Compliance", 
    icon: Target,
    description: "Adherence to protocol recommendations"
  },
  { 
    id: "performance", 
    name: "System Performance", 
    icon: Activity,
    description: "Response times and system metrics"
  },
  { 
    id: "insights", 
    name: "Training Insights", 
    icon: BookOpen,
    description: "Educational value and learning outcomes"
  }
];

// Mock analytics data for demonstration
const usageData = {
  totalSessions: 1247,
  activeUsers: 89,
  avgSessionDuration: "12m 34s",
  moduleUsage: [
    { module: "OPD Module", sessions: 456, percentage: 36.6 },
    { module: "CDU Module", sessions: 312, percentage: 25.0 },
    { module: "Handbook", sessions: 198, percentage: 15.9 },
    { module: "Inpatient", sessions: 156, percentage: 12.5 },
    { module: "Palliative Care", sessions: 125, percentage: 10.0 }
  ],
  timeSeriesData: [
    { period: "Week 1", sessions: 89 },
    { period: "Week 2", sessions: 124 },
    { period: "Week 3", sessions: 156 },
    { period: "Week 4", sessions: 203 }
  ]
};

const guidelineData = {
  overallCompliance: 87,
  protocolAdherence: [
    { protocol: "Neutropenic Fever", compliance: 94, total: 67 },
    { protocol: "Breast Cancer NCCN", compliance: 89, total: 45 },
    { protocol: "Lung Cancer Staging", compliance: 82, total: 38 },
    { protocol: "Palliative Care", compliance: 91, total: 29 }
  ],
  recommendations: [
    { category: "Emergency Protocols", implemented: 23, total: 25 },
    { category: "Staging Guidelines", implemented: 18, total: 22 },
    { category: "Treatment Plans", implemented: 34, total: 41 }
  ]
};

const performanceData = {
  avgResponseTime: "1.2s",
  systemUptime: "99.8%",
  aiAccuracy: "94%",
  errorRate: "0.3%",
  metrics: [
    { component: "AI Assistant", responseTime: 850, status: "good" },
    { component: "Database", responseTime: 120, status: "excellent" },
    { component: "Clinical Tools", responseTime: 340, status: "good" },
    { component: "Export Module", responseTime: 680, status: "good" }
  ]
};

const trainingData = {
  learningObjectives: 89,
  knowledgeRetention: 76,
  userSatisfaction: 4.6,
  competencyGains: [
    { skill: "Oncology Protocols", before: 65, after: 84, improvement: 19 },
    { skill: "Emergency Management", before: 58, after: 79, improvement: 21 },
    { skill: "Drug Calculations", before: 72, after: 88, improvement: 16 },
    { skill: "Staging Systems", before: 61, after: 82, improvement: 21 }
  ]
};

// Usage Metrics Component
const UsageMetrics = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-blue-600" />
            Total Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usageData.totalSessions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Past 30 days</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-green-600" />
            Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usageData.activeUsers}</div>
          <p className="text-xs text-muted-foreground">Currently online</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-600" />
            Avg Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usageData.avgSessionDuration}</div>
          <p className="text-xs text-muted-foreground">Duration</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-orange-600" />
            Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+23%</div>
          <p className="text-xs text-muted-foreground">vs last month</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Module Usage Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {usageData.moduleUsage.map((module, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{module.module}</span>
                <span className="text-muted-foreground">{module.sessions} sessions ({module.percentage}%)</span>
              </div>
              <Progress value={module.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Weekly Usage Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {usageData.timeSeriesData.map((data, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-green-600">{data.sessions}</div>
              <div className="text-sm text-muted-foreground">{data.period}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Guideline Compliance Component
const GuidelineCompliance = () => (
  <div className="space-y-6">
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-green-600" />
          Overall Compliance Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-green-600">{guidelineData.overallCompliance}%</div>
          <div className="flex-1">
            <Progress value={guidelineData.overallCompliance} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              Adherence to evidence-based protocols and guidelines
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          Protocol Adherence by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guidelineData.protocolAdherence.map((protocol, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{protocol.protocol}</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={
                      protocol.compliance >= 90 ? "bg-green-100 text-green-800" :
                      protocol.compliance >= 80 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }
                  >
                    {protocol.compliance}%
                  </Badge>
                  <span className="text-sm text-muted-foreground">({protocol.total} cases)</span>
                </div>
              </div>
              <Progress value={protocol.compliance} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-600" />
          AI Recommendations Implementation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guidelineData.recommendations.map((rec, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded">
              <div>
                <div className="font-medium">{rec.category}</div>
                <div className="text-sm text-muted-foreground">
                  {rec.implemented} of {rec.total} recommendations implemented
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  {Math.round((rec.implemented / rec.total) * 100)}%
                </div>
                <Progress 
                  value={(rec.implemented / rec.total) * 100} 
                  className="w-20 h-2" 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// System Performance Component
const SystemPerformance = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-blue-600" />
            Response Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceData.avgResponseTime}</div>
          <p className="text-xs text-muted-foreground">Average</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Uptime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceData.systemUptime}</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-purple-600" />
            AI Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceData.aiAccuracy}</div>
          <p className="text-xs text-muted-foreground">Recommendation accuracy</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-red-600" />
            Error Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceData.errorRate}</div>
          <p className="text-xs text-muted-foreground">System errors</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Component Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performanceData.metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded">
              <div>
                <div className="font-medium">{metric.component}</div>
                <div className="text-sm text-muted-foreground">
                  Response time: {metric.responseTime}ms
                </div>
              </div>
              <Badge 
                className={
                  metric.status === 'excellent' ? "bg-green-100 text-green-800" :
                  metric.status === 'good' ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }
              >
                {metric.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Training Insights Component
const TrainingInsights = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-green-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{trainingData.learningObjectives}%</div>
          <p className="text-xs text-muted-foreground">Achievement rate</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-blue-600" />
            Knowledge Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{trainingData.knowledgeRetention}%</div>
          <p className="text-xs text-muted-foreground">30-day retention</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-purple-600" />
            User Satisfaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{trainingData.userSatisfaction}/5</div>
          <p className="text-xs text-muted-foreground">Average rating</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Competency Improvements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trainingData.competencyGains.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.skill}</span>
                <Badge className="bg-green-100 text-green-800">
                  +{skill.improvement}%
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="font-bold">{skill.before}%</div>
                  <div className="text-muted-foreground">Before</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-bold">{skill.after}%</div>
                  <div className="text-muted-foreground">After</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function AnalyticsModule() {
  const [activeSection, setActiveSection] = useState("usage");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "usage":
        return <UsageMetrics />;
      case "guidelines":
        return <GuidelineCompliance />;
      case "performance":
        return <SystemPerformance />;
      case "insights":
        return <TrainingInsights />;
      default:
        return <UsageMetrics />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            System metrics, usage analytics, and educational insights for OncoVista AI
          </p>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {analyticsSection.map((section) => {
            const IconComponent = section.icon;
            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center gap-2 data-[state=active]:bg-medical-green data-[state=active]:text-white"
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-medical-green">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentSection = analyticsSection.find(s => s.id === activeSection);
                  const IconComponent = currentSection?.icon || BarChart3;
                  return <IconComponent className="h-5 w-5 text-medical-green" />;
                })()}
                {analyticsSection.find(s => s.id === activeSection)?.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {analyticsSection.find(s => s.id === activeSection)?.description}
              </p>
            </CardHeader>
          </Card>

          {renderActiveSection()}
        </div>
      </Tabs>
    </div>
  );
}