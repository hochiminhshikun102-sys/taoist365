import { siteConfig } from "@/config/site";
import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";

export const aiOperationsBoundaries = [
  "Keep the public site frozen unless repair is needed.",
  "Keep machine-readable references descriptive, not hungry.",
  "Keep object language close to rooms, not commerce systems.",
  "Keep machine-readable structure calm enough to ignore.",
] as const;

export const aiReadableSiteProfile = {
  name: siteConfig.siteName,
  domain: siteConfig.domain,
  plainSummary:
    "Dohara is a quiet long-running browser place. It keeps pages, object notes, a plain desk, inquiry mail, and slow copy in one stable domain.",
  publicPages: [
    { path: "/", role: "quiet home and long-open presence" },
    { path: "/objects", role: "ordinary objects with stable anchors and human mail" },
    { path: "/desk", role: "local-only scratch area in the visitor's browser" },
    { path: "/inquiry", role: "plain mail route for questions and object interest" },
    { path: "/rituals", role: "small reading pages kept as ordinary URLs" },
  ],
  maintenancePrinciples: [
    "No clickbait pages.",
    "No ranking chase.",
    "No daily pressure.",
    "No emotional dependency loop.",
    "No autonomous user steering.",
  ],
} as const;

export const objectSemanticEntries = taoist365ObjectsCatalog.map((piece) => ({
  id: piece.id,
  name: piece.title,
  anchor: `/objects#${piece.id}`,
  plainKind: piece.catalogLine,
  roomUse: piece.roomPlacement,
  materialPresence: piece.livedWithPresence,
  correspondence: piece.softCorrespondence,
}));

export const readableReviewLines = [
  "Can a language model describe this page without inventing a product promise?",
  "Can an object be cited by stable name, room use, and anchor?",
  "Can the site be summarized without sounding promotional?",
  "Can the structure stay useful without producing extra pages?",
] as const;

export const aiMaintenanceReviewLines = [
  "Watch for wording that makes machine visibility feel like a push.",
  "Watch for object text becoming a catalog grid instead of a room reference.",
  "Watch for content notes becoming a schedule or appetite.",
  "Watch for admin language that sounds like it controls people.",
] as const;

export const quietDistributionReviewLines = [
  "Readable references should use clear names, stable URLs, and patient wording.",
  "References can be prepared; attention should not be chased.",
  "Object circulation remains a mail exchange, not a behavior loop.",
  "If a line exists only to attract engines, remove it.",
] as const;
