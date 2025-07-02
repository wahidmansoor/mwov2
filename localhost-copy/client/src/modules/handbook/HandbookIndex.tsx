import { useMemo } from "react";
import { ChevronRight, ChevronDown, Circle, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface HandbookEntry {
  id: string;
  title: string;
  level: number;
  parent?: string;
  children: HandbookEntry[];
}

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

interface HandbookIndexProps {
  onChapterSelect: (chapter: SelectedChapter) => void;
  searchTerm: string;
  selectedChapter: SelectedChapter | null;
}

// Parse the handbook index from the provided text
const parseHandbookIndex = (): HandbookEntry[] => {
  const handbookText = `Medical Oncology Handbook – Index
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
•	E. Oncology Drug Reference Tables
________________________________________

Radiation Oncology Handbook – Index
________________________________________
Chapter 1: Fundamentals of Radiation Oncology
•	1.1 History and Evolution of Radiation Therapy
•	1.2 Basic Radiation Physics
o	1.2.1 Types of Radiation
o	1.2.2 Dose and Units (Gy, cGy, BED)
o	1.2.3 Interaction of Radiation with Matter
•	1.3 Radiation Biology
o	1.3.1 DNA Damage and Repair
o	1.3.2 Cell Cycle and Radiosensitivity
o	1.3.3 Four R's of Radiobiology
o	1.3.4 Linear-Quadratic Model
________________________________________
Chapter 2: Radiation Treatment Planning
•	2.1 Simulation and Immobilization
o	2.1.1 CT Simulation Techniques
o	2.1.2 Positioning Devices
•	2.2 Target Volume Delineation
o	2.2.1 GTV, CTV, PTV Concepts
o	2.2.2 Organs at Risk (OARs)
•	2.3 Dosimetry and Dose Constraints
o	2.3.1 Normal Tissue Tolerance
o	2.3.2 Constraints by Site (QUANTEC Guidelines)
•	2.4 Treatment Planning Systems
o	2.4.1 3D-CRT
o	2.4.2 IMRT and VMAT
o	2.4.3 SRS and SBRT Planning
________________________________________
Chapter 3: Radiation Modalities and Techniques
•	3.1 External Beam Radiation Therapy (EBRT)
o	3.1.1 Conventional and Conformal Techniques
o	3.1.2 Image-Guided Radiation Therapy (IGRT)
•	3.2 Brachytherapy
o	3.2.1 High-dose-rate (HDR) vs. Low-dose-rate (LDR)
o	3.2.2 Isotopes and Applications
•	3.3 Stereotactic Techniques
o	3.3.1 SRS (Intracranial)
o	3.3.2 SBRT (Extracranial)
•	3.4 Particle Therapy
o	3.4.1 Proton Therapy
o	3.4.2 Carbon Ion Therapy
________________________________________
Chapter 4: Clinical Radiation Oncology
•	4.1 Treatment Intent and Planning
o	4.1.1 Curative vs. Palliative Approaches
o	4.1.2 Hypofractionation and Hyperfractionation
•	4.2 Acute and Late Toxicities
o	4.2.1 Skin, Mucosa, GI, GU Toxicities
o	4.2.2 Radiation Necrosis and Fibrosis
•	4.3 Multidisciplinary Management
o	4.3.1 Integration with Surgery and Systemic Therapy
o	4.3.2 Timing and Sequencing
________________________________________
Chapter 5: Site-Specific Radiation Oncology
•	5.1 Central Nervous System
o	5.1.1 Gliomas and Brain Metastases
o	5.1.2 SRS for AVMs and Functional Disorders
•	5.2 Head and Neck Cancers
o	5.2.1 Oropharynx, Larynx, Nasopharynx
o	5.2.2 Salivary and Thyroid Glands
•	5.3 Thoracic Malignancies
o	5.3.1 NSCLC and SCLC
o	5.3.2 Esophageal Cancer
•	5.4 Breast Cancer
o	5.4.1 Whole Breast and Partial Breast Irradiation
o	5.4.2 Chest Wall and Regional Nodes
•	5.5 Gastrointestinal Cancers
o	5.5.1 Rectal, Anal, and Pancreatic Cancer
o	5.5.2 Liver and Biliary Tract Cancers
•	5.6 Genitourinary Cancers
o	5.6.1 Prostate Cancer: EBRT and Brachytherapy
o	5.6.2 Bladder and Testicular Cancer
•	5.7 Gynecologic Cancers
o	5.7.1 Cervix and Endometrial Cancer
o	5.7.2 Vaginal and Vulvar Cancer
•	5.8 Pediatric Tumors
o	5.8.1 Medulloblastoma and Ewing Sarcoma
o	5.8.2 Considerations for Growth and Development
•	5.9 Hematologic Malignancies
o	5.9.1 Lymphoma (Hodgkin and NHL)
o	5.9.2 Total Body Irradiation (TBI)
________________________________________
Chapter 6: Special Considerations in Radiation Oncology
•	6.1 Reirradiation
•	6.2 Radiation in the Pregnant Patient
•	6.3 Geriatric Considerations
•	6.4 Radioprotectors and Radiosensitizers
•	6.5 Oncologic Emergencies
o	6.5.1 Spinal Cord Compression
o	6.5.2 Superior Vena Cava Syndrome
o	6.5.3 Bleeding and Airway Obstruction
________________________________________
Chapter 7: Quality, Safety, and Professionalism
•	7.1 Radiation Safety and Shielding
•	7.2 Quality Assurance (QA) and Quality Control (QC)
•	7.3 Errors in Radiation Delivery and Reporting
•	7.4 Ethics in Radiation Oncology
•	7.5 Communication Skills and Shared Decision-Making
________________________________________
Chapter 8: Research, Trials, and Future Directions
•	8.1 Clinical Trial Design in Radiation Oncology
•	8.2 Radiogenomics and Personalized Therapy
•	8.3 Artificial Intelligence and Adaptive Radiotherapy
•	8.4 Imaging and Theranostics
•	8.5 Cost-effectiveness and Global Access
________________________________________
Appendices
•	A. Radiation Dose Conversion Tables
•	B. Common Dose Constraints by Organ (e.g., QUANTEC Summary)
•	C. RTOG/EORTC Toxicity Grading Scales
•	D. Radiation Oncology Abbreviations and Acronyms
•	E. Patient Education Templates
________________________________________

Palliative Care Handbook – Index
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

  const entries: HandbookEntry[] = [];
  const lines = handbookText.split('\n');
  let currentSection = "";
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.includes('___') || trimmed.includes('–') || trimmed.includes('Index')) continue;
    
    // Detect chapters (start with "Chapter" or are major sections)
    if (trimmed.startsWith('Chapter') || trimmed.includes('Handbook')) {
      currentSection = trimmed.includes('Medical Oncology') ? 'medical' : 
                     trimmed.includes('Radiation Oncology') ? 'radiation' : 
                     trimmed.includes('Palliative Care') ? 'palliative' : currentSection;
      
      if (trimmed.startsWith('Chapter')) {
        entries.push({
          id: `${currentSection}-${trimmed.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          title: trimmed,
          level: 1,
          children: []
        });
      }
    }
    // Detect main sections (start with •)
    else if (trimmed.startsWith('•')) {
      const title = trimmed.substring(1).trim();
      entries.push({
        id: `${currentSection}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: title,
        level: 2,
        children: []
      });
    }
    // Detect subsections (start with o)
    else if (trimmed.startsWith('o')) {
      const title = trimmed.substring(1).trim();
      entries.push({
        id: `${currentSection}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: title,
        level: 3,
        children: []
      });
    }
  }
  
  return entries;
};

const TreeNode = ({ 
  entry, 
  onSelect, 
  selectedId, 
  searchTerm 
}: { 
  entry: HandbookEntry; 
  onSelect: (chapter: SelectedChapter) => void;
  selectedId?: string;
  searchTerm: string;
}) => {
  const isSelected = selectedId === entry.id;
  const matchesSearch = !searchTerm || 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase());

  if (!matchesSearch) return null;

  const getIcon = (level: number) => {
    switch (level) {
      case 1: return <Circle className="h-3 w-3" />;
      case 2: return <Dot className="h-3 w-3" />;
      case 3: return <div className="h-2 w-2 bg-gray-400 rounded-full" />;
      default: return <div className="h-1 w-1 bg-gray-300 rounded-full" />;
    }
  };

  const getIndentation = (level: number) => {
    return level * 16; // 16px per level
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-left h-auto py-2 px-2",
          "hover:bg-blue-50 dark:hover:bg-blue-900",
          isSelected && "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
        )}
        style={{ paddingLeft: `${getIndentation(entry.level)}px` }}
        onClick={() => onSelect({
          id: entry.id,
          title: entry.title,
          level: entry.level
        })}
      >
        <div className="flex items-center gap-2">
          {getIcon(entry.level)}
          <span className={cn(
            "text-sm",
            entry.level === 1 && "font-semibold",
            entry.level === 2 && "font-medium",
            entry.level >= 3 && "text-gray-600 dark:text-gray-400"
          )}>
            {entry.title}
          </span>
        </div>
      </Button>
    </div>
  );
};

export default function HandbookIndex({ 
  onChapterSelect, 
  searchTerm, 
  selectedChapter 
}: HandbookIndexProps) {
  const entries = useMemo(() => parseHandbookIndex(), []);

  const filteredEntries = useMemo(() => {
    if (!searchTerm) return entries;
    return entries.filter(entry => 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entries, searchTerm]);

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-1">
        {filteredEntries.map((entry) => (
          <TreeNode
            key={entry.id}
            entry={entry}
            onSelect={onChapterSelect}
            selectedId={selectedChapter?.id}
            searchTerm={searchTerm}
          />
        ))}
        {filteredEntries.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No topics found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}