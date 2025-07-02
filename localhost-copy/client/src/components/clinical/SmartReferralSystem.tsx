import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Clock, 
  Send, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Download
} from "lucide-react";

interface ReferralTemplate {
  specialty: string;
  urgency: 'urgent' | 'routine' | 'expedited';
  indication: string;
  nccnReference: string;
  template: string;
  requiredInfo: string[];
  timeframe: string;
}

interface GeneratedReferral {
  id: string;
  specialty: string;
  urgency: 'urgent' | 'routine' | 'expedited';
  patientInfo: {
    age: number;
    diagnosis: string;
    stage: string;
    relevantHistory: string;
  };
  clinicalContext: string;
  referralLetter: string;
  nccnCompliance: boolean;
  estimatedWaitTime: string;
  contactInfo?: {
    department: string;
    phone: string;
    email: string;
  };
}

const referralTemplates: ReferralTemplate[] = [
  {
    specialty: "Orthopedic Oncology",
    urgency: "urgent",
    indication: "Age <40 with symptomatic bone lesion",
    nccnReference: "BONE-1",
    template: "Urgent orthopedic oncology referral for {age}-year-old patient with {presentation}. Per NCCN BONE-1 guidelines, immediate evaluation required for suspected primary bone tumor in patients under 40. Clinical findings: {findings}. Imaging: {imaging}. Request evaluation within 24 hours.",
    requiredInfo: ["Age", "Presentation", "Imaging findings", "Clinical symptoms"],
    timeframe: "24 hours"
  },
  {
    specialty: "Genetic Counseling",
    urgency: "expedited",
    indication: "Ampullary adenocarcinoma with family history",
    nccnReference: "AMP-1",
    template: "Genetic counseling referral for patient with confirmed ampullary adenocarcinoma. Per NCCN AMP-1 Category 1 recommendation, comprehensive gene panel testing indicated for all confirmed cases. Family history: {familyHistory}. Genes of interest: ATM, BRCA1, BRCA2, CDKN2A, MLH1, MSH2, MSH6, PALB2, PMS2, STK11, TP53. Request counseling and testing coordination.",
    requiredInfo: ["Family history", "Personal cancer history", "Previous genetic testing"],
    timeframe: "2 weeks"
  },
  {
    specialty: "Fertility Preservation",
    urgency: "urgent",
    indication: "Young adult before chemotherapy",
    nccnReference: "OSTEO-1",
    template: "Urgent fertility preservation consultation for {age}-year-old patient with {diagnosis} prior to initiating chemotherapy. Per updated NCCN OSTEO-1 guidelines, fertility consultation should be considered for appropriate patients. Treatment plan: {treatment}. Timeline: Chemotherapy scheduled to begin {startDate}. Request urgent consultation within 48 hours.",
    requiredInfo: ["Age", "Gender", "Diagnosis", "Treatment plan", "Start date"],
    timeframe: "48 hours"
  },
  {
    specialty: "Radiation Oncology",
    urgency: "routine",
    indication: "Adjuvant radiation therapy planning",
    nccnReference: "CHOR-2",
    template: "Radiation oncology consultation for adjuvant treatment planning in {diagnosis} patient. Surgical details: {surgery}. Margins: {margins}. Per NCCN CHOR-2, consider adjuvant RT for positive margins or large extracompartmental tumors. Request evaluation for treatment planning and simulation.",
    requiredInfo: ["Surgical procedure", "Margin status", "Pathology", "Imaging"],
    timeframe: "2-3 weeks"
  },
  {
    specialty: "Palliative Care",
    urgency: "expedited",
    indication: "Metastatic disease symptom management",
    nccnReference: "OSTEO-4",
    template: "Palliative care consultation for symptom management in metastatic {diagnosis}. Current symptoms: {symptoms}. Performance status: {performance}. Goals of care discussion needed. Per NCCN guidelines, multidisciplinary palliative approach recommended for advanced disease. Request evaluation for symptom optimization and care coordination.",
    requiredInfo: ["Symptoms", "Performance status", "Current treatments", "Goals of care"],
    timeframe: "1 week"
  }
];

const SmartReferralSystem = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [patientAge, setPatientAge] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [clinicalFindings, setClinicalFindings] = useState<string>("");
  const [familyHistory, setFamilyHistory] = useState<string>("");
  const [generatedReferral, setGeneratedReferral] = useState<GeneratedReferral | null>(null);

  const currentTemplate = referralTemplates.find(t => t.specialty === selectedTemplate);

  const generateReferral = () => {
    if (!currentTemplate) return;

    const contextualInfo = {
      age: patientAge,
      diagnosis: diagnosis,
      presentation: "symptomatic bone lesion with abnormal imaging",
      findings: clinicalFindings,
      imaging: "Plain radiographs showing concerning lesion",
      familyHistory: familyHistory,
      treatment: "MAP chemotherapy protocol",
      startDate: "within 1 week",
      surgery: "Wide resection completed",
      margins: "Negative margins achieved",
      symptoms: "Pain, functional limitation",
      performance: "ECOG 1-2"
    };

    let referralText = currentTemplate.template;
    Object.entries(contextualInfo).forEach(([key, value]) => {
      referralText = referralText.replace(new RegExp(`{${key}}`, 'g'), value || '[TO BE COMPLETED]');
    });

    const mockReferral: GeneratedReferral = {
      id: Date.now().toString(),
      specialty: currentTemplate.specialty,
      urgency: currentTemplate.urgency,
      patientInfo: {
        age: parseInt(patientAge) || 0,
        diagnosis: diagnosis,
        stage: "To be determined",
        relevantHistory: clinicalFindings
      },
      clinicalContext: `NCCN ${currentTemplate.nccnReference} compliant referral`,
      referralLetter: referralText,
      nccnCompliance: true,
      estimatedWaitTime: currentTemplate.timeframe,
      contactInfo: {
        department: currentTemplate.specialty,
        phone: "(555) 123-4567",
        email: `${currentTemplate.specialty.toLowerCase().replace(/\s+/g, '.')}@hospital.org`
      }
    };

    setGeneratedReferral(mockReferral);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'expedited': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'expedited': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-600" />
          Intelligent Referral Generation System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Referral Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Referral Type</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select referral specialty" />
                </SelectTrigger>
                <SelectContent>
                  {referralTemplates.map((template) => (
                    <SelectItem key={template.specialty} value={template.specialty}>
                      <div className="flex items-center gap-2">
                        {getUrgencyIcon(template.urgency)}
                        <span>{template.specialty}</span>
                        <Badge variant="outline" className="text-xs">
                          NCCN {template.nccnReference}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {currentTemplate && (
              <div>
                <label className="text-sm font-medium">Urgency & Timeframe</label>
                <div className={`p-3 rounded border-2 ${getUrgencyColor(currentTemplate.urgency)}`}>
                  <div className="flex items-center gap-2">
                    {getUrgencyIcon(currentTemplate.urgency)}
                    <span className="font-medium capitalize">{currentTemplate.urgency}</span>
                    <span className="text-sm">({currentTemplate.timeframe})</span>
                  </div>
                  <p className="text-xs mt-1">{currentTemplate.indication}</p>
                </div>
              </div>
            )}
          </div>

          {/* Patient Information */}
          {currentTemplate && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Patient Age</label>
                    <Input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="Enter patient age"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Diagnosis</label>
                    <Input
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Enter primary diagnosis"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium">Clinical Findings</label>
                  <Textarea
                    value={clinicalFindings}
                    onChange={(e) => setClinicalFindings(e.target.value)}
                    placeholder="Enter relevant clinical findings, symptoms, imaging results..."
                    rows={3}
                  />
                </div>
                {currentTemplate.specialty === "Genetic Counseling" && (
                  <div className="mt-4">
                    <label className="text-sm font-medium">Family History</label>
                    <Textarea
                      value={familyHistory}
                      onChange={(e) => setFamilyHistory(e.target.value)}
                      placeholder="Enter relevant family history of cancer..."
                      rows={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Required Information Checklist */}
          {currentTemplate && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Required Information for {currentTemplate.specialty}:</strong>
                <ul className="mt-2 space-y-1">
                  {currentTemplate.requiredInfo.map((info, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {info}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          {currentTemplate && (
            <Button 
              onClick={generateReferral} 
              className="w-full"
              disabled={!patientAge || !diagnosis || !clinicalFindings}
            >
              <Send className="h-4 w-4 mr-2" />
              Generate NCCN-Compliant Referral
            </Button>
          )}

          {/* Generated Referral */}
          {generatedReferral && (
            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Generated Referral Letter
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                      NCCN Compliant
                    </Badge>
                    <Badge className={getUrgencyColor(generatedReferral.urgency)}>
                      {generatedReferral.urgency.toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Referral Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <div>
                      <p className="text-sm font-medium">Specialty</p>
                      <p className="text-sm">{generatedReferral.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expected Response</p>
                      <p className="text-sm">{generatedReferral.estimatedWaitTime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">NCCN Reference</p>
                      <p className="text-sm">{generatedReferral.clinicalContext}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  {generatedReferral.contactInfo && (
                    <div className="p-4 border rounded">
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {generatedReferral.contactInfo.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {generatedReferral.contactInfo.email}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Referral Letter */}
                  <div>
                    <h4 className="font-medium mb-2">Referral Letter</h4>
                    <div className="p-4 border rounded bg-white dark:bg-gray-900 font-mono text-sm whitespace-pre-wrap">
                      {generatedReferral.referralLetter}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="default">
                      <Send className="h-4 w-4 mr-2" />
                      Send Referral
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      Schedule Follow-up
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartReferralSystem;