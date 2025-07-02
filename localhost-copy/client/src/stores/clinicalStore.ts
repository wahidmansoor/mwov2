import { create } from "zustand";
import type { PatientEvaluation, AIRecommendation } from "@/types/clinical";

interface ClinicalState {
  currentPatientEvaluation: PatientEvaluation | null;
  aiRecommendations: AIRecommendation[];
  isAnalyzing: boolean;
  
  setCurrentPatientEvaluation: (evaluation: PatientEvaluation | null) => void;
  setAIRecommendations: (recommendations: AIRecommendation[]) => void;
  addAIRecommendation: (recommendation: AIRecommendation) => void;
  setAnalyzing: (analyzing: boolean) => void;
  clearClinicalData: () => void;
}

export const useClinicalStore = create<ClinicalState>((set, get) => ({
  currentPatientEvaluation: null,
  aiRecommendations: [],
  isAnalyzing: false,
  
  setCurrentPatientEvaluation: (evaluation) => {
    set({ currentPatientEvaluation: evaluation });
  },
  
  setAIRecommendations: (recommendations) => {
    set({ aiRecommendations: recommendations });
  },
  
  addAIRecommendation: (recommendation) => {
    const current = get().aiRecommendations;
    set({ aiRecommendations: [...current, recommendation] });
  },
  
  setAnalyzing: (analyzing) => {
    set({ isAnalyzing: analyzing });
  },
  
  clearClinicalData: () => {
    set({
      currentPatientEvaluation: null,
      aiRecommendations: [],
      isAnalyzing: false
    });
  },
}));
