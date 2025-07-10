import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Copy, 
  RefreshCw,
  Stethoscope,
  Calendar,
  User,
  Activity,
  FileCheck,
  Sparkles
} from 'lucide-react';

interface NoteEntry {
  id: string;
  date: string;
  type: 'progress' | 'assessment' | 'plan' | 'review' | 'consultation';
  title: string;
  content: string;
  author: string;
}

interface CompiledReport {
  patientId: string;
  reportType: string;
  dateRange: string;
  sections: {
    summary: string;
    progressNotes: string;
    assessmentAndPlan: string;
    clinicalRecommendations: string;
  };
  generatedAt: string;
}

const NotesCompilerModule = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [currentNote, setCurrentNote] = useState({
    type: 'progress' as const,
    title: '',
    content: '',
    author: '',
  });
  const [compiledReport, setCompiledReport] = useState<CompiledReport | null>(null);
  const [reportSettings, setReportSettings] = useState({
    patientId: '',
    reportType: 'comprehensive',
    dateRange: '30',
    includeRecommendations: true,
  });
  const [isCompiling, setIsCompiling] = useState(false);

  const noteTypes = {
    progress: { label: 'Progress Note', color: 'bg-blue-100 text-blue-800' },
    assessment: { label: 'Assessment', color: 'bg-green-100 text-green-800' },
    plan: { label: 'Treatment Plan', color: 'bg-purple-100 text-purple-800' },
    review: { label: 'Review', color: 'bg-orange-100 text-orange-800' },
    consultation: { label: 'Consultation', color: 'bg-pink-100 text-pink-800' },
  };

  const addNote = () => {
    if (!currentNote.title || !currentNote.content) {
      toast({
        title: "Incomplete Note",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    const newNote: NoteEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: currentNote.type,
      title: currentNote.title,
      content: currentNote.content,
      author: currentNote.author || 'Current User',
    };

    setNotes(prev => [newNote, ...prev]);
    setCurrentNote({
      type: 'progress',
      title: '',
      content: '',
      author: '',
    });

    toast({
      title: "Note Added",
      description: "Note has been added to the compilation queue.",
    });
  };

  const removeNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const compileReport = async () => {
    if (notes.length === 0) {
      toast({
        title: "No Notes",
        description: "Please add at least one note to compile a report.",
        variant: "destructive",
      });
      return;
    }

    setIsCompiling(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Group notes by type for organized compilation
    const notesByType = notes.reduce((acc, note) => {
      if (!acc[note.type]) acc[note.type] = [];
      acc[note.type].push(note);
      return acc;
    }, {} as Record<string, NoteEntry[]>);

    // Generate compiled report sections
    const summary = generateSummary(notes);
    const progressNotes = compileProgressNotes(notesByType.progress || []);
    const assessmentAndPlan = compileAssessmentAndPlan(
      [...(notesByType.assessment || []), ...(notesByType.plan || [])]
    );
    const clinicalRecommendations = generateClinicalRecommendations(notes);

    const report: CompiledReport = {
      patientId: reportSettings.patientId || 'CASE-' + Date.now(),
      reportType: reportSettings.reportType,
      dateRange: `Last ${reportSettings.dateRange} days`,
      sections: {
        summary,
        progressNotes,
        assessmentAndPlan,
        clinicalRecommendations,
      },
      generatedAt: new Date().toLocaleString(),
    };

    setCompiledReport(report);
    setIsCompiling(false);

    toast({
      title: "Report Compiled",
      description: "Clinical notes have been successfully compiled into a structured report.",
    });
  };

  const generateSummary = (notes: NoteEntry[]): string => {
    const totalNotes = notes.length;
    const dateRange = notes.length > 0 ? 
      `${notes[notes.length - 1].date} to ${notes[0].date}` : 
      'No date range';
    
    return `Clinical Summary Report generated from ${totalNotes} clinical notes spanning ${dateRange}. This compilation provides a comprehensive overview of the clinical course, assessments, and treatment plans based on the provided documentation. All information is compiled for clinical decision support and educational purposes only.`;
  };

  const compileProgressNotes = (progressNotes: NoteEntry[]): string => {
    if (progressNotes.length === 0) {
      return "No progress notes available for this period.";
    }

    let compiled = "PROGRESS NOTES COMPILATION:\n\n";
    
    progressNotes.forEach((note, index) => {
      compiled += `${index + 1}. ${note.title} (${note.date})\n`;
      compiled += `   Author: ${note.author}\n`;
      compiled += `   Content: ${note.content}\n\n`;
    });

    compiled += "SUMMARY: Based on the progress notes above, the clinical course shows ";
    compiled += progressNotes.length > 3 ? "multiple documented encounters" : "limited documentation";
    compiled += " with ongoing clinical monitoring and assessment.";

    return compiled;
  };

  const compileAssessmentAndPlan = (assessmentNotes: NoteEntry[]): string => {
    if (assessmentNotes.length === 0) {
      return "No assessment or plan notes available for compilation.";
    }

    let compiled = "ASSESSMENT & PLAN COMPILATION:\n\n";
    
    assessmentNotes.forEach((note, index) => {
      compiled += `${index + 1}. ${note.title} (${note.date})\n`;
      compiled += `   Type: ${noteTypes[note.type].label}\n`;
      compiled += `   Assessment: ${note.content}\n\n`;
    });

    compiled += "INTEGRATED ASSESSMENT: The compiled assessments indicate ongoing clinical evaluation ";
    compiled += "with documented treatment planning and clinical decision-making processes.";

    return compiled;
  };

  const generateClinicalRecommendations = (notes: NoteEntry[]): string => {
    let recommendations = "CLINICAL DECISION SUPPORT RECOMMENDATIONS:\n\n";
    
    recommendations += "Based on the compiled clinical notes, the following general recommendations are suggested:\n\n";
    recommendations += "1. DOCUMENTATION: Continue comprehensive clinical documentation to maintain continuity of care\n";
    recommendations += "2. MONITORING: Regular assessment and monitoring as indicated by clinical presentation\n";
    recommendations += "3. COMPLIANCE: Ensure all clinical decisions align with current evidence-based guidelines\n";
    recommendations += "4. COMMUNICATION: Maintain clear communication between all members of the healthcare team\n\n";
    
    recommendations += "Note: These are general clinical decision support recommendations. ";
    recommendations += "All specific clinical decisions should be made by qualified healthcare professionals ";
    recommendations += "based on individual patient assessment and current clinical guidelines.";

    return recommendations;
  };

  const downloadReport = () => {
    if (!compiledReport) return;

    const reportText = `
ONCOVISTA CLINICAL NOTES COMPILATION REPORT
==========================================

Case ID: ${compiledReport.patientId}
Report Type: ${compiledReport.reportType}
Date Range: ${compiledReport.dateRange}
Generated: ${compiledReport.generatedAt}

CLINICAL SUMMARY
================
${compiledReport.sections.summary}

PROGRESS NOTES
==============
${compiledReport.sections.progressNotes}

ASSESSMENT & PLAN
=================
${compiledReport.sections.assessmentAndPlan}

CLINICAL RECOMMENDATIONS
========================
${compiledReport.sections.clinicalRecommendations}

DISCLAIMER
==========
This report is generated by OncoVista AI for clinical decision support and educational purposes only.
It is not intended to replace professional medical judgment or clinical assessment.
All clinical decisions should be made by qualified healthcare professionals.
No patient-identifiable information is stored or transmitted.
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oncovista-report-${compiledReport.patientId}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!compiledReport) return;

    const reportText = `Clinical Summary: ${compiledReport.sections.summary}\n\nProgress Notes: ${compiledReport.sections.progressNotes}\n\nAssessment & Plan: ${compiledReport.sections.assessmentAndPlan}\n\nRecommendations: ${compiledReport.sections.clinicalRecommendations}`;
    
    await navigator.clipboard.writeText(reportText);
    toast({
      title: "Copied to Clipboard",
      description: "Report has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="h-8 w-8 text-green-600" />
            Clinical Notes Compiler
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Compile and organize clinical notes into structured reports for educational purposes
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {notes.length} Notes Added
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notes">Add Notes</TabsTrigger>
          <TabsTrigger value="compile">Compile Report</TabsTrigger>
          <TabsTrigger value="report">Generated Report</TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Clinical Note
                </CardTitle>
                <CardDescription>
                  Paste or enter clinical notes for compilation and analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Note Type</Label>
                    <Select 
                      value={currentNote.type} 
                      onValueChange={(value: any) => setCurrentNote(prev => ({...prev, type: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(noteTypes).map(([key, type]) => (
                          <SelectItem key={key} value={key}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Author (Optional)</Label>
                    <Input
                      placeholder="Note author"
                      value={currentNote.author}
                      onChange={(e) => setCurrentNote(prev => ({...prev, author: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Note Title</Label>
                  <Input
                    placeholder="Enter note title..."
                    value={currentNote.title}
                    onChange={(e) => setCurrentNote(prev => ({...prev, title: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Note Content</Label>
                  <Textarea
                    placeholder="Paste or enter clinical note content here..."
                    value={currentNote.content}
                    onChange={(e) => setCurrentNote(prev => ({...prev, content: e.target.value}))}
                    rows={8}
                  />
                </div>

                <Button onClick={addNote} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note to Compilation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Notes Queue ({notes.length})
                </CardTitle>
                <CardDescription>
                  Review notes that will be included in the compilation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notes.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No notes added yet</p>
                      <p className="text-sm">Add clinical notes to begin compilation</p>
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={noteTypes[note.type].color}>
                                {noteTypes[note.type].label}
                              </Badge>
                              <span className="text-sm text-gray-500">{note.date}</span>
                            </div>
                            <h4 className="font-medium">{note.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {note.content.substring(0, 100)}...
                            </p>
                            {note.author && (
                              <p className="text-xs text-gray-500 mt-1">By: {note.author}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeNote(note.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compile">
          <Card>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Case ID (Optional)</Label>
                  <Input
                    placeholder="Enter case identifier..."
                    value={reportSettings.patientId}
                    onChange={(e) => setReportSettings(prev => ({...prev, patientId: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select 
                    value={reportSettings.reportType} 
                    onValueChange={(value) => setReportSettings(prev => ({...prev, reportType: value}))}
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
                    onValueChange={(value) => setReportSettings(prev => ({...prev, dateRange: value}))}
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

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Educational Purpose Notice</h4>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  This tool compiles clinical notes for educational and clinical decision support purposes only. 
                  No patient-identifiable information is stored or transmitted. All compiled reports are intended 
                  to assist with clinical education and should not replace professional medical judgment.
                </p>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={compileReport} 
                  disabled={isCompiling || notes.length === 0}
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
        </TabsContent>

        <TabsContent value="report">
          {compiledReport ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Compiled Clinical Report
                    </CardTitle>
                    <CardDescription>
                      Generated on {compiledReport.generatedAt}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadReport} className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Case ID</Label>
                    <p className="font-mono">{compiledReport.patientId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Report Type</Label>
                    <p className="capitalize">{compiledReport.reportType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date Range</Label>
                    <p>{compiledReport.dateRange}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Clinical Summary</h3>
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">{compiledReport.sections.summary}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Progress Notes</h3>
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">{compiledReport.sections.progressNotes}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Assessment & Plan</h3>
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">{compiledReport.sections.assessmentAndPlan}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Clinical Recommendations</h3>
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">{compiledReport.sections.clinicalRecommendations}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-24 w-24 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">No Report Generated</h3>
                <p className="text-gray-600 mb-4">
                  Add clinical notes and compile them to generate a structured report
                </p>
                <Button onClick={() => compileReport()} disabled={notes.length === 0}>
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotesCompilerModule;