import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientEvaluationForm from "./components/PatientEvaluationForm";
import AIRecommendationsPanel from "./components/AIRecommendationsPanel";
import { Stethoscope, Users, Search, Shield, UserPlus, TrendingUp } from "lucide-react";

const opdSections = [
  { id: "patient-evaluation", name: "Patient Evaluation", icon: Users },
  { id: "diagnostic-pathways", name: "Diagnostic Pathways", icon: Search },
  { id: "cancer-screening", name: "Cancer Screening", icon: Shield },
  { id: "referral-guidelines", name: "Referral Guidelines", icon: UserPlus },
  { id: "follow-up-oncology", name: "Follow-up Oncology", icon: TrendingUp }
];

export default function OPDModule() {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState("patient-evaluation");
  
  // Extract section from URL if present
  const urlSection = location.split("/opd/")[1] || "patient-evaluation";

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
          <div className="w-12 h-12 gradient-medical-primary rounded-xl flex items-center justify-center">
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

          {/* Patient Evaluation Section */}
          <TabsContent value="patient-evaluation" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Patient Evaluation Form */}
              <div className="lg:col-span-2">
                <PatientEvaluationForm />
              </div>
              
              {/* AI Recommendations Panel */}
              <div className="lg:col-span-1">
                <AIRecommendationsPanel />
              </div>
            </div>
          </TabsContent>

          {/* Other sections - placeholder content */}
          <TabsContent value="diagnostic-pathways" className="mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Diagnostic Pathways</h3>
              <p className="text-slate-600 mb-4">
                AI-guided diagnostic decision trees and pathway recommendations
              </p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>

          <TabsContent value="cancer-screening" className="mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Cancer Screening</h3>
              <p className="text-slate-600 mb-4">
                Evidence-based screening protocols and risk assessment tools
              </p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>

          <TabsContent value="referral-guidelines" className="mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <UserPlus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Referral Guidelines</h3>
              <p className="text-slate-600 mb-4">
                Automated referral recommendations and specialist matching
              </p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>

          <TabsContent value="follow-up-oncology" className="mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Follow-up Oncology</h3>
              <p className="text-slate-600 mb-4">
                Long-term monitoring and surveillance protocols
              </p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
