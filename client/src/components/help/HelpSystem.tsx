import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, 
  Search, 
  FileText, 
  Video, 
  Settings, 
  MessageSquare, 
  ChevronRight, 
  ArrowLeft, 
  Star,
  Stethoscope,
  Calculator,
  Database,
  Users,
  Brain,
  Shield,
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Play
} from 'lucide-react';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  module?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  views: number;
  rating: number;
}

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with OncoVista AI',
    category: 'Getting Started',
    content: `
# Getting Started with OncoVista AI

OncoVista AI is your comprehensive clinical decision support platform designed for oncology professionals at all levels.

## Core Features
- **OPD Module**: Outpatient diagnosis and screening protocols
- **CDU Module**: Cancer Day Unit treatment planning and monitoring  
- **Inpatient Module**: Hospital-based cancer care workflows
- **Palliative Care**: Symptom management and supportive care
- **AI Assistant**: Interactive guideline queries and recommendations
- **Clinical Tools**: Calculators, alerts, and assessment tools
- **Education Module**: AI-powered learning and training
- **Analytics**: Usage metrics and compliance tracking

## Quick Navigation
Use the sidebar to access different modules. Each module is color-coded for easy identification.

## Auto-logout Security
For your security, sessions automatically expire after 15 minutes of inactivity. You'll receive a 2-minute warning before logout.
    `,
    difficulty: 'beginner',
    tags: ['overview', 'navigation', 'security'],
    views: 1250,
    rating: 4.8
  },
  {
    id: '2',
    title: 'OPD Module: Outpatient Workflows',
    category: 'Module Guides',
    module: 'opd',
    content: `
# OPD Module: Outpatient Diagnosis & Screening

## Overview
The OPD (Outpatient Department) module provides comprehensive diagnostic workflows for cancer screening and early detection.

## Key Features
- **Risk Assessment**: Age-based screening protocols
- **Symptom Analysis**: AI-powered symptom evaluation
- **Biomarker Testing**: Genetic and molecular testing guidance
- **Referral Management**: Automated specialist referrals
- **Follow-up Scheduling**: Evidence-based surveillance intervals

## Workflow Steps
1. **Patient Assessment**: Enter demographics and risk factors
2. **Symptom Evaluation**: Document presenting symptoms
3. **AI Analysis**: Review AI-generated recommendations
4. **Protocol Selection**: Choose appropriate diagnostic pathway
5. **Documentation**: Generate clinical notes and referrals

## Best Practices
- Always verify patient information before proceeding
- Review AI recommendations with clinical judgment
- Document all decision points for audit trail
- Follow up on pending investigations promptly
    `,
    difficulty: 'intermediate',
    tags: ['opd', 'workflow', 'screening', 'diagnosis'],
    views: 890,
    rating: 4.7
  },
  {
    id: '3',
    title: 'CDU Module: Treatment Planning',
    category: 'Module Guides',
    module: 'cdu',
    content: `
# CDU Module: Cancer Day Unit Operations

## Overview
The CDU module manages chemotherapy protocols, toxicity monitoring, and treatment optimization for day-unit patients.

## Core Components
- **Protocol Selection**: Evidence-based treatment regimens
- **Dosage Calculation**: BSA and renal function adjustments
- **Toxicity Monitoring**: Real-time side effect tracking
- **Treatment Planning**: Comprehensive care coordination
- **Safety Alerts**: Drug interaction warnings

## Treatment Workflow
1. **Protocol Selection**: Choose cancer-specific regimen
2. **Dose Calculation**: Apply patient-specific adjustments
3. **Safety Review**: Check contraindications and interactions
4. **Administration**: Monitor during treatment
5. **Documentation**: Record outcomes and toxicities

## Safety Features
- Automatic dose adjustment recommendations
- Real-time drug interaction alerts
- Toxicity grading with management suggestions
- Emergency protocol access
    `,
    difficulty: 'advanced',
    tags: ['cdu', 'chemotherapy', 'safety', 'protocols'],
    views: 675,
    rating: 4.9
  },
  {
    id: '4',
    title: 'AI Assistant: Clinical Queries',
    category: 'AI Features',
    module: 'chat',
    content: `
# AI Assistant: Interactive Clinical Support

## Overview
The AI Assistant provides real-time access to NCCN, ASCO, and ESMO guidelines through natural language queries.

## Query Types
- **Guideline Questions**: "What is the NCCN protocol for stage IIIA lung cancer?"
- **Drug Information**: "What are the contraindications for pembrolizumab?"
- **Biomarker Interpretation**: "How do I interpret PD-L1 expression results?"
- **Side Effect Management**: "How to manage grade 3 diarrhea from irinotecan?"

## Best Practices
- Be specific in your queries for better results
- Verify AI recommendations with current guidelines
- Document important interactions in patient records
- Use follow-up questions to clarify complex topics

## Confidence Scores
The AI provides confidence levels for all recommendations:
- **High (>90%)**: Evidence-based recommendations
- **Medium (70-90%)**: Qualified suggestions
- **Low (<70%)**: Requires verification
    `,
    difficulty: 'intermediate',
    tags: ['ai', 'guidelines', 'queries', 'support'],
    views: 1100,
    rating: 4.6
  }
];

export default function HelpSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [activeTab, setActiveTab] = useState('articles');

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (selectedArticle) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="btn-responsive">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help
          </Button>
        </DialogTrigger>
        <DialogContent className="modal-responsive max-w-4xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArticle(null)}
                className="btn-responsive"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getDifficultyColor(selectedArticle.difficulty)}>
                    {selectedArticle.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {renderStars(selectedArticle.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({selectedArticle.views} views)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: selectedArticle.content
                  .replace(/^# /gm, '<h1 class="text-2xl font-bold mb-4">')
                  .replace(/^## /gm, '<h2 class="text-xl font-semibold mb-3 mt-6">')
                  .replace(/^### /gm, '<h3 class="text-lg font-medium mb-2 mt-4">')
                  .replace(/^\- /gm, '<li>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br>')
              }} />
            </div>
          </ScrollArea>
          
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            {selectedArticle.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="btn-responsive">
          <HelpCircle className="w-4 h-4 mr-2" />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="modal-responsive max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-responsive-xl">OncoVista AI Help Center</DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles, tutorials, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">
              <FileText className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              <Video className="w-4 h-4 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="modules">
              <Settings className="w-4 h-4 mr-2" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="support">
              <MessageSquare className="w-4 h-4 mr-2" />
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-4">
            <ScrollArea className="h-96">
              <div className="grid-responsive">
                {filteredArticles.map(article => (
                  <Card
                    key={article.id}
                    className="card-responsive cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-responsive-base">{article.title}</CardTitle>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(article.difficulty)}>
                          {article.difficulty}
                        </Badge>
                        <Badge variant="outline">{article.category}</Badge>
                        {article.module && (
                          <Badge variant="secondary">{article.module}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {renderStars(article.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {article.views} views
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-4">
            <ScrollArea className="h-96">
              <div className="grid-responsive">
                <Card className="card-responsive">
                  <CardHeader>
                    <CardTitle>Interactive Tutorials</CardTitle>
                    <CardDescription>
                      Step-by-step guides for mastering OncoVista AI workflows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">First-Time Setup</h4>
                          <p className="text-sm text-muted-foreground">Complete platform walkthrough</p>
                        </div>
                        <Badge variant="outline">5 min</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">OPD Workflow Tutorial</h4>
                          <p className="text-sm text-muted-foreground">Outpatient diagnosis workflows</p>
                        </div>
                        <Badge variant="outline">8 min</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">CDU Treatment Planning</h4>
                          <p className="text-sm text-muted-foreground">Cancer Day Unit operations</p>
                        </div>
                        <Badge variant="outline">12 min</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="modules" className="mt-4">
            <div className="grid-responsive">
              <Card className="card-responsive">
                <CardHeader>
                  <CardTitle>Module Overview</CardTitle>
                  <CardDescription>
                    Quick access to module-specific help and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['OPD', 'CDU', 'Inpatient', 'Palliative', 'AI Chat', 'Tools', 'Education', 'Analytics'].map(module => (
                      <div key={module} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{module}</span>
                        <Button variant="ghost" size="sm">
                          View Help
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-4">
            <div className="grid-responsive">
              <Card className="card-responsive">
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Need additional help? Our support team is here to assist you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Technical Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        For technical issues, bugs, or platform problems
                      </p>
                      <Button variant="outline" size="sm">
                        Contact Technical Support
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Clinical Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        For questions about clinical workflows or guidelines
                      </p>
                      <Button variant="outline" size="sm">
                        Contact Clinical Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}