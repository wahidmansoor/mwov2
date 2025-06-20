import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Stethoscope, 
  Users, 
  Search, 
  Shield, 
  UserPlus, 
  TrendingUp 
} from "lucide-react";

const opdSections = [
  { 
    id: "clinical-overview", 
    name: "Clinical Overview", 
    icon: Users,
    description: "Comprehensive clinical assessment and overview tools"
  },
  { 
    id: "diagnostic-pathways", 
    name: "Diagnostic Pathways", 
    icon: Search,
    description: "Evidence-based diagnostic algorithms and decision trees"
  },
  { 
    id: "cancer-screening", 
    name: "Cancer Screening", 
    icon: Shield,
    description: "Population-based screening protocols and guidelines"
  },
  { 
    id: "referral-guidelines", 
    name: "Referral Guidelines", 
    icon: UserPlus,
    description: "Specialist referral criteria and pathways"
  },
  { 
    id: "follow-up-oncology", 
    name: "Follow-up Oncology", 
    icon: TrendingUp,
    description: "Post-treatment monitoring and surveillance protocols"
  }
];

export default function OPDModule() {
  const [activeSection, setActiveSection] = useState("clinical-overview");

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
          <div className="w-12 h-12 bg-medical-blue rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">OPD Module</h1>
            <p className="text-slate-600">Outpatient diagnosis and clinical decision support</p>
          </div>
        </div>
        
        {/* Module Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-5 w-full bg-slate-100">
            {opdSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center space-x-2 text-sm"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Section Content */}
          {opdSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <section.icon className="w-6 h-6 text-medical-blue" />
                      <span>{section.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-600">{section.description}</p>
                      <div className="bg-slate-50 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 bg-medical-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                          <section.icon className="w-8 h-8 text-medical-blue" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {section.name} Interface
                        </h3>
                        <p className="text-slate-600">
                          Clinical decision support tools for {section.name.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}