// client/src/modules/palliative-v2/components/ToolsStrip.tsx
import React from "react";
import { useLocation } from "wouter";
import { Button } from "./ui";

export default function ToolsStrip() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={()=>setLocation("/palliative/tools/antiemetic")}>Antiemetic selector</Button>
      <Button onClick={()=>setLocation("/palliative/tools/bowel")} variant="ghost">Bowel regimen</Button>
    </div>
  );
}
