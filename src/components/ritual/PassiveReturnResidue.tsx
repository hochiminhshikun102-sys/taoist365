"use client";

import { useMemo } from "react";
import { continuationLanguage } from "@/language/continuity-copy";
import { siteConfig } from "@/config/site";
import { rotateByAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";

/** Faint foot lines: ambient rotation plus explicit “no attention hooks” boundary. */
export function PassiveReturnResidue() {
  const anchor = useAmbientAnchor();
  const line = useMemo(
    () => rotateByAnchor([...continuationLanguage.ambientFootHints], anchor)[0],
    [anchor],
  );

  return (
    <div className="mx-auto max-w-2xl px-5 pb-8 pt-0.5 pl-6 text-left sm:max-w-3xl sm:px-10 sm:pl-[2.35rem]">
      <p className="text-[0.68rem] leading-[1.55] text-text-muted/40">{line}</p>
      <p className="mt-2 text-[0.62rem] leading-[1.55] text-text-muted/34">{siteConfig.lightDependencyFootLine}</p>
      <p className="mt-2 text-[0.58rem] leading-[1.55] text-text-muted/30">{siteConfig.browserReturnGravityLine}</p>
    </div>
  );
}
