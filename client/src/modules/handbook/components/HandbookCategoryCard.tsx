import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Handbook {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
  topics: string[];
  chapterCount: number;
}

interface HandbookCategoryCardProps {
  handbook: Handbook;
  onClick: () => void;
}

const colorVariants = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-900/30"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    button: "bg-orange-600 hover:bg-orange-700 text-white",
    hover: "hover:bg-orange-100 dark:hover:bg-orange-900/30"
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    button: "bg-green-600 hover:bg-green-700 text-white",
    hover: "hover:bg-green-100 dark:hover:bg-green-900/30"
  }
};

export default function HandbookCategoryCard({ handbook, onClick }: HandbookCategoryCardProps) {
  const colors = colorVariants[handbook.color as keyof typeof colorVariants] || colorVariants.blue;
  const Icon = handbook.icon;

  return (
    <Card className={cn(
      "h-full transition-all duration-300 cursor-pointer transform hover:scale-105",
      colors.bg,
      colors.border,
      colors.hover,
      "border-2"
    )} onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className={cn("p-3 rounded-xl", colors.bg)}>
            <Icon className={cn("h-8 w-8", colors.icon)} />
          </div>
          <Badge className={cn("text-xs", colors.badge)}>
            {handbook.chapterCount} Chapters
          </Badge>
        </div>
        
        <CardTitle className="text-xl text-gray-900 dark:text-white mt-4">
          {handbook.title}
        </CardTitle>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {handbook.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Key Topics */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Key Topics:
          </h4>
          <div className="space-y-2">
            {handbook.topics.slice(0, 4).map((topic, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", colors.icon.replace('text-', 'bg-'))} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {topic}
                </span>
              </div>
            ))}
            {handbook.topics.length > 4 && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  +{handbook.topics.length - 4} more topics
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>Comprehensive</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Evidence-based</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          className={cn(
            "w-full group transition-all duration-200",
            colors.button
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <span>Explore Handbook</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}