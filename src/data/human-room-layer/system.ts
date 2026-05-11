/**
 * Real human room — faint residue of someone living, not characters, personas, or wellness staging.
 */

export const humanRoomLayer = {
  pageEyebrow: "Human room",
  pageTitle: "Traces of someone actually living",
  pageLead:
    "No named residents, no lore, no moodboard calm—only the small wrongnesses a body leaves: drawer half-open, cup not cleared, chair not pushed back, one lamp because the rest felt like too much.",

  boundaries: {
    noLifestyleMagazine:
      "No aspirational interiors, status-signaling quiet, Pinterest composition, or influencer slowness—clutter, uneven light, and off-center placement stay welcome.",
    noWellness:
      "No healing arc, self-care script, mindful recovery, or emotional-support tone—tired is ordinary, not aesthetic.",
    noStagedLoneliness:
      "No sadcore staging or stage-lit loneliness—someone may have just gone to brush teeth, not abandoned a film set.",
    noCharacters:
      "No recurring protagonists, implied romance, or hidden story bible—only anonymous household drift.",
  },

  humanExhaustionLines: [
    "Table not cleared before sleep—mug honest until morning.",
    "One lamp survives because flipping the overheads felt like a verdict.",
    "Paper stayed half-written because thumbs quit before the sentence finished.",
  ] as const,

  interruptedMotionLines: [
    "Chair left halfway—between window and something unfinished on screen.",
    "Kitchen towel half on hook—drying interrupted mid-reach.",
    "Drawer cracked open where someone grabbed stamps then forgot gravity.",
  ] as const,

  crossPageEchoes: [
    {
      text: "Half-open drawer, cup not cleared, chair angle nobody fixed—",
      href: "/objects" as const,
      linkLabel: "Objects",
    },
    {
      text: "Desk tab left open like a room someone walked out of mid-thought—",
      href: "/desk" as const,
      linkLabel: "Desk",
    },
    {
      text: "Mail about things still mentions uneven light and tired hands—",
      href: "/inquiry" as const,
      linkLabel: "Mail",
    },
  ] as const,
} as const;
