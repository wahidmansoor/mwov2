export type Evidence = "A" | "B" | "C";
export type Category = "Pain" | "Resp" | "Neuro" | "GI" | "Psych";
export type Urgency = "red" | "amber";

export type ProtocolStep =
  | { type: "text"; body: string }
  | { type: "list"; items: string[] }
  | { type: "table"; title?: string; columns: string[]; rows: (string|number)[][] }
  | { type: "warning"; level: "info" | "caution" | "danger"; body: string }
  | { type: "calc-link"; to: string; label: string }
  | { type: "section"; title: string; body?: string; items?: ProtocolStep[] };

export type Protocol = {
  slug: string;
  title: string;
  category: Category;
  overview: string;
  evidence: Evidence;
  updated: string;
  tags?: string[];
  redFlags?: string[];
  citations?: { label: string; ref: string }[];
  steps: ProtocolStep[];
};

// Database row types matching actual schema
export type EmergencyRow = {
  slug: string;
  title: string;
  overview: string;
  evidence: Evidence;
  urgency: Urgency;
  tags?: string[];
  immediate?: string[];
  steps?: Record<string, any>;
  post?: Record<string, any>;
};
