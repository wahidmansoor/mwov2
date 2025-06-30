/**
 * Dynamic Risk Calculation Engine for OPD Module
 * Implements cancer-specific risk algorithms with adaptive weighting
 */

export interface RiskFactor {
  name: string;
  value: any;
  weight: number;
  category: 'demographic' | 'genetic' | 'lifestyle' | 'medical' | 'environmental';
}

export interface RiskAssessmentResult {
  overallRisk: number;
  riskCategory: 'low' | 'moderate' | 'high' | 'very-high';
  confidence: number;
  contributingFactors: RiskFactor[];
  recommendations: string[];
  nextAssessment: Date;
  uncertaintyFactors: string[];
}

export interface PatientProfile {
  demographics: {
    age: number;
    gender: 'male' | 'female' | 'other';
    race: string;
    ethnicity: string;
  };
  familyHistory: {
    firstDegreeRelatives: Array<{
      relation: string;
      cancerType: string;
      ageAtDiagnosis: number;
    }>;
    secondDegreeRelatives: Array<{
      relation: string;
      cancerType: string;
      ageAtDiagnosis: number;
    }>;
    consanguinity: boolean;
  };
  personalHistory: {
    priorCancers: Array<{
      type: string;
      stage: string;
      treatment: string;
      yearDiagnosed: number;
    }>;
    benignConditions: string[];
    surgicalHistory: string[];
  };
  lifestyle: {
    smokingStatus: 'never' | 'former' | 'current';
    packYears?: number;
    yearsQuit?: number;
    alcoholUse: 'none' | 'light' | 'moderate' | 'heavy';
    physicalActivity: 'sedentary' | 'low' | 'moderate' | 'high';
    diet: 'poor' | 'average' | 'good' | 'excellent';
    bmi: number;
  };
  medical: {
    reproductiveHistory?: {
      menarche: number;
      menopause?: number;
      pregnancies: number;
      breastfeeding: boolean;
      hormonalTherapy: boolean;
    };
    comorbidities: string[];
    medications: string[];
    immunosuppression: boolean;
  };
  environmental: {
    occupationalExposures: string[];
    radiationExposure: boolean;
    chemicalExposures: string[];
    geographicFactors: string[];
  };
  genetic: {
    knownMutations: Array<{
      gene: string;
      variant: string;
      pathogenicity: 'pathogenic' | 'likely-pathogenic' | 'vus' | 'benign';
    }>;
    polygeneticRiskScore?: number;
  };
}

export class RiskCalculationEngine {
  private cancerTypeWeights: Record<string, Record<string, number>> = {
    breast: {
      age: 0.25,
      familyHistory: 0.30,
      genetic: 0.35,
      reproductive: 0.15,
      lifestyle: 0.10,
      environmental: 0.05
    },
    colon: {
      age: 0.20,
      familyHistory: 0.35,
      genetic: 0.30,
      lifestyle: 0.20,
      inflammatory: 0.15,
      environmental: 0.05
    },
    lung: {
      smoking: 0.60,
      age: 0.15,
      familyHistory: 0.10,
      occupational: 0.10,
      radon: 0.05
    },
    prostate: {
      age: 0.30,
      race: 0.25,
      familyHistory: 0.25,
      genetic: 0.15,
      lifestyle: 0.05
    },
    pancreatic: {
      familyHistory: 0.40,
      genetic: 0.35,
      smoking: 0.15,
      diabetes: 0.10,
      pancreatitis: 0.10
    }
  };

  calculateBreastCancerRisk(profile: PatientProfile): RiskAssessmentResult {
    const factors: RiskFactor[] = [];
    let baseRisk = this.getAgeBasedBreastRisk(profile.demographics.age);

    // Age factor
    factors.push({
      name: 'Age',
      value: profile.demographics.age,
      weight: this.getAgeWeight(profile.demographics.age, 'breast'),
      category: 'demographic'
    });

    // Family history assessment
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

    // Genetic factors
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

    // Reproductive factors
    if (profile.medical.reproductiveHistory) {
      const reproductiveRisk = this.calculateReproductiveRisk(profile.medical.reproductiveHistory);
      factors.push({
        name: 'Reproductive Factors',
        value: reproductiveRisk.description,
        weight: reproductiveRisk.risk,
        category: 'medical'
      });
      baseRisk *= reproductiveRisk.risk;
    }

    // Lifestyle factors
    const lifestyleRisk = this.calculateLifestyleRisk(profile.lifestyle, 'breast');
    if (Math.abs(lifestyleRisk.risk - 1.0) > 0.1) {
      factors.push({
        name: 'Lifestyle Factors',
        value: lifestyleRisk.description,
        weight: lifestyleRisk.risk,
        category: 'lifestyle'
      });
      baseRisk *= lifestyleRisk.risk;
    }

    return this.generateRiskAssessment(baseRisk, factors, 'breast', profile);
  }

  calculateColonCancerRisk(profile: PatientProfile): RiskAssessmentResult {
    const factors: RiskFactor[] = [];
    let baseRisk = this.getAgeBasedColonRisk(profile.demographics.age);

    // Age factor
    factors.push({
      name: 'Age',
      value: profile.demographics.age,
      weight: this.getAgeWeight(profile.demographics.age, 'colon'),
      category: 'demographic'
    });

    // Family history - particularly important for colon cancer
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

    // Lynch syndrome and other genetic factors
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

    // Inflammatory bowel disease
    const ibdRisk = this.calculateIBDRisk(profile.medical.comorbidities);
    if (ibdRisk.risk > 1.0) {
      factors.push({
        name: 'Inflammatory Bowel Disease',
        value: ibdRisk.description,
        weight: ibdRisk.risk,
        category: 'medical'
      });
      baseRisk *= ibdRisk.risk;
    }

    // Lifestyle factors (diet, smoking, alcohol)
    const lifestyleRisk = this.calculateLifestyleRisk(profile.lifestyle, 'colon');
    if (Math.abs(lifestyleRisk.risk - 1.0) > 0.1) {
      factors.push({
        name: 'Lifestyle Factors',
        value: lifestyleRisk.description,
        weight: lifestyleRisk.risk,
        category: 'lifestyle'
      });
      baseRisk *= lifestyleRisk.risk;
    }

    return this.generateRiskAssessment(baseRisk, factors, 'colon', profile);
  }

  calculateLungCancerRisk(profile: PatientProfile): RiskAssessmentResult {
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

    // Age factor
    factors.push({
      name: 'Age',
      value: profile.demographics.age,
      weight: this.getAgeWeight(profile.demographics.age, 'lung'),
      category: 'demographic'
    });

    // Family history
    const familyRisk = this.calculateFamilyHistoryRisk(profile.familyHistory, 'lung');
    if (familyRisk.risk > 1.0) {
      factors.push({
        name: 'Family History',
        value: familyRisk.description,
        weight: familyRisk.risk,
        category: 'genetic'
      });
      baseRisk *= familyRisk.risk;
    }

    // Occupational exposures
    const occupationalRisk = this.calculateOccupationalRisk(profile.environmental.occupationalExposures, 'lung');
    if (occupationalRisk.risk > 1.0) {
      factors.push({
        name: 'Occupational Exposures',
        value: occupationalRisk.description,
        weight: occupationalRisk.risk,
        category: 'environmental'
      });
      baseRisk *= occupationalRisk.risk;
    }

    return this.generateRiskAssessment(baseRisk, factors, 'lung', profile);
  }

  private getAgeBasedBreastRisk(age: number): number {
    // Based on SEER data - lifetime risk adjusted for current age
    if (age < 30) return 0.004;
    if (age < 40) return 0.015;
    if (age < 50) return 0.045;
    if (age < 60) return 0.085;
    if (age < 70) return 0.110;
    return 0.125;
  }

  private getAgeBasedColonRisk(age: number): number {
    // Age-adjusted colorectal cancer risk
    if (age < 40) return 0.003;
    if (age < 50) return 0.008;
    if (age < 60) return 0.025;
    if (age < 70) return 0.045;
    return 0.055;
  }

  private getAgeBasedLungRisk(age: number): number {
    // Baseline lung cancer risk by age (non-smokers)
    if (age < 40) return 0.001;
    if (age < 50) return 0.003;
    if (age < 60) return 0.008;
    if (age < 70) return 0.015;
    return 0.020;
  }

  private calculateFamilyHistoryRisk(familyHistory: any, cancerType: string): { risk: number; description: string } {
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
      } else {
        description += `, ${secondDegreeCount} second-degree relative(s)`;
      }
    }

    return { risk, description };
  }

  private calculateGeneticRisk(genetic: any, cancerType: string): { risk: number; mutations: string[] } {
    let risk = 1.0;
    const mutations: string[] = [];

    genetic.knownMutations?.forEach((mutation: any) => {
      if (mutation.pathogenicity === 'pathogenic' || mutation.pathogenicity === 'likely-pathogenic') {
        mutations.push(`${mutation.gene} ${mutation.variant}`);
        
        // Cancer-specific genetic risk multipliers
        switch (cancerType) {
          case 'breast':
            if (mutation.gene === 'BRCA1') risk *= 7.0;
            else if (mutation.gene === 'BRCA2') risk *= 4.5;
            else if (mutation.gene === 'TP53') risk *= 8.0;
            else if (mutation.gene === 'PALB2') risk *= 3.5;
            else if (mutation.gene === 'CHEK2') risk *= 2.0;
            break;
          case 'colon':
            if (['MLH1', 'MSH2', 'MSH6', 'PMS2'].includes(mutation.gene)) risk *= 5.0;
            else if (mutation.gene === 'APC') risk *= 20.0;
            else if (mutation.gene === 'MUTYH') risk *= 3.0;
            break;
          case 'lung':
            if (mutation.gene === 'EGFR') risk *= 2.0;
            break;
        }
      }
    });

    return { risk, mutations };
  }

  private calculateReproductiveRisk(reproductiveHistory: any): { risk: number; description: string } {
    let risk = 1.0;
    const factors: string[] = [];

    // Early menarche
    if (reproductiveHistory.menarche < 12) {
      risk *= 1.2;
      factors.push('early menarche');
    }

    // Late menopause
    if (reproductiveHistory.menopause && reproductiveHistory.menopause > 55) {
      risk *= 1.3;
      factors.push('late menopause');
    }

    // Nulliparity
    if (reproductiveHistory.pregnancies === 0) {
      risk *= 1.3;
      factors.push('nulliparity');
    }

    // Late first pregnancy
    if (reproductiveHistory.pregnancies > 0 && reproductiveHistory.pregnancies < 30) {
      risk *= 1.1;
      factors.push('late first pregnancy');
    }

    // Hormonal therapy
    if (reproductiveHistory.hormonalTherapy) {
      risk *= 1.2;
      factors.push('hormonal therapy');
    }

    // Breastfeeding (protective)
    if (reproductiveHistory.breastfeeding && reproductiveHistory.pregnancies > 0) {
      risk *= 0.9;
      factors.push('breastfeeding (protective)');
    }

    return {
      risk,
      description: factors.length > 0 ? factors.join(', ') : 'No significant reproductive risk factors'
    };
  }

  private calculateLifestyleRisk(lifestyle: any, cancerType: string): { risk: number; description: string } {
    let risk = 1.0;
    const factors: string[] = [];

    // BMI effects
    if (lifestyle.bmi > 30) {
      if (cancerType === 'breast') {
        risk *= 1.2;
        factors.push('obesity');
      } else if (cancerType === 'colon') {
        risk *= 1.5;
        factors.push('obesity');
      }
    }

    // Alcohol consumption
    if (lifestyle.alcoholUse === 'moderate' || lifestyle.alcoholUse === 'heavy') {
      if (cancerType === 'breast') {
        risk *= 1.1;
        factors.push('alcohol consumption');
      } else if (cancerType === 'colon') {
        risk *= 1.2;
        factors.push('alcohol consumption');
      }
    }

    // Physical activity (protective)
    if (lifestyle.physicalActivity === 'high') {
      risk *= 0.9;
      factors.push('high physical activity (protective)');
    }

    // Diet quality
    if (lifestyle.diet === 'poor' && cancerType === 'colon') {
      risk *= 1.1;
      factors.push('poor diet');
    }

    return {
      risk,
      description: factors.length > 0 ? factors.join(', ') : 'No significant lifestyle risk factors'
    };
  }

  private calculateSmokingRisk(lifestyle: any): { risk: number; description: string } {
    if (lifestyle.smokingStatus === 'never') {
      return { risk: 1.0, description: 'Never smoker' };
    }

    const packYears = lifestyle.packYears || 0;
    let risk = 1.0;

    if (lifestyle.smokingStatus === 'current') {
      risk = 1.0 + (packYears * 0.1); // Simplified model
    } else if (lifestyle.smokingStatus === 'former') {
      const yearsQuit = lifestyle.yearsQuit || 0;
      const riskReduction = Math.min(0.5, yearsQuit * 0.05);
      risk = (1.0 + (packYears * 0.1)) * (1.0 - riskReduction);
    }

    return {
      risk,
      description: `${lifestyle.smokingStatus} smoker, ${packYears} pack-years${
        lifestyle.smokingStatus === 'former' ? `, quit ${lifestyle.yearsQuit} years ago` : ''
      }`
    };
  }

  private calculateIBDRisk(comorbidities: string[]): { risk: number; description: string } {
    const ibdConditions = comorbidities.filter(condition => 
      condition.toLowerCase().includes('crohn') || 
      condition.toLowerCase().includes('colitis') ||
      condition.toLowerCase().includes('inflammatory bowel')
    );

    if (ibdConditions.length > 0) {
      return { risk: 2.5, description: ibdConditions.join(', ') };
    }

    return { risk: 1.0, description: 'No inflammatory bowel disease' };
  }

  private calculateOccupationalRisk(exposures: string[], cancerType: string): { risk: number; description: string } {
    let risk = 1.0;
    const relevantExposures: string[] = [];

    if (cancerType === 'lung') {
      const lungCarcinogens = ['asbestos', 'silica', 'diesel', 'radon', 'chromium', 'nickel'];
      exposures.forEach(exposure => {
        if (lungCarcinogens.some(carcinogen => exposure.toLowerCase().includes(carcinogen))) {
          risk *= 1.3;
          relevantExposures.push(exposure);
        }
      });
    }

    return {
      risk,
      description: relevantExposures.length > 0 ? relevantExposures.join(', ') : 'No significant occupational exposures'
    };
  }

  private getAgeWeight(age: number, cancerType: string): number {
    const weights = this.cancerTypeWeights[cancerType];
    return weights?.age || 0.2;
  }

  private generateRiskAssessment(
    overallRisk: number,
    factors: RiskFactor[],
    cancerType: string,
    profile: PatientProfile
  ): RiskAssessmentResult {
    const riskCategory = this.categorizeRisk(overallRisk, cancerType);
    const confidence = this.calculateConfidence(factors, profile);
    const recommendations = this.generateRecommendations(riskCategory, cancerType, factors);
    const uncertaintyFactors = this.identifyUncertaintyFactors(factors, profile);
    const nextAssessment = this.calculateNextAssessmentDate(riskCategory, profile.demographics.age);

    return {
      overallRisk,
      riskCategory,
      confidence,
      contributingFactors: factors,
      recommendations,
      nextAssessment,
      uncertaintyFactors
    };
  }

  private categorizeRisk(risk: number, cancerType: string): 'low' | 'moderate' | 'high' | 'very-high' {
    // Cancer-specific risk thresholds
    const thresholds = {
      breast: { moderate: 0.1, high: 0.2, veryHigh: 0.4 },
      colon: { moderate: 0.05, high: 0.15, veryHigh: 0.3 },
      lung: { moderate: 0.02, high: 0.08, veryHigh: 0.2 },
      prostate: { moderate: 0.08, high: 0.18, veryHigh: 0.35 }
    };

    const threshold = thresholds[cancerType as keyof typeof thresholds] || thresholds.breast;

    if (risk >= threshold.veryHigh) return 'very-high';
    if (risk >= threshold.high) return 'high';
    if (risk >= threshold.moderate) return 'moderate';
    return 'low';
  }

  private calculateConfidence(factors: RiskFactor[], profile: PatientProfile): number {
    let confidence = 85; // Base confidence

    // Reduce confidence for missing key data
    if (!profile.familyHistory.firstDegreeRelatives?.length) confidence -= 10;
    if (!profile.genetic.knownMutations?.length && factors.some(f => f.category === 'genetic')) confidence -= 15;
    if (!profile.lifestyle.smokingStatus) confidence -= 5;

    // Increase confidence for comprehensive data
    if (profile.genetic.knownMutations?.length && profile.genetic.knownMutations.length > 0) confidence += 5;
    if (profile.familyHistory.firstDegreeRelatives?.length && profile.familyHistory.firstDegreeRelatives.length > 0) confidence += 5;

    return Math.max(50, Math.min(95, confidence));
  }

  private generateRecommendations(
    riskCategory: string,
    cancerType: string,
    factors: RiskFactor[]
  ): string[] {
    const recommendations: string[] = [];

    switch (riskCategory) {
      case 'low':
        recommendations.push(`Standard ${cancerType} cancer screening per NCCN guidelines`);
        break;
      case 'moderate':
        recommendations.push(`Enhanced ${cancerType} cancer screening consideration`);
        recommendations.push('Discuss with oncology specialist');
        break;
      case 'high':
        recommendations.push(`High-risk ${cancerType} cancer screening protocol`);
        recommendations.push('Genetic counseling referral');
        recommendations.push('Annual specialist consultation');
        break;
      case 'very-high':
        recommendations.push(`Intensive ${cancerType} cancer surveillance`);
        recommendations.push('Immediate genetic counseling');
        recommendations.push('Consider risk-reducing interventions');
        recommendations.push('Multidisciplinary team evaluation');
        break;
    }

    // Add factor-specific recommendations
    factors.forEach(factor => {
      if (factor.category === 'lifestyle' && factor.weight > 1.1) {
        recommendations.push('Lifestyle modification counseling');
      }
      if (factor.category === 'genetic' && factor.weight > 2.0) {
        recommendations.push('Family cascade genetic testing');
      }
    });

    return recommendations;
  }

  private identifyUncertaintyFactors(factors: RiskFactor[], profile: PatientProfile): string[] {
    const uncertainties: string[] = [];

    if (!profile.familyHistory.firstDegreeRelatives?.length) {
      uncertainties.push('Incomplete family history');
    }

    if (!profile.genetic.knownMutations?.length) {
      uncertainties.push('No genetic testing performed');
    }

    if (factors.some(f => f.category === 'environmental' && f.weight > 1.2)) {
      uncertainties.push('Environmental exposure assessment needed');
    }

    return uncertainties;
  }

  private calculateNextAssessmentDate(riskCategory: string, age: number): Date {
    const nextDate = new Date();
    
    switch (riskCategory) {
      case 'low':
        nextDate.setFullYear(nextDate.getFullYear() + 3);
        break;
      case 'moderate':
        nextDate.setFullYear(nextDate.getFullYear() + 2);
        break;
      case 'high':
      case 'very-high':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    // Adjust for age - older patients need more frequent assessment
    if (age > 65) {
      nextDate.setFullYear(nextDate.getFullYear() - 1);
    }

    return nextDate;
  }
}