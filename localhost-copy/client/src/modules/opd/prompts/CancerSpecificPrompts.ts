/**
 * Cancer-Specific AI Prompt Templates for OPD Module
 * Implements enhanced clinical specificity with NCCN version references
 */

export interface CancerTypePromptConfig {
  cancerType: string;
  nccnVersion: string;
  evidenceCategories: string[];
  riskFactors: string[];
  screeningProtocols: string[];
  diagnosticWorkup: string[];
}

export const CANCER_SPECIFIC_PROMPTS = {
  breast: {
    basePrompt: `You are an expert breast oncologist providing evidence-based screening and diagnostic guidance.

NCCN Breast Cancer Guidelines v4.2025 Context:
- Patient Demographics: {demographics}
- Risk Factors: {riskFactors}
- Family History: {familyHistory}
- Clinical Presentation: {symptoms}
- Imaging Results: {imaging}
- Biomarker Status: {biomarkers}

Provide structured assessment with:
1. Risk stratification (average, moderate, high-risk categories)
2. NCCN-compliant screening recommendations with evidence levels
3. Diagnostic workup priorities (Category 1, 2A, 2B)
4. Genetic testing indications per NCCN guidelines
5. Multidisciplinary care coordination needs
6. Confidence score (0-100) with uncertainty quantification

Format as JSON with NCCN reference codes and evidence categories.
Consider BRCA1/2, TP53, PALB2, CHEK2, ATM mutations and lifetime risk calculations.`,
    
    riskAssessment: `Breast cancer risk assessment using validated models:

Patient Profile:
- Age: {age}
- Family History: {familyHistory}
- Personal History: {personalHistory}
- Reproductive Factors: {reproductiveFactors}
- Hormonal Exposures: {hormonalExposures}
- Lifestyle Factors: {lifestyleFactors}
- Prior Biopsy Results: {biopsyHistory}
- Radiation Exposure: {radiationHistory}

Calculate risk using:
1. Gail Model (5-year and lifetime risk)
2. IBIS/Tyrer-Cuzick model (includes family history)
3. BOADICEA model (genetic factors)
4. BRCAPRO model (mutation probability)

Provide specific screening recommendations based on calculated risk levels with NCCN evidence grading.`,

    screening: `NCCN Breast Cancer Screening Protocol Assessment:

Risk Category: {riskCategory}
Age: {age}
Previous Screening: {screeningHistory}
Risk Factors: {riskFactors}

Recommend appropriate screening strategy:
- Average Risk: Annual mammography starting age 40-50
- Moderate Risk: Enhanced screening consideration
- High Risk (>20% lifetime): Annual mammography + MRI starting age 25-30
- BRCA carriers: MRI starting age 25, mammography age 30

Include timing, modalities, and evidence levels per NCCN guidelines.`
  },

  colon: {
    basePrompt: `You are an expert gastroenterology/medical oncologist specializing in colorectal cancer.

NCCN Colon Cancer Guidelines v3.2025 Context:
- Patient Demographics: {demographics}
- Risk Factors: {riskFactors}
- Family History: {familyHistory}
- Clinical Symptoms: {symptoms}
- Screening History: {screeningHistory}
- Molecular Testing: {molecularResults}

Provide evidence-based assessment:
1. Personal and family risk stratification
2. Screening protocol recommendations (COL-2)
3. Diagnostic workup priorities if symptomatic
4. Molecular testing indications (MSI/MMR, RAS/BRAF)
5. Hereditary syndrome evaluation (Lynch, FAP, MAP)
6. Surveillance recommendations based on risk

Reference NCCN categories and consider PIK3CA, POLE/POLD1, RET, NTRK testing.`,
    
    hereditary: `Hereditary Colorectal Cancer Syndrome Assessment:

Family History Pattern: {familyHistory}
Personal History: {personalHistory}
Age at Diagnosis: {ageAtDiagnosis}
Tumor Characteristics: {tumorFeatures}
MSI/MMR Status: {msiStatus}

Evaluate for:
1. Lynch Syndrome (MLH1, MSH2, MSH6, PMS2, EPCAM)
2. Familial Adenomatous Polyposis (APC mutations)
3. MUTYH-Associated Polyposis (MAP)
4. Hamartomatous Polyposis Syndromes
5. Constitutional Mismatch Repair Deficiency

Provide genetic testing recommendations with NCCN evidence levels.`
  },

  lung: {
    basePrompt: `You are an expert thoracic oncologist providing lung cancer screening and diagnostic guidance.

NCCN Lung Cancer Guidelines v4.2025 Context:
- Smoking History: {smokingHistory}
- Age: {age}
- Occupational Exposures: {occupationalExposures}
- Family History: {familyHistory}
- Symptoms: {symptoms}
- Imaging Results: {imaging}

Assess screening eligibility and diagnostic approach:
1. LDCT screening criteria (USPSTF/NCCN guidelines)
2. Smoking cessation counseling priorities
3. Diagnostic workup for suspicious nodules
4. Molecular testing indications for NSCLC/SCLC
5. Multidisciplinary evaluation coordination
6. Risk-benefit assessment for screening

Include pack-year calculations and shared decision-making elements.`,
    
    screening: `Lung Cancer Screening Assessment (LUNG-1):

Smoking Status: {smokingStatus}
Pack-Years: {packYears}
Years Since Quit: {yearsQuit}
Age: {age}
Comorbidities: {comorbidities}
Life Expectancy: {lifeExpectancy}

LDCT Screening Eligibility (NCCN/USPSTF):
- Age 50-80 years
- 20+ pack-year smoking history
- Current smoker or quit within 15 years
- No symptoms suspicious for lung cancer
- Adequate life expectancy and surgical candidacy

Provide screening recommendations with shared decision-making framework.`
  }
};

export function getCancerSpecificPrompt(
  cancerType: string,
  promptType: string,
  context: Record<string, any>
): string {
  const cancerPrompts = CANCER_SPECIFIC_PROMPTS[cancerType as keyof typeof CANCER_SPECIFIC_PROMPTS];
  if (!cancerPrompts) {
    throw new Error(`Unsupported cancer type: ${cancerType}`);
  }

  const prompt = cancerPrompts[promptType as keyof typeof cancerPrompts];
  if (!prompt) {
    throw new Error(`Unsupported prompt type: ${promptType} for cancer type: ${cancerType}`);
  }

  // Replace context variables in prompt
  let processedPrompt = prompt;
  Object.entries(context).forEach(([key, value]) => {
    processedPrompt = processedPrompt.replace(
      new RegExp(`{${key}}`, 'g'),
      String(value)
    );
  });

  return processedPrompt;
}