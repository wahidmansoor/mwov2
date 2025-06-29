export interface LearningSession {
  id: string;
  timestamp: Date;
  duration: number; // minutes
  topicsStudied: string[];
  confidenceLevels: { [topic: string]: number };
  questionsAnswered: number;
  correctAnswers: number;
  experienceLevel: 'resident' | 'fellow' | 'attending';
  hintsUsed: number;
}

export interface LearningMetrics {
  totalStudyTime: number;
  topicsCompleted: number;
  averageConfidence: number;
  learningVelocity: number;
  streakDays: number;
  totalSessions: number;
  knowledgeRetention: number;
}

export interface KnowledgeGap {
  topic: string;
  confidenceLevel: number;
  lastStudied: Date;
  recommendedAction: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SocraticQuestion {
  id: string;
  question: string;
  followUpQuestions: string[];
  hints: string[];
  difficulty: number;
  category: string;
  topic: string;
  expectedLearningOutcome: string;
}

export interface QuestionTemplate {
  id: string;
  category: string;
  difficulty: number;
  template: string;
  followUpTemplates: string[];
  hints: string[];
  topic: string;
  learningObjective: string;
}

export interface TeachingSession {
  id: string;
  topic: string;
  confidenceLevel: number;
  experienceLevel: 'resident' | 'fellow' | 'attending';
  hintsUsed: number;
  questionsAsked: string[];
  responses: string[];
  timestamp: Date;
  completed: boolean;
  effectivenessScore?: number;
}

export interface UserProgress {
  userId: string;
  totalSessions: number;
  topicsCompleted: string[];
  averageConfidence: { [topic: string]: number };
  learningStreak: number;
  lastActiveDate: Date;
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic';
  experienceLevel: 'resident' | 'fellow' | 'attending';
}

export interface QuestionEffectiveness {
  questionId: string;
  timesAsked: number;
  correctResponses: number;
  averageConfidenceGain: number;
  userFeedback: number; // 1-5 rating
  lastUpdated: Date;
}

export const ONCOLOGY_TOPICS = [
  'Breast Cancer Protocols',
  'Lung Cancer Management',
  'Hematologic Malignancies',
  'Neutropenic Fever',
  'Chemotherapy Side Effects',
  'Radiation Therapy',
  'Immunotherapy',
  'Palliative Care',
  'Tumor Staging',
  'Drug Interactions',
  'Emergency Management',
  'Supportive Care',
  'Pediatric Oncology',
  'Gynecologic Cancers',
  'GI Malignancies',
  'Head & Neck Cancers',
  'CNS Tumors',
  'Bone & Soft Tissue',
  'Skin Cancers',
  'Survivorship Care'
] as const;

export type OncologyTopic = typeof ONCOLOGY_TOPICS[number];

export interface LearningData {
  sessions: LearningSession[];
  userProgress: UserProgress;
  questionEffectiveness: { [questionId: string]: QuestionEffectiveness };
  knowledgeGaps: KnowledgeGap[];
  lastUpdated: Date;
}