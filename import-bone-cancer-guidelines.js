import { db } from './server/db.ts';
import { 
  nccnGuidelines, 
  clinicalDecisionSupport, 
  biomarkerGuidelines 
} from './shared/schema.ts';

/**
 * NCCN Bone Cancer Guidelines v1.2025 Integration
 * Comprehensive data extraction and database population for all bone cancer types
 */

async function importBoneCancerGuidelines() {
  console.log('Starting NCCN Bone Cancer v1.2025 guidelines import...');

  try {
    // Core Bone Cancer Guidelines Data - Comprehensive Coverage
    const boneCancerGuidelinesData = [
      {
        referenceCode: 'BONE-1',
        title: 'Bone Cancer Workup and Diagnosis',
        category: 'Diagnosis',
        cancerType: 'Bone Cancer',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          workupProtocol: {
            ageUnder40: {
              approach: 'Refer to orthopedic oncologist',
              biopsy: 'Should be performed at treating institution',
              indication: 'Symptomatic bone lesion with abnormal x-ray'
            },
            age40AndOver: {
              approach: 'Workup for potential bone metastasis',
              evaluation: [
                'History and physical examination',
                'Bone scan or FDG-PET/CT (category 2B)',
                'Chest x-ray',
                'Serum protein electrophoresis (SPEP)',
                'Chest/abdomen/pelvis CT with contrast',
                'PSA (males)',
                'Mammogram (females)'
              ],
              labs: 'CBC, CMP with calcium to assess hypercalcemia'
            }
          },
          multidisciplinaryTeam: {
            coreGroup: [
              'Orthopedic oncologist',
              'Bone pathologist',
              'Medical/pediatric oncologist',
              'Radiation oncologist',
              'Musculoskeletal radiologist'
            ],
            specialistsCritical: [
              'Thoracic surgeon',
              'Plastic surgeon',
              'Interventional radiologist',
              'Physiatrist',
              'Vascular/general surgeon',
              'Neurosurgeon/orthopedic spine surgeon',
              'Palliative care physician'
            ]
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All stages'],
        treatmentSettings: ['Initial Workup', 'Diagnostic'],
        clinicalDecisionPoints: ['Age-based approach', 'Biopsy timing', 'Metastasis workup'],
        monitoringRequirements: ['Imaging follow-up', 'Laboratory monitoring'],
        alternativeApproaches: ['FDG-PET/CT as alternative to bone scan']
      },
      {
        referenceCode: 'OSTEO-1',
        title: 'Osteosarcoma Workup and Primary Treatment',
        category: 'Treatment',
        cancerType: 'Osteosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          workupRequirements: [
            'Complete history and physical examination',
            'Plain radiographs of primary site',
            'Chest CT (with or without contrast)',
            'MRI of primary site',
            'Bone scan or FDG-PET/CT',
            'Complete blood count and chemistry panel',
            'Alkaline phosphatase and LDH',
            'Fertility consultation should be considered'
          ],
          primaryTreatment: {
            neoadjuvantChemotherapy: 'Standard approach for resectable disease',
            surgicalResection: 'Wide excision with negative margins',
            adjuvantChemotherapy: 'Based on histologic response to neoadjuvant therapy'
          },
          fertilityConsiderations: 'Fertility consultation should be offered to appropriate patients'
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Localized', 'Resectable'],
        biomarkerRequirements: ['Alkaline phosphatase', 'LDH'],
        treatmentSettings: ['Neoadjuvant', 'Adjuvant', 'Surgical'],
        clinicalDecisionPoints: ['Resectability assessment', 'Chemotherapy selection', 'Fertility preservation'],
        monitoringRequirements: ['Response assessment', 'Toxicity monitoring'],
        updatesFromPrevious: 'Fertility consultation language updated from "should be offered" to "should be considered"'
      },
      {
        referenceCode: 'OSTEO-2',
        title: 'Osteosarcoma Neoadjuvant and Adjuvant Treatment',
        category: 'Treatment',
        cancerType: 'Osteosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          neoadjuvantProtocols: [
            'Doxorubicin and cisplatin',
            'MAP (methotrexate, doxorubicin, cisplatin)',
            'High-dose methotrexate-based regimens'
          ],
          adjuvantTreatment: {
            goodResponse: '>90% necrosis - continue same regimen',
            poorResponse: '<90% necrosis - consider alternative regimens',
            duration: 'Typically 6 months total treatment'
          },
          surgicalConsiderations: {
            terminology: 'Resection (previously excision)',
            margins: 'Wide excision with negative margins required',
            timing: 'After 2-3 cycles of neoadjuvant therapy'
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Localized', 'Resectable'],
        treatmentSettings: ['Neoadjuvant', 'Adjuvant'],
        clinicalDecisionPoints: ['Response assessment', 'Surgical timing', 'Adjuvant selection'],
        monitoringRequirements: ['Histologic response evaluation', 'Toxicity assessment'],
        updatesFromPrevious: 'Terminology revised from "excision" to "resection"'
      },
      {
        referenceCode: 'OSTEO-3',
        title: 'Metastatic Osteosarcoma',
        category: 'Treatment',
        cancerType: 'Osteosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          firstLineTherapy: [
            'MAP (methotrexate, doxorubicin, cisplatin)',
            'Doxorubicin and cisplatin',
            'High-dose methotrexate-based regimens'
          ],
          secondLineTherapy: [
            'Docetaxel and gemcitabine',
            'Gemcitabine ± docetaxel',
            'Ifosfamide-based regimens',
            'Clinical trials preferred'
          ],
          surgicalManagement: {
            primarySite: 'Consider resection if feasible',
            metastases: 'Pulmonary metastasectomy if completely resectable',
            criteria: 'Limited number of metastases, adequate pulmonary reserve'
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Metastatic'],
        treatmentSettings: ['First-Line', 'Second-Line', 'Surgical'],
        clinicalDecisionPoints: ['Resectability assessment', 'Therapy selection', 'Surgery timing'],
        monitoringRequirements: ['Disease progression', 'Pulmonary function'],
        alternativeApproaches: ['Clinical trial participation strongly encouraged']
      },
      {
        referenceCode: 'OSTEO-4',
        title: 'Osteosarcoma Surveillance and Relapse',
        category: 'Surveillance',
        cancerType: 'Osteosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          surveillanceProtocol: [
            'Chest imaging every 2-3 months for 2 years',
            'Then every 3-6 months for years 3-5',
            'Annual imaging thereafter',
            'Primary site imaging as clinically indicated'
          ],
          relapseManagement: {
            localRecurrence: 'Surgical resection if feasible',
            pulmonaryMetastases: 'Metastasectomy if completely resectable',
            systemicTherapy: 'Second-line chemotherapy regimens'
          },
          palliativeTreatment: {
            radiationTherapy: 'Palliative RT for symptomatic lesions',
            supportiveCare: 'Multidisciplinary palliative approach'
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Post-treatment'],
        treatmentSettings: ['Surveillance', 'Relapse Management'],
        clinicalDecisionPoints: ['Imaging frequency', 'Resectability assessment', 'Palliative options'],
        monitoringRequirements: ['Regular chest imaging', 'Clinical assessment'],
        updatesFromPrevious: 'Palliative RT treatment option modified'
      },
      {
        referenceCode: 'EW-1',
        title: 'Ewing Sarcoma Workup and Primary Treatment',
        category: 'Treatment',
        cancerType: 'Ewing Sarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          workupProtocol: [
            'Complete history and physical examination',
            'Plain radiographs of primary site',
            'MRI of primary site',
            'FDG-PET/CT (preferred) head-to-toe and/or bone scan',
            'Chest CT with contrast',
            'Complete blood count and chemistry panel',
            'LDH'
          ],
          cytogeneticTesting: {
            standard: '90% have one of four specific translocations',
            ewingLike: 'CIC::DUX4, BCOR::CCNB3 can be treated as Ewing sarcoma',
            molecularTesting: 'Additional testing recommended if negative'
          },
          primaryTreatment: {
            chemotherapy: 'Multi-agent systemic therapy',
            localTherapy: 'Surgery and/or radiation therapy',
            approach: 'Multidisciplinary planning essential'
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Localized', 'Metastatic'],
        biomarkerRequirements: ['Cytogenetic analysis', 'LDH'],
        treatmentSettings: ['Systemic Therapy', 'Local Therapy'],
        clinicalDecisionPoints: ['Cytogenetic confirmation', 'Local therapy selection', 'Treatment sequence'],
        monitoringRequirements: ['Response assessment', 'Toxicity monitoring'],
        updatesFromPrevious: 'FDG-PET/CT now preferred, molecular testing guidance updated'
      },
      {
        referenceCode: 'EW-2',
        title: 'Ewing Sarcoma Additional Treatment and Surveillance',
        category: 'Treatment',
        cancerType: 'Ewing Sarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          additionalTreatment: {
            consolidation: 'Complete planned chemotherapy regimen',
            localTherapy: 'Surgery and/or radiation based on response',
            duration: 'Typically 12-15 cycles over 6-9 months'
          },
          surveillanceProtocol: [
            'History and physical every 2-3 months for 2 years',
            'Chest imaging (x-ray or CT) every 2-3 months',
            'Primary site imaging every 3-6 months',
            'Then less frequent as appropriate'
          ],
          relapseManagement: {
            approach: 'Clinical trials preferred',
            systemicTherapy: 'Second-line chemotherapy regimens',
            localTherapy: 'Surgery and/or radiation if feasible'
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Post-primary treatment'],
        treatmentSettings: ['Consolidation', 'Surveillance', 'Relapse'],
        clinicalDecisionPoints: ['Treatment completion', 'Surveillance intensity', 'Relapse approach'],
        monitoringRequirements: ['Regular imaging', 'Clinical assessment'],
        updatesFromPrevious: 'Chest imaging frequency modified to every 2-3 months'
      },
      {
        referenceCode: 'EW-3',
        title: 'Metastatic Ewing Sarcoma',
        category: 'Treatment',
        cancerType: 'Ewing Sarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          treatmentApproach: {
            systemicTherapy: 'Intensive multi-agent chemotherapy',
            localTherapy: 'Consider for primary and metastatic sites',
            consolidation: 'High-dose therapy with stem cell rescue in select cases'
          },
          lungMetastases: {
            wholelung: '± whole lung irradiation (WLI)',
            criteria: 'Partial response to systemic therapy',
            dosing: 'Per radiation therapy guidelines'
          },
          prognosticFactors: [
            'Number of metastatic sites',
            'Bone vs soft tissue primary',
            'Age at diagnosis',
            'Tumor volume'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Metastatic'],
        treatmentSettings: ['Intensive Therapy', 'Consolidation'],
        clinicalDecisionPoints: ['Treatment intensity', 'Local therapy inclusion', 'WLI consideration'],
        monitoringRequirements: ['Response assessment', 'Toxicity management'],
        updatesFromPrevious: 'WLI changed from mandatory (+) to optional (±)'
      },
      {
        referenceCode: 'CHON-1',
        title: 'Chondrosarcoma Presentation and Classification',
        category: 'Diagnosis',
        cancerType: 'Chondrosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          subtypes: {
            atypical: 'Atypical cartilaginous tumors',
            lowGrade: 'Low-grade extracompartmental appendicular or Grade I axial',
            highGrade: 'Grade II, Grade III',
            clearCell: 'Clear cell chondrosarcoma',
            dedifferentiated: 'Link to CHON-3 added',
            mesenchymal: 'Links to CHON-3 and CHON-4 added'
          },
          gradingConsiderations: 'Histology, radiologic features, size, and location influence treatment',
          referralPathways: {
            atypical: 'CHON-2',
            lowGradeAndHighGrade: 'CHON-3',
            metastatic: 'CHON-4',
            dedifferentiated: 'CHON-3 and CHON-4',
            mesenchymal: 'CHON-3 and CHON-4'
          }
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All presentations'],
        treatmentSettings: ['Diagnostic'],
        clinicalDecisionPoints: ['Subtype classification', 'Grade determination', 'Treatment pathway'],
        updatesFromPrevious: 'Added links for dedifferentiated and mesenchymal subtypes'
      },
      {
        referenceCode: 'CHON-2',
        title: 'Atypical Cartilaginous Tumors Primary Treatment',
        category: 'Treatment',
        cancerType: 'Chondrosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          treatmentApproach: {
            primary: 'Surgical resection with wide margins',
            adjuvant: 'Generally not indicated for atypical cartilaginous tumors',
            surveillance: 'Regular imaging follow-up'
          },
          surgicalPrinciples: [
            'Complete excision with negative margins',
            'Avoid contamination during surgery',
            'Consider reconstruction if needed'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Atypical cartilaginous tumors'],
        treatmentSettings: ['Surgical'],
        clinicalDecisionPoints: ['Surgical approach', 'Margin assessment', 'Reconstruction needs']
      },
      {
        referenceCode: 'CHON-3',
        title: 'Chondrosarcoma High-Grade and Complex Cases',
        category: 'Treatment',
        cancerType: 'Chondrosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          treatmentOptions: {
            surgical: 'Wide resection with negative margins',
            adjuvant: 'Consider based on grade and margins',
            systemic: 'Limited role except in specific subtypes'
          },
          specialConsiderations: {
            dedifferentiated: 'May consider treating as osteosarcoma (category 2B)',
            mesenchymal: 'Refer to EW-1 for Ewing-like treatment'
          },
          imagingUpdates: 'Chest CT can be with or without contrast, low-dose non-contrast for restaging'
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['High-grade', 'Complex subtypes'],
        treatmentSettings: ['Surgical', 'Adjuvant'],
        clinicalDecisionPoints: ['Subtype-specific treatment', 'Surgical approach', 'Adjuvant consideration'],
        updatesFromPrevious: 'Terminology revised to "resection", pathways added for dedifferentiated and mesenchymal'
      },
      {
        referenceCode: 'CHON-4',
        title: 'Metastatic Chondrosarcoma',
        category: 'Treatment',
        cancerType: 'Chondrosarcoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          treatmentApproach: {
            surgical: 'Resection of primary and metastases if feasible',
            systemic: 'Limited effectiveness in conventional chondrosarcoma',
            palliative: 'Symptom management and supportive care'
          },
          prognosticFactors: [
            'Grade of primary tumor',
            'Number and location of metastases',
            'Patient performance status',
            'Resectability of disease'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Metastatic'],
        treatmentSettings: ['Surgical', 'Palliative'],
        clinicalDecisionPoints: ['Resectability assessment', 'Systemic therapy consideration', 'Palliative care timing']
      },
      {
        referenceCode: 'CHOR-1',
        title: 'Chordoma Workup and Histologic Subtype',
        category: 'Diagnosis',
        cancerType: 'Chordoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          workupProtocol: [
            'Complete history and physical examination',
            'MRI of primary site with gadolinium',
            'CT chest for staging',
            'Additional imaging based on location'
          ],
          histologicSubtypes: [
            'Classical chordoma',
            'Chondroid chordoma',
            'Dedifferentiated chordoma'
          ],
          anatomicSites: [
            'Skull base/clival',
            'Mobile spine',
            'Sacrococcygeal'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All presentations'],
        treatmentSettings: ['Diagnostic'],
        clinicalDecisionPoints: ['Subtype determination', 'Anatomic assessment', 'Staging completion']
      },
      {
        referenceCode: 'CHOR-2',
        title: 'Chordoma Primary and Adjuvant Treatment',
        category: 'Treatment',
        cancerType: 'Chordoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          treatmentByLocation: {
            sacrococcygeal: {
              resectable: 'Surgical resection ± adjuvant RT',
              unresectable: 'Consider definitive RT'
            },
            mobileSpine: {
              resectable: 'Surgical resection ± adjuvant RT',
              unresectable: 'Consider definitive RT'
            },
            skullBase: {
              resectable: 'Surgical resection ± adjuvant RT',
              unresectable: 'Consider definitive RT',
              preoperative: 'Consider preoperative RT if positive margins likely'
            }
          },
          adjuvantConsiderations: 'Consider adjuvant RT for positive margins or large extracompartmental tumors'
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Localized'],
        treatmentSettings: ['Surgical', 'Radiation Therapy'],
        clinicalDecisionPoints: ['Resectability assessment', 'RT indication', 'Preoperative RT consideration'],
        updatesFromPrevious: 'RT treatment options modified for all anatomic sites'
      },
      {
        referenceCode: 'CHOR-3',
        title: 'Chordoma Surveillance, Recurrence, and Treatment',
        category: 'Treatment',
        cancerType: 'Chordoma',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          surveillanceProtocol: [
            'Regular MRI of primary site',
            'Chest imaging for metastases',
            'Clinical assessment'
          ],
          recurrenceManagement: {
            local: 'Surgical resection and/or RT and/or ablation and/or systemic therapy or clinical trial',
            metastatic: 'Systemic therapy and/or surgical resection and/or RT or clinical trial and/or best supportive care'
          },
          imagingUpdates: 'Low-dose, non-contrast CT recommended for restaging'
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Post-treatment', 'Recurrent'],
        treatmentSettings: ['Surveillance', 'Recurrence Management'],
        clinicalDecisionPoints: ['Recurrence detection', 'Treatment modality selection', 'Supportive care timing'],
        updatesFromPrevious: 'Treatment options modified for both local and metastatic recurrence'
      },
      {
        referenceCode: 'GCTB-1',
        title: 'Giant Cell Tumor of Bone Workup and Presentation',
        category: 'Diagnosis',
        cancerType: 'Giant Cell Tumor of Bone',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          workupProtocol: [
            'Complete history and physical examination',
            'Plain radiographs',
            'MRI of primary site',
            'Chest imaging',
            'Laboratory studies as indicated'
          ],
          clinicalPresentation: [
            'Pain and swelling',
            'Limited range of motion',
            'Pathologic fracture (uncommon)',
            'Typically involves epiphysis/metaphysis'
          ],
          differentialDiagnosis: [
            'Osteosarcoma',
            'Aneurysmal bone cyst',
            'Brown tumor of hyperparathyroidism'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All presentations'],
        treatmentSettings: ['Diagnostic'],
        clinicalDecisionPoints: ['Differential diagnosis', 'Staging completion', 'Treatment planning']
      },
      {
        referenceCode: 'GCTB-2',
        title: 'Giant Cell Tumor of Bone Primary Treatment',
        category: 'Treatment',
        cancerType: 'Giant Cell Tumor of Bone',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          treatmentOptions: {
            resectable: 'Surgical resection with wide margins',
            unresectable: 'Denosumab (preferred)',
            adjuvant: 'Consider denosumab for high-risk cases'
          },
          metastaticDisease: {
            unresectable: 'Denosumab (preferred)',
            monitoring: 'Regular imaging and clinical assessment'
          },
          surgicalConsiderations: [
            'En bloc resection when possible',
            'Avoid contamination',
            'Consider reconstruction needs'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Localized', 'Metastatic'],
        treatmentSettings: ['Surgical', 'Systemic'],
        clinicalDecisionPoints: ['Resectability assessment', 'Denosumab indication', 'Surgical approach'],
        updatesFromPrevious: 'Denosumab recommendation modified to "preferred" for unresectable metastatic disease'
      },
      {
        referenceCode: 'GCTB-3',
        title: 'Giant Cell Tumor of Bone Surveillance and Recurrence',
        category: 'Surveillance',
        cancerType: 'Giant Cell Tumor of Bone',
        version: 'v1.2025',
        releaseDate: '2024-08-20',
        content: {
          surveillanceProtocol: [
            'Regular imaging of primary site',
            'Chest imaging for pulmonary metastases',
            'Clinical assessment'
          ],
          recurrenceManagement: {
            local: 'Surgical resection if feasible',
            metastatic: 'Denosumab preferred',
            monitoring: 'Long-term follow-up required'
          },
          specialConsiderations: [
            'Pulmonary metastases can occur',
            'Generally indolent behavior',
            'Long-term surveillance needed'
          ]
        },
        evidenceLevel: 'Category 2A',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['Post-treatment'],
        treatmentSettings: ['Surveillance', 'Recurrence Management'],
        clinicalDecisionPoints: ['Surveillance intensity', 'Recurrence treatment', 'Long-term monitoring'],
        updatesFromPrevious: 'Terminology revised from "excision" to "resection"'
      }
    ];

    // Insert NCCN Guidelines
    console.log('Inserting NCCN Bone Cancer guidelines...');
    for (const guideline of boneCancerGuidelinesData) {
      await db.insert(nccnGuidelines).values(guideline).onConflictDoNothing();
    }

    // Clinical Decision Support Entries
    const decisionSupportData = createBoneCancerDecisionSupport();
    console.log('Inserting clinical decision support entries...');
    for (const support of decisionSupportData) {
      await db.insert(clinicalDecisionSupport).values(support).onConflictDoNothing();
    }

    // Biomarker Guidelines
    const biomarkerData = createBoneCancerBiomarkers();
    console.log('Inserting biomarker guidelines...');
    for (const biomarker of biomarkerData) {
      await db.insert(biomarkerGuidelines).values(biomarker).onConflictDoNothing();
    }

    console.log('✅ NCCN Bone Cancer v1.2025 guidelines import completed successfully!');
    console.log(`📊 Imported: ${boneCancerGuidelinesData.length} guidelines, ${decisionSupportData.length} decision support entries, ${biomarkerData.length} biomarker guidelines`);

  } catch (error) {
    console.error('❌ Error importing NCCN Bone Cancer guidelines:', error);
    throw error;
  }
}

function createBoneCancerDecisionSupport() {
  return [
    {
      moduleType: 'OPD',
      clinicalScenario: 'Bone Cancer Workup and Age-Based Evaluation',
      inputParameters: {
        age: 'Variable',
        presentation: 'Symptomatic bone lesion',
        imaging: 'Abnormal x-ray'
      },
      recommendedActions: [
        'Age <40: Refer to orthopedic oncologist immediately',
        'Age ≥40: Workup for bone metastasis first',
        'Multidisciplinary team evaluation',
        'Biopsy at treating institution only',
        'Complete staging workup per NCCN guidelines'
      ],
      evidenceStrength: 'Category 2A',
      confidenceScore: 0.95,
      nccnReferences: ['BONE-1'],
      lastUpdated: '2024-08-20'
    },
    {
      moduleType: 'CDU',
      clinicalScenario: 'Osteosarcoma Treatment Protocols',
      inputParameters: {
        stage: 'Localized',
        resectability: 'Resectable',
        age: 'Pediatric/Young Adult'
      },
      recommendedActions: [
        'Neoadjuvant chemotherapy (MAP or doxorubicin/cisplatin)',
        'Surgical resection with wide margins',
        'Histologic response assessment',
        'Adjuvant chemotherapy based on response',
        'Fertility consultation consideration'
      ],
      evidenceStrength: 'Category 2A',
      confidenceScore: 0.92,
      nccnReferences: ['OSTEO-1', 'OSTEO-2'],
      lastUpdated: '2024-08-20'
    },
    {
      moduleType: 'CDU',
      clinicalScenario: 'Ewing Sarcoma Systemic Therapy',
      inputParameters: {
        stage: 'Localized or Metastatic',
        cytogenetics: 'EWSR1 rearrangement confirmed',
        age: 'Pediatric/Young Adult'
      },
      recommendedActions: [
        'Multi-agent chemotherapy (VDC/IE or similar)',
        'Local therapy (surgery and/or radiation)',
        'FDG-PET/CT for staging and response',
        'Consider clinical trial participation',
        'Cytogenetic confirmation essential'
      ],
      evidenceStrength: 'Category 2A',
      confidenceScore: 0.90,
      nccnReferences: ['EW-1', 'EW-2'],
      lastUpdated: '2024-08-20'
    },
    {
      moduleType: 'Inpatient',
      clinicalScenario: 'Bone Cancer Postoperative Management',
      inputParameters: {
        surgery: 'Wide resection completed',
        margins: 'Negative',
        complications: 'Standard postoperative care'
      },
      recommendedActions: [
        'Assess surgical margins and histologic response',
        'Plan adjuvant therapy based on tumor type',
        'Monitor for surgical complications',
        'Physical therapy and rehabilitation',
        'Discharge planning with oncology follow-up'
      ],
      evidenceStrength: 'Category 2A',
      confidenceScore: 0.88,
      nccnReferences: ['OSTEO-2', 'BONE-A'],
      lastUpdated: '2024-08-20'
    },
    {
      moduleType: 'Palliative',
      clinicalScenario: 'Metastatic Bone Cancer Symptom Management',
      inputParameters: {
        stage: 'Metastatic',
        symptoms: 'Pain, functional limitation',
        performance: 'Declining'
      },
      recommendedActions: [
        'Palliative radiation therapy for pain control',
        'Multidisciplinary palliative care consultation',
        'Pain management optimization',
        'Functional assessment and support',
        'Psychosocial support for patient and family'
      ],
      evidenceStrength: 'Category 2A',
      confidenceScore: 0.85,
      nccnReferences: ['OSTEO-4', 'CHON-4'],
      lastUpdated: '2024-08-20'
    },
    {
      moduleType: 'Clinical Tools',
      clinicalScenario: 'Bone Cancer Risk Assessment and Staging',
      inputParameters: {
        tumorType: 'Variable',
        location: 'Variable',
        size: 'Variable'
      },
      recommendedActions: [
        'Complete staging workup per tumor type',
        'Multidisciplinary team evaluation',
        'Risk stratification based on histology',
        'Treatment planning optimization',
        'Prognostic factor assessment'
      ],
      evidenceStrength: 'Category 2A',
      confidenceScore: 0.93,
      nccnReferences: ['BONE-1', 'TEAM-1'],
      lastUpdated: '2024-08-20'
    }
  ];
}

function createBoneCancerBiomarkers() {
  return [
    {
      biomarkerName: 'Alkaline Phosphatase',
      cancerType: 'Osteosarcoma',
      testingMethod: 'Serum chemistry',
      clinicalIndications: ['Baseline assessment', 'Response monitoring', 'Surveillance'],
      interpretationCriteria: 'Elevated levels may indicate disease activity or progression',
      treatmentImplications: 'Prognostic factor for survival outcomes',
      evidenceLevel: 'Category 2A',
      nccnReferences: ['OSTEO-1'],
      lastUpdated: '2024-08-20'
    },
    {
      biomarkerName: 'LDH (Lactate Dehydrogenase)',
      cancerType: 'Osteosarcoma',
      testingMethod: 'Serum chemistry',
      clinicalIndications: ['Baseline assessment', 'Prognostic evaluation', 'Response monitoring'],
      interpretationCriteria: 'Elevated LDH associated with worse prognosis',
      treatmentImplications: 'Important prognostic factor for treatment planning',
      evidenceLevel: 'Category 2A',
      nccnReferences: ['OSTEO-1'],
      lastUpdated: '2024-08-20'
    },
    {
      biomarkerName: 'EWSR1 Rearrangement',
      cancerType: 'Ewing Sarcoma',
      testingMethod: 'Cytogenetics, FISH, RT-PCR',
      clinicalIndications: ['Diagnostic confirmation', 'Treatment selection'],
      interpretationCriteria: '90% have one of four specific translocations (EWSR1-FLI1, EWSR1-ERG)',
      treatmentImplications: 'Essential for diagnosis and treatment as Ewing sarcoma',
      evidenceLevel: 'Category 2A',
      nccnReferences: ['EW-1'],
      lastUpdated: '2024-08-20'
    },
    {
      biomarkerName: 'CIC-DUX4 Fusion',
      cancerType: 'Ewing-like Sarcoma',
      testingMethod: 'Molecular testing, RT-PCR',
      clinicalIndications: ['Differential diagnosis', 'Treatment selection'],
      interpretationCriteria: 'Ewing-like sarcoma that can be treated with Ewing protocols',
      treatmentImplications: 'May be treated as Ewing sarcoma per NCCN guidelines',
      evidenceLevel: 'Category 2A',
      nccnReferences: ['EW-1'],
      lastUpdated: '2024-08-20'
    },
    {
      biomarkerName: 'BCOR-CCNB3 Fusion',
      cancerType: 'Ewing-like Sarcoma',
      testingMethod: 'Molecular testing, RT-PCR',
      clinicalIndications: ['Differential diagnosis', 'Treatment selection'],
      interpretationCriteria: 'Round cell sarcoma with Ewing-like features',
      treatmentImplications: 'Alternative treatment paradigm treating as Ewing sarcoma can be considered',
      evidenceLevel: 'Category 2A',
      nccnReferences: ['EW-1'],
      lastUpdated: '2024-08-20'
    }
  ];
}

// Execute import if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importBoneCancerGuidelines()
    .then(() => {
      console.log('Import completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Import failed:', error);
      process.exit(1);
    });
}

export { importBoneCancerGuidelines };