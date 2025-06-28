import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import HandbookIndex from "./HandbookIndex";
import MarkdownViewer from "./MarkdownViewer";

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

export default function HandbookModule() {
  const [selectedChapter, setSelectedChapter] = useState<SelectedChapter | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChapterSelect = (chapter: SelectedChapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Clinical Handbook
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Comprehensive medical oncology, radiation oncology, and palliative care reference
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search handbook topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Table of Contents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <HandbookIndex 
                  onChapterSelect={handleChapterSelect}
                  searchTerm={searchTerm}
                  selectedChapter={selectedChapter}
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            {selectedChapter ? (
              <MarkdownViewer chapter={selectedChapter} />
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Book className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Select a Chapter
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a topic from the table of contents to begin reading
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}