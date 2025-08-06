// REFACTOR: Extract all business logic into custom hook
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  NoteEntry, 
  CompiledReport, 
  ReportSettings, 
  validateNoteEntry, 
  validateReportSettings,
  NoteType 
} from '../types';
import { ReportCompilerService, CompilationResult } from '../services/reportCompiler';

interface UseNotesCompilerReturn {
  // State
  notes: NoteEntry[];
  currentNote: Partial<NoteEntry>;
  compiledReport: CompiledReport | null;
  reportSettings: ReportSettings;
  isCompiling: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addNote: (note: Omit<NoteEntry, 'id' | 'createdAt'>) => Promise<boolean>;
  removeNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<NoteEntry>) => Promise<boolean>;
  setCurrentNote: (note: Partial<NoteEntry>) => void;
  setReportSettings: (settings: Partial<ReportSettings>) => void;
  compileReport: () => Promise<CompilationResult>;
  clearNotes: () => void;
  clearReport: () => void;
  
  // Computed values
  notesByType: Record<NoteType, NoteEntry[]>;
  notesStatistics: {
    total: number;
    byType: Array<{ type: NoteType; count: number; label: string }>;
    dateRange: string;
  };
  
  // Utilities
  canCompile: boolean;
  hasValidConfiguration: boolean;
}

export const useNotesCompiler = (): UseNotesCompilerReturn => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [currentNote, setCurrentNote] = useState<Partial<NoteEntry>>({
    type: 'progress',
    title: '',
    content: '',
    author: '',
  });
  const [compiledReport, setCompiledReport] = useState<CompiledReport | null>(null);
  const [reportSettings, setReportSettingsState] = useState<ReportSettings>({
    patientId: '',
    reportType: 'comprehensive',
    dateRange: '30',
    includeRecommendations: true,
    format: 'json',
    anonymize: true,
  });
  const [isCompiling, setIsCompiling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // REFACTOR: Initialize service instance
  const compilerService = useMemo(() => new ReportCompilerService(), []);

  // REFACTOR: Note type definitions with proper typing
  const noteTypes = useMemo(() => ({
    progress: { label: 'Progress Note', color: 'bg-blue-100 text-blue-800' },
    assessment: { label: 'Assessment', color: 'bg-green-100 text-green-800' },
    plan: { label: 'Treatment Plan', color: 'bg-purple-100 text-purple-800' },
    review: { label: 'Review', color: 'bg-orange-100 text-orange-800' },
    consultation: { label: 'Consultation', color: 'bg-pink-100 text-pink-800' },
  }), []);

  // REFACTOR: Memoized computed values for performance
  const notesByType = useMemo(() => {
    return notes.reduce((acc, note) => {
      if (!acc[note.type]) {
        acc[note.type] = [];
      }
      acc[note.type].push(note);
      return acc;
    }, {} as Record<NoteType, NoteEntry[]>);
  }, [notes]);

  const notesStatistics = useMemo(() => {
    const total = notes.length;
    const byType = Object.entries(notesByType).map(([type, typeNotes]) => ({
      type: type as NoteType,
      count: typeNotes.length,
      label: noteTypes[type as NoteType]?.label || type,
    }));

    // Calculate date range
    let dateRange = 'No notes';
    if (notes.length > 0) {
      try {
        const dates = notes.map(note => new Date(note.date)).filter(d => !isNaN(d.getTime()));
        if (dates.length > 0) {
          const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
          const latest = new Date(Math.max(...dates.map(d => d.getTime())));
          dateRange = `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`;
        }
      } catch (err) {
        dateRange = 'Invalid dates';
      }
    }

    return { total, byType, dateRange };
  }, [notes, notesByType, noteTypes]);

  const canCompile = useMemo(() => {
    return notes.length > 0 && !isCompiling && !isLoading;
  }, [notes.length, isCompiling, isLoading]);

  const hasValidConfiguration = useMemo(() => {
    try {
      validateReportSettings(reportSettings);
      return true;
    } catch {
      return false;
    }
  }, [reportSettings]);

  // REFACTOR: Enhanced add note with validation and error handling
  const addNote = useCallback(async (noteData: Omit<NoteEntry, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      setError(null);
      setIsLoading(true);

      // REFACTOR: Validate note data
      const noteToValidate = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date(),
        date: noteData.date || new Date().toISOString(),
      };

      const validatedNote = validateNoteEntry(noteToValidate);

      // REFACTOR: Check for duplicates
      const isDuplicate = notes.some(existing => 
        existing.title === validatedNote.title && 
        existing.content === validatedNote.content &&
        existing.date === validatedNote.date
      );

      if (isDuplicate) {
        toast({
          title: "Duplicate Note",
          description: "A note with similar content already exists.",
          variant: "destructive",
        });
        return false;
      }

      // REFACTOR: Add note with optimistic update
      setNotes(prev => [validatedNote, ...prev]);

      toast({
        title: "Note Added Successfully",
        description: `${noteTypes[validatedNote.type]?.label} has been added to the compilation queue.`,
      });

      return true;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add note';
      setError(errorMessage);
      
      toast({
        title: "Failed to Add Note",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [notes, noteTypes, toast]);

  // REFACTOR: Enhanced remove note with confirmation
  const removeNote = useCallback((id: string) => {
    try {
      setNotes(prev => prev.filter(note => note.id !== id));
      
      toast({
        title: "Note Removed",
        description: "Note has been removed from the compilation queue.",
      });
    } catch (error) {
      toast({
        title: "Failed to Remove Note",
        description: "An error occurred while removing the note.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // REFACTOR: Update note functionality
  const updateNote = useCallback(async (id: string, updates: Partial<NoteEntry>): Promise<boolean> => {
    try {
      setError(null);
      setIsLoading(true);

      setNotes(prev => prev.map(note => {
        if (note.id === id) {
          const updatedNote = { ...note, ...updates, updatedAt: new Date() };
          try {
            return validateNoteEntry(updatedNote);
          } catch (validationError) {
            throw new Error(`Validation failed: ${validationError}`);
          }
        }
        return note;
      }));

      toast({
        title: "Note Updated",
        description: "Note has been successfully updated.",
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update note';
      setError(errorMessage);
      
      toast({
        title: "Failed to Update Note",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // REFACTOR: Enhanced report settings update with validation
  const setReportSettings = useCallback((settings: Partial<ReportSettings>) => {
    try {
      const newSettings = { ...reportSettings, ...settings };
      const validatedSettings = validateReportSettings(newSettings);
      setReportSettingsState(validatedSettings);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid report settings';
      setError(errorMessage);
      
      toast({
        title: "Invalid Settings",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [reportSettings, toast]);

  // REFACTOR: Enhanced compilation with comprehensive error handling
  const compileReport = useCallback(async (): Promise<CompilationResult> => {
    if (notes.length === 0) {
      const result: CompilationResult = {
        success: false,
        error: "No notes available for compilation",
        metadata: { processingTime: 0, notesProcessed: 0, warnings: [] }
      };
      
      toast({
        title: "No Notes",
        description: "Please add at least one note to compile a report.",
        variant: "destructive",
      });
      
      return result;
    }

    try {
      setError(null);
      setIsCompiling(true);

      // REFACTOR: Validate settings before compilation
      const validatedSettings = validateReportSettings(reportSettings);

      // REFACTOR: Use service for compilation
      const result = await compilerService.compile(notes, validatedSettings);

      if (result.success && result.report) {
        setCompiledReport(result.report);
        
        toast({
          title: "Report Compiled Successfully",
          description: `Processed ${result.metadata?.notesProcessed} notes in ${result.metadata?.processingTime}ms`,
        });

        // REFACTOR: Log warnings if any
        if (result.metadata?.warnings && result.metadata.warnings.length > 0) {
          console.warn('Compilation warnings:', result.metadata.warnings);
        }
      } else {
        setError(result.error || 'Unknown compilation error');
        
        toast({
          title: "Compilation Failed",
          description: result.error || "An unknown error occurred during compilation.",
          variant: "destructive",
        });
      }

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Compilation failed';
      setError(errorMessage);
      
      const result: CompilationResult = {
        success: false,
        error: errorMessage,
        metadata: { processingTime: 0, notesProcessed: 0, warnings: [] }
      };

      toast({
        title: "Compilation Error",
        description: errorMessage,
        variant: "destructive",
      });

      return result;
    } finally {
      setIsCompiling(false);
    }
  }, [notes, reportSettings, compilerService, toast]);

  // REFACTOR: Utility functions
  const clearNotes = useCallback(() => {
    setNotes([]);
    setCurrentNote({
      type: 'progress',
      title: '',
      content: '',
      author: '',
    });
    
    toast({
      title: "Notes Cleared",
      description: "All notes have been removed from the compilation queue.",
    });
  }, [toast]);

  const clearReport = useCallback(() => {
    setCompiledReport(null);
    setError(null);
    
    toast({
      title: "Report Cleared",
      description: "Compiled report has been cleared.",
    });
  }, [toast]);

  return {
    // State
    notes,
    currentNote,
    compiledReport,
    reportSettings,
    isCompiling,
    isLoading,
    error,
    
    // Actions
    addNote,
    removeNote,
    updateNote,
    setCurrentNote,
    setReportSettings,
    compileReport,
    clearNotes,
    clearReport,
    
    // Computed values
    notesByType,
    notesStatistics,
    
    // Utilities
    canCompile,
    hasValidConfiguration,
  };
};
