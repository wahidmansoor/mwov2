import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, FileText, Dna } from "lucide-react";
import { useLocation } from "wouter";
import TOCGenerator from "./components/TOCGenerator";
import MarkdownViewer from "./components/MarkdownViewer";

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

const medicalOncologyIndex = `Medical Oncology Handbook – Index
________________________________________
Chapter 1: Principles of Oncology
•	1.1 Cancer Biology
o	1.1.1 Hallmarks of Cancer
o	1.1.2 Oncogenes and Tumor Suppressor Genes
o	1.1.3 Tumor Microenvironment
•	1.2 Carcinogenesis
o	1.2.1 Genetic and Epigenetic Mechanisms
o	1.2.2 Environmental and Lifestyle Risk Factors
•	1.3 Tumor Immunology
o	1.3.1 Immune Surveillance and Escape
o	1.3.2 Role of Cytokines and Checkpoints
________________________________________
Chapter 2: Diagnostic Workup and Staging
•	2.1 History and Physical Examination
•	2.2 Diagnostic Imaging
o	2.2.1 CT, MRI, PET
o	2.2.2 Functional Imaging
•	2.3 Tumor Markers and Laboratory Tests
•	2.4 Biopsy and Histopathology
•	2.5 Cancer Staging Systems
o	2.5.1 TNM Classification
o	2.5.2 AJCC/UICC Guidelines
________________________________________
Chapter 3: Systemic Cancer Therapies
•	3.1 Chemotherapy
o	3.1.1 Mechanisms of Action
o	3.1.2 Classes of Chemotherapeutic Agents
o	3.1.3 Dosing and Scheduling
o	3.1.4 Resistance Mechanisms
•	3.2 Targeted Therapy
o	3.2.1 Tyrosine Kinase Inhibitors
o	3.2.2 Monoclonal Antibodies
o	3.2.3 PARP, BRAF, ALK Inhibitors
•	3.3 Immunotherapy
o	3.3.1 Immune Checkpoint Inhibitors
o	3.3.2 CAR-T Cell Therapy
•	3.4 Hormonal Therapy
o	3.4.1 Endocrine Cancers
o	3.4.2 Mechanisms and Agents
•	3.5 Radiopharmaceuticals
•	3.6 Combination Therapy and Multimodal Approaches
________________________________________
Chapter 4: Principles of Clinical Management
•	4.1 Performance Status and Treatment Decision-Making
•	4.2 Supportive and Palliative Care
o	4.2.1 Pain Management
o	4.2.2 Antiemetics and Nutrition
o	4.2.3 Psychological Support
•	4.3 Toxicities and Adverse Effects
o	4.3.1 Hematologic
o	4.3.2 GI, Renal, Cardiac, Pulmonary
o	4.3.3 Immunotherapy-related Toxicities (irAEs)
•	4.4 Survivorship and Long-term Follow-up
________________________________________
Chapter 5: Organ-based Oncology
•	5.1 Breast Cancer
o	5.1.1 Molecular Subtypes
o	5.1.2 Neoadjuvant and Adjuvant Therapies
•	5.2 Lung Cancer
o	5.2.1 NSCLC and SCLC
o	5.2.2 Biomarker-driven Therapy
•	5.3 Gastrointestinal Cancers
o	5.3.1 Colorectal Cancer
o	5.3.2 Gastric and Esophageal Cancers
o	5.3.3 Pancreatic and Hepatobiliary Cancers
•	5.4 Genitourinary Cancers
o	5.4.1 Prostate and Bladder Cancer
o	5.4.2 Renal Cell Carcinoma
•	5.5 Gynecologic Cancers
o	5.5.1 Ovarian, Cervical, Endometrial Cancer
•	5.6 Head and Neck Cancers
•	5.7 Central Nervous System Tumors
o	5.7.1 Glioblastoma and Meningiomas
•	5.8 Hematologic Malignancies (Overview)
o	5.8.1 Lymphomas
o	5.8.2 Leukemias
o	5.8.3 Multiple Myeloma
________________________________________
Chapter 6: Special Topics in Oncology
•	6.1 Geriatric Oncology
•	6.2 Adolescent and Young Adult (AYA) Oncology
•	6.3 Pregnancy and Cancer
•	6.4 Oncologic Emergencies
o	6.4.1 Tumor Lysis Syndrome
o	6.4.2 Hypercalcemia
o	6.4.3 Spinal Cord Compression
•	6.5 Cancer of Unknown Primary
•	6.6 Precision Oncology and Genomics
•	6.7 Ethical and Legal Considerations in Oncology
________________________________________
Chapter 7: Clinical Trials and Evidence-based Oncology
•	7.1 Phases of Clinical Trials
•	7.2 Reading and Interpreting Trial Results
•	7.3 Guidelines and Pathways
•	7.4 Health Economics and Access to Care
________________________________________
Appendices
•	A. Common Oncology Abbreviations
•	B. Chemotherapy Dosing Calculations
•	C. ECOG and Karnofsky Performance Status Scales
•	D. WHO Classification of Tumors (Selected Tables)
•	E. Oncology Drug Reference Tables`;

export default function MedicalOncologyView() {
  const [, setLocation] = useLocation();
  const [selectedChapter, setSelectedChapter] = useState<SelectedChapter | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChapterSelect = (chapter: SelectedChapter) => {
    setSelectedChapter(chapter);
  };

  const handleBack = () => {
    setLocation("/handbook");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Handbooks
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Dna className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Medical Oncology Handbook
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Comprehensive guide to systemic cancer therapies and clinical management
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search medical oncology topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              7 Chapters
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Table of Contents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TOCGenerator 
                  indexText={medicalOncologyIndex}
                  onChapterSelect={handleChapterSelect}
                  searchTerm={searchTerm}
                  selectedChapter={selectedChapter}
                  specialty="medical"
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            {selectedChapter ? (
              <MarkdownViewer chapter={selectedChapter} specialty="medical" />
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Dna className="h-16 w-16 text-blue-300 dark:text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Select a Chapter
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a topic from the table of contents to begin reading
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}