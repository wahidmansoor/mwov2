import { logger } from "../utils/logger.js";
import { ClinicalDataError } from "../utils/errorHandler.js";

interface OpioidConversionInput {
  drug: string;
  dose: number;
  target: string;
  patientWeight?: number;
  renalFunction?: 'normal' | 'mild' | 'moderate' | 'severe';
}

interface RenalDoseInput {
  drug: string;
  creatinine: number;
  age: number;
  weight: number;
  gender?: 'male' | 'female';
}

interface PrognosticInput {
  kps: number;
  dyspnea: boolean;
  anorexia: boolean;
  fatigue: boolean;
  pain?: number;
  weight_loss?: number;
}

// Comprehensive opioid conversion ratios (morphine equivalents)
const OPIOID_RATIOS: Record<string, { oral: number; iv?: number; transdermal?: number }> = {
  "morphine": { oral: 1, iv: 3 },
  "oxycodone": { oral: 1.5 },
  "hydromorphone": { oral: 5, iv: 15 },
  "fentanyl": { oral: 75, iv: 100, transdermal: 2.4 },
  "tramadol": { oral: 0.1 },
  "codeine": { oral: 0.15 },
  "methadone": { oral: 4 }, // Complex conversion - requires clinical expertise
  "buprenorphine": { oral: 75, transdermal: 12.6 },
  "oxymorphone": { oral: 3, iv: 10 },
  "tapentadol": { oral: 0.4 }
};

// Renal dose adjustment factors by drug class
const RENAL_ADJUSTMENTS: Record<string, Record<string, number>> = {
  "morphine": { normal: 1, mild: 0.75, moderate: 0.5, severe: 0.25 },
  "hydromorphone": { normal: 1, mild: 1, moderate: 0.75, severe: 0.5 },
  "fentanyl": { normal: 1, mild: 1, moderate: 1, severe: 0.75 },
  "methadone": { normal: 1, mild: 0.75, moderate: 0.5, severe: 0.25 },
  "oxycodone": { normal: 1, mild: 0.75, moderate: 0.5, severe: 0.25 }
};

export const calculatorService = {
  opioidConversion: async ({ drug, dose, target, patientWeight, renalFunction }: OpioidConversionInput) => {
    logger.info({ drug, dose, target, patientWeight, renalFunction }, 'Processing opioid conversion');
    
    const drugLower = drug.toLowerCase();
    const targetLower = target.toLowerCase();
    
    const sourceRatio = OPIOID_RATIOS[drugLower];
    const targetRatio = OPIOID_RATIOS[targetLower];
    
    if (!sourceRatio || !targetRatio) {
      throw new ClinicalDataError(
        `Unsupported drug conversion: ${drug} to ${target}`,
        { availableDrugs: Object.keys(OPIOID_RATIOS) }
      );
    }
    
    // Convert to morphine equivalent first, then to target
    const morphineEquivalent = dose * sourceRatio.oral;
    let equivalentDose = morphineEquivalent / targetRatio.oral;
    
    // Apply renal function adjustment if applicable
    if (renalFunction && renalFunction !== 'normal') {
      const adjustment = RENAL_ADJUSTMENTS[targetLower]?.[renalFunction] || 0.75;
      equivalentDose *= adjustment;
    }
    
    // Round to clinically appropriate precision
    equivalentDose = Math.round(equivalentDose * 10) / 10;
    
    // Calculate safety reduction factor (typically start with 25-50% of calculated dose)
    const safetyReducedDose = Math.round((equivalentDose * 0.5) * 10) / 10;
    
    return {
      equivalent_dose: equivalentDose,
      safety_reduced_dose: safetyReducedDose,
      morphine_equivalent: Math.round(morphineEquivalent * 10) / 10,
      conversion_ratio: `${sourceRatio.oral}:${targetRatio.oral}`,
      notes: `${drug} ${dose}mg ≈ ${target} ${equivalentDose}mg (start with ${safetyReducedDose}mg)`,
      source: "WHO Guidelines & NCCN Pain Management",
      warnings: [
        "Clinical judgment required for all conversions",
        "Start with 25-50% of calculated dose",
        "Monitor for signs of under/over-dosing",
        renalFunction && renalFunction !== 'normal' ? "Renal adjustment applied" : null
      ].filter(Boolean),
      special_considerations: drugLower === 'methadone' ? 
        "Methadone conversion requires specialist consultation due to complex pharmacokinetics" : null
    };
  },

  renalDoseAdjustment: async ({ drug, creatinine, age, weight, gender }: RenalDoseInput) => {
    logger.info({ drug, creatinine, age, weight, gender }, 'Processing renal dose adjustment');
    
    // Cockcroft-Gault equation with gender adjustment
    const genderFactor = gender === 'female' ? 0.85 : 1;
    const creatinineClearance = ((140 - age) * weight * genderFactor) / (72 * creatinine);
    
    // Classify renal function
    let renalFunction: string;
    let adjustmentFactor: number;
    let recommendation: string;
    let monitoring: string[];
    
    if (creatinineClearance >= 90) {
      renalFunction = "Normal";
      adjustmentFactor = 1;
      recommendation = "Normal dosing";
      monitoring = ["Routine monitoring"];
    } else if (creatinineClearance >= 60) {
      renalFunction = "Mild impairment (CKD Stage 2)";
      adjustmentFactor = 0.75;
      recommendation = "Consider dose reduction of 25% for renally excreted drugs";
      monitoring = ["Monitor creatinine every 3-6 months"];
    } else if (creatinineClearance >= 30) {
      renalFunction = "Moderate impairment (CKD Stage 3)";
      adjustmentFactor = 0.5;
      recommendation = "Reduce dose by 50% or increase dosing interval";
      monitoring = ["Monitor creatinine monthly", "Consider nephrology referral"];
    } else if (creatinineClearance >= 15) {
      renalFunction = "Severe impairment (CKD Stage 4)";
      adjustmentFactor = 0.25;
      recommendation = "Reduce dose by 75% or significantly increase interval";
      monitoring = ["Weekly creatinine monitoring", "Nephrology consultation required"];
    } else {
      renalFunction = "End-stage renal disease (CKD Stage 5)";
      adjustmentFactor = 0.1;
      recommendation = "Avoid if possible or use minimal doses with extended intervals";
      monitoring = ["Daily monitoring", "Immediate nephrology consultation"];
    }
    
    // Drug-specific adjustments
    const drugSpecificGuidance = this.getDrugSpecificRenalGuidance(drug.toLowerCase());
    
    return {
      creatinine_clearance: Math.round(creatinineClearance),
      renal_function: renalFunction,
      adjustment_factor: adjustmentFactor,
      recommendation,
      monitoring_requirements: monitoring,
      drug_specific_guidance: drugSpecificGuidance,
      notes: `CrCl: ${Math.round(creatinineClearance)} mL/min using Cockcroft-Gault equation`,
      warnings: [
        "Consult pharmacist for complex cases",
        "Consider additional factors: hepatic function, drug interactions",
        creatinineClearance < 30 ? "Nephrology consultation recommended" : null
      ].filter(Boolean),
      formula_used: "Cockcroft-Gault: ((140-age) × weight × gender_factor) / (72 × creatinine)"
    };
  },

  prognosticIndex: async ({ kps, dyspnea, anorexia, fatigue, pain, weight_loss }: PrognosticInput) => {
    logger.info({ kps, dyspnea, anorexia, fatigue, pain, weight_loss }, 'Processing prognostic index');
    
    let score = 0;
    const factors: string[] = [];
    
    // KPS scoring (Karnofsky Performance Status)
    if (kps >= 80) {
      score += 2;
      factors.push("Good functional status (KPS ≥80)");
    } else if (kps >= 60) {
      score += 1;
      factors.push("Moderate functional status (KPS 60-79)");
    } else if (kps >= 40) {
      score += 0;
      factors.push("Poor functional status (KPS 40-59)");
    } else {
      score -= 1;
      factors.push("Very poor functional status (KPS <40)");
    }
    
    // Symptom burden assessment
    if (dyspnea) {
      score -= 1;
      factors.push("Dyspnea present");
    }
    if (anorexia) {
      score -= 1;
      factors.push("Anorexia present");
    }
    if (fatigue) {
      score -= 1;
      factors.push("Fatigue present");
    }
    
    // Additional prognostic factors if provided
    if (pain !== undefined && pain >= 7) {
      score -= 1;
      factors.push("Severe pain (≥7/10)");
    }
    if (weight_loss !== undefined && weight_loss >= 10) {
      score -= 1;
      factors.push("Significant weight loss (≥10%)");
    }
    
    // Determine prognosis category
    let prognosis: string;
    let survivalEstimate: string;
    let recommendations: string[];
    
    if (score >= 2) {
      prognosis = "Good";
      survivalEstimate = "> 6 months";
      recommendations = [
        "Consider curative or disease-modifying treatments",
        "Routine symptom assessment",
        "Maintain active lifestyle"
      ];
    } else if (score >= 0) {
      prognosis = "Moderate";
      survivalEstimate = "1-6 months";
      recommendations = [
        "Focus on symptom management and quality of life",
        "Consider palliative interventions",
        "Weekly to bi-weekly assessments"
      ];
    } else if (score >= -2) {
      prognosis = "Poor";
      survivalEstimate = "Weeks to 1 month";
      recommendations = [
        "Intensive symptom management",
        "Consider hospice care referral",
        "Daily to every other day assessments"
      ];
    } else {
      prognosis = "Very Poor";
      survivalEstimate = "Days to weeks";
      recommendations = [
        "Comfort care measures",
        "Immediate hospice care consideration",
        "Continuous symptom monitoring"
      ];
    }
    
    return {
      score,
      prognosis,
      survival_estimate: survivalEstimate,
      contributing_factors: factors,
      kps_contribution: kps,
      symptom_burden: [dyspnea, anorexia, fatigue].filter(Boolean).length,
      recommendations,
      notes: "Modified prognostic index combining functional status and symptom burden",
      warnings: [
        "Prognostic tools provide estimates only",
        "Individual variation is significant",
        "Use clinical judgment and consider all factors",
        "Regular reassessment recommended"
      ],
      tools_used: ["Karnofsky Performance Status", "Symptom Assessment Scale"],
      reassessment_interval: score >= 0 ? "Weekly" : "Every few days"
    };
  },

  // Helper method for drug-specific renal guidance
  getDrugSpecificRenalGuidance(drug: string): string {
    const guidance: Record<string, string> = {
      "morphine": "Active metabolites accumulate in renal impairment. Consider alternative opioids.",
      "hydromorphone": "Safer alternative to morphine in renal impairment. Monitor closely.",
      "fentanyl": "Minimal renal elimination. Preferred in significant renal impairment.",
      "methadone": "Complex elimination. Specialist consultation required.",
      "oxycodone": "Active metabolites may accumulate. Reduce dose in moderate-severe impairment.",
      "gabapentin": "Primarily renally eliminated. Significant dose reduction required.",
      "pregabalin": "Renally eliminated. Dose adjustment essential.",
      "digoxin": "Narrow therapeutic index. Careful monitoring and dose adjustment required."
    };
    
    return guidance[drug] || "Consult drug monograph for specific renal dosing guidance.";
  }
};
