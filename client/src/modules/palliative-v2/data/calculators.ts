// client/src/modules/palliative-v2/data/calculators.ts
export type CalculatorMeta = { id: string; title: string; summary: string; };
export const CALCULATORS: CalculatorMeta[] = [
  { id: "pps", title: "Palliative Performance Scale (PPS)", summary: "Performance status 10–100%" },
  { id: "ecog", title: "ECOG Performance", summary: "0–5 performance scale" },
  { id: "opioid-rotation", title: "Opioid Rotation Helper", summary: "Equianalgesic guide (read-only)" },
];
