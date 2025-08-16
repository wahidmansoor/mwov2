// client/src/modules/palliative-v2/components/ProtocolRenderer.tsx
import React from "react";
import { Card, CardContent } from "./ui";
import type { Protocol, ProtocolStep } from "../data/protocols";

function Warning({ level, body }: { level: "info" | "caution" | "danger"; body: string }) {
  const cls =
    level === "danger"
      ? "bg-red-50 text-red-800 border-red-200"
      : level === "caution"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : "bg-slate-50 text-slate-800 border-slate-200";
  return <div className={`rounded-xl border px-3 py-2 text-sm ${cls}`}>{body}</div>;
}

function DoseTable({ title, columns, rows }: { title?: string; columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="grid gap-2">
      {title ? <div className="text-sm font-medium">{title}</div> : null}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((c) => (
                <th key={c} className="text-left px-3 py-2 border-b">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-50">
                {r.map((cell, j) => (
                  <td key={j} className="px-3 py-2 border-b">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StepView({ step }: { step: ProtocolStep }) {
  switch (step.type) {
    case "text":
      return <p className="text-sm">{step.body}</p>;
    case "list":
      return (
        <ul className="list-disc pl-5 text-sm">
          {step.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "warning":
      return <Warning level={step.level} body={step.body} />;
    case "table":
      return <DoseTable title={step.title} columns={step.columns} rows={step.rows} />;
    case "calc-link":
      return (
        <a href={step.to} className="inline-flex text-sm underline text-slate-900 hover:opacity-80">
          {step.label}
        </a>
      );
    default:
      return null;
  }
}

export default function ProtocolRenderer({ protocol }: { protocol: Protocol }) {
  return (
    <Card>
      <CardContent className="grid gap-4">
        {protocol.steps.map((s, i) => (
          <StepView key={i} step={s} />
        ))}
      </CardContent>
    </Card>
  );
}
