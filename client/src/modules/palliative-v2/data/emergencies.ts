// client/src/modules/palliative-v2/data/emergencies.ts
export type Emergency = {
  slug: string; title: string; overview: string; actions: string[]; evidence: "A"|"B"|"C";
};
export const EMERGENCIES: Emergency[] = [
  {
    slug: "spinal-cord-compression",
    title: "Spinal Cord Compression",
    overview: "Urgent steroids; imaging; oncologist/radiation referral.",
    actions: ["Dexamethasone dose per local protocol", "Urgent MRI", "Decision for RT/OR"],
    evidence: "A",
  },
  {
    slug: "catastrophic-bleeding",
    title: "Catastrophic Bleeding",
    overview: "Crisis pack; dark towels; crisis communication.",
    actions: ["Apply pressure if possible", "Anxiolysis", "Prepare family/staff"],
    evidence: "B",
  },
];
