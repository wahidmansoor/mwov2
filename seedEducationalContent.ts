/**
 * Educational Content Database Seeding - Real NCCN/ASCO/ESMO Data
 * Comprehensive oncology education content with authentic clinical guidelines
 */

import { storage } from './server/storage';
import type { 
  InsertEducationalTopic, 
  InsertClinicalScenario, 
  InsertQuestion 
} from './shared/schema';

async function seedEducationalContent() {
  console.log('🎓 Seeding Educational Content with Real Oncology Guidelines...');

  // NCCN-Based Educational Topics
  const topics: InsertEducationalTopic[] = [
    {
      title: "Breast Cancer Staging and Biomarker Testing",
      category: "Biomarkers",
      subspecialty: "Medical Oncology",
      organSite: "Breast",
      difficulty: "Fellow",
      guidelineReference: "NCCN Breast Cancer Guidelines V4.2025",
      learningObjectives: [
        "Apply AJCC 8th edition TNM staging criteria for breast cancer",
        "Interpret ER, PR, and HER2 testing results according to ASCO/CAP guidelines",
        "Evaluate Ki-67 expression and its clinical significance",
        "Assess multigene assays (Oncotype DX, MammaPrint) for treatment decisions"
      ],
      keyPoints: [
        "ER/PR positivity defined as ≥1% nuclear staining (ASCO/CAP 2020)",
        "HER2 amplification: IHC 3+ or ISH ratio ≥2.0 with HER2 copy number ≥4.0",
        "Ki-67 >20% suggests higher proliferation and potential chemotherapy benefit",
        "Stage I-III hormone receptor-positive disease requires multigene testing consideration"
      ],
      evidenceLevel: "Category 1"
    },
    {
      title: "Small Cell Lung Cancer Treatment Algorithms",
      category: "Treatment",
      subspecialty: "Medical Oncology",
      organSite: "Lung",
      difficulty: "Resident",
      guidelineReference: "NCCN Small Cell Lung Cancer Guidelines V4.2025",
      learningObjectives: [
        "Distinguish limited-stage from extensive-stage SCLC using NCCN criteria",
        "Select appropriate first-line chemotherapy regimens for SCLC",
        "Integrate immunotherapy (atezolizumab, durvalumab) into treatment plans",
        "Apply prophylactic cranial irradiation (PCI) recommendations"
      ],
      keyPoints: [
        "Limited-stage: disease confined to one hemithorax within a single radiation port",
        "Extensive-stage: disease beyond limited-stage definition",
        "First-line: Carboplatin/Etoposide + Atezolizumab (ES-SCLC, Category 1)",
        "Durvalumab maintenance after concurrent chemoradiation (LS-SCLC, Category 1)"
      ],
      evidenceLevel: "Category 1"
    },
    {
      title: "Colon Cancer Molecular Profiling and Targeted Therapy",
      category: "Biomarkers",
      subspecialty: "Medical Oncology",
      organSite: "Colon",
      difficulty: "Attending",
      guidelineReference: "NCCN Colon Cancer Guidelines V3.2025",
      learningObjectives: [
        "Interpret RAS (KRAS/NRAS) and BRAF mutation testing results",
        "Evaluate microsatellite instability (MSI) and mismatch repair (MMR) status",
        "Apply HER2 amplification testing in metastatic colorectal cancer",
        "Select appropriate targeted therapies based on molecular profile"
      ],
      keyPoints: [
        "All metastatic CRC requires RAS, BRAF, MSI/MMR, and HER2 testing",
        "RAS wild-type tumors eligible for anti-EGFR therapy (cetuximab, panitumumab)",
        "BRAF V600E mutations: poor prognosis, specific combination therapies",
        "MSI-H/dMMR tumors: pembrolizumab first-line (Category 1)"
      ],
      evidenceLevel: "Category 1"
    },
    {
      title: "Bone Cancer Diagnostic Workup and Staging",
      category: "Staging",
      subspecialty: "Orthopedic Oncology",
      organSite: "Bone",
      difficulty: "Fellow",
      guidelineReference: "NCCN Bone Cancer Guidelines V1.2025",
      learningObjectives: [
        "Apply age-based diagnostic algorithms for bone lesions",
        "Interpret imaging findings for primary bone tumors",
        "Evaluate cytogenetic testing requirements for sarcomas",
        "Coordinate multidisciplinary team evaluation"
      ],
      keyPoints: [
        "Age <40 years: immediate orthopedic oncology referral for bone lesions",
        "Age ≥40 years: metastatic workup priority before primary tumor consideration",
        "Osteosarcoma: alkaline phosphatase and LDH prognostic markers",
        "Ewing sarcoma: EWSR1 rearrangement confirmation required"
      ],
      evidenceLevel: "Category 1"
    },
    {
      title: "Radiation Therapy Planning and Dose Constraints",
      category: "Treatment",
      subspecialty: "Radiation Oncology",
      organSite: "Various",
      difficulty: "Resident",
      guidelineReference: "RTOG/QUANTEC Dose Constraints 2025",
      learningObjectives: [
        "Apply organ-at-risk (OAR) dose constraints in treatment planning",
        "Calculate biologically effective dose (BED) for hypofractionation",
        "Evaluate IMRT vs VMAT technique selection",
        "Implement image-guided radiation therapy (IGRT) protocols"
      ],
      keyPoints: [
        "Spinal cord: maximum dose 45-50 Gy in conventional fractionation",
        "Heart: mean dose <26 Gy to reduce cardiac mortality risk",
        "Lung: V20 <20% and mean lung dose <13 Gy for pneumonitis prevention",
        "BED calculation: Total dose × (1 + dose per fraction / α/β ratio)"
      ],
      evidenceLevel: "Category 1"
    }
  ];

  // Clinical Scenarios Based on Real Cases
  const scenarios: InsertClinicalScenario[] = [
    {
      title: "62-Year-Old Woman with ER+/HER2- Breast Cancer",
      description: "Post-menopausal woman with T2N1M0 invasive ductal carcinoma",
      patientPresentation: {
        age: 62,
        gender: "Female",
        stage: "T2N1M0",
        histology: "Invasive ductal carcinoma",
        receptors: "ER 95%, PR 85%, HER2 0, Ki-67 25%",
        comorbidities: ["Hypertension", "Type 2 diabetes"],
        performance_status: "ECOG 0"
      },
      decisionPoints: {
        question1: "What is the most appropriate next step for treatment planning?",
        options1: ["Start chemotherapy immediately", "Order Oncotype DX testing", "Begin hormone therapy", "Refer for radiation therapy"],
        question2: "If Oncotype DX recurrence score is 18, what is the recommended treatment?",
        options2: ["Hormone therapy alone", "Chemotherapy then hormone therapy", "Neoadjuvant chemotherapy", "Clinical trial"]
      },
      correctPathway: [
        "Order Oncotype DX multigene assay (NCCN Category 1)",
        "Intermediate recurrence score (11-25) warrants multidisciplinary discussion",
        "Consider patient preferences and comorbidities",
        "Adjuvant hormone therapy with aromatase inhibitor for 5-10 years"
      ],
      learningOutcomes: [
        "Appropriate use of multigene assays in hormone receptor-positive breast cancer",
        "Integration of patient factors in treatment decision-making",
        "Evidence-based hormone therapy duration recommendations"
      ],
      guidelineReference: "NCCN Breast Cancer Guidelines V4.2025",
      difficulty: "Fellow",
      estimatedTime: 15,
      tags: ["Breast Cancer", "Biomarkers", "Treatment Planning"]
    },
    {
      title: "58-Year-Old Male with Extensive-Stage Small Cell Lung Cancer",
      description: "Heavy smoker presenting with cough, weight loss, and multiple liver metastases",
      patientPresentation: {
        age: 58,
        gender: "Male",
        stage: "T3N2M1 (liver, adrenal)",
        histology: "Small cell lung cancer",
        smoking_history: "40 pack-years, current smoker",
        symptoms: ["Persistent cough", "15 lb weight loss", "Fatigue"],
        performance_status: "ECOG 1",
        labs: "Normal LDH, sodium 132 mEq/L"
      },
      decisionPoints: {
        question1: "What is the most appropriate first-line treatment regimen?",
        options1: ["Carboplatin/Etoposide alone", "Cisplatin/Etoposide + Atezolizumab", "Carboplatin/Etoposide + Atezolizumab", "Topotecan monotherapy"],
        question2: "How should hyponatremia be evaluated in this patient?",
        options2: ["Ignore if asymptomatic", "Check urine osmolality for SIADH", "Start immediate sodium replacement", "Delay treatment"]
      },
      correctPathway: [
        "Carboplatin/Etoposide + Atezolizumab first-line (NCCN Category 1)",
        "Evaluate and treat SIADH if present (common in SCLC)",
        "Continue atezolizumab maintenance after 4 cycles of chemotherapy",
        "Consider prophylactic cranial irradiation after response assessment"
      ],
      learningOutcomes: [
        "Evidence-based immunotherapy integration in extensive-stage SCLC",
        "Recognition and management of SCLC paraneoplastic syndromes",
        "Appropriate use of maintenance immunotherapy"
      ],
      guidelineReference: "NCCN Small Cell Lung Cancer Guidelines V4.2025",
      difficulty: "Resident",
      estimatedTime: 20,
      tags: ["Lung Cancer", "Immunotherapy", "Paraneoplastic Syndromes"]
    }
  ];

  // Question Bank with Real Clinical Scenarios
  const questions: InsertQuestion[] = [
    {
      questionType: "MCQ",
      questionText: "A 45-year-old woman with newly diagnosed invasive ductal carcinoma of the breast has the following pathology: T1c (1.8 cm), N0, M0, ER 90%, PR 80%, HER2 1+, Ki-67 15%. According to NCCN guidelines, what is the most appropriate next step?",
      options: {
        A: "Start adjuvant chemotherapy followed by hormone therapy",
        B: "Order Oncotype DX recurrence score testing",
        C: "Begin immediate hormone therapy with tamoxifen",
        D: "Refer for neoadjuvant chemotherapy"
      },
      correctAnswer: "B",
      rationale: "For hormone receptor-positive, HER2-negative, node-negative breast cancer (T1-3), NCCN guidelines recommend consideration of multigene assays like Oncotype DX to guide adjuvant treatment decisions. This is particularly important for T1c tumors where the benefit of chemotherapy may be marginal.",
      explanationDetail: "The Oncotype DX assay provides a recurrence score that helps predict the likelihood of distant recurrence and the potential benefit from adjuvant chemotherapy. Scores are categorized as low risk (<11), intermediate risk (11-25), and high risk (>25). This patient's profile (T1c, N0, hormone receptor-positive, HER2-negative, relatively low Ki-67) makes her an ideal candidate for multigene testing to avoid unnecessary chemotherapy toxicity.",
      guidelineReferences: ["NCCN Breast Cancer Guidelines V4.2025", "ASCO Clinical Practice Guideline on Adjuvant Chemotherapy 2019"],
      citations: ["Sparano JA, et al. N Engl J Med 2018;379:111-121", "Kalinsky K, et al. N Engl J Med 2021;385:896-907"],
      difficulty: "Fellow",
      examRelevance: ["MRCP", "ESMO"],
      tags: ["Breast Cancer", "Biomarkers", "Treatment Planning"]
    },
    {
      questionType: "EMQ",
      questionText: "For each clinical scenario, select the most appropriate first-line treatment regimen according to current NCCN guidelines:",
      options: {
        A: "Carboplatin/Etoposide",
        B: "Carboplatin/Etoposide + Atezolizumab",
        C: "Cisplatin/Etoposide + concurrent radiation",
        D: "Durvalumab maintenance",
        E: "Topotecan"
      },
      correctAnswer: "B",
      rationale: "For extensive-stage SCLC, the combination of carboplatin/etoposide plus atezolizumab is now the preferred first-line regimen based on the IMpower133 trial, which showed improved overall survival compared to chemotherapy alone.",
      explanationDetail: "The IMpower133 study demonstrated that adding atezolizumab to carboplatin/etoposide significantly improved overall survival (12.3 vs 10.3 months, HR 0.70) and progression-free survival in treatment-naive extensive-stage SCLC patients. This regimen is now NCCN Category 1 recommendation for extensive-stage disease.",
      guidelineReferences: ["NCCN Small Cell Lung Cancer Guidelines V4.2025"],
      citations: ["Horn L, et al. N Engl J Med 2018;379:2220-2229"],
      difficulty: "Resident",
      examRelevance: ["MRCP", "ESMO", "FRCR"],
      tags: ["Lung Cancer", "Immunotherapy", "First-line Treatment"]
    },
    {
      questionType: "Case",
      questionText: "A 35-year-old male presents with a 6-month history of knee pain and swelling. X-ray shows a destructive lesion in the distal femur with soft tissue extension. Biopsy confirms high-grade osteosarcoma. Staging workup shows no metastatic disease. According to NCCN guidelines, what is the most appropriate initial management approach?",
      options: {
        A: "Immediate amputation",
        B: "Neoadjuvant chemotherapy followed by limb-salvage surgery",
        C: "Radiation therapy to the primary site",
        D: "Palliative care consultation"
      },
      correctAnswer: "B",
      rationale: "For localized high-grade osteosarcoma, NCCN guidelines recommend neoadjuvant chemotherapy followed by surgical resection. This approach allows for assessment of chemotherapy response, potential tumor downsizing, and time for limb-salvage planning.",
      explanationDetail: "Standard neoadjuvant chemotherapy for osteosarcoma includes combinations such as doxorubicin/cisplatin, high-dose methotrexate, and ifosfamide. The degree of necrosis after neoadjuvant therapy (≥90% necrosis indicates good response) is a strong prognostic factor. Limb-salvage surgery is preferred when oncologically safe and functionally superior to amputation.",
      guidelineReferences: ["NCCN Bone Cancer Guidelines V1.2025"],
      citations: ["Bielack SS, et al. J Clin Oncol 2002;20:776-790", "Whelan JS, et al. Lancet Oncol 2015;16:152-162"],
      difficulty: "Fellow",
      examRelevance: ["MRCP", "ESMO"],
      tags: ["Bone Cancer", "Neoadjuvant Therapy", "Surgical Planning"]
    }
  ];

  try {
    // Seed educational topics
    console.log('📚 Creating educational topics...');
    for (const topic of topics) {
      await storage.createEducationalTopic(topic);
    }

    // Seed clinical scenarios
    console.log('🏥 Creating clinical scenarios...');
    for (const scenario of scenarios) {
      await storage.createClinicalScenario(scenario);
    }

    // Seed question bank
    console.log('❓ Creating question bank...');
    for (const question of questions) {
      await storage.createQuestion(question);
    }

    console.log('✅ Educational content seeding completed successfully!');
    console.log('📊 Seeded:');
    console.log(`  - ${topics.length} educational topics`);
    console.log(`  - ${scenarios.length} clinical scenarios`);
    console.log(`  - ${questions.length} questions`);

  } catch (error) {
    console.error('❌ Error seeding educational content:', error);
    throw error;
  }
}

// Run seeding function
seedEducationalContent()
  .then(() => {
    console.log('Educational Content Database Ready!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });

export { seedEducationalContent };