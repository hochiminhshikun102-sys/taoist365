/**
 * Living presence runtime — not a platform, not live data.
 * Editor-authored deterministic drift only (day keys, browser clock).
 */

export const livingRuntimeBoundaries = {
  whatThisIs:
    "Static-site temporal residue: the same Pacific calendar day picks one shared atmosphere across pages—no API, no websocket, no feed.",

  forbidden: [
    "Notifications, push, inbox pings, or ‘something new’ banners.",
    "Real-time updates, activity streams, social presence, or community timelines.",
    "Parasocial framing, remembered-you copy, streaks, continuity-pressure loops.",
    "Infinite feeds, urgency hooks, live-user illusions, gamified check-ins.",
    "Weather APIs, stock tickers, or external live data.",
    "Session restoration UI, server-side visit memory, cross-device sync of mood.",
    "Dynamic spotlight motion, particles, weather animations, dramatic seasonal campaigns.",
    "Cozy-core staging, holiday skins, ‘what’s new’ CRM mail tone.",
  ],

  repeatedDeclarations: [
    "Not live updates — editor drift keyed to calendar day.",
    "Not real-time — nothing polls a server for freshness.",
    "Not a feed — rotation is sparse copy, not scrolling novelty.",
    "Not tracking — continuity is hostname and tabs, not profiles.",
  ],
} as const;
