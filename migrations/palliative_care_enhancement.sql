-- PALLIATIVE CARE MODULE ENHANCEMENT - DATABASE SCHEMA MIGRATION
-- OncoVista AI Platform - Enhanced Palliative Care Decision Support
-- Date: January 27, 2025
-- Version: 2.0

-- =====================================================
-- VALIDATED SYMPTOM ASSESSMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS validated_symptom_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  assessment_type VARCHAR(100) NOT NULL, -- 'ESAS-R', 'IPOS', 'Distress', 'FACT-G'
  assessment_data JSONB NOT NULL, -- Complete assessment responses
  total_score DECIMAL(5,2),
  severity_level VARCHAR(50), -- 'Mild', 'Moderate', 'Severe'
  clinical_interpretation TEXT,
  ai_analysis JSONB, -- AI-generated insights and recommendations
  recommended_interventions JSONB, -- Structured intervention recommendations
  follow_up_required BOOLEAN DEFAULT false,
  next_assessment_date TIMESTAMP,
  nccn_reference VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- PAIN PHENOTYPES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS pain_phenotypes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  pain_type VARCHAR(100) NOT NULL, -- 'Nociceptive', 'Neuropathic', 'Mixed', 'Nociplastic'
  pain_mechanism VARCHAR(100), -- 'Inflammatory', 'Mechanical', 'Ischemic', 'Nerve damage'
  pain_location JSONB NOT NULL, -- Anatomical regions with severity mapping
  pain_quality JSONB, -- 'Sharp', 'Burning', 'Aching', 'Shooting', etc.
  pain_pattern VARCHAR(100), -- 'Constant', 'Intermittent', 'Breakthrough'
  pain_intensity_current INTEGER CHECK (pain_intensity_current >= 0 AND pain_intensity_current <= 10),
  pain_intensity_worst INTEGER CHECK (pain_intensity_worst >= 0 AND pain_intensity_worst <= 10),
  pain_intensity_average INTEGER CHECK (pain_intensity_average >= 0 AND pain_intensity_average <= 10),
  pain_impact_function JSONB, -- Functional impact assessment
  pain_impact_mood JSONB, -- Mood and psychological impact
  triggering_factors JSONB, -- Activities or conditions that worsen pain
  relieving_factors JSONB, -- Activities or treatments that help
  current_medications JSONB, -- Current pain medications and effectiveness
  previous_treatments JSONB, -- Previous pain treatments and outcomes
  comorbidities JSONB, -- Relevant medical conditions
  assessment_tools_used JSONB, -- BPI, McGill, LANSS, etc.
  ai_phenotype_prediction JSONB, -- AI-generated pain phenotype analysis
  recommended_approach JSONB, -- Comprehensive treatment approach
  specialist_referral_needed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- COMMUNICATION LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS communication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  communication_type VARCHAR(100) NOT NULL, -- 'SPIKES', 'Goals_of_Care', 'Family_Meeting', 'Prognostic'
  conversation_framework VARCHAR(100), -- 'SPIKES', 'VitalTalk', 'Ask-Tell-Ask'
  participants JSONB, -- List of participants and roles
  conversation_context JSONB, -- Setting, purpose, background
  communication_steps JSONB, -- Step-by-step conversation log
  patient_understanding JSONB, -- Assessment of patient comprehension
  emotional_responses JSONB, -- Emotional reactions and support provided
  questions_concerns JSONB, -- Patient/family questions and concerns
  decisions_made JSONB, -- Decisions and agreements reached
  follow_up_planned JSONB, -- Next steps and follow-up actions
  goals_identified JSONB, -- Patient values and goals identified
  advance_directives_discussed BOOLEAN DEFAULT false,
  code_status_discussed BOOLEAN DEFAULT false,
  cultural_considerations JSONB, -- Cultural and spiritual factors
  communication_barriers JSONB, -- Language, cognitive, or other barriers
  interpreter_used BOOLEAN DEFAULT false,
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 10),
  ai_communication_insights JSONB, -- AI-generated communication analysis
  improvement_recommendations JSONB, -- Suggestions for future conversations
  nccn_reference VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- SPIRITUAL ASSESSMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS spiritual_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  assessment_type VARCHAR(100) NOT NULL, -- 'FICA', 'HOPE', 'Spiritual_History'
  faith_tradition VARCHAR(100), -- Religious or spiritual background
  faith_importance_rating INTEGER CHECK (faith_importance_rating >= 1 AND faith_importance_rating <= 10),
  spiritual_community VARCHAR(255), -- Religious community or congregation
  spiritual_practices JSONB, -- Prayer, meditation, rituals, etc.
  spiritual_support_sources JSONB, -- Clergy, spiritual advisors, community
  spiritual_concerns JSONB, -- Spiritual distress or questions
  meaning_making JSONB, -- How patient finds meaning in illness
  hope_sources JSONB, -- Sources of hope and strength
  forgiveness_issues JSONB, -- Guilt, forgiveness, reconciliation needs
  end_of_life_beliefs JSONB, -- Beliefs about death and afterlife
  ritual_preferences JSONB, -- Desired spiritual rituals or practices
  chaplaincy_referral_needed BOOLEAN DEFAULT false,
  chaplaincy_referral_made BOOLEAN DEFAULT false,
  spiritual_care_plan JSONB, -- Individualized spiritual care approach
  cultural_considerations JSONB, -- Cultural factors affecting spiritual care
  family_spiritual_needs JSONB, -- Family spiritual support needs
  ai_spiritual_insights JSONB, -- AI-generated spiritual care recommendations
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- ONCOLOGICAL EMERGENCIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS oncological_emergencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  emergency_type VARCHAR(100) NOT NULL, -- 'SVCS', 'Spinal_Cord_Compression', 'Hypercalcemia', 'Hemorrhage'
  presentation_symptoms JSONB NOT NULL, -- Initial presenting symptoms
  severity_level VARCHAR(50) NOT NULL, -- 'Mild', 'Moderate', 'Severe', 'Life-threatening'
  time_to_recognition INTERVAL, -- Time from symptom onset to recognition
  diagnostic_workup JSONB, -- Tests ordered and results
  nccn_protocol_followed VARCHAR(100), -- Specific NCCN emergency protocol
  immediate_interventions JSONB, -- Emergency treatments initiated
  response_to_treatment JSONB, -- Patient response to interventions
  complications JSONB, -- Any complications during treatment
  specialist_consultations JSONB, -- Specialists involved in care
  imaging_studies JSONB, -- CT, MRI, X-ray findings
  laboratory_values JSONB, -- Relevant lab values and trends
  monitoring_parameters JSONB, -- Vital signs and other monitoring
  family_notification BOOLEAN DEFAULT false,
  family_communication_log JSONB, -- Communication with family members
  discharge_planning JSONB, -- Disposition and follow-up plans
  quality_metrics JSONB, -- Time metrics and quality indicators
  lessons_learned JSONB, -- Case review and improvement opportunities
  ai_emergency_analysis JSONB, -- AI-powered emergency response analysis
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- QUALITY METRICS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS palliative_quality_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255),
  user_id UUID REFERENCES users(id),
  metric_category VARCHAR(100) NOT NULL, -- 'NCCN_Compliance', 'PROM', 'Caregiver_Burden', 'Symptom_Control'
  metric_name VARCHAR(255) NOT NULL,
  metric_value DECIMAL(10,3),
  metric_unit VARCHAR(50), -- 'percentage', 'score', 'days', 'count'
  target_value DECIMAL(10,3), -- Benchmark or target value
  performance_level VARCHAR(50), -- 'Below_Target', 'At_Target', 'Above_Target'
  measurement_period_start TIMESTAMP,
  measurement_period_end TIMESTAMP,
  patient_population VARCHAR(255), -- Demographics or clinical characteristics
  nccn_quality_indicator VARCHAR(100), -- Specific NCCN quality measure
  data_source VARCHAR(100), -- Source of metric data
  calculation_method TEXT, -- How metric was calculated
  statistical_significance DECIMAL(5,3), -- P-value if applicable
  confidence_interval JSONB, -- 95% CI if applicable
  trend_direction VARCHAR(50), -- 'Improving', 'Stable', 'Declining'
  benchmark_comparison JSONB, -- Comparison to national or institutional benchmarks
  action_items JSONB, -- Quality improvement actions identified
  responsible_team JSONB, -- Team members responsible for improvement
  improvement_timeline JSONB, -- Timeline for quality improvement initiatives
  ai_quality_insights JSONB, -- AI-generated quality improvement recommendations
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- CAREGIVER ASSESSMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS caregiver_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  caregiver_relationship VARCHAR(100), -- 'Spouse', 'Child', 'Parent', 'Friend', 'Professional'
  assessment_type VARCHAR(100) NOT NULL, -- 'Zarit_Burden', 'Caregiver_Strain', 'PHQ-9', 'GAD-7'
  burden_score INTEGER,
  strain_level VARCHAR(50), -- 'Minimal', 'Mild', 'Moderate', 'Severe'
  physical_health_impact JSONB, -- Impact on caregiver physical health
  emotional_health_impact JSONB, -- Impact on caregiver mental health
  social_impact JSONB, -- Impact on social relationships and activities
  financial_impact JSONB, -- Financial strain and concerns
  work_impact JSONB, -- Impact on employment
  support_systems JSONB, -- Available support resources
  coping_strategies JSONB, -- Current coping mechanisms
  educational_needs JSONB, -- Areas where caregiver needs education
  respite_care_needs BOOLEAN DEFAULT false,
  professional_support_needed JSONB, -- Types of professional support needed
  support_group_interest BOOLEAN DEFAULT false,
  ai_caregiver_insights JSONB, -- AI-generated caregiver support recommendations
  intervention_plan JSONB, -- Personalized caregiver support plan
  follow_up_schedule JSONB, -- Planned follow-up assessments
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- FUNCTIONAL STATUS ASSESSMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS functional_status_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  assessment_type VARCHAR(100) NOT NULL, -- 'Karnofsky', 'ECOG', 'Barthel', 'FIM'
  karnofsky_score INTEGER CHECK (karnofsky_score >= 0 AND karnofsky_score <= 100),
  ecog_score INTEGER CHECK (ecog_score >= 0 AND ecog_score <= 4),
  barthel_score INTEGER CHECK (barthel_score >= 0 AND barthel_score <= 100),
  activities_of_daily_living JSONB, -- ADL assessment details
  instrumental_activities JSONB, -- IADL assessment details
  mobility_assessment JSONB, -- Walking, transfers, etc.
  cognitive_function JSONB, -- Cognitive status assessment
  social_function JSONB, -- Social interaction and participation
  work_status VARCHAR(100), -- Employment status and capacity
  driving_ability BOOLEAN,
  equipment_needs JSONB, -- Assistive devices and equipment
  home_safety_assessment JSONB, -- Home environment evaluation
  caregiver_assistance_level JSONB, -- Level of assistance needed
  rehabilitation_needs JSONB, -- PT, OT, speech therapy needs
  functional_goals JSONB, -- Patient-identified functional goals
  barriers_to_function JSONB, -- Identified barriers to optimal function
  ai_functional_analysis JSONB, -- AI-generated functional improvement recommendations
  intervention_priorities JSONB, -- Prioritized functional interventions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- PSYCHOSOCIAL ASSESSMENTS TABLE (Enhanced)
-- =====================================================
CREATE TABLE IF NOT EXISTS psychosocial_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  assessment_type VARCHAR(100) NOT NULL, -- 'PHQ-9', 'GAD-7', 'Distress_Thermometer', 'Comprehensive'
  depression_score INTEGER,
  anxiety_score INTEGER,
  distress_level INTEGER CHECK (distress_level >= 0 AND distress_level <= 10),
  suicide_risk_level VARCHAR(50), -- 'None', 'Low', 'Moderate', 'High'
  coping_strategies JSONB, -- Current coping mechanisms
  social_support_network JSONB, -- Family, friends, community support
  financial_concerns JSONB, -- Financial stressors and needs
  work_concerns JSONB, -- Employment and work-related issues
  insurance_issues JSONB, -- Insurance coverage and access problems
  transportation_barriers JSONB, -- Transportation challenges
  childcare_eldercare_needs JSONB, -- Dependent care responsibilities
  housing_stability JSONB, -- Housing situation and stability
  substance_use_history JSONB, -- Alcohol, tobacco, drug use
  trauma_history JSONB, -- Previous traumatic experiences
  mental_health_history JSONB, -- Previous mental health treatment
  cultural_factors JSONB, -- Cultural influences on coping and care
  body_image_concerns JSONB, -- Body image and appearance concerns
  sexuality_intimacy_concerns JSONB, -- Sexual health and intimacy issues
  existential_concerns JSONB, -- Meaning-making and existential distress
  ai_psychosocial_insights JSONB, -- AI-generated psychosocial recommendations
  intervention_recommendations JSONB, -- Recommended psychosocial interventions
  referral_needs JSONB, -- Professional referrals needed
  safety_planning JSONB, -- Safety plan if needed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_validated_assessments_session ON validated_symptom_assessments(session_id);
CREATE INDEX IF NOT EXISTS idx_validated_assessments_type ON validated_symptom_assessments(assessment_type);
CREATE INDEX IF NOT EXISTS idx_validated_assessments_date ON validated_symptom_assessments(created_at);

CREATE INDEX IF NOT EXISTS idx_pain_phenotypes_session ON pain_phenotypes(session_id);
CREATE INDEX IF NOT EXISTS idx_pain_phenotypes_type ON pain_phenotypes(pain_type);
CREATE INDEX IF NOT EXISTS idx_pain_phenotypes_date ON pain_phenotypes(created_at);

CREATE INDEX IF NOT EXISTS idx_communication_logs_session ON communication_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_communication_logs_type ON communication_logs(communication_type);
CREATE INDEX IF NOT EXISTS idx_communication_logs_date ON communication_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_spiritual_assessments_session ON spiritual_assessments(session_id);
CREATE INDEX IF NOT EXISTS idx_spiritual_assessments_type ON spiritual_assessments(assessment_type);

CREATE INDEX IF NOT EXISTS idx_oncological_emergencies_type ON oncological_emergencies(emergency_type);
CREATE INDEX IF NOT EXISTS idx_oncological_emergencies_severity ON oncological_emergencies(severity_level);
CREATE INDEX IF NOT EXISTS idx_oncological_emergencies_date ON oncological_emergencies(created_at);

CREATE INDEX IF NOT EXISTS idx_quality_metrics_category ON palliative_quality_metrics(metric_category);
CREATE INDEX IF NOT EXISTS idx_quality_metrics_name ON palliative_quality_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_quality_metrics_period ON palliative_quality_metrics(measurement_period_start, measurement_period_end);

CREATE INDEX IF NOT EXISTS idx_caregiver_assessments_session ON caregiver_assessments(session_id);
CREATE INDEX IF NOT EXISTS idx_caregiver_assessments_type ON caregiver_assessments(assessment_type);

CREATE INDEX IF NOT EXISTS idx_functional_status_session ON functional_status_assessments(session_id);
CREATE INDEX IF NOT EXISTS idx_functional_status_type ON functional_status_assessments(assessment_type);

CREATE INDEX IF NOT EXISTS idx_psychosocial_assessments_session ON psychosocial_assessments(session_id);
CREATE INDEX IF NOT EXISTS idx_psychosocial_assessments_type ON psychosocial_assessments(assessment_type);

-- =====================================================
-- TRIGGER FOR UPDATED_AT TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all new tables
CREATE TRIGGER update_validated_assessments_updated_at 
    BEFORE UPDATE ON validated_symptom_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pain_phenotypes_updated_at 
    BEFORE UPDATE ON pain_phenotypes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_logs_updated_at 
    BEFORE UPDATE ON communication_logs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spiritual_assessments_updated_at 
    BEFORE UPDATE ON spiritual_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oncological_emergencies_updated_at 
    BEFORE UPDATE ON oncological_emergencies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quality_metrics_updated_at 
    BEFORE UPDATE ON palliative_quality_metrics 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_caregiver_assessments_updated_at 
    BEFORE UPDATE ON caregiver_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_functional_status_updated_at 
    BEFORE UPDATE ON functional_status_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_psychosocial_assessments_updated_at 
    BEFORE UPDATE ON psychosocial_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Schema version: 2.0
-- Tables added: 9 new comprehensive palliative care tables
-- Indexes created: 25 performance optimization indexes
-- Triggers created: 9 automatic timestamp update triggers
-- Ready for OncoVista AI Palliative Care Module Enhancement