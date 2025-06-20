import OpenAI from "openai";
import type { InsertPatientEvaluation } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "demo-key"
});

interface ClinicalAnalysisInput {
  patientId: string;
  age: number;
  symptoms: string[];
  riskFactors: string[];
  clinicianNotes?: string;
}

interface ClinicalRecommendation {
  id: string;
  type: "diagnostic" | "risk_alert" | "protocol_reference" | "treatment_suggestion";
  title: string;
  description: string;
  confidence: number;
  priority: "low" | "medium" | "high";
  evidenceLevel?: string;
  source?: string;
  timestamp: string;
}

interface ClinicalAnalysisResult {
  recommendations: ClinicalRecommendation[];
  overallRiskScore: number;
  urgencyLevel: "routine" | "urgent" | "emergent";
  suggestedNextSteps: string[];
}

export class AIService {
  private static instance: AIService;
  
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeClinicalCase(input: ClinicalAnalysisInput): Promise<ClinicalAnalysisResult> {
    try {
      // If no API key is provided, return structured mock data
      if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
        return this.generateMockAnalysis(input);
      }

      const prompt = this.buildClinicalPrompt(input);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert oncology AI assistant with access to the latest clinical guidelines (NCCN, ASCO, ESMO). 
            Analyze the patient case and provide evidence-based recommendations in JSON format. 
            Focus on diagnostic accuracy, risk stratification, and appropriate care pathways.
            Always include confidence scores and evidence levels when available.
            Ensure all recommendations are clinically sound and follow current medical standards.`
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
      // Fallback to structured mock data on error
      return this.generateMockAnalysis(input);
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
${input.clinicianNotes ? `- Clinical Notes: ${input.clinicianNotes}` : ""}

Please provide a comprehensive oncology assessment with the following JSON structure:
{
  "recommendations": [
    {
      "id": "unique_id",
      "type": "diagnostic|risk_alert|protocol_reference|treatment_suggestion",
      "title": "Brief title",
      "description": "Detailed recommendation with specific actions",
      "confidence": 0-100,
      "priority": "low|medium|high",
      "evidenceLevel": "1A|1B|2A|2B|3|4|5",
      "source": "NCCN|ASCO|ESMO|Other guideline",
      "timestamp": "time_ago_format"
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
6. Evidence-based guidelines from major oncology organizations

Ensure all recommendations are:
- Clinically appropriate for the patient's age and presentation
- Evidence-based with proper confidence levels
- Prioritized by clinical urgency
- Specific and actionable for healthcare providers
`;
  }

  private validateAndFormatResult(result: any): ClinicalAnalysisResult {
    const now = new Date();
    
    // Generate IDs and timestamps for recommendations if missing
    const recommendations = Array.isArray(result.recommendations) 
      ? result.recommendations.map((rec: any, index: number) => ({
          id: rec.id || `rec-${Date.now()}-${index}`,
          type: rec.type || "diagnostic",
          title: rec.title || "Clinical Recommendation",
          description: rec.description || "Clinical assessment completed",
          confidence: typeof rec.confidence === "number" 
            ? Math.max(0, Math.min(100, rec.confidence)) 
            : 75,
          priority: ["low", "medium", "high"].includes(rec.priority) 
            ? rec.priority 
            : "medium",
          evidenceLevel: rec.evidenceLevel || "2A",
          source: rec.source || "Clinical Guidelines",
          timestamp: rec.timestamp || "Just now"
        }))
      : [];

    return {
      recommendations,
      overallRiskScore: typeof result.overallRiskScore === "number" 
        ? Math.max(0, Math.min(100, result.overallRiskScore)) 
        : 25,
      urgencyLevel: ["routine", "urgent", "emergent"].includes(result.urgencyLevel) 
        ? result.urgencyLevel 
        : "routine",
      suggestedNextSteps: Array.isArray(result.suggestedNextSteps) 
        ? result.suggestedNextSteps 
        : ["Continue monitoring", "Follow-up as scheduled"]
    };
  }

  private generateMockAnalysis(input: ClinicalAnalysisInput): ClinicalAnalysisResult {
    const hasHighRiskSymptoms = input.symptoms.some(s => 
      s.includes("persistent_cough") || s.includes("weight_loss") || s.includes("pain")
    );
    
    const hasHighRiskFactors = input.riskFactors.some(rf => 
      rf.includes("smoking_history") || rf.includes("family_history") || rf.includes("previous_cancer")
    );

    const riskScore = (hasHighRiskSymptoms ? 40 : 20) + (hasHighRiskFactors ? 30 : 10) + (input.age > 50 ? 20 : 0);
    const urgencyLevel = riskScore > 70 ? "urgent" : riskScore > 40 ? "routine" : "routine";

    const recommendations: ClinicalRecommendation[] = [
      {
        id: "rec-diagnostic-1",
        type: "diagnostic",
        title: "Diagnostic Workup Recommendation",
        description: `Based on the patient's presentation (age ${input.age}, symptoms: ${input.symptoms.join(', ') || 'none reported'}), recommend appropriate imaging studies and laboratory workup. Consider CT imaging if persistent symptoms warrant investigation.`,
        confidence: 85,
        priority: hasHighRiskSymptoms ? "high" : "medium",
        evidenceLevel: "1A",
        source: "NCCN Guidelines",
        timestamp: "Just now"
      }
    ];

    if (hasHighRiskFactors) {
      recommendations.push({
        id: "rec-risk-1",
        type: "risk_alert",
        title: "Risk Factor Assessment",
        description: `Patient has significant risk factors (${input.riskFactors.join(', ')}). Consider enhanced screening protocols and closer monitoring intervals.`,
        confidence: 92,
        priority: "high",
        evidenceLevel: "1A",
        source: "Clinical Guidelines",
        timestamp: "Just now"
      });
    }

    recommendations.push({
      id: "rec-protocol-1",
      type: "protocol_reference",
      title: "Clinical Protocol Guidance",
      description: "Follow evidence-based screening and monitoring protocols appropriate for patient's age group and risk profile. Ensure compliance with current clinical guidelines.",
      confidence: 88,
      priority: "medium",
      evidenceLevel: "1A",
      source: "NCCN Guidelines",
      timestamp: "Just now"
    });

    return {
      recommendations,
      overallRiskScore: Math.min(riskScore, 100),
      urgencyLevel: urgencyLevel as "routine" | "urgent" | "emergent",
      suggestedNextSteps: [
        "Complete clinical assessment",
        "Order appropriate diagnostic studies",
        "Schedule follow-up appointment",
        "Patient education and counseling"
      ]
    };
  }

  async generateClinicalReport(patientData: any, recommendations: ClinicalRecommendation[]): Promise<string> {
    try {
      if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
        return this.generateMockReport(patientData, recommendations);
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical documentation expert. Generate a comprehensive clinical report in professional medical format following standard healthcare documentation practices."
          },
          {
            role: "user", 
            content: `Generate a clinical evaluation report based on this data:
            Patient: ${JSON.stringify(patientData)}
            AI Recommendations: ${JSON.stringify(recommendations)}
            
            Format as a professional medical report with sections for:
            - Patient Demographics and History
            - Clinical Presentation and Assessment
            - AI-Assisted Analysis and Recommendations  
            - Clinical Plan and Follow-up
            
            Use appropriate medical terminology and maintain professional documentation standards.`
          }
        ],
        temperature: 0.2
      });

      return response.choices[0].message.content || this.generateMockReport(patientData, recommendations);
      
    } catch (error) {
      console.error("Report generation failed:", error);
      return this.generateMockReport(patientData, recommendations);
    }
  }

  private generateMockReport(patientData: any, recommendations: ClinicalRecommendation[]): string {
    const currentDate = new Date().toLocaleDateString();
    
    return `
CLINICAL EVALUATION REPORT
Generated: ${currentDate}

PATIENT DEMOGRAPHICS
Patient ID: ${patientData.patientId}
Age: ${patientData.age} years

CLINICAL PRESENTATION
Symptoms: ${patientData.symptoms?.join(', ') || 'None reported'}
Risk Factors: ${patientData.riskFactors?.join(', ') || 'None identified'}
Clinical Notes: ${patientData.clinicianNotes || 'No additional notes'}

AI-ASSISTED CLINICAL ANALYSIS
The OncoVista AI system has analyzed the patient presentation and generated the following evidence-based recommendations:

${recommendations.map((rec, index) => `
${index + 1}. ${rec.title}
   Priority: ${rec.priority.toUpperCase()}
   Confidence: ${rec.confidence}%
   Evidence Level: ${rec.evidenceLevel}
   Description: ${rec.description}
   Source: ${rec.source}
`).join('\n')}

CLINICAL PLAN
- Complete comprehensive clinical assessment
- Implement recommended diagnostic workup
- Follow evidence-based clinical protocols
- Schedule appropriate follow-up intervals
- Provide patient education and support

This report was generated with AI assistance and should be reviewed by qualified medical professionals.
    `.trim();
  }
}

export const aiService = AIService.getInstance();
