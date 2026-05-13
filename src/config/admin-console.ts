export const adminConsoleNav = [
  { label: "Overview", href: "#overview" },
  { label: "Objects", href: "#objects" },
  { label: "Windkeep", href: "#windkeep" },
  { label: "Driftbox", href: "#driftbox" },
  { label: "Healing", href: "#healing" },
  { label: "Journal", href: "#journal" },
  { label: "Locales", href: "#locales" },
  { label: "Media", href: "#media" },
  { label: "Requests", href: "#requests" },
  { label: "Users", href: "#users" },
  { label: "SEO", href: "#seo" },
] as const;

export const adminConsoleMetrics = [
  { label: "Objects", value: "193", note: "catalog records" },
  { label: "Windkeep", value: "8", note: "continuation candidates" },
  { label: "Locales", value: "14", note: "reserved language routes" },
  { label: "Healing", value: "45", note: "room shells" },
] as const;

export const adminConsoleSections = [
  {
    id: "objects",
    title: "Object Management",
    description: "Create, edit, review, price, stock, imagery, packaging, and object memory.",
    actions: ["Object list", "Bulk edit", "Image status", "Stock audit"],
  },
  {
    id: "windkeep",
    title: "Windkeep Moderation",
    description: "Review passing objects, drift notes, continuation traces, and quiet receiving states.",
    actions: ["Passing queue", "Drift notes", "Quiet receiving", "Object memory"],
  },
  {
    id: "driftbox",
    title: "Driftbox Messages",
    description: "Read and triage correspondence without turning it into a customer support feed.",
    actions: ["Inbox", "Continuation mail", "Human replies", "Archive"],
  },
  {
    id: "healing",
    title: "Healing Modules",
    description: "Maintain seven halls and forty-five room shells with clear frontstage routing.",
    actions: ["Hall list", "Room shells", "Copy review", "Runtime hooks"],
  },
  {
    id: "journal",
    title: "Journal Management",
    description: "Prepare notes, emotional traces, Lila presence, and story entries.",
    actions: ["Drafts", "Review", "Publish state", "Archive"],
  },
  {
    id: "locales",
    title: "Locale Management",
    description: "Track language availability, translation status, canonical URLs, and hreflang coverage.",
    actions: ["Locale matrix", "Translation queue", "Hreflang audit", "Metadata"],
  },
  {
    id: "media",
    title: "Media Library",
    description: "Manage images, product assets, hero media, compression, alt text, and placement status.",
    actions: ["Uploads", "Optimization", "Alt text", "Usage"],
  },
  {
    id: "requests",
    title: "Continuation Requests",
    description: "Review why an object matters, where it may continue, and human notes.",
    actions: ["Request queue", "Pairing review", "Object state", "Reply draft"],
  },
  {
    id: "users",
    title: "User Management",
    description: "Operational user records, permissions, access review, and future membership state.",
    actions: ["Users", "Roles", "Access", "Audit log"],
  },
  {
    id: "seo",
    title: "SEO Management",
    description: "Titles, descriptions, canonical paths, sitemap coverage, robots, and social previews.",
    actions: ["Metadata", "Canonical", "Sitemap", "Robots"],
  },
] as const;

