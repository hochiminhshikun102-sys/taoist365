import { getLivingDayKey, getPacificMonth, dailyIndex } from "@/lib/living-day-key";
import type { SessionWeatherId } from "@/data/guidance-operating-layer/session-weather";
import { pickAnalogTimeSignal } from "./analog-time-signals";
import { pickAmbientPresenceLine } from "./ambient-time-presence";
import { browserTemporalResidue } from "./browser-temporal-residue";
import { livingRuntimeBoundaries } from "./living-runtime-boundaries";
import { pickRoomTemperatureLine } from "./room-temperature-language";
import { sameDayWorldStates, type VisualProfile, type WorldStateId, worldStateIdForDayKey } from "./same-day-world-state";
import { seasonalRoomLine } from "./seasonal-room-state";
import { pickWeatherDriftLine } from "./weather-drift";

export { livingRuntimeBoundaries } from "./living-runtime-boundaries";
export { sameDayWorldStates, worldStateIdForDayKey, type WorldStateId, type VisualProfile } from "./same-day-world-state";
export { weatherDriftByWorld, pickWeatherDriftLine } from "./weather-drift";
export { seasonalRoomLine } from "./seasonal-room-state";
export { ambientPresenceByWorld, pickAmbientPresenceLine } from "./ambient-time-presence";
export { applySlowShelfDrift } from "./slow-shelf-movement";
export { roomTemperatureByWorld, pickRoomTemperatureLine } from "./room-temperature-language";
export { pickAnalogTimeSignal } from "./analog-time-signals";
export { browserTemporalResidue } from "./browser-temporal-residue";
export {
  circulationEchoForInventoryId,
  deskCirculationLine,
  pickCirculationEcho,
  pickObjectAgingLine,
} from "./object-circulation";

/** Mail — time passing through shelf correspondence, not CRM */
const MAIL_TEMPORAL_LINES: readonly string[] = [
  "Shelf thinner lately — certain cups leave slower than guilt.",
  "Paper edges softening in the reply pile — moisture ordinary.",
  "Some threads answered later at night recently — uneven human pace, not urgency.",
  "Envelope glue tired — tongues lift honest.",
  "Rubber band on the bundle older — elasticity democracy.",
  "Stamp corner curling — nobody refreshed the sheet on purpose.",
];

const HUMAN_ROOM_TEMPORAL: readonly string[] = [
  "Chair staying angled longer — nobody corrected it.",
  "Lamp left on earlier — cone landed before appetite.",
  "Unfinished laundry moved twice — basket height unchanged.",
  "Same mug surviving several evenings — dishwasher avoided honestly.",
  "Hallway shoes shifted with weather — mat remembers damp geometry.",
  "Window cracked again — draft rehearses the mail pile.",
];

/** Guidance room-time — world drift meeting session weather (not AI memory). */
const GUIDANCE_CONTINUITY: Partial<Record<WorldStateId, readonly string[]>> = {
  "lamp-earlier-week": [
    "Lamps landed earlier lately — the sill still negotiates with dark.",
    "Five pm borrowed weight sooner today — reading shadow arrived before hunger.",
  ],
  "open-window-weather": [
    "Window still cracked tonight — corridor air trades with kettle steam.",
    "Outside smell entered before sound — same draft as this afternoon.",
  ],
  "rain-entryway-week": [
    "Mat darker near the shoe angle — rain tracked inward anyway.",
    "Entryway lamp reflects puddle geometry — hallway borrowed darkness earlier.",
  ],
  "kettle-slower-week": [
    "Kettle cooling slower — mug ring dries uneven tonight.",
    "Steam wrote shorter sentences on the glass — pour waits honest.",
  ],
  "late-night-desk-season": [
    "Desk LED reaches the mug before the overhead — same late hour bias.",
    "Hallway outside thinned while tabs stayed rude — browser dimmed first.",
  ],
};

const DEFAULT_GUIDANCE_CONTINUITY = [
  "Room time keeps drifting — not memory, just the same Pacific day’s climate elsewhere here.",
  "Same hostname, uneven evening — radiator and inbox disagree politely.",
];

export type LivingPresenceBundle = {
  dayKey: string;
  monthPacific: number;
  worldId: WorldStateId;
  worldLabel: string;
  resonance: string;
  visualProfile: VisualProfile;
  weatherDriftLine: string;
  seasonalRoomLine: string;
  ambientPresenceLine: string;
  roomTemperatureLine: string;
  analogTimeLine: string;
  browserTemporalLine: string;
  mailTemporalLine: string;
  humanRoomTemporalLine: string;
  antiFeedReminder: string;
};

export function resolveLivingPresenceBundle(now: Date = new Date()): LivingPresenceBundle {
  const dayKey = getLivingDayKey(now);
  const monthPacific = getPacificMonth(now);
  const worldId = worldStateIdForDayKey(dayKey);
  const meta = sameDayWorldStates[worldId];

  return {
    dayKey,
    monthPacific,
    worldId,
    worldLabel: meta.label,
    resonance: meta.resonance,
    visualProfile: meta.visualProfile,
    weatherDriftLine: pickWeatherDriftLine(worldId, dayKey),
    seasonalRoomLine: seasonalRoomLine(dayKey, monthPacific),
    ambientPresenceLine: pickAmbientPresenceLine(worldId, dayKey),
    roomTemperatureLine: pickRoomTemperatureLine(worldId, dayKey),
    analogTimeLine: pickAnalogTimeSignal(dayKey, now.getHours()),
    browserTemporalLine: browserTemporalResidue.footerLine,
    mailTemporalLine: MAIL_TEMPORAL_LINES[dailyIndex(dayKey + ":mail", MAIL_TEMPORAL_LINES.length)]!,
    humanRoomTemporalLine: HUMAN_ROOM_TEMPORAL[dailyIndex(dayKey + ":humanroom", HUMAN_ROOM_TEMPORAL.length)]!,
    antiFeedReminder: livingRuntimeBoundaries.repeatedDeclarations[1],
  };
}

export function guidanceTemporalContinuity(
  worldId: WorldStateId,
  sessionWeatherId: SessionWeatherId,
  dayKey: string,
): string {
  const pool = GUIDANCE_CONTINUITY[worldId] ?? DEFAULT_GUIDANCE_CONTINUITY;
  const idx = dailyIndex(dayKey + ":guide:" + sessionWeatherId, pool.length);
  return pool[idx]!;
}
