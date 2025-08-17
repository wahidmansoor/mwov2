import { Router } from "express";
import { getSymptomProtocol, getEmergencyProtocol, searchProtocols, getAllProtocols } from "../controllers/protocols.js";

const router = Router();

// Protocol retrieval endpoints
router.get("/symptoms/:slug", getSymptomProtocol);
router.get("/emergencies/:slug", getEmergencyProtocol);
router.get("/search", searchProtocols);
router.get("/", getAllProtocols);

// Protocol categories endpoint
router.get("/categories", (req, res) => {
  res.json({
    symptom_categories: [
      "pain_management",
      "respiratory_symptoms", 
      "gastrointestinal_symptoms",
      "neurological_symptoms",
      "psychological_symptoms",
      "skin_symptoms"
    ],
    emergency_categories: [
      "oncological_emergencies",
      "acute_pain_crisis",
      "respiratory_distress",
      "cardiac_events",
      "neurological_emergencies",
      "metabolic_emergencies"
    ],
    treatment_types: [
      "pharmacological",
      "non_pharmacological", 
      "interventional",
      "supportive_care"
    ]
  });
});

export default router;
