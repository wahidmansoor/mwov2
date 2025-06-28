import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Send, 
  BookOpen, 
  Brain, 
  Clock,
  Lightbulb,
  Search,
  Zap,
  AlertCircle,
  CheckCircle,
  FileText,
  Stethoscope
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  source?: string;
  confidence?: number;
}

const quickQueries = [
  {
    id: "nccn-breast",
    category: "NCCN Guidelines",
    query: "What are the current NCCN guidelines for HER2+ breast cancer treatment?",
    icon: BookOpen
  },
  {
    id: "dosing-carboplatin",
    category: "Dosing",
    query: "How do I calculate carboplatin dosing using Calvert formula?",
    icon: Brain
  },
  {
    id: "neutropenia-management",
    category: "Emergency",
    query: "What is the standard approach to neutropenic fever management?",
    icon: AlertCircle
  },
  {
    id: "asco-lung",
    category: "ASCO Guidelines",
    query: "What are the latest ASCO recommendations for NSCLC immunotherapy?",
    icon: FileText
  },
  {
    id: "palliative-pain",
    category: "Palliative Care",
    query: "How should I manage breakthrough cancer pain?",
    icon: Stethoscope
  },
  {
    id: "staging-colorectal",
    category: "Staging",
    query: "Explain TNM staging for colorectal cancer",
    icon: Search
  }
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your OncoVista AI assistant. I can help you with clinical guidelines, protocols, dosing calculations, and evidence-based oncology recommendations. What would you like to know?',
      timestamp: new Date(),
      source: 'OncoVista AI',
      confidence: 100
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (query?: string) => {
    const messageText = query || inputMessage;
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate AI response for demo purposes
      setTimeout(() => {
        const aiResponse = generateAIResponse(messageText);
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const generateAIResponse = (query: string): ChatMessage => {
    // This would integrate with actual AI service in production
    const responses: { [key: string]: { content: string; source: string; confidence: number } } = {
      'nccn': {
        content: 'For HER2+ breast cancer, current NCCN guidelines recommend:\n\n• **Adjuvant Treatment**: Trastuzumab + pertuzumab + chemotherapy (AC-TH or TCH regimens)\n• **Duration**: 12 months of anti-HER2 therapy\n• **Neoadjuvant**: Consider T-DM1 if residual disease after neoadjuvant therapy\n• **Metastatic**: First-line trastuzumab + pertuzumab + taxane, followed by T-DM1 or trastuzumab deruxtecan\n\nAlways verify with the most current NCCN guidelines as recommendations are updated regularly.',
        source: 'NCCN Guidelines v3.2024',
        confidence: 95
      },
      'carboplatin': {
        content: 'Carboplatin dosing using the Calvert formula:\n\n**Formula**: Dose (mg) = Target AUC × (GFR + 25)\n\n• **Target AUC**: Usually 5-6 for combination therapy, 6-7 for single agent\n• **GFR**: Use Cockcroft-Gault or measured creatinine clearance\n• **Maximum**: Consider capping at GFR 125 mL/min to avoid overdosing\n\n**Example**: For AUC 5 and GFR 100: Dose = 5 × (100 + 25) = 625 mg\n\nAlways round to nearest 25-50mg increment.',
        source: 'Calvert GL, J Clin Oncol 1989',
        confidence: 98
      },
      'neutropenic': {
        content: 'Neutropenic fever management protocol:\n\n**Immediate Actions** (within 1 hour):\n• Blood cultures × 2 (peripheral + central if applicable)\n• CBC with differential, CMP, lactate\n• Chest X-ray, urinalysis\n• Start empiric antibiotics\n\n**Antibiotic Selection**:\n• **Low risk**: Cefepime 2g IV q8h OR pip-tazo 4.5g IV q6h\n• **High risk**: Add vancomycin 15-20mg/kg IV q12h\n• **Persistent fever**: Consider antifungal after 4-7 days\n\n**Duration**: Continue until ANC >500 and afebrile ×24-48h',
        source: 'NCCN Prevention Guidelines',
        confidence: 96
      },
      'default': {
        content: 'I understand you\'re asking about oncology guidelines and protocols. While I can provide general educational information, please remember that:\n\n• All clinical decisions should be based on current published guidelines\n• Consider patient-specific factors and contraindications\n• Verify dosing and protocols with institutional standards\n• Consult with senior colleagues for complex cases\n\nCould you provide more specific details about what you\'re looking for?',
        source: 'OncoVista AI',
        confidence: 85
      }
    };

    const queryLower = query.toLowerCase();
    let responseKey = 'default';
    
    if (queryLower.includes('nccn') || queryLower.includes('her2') || queryLower.includes('breast')) {
      responseKey = 'nccn';
    } else if (queryLower.includes('carboplatin') || queryLower.includes('calvert') || queryLower.includes('dosing')) {
      responseKey = 'carboplatin';
    } else if (queryLower.includes('neutropenic') || queryLower.includes('fever') || queryLower.includes('neutropenia')) {
      responseKey = 'neutropenic';
    }

    const response = responses[responseKey];
    
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date(),
      source: response.source,
      confidence: response.confidence
    };
  };

  const handleQuickQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h2>
          <p className="text-muted-foreground">
            Ask questions about clinical guidelines, protocols, and evidence-based oncology practice
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Quick Queries Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Quick Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickQueries.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleQuickQuery(item.query)}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.query}
                        </span>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>NCCN, ASCO, ESMO guidelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Drug dosing calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Protocol recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Emergency management</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span>Educational purposes only</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Clinical Assistant
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          {message.type === 'assistant' && message.source && (
                            <div className="flex items-center gap-2">
                              <span>{message.source}</span>
                              {message.confidence && (
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {message.confidence}% confident
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="h-4 w-4 animate-pulse" />
                          AI is thinking...
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <Separator />
              
              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about guidelines, protocols, dosing, or clinical scenarios..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This AI assistant provides educational information only. Always verify with current guidelines and consult colleagues for clinical decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}