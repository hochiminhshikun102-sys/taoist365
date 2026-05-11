export const continuationLanguage = {
  softContinuationPrompts: [
    "If you'd like, there is a gentle next step.",
    "Continue or leave mid-thought—both leave the room as it is.",
    "Stay with this for a while before deciding.",
  ],
  pausePermission: [
    "You can pause here.",
    "There is no rush to continue.",
  ],
  /**
   * One low-output foot channel: passive gravity + background life merged—
   * avoids stacking two “atmosphere lines” (less maintained, less performative).
   */
  ambientFootHints: [
    "Light keeps doing its slow job whether this tab is in front or buried.",
    "The hostname stays the same when you come back next month.",
    "Reopening a saved tab does not ping anything here—only your browser knew it was resting.",
    "Nothing ticks upward while you forget about this page.",
    "Brightness in the room follows a sensor that never reads this URL.",
    "Other windows keep their scroll depth; this page does not inherit it.",
    "The keyboard idles out on the timer the OS set long ago.",
    "A notification sound elsewhere plays without checking what is focused here.",
    "If a phrase shifts between visits, someone committed text—not an overnight generator.",
    "Screens dim on timers the OS chose; nothing here dims because night fell.",
    "Between stalls in a day, an old tab sometimes rises to the front—still static HTML underneath.",
    "Pinned tabs can gather dust for weeks and wake unchanged; no freshness score refreshes them.",
    "Browser history keeps yesterday’s path without asking you to repeat it.",
  ],
  returnAnytimeLanguage: [
    "If you remember later, it is the same corner—not a sequel.",
    "No list forms while you are away.",
    "Same title in the tab bar as last time—that is your machine, not ours.",
    "Some nights the quiet route is whatever was already open—no chat tone, just an unchanged page.",
  ],
  nonUrgentContinuity: {
    urgencyLevel: "none",
    autonomySignal: "strong",
  },
} as const;

export const continuationLanguageAvoid = [
  "always_come_back",
  "must_continue",
  "streak_pressure",
  "loop_dependency",
] as const;
