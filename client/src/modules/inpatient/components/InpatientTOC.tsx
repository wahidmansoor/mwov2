"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { id: "admission", label: "Admission Protocols" },
  { id: "emergency", label: "Emergency Regimens" },
  { id: "monitoring", label: "Monitoring Workflows" },
  { id: "supportive", label: "Supportive Care" },
  { id: "discharge", label: "Discharge Planning" },
];

export default function InpatientTOC() {
  const [active, setActive] = useState<string>("admission");

  useEffect(() => {
    function onScroll() {
      let current = "admission";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActive(current);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Card className="sticky top-20 hidden xl:block h-fit">
      <CardHeader><CardTitle>On this page</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e)=>{ e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({behavior:"smooth"}); }}
            className={`block text-sm ${active===s.id ? "font-semibold" : "text-muted-foreground"}`}
          >
            {s.label}
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
