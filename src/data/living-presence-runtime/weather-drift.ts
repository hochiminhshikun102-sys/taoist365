import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "./same-day-world-state";

/** Room weather drift — low drama, condensation-kettle-hallway language. */
export const weatherDriftByWorld: Record<WorldStateId, readonly string[]> = {
  "colder-evening": [
    "Condensation stays longer on the bathroom mirror after a shower.",
    "Hallway reads cooler halfway—radiator has not caught up with pride.",
    "Window glass remembers breath longer than yesterday.",
  ],
  "humid-apartment": [
    "Sheets take longer to feel dry against the ankle.",
    "Ice in the glass loses its argument sooner.",
    "The sill holds moisture honest beside the herb pot.",
  ],
  "radiator-week": [
    "Radiator begins to tick before you notice you were cold.",
    "Paint above the valve curls the same millimeter it did last season.",
    "Floorboards concede heat slower near the outside wall.",
  ],
  "open-window-weather": [
    "Window cracked open again—curtain argues softly.",
    "A draft rehearses the mail pile without knocking it over.",
    "Outside smell enters before sound.",
  ],
  "late-night-desk-season": [
    "Monitor bloom reaches the mug before the overhead does.",
    "Keyboard warmth smaller than the radiator story.",
    "Hallway outside goes quiet while tabs stay rude.",
  ],
  "slow-laundry-week": [
    "Linen drying differently on the chair back—same fold, slower surrender.",
    "Dryer buzz feels optional; air drying wins uneven corners.",
    "One sock hides damp longer inside the cuff.",
  ],
  "grey-afternoon": [
    "Sky lowers the contrast without sending rain yet.",
    "Tea steam visible longer in flat light.",
    "Doorframes lose their sharp edge earlier.",
  ],
  "dry-wooden-room": [
    "Floorboard shrink-speak returns—small ticks when heat shifts.",
    "Paper corners lift honest in the desk drawer.",
    "Hand cream disappears faster between sinks.",
  ],
  "rain-entryway-week": [
    "Rain tracks inward anyway—mat darker near the shoe angle.",
    "Coat shoulders hold water longer than pride.",
    "Entryway lamp reflects puddle geometry without commentary.",
  ],
  "quiet-hallway-week": [
    "Neighbor TV thinner through the wall—hall feels wider.",
    "Elevator arrives emptier more often.",
    "Light fixture buzz barely earns its filament.",
  ],
  "kettle-slower-week": [
    "Kettle cooling slower on the stone—base keeps a whisper of heat.",
    "Steam stops sooner but metal remembers.",
    "Pour sounds heavier before it sounds finished.",
  ],
  "lamp-earlier-week": [
    "Lamp cone lands while sky still pretends afternoon.",
    "Switch finds finger earlier without complaint.",
    "Reading shadow arrives before hunger.",
  ],
};

export function pickWeatherDriftLine(worldId: WorldStateId, dayKey: string): string {
  const lines = weatherDriftByWorld[worldId];
  const idx = dailyIndex(dayKey + ":wd", lines.length);
  return lines[idx]!;
}
