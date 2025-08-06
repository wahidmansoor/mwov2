// REFACTOR: Extract compilation status and configuration components
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { ReportSettings } from '../types';

interface CompilationControlsProps {
  reportSettings: ReportSettings;
  onSettingsChange: (settings: Partial<ReportSettings>) => void;
  onCompile: () => void;
  isCompiling: boolean;
  canCompile: boolean;
  notesCount: number;
  className?: string;
}

export const CompilationControls: React.FC<CompilationControlsProps> = ({
  reportSettings,
  onSettingsChange,
  onCompile,
  isCompiling,
  canCompile,
  notesCount,
  className = ''
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Report Configuration
        </CardTitle>
        <CardDescription>
          Configure compilation settings and generate your clinical report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Case ID (Optional)</Label>
            <Input
              placeholder="Enter case identifier..."
              value={reportSettings.patientId || ''}
              onChange={(e) => onSettingsChange({ patientId: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select 
              value={reportSettings.reportType} 
              onValueChange={(value: any) => onSettingsChange({ reportType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="progress">Progress Notes Only</SelectItem>
                <SelectItem value="assessment">Assessment & Plan Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select 
              value={reportSettings.dateRange} 
              onValueChange={(value) => onSettingsChange({ dateRange: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All notes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Status and Notice */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {notesCount} Notes Ready
            </Badge>
            {reportSettings.includeRecommendations && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Recommendations Enabled
              </Badge>
            )}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Educational Purpose Notice</h4>
            <p className="text-sm text-amber-700 dark:text-amber-200">
              This tool compiles clinical notes for educational and clinical decision support purposes only. 
              No patient-identifiable information is stored or transmitted. All compiled reports are intended 
              to assist with clinical education and should not replace professional medical judgment.
            </p>
          </div>
        </div>

        {/* Compile Button */}
        <div className="flex justify-center">
          <Button 
            onClick={onCompile} 
            disabled={isCompiling || !canCompile}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isCompiling ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Compiling Report...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Compile Clinical Report
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface CompilationStatusProps {
  isCompiling: boolean;
  error: string | null;
  lastCompilation?: {
    timestamp: string;
    notesProcessed: number;
    processingTime: number;
    warnings?: string[];
  };
  className?: string;
}

export const CompilationStatus: React.FC<CompilationStatusProps> = ({
  isCompiling,
  error,
  lastCompilation,
  className = ''
}) => {
  if (!isCompiling && !error && !lastCompilation) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isCompiling && <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />}
          {error && <AlertCircle className="h-5 w-5 text-red-600" />}
          {!isCompiling && !error && lastCompilation && <CheckCircle className="h-5 w-5 text-green-600" />}
          Compilation Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isCompiling && (
          <div className="flex items-center gap-2 text-blue-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Compiling clinical notes...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-800 font-medium mb-1">
              <AlertCircle className="h-4 w-4" />
              Compilation Error
            </div>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!isCompiling && !error && lastCompilation && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
              <CheckCircle className="h-4 w-4" />
              Last Compilation Successful
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                {lastCompilation.timestamp}
              </div>
              <div>Processed: {lastCompilation.notesProcessed} notes</div>
              <div>Time: {lastCompilation.processingTime}ms</div>
              {lastCompilation.warnings && lastCompilation.warnings.length > 0 && (
                <div className="mt-2">
                  <div className="font-medium">Warnings:</div>
                  <ul className="list-disc list-inside text-xs">
                    {lastCompilation.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
