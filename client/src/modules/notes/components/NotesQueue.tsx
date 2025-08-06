// REFACTOR: Extract reusable UI components
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, User, FileText } from 'lucide-react';
import { NoteEntry } from '../types';

interface NotesQueueProps {
  notes: NoteEntry[];
  onRemoveNote: (id: string) => void;
  noteTypes: Record<string, { label: string; color: string }>;
  className?: string;
}

export const NotesQueue: React.FC<NotesQueueProps> = ({ 
  notes, 
  onRemoveNote, 
  noteTypes,
  className = '' 
}) => {
  if (notes.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notes Queue (0)
          </CardTitle>
          <CardDescription>
            Review notes that will be included in the compilation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="font-medium">No notes added yet</p>
            <p className="text-sm">Add clinical notes to begin compilation</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Notes Queue ({notes.length})
        </CardTitle>
        <CardDescription>
          Review notes that will be included in the compilation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              noteType={noteTypes[note.type]}
              onRemove={() => onRemoveNote(note.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface NoteCardProps {
  note: NoteEntry;
  noteType: { label: string; color: string };
  onRemove: () => void;
  className?: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, noteType, onRemove, className = '' }) => {
  return (
    <div className={`border rounded-lg p-3 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={noteType.color}>
              {noteType.label}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {note.date}
            </span>
          </div>
          <h4 className="font-medium text-sm mb-1">{note.title}</h4>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {note.content.substring(0, 100)}
            {note.content.length > 100 && '...'}
          </p>
          {note.author && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <User className="h-3 w-3" />
              {note.author}
            </p>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
