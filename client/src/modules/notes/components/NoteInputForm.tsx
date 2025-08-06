// REFACTOR: Extract note input form component
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, RotateCcw } from 'lucide-react';
import { NoteEntry, NoteType } from '../types';

interface NoteInputFormProps {
  currentNote: Partial<NoteEntry>;
  onNoteChange: (note: Partial<NoteEntry>) => void;
  onSubmit: () => Promise<void>;
  onReset: () => void;
  noteTypes: Record<NoteType, { label: string; color: string }>;
  isLoading?: boolean;
  className?: string;
}

export const NoteInputForm: React.FC<NoteInputFormProps> = ({
  currentNote,
  onNoteChange,
  onSubmit,
  onReset,
  noteTypes,
  isLoading = false,
  className = ''
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const isValid = currentNote.title?.trim() && currentNote.content?.trim();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Clinical Note
        </CardTitle>
        <CardDescription>
          Paste or enter clinical notes for compilation and analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Note Type and Author Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="note-type">Note Type</Label>
              <Select 
                value={currentNote.type || 'progress'} 
                onValueChange={(value: NoteType) => onNoteChange({ ...currentNote, type: value })}
              >
                <SelectTrigger id="note-type">
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
              <Label htmlFor="note-author">Author (Optional)</Label>
              <Input
                id="note-author"
                placeholder="Note author"
                value={currentNote.author || ''}
                onChange={(e) => onNoteChange({ ...currentNote, author: e.target.value })}
              />
            </div>
          </div>

          {/* Note Title */}
          <div className="space-y-2">
            <Label htmlFor="note-title" className="required">
              Note Title
            </Label>
            <Input
              id="note-title"
              placeholder="Enter note title..."
              value={currentNote.title || ''}
              onChange={(e) => onNoteChange({ ...currentNote, title: e.target.value })}
              required
            />
          </div>

          {/* Note Content */}
          <div className="space-y-2">
            <Label htmlFor="note-content" className="required">
              Note Content
            </Label>
            <Textarea
              id="note-content"
              placeholder="Paste or enter clinical note content here..."
              value={currentNote.content || ''}
              onChange={(e) => onNoteChange({ ...currentNote, content: e.target.value })}
              rows={8}
              required
            />
            <div className="text-xs text-gray-500">
              {currentNote.content?.length || 0} / 5000 characters
            </div>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="note-date">Date</Label>
            <Input
              id="note-date"
              type="date"
              value={currentNote.date || new Date().toISOString().split('T')[0]}
              onChange={(e) => onNoteChange({ ...currentNote, date: e.target.value })}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              type="submit"
              disabled={!isValid || isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-pulse" />
                  Adding Note...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note to Compilation
                </>
              )}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={onReset}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Validation Messages */}
          {!isValid && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-sm text-yellow-800">
                <strong>Required fields:</strong>
                <ul className="list-disc list-inside mt-1">
                  {!currentNote.title?.trim() && <li>Note title</li>}
                  {!currentNote.content?.trim() && <li>Note content (minimum 10 characters)</li>}
                </ul>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
