import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  FileText, 
  Printer, 
  Share2, 
  Clock, 
  User,
  Calendar
} from "lucide-react";
import { TreatmentSelectionCriteria, RecommendationResult } from "./types";

interface ExportPanelProps {
  recommendations: RecommendationResult | null;
  criteria: TreatmentSelectionCriteria;
}

export function ExportPanel({ recommendations, criteria }: ExportPanelProps) {
  const generatePDF = () => {
    if (!recommendations?.primary) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Treatment Plan - ${criteria.cancerType}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            .protocol-name { font-size: 24px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
            .criteria-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
            .criteria-item { padding: 10px; background: #f8fafc; border-radius: 4px; }
            .drugs-list { background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .alert { background: #fef3c7; padding: 12px; border-radius: 4px; margin: 10px 0; border-left: 4px solid #f59e0b; }
            .evidence { background: #ecfdf5; padding: 12px; border-radius: 4px; margin: 10px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>OncoVista AI - Treatment Plan Recommendation</h1>
            <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>

          <div class="section">
            <h2>Patient Criteria</h2>
            <div class="criteria-grid">
              <div class="criteria-item"><strong>Cancer Type:</strong> ${criteria.cancerType}</div>
              <div class="criteria-item"><strong>Stage:</strong> ${criteria.stage}</div>
              <div class="criteria-item"><strong>Histology:</strong> ${criteria.histology}</div>
              <div class="criteria-item"><strong>Treatment Intent:</strong> ${criteria.treatmentIntent}</div>
              <div class="criteria-item"><strong>Treatment Line:</strong> ${criteria.treatmentLine}</div>
              <div class="criteria-item"><strong>Biomarkers:</strong> ${criteria.biomarkers.join(', ') || 'None specified'}</div>
            </div>
          </div>

          <div class="section">
            <h2>Primary Recommendation</h2>
            <div class="protocol-name">${recommendations.primary.protocol}</div>
            <p><strong>Intent:</strong> ${recommendations.primary.intent}</p>
            <p><strong>Confidence:</strong> ${Math.round(recommendations.confidence * 100)}%</p>
            <p><strong>Evidence Level:</strong> ${recommendations.primary.evidenceLevel}</p>
            
            <div class="drugs-list">
              <h3>Treatment Regimen</h3>
              <ul>
                ${recommendations.primary.drugs.map(drug => `<li>${drug}</li>`).join('')}
              </ul>
            </div>

            <p><strong>Clinical Reasoning:</strong> ${recommendations.primary.personalizedReasoning}</p>
            
            ${recommendations.primary.alerts.length > 0 ? `
              <div class="alert">
                <h4>Clinical Alerts</h4>
                <ul>
                  ${recommendations.primary.alerts.map(alert => `<li>${alert}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <div class="evidence">
              <h4>Evidence & Guidelines</h4>
              <p><strong>Guidelines:</strong> ${recommendations.primary.guidelines.join(', ')}</p>
              ${recommendations.primary.nccnReferences.length > 0 ? `
                <p><strong>NCCN References:</strong> ${recommendations.primary.nccnReferences.join(', ')}</p>
              ` : ''}
            </div>
          </div>

          ${recommendations.alternatives.length > 0 ? `
            <div class="section">
              <h2>Alternative Options</h2>
              ${recommendations.alternatives.map((alt, index) => `
                <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px;">
                  <h3>${alt.protocol}</h3>
                  <p><strong>Match Score:</strong> ${Math.round(alt.aiScore * 100)}%</p>
                  <p>${alt.personalizedReasoning}</p>
                  <p><strong>Drugs:</strong> ${alt.drugs.join(', ')}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="footer">
            <p><strong>Disclaimer:</strong> This is a clinical decision support tool for educational and guidance purposes only. 
            Not intended to replace clinical judgment or serve as an electronic health record. 
            All treatment decisions should be made by qualified healthcare professionals considering the individual patient's complete clinical picture.</p>
            <p>Generated by OncoVista AI Clinical Decision Support Platform</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const exportData = () => {
    if (!recommendations?.primary) return;

    const exportData = {
      timestamp: new Date().toISOString(),
      criteria,
      recommendations,
      metadata: {
        platform: "OncoVista AI",
        module: "Treatment Plan Selector",
        version: "2.0"
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `treatment-plan-${criteria.cancerType?.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    if (!recommendations?.primary) return;

    const shareText = `Treatment Plan Summary:
Cancer: ${criteria.cancerType}
Stage: ${criteria.stage}
Recommendation: ${recommendations.primary.protocol}
Confidence: ${Math.round(recommendations.confidence * 100)}%
Evidence: ${recommendations.primary.evidenceLevel}

Generated by OncoVista AI Clinical Decision Support`;

    if (navigator.share) {
      navigator.share({
        title: 'Treatment Plan Recommendation',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // Could add a toast notification here
    }
  };

  if (!recommendations?.primary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export & Documentation
          </CardTitle>
          <CardDescription>
            Generate reports and export recommendations once treatment plan is selected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Complete treatment selection to enable export options</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Export & Documentation
        </CardTitle>
        <CardDescription>
          Generate professional treatment plan reports and export data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Summary */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-3">Plan Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Protocol:</span>
              <div className="font-medium">{recommendations.primary.protocol}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Confidence:</span>
              <div className="font-medium">{Math.round(recommendations.confidence * 100)}%</div>
            </div>
            <div>
              <span className="text-muted-foreground">Evidence Level:</span>
              <div className="font-medium">{recommendations.evidence}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Guidelines:</span>
              <div className="font-medium">{recommendations.primary.guidelines.slice(0, 2).join(', ')}</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Export Options */}
        <div className="space-y-4">
          <h4 className="font-medium">Export Options</h4>
          
          <div className="grid gap-3">
            <Button onClick={generatePDF} className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Generate PDF Report
              <Badge variant="secondary" className="ml-auto text-xs">Recommended</Badge>
            </Button>
            
            <Button variant="outline" onClick={exportData} className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Export Raw Data (JSON)
            </Button>
            
            <Button variant="outline" onClick={shareResults} className="justify-start">
              <Share2 className="h-4 w-4 mr-2" />
              Share Summary
            </Button>
            
            <Button variant="outline" onClick={() => window.print()} className="justify-start">
              <Printer className="h-4 w-4 mr-2" />
              Print Current View
            </Button>
          </div>
        </div>

        <Separator />

        {/* Session Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Generated: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Time: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>Platform: OncoVista AI Clinical Decision Support</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>Clinical Disclaimer:</strong> This tool provides decision support for educational and guidance purposes only. 
            All treatment decisions must be made by qualified healthcare professionals considering the complete clinical picture. 
            Not intended as an electronic health record or replacement for clinical judgment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}