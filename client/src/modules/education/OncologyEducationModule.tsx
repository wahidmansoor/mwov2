import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  BarChart3, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Award, 
  TrendingUp,
  Users,
  Clock,
  MessageCircle,
  GraduationCap,
  Stethoscope,
  Activity,
  ChevronRight,
  Star
} from 'lucide-react';
import AIChatAssistant from '../../components/education/AIChatAssistant';
import LearningDashboard from '../../components/education/LearningDashboard';
import { LearningAnalytics } from '../../services/learningAnalytics';
import { ONCOLOGY_TOPICS } from '../../types/learning';

const OncologyEducationModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const analytics = new LearningAnalytics();
  const metrics = analytics.calculateMetrics();
  const gaps = analytics.identifyGaps();

  const moduleFeatures = [
    {
      icon: Brain,
      title: "AI Teaching Assistant",
      description: "Interactive Socratic questioning tailored to your experience level",
      features: ["Adaptive difficulty", "Progressive hints", "Evidence-based learning"],
      status: "active"
    },
    {
      icon: BarChart3,
      title: "Learning Analytics",
      description: "Comprehensive progress tracking and knowledge gap identification",
      features: ["Performance metrics", "Topic mastery", "Learning trends"],
      status: "active"
    },
    {
      icon: Target,
      title: "Clinical Scenarios",
      description: "Real-world case-based learning across all oncology specialties",
      features: ["Emergency management", "Treatment protocols", "Decision support"],
      status: "active"
    },
    {
      icon: BookOpen,
      title: "Protocol Education",
      description: "Interactive exploration of evidence-based treatment guidelines",
      features: ["NCCN guidelines", "Decision trees", "Alternative pathways"],
      status: "coming-soon"
    }
  ];

  const learningPaths = [
    {
      title: "Resident Pathway",
      description: "Foundational oncology knowledge and clinical reasoning",
      duration: "3-6 months",
      topics: ["Basic oncology principles", "Common cancers", "Side effect management", "Emergency protocols"],
      level: "beginner",
      color: "bg-green-500"
    },
    {
      title: "Fellow Pathway", 
      description: "Advanced subspecialty training and complex case management",
      duration: "6-12 months",
      topics: ["Advanced protocols", "Rare diseases", "Research integration", "Multidisciplinary care"],
      level: "intermediate",
      color: "bg-blue-500"
    },
    {
      title: "Attending Pathway",
      description: "Expert-level decision making and leadership development",
      duration: "Ongoing",
      topics: ["Cutting-edge therapies", "Practice management", "Teaching skills", "Quality improvement"],
      level: "advanced", 
      color: "bg-purple-500"
    }
  ];

  const quickStats = [
    {
      label: "Study Time",
      value: `${Math.floor(metrics.totalStudyTime / 60)}h ${metrics.totalStudyTime % 60}m`,
      icon: Clock,
      color: "text-blue-600"
    },
    {
      label: "Topics Completed",
      value: `${metrics.topicsCompleted}/${ONCOLOGY_TOPICS.length}`,
      icon: Target,
      color: "text-green-600"
    },
    {
      label: "Learning Streak",
      value: `${metrics.streakDays} days`,
      icon: Award,
      color: "text-orange-600"
    },
    {
      label: "Avg Confidence",
      value: `${metrics.averageConfidence.toFixed(1)}/5`,
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full text-white mr-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Oncology Education Module
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Intelligent, adaptive learning ecosystem for oncology excellence
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <Stethoscope className="w-3 h-3 mr-1" />
              Evidence-Based
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">
              <Users className="w-3 h-3 mr-1" />
              Personalized
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                      <IconComponent className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="pathways" className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Learning Paths
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center">
              <Stethoscope className="w-4 h-4 mr-2" />
              Scenarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {moduleFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                          </div>
                          {feature.title}
                        </CardTitle>
                        <Badge 
                          variant={feature.status === 'active' ? 'default' : 'secondary'}
                          className={feature.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <ChevronRight className="w-3 h-3 mr-2 text-blue-500" />
                            {feat}
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        disabled={feature.status !== 'active'}
                        onClick={() => {
                          if (feature.title === "AI Teaching Assistant") setActiveTab('ai-assistant');
                          if (feature.title === "Learning Analytics") setActiveTab('analytics');
                        }}
                      >
                        {feature.status === 'active' ? 'Launch' : 'Coming Soon'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Knowledge Gaps Alert */}
            {gaps.length > 0 && (
              <Card className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800 dark:text-orange-300">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Recommended Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700 dark:text-orange-400 mb-4">
                    We've identified {gaps.length} areas where additional study could strengthen your knowledge:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {gaps.slice(0, 6).map((gap, index) => (
                      <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-sm font-medium">{gap.topic}</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            gap.priority === 'high' ? 'border-red-300 text-red-700' :
                            gap.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                            'border-green-300 text-green-700'
                          }`}
                        >
                          {gap.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="mt-4"
                    onClick={() => setActiveTab('analytics')}
                  >
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Learning Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.getRecentSessions(3).map((session, index) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{session.topicsStudied.join(', ')}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {new Date(session.timestamp).toLocaleDateString()} • {session.duration}min
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {Math.round((session.correctAnswers / Math.max(session.questionsAnswered, 1)) * 100)}% accuracy
                      </Badge>
                    </div>
                  ))}
                  {analytics.getRecentSessions().length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No recent learning sessions. Start your first AI teaching session!</p>
                      <Button 
                        className="mt-3"
                        onClick={() => setActiveTab('ai-assistant')}
                      >
                        Begin Learning
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIChatAssistant />
          </TabsContent>

          <TabsContent value="analytics">
            <LearningDashboard />
          </TabsContent>

          <TabsContent value="pathways" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Learning Pathways</CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Structured curricula designed for different experience levels and career goals
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {learningPaths.map((path, index) => (
                    <Card key={index} className="relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 ${path.color}`} />
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{path.title}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {path.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{path.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                            <span className="font-medium">{path.duration}</span>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Key Topics:</h4>
                            <div className="space-y-1">
                              {path.topics.map((topic, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <Star className="w-3 h-3 mr-2 text-yellow-500" />
                                  {topic}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Button className="w-full">
                            Start Pathway
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Clinical Scenarios
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Interactive case-based learning with real-world clinical scenarios
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Clinical Scenarios Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    We're developing immersive clinical scenarios that will provide hands-on learning 
                    experience across all oncology specialties.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {[
                      "Emergency Management",
                      "Treatment Protocols", 
                      "Multidisciplinary Cases",
                      "Side Effect Management",
                      "Patient Communication",
                      "Ethical Dilemmas"
                    ].map((scenario, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{scenario}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Interactive scenarios coming soon
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OncologyEducationModule;