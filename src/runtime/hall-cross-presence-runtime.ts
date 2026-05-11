import { dailyIndex } from "@/lib/living-day-key";
import { quietHallDirections } from "@/runtime/hall-runtime-map";

export type HallCrossPresenceRuntime = {
  sourceHall: (typeof quietHallDirections)[number];
  residueHall: (typeof quietHallDirections)[number];
  crossPresenceLine: string;
  atmosphericBleedLine: string;
  homepageHallResidueLine: string;
  showHomepageHallResidue: boolean;
};

const residueLines = [
  "Story Hall carries a faint Windkeep object trace.",
  "Quiet Hall keeps a Daily Verse residue near the margin.",
  "Windkeep Hall holds a Time Capsule mark without opening it.",
  "Philosophy Hall receives a Driftbox continuation mark.",
  "Creation Hall keeps one object echo below its surface.",
  "Five Elements Hall shares a small shelf memory with Quiet Hall.",
] as const;

const atmosphericBleedLines = [
  "Windkeep calm leaks faintly into Daily without becoming guidance.",
  "Old browser silence reaches Cloud Hall as almost no signal.",
  "Distant Driftbox waiting touches the mail room and then recedes.",
  "Unresolved room climate drifts between halls without forming a link.",
  "A shelf trace moves through Quiet Hall as air, not recommendation.",
  "The halls feel as if they know each other, but do not explain how.",
] as const;

export function resolveHallCrossPresenceRuntime(dayKey: string): HallCrossPresenceRuntime {
  const h = dailyIndex(`${dayKey}:hall-cross-presence`, 100);
  const sourceHall = quietHallDirections[h % quietHallDirections.length];
  const residueHall = quietHallDirections[(h + 2) % quietHallDirections.length];
  const crossPresenceLine = residueLines[h % residueLines.length];
  const atmosphericBleedLine = atmosphericBleedLines[(h + 3) % atmosphericBleedLines.length];

  return {
    sourceHall,
    residueHall,
    crossPresenceLine,
    atmosphericBleedLine,
    homepageHallResidueLine: `${sourceHall} keeps a low trace from ${residueHall}.`,
    showHomepageHallResidue: h % 4 === 0 || h > 82,
  };
}
