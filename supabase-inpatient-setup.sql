-- Supabase setup scripts for Inpatient Oncology Module
-- Run these in your Supabase SQL Editor

-- 1. Create tables for inpatient content

CREATE TABLE IF NOT EXISTS public.admission_criteria (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  inclusion JSONB NOT NULL DEFAULT '[]',
  exclusion JSONB DEFAULT '[]',
  initial_actions JSONB NOT NULL DEFAULT '[]',
  references JSONB DEFAULT '[]',
  evidence TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.emergency_protocols (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  red_flags JSONB NOT NULL DEFAULT '[]',
  immediate_actions JSONB NOT NULL DEFAULT '[]',
  diagnostics JSONB NOT NULL DEFAULT '[]',
  ongoing_management JSONB NOT NULL DEFAULT '[]',
  disposition JSONB NOT NULL DEFAULT '[]',
  references JSONB DEFAULT '[]',
  evidence TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.monitoring_workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('q4h', 'q6h', 'q8h', 'q12h', 'daily', 'eachShift', 'perPolicy')),
  parameters JSONB NOT NULL DEFAULT '[]',
  escalation_rules JSONB NOT NULL DEFAULT '[]',
  references JSONB DEFAULT '[]',
  evidence TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.supportive_care (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  indications JSONB NOT NULL DEFAULT '[]',
  non_pharmacologic JSONB NOT NULL DEFAULT '[]',
  precautions JSONB NOT NULL DEFAULT '[]',
  coordination JSONB NOT NULL DEFAULT '[]',
  references JSONB DEFAULT '[]',
  evidence TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.discharge_planning (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  criteria JSONB NOT NULL DEFAULT '[]',
  teach_back JSONB NOT NULL DEFAULT '[]',
  handoff JSONB NOT NULL DEFAULT '[]',
  safety_netting JSONB NOT NULL DEFAULT '[]',
  references JSONB DEFAULT '[]',
  evidence TEXT[] DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS) - Read-only access
ALTER TABLE public.admission_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supportive_care ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discharge_planning ENABLE ROW LEVEL SECURITY;

-- Read-only policies (public access)
CREATE POLICY "read-admission" ON public.admission_criteria FOR SELECT USING (true);
CREATE POLICY "read-emergency" ON public.emergency_protocols FOR SELECT USING (true);
CREATE POLICY "read-monitoring" ON public.monitoring_workflows FOR SELECT USING (true);
CREATE POLICY "read-supportive" ON public.supportive_care FOR SELECT USING (true);
CREATE POLICY "read-discharge" ON public.discharge_planning FOR SELECT USING (true);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admission_order ON public.admission_criteria (order_index NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_emergency_order ON public.emergency_protocols (order_index NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_monitoring_order ON public.monitoring_workflows (order_index NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_supportive_order ON public.supportive_care (order_index NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_discharge_order ON public.discharge_planning (order_index NULLS LAST);

-- 4. Sample data inserts

-- Admission Criteria samples
INSERT INTO public.admission_criteria (title, description, inclusion, exclusion, initial_actions, evidence, slug, order_index) VALUES
('Neutropenic Fever', 'Adult patients with absolute neutrophil count (ANC) < 500/μL and temperature ≥ 38.3°C (101°F)', 
 '["ANC < 500/μL or expected to drop below 500/μL within 48 hours", "Single temperature ≥ 38.3°C (101°F) or sustained ≥ 38.0°C (100.4°F) for 1 hour", "Recent chemotherapy within 30 days", "No obvious non-infectious cause of fever"]'::jsonb,
 '["Temperature elevation due to tumor fever (documented pattern)", "Drug fever with clear temporal relationship", "Blood product transfusion reaction within 4 hours"]'::jsonb,
 '["Obtain blood cultures from all lumens (if central line) + peripheral", "Complete blood count with differential", "Comprehensive metabolic panel, liver function tests", "Urinalysis and culture", "Chest X-ray", "Start empiric broad-spectrum antibiotics within 1 hour", "Assess need for antifungal coverage (prolonged neutropenia >7 days)"]'::jsonb,
 ARRAY['NCCN', 'ASCO'], 'neutropenic-fever', 1),

('Tumor Lysis Syndrome Risk', 'Metabolic complications from rapid tumor cell breakdown, typically within 3 days of treatment initiation',
 '["High tumor burden (bulky lymphoma, high WBC leukemia)", "Rapidly proliferating tumors (Burkitt lymphoma, ALL, AML)", "Pre-existing renal dysfunction", "Dehydration or oliguria", "Elevated baseline LDH, uric acid, or phosphorus"]'::jsonb,
 '["Chronic, slowly progressive disease", "Previous treatment without complications", "Normal renal function with low tumor burden"]'::jsonb,
 '["Risk stratify: low, intermediate, or high risk for TLS", "Aggressive IV hydration (target urine output 2-3 mL/kg/hr)", "Monitor electrolytes q6-8h initially, then q12h", "Consider allopurinol or rasburicase based on risk stratification", "Avoid potassium and phosphorus-containing solutions", "Hold ACE inhibitors and other nephrotoxic medications"]'::jsonb,
 ARRAY['NCCN', 'ESMO'], 'tumor-lysis-syndrome', 2);

-- Emergency Protocols samples
INSERT INTO public.emergency_protocols (name, red_flags, immediate_actions, diagnostics, ongoing_management, disposition, evidence, slug, order_index) VALUES
('Spinal Cord Compression', 
 '["New or worsening back pain with neurological symptoms", "Motor weakness in legs", "Sensory level or saddle anesthesia", "Bowel or bladder dysfunction", "Hyperreflexia or upgoing plantar reflexes"]'::jsonb,
 '["Urgent MRI spine (within 24 hours, preferably within 6 hours)", "Start dexamethasone 16mg IV/PO daily if high suspicion", "Neurosurgery and radiation oncology consultation", "Maintain strict bed rest with spine precautions", "Insert urinary catheter if bladder dysfunction"]'::jsonb,
 '["Complete neurological exam with strength testing", "MRI of entire spine with contrast", "Assess bladder function and post-void residual", "Consider CT if MRI contraindicated or unavailable"]'::jsonb,
 '["High-dose dexamethasone pending definitive treatment", "Coordinate urgent radiation therapy vs surgical decompression", "DVT prophylaxis", "Bowel and bladder management", "Physical therapy assessment"]'::jsonb,
 '["ICU if respiratory compromise or unstable", "Ward with neuro checks q4h minimum", "Consider transfer if no radiation oncology available"]'::jsonb,
 ARRAY['NCCN', 'ESMO'], 'spinal-cord-compression', 1),

('Hypercalcemia of Malignancy',
 '["Corrected calcium > 12 mg/dL (>3.0 mmol/L)", "Altered mental status, confusion", "Severe fatigue, weakness", "Nausea, vomiting, constipation", "Polyuria, polydipsia, dehydration"]'::jsonb,
 '["Normal saline 200-300 mL/hr (if no heart failure)", "Calcitonin 4 units/kg SQ/IM q12h for rapid onset", "Bisphosphonate therapy (zoledronic acid 4mg IV or pamidronate 90mg IV)", "Monitor renal function and electrolytes closely", "Hold calcium supplements, vitamin D, thiazides"]'::jsonb,
 '["Ionized calcium if available, or correct for albumin", "Complete metabolic panel, phosphorus, magnesium", "PTH, PTHrP, 25-OH vitamin D", "ECG (look for shortened QT interval)"]'::jsonb,
 '["Continue IV hydration with monitoring of fluid balance", "Bisphosphonate effect peaks at 2-4 days", "Consider denosumab if bisphosphonate contraindicated", "Treat underlying malignancy", "Hemodialysis for severe cases (>15 mg/dL) or renal failure"]'::jsonb,
 '["ICU if calcium >15 mg/dL or significant cardiac symptoms", "Ward with cardiac monitoring for moderate elevations", "Discharge when calcium stable and < 11 mg/dL"]'::jsonb,
 ARRAY['NCCN', 'Institutional'], 'hypercalcemia-malignancy', 2);

-- Monitoring Workflows samples
INSERT INTO public.monitoring_workflows (title, frequency, parameters, escalation_rules, evidence, slug, order_index) VALUES
('Neutropenic Patient Monitoring', 'q8h',
 '["Vital signs with temperature trend", "Neurological assessment (mental status changes)", "Cardiac rhythm and hemodynamic status", "Respiratory status and oxygen saturation", "Fluid balance (strict I/O)", "Skin and mucous membrane inspection", "Central line site assessment (if applicable)", "GI symptoms (nausea, vomiting, diarrhea)"]'::jsonb,
 '["Temperature > 38.3°C: notify MD immediately", "Systolic BP < 90 mmHg or 20% drop from baseline", "Heart rate > 120 bpm sustained", "Respiratory distress or O2 sat < 92%", "Altered mental status or new confusion", "New rash or mucosal lesions", "Signs of central line infection"]'::jsonb,
 ARRAY['NCCN', 'ASCO'], 'neutropenic-monitoring', 1),

('Post-Chemotherapy Monitoring', 'q12h',
 '["Complete blood count trending", "Metabolic panel with kidney and liver function", "Symptom assessment (pain, nausea, fatigue)", "Performance status evaluation", "Hydration status and weight", "Medication adherence and side effects", "Infection screening (temperature, symptoms)"]'::jsonb,
 '["ANC < 1000: increase monitoring frequency", "Platelets < 50,000: bleeding precautions", "Creatinine increase >50% from baseline", "Liver enzymes >3x upper limit normal", "Grade 3-4 toxicity per CTCAE", "Inability to maintain oral intake"]'::jsonb,
 ARRAY['NCCN', 'ASCO'], 'post-chemo-monitoring', 2);

-- Supportive Care samples
INSERT INTO public.supportive_care (title, indications, non_pharmacologic, precautions, coordination, evidence, slug, order_index) VALUES
('Chemotherapy-Induced Nausea and Vomiting',
 '["Patients receiving highly emetogenic chemotherapy", "Moderate emetogenic chemotherapy with risk factors", "History of poorly controlled CINV", "Breakthrough nausea despite prophylaxis"]'::jsonb,
 '["Dietary modifications (small, frequent meals)", "Avoid strong odors and triggers", "Ginger supplementation", "Acupressure wristbands", "Relaxation techniques and guided imagery", "Maintain adequate hydration"]'::jsonb,
 '["Monitor for QTc prolongation with ondansetron", "Drug interactions with aprepitant (CYP3A4)", "Extrapyramidal symptoms with metoclopramide", "Sedation with diphenhydramine in elderly"]'::jsonb,
 '["Pharmacy consultation for drug interactions", "Dietitian consultation for nutritional assessment", "Social work if impacting quality of life", "Consider psychiatry for anticipatory nausea"]'::jsonb,
 ARRAY['NCCN', 'ASCO'], 'cinv-management', 1),

('Cancer Pain Management',
 '["Tumor-related pain", "Treatment-related pain (mucositis, neuropathy)", "Bone pain from metastases", "Post-surgical pain", "Breakthrough pain episodes"]'::jsonb,
 '["Heat/cold therapy as appropriate", "Physical therapy and rehabilitation", "TENS unit for neuropathic pain", "Massage therapy", "Meditation and relaxation techniques", "Radiation therapy for bone pain"]'::jsonb,
 '["Respiratory depression with high-dose opioids", "Constipation prevention (prophylactic bowel regimen)", "Drug interactions with concurrent medications", "Opioid-induced hyperalgesia with long-term use", "Falls risk assessment in elderly patients"]'::jsonb,
 '["Pain management/palliative care consultation", "Physical therapy for functional assessment", "Pharmacy consultation for opioid conversions", "Case management for outpatient services"]'::jsonb,
 ARRAY['NCCN', 'ASCO'], 'pain-management', 2);

-- Discharge Planning samples
INSERT INTO public.discharge_planning (title, criteria, teach_back, handoff, safety_netting, evidence, slug, order_index) VALUES
('Neutropenic Patient Discharge',
 '["ANC trending upward or > 500/μL", "Afebrile for 24-48 hours", "Clinically stable vital signs", "Able to maintain oral intake", "Infection adequately treated or ruled out", "Safe home environment confirmed"]'::jsonb,
 '["Neutropenia precautions and infection prevention", "Temperature monitoring technique and frequency", "When to seek immediate medical attention", "Medication compliance and side effect monitoring", "Activity restrictions and gradual resumption", "Dietary restrictions (avoid raw foods, crowds)"]'::jsonb,
 '["Complete blood count results and trend", "Antibiotic course completion date", "Next scheduled follow-up appointment", "Emergency contact information provided", "Medication reconciliation completed", "Home health services arranged if needed"]'::jsonb,
 '["Temperature ≥ 100.4°F (38°C): come to ED immediately", "Shaking chills or rigors", "Persistent vomiting or inability to take medications", "Signs of infection (new cough, urinary symptoms)", "Unusual bleeding or bruising", "Severe fatigue or shortness of breath"]'::jsonb,
 ARRAY['NCCN', 'Institutional'], 'neutropenic-discharge', 1),

('Post-Chemotherapy Discharge',
 '["Chemotherapy infusion completed without major complications", "Vital signs stable and within normal parameters", "No evidence of immediate allergic reaction", "Adequate performance status for home care", "Understanding of post-treatment monitoring", "Follow-up care arranged"]'::jsonb,
 '["Expected timeline of side effects", "Importance of medication compliance", "Infection prevention measures", "Dietary recommendations and hydration", "Activity level and exercise guidelines", "Recognition of serious complications"]'::jsonb,
 '["Chemotherapy regimen and cycle day", "Pre-medications given and response", "Laboratory values and trends", "Next treatment date scheduled", "Supportive care medications prescribed", "Emergency contact information"]'::jsonb,
 '["Fever ≥ 100.4°F or persistent chills", "Persistent nausea/vomiting preventing fluid intake", "Severe diarrhea or dehydration", "Unusual bleeding, bruising, or petechiae", "Severe shortness of breath or chest pain", "Confusion or significant mood changes"]'::jsonb,
 ARRAY['NCCN', 'ASCO'], 'post-chemo-discharge', 2);

-- 5. Update functions to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admission_criteria_updated_at BEFORE UPDATE ON public.admission_criteria FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_protocols_updated_at BEFORE UPDATE ON public.emergency_protocols FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_monitoring_workflows_updated_at BEFORE UPDATE ON public.monitoring_workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_supportive_care_updated_at BEFORE UPDATE ON public.supportive_care FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discharge_planning_updated_at BEFORE UPDATE ON public.discharge_planning FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
