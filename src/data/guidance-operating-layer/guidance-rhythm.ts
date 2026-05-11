/**
 * Session rhythm — guided flow, max three noticing lines, no long thread.
 */

export const guidanceRhythm = {
  maxNoticingLines: 3,
  maxSessionRounds: 3,
  phases: [
    "arrival",
    "state selection",
    "first line",
    "optional further lines",
    "routing",
    "session end",
  ] as const,
  arrivalCta: "Begin",
  continueReflectionCta: "Next line",
  proceedToRoutesCta: "When ready",
  newStateCta: "Choose a different state",
  homeCta: "Home",
} as const;
