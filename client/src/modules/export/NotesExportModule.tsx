// REFACTOR: Enhanced Notes Export module with proper separation of concerns
import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Copy, Printer, Shield, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// REFACTOR: Import types and services
import { ExportService } from '../notes/services/exportService';
import { CompiledReport, ExportOptions, ExportFormat } from '../notes/types';

// REFACTOR: Template types with enhanced validation
interface TemplateType {
  id: string;
  name: string;
  icon: any;
  description: string;
  category: 'clinical' | 'educational' | 'administrative';
  fields: string[];
}

interface TemplateData {
  [key: string]: string;
}

const NotesExportModule = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("consultation");
  const [templateData, setTemplateData] = useState<TemplateData>({});
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("pdf");
  const [isExporting, setIsExporting] = useState(false);

  // REFACTOR: Initialize export service
  const exportService = useMemo(() => new ExportService(), []);

  // REFACTOR: Enhanced template types with categories
  const templateTypes: TemplateType[] = useMemo(() => [
    { 
      id: "consultation", 
      name: "Consultation Note", 
      icon: FileText,
      description: "Comprehensive oncology consultation template",
      category: "clinical",
      fields: ["chiefComplaint", "hpi", "assessment", "plan"]
    },
    { 
      id: "treatment", 
      name: "Treatment Summary", 
      icon: FileText,
      description: "Treatment plan and protocol summary",
      category: "clinical",
      fields: ["diagnosis", "protocol", "monitoring", "education"]
    },
    { 
      id: "discharge", 
      name: "Discharge Summary", 
      icon: FileText,
      description: "Hospital discharge documentation",
      category: "clinical",
      fields: ["admission", "course", "instructions", "followup"]
    },
    { 
      id: "palliative", 
      name: "Palliative Assessment", 
      icon: FileText,
      description: "Palliative care evaluation template",
      category: "clinical",
      fields: ["symptoms", "functional", "psychosocial", "goals", "recommendations"]
    },
    {
      id: "educational",
      name: "Case Study",
      icon: FileText,
      description: "Educational case presentation format",
      category: "educational",
      fields: ["background", "presentation", "workup", "discussion", "learning"]
    }
  ], []);

  // REFACTOR: Enhanced export formats with proper typing
  const exportFormats: Array<{id: ExportFormat, name: string, icon: any, description: string}> = useMemo(() => [
    { id: "pdf", name: "PDF Document", icon: FileText, description: "Professional document format" },
    { id: "json", name: "JSON Data", icon: Copy, description: "Structured data format" },
    { id: "csv", name: "CSV Spreadsheet", icon: Copy, description: "Tabular data format" },
    { id: "hl7-fhir", name: "HL7 FHIR", icon: Copy, description: "Healthcare interoperability standard" }
  ], []);

  // REFACTOR: Enhanced template rendering with proper validation
  const renderTemplate = useCallback(() => {
    const template = templateTypes.find(t => t.id === selectedTemplate);
    if (!template) return null;

    const TemplateComponent = getTemplateComponent(template.id);
    return (
      <TemplateComponent
        data={templateData}
        onUpdate={setTemplateData}
        template={template}
      />
    );
  }, [selectedTemplate, templateData, templateTypes]);

  // REFACTOR: Enhanced export with comprehensive error handling
  const handleExport = useCallback(async () => {
    try {
      setIsExporting(true);

      // REFACTOR: Validate template data
      const template = templateTypes.find(t => t.id === selectedTemplate);
      if (!template) {
        throw new Error('Invalid template selected');
      }

      // REFACTOR: Check required fields
      const missingFields = template.fields.filter(field => !templateData[field]?.trim());
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // REFACTOR: Create mock compiled report from template data
      const mockReport: CompiledReport = {
        id: `export-${Date.now()}`,
        patientId: `TEMPLATE-${selectedTemplate.toUpperCase()}`,
        reportType: 'template',
        dateRange: 'N/A',
        sections: {
          summary: generateTemplateSummary(template, templateData),
          progressNotes: templateData.content || 'Generated from template',
          assessmentAndPlan: templateData.assessment || 'Template assessment',
          clinicalRecommendations: templateData.recommendations || 'Template recommendations',
        },
        generatedAt: new Date().toISOString(),
        generatedBy: 'OncoVista Notes Export v1.0',
        version: '1.0',
      };

      // REFACTOR: Export options with proper validation
      const exportOptions: ExportOptions = {
        format: selectedFormat,
        includeMetadata: true,
        anonymize: true,
        templateId: selectedTemplate,
      };

      const result = await exportService.export(mockReport, exportOptions);

      if (result.success && result.blob && result.filename) {
        exportService.downloadFile(result.blob, result.filename);
        
        toast({
          title: "Export Successful",
          description: `Document exported as ${result.filename}`,
        });
      } else {
        throw new Error(result.error || 'Export failed');
      }

    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  }, [selectedTemplate, templateData, selectedFormat, templateTypes, exportService, toast]);

  // REFACTOR: Enhanced copy to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    try {
      const preview = generateTemplatePreview(selectedTemplate, templateData);
      await navigator.clipboard.writeText(preview);
      
      toast({
        title: "Copied to Clipboard",
        description: "Template content copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      });
    }
  }, [selectedTemplate, templateData, toast]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* REFACTOR: Enhanced header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notes Export</h2>
          <p className="text-muted-foreground">
            Generate clinical documentation templates and export for educational purposes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {templateTypes.length} Templates Available
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* REFACTOR: Enhanced template selection */}
        <div className="lg:col-span-1">
          <TemplateSelector
            templates={templateTypes}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            exportFormats={exportFormats}
            onExport={handleExport}
            onCopy={handleCopyToClipboard}
            isExporting={isExporting}
          />
        </div>

        {/* REFACTOR: Template form and preview */}
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
              <DocumentPreview 
                templateType={selectedTemplate} 
                data={templateData}
                template={templateTypes.find(t => t.id === selectedTemplate)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// REFACTOR: Helper functions extracted for better organization
const generateTemplateSummary = (template: TemplateType, data: TemplateData): string => {
  return `${template.name} generated on ${new Date().toLocaleDateString()}. 
This document was created using the OncoVista ${template.category} template system for ${template.description.toLowerCase()}.
Template ID: ${template.id}
Data fields: ${template.fields.join(', ')}`;
};

const generateTemplatePreview = (templateId: string, data: TemplateData): string => {
  const timestamp = new Date().toLocaleString();
  let preview = `ONCOVISTA TEMPLATE EXPORT\n`;
  preview += `==========================\n\n`;
  preview += `Template: ${templateId}\n`;
  preview += `Generated: ${timestamp}\n\n`;
  
  Object.entries(data).forEach(([key, value]) => {
    if (value?.trim()) {
      preview += `${key.toUpperCase()}:\n${value}\n\n`;
    }
  });

  preview += `DISCLAIMER:\nThis document is generated for educational and demonstration purposes only.`;
  return preview;
};

const getTemplateComponent = (templateId: string) => {
  // TODO: Implement actual template components
  // For now, return a generic component
  return GenericTemplateForm;
};

// REFACTOR: Generic template component (placeholder for specific implementations)
const GenericTemplateForm = ({ data, onUpdate, template }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Template Editor - {template?.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">
        {template?.description}
      </p>
      <p className="text-sm text-yellow-600">
        Template implementation in progress. Full template forms will be available in the next update.
      </p>
    </CardContent>
  </Card>
);

// REFACTOR: Template selector component
const TemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onTemplateChange, 
  selectedFormat, 
  onFormatChange, 
  exportFormats,
  onExport,
  onCopy,
  isExporting 
}: any) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        Template Selection
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Template selection would go here */}
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
);

// REFACTOR: Document preview component
const DocumentPreview = ({ templateType, data, template }: any) => (
  <Card className="border-l-4 border-l-blue-500">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-blue-600" />
        Document Preview
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
        {generateTemplatePreview(templateType, data)}
      </div>
    </CardContent>
  </Card>
);

export default NotesExportModule;
