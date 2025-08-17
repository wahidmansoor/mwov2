import ToolCard from "../../components/ToolCard";
import { Card, CardHeader, CardTitle, CardContent, Input } from "../../components/ui";
import { Pill as PillIcon, Syringe, Wrench } from "lucide-react";
import React, { useState } from "react";

type Tool = {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<any>;
};
const TOOLS: Tool[] = [
  { title: "Antiemetic selector", href: "/palliative/tools/antiemetic", description: "Map cause → class → example agents.", icon: PillIcon },
  { title: "Bowel regimen",       href: "/palliative/tools/bowel",      description: "Prevent, treat, and refractory steps.", icon: Syringe }
];

export default function ToolsHub() {
  const [q, setQ] = useState("");
  const items = TOOLS.filter((t: Tool) => (t.title + " " + (t.description ?? "")).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6" data-testid="tools-hub">
      <Card className="border-l-4 border-l-orange-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench />
            Clinical Tools
          </CardTitle>
          <div className="text-sm text-muted-foreground">Read-only helpers to support protocol-based care.</div>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search tools…" value={q} onChange={(e: any) => setQ((e.target as HTMLInputElement).value)} aria-label="Search tools" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((t: Tool) => (
          <ToolCard key={t.href} title={t.title} description={t.description} href={t.href} icon={t.icon} />
        ))}
      </div>

      <div className="text-xs text-muted-foreground">Guidance only; verify local policies and dosing.</div>
    </div>
  );
}
