/**
 * Guidance Operating Layer — barrel + arrival copy for /guidance.
 * Reverent Inquiry: living world internal slow response, not chat SaaS.
 */

export { guidanceBoundaries } from "./guidance-boundaries";
export { guidanceVoice } from "./guidance-voice";
export { guidanceRhythm } from "./guidance-rhythm";
export { sessionWeatherById, type SessionWeatherId } from "./session-weather";
export { browserPresence } from "./browser-presence";
export { pauseLanguage } from "./pause-language";
export { microPresenceFragments, microPresenceForIndex } from "./micro-presence";
export { guidanceRouting } from "./guidance-routing";
export {
  guidanceEntryStates,
  getGuidanceEntryById,
  type GuidanceEntryState,
  type GuidanceSoftRoute,
  type ObjectCoordinateKey,
} from "./entry-states";

export const guidanceArrival = {
  eyebrow: "Pause",
  title: "Nearest state",
  lead: "Open a short session: a few lines, then links. No chat UI.",
  beginHref: "/guidance/session",
  beginLabel: "Open session",
} as const;
