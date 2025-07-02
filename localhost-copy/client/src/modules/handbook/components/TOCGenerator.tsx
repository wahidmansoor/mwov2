import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Circle, Dot } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCEntry {
  id: string;
  title: string;
  level: number;
  specialty: string;
}

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

interface TOCGeneratorProps {
  indexText: string;
  onChapterSelect: (chapter: SelectedChapter) => void;
  searchTerm: string;
  selectedChapter: SelectedChapter | null;
  specialty: string;
}

const parseIndexToTOC = (indexText: string, specialty: string): TOCEntry[] => {
  const entries: TOCEntry[] = [];
  const lines = indexText.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.includes('___') || trimmed.includes('–') || trimmed.includes('Index')) continue;
    
    // Detect chapters (start with "Chapter")
    if (trimmed.startsWith('Chapter')) {
      entries.push({
        id: `${specialty}-${trimmed.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: trimmed,
        level: 1,
        specialty
      });
    }
    // Detect main sections (start with •)
    else if (trimmed.startsWith('•')) {
      const title = trimmed.substring(1).trim();
      entries.push({
        id: `${specialty}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: title,
        level: 2,
        specialty
      });
    }
    // Detect subsections (start with o)
    else if (trimmed.startsWith('o')) {
      const title = trimmed.substring(1).trim();
      entries.push({
        id: `${specialty}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: title,
        level: 3,
        specialty
      });
    }
    // Handle Appendices section
    else if (trimmed === 'Appendices') {
      entries.push({
        id: `${specialty}-appendices`,
        title: 'Appendices',
        level: 1,
        specialty
      });
    }
  }
  
  return entries;
};

const TOCNode = ({ 
  entry, 
  onSelect, 
  selectedId, 
  searchTerm 
}: { 
  entry: TOCEntry; 
  onSelect: (chapter: SelectedChapter) => void;
  selectedId?: string;
  searchTerm: string;
}) => {
  const isSelected = selectedId === entry.id;
  const matchesSearch = !searchTerm || 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase());

  if (!matchesSearch) return null;

  const getIcon = (level: number) => {
    switch (level) {
      case 1: return <Circle className="h-3 w-3" />;
      case 2: return <Dot className="h-3 w-3" />;
      case 3: return <div className="h-2 w-2 bg-gray-400 rounded-full" />;
      default: return <div className="h-1 w-1 bg-gray-300 rounded-full" />;
    }
  };

  const getIndentation = (level: number) => {
    return level * 16; // 16px per level
  };

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'medical': return 'hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'radiation': return 'hover:bg-orange-50 dark:hover:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'palliative': return 'hover:bg-green-50 dark:hover:bg-green-900 text-green-700 dark:text-green-300';
      default: return 'hover:bg-gray-50 dark:hover:bg-gray-900';
    }
  };

  const getSelectedColor = (specialty: string) => {
    switch (specialty) {
      case 'medical': return 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300';
      case 'radiation': return 'bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300';
      case 'palliative': return 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-left h-auto py-2 px-2",
          getSpecialtyColor(entry.specialty),
          isSelected && getSelectedColor(entry.specialty)
        )}
        style={{ paddingLeft: `${getIndentation(entry.level)}px` }}
        onClick={() => onSelect({
          id: entry.id,
          title: entry.title,
          level: entry.level
        })}
      >
        <div className="flex items-center gap-2">
          {getIcon(entry.level)}
          <span className={cn(
            "text-sm",
            entry.level === 1 && "font-semibold",
            entry.level === 2 && "font-medium",
            entry.level >= 3 && "text-gray-600 dark:text-gray-400"
          )}>
            {entry.title}
          </span>
        </div>
      </Button>
    </div>
  );
};

export default function TOCGenerator({ 
  indexText, 
  onChapterSelect, 
  searchTerm, 
  selectedChapter,
  specialty 
}: TOCGeneratorProps) {
  const entries = useMemo(() => parseIndexToTOC(indexText, specialty), [indexText, specialty]);

  const filteredEntries = useMemo(() => {
    if (!searchTerm) return entries;
    return entries.filter(entry => 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entries, searchTerm]);

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-1">
        {filteredEntries.map((entry) => (
          <TOCNode
            key={entry.id}
            entry={entry}
            onSelect={onChapterSelect}
            selectedId={selectedChapter?.id}
            searchTerm={searchTerm}
          />
        ))}
        {filteredEntries.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No topics found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}