"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LivingAtmosphereVeil } from "@/components/ritual/LivingAtmosphereVeil";
import { PassiveReturnResidue } from "@/components/ritual/PassiveReturnResidue";

type VeilTone = "default" | "evening" | "morning" | "afternoon";

const pathTone: Record<string, VeilTone> = {
  "/rituals/draw-a-lot": "evening",
  "/rituals/daily-guidance": "morning",
  "/rituals/home-harmony": "afternoon",
};

/**
 * Shared air, light, and grain for all `/rituals/*` routes so those pages
 * read as the same site as the homepage—not a separate product skin.
 */
export function ExperienceContinuityShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const tone = pathTone[pathname] ?? "default";

  return (
    <div className="relative isolate min-h-full w-full flex-1 bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.64),transparent_44%),radial-gradient(circle_at_82%_18%,rgba(214,219,225,0.34),transparent_42%),linear-gradient(180deg,rgba(240,242,245,0.98)_0%,rgba(236,239,243,0.9)_48%,rgba(229,233,238,0.76)_100%)]" />
      <LivingAtmosphereVeil tone={tone} />
      <div className="relative z-[1] flex w-full min-h-0 flex-col">
        <div className="lived-room-frame runtime-room-shell flex min-h-0 flex-1 flex-col">{children}</div>
        <PassiveReturnResidue />
      </div>
    </div>
  );
}
