import ActionPill from "./ActionPill";
// client/src/modules/palliative-v2/components/EmergenciesList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";

/* =============================================================================
   Minimal UI primitives (keeps this file build-proof even without your UI kit)
   ============================================================================= */
const clsx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={clsx("rounded-xl border bg-white shadow-sm", className)}>{children}</div>
);
const CardHeader = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={clsx("px-4 py-3 border-b", className)}>{children}</div>
);
const CardTitle = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={clsx("font-semibold text-base text-slate-900", className)}>{children}</div>
);
const CardContent = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={clsx("p-4", className)}>{children}</div>
);

const Button = ({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => (
  <button
    {...props}
    className={clsx(
      "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm",
      "bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50",
      className
    )}
  >
    {children}
  </button>
);

const GhostButton = ({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => (
  <button
    {...props}
    className={clsx(
      "inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100",
      className
    )}
  >
    {children}
  </button>
);

const Badge = ({
  className = "",
  children,
  variant = "outline",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "outline" | "destructive" | "secondary";
}) => {
  const styles =
    variant === "destructive"
      ? "bg-red-600/10 text-red-700 border border-red-200"
      : variant === "secondary"
      ? "bg-amber-500/10 text-amber-700 border border-amber-200"
      : "bg-white text-slate-700 border border-slate-200";
  return <span className={clsx("inline-flex items-center rounded-md px-2 py-0.5 text-xs", styles, className)}>{children}</span>;
};

/* =============================================================================
   Types
   ============================================================================= */
type Urgency = "red" | "amber" | "yellow" | "green";
export type EmergencyRow = {
  slug: string;
  title: string;
  overview: string;
  evidence: string;
  urgency: Urgency | string;
  tags?: string[];
  immediate?: string[];
  steps?: unknown; // flexible JSON
  post?: unknown;  // flexible JSON
};

type Props = {
  mode: "list" | "detail";
  slug?: string;
  limit?: number;
  onBack?: () => void;
  variant?: "normal" | "compact"; // NEW
};

/* =============================================================================
   Data loading (dynamic resolution so missing files don't break builds)
   ============================================================================= */
async function tryImport(paths: string[]) {
  for (const p of paths) {
    try {
      // @ts-ignore
      return await import(/* @vite-ignore */ p);
    } catch {}
  }
  return null;
}

async function resolveSupabaseClient(): Promise<any | null> {
  const mod = await tryImport([
    "../lib/supabaseClient",
    "../../lib/supabaseClient",
    "../../../lib/supabaseClient",
    "./supabaseClient",
    "../supabaseClient",
  ]);
  if (!mod) return null;
  return (mod as any).supabase ?? (mod as any).default ?? null;
}

async function resolveLocalEmergencies(): Promise<EmergencyRow[] | null> {
  const mod = await tryImport([
    "../data/emergencies",
    "../../data/emergencies",
    "../../../data/emergencies",
    "./data/emergencies",
  ]);
  if (!mod) return null;
  const EMERGENCIES = (mod as any).EMERGENCIES ?? (mod as any).default;
  if (!Array.isArray(EMERGENCIES)) return null;

  // Map legacy fields like actions -> immediate
  return EMERGENCIES.map((e: any) => ({
    slug: e.slug,
    title: e.title,
    overview: e.overview,
    evidence: e.evidence ?? "B",
    urgency: e.urgency ?? "red",
    tags: e.tags ?? [],
    immediate: e.immediate ?? e.actions ?? [],
    steps: e.steps ?? {},
    post: e.post ?? {},
  }));
}

const BUILTIN_SAMPLE: EmergencyRow[] = [
  {
    slug: "seizure",
    title: "Acute Seizure in Palliative Patient",
    overview:
      "Seizures in palliative care may occur due to disease, metabolic disturbance, infection, or medication effects. Focus on safety and rapid termination while aligning care to goals.",
    evidence: "B",
    urgency: "red",
    tags: ["neurology", "benzodiazepine", "status epilepticus", "palliative emergency"],
    immediate: [
      "Protect airway; place in lateral position; give supplemental O2 if hypoxic.",
      "Benzodiazepine per protocol (e.g., midazolam buccal/intranasal/IV if access).",
      "Check blood glucose; treat hypoglycemia if present.",
      "Avoid unnecessary transfers if not consistent with goals of care; manage in place if feasible.",
    ],
    steps: {
      "Assessment & Causes": [
        {
          type: "list",
          items: [
            "Review history: prior seizures, known brain metastases, anticonvulsant use.",
            "Check for reversible causes: hypoglycemia, hyponatremia, hypocalcemia, infection, drug toxicity.",
            "Consider terminal restlessness vs non-epileptic causes.",
          ],
        },
      ],
      "Acute Management": [
        {
          type: "table",
          title: "Common benzodiazepine rescue options (verify local formulary)",
          columns: ["Drug", "Route", "Dose (adult)", "Notes"],
          rows: [
            ["Midazolam", "Buccal/intranasal", "5–10 mg", "Repeat once after 10 min if still seizing; rapid onset"],
            ["Lorazepam", "IV", "2–4 mg", "If IV access available; monitor for respiratory depression"],
            ["Diazepam", "Rectal", "10–20 mg", "Option if buccal/nasal unavailable"],
          ],
        },
        { type: "warning", level: "caution", body: "Avoid excessive sedation; monitor airway and breathing closely." },
      ],
      "Ongoing Management": [
        {
          type: "list",
          items: [
            "If recurrence risk is high and consistent with goals, consider maintenance anticonvulsant (levetiracetam, valproate, or phenytoin if appropriate).",
            "If prognosis is days, prioritize comfort-directed meds (e.g., subcutaneous midazolam infusion).",
            "Align interventions with patient/family wishes and overall goals of care.",
          ],
        },
      ],
    },
    post: {
      "Aftercare & Family Support": [
        {
          type: "list",
          items: [
            "Debrief family/caregivers—seizures can be very distressing.",
            "Reassess need for ongoing anticonvulsant therapy in line with prognosis.",
            "Ensure availability of rescue medication in community/home setting.",
            "Discuss advance care planning and document seizure management preferences.",
          ],
        },
      ],
    },
  },
];

/* =============================================================================
   Rendering utilities & block components
   ============================================================================= */
function isRecord(v: unknown): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function hasType(v: unknown): v is { type: string } {
  return isRecord(v) && typeof v.type === "string";
}

function toSentence(v: unknown): string {
  try {
    if (typeof v === "string") return v;
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function renderKV(obj: Record<string, any>) {
  return (
    <div className="grid gap-1">
      {Object.entries(obj).map(([k, val]) => (
        <div key={k} className="text-sm text-slate-700">
          <span className="font-medium">{k.replace(/_/g, " ")}: </span>
          <span>{toSentence(val)}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning" | "danger" | "success";
  children: React.ReactNode;
}) {
  const toneMap = {
    info: "bg-sky-50 border-sky-200 text-sky-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    danger: "bg-red-50 border-red-200 text-red-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  } as const;
  return <div className={clsx("border rounded-md px-3 py-2 text-sm", toneMap[tone])}>{children}</div>;
}

function ListBlock({ items }: { items: any[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-800">
      {items.map((it, i) => (
        <li key={i}>
          {hasType(it) ? <Block block={it} /> : isRecord(it) ? renderKV(it) : toSentence(it)}
        </li>
      ))}
    </ul>
  );
}

function ChecklistBlock({ items }: { items: any[] }) {
  return (
    <div className="grid gap-1">
      {items.map((it, i) => (
        <label key={i} className="flex items-start gap-2 text-sm text-slate-800">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300" />
          <span>{hasType(it) ? <Block block={it} /> : isRecord(it) ? renderKV(it) : toSentence(it)}</span>
        </label>
      ))}
    </div>
  );
}

function TableBlock({
  title,
  columns,
  rows,
}: {
  title?: string;
  columns?: any[];
  rows?: any[];
}) {
  const cols: string[] = Array.isArray(columns) ? columns.map(String) : [];
  const normRows: any[][] = useMemo(() => {
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => {
      if (Array.isArray(r)) return r;
      if (isRecord(r)) return cols.length ? cols.map((c) => r[c]) : Object.values(r);
      return [toSentence(r)];
    });
  }, [rows, cols]);

  if (!cols.length && !normRows.length) return null;

  return (
    <div className="space-y-2">
      {title ? <div className="font-medium text-slate-900">{title}</div> : null}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[520px] w-full border border-slate-200 rounded-md text-sm">
          {cols.length ? (
            <thead className="bg-slate-50">
              <tr>
                {cols.map((c, i) => (
                  <th key={i} className="text-left px-3 py-2 border-b border-slate-200 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {normRows.map((row, ri) => (
              <tr key={ri} className="odd:bg-white even:bg-slate-50/30">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 border-t border-slate-200 align-top">
                    {toSentence(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionBlock({ title, body }: { title?: string; body?: any[] }) {
  if (!body || !Array.isArray(body)) return null;
  return (
    <div className="space-y-2">
      {title ? <div className="font-medium text-slate-900">{title}</div> : null}
      <div className="grid gap-2">
        {body.map((it, i) =>
          hasType(it) ? (
            <Block key={i} block={it} />
          ) : isRecord(it) ? (
            <div key={i}>{renderKV(it)}</div>
          ) : (
            <div key={i} className="text-sm text-slate-800">
              {toSentence(it)}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Block({ block }: { block: any }) {
  const t = String(block?.type ?? "").toLowerCase();

  // Primitive paragraph
  if (!t && (typeof block === "string" || typeof block === "number" || typeof block === "boolean")) {
    return <p className="text-sm">{String(block)}</p>;
  }

  if (t === "paragraph") return <p className="text-sm leading-relaxed">{toSentence(block.body)}</p>;
  if (t === "list" && Array.isArray(block.items)) return <ListBlock items={block.items} />;
  if (t === "checklist" && Array.isArray(block.items)) return <ChecklistBlock items={block.items} />;
  if (t === "table") return <TableBlock title={block.title} columns={block.columns} rows={block.rows} />;
  if (t === "section") return <SectionBlock title={block.title} body={block.body ?? block.items ?? []} />;

  if (t === "warning") return <Callout tone="warning">{toSentence(block.body ?? "Caution")}</Callout>;
  if (t === "danger" || t === "critical")
    return <Callout tone="danger">{toSentence(block.body ?? "Important")}</Callout>;
  if (t === "success") return <Callout tone="success">{toSentence(block.body ?? "Note")}</Callout>;
  if (t === "note" || t === "callout" || t === "info")
    return <Callout tone="info">{toSentence(block.body ?? "Note")}</Callout>;

  // Unknown object: show its K/V nicely (not raw JSON)
  if (isRecord(block)) return renderKV(block);
  // Unknown array: list
  if (Array.isArray(block)) return <ListBlock items={block} />;

  return <p className="text-sm">{toSentence(block)}</p>;
}

function renderUnknown(value: unknown) {
  if (!value) return null;
  if (typeof value === "string") return <p className="text-sm">{value}</p>;
  if (Array.isArray(value))
    return (
      <div className="grid gap-2">
        {value.map((v, i) => (
          <div key={i}>{hasType(v) ? <Block block={v} /> : isRecord(v) ? renderKV(v) : toSentence(v)}</div>
        ))}
      </div>
    );
  if (isRecord(value)) {
    // e.g., { "Section A": [ blocks ], "Section B": [ blocks ] }
    const entries = Object.entries(value);
    if (entries.every(([, v]) => Array.isArray(v))) {
      return (
        <div className="grid gap-3">
          {entries.map(([k, arr]) => (
            <div key={k} className="border-l-4 border-slate-200 pl-3">
              <div className="font-medium text-sm mb-1">{k}</div>
              <div className="grid gap-2">
                {(arr as any[]).map((b, i) => (
                  <div key={i}>{hasType(b) ? <Block block={b} /> : isRecord(b) ? renderKV(b) : toSentence(b)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return renderKV(value);
  }
  return <p className="text-sm">{toSentence(value)}</p>;
}

/* =============================================================================
   Component
   ============================================================================= */
export default function EmergenciesList({ mode, slug, limit, onBack, variant = "normal" }: Props) {
  const [, setLocation] = useLocation();
  const [emergencies, setEmergencies] = useState<EmergencyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const supabase = await resolveSupabaseClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("palliative_emergency_guidelines")
            .select("slug,title,overview,evidence,urgency,tags,immediate,steps,post");
          if (error) throw error;
          if (Array.isArray(data)) {
            setEmergencies(data as EmergencyRow[]);
          } else {
            const local = (await resolveLocalEmergencies()) ?? BUILTIN_SAMPLE;
            setEmergencies(local);
          }
        } else {
          const local = (await resolveLocalEmergencies()) ?? BUILTIN_SAMPLE;
          setEmergencies(local);
        }
      } catch (e) {
        console.warn("Emergency list: falling back to builtin sample.", e);
        setEmergencies(BUILTIN_SAMPLE);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4 text-sm">Loading…</div>;

  // DETAIL VIEW
  if (mode === "detail" && slug) {
    const e = emergencies.find((x) => x.slug === slug);
    if (!e) return <div className="p-4">Not found</div>;

    const currentPrintMode =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("print") === "1";

    return (
      <div className="p-4 grid gap-6">
        {!currentPrintMode && (
          <div className="flex items-center gap-2">
            <GhostButton onClick={onBack ?? (() => setLocation("/palliative/emergencies"))}>← Back</GhostButton>
            <GhostButton onClick={() => setLocation(`/palliative/emergencies/${slug}?print=1`)}>Print view</GhostButton>
          </div>
        )}

        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">{e.title}</h2>
          <Badge>Evidence {e.evidence}</Badge>
          <Badge variant={e.urgency === "red" ? "destructive" : "secondary"}>
            {e.urgency === "red" ? "🔴 Critical" : "🟡 Urgent"}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-slate-800">{e.overview}</p>
          </CardContent>
        </Card>

        {e.immediate?.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Immediate Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                {e.immediate.map((a, i) => (
                  <li key={i} className="text-sm leading-relaxed">
                    {a}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ) : null}

        {e.steps ? (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Protocol Steps</CardTitle>
            </CardHeader>
            <CardContent>{renderUnknown(e.steps)}</CardContent>
          </Card>
        ) : null}

        {e.post ? (
          <Card>
            <CardHeader>
              <CardTitle>Post-Emergency Management</CardTitle>
            </CardHeader>
            <CardContent>{renderUnknown(e.post)}</CardContent>
          </Card>
        ) : null}

        {e.tags?.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {e.tags.map((t, i) => (
                  <Badge key={i} className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {!currentPrintMode && (
          <div className="flex gap-2">
            <Button onClick={() => window.print()}>Print</Button>
          </div>
        )}
      </div>
    );
  }

  // LIST VIEW
  const filtered = emergencies.filter((e) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return e.title.toLowerCase().includes(q) || e.overview.toLowerCase().includes(q);
  });
  const list = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  // NEW: compact variant for dashboard tile
  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((e) => (
          <Card key={e.slug} className="p-3">
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-semibold leading-tight flex items-center justify-between gap-2">
                <span className="truncate">{e.title}</span>
                <span className="flex items-center gap-1 shrink-0">
                  {e.evidence && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                      Evidence {e.evidence}
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 py-0.5 ${
                      e.urgency === "red" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {e.urgency === "red" ? "Critical" : "Urgent"}
                  </Badge>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2 text-xs text-muted-foreground">
              <p className="line-clamp-2"
                 style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {e.overview}
              </p>
              <div className="mt-3">
                <ActionPill label="Open" to={`/palliative/emergencies/${e.slug}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Existing (normal) list rendering stays as-is
  return (
    <div className="grid gap-3 p-1">
      {!limit && (
        <div className="grid gap-2">
          <input
            type="text"
            placeholder="Search emergencies…"
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((e) => (
          <Card
            key={e.slug}
            className={clsx(
              "border-l-4 transition-colors",
              e.urgency === "red" ? "border-l-red-600 hover:bg-red-50" : "border-l-amber-500 hover:bg-amber-50"
            )}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-tight">{e.title}</h3>
                  <div className="flex flex-col gap-1">
                    <Badge variant={e.urgency === "red" ? "destructive" : "secondary"} className="text-xs">
                      {e.urgency === "red" ? "🔴" : "🟡"}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{e.overview}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs">Evidence {e.evidence}</Badge>
                    {e.immediate?.length ? (
                      <Badge variant="secondary" className="text-xs">
                        {e.immediate.length} immediate actions
                      </Badge>
                    ) : null}
                  </div>

                  {e.tags?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {e.tags.slice(0, 3).map((t, i) => (
                        <Badge key={i} className="text-xs px-1 py-0">
                          {t}
                        </Badge>
                      ))}
                      {e.tags.length > 3 ? <Badge className="text-xs px-1 py-0">+{e.tags.length - 3}</Badge> : null}
                    </div>
                  ) : null}
                </div>

                <div className="flex justify-end pt-1">
                  <ActionPill label="Open" to={`/palliative/emergencies/${e.slug}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
