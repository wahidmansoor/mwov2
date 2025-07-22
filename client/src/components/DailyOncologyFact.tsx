import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { DailyOncologyFact as DailyOncologyFactType } from "../../../shared/schema";

interface DailyOncologyFactProps {
  className?: string;
}

export function DailyOncologyFact({ className }: DailyOncologyFactProps) {
  const [showDetails, setShowDetails] = useState(false);

  const { data: todaysFact, isLoading } = useQuery<DailyOncologyFactType>({
    queryKey: ["/api/daily/fact"],
    refetchInterval: 24 * 60 * 60 * 1000, // Refetch daily
  });

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Daily Oncology Fact</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!todaysFact) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Daily Oncology Fact</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No fact available for today.</p>
        </CardContent>
      </Card>
    );
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (difficulty <= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty
            ? "fill-amber-400 text-amber-400"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Daily Oncology Fact</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {getDifficultyStars(todaysFact.difficulty)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-base mb-2">{todaysFact.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {todaysFact.fact}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            {todaysFact.source}
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs ${getDifficultyColor(todaysFact.difficulty)}`}
          >
            Level {todaysFact.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs capitalize">
            {todaysFact.category}
          </Badge>
        </div>

        {showDetails && (
          <>
            <Separator />
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Evidence Level: </span>
                <span className="text-muted-foreground">{todaysFact.evidenceLevel}</span>
              </div>
              <div>
                <span className="font-medium">Source Reference: </span>
                <span className="text-muted-foreground">{todaysFact.sourceReference}</span>
              </div>
              {todaysFact.tags && todaysFact.tags.length > 0 && (
                <div>
                  <span className="font-medium">Tags: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {todaysFact.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex justify-between items-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs"
          >
            {showDetails ? "Show Less" : "View Details"}
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Source
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}