// client/src/modules/palliative-v2/components/EmergenciesList.tsx
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { type Emergency } from "../data/emergencies";
import { Card, CardContent, Button, Badge } from "./ui";
import { supabase } from "../lib/supabaseClient";
import { type EmergencyRow } from "../lib/types";

export default function EmergenciesList({ mode, slug, limit, onBack }:{
  mode:"list"|"detail"; slug?:string; limit?:number; onBack?:()=>void;
}) {
  const [, setLocation] = useLocation();
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Load emergencies from Supabase or fallback to local data
  useEffect(() => {
    const loadEmergencies = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from("palliative_emergency_guidelines")
            .select("slug,title,overview,evidence,urgency,tags,immediate,steps,post");
          
          if (error) throw error;
          
          // Map DB rows to Emergency type (matching actual schema)
          const mappedEmergencies: Emergency[] = (data as EmergencyRow[]).map(row => ({
            slug: row.slug,
            title: row.title,
            overview: row.overview,
            evidence: row.evidence,
            urgency: row.urgency,
            actions: row.immediate || []
          }));
          
          setEmergencies(mappedEmergencies);
        } else {
          // Fallback to local data
          const { EMERGENCIES } = await import("../data/emergencies");
          setEmergencies(EMERGENCIES);
        }
      } catch (error) {
        console.error("Failed to load emergencies, falling back to local data:", error);
        const { EMERGENCIES } = await import("../data/emergencies");
        setEmergencies(EMERGENCIES);
      } finally {
        setLoading(false);
      }
    };

    loadEmergencies();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (mode==="detail" && slug) {
    const e = emergencies.find(x => x.slug===slug);
    if (!e) return <div className="p-4">Not found</div>;

    const currentPrintMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("print") === "1";

    return (
      <div className="p-4 grid gap-3">
        {!currentPrintMode && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onBack}>← Back</Button>
            <Button variant="ghost" onClick={() => setLocation(`/palliative/emergencies/${slug}?print=1`)}>Print view</Button>
          </div>
        )}
        <h2 className="text-xl font-semibold">{e.title} <Badge variant="outline">Ev {e.evidence}</Badge></h2>
        <p className="text-sm">{e.overview}</p>
        <Card><CardContent>
          <ol className="list-decimal pl-5 space-y-1">{e.actions.map((a,i)=><li key={i}>{a}</li>)}</ol>
        </CardContent></Card>
        {!currentPrintMode && (
          <div className="flex gap-2">
            <Button onClick={()=>window.print()}>Print</Button>
          </div>
        )}
      </div>
    );
  }

  // LIST VIEW - Filter emergencies based on search and urgency
  const filteredList = emergencies.filter(e => {
    const matchesSearch = !searchQuery.trim() || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.overview.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const list = typeof limit==="number" ? filteredList.slice(0, limit) : filteredList;

  return (
    <div className="grid gap-3">
      {/* Search and filters for full list view */}
      {!limit && (
        <div className="grid gap-2">
          <input
            type="text"
            placeholder="Search emergencies..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      )}
      
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map(e => (
          <Card key={e.slug}><CardContent>
            <div className="font-medium">{e.title}</div>
            <div className="text-xs text-slate-500 mb-2">{e.overview}</div>
            <div className="flex gap-2">
              <Badge variant="outline">Ev {e.evidence}</Badge>
              <Button className="ml-auto" onClick={()=>setLocation(`/palliative/emergencies/${e.slug}`)}>Open</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
