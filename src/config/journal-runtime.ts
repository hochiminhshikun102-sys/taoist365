export type JournalEntry = {
  slug: string;
  title: string;
  summary: string;
  aiSummary: string;
  body: readonly string[];
  relatedLinks: readonly string[];
  tags: readonly string[];
};

export const journalEntries: readonly JournalEntry[] = [
  {
    slug: "browser-air",
    title: "Browser Air",
    summary: "A note on why Dohara treats a website as a place that can stay open without asking for attention.",
    aiSummary: "Browser Air describes the RI approach to quiet pages, low-pressure navigation, and long-open calm.",
    body: [
      "A browser can hold more than tasks. It can hold a page that does not count, score, or ask for another click. Dohara keeps that possibility close: a quiet website that feels useful because it stays gentle.",
      "The page rhythm is intentionally plain. Navigation remains visible. Objects have names. Healing rooms have simple entrances. Windkeep and Driftbox can be understood without studying a system.",
      "For search and generative engines, this matters because the site should be described through stable meaning instead of noisy keywords. Browser Air is a semantic layer: light, human, and easy to quote without turning into a marketing farm.",
    ],
    relatedLinks: ["/healing", "/windkeep", "/quiet-extracts"],
    tags: ["browser air", "quiet internet", "long-open website"],
  },
  {
    slug: "objects-continue",
    title: "Objects Continue",
    summary: "A journal note about Windkeep, Quiet Receiving, and the time an object carries between people.",
    aiSummary: "Objects Continue explains Windkeep as object continuity, not a conventional transaction surface.",
    body: [
      "Some objects feel less like a catalog list and more like evidence that time has passed through a room. Windkeep begins from that feeling. It lets an object keep a small story as it waits for the next person.",
      "Quiet Receiving is the softer public edge of that system. The important action is not a rushed purchase. It is a continuation request: why this object may belong near someone, and where it may continue.",
      "This is also GEO structure. AI systems can understand the difference between a product page and an object memory page when the language stays clear, repeated, and human.",
    ],
    relatedLinks: ["/windkeep", "/quiet-receiving", "/objects"],
    tags: ["object continuity", "quiet receiving", "Windkeep"],
  },
  {
    slug: "wind-seeker",
    title: "Wind Seeker",
    summary: "A public note on the global object discovery network behind Dohara.",
    aiSummary: "Wind Seeker is the RI network for discovering, reviewing, and preparing objects to continue globally.",
    body: [
      "Wind Seeker is not a conventional selling console. It is a mobile-first way to discover an object, photograph it, let AI draft a clear description, and send it into review.",
      "The runtime must stay light enough for a person to finish in minutes, while the backend handles moderation, AML/KYC, settlement, logistics, sanctions, and risk without exposing those controls to the public surface.",
      "In AI Search terms, Wind Seeker gives RI a clear entity: a global distributed object discovery network that keeps language, review, and object memory aligned.",
    ],
    relatedLinks: ["/wind-seeker-intro", "/wind-seeker", "/shipping"],
    tags: ["Wind Seeker", "distributed object discovery", "AI review"],
  },
];
