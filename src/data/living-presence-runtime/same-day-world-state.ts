import { dailyIndex } from "@/lib/living-day-key";

/** Twelve shared atmospheres — one active per Pacific calendar day site-wide. */
export const WORLD_STATE_IDS = [
  "colder-evening",
  "humid-apartment",
  "radiator-week",
  "open-window-weather",
  "late-night-desk-season",
  "slow-laundry-week",
  "grey-afternoon",
  "dry-wooden-room",
  "rain-entryway-week",
  "quiet-hallway-week",
  "kettle-slower-week",
  "lamp-earlier-week",
] as const;

export type WorldStateId = (typeof WORLD_STATE_IDS)[number];

export type VisualProfile = "default" | "cooler-dusk" | "warm-low" | "rain-muted" | "dim-hall";

export type SameDayWorldState = {
  id: WorldStateId;
  /** Short label — same climate name everywhere that day */
  label: string;
  visualProfile: VisualProfile;
  /** One breath — what shifted in the room */
  resonance: string;
};

export const sameDayWorldStates: Record<WorldStateId, SameDayWorldState> = {
  "colder-evening": {
    id: "colder-evening",
    label: "colder evening",
    visualProfile: "cooler-dusk",
    resonance: "Air thins toward the sill; hands move a little slower toward the kettle.",
  },
  "humid-apartment": {
    id: "humid-apartment",
    label: "humid apartment",
    visualProfile: "rain-muted",
    resonance: "Towels stay heavier; glass fogs honest near the shower crack.",
  },
  "radiator-week": {
    id: "radiator-week",
    label: "radiator week",
    visualProfile: "warm-low",
    resonance: "Heat ticks on schedule; paint near the valve remembers last winter.",
  },
  "open-window-weather": {
    id: "open-window-weather",
    label: "open-window weather",
    visualProfile: "default",
    resonance: "A wedge of outside air keeps negotiating with the radiator.",
  },
  "late-night-desk-season": {
    id: "late-night-desk-season",
    label: "late-night desk season",
    visualProfile: "dim-hall",
    resonance: "LED wins earlier than street noise fades—desk stays lit after the hallway quiets.",
  },
  "slow-laundry-week": {
    id: "slow-laundry-week",
    label: "slow laundry week",
    visualProfile: "rain-muted",
    resonance: "Fabric dries unevenly; one chair holds a sleeve longer than planned.",
  },
  "grey-afternoon": {
    id: "grey-afternoon",
    label: "grey afternoon",
    visualProfile: "rain-muted",
    resonance: "Light lands flat; shadows barely argue.",
  },
  "dry-wooden-room": {
    id: "dry-wooden-room",
    label: "dry wooden room",
    visualProfile: "warm-low",
    resonance: "Grain drinks slower from the air; static asks honest questions.",
  },
  "rain-entryway-week": {
    id: "rain-entryway-week",
    label: "rain-on-entryway week",
    visualProfile: "rain-muted",
    resonance: "Mat remembers damp shoes; hallway reads darker earlier.",
  },
  "quiet-hallway-week": {
    id: "quiet-hallway-week",
    label: "quiet hallway week",
    visualProfile: "dim-hall",
    resonance: "Footsteps thin out; doors stay latched without drama.",
  },
  "kettle-slower-week": {
    id: "kettle-slower-week",
    label: "slower kettle week",
    visualProfile: "default",
    resonance: "Water takes its time; steam earns the window fog.",
  },
  "lamp-earlier-week": {
    id: "lamp-earlier-week",
    label: "lamps earlier week",
    visualProfile: "dim-hall",
    resonance: "Five pm borrows November manners—cone lands before appetite.",
  },
};

export function worldStateIdForDayKey(dayKey: string): WorldStateId {
  const i = dailyIndex(dayKey, WORLD_STATE_IDS.length);
  return WORLD_STATE_IDS[i]!;
}
