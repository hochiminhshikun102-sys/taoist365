/**
 * Anti-AI-product boundary - Reverent Inquiry guidance is not SaaS, not chat-first, not therapy.
 * English-only policy lives at UI layer; this file is English by design.
 */

export const guidanceBoundaries = {
  /** Hard bans on interaction and framing */
  forbidden: [
    "Chatbot tone, performative guide personas, or ‘helpfulness’ scoring.",
    "Productivity framing, streaks, goals, or ‘optimize your evening.’",
    "Attention loops, gamification, badges, or dopamine bait.",
    "Synthetic relationship framing, attachment, or ‘I am here for you’ dependency.",
    "Therapist simulation, diagnosis, nervous-system regulation sales language.",
    "Infinite-scroll conversation, typing indicators, streaming tokens, thinking animations.",
    "Mystical pressure, fortune cadence, or ‘the universe chose this for you.’",
    "Dashboards, widgets, analytics chrome, or SaaS component theater.",
  ],
  /** What this layer is allowed to resemble */
  allowedResemblance: [
    "Old web: one column, plain borders, quiet type.",
    "Room-state noticing: short, slightly unfinished, non-authoritative.",
    "Living system: doors back into rituals, Objects, Desk, Mail—same language family as the rest of the domain.",
  ],
} as const;
