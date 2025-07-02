import { SocraticQuestion, QuestionTemplate, QuestionEffectiveness, OncologyTopic } from '../types/learning';

export class QuestionEngine {
  private questionTemplates: QuestionTemplate[];
  private readonly STORAGE_KEY = 'oncology_question_effectiveness';

  constructor() {
    this.questionTemplates = this.loadQuestionTemplates();
  }

  private loadQuestionTemplates(): QuestionTemplate[] {
    return [
      // Treatment Protocols
      {
        id: 'protocol_selection_1',
        category: 'protocols',
        difficulty: 3,
        template: "What factors would you consider when choosing between adjuvant chemotherapy options for a Stage III colon cancer patient?",
        followUpTemplates: [
          "Why is {factor} particularly important in this decision?",
          "How would you weigh {factorA} against {factorB}?",
          "What evidence supports your reasoning?"
        ],
        hints: [
          "Consider patient-specific factors like age and performance status...",
          "Think about tumor characteristics including MSI status and staging...",
          "Review performance status, comorbidities, and patient preferences..."
        ],
        topic: 'GI Malignancies',
        learningObjective: 'Understand multifactorial decision-making in adjuvant therapy selection'
      },
      {
        id: 'protocol_selection_2',
        category: 'protocols',
        difficulty: 4,
        template: "A 45-year-old woman with HER2+ breast cancer is considering neoadjuvant therapy. What protocol elements would you prioritize?",
        followUpTemplates: [
          "How does HER2 status influence your treatment approach?",
          "What role does patient age play in your decision?",
          "How would you monitor treatment response?"
        ],
        hints: [
          "HER2-targeted therapy is essential for HER2+ disease...",
          "Consider dual HER2 blockade and chemotherapy backbone...",
          "Think about fertility preservation and long-term survivorship..."
        ],
        topic: 'Breast Cancer Protocols',
        learningObjective: 'Master HER2+ breast cancer neoadjuvant treatment principles'
      },
      {
        id: 'protocol_selection_3',
        category: 'protocols',
        difficulty: 5,
        template: "An elderly patient with multiple comorbidities presents with advanced NSCLC. How do you approach treatment planning?",
        followUpTemplates: [
          "Which comorbidities most significantly impact treatment decisions?",
          "How do you balance efficacy with quality of life?",
          "What biomarker testing is essential in this scenario?"
        ],
        hints: [
          "Assess performance status and life expectancy carefully...",
          "Consider molecular testing for targeted therapy options...",
          "Think about palliative care integration and goals of care..."
        ],
        topic: 'Lung Cancer Management',
        learningObjective: 'Navigate complex treatment decisions in elderly patients with comorbidities'
      },

      // Side Effect Management
      {
        id: 'side_effect_1',
        category: 'side_effects',
        difficulty: 2,
        template: "A patient on carboplatin develops thrombocytopenia. What is your management approach?",
        followUpTemplates: [
          "At what platelet count would you hold treatment?",
          "What monitoring parameters are most important?",
          "When would you consider dose reduction vs. delay?"
        ],
        hints: [
          "Check current platelet count and trend over time...",
          "Consider bleeding risk and upcoming procedures...",
          "Review dose modification guidelines for carboplatin..."
        ],
        topic: 'Chemotherapy Side Effects',
        learningObjective: 'Manage hematologic toxicities effectively and safely'
      },
      {
        id: 'side_effect_2',
        category: 'side_effects',
        difficulty: 3,
        template: "Your patient develops grade 2 peripheral neuropathy on oxaliplatin. How do you proceed?",
        followUpTemplates: [
          "What factors influence your decision to continue vs. modify treatment?",
          "What neuropathy assessment tools would you use?",
          "How do you counsel patients about long-term neuropathy risk?"
        ],
        hints: [
          "Consider cumulative dose and progression of symptoms...",
          "Think about treatment intent - curative vs. palliative...",
          "Review neuropathy grading scales and functional impact..."
        ],
        topic: 'Chemotherapy Side Effects',
        learningObjective: 'Balance treatment efficacy with quality of life in neuropathy management'
      },

      // Emergency Management
      {
        id: 'emergency_1',
        category: 'emergencies',
        difficulty: 4,
        template: "A patient presents with suspected tumor lysis syndrome. What are your immediate priorities?",
        followUpTemplates: [
          "Which laboratory values are most critical to monitor?",
          "What interventions would you initiate immediately?",
          "How do you prevent progression to severe complications?"
        ],
        hints: [
          "Check electrolytes, LDH, uric acid, and kidney function...",
          "Consider aggressive hydration and allopurinol/rasburicase...",
          "Monitor for cardiac arrhythmias and renal failure..."
        ],
        topic: 'Emergency Management',
        learningObjective: 'Recognize and manage oncologic emergencies promptly and effectively'
      },
      {
        id: 'emergency_2',
        category: 'emergencies',
        difficulty: 5,
        template: "A patient with lung cancer develops superior vena cava syndrome. How do you approach management?",
        followUpTemplates: [
          "What imaging studies would you prioritize?",
          "How urgent is the need for intervention?",
          "What treatment modalities would you consider?"
        ],
        hints: [
          "Assess severity of symptoms and airway compromise...",
          "Consider CT chest with contrast and tissue diagnosis needs...",
          "Think about radiation therapy, stenting, or systemic therapy..."
        ],
        topic: 'Emergency Management',
        learningObjective: 'Manage complex oncologic emergencies with multidisciplinary approach'
      },

      // Diagnostic Workup
      {
        id: 'diagnostic_1',
        category: 'diagnosis',
        difficulty: 3,
        template: "A 35-year-old presents with a suspicious breast mass. What is your diagnostic approach?",
        followUpTemplates: [
          "What imaging modalities are most appropriate for this age group?",
          "How does family history influence your workup?",
          "What genetic counseling considerations apply?"
        ],
        hints: [
          "Consider breast MRI for young patients with dense tissue...",
          "Think about BRCA testing and hereditary cancer syndromes...",
          "Review BI-RADS classification and biopsy recommendations..."
        ],
        topic: 'Breast Cancer Protocols',
        learningObjective: 'Develop systematic approach to breast cancer diagnosis in young patients'
      },

      // Immunotherapy
      {
        id: 'immunotherapy_1',
        category: 'immunotherapy',
        difficulty: 4,
        template: "A patient on pembrolizumab develops grade 2 pneumonitis. What is your management strategy?",
        followUpTemplates: [
          "What diagnostic workup would you pursue?",
          "How do you differentiate pneumonitis from other causes?",
          "What are the key management principles for immune-related adverse events?"
        ],
        hints: [
          "Consider CT chest and pulmonary function assessment...",
          "Think about corticosteroid therapy and immunosuppression...",
          "Review immune-related adverse event management guidelines..."
        ],
        topic: 'Immunotherapy',
        learningObjective: 'Recognize and manage immune-related adverse events effectively'
      },

      // Supportive Care
      {
        id: 'supportive_1',
        category: 'supportive_care',
        difficulty: 2,
        template: "A patient undergoing chemotherapy develops neutropenic fever. What are your initial steps?",
        followUpTemplates: [
          "What risk stratification factors would you assess?",
          "Which empiric antibiotic regimen would you choose?",
          "What monitoring parameters are essential?"
        ],
        hints: [
          "Check ANC, vital signs, and assess for infection sources...",
          "Consider MASCC score for risk stratification...",
          "Think about broad-spectrum antibiotics and G-CSF support..."
        ],
        topic: 'Neutropenic Fever',
        learningObjective: 'Master evidence-based approach to neutropenic fever management'
      },

      // Palliative Care Integration
      {
        id: 'palliative_1',
        category: 'palliative',
        difficulty: 3,
        template: "When would you involve palliative care for a newly diagnosed metastatic cancer patient?",
        followUpTemplates: [
          "What misconceptions about palliative care might patients have?",
          "How do you explain the role of palliative care alongside active treatment?",
          "What specific benefits can palliative care provide early in treatment?"
        ],
        hints: [
          "Consider early integration regardless of prognosis...",
          "Think about symptom management and quality of life...",
          "Address misconceptions about 'giving up' on treatment..."
        ],
        topic: 'Palliative Care',
        learningObjective: 'Understand appropriate timing and benefits of palliative care integration'
      },

      // Drug Interactions
      {
        id: 'drug_interaction_1',
        category: 'drug_interactions',
        difficulty: 4,
        template: "A patient on warfarin requires capecitabine therapy. How do you manage this interaction?",
        followUpTemplates: [
          "What monitoring parameters are most critical?",
          "How would you adjust anticoagulation management?",
          "What alternative approaches might you consider?"
        ],
        hints: [
          "Consider increased INR monitoring frequency...",
          "Think about alternative anticoagulation options...",
          "Review capecitabine's effect on warfarin metabolism..."
        ],
        topic: 'Drug Interactions',
        learningObjective: 'Safely manage complex drug interactions in cancer patients'
      },

      // Hematologic Malignancies
      {
        id: 'hematology_1',
        category: 'hematology',
        difficulty: 5,
        template: "A patient with acute leukemia develops differentiation syndrome. What is your approach?",
        followUpTemplates: [
          "What clinical features help confirm this diagnosis?",
          "Which interventions are most critical for management?",
          "How do you balance treatment continuation with complication management?"
        ],
        hints: [
          "Look for fever, dyspnea, weight gain, and organ dysfunction...",
          "Consider corticosteroids and supportive care measures...",
          "Think about temporary treatment interruption if severe..."
        ],
        topic: 'Hematologic Malignancies',
        learningObjective: 'Recognize and manage differentiation syndrome in acute leukemia'
      },

      // Radiation Therapy
      {
        id: 'radiation_1',
        category: 'radiation',
        difficulty: 3,
        template: "A patient develops grade 2 radiation dermatitis. What is your management approach?",
        followUpTemplates: [
          "What skin care recommendations would you provide?",
          "When would you consider treatment breaks?",
          "How do you prevent progression to higher grades?"
        ],
        hints: [
          "Consider gentle cleansing and moisturizing protocols...",
          "Think about topical treatments and sun protection...",
          "Review radiation dose and fractionation considerations..."
        ],
        topic: 'Radiation Therapy',
        learningObjective: 'Manage radiation-induced skin toxicity effectively'
      },

      // Survivorship Care
      {
        id: 'survivorship_1',
        category: 'survivorship',
        difficulty: 3,
        template: "A breast cancer survivor presents 3 years post-treatment with fatigue. How do you approach this?",
        followUpTemplates: [
          "What potential causes would you investigate?",
          "Which screening tests are appropriate at this timepoint?",
          "How do you address quality of life concerns in survivorship?"
        ],
        hints: [
          "Consider late effects, recurrence, and secondary cancers...",
          "Think about hormonal, cardiovascular, and psychological factors...",
          "Review survivorship care plan recommendations..."
        ],
        topic: 'Survivorship Care',
        learningObjective: 'Develop comprehensive approach to cancer survivorship care'
      }
    ];
  }

  generateQuestion(topic: string, difficulty: number, experienceLevel: 'resident' | 'fellow' | 'attending'): SocraticQuestion {
    // Filter templates by topic and difficulty
    let relevantTemplates = this.questionTemplates.filter(template => 
      template.topic === topic || template.category.includes(topic.toLowerCase())
    );

    // Adjust difficulty based on experience level
    const adjustedDifficulty = this.adjustDifficultyForExperience(difficulty, experienceLevel);
    
    // Filter by adjusted difficulty (±1 range)
    relevantTemplates = relevantTemplates.filter(template => 
      Math.abs(template.difficulty - adjustedDifficulty) <= 1
    );

    if (relevantTemplates.length === 0) {
      // Fallback to any template if no specific match
      relevantTemplates = this.questionTemplates.filter(template => 
        Math.abs(template.difficulty - adjustedDifficulty) <= 2
      );
    }

    const selectedTemplate = relevantTemplates[Math.floor(Math.random() * relevantTemplates.length)];
    
    return {
      id: `${selectedTemplate.id}_${Date.now()}`,
      question: selectedTemplate.template,
      followUpQuestions: selectedTemplate.followUpTemplates,
      hints: selectedTemplate.hints,
      difficulty: selectedTemplate.difficulty,
      category: selectedTemplate.category,
      topic: selectedTemplate.topic,
      expectedLearningOutcome: selectedTemplate.learningObjective
    };
  }

  generateFollowUp(previousQuestion: string, userResponse: string, questionTemplate: SocraticQuestion): string {
    // Simple follow-up generation based on templates
    const followUps = questionTemplate.followUpQuestions;
    
    if (followUps.length === 0) {
      return "Can you elaborate on your reasoning?";
    }

    // Select random follow-up and personalize it
    const selectedFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
    
    // Basic personalization based on user response keywords
    if (userResponse.toLowerCase().includes('unsure') || userResponse.toLowerCase().includes('not sure')) {
      return "What information would help you feel more confident in your decision?";
    }
    
    if (userResponse.toLowerCase().includes('would') || userResponse.toLowerCase().includes('should')) {
      return "What evidence or guidelines support that approach?";
    }

    return selectedFollowUp;
  }

  private adjustDifficultyForExperience(baseDifficulty: number, experienceLevel: 'resident' | 'fellow' | 'attending'): number {
    switch (experienceLevel) {
      case 'resident':
        return Math.max(1, baseDifficulty - 1);
      case 'fellow':
        return baseDifficulty;
      case 'attending':
        return Math.min(5, baseDifficulty + 1);
      default:
        return baseDifficulty;
    }
  }

  trackEffectiveness(questionId: string, didLearn: boolean, confidenceGain: number = 0): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const effectiveness: { [key: string]: QuestionEffectiveness } = stored ? JSON.parse(stored) : {};
    
    if (!effectiveness[questionId]) {
      effectiveness[questionId] = {
        questionId,
        timesAsked: 0,
        correctResponses: 0,
        averageConfidenceGain: 0,
        userFeedback: 0,
        lastUpdated: new Date()
      };
    }

    const current = effectiveness[questionId];
    current.timesAsked += 1;
    if (didLearn) current.correctResponses += 1;
    
    // Update running average of confidence gain
    current.averageConfidenceGain = (current.averageConfidenceGain * (current.timesAsked - 1) + confidenceGain) / current.timesAsked;
    current.lastUpdated = new Date();

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(effectiveness));
  }

  getQuestionsByCategory(category: string): QuestionTemplate[] {
    return this.questionTemplates.filter(template => template.category === category);
  }

  getTopicDifficulty(topic: string): number[] {
    const topicTemplates = this.questionTemplates.filter(template => template.topic === topic);
    return topicTemplates.map(template => template.difficulty);
  }

  getEffectivenessData(): { [key: string]: QuestionEffectiveness } {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }
}