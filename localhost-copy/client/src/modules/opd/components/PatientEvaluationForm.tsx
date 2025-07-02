import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Brain, Save, UserCheck } from "lucide-react";
import type { PatientEvaluation } from "@/types/clinical";

const patientEvaluationSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  age: z.number().min(0).max(150),
  symptoms: z.array(z.string()),
  riskFactors: z.array(z.string()),
  clinicalNotes: z.string().optional(),
});

type PatientEvaluationFormData = z.infer<typeof patientEvaluationSchema>;

const symptomOptions = [
  { id: "persistent_cough", label: "Persistent cough" },
  { id: "weight_loss", label: "Weight loss" },
  { id: "fatigue", label: "Fatigue" },
  { id: "pain", label: "Pain" },
  { id: "shortness_of_breath", label: "Shortness of breath" },
  { id: "changes_in_skin", label: "Changes in skin" },
  { id: "difficulty_swallowing", label: "Difficulty swallowing" },
  { id: "persistent_headaches", label: "Persistent headaches" }
];

const riskFactorOptions = [
  { id: "family_history", label: "Family history of cancer" },
  { id: "smoking_history", label: "Smoking history" },
  { id: "previous_cancer", label: "Previous cancer diagnosis" },
  { id: "radiation_exposure", label: "Previous radiation exposure" },
  { id: "chemical_exposure", label: "Occupational chemical exposure" },
  { id: "genetic_mutations", label: "Known genetic mutations" }
];

export default function PatientEvaluationForm() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PatientEvaluationFormData>({
    resolver: zodResolver(patientEvaluationSchema),
    defaultValues: {
      patientId: "",
      age: 0,
      symptoms: [],
      riskFactors: [],
      clinicalNotes: "",
    },
  });

  const saveEvaluationMutation = useMutation({
    mutationFn: async (data: PatientEvaluationFormData) => {
      const response = await fetch("/api/patient-evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save evaluation");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Evaluation Saved",
        description: "Patient evaluation has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/patient-evaluations"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save evaluation. Please try again.",
        variant: "destructive",
      });
      console.error("Save evaluation error:", error);
    },
  });

  const analyzeWithAIMutation = useMutation({
    mutationFn: async (data: PatientEvaluationFormData) => {
      const response = await fetch("/api/ai/analyze-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("AI analysis failed");
      }
      
      return response.json();
    },
    onSuccess: (result) => {
      toast({
        title: "AI Analysis Complete",
        description: "Clinical recommendations have been generated.",
      });
      // Trigger AI recommendations panel update
      queryClient.setQueryData(["/api/ai/recommendations"], result);
    },
    onError: (error) => {
      toast({
        title: "AI Analysis Failed",
        description: "Unable to generate recommendations. Please try again.",
        variant: "destructive",
      });
      console.error("AI analysis error:", error);
    },
  });

  const onSubmit = (data: PatientEvaluationFormData) => {
    saveEvaluationMutation.mutate(data);
  };

  const handleAnalyzeWithAI = () => {
    const formData = form.getValues();
    setIsAnalyzing(true);
    analyzeWithAIMutation.mutate(formData, {
      onSettled: () => setIsAnalyzing(false)
    });
  };

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    const currentSymptoms = form.getValues("symptoms");
    if (checked) {
      form.setValue("symptoms", [...currentSymptoms, symptomId]);
    } else {
      form.setValue("symptoms", currentSymptoms.filter(s => s !== symptomId));
    }
  };

  const handleRiskFactorChange = (riskFactorId: string, checked: boolean) => {
    const currentRiskFactors = form.getValues("riskFactors");
    if (checked) {
      form.setValue("riskFactors", [...currentRiskFactors, riskFactorId]);
    } else {
      form.setValue("riskFactors", currentRiskFactors.filter(rf => rf !== riskFactorId));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-medical-blue" />
            <span>Patient Evaluation Form</span>
          </CardTitle>
          <p className="text-slate-600">Comprehensive assessment with AI-powered insights</p>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Patient Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter patient ID" 
                          className="medical-input"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Age" 
                          className="medical-input"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Symptoms Assessment */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Primary Symptoms</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {symptomOptions.map((symptom) => (
                    <div key={symptom.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <Checkbox
                        id={symptom.id}
                        className="medical-checkbox"
                        onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                      />
                      <Label htmlFor={symptom.id} className="text-slate-700 cursor-pointer">
                        {symptom.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Risk Factors</Label>
                <div className="space-y-3">
                  {riskFactorOptions.map((riskFactor) => (
                    <div key={riskFactor.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={riskFactor.id}
                        className="medical-checkbox"
                        onCheckedChange={(checked) => handleRiskFactorChange(riskFactor.id, checked as boolean)}
                      />
                      <Label htmlFor={riskFactor.id} className="text-slate-700 cursor-pointer">
                        {riskFactor.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Notes */}
              <FormField
                control={form.control}
                name="clinicalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinical Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter detailed clinical observations..."
                        rows={4}
                        className="medical-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  onClick={handleAnalyzeWithAI}
                  disabled={isAnalyzing || analyzeWithAIMutation.isPending}
                  className="bg-medical-blue hover:bg-medical-blue-dark text-white shadow-lg"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </Button>
                
                <Button
                  type="submit"
                  variant="outline"
                  disabled={saveEvaluationMutation.isPending}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveEvaluationMutation.isPending ? "Saving..." : "Save Draft"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
