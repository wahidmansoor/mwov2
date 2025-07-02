import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Dna, Zap, Heart, ArrowRight, BookOpen, Users, GraduationCap } from "lucide-react";
import HandbookCategoryCard from "./components/HandbookCategoryCard";

const handbooks = [
  {
    id: "medical",
    title: "Medical Oncology Handbook",
    description: "Comprehensive guide to systemic cancer therapies, clinical management, and organ-based oncology",
    icon: Dna,
    color: "blue",
    href: "/handbook/medical",
    topics: ["Cancer Biology", "Systemic Therapies", "Clinical Management", "Organ-based Oncology", "Special Topics"],
    chapterCount: 7
  },
  {
    id: "radiation",
    title: "Radiation Oncology Handbook", 
    description: "Fundamentals of radiation therapy, treatment planning, and site-specific radiation oncology",
    icon: Zap,
    color: "orange",
    href: "/handbook/radiation",
    topics: ["Radiation Physics", "Treatment Planning", "Clinical Radiation", "Site-Specific Care", "Quality & Safety"],
    chapterCount: 8
  },
  {
    id: "palliative",
    title: "Palliative Care Handbook",
    description: "Evidence-based approaches to symptom management, communication, and end-of-life care",
    icon: Heart,
    color: "green", 
    href: "/handbook/palliative",
    topics: ["Symptom Management", "Communication", "End-of-Life Care", "Disease-Specific Approaches", "Ethics"],
    chapterCount: 9
  }
];

const stats = [
  {
    icon: BookOpen,
    value: "24",
    label: "Total Chapters",
    description: "Comprehensive coverage across all specialties"
  },
  {
    icon: Users,
    value: "3",
    label: "Specialties",
    description: "Medical, radiation, and palliative oncology"
  },
  {
    icon: GraduationCap,
    value: "100%",
    label: "Evidence-Based",
    description: "Current guidelines and best practices"
  }
];

export default function HandbookModule() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
              <Book className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Clinical Handbooks
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Comprehensive clinical reference guides for oncology professionals. 
            Access evidence-based protocols, treatment guidelines, and clinical decision support across all major oncology specialties.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handbook Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Choose Your Specialty
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {handbooks.map((handbook) => (
              <HandbookCategoryCard 
                key={handbook.id} 
                handbook={handbook}
                onClick={() => setLocation(handbook.href)}
              />
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Educational Resource
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                These handbooks are designed for educational purposes and clinical decision support. 
                Content is based on current evidence-based guidelines from major oncology organizations 
                including NCCN, ASCO, ESMO, and ASTRO. Always verify with institutional protocols and current literature.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}