// REFACTOR: Main module now uses extracted hooks and components for better separation of concerns
import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

// REFACTOR: Import custom hook and components
import { useNotesCompiler } from './hooks/useNotesCompiler';
import { NoteInputForm } from './components/NoteInputForm';
import { NotesQueue } from './components/NotesQueue';
import { CompilationControls, CompilationStatus } from './components/CompilationControls';
import { ReportDisplay } from './components/ReportDisplay';
import { ExportService } from './services/exportService';
import { useToast } from '@/hooks/use-toast';

const NotesCompilerModule = () => {
  const { toast } = useToast();
  
  // REFACTOR: All business logic moved to custom hook
  const {
    notes,
    currentNote,
    compiledReport,
    reportSettings,
    isCompiling,
    isLoading,
    error,
    addNote,
    removeNote,
    setCurrentNote,
    setReportSettings,
    compileReport,
    notesStatistics,
    canCompile,
  } = useNotesCompiler();

  // REFACTOR: Initialize export service
  const exportService = useMemo(() => new ExportService(), []);

  // REFACTOR: Note types configuration moved to hook, but we need it for UI
  const noteTypes = useMemo(() => ({
    progress: { label: 'Progress Note', color: 'bg-blue-100 text-blue-800' },
    assessment: { label: 'Assessment', color: 'bg-green-100 text-green-800' },
    plan: { label: 'Treatment Plan', color: 'bg-purple-100 text-purple-800' },
    review: { label: 'Review', color: 'bg-orange-100 text-orange-800' },
    consultation: { label: 'Consultation', color: 'bg-pink-100 text-pink-800' },
  }), []);

  // REFACTOR: Enhanced handlers with proper error handling
  const handleAddNote = async () => {
    if (!currentNote.title?.trim() || !currentNote.content?.trim()) {
      toast({
        title: "Incomplete Note",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    const noteData = {
      type: currentNote.type || 'progress',
      title: currentNote.title.trim(),
      content: currentNote.content.trim(),
      author: currentNote.author?.trim() || 'Current User',
      date: new Date().toISOString(),
    };

    const success = await addNote(noteData as any);
    if (success) {
      setCurrentNote({
        type: 'progress',
        title: '',
        content: '',
        author: '',
      });
    }
  };

  const handleResetForm = () => {
    setCurrentNote({
      type: 'progress',
      title: '',
      content: '',
      author: '',
    });
  };

  // REFACTOR: Enhanced download with export service
  const handleDownloadReport = async () => {
    if (!compiledReport) return;

    try {
      const result = await exportService.export(compiledReport, {
        format: 'json',
        includeMetadata: true,
        anonymize: true,
        includeAttachments: false,
      });

      if (result.success && result.blob && result.filename) {
        exportService.downloadFile(result.blob, result.filename);
        toast({
          title: "Report Downloaded",
          description: `Report saved as ${result.filename}`,
        });
      } else {
        throw new Error(result.error || 'Export failed');
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    }
  };

  // REFACTOR: Enhanced copy to clipboard
  const handleCopyToClipboard = async () => {
    if (!compiledReport) return;

    try {
      await exportService.copyToClipboard(compiledReport);
      toast({
        title: "Copied to Clipboard",
        description: "Report has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: error instanceof Error ? error.message : 'Failed to copy to clipboard',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* REFACTOR: Enhanced header with statistics */}
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
            {notesStatistics.total} Notes Added
          </Badge>
          {notesStatistics.total > 0 && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {notesStatistics.dateRange}
            </Badge>
          )}
        </div>
      </div>

      {/* REFACTOR: Compilation status display */}
      {(isCompiling || error) && (
        <div className="mb-6">
          <CompilationStatus
            isCompiling={isCompiling}
            error={error}
            lastCompilation={
              compiledReport
                ? {
                    timestamp: new Date(compiledReport.generatedAt).toLocaleString(),
                    notesProcessed: compiledReport.sections.metadata?.totalNotes || 0,
                    processingTime: compiledReport.sections.metadata?.generationTime || 0,
                  }
                : undefined
            }
          />
        </div>
      )}

      {/* REFACTOR: Main content with tab navigation */}
      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notes">Add Notes</TabsTrigger>
          <TabsTrigger value="compile">Compile Report</TabsTrigger>
          <TabsTrigger value="report">Generated Report</TabsTrigger>
        </TabsList>

        {/* REFACTOR: Notes input tab */}
        <TabsContent value="notes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NoteInputForm
              currentNote={currentNote}
              onNoteChange={setCurrentNote}
              onSubmit={handleAddNote}
              onReset={handleResetForm}
              noteTypes={noteTypes}
              isLoading={isLoading}
            />

            <NotesQueue
              notes={notes}
              onRemoveNote={removeNote}
              noteTypes={noteTypes}
            />
          </div>
        </TabsContent>

        {/* REFACTOR: Compilation tab */}
        <TabsContent value="compile">
          <CompilationControls
            reportSettings={reportSettings}
            onSettingsChange={setReportSettings}
            onCompile={compileReport}
            isCompiling={isCompiling}
            canCompile={canCompile}
            notesCount={notes.length}
          />
        </TabsContent>

        {/* REFACTOR: Report display tab */}
        <TabsContent value="report">
          <ReportDisplay
            report={compiledReport}
            onDownload={handleDownloadReport}
            onCopyToClipboard={handleCopyToClipboard}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotesCompilerModule;