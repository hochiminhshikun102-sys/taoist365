import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "./same-day-world-state";

/** Room temperature — tactile, not thermometer SaaS. */
export const roomTemperatureByWorld: Record<WorldStateId, readonly string[]> = {
  "colder-evening": [
    "Temperature drops honest at the ankles first.",
    "Keyboard plate reads cooler through thin sleeves.",
    "Tile bathroom votes before carpet hall.",
  ],
  "humid-apartment": [
    "Skin stays tacky near the stove steam.",
    "Paper towels wilt faster in open air.",
    "Ice maker sounds busier than appetite.",
  ],
  "radiator-week": [
    "Warm band along baseboard—narrow citizenship.",
    "Towel on radiator wears stiff when forgotten.",
    "Window glass fogs where kettle argues.",
  ],
  "open-window-weather": [
    "Cross-breeze trades kitchen grease for sidewalk pollen.",
    "One room refuses consensus.",
    "Blanket thickness negotiates hourly.",
  ],
  "late-night-desk-season": [
    "Palm rests cooler on trackpad plastic.",
    "Cheek warmer than keyboard side.",
    "Fan off—heat stacks behind the monitor.",
  ],
  "slow-laundry-week": [
    "Clean pile lukewarm—dryer still shy.",
    "Sock elastic slower to forgive ankle.",
    "Denim heavier when humidity wins.",
  ],
  "grey-afternoon": [
    "Skin tone matches wall tone accidentally.",
    "Tea stays drinkable longer—no urgency from light.",
    "Radiator silent—confusion ordinary.",
  ],
  "dry-wooden-room": [
    "Knuckles ask for salve sooner.",
    "Doorframe grain sharper in dry air.",
    "Nosebleed season lurks without wellness copy.",
  ],
  "rain-entryway-week": [
    "Coat wool steam when heat finally lands.",
    "Mat temperature uneven—outside wins center.",
    "Umbrella metal colder than handle.",
  ],
  "quiet-hallway-week": [
    "Hallway air older—fewer doors opening.",
    "Elevator carpet warmer than tile landing.",
    "Stairwell concrete remembers sneakers.",
  ],
  "kettle-slower-week": [
    "Metal stays honest longer—pour waits.",
    "Mug ceramic hoards last warmth.",
    "Steam fewer but thicker sentences.",
  ],
  "lamp-earlier-week": [
    "Cone heat pools earlier—dust visible sooner.",
    "Desk wood expands slower under palm.",
    "Screen white feels bluer against lamp yellow.",
  ],
};

export function pickRoomTemperatureLine(worldId: WorldStateId, dayKey: string): string {
  const lines = roomTemperatureByWorld[worldId];
  const idx = dailyIndex(dayKey + ":temp", lines.length);
  return lines[idx]!;
}
