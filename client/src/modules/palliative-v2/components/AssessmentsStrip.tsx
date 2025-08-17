// client/src/modules/palliative-v2/components/AssessmentsStrip.tsx
import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function AssessmentsStrip() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={()=>setLocation("/palliative/assessments/esasr")}>Open ESAS-r</Button>
      <Button onClick={()=>setLocation("/palliative/assessments/4at")} variant="outline">Open 4AT</Button>
    </div>
  );
}
