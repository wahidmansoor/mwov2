import { Request, Response } from "express";
import { calculatorService } from "../services/calculatorService.js";
import { logger, logClinicalEvent } from "../utils/logger.js";
import { asyncHandler, ValidationError } from "../utils/errorHandler.js";
import { 
  opioidConversionSchema, 
  renalDoseSchema, 
  prognosticSchema 
} from "../utils/validation.js";

export const opioidConversion = asyncHandler(async (req: Request, res: Response) => {
  const input = opioidConversionSchema.parse(req.body);
  const result = await calculatorService.opioidConversion(input);
  
  // Log clinical calculation for audit
  logClinicalEvent('opioid_conversion', {
    input: { drug: input.drug, dose: input.dose, target: input.target },
    result: { equivalent_dose: result.equivalent_dose },
    userId: req.headers['x-user-id'] || 'anonymous'
  });
  
  logger.info({ input, result }, 'Opioid conversion calculated');
  res.json({
    ...result,
    timestamp: new Date().toISOString(),
    disclaimer: "Clinical judgment required. Consider patient factors and start with reduced doses."
  });
});

export const renalDoseAdjustment = asyncHandler(async (req: Request, res: Response) => {
  const input = renalDoseSchema.parse(req.body);
  const result = await calculatorService.renalDoseAdjustment(input);
  
  logClinicalEvent('renal_dose_adjustment', {
    input: { drug: input.drug, creatinine: input.creatinine },
    result: { creatinine_clearance: result.creatinine_clearance, adjustment_factor: result.adjustment_factor },
    userId: req.headers['x-user-id'] || 'anonymous'
  });
  
  logger.info({ input, result }, 'Renal dose adjustment calculated');
  res.json({
    ...result,
    timestamp: new Date().toISOString(),
    disclaimer: "Consult pharmacist for complex cases. Consider other factors affecting drug clearance."
  });
});

export const prognosticIndex = asyncHandler(async (req: Request, res: Response) => {
  const input = prognosticSchema.parse(req.body);
  const result = await calculatorService.prognosticIndex(input);
  
  logClinicalEvent('prognostic_index', {
    input: { kps: input.kps, symptoms: [input.dyspnea, input.anorexia, input.fatigue].filter(Boolean).length },
    result: { score: result.score, prognosis: result.prognosis },
    userId: req.headers['x-user-id'] || 'anonymous'
  });
  
  logger.info({ input, result }, 'Prognostic index calculated');
  res.json({
    ...result,
    timestamp: new Date().toISOString(),
    disclaimer: "Prognostic tools are estimates only. Multiple factors affect individual prognosis."
  });
});
