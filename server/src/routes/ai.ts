import { Router } from "express";
import { summarizeProtocol, explainEducation, compareGuidelines, generateTreatmentPlan } from "../controllers/ai.js";

const router = Router();

// AI service endpoints
router.post("/summarize-protocol", summarizeProtocol);
router.post("/explain-education", explainEducation);
router.post("/compare-guidelines", compareGuidelines);
router.post("/generate-treatment-plan", generateTreatmentPlan);

// AI service status endpoint
router.get("/", (req, res) => {
  res.json({
    message: "OncoVista AI Services",
    available_services: [
      {
        name: "Protocol Summarization",
        endpoint: "/api/ai/summarize-protocol",
        method: "POST",
        description: "Generate AI-powered summaries of clinical protocols"
      },
      {
        name: "Educational Explanation",
        endpoint: "/api/ai/explain-education",
        method: "POST", 
        description: "Explain complex medical concepts at appropriate training levels"
      },
      {
        name: "Guideline Comparison",
        endpoint: "/api/ai/compare-guidelines",
        method: "POST",
        description: "Compare multiple clinical guidelines and highlight differences"
      },
      {
        name: "Treatment Plan Generation",
        endpoint: "/api/ai/generate-treatment-plan",
        method: "POST",
        description: "AI-assisted treatment plan generation based on patient data"
      }
    ],
    ai_model: "GPT-4",
    disclaimer: "AI responses are for educational and decision support only. Always use clinical judgment."
  });
});

export default router;
