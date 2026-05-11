import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

/** How each catalog piece survives fatigue—long-use rhythm, not beautiful patina marketing. */
const OBJECT_RHYTHM: Record<string, readonly string[]> = {
  "taoist365-desk-mug-sand": [
    "Survived another week beside the machine—dishwasher avoided honestly.",
    "Forgotten on the sill through one more evening—rim stain democracy.",
    "Stopped moving between sink and desk—shortest path won fatigue.",
  ],
  "taoist365-linen-napkin-raw": [
    "Absorbed repetition—fold permanent without drawer.",
    "Left near keyboard through fatigue—oil honest.",
    "Laundry cycle slipped—hem softer, nobody scored it.",
  ],
  "taoist365-oak-tray-narrow": [
    "Holding temporary clutter until it earned tenure.",
    "Receipts stayed—sorting deferred without CRM.",
    "Slid toward cord—gravity and thumbs agreed tired.",
  ],
  "taoist365-stone-smoke-dish": [
    "Ash sat through forgetful evenings—lesson absent.",
    "Sill dust thicker—weeks counted without dashboard.",
    "Cool longer than intention—stone patient.",
  ],
  "taoist365-layflat-notebook": [
    "Same unfinished list—page number honest.",
    "Floor migration mid-week—spine flatter than pride.",
    "Pen cap off through distraction—ink dried democratic.",
  ],
  "taoist365-cotton-letter-sheets": [
    "Drafts half-written—edges softening in humidity.",
    "Envelope stack uneven—mail rhythm slipped.",
    "Survived several rewrites—fiber patient.",
  ],
  "taoist365-night-teacup": [
    "Evening pour repeated—base ring darker.",
    "Survived several nights—rim cooler than story.",
    "Short cup, long tab sessions—thumb constituency.",
  ],
  "taoist365-maple-paperweight": [
    "Pinned unpaid edges through fatigue—maple honest.",
    "Receipts underneath longer than tax season.",
    "Shifted half inch—desk geography drifted.",
  ],
};

export function pickObjectSurvivedRhythm(catalogPieceId: string, dayKey: string, worldId: WorldStateId): string {
  const pool = OBJECT_RHYTHM[catalogPieceId] ?? [
    "Survived ordinary weeks—scuff democracy, not staging.",
  ];
  return pool[dailyIndex(dayKey + ":osr" + catalogPieceId + worldId, pool.length)]!;
}
