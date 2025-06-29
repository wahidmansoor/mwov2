import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  FileText,
  Activity,
  Stethoscope,
  Syringe,
  Heart
} from "lucide-react";

interface JourneyStep {
  id: string;
  module: 'OPD' | 'CDU' | 'Inpatient' | 'Palliative' | 'Clinical Tools';
  phase: string;
  status: 'completed' | 'active' | 'pending' | 'overdue';
  title: string;
  description: string;
  dateCompleted?: string;
  dueDate?: string;
  nccnReference?: string;
  outcomes?: string[];
  nextSteps?: string[];
}

interface PatientJourney {
  patientId: string;
  diagnosis: string;
  stage: string;
  startDate: string;
  currentPhase: string;
  overallProgress: number;
  steps: JourneyStep[];
  alerts: string[];
  qualityMetrics: {
    nccnCompliance: number;
    timelyReferrals: number;
    completedMilestones: number;
  };
}

const mockPatientJourney: PatientJourney = {
  patientId: "PT-2025-001",
  diagnosis: "Osteosarcoma, High-grade",
  stage: "Localized, Resectable",
  startDate: "2025-06-15",
  currentPhase: "Neoadjuvant Chemotherapy",
  overallProgress: 45,
  steps: [
    {
      id: "1",
      module: "OPD",
      phase: "Initial Workup",
      status: "completed",
      title: "Age-Based Triage & Referral",
      description: "Patient age 19 - immediate orthopedic oncology referral per BONE-1",
      dateCompleted: "2025-06-15",
      nccnReference: "BONE-1",
      outcomes: ["Referred to orthopedic oncologist within 4 hours", "NCCN compliance achieved"],
      nextSteps: ["Complete staging workup", "Multidisciplinary team evaluation"]
    },
    {
      id: "2",
      module: "Clinical Tools",
      phase: "Diagnostic Workup",
      status: "completed",
      title: "Biomarker Assessment & Staging",
      description: "Alkaline phosphatase, LDH, imaging studies completed",
      dateCompleted: "2025-06-16",
      nccnReference: "OSTEO-1",
      outcomes: ["Elevated alkaline phosphatase (320 U/L)", "LDH elevated (580 U/L)", "Chest CT negative for metastases"],
      nextSteps: ["Begin neoadjuvant chemotherapy", "Fertility consultation"]
    },
    {
      id: "3",
      module: "CDU",
      phase: "Neoadjuvant Treatment",
      status: "active",
      title: "MAP Chemotherapy Protocol",
      description: "Methotrexate, Adriamycin, Cisplatin - Cycle 3 of 4",
      dueDate: "2025-07-05",
      nccnReference: "OSTEO-2",
      outcomes: ["Cycle 1 completed (6/22)", "Cycle 2 completed (6/29)", "Biomarker trending monitored"],
      nextSteps: ["Complete cycle 4", "Pre-surgical evaluation", "Assess histologic response"]
    },
    {
      id: "4",
      module: "Inpatient",
      phase: "Surgical Treatment",
      status: "pending",
      title: "Wide Resection Surgery",
      description: "Scheduled wide resection with orthopedic oncology team",
      dueDate: "2025-07-15",
      nccnReference: "OSTEO-2",
      nextSteps: ["Pre-operative planning", "Anesthesia consultation", "Surgical resection"]
    },
    {
      id: "5",
      module: "CDU",
      phase: "Adjuvant Treatment",
      status: "pending",
      title: "Adjuvant Chemotherapy",
      description: "Post-surgical chemotherapy based on histologic response",
      nccnReference: "OSTEO-2",
      nextSteps: ["Histologic response assessment", "Adjust regimen if needed"]
    },
    {
      id: "6",
      module: "OPD",
      phase: "Surveillance",
      status: "pending",
      title: "Long-term Follow-up",
      description: "Regular surveillance per NCCN guidelines",
      nccnReference: "OSTEO-4",
      nextSteps: ["Chest imaging every 2-3 months", "Clinical assessment"]
    }
  ],
  alerts: [
    "Alkaline phosphatase trending upward - monitor closely",
    "Fertility consultation recommended but not yet completed"
  ],
  qualityMetrics: {
    nccnCompliance: 95,
    timelyReferrals: 100,
    completedMilestones: 78
  }
};

const PatientJourneyTracker = () => {
  const [journey] = useState<PatientJourney>(mockPatientJourney);

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'OPD': return <Stethoscope className="h-4 w-4" />;
      case 'CDU': return <Syringe className="h-4 w-4" />;
      case 'Inpatient': return <Activity className="h-4 w-4" />;
      case 'Palliative': return <Heart className="h-4 w-4" />;
      case 'Clinical Tools': return <FileText className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'active': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'overdue': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'active': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'overdue': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-800/20';
    }
  };

  const activeStep = journey.steps.find(step => step.status === 'active');

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          Cross-Module Patient Journey Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Patient Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Patient ID</p>
                    <p className="text-lg font-bold">{journey.patientId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Diagnosis</p>
                    <p className="text-sm font-bold">{journey.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">{journey.stage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Current Phase</p>
                    <p className="text-sm font-bold">{journey.currentPhase}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Journey Started</p>
                    <p className="text-sm font-bold">
                      {new Date(journey.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor((Date.now() - new Date(journey.startDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Overall Treatment Progress</h4>
                  <span className="text-sm font-bold">{journey.overallProgress}% Complete</span>
                </div>
                <Progress value={journey.overallProgress} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{journey.qualityMetrics.nccnCompliance}%</p>
                    <p className="text-muted-foreground">NCCN Compliance</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{journey.qualityMetrics.timelyReferrals}%</p>
                    <p className="text-muted-foreground">Timely Referrals</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{journey.qualityMetrics.completedMilestones}%</p>
                    <p className="text-muted-foreground">Milestones Met</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          {journey.alerts.length > 0 && (
            <Card className="border-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {journey.alerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                      <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                      <span className="text-sm">{alert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Journey Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Treatment Journey Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journey.steps.map((step, index) => (
                  <div key={step.id}>
                    <div className={`p-4 rounded-lg border-2 ${getStatusColor(step.status)}`}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getModuleIcon(step.module)}
                                <Badge variant="outline" className="text-xs">
                                  {step.module}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {step.phase}
                                </Badge>
                                {step.nccnReference && (
                                  <Badge variant="outline" className="text-xs">
                                    NCCN {step.nccnReference}
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-medium text-sm">{step.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                              
                              {step.dateCompleted && (
                                <p className="text-xs text-green-600 mt-2">
                                  ✓ Completed: {new Date(step.dateCompleted).toLocaleDateString()}
                                </p>
                              )}
                              
                              {step.dueDate && step.status !== 'completed' && (
                                <p className="text-xs text-orange-600 mt-2">
                                  📅 Due: {new Date(step.dueDate).toLocaleDateString()}
                                </p>
                              )}

                              {step.outcomes && step.outcomes.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium mb-1">Outcomes:</p>
                                  <ul className="text-xs space-y-1">
                                    {step.outcomes.map((outcome, i) => (
                                      <li key={i} className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                        {outcome}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.nextSteps && step.nextSteps.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium mb-1">Next Steps:</p>
                                  <ul className="text-xs space-y-1">
                                    {step.nextSteps.map((nextStep, i) => (
                                      <li key={i} className="flex items-center gap-1">
                                        <ArrowRight className="h-3 w-3 text-blue-600" />
                                        {nextStep}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < journey.steps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="default">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Next Appointment
            </Button>
            <Button variant="outline">
              Generate Journey Report
            </Button>
            <Button variant="outline">
              Update Treatment Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientJourneyTracker;