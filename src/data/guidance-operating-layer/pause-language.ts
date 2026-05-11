/**
 * Pause / exit layer — leaving is not churn; the room can stay unresolved.
 */

export const pauseLanguage = {
  endings: [
    "Enough for tonight—the room can stay unresolved.",
    "No need to continue this thread; closing the tab is still a complete gesture.",
    "You can leave this open or close it entirely—either is ordinary.",
    "Stopping here is not losing ground.",
    "Nothing here scores whether you finished.",
    "The site keeps breathing without you watching.",
    "If one line landed, that can be the whole visit.",
    "Return is optional; same URL tomorrow is still just a page.",
  ],
  /** Single line for routing footer */
  routingFooter: "No funnel—only doors you might open once, quietly.",
} as const;
