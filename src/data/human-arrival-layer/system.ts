/**
 * Human shipping & arrival — parcel mail reality, not fulfillment UI or unboxing theater.
 */

export const humanArrivalLayer = {
  continuityHeading: "Mail → shelf → parcel → room",
  continuityLead:
    "One thread can carry the whole quiet chain without turning into commerce software—humans read mail, walk to the shelf, wrap like renters packing a friend, hand off to ordinary postal routing.",
  continuitySteps: [
    "Mail names the thing and the city—someone reads it beside the same HTML they edit.",
    "Shelf lookup happens like remembering where you left your keys—not a warehouse scan fantasy.",
    "Brown paper, reused box when size fits, tape crooked at one corner, handwriting smudged where humidity won.",
    "Parcel rides USPS-style reality—rain on the stoop, neighbor mis-delivered once, left beside your door until evening.",
    "Room arrival is rarely ceremonial: moved from kitchen to desk, sat unopened two days, opened after work under dull light.",
    "Then it settles into clutter—receipts, chargers—until the room closes around it like any other week.",
  ] as const,

  parcelRealityHeading: "Parcels leave like apartment mail",
  parcelRealityLines: [
    "No branded tissue choreography—folded paper, maybe newsprint if it pads without lying.",
    "Labels hand-written when printers jam; tracking numbers sent as plain text if they exist, not a dashboard invite.",
    "Sometimes the box is slightly too big because that was what was under the bed.",
    "Packing happens at the same table where dinner happened—quiet multitasking, not performance.",
  ] as const,

  /** Explicit boundary — copy editors avoid slipping into shop speak */
  languageWeAvoid:
    "Avoid fulfillment-center tone: no dispatched, no warehouse theater, no tracking-update cadence, no tiered shipping upsell, no gift-wrap theater—only mail and parcel honesty.",

  arrivalQuietlyHeading: "Arrival without ceremony",
  arrivalQuietlyLines: [
    "Collector unboxing videos belong elsewhere—here things often arrive tired, opened beside mail piles.",
    "Two days unopened is ordinary; moving the box from hall to kitchen before opening is ordinary.",
    "Rain-soaked tape dried crooked overnight—still your object inside.",
  ] as const,

  settledThingsLine:
    "The goal feeling is not ‘new arrival peak’ but slowly settled weight—the thing stops announcing itself and joins the desk’s democracy.",

  crossPageEchoes: [
    {
      text: "Parcel sat beside the door through rain—opened after work, not as ritual.",
      href: "/inquiry" as const,
      linkLabel: "Mail page",
    },
    {
      text: "Brown paper, reused cardboard, tape folded where scissors hurried.",
      href: "/inquiry" as const,
      linkLabel: "Mail page",
    },
    {
      text: "Moved from kitchen counter to desk once clutter negotiated space.",
      href: "/objects" as const,
      linkLabel: "Objects",
    },
    {
      text: "Shelf lookup before wrapping—someone actually walked and looked.",
      href: "/inquiry" as const,
      linkLabel: "Mail page",
    },
  ] as const,
} as const;
