import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, FileText, Zap, Atom, Dna, Clock } from "lucide-react";
import { useLocation } from "wouter";
import TOCGenerator from "./components/TOCGenerator";
import MarkdownViewer from "./components/MarkdownViewer";

// Import radiation oncology components
import RadiationOncologyIntroduction from './content/radiation-chapter1/Introduction';
import HistoryEvolution from './content/radiation-chapter1/HistoryEvolution';
import BasicRadiationPhysics from './content/radiation-chapter1/BasicRadiationPhysics';
import RadiationBiology from './content/radiation-chapter1/RadiationBiology';

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

const radiationOncologyIndex = `Radiation Oncology Handbook – Index
________________________________________
Chapter 1: Fundamentals of Radiation Oncology
•       1.1 History and Evolution of Radiation Therapy
•       1.2 Basic Radiation Physics
o       1.2.1 Types of Radiation
o       1.2.2 Dose and Units (Gy, cGy, BED)
o       1.2.3 Interaction of Radiation with Matter
•       1.3 Radiation Biology
o       1.3.1 DNA Damage and Repair
o       1.3.2 Cell Cycle and Radiosensitivity
o       1.3.3 Four R's of Radiobiology
o       1.3.4 Linear-Quadratic Model
________________________________________
Chapter 2: Radiation Treatment Planning
•       2.1 Simulation and Immobilization
o       2.1.1 CT Simulation Techniques
o       2.1.2 Positioning Devices
•       2.2 Target Volume Delineation
o       2.2.1 GTV, CTV, PTV Concepts
o       2.2.2 Organs at Risk (OARs)
•       2.3 Dosimetry and Dose Constraints
o       2.3.1 Normal Tissue Tolerance
o       2.3.2 Constraints by Site (QUANTEC Guidelines)
•       2.4 Treatment Planning Systems
o       2.4.1 3D-CRT
o       2.4.2 IMRT and VMAT
o       2.4.3 SRS and SBRT Planning
________________________________________
Chapter 3: Radiation Modalities and Techniques
•       3.1 External Beam Radiation Therapy (EBRT)
o       3.1.1 Conventional and Conformal Techniques
o       3.1.2 Image-Guided Radiation Therapy (IGRT)
•       3.2 Brachytherapy
o       3.2.1 High-dose-rate (HDR) vs. Low-dose-rate (LDR)
o       3.2.2 Isotopes and Applications
•       3.3 Stereotactic Techniques
o       3.3.1 SRS (Intracranial)
o       3.3.2 SBRT (Extracranial)
•       3.4 Particle Therapy
o       3.4.1 Proton Therapy
o       3.4.2 Carbon Ion Therapy
________________________________________
Chapter 4: Clinical Radiation Oncology
•       4.1 Treatment Intent and Planning
o       4.1.1 Curative vs. Palliative Approaches
o       4.1.2 Hypofractionation and Hyperfractionation
•       4.2 Acute and Late Toxicities
o       4.2.1 Skin, Mucosa, GI, GU Toxicities
o       4.2.2 Radiation Necrosis and Fibrosis
•       4.3 Multidisciplinary Management
o       4.3.1 Integration with Surgery and Systemic Therapy
o       4.3.2 Timing and Sequencing
________________________________________
Chapter 5: Site-Specific Radiation Oncology
•       5.1 Central Nervous System
o       5.1.1 Gliomas and Brain Metastases
o       5.1.2 SRS for AVMs and Functional Disorders
•       5.2 Head and Neck Cancers
o       5.2.1 Oropharynx, Larynx, Nasopharynx
o       5.2.2 Salivary and Thyroid Glands
•       5.3 Thoracic Malignancies
o       5.3.1 NSCLC and SCLC
o       5.3.2 Esophageal Cancer
•       5.4 Breast Cancer
o       5.4.1 Whole Breast and Partial Breast Irradiation
o       5.4.2 Chest Wall and Regional Nodes
•       5.5 Gastrointestinal Cancers
o       5.5.1 Rectal, Anal, and Pancreatic Cancer
o       5.5.2 Liver and Biliary Tract Cancers
•       5.6 Genitourinary Cancers
o       5.6.1 Prostate Cancer: EBRT and Brachytherapy
o       5.6.2 Bladder and Testicular Cancer
•       5.7 Gynecologic Cancers
o       5.7.1 Cervix and Endometrial Cancer
o       5.7.2 Vaginal and Vulvar Cancer
•       5.8 Pediatric Tumors
o       5.8.1 Medulloblastoma and Ewing Sarcoma
o       5.8.2 Considerations for Growth and Development
•       5.9 Hematologic Malignancies
o       5.9.1 Lymphoma (Hodgkin and NHL)
o       5.9.2 Total Body Irradiation (TBI)
________________________________________
Chapter 6: Special Considerations in Radiation Oncology
•       6.1 Reirradiation
•       6.2 Radiation in the Pregnant Patient
•       6.3 Geriatric Considerations
•       6.4 Radioprotectors and Radiosensitizers
•       6.5 Oncologic Emergencies
o       6.5.1 Spinal Cord Compression
o       6.5.2 Superior Vena Cava Syndrome
o       6.5.3 Bleeding and Airway Obstruction
________________________________________
Chapter 7: Quality, Safety, and Professionalism
•       7.1 Radiation Safety and Shielding
•       7.2 Quality Assurance (QA) and Quality Control (QC)
•       7.3 Errors in Radiation Delivery and Reporting
•       7.4 Ethics in Radiation Oncology
•       7.5 Communication Skills and Shared Decision-Making
________________________________________
Chapter 8: Research, Trials, and Future Directions
•       8.1 Clinical Trial Design in Radiation Oncology
•       8.2 Radiogenomics and Personalized Therapy
•       8.3 Artificial Intelligence and Adaptive Radiotherapy
•       8.4 Imaging and Theranostics
•       8.5 Cost-effectiveness and Global Access
________________________________________
Appendices
•       A. Radiation Dose Conversion Tables
•       B. Common Dose Constraints by Organ (e.g., QUANTEC Summary)
•       C. RTOG/EORTC Toxicity Grading Scales
•       D. Radiation Oncology Abbreviations and Acronyms
•       E. Patient Education Templates`;

export default function RadiationOncologyView() {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Handbooks
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Zap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Radiation Oncology Handbook
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Fundamentals of radiation therapy, treatment planning, and clinical applications
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search radiation oncology topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
              8 Chapters
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
                  indexText={radiationOncologyIndex}
                  onChapterSelect={handleChapterSelect}
                  searchTerm={searchTerm}
                  selectedChapter={selectedChapter}
                  specialty="radiation"
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            {selectedChapter ? (
              <MarkdownViewer chapter={selectedChapter} specialty="radiation" />
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Zap className="h-16 w-16 text-orange-300 dark:text-orange-600 mx-auto mb-4" />
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