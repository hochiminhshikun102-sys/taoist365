/**
 * Documentary-style domestic photos (Unsplash) — ordinary American-adjacent interiors, not products or mystic wallpaper.
 * Credits link to photographer pages per Unsplash guidelines.
 */
export interface LivingPhotoRef {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  creditHref: string;
}

function u(photoId: string, w = 960): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&q=78`;
}

/** Homepage “Living room” strip — three quiet room states. */
export const homepageLivingStrip: readonly LivingPhotoRef[] = [
  {
    src: u("photo-1513694203232-719a280e022f"),
    alt: "Laptop open on a wooden desk beside a mug and lamp in a lived-in apartment workspace",
    caption: "Late desk: tab bar crowded, one window still honest.",
    credit: "Andrew Neel",
    creditHref: "https://unsplash.com/@andrewneel?utm_source=taoist365&utm_medium=referral",
  },
  {
    src: u("photo-1493663284031-b7e3aefcae8e"),
    alt: "Soft daylight across a simple sofa and cushions in an ordinary apartment living room",
    caption: "Afternoon apartment air—nothing staged for a portfolio.",
    credit: "Vincent Giersch",
    creditHref: "https://unsplash.com/@vincentgiersch?utm_source=taoist365&utm_medium=referral",
  },
  {
    src: u("photo-1509042239860-f550ce710b93"),
    alt: "Coffee cup on a worn wooden table with warm indoor light",
    caption: "Cup cooling mid-thought—kitchen wood remembers rings.",
    credit: "Nathan Dumlao",
    creditHref: "https://unsplash.com/@nate_dumlao?utm_source=taoist365&utm_medium=referral",
  },
];

/** Homepage “Things and traces” — replace lead-band product grid feel with ordinary residue. */
export const homepageThingsStrip: readonly LivingPhotoRef[] = [
  {
    src: u("photo-1544947950-fa07a98d237f"),
    alt: "Open book pages resting on a blanket in soft indoor light",
    caption: "Reading stopped where honesty ran out—not where design said stop.",
    credit: "Patrick Tomasso",
    creditHref: "https://unsplash.com/@impatrickt?utm_source=taoist365&utm_medium=referral",
  },
  {
    src: u("photo-1517842645767-c639b880efb6"),
    alt: "Notebook and pen on a simple desk surface",
    caption: "Notebook spine remembers panic and slower mornings alike.",
    credit: "Jan Kahánek",
    creditHref: "https://unsplash.com/@honzaouk?utm_source=taoist365&utm_medium=referral",
  },
  {
    src: u("photo-1556911220-e15c29b8af8a"),
    alt: "Kitchen counter near a window with everyday dishes and appliances",
    caption: "Ceramic lives nearer the glass than the photograph expects.",
    credit: "Becca Tapert",
    creditHref: "https://unsplash.com/@beccatapert?utm_source=taoist365&utm_medium=referral",
  },
];

export type RitualVisualKey = "drawALot" | "dailyGuidance" | "homeHarmony";

export const ritualLivingPhotos: Record<RitualVisualKey, LivingPhotoRef> = {
  drawALot: {
    src: u("photo-1522199710521-72d69614c702"),
    alt: "Laptop glow on a dark wood desk at night with a warm lamp",
    caption: "Night draw: half-read tab, house quiet elsewhere.",
    credit: "Andrew Neel",
    creditHref: "https://unsplash.com/@andrewneel?utm_source=taoist365&utm_medium=referral",
  },
  dailyGuidance: {
    src: u("photo-1493809842364-78817add93ff"),
    alt: "Morning light on a kitchen table with mug and simple breakfast scene",
    caption: "Morning guidance: ordinary counter light before the inbox wins.",
    credit: "Brigitte Tohm",
    creditHref: "https://unsplash.com/@brigittetohm?utm_source=taoist365&utm_medium=referral",
  },
  homeHarmony: {
    src: u("photo-1556020685-ae515ab96988"),
    alt: "Living room sofa with soft daylight through sheer curtains",
    caption: "Room harmony still crooked—cushions admit uneven weight.",
    credit: "Francesca Tosolini",
    creditHref: "https://unsplash.com/@francescotosolini?utm_source=taoist365&utm_medium=referral",
  },
};
