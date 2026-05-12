export type AdminSection = {
  title: string;
  note: string;
  items: readonly string[];
};

export const quietAdminSections: readonly AdminSection[] = [
  {
    title: "CMS system",
    note: "Low-pressure content structure for pages, objects, mail, and ritual surfaces.",
    items: ["Page CMS", "Collection CMS", "Object CMS", "Media CMS", "Quiet upload flow"],
  },
  {
    title: "Object architecture",
    note: "Object records stay useful without turning into a SKU system.",
    items: ["Wind Objects", "Quiet Desk Objects", "Ritual Objects", "Seasonal Objects", "Atmospheric Objects"],
  },
  {
    title: "Media library",
    note: "Images and video are prepared for coexistence before public placement.",
    items: ["Image upload", "Video upload", "Hero media", "Placement media", "Material details"],
  },
  {
    title: "Presence copy",
    note: "Slow text upkeep for the parts people actually see.",
    items: ["Daily line", "Quiet fragments", "Desk copy", "Long-open copy", "Objects wording", "Windkeep wording", "Home wording"],
  },
  {
    title: "Pressure QA",
    note: "A place to catch wording that tries too hard.",
    items: ["Guardrail failures", "Terminology leakage", "Manifesto risk", "Pressure-density warnings", "Over-awareness detection"],
  },
  {
    title: "Terminology review",
    note: "Thin risky wording before it reaches the site.",
    items: ["Blocked words", "Risk copy", "Manifesto wording", "Over-performance notes", "AI-aware language"],
  },
  {
    title: "Quiet drafts",
    note: "Unfinished notes can stay unfinished until they are ready.",
    items: ["Slow prepared text", "Unfinished notes", "Soft local drafts", "Low-pressure editing"],
  },
  {
    title: "Slow updates",
    note: "Replacement should feel like upkeep, not news.",
    items: ["Quiet rotation", "Slow replacement", "Kept old copy", "Delayed visibility"],
  },
  {
    title: "Archive isolation",
    note: "Old language stays findable without touching the present site.",
    items: ["Archived copy", "Old drafts", "Removed text", "Deprecated wording", "Older wording"],
  },
  {
    title: "Soft review",
    note: "Review whether the page is asking for too much attention.",
    items: ["Copy density", "Pressure density", "Too-shaped language", "Over-soft wording", "System-awareness leakage"],
  },
  {
    title: "AI-readable review",
    note: "Keep machine-readable wording clear without turning it into a chase.",
    items: ["Stable summaries", "Object anchors", "Plain page roles", "Low-pressure metadata"],
  },
  {
    title: "Readable review",
    note: "Keep machine-readable notes plain without making new traffic pages.",
    items: ["Citable wording", "Object anchors", "Stable summaries", "No extra page appetite"],
  },
];

export const quietAdminBoundaries = [
  "Frontstage stays in observation.",
  "No new browser behavior from this room.",
  "No growth language.",
  "No charts for attention.",
  "No publishing urgency.",
] as const;

export const pressureReviewMarkers = [
  "Too shaped for an old browser place.",
  "Too soft in a product way.",
  "Too eager to explain itself.",
  "Too bright around the edges.",
  "Too carefully quiet.",
  "Still ordinary enough to leave alone.",
] as const;

export const terminologyReviewGroups = [
  {
    title: "Over-shaped calm",
    risk: "Words that make quietness feel packaged.",
    nearby: "plain, near, low-pressure wording",
  },
  {
    title: "Self-aware site",
    risk: "Words that explain the room before anyone asks.",
    nearby: "shorter lines, fewer claims",
  },
  {
    title: "Care language",
    risk: "Words that start to sound like emotional service.",
    nearby: "human warmth without a promise",
  },
] as const;

export const archiveQuietShelves = [
  "Softly retired wording stays away from the present page.",
  "Older nearby wording can be compared without becoming a feature.",
  "Removed lines stay low-visibility and do not ask to return.",
] as const;

export const driftNoticeLines = [
  "Watch for return pressure, platform wording, and over-refined calm.",
  "Watch for control-room energy in labels and spacing.",
  "Watch for language that makes maintenance feel important.",
  "When the room starts to feel busy, remove before adding.",
] as const;
