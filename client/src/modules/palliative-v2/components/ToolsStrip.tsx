// client/src/modules/palliative-v2/components/ToolsStrip.tsx
import { Wrench, Syringe, Pill as PillIcon } from "lucide-react";
import ToolCard from "./ToolCard";

const TOOLS = [
  {
    slug: "antiemetic",
    title: "Antiemetic selector",
    href: "/palliative/tools/antiemetic",
    description: "Choose antiemetics by mechanism and patient factors.",
    icon: PillIcon
  },
  {
    slug: "bowel",
    title: "Bowel regimen",
    href: "/palliative/tools/bowel",
    description: "Step-wise regimen for prevention and treatment.",
    icon: Syringe
  }
];

export default function ToolsStrip() {
  if (!TOOLS.length) return <div className="p-4 text-sm text-muted-foreground">No clinical tools available.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {TOOLS.map(t => <ToolCard key={t.slug} title={t.title} description={t.description} href={t.href} icon={t.icon ?? Wrench} />)}
    </div>
  );
}
