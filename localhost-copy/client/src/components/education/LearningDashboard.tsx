import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Brain, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import { LearningAnalytics } from '../../services/learningAnalytics';
import { LearningMetrics, KnowledgeGap, ONCOLOGY_TOPICS } from '../../types/learning';

const LearningDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<LearningMetrics | null>(null);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [topicProgress, setTopicProgress] = useState<any>({});
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const analytics = new LearningAnalytics();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setLoading(true);
    try {
      const metricsData = analytics.calculateMetrics();
      const gaps = analytics.identifyGaps();
      const progress = analytics.getTopicProgress();
      const sessions = analytics.getRecentSessions(5);

      setMetrics(metricsData);
      setKnowledgeGaps(gaps);
      setTopicProgress(progress);
      setRecentSessions(sessions);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 4) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Prepare chart data
  const confidenceChartData = ONCOLOGY_TOPICS.map(topic => ({
    topic: topic.length > 15 ? topic.substring(0, 15) + '...' : topic,
    fullTopic: topic,
    confidence: topicProgress[topic]?.confidence || 0,
    sessions: topicProgress[topic]?.sessionsCount || 0
  })).sort((a, b) => b.confidence - a.confidence);

  const sessionTrendData = recentSessions.slice().reverse().map((session, index) => ({
    session: `Session ${index + 1}`,
    date: new Date(session.timestamp).toLocaleDateString(),
    duration: session.duration,
    topics: session.topicsStudied.length,
    performance: session.correctAnswers / Math.max(session.questionsAnswered, 1) * 100
  }));

  const topicDistributionData = Object.entries(topicProgress)
    .filter(([, data]: [string, any]) => data.sessionsCount > 0)
    .map(([topic, data]: [string, any]) => ({
      name: topic.length > 12 ? topic.substring(0, 12) + '...' : topic,
      value: data.sessionsCount,
      fullName: topic
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Brain className="w-8 h-8 animate-pulse text-blue-500 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Loading your learning analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Learning Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your oncology education progress and identify growth opportunities</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Study Time</p>
                <p className="text-2xl font-bold">{formatDuration(metrics?.totalStudyTime || 0)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Topics Completed</p>
                <p className="text-2xl font-bold">{metrics?.topicsCompleted || 0}</p>
                <p className="text-green-100 text-xs">of {ONCOLOGY_TOPICS.length} available</p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Confidence</p>
                <p className="text-2xl font-bold">{(metrics?.averageConfidence || 0).toFixed(1)}/5</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Learning Streak</p>
                <p className="text-2xl font-bold">{metrics?.streakDays || 0}</p>
                <p className="text-orange-100 text-xs">days</p>
              </div>
              <Award className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="gaps" className="flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Knowledge Gaps
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confidence by Topic */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Confidence by Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={confidenceChartData.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="topic" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis domain={[0, 5]} />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value}/5`, 
                        'Confidence',
                        `Topic: ${props.payload.fullTopic}`
                      ]}
                    />
                    <Bar dataKey="confidence" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Learning Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recent Learning Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={sessionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                      name="Performance %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Topic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieIcon className="w-5 h-5 mr-2" />
                Study Time Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={topicDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {topicDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [
                        `${value} sessions`,
                        props.payload.fullName
                      ]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 space-y-2">
                  {topicDistributionData.slice(0, 6).map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium">{item.fullName}</span>
                      <span className="text-xs text-gray-500">{item.value} sessions</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Topic Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ONCOLOGY_TOPICS.map(topic => {
                  const progress = topicProgress[topic];
                  const confidence = progress?.confidence || 0;
                  const sessions = progress?.sessionsCount || 0;
                  const lastStudied = progress?.lastStudied;

                  return (
                    <Card key={topic} className={`border-2 ${getConfidenceColor(confidence)}`}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-sm">{topic}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs">Confidence:</span>
                              <Badge variant="outline" className="text-xs">
                                {confidence.toFixed(1)}/5
                              </Badge>
                            </div>
                          </div>
                          
                          <Progress value={(confidence / 5) * 100} className="h-2" />
                          
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <div>Sessions: {sessions}</div>
                            <div>
                              {lastStudied 
                                ? `${Math.ceil((Date.now() - new Date(lastStudied).getTime()) / (1000 * 60 * 60 * 24))}d ago`
                                : 'Never'
                              }
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Identified Knowledge Gaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              {knowledgeGaps.length > 0 ? (
                <div className="space-y-4">
                  {knowledgeGaps.map((gap, index) => (
                    <Card key={gap.topic} className="border-l-4 border-l-red-400">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{gap.topic}</h3>
                              <Badge 
                                className={`text-white ${getPriorityColor(gap.priority)}`}
                              >
                                {gap.priority.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {gap.confidenceLevel.toFixed(1)}/5
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {gap.recommendedAction}
                            </p>
                            <div className="text-xs text-gray-500">
                              Last studied: {gap.lastStudied.getTime() === 0 
                                ? 'Never' 
                                : gap.lastStudied.toLocaleDateString()
                              }
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Review Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Knowledge Gaps Identified
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Great work! Your learning is well-balanced across all topics.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Learning Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <Card key={session.id} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {new Date(session.timestamp).toLocaleDateString()}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(session.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {formatDuration(session.duration)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Topics:</span>
                            <p className="text-gray-600 dark:text-gray-400">
                              {session.topicsStudied.join(', ')}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Questions:</span>
                            <p className="text-gray-600 dark:text-gray-400">
                              {session.questionsAnswered}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Performance:</span>
                            <p className="text-gray-600 dark:text-gray-400">
                              {((session.correctAnswers / Math.max(session.questionsAnswered, 1)) * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span>
                            <p className="text-gray-600 dark:text-gray-400 capitalize">
                              {session.experienceLevel}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Learning Sessions Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start your first AI teaching session to begin tracking your progress.
                  </p>
                  <Button>
                    <Brain className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={loadDashboardData} variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Study Recommendations
            </Button>
            <Button variant="outline">
              <Award className="w-4 h-4 mr-2" />
              Set Learning Goals
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Study Time
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningDashboard;