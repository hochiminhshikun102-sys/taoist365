/**
 * Repeat life usage — six months in, unconscious repeat, forgetting, silent dependence.
 * Not productivity framing, mindful habit stacks, or design-object worship.
 */

export type ObjectLongTermUsage = {
  sixMonthReality: string;
  placementPermanence: string;
  forgettingLayer: string;
  wearAsAttachment: string;
  silentDependence: string;
  roomInfrastructureClosing: string;
};

export const longTermUsageShared = {
  layerEyebrow: "Six months later — still there",
  layerLead:
    "Past arrival and week one, the honest test is whether something stops being noticed—default placement, unconscious reach, two weeks buried under mail then forgiven. No mindful routine optimization, habit stacking, or self-improvement framing—only repeat that nobody schedules.",
  noDesignWorshipLine:
    "No collectible icon language, heirloom theater, or elevated design-object tone—still ordinary apartment infrastructure you forgot you chose.",
} as const;

export const longTermGravityEchoes = [
  {
    text: "The cup that stopped migrating—always left of the trackpad now.",
    href: "/objects#taoist365-desk-mug-sand" as const,
    linkLabel: "sand mug",
  },
  {
    text: "Tray default for keys—six months without deciding again.",
    href: "/objects#taoist365-oak-tray-narrow" as const,
    linkLabel: "oak tray",
  },
  {
    text: "Linen corner curled permanent—never returned to the drawer.",
    href: "/objects#taoist365-linen-napkin-raw" as const,
    linkLabel: "linen",
  },
  {
    text: "Notebook page folded six months—still the same guilt bookmark.",
    href: "/objects#taoist365-layflat-notebook" as const,
    linkLabel: "notebook",
  },
  {
    text: "Paperweight still pins unpaid envelopes—wind forgot to argue.",
    href: "/objects#taoist365-maple-paperweight" as const,
    linkLabel: "maple block",
  },
] as const;

export const longTermUsageByCatalogId: Record<string, ObjectLongTermUsage> = {
  "taoist365-desk-mug-sand": {
    sixMonthReality:
      "By half a year it owns a coordinate left of the laptop without debate—thumb routes there before vision. Rings stack shallow geology inside; you stopped rinsing between sessions because performance rinses died unnoticed.",
    placementPermanence:
      "Radiator-adjacent desk corner or charger-adjacent—the mug hasn’t earned a label but hasn’t moved quarters either.",
    forgettingLayer:
      "Two weeks vanish under takeout menus; rediscover stain deeper—surprise without disappointment.",
    wearAsAttachment:
      "Sand glaze at lip graduates from arrival honesty to thumb-polished default—attachment measured in unconscious gloss.",
    silentDependence:
      "Hotel cups suddenly feel like disposable lies—desktop feels lightly wrong until cylinder weight returns.",
    roomInfrastructureClosing:
      "Less thing purchased, more desk weather—the mug is how hot liquid enters night work now.",
  },
  "taoist365-linen-napkin-raw": {
    sixMonthReality:
      "One corner lifts permanent spiral; it lives beside trackpad more than table—never folded ‘right’ again because nobody votes weekly.",
    placementPermanence:
      "Under bowl slide zone or laptop thigh zone—same zip code for months without housekeeping referendum.",
    forgettingLayer:
      "Buried under printer paper two Mondays; resurfaced softer, stain cartography richer.",
    wearAsAttachment:
      "Fibers surrender honesty—softening is relationship thickening, not laundry failure.",
    silentDependence:
      "Paper towel rolls feel briefly accusatory—you reach for fray square muscle memory.",
    roomInfrastructureClosing:
      "Part of wipe-and-crumb grammar—like outlet placement, rarely remarked.",
  },
  "taoist365-oak-tray-narrow": {
    sixMonthReality:
      "Keys land oak-first without ceremony—six months of identical clang geography. Coins polish twin halos you dust around without fixing.",
    placementPermanence:
      "Hall skew or counter skew locked—moving it feels like relocating building plumbing.",
    forgettingLayer:
      "Mail avalanche hides tray lip weekly; rediscover screws you meant to tighten months ago.",
    wearAsAttachment:
      "Grain rises along coin orbit—oil darkens where palms leaned bills.",
    silentDependence:
      "Pockets empty weird on bedspread—missing rectangle sound.",
    roomInfrastructureClosing:
      "Infrastructure for junk democracy—not curated vignette.",
  },
  "taoist365-stone-smoke-dish": {
    sixMonthReality:
      "Ash archaeology thickens in strata you stop reading; incense returns after forgotten months without reintroduction ritual.",
    placementPermanence:
      "Sill coordinate or kettle-adjacent tile—cool weight owns vote.",
    forgettingLayer:
      "Stone gathers dust invisible until sun angle changes Wednesday.",
    wearAsAttachment:
      "Gray softens unevenly—heat memory maps argument seasons.",
    silentDependence:
      "Synthetic scent sprays feel rude—hand misses mineral temperature.",
    roomInfrastructureClosing:
      "Quiet smell governor—not décor.",
  },
  "taoist365-layflat-notebook": {
    sixMonthReality:
      "Same dog-ear page marks chronic avoidance six months straight; spine looseness measurable—opens mid-stack without hunting.",
    placementPermanence:
      "Mug-adjacent desk estate permanent—never filed because filing lied.",
    forgettingLayer:
      "Closed under bills fortnight; reopened finds ink feathered honest by humidity jury.",
    wearAsAttachment:
      "Coffee ellipse deepens through job changes—paper thickens with refusal to migrate cloud.",
    silentDependence:
      "Blank apps blink louder—you miss fiber refusing autosave theology.",
    roomInfrastructureClosing:
      "Half-thought seat—not productivity artifact.",
  },
  "taoist365-cotton-letter-sheets": {
    sixMonthReality:
      "Drawer thin audible; half the pack gone without ceremony—some envelopes mailed, some crumpled honest.",
    placementPermanence:
      "Under laptop thermal zone or stamp drawer lip—stable mail ecology.",
    forgettingLayer:
      "Buried beneath charger snake; rediscover feather edge browner.",
    wearAsAttachment:
      "Ghost ink stacks through drafts abandoned beautifully.",
    silentDependence:
      "Thumb expects cotton drag before hitting send—digital condolence feels thin.",
    roomInfrastructureClosing:
      "Correspondence drawer geology—not stationery identity.",
  },
  "taoist365-night-teacup": {
    sixMonthReality:
      "Crackle map graduates from novelty to weather forecast inside glaze; handle wear asymmetry frozen—left thumb civilization.",
    placementPermanence:
      "Laptop-left bloom zone—steam ghosts bezel predictable corners.",
    forgettingLayer:
      "Half-full overnight biology ignored mornings until smell reminds kindly.",
    wearAsAttachment:
      "Interior stain democracy deepens—cooling rings stack patience archaeology.",
    silentDependence:
      "Branded thermal cups feel performative—night lacks crackle honesty.",
    roomInfrastructureClosing:
      "Night fluid infrastructure beside glow.",
  },
  "taoist365-maple-paperweight": {
    sixMonthReality:
      "Receipt stack geology pinned six months—wind tests fail silently. Palm oil moon waxes through Zoom seasons.",
    placementPermanence:
      "Sill or desk corner deed locked—papers negotiate around it.",
    forgettingLayer:
      "Vanishes under magazine drift; rediscover corners softer, grain smiling wider.",
    wearAsAttachment:
      "Wood darkens along worry arcs—mass teaches drafts manners.",
    silentDependence:
      "Desk feels buoyant wrong—lists threaten flight without weight kindness.",
    roomInfrastructureClosing:
      "Gravity employee—not sculpture.",
  },
};

export function longTermUsageForPiece(piece: { id: string }): ObjectLongTermUsage {
  const u = longTermUsageByCatalogId[piece.id];
  if (!u) {
    return {
      sixMonthReality:
        "Half a year later placement fossilizes—reach precedes thought; nobody voted on optimization.",
      placementPermanence: "Same square foot months—styled staging retired.",
      forgettingLayer: "Vanishes under paper weeks; stain deeper when sight returns.",
      wearAsAttachment: "Wear thickens relationship without announcement.",
      silentDependence: "Absence registers as mild wrong temperature on surface.",
      roomInfrastructureClosing: "Room structure—not shopping memory.",
    };
  }
  return u;
}
