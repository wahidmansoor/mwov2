import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, FileText, Heart } from "lucide-react";
import { useLocation } from "wouter";
import TOCGenerator from "./components/TOCGenerator";
import MarkdownViewer from "./components/MarkdownViewer";

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

const palliativeCareIndex = `Palliative Care Handbook – Index
________________________________________
Chapter 1: Foundations of Palliative Care
•	1.1 Definition and Scope
o	1.1.1 Principles of Palliative Care
o	1.1.2 Palliative vs. Hospice Care
•	1.2 History and Evolution
•	1.3 Models of Palliative Care Delivery
o	1.3.1 Primary vs. Specialty Palliative Care
o	1.3.2 Inpatient, Outpatient, and Home-Based Models
•	1.4 Ethics and Philosophy
o	1.4.1 Autonomy and Shared Decision-Making
o	1.4.2 Proportionality and Futility
________________________________________
Chapter 2: Symptom Management
•	2.1 Pain
o	2.1.1 Assessment and Types
o	2.1.2 WHO Analgesic Ladder
o	2.1.3 Opioids and Non-opioids
o	2.1.4 Neuropathic Pain and Adjuvants
•	2.2 Dyspnea
o	2.2.1 Non-pharmacologic Interventions
o	2.2.2 Opioids for Dyspnea
•	2.3 Nausea and Vomiting
o	2.3.1 Causes and Pathways
o	2.3.2 Antiemetics by Mechanism
•	2.4 Delirium and Agitation
o	2.4.1 Assessment Tools
o	2.4.2 Pharmacologic and Non-pharmacologic Management
•	2.5 Constipation and Bowel Care
•	2.6 Anorexia, Cachexia, and Fatigue
•	2.7 Depression, Anxiety, and Existential Distress
________________________________________
Chapter 3: Communication and Decision-Making
•	3.1 Goals of Care Conversations
•	3.2 Advance Care Planning
•	3.3 Delivering Serious News (SPIKES Protocol)
•	3.4 Cultural and Spiritual Considerations
•	3.5 Conflict Resolution and Family Dynamics
________________________________________
Chapter 4: End-of-Life Care
•	4.1 Recognizing the Dying Process
•	4.2 Symptom Control in the Final Days
•	4.3 Withdrawal of Life-Sustaining Treatment
•	4.4 Palliative Sedation
•	4.5 Care for the Dying in Different Settings
o	4.5.1 Hospital
o	4.5.2 Hospice
o	4.5.3 Home
•	4.6 Grief, Bereavement, and Family Support
________________________________________
Chapter 5: Disease-Specific Palliative Approaches
•	5.1 Cancer
o	5.1.1 Pain and Symptom Burden
o	5.1.2 Integration with Oncology
•	5.2 Heart Failure
•	5.3 Chronic Lung Disease (e.g., COPD, ILD)
•	5.4 Chronic Kidney Disease
o	5.4.1 With and Without Dialysis
•	5.5 Neurologic Disorders
o	5.5.1 Stroke, ALS, Parkinson's
o	5.5.2 Dementia
•	5.6 Liver Disease
•	5.7 Infectious Diseases (e.g., Advanced HIV/AIDS)
•	5.8 Geriatric Syndromes
o	5.8.1 Frailty and Multimorbidity
________________________________________
Chapter 6: Pediatric Palliative Care
•	6.1 Principles and Philosophy
•	6.2 Communication with Children and Families
•	6.3 Common Symptoms and Management
•	6.4 Genetic and Congenital Conditions
•	6.5 End-of-Life Issues in Children
________________________________________
Chapter 7: Ethical and Legal Issues
•	7.1 Informed Consent and Capacity
•	7.2 Advance Directives and POLST
•	7.3 Do-Not-Resuscitate (DNR) Orders
•	7.4 Medical Aid in Dying / Euthanasia (Jurisdiction-Dependent)
•	7.5 Resource Allocation and Justice
________________________________________
Chapter 8: Interdisciplinary Team and Systems of Care
•	8.1 Roles in the Palliative Care Team
o	8.1.1 Physicians, Nurses, Social Workers
o	8.1.2 Chaplains and Pharmacists
•	8.2 Team Communication and Coordination
•	8.3 Integrating Palliative Care into Other Specialties
•	8.4 Quality Improvement in Palliative Care
•	8.5 Burnout and Wellness in Palliative Care Providers
________________________________________
Chapter 9: Education, Research, and Global Palliative Care
•	9.1 Training in Palliative Medicine
•	9.2 Palliative Care Research and Evidence Base
•	9.3 Global Access and Humanitarian Settings
•	9.4 Technology and Telepalliative Care
________________________________________
Appendices
•	A. Common Drug Dosing in Palliative Care
•	B. Opioid Conversion and Equianalgesic Tables
•	C. Symptom Management Quick Reference Charts
•	D. Advance Directive and POLST Templates (Sample)
•	E. Communication Tools (e.g., SPIKES, NURSE statements)`;

export default function PalliativeCareView() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Handbooks
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Palliative Care Handbook
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Evidence-based approaches to symptom management and end-of-life care
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search palliative care topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              9 Chapters
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
                  indexText={palliativeCareIndex}
                  onChapterSelect={handleChapterSelect}
                  searchTerm={searchTerm}
                  selectedChapter={selectedChapter}
                  specialty="palliative"
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            {selectedChapter ? (
              <MarkdownViewer chapter={selectedChapter} specialty="palliative" />
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Heart className="h-16 w-16 text-green-300 dark:text-green-600 mx-auto mb-4" />
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