export const siteConfig = {
  siteName: "Reverent Inquiry",
  brandEnName: "Reverent Inquiry",
  archiveSourceName: "Yewen / \u8c12\u95ee",
  domain: "taoist365.com",
  /** Plain-language discovery for search and link previews; stable site, not a funnel. */
  description:
    "A quiet long-running browser place at taoist365.com. Pages stay linked, mail stays human, and the site changes slowly by hand.",
  locale: "en-US",
  timezone: "America/Los_Angeles",
  metadataBase: "https://taoist365.com",
  /** Replace with your real inbox when DNS is live. */
  inquiryEmail: "hello@taoist365.com",
  /** Short trust anchor; same meaning wherever repeated. */
  permanenceLine:
    "This domain is kept as an ordinary website: pages stay linked, mail goes to people, not scripts.",
  /** Honest maintenance signal; no dates, no changelog theater. */
  maintenanceLine:
    "Edited by hand when something needs fixing, slow enough for the room to stay ordinary.",
  /** Browser-held familiarity; explicitly not server-side memory. */
  browserSideLine:
    "Tabs, history, and bookmarks live in your browser. This site does not record visits or reload a special state for you.",
  /** Slow human editorial trace; no cast, no community, no staged presence. */
  slowHumanLine:
    "Copy moves in small passes when a keeper of this domain types. Nothing auto-regenerates overnight.",
  /** Honest scope for /desk; plain textarea in the browser only, not a product surface. */
  deskScopeLine:
    "Desk keeps plain text only in this browser. Nothing is uploaded or synced.",
  /** Homepage hint toward occasional real use without productivity framing. */
  deskInvitationLine:
    "If you want a few lines that stay on your device only, same domain, no account:",
  /** Honest boundary: private browser notes never hit this domain's servers. */
  personalResidueScopeLine:
    "Desk notes and ritual echoes stay in your browser until you clear site data. Nothing is uploaded or tied to an identity here.",
  /** Homepage stitch between Desk and Objects browser notes; no accounts implied. */
  personalResidueHomeLine:
    "Private browser notes only: optional margins beside catalog lines on Objects, scratch and phrases on Desk, and a local echo of which ritual page you opened last. Nothing uploads and there is no profile.",
  /** Desk: tab can stay open; no pings, no overnight resets. */
  deskLightReuseLine:
    "Fine to leave this tab open or come back when you think of it. This site does not ping you, count days, or reset anything overnight.",
  /** Objects: revisiting anchors/margins as ordinary reference, not a collection product. */
  objectsReturnReferenceLine:
    "Revisiting the same anchor or private margin is ordinary reference-checking, not favorites, streaks, or a managed list.",
  /** Rituals index: same URL opened twice is still just a web page. */
  lightRitualReopenLine:
    "Opening one ritual page again is still just that URL in your browser. Nothing scores it, schedules you, or frames a practice to improve.",
  /** Homepage: light real-life reopen without habit-product language. */
  lightReuseHomeLine:
    "If Reverent Inquiry becomes a page you reopen when life loops back, that is ordinary browsing. Nothing here schedules your return or rewards repetition.",
  /** Short trust line for footers and ritual shell; no streak-style mechanics. */
  lightDependencyFootLine:
    "Reopening the same page is ordinary use. No streaks, reminders, or daily resets.",
  /** Objects: real obtainability via mail, not catalog-only browsing. */
  objectsObtainableIntroLine:
    "These lines describe kinds of things that can quietly sit in a room: paper, vessels, linen, wood, traces after incense, corners for pause. If one piece should live near you, mail names it plainly and a human replies.",
  /** Desk to named things on Objects; soft bridge into real life. */
  deskObjectBridgeLine:
    "Scratch sometimes mentions paper, tea, linen, wood, incense, or a page stopped mid-read. The stable names for those things live on Objects; when something physical should follow, mail is the quiet route. Still no checkout.",
  /** Rituals index: reading to named things to mail. */
  ritualObjectCarryLine:
    "After a ritual, what lingered in mind often has a plain name on Objects. If one thing should stay beside you in real life, write mail; nothing turns the page into a shopping flow.",
  /** Contact: human correspondence, not ticketing. */
  contactHumanOrderLine:
    "Notes about wanting one piece nearby are read like letters. Humans answer in their own rhythm. No ticket bots, faux urgency, or support queue theater.",
  /** Anti-funnel boundary for commerce tone. */
  gentleAcquisitionBoundaryLine:
    "Bringing something nearer stays an ordinary mail exchange, slow enough for the object to remain a thing in life.",
  /** Objects page: first physical batch, long-lived catalog framing. */
  objectsCommerceCatalogLine:
    "Below is Reverent Inquiry's first object batch: pieces described the way they sit in real American apartments: scuffed, uneven, already plausible. The list changes slowly and keeps its names stable.",
  /** Life moments when a slow site surfaces; user-led, not scheduled by the domain. */
  returnGravityHomeLine:
    "Late hours, pauses between tasks, idle rows of tabs, or the stretch before sleep are ordinary times a quiet URL resurfaces: through history, a tab left open, or memory of a named thing, not because this site called you back.",
  /** Explicit anti-manipulation boundary for moments framing. */
  returnGravityBoundaryLine:
    "Nothing on this domain watches the clock for your return; describing moments is plain language about life, not a routine this site runs.",
  /** Desk: drawer / half-written; not productivity capture. */
  deskDrawerGravityLine:
    "Half lines and stray phrases can sit unfinished. Desk behaves more like a desk drawer than a notes app: no tidy queue, no prompt to clear the draft.",
  /** Night-adjacent browser truth without glamorizing insomnia. */
  deskNightBrowserLine:
    "Many browsers keep one plain tab for stray sentences when the house is quiet; the page does not brighten or ping for attention.",
  /** Objects: memory routes via things, not brand recall. */
  objectsMemoryAnchorLine:
    "Return paths often ride a concrete image: a folded edge, warmth left in ceramic, linen crooked on a rail. Your bookmark can anchor that instead of the site name.",
  /** Rituals: reopen without framing failure or urgency. */
  ritualReopenMomentLine:
    "Landing on the same ritual when something is undecided or a line has not settled is ordinary re-reading, not falling behind, not a loop this page grades.",
  /** Browser return vocabulary; no habit-building claim. */
  browserReturnGravityLine:
    "Pinned tabs, typed URLs, and history trails bring old pages back; Reverent Inquiry does not train or tune your rhythm.",
  /** Contact: seasons of mail, not comeback campaigns. */
  contactReturnGravityLine:
    "The inbox stays the same whether you write once a season or after a long silence. No we-miss-you notes, no recovery campaigns.",
};

export type SiteConfig = typeof siteConfig;
