import { commerceCollections, commerceObjects } from "@/config/operational-commerce";
import { experienceRoutes } from "@/config/experience-routes";
import { healingHalls, healingModules } from "@/config/healing-ecosystem";

export const seasonalThemes = [
  {
    id: "spring-window",
    title: "Spring window",
    summary: "Wind bells, light textiles, and small shelf objects for the first open-window days.",
    href: "/collections/wind-objects",
  },
  {
    id: "summer-room",
    title: "Summer room",
    summary: "Light objects, low shadows, and pieces that do not make a warm room feel heavier.",
    href: "/collections/seasonal-collections",
  },
  {
    id: "autumn-desk",
    title: "Autumn desk",
    summary: "Desk pieces, trays, cups, and warm light surfaces for longer evenings.",
    href: "/collections/quiet-desk",
  },
  {
    id: "winter-warm-light",
    title: "Winter warm light",
    summary: "Small lights, quiet wood, ceramic, and room objects for darker afternoons.",
    href: "/collections/ritual-objects",
  },
  {
    id: "wind-season",
    title: "Wind season",
    summary: "Hanging objects, window movement, and slow bell surfaces without festival pressure.",
    href: "/collections/wind-objects",
  },
] as const;

export const subscriptionSurface = {
  title: "Quiet subscription",
  body: "Low-frequency mail for new objects, seasonal edits, and practical shop notes. No popups, no reminders, no cadence pressure.",
  placeholder: "you@example.com",
};

export const brandStorySurface = {
  title: "Brand story",
  body: "Dohara keeps objects close to ordinary rooms: window air, desk use, shelf placement, human mail, and slow replacement of better material when it arrives.",
  href: "/inquiry",
};

export const socialContinuityLinks = [
  { label: "Instagram", href: "https://instagram.com/taoist365" },
  { label: "Pinterest", href: "https://pinterest.com/taoist365" },
  { label: "Future media", href: "/inquiry" },
] as const;

export function newArrivalObjects(limit = 8) {
  return commerceObjects
    .map((object, index) => ({ object, index }))
    .sort((a, b) => b.index - a.index)
    .slice(0, limit)
    .map((entry) => entry.object);
}

export function quietPopularObjects(limit = 6) {
  return [...commerceObjects]
    .sort((a, b) => {
      const aWind = a.collection === "wind-objects" ? 1 : 0;
      const bWind = b.collection === "wind-objects" ? 1 : 0;
      return bWind - aWind || a.stock - b.stock || b.priceCents - a.priceCents;
    })
    .slice(0, limit);
}

export function frontstageSearchEntries() {
  const productEntries = commerceObjects.map((object) => ({
    id: `object-${object.id}`,
    type: "Object",
    title: object.title,
    summary: `${object.subtitle} ${object.atmosphereLine}`,
    href: `/objects/${object.id}`,
    image: object.media.hero,
  }));

  const collectionEntries = commerceCollections.map((collection) => ({
    id: `collection-${collection.id}`,
    type: "Collection",
    title: collection.title,
    summary: `${collection.summary} ${collection.entry}`,
    href: `/collections/${collection.id}`,
    image: commerceObjects.find((object) => object.collection === collection.id)?.media.hero,
  }));

  const ritualEntries = experienceRoutes.map((route) => ({
    id: `ritual-${route.path}`,
    type: "Ritual",
    title: route.title,
    summary: route.purpose,
    href: route.path,
    image: undefined,
  }));

  const healingEntries = [
    {
      id: "healing-index",
      type: "Healing",
      title: "Healing",
      summary: "Seven quiet halls and forty-five light browser modules.",
      href: "/healing",
      image: undefined,
    },
    ...healingHalls.map((hall) => ({
      id: `healing-hall-${hall.id}`,
      type: "Healing Hall",
      title: hall.title,
      summary: `${hall.hero} ${hall.summary}`,
      href: hall.href,
      image: undefined,
    })),
    ...healingModules.map((module) => ({
      id: `healing-module-${module.id}`,
      type: "Healing Module",
      title: module.title,
      summary: `${module.originalName} ${module.summary} ${module.climate}`,
      href: `/healing/${module.hall}#${module.id}`,
      image: undefined,
    })),
  ];

  return [...productEntries, ...collectionEntries, ...ritualEntries, ...healingEntries];
}
