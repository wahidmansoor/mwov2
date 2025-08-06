// REFACTOR: Extract report display component
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Copy, Eye, BarChart3 } from 'lucide-react';
import { CompiledReport } from '../types';

interface ReportDisplayProps {
  report: CompiledReport | null;
  onDownload: () => void;
  onCopyToClipboard: () => void;
  className?: string;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({
  report,
  onDownload,
  onCopyToClipboard,
  className = ''
}) => {
  if (!report) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <FileText className="h-24 w-24 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold mb-2">No Report Generated</h3>
          <p className="text-gray-600 mb-4">
            Add clinical notes and compile them to generate a structured report
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Compiled Clinical Report
            </CardTitle>
            <CardDescription>
              Generated on {new Date(report.generatedAt).toLocaleString()}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={onCopyToClipboard} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button onClick={onDownload} className="bg-green-600 hover:bg-green-700" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Metadata */}
        <ReportMetadata report={report} />

        {/* Report Sections */}
        <div className="space-y-4">
          <ReportSection
            title="Clinical Summary"
            content={report.sections.summary}
            icon={<Eye className="h-4 w-4" />}
          />
          
          <ReportSection
            title="Progress Notes"
            content={report.sections.progressNotes}
            icon={<FileText className="h-4 w-4" />}
          />
          
          <ReportSection
            title="Assessment & Plan"
            content={report.sections.assessmentAndPlan}
            icon={<BarChart3 className="h-4 w-4" />}
          />
          
          <ReportSection
            title="Clinical Recommendations"
            content={report.sections.clinicalRecommendations}
            icon={<Eye className="h-4 w-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface ReportMetadataProps {
  report: CompiledReport;
}

const ReportMetadata: React.FC<ReportMetadataProps> = ({ report }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div>
        <Label className="text-sm font-medium">Case ID</Label>
        <p className="font-mono text-sm">{report.patientId}</p>
      </div>
      <div>
        <Label className="text-sm font-medium">Report Type</Label>
        <p className="capitalize text-sm">{report.reportType}</p>
      </div>
      <div>
        <Label className="text-sm font-medium">Date Range</Label>
        <p className="text-sm">{report.dateRange}</p>
      </div>
      
      {/* Additional metadata if available */}
      {report.sections.metadata && (
        <>
          <div>
            <Label className="text-sm font-medium">Total Notes</Label>
            <p className="text-sm">{report.sections.metadata.totalNotes}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Generation Time</Label>
            <p className="text-sm">{report.sections.metadata.generationTime}ms</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Notes Breakdown</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {Object.entries(report.sections.metadata.notesBreakdown).map(([type, count]) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}: {count}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface ReportSectionProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, content, icon }) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
        <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
};
