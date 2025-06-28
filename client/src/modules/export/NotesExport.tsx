import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  FileText,
  Download,
  Copy,
  Printer,
  Clock,
  User,
  Stethoscope,
  Heart,
  Activity,
  Shield,
  Eye
} from "lucide-react";

const templateTypes = [
  { 
    id: "consultation", 
    name: "Consultation Note", 
    icon: Stethoscope,
    description: "Comprehensive oncology consultation template"
  },
  { 
    id: "treatment", 
    name: "Treatment Summary", 
    icon: Activity,
    description: "Treatment plan and protocol summary"
  },
  { 
    id: "discharge", 
    name: "Discharge Summary", 
    icon: FileText,
    description: "Hospital discharge documentation"
  },
  { 
    id: "palliative", 
    name: "Palliative Assessment", 
    icon: Heart,
    description: "Palliative care evaluation template"
  }
];

const exportFormats = [
  { id: "pdf", name: "PDF Document", icon: FileText },
  { id: "text", name: "Plain Text", icon: Copy },
  { id: "print", name: "Print Preview", icon: Printer }
];

// Template Components
const ConsultationTemplate = ({ data, onUpdate }: { data: any; onUpdate: (data: any) => void }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Oncology Consultation Note</CardTitle>
        <div className="text-sm text-muted-foreground">
          Date: {new Date().toLocaleDateString()} | Provider: [Clinical User]
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Chief Complaint</label>
          <Textarea 
            placeholder="e.g., 65-year-old patient with newly diagnosed adenocarcinoma..."
            value={data.chiefComplaint || ''}
            onChange={(e) => onUpdate({...data, chiefComplaint: e.target.value})}
            className="h-20"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">History of Present Illness</label>
          <Textarea 
            placeholder="Detailed history of current oncologic condition..."
            value={data.hpi || ''}
            onChange={(e) => onUpdate({...data, hpi: e.target.value})}
            className="h-32"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Assessment and Plan</label>
          <Textarea 
            placeholder="Clinical assessment and treatment recommendations..."
            value={data.assessment || ''}
            onChange={(e) => onUpdate({...data, assessment: e.target.value})}
            className="h-32"
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

const TreatmentTemplate = ({ data, onUpdate }: { data: any; onUpdate: (data: any) => void }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Treatment Summary</CardTitle>
        <div className="text-sm text-muted-foreground">
          Generated: {new Date().toLocaleString()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Diagnosis</label>
          <Textarea 
            placeholder="Primary oncologic diagnosis with staging..."
            value={data.diagnosis || ''}
            onChange={(e) => onUpdate({...data, diagnosis: e.target.value})}
            className="h-20"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Treatment Protocol</label>
          <Textarea 
            placeholder="Chemotherapy regimen, dosing, and schedule..."
            value={data.protocol || ''}
            onChange={(e) => onUpdate({...data, protocol: e.target.value})}
            className="h-32"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Monitoring Plan</label>
          <Textarea 
            placeholder="Laboratory monitoring, imaging schedule, toxicity assessments..."
            value={data.monitoring || ''}
            onChange={(e) => onUpdate({...data, monitoring: e.target.value})}
            className="h-24"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Patient Education</label>
          <Textarea 
            placeholder="Key points discussed with patient and family..."
            value={data.education || ''}
            onChange={(e) => onUpdate({...data, education: e.target.value})}
            className="h-24"
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

const DischargeTemplate = ({ data, onUpdate }: { data: any; onUpdate: (data: any) => void }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Discharge Summary</CardTitle>
        <div className="text-sm text-muted-foreground">
          Discharge Date: {new Date().toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Reason for Admission</label>
          <Textarea 
            placeholder="e.g., Neutropenic fever, treatment-related toxicity..."
            value={data.admission || ''}
            onChange={(e) => onUpdate({...data, admission: e.target.value})}
            className="h-20"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Hospital Course</label>
          <Textarea 
            placeholder="Summary of treatments received and clinical progress..."
            value={data.course || ''}
            onChange={(e) => onUpdate({...data, course: e.target.value})}
            className="h-32"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Discharge Instructions</label>
          <Textarea 
            placeholder="Activity level, diet, medications, warning signs..."
            value={data.instructions || ''}
            onChange={(e) => onUpdate({...data, instructions: e.target.value})}
            className="h-32"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Follow-up Plan</label>
          <Textarea 
            placeholder="Oncology appointments, laboratory studies, imaging..."
            value={data.followup || ''}
            onChange={(e) => onUpdate({...data, followup: e.target.value})}
            className="h-24"
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

const PalliativeTemplate = ({ data, onUpdate }: { data: any; onUpdate: (data: any) => void }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Palliative Care Assessment</CardTitle>
        <div className="text-sm text-muted-foreground">
          Assessment Date: {new Date().toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Symptom Assessment</label>
          <Textarea 
            placeholder="Pain, nausea, fatigue, dyspnea - location, severity, quality..."
            value={data.symptoms || ''}
            onChange={(e) => onUpdate({...data, symptoms: e.target.value})}
            className="h-32"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Functional Status</label>
          <Textarea 
            placeholder="Performance status, activities of daily living, mobility..."
            value={data.functional || ''}
            onChange={(e) => onUpdate({...data, functional: e.target.value})}
            className="h-24"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Psychosocial Assessment</label>
          <Textarea 
            placeholder="Coping mechanisms, family support, spiritual concerns..."
            value={data.psychosocial || ''}
            onChange={(e) => onUpdate({...data, psychosocial: e.target.value})}
            className="h-24"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Goals of Care</label>
          <Textarea 
            placeholder="Patient preferences, advance directives, treatment goals..."
            value={data.goals || ''}
            onChange={(e) => onUpdate({...data, goals: e.target.value})}
            className="h-24"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Recommendations</label>
          <Textarea 
            placeholder="Symptom management plan, referrals, follow-up..."
            value={data.recommendations || ''}
            onChange={(e) => onUpdate({...data, recommendations: e.target.value})}
            className="h-24"
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

// Preview Component
const DocumentPreview = ({ templateType, data }: { templateType: string; data: any }) => {
  const generatePreview = () => {
    const template = templateTypes.find(t => t.id === templateType);
    const date = new Date().toLocaleDateString();
    
    switch (templateType) {
      case 'consultation':
        return `ONCOLOGY CONSULTATION NOTE
Date: ${date}
Provider: [Clinical User]

Chief Complaint:
${data.chiefComplaint || '[Chief complaint not specified]'}

History of Present Illness:
${data.hpi || '[History not documented]'}

Assessment and Plan:
${data.assessment || '[Assessment and plan not documented]'}

Electronically signed by: [Clinical User]
Date: ${new Date().toLocaleString()}`;

      case 'treatment':
        return `TREATMENT SUMMARY
Generated: ${new Date().toLocaleString()}

Diagnosis:
${data.diagnosis || '[Diagnosis not specified]'}

Treatment Protocol:
${data.protocol || '[Protocol not documented]'}

Monitoring Plan:
${data.monitoring || '[Monitoring plan not specified]'}

Patient Education:
${data.education || '[Education points not documented]'}

Summary prepared by: [Clinical User]`;

      case 'discharge':
        return `DISCHARGE SUMMARY
Discharge Date: ${date}

Reason for Admission:
${data.admission || '[Admission reason not specified]'}

Hospital Course:
${data.course || '[Hospital course not documented]'}

Discharge Instructions:
${data.instructions || '[Instructions not specified]'}

Follow-up Plan:
${data.followup || '[Follow-up not specified]'}

Discharge summary completed by: [Clinical User]`;

      case 'palliative':
        return `PALLIATIVE CARE ASSESSMENT
Assessment Date: ${date}

Symptom Assessment:
${data.symptoms || '[Symptoms not assessed]'}

Functional Status:
${data.functional || '[Functional status not documented]'}

Psychosocial Assessment:
${data.psychosocial || '[Psychosocial factors not assessed]'}

Goals of Care:
${data.goals || '[Goals not established]'}

Recommendations:
${data.recommendations || '[Recommendations not provided]'}

Assessment by: [Clinical User]`;

      default:
        return 'Please select a template type and fill in the required fields.';
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          Document Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          {generatePreview()}
        </div>
      </CardContent>
    </Card>
  );
};

export default function NotesExport() {
  const [selectedTemplate, setSelectedTemplate] = useState("consultation");
  const [templateData, setTemplateData] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const renderTemplate = () => {
    const commonProps = {
      data: templateData,
      onUpdate: setTemplateData
    };

    switch (selectedTemplate) {
      case "consultation":
        return <ConsultationTemplate {...commonProps} />;
      case "treatment":
        return <TreatmentTemplate {...commonProps} />;
      case "discharge":
        return <DischargeTemplate {...commonProps} />;
      case "palliative":
        return <PalliativeTemplate {...commonProps} />;
      default:
        return <ConsultationTemplate {...commonProps} />;
    }
  };

  const handleExport = () => {
    // In a real application, this would generate and download the document
    console.log('Exporting document:', { templateType: selectedTemplate, format: selectedFormat, data: templateData });
    alert(`Document would be exported as ${selectedFormat.toUpperCase()}. This is a demo - no actual file is generated.`);
  };

  const handleCopyToClipboard = () => {
    const preview = document.querySelector('.whitespace-pre-wrap')?.textContent;
    if (preview) {
      navigator.clipboard.writeText(preview);
      alert('Document copied to clipboard!');
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notes Export</h2>
          <p className="text-muted-foreground">
            Generate clinical documentation templates and export for educational purposes
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Template Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Document Type</label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Template Description</h4>
                <p className="text-sm text-muted-foreground">
                  {templateTypes.find(t => t.id === selectedTemplate)?.description}
                </p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-2 block">Export Format</label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((format) => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button onClick={handleExport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Document
                </Button>
                <Button onClick={handleCopyToClipboard} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-xs text-yellow-800">
                    <strong>Educational Use Only</strong><br/>
                    These templates are for demonstration and training purposes. Do not use for actual patient documentation.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Form and Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="editor" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Template Editor</TabsTrigger>
              <TabsTrigger value="preview">Document Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              {renderTemplate()}
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <DocumentPreview templateType={selectedTemplate} data={templateData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}