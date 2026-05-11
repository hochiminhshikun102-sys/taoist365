import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

const RELOCATIONS: readonly string[] = [
  "Tray moved nearer the window—keys followed without meeting.",
  "Mug stayed beside laptop longer—dish rack forgot to argue.",
  "Linen left near chair—fold migrated without instruction.",
  "Notebook migrated to floor—spine flatter than pride.",
  "Paperweight temporarily holding receipts—gravity democracy.",
  "Bowl shifted toward sill—light won the argument.",
  "Cutting board dried vertical—counter space negotiated.",
  "Coaster stack leaned—one fewer underneath.",
];

export function pickObjectRelocationMemory(dayKey: string, worldId: WorldStateId): string {
  return RELOCATIONS[dailyIndex(dayKey + ":reloc" + worldId, RELOCATIONS.length)]!;
}
