import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";
import LocalLoginForm from "@/components/auth/LocalLoginForm";
import { 
  Shield, 
  Brain, 
  Stethoscope, 
  Syringe, 
  Heart, 
  Bed,
  Rocket,
  Book,
  UserCheck,
  ChartLine,
  ArrowRight,
  CheckCircle,
  Activity
} from "lucide-react";

const modules = [
  {
    id: "opd",
    name: "OPD Module",
    description: "Outpatient diagnosis, screening, and referral management with AI-powered decision support.",
    icon: Stethoscope,
    color: "medical-blue",
    href: "/opd"
  },
  {
    id: "cdu", 
    name: "CDU Module",
    description: "Cancer Day Unit protocols, dosage calculations, and toxicity monitoring systems.",
    icon: Syringe,
    color: "medical-purple",
    href: "/cdu"
  },
  {
    id: "inpatient",
    name: "Inpatient Oncology",
    description: "Admission protocols, emergency regimens, and comprehensive inpatient care workflows.",
    icon: Bed,
    color: "medical-orange",
    href: "/inpatient"
  },
  {
    id: "palliative",
    name: "Palliative Care",
    description: "Symptom management, pain control, and psychosocial support frameworks.",
    icon: Heart,
    color: "medical-green",
    href: "/palliative"
  },
  {
    id: "chat",
    name: "AI Assistant",
    description: "Interactive clinical guidance with NCCN, ASCO, and ESMO guidelines support.",
    icon: Brain,
    color: "blue-500",
    href: "/chat"
  },
  {
    id: "tools",
    name: "Clinical Tools",
    description: "Calculators, red flag alerts, lab interpretation, and quick reference guides.",
    icon: Activity,
    color: "purple-500",
    href: "/tools"
  }
];

const features = [
  { icon: UserCheck, text: "Clinical Decision Support" },
  { icon: Brain, text: "Multi-Modal AI Engine" },
  { icon: Stethoscope, text: "Treatment Protocols" },
  { icon: ChartLine, text: "Real-time Analytics" }
];

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [showLocalLogin, setShowLocalLogin] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if we're in development mode
    const checkDevMode = async () => {
      try {
        const response = await fetch('/api/dev-mode-check');
        setIsDevMode(response.ok);
      } catch {
        setIsDevMode(false);
      }
    };
    checkDevMode();

    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleSignIn = () => {
    if (isDevMode) {
      setShowLocalLogin(true);
    } else {
      window.location.href = "/api/login";
    }
  };

  const handleAccessPlatform = () => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    } else {
      handleSignIn();
    }
  };

  // Show local login form if in development mode and requested
  if (showLocalLogin && isDevMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Logo />
            <h1 className="mt-4 text-2xl font-bold text-slate-900">OncoVista AI</h1>
            <p className="text-slate-600">Development Environment</p>
          </div>
          <LocalLoginForm onSuccess={() => setShowLocalLogin(false)} />
          <div className="text-center mt-4">
            <Button 
              variant="ghost" 
              onClick={() => setShowLocalLogin(false)}
              className="text-sm"
            >
              Back to Landing Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="glass border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            <div className="flex items-center space-x-2">
              {isDevMode && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                  DEV MODE
                </span>
              )}
              <Button 
                onClick={handleSignIn}
                className="bg-medical-blue hover:bg-medical-blue-dark text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                {isDevMode ? "Local Sign In" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-medical-blue-light border border-blue-200 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-medical-blue mr-2" />
                <span className="text-medical-blue text-sm font-medium">HIPAA Compliant & Medical Grade</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                AI-Powered
                <span className="gradient-medical-primary bg-clip-text text-transparent block">
                  Oncology Care
                </span>
                Platform
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Comprehensive clinical decision support system integrating OPD, CDU, Palliative Care, 
                and Inpatient modules with advanced AI capabilities for optimal patient outcomes.
              </p>

              {/* Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-medical-green-light rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-medical-green" />
                    </div>
                    <span className="text-slate-700">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAccessPlatform}
                  size="lg"
                  className="bg-medical-blue hover:bg-medical-blue-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Access Platform
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
                >
                  <Book className="w-5 h-5 mr-2" />
                  Documentation
                </Button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 animate-float">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-medical-blue to-medical-purple rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="h-16 bg-medical-green-light rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-medical-green" />
                    </div>
                    <div className="h-16 bg-medical-orange-light rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-medical-orange" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 glass rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-medical-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">AI Analysis Active</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-lg"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-medical-blue">99.7%</p>
                  <p className="text-sm text-slate-600">Accuracy Rate</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modules Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Care Modules</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Integrated platform covering the complete oncology care spectrum with AI-powered insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 gradient-medical-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{module.name}</h3>
                    <p className="text-slate-600 mb-4">{module.description}</p>
                    <div className="text-medical-blue font-medium group-hover:text-medical-blue-dark transition-colors">
                      <ArrowRight className="w-4 h-4 inline mr-1" />
                      Learn More
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
