import OpenAI from "openai";
import { logger } from "../utils/logger.js";
import { protocolService } from "./protocolService.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "demo-key"
});

interface SummarizeInput {
  slug: string;
  type?: 'symptom' | 'emergency';
  length?: 'brief' | 'detailed';
}

interface ExplainInput {
  topic: string;
  level?: 'resident' | 'fellow' | 'attending';
  context?: string;
}

interface CompareInput {
  guidelines: string[];
  focus?: string;
}

interface TreatmentPlanInput {
  patientAge: number;
  diagnosis: string;
  comorbidities: string[];
  currentMedications: string[];
  allergies: string[];
  performanceStatus: number;
  goals: string[];
}

export const aiService = {
  summarizeProtocol: async ({ slug, type, length = 'brief' }: SummarizeInput) => {
    logger.info({ slug, type, length }, 'AI protocol summarization requested');
    
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
      return aiService.generateMockSummary(slug, length);
    }
    
    try {
      // Fetch protocol content
      let protocol;
      if (type === 'emergency') {
        protocol = await protocolService.getEmergencyProtocol(slug);
      } else {
        protocol = await protocolService.getSymptomProtocol(slug);
      }
      
      if (!protocol) {
        throw new Error(`Protocol not found: ${slug}`);
      }
      
      const protocolText = `
        Title: ${protocol.title}
        Summary: ${protocol.summary}
        Steps: ${protocol.steps.join('. ')}
        Red Flags: ${protocol.red_flags.join('. ')}
        Medications: ${protocol.medications?.map(m => `${m.name} ${m.dosage} ${m.route} ${m.frequency}`).join('. ') || 'None listed'}
      `;
      
      const systemPrompt = `You are a clinical expert in palliative care and oncology. 
        Summarize the following protocol in a ${length} format that is:
        - Clinically accurate and evidence-based
        - Clear and actionable for healthcare providers
        - Focused on key clinical decision points
        - Appropriately emphasizing safety considerations
        
        ${length === 'brief' ? 'Keep the summary to 3-5 key bullet points.' : 'Provide a comprehensive summary with detailed explanations.'}`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please summarize this clinical protocol: ${protocolText}` }
        ],
        temperature: 0.3,
        max_tokens: length === 'brief' ? 300 : 800
      });
      
      const summary = response.choices[0].message.content;
      
      return {
        protocol_title: protocol.title,
        summary,
        length,
        source_protocol: slug,
        ai_model: "gpt-4o-mini",
        confidence: "high"
      };
      
    } catch (error) {
      logger.error({ error, slug }, 'AI summarization failed');
      return aiService.generateMockSummary(slug, length);
    }
  },

  explainEducation: async ({ topic, level = 'resident', context }: ExplainInput) => {
    logger.info({ topic, level, context }, 'AI educational explanation requested');
    
    if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
      return aiService.generateMockExplanation(topic, level);
    }
    
    try {
      const levelDescriptions = {
        resident: "medical resident with basic clinical knowledge",
        fellow: "specialty fellow with advanced training", 
        attending: "experienced attending physician"
      };
      
      const systemPrompt = `You are a clinical educator in palliative care and oncology.
        Explain the following topic for a ${levelDescriptions[level]}.
        
        Guidelines:
        - Use appropriate medical terminology for the audience level
        - Include relevant pathophysiology when appropriate
        - Provide practical clinical applications
        - Mention key evidence and guidelines
        - Include common pitfalls or misconceptions
        - Be concise but thorough`;
      
      const userPrompt = `Please explain: ${topic}${context ? `. Context: ${context}` : ''}`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 1000
      });
      
      const explanation = response.choices[0].message.content;
      
      return {
        topic,
        explanation,
        target_audience: level,
        context: context || null,
        ai_model: "gpt-4o-mini"
      };
      
    } catch (error) {
      logger.error({ error, topic }, 'AI explanation failed');
      return aiService.generateMockExplanation(topic, level);
    }
  },

  compareGuidelines: async ({ guidelines, focus }: CompareInput) => {
    logger.info({ guidelines, focus }, 'AI guideline comparison requested');
    
    if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
      return aiService.generateMockComparison(guidelines);
    }
    
    try {
      const systemPrompt = `You are a clinical researcher and guideline expert.
        Compare the following clinical guidelines and provide:
        
        1. Key similarities between guidelines
        2. Important differences in recommendations
        3. Strength of evidence for each recommendation
        4. Clinical implications of the differences
        5. Practical recommendations for clinicians
        
        Be objective and evidence-based in your comparison.`;
      
      const userPrompt = `Compare these clinical guidelines: ${guidelines.join(', ')}${focus ? `. Focus specifically on: ${focus}` : ''}`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1200
      });
      
      const comparison = response.choices[0].message.content;
      
      return {
        guidelines_compared: guidelines,
        comparison,
        focus_area: focus || null,
        ai_model: "gpt-4o-mini"
      };
      
    } catch (error) {
      logger.error({ error, guidelines }, 'AI comparison failed');
      return aiService.generateMockComparison(guidelines);
    }
  },

  generateTreatmentPlan: async (patientData: TreatmentPlanInput) => {
    logger.info({ diagnosis: patientData.diagnosis, age: patientData.patientAge }, 'AI treatment plan requested');
    
    if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
      return aiService.generateMockTreatmentPlan(patientData);
    }
    
    try {
      const systemPrompt = `You are an experienced palliative care physician.
        Generate a comprehensive treatment plan based on the patient information provided.
        
        Include:
        1. Assessment summary
        2. Treatment goals (aligned with patient/family goals)
        3. Pharmacological interventions with specific dosing
        4. Non-pharmacological interventions
        5. Monitoring parameters
        6. Follow-up recommendations
        7. Red flags to watch for
        
        Ensure all recommendations are evidence-based and appropriate for palliative care.`;
      
      const patientSummary = `
        Age: ${patientData.patientAge}
        Diagnosis: ${patientData.diagnosis}
        Comorbidities: ${patientData.comorbidities?.join(', ') || 'None listed'}
        Current Medications: ${patientData.currentMedications?.join(', ') || 'None listed'}
        Allergies: ${patientData.allergies?.join(', ') || 'NKDA'}
        Performance Status: ${patientData.performanceStatus || 'Not specified'}
        Patient/Family Goals: ${patientData.goals?.join(', ') || 'Not specified'}
      `;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a treatment plan for this patient: ${patientSummary}` }
        ],
        temperature: 0.4,
        max_tokens: 1500
      });
      
      const treatmentPlan = response.choices[0].message.content;
      
      return {
        patient_summary: {
          age: patientData.patientAge,
          diagnosis: patientData.diagnosis,
          performance_status: patientData.performanceStatus
        },
        treatment_plan: treatmentPlan,
        ai_model: "gpt-4o-mini",
        generated_by: "AI Assistant"
      };
      
    } catch (error) {
      logger.error({ error, diagnosis: patientData.diagnosis }, 'AI treatment plan generation failed');
      return aiService.generateMockTreatmentPlan(patientData);
    }
  },

  // Mock response generators for when API key is not available
  generateMockSummary: (slug: string, length: string) => {
    return {
      protocol_title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      summary: length === 'brief' 
        ? `• Assess severity and underlying causes\n• Implement appropriate interventions\n• Monitor response and adjust therapy\n• Consider specialist consultation if needed`
        : `This protocol provides comprehensive guidance for managing clinical conditions. Assessment should include thorough history and physical examination. Treatment recommendations follow evidence-based guidelines with appropriate monitoring. Consider patient-specific factors and specialist consultation when indicated.`,
      length,
      source_protocol: slug,
      ai_model: "mock-response",
      confidence: "demo"
    };
  },

  generateMockExplanation: (topic: string, level: string) => {
    return {
      topic,
      explanation: `This is a mock explanation of ${topic} tailored for ${level} level training. In a production environment with OpenAI API access, this would provide detailed, evidence-based educational content appropriate for the specified training level.`,
      target_audience: level,
      context: null,
      ai_model: "mock-response"
    };
  },

  generateMockComparison: (guidelines: string[]) => {
    return {
      guidelines_compared: guidelines,
      comparison: `Mock comparison of ${guidelines.join(' vs ')}. Production version would provide detailed analysis of similarities, differences, evidence levels, and clinical implications across the specified guidelines.`,
      focus_area: null,
      ai_model: "mock-response"
    };
  },

  generateMockTreatmentPlan: (patientData: TreatmentPlanInput) => {
    return {
      patient_summary: {
        age: patientData.patientAge,
        diagnosis: patientData.diagnosis,
        performance_status: patientData.performanceStatus
      },
      treatment_plan: `Mock treatment plan for ${patientData.diagnosis}. Production version would generate comprehensive, evidence-based treatment recommendations including medications, interventions, monitoring, and follow-up based on the patient's specific clinical presentation.`,
      ai_model: "mock-response",
      generated_by: "Mock AI Assistant"
    };
  }
};
