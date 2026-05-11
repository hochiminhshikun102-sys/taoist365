/**
 * Pacific-day slices — replaced wholesale daily; no echo stacks (reserve purge).
 */
export type CatalogDailyEcho = {
  catalogId: string;
  echoLine: string;
};

export type LivingDailySlice = {
  breathLine: string;
  roomState: string;
  lingerObject: string;
  shareableLine: string;
  catalogEcho?: CatalogDailyEcho;
};

/** Flat pool — no arrival/long-term/human-room/time-sediment reserves. */
export const livingDailySlices: LivingDailySlice[] = [
  {
    breathLine: "Coffee cooling.",
    roomState: "Desk lamp on.",
    lingerObject: "Mug on coaster.",
    shareableLine: "Same URL tomorrow.",
    catalogEcho: { catalogId: "taoist365-desk-mug-sand", echoLine: "Sand mug." },
  },
  {
    breathLine: "Notebook open.",
    roomState: "Chair half out.",
    lingerObject: "Pen cap off.",
    shareableLine: "Half a page is fine.",
    catalogEcho: { catalogId: "taoist365-layflat-notebook", echoLine: "Layflat notebook." },
  },
  {
    breathLine: "Towel on rail.",
    roomState: "Window cracked.",
    lingerObject: "Linen crooked.",
    shareableLine: "Laundry later.",
    catalogEcho: { catalogId: "taoist365-linen-napkin-raw", echoLine: "Linen napkin." },
  },
  {
    breathLine: "Fan low.",
    roomState: "Shadow on wall.",
    lingerObject: "Ash dish cool.",
    shareableLine: "Lights dim at nine.",
    catalogEcho: { catalogId: "taoist365-stone-smoke-dish", echoLine: "Smoke dish." },
  },
  {
    breathLine: "Tea poured.",
    roomState: "Screen dimmed.",
    lingerObject: "Cup rings dry.",
    shareableLine: "Tab stays open.",
    catalogEcho: { catalogId: "taoist365-night-teacup", echoLine: "Night cup." },
  },
  {
    breathLine: "Keyboard quiet.",
    roomState: "Hall light off.",
    lingerObject: "Paper stack uneven.",
    shareableLine: "No inbox logic.",
    catalogEcho: { catalogId: "taoist365-cotton-letter-sheets", echoLine: "Letter sheets." },
  },
  {
    breathLine: "Mail unread.",
    roomState: "Tray holds keys.",
    lingerObject: "Oak tray scratched.",
    shareableLine: "Shelf unchanged.",
    catalogEcho: { catalogId: "taoist365-oak-tray-narrow", echoLine: "Oak tray." },
  },
  {
    breathLine: "Battery mid.",
    roomState: "WiFi steady.",
    lingerObject: "Cable on floor.",
    shareableLine: "Bookmark works.",
    catalogEcho: { catalogId: "taoist365-desk-mug-sand", echoLine: "Desk mug." },
  },
  {
    breathLine: "Trash out.",
    roomState: "Fridge hum.",
    lingerObject: "Magnet crooked.",
    shareableLine: "Ordinary Tuesday.",
    catalogEcho: { catalogId: "taoist365-layflat-notebook", echoLine: "Notebook." },
  },
  {
    breathLine: "Shoes by door.",
    roomState: "Coat one hook.",
    lingerObject: "Umbrella dry.",
    shareableLine: "Rain stopped.",
    catalogEcho: { catalogId: "taoist365-cotton-letter-sheets", echoLine: "Cotton sheets." },
  },
  {
    breathLine: "Cursor blink.",
    roomState: "Tabs: four.",
    lingerObject: "PDF pinned.",
    shareableLine: "Scroll optional.",
    catalogEcho: { catalogId: "taoist365-night-teacup", echoLine: "Teacup." },
  },
  {
    breathLine: "Water glass.",
    roomState: "Night mode on.",
    lingerObject: "Phone facedown.",
    shareableLine: "Alarm set.",
    catalogEcho: { catalogId: "taoist365-desk-mug-sand", echoLine: "Mug." },
  },
  {
    breathLine: "Heat clicks.",
    roomState: "Radiator ticks.",
    lingerObject: "Sock on chair.",
    shareableLine: "Winter ordinary.",
    catalogEcho: { catalogId: "taoist365-linen-napkin-raw", echoLine: "Linen." },
  },
  {
    breathLine: "Birds outside.",
    roomState: "Sun on sill.",
    lingerObject: "Plant watering due.",
    shareableLine: "Calendar blank.",
    catalogEcho: { catalogId: "taoist365-stone-smoke-dish", echoLine: "Stone dish." },
  },
  {
    breathLine: "Printer idle.",
    roomState: "Paper low.",
    lingerObject: "Stapler shifted.",
    shareableLine: "Office closed.",
    catalogEcho: { catalogId: "taoist365-oak-tray-narrow", echoLine: "Tray." },
  },
  {
    breathLine: "Kettle again.",
    roomState: "Same mug.",
    lingerObject: "Spoon in sink.",
    shareableLine: "Repeat day.",
    catalogEcho: { catalogId: "taoist365-maple-paperweight", echoLine: "Paperweight." },
  },
];
