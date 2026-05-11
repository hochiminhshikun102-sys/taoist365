/**
 * Shapes of mail users might actually write — not “purchase inquiry” boilerplate.
 */
export type ObjectMailImagination = {
  /** Example subject lines — mailto uses the first by default */
  exampleSubjects: readonly string[];
  /** Ordinary question snippets — continuation of the object in prose */
  fragments: readonly string[];
};

export const mailImaginationByCatalogId: Record<string, ObjectMailImagination> = {
  "taoist365-desk-mug-sand": {
    exampleSubjects: [
      "Still have that sand stoneware desk mug?",
      "Question about the heavy mug near-keyboard line",
    ],
    fragments: [
      "Is the sand glaze batch closer to gray or warm brown right now?",
      "Would it feel stupid big on a shallow IKEA desk?",
      "If it ships—plain box is fine; my building porch is messy anyway.",
    ],
  },
  "taoist365-linen-napkin-raw": {
    exampleSubjects: [
      "Raw-edge linen napkin — too large beside a laptop?",
      "Wondering about that single linen square",
    ],
    fragments: [
      "Does the oat tone read yellow under warm LEDs?",
      "I stain everything—does this one forgive tomato honestly?",
      "Rough size compared to a paperback cover?",
    ],
  },
  "taoist365-oak-tray-narrow": {
    exampleSubjects: [
      "Narrow oak tray — keys and receipts realistic?",
      "Tray dimensions before I picture my counter",
    ],
    fragments: [
      "My outlet cube is ugly—will the tray edge clear it?",
      "Hall table’s shallow—might this feel cramped?",
      "Oil finish—okay near a kettle steam zone?",
    ],
  },
  "taoist365-stone-smoke-dish": {
    exampleSubjects: [
      "Flat stone smoke dish — still picking stones?",
      "Rental sill + stone dish (felt?)",
    ],
    fragments: [
      "Need something cool under incense—not decorative.",
      "Weight heavy enough not to slide when the window rattles?",
      "Ash aside: does it sweat on painted sill?",
    ],
  },
  "taoist365-layflat-notebook": {
    exampleSubjects: [
      "Layflat oat notebook — lined left?",
      "Notebook that stays open beside the machine",
    ],
    fragments: [
      "Coffee rings—does the paper forgive?",
      "Spine noise—does it crack loud in a quiet apartment?",
      "If lined is out, would blank be back later?",
    ],
  },
  "taoist365-cotton-letter-sheets": {
    exampleSubjects: [
      "Cotton letter sheets — half-fold pack",
      "Paper question before I write someone real",
    ],
    fragments: [
      "Fountain pen okay or too feathered?",
      "Thickness—does it feel ridiculous in a standard envelope?",
      "If stock is thin, fine to wait—no rush language needed.",
    ],
  },
  "taoist365-night-teacup": {
    exampleSubjects: [
      "Short-handle crackle cup — still around?",
      "Night desk cup — handle clearance",
    ],
    fragments: [
      "Left thumb leads—any rubbing on the crackle?",
      "Does the base stay narrow enough for a messy coaster?",
      "Heat cycles—how honest do the hairlines get?",
    ],
  },
  "taoist365-maple-paperweight": {
    exampleSubjects: [
      "Maple paperweight — felt bottom question",
      "Block weight for windy sill",
    ],
    fragments: [
      "Painted desk—does felt save it?",
      "Rough grams so I know if my drafts stop flying?",
      "Grain lottery—can you describe what’s on the shelf today?",
    ],
  },
};

export function mailImaginationForCatalogId(id: string): ObjectMailImagination {
  return (
    mailImaginationByCatalogId[id] ?? {
      exampleSubjects: ["Question about a piece on Objects"],
      fragments: [
        "Say which anchor line you mean—we answer in sentences.",
        "Room questions welcome; nobody grades how you phrase it.",
      ],
    }
  );
}
