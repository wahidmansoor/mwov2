// client/src/modules/palliative-v2/components/AssessmentsStrip.tsx
import React from "react";
import { useLocation } from "wouter";
import ActionPill from "./ActionPill";

export default function AssessmentsStrip() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-wrap gap-2">
  <ActionPill label="Open ESAS-r" to="/palliative/assessments/esasr" />
  <ActionPill label="Open 4AT" to="/palliative/assessments/4at" />
    </div>
  );
}
