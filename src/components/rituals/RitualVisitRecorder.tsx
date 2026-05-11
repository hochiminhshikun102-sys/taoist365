"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { experienceRoutes } from "@/config/experience-routes";
import { PERSONAL_RESIDUE_KEYS } from "@/lib/personal-residue-keys";

/** Writes last opened ritual path/title to localStorage—no analytics, no streaks. */
export function RitualVisitRecorder() {
  const pathname = usePathname();

  useEffect(() => {
    const route = experienceRoutes.find((r) => r.path === pathname);
    if (!route) return;
    try {
      localStorage.setItem(PERSONAL_RESIDUE_KEYS.lastRitualPath, route.path);
      localStorage.setItem(PERSONAL_RESIDUE_KEYS.lastRitualTitle, route.title);
    } catch {
      // Ignore blocked storage.
    }
  }, [pathname]);

  return null;
}
