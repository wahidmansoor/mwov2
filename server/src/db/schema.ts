// Database schema definition for OncoVista API
// This file defines the structure for Supabase/PostgreSQL integration

export interface ProtocolTable {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: 'symptom' | 'emergency';
  summary: string;
  content: any; // JSONB field for protocol content
  steps: string[];
  red_flags: string[];
  contraindications?: string[];
  medications?: any[]; // JSONB field for medication details
  monitoring?: string[];
  follow_up?: string[];
  evidence_level?: string;
  source?: string;
  tags?: string[];
  last_updated: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  is_active: boolean;
}

export interface CalculatorTable {
  id: string;
  name: string;
  type: string;
  description: string;
  formula: any; // JSONB field for calculator formula/logic
  parameters: any; // JSONB field for input parameters
  reference_ranges: any; // JSONB field for normal/abnormal ranges
  evidence_level?: string;
  source?: string;
  last_updated: string;
  created_at: string;
  is_active: boolean;
}

export interface AnalyticsUsageTable {
  id: string;
  user_id?: string;
  session_id?: string;
  module: string;
  action: string;
  metadata?: any; // JSONB field for additional data
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
  duration_ms?: number;
}

export interface EducationalContentTable {
  id: string;
  title: string;
  content: any; // JSONB field for content structure
  category: string;
  target_audience: string[];
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  source?: string;
  author?: string;
  last_updated: string;
  created_at: string;
  is_published: boolean;
}

export interface AIInteractionTable {
  id: string;
  user_id?: string;
  session_id?: string;
  service_type: 'summarize' | 'explain' | 'compare' | 'treatment_plan';
  input_data: any; // JSONB field for input parameters
  output_data: any; // JSONB field for AI response
  model_used: string;
  processing_time_ms: number;
  success: boolean;
  error_message?: string;
  timestamp: string;
}

// SQL Migration scripts for Supabase
export const createProtocolsTable = `
  CREATE TABLE IF NOT EXISTS protocols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('symptom', 'emergency')),
    summary TEXT NOT NULL,
    content JSONB NOT NULL,
    steps TEXT[] NOT NULL,
    red_flags TEXT[] NOT NULL,
    contraindications TEXT[],
    medications JSONB,
    monitoring TEXT[],
    follow_up TEXT[],
    evidence_level VARCHAR(100),
    source TEXT,
    tags TEXT[],
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
  );

  -- Indexes for better query performance
  CREATE INDEX IF NOT EXISTS idx_protocols_slug ON protocols(slug);
  CREATE INDEX IF NOT EXISTS idx_protocols_category ON protocols(category);
  CREATE INDEX IF NOT EXISTS idx_protocols_type ON protocols(type);
  CREATE INDEX IF NOT EXISTS idx_protocols_active ON protocols(is_active);
  CREATE INDEX IF NOT EXISTS idx_protocols_tags ON protocols USING GIN(tags);
  CREATE INDEX IF NOT EXISTS idx_protocols_content ON protocols USING GIN(content);
`;

export const createCalculatorsTable = `
  CREATE TABLE IF NOT EXISTS calculators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    formula JSONB NOT NULL,
    parameters JSONB NOT NULL,
    reference_ranges JSONB,
    evidence_level VARCHAR(100),
    source TEXT,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
  );

  CREATE INDEX IF NOT EXISTS idx_calculators_name ON calculators(name);
  CREATE INDEX IF NOT EXISTS idx_calculators_type ON calculators(type);
  CREATE INDEX IF NOT EXISTS idx_calculators_active ON calculators(is_active);
`;

export const createAnalyticsUsageTable = `
  CREATE TABLE IF NOT EXISTS analytics_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    session_id VARCHAR(255),
    module VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    duration_ms INTEGER
  );

  -- Indexes for analytics queries
  CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_usage(timestamp);
  CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_usage(user_id);
  CREATE INDEX IF NOT EXISTS idx_analytics_module ON analytics_usage(module);
  CREATE INDEX IF NOT EXISTS idx_analytics_action ON analytics_usage(action);
  CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_usage(session_id);
  
  -- Partitioning by month for better performance (optional)
  -- This would be set up as needed for high-volume installations
`;

export const createEducationalContentTable = `
  CREATE TABLE IF NOT EXISTS educational_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    content JSONB NOT NULL,
    category VARCHAR(100) NOT NULL,
    target_audience TEXT[] NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    tags TEXT[],
    source TEXT,
    author VARCHAR(255),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT FALSE
  );

  CREATE INDEX IF NOT EXISTS idx_educational_category ON educational_content(category);
  CREATE INDEX IF NOT EXISTS idx_educational_published ON educational_content(is_published);
  CREATE INDEX IF NOT EXISTS idx_educational_tags ON educational_content USING GIN(tags);
  CREATE INDEX IF NOT EXISTS idx_educational_audience ON educational_content USING GIN(target_audience);
`;

export const createAIInteractionTable = `
  CREATE TABLE IF NOT EXISTS ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    session_id VARCHAR(255),
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('summarize', 'explain', 'compare', 'treatment_plan')),
    input_data JSONB NOT NULL,
    output_data JSONB,
    model_used VARCHAR(100) NOT NULL,
    processing_time_ms INTEGER,
    success BOOLEAN NOT NULL DEFAULT FALSE,
    error_message TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_ai_timestamp ON ai_interactions(timestamp);
  CREATE INDEX IF NOT EXISTS idx_ai_user_id ON ai_interactions(user_id);
  CREATE INDEX IF NOT EXISTS idx_ai_service_type ON ai_interactions(service_type);
  CREATE INDEX IF NOT EXISTS idx_ai_success ON ai_interactions(success);
`;

// Row Level Security (RLS) policies for Supabase
export const enableRLS = `
  -- Enable RLS on all tables
  ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
  ALTER TABLE calculators ENABLE ROW LEVEL SECURITY;
  ALTER TABLE analytics_usage ENABLE ROW LEVEL SECURITY;
  ALTER TABLE educational_content ENABLE ROW LEVEL SECURITY;
  ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

  -- Basic read policies (all authenticated users can read active content)
  CREATE POLICY "Allow read access to active protocols" ON protocols
    FOR SELECT USING (is_active = true);

  CREATE POLICY "Allow read access to active calculators" ON calculators
    FOR SELECT USING (is_active = true);

  CREATE POLICY "Allow read access to published educational content" ON educational_content
    FOR SELECT USING (is_published = true);

  -- Analytics policies (users can only see their own data)
  CREATE POLICY "Users can read their own analytics" ON analytics_usage
    FOR SELECT USING (user_id = auth.uid());

  CREATE POLICY "Users can insert their own analytics" ON analytics_usage
    FOR INSERT WITH CHECK (user_id = auth.uid());

  -- AI interaction policies
  CREATE POLICY "Users can read their own AI interactions" ON ai_interactions
    FOR SELECT USING (user_id = auth.uid());

  CREATE POLICY "Users can insert their own AI interactions" ON ai_interactions
    FOR INSERT WITH CHECK (user_id = auth.uid());
`;

// Sample data insertion functions
export const insertSampleData = `
  -- Insert sample protocols
  INSERT INTO protocols (slug, title, category, type, summary, content, steps, red_flags) VALUES
  ('cancer-pain', 'Cancer Pain Management', 'pain_management', 'symptom', 
   'WHO analgesic ladder approach', 
   '{"approach": "stepwise", "evidence": "Level I"}',
   ARRAY['Assess pain severity', 'Apply WHO ladder', 'Monitor response'],
   ARRAY['Severe breakthrough pain', 'Neurological deficits']),
  
  ('spinal-cord-compression', 'Malignant Spinal Cord Compression', 'oncological_emergencies', 'emergency',
   'Urgent neurological emergency requiring immediate intervention',
   '{"urgency": "immediate", "timeframe": "hours"}',
   ARRAY['Immediate neurological assessment', 'Urgent MRI', 'High-dose steroids'],
   ARRAY['Progressive weakness', 'Bladder dysfunction']);
`;

// Function to setup the complete database
export const setupDatabase = `
  ${createProtocolsTable}
  ${createCalculatorsTable}
  ${createAnalyticsUsageTable}
  ${createEducationalContentTable}
  ${createAIInteractionTable}
  ${enableRLS}
`;
