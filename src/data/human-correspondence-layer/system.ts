/**
 * First real human correspondence layer — slow mail, small-site admin, not support desk.
 * No SLA language; no ticket optimism; no artisan myth.
 */

export const humanCorrespondenceLayer = {
  pageEyebrow: "Mail",
  pageTitle: "Write here, slowly",
  pageLead:
    "This address behaves like a mailbox someone checks between shelf work and HTML edits—not a startup inbox, not a ticket router.",

  whatSendingFeelsLike: {
    heading: "What the mail is",
    lines: [
      "You write from whatever client you already use—no form that harvests fields, no portal that assigns a number.",
      "A subject line can be half a sentence about a cup or a napkin; the body can be short or wander.",
      "Nobody sends an instant auto-reply promising someone ‘will get back within.’ Silence until a human writes is ordinary here.",
      "Sometimes the answer arrives the same evening; sometimes a day or two later when hands are actually near the shelf.",
      "You can write again months later like an old pen pal—the inbox does not reset your standing.",
    ],
  },

  whatRepliesFeelLike: {
    heading: "What answers tend to feel like",
    lines: [
      "Plain text, sometimes lowercase where hurry won.",
      "Dimensions typed casually from a tape measure—not a spec PDF.",
      "If a carrier number exists, it lands pasted plain—no tracking dashboard romance.",
      "Occasionally a blurry phone photo if seeing the grain or crackle matters more than polish.",
      "Someone may say they walked to the shelf and this batch is thinner than last month—honest inventory, not scarcity theater.",
      "If the answer is brief, it is not brushing you off; long mail gets long replies when there is time.",
    ],
  },

  /** Ordinary opening shapes — not FAQ, not scripts */
  correspondenceFragments: [
    "Wondering if that sand mug is still around.",
    "Picture that mug months in—chipped friendly—still want it on that desk?",
    "The linen—would it feel huge on a narrow desk?",
    "Rough dimensions on the oak tray before I picture keys on it?",
    "Shipping to the east coast—plain packaging is fine.",
    "Crackle cup—does the handle clear a left-handed grip?",
    "If the notebook is out for a while, no hurry—just noting.",
    "Maple block—does it actually stop drafts on a painted sill?",
    "Half a year later—is that mug still always left of your laptop?",
    "Tray became keys-only—still oak behavior?",
    "Honest question—my desk is chaos, drawer half-open behind the monitor, mug still sane there?",
    "Linen on chair back most nights—does that square survive lazy humans?",
    "After many months—will rings inside the mug read honest or too staged for my sloppy desk?",
    "Oak tray—does grain darken honest in humid summers without me babying it?",
  ],

  livingWorldThroughMail: {
    heading: "How mail stays in the living world",
    lines: [
      "When something ships, it leaves like apartment mail—brown paper, tape that refuses glamour, handwriting where labels smudge.",
      "Questions about wood oil, linen bleed, or stone felts get answers from the same hands that pack, not from a script.",
      "Light, shelf dust, and ‘we checked what was actually here’ belong in the thread—ordinary continuity.",
      "Replies can admit one lamp evenings and tables not cleared—human residue, not showroom optimism.",
    ],
  },

  noArtisanTheaterLine:
    "Nobody promises mysticism, lineage performance, or concierge uplift—only ordinary people handling ordinary objects slowly.",

  relationshipThroughTime: {
    heading: "Second letters welcome",
    lines: [
      "You might write once to ask and again later to confirm—a thread can stretch across seasons without becoming a ‘case.’",
      "Returning is not ‘following up on ticket #’—it is the same mailbox remembering your sentence.",
    ],
  },

  smallInternetPresenceLine:
    "Think late web: one domain, one address, someone on the other side who also edits the HTML—correspondence as continuity, not brand care.",

  composeLinkLabel: "Open your mail app",
  defaultSubject: "Hello — Taoist365",

  objectsBridgeLine:
    "If a specific piece is already in your imagination, name it like you would to a friend—Objects lists stable anchors you can paste into the subject.",
} as const;
