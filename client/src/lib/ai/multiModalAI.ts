import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || "demo-key"
});

interface ClinicalAnalysisInput {
  patientId: string;
  age: number;
  symptoms: string[];
  riskFactors: string[];
  clinicalNotes?: string;
}

interface ClinicalRecommendation {
  type: "diagnostic" | "risk_alert" | "protocol_reference" | "treatment_suggestion";
  title: string;
  description: string;
  confidence: number;
  priority: "low" | "medium" | "high";
  evidenceLevel?: string;
  source?: string;
}

interface ClinicalAnalysisResult {
  recommendations: ClinicalRecommendation[];
  overallRiskScore: number;
  urgencyLevel: "routine" | "urgent" | "emergent";
  suggestedNextSteps: string[];
}

export class MultiModalAI {
  private static instance: MultiModalAI;
  
  public static getInstance(): MultiModalAI {
    if (!MultiModalAI.instance) {
      MultiModalAI.instance = new MultiModalAI();
    }
    return MultiModalAI.instance;
  }

  async analyzeClinicalCase(input: ClinicalAnalysisInput): Promise<ClinicalAnalysisResult> {
    try {
      const prompt = this.buildClinicalPrompt(input);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert oncology AI assistant with access to the latest clinical guidelines (NCCN, ASCO, ESMO). 
            Analyze the patient case and provide evidence-based recommendations in JSON format. 
            Focus on diagnostic accuracy, risk stratification, and appropriate care pathways.
            Always include confidence scores and evidence levels when available.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3, // Lower temperature for more consistent medical recommendations
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return this.validateAndFormatResult(result);
      
    } catch (error) {
      console.error("AI analysis failed:", error);
      throw new Error("Clinical AI analysis failed. Please try again.");
    }
  }

  private buildClinicalPrompt(input: ClinicalAnalysisInput): string {
    const symptomsText = input.symptoms.length > 0 
      ? input.symptoms.join(", ") 
      : "No specific symptoms reported";
      
    const riskFactorsText = input.riskFactors.length > 0 
      ? input.riskFactors.join(", ") 
      : "No significant risk factors";

    return `
Patient Case Analysis:
- Patient ID: ${input.patientId}
- Age: ${input.age} years
- Presenting Symptoms: ${symptomsText}
- Risk Factors: ${riskFactorsText}
${input.clinicalNotes ? `- Clinical Notes: ${input.clinicalNotes}` : ""}

Please provide a comprehensive oncology assessment with the following JSON structure:
{
  "recommendations": [
    {
      "type": "diagnostic|risk_alert|protocol_reference|treatment_suggestion",
      "title": "Brief title",
      "description": "Detailed recommendation with specific actions",
      "confidence": 0-100,
      "priority": "low|medium|high",
      "evidenceLevel": "1A|1B|2A|2B|3|4|5",
      "source": "NCCN|ASCO|ESMO|Other guideline"
    }
  ],
  "overallRiskScore": 0-100,
  "urgencyLevel": "routine|urgent|emergent",
  "suggestedNextSteps": ["step1", "step2", "step3"]
}

Consider:
1. Cancer screening recommendations based on age and risk factors
2. Diagnostic workup priorities (imaging, lab tests, biopsies)
3. Urgent red flags requiring immediate evaluation
4. Follow-up care coordination
5. Patient education needs
`;
  }

  private validateAndFormatResult(result: any): ClinicalAnalysisResult {
    // Provide default structure if AI response is incomplete
    const defaultResult: ClinicalAnalysisResult = {
      recommendations: [],
      overallRiskScore: 0,
      urgencyLevel: "routine",
      suggestedNextSteps: []
    };

    return {
      recommendations: Array.isArray(result.recommendations) ? result.recommendations : [],
      overallRiskScore: typeof result.overallRiskScore === "number" 
        ? Math.max(0, Math.min(100, result.overallRiskScore)) 
        : 0,
      urgencyLevel: ["routine", "urgent", "emergent"].includes(result.urgencyLevel) 
        ? result.urgencyLevel 
        : "routine",
      suggestedNextSteps: Array.isArray(result.suggestedNextSteps) 
        ? result.suggestedNextSteps 
        : []
    };
  }

  async generateClinicalReport(patientData: any, recommendations: ClinicalRecommendation[]): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical documentation expert. Generate a comprehensive clinical report in professional medical format."
          },
          {
            role: "user", 
            content: `Generate a clinical evaluation report based on this data:
            Patient: ${JSON.stringify(patientData)}
            AI Recommendations: ${JSON.stringify(recommendations)}
            
            Format as a professional medical report with sections for:
            - Patient Demographics
            - Clinical Presentation
            - Assessment & Recommendations  
            - Follow-up Plan`
          }
        ],
        temperature: 0.2
      });

      return response.choices[0].message.content || "";
      
    } catch (error) {
      console.error("Report generation failed:", error);
      throw new Error("Failed to generate clinical report");
    }
  }
}

export const multiModalAI = MultiModalAI.getInstance();
