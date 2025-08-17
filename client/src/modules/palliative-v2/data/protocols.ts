// client/src/modules/palliative-v2/data/protocols.ts
export type Evidence = "A" | "B" | "C"; // UI-only grading

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
    }
  | {
      type: "section";
      title: string;
      body?: string;
      items?: ProtocolStep[];
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
    tags: ["opioids", "adjuvants", "neuropathic", "bone pain"],
    redFlags: ["New focal neuro deficit", "Suspected spinal cord compression", "Cauda equina symptoms"],
    citations: [
      { label: "WHO analgesic ladder", ref: "Overview" },
      { label: "Opioid rotation principles", ref: "Cross-tolerance 25–50% reduction" },
    ],
    steps: [
      {
        type: "section",
        title: "Assessment & Red Flags",
        items: [
          { type: "list", items: [
            "Characterize pain: nociceptive vs neuropathic; incident vs continuous; breakthrough frequency.",
            "Baseline severity, worst, and functional impact (consider ESAS-r).",
            "Screen delirium risks if agitated or fluctuating (4AT).",
            "Red flags: spinal cord compression, pathological fracture, escalating neuro deficits, sepsis.",
          ] }
        ]
      },
      {
        type: "section",
        title: "Foundational measures",
        items: [
          { type: "list", items: [
            "Non-opioids: acetaminophen; NSAIDs if not contraindicated (ulcer/renal/CV risk).",
            "Non-pharmacologic: positioning, heat/ice, pacing, relaxation.",
            "Constipation prophylaxis when starting/uptitrating opioids (stimulant ± softener)."
          ] }
        ]
      },
      {
        type: "section",
        title: "Opioid initiation (opioid-naïve) — verify local policy",
        body: "Start low, reassess frequently; elderly/frail: start at the lower end.",
        items: [
          { type: "table", title: "Typical immediate-release (IR) starting ranges",
            columns: ["Drug (oral IR)", "Start (q4h or PRN)", "Notes"],
            rows: [
              ["Morphine IR", "2.5–5 mg", "Lower in frail/elderly; monitor sedation."],
              ["Oxycodone IR", "2.5–5 mg", "Consider renal/hepatic adjustment."],
              ["Hydromorphone IR", "0.5–1 mg", "Potent; careful titration."],
            ]
          },
          { type: "warning", level: "caution", body: "Avoid codeine/tramadol for moderate–severe cancer pain; variable metabolism and ceiling effects." }
        ]
      },
      {
        type: "section",
        title: "Breakthrough (rescue) dosing",
        items: [
          { type: "text", body: "Use 10–15% of the total 24-hour opioid dose as IR rescue; reassess need and titrate basal dose accordingly." },
          { type: "warning", level: "info", body: "For transdermal fentanyl, use a short-acting opioid for breakthrough." }
        ]
      },
      {
        type: "section",
        title: "Titration & conversion to long-acting",
        items: [
          { type: "list", items: [
            "If frequent rescues or inadequate control, increase total daily dose proportionally.",
            "Consider long-acting when a stable 24–48h requirement is established.",
            "Reassess goals, function, and adverse effects at each change."
          ] }
        ]
      },
      {
        type: "section",
        title: "Opioid rotation — equianalgesia guide (reduce for cross-tolerance)",
        items: [
          { type: "table",
            title: "Approximate equianalgesic doses (adult) — verify local table",
            columns: ["Drug", "Oral", "Parenteral"],
            rows: [
              ["Morphine", "10 mg", "5 mg"],
              ["Hydromorphone", "2 mg", "1 mg"],
              ["Oxycodone", "6.6 mg", "—"],
              ["Fentanyl (TD)", "—", "25 mcg/h ≈ 60–100 mg oral morphine/day (range)"],
            ]},
          { type: "warning", level: "caution", body: "When rotating, reduce the calculated equianalgesic dose by 25–50% for incomplete cross-tolerance; then titrate to effect." },
          { type: "calc-link", to: "/palliative/calculators/opioid-rotation", label: "Open Opioid Rotation Helper" }
        ]
      },
      {
        type: "section",
        title: "Renal/hepatic impairment (selection & adjustment)",
        items: [
          { type: "list", items: [
            "Severe renal impairment: avoid morphine if possible; consider fentanyl or methadone (specialist).",
            "Hydromorphone may be preferred over morphine but still requires caution and dose/interval adjustment.",
            "Hepatic impairment: start low, go slow; monitor for accumulation."
          ]},
          { type: "warning", level: "danger", body: "Methadone requires expert oversight (variable half-life, QTc risk, complex conversions)." }
        ]
      },
      {
        type: "section",
        title: "Adjuvants & specific scenarios",
        items: [
          { type: "table",
            title: "Neuropathic adjuvants (starting points) — verify local formulary",
            columns: ["Agent", "Typical start", "Notes"],
            rows: [
              ["Gabapentin", "100–300 mg HS", "Titrate; renal adjust."],
              ["Pregabalin", "25–50 mg HS", "Titrate; renal adjust."],
              ["Duloxetine", "30 mg daily", "Hepatic caution."],
              ["Amitriptyline", "10–25 mg HS", "Anticholinergic/sedation cautions."],
            ]},
          { type: "list", items: [
            "Bone pain: consider NSAID if safe; dexamethasone; radiation oncology; bisphosphonate/denosumab when appropriate.",
            "Visceral colic: antispasmodics per local policy.",
            "Raised ICP: dexamethasone per protocol."
          ]}
        ]
      },
      {
        type: "section",
        title: "Adverse effects & mitigation",
        items: [
          { type: "list", items: [
            "Constipation: stimulant ± softener from day 1.",
            "Nausea: haloperidol or antiemetic pathway.",
            "Sedation/confusion: consider opioid-induced neurotoxicity (dehydration, infection, renal failure); consider dose reduction/rotation and hydration."
          ] }
        ]
      },
      {
        type: "section",
        title: "Interventional & non-pharmacologic options",
        items: [
          { type: "list", items: [
            "Radiation for painful metastases; vertebroplasty/kyphoplasty when indicated.",
            "Nerve blocks or neuraxial approaches via pain/anesthesia specialists.",
            "Psychosocial and rehabilitative supports."
          ] }
        ]
      },
      {
        type: "section",
        title: "Monitoring & safety",
        items: [
          { type: "list", items: [
            "Set patient-centered pain/function goals; document daily opioid totals.",
            "Monitor sedation/respiratory status, bowel function, N/V.",
            "Naloxone plan where appropriate; caregiver education on safe storage."
          ] }
        ]
      }
    ]
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
