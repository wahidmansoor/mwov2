import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
  Star,
  Filter,
  Play,
  CheckCircle,
  AlertCircle,
  Book,
  FileText,
  Search
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { EducationalTopic, ClinicalScenario, Question } from '@/../../shared/schema';

const OncologyEducationModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedOrganSite, setSelectedOrganSite] = useState('');
  const [sessionId] = useState(`session-${Date.now()}`);

  // Fetch educational topics with real NCCN/ASCO/ESMO data
  const { data: topics = [], isLoading: topicsLoading } = useQuery({
    queryKey: ['/api/educational/topics', selectedDifficulty, selectedSpecialty, selectedOrganSite],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedDifficulty && selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);
      if (selectedSpecialty && selectedSpecialty !== 'all') params.append('subspecialty', selectedSpecialty);
      if (selectedOrganSite && selectedOrganSite !== 'all') params.append('organSite', selectedOrganSite);
      
      const response = await fetch(`/api/educational/topics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch topics');
      return response.json();
    }
  });

  // Fetch clinical scenarios
  const { data: scenarios = [], isLoading: scenariosLoading } = useQuery({
    queryKey: ['/api/educational/scenarios', selectedDifficulty],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedDifficulty && selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);
      
      const response = await fetch(`/api/educational/scenarios?${params}`);
      if (!response.ok) throw new Error('Failed to fetch scenarios');
      return response.json();
    }
  });

  // Fetch learning analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/educational/analytics', sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/educational/analytics/${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    }
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          Oncology Education Module
          <Badge variant="outline" className="ml-2">
            Real NCCN/ASCO/ESMO Data
          </Badge>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Evidence-based learning platform with authentic clinical guidelines and interactive scenarios
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
        </div>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Difficulty Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Resident">Resident</SelectItem>
            <SelectItem value="Fellow">Fellow</SelectItem>
            <SelectItem value="Attending">Attending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Subspecialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="Medical Oncology">Medical Oncology</SelectItem>
            <SelectItem value="Radiation Oncology">Radiation Oncology</SelectItem>
            <SelectItem value="Surgical Oncology">Surgical Oncology</SelectItem>
            <SelectItem value="Orthopedic Oncology">Orthopedic Oncology</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedOrganSite} onValueChange={setSelectedOrganSite}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Organ Site" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sites</SelectItem>
            <SelectItem value="Breast">Breast</SelectItem>
            <SelectItem value="Lung">Lung</SelectItem>
            <SelectItem value="Colon">Colon</SelectItem>
            <SelectItem value="Bone">Bone</SelectItem>
            <SelectItem value="Various">Various</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Learning Topics</TabsTrigger>
          <TabsTrigger value="scenarios">Clinical Scenarios</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="exam-prep">Exam Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Learning Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ) : analytics ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Mastery</span>
                        <span>{Math.round((analytics.averageMastery || 0) * 100)}%</span>
                      </div>
                      <Progress value={(analytics.averageMastery || 0) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Topics Studied</div>
                        <div className="font-semibold">{analytics.totalTopics || 0}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Mastered</div>
                        <div className="font-semibold text-green-600">{analytics.masteredTopics || 0}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Start learning to see progress
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Available Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {topicsLoading ? '...' : topics.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Evidence-based learning modules from NCCN, ASCO, and ESMO guidelines
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('topics')}
                    className="w-full"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Browse Topics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-600" />
                  Clinical Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-purple-600">
                    {scenariosLoading ? '...' : scenarios.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Real patient cases based on current clinical guidelines
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('scenarios')}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start Scenario
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-600" />
                Module Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium">AI Teaching Assistant</div>
                    <div className="text-sm text-gray-600">Socratic questioning</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium">Learning Analytics</div>
                    <div className="text-sm text-gray-600">Progress tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-medium">Adaptive Learning</div>
                    <div className="text-sm text-gray-600">Personalized paths</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="font-medium">Exam Preparation</div>
                    <div className="text-sm text-gray-600">MRCP, ESMO, FRCR</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Learning Topics
                <Badge variant="secondary">{topics.length} Available</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topicsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {topics.map((topic: EducationalTopic) => (
                    <Card key={topic.id} className="border border-gray-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {topic.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">{topic.difficulty}</Badge>
                            <Badge variant="secondary">{topic.evidenceLevel}</Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-gray-500">Subspecialty:</span>
                            <span className="ml-2 font-medium">{topic.subspecialty}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Organ Site:</span>
                            <span className="ml-2 font-medium">{topic.organSite || 'Various'}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="text-sm text-gray-500 mb-1">Learning Objectives:</div>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {(topic.learningObjectives || []).slice(0, 2).map((objective, idx) => (
                              <li key={idx} className="text-gray-700 dark:text-gray-300">{objective}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            {topic.guidelineReference}
                          </div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-1" />
                            Start Learning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-600" />
                Clinical Scenarios
                <Badge variant="secondary">{scenarios.length} Available</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scenariosLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {scenarios.map((scenario: ClinicalScenario) => (
                    <Card key={scenario.id} className="border border-gray-200 hover:border-purple-300 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">{scenario.difficulty}</Badge>
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              {scenario.estimatedTime}min
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {scenario.description}
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Patient Presentation:
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {typeof scenario.patientPresentation === 'object' ? 
                              JSON.stringify(scenario.patientPresentation).replace(/[{}"]/g, '').replace(/,/g, ', ') :
                              scenario.patientPresentation
                            }
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Learning Outcomes:
                          </div>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {(scenario.learningOutcomes || []).map((outcome, idx) => (
                              <li key={idx} className="text-gray-600 dark:text-gray-400">{outcome}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            {scenario.guidelineReference}
                          </div>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <Play className="w-4 h-4 mr-2" />
                            Start Scenario
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Learning Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              ) : analytics ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border border-blue-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{analytics.totalTopics || 0}</div>
                        <div className="text-sm text-gray-600">Topics Studied</div>
                      </CardContent>
                    </Card>
                    <Card className="border border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{analytics.masteredTopics || 0}</div>
                        <div className="text-sm text-gray-600">Topics Mastered</div>
                      </CardContent>
                    </Card>
                    <Card className="border border-orange-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {Math.round((analytics.averageMastery || 0) * 100)}%
                        </div>
                        <div className="text-sm text-gray-600">Average Mastery</div>
                      </CardContent>
                    </Card>
                  </div>

                  {analytics.weakAreas && analytics.weakAreas.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.weakAreas.slice(0, 5).map((area: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <span className="font-medium">Topic ID: {area.topicId}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={Number(area.masteryLevel) * 100} className="w-20 h-2" />
                                <span className="text-sm text-gray-600">
                                  {Math.round(Number(area.masteryLevel) * 100)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {analytics.studyRecommendations && analytics.studyRecommendations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          Study Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analytics.studyRecommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <div className="text-gray-500">No analytics data available yet</div>
                  <div className="text-sm text-gray-400">Start learning to see your progress</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-prep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                Exam Preparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['MRCP', 'ESMO', 'FRCR'].map((exam) => (
                  <Card key={exam} className="border border-gray-200 hover:border-orange-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="text-xl font-bold text-orange-600 mb-2">{exam}</div>
                      <div className="text-sm text-gray-600 mb-4">
                        Targeted preparation with evidence-based content
                      </div>
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Start Prep
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Book className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Evidence-Based Content
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      All exam preparation materials are based on current NCCN, ASCO, and ESMO guidelines. 
                      Questions and scenarios reflect real clinical practice and exam standards.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OncologyEducationModule;