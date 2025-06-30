/**
 * Server-side Risk Calculation API for OPD Module
 * Implements high-performance risk calculation with caching
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import { cacheService } from '../services/cacheService';

// Validation schemas
const PatientProfileSchema = z.object({
  demographics: z.object({
    age: z.number().min(0).max(120),
    gender: z.enum(['male', 'female', 'other']),
    race: z.string().optional(),
    ethnicity: z.string().optional()
  }),
  familyHistory: z.object({
    firstDegreeRelatives: z.array(z.object({
      relation: z.string(),
      cancerType: z.string(),
      ageAtDiagnosis: z.number()
    })).optional(),
    secondDegreeRelatives: z.array(z.object({
      relation: z.string(),
      cancerType: z.string(),
      ageAtDiagnosis: z.number()
    })).optional(),
    consanguinity: z.boolean().optional()
  }).optional(),
  lifestyle: z.object({
    smokingStatus: z.enum(['never', 'former', 'current']).optional(),
    packYears: z.number().optional(),
    yearsQuit: z.number().optional(),
    alcoholUse: z.enum(['none', 'light', 'moderate', 'heavy']).optional(),
    physicalActivity: z.enum(['sedentary', 'low', 'moderate', 'high']).optional(),
    diet: z.enum(['poor', 'average', 'good', 'excellent']).optional(),
    bmi: z.number().min(10).max(80).optional()
  }).optional(),
  medical: z.object({
    reproductiveHistory: z.object({
      menarche: z.number().optional(),
      menopause: z.number().optional(),
      pregnancies: z.number().optional(),
      breastfeeding: z.boolean().optional(),
      hormonalTherapy: z.boolean().optional()
    }).optional(),
    comorbidities: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    immunosuppression: z.boolean().optional()
  }).optional(),
  environmental: z.object({
    occupationalExposures: z.array(z.string()).optional(),
    radiationExposure: z.boolean().optional(),
    chemicalExposures: z.array(z.string()).optional(),
    geographicFactors: z.array(z.string()).optional()
  }).optional(),
  genetic: z.object({
    knownMutations: z.array(z.object({
      gene: z.string(),
      variant: z.string(),
      pathogenicity: z.enum(['pathogenic', 'likely-pathogenic', 'vus', 'benign'])
    })).optional(),
    polygeneticRiskScore: z.number().optional()
  }).optional()
});

const RiskCalculationRequestSchema = z.object({
  patientProfile: PatientProfileSchema,
  cancerType: z.enum(['breast', 'colon', 'lung', 'prostate', 'pancreatic']),
  forceRecalculation: z.boolean().optional()
});

interface RiskFactor {
  name: string;
  value: any;
  weight: number;
  category: 'demographic' | 'genetic' | 'lifestyle' | 'medical' | 'environmental';
}

interface RiskAssessmentResult {
  overallRisk: number;
  riskCategory: 'low' | 'moderate' | 'high' | 'very-high';
  confidence: number;
  contributingFactors: RiskFactor[];
  recommendations: string[];
  nextAssessment: Date;
  uncertaintyFactors: string[];
  calculatedAt: string;
  version: string;
}

class ServerRiskCalculationEngine {
  private version = '2.0';

  async calculateBreastCancerRisk(profile: any): Promise<RiskAssessmentResult> {
    const factors: RiskFactor[] = [];
    let baseRisk = this.getAgeBasedBreastRisk(profile.demographics.age);

    // Age factor
    factors.push({
      name: 'Age',
      value: profile.demographics.age,
      weight: this.getAgeWeight(profile.demographics.age, 'breast'),
      category: 'demographic'
    });

    // Family history assessment using validated algorithms
    const familyRisk = this.calculateFamilyHistoryRisk(profile.familyHistory, 'breast');
    if (familyRisk.risk > 1.0) {
      factors.push({
        name: 'Family History',
        value: familyRisk.description,
        weight: familyRisk.risk,
        category: 'genetic'
      });
      baseRisk *= familyRisk.risk;
    }

    // BRCA and other genetic mutations
    const geneticRisk = this.calculateGeneticRisk(profile.genetic, 'breast');
    if (geneticRisk.risk > 1.0) {
      factors.push({
        name: 'Genetic Mutations',
        value: geneticRisk.mutations,
        weight: geneticRisk.risk,
        category: 'genetic'
      });
      baseRisk *= geneticRisk.risk;
    }

    // Reproductive factors (Gail model components)
    if (profile.medical?.reproductiveHistory) {
      const reproductiveRisk = this.calculateReproductiveRisk(profile.medical.reproductiveHistory);
      factors.push({
        name: 'Reproductive Factors',
        value: reproductiveRisk.description,
        weight: reproductiveRisk.risk,
        category: 'medical'
      });
      baseRisk *= reproductiveRisk.risk;
    }

    return this.generateRiskAssessment(baseRisk, factors, 'breast', profile);
  }

  async calculateColonCancerRisk(profile: any): Promise<RiskAssessmentResult> {
    const factors: RiskFactor[] = [];
    let baseRisk = this.getAgeBasedColonRisk(profile.demographics.age);

    // Age factor - particularly important for colon cancer
    factors.push({
      name: 'Age',
      value: profile.demographics.age,
      weight: this.getAgeWeight(profile.demographics.age, 'colon'),
      category: 'demographic'
    });

    // Family history - Lynch syndrome and FAP considerations
    const familyRisk = this.calculateFamilyHistoryRisk(profile.familyHistory, 'colon');
    if (familyRisk.risk > 1.0) {
      factors.push({
        name: 'Family History',
        value: familyRisk.description,
        weight: familyRisk.risk,
        category: 'genetic'
      });
      baseRisk *= familyRisk.risk;
    }

    // Lynch syndrome and FAP genetic testing
    const geneticRisk = this.calculateGeneticRisk(profile.genetic, 'colon');
    if (geneticRisk.risk > 1.0) {
      factors.push({
        name: 'Hereditary Syndromes',
        value: geneticRisk.mutations,
        weight: geneticRisk.risk,
        category: 'genetic'
      });
      baseRisk *= geneticRisk.risk;
    }

    // IBD and other medical conditions
    const medicalRisk = this.calculateMedicalRisk(profile.medical, 'colon');
    if (medicalRisk.risk > 1.0) {
      factors.push({
        name: 'Medical Conditions',
        value: medicalRisk.description,
        weight: medicalRisk.risk,
        category: 'medical'
      });
      baseRisk *= medicalRisk.risk;
    }

    return this.generateRiskAssessment(baseRisk, factors, 'colon', profile);
  }

  async calculateLungCancerRisk(profile: any): Promise<RiskAssessmentResult> {
    const factors: RiskFactor[] = [];
    let baseRisk = this.getAgeBasedLungRisk(profile.demographics.age);

    // Smoking - dominant risk factor
    const smokingRisk = this.calculateSmokingRisk(profile.lifestyle);
    factors.push({
      name: 'Smoking History',
      value: `${profile.lifestyle.smokingStatus}, ${profile.lifestyle.packYears || 0} pack-years`,
      weight: smokingRisk.risk,
      category: 'lifestyle'
    });
    baseRisk *= smokingRisk.risk;

    // Occupational and environmental exposures
    const environmentalRisk = this.calculateEnvironmentalRisk(profile.environmental, 'lung');
    if (environmentalRisk.risk > 1.0) {
      factors.push({
        name: 'Environmental Exposures',
        value: environmentalRisk.description,
        weight: environmentalRisk.risk,
        category: 'environmental'
      });
      baseRisk *= environmentalRisk.risk;
    }

    return this.generateRiskAssessment(baseRisk, factors, 'lung', profile);
  }

  private getAgeBasedBreastRisk(age: number): number {
    // SEER-based lifetime risk adjusted for current age
    if (age < 30) return 0.004;
    if (age < 40) return 0.015;
    if (age < 50) return 0.045;
    if (age < 60) return 0.085;
    if (age < 70) return 0.110;
    return 0.125;
  }

  private getAgeBasedColonRisk(age: number): number {
    if (age < 40) return 0.003;
    if (age < 50) return 0.008;
    if (age < 60) return 0.025;
    if (age < 70) return 0.045;
    return 0.055;
  }

  private getAgeBasedLungRisk(age: number): number {
    if (age < 40) return 0.001;
    if (age < 50) return 0.003;
    if (age < 60) return 0.008;
    if (age < 70) return 0.015;
    return 0.020;
  }

  private calculateFamilyHistoryRisk(familyHistory: any, cancerType: string): { risk: number; description: string } {
    if (!familyHistory) return { risk: 1.0, description: 'No family history provided' };

    let risk = 1.0;
    let description = 'No significant family history';
    
    const firstDegreeCount = familyHistory.firstDegreeRelatives?.filter(
      (rel: any) => rel.cancerType.toLowerCase().includes(cancerType)
    ).length || 0;
    
    const secondDegreeCount = familyHistory.secondDegreeRelatives?.filter(
      (rel: any) => rel.cancerType.toLowerCase().includes(cancerType)
    ).length || 0;

    if (firstDegreeCount > 0) {
      risk *= (1.5 + (firstDegreeCount - 1) * 0.3);
      description = `${firstDegreeCount} first-degree relative(s) with ${cancerType} cancer`;
    }

    if (secondDegreeCount > 0) {
      risk *= (1.2 + (secondDegreeCount - 1) * 0.1);
      if (firstDegreeCount === 0) {
        description = `${secondDegreeCount} second-degree relative(s) with ${cancerType} cancer`;
      }
    }

    return { risk, description };
  }

  private calculateGeneticRisk(genetic: any, cancerType: string): { risk: number; mutations: string[] } {
    if (!genetic?.knownMutations) return { risk: 1.0, mutations: [] };

    let risk = 1.0;
    const mutations: string[] = [];

    genetic.knownMutations.forEach((mutation: any) => {
      if (mutation.pathogenicity === 'pathogenic' || mutation.pathogenicity === 'likely-pathogenic') {
        mutations.push(`${mutation.gene} ${mutation.variant}`);
        
        switch (cancerType) {
          case 'breast':
            if (mutation.gene === 'BRCA1') risk *= 7.0;
            else if (mutation.gene === 'BRCA2') risk *= 4.5;
            else if (mutation.gene === 'TP53') risk *= 8.0;
            else if (mutation.gene === 'PALB2') risk *= 3.5;
            break;
          case 'colon':
            if (['MLH1', 'MSH2', 'MSH6', 'PMS2'].includes(mutation.gene)) risk *= 5.0;
            else if (mutation.gene === 'APC') risk *= 20.0;
            break;
        }
      }
    });

    return { risk, mutations };
  }

  private calculateReproductiveRisk(reproductiveHistory: any): { risk: number; description: string } {
    let risk = 1.0;
    const factors: string[] = [];

    if (reproductiveHistory.menarche && reproductiveHistory.menarche < 12) {
      risk *= 1.2;
      factors.push('early menarche');
    }

    if (reproductiveHistory.menopause && reproductiveHistory.menopause > 55) {
      risk *= 1.3;
      factors.push('late menopause');
    }

    if (reproductiveHistory.pregnancies === 0) {
      risk *= 1.3;
      factors.push('nulliparity');
    }

    if (reproductiveHistory.hormonalTherapy) {
      risk *= 1.2;
      factors.push('hormonal therapy');
    }

    return {
      risk,
      description: factors.length > 0 ? factors.join(', ') : 'No significant reproductive risk factors'
    };
  }

  private calculateMedicalRisk(medical: any, cancerType: string): { risk: number; description: string } {
    if (!medical?.comorbidities) return { risk: 1.0, description: 'No medical conditions' };

    let risk = 1.0;
    const conditions: string[] = [];

    if (cancerType === 'colon') {
      const ibdConditions = medical.comorbidities.filter((condition: string) => 
        condition.toLowerCase().includes('crohn') || 
        condition.toLowerCase().includes('colitis') ||
        condition.toLowerCase().includes('inflammatory bowel')
      );

      if (ibdConditions.length > 0) {
        risk *= 2.5;
        conditions.push(...ibdConditions);
      }
    }

    return {
      risk,
      description: conditions.length > 0 ? conditions.join(', ') : 'No significant medical conditions'
    };
  }

  private calculateSmokingRisk(lifestyle: any): { risk: number; description: string } {
    if (!lifestyle?.smokingStatus || lifestyle.smokingStatus === 'never') {
      return { risk: 1.0, description: 'Never smoker' };
    }

    const packYears = lifestyle.packYears || 0;
    let risk = 1.0;

    if (lifestyle.smokingStatus === 'current') {
      risk = 1.0 + (packYears * 0.1);
    } else if (lifestyle.smokingStatus === 'former') {
      const yearsQuit = lifestyle.yearsQuit || 0;
      const riskReduction = Math.min(0.5, yearsQuit * 0.05);
      risk = (1.0 + (packYears * 0.1)) * (1.0 - riskReduction);
    }

    return {
      risk,
      description: `${lifestyle.smokingStatus} smoker, ${packYears} pack-years`
    };
  }

  private calculateEnvironmentalRisk(environmental: any, cancerType: string): { risk: number; description: string } {
    if (!environmental?.occupationalExposures) return { risk: 1.0, description: 'No exposures' };

    let risk = 1.0;
    const relevantExposures: string[] = [];

    if (cancerType === 'lung') {
      const lungCarcinogens = ['asbestos', 'silica', 'diesel', 'radon', 'chromium'];
      environmental.occupationalExposures.forEach((exposure: string) => {
        if (lungCarcinogens.some(carcinogen => exposure.toLowerCase().includes(carcinogen))) {
          risk *= 1.3;
          relevantExposures.push(exposure);
        }
      });
    }

    return {
      risk,
      description: relevantExposures.length > 0 ? relevantExposures.join(', ') : 'No significant exposures'
    };
  }

  private getAgeWeight(age: number, cancerType: string): number {
    const weights = {
      breast: 0.25,
      colon: 0.20,
      lung: 0.15,
      prostate: 0.30,
      pancreatic: 0.20
    };
    return weights[cancerType as keyof typeof weights] || 0.2;
  }

  private generateRiskAssessment(
    overallRisk: number,
    factors: RiskFactor[],
    cancerType: string,
    profile: any
  ): RiskAssessmentResult {
    const riskCategory = this.categorizeRisk(overallRisk, cancerType);
    const confidence = this.calculateConfidence(factors, profile);
    const recommendations = this.generateRecommendations(riskCategory, cancerType);
    const uncertaintyFactors = this.identifyUncertaintyFactors(profile);
    const nextAssessment = this.calculateNextAssessmentDate(riskCategory, profile.demographics.age);

    return {
      overallRisk,
      riskCategory,
      confidence,
      contributingFactors: factors,
      recommendations,
      nextAssessment,
      uncertaintyFactors,
      calculatedAt: new Date().toISOString(),
      version: this.version
    };
  }

  private categorizeRisk(risk: number, cancerType: string): 'low' | 'moderate' | 'high' | 'very-high' {
    const thresholds = {
      breast: { moderate: 0.1, high: 0.2, veryHigh: 0.4 },
      colon: { moderate: 0.05, high: 0.15, veryHigh: 0.3 },
      lung: { moderate: 0.02, high: 0.08, veryHigh: 0.2 }
    };

    const threshold = thresholds[cancerType as keyof typeof thresholds] || thresholds.breast;

    if (risk >= threshold.veryHigh) return 'very-high';
    if (risk >= threshold.high) return 'high';
    if (risk >= threshold.moderate) return 'moderate';
    return 'low';
  }

  private calculateConfidence(factors: RiskFactor[], profile: any): number {
    let confidence = 85;

    if (!profile.familyHistory?.firstDegreeRelatives?.length) confidence -= 10;
    if (!profile.genetic?.knownMutations?.length && factors.some(f => f.category === 'genetic')) confidence -= 15;
    if (profile.genetic?.knownMutations?.length) confidence += 5;

    return Math.max(50, Math.min(95, confidence));
  }

  private generateRecommendations(riskCategory: string, cancerType: string): string[] {
    const recommendations: string[] = [];

    switch (riskCategory) {
      case 'low':
        recommendations.push(`Standard ${cancerType} cancer screening per NCCN guidelines`);
        break;
      case 'moderate':
        recommendations.push(`Enhanced ${cancerType} cancer screening consideration`);
        recommendations.push('Genetic counseling evaluation');
        break;
      case 'high':
        recommendations.push(`High-risk ${cancerType} cancer screening protocol`);
        recommendations.push('Genetic counseling referral required');
        recommendations.push('Annual specialist consultation');
        break;
      case 'very-high':
        recommendations.push(`Intensive ${cancerType} cancer surveillance`);
        recommendations.push('Immediate genetic counseling');
        recommendations.push('Consider risk-reducing interventions');
        recommendations.push('Multidisciplinary team evaluation');
        break;
    }

    return recommendations;
  }

  private identifyUncertaintyFactors(profile: any): string[] {
    const uncertainties: string[] = [];

    if (!profile.familyHistory?.firstDegreeRelatives?.length) {
      uncertainties.push('Incomplete family history');
    }
    if (!profile.genetic?.knownMutations?.length) {
      uncertainties.push('No genetic testing performed');
    }

    return uncertainties;
  }

  private calculateNextAssessmentDate(riskCategory: string, age: number): Date {
    const nextDate = new Date();
    
    switch (riskCategory) {
      case 'low': nextDate.setFullYear(nextDate.getFullYear() + 3); break;
      case 'moderate': nextDate.setFullYear(nextDate.getFullYear() + 2); break;
      case 'high':
      case 'very-high': nextDate.setFullYear(nextDate.getFullYear() + 1); break;
    }

    if (age > 65) nextDate.setFullYear(nextDate.getFullYear() - 1);

    return nextDate;
  }
}

const riskEngine = new ServerRiskCalculationEngine();

export async function calculateRiskAssessment(req: Request, res: Response) {
  try {
    const { patientProfile, cancerType, forceRecalculation } = RiskCalculationRequestSchema.parse(req.body);

    // Check cache first unless force recalculation is requested
    if (!forceRecalculation) {
      const cachedResult = await cacheService.getCachedRiskAssessment(patientProfile, cancerType);
      if (cachedResult) {
        return res.json({
          success: true,
          data: { ...cachedResult, fromCache: true }
        });
      }
    }

    // Calculate risk assessment
    let result: RiskAssessmentResult;
    
    switch (cancerType) {
      case 'breast':
        result = await riskEngine.calculateBreastCancerRisk(patientProfile);
        break;
      case 'colon':
        result = await riskEngine.calculateColonCancerRisk(patientProfile);
        break;
      case 'lung':
        result = await riskEngine.calculateLungCancerRisk(patientProfile);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: `Unsupported cancer type: ${cancerType}`
        });
    }

    // Cache the result
    await cacheService.cacheRiskAssessment(patientProfile, cancerType, result);

    res.json({
      success: true,
      data: { ...result, fromCache: false }
    });

  } catch (error) {
    console.error('Risk calculation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof z.ZodError ? 'Invalid input data' : 'Risk calculation failed'
    });
  }
}

export async function getCacheStats(req: Request, res: Response) {
  try {
    const stats = cacheService.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve cache statistics'
    });
  }
}