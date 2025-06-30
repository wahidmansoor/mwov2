import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Stethoscope, 
  Users, 
  FileText, 
  Brain, 
  Activity,
  Clock,
  AlertCircle,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import section components
import SymptomControl from "./sections/SymptomControl";
import EnhancedPainManagement from "./sections/EnhancedPainManagement";
import FamilySupport from "./sections/FamilySupport";
import AdvancedDirective from "./sections/AdvancedDirective";
import PsychosocialCare from "./sections/PsychosocialCare";
import QualityOfLife from "./sections/QualityOfLife";

interface ModuleSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
}

const sections: ModuleSection[] = [
  {
    id: "symptom",
    title: "Symptom Control",
    description: "Interactive symptom tracking with real-time assessment and evidence-based protocols",
    icon: Activity,
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    badge: "Enhanced"
  },
  {
    id: "pain",
    title: "Pain Management",
    description: "WHO analgesic ladder, opioid conversion calculator, and comprehensive pain assessment",
    icon: Zap,
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    badge: "Essential"
  },
  {
    id: "family",
    title: "Family Support",
    description: "Caregiver education, psychological support, and bereavement care",
    icon: Users,
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    badge: "Core"
  },
  {
    id: "directive",
    title: "Advanced Directives",
    description: "Legal documents, treatment decisions, and conversation frameworks",
    icon: FileText,
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    badge: "Legal"
  },
  {
    id: "psychosocial",
    title: "Psychosocial Care",
    description: "Communication techniques, behavioral change, and spiritual support",
    icon: Brain,
    color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
    badge: "Holistic"
  },
  {
    id: "quality",
    title: "Quality of Life",
    description: "Assessment tools, interdisciplinary care, and improvement strategies",
    icon: Heart,
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    badge: "Outcome"
  }
];

export default function PalliativeCareModule() {
  const [activeSection, setActiveSection] = useState("symptom");

  const renderSectionContent = () => {
    switch (activeSection) {
      case "symptom":
        return <SymptomControl />;
      case "pain":
        return <EnhancedPainManagement />;
      case "family":
        return <FamilySupport />;
      case "directive":
        return <AdvancedDirective />;
      case "psychosocial":
        return <PsychosocialCare />;
      case "quality":
        return <QualityOfLife />;
      default:
        return <SymptomControl />;
    }
  };

  const getTabColor = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return "";
    
    switch (sectionId) {
      case "pain": return "data-[state=active]:bg-red-100 data-[state=active]:text-red-700 dark:data-[state=active]:bg-red-900 dark:data-[state=active]:text-red-300";
      case "family": return "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300";
      case "directive": return "data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-300";
      case "psychosocial": return "data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900 dark:data-[state=active]:text-orange-300";
      case "quality": return "data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-green-300";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-xl">
              <Heart className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Palliative Care Module
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                Evidence-based guidance for comprehensive supportive care
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <Stethoscope className="h-3 w-3 mr-1" />
              Clinical Decision Support
            </Badge>
            <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-700 dark:text-green-300">
              <Clock className="h-3 w-3 mr-1" />
              5 Core Sections
            </Badge>
            <Badge variant="outline" className="border-amber-200 text-amber-700 dark:border-amber-700 dark:text-amber-300">
              <AlertCircle className="h-3 w-3 mr-1" />
              Educational Use Only
            </Badge>
          </div>
        </div>

        {/* Section Overview Cards - Mobile-friendly grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <Card 
                key={section.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  section.color,
                  isActive && "ring-2 ring-green-500 dark:ring-green-400"
                )}
                onClick={() => setActiveSection(section.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <Badge variant="secondary" className="text-xs">
                      {section.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Area with Tabs */}
        <Card className="min-h-[600px]">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <div className="border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-2 gap-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 text-xs font-medium transition-all duration-200",
                        "hover:bg-white/50 dark:hover:bg-gray-700/50",
                        getTabColor(section.id)
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{section.title}</span>
                      <span className="sm:hidden">{section.title.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {sections.map((section) => (
                <TabsContent key={section.id} value={section.id} className="mt-0">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <section.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h2>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {section.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  
                  {/* Render the specific section component */}
                  <div className="space-y-6">
                    {renderSectionContent()}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </Card>

        {/* Footer Information */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                Clinical Decision Support Notice
              </h3>
              <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                This module provides educational content and clinical decision support for healthcare professionals. 
                All guidance should be verified against current institutional protocols and evidence-based guidelines. 
                This tool is intended for educational and training purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}