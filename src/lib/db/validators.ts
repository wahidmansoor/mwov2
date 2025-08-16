// Zod validators for JSONB fields in Supabase tables
// Permissive schemas (z.unknown()) with TODOs for future refinement
import { z } from 'zod';

// Admission Criteria validators
export const zAdmissionCriteriaClinicalIndications = z.unknown(); // TODO: define shape
export const zAdmissionCriteriaExclusionCriteria = z.unknown(); // TODO: define shape
export const zAdmissionCriteriaRiskFactors = z.unknown(); // TODO: define shape
export const zAdmissionCriteriaRequiredAssessments = z.unknown(); // TODO: define shape
export const zAdmissionCriteriaSpecialRequirements = z.unknown(); // TODO: define shape
export const zAdmissionCriteriaContraindications = z.unknown(); // TODO: define shape

// Adverse Event Management validators
export const zAdverseEventManagementImmediateActions = z.unknown(); // TODO: define shape
export const zAdverseEventManagementTreatmentModifications = z.unknown(); // TODO: define shape
export const zAdverseEventManagementSupportiveCare = z.unknown(); // TODO: define shape
export const zAdverseEventManagementMedications = z.unknown(); // TODO: define shape
export const zAdverseEventManagementMonitoringRequirements = z.unknown(); // TODO: define shape
export const zAdverseEventManagementConsultationRequired = z.unknown(); // TODO: define shape
export const zAdverseEventManagementPatientEducation = z.unknown(); // TODO: define shape
export const zAdverseEventManagementFollowUpProtocol = z.unknown(); // TODO: define shape
export const zAdverseEventManagementRechallengeCriteria = z.unknown(); // TODO: define shape
export const zAdverseEventManagementReportingRequirements = z.unknown(); // TODO: define shape

// Adverse Events validators
export const zAdverseEventsClinicalPresentation = z.unknown(); // TODO: define shape
export const zAdverseEventsRiskFactors = z.unknown(); // TODO: define shape
export const zAdverseEventsAssociatedTreatments = z.unknown(); // TODO: define shape
export const zAdverseEventsPreventionStrategies = z.unknown(); // TODO: define shape

// AI Interactions validators
export const zAiInteractionsInputContext = z.unknown(); // TODO: define shape
export const zAiInteractionsAiResponse = z.unknown(); // TODO: define shape

// Antibiotic Protocols validators
export const zAntibioticProtocolsEmpiricTherapy = z.unknown(); // TODO: define shape
export const zAntibioticProtocolsTargetedTherapy = z.unknown(); // TODO: define shape
export const zAntibioticProtocolsMonitoringParameters = z.unknown(); // TODO: define shape
export const zAntibioticProtocolsAdjustmentCriteria = z.unknown(); // TODO: define shape
export const zAntibioticProtocolsDiscontinuationCriteria = z.unknown(); // TODO: define shape
export const zAntibioticProtocolsSideEffects = z.unknown(); // TODO: define shape
export const zAntibioticProtocolsDrugInteractions = z.unknown(); // TODO: define shape

// Antiemetic Protocols validators
export const zAntiemeticProtocolsPremedications = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsAcutePhase = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsDelayedPhase = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsAnticipatoryPhase = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsBreakthroughMedications = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsContraindications = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsDrugInteractions = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsSideEffects = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsMonitoringParameters = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsPatientInstructions = z.unknown(); // TODO: define shape
export const zAntiemeticProtocolsEfficacyMarkers = z.unknown(); // TODO: define shape

// Audit Log validators
export const zAuditLogOldValues = z.unknown(); // TODO: define shape
export const zAuditLogNewValues = z.unknown(); // TODO: define shape

// Biomarker Guidelines validators
export const zBiomarkerGuidelinesClinicalIndications = z.unknown(); // TODO: define shape
export const zBiomarkerGuidelinesInterpretationCriteria = z.unknown(); // TODO: define shape
export const zBiomarkerGuidelinesTherapeuticImplications = z.unknown(); // TODO: define shape
export const zBiomarkerGuidelinesQualityRequirements = z.unknown(); // TODO: define shape
export const zBiomarkerGuidelinesReportingStandards = z.unknown(); // TODO: define shape
export const zBiomarkerGuidelinesSpecialConsiderations = z.unknown(); // TODO: define shape

// CD Protocols validators
export const zCdProtocolsEligibility = z.unknown(); // TODO: define shape
export const zCdProtocolsPrecautions = z.unknown(); // TODO: define shape
export const zCdProtocolsTreatment = z.unknown(); // TODO: define shape
export const zCdProtocolsTests = z.unknown(); // TODO: define shape
export const zCdProtocolsDoseModifications = z.unknown(); // TODO: define shape
export const zCdProtocolsReferenceList = z.unknown(); // TODO: define shape
export const zCdProtocolsCycleInfo = z.unknown(); // TODO: define shape
export const zCdProtocolsPreMedications = z.unknown(); // TODO: define shape
export const zCdProtocolsPostMedications = z.unknown(); // TODO: define shape
export const zCdProtocolsSupportiveCare = z.unknown(); // TODO: define shape
export const zCdProtocolsRescueAgents = z.unknown(); // TODO: define shape
export const zCdProtocolsMonitoring = z.unknown(); // TODO: define shape
export const zCdProtocolsToxicityMonitoring = z.unknown(); // TODO: define shape
export const zCdProtocolsInteractions = z.unknown(); // TODO: define shape
export const zCdProtocolsContraindications = z.unknown(); // TODO: define shape

// Clinical Decision Rules validators
export const zClinicalDecisionRulesConditions = z.unknown(); // TODO: define shape
export const zClinicalDecisionRulesRecommendations = z.unknown(); // TODO: define shape
export const zClinicalDecisionRulesEvidenceReferences = z.unknown(); // TODO: define shape

// Clinical Decision Support validators
export const zClinicalDecisionSupportInputParameters = z.unknown(); // TODO: define shape
export const zClinicalDecisionSupportNccnReferences = z.unknown(); // TODO: define shape
export const zClinicalDecisionSupportRecommendedActions = z.unknown(); // TODO: define shape
export const zClinicalDecisionSupportAlternativeOptions = z.unknown(); // TODO: define shape

// Clinical Protocols validators
export const zClinicalProtocolsContent = z.unknown(); // TODO: define shape

// Daily Assessment Protocols validators
export const zDailyAssessmentProtocolsAssessmentComponents = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsRequiredVitals = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsLabRequirements = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsSymptomAssessment = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsNursingAssessment = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsPhysicianRounding = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsPatientEducation = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsFamilyUpdates = z.unknown(); // TODO: define shape
export const zDailyAssessmentProtocolsDischargePreparation = z.unknown(); // TODO: define shape

// Decision Support Inputs validators
export const zDecisionSupportInputsSymptoms = z.unknown(); // TODO: define shape
export const zDecisionSupportInputsRiskFactors = z.unknown(); // TODO: define shape
export const zDecisionSupportInputsClinicalFindings = z.unknown(); // TODO: define shape
export const zDecisionSupportInputsAiAnalysis = z.unknown(); // TODO: define shape

// Discharge Criteria validators
export const zDischargeCriteriaClinicalStabilityCriteria = z.unknown(); // TODO: define shape
export const zDischargeCriteriaVitalSignRequirements = z.unknown(); // TODO: define shape
export const zDischargeCriteriaLaboratoryRequirements = z.unknown(); // TODO: define shape
export const zDischargeCriteriaSymptomControl = z.unknown(); // TODO: define shape
export const zDischargeCriteriaFunctionalStatus = z.unknown(); // TODO: define shape
export const zDischargeCriteriaSocialRequirements = z.unknown(); // TODO: define shape
export const zDischargeCriteriaHomeCare = z.unknown(); // TODO: define shape
export const zDischargeCriteriaMedicationManagement = z.unknown(); // TODO: define shape
export const zDischargeCriteriaFollowUpArrangements = z.unknown(); // TODO: define shape
export const zDischargeCriteriaTransportationArrangements = z.unknown(); // TODO: define shape
export const zDischargeCriteriaEmergencyContactInfo = z.unknown(); // TODO: define shape
export const zDischargeCriteriaRedFlagSymptoms = z.unknown(); // TODO: define shape

// Drug Toxicity Profiles validators
export const zDrugToxicityProfilesCommonToxicities = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesRareToxicities = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesDoseRelatedToxicities = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesCumulativeToxicities = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesOrganSpecificToxicities = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesMonitoringSchedule = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesBaselineAssessments = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesWarningBoxes = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesContraindications = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesDrugInteractions = z.unknown(); // TODO: define shape
export const zDrugToxicityProfilesSpecialPopulations = z.unknown(); // TODO: define shape

// Emergency Protocols validators
export const zEmergencyProtocolsRequiredPersonnel = z.unknown(); // TODO: define shape
export const zEmergencyProtocolsMedications = z.unknown(); // TODO: define shape
export const zEmergencyProtocolsMonitoring = z.unknown(); // TODO: define shape
export const zEmergencyProtocolsAlternativeActions = z.unknown(); // TODO: define shape

// Emergency Scenarios validators
export const zEmergencyScenariosClinicalPresentation = z.unknown(); // TODO: define shape
export const zEmergencyScenariosdiagnosticCriteria = z.unknown(); // TODO: define shape
export const zEmergencyScenariosRiskFactors = z.unknown(); // TODO: define shape
export const zEmergencyScenariosImmediateActions = z.unknown(); // TODO: define shape
export const zEmergencyScenariosRequiredResources = z.unknown(); // TODO: define shape
export const zEmergencyScenariosConsultationRequired = z.unknown(); // TODO: define shape

// Follow Up Protocols validators
export const zFollowUpProtocolsAssessmentComponents = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsLaboratoryTests = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsImagingRequirements = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsSymptomAssessment = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsMedicationReview = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsAdherenceAssessment = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsToxicityAssessment = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsFunctionalAssessment = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsPsychosocialAssessment = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsCaregiverAssessment = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsActionPlans = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsEscalationCriteria = z.unknown(); // TODO: define shape
export const zFollowUpProtocolsDocumentationRequirements = z.unknown(); // TODO: define shape

// Monitoring Parameters validators
export const zMonitoringParametersNormalRange = z.unknown(); // TODO: define shape
export const zMonitoringParametersAlertThresholds = z.unknown(); // TODO: define shape
export const zMonitoringParametersCriticalValues = z.unknown(); // TODO: define shape
export const zMonitoringParametersActionRequired = z.unknown(); // TODO: define shape
export const zMonitoringParametersNursingProtocol = z.unknown(); // TODO: define shape
export const zMonitoringParametersPhysicianNotification = z.unknown(); // TODO: define shape
export const zMonitoringParametersEquipmentRequired = z.unknown(); // TODO: define shape

// NCCN Guidelines validators
export const zNccnGuidelinesContent = z.unknown(); // TODO: define shape
export const zNccnGuidelinesApplicableStages = z.unknown(); // TODO: define shape
export const zNccnGuidelinesBiomarkerRequirements = z.unknown(); // TODO: define shape
export const zNccnGuidelinesTreatmentSettings = z.unknown(); // TODO: define shape
export const zNccnGuidelinesSpecialPopulations = z.unknown(); // TODO: define shape
export const zNccnGuidelinesCrossReferences = z.unknown(); // TODO: define shape
export const zNccnGuidelinesEvidenceReferences = z.unknown(); // TODO: define shape
export const zNccnGuidelinesClinicalDecisionPoints = z.unknown(); // TODO: define shape
export const zNccnGuidelinesMonitoringRequirements = z.unknown(); // TODO: define shape
export const zNccnGuidelinesContraindications = z.unknown(); // TODO: define shape
export const zNccnGuidelinesAlternativeApproaches = z.unknown(); // TODO: define shape
export const zNccnGuidelinesQualityMeasures = z.unknown(); // TODO: define shape

// Oncology Medications validators
export const zOncologyMedicationsBrandNames = z.unknown(); // TODO: define shape
export const zOncologyMedicationsIndications = z.unknown(); // TODO: define shape
export const zOncologyMedicationsDosing = z.unknown(); // TODO: define shape
export const zOncologyMedicationsSideEffects = z.unknown(); // TODO: define shape
export const zOncologyMedicationsMonitoring = z.unknown(); // TODO: define shape
export const zOncologyMedicationsInteractions = z.unknown(); // TODO: define shape
export const zOncologyMedicationsReferenceSources = z.unknown(); // TODO: define shape
export const zOncologyMedicationsSpecialConsiderations = z.unknown(); // TODO: define shape
export const zOncologyMedicationsPharmacokinetics = z.unknown(); // TODO: define shape
export const zOncologyMedicationsContraindications = z.unknown(); // TODO: define shape
export const zOncologyMedicationsRoutineMonitoring = z.unknown(); // TODO: define shape
export const zOncologyMedicationsPreTreatmentTests = z.unknown(); // TODO: define shape

// Pain Management Protocols validators
export const zPainManagementProtocolsAssessmentTools = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsPharmacologicalApproach = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsNonPharmacologicalApproach = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsInterventionalOptions = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsOpioidGuidelines = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsAdjuvantTherapies = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsSideEffectManagement = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsMonitoringProtocol = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsEscalationCriteria = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsSpecialConsiderations = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsPatientEducation = z.unknown(); // TODO: define shape
export const zPainManagementProtocolsCaregiverEducation = z.unknown(); // TODO: define shape

// Performance Status Scales validators
export const zPerformanceStatusScalesTreatmentImplications = z.unknown(); // TODO: define shape

// Sessions validators
export const zSessionsSess = z.unknown(); // TODO: define shape

// Supportive Care Protocols validators
export const zSupportiveCareProtocolsInterventions = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsMedications = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsNonPharmacological = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsMonitoringProtocol = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsExpectedOutcomes = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsAdjustmentCriteria = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsEscalationCriteria = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsConsultationTriggers = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsPatientEducation = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsCaregiverInstructions = z.unknown(); // TODO: define shape
export const zSupportiveCareProtocolsQualityOfLifeConsiderations = z.unknown(); // TODO: define shape

// Symptom Management validators
export const zSymptomManagementAssessmentTools = z.unknown(); // TODO: define shape
export const zSymptomManagementInterventions = z.unknown(); // TODO: define shape
export const zSymptomManagementMedications = z.unknown(); // TODO: define shape
export const zSymptomManagementMonitoringParameters = z.unknown(); // TODO: define shape

// Treatment Plan Mappings validators
export const zTreatmentPlanMappingsBiomarkers = z.unknown(); // TODO: define shape
export const zTreatmentPlanMappingsConflictingBiomarkers = z.unknown(); // TODO: define shape
export const zTreatmentPlanMappingsRequiredStage = z.unknown(); // TODO: define shape

// Treatment Protocols validators
export const zTreatmentProtocolsIndications = z.unknown(); // TODO: define shape
export const zTreatmentProtocolsContraindications = z.unknown(); // TODO: define shape
export const zTreatmentProtocolsDosingSchedule = z.unknown(); // TODO: define shape
export const zTreatmentProtocolsToxicityProfile = z.unknown(); // TODO: define shape
export const zTreatmentProtocolsMonitoringRequirements = z.unknown(); // TODO: define shape

// Export validator maps per table
export const admissionCriteriaValidators = {
  clinical_indications: zAdmissionCriteriaClinicalIndications,
  exclusion_criteria: zAdmissionCriteriaExclusionCriteria,
  risk_factors: zAdmissionCriteriaRiskFactors,
  required_assessments: zAdmissionCriteriaRequiredAssessments,
  special_requirements: zAdmissionCriteriaSpecialRequirements,
  contraindications: zAdmissionCriteriaContraindications,
};

export const adverseEventManagementValidators = {
  immediate_actions: zAdverseEventManagementImmediateActions,
  treatment_modifications: zAdverseEventManagementTreatmentModifications,
  supportive_care: zAdverseEventManagementSupportiveCare,
  medications: zAdverseEventManagementMedications,
  monitoring_requirements: zAdverseEventManagementMonitoringRequirements,
  consultation_required: zAdverseEventManagementConsultationRequired,
  patient_education: zAdverseEventManagementPatientEducation,
  follow_up_protocol: zAdverseEventManagementFollowUpProtocol,
  rechallenge_criteria: zAdverseEventManagementRechallengeCriteria,
  reporting_requirements: zAdverseEventManagementReportingRequirements,
};

export const adverseEventsValidators = {
  clinical_presentation: zAdverseEventsClinicalPresentation,
  risk_factors: zAdverseEventsRiskFactors,
  associated_treatments: zAdverseEventsAssociatedTreatments,
  prevention_strategies: zAdverseEventsPreventionStrategies,
};

export const aiInteractionsValidators = {
  input_context: zAiInteractionsInputContext,
  ai_response: zAiInteractionsAiResponse,
};

export const oncologyMedicationsValidators = {
  brand_names: zOncologyMedicationsBrandNames,
  indications: zOncologyMedicationsIndications,
  dosing: zOncologyMedicationsDosing,
  side_effects: zOncologyMedicationsSideEffects,
  monitoring: zOncologyMedicationsMonitoring,
  interactions: zOncologyMedicationsInteractions,
  reference_sources: zOncologyMedicationsReferenceSources,
  special_considerations: zOncologyMedicationsSpecialConsiderations,
  pharmacokinetics: zOncologyMedicationsPharmacokinetics,
  contraindications: zOncologyMedicationsContraindications,
  routine_monitoring: zOncologyMedicationsRoutineMonitoring,
  pre_treatment_tests: zOncologyMedicationsPreTreatmentTests,
};

// ... Add similar validator maps for all other tables with JSONB fields
