import { apiRequest } from "@/lib/queryClient";
import type { PatientEvaluation, InsertPatientEvaluation } from "@shared/schema";

export class ClinicalAPI {
  static async createPatientEvaluation(data: InsertPatientEvaluation): Promise<PatientEvaluation> {
    const response = await apiRequest("POST", "/api/patient-evaluations", data);
    return response.json();
  }

  static async getPatientEvaluations(): Promise<PatientEvaluation[]> {
    const response = await apiRequest("GET", "/api/patient-evaluations");
    return response.json();
  }

  static async getPatientEvaluation(id: string): Promise<PatientEvaluation> {
    const response = await apiRequest("GET", `/api/patient-evaluations/${id}`);
    return response.json();
  }

  static async updatePatientEvaluation(id: string, data: Partial<PatientEvaluation>): Promise<PatientEvaluation> {
    const response = await apiRequest("PATCH", `/api/patient-evaluations/${id}`, data);
    return response.json();
  }

  static async deletePatientEvaluation(id: string): Promise<void> {
    await apiRequest("DELETE", `/api/patient-evaluations/${id}`);
  }

  static async analyzePatientWithAI(data: InsertPatientEvaluation): Promise<any> {
    const response = await apiRequest("POST", "/api/ai/analyze-patient", data);
    return response.json();
  }

  static async getClinicalProtocols(params?: { cancerType?: string; stage?: string }): Promise<any[]> {
    const searchParams = new URLSearchParams();
    if (params?.cancerType) searchParams.set("cancerType", params.cancerType);
    if (params?.stage) searchParams.set("stage", params.stage);
    
    const url = `/api/clinical-protocols${searchParams.toString() ? `?${searchParams}` : ""}`;
    const response = await apiRequest("GET", url);
    return response.json();
  }

  static async getDashboardStats(): Promise<{
    activePatients: number;
    aiRecommendations: number;
    criticalAlerts: number;
    protocolsUpdated: number;
  }> {
    const response = await apiRequest("GET", "/api/dashboard/stats");
    return response.json();
  }

  static async getRecentActivity(): Promise<any[]> {
    const response = await apiRequest("GET", "/api/dashboard/activities");
    return response.json();
  }
}
