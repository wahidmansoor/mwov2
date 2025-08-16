"use client";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Printer, Link as LinkIcon, Filter } from "lucide-react";
import { hasSupabaseConfig } from "@/lib/supabase/client";

export function DemoBanner() {
  if (hasSupabaseConfig) return null;
  
  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertDescription>
        📋 <strong>Demo Mode:</strong> Showing sample data. Configure Supabase to load real content.
      </AlertDescription>
    </Alert>
  );
}

export function CopyLinkButton({ anchor }: { anchor: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const url = `${window.location.pathname}#${anchor}`;
        navigator.clipboard.writeText(url);
      }}
      className="gap-2"
    >
      <LinkIcon className="h-4 w-4" /> Copy link
    </Button>
  );
}

export function PrintSectionButton({ containerId }: { containerId: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => {
        const el = document.getElementById(containerId);
        if (!el) return window.print();
        const pri = window.open("", "_blank");
        if (!pri) return;
        pri.document.write(`<html><head><title>Print</title></head><body>${el.innerHTML}</body></html>`);
        pri.document.close();
        pri.focus();
        pri.print();
        pri.close();
      }}
    >
      <Printer className="h-4 w-4" /> Print section
    </Button>
  );
}

export function EvidenceChips({
  active, onToggle,
}: { active: string[]; onToggle: (tag: string) => void }) {
  const tags: string[] = ["NCCN","ASCO","ESMO","Institutional","ExpertConsensus"];
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Filter className="h-4 w-4 opacity-70" />
      {tags.map(t => (
        <Badge
          key={t}
          variant={active.includes(t) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onToggle(t)}
        >
          {t}
        </Badge>
      ))}
    </div>
  );
}

export function GlobalSearch({
  value, onChange, autoFocusHotkey = "/", placeholder = "Search inpatient..."
}: { value: string; onChange: (v: string)=>void; autoFocusHotkey?: string; placeholder?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === autoFocusHotkey && (e.target as HTMLElement).tagName !== "INPUT") {
        e.preventDefault(); ref.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [autoFocusHotkey]);
  return <Input ref={ref} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />;
}

export function useScrollSpy(ids: string[], offset = 120) {
  // returns activeId as user scrolls
  const activeRef = useRef<string | null>(null);
  useEffect(() => {
    function onScroll() {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) current = id;
      }
      if (current !== activeRef.current) activeRef.current = current;
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return activeRef;
}
