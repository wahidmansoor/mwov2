// ...existing code...
// client/src/modules/palliative-v2/components/CalculatorsGrid.tsx
import React from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchCalculators, fetchCalculatorBySlug } from "../services/calculators";
import { Card, CardContent } from "@/components/ui/card";
import ActionPill from "./ActionPill";

type CalculatorsGridProps = {
  mode: "list" | "detail";
  id?: string;
  limit?: number;
  onBack?: () => void;
};

export default function CalculatorsGrid(props: CalculatorsGridProps) {
  const { mode, id, limit, onBack } = props;
  const [, setLocation] = useLocation();

  // List mode: fetch all calculators
  const { data: calculators, isLoading, error } = useQuery({
    queryKey: ["palliative-calculators"],
    queryFn: fetchCalculators,
    enabled: mode === "list"
  });

  // Detail mode: fetch single calculator by slug (id is used as slug)
  const {
    data: calculator,
    isLoading: isLoadingDetail,
    error: errorDetail
  } = useQuery({
    queryKey: ["palliative-calculators", id],
    queryFn: () => fetchCalculatorBySlug(id!),
    enabled: mode === "detail" && !!id
  });

  if (mode === "detail" && id) {
    if (isLoadingDetail) return <div className="p-4">Loading…</div>;
    if (errorDetail) return <div className="p-4 text-red-600">Error loading calculator</div>;
    if (!calculator) return <div className="p-4">Not found</div>;
    return (
      <div className="p-4 grid gap-3">
  <Button variant="ghost" onClick={onBack}>{"\u2190 Back"}</Button>
        <h2 className="text-xl font-semibold">{calculator.title}</h2>
        <p className="text-sm">{calculator.kind}</p>
        <div className="text-sm text-slate-500">This is a placeholder; calculators are read-only helpers.</div>
      </div>
    );
  }

  if (isLoading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-600">Error loading calculators</div>;
  if (!calculators) return <div className="p-4">No calculators found</div>;

  const list = typeof limit === "number" ? calculators.slice(0, limit) : calculators;
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {list.map((c: any) => (
        <Card key={c.id} className="border-l-4 border-l-green-600 hover:bg-green-50 hover:border-green-200 transition-colors">
          <CardContent>
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-muted-foreground mb-2">{c.kind}</div>
            <ActionPill label="Open" to={`/palliative/calculators/${c.slug}`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
