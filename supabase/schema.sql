-- OncoVista Database Schema for Supabase
-- Run these commands in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'doctor', 'nurse', 'user')),
  department TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients table
CREATE TABLE public.patients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  phone TEXT,
  email TEXT,
  address JSONB,
  emergency_contact JSONB,
  medical_record_number TEXT UNIQUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Diagnoses table
CREATE TABLE public.diagnoses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  diagnosis_code TEXT NOT NULL,
  diagnosis_name TEXT NOT NULL,
  stage TEXT,
  grade TEXT,
  histology TEXT,
  primary_site TEXT,
  metastatic_sites TEXT[],
  biomarkers JSONB,
  diagnosis_date DATE,
  diagnosed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treatments table
CREATE TABLE public.treatments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  diagnosis_id UUID REFERENCES public.diagnoses(id),
  treatment_type TEXT NOT NULL CHECK (treatment_type IN ('chemotherapy', 'radiation', 'surgery', 'immunotherapy', 'targeted_therapy', 'palliative')),
  treatment_name TEXT NOT NULL,
  protocol_name TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'discontinued', 'paused')),
  cycle_number INTEGER,
  total_cycles INTEGER,
  dosage JSONB,
  side_effects TEXT[],
  response TEXT,
  notes TEXT,
  prescribed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treatment protocols table
CREATE TABLE public.treatment_protocols (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  protocol_code TEXT UNIQUE NOT NULL,
  protocol_name TEXT NOT NULL,
  cancer_type TEXT NOT NULL,
  stage TEXT,
  line_of_therapy INTEGER,
  description TEXT,
  medications JSONB,
  schedule JSONB,
  contraindications TEXT[],
  side_effects TEXT[],
  monitoring_parameters JSONB,
  evidence_level TEXT,
  guidelines_source TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medications table
CREATE TABLE public.medications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  brand_names TEXT[],
  classification TEXT,
  mechanism_of_action TEXT,
  indications TEXT[],
  contraindications TEXT[],
  side_effects TEXT[],
  dosing_guidelines JSONB,
  monitoring_parameters TEXT[],
  drug_interactions TEXT[],
  special_considerations TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clinical notes table
CREATE TABLE public.clinical_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  note_type TEXT NOT NULL CHECK (note_type IN ('progress', 'assessment', 'plan', 'consultation', 'discharge')),
  title TEXT,
  content TEXT NOT NULL,
  tags TEXT[],
  private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES auth.users(id),
  appointment_type TEXT NOT NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lab results table
CREATE TABLE public.lab_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  test_code TEXT,
  result_value TEXT,
  reference_range TEXT,
  unit TEXT,
  status TEXT DEFAULT 'normal' CHECK (status IN ('normal', 'abnormal', 'critical', 'pending')),
  test_date DATE,
  ordered_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_patients_patient_id ON public.patients(patient_id);
CREATE INDEX idx_patients_medical_record ON public.patients(medical_record_number);
CREATE INDEX idx_diagnoses_patient_id ON public.diagnoses(patient_id);
CREATE INDEX idx_treatments_patient_id ON public.treatments(patient_id);
CREATE INDEX idx_treatments_status ON public.treatments(status);
CREATE INDEX idx_clinical_notes_patient_id ON public.clinical_notes(patient_id);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_provider_id ON public.appointments(provider_id);
CREATE INDEX idx_appointments_scheduled_date ON public.appointments(scheduled_date);
CREATE INDEX idx_lab_results_patient_id ON public.lab_results(patient_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diagnoses_updated_at BEFORE UPDATE ON public.diagnoses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON public.treatments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_treatment_protocols_updated_at BEFORE UPDATE ON public.treatment_protocols FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON public.medications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clinical_notes_updated_at BEFORE UPDATE ON public.clinical_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lab_results_updated_at BEFORE UPDATE ON public.lab_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_results ENABLE ROW LEVEL SECURITY;

-- User profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

-- Patients: All authenticated users can view, only doctors/admins can modify
CREATE POLICY "Authenticated users can view patients" ON public.patients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only doctors and admins can insert patients" ON public.patients FOR INSERT TO authenticated WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND role IN ('doctor', 'admin')
  )
);
CREATE POLICY "Only doctors and admins can update patients" ON public.patients FOR UPDATE TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND role IN ('doctor', 'admin')
  )
);

-- Similar policies for other tables
CREATE POLICY "Authenticated users can view diagnoses" ON public.diagnoses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only doctors and admins can modify diagnoses" ON public.diagnoses FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND role IN ('doctor', 'admin')
  )
);

CREATE POLICY "Authenticated users can view treatments" ON public.treatments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only doctors and admins can modify treatments" ON public.treatments FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND role IN ('doctor', 'admin')
  )
);

CREATE POLICY "Authenticated users can view clinical notes" ON public.clinical_notes FOR SELECT TO authenticated USING (
  NOT private OR created_by = auth.uid()
);
CREATE POLICY "Users can insert their own clinical notes" ON public.clinical_notes FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update their own clinical notes" ON public.clinical_notes FOR UPDATE TO authenticated USING (created_by = auth.uid());

CREATE POLICY "Users can view their appointments" ON public.appointments FOR SELECT TO authenticated USING (
  provider_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.patients p 
    WHERE p.id = patient_id AND p.created_by = auth.uid()
  )
);

CREATE POLICY "Authenticated users can view lab results" ON public.lab_results FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only doctors and admins can modify lab results" ON public.lab_results FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND role IN ('doctor', 'admin')
  )
);

-- Insert some sample data for development
INSERT INTO public.treatment_protocols (protocol_code, protocol_name, cancer_type, description, active) VALUES
('LUNG-001', 'Standard Adjuvant Chemotherapy for NSCLC', 'lung', 'Standard adjuvant chemotherapy protocol for non-small cell lung cancer', true),
('BREAST-001', 'AC-T Protocol for Breast Cancer', 'breast', 'Adriamycin and Cyclophosphamide followed by Taxol', true),
('COLON-001', 'FOLFOX for Colorectal Cancer', 'colorectal', 'Leucovorin, 5-FU, and Oxaliplatin combination', true);

INSERT INTO public.medications (name, brand_names, classification, indications, active) VALUES
('Cisplatin', ARRAY['Platinol'], 'Alkylating agent', ARRAY['Lung cancer', 'Ovarian cancer', 'Bladder cancer'], true),
('Carboplatin', ARRAY['Paraplatin'], 'Alkylating agent', ARRAY['Ovarian cancer', 'Lung cancer'], true),
('Paclitaxel', ARRAY['Taxol'], 'Taxane', ARRAY['Breast cancer', 'Ovarian cancer', 'Lung cancer'], true),
('Doxorubicin', ARRAY['Adriamycin'], 'Anthracycline', ARRAY['Breast cancer', 'Lymphoma', 'Sarcoma'], true);
