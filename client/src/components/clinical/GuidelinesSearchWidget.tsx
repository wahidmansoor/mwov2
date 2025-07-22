import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, BookOpen, ExternalLink, Star, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Guideline {
  id: string;
  title: string;
  organization: string;
  version: string;
  category: string;
  evidenceLevel: string;
  lastUpdated: string;
  summary: string;
  tags: string[];
}

export default function GuidelinesSearchWidget() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("all");

  // Mock guidelines data representing authentic clinical guidelines
  const guidelines: Guideline[] = [
    {
      id: "nccn-breast-2025",
      title: "NCCN Guidelines for Breast Cancer",
      organization: "NCCN",
      version: "v2.2025",
      category: "breast",
      evidenceLevel: "Category 1",
      lastUpdated: "2025-01-15",
      summary: "Comprehensive evidence-based guidelines for breast cancer screening, diagnosis, and treatment including HER2+ protocols and immunotherapy combinations.",
      tags: ["breast cancer", "HER2", "immunotherapy", "screening"]
    },
    {
      id: "asco-immunotherapy-2025",
      title: "ASCO Guidelines for Immunotherapy Toxicity Management",
      organization: "ASCO",
      version: "2025",
      category: "immunotherapy",
      evidenceLevel: "High Quality Evidence",
      lastUpdated: "2025-01-10",
      summary: "Evidence-based recommendations for managing immune-related adverse events across all cancer types with corticosteroid protocols and specialist referral criteria.",
      tags: ["immunotherapy", "toxicity", "irAEs", "corticosteroids"]
    },
    {
      id: "esmo-nsclc-2025",
      title: "ESMO Guidelines for Non-Small Cell Lung Cancer",
      organization: "ESMO",
      version: "2025",
      category: "lung",
      evidenceLevel: "Level IA",
      lastUpdated: "2025-01-08",
      summary: "Comprehensive molecular testing requirements including EGFR, ALK, ROS1, BRAF, KRAS G12C, MET, RET, and NTRK for all advanced NSCLC patients.",
      tags: ["NSCLC", "molecular testing", "targeted therapy", "biomarkers"]
    },
    {
      id: "nccn-pancreatic-2025",
      title: "NCCN Guidelines for Pancreatic Adenocarcinoma",
      organization: "NCCN",
      version: "v2.2025",
      category: "pancreatic",
      evidenceLevel: "Category 1",
      lastUpdated: "2025-01-05",
      summary: "Genetic testing recommendations for all patients including BRCA1/2, PALB2, ATM, and Lynch syndrome genes with surgical margin definitions.",
      tags: ["pancreatic cancer", "genetic testing", "BRCA", "surgery"]
    },
    {
      id: "nccn-sclc-2025",
      title: "NCCN Guidelines for Small Cell Lung Cancer",
      organization: "NCCN",
      version: "v4.2025",
      category: "lung",
      evidenceLevel: "Category 1",
      lastUpdated: "2025-01-01",
      summary: "Treatment protocols for extensive-stage SCLC including carboplatin + etoposide + atezolizumab as preferred first-line therapy.",
      tags: ["SCLC", "extensive stage", "atezolizumab", "first-line"]
    }
  ];

  const filteredGuidelines = guidelines.filter(guideline => {
    const matchesSearch = searchTerm === "" || 
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || guideline.category === selectedCategory;
    const matchesOrganization = selectedOrganization === "all" || guideline.organization === selectedOrganization;
    
    return matchesSearch && matchesCategory && matchesOrganization;
  });

  const getEvidenceBadgeColor = (level: string) => {
    if (level.includes("Category 1") || level.includes("Level IA")) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    }
    if (level.includes("High Quality")) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Clinical Guidelines Search
          <Badge variant="secondary" className="ml-auto">
            {filteredGuidelines.length} Guidelines
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guidelines, cancer types, or treatments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="breast">Breast Cancer</SelectItem>
                <SelectItem value="lung">Lung Cancer</SelectItem>
                <SelectItem value="pancreatic">Pancreatic Cancer</SelectItem>
                <SelectItem value="immunotherapy">Immunotherapy</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                <SelectItem value="NCCN">NCCN</SelectItem>
                <SelectItem value="ASCO">ASCO</SelectItem>
                <SelectItem value="ESMO">ESMO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Guidelines List */}
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {filteredGuidelines.map((guideline) => (
              <Card key={guideline.id} className="p-3 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm leading-tight">
                      {guideline.title}
                    </h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      {guideline.organization} {guideline.version}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getEvidenceBadgeColor(guideline.evidenceLevel)}`}
                    >
                      {guideline.evidenceLevel}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Updated {new Date(guideline.lastUpdated).toLocaleDateString()}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {guideline.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {guideline.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {guideline.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{guideline.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {filteredGuidelines.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No guidelines found matching your search criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}