// client/src/modules/palliative-v2/data/symptoms.ts
export type Symptom = {
  slug: string; title: string; category: "Pain"|"GI"|"Neuro"|"Resp"|"Psych";
  overview: string; evidence: "A"|"B"|"C"; updated: string; redFlags?: string[];
  steps: string[];
};
export const SYMPTOMS: Symptom[] = [
  {
    slug: "cancer-pain",
    title: "Cancer Pain (WHO Ladder)",
    category: "Pain",
    overview: "Stepwise approach with adjuvants; monitor for toxicity.",
    evidence: "A",
    updated: "2025-07-01",
    redFlags: ["Uncontrolled despite escalation", "Suspected spinal cord compression"],
    steps: ["Assess nociceptive vs neuropathic", "Start appropriate step", "Add adjuvants", "Reassess"],
  },
  {
    slug: "dyspnea",
    title: "Dyspnea",
    category: "Resp",
    overview: "Treat cause where possible; fan, opioids, positioning.",
    evidence: "B",
    updated: "2025-06-15",
    redFlags: ["Massive hemoptysis", "Airway compromise"],
    steps: ["Non-pharm first", "Low-dose opioid titration", "Consider anxiolysis", "Fan/positioning"],
  },
  {
    slug: "delirium",
    title: "Delirium",
    category: "Neuro",
    overview: "Screen with 4AT; treat causes; non-pharmacologic bundle.",
    evidence: "A",
    updated: "2025-05-30",
    redFlags: ["Reduced GCS", "Meningeal signs"],
    steps: ["4AT screen", "Identify reversible causes", "Environment optimization", "Family engagement"],
  },
];
