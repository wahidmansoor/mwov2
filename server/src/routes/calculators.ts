import { Router } from "express";
import { opioidConversion, renalDoseAdjustment, prognosticIndex } from "../controllers/calculators.js";

const router = Router();

// Clinical calculation endpoints
router.post("/opioid-conversion", opioidConversion);
router.post("/renal-dose-adjustment", renalDoseAdjustment);
router.post("/prognostic-index", prognosticIndex);

// Calculator information endpoints
router.get("/", (req, res) => {
  res.json({
    message: "OncoVista Clinical Calculators",
    available_calculators: [
      {
        name: "Opioid Conversion",
        endpoint: "/api/calculators/opioid-conversion",
        method: "POST",
        description: "Convert opioid dosages between different medications using morphine equivalents"
      },
      {
        name: "Renal Dose Adjustment",
        endpoint: "/api/calculators/renal-dose-adjustment",
        method: "POST",
        description: "Adjust medication doses based on creatinine clearance"
      },
      {
        name: "Prognostic Index",
        endpoint: "/api/calculators/prognostic-index",
        method: "POST",
        description: "Calculate prognostic indices for palliative care patients"
      }
    ],
    disclaimer: "These calculators are for educational purposes only. Always consult clinical guidelines and use professional judgment."
  });
});

export default router;
