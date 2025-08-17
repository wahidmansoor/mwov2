import { Card, CardContent } from "@/components/ui/card";
import type { Protocol, ProtocolStep } from "../lib/types";

function Warning({ level, body }: { level: "info" | "caution" | "danger"; body: string }) {
  const cls =
    level === "danger"
      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
      : level === "caution"
      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800";
  return <div className={`rounded-xl border px-3 py-2 text-sm ${cls}`}>{body}</div>;
}

function DoseTable({ title, columns, rows }: { title?: string; columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="grid gap-2">
      {title ? <div className="text-sm font-medium">{title}</div> : null}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
          <thead className="bg-blue-50 dark:bg-blue-900/20">
            <tr>
              {columns.map((c) => (
                <th key={c} className="text-left px-3 py-2 border-b border-blue-200 dark:border-blue-800">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="odd:bg-white even:bg-blue-50 dark:odd:bg-gray-800 dark:even:bg-blue-900/10">
                {r.map((cell, j) => (
                  <td key={j} className="px-3 py-2 border-b border-blue-200 dark:border-blue-800">{cell}</td>
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
        <a href={step.to} className="inline-flex text-sm underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {step.label}
        </a>
      );
    case "section":
      return (
        <div className="grid gap-2">
          <div className="text-sm font-semibold">{step.title}</div>
          {step.body ? <p className="text-sm">{step.body}</p> : null}
          {step.items?.map((child, i) => <StepView key={i} step={child} />)}
        </div>
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
