/**
 * Real human time — sedimented months in a room, not move-in day, not vintage cosplay, not styled-aging theater.
 */

export const humanTimeLayer = {
  pageEyebrow: "Human time",
  pageTitle: "Time that has already sat down in the room",
  pageLead:
    "Past ‘someone was just here’ lies thicker residue: corners nobody rotates, sun-bleached edges honest, wood brighter where palms forgot to vary pressure. Not antique worship, wabi-sabi performance, or sepia nostalgia—just many ordinary months stacking without a stylist.",

  boundaries: {
    noVintageFetish:
      "No antique romance, collector relic framing, or ‘beautiful decay’ poetry—only things that stayed because nobody bothered replacing them.",
    noStyledAging:
      "Aging is not framed as ritual doctrine—no patina sermon, no mindful deterioration. Stains and softening mean time passed while life happened, not a moodboard virtue.",
    noWellnessTime:
      "No healing-through-repetition, intentional slow living, or calm routine language—repetition is texture from fatigue and convenience, not a practice app.",
    noFakeVintageDust:
      "No spotlight dust motes, fake grain overlays, vintage filters, or film-set ‘lived-in’—only plain uneven light and surfaces that forgot to be new.",
  },

  roomSedimentLines: [
    "Paper stack lower left never filed—outline ghost on wood where sun moved slower than ambition.",
    "Cushion dent remembers one default TV angle across seasons.",
    "Window sill paint paler where objects sat through two summers without tourism.",
  ] as const,

  seasonalTimeLines: [
    "Winter: radiator-adjacent cloth dries stiff; bulb reads yellower at 5 p.m. because the building agrees night is longer.",
    "Humid weeks: wood swells honest; paper corners lift toward AC drafts without drama.",
    "Long sun months: one shelf face fades a half tone—nobody styled it, blinds just failed partial.",
  ] as const,

  repetitionTextureLines: [
    "Same mug drop sound for hundreds of evenings—not routine branding, just gravity remembering.",
    "Keys hit the same oak rectangle until the sound becomes hallway weather.",
    "One notebook dog-ear thickens because reopening never moved left.",
  ] as const,

  crossPageEchoes: [
    {
      text: "Sun line on sill—objects sat months without rearrange for the photo.",
      href: "/objects" as const,
      linkLabel: "Objects",
    },
    {
      text: "Desk tab months open—sedimented attention, not fresh move-in energy.",
      href: "/desk" as const,
      linkLabel: "Desk",
    },
    {
      text: "Mail can mention which corner faded first—time talk without vintage theater.",
      href: "/inquiry" as const,
      linkLabel: "Mail",
    },
  ] as const,
} as const;
