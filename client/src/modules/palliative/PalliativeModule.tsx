import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Thermometer, 
  Shield, 
  Users, 
  Brain 
} from "lucide-react";

const palliativeSections = [
  { 
    id: "symptom-control", 
    name: "Symptom Control", 
    icon: Thermometer,
    description: "Comprehensive symptom assessment and management protocols"
  },
  { 
    id: "pain-management", 
    name: "Pain Management", 
    icon: Heart,
    description: "Evidence-based pain assessment and treatment guidelines"
  },
  { 
    id: "advance-directives", 
    name: "Advance Directives", 
    icon: Shield,
    description: "Legal documentation and care planning frameworks"
  },
  { 
    id: "family-support", 
    name: "Family Support", 
    icon: Users,
    description: "Family education and support system resources"
  },
  { 
    id: "psychosocial-care", 
    name: "Psychosocial Care", 
    icon: Brain,
    description: "Mental health and spiritual care interventions"
  }
];

export default function PalliativeModule() {
  const [activeSection, setActiveSection] = useState("symptom-control");

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
          <div className="w-12 h-12 bg-medical-green rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Palliative Care Module</h1>
            <p className="text-slate-600">Comprehensive comfort care and quality of life support</p>
          </div>
        </div>
        
        {/* Module Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-5 w-full bg-slate-100">
            {palliativeSections.map((section) => (
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
          {palliativeSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <section.icon className="w-6 h-6 text-medical-green" />
                      <span>{section.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-600">{section.description}</p>
                      <div className="bg-slate-50 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 bg-medical-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                          <section.icon className="w-8 h-8 text-medical-green" />
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