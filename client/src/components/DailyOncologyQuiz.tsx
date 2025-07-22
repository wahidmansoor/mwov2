import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Brain, Clock, Target, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { DailyOncologyQuiz as DailyOncologyQuizType } from "../../../shared/schema";

interface DailyOncologyQuizProps {
  className?: string;
}

interface QuizSubmission {
  quizId: string;
  selectedAnswer: string;
  timeSpent?: number;
}

export function DailyOncologyQuiz({ className }: DailyOncologyQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [startTime] = useState(Date.now());
  const { toast } = useToast();

  const { data: todaysQuiz, isLoading: quizLoading } = useQuery<DailyOncologyQuizType>({
    queryKey: ["/api/daily/quiz"],
    refetchInterval: 24 * 60 * 60 * 1000, // Refetch daily
  });

  const { data: performance, isLoading: performanceLoading } = useQuery<{
    totalAnswered: number;
    correctAnswers: number;
    accuracy: number;
    averageTimeSpent: number;
  }>({
    queryKey: ["/api/daily/quiz/performance"],
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (submission: QuizSubmission) => {
      return await apiRequest("/api/daily/quiz/submit", "POST", submission);
    },
    onSuccess: (result) => {
      setSubmissionResult(result);
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/daily/quiz/performance"] });
      
      const isCorrect = result.isCorrect;
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect 
          ? "Great job! You got it right." 
          : "Don't worry, keep learning!",
        variant: isCorrect ? "default" : "destructive",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quiz response",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!selectedAnswer || !todaysQuiz) return;
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    submitQuizMutation.mutate({
      quizId: todaysQuiz.id,
      selectedAnswer,
      timeSpent,
    });
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

  if (quizLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Daily Oncology Quiz</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-8 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!todaysQuiz) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Daily Oncology Quiz</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No quiz available for today.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Daily Oncology Quiz</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {getDifficultyStars(todaysQuiz.difficulty)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {todaysQuiz.source}
          </Badge>
          <Badge variant="outline" className="text-xs capitalize">
            {todaysQuiz.category}
          </Badge>
          {todaysQuiz.subcategory && (
            <Badge variant="outline" className="text-xs capitalize">
              {todaysQuiz.subcategory}
            </Badge>
          )}
        </div>

        <div>
          <h3 className="font-medium text-sm mb-3 leading-relaxed">
            {todaysQuiz.question}
          </h3>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {Object.entries(todaysQuiz.options as Record<string, string>).map(([key, value]) => (
                <div key={key} className="flex items-start space-x-2">
                  <RadioGroupItem value={key} id={key} className="mt-1" />
                  <Label htmlFor={key} className="text-sm leading-relaxed cursor-pointer">
                    <span className="font-medium">{key}:</span> {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer || submitQuizMutation.isPending}
              className="w-full"
              size="sm"
            >
              {submitQuizMutation.isPending ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-3 rounded-lg border ${
              submissionResult?.isCorrect 
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {submissionResult?.isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className="font-medium text-sm">
                  {submissionResult?.isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm">
                <span className="font-medium">Correct Answer: </span>
                {submissionResult?.correctAnswer}
              </p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Explanation:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {submissionResult?.explanation}
              </p>
            </div>

            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Source Reference: </span>
              {todaysQuiz.sourceReference}
            </div>
          </div>
        )}

        {performance && !performanceLoading && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Your Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-medium">{performance.accuracy.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Avg Time:</span>
                  <span className="font-medium">{Math.round(performance.averageTimeSpent)}s</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Correct Answers</span>
                  <span>{performance.correctAnswers}/{performance.totalAnswered}</span>
                </div>
                <Progress value={performance.accuracy} className="h-2" />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}