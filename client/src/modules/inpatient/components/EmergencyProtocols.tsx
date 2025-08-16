"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEmergencyProtocols, filterByEvidence, searchRows, useBookmarks } from "@/lib/hooks/useInpatientData";
import { CopyLinkButton, GlobalSearch, EvidenceChips, PrintSectionButton, DemoBanner } from "./_shared";

export function EmergencyProtocols() {
  const { data, isLoading } = useEmergencyProtocols();
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
    <div className="space-y-4" id="emergency">
      <DemoBanner />
      
      <div className="flex items-center justify-between gap-3">
        <Alert className="flex-1">
          <AlertDescription>Critical oncology emergencies. Escalate immediately when indicated.</AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <PrintSectionButton containerId="emergency-container" />
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
            {rows.filter(r => bookmarkedSlugs.has(`emergency-${r.slug}`)).map(r => (
              <a key={r.id} className="text-sm underline" href={`#emergency-${r.slug}`}>{r.name}</a>
            ))}
          </CardContent>
        </Card>
      )}

      <div id="emergency-container" className="space-y-4">
        {(rows || []).map((item) => (
          <EmergencyItem key={item.id} item={item} collapseAll={collapseAll} onBookmark={() => toggle(`emergency-${item.slug}`)} isBookmarked={isBookmarked(`emergency-${item.slug}`)} />
        ))}

        {(!isLoading && rows?.length === 0) && <p className="text-sm text-muted-foreground">No items matched your filters.</p>}
      </div>
    </div>
  );
}

function EmergencyItem({ item, collapseAll, onBookmark, isBookmarked }: any) {
  const [open, setOpen] = useState(!collapseAll);
  React.useEffect(()=> setOpen(!collapseAll), [collapseAll]);

  return (
    <Card id={`emergency-${item.slug}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <button aria-expanded={open} onClick={()=>setOpen(o=>!o)} className="rounded px-1 -ml-1">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {item.name}
          {(item.evidence || []).map((e:string)=> <Badge key={e} variant="outline">{e}</Badge>)}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant={isBookmarked?"default":"outline"} size="sm" onClick={onBookmark}>{isBookmarked?"Bookmarked":"Bookmark"}</Button>
          <CopyLinkButton anchor={`emergency-${item.slug}`} />
        </div>
      </CardHeader>
      {open && (
        <CardContent className="space-y-3">
          <Section label="Red flags" items={item.red_flags} />
          <Section label="Immediate actions" items={item.immediate_actions} />
          <Section label="Diagnostics" items={item.diagnostics} />
          <Section label="Ongoing management" items={item.ongoing_management} />
          <Section label="Disposition" items={item.disposition} />
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
