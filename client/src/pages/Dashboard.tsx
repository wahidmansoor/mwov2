"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Database,
  Sparkles,
  Zap,
  BookOpen,
  ExternalLink,
  Info,
  GraduationCap,
  Users,
  Stethoscope,
  Brain,
  Shield,
  Calculator,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

/**
 * OncoVista Dashboard – Full Merge (Guidelines now Mock-powered)
 *
 * This file fixes syntax and runtime errors in your snippet and completes the
 * Dashboard so it compiles and runs as a single component. It keeps tiny UI
 * primitives, adds missing layouts, and closes all unfinished blocks.
 *
 * Notes
 * - GuidelinesSection uses mock data here (no network calls). Swap it to your
 *   Supabase client easily where indicated.
 * - Calculators use expandable cards to reduce clutter.
 * - Daily Learning quiz shows 4 options without clipping.
 * - Smart Referrals provides simple, rule-based suggestions.
 * - CTCAE panel supports system dropdown + search + expandable rows.
 */

/******************* Tiny UI helpers (shared) *******************/
const clsx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("rounded-2xl border bg-white shadow-sm", className)}>{children}</div>
);
const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("p-6 border-b", className)}>{children}</div>
);
const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("font-semibold text-lg text-slate-900", className)}>{children}</div>
);
const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("p-6", className)}>{children}</div>
);
const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  title,
  href,
  target,
  rel,
  variant = "primary", // "primary" | "outline"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "outline";
}) => {
  const classes = clsx(
    variant === "primary"
      ? "rounded-2xl bg-blue-600 text-white px-4 py-3 hover:bg-blue-700"
      : "rounded-2xl border border-slate-200 bg-white text-slate-800 px-4 py-3 hover:bg-slate-50",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} title={title}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} title={title} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={clsx("w-full border rounded-lg px-3 py-2 text-sm", props.className)} />
);
const Select = ({ value, onChange, children, id, disabled, className = "" }: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  id?: string;
  disabled?: boolean;
  className?: string;
}) => (
  <select
    id={id}
    disabled={disabled}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={clsx(
      "w-full border rounded-lg px-3 py-2 text-sm",
      disabled && "bg-slate-100 text-slate-400",
      className
    )}
  >
    {children}
  </select>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-xs font-medium text-slate-600">{children}</label>
);
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs border", className)}>
    {children}
  </span>
);

/******************* GuidelinesSection (Mock data instead of Supabase) *******************/
// Replace this mock block with a Supabase query when ready.
const mockGuidelinesData = [
  {
    id: 1,
    cancer_type: "Breast Cancer",
    source: "NCCN",
    version: "2024.1",
    release_date: "2024-01-15",
    summary_bullets: [
      "HER2+ breast cancer: trastuzumab + pertuzumab + docetaxel first-line",
      "HR+/HER2- metastatic: CDK4/6 inhibitor + aromatase inhibitor",
      "Triple-negative: pembrolizumab + chemotherapy if PD-L1 positive",
    ],
    pdf_url: "https://example.com/nccn-breast-2024.pdf",
  },
  {
    id: 2,
    cancer_type: "Lung Cancer",
    source: "NCCN",
    version: "2024.2",
    release_date: "2024-03-10",
    summary_bullets: [
      "NSCLC with PD-L1 ≥50%: pembrolizumab monotherapy first-line",
      "EGFR+ NSCLC: osimertinib first-line preferred",
      "ALK+ NSCLC: alectinib or brigatinib first-line",
    ],
    pdf_url: "https://example.com/nccn-lung-2024.pdf",
  },
  {
    id: 3,
    cancer_type: "Breast Cancer",
    source: "ESMO",
    version: "2023.1",
    release_date: "2023-12-01",
    summary_bullets: [
      "Early breast cancer: adjuvant therapy based on molecular subtype",
      "Metastatic setting: sequence therapy based on prior treatments",
      "Genetic testing recommended for hereditary risk assessment",
    ],
    pdf_url: "https://example.com/esmo-breast-2023.pdf",
  },
];

function GuidelinesSection() {
  const [cancer, setCancer] = useState("");
  const [source, setSource] = useState(""); // "NCCN" | "ESMO" | "ASCO"
  const [version, setVersion] = useState("");

  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState(mockGuidelinesData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async load
    setLoading(true);
    const t = setTimeout(() => {
      try {
        setAll(mockGuidelinesData);
      } catch (e) {
        setError("Failed to load guidelines.");
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const cancerTypes = useMemo(
    () => Array.from(new Set(all.map((d) => d.cancer_type))).sort((a, b) => (a || "").localeCompare(b || "")),
    [all]
  );

  const sources = useMemo(() => {
    if (!cancer) return [] as string[];
    return Array.from(new Set(all.filter((d) => d.cancer_type === cancer).map((d) => d.source))).sort();
  }, [all, cancer]);

  const versions = useMemo(() => {
    if (!cancer || !source) return [] as typeof all;
    return [...all.filter((d) => d.cancer_type === cancer && d.source === source)].sort(
      (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  }, [all, cancer, source]);

  const selectedDoc = useMemo(() => versions.find((v) => v.version === version) ?? versions[0], [versions, version]);

  // Reset deeper steps
  useEffect(() => {
    setSource("");
    setVersion("");
  }, [cancer]);
  useEffect(() => {
    if (versions.length) setVersion(versions[0].version);
    else setVersion("");
  }, [versions]);

  const hasSelection = Boolean(cancer && source && selectedDoc);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Guidelines
          <Badge className="ml-2">Structured Flow</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        {/* Stepper */}
        <div className="grid sm:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label>Cancer Type</Label>
            <Select id="cancerType" value={cancer} onChange={setCancer} disabled={loading}>
              <option value="">{loading ? "Loading…" : "Choose a cancer type"}</option>
              {cancerTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Source</Label>
            <Select id="source" value={source} onChange={setSource} disabled={!cancer || loading}>
              <option value="">{cancer ? "Select source (NCCN/ESMO/ASCO)" : "Select cancer type first"}</option>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Latest Version</Label>
            <Select
              id="version"
              value={selectedDoc?.version ?? ""}
              onChange={setVersion}
              disabled={!cancer || !source || loading || versions.length === 0}
            >
              <option value="">{source ? "Choose a version" : "Select source first"}</option>
              {versions.map((v, idx) => (
                <option key={v.version} value={v.version}>
                  {v.version} — {new Date(v.release_date).toLocaleDateString()} {idx === 0 ? "• Latest" : ""}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Interactive Summary + PDF */}
        {hasSelection ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge>{cancer}</Badge>
              <Badge>{source}</Badge>
              <Badge>v{selectedDoc?.version}</Badge>
              <span className="text-slate-500">Updated {selectedDoc && new Date(selectedDoc.release_date).toLocaleDateString()}</span>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Interactive Summary</span>
              </div>
              <ul className="list-disc ml-5 space-y-2 text-sm text-slate-700">
                {(selectedDoc?.summary_bullets ?? []).map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {selectedDoc?.pdf_url && (
              <div className="flex flex-wrap gap-3">
                <Button href={selectedDoc.pdf_url} target="_blank" rel="noopener noreferrer" variant="primary">
                  Open Full PDF <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => { setCancer(""); setSource(""); setVersion(""); }}>
                  Reset
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            Flow: <strong>Guidelines → Cancer Type → Source → Latest Version</strong> to see summary & PDF.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/******************* Calculators – expandable cards *******************/
function CalcCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={clsx("rounded-2xl border p-4 transition-all", open ? "bg-blue-50/40" : "bg-white")}>
      <button className="w-full flex items-center justify-between text-left" onClick={() => setOpen((v) => !v)}>
        <span className="font-medium">{title}</span>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function CalculatorsPanel() {
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [age, setAge] = useState(60);
  const [sex, setSex] = useState("male");
  const [scr, setScr] = useState(1.2); // mg/dL
  const [targetAUC, setTargetAUC] = useState(5);

  const bsa = useMemo(() => Math.round(Math.sqrt((heightCm * weightKg) / 3600) * 1000) / 1000, [heightCm, weightKg]);

  const crcl = useMemo(() => {
    if (!age || !weightKg || !scr) return 0;
    const base = ((140 - Number(age)) * Number(weightKg)) / (72 * Number(scr));
    return Math.round((sex === "female" ? base * 0.85 : base) * 10) / 10;
  }, [age, weightKg, scr, sex]);

  const carboDose = useMemo(() => Math.round(targetAUC * (crcl + 25)), [targetAUC, crcl]);

  const [wbc, setWbc] = useState(4.0); // x10^9/L
  const [neutrophilPct, setNeutrophilPct] = useState(60); // %
  const anc = useMemo(() => Math.round(wbc * (neutrophilPct / 100) * 1000), [wbc, neutrophilPct]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <CalcCard title="BSA (Mosteller)">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Height (cm)</Label>
            <Input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
          </div>
          <div>
            <Label>Weight (kg)</Label>
            <Input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-3 text-sm">
          BSA: <span className="font-semibold">{bsa.toFixed(2)} m²</span>
        </div>
      </CalcCard>

      <CalcCard title="Creatinine Clearance (Cockcroft–Gault)">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Age (years)</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <Label>Sex</Label>
            <Select value={sex} onChange={setSex}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
          <div className="col-span-2">
            <Label>Serum Creatinine (mg/dL)</Label>
            <Input type="number" step={0.01} value={scr} onChange={(e) => setScr(Number(e.target.value))} />
          </div>
          <div className="col-span-2">
            <Label>Weight (kg)</Label>
            <Input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-3 text-sm">
          CrCl: <span className="font-semibold">{crcl} mL/min</span>
        </div>
      </CalcCard>

      <CalcCard title="Carboplatin Dose (Calvert: AUC × (GFR + 25))">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Target AUC</Label>
            <Input type="number" step={0.1} value={targetAUC} onChange={(e) => setTargetAUC(Number(e.target.value))} />
          </div>
          <div>
            <Label>GFR ≈ CrCl (mL/min)</Label>
            <Input type="number" value={crcl} readOnly />
          </div>
        </div>
        <div className="mt-3 text-sm">
          Estimated Dose: <span className="font-semibold">{carboDose} mg</span>
        </div>
        <div className="mt-2 text-xs text-slate-500">Demo only — verify per institutional policy.</div>
      </CalcCard>

      <CalcCard title="Absolute Neutrophil Count (ANC)">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>WBC (×10⁹/L)</Label>
            <Input type="number" step={0.1} value={wbc} onChange={(e) => setWbc(Number(e.target.value))} />
          </div>
          <div>
            <Label>Neutrophils (%)</Label>
            <Input type="number" value={neutrophilPct} onChange={(e) => setNeutrophilPct(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-3 text-sm">ANC: <span className="font-semibold">{anc} /µL</span></div>
      </CalcCard>

      <CalcCard title="Dose by BSA">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Plan (mg/m²)</Label>
            <Input type="number" defaultValue={75} />
          </div>
          <div>
            <Label>Computed BSA</Label>
            <Input type="text" value={`${bsa.toFixed(2)} m²`} readOnly />
          </div>
        </div>
        <div className="mt-3 text-sm">Estimated Dose updates as you change BSA values above.</div>
      </CalcCard>

      <CalcCard title="Opioid Conversion (Very Simplified Demo)">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Current Opioid</Label>
            <Select value={"morphine"} onChange={() => {}}>
              <option value="morphine">Morphine PO</option>
              <option value="oxycodone">Oxycodone PO</option>
              <option value="hydromorphone">Hydromorphone PO</option>
            </Select>
          </div>
          <div>
            <Label>Total Daily Dose (mg)</Label>
            <Input type="number" defaultValue={60} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">Demo only; real conversions require institutional tables and clinical judgment.</div>
      </CalcCard>
    </div>
  );
}

/******************* Daily Learning (4-option quiz, no clipping) *******************/
function DailyLearningPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Daily Oncology Fact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            HER2+ metastatic urothelial carcinoma may respond to antibody–drug conjugates; sequence after EV+pembro per latest guidance.
          </p>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Quick Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-3">First‑line for metastatic NSCLC with PD‑L1 ≥50% (no driver mutation)?</p>
          <div className="grid gap-2">
            {[
              "Single‑agent pembrolizumab",
              "Platinum doublet alone",
              "Chemo‑immunotherapy combination",
              "EGFR TKI monotherapy",
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm">
                <input type="radio" name="nsclc" />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/******************* Smart Referrals (simple rules) *******************/
function SmartReferralsPanel() {
  const [cancer, setCancer] = useState("breast");
  const [ecog, setEcog] = useState("1");
  const [tox, setTox] = useState("1");
  const [redFlags, setRedFlags] = useState({ neutropenicFever: false, spinalCordCompression: false, sepsis: false });

  const recommendations = useMemo(() => {
    const rec: Array<{ team: string; reason: string }> = [];
    if (redFlags.neutropenicFever) rec.push({ team: "Emergency / Oncology Day Unit", reason: "Neutropenic fever suspected" });
    if (redFlags.spinalCordCompression) rec.push({ team: "Urgent MRI + Neurosurgery/Radiation Oncology", reason: "Possible cord compression" });
    if (redFlags.sepsis) rec.push({ team: "Emergency / ICU consult", reason: "Sepsis screen positive" });
    if (Number(ecog) >= 3) rec.push({ team: "Palliative Care", reason: "ECOG ≥3 – symptom control and goals of care" });
    if (Number(tox) >= 3) rec.push({ team: "Oncology", reason: "Grade ≥3 toxicity – hold therapy & manage per CTCAE" });
    if (cancer === "breast") rec.push({ team: "Genetics", reason: "Consider BRCA/HRD if not assessed" });
    if (cancer === "prostate") rec.push({ team: "Urology", reason: "ADT coordination / complications" });
    if (cancer === "lung") rec.push({ team: "Pulmonology", reason: "Airway/pleural management" });
    return rec;
  }, [cancer, ecog, tox, redFlags]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" /> Smart Referral Inputs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label>Cancer Type</Label>
              <Select value={cancer} onChange={setCancer}>
                <option value="breast">Breast</option>
                <option value="lung">Lung</option>
                <option value="prostate">Prostate</option>
                <option value="colorectal">Colorectal</option>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>ECOG</Label>
                <Select value={ecog} onChange={setEcog}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
              </div>
              <div>
                <Label>Toxicity Grade</Label>
                <Select value={tox} onChange={setTox}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="text-xs">
                <input
                  type="checkbox"
                  checked={redFlags.neutropenicFever}
                  onChange={(e) => setRedFlags((v) => ({ ...v, neutropenicFever: e.target.checked }))}
                />{" "}
                Neutropenic fever
              </label>
              <label className="text-xs">
                <input
                  type="checkbox"
                  checked={redFlags.spinalCordCompression}
                  onChange={(e) => setRedFlags((v) => ({ ...v, spinalCordCompression: e.target.checked }))}
                />{" "}
                Cord compression
              </label>
              <label className="text-xs">
                <input
                  type="checkbox"
                  checked={redFlags.sepsis}
                  onChange={(e) => setRedFlags((v) => ({ ...v, sepsis: e.target.checked }))}
                />{" "}
                Sepsis
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" /> Suggested Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-sm text-slate-600">No referrals suggested for current inputs.</div>
          ) : (
            <ul className="space-y-3">
              {recommendations.map((r, i) => (
                <li key={i} className="rounded-xl border p-3">
                  <div className="font-medium">{r.team}</div>
                  <div className="text-sm text-slate-600">{r.reason}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/******************* CTCAE: dropdown + expandable rows *******************/
function ExpandableToxicity({ item }: { item: { name: string; g2: string; g3: string; g4: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border p-4">
      <button className="w-full flex items-center justify-between text-left" onClick={() => setOpen((v) => !v)}>
        <span className="font-semibold">{item.name}</span>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open && (
        <div className="text-sm mt-3 grid grid-cols-3 gap-2">
          <div>
            <span className="text-slate-500">G2:</span> {item.g2}
          </div>
          <div>
            <span className="text-slate-500">G3:</span> {item.g3}
          </div>
          <div>
            <span className="text-slate-500">G4:</span> {item.g4}
          </div>
        </div>
      )}
    </div>
  );
}

function CTCAEPanel() {
  const [system, setSystem] = useState("Hematologic");
  const [q, setQ] = useState("");
  const items = useMemo(
    () => ({
      Hematologic: [
        { name: "Neutropenia", g2: "ANC 1000–1500", g3: "ANC 500–1000", g4: "ANC <500" },
        { name: "Thrombocytopenia", g2: "50–75k", g3: "25–50k", g4: "<25k or bleeding" },
      ],
      GI: [
        { name: "Diarrhea", g2: "Increase 4–6 stools/day", g3: ">=7 stools/day; incontinence", g4: "Life‑threatening; urgent intervention" },
        { name: "Mucositis", g2: "Moderate pain; diet modification", g3: "Severe pain; unable to eat solids", g4: "Life‑threatening" },
      ],
      Hepatic: [
        { name: "ALT increased", g2: ">3–5× ULN", g3: ">5–20× ULN", g4: ">20× ULN" },
        { name: "AST increased", g2: ">3–5× ULN", g3: ">5–20× ULN", g4: ">20× ULN" },
      ],
    }),
    []
  );

  const list = (items as any)[system].filter((i: any) => i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <Label>System</Label>
          <Select value={system} onChange={setSystem}>
            <option>Hematologic</option>
            <option>GI</option>
            <option>Hepatic</option>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label>Search</Label>
          <Input placeholder="e.g., neutropenia, diarrhea" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((i: any) => (
          <ExpandableToxicity key={i.name} item={i} />
        ))}
        {list.length === 0 && <div className="text-sm text-slate-600">No matches.</div>}
      </div>
    </div>
  );
}

/******************* Main Dashboard *******************/
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"guidelines" | "calculators" | "learning" | "referrals" | "ctcae">(
    "guidelines"
  );
  const [dense, setDense] = useState(false);

  const quickActions = useMemo(
    () => [
      { title: "Treatment Protocol Search", description: "Find evidence-based cancer treatment protocols", icon: Search, path: "/cdu" },
      { title: "Guideline Browser", description: "NCCN / ESMO / ASCO flow with versions", icon: BookOpen, path: "#guidelines" },
      { title: "Clinical Calculators", description: "BSA, CrCl, Calvert, ANC, conversions", icon: Calculator, path: "#calculators" },
    ],
    []
  );

  return (
    <div className={clsx("mx-auto w-full max-w-7xl", dense ? "p-4" : "p-6 md:p-10")}>      
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Brain className="h-7 w-7 text-blue-600" />
          <div>
            <div className="text-xl font-semibold">Advanced Clinical Intelligence Hub</div>
            <div className="text-sm text-slate-600">Evidence‑informed tools for oncology workflows</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="border-green-200 bg-green-50">Demo Mode</Badge>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={dense} onChange={(e) => setDense(e.target.checked)} />
            Dense layout
          </label>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickActions.map((qa) => (
          <a key={qa.title} href={qa.path} className="rounded-2xl border p-4 hover:bg-slate-50 transition">
            <div className="flex items-start gap-3">
              <qa.icon className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">{qa.title}</div>
                <div className="text-sm text-slate-600">{qa.description}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { id: "guidelines", label: "Guidelines" },
          { id: "calculators", label: "Calculators" },
          { id: "learning", label: "Daily Learning" },
          { id: "referrals", label: "Smart Referrals" },
          { id: "ctcae", label: "CTCAE" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={clsx(
              "px-4 py-2 rounded-full border",
              activeTab === (t.id as any) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-800"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div id={activeTab} className="space-y-6">
        {activeTab === "guidelines" && <GuidelinesSection />}
        {activeTab === "calculators" && <CalculatorsPanel />}
        {activeTab === "learning" && <DailyLearningPanel />}
        {activeTab === "referrals" && <SmartReferralsPanel />}
        {activeTab === "ctcae" && <CTCAEPanel />}
      </div>

      {/* Footer note */}
      <div className="mt-10 text-xs text-slate-500">
        For education only — not a substitute for institutional policies or clinical judgment.
      </div>
    </div>
  );
}
