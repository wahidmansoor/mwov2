"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useDischargePlanningQ, filterByEvidence, searchRows, useBookmarks } from "@/lib/hooks/useInpatientData";
import { CopyLinkButton, GlobalSearch, EvidenceChips, PrintSectionButton, DemoBanner } from "./_shared";

export function DischargePlanning() {
  const { data, isLoading } = useDischargePlanningQ();
  const [q, setQ] = useState("");
  const [evidence, setEvidence] = useState<string[]>([]);
  const [collapseAll, setCollapseAll] = useState(false);
  const { toggle, isBookmarked, all } = useBookmarks();

  const rows = useMemo(() => {
    const f1 = filterByEvidence(data || [], evidence as any);
    const f2 = searchRows(f1, q);
    return f2;
  }, [data, evidence, q]);

  const bookmarkedSlugs = new Set(all());

  return (
    <div className="space-y-4" id="discharge">
      <DemoBanner />
      
      <div className="flex items-center justify-between gap-3">
        <Alert className="flex-1">
          <AlertDescription>Discharge criteria and transition planning tools for safe discharge.</AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <PrintSectionButton containerId="discharge-container" />
          <Button variant="outline" size="sm" onClick={()=>setCollapseAll(v=>!v)} className="gap-2">
            {collapseAll ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {collapseAll ? "Expand all" : "Collapse all"}
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <GlobalSearch value={q} onChange={setQ} />
        <div className="md:col-span-2"><EvidenceChips active={evidence} onToggle={(t)=> setEvidence(p=> p.includes(t)? p.filter(x=>x!==t): [...p, t])} /></div>
      </div>

      {bookmarkedSlugs.size > 0 && (
        <Card>
          <CardHeader><CardTitle>Bookmarked</CardTitle></CardHeader>
          <CardContent className="grid gap-2">
            {rows.filter(r => bookmarkedSlugs.has(`discharge-${r.slug}`)).map(r => (
              <a key={r.id} className="text-sm underline" href={`#discharge-${r.slug}`}>{r.title}</a>
            ))}
          </CardContent>
        </Card>
      )}

      <div id="discharge-container" className="space-y-4">
        {(rows || []).map((item) => (
          <DischargeItem key={item.id} item={item} collapseAll={collapseAll} onBookmark={() => toggle(`discharge-${item.slug}`)} isBookmarked={isBookmarked(`discharge-${item.slug}`)} />
        ))}

        {(!isLoading && rows?.length === 0) && <p className="text-sm text-muted-foreground">No items matched your filters.</p>}
      </div>
    </div>
  );
}

function DischargeItem({ item, collapseAll, onBookmark, isBookmarked }: any) {
  const [open, setOpen] = useState(!collapseAll);
  React.useEffect(()=> setOpen(!collapseAll), [collapseAll]);

  return (
    <Card id={`discharge-${item.slug}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <button aria-expanded={open} onClick={()=>setOpen(o=>!o)} className="rounded px-1 -ml-1">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {item.title}
          {(item.evidence || []).map((e:string)=> <Badge key={e} variant="outline">{e}</Badge>)}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant={isBookmarked?"default":"outline"} size="sm" onClick={onBookmark}>{isBookmarked?"Bookmarked":"Bookmark"}</Button>
          <CopyLinkButton anchor={`discharge-${item.slug}`} />
        </div>
      </CardHeader>
      {open && (
        <CardContent className="space-y-3">
          <Section label="Discharge criteria" items={item.criteria} />
          <Section label="Patient education (teach back)" items={item.teach_back} />
          <Section label="Handoff communication" items={item.handoff} />
          <Section label="Safety netting" items={item.safety_netting} />
        </CardContent>
      )}
    </Card>
  );
}

function Section({ label, items }:{label:string; items:string[]}) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="font-medium">{label}:</p>
      <ul className="list-disc ml-6">{items.map((x,i)=><li key={i}>{x}</li>)}</ul>
    </div>
  );
}
