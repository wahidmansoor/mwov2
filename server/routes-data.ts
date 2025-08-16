import { Router, type Request, type Response } from 'express';
import { getRepo } from './db/index.js';

const router = Router();

// Helper function to parse and clamp limits
function parseLimit(limit: any, defaultLimit: number, maxLimit: number): number {
  const parsed = parseInt(limit as string) || defaultLimit;
  return Math.min(Math.max(1, parsed), maxLimit);
}

// Helper function to handle DB not configured
function handleDbNotConfigured(res: Response) {
  res.status(501).json({ message: "DB not configured" });
}

// DB Health check
router.get('/db/health', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  try {
    const ok = await repo.health();
    res.json({ ok });
  } catch (error) {
    res.json({ ok: false });
  }
});

// NCCN Guidelines
router.get('/nccn', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, limit } = req.query;
  if (!cancer_type) {
    return res.status(400).json({ message: "cancer_type parameter is required" });
  }

  const parsedLimit = parseLimit(limit, 50, 200);
  const items = await repo.nccnByCancerType(cancer_type as string, parsedLimit);
  res.json({ items });
});

// Clinical Protocols
router.get('/protocols', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, limit } = req.query;
  if (!cancer_type) {
    return res.status(400).json({ message: "cancer_type parameter is required" });
  }

  const parsedLimit = parseLimit(limit, 50, 200);
  const items = await repo.protocolsByCancer(cancer_type as string, parsedLimit);
  res.json({ items });
});

// CD Protocols
router.get('/cd-protocols', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { tumour_group, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  const items = await repo.cdProtocolsByTumour(tumour_group as string, parsedLimit);
  res.json({ items });
});

// Treatment Protocols
router.get('/treatment-protocols', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { tumour_group, code, name, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const query: { tumour_group?: string; code?: string; name?: string } = {};
  if (tumour_group) query.tumour_group = tumour_group as string;
  if (code) query.code = code as string;
  if (name) query.name = name as string;

  const items = await repo.treatmentProtocols(query, parsedLimit);
  res.json({ items });
});

// Medications Search
router.get('/medications/search', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { q, chemo, immuno, targeted, limit } = req.query;
  if (!q) {
    return res.status(400).json({ message: "q parameter is required" });
  }

  const parsedLimit = parseLimit(limit, 25, 100);
  const flags = {
    chemo: chemo === 'true',
    immuno: immuno === 'true',
    targeted: targeted === 'true'
  };

  const items = await repo.medicationsSearch(q as string, flags, parsedLimit);
  res.json({ items });
});

// Adverse Events
router.get('/adverse-events', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { event_name, grade, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { event_name?: string; grade?: number } = {};
  if (event_name) filter.event_name = event_name as string;
  if (grade) filter.grade = parseInt(grade as string);

  const items = await repo.adverseEvents(filter, parsedLimit);
  res.json({ items });
});

// Adverse Event Management
router.get('/adverse-events/:id/management', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { id } = req.params;
  const { grade } = req.query;
  
  const gradeNum = grade ? parseInt(grade as string) : undefined;
  const items = await repo.adverseEventManagement(id, gradeNum);
  
  if (items.length === 0) {
    return res.status(404).json({ message: "No management protocols found" });
  }
  
  res.json({ items });
});

// Emergency Scenarios
router.get('/emergency-scenarios', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, severity, activeOnly, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { cancer_type?: string; severity?: string; activeOnly?: boolean } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (severity) filter.severity = severity as string;
  if (activeOnly === 'true') filter.activeOnly = true;

  const items = await repo.emergencyScenarios(filter, parsedLimit);
  res.json({ items });
});

// Emergency Protocols for Scenario
router.get('/emergency-scenarios/:id/protocols', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { id } = req.params;
  const items = await repo.emergencyProtocolsForScenario(id);
  
  if (items.length === 0) {
    return res.status(404).json({ message: "No protocols found for scenario" });
  }
  
  res.json({ items });
});

// Symptom Management
router.get('/symptom-management', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { symptom, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  const items = await repo.symptomManagement(symptom as string, parsedLimit);
  res.json({ items });
});

// Pain Protocols
router.get('/pain-protocols', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { pain_type, severity, activeOnly, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { pain_type?: string; severity?: string; activeOnly?: boolean } = {};
  if (pain_type) filter.pain_type = pain_type as string;
  if (severity) filter.severity = severity as string;
  if (activeOnly === 'true') filter.activeOnly = true;

  const items = await repo.painProtocols(filter, parsedLimit);
  res.json({ items });
});

// Monitoring Parameters
router.get('/monitoring-parameters', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, treatment_phase, category, limit } = req.query;
  const parsedLimit = parseLimit(limit, 100, 200);
  
  const filter: { cancer_type?: string; treatment_phase?: string; category?: string } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (treatment_phase) filter.treatment_phase = treatment_phase as string;
  if (category) filter.category = category as string;

  const items = await repo.monitoringParams(filter, parsedLimit);
  res.json({ items });
});

// Performance Scale
router.get('/performance-scale', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { scale_name } = req.query;
  if (!scale_name) {
    return res.status(400).json({ message: "scale_name parameter is required" });
  }

  const items = await repo.performanceScale(scale_name as string);
  res.json({ items });
});

// Biomarkers
router.get('/biomarkers', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, biomarker_name, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { cancer_type?: string; biomarker_name?: string } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (biomarker_name) filter.biomarker_name = biomarker_name as string;

  const items = await repo.biomarkers(filter, parsedLimit);
  res.json({ items });
});

// Follow-up Protocols
router.get('/follow-up-protocols', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, phase, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { cancer_type?: string; phase?: string } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (phase) filter.phase = phase as string;

  const items = await repo.followupProtocols(filter, parsedLimit);
  res.json({ items });
});

// Admission Criteria
router.get('/admission-criteria', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, admission_type, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { cancer_type?: string; admission_type?: string } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (admission_type) filter.admission_type = admission_type as string;

  const items = await repo.admissionCriteria(filter, parsedLimit);
  res.json({ items });
});

// Discharge Criteria
router.get('/discharge-criteria', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, treatment_type, limit } = req.query;
  const parsedLimit = parseLimit(limit, 50, 200);
  
  const filter: { cancer_type?: string; treatment_type?: string } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (treatment_type) filter.treatment_type = treatment_type as string;

  const items = await repo.dischargeCriteria(filter, parsedLimit);
  res.json({ items });
});

// Treatment Plan Criteria
router.get('/treatment-plan/criteria', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { category, cancer_specific, limit } = req.query;
  const parsedLimit = parseLimit(limit, 200, 200);
  
  const filter: { category?: string; cancer_specific?: string } = {};
  if (category) filter.category = category as string;
  if (cancer_specific) filter.cancer_specific = cancer_specific as string;

  const items = await repo.treatmentPlanCriteria(filter, parsedLimit);
  res.json({ items });
});

// Treatment Plan Mappings
router.get('/treatment-plan/mappings', async (req: Request, res: Response) => {
  const repo = getRepo();
  if (!repo) {
    return handleDbNotConfigured(res);
  }

  const { cancer_type, histology, intent, line, limit } = req.query;
  const parsedLimit = parseLimit(limit, 100, 200);
  
  const filter: { cancer_type?: string; histology?: string; intent?: string; line?: string } = {};
  if (cancer_type) filter.cancer_type = cancer_type as string;
  if (histology) filter.histology = histology as string;
  if (intent) filter.intent = intent as string;
  if (line) filter.line = line as string;

  const items = await repo.treatmentPlanMappings(filter, parsedLimit);
  res.json({ items });
});

export { router as dataRoutes };
