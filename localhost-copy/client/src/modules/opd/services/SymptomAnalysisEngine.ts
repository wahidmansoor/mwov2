/**
 * Advanced Symptom Analysis Engine for OPD Module
 * Implements symptom severity scoring, temporal pattern recognition, and red flag detection
 */

export interface SymptomData {
  name: string;
  severity: number; // 0-10 scale
  duration: string; // e.g., "2 weeks", "6 months"
  onset: 'acute' | 'subacute' | 'chronic' | 'intermittent';
  progression: 'stable' | 'improving' | 'worsening' | 'fluctuating';
  qualityDescriptors: string[];
  associatedSymptoms: string[];
  alleviatingFactors: string[];
  aggravatingFactors: string[];
  functionalImpact: number; // 0-10 scale
  frequency: 'constant' | 'daily' | 'weekly' | 'monthly' | 'sporadic';
}

export interface SymptomCluster {
  primarySymptom: string;
  relatedSymptoms: string[];
  suspectedConditions: string[];
  urgencyScore: number;
  confidenceLevel: number;
}

export interface RedFlagAssessment {
  hasRedFlags: boolean;
  redFlagSymptoms: string[];
  urgencyLevel: 'routine' | 'urgent' | 'emergent';
  recommendedAction: string;
  timeFrame: string;
  specialistReferral?: string;
}

export interface SymptomAnalysisResult {
  symptomClusters: SymptomCluster[];
  redFlagAssessment: RedFlagAssessment;
  differentialDiagnosis: Array<{
    condition: string;
    probability: number;
    supportingSymptoms: string[];
    cancerType?: string;
  }>;
  recommendedWorkup: string[];
  urgencyScore: number;
  followUpRecommendations: string[];
}

export class SymptomAnalysisEngine {
  private redFlagCriteria = {
    general: [
      'unintentional weight loss >10 lbs',
      'night sweats',
      'fever of unknown origin',
      'fatigue with functional decline',
      'new onset pain in elderly'
    ],
    gastrointestinal: [
      'rectal bleeding',
      'melena',
      'hematemesis',
      'dysphagia',
      'early satiety with weight loss',
      'abdominal mass',
      'bowel obstruction',
      'jaundice',
      'new onset constipation >50 years'
    ],
    respiratory: [
      'hemoptysis',
      'new persistent cough >3 weeks',
      'dyspnea at rest',
      'chest pain with weight loss',
      'hoarseness >2 weeks',
      'superior vena cava syndrome'
    ],
    genitourinary: [
      'gross hematuria',
      'testicular mass',
      'pelvic mass',
      'postmenopausal bleeding',
      'urinary retention'
    ],
    neurological: [
      'new onset headache >50 years',
      'focal neurological deficits',
      'seizures new onset',
      'altered mental status',
      'papilledema'
    ],
    musculoskeletal: [
      'bone pain at night',
      'pathological fracture',
      'back pain with neurological symptoms',
      'new bone pain >50 years'
    ],
    dermatological: [
      'changing mole',
      'non-healing ulcer',
      'new pigmented lesion',
      'lymphadenopathy >1cm'
    ]
  };

  private symptomCancerAssociations: Record<string, string[]> = {
    'unintentional weight loss': ['pancreatic', 'gastric', 'lung', 'colorectal', 'hematologic'],
    'abdominal pain': ['pancreatic', 'gastric', 'colorectal', 'hepatic', 'ovarian'],
    'dysphagia': ['esophageal', 'gastric', 'head and neck'],
    'hemoptysis': ['lung', 'head and neck'],
    'rectal bleeding': ['colorectal', 'anal'],
    'postmenopausal bleeding': ['endometrial', 'cervical', 'ovarian'],
    'breast lump': ['breast'],
    'testicular mass': ['testicular'],
    'hoarseness': ['laryngeal', 'lung', 'thyroid'],
    'bone pain': ['bone', 'metastatic disease'],
    'lymphadenopathy': ['hematologic', 'metastatic disease'],
    'fatigue': ['hematologic', 'advanced solid tumors'],
    'night sweats': ['hematologic'],
    'fever of unknown origin': ['hematologic', 'advanced solid tumors']
  };

  analyzeSymptoms(symptoms: SymptomData[]): SymptomAnalysisResult {
    const symptomClusters = this.identifySymptomClusters(symptoms);
    const redFlagAssessment = this.assessRedFlags(symptoms);
    const differentialDiagnosis = this.generateDifferentialDiagnosis(symptoms, symptomClusters);
    const urgencyScore = this.calculateUrgencyScore(symptoms, redFlagAssessment);
    const recommendedWorkup = this.generateWorkupRecommendations(differentialDiagnosis, symptoms);
    const followUpRecommendations = this.generateFollowUpRecommendations(urgencyScore, symptoms);

    return {
      symptomClusters,
      redFlagAssessment,
      differentialDiagnosis,
      recommendedWorkup,
      urgencyScore,
      followUpRecommendations
    };
  }

  private identifySymptomClusters(symptoms: SymptomData[]): SymptomCluster[] {
    const clusters: SymptomCluster[] = [];

    // Gastrointestinal cluster
    const giSymptoms = symptoms.filter(s => 
      ['abdominal pain', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'bloating', 
       'rectal bleeding', 'melena', 'early satiety', 'dysphagia'].includes(s.name.toLowerCase())
    );

    if (giSymptoms.length >= 2) {
      clusters.push({
        primarySymptom: giSymptoms[0].name,
        relatedSymptoms: giSymptoms.slice(1).map(s => s.name),
        suspectedConditions: ['colorectal cancer', 'gastric cancer', 'pancreatic cancer'],
        urgencyScore: this.calculateClusterUrgency(giSymptoms),
        confidenceLevel: this.calculateClusterConfidence(giSymptoms)
      });
    }

    // Respiratory cluster
    const respSymptoms = symptoms.filter(s => 
      ['cough', 'dyspnea', 'chest pain', 'hemoptysis', 'hoarseness', 'wheezing'].includes(s.name.toLowerCase())
    );

    if (respSymptoms.length >= 2) {
      clusters.push({
        primarySymptom: respSymptoms[0].name,
        relatedSymptoms: respSymptoms.slice(1).map(s => s.name),
        suspectedConditions: ['lung cancer', 'mesothelioma', 'head and neck cancer'],
        urgencyScore: this.calculateClusterUrgency(respSymptoms),
        confidenceLevel: this.calculateClusterConfidence(respSymptoms)
      });
    }

    // Constitutional symptoms cluster
    const constitutionalSymptoms = symptoms.filter(s => 
      ['weight loss', 'fatigue', 'night sweats', 'fever', 'loss of appetite'].includes(s.name.toLowerCase())
    );

    if (constitutionalSymptoms.length >= 2) {
      clusters.push({
        primarySymptom: 'constitutional symptoms',
        relatedSymptoms: constitutionalSymptoms.map(s => s.name),
        suspectedConditions: ['hematologic malignancy', 'advanced solid tumor', 'metastatic disease'],
        urgencyScore: this.calculateClusterUrgency(constitutionalSymptoms),
        confidenceLevel: this.calculateClusterConfidence(constitutionalSymptoms)
      });
    }

    // Neurological cluster
    const neuroSymptoms = symptoms.filter(s => 
      ['headache', 'seizures', 'weakness', 'numbness', 'confusion', 'vision changes'].includes(s.name.toLowerCase())
    );

    if (neuroSymptoms.length >= 2) {
      clusters.push({
        primarySymptom: neuroSymptoms[0].name,
        relatedSymptoms: neuroSymptoms.slice(1).map(s => s.name),
        suspectedConditions: ['brain tumor', 'metastatic disease', 'paraneoplastic syndrome'],
        urgencyScore: this.calculateClusterUrgency(neuroSymptoms),
        confidenceLevel: this.calculateClusterConfidence(neuroSymptoms)
      });
    }

    return clusters;
  }

  private assessRedFlags(symptoms: SymptomData[]): RedFlagAssessment {
    const redFlagSymptoms: string[] = [];
    let maxUrgency = 'routine' as 'routine' | 'urgent' | 'emergent';

    symptoms.forEach(symptom => {
      // Check each red flag category
      Object.values(this.redFlagCriteria).flat().forEach(redFlag => {
        if (this.symptomMatchesRedFlag(symptom, redFlag)) {
          redFlagSymptoms.push(symptom.name);
          
          // Assess urgency based on symptom characteristics
          if (this.isEmergentSymptom(symptom, redFlag)) {
            maxUrgency = 'emergent';
          } else if (this.isUrgentSymptom(symptom, redFlag) && maxUrgency !== 'emergent') {
            maxUrgency = 'urgent';
          }
        }
      });
    });

    const hasRedFlags = redFlagSymptoms.length > 0;
    
    return {
      hasRedFlags,
      redFlagSymptoms: Array.from(new Set(redFlagSymptoms)), // Remove duplicates
      urgencyLevel: maxUrgency,
      recommendedAction: this.getRecommendedAction(maxUrgency, redFlagSymptoms),
      timeFrame: this.getTimeFrame(maxUrgency),
      specialistReferral: this.getSpecialistReferral(redFlagSymptoms)
    };
  }

  private symptomMatchesRedFlag(symptom: SymptomData, redFlag: string): boolean {
    const symptomName = symptom.name.toLowerCase();
    const redFlagLower = redFlag.toLowerCase();

    // Direct matching
    if (redFlagLower.includes(symptomName) || symptomName.includes(redFlagLower.split(' ')[0])) {
      // Additional criteria for specific red flags
      if (redFlag.includes('weight loss') && symptom.severity >= 6) return true;
      if (redFlag.includes('pain') && symptom.severity >= 7) return true;
      if (redFlag.includes('cough') && symptom.duration.includes('week')) return true;
      if (redFlag.includes('headache') && symptom.onset === 'acute') return true;
      
      return true;
    }

    return false;
  }

  private isEmergentSymptom(symptom: SymptomData, redFlag: string): boolean {
    const emergentFlags = [
      'hematemesis', 'severe abdominal pain', 'acute neurological deficit',
      'superior vena cava syndrome', 'tumor lysis syndrome', 'spinal cord compression'
    ];
    
    return emergentFlags.some(flag => redFlag.toLowerCase().includes(flag)) &&
           symptom.severity >= 8;
  }

  private isUrgentSymptom(symptom: SymptomData, redFlag: string): boolean {
    const urgentFlags = [
      'hemoptysis', 'rectal bleeding', 'postmenopausal bleeding',
      'testicular mass', 'breast lump', 'lymphadenopathy'
    ];
    
    return urgentFlags.some(flag => redFlag.toLowerCase().includes(flag)) ||
           (symptom.severity >= 6 && symptom.progression === 'worsening');
  }

  private generateDifferentialDiagnosis(
    symptoms: SymptomData[], 
    clusters: SymptomCluster[]
  ): Array<{condition: string; probability: number; supportingSymptoms: string[]; cancerType?: string}> {
    const differentials: Array<{condition: string; probability: number; supportingSymptoms: string[]; cancerType?: string}> = [];
    const processedConditions = new Set<string>();

    // Analyze individual symptoms
    symptoms.forEach(symptom => {
      const associations = this.symptomCancerAssociations[symptom.name.toLowerCase()] || [];
      
      associations.forEach(cancerType => {
        if (!processedConditions.has(cancerType)) {
          const probability = this.calculateConditionProbability(cancerType, symptoms);
          const supportingSymptoms = this.getSupportingSymptoms(cancerType, symptoms);
          
          differentials.push({
            condition: `${cancerType} cancer`,
            probability,
            supportingSymptoms,
            cancerType
          });
          
          processedConditions.add(cancerType);
        }
      });
    });

    // Analyze symptom clusters
    clusters.forEach(cluster => {
      cluster.suspectedConditions.forEach(condition => {
        if (!processedConditions.has(condition)) {
          const probability = this.calculateClusterBasedProbability(cluster, symptoms);
          const supportingSymptoms = [cluster.primarySymptom, ...cluster.relatedSymptoms];
          
          differentials.push({
            condition,
            probability,
            supportingSymptoms
          });
          
          processedConditions.add(condition);
        }
      });
    });

    // Sort by probability and return top candidates
    return differentials
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 8); // Top 8 differential diagnoses
  }

  private calculateConditionProbability(cancerType: string, symptoms: SymptomData[]): number {
    let probability = 0;
    let relevantSymptoms = 0;

    symptoms.forEach(symptom => {
      const associations = this.symptomCancerAssociations[symptom.name.toLowerCase()] || [];
      
      if (associations.includes(cancerType)) {
        relevantSymptoms++;
        
        // Weight by symptom severity and progression
        let weight = symptom.severity / 10;
        if (symptom.progression === 'worsening') weight *= 1.5;
        if (symptom.onset === 'acute') weight *= 1.2;
        if (symptom.functionalImpact >= 7) weight *= 1.3;
        
        probability += weight;
      }
    });

    // Normalize probability
    if (relevantSymptoms > 0) {
      probability = (probability / relevantSymptoms) * 100;
    }

    return Math.min(95, Math.max(5, probability));
  }

  private getSupportingSymptoms(cancerType: string, symptoms: SymptomData[]): string[] {
    return symptoms
      .filter(symptom => {
        const associations = this.symptomCancerAssociations[symptom.name.toLowerCase()] || [];
        return associations.includes(cancerType);
      })
      .map(symptom => symptom.name);
  }

  private calculateClusterBasedProbability(cluster: SymptomCluster, symptoms: SymptomData[]): number {
    const clusterSymptoms = symptoms.filter(s => 
      [cluster.primarySymptom, ...cluster.relatedSymptoms].includes(s.name)
    );

    const avgSeverity = clusterSymptoms.reduce((sum, s) => sum + s.severity, 0) / clusterSymptoms.length;
    const worseningCount = clusterSymptoms.filter(s => s.progression === 'worsening').length;
    
    let probability = (avgSeverity / 10) * 60; // Base probability from severity
    probability += (worseningCount / clusterSymptoms.length) * 20; // Progression weight
    probability += cluster.urgencyScore * 0.2; // Urgency contribution
    
    return Math.min(90, Math.max(10, probability));
  }

  private calculateClusterUrgency(symptoms: SymptomData[]): number {
    const avgSeverity = symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length;
    const worseningCount = symptoms.filter(s => s.progression === 'worsening').length;
    const functionalImpact = symptoms.reduce((sum, s) => sum + s.functionalImpact, 0) / symptoms.length;
    
    return Math.min(10, (avgSeverity + (worseningCount * 2) + functionalImpact) / 3);
  }

  private calculateClusterConfidence(symptoms: SymptomData[]): number {
    // More symptoms in cluster = higher confidence
    const clusterSize = symptoms.length;
    const consistentProgression = symptoms.every(s => s.progression === symptoms[0].progression);
    const highSeverity = symptoms.some(s => s.severity >= 7);
    
    let confidence = 50 + (clusterSize * 10);
    if (consistentProgression) confidence += 15;
    if (highSeverity) confidence += 10;
    
    return Math.min(95, confidence);
  }

  private calculateUrgencyScore(symptoms: SymptomData[], redFlags: RedFlagAssessment): number {
    let urgencyScore = 0;

    // Base urgency from red flags
    switch (redFlags.urgencyLevel) {
      case 'emergent': urgencyScore = 90; break;
      case 'urgent': urgencyScore = 70; break;
      case 'routine': urgencyScore = 30; break;
    }

    // Adjust based on symptom characteristics
    const avgSeverity = symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length;
    const functionalImpact = symptoms.reduce((sum, s) => sum + s.functionalImpact, 0) / symptoms.length;
    const worseningSymptoms = symptoms.filter(s => s.progression === 'worsening').length;

    urgencyScore += (avgSeverity - 5) * 2;
    urgencyScore += (functionalImpact - 5) * 1.5;
    urgencyScore += worseningSymptoms * 5;

    return Math.min(100, Math.max(0, urgencyScore));
  }

  private generateWorkupRecommendations(
    differentials: Array<{condition: string; cancerType?: string}>,
    symptoms: SymptomData[]
  ): string[] {
    const recommendations = new Set<string>();

    // General recommendations
    recommendations.add('Complete blood count (CBC) with differential');
    recommendations.add('Comprehensive metabolic panel (CMP)');

    // Cancer-type specific workup
    differentials.forEach(differential => {
      switch (differential.cancerType) {
        case 'colorectal':
          recommendations.add('Colonoscopy');
          recommendations.add('CT abdomen/pelvis with contrast');
          recommendations.add('CEA level');
          break;
        case 'lung':
          recommendations.add('Chest CT with contrast');
          recommendations.add('PET-CT if suspicious for malignancy');
          recommendations.add('Pulmonary function tests');
          break;
        case 'breast':
          recommendations.add('Bilateral mammography');
          recommendations.add('Breast ultrasound');
          recommendations.add('Consider breast MRI if high risk');
          break;
        case 'pancreatic':
          recommendations.add('CT abdomen with pancreatic protocol');
          recommendations.add('CA 19-9 level');
          recommendations.add('ERCP or MRCP consideration');
          break;
        case 'gastric':
          recommendations.add('Upper endoscopy with biopsy');
          recommendations.add('CT chest/abdomen/pelvis');
          recommendations.add('H. pylori testing');
          break;
        case 'hematologic':
          recommendations.add('Peripheral blood smear');
          recommendations.add('LDH, uric acid levels');
          recommendations.add('Flow cytometry if indicated');
          break;
      }
    });

    // Symptom-specific recommendations
    if (symptoms.some(s => s.name.toLowerCase().includes('pain'))) {
      recommendations.add('Pain assessment and management');
    }

    if (symptoms.some(s => s.name.toLowerCase().includes('weight loss'))) {
      recommendations.add('Nutritional assessment');
      recommendations.add('Albumin and prealbumin levels');
    }

    return Array.from(recommendations);
  }

  private generateFollowUpRecommendations(urgencyScore: number, symptoms: SymptomData[]): string[] {
    const recommendations: string[] = [];

    if (urgencyScore >= 80) {
      recommendations.push('Immediate oncology consultation');
      recommendations.push('Same-day imaging if indicated');
      recommendations.push('Patient education on warning signs');
    } else if (urgencyScore >= 60) {
      recommendations.push('Urgent oncology referral within 1-2 weeks');
      recommendations.push('Expedited imaging studies');
      recommendations.push('Symptom diary maintenance');
    } else if (urgencyScore >= 40) {
      recommendations.push('Oncology consultation within 4 weeks');
      recommendations.push('Regular symptom monitoring');
      recommendations.push('Patient reassurance with clear follow-up plan');
    } else {
      recommendations.push('Routine follow-up in 4-6 weeks');
      recommendations.push('Symptom monitoring with patient-initiated contact for changes');
      recommendations.push('Lifestyle counseling as appropriate');
    }

    // Specific symptom management
    const painSymptoms = symptoms.filter(s => s.name.toLowerCase().includes('pain'));
    if (painSymptoms.length > 0) {
      recommendations.push('Pain management consultation if needed');
    }

    const fatigueSymptoms = symptoms.filter(s => s.name.toLowerCase().includes('fatigue'));
    if (fatigueSymptoms.length > 0) {
      recommendations.push('Energy conservation education');
    }

    return recommendations;
  }

  private getRecommendedAction(urgencyLevel: string, redFlagSymptoms: string[]): string {
    switch (urgencyLevel) {
      case 'emergent':
        return 'Immediate emergency department evaluation or hospital admission';
      case 'urgent':
        return 'Same-day or next-day physician evaluation with expedited oncology referral';
      case 'routine':
        return redFlagSymptoms.length > 0 ? 
          'Scheduled physician evaluation within 1-2 weeks with oncology consultation' :
          'Routine follow-up with symptom monitoring';
      default:
        return 'Routine follow-up';
    }
  }

  private getTimeFrame(urgencyLevel: string): string {
    switch (urgencyLevel) {
      case 'emergent': return 'Immediate (within hours)';
      case 'urgent': return 'Within 24-48 hours';
      case 'routine': return 'Within 1-2 weeks';
      default: return 'Routine timing';
    }
  }

  private getSpecialistReferral(redFlagSymptoms: string[]): string | undefined {
    if (redFlagSymptoms.some(s => s.toLowerCase().includes('neurological'))) {
      return 'Neurology/Neuro-oncology';
    }
    if (redFlagSymptoms.some(s => s.toLowerCase().includes('gi') || s.includes('abdominal'))) {
      return 'Gastroenterology/GI Oncology';
    }
    if (redFlagSymptoms.some(s => s.toLowerCase().includes('respiratory') || s.includes('lung'))) {
      return 'Pulmonology/Thoracic Oncology';
    }
    if (redFlagSymptoms.some(s => s.toLowerCase().includes('breast'))) {
      return 'Breast Surgery/Medical Oncology';
    }
    if (redFlagSymptoms.length > 0) {
      return 'Medical Oncology';
    }
    return undefined;
  }
}