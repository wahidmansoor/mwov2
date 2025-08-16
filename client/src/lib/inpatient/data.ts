/**
 * Inpatient Oncology Static Content
 * 
 * GOALS:
 * - Evidence-informed inpatient oncology guidance in 5 sections
 * - Read-only, static content with stable IDs
 * - General, non-prescriptive wording (no specific drug doses)
 * 
 * NON-GOALS:
 * - No patient data storage or write operations
 * - Not a substitute for institutional policies
 */

import type { InpatientContent } from "./types";

export function getInpatientContent(): InpatientContent {
  return {
    admission: [
      {
        id: "admit-febrile-neutropenia",
        title: "Febrile Oncology Patient with Suspected Neutropenia",
        description: "Patients with fever and suspected low neutrophil count who require rapid assessment and inpatient monitoring.",
        inclusion: [
          "Temperature ≥38.0°C once or ≥37.5°C sustained",
          "Known or suspected neutropenia (e.g., recent cytotoxic therapy)",
          "Clinically unwell or high-risk features"
        ],
        exclusion: [
          "Hemodynamic instability requiring ICU (route directly to ICU)",
          "Clear non-infectious cause with close outpatient follow-up available"
        ],
        initialActions: [
          "Time-critical evaluation and cultures before antimicrobials if feasible",
          "Initiate institution-approved sepsis pathway",
          "Early involvement of oncology and infectious diseases per policy"
        ],
        references: [{ label: "NCCN Fever/Neutropenia" }],
        evidence: ["NCCN"]
      },
      {
        id: "admit-hypercalcemia",
        title: "Suspected Malignant Hypercalcemia",
        description: "Patients with cancer and symptoms suggestive of hypercalcemia needing inpatient correction and monitoring.",
        inclusion: [
          "Symptoms such as confusion, dehydration, polyuria, constipation",
          "Markedly elevated calcium on screening or previous records"
        ],
        initialActions: [
          "Assess hydration status and cardiac rhythm",
          "Screen for precipitating causes; coordinate with oncology/endocrinology"
        ],
        references: [{ label: "ASCO Supportive Care" }],
        evidence: ["ASCO"]
      },
      {
        id: "admit-pain-crisis",
        title: "Uncontrolled Cancer Pain Crisis",
        description: "Patients with cancer-related pain requiring urgent inpatient assessment and management optimization.",
        inclusion: [
          "Severe pain refractory to current regimen",
          "Need for parenteral route or complex titration",
          "Breakthrough pain with concerning frequency"
        ],
        exclusion: [
          "Stable pain manageable with outpatient adjustments",
          "Primary substance use disorder without cancer pain indication"
        ],
        initialActions: [
          "Comprehensive pain assessment and review of current regimen",
          "Screen for pain emergency complications (bowel obstruction, fracture)",
          "Early palliative care consultation if available"
        ],
        references: [{ label: "NCCN Adult Cancer Pain" }],
        evidence: ["NCCN"]
      }
    ],

    emergencies: [
      {
        id: "emerg-neutropenic-sepsis",
        name: "Neutropenic Sepsis",
        redFlags: [
          "Hypotension, altered mentation, tachypnea",
          "Rigors, rapidly progressive symptoms"
        ],
        immediateActions: [
          "Activate sepsis workflow per institutional policy",
          "Obtain blood cultures and indicated specimens promptly",
          "Start broad empiric antimicrobials per local guideline without delay"
        ],
        diagnostics: [
          "CBC with differential, CMP, lactate",
          "Chest evaluation as indicated (exam +/- imaging)",
          "Focused source identification"
        ],
        ongoingManagement: [
          "Close monitoring of vitals and urine output",
          "Daily clinical review with de-escalation per policy",
          "Early source control where applicable"
        ],
        disposition: [
          "Escalate to ICU for hemodynamic instability or refractory hypoxia",
          "Ward admission for stable patients with high-risk features"
        ],
        references: [{ label: "NCCN Fever/Neutropenia" }],
        evidence: ["NCCN"]
      },
      {
        id: "emerg-spinal-cord-compression",
        name: "Suspected Malignant Spinal Cord Compression",
        redFlags: [
          "New back pain with neurological deficits",
          "Bowel/bladder dysfunction or saddle anesthesia"
        ],
        immediateActions: [
          "Urgent contact with oncology/neurosurgery/radiation teams",
          "Rapid imaging per local pathway",
          "Protective handling and fall precautions"
        ],
        diagnostics: [
          "Urgent MRI per local availability",
          "Focused neuro exam and documentation"
        ],
        ongoingManagement: [
          "Pressure injury prevention and mobility plan",
          "Coordination with specialized teams for definitive management"
        ],
        disposition: [
          "Escalate if rapid deterioration",
          "Ward care if stable with active plan"
        ],
        references: [{ label: "ESMO Supportive Oncology" }],
        evidence: ["ESMO"]
      },
      {
        id: "emerg-svc-syndrome",
        name: "Superior Vena Cava (SVC) Syndrome",
        redFlags: ["Facial/upper limb swelling", "Respiratory distress, stridor"],
        immediateActions: [
          "Elevate head, continuous pulse oximetry",
          "Early multidisciplinary review (oncology, IR, thoracic) per pathway"
        ],
        diagnostics: [
          "Imaging per local protocol to confirm obstruction",
          "Assess for thrombotic vs extrinsic compression"
        ],
        ongoingManagement: [
          "Oxygen support as needed",
          "Plan for definitive intervention guided by teams"
        ],
        disposition: ["ICU for airway compromise", "Ward with close monitoring"],
        references: [{ label: "ASCO Emergencies in Oncology" }],
        evidence: ["ASCO"]
      },
      {
        id: "emerg-tumor-lysis",
        name: "Tumor Lysis Syndrome (TLS)",
        redFlags: ["Rising potassium, phosphate, uric acid", "Arrhythmia, seizures"],
        immediateActions: [
          "Activate institutional TLS pathway",
          "Cardiac monitoring and frequent labs per protocol"
        ],
        diagnostics: [
          "CMP, uric acid, phosphate, calcium, LDH",
          "Strict input/output monitoring"
        ],
        ongoingManagement: [
          "Close electrolyte monitoring and supportive measures",
          "Coordinate hematology-oncology for disease-directed therapy"
        ],
        disposition: ["ICU for severe electrolyte derangements", "Ward if stable"],
        references: [{ label: "NCCN Hematologic Malignancies – TLS" }],
        evidence: ["NCCN"]
      },
      {
        id: "emerg-hypercalcemia",
        name: "Hypercalcemia of Malignancy",
        redFlags: ["Altered mental status", "Dehydration", "Arrhythmia risk"],
        immediateActions: [
          "Assess volume status and cardiac rhythm",
          "Follow local hypercalcemia pathway"
        ],
        diagnostics: ["CMP, EKG as indicated", "Identify precipitating factors"],
        ongoingManagement: [
          "Frequent reassessment of symptoms and labs",
          "Interdisciplinary coordination for definitive care"
        ],
        disposition: ["ICU if unstable", "Ward if stable with plan"],
        references: [{ label: "ASCO Supportive Care" }],
        evidence: ["ASCO"]
      },
      {
        id: "emerg-severe-mucositis",
        name: "Severe Treatment-Related Mucositis",
        redFlags: ["Unable to swallow, dehydration", "Signs of secondary infection"],
        immediateActions: [
          "Pain assessment and supportive care measures",
          "Assess hydration and nutritional status"
        ],
        diagnostics: [
          "Clinical grading of mucositis severity",
          "Swallowing assessment if indicated"
        ],
        ongoingManagement: [
          "Oral care protocol and pain management",
          "Nutritional support planning with dietitian"
        ],
        disposition: ["Ward care with supportive measures", "Outpatient if mild"],
        references: [{ label: "NCCN Supportive Care" }],
        evidence: ["NCCN"]
      }
    ],

    monitoring: [
      {
        id: "mon-general-onc-ward",
        title: "General Oncology Ward – Daily Review",
        frequency: "daily",
        parameters: [
          "Vitals, pain, delirium screen, hydration status",
          "I/O balance, mobility/fall risk, pressure areas",
          "Access sites (lines/ports), infection screen",
          "Labs per policy (trend-based, avoid over-testing)"
        ],
        escalationRules: [
          "Any new red flags in emergency list",
          "Persistent fever or hemodynamic changes",
          "Worsening labs or clinical trajectory"
        ],
        references: [{ label: "Institutional Ward Standards" }],
        evidence: ["Institutional"]
      },
      {
        id: "mon-neutropenic",
        title: "Suspected/Confirmed Neutropenia – Close Monitoring",
        frequency: "eachShift",
        parameters: [
          "Temp curve, symptoms review, new localizing signs",
          "Daily CBC per policy; antimicrobial review",
          "Device/line checks, oral care, skin assessment"
        ],
        escalationRules: [
          "Lactate rise, hypotension, altered mentation",
          "New hypoxia or organ dysfunction"
        ],
        references: [{ label: "NCCN Fever/Neutropenia" }],
        evidence: ["NCCN"]
      },
      {
        id: "mon-post-chemo",
        title: "Post-Chemotherapy Observation",
        frequency: "q8h",
        parameters: [
          "Vital signs, nausea/vomiting assessment",
          "Fluid balance and electrolyte status",
          "Performance status and symptom burden"
        ],
        escalationRules: [
          "Persistent vomiting or dehydration",
          "New neurologic symptoms or confusion"
        ],
        references: [{ label: "ASCO Chemotherapy Safety" }],
        evidence: ["ASCO"]
      }
    ],

    supportive: [
      {
        id: "sup-vte-prophylaxis",
        title: "VTE Prevention (General Principles)",
        indications: [
          "Hospitalized oncology patients without contraindications",
          "High-risk peri-procedural periods per policy"
        ],
        nonPharmacologic: [
          "Early mobilization, leg exercises",
          "Mechanical prophylaxis where appropriate"
        ],
        precautions: [
          "Assess bleeding risk and procedures",
          "Reassess daily; hold per policy when indicated"
        ],
        coordination: [
          "Nursing for device fit/checks",
          "Pharmacy for interactions and timing"
        ],
        references: [{ label: "ASCO VTE in Cancer" }],
        evidence: ["ASCO"]
      },
      {
        id: "sup-transfusion-thresholds",
        title: "Transfusion – General Considerations",
        indications: [
          "Symptomatic anemia or institutional threshold triggers",
          "Platelet support per procedural risk and counts"
        ],
        nonPharmacologic: [
          "Fatigue management strategies",
          "Bleeding precautions education"
        ],
        precautions: [
          "Consent per policy; transfusion reactions monitoring",
          "Compatibility and special requirements per blood bank"
        ],
        coordination: [
          "Transfusion medicine service",
          "Nursing observation and documentation"
        ],
        references: [{ label: "Institutional Transfusion Policy" }],
        evidence: ["Institutional"]
      },
      {
        id: "sup-nutrition",
        title: "Nutrition & Refeeding Risk",
        indications: [
          "Weight loss, poor oral intake, treatment-related anorexia",
          "Swallow concerns or mucositis"
        ],
        nonPharmacologic: [
          "Dietitian referral, texture modification",
          "Small frequent meals, symptom control support"
        ],
        precautions: [
          "Screen for refeeding risk; monitor electrolytes",
          "Balance goals of care and burden/benefit"
        ],
        coordination: [
          "Dietitian, speech therapy (if swallowing issues)",
          "Pharmacy for supplement compatibility"
        ],
        references: [{ label: "ESMO Nutrition in Cancer" }],
        evidence: ["ESMO"]
      },
      {
        id: "sup-delirium-prevention",
        title: "Delirium Prevention & Management",
        indications: [
          "High-risk patients (elderly, multiple medications, prior episodes)",
          "Acute change in mental status"
        ],
        nonPharmacologic: [
          "Sleep hygiene, familiar objects, reorientation",
          "Minimize restraints and unnecessary devices"
        ],
        precautions: [
          "Review medications for deliriogenic agents",
          "Assess for underlying causes (infection, metabolic)"
        ],
        coordination: [
          "Nursing for environmental modifications",
          "Pharmacy for medication review"
        ],
        references: [{ label: "Institutional Delirium Protocol" }],
        evidence: ["Institutional"]
      }
    ],

    discharge: [
      {
        id: "discharge-general-onc",
        title: "General Oncology Discharge Bundle",
        criteria: [
          "Clinically stable with clarified diagnosis/plan",
          "No unresolved acute red flags",
          "Follow-up and investigations arranged"
        ],
        teachBack: [
          "Diagnosis summary and expected course",
          "When and how to seek urgent help (specific red flags)",
          "Medication purpose and timing; interactions to avoid"
        ],
        handoff: [
          "Clear problem list and pending results",
          "Contact details for oncology clinic",
          "Community/home-health instructions where applicable"
        ],
        safetyNetting: [
          "Return immediately for fever, chest pain, new neuro deficits",
          "Call if uncontrolled symptoms or concerning side effects"
        ],
        references: [{ label: "Institutional Discharge Standards" }],
        evidence: ["Institutional"]
      },
      {
        id: "discharge-post-chemo",
        title: "Post-Chemotherapy Discharge Planning",
        criteria: [
          "Stable vital signs and manageable symptom burden",
          "Adequate oral intake and hydration",
          "Understanding of expected side effects timeline"
        ],
        teachBack: [
          "Nadir timing and when to expect recovery",
          "Infection precautions and neutropenic fever signs",
          "Hydration maintenance and anti-emetic schedule"
        ],
        handoff: [
          "Treatment cycle details and next appointment",
          "Lab monitoring schedule and thresholds",
          "Emergency contact information for oncology team"
        ],
        safetyNetting: [
          "Fever ≥38°C, persistent vomiting, severe weakness",
          "Any bleeding, shortness of breath, or chest pain"
        ],
        references: [{ label: "NCCN Chemotherapy Guidelines" }],
        evidence: ["NCCN"]
      }
    ]
  };
}
