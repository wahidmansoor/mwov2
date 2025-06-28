import fs from 'fs';
import { db } from './server/db.ts';
import { nccnGuidelines, clinicalDecisionSupport, biomarkerGuidelines } from './shared/schema.ts';

async function importNCCNGuidelines() {
  console.log('🔄 Starting NCCN Guidelines comprehensive data import...');
  
  try {
    // Read the comprehensive NCCN data file
    const rawData = fs.readFileSync('./attached_assets/replit_distributed_med_data_1751130082383.json', 'utf8');
    const nccnData = JSON.parse(rawData);
    
    console.log(`📊 Processing ${nccnData.oncology_medications.length} NCCN data entries...`);
    
    let guidelinesCount = 0;
    let decisionSupportCount = 0;
    let biomarkerCount = 0;
    
    // Process NCCN guideline entries
    for (const entry of nccnData.oncology_medications) {
      const { name, summary } = entry;
      
      // Skip empty or header entries
      if (!name || !summary || summary.length < 10) continue;
      
      // Extract NCCN reference codes (BINV-, DCIS-, etc.)
      const nccnRefMatch = name.match(/^(BINV|DCIS|PHYLL|PAGET|IBC|PREG|ST|ABBR)-?([A-Z0-9\s]*)/);
      
      if (nccnRefMatch) {
        const referenceCode = nccnRefMatch[0];
        const category = determineCategory(referenceCode);
        
        // Insert comprehensive NCCN guideline
        await db.insert(nccnGuidelines).values({
          referenceCode: referenceCode,
          title: name,
          category: category,
          cancerType: 'breast',
          version: '4.2025',
          releaseDate: '2025-04-17',
          content: {
            fullText: summary,
            keyPoints: extractKeyPoints(summary),
            updates: extractUpdates(summary),
            footnotes: extractFootnotes(summary)
          },
          evidenceLevel: extractEvidenceLevel(summary),
          consensusLevel: 'consensus',
          applicableStages: extractStages(summary),
          biomarkerRequirements: extractBiomarkers(summary),
          treatmentSettings: extractTreatmentSettings(summary),
          specialPopulations: extractSpecialPopulations(summary),
          crossReferences: extractCrossReferences(summary),
          evidenceReferences: extractEvidenceReferences(summary),
          updatesFromPrevious: extractVersionUpdates(summary),
          clinicalDecisionPoints: extractDecisionPoints(summary),
          monitoringRequirements: extractMonitoring(summary),
          contraindications: extractContraindications(summary),
          alternativeApproaches: extractAlternatives(summary),
          qualityMeasures: extractQualityMeasures(summary)
        }).onConflictDoNothing();
        
        guidelinesCount++;
        
        // Create clinical decision support entries for key scenarios
        const decisionSupports = createDecisionSupportEntries(referenceCode, summary);
        for (const ds of decisionSupports) {
          await db.insert(clinicalDecisionSupport).values(ds).onConflictDoNothing();
          decisionSupportCount++;
        }
        
        // Create biomarker guideline entries
        const biomarkerEntries = extractBiomarkerGuidelines(referenceCode, summary);
        for (const bg of biomarkerEntries) {
          await db.insert(biomarkerGuidelines).values(bg).onConflictDoNothing();
          biomarkerCount++;
        }
      }
      
      // Process treatment-related entries
      if (summary.includes('therapy') || summary.includes('treatment') || summary.includes('protocol')) {
        const treatmentDecisionSupport = createTreatmentDecisionSupport(name, summary);
        if (treatmentDecisionSupport) {
          await db.insert(clinicalDecisionSupport).values(treatmentDecisionSupport).onConflictDoNothing();
          decisionSupportCount++;
        }
      }
    }
    
    console.log(`✅ Successfully imported:`);
    console.log(`   📋 ${guidelinesCount} NCCN Guidelines`);
    console.log(`   🎯 ${decisionSupportCount} Clinical Decision Support entries`);
    console.log(`   🧬 ${biomarkerCount} Biomarker Guidelines`);
    console.log(`📊 NCCN Guidelines integration complete!`);
    
  } catch (error) {
    console.error('❌ Error importing NCCN guidelines:', error);
    throw error;
  }
}

function determineCategory(referenceCode) {
  if (referenceCode.startsWith('BINV')) return 'invasive_breast_cancer';
  if (referenceCode.startsWith('DCIS')) return 'ductal_carcinoma_in_situ';
  if (referenceCode.startsWith('PHYLL')) return 'phyllodes_tumor';
  if (referenceCode.startsWith('PAGET')) return 'paget_disease';
  if (referenceCode.startsWith('IBC')) return 'inflammatory_breast_cancer';
  if (referenceCode.startsWith('PREG')) return 'pregnancy_associated';
  if (referenceCode.startsWith('ST')) return 'staging';
  if (referenceCode.startsWith('ABBR')) return 'abbreviations';
  return 'general_guidelines';
}

function extractKeyPoints(summary) {
  const points = [];
  const lines = summary.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      points.push(line.trim().substring(1).trim());
    }
  }
  return points;
}

function extractUpdates(summary) {
  const updates = [];
  if (summary.includes('Updates in Version')) {
    const updateSection = summary.split('Updates in Version')[1];
    if (updateSection) {
      const lines = updateSection.split('\n');
      for (const line of lines) {
        if (line.trim().startsWith('•')) {
          updates.push(line.trim().substring(1).trim());
        }
      }
    }
  }
  return updates;
}

function extractFootnotes(summary) {
  const footnotes = [];
  const footnoteMatches = summary.match(/Footnote [a-z]+[^•]*/gi);
  if (footnoteMatches) {
    footnotes.push(...footnoteMatches);
  }
  return footnotes;
}

function extractEvidenceLevel(summary) {
  if (summary.includes('category 1')) return 'Category 1';
  if (summary.includes('category 2A')) return 'Category 2A';
  if (summary.includes('category 2B')) return 'Category 2B';
  if (summary.includes('Category 3')) return 'Category 3';
  return 'Category 2A'; // Default for most NCCN recommendations
}

function extractStages(summary) {
  const stages = [];
  const stageMatches = summary.match(/[pt]T[0-4][a-c]?|[pt]N[0-3][a-c]?|[cM][01]/gi);
  if (stageMatches) {
    stages.push(...[...new Set(stageMatches)]);
  }
  if (summary.includes('Stage I')) stages.push('Stage I');
  if (summary.includes('Stage II')) stages.push('Stage II');
  if (summary.includes('Stage III')) stages.push('Stage III');
  if (summary.includes('Stage IV')) stages.push('Stage IV');
  return stages;
}

function extractBiomarkers(summary) {
  const biomarkers = {};
  if (summary.includes('HER2')) {
    biomarkers.HER2 = extractHER2Status(summary);
  }
  if (summary.includes('ER') || summary.includes('estrogen')) {
    biomarkers.ER = extractERStatus(summary);
  }
  if (summary.includes('PR') || summary.includes('progesterone')) {
    biomarkers.PR = extractPRStatus(summary);
  }
  if (summary.includes('BRCA')) {
    biomarkers.BRCA = extractBRCAStatus(summary);
  }
  if (summary.includes('PIK3CA')) {
    biomarkers.PIK3CA = 'mutation testing recommended';
  }
  return biomarkers;
}

function extractHER2Status(summary) {
  if (summary.includes('HER2-positive')) return 'Positive (IHC 3+ or FISH amplified)';
  if (summary.includes('HER2-negative')) return 'Negative (IHC 0-1+ or FISH negative)';
  if (summary.includes('HER2-low')) return 'Low (IHC 1-2+/FISH negative)';
  return 'Testing required';
}

function extractERStatus(summary) {
  if (summary.includes('HR-positive') || summary.includes('ER-positive')) return 'Positive (≥1% by IHC)';
  if (summary.includes('HR-negative') || summary.includes('ER-negative')) return 'Negative (<1% by IHC)';
  return 'Testing required';
}

function extractPRStatus(summary) {
  if (summary.includes('HR-positive') || summary.includes('PR-positive')) return 'Positive (≥1% by IHC)';
  if (summary.includes('HR-negative') || summary.includes('PR-negative')) return 'Negative (<1% by IHC)';
  return 'Testing required';
}

function extractBRCAStatus(summary) {
  if (summary.includes('germline BRCA')) return 'Germline mutation testing recommended';
  if (summary.includes('BRCA1/2')) return 'BRCA1/2 mutation testing';
  return 'Consider testing if family history';
}

function extractTreatmentSettings(summary) {
  const settings = [];
  if (summary.includes('adjuvant')) settings.push('adjuvant');
  if (summary.includes('neoadjuvant')) settings.push('neoadjuvant');
  if (summary.includes('metastatic')) settings.push('metastatic');
  if (summary.includes('preoperative')) settings.push('preoperative');
  if (summary.includes('postoperative')) settings.push('postoperative');
  return settings;
}

function extractSpecialPopulations(summary) {
  const populations = [];
  if (summary.includes('pregnancy') || summary.includes('pregnant')) populations.push('pregnancy');
  if (summary.includes('elderly') || summary.includes('≥70')) populations.push('elderly');
  if (summary.includes('male') || summary.includes('Males')) populations.push('male_breast_cancer');
  if (summary.includes('premenopausal')) populations.push('premenopausal');
  if (summary.includes('postmenopausal')) populations.push('postmenopausal');
  return populations;
}

function extractCrossReferences(summary) {
  const refs = [];
  const refMatches = summary.match(/BINV-[A-Z0-9\s]+|DCIS-[0-9]+|See [A-Z]+-[A-Z0-9\s]+/gi);
  if (refMatches) {
    refs.push(...refMatches);
  }
  return refs;
}

function extractEvidenceReferences(summary) {
  const refs = [];
  const citationMatches = summary.match(/[A-Z][a-z]+ [A-Z]{1,3}.*?[0-9]{4};[0-9]+:[0-9]+-[0-9]+/g);
  if (citationMatches) {
    refs.push(...citationMatches.slice(0, 10)); // Limit to first 10 citations
  }
  return refs;
}

function extractVersionUpdates(summary) {
  if (summary.includes('Updates in Version')) {
    return summary.split('Updates in Version')[1]?.split('Updates in Version')[0]?.trim();
  }
  return null;
}

function extractDecisionPoints(summary) {
  const points = [];
  if (summary.includes('Consider')) {
    points.push('Clinical consideration required');
  }
  if (summary.includes('may be')) {
    points.push('Optional intervention');
  }
  if (summary.includes('should')) {
    points.push('Recommended intervention');
  }
  return points;
}

function extractMonitoring(summary) {
  const monitoring = {};
  if (summary.includes('follow-up')) {
    monitoring.followUp = 'Per NCCN guidelines';
  }
  if (summary.includes('surveillance')) {
    monitoring.surveillance = 'Regular surveillance required';
  }
  if (summary.includes('monitoring')) {
    monitoring.activeMonitoring = 'Active monitoring indicated';
  }
  return monitoring;
}

function extractContraindications(summary) {
  const contraindications = [];
  if (summary.includes('contraindication')) {
    contraindications.push('Specific contraindications apply');
  }
  if (summary.includes('not recommended')) {
    contraindications.push('Not recommended in certain populations');
  }
  return contraindications;
}

function extractAlternatives(summary) {
  const alternatives = [];
  if (summary.includes('alternative')) {
    alternatives.push('Alternative approaches available');
  }
  if (summary.includes('other')) {
    alternatives.push('Other treatment options');
  }
  return alternatives;
}

function extractQualityMeasures(summary) {
  const measures = {};
  if (summary.includes('quality')) {
    measures.qualityAssurance = 'Quality measures apply';
  }
  return measures;
}

function createDecisionSupportEntries(referenceCode, summary) {
  const entries = [];
  
  // OPD Module decision support
  if (referenceCode.includes('BINV-1') || referenceCode.includes('workup')) {
    entries.push({
      moduleType: 'opd',
      clinicalScenario: 'Initial breast cancer workup and staging',
      inputParameters: {
        age: 'required',
        symptoms: 'required',
        familyHistory: 'recommended',
        priorBreastImaging: 'recommended'
      },
      nccnReferences: [referenceCode],
      recommendedActions: extractKeyPoints(summary),
      evidenceStrength: extractEvidenceLevel(summary),
      applicabilityScore: 0.95
    });
  }
  
  // CDU Module decision support
  if (summary.includes('chemotherapy') || summary.includes('systemic therapy')) {
    entries.push({
      moduleType: 'cdu',
      clinicalScenario: 'Systemic therapy selection and administration',
      inputParameters: {
        stage: 'required',
        biomarkers: 'required',
        performanceStatus: 'required',
        comorbidities: 'recommended'
      },
      nccnReferences: [referenceCode],
      recommendedActions: extractKeyPoints(summary),
      evidenceStrength: extractEvidenceLevel(summary),
      applicabilityScore: 0.90
    });
  }
  
  // Inpatient Module decision support
  if (summary.includes('monitoring') || summary.includes('toxicity')) {
    entries.push({
      moduleType: 'inpatient',
      clinicalScenario: 'Treatment monitoring and toxicity management',
      inputParameters: {
        currentTreatment: 'required',
        toxicityGrade: 'required',
        vitalSigns: 'required'
      },
      nccnReferences: [referenceCode],
      recommendedActions: extractKeyPoints(summary),
      evidenceStrength: extractEvidenceLevel(summary),
      applicabilityScore: 0.85
    });
  }
  
  return entries;
}

function createTreatmentDecisionSupport(name, summary) {
  if (!summary.includes('therapy') && !summary.includes('treatment')) return null;
  
  return {
    moduleType: 'general',
    clinicalScenario: name,
    inputParameters: {
      clinicalContext: 'variable',
      patientFactors: 'required'
    },
    nccnReferences: ['General NCCN'],
    recommendedActions: extractKeyPoints(summary),
    evidenceStrength: extractEvidenceLevel(summary),
    applicabilityScore: 0.80
  };
}

function extractBiomarkerGuidelines(referenceCode, summary) {
  const guidelines = [];
  
  if (summary.includes('HER2')) {
    guidelines.push({
      biomarkerName: 'HER2',
      testingMethod: 'IHC and/or FISH',
      cancerType: 'breast',
      clinicalIndications: ['All invasive breast cancers', 'Treatment selection'],
      nccnReference: referenceCode,
      evidenceLevel: 'Category 1',
      testingTiming: 'At diagnosis',
      interpretationCriteria: {
        positive: 'IHC 3+ or FISH amplified',
        negative: 'IHC 0-1+ or FISH negative',
        low: 'IHC 1-2+/FISH negative'
      },
      therapeuticImplications: ['Anti-HER2 therapy selection', 'Prognosis'],
      qualityRequirements: ['CAP/ASCO guidelines'],
      reportingStandards: ['Standardized reporting required']
    });
  }
  
  if (summary.includes('ER') || summary.includes('PR')) {
    guidelines.push({
      biomarkerName: 'ER/PR',
      testingMethod: 'Immunohistochemistry',
      cancerType: 'breast',
      clinicalIndications: ['All invasive breast cancers', 'Endocrine therapy selection'],
      nccnReference: referenceCode,
      evidenceLevel: 'Category 1',
      testingTiming: 'At diagnosis',
      interpretationCriteria: {
        positive: '≥1% nuclear staining',
        negative: '<1% nuclear staining'
      },
      therapeuticImplications: ['Endocrine therapy selection', 'Prognosis'],
      qualityRequirements: ['CAP/ASCO guidelines'],
      reportingStandards: ['Standardized reporting required']
    });
  }
  
  return guidelines;
}

// Run the import
importNCCNGuidelines().catch(console.error);