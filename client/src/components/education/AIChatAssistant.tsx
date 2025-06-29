import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Send, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  MessageCircle, 
  BookOpen,
  Award,
  HelpCircle,
  ChevronRight,
  User,
  Bot
} from 'lucide-react';
import { QuestionEngine } from '../../services/questionEngine';
import { LearningAnalytics } from '../../services/learningAnalytics';
import { TeachingSession, SocraticQuestion, ONCOLOGY_TOPICS } from '../../types/learning';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  questionId?: string;
  hintsUsed?: number;
}

const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTeachingMode, setIsTeachingMode] = useState(true);
  const [confidenceLevel, setConfidenceLevel] = useState([3]);
  const [experienceLevel, setExperienceLevel] = useState<'resident' | 'fellow' | 'attending'>('resident');
  const [currentQuestion, setCurrentQuestion] = useState<SocraticQuestion | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string>('Breast Cancer Protocols');
  const [currentSession, setCurrentSession] = useState<TeachingSession | null>(null);
  const [showHints, setShowHints] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const questionEngine = useRef(new QuestionEngine());
  const analytics = useRef(new LearningAnalytics());

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      addSystemMessage("Welcome to your AI Teaching Assistant! I'm here to help you learn oncology through interactive questioning. I'll use the Socratic method to guide your learning. Would you like to start with a clinical scenario?");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addSystemMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const startNewQuestion = () => {
    if (!isTeachingMode) {
      addSystemMessage("Please enable Teaching Mode to start a guided learning session.");
      return;
    }

    const question = questionEngine.current.generateQuestion(
      selectedTopic,
      confidenceLevel[0],
      experienceLevel
    );
    
    setCurrentQuestion(question);
    setHintsUsed(0);
    setShowHints(false);
    
    // Start new teaching session
    const session: TeachingSession = {
      id: Date.now().toString(),
      topic: selectedTopic,
      confidenceLevel: confidenceLevel[0],
      experienceLevel,
      hintsUsed: 0,
      questionsAsked: [question.question],
      responses: [],
      timestamp: new Date(),
      completed: false
    };
    setCurrentSession(session);
    
    addSystemMessage(`Let's explore ${selectedTopic}. Here's a scenario for you:\n\n${question.question}\n\nTake your time to think through this. What's your initial approach?`);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    
    if (isTeachingMode && currentQuestion) {
      handleTeachingResponse(inputValue);
    } else {
      handleGeneralResponse(inputValue);
    }
    
    setInputValue('');
  };

  const handleTeachingResponse = (response: string) => {
    if (!currentQuestion || !currentSession) return;

    // Update session with response
    const updatedSession = {
      ...currentSession,
      responses: [...currentSession.responses, response]
    };
    setCurrentSession(updatedSession);

    // Generate follow-up question using Socratic method
    setTimeout(() => {
      const followUp = questionEngine.current.generateFollowUp(
        currentQuestion.question,
        response,
        currentQuestion
      );
      
      // Add some educational commentary
      let commentary = "";
      if (response.toLowerCase().includes('unsure') || response.toLowerCase().includes('not sure')) {
        commentary = "I notice some uncertainty in your response. That's completely normal when learning! ";
      } else if (response.length > 100) {
        commentary = "Great detailed thinking! ";
      }
      
      addSystemMessage(`${commentary}${followUp}\n\nRemember, there's no single "right" answer - I'm interested in your reasoning process.`);
      
      // Update question tracking
      const updatedQuestions = [...currentSession.questionsAsked, followUp];
      setCurrentSession({
        ...updatedSession,
        questionsAsked: updatedQuestions
      });
    }, 1000);
  };

  const handleGeneralResponse = (response: string) => {
    // Simple response for general mode
    setTimeout(() => {
      if (response.toLowerCase().includes('question') || response.toLowerCase().includes('help')) {
        addSystemMessage("I'd be happy to help! You can enable Teaching Mode for guided Socratic questioning, or ask me specific questions about oncology topics. What would you like to explore?");
      } else {
        addSystemMessage("That's interesting. Would you like me to ask you some follow-up questions to explore this topic further? You can enable Teaching Mode for a more structured learning experience.");
      }
    }, 800);
  };

  const showHint = (level: number) => {
    if (!currentQuestion || level > currentQuestion.hints.length) return;
    
    const hint = currentQuestion.hints[level - 1];
    setHintsUsed(level);
    setShowHints(true);
    
    addSystemMessage(`💡 Hint ${level}/3: ${hint}`);
    
    // Update session
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        hintsUsed: level
      });
    }
  };

  const completeSession = () => {
    if (!currentSession || !currentQuestion) return;

    // Finalize session
    const finalSession = {
      ...currentSession,
      completed: true,
      effectivenessScore: calculateEffectiveness()
    };

    // Track in analytics
    const learningSession = {
      id: finalSession.id,
      timestamp: finalSession.timestamp,
      duration: Math.round((Date.now() - finalSession.timestamp.getTime()) / 60000), // minutes
      topicsStudied: [finalSession.topic],
      confidenceLevels: { [finalSession.topic]: confidenceLevel[0] },
      questionsAnswered: finalSession.questionsAsked.length,
      correctAnswers: Math.max(1, finalSession.questionsAsked.length - finalSession.hintsUsed),
      experienceLevel: finalSession.experienceLevel,
      hintsUsed: finalSession.hintsUsed
    };

    analytics.current.trackSession(learningSession);
    
    // Track question effectiveness
    questionEngine.current.trackEffectiveness(
      currentQuestion.id,
      true,
      confidenceLevel[0]
    );

    addSystemMessage(`Great learning session! You explored ${finalSession.topic} and worked through ${finalSession.questionsAsked.length} questions. Your learning has been tracked for progress analysis.\n\nWould you like to continue with another topic or review your progress?`);
    
    setCurrentQuestion(null);
    setCurrentSession(null);
    setHintsUsed(0);
    setShowHints(false);
  };

  const calculateEffectiveness = (): number => {
    if (!currentSession) return 0;
    
    // Simple effectiveness calculation
    const baseScore = 70;
    const hintPenalty = currentSession.hintsUsed * 5;
    const engagementBonus = Math.min(currentSession.responses.length * 2, 20);
    
    return Math.max(0, Math.min(100, baseScore - hintPenalty + engagementBonus));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Card className="m-4 mb-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
              <Brain className="w-6 h-6 mr-2" />
              AI Teaching Assistant
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Badge variant={isTeachingMode ? "default" : "secondary"} className="px-3 py-1">
                {isTeachingMode ? "Teaching Mode" : "Chat Mode"}
              </Badge>
              <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700 border-green-200">
                {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card className="mx-4 mb-2">
        <CardContent className="pt-4">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="topic">Topic</TabsTrigger>
              <TabsTrigger value="session">Session</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Teaching Mode</label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={isTeachingMode}
                      onCheckedChange={setIsTeachingMode}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {isTeachingMode ? 'Socratic Questions' : 'General Chat'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <select 
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  >
                    <option value="resident">Resident</option>
                    <option value="fellow">Fellow</option>
                    <option value="attending">Attending</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confidence Level: {confidenceLevel[0]}/5
                  </label>
                  <Slider
                    value={confidenceLevel}
                    onValueChange={setConfidenceLevel}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="topic" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Learning Topic</label>
                <select 
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                >
                  {ONCOLOGY_TOPICS.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              
              <Button 
                onClick={startNewQuestion}
                disabled={!isTeachingMode}
                className="w-full"
              >
                <Target className="w-4 h-4 mr-2" />
                Start New Question
              </Button>
            </TabsContent>
            
            <TabsContent value="session" className="space-y-4">
              {currentSession ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Topic:</span> {currentSession.topic}
                    </div>
                    <div>
                      <span className="font-medium">Questions:</span> {currentSession.questionsAsked.length}
                    </div>
                    <div>
                      <span className="font-medium">Hints Used:</span> {currentSession.hintsUsed}/3
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {Math.round((Date.now() - currentSession.timestamp.getTime()) / 60000)}m
                    </div>
                  </div>
                  
                  {currentQuestion && (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        {[1, 2, 3].map(level => (
                          <Button
                            key={level}
                            variant={hintsUsed >= level ? "default" : "outline"}
                            size="sm"
                            onClick={() => showHint(level)}
                            disabled={hintsUsed >= level || level > currentQuestion.hints.length}
                          >
                            <Lightbulb className="w-3 h-3 mr-1" />
                            Hint {level}
                          </Button>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={completeSession}
                        variant="outline"
                        className="w-full"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Complete Session
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No active session. Start a new question to begin learning!
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 mx-4 mb-2 flex flex-col">
        <CardContent className="flex-1 p-4 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isUser ? (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      ) : (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card className="mx-4 mb-4">
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isTeachingMode ? "Share your thinking and reasoning..." : "Ask me anything about oncology..."}
              className="flex-1 min-h-[60px] resize-none"
              rows={2}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {currentQuestion && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Difficulty: {currentQuestion.difficulty}/5</span>
                <span>Category: {currentQuestion.category}</span>
                <span>Learning Objective: {currentQuestion.expectedLearningOutcome}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatAssistant;