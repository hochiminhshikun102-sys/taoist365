import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { experienceRoutes } from "@/config/experience-routes";
import { healingHalls, healingModules } from "@/config/healing-ecosystem";
import { locales, localizedStaticPaths, localePath } from "@/config/locales";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.metadataBase.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = ["", "/objects", "/windkeep", "/quiet-receiving", "/desk", "/inquiry", "/guidance", "/guidance/session", "/rituals", "/healing", "/live"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const ritualPaths = experienceRoutes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const healingPaths = healingHalls.map((hall) => ({
    url: `${base}${hall.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const healingModulePaths = healingModules.map((module) => ({
    url: `${base}/healing/${module.hall}/${module.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  const localizedPaths = locales.flatMap((locale) =>
    localizedStaticPaths.map((path) => ({
      url: `${base}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 0.92 : 0.58,
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, `${base}${localePath(item, path)}`])),
      },
    })),
  );

  return [...staticPaths, ...ritualPaths, ...healingPaths, ...healingModulePaths, ...localizedPaths];
}
