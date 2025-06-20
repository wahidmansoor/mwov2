import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Book, 
  List, 
  Eye, 
  Search,
  BookOpen
} from "lucide-react";

const handbookSections = [
  { 
    id: "toc-viewer", 
    name: "Table of Contents", 
    icon: List,
    description: "Navigate through clinical guidelines and protocols"
  },
  { 
    id: "content-viewer", 
    name: "Content Viewer", 
    icon: Eye,
    description: "View detailed clinical documentation and references"
  }
];

const mockTOC = [
  {
    id: "breast-cancer",
    title: "Breast Cancer Guidelines",
    subsections: [
      "Screening Protocols",
      "Diagnostic Workup",
      "Treatment Algorithms",
      "Follow-up Care"
    ]
  },
  {
    id: "lung-cancer",
    title: "Lung Cancer Guidelines", 
    subsections: [
      "Risk Assessment",
      "Staging Protocols",
      "Treatment Options",
      "Palliative Approaches"
    ]
  },
  {
    id: "colorectal-cancer",
    title: "Colorectal Cancer Guidelines",
    subsections: [
      "Prevention Strategies",
      "Early Detection",
      "Surgical Management",
      "Adjuvant Therapy"
    ]
  },
  {
    id: "emergency-protocols",
    title: "Emergency Protocols",
    subsections: [
      "Oncologic Emergencies",
      "Neutropenic Fever",
      "Tumor Lysis Syndrome",
      "Hypercalcemia"
    ]
  }
];

export default function HandbookModule() {
  const [activeSection, setActiveSection] = useState("toc-viewer");
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Clinical Handbook</h1>
            <p className="text-slate-600">Evidence-based clinical guidelines and protocols</p>
          </div>
        </div>
        
        {/* Module Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-slate-100">
            {handbookSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center space-x-2 text-sm"
              >
                <section.icon className="w-4 h-4" />
                <span>{section.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Table of Contents */}
          <TabsContent value="toc-viewer" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <List className="w-6 h-6 text-slate-600" />
                    <span>Clinical Guidelines Index</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {mockTOC.map((section) => (
                        <Card key={section.id} className="border border-slate-200">
                          <CardHeader className="pb-2">
                            <div className="flex items-center space-x-3">
                              <BookOpen className="w-5 h-5 text-slate-500" />
                              <h3 className="font-semibold text-slate-900">{section.title}</h3>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-2">
                              {section.subsections.map((subsection, index) => (
                                <li 
                                  key={index}
                                  className="text-sm text-slate-600 hover:text-slate-900 cursor-pointer flex items-center space-x-2"
                                  onClick={() => {
                                    setSelectedContent(`${section.title} - ${subsection}`);
                                    setActiveSection("content-viewer");
                                  }}
                                >
                                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                  <span>{subsection}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Content Viewer */}
          <TabsContent value="content-viewer" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-slate-600" />
                    <span>Content Viewer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedContent ? (
                    <div className="space-y-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {selectedContent}
                        </h3>
                        <p className="text-slate-600">
                          Detailed clinical guidelines and protocols would be displayed here.
                          This interface provides comprehensive access to evidence-based
                          medical documentation without patient-specific data.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-slate-200">
                          <CardContent className="p-4">
                            <h4 className="font-medium text-slate-900 mb-2">Evidence Level</h4>
                            <p className="text-sm text-slate-600">Grade A - High quality evidence</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-slate-200">
                          <CardContent className="p-4">
                            <h4 className="font-medium text-slate-900 mb-2">Last Updated</h4>
                            <p className="text-sm text-slate-600">Current guidelines - 2024</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-lg p-8 text-center">
                      <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Select Content to View
                      </h3>
                      <p className="text-slate-600">
                        Choose a guideline from the Table of Contents to view detailed information
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}