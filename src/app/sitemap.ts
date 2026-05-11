import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { experienceRoutes } from "@/config/experience-routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.metadataBase.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = ["", "/objects", "/desk", "/inquiry", "/guidance", "/guidance/session", "/rituals"].map((path) => ({
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

  return [...staticPaths, ...ritualPaths];
}
