// client/src/modules/palliative-v2/data/protocols.ts
export type Evidence = "A" | "B" | "C"; // coarse grading for UI badges only

export type ProtocolStep =
  | { type: "text"; body: string }
  | { type: "list"; items: string[] }
  | {
      type: "table";
      title?: string;
      columns: string[];
      rows: (string | number)[][];
    }
  | {
      type: "warning";
      level: "info" | "caution" | "danger";
      body: string;
    }
  | {
      type: "calc-link";
      to:
        | "/palliative/calculators/pps"
        | "/palliative/calculators/ecog"
        | "/palliative/calculators/opioid-rotation"
        | "/palliative/assessments/4at";
      label: string;
    };

export type Protocol = {
  slug: string;
  title: string;
  category: "Pain" | "Resp" | "Neuro" | "GI" | "Psych";
  overview: string;
  evidence: Evidence;
  updated: string; // ISO date
  tags?: string[];
  redFlags?: string[];
  citations?: { label: string; ref: string }[];
  steps: ProtocolStep[];
};

export const PROTOCOLS: Protocol[] = [
  {
    slug: "cancer-pain",
    title: "Cancer Pain — Stepwise Approach",
    category: "Pain",
    overview:
      "Assess nociceptive vs neuropathic; titrate analgesia; add adjuvants; reassess frequently.",
    evidence: "A",
    updated: "2025-07-01",
    tags: ["opioids", "adjuvants"],
    redFlags: ["New focal neuro deficit", "Suspected spinal cord compression"],
    citations: [{ label: "WHO Ladder", ref: "Section 4.2" }],
    steps: [
      { type: "text", body: "Start with a structured assessment (PQRST, impact on function)." },
      {
        type: "list",
        items: [
          "Differentiate nociceptive vs neuropathic pain.",
          "Use short-acting opioid for titration if indicated.",
          "Add adjuvants per pain type (e.g., gabapentinoids for neuropathic).",
        ],
      },
      {
        type: "table",
        title: "Equianalgesic overview (for rotation planning — verify local table)",
        columns: ["Drug", "Oral", "Parenteral"],
        rows: [
          ["Morphine", "10 mg", "5 mg"],
          ["Hydromorphone", "2 mg", "1 mg"],
        ],
      },
      {
        type: "warning",
        level: "caution",
        body: "Rotation requires clinical oversight. Account for incomplete cross-tolerance.",
      },
      { type: "calc-link", to: "/palliative/calculators/opioid-rotation", label: "Open Opioid Rotation Helper" },
    ],
  },
  {
    slug: "dyspnea",
    title: "Dyspnea in Advanced Illness",
    category: "Resp",
    overview: "Prioritize non-pharmacologic bundle; consider low-dose opioids; fan/airflow and positioning.",
    evidence: "B",
    updated: "2025-06-15",
    tags: ["breathlessness", "opioids"],
    redFlags: ["Severe hypoxia", "Airway compromise", "Massive hemoptysis"],
    steps: [
      { type: "text", body: "Reversible causes? (e.g., effusion, infection) Treat where appropriate." },
      {
        type: "list",
        items: ["Positioning (upright)", "Fan directed to face", "Pacing/energy conservation", "Relaxation techniques"],
      },
      { type: "warning", level: "info", body: "Low-dose opioid titration may reduce dyspnea perception." },
    ],
  },
  {
    slug: "delirium",
    title: "Delirium — Assessment and First-Line Measures",
    category: "Neuro",
    overview: "Rapid screen (4AT), search for precipitants; non-pharmacologic bundle first.",
    evidence: "A",
    updated: "2025-05-30",
    tags: ["4AT", "agitation"],
    redFlags: ["Reduced GCS", "Meningeal signs", "New focal neurological signs"],
    steps: [
      { type: "calc-link", to: "/palliative/assessments/4at", label: "Open 4AT Screen" },
      {
        type: "list",
        items: [
          "Reorientation, sensory aids (glasses/hearing aids).",
          "Sleep hygiene, light cues.",
          "Mobilize if safe; family presence.",
        ],
      },
      { type: "warning", level: "danger", body: "Address hypoxia, hypoglycemia, sepsis promptly." },
    ],
  },
];
