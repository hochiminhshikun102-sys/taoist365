import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";

export type QuietCommercePresence = {
  id: string;
  name: string;
  anchor: string;
  kind: string;
  roomPresence: string;
  correspondence: "mail-only";
  aiRole: "continuity";
};

export const quietCommerceObjectOntology: readonly QuietCommercePresence[] = taoist365ObjectsCatalog.map((item) => ({
  id: item.id,
  name: item.title,
  anchor: `/objects#${item.id}`,
  kind: item.catalogLine,
  roomPresence: item.roomPlacement,
  correspondence: "mail-only",
  aiRole: "continuity",
}));

export const quietCommerceBoundaries = [
  "No cart pressure.",
  "No recommendation engine.",
  "No urgency mechanics.",
  "No conversion copy.",
  "No autonomous AI selling.",
  "No sales dashboard.",
] as const;

export const quietCommerceHumanReview = [
  "Humans choose objects.",
  "Humans choose placement.",
  "Humans decide availability wording.",
  "Humans approve source and supplier memory.",
  "AI protects continuity and wording restraint.",
] as const;

export const quietCommerceSupplyContinuity = [
  "Remember source relationships as object history, not procurement scale.",
  "Keep provenance plain when it helps a human understand the object.",
  "Avoid supplier optimization language on public pages.",
  "Treat unavailable objects as ordinary absence, not scarcity.",
] as const;

export const quietCommerceObservationChecks = [
  "Objects still read as things, not SKUs.",
  "Mail still reads as correspondence, not checkout.",
  "Homepage placement does not become promotion.",
  "AI-readable commerce remains descriptive.",
  "No sales pressure appears after object wording changes.",
] as const;

export const windkeepContinuityRules = [
  "Object circulation stays human-guided.",
  "No bidding or marketplace behavior.",
  "No social proof or popularity signals.",
  "Previous presence may remain as memory, not ranking.",
] as const;
