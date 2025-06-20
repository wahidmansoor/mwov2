import { storage } from "../storage";
import type { PatientEvaluation, ClinicalProtocol, TreatmentProtocol } from "@shared/schema";

interface DecisionCriteria {
  age?: { min?: number; max?: number };
  symptoms?: string[];
  riskFactors?: string[];
  cancerType?: string;
  stage?: string;
}

interface ClinicalDecision {
  recommendation: string;
  confidence: number;
  evidenceLevel: string;
  urgency: "low" | "medium" | "high";
  rationale: string;
  nextSteps: string[];
}

interface ScreeningRecommendation {
  type: string;
  description: string;
  frequency: string;
  eligibilityCriteria: string[];
  evidenceLevel: string;
}

export class ClinicalDecisionEngine {
  private static instance: ClinicalDecisionEngine;
  
  public static getInstance(): ClinicalDecisionEngine {
    if (!ClinicalDecisionEngine.instance) {
      ClinicalDecisionEngine.instance = new ClinicalDecisionEngine();
    }
    return ClinicalDecisionEngine.instance;
  }

  async generateScreeningRecommendations(age: number, riskFactors: string[]): Promise<ScreeningRecommendation[]> {
    const recommendations: ScreeningRecommendation[] = [];

    // Lung cancer screening
    if (age >= 50 && age <= 80) {
      const hasSmokingHistory = riskFactors.includes("smoking_history");
      if (hasSmokingHistory) {
        recommendations.push({
          type: "Lung Cancer Screening",
          description: "Low-dose computed tomography (LDCT) chest scan",
          frequency: "Annual",
          eligibilityCriteria: [
            "Age 50-80 years",
            "30+ pack-year smoking history",
            "Currently smoking or quit within 15 years"
          ],
          evidenceLevel: "1A"
        });
      }
    }

    // Breast cancer screening
    if (age >= 40) {
      recommendations.push({
        type: "Breast Cancer Screening",
        description: "Mammography screening",
        frequency: age >= 50 ? "Every 2 years" : "Annual",
        eligibilityCriteria: [
          "Women age 40+ years",
          "Consider earlier if family history present"
        ],
        evidenceLevel: "1A"
      });
    }

    // Colorectal cancer screening
    if (age >= 45) {
      const hasFamilyHistory = riskFactors.includes("family_history");
      recommendations.push({
        type: "Colorectal Cancer Screening",
        description: "Colonoscopy or alternative screening method",
        frequency: hasFamilyHistory ? "Every 5 years" : "Every 10 years",
        eligibilityCriteria: [
          "Age 45+ years",
          "Earlier if family history or symptoms present"
        ],
        evidenceLevel: "1A"
      });
    }

    // Cervical cancer screening (for appropriate patients)
    if (age >= 21 && age <= 65) {
      recommendations.push({
        type: "Cervical Cancer Screening",
        description: "Pap smear with or without HPV testing",
        frequency: "Every 3-5 years depending on age and method",
        eligibilityCriteria: [
          "Women age 21-65 years",
          "Sexually active"
        ],
        evidenceLevel: "1A"
      });
    }

    return recommendations;
  }

  async evaluateSymptomUrgency(symptoms: string[], age: number, riskFactors: string[]): Promise<ClinicalDecision> {
    const redFlagSymptoms = [
      "persistent_cough",
      "weight_loss",
      "difficulty_swallowing",
      "persistent_headaches"
    ];

    const concerningSymptoms = [
      "fatigue",
      "pain",
      "shortness_of_breath",
      "changes_in_skin"
    ];

    const hasRedFlags = symptoms.some(symptom => redFlagSymptoms.includes(symptom));
    const hasConcerningSymptoms = symptoms.some(symptom => concerningSymptoms.includes(symptom));
    const hasHighRiskFactors = riskFactors.some(rf => 
      ["smoking_history", "family_history", "previous_cancer"].includes(rf)
    );

    let urgency: "low" | "medium" | "high" = "low";
    let confidence = 60;
    let recommendation = "Routine follow-up and monitoring";
    let rationale = "Standard clinical assessment indicated";
    let nextSteps = ["Schedule routine follow-up", "Monitor symptom progression"];

    if (hasRedFlags || (hasConcerningSymptoms && hasHighRiskFactors)) {
      urgency = "high";
      confidence = 85;
      recommendation = "Urgent evaluation and diagnostic workup required";
      rationale = "Presence of red flag symptoms or concerning symptoms with high-risk factors";
      nextSteps = [
        "Immediate clinical evaluation",
        "Order appropriate imaging studies",
        "Consider specialist referral",
        "Expedite diagnostic workup"
      ];
    } else if (hasConcerningSymptoms || hasHighRiskFactors) {
      urgency = "medium";
      confidence = 75;
      recommendation = "Prompt evaluation and targeted workup";
      rationale = "Concerning symptoms or risk factors present requiring assessment";
      nextSteps = [
        "Schedule evaluation within 2-4 weeks",
        "Order relevant diagnostic tests",
        "Consider symptom-specific workup"
      ];
    }

    // Age-based modifications
    if (age > 65 && symptoms.length > 0) {
      urgency = urgency === "low" ? "medium" : urgency;
      confidence = Math.min(confidence + 10, 95);
    }

    return {
      recommendation,
      confidence,
      evidenceLevel: "2A",
      urgency,
      rationale,
      nextSteps
    };
  }

  async suggestDiagnosticWorkup(
    symptoms: string[], 
    age: number, 
    riskFactors: string[]
  ): Promise<{
    imaging: string[];
    laboratory: string[];
    procedures: string[];
    referrals: string[];
  }> {
    const workup = {
      imaging: [] as string[],
      laboratory: [] as string[],
      procedures: [] as string[],
      referrals: [] as string[]
    };

    // Respiratory symptoms
    if (symptoms.includes("persistent_cough") || symptoms.includes("shortness_of_breath")) {
      workup.imaging.push("Chest X-ray", "Consider CT chest if concerning features");
      workup.laboratory.push("Complete blood count");
      if (riskFactors.includes("smoking_history")) {
        workup.procedures.push("Pulmonary function tests");
        workup.referrals.push("Pulmonology consultation");
      }
    }

    // Constitutional symptoms
    if (symptoms.includes("weight_loss") || symptoms.includes("fatigue")) {
      workup.laboratory.push(
        "Complete metabolic panel",
        "Liver function tests",
        "Thyroid function tests",
        "Inflammatory markers (ESR, CRP)"
      );
      workup.imaging.push("Consider CT chest/abdomen/pelvis if unexplained");
    }

    // Gastrointestinal symptoms
    if (symptoms.includes("difficulty_swallowing")) {
      workup.imaging.push("Barium swallow or CT with contrast");
      workup.procedures.push("Upper endoscopy");
      workup.referrals.push("Gastroenterology consultation");
    }

    // Neurological symptoms
    if (symptoms.includes("persistent_headaches")) {
      workup.imaging.push("MRI brain with contrast");
      workup.laboratory.push("Basic metabolic panel");
      workup.referrals.push("Neurology consultation");
    }

    // Age-based considerations
    if (age > 50 && symptoms.length > 0) {
      workup.laboratory.push("Tumor markers panel (if clinically indicated)");
    }

    // Risk factor-based additions
    if (riskFactors.includes("family_history")) {
      workup.referrals.push("Genetic counseling consideration");
    }

    return workup;
  }

  async findMatchingProtocols(criteria: DecisionCriteria): Promise<ClinicalProtocol[]> {
    try {
      const allProtocols = await storage.getClinicalProtocols();
      
      return allProtocols.filter(protocol => {
        // Age criteria
        if (criteria.age) {
          const protocolAgeRequirements = protocol.content?.ageRequirements;
          if (protocolAgeRequirements) {
            const { min, max } = protocolAgeRequirements;
            if (min && criteria.age.min && criteria.age.min < min) return false;
            if (max && criteria.age.max && criteria.age.max > max) return false;
          }
        }

        // Cancer type matching
        if (criteria.cancerType && protocol.cancerType) {
          if (protocol.cancerType !== criteria.cancerType) return false;
        }

        // Stage matching
        if (criteria.stage && protocol.stage) {
          if (protocol.stage !== criteria.stage) return false;
        }

        return true;
      });
    } catch (error) {
      console.error("Error finding matching protocols:", error);
      return [];
    }
  }

  async generateTreatmentRecommendations(
    cancerType: string, 
    stage: string, 
    patientFactors: any
  ): Promise<TreatmentProtocol[]> {
    try {
      const allProtocols = await storage.getTreatmentProtocols();
      
      return allProtocols.filter(protocol => {
        if (protocol.tumourGroup !== cancerType.toLowerCase()) return false;
        
        // Check indications
        if (protocol.indications?.stage && protocol.indications.stage !== stage) {
          return false;
        }

        // Check contraindications
        if (protocol.contraindications && patientFactors) {
          for (const [key, value] of Object.entries(protocol.contraindications)) {
            if (patientFactors[key] === value) {
              return false;
            }
          }
        }

        return true;
      });
    } catch (error) {
      console.error("Error generating treatment recommendations:", error);
      return [];
    }
  }

  async calculateRiskScore(
    age: number, 
    symptoms: string[], 
    riskFactors: string[]
  ): Promise<{
    score: number;
    category: "low" | "intermediate" | "high";
    factors: string[];
  }> {
    let score = 0;
    const contributingFactors: string[] = [];

    // Age-based risk
    if (age > 65) {
      score += 20;
      contributingFactors.push("Advanced age (>65)");
    } else if (age > 50) {
      score += 10;
      contributingFactors.push("Older age (>50)");
    }

    // Symptom-based risk
    const highRiskSymptoms = ["persistent_cough", "weight_loss", "difficulty_swallowing"];
    const moderateRiskSymptoms = ["fatigue", "pain", "changes_in_skin"];

    for (const symptom of symptoms) {
      if (highRiskSymptoms.includes(symptom)) {
        score += 25;
        contributingFactors.push(`High-risk symptom: ${symptom.replace('_', ' ')}`);
      } else if (moderateRiskSymptoms.includes(symptom)) {
        score += 15;
        contributingFactors.push(`Concerning symptom: ${symptom.replace('_', ' ')}`);
      }
    }

    // Risk factor-based scoring
    const riskFactorScores: Record<string, number> = {
      "smoking_history": 25,
      "family_history": 20,
      "previous_cancer": 30,
      "radiation_exposure": 15,
      "chemical_exposure": 10,
      "genetic_mutations": 35
    };

    for (const factor of riskFactors) {
      if (riskFactorScores[factor]) {
        score += riskFactorScores[factor];
        contributingFactors.push(`Risk factor: ${factor.replace('_', ' ')}`);
      }
    }

    // Determine category
    let category: "low" | "intermediate" | "high";
    if (score >= 70) {
      category = "high";
    } else if (score >= 40) {
      category = "intermediate";
    } else {
      category = "low";
    }

    return {
      score: Math.min(score, 100),
      category,
      factors: contributingFactors
    };
  }
}

export const clinicalDecisionEngine = ClinicalDecisionEngine.getInstance();
