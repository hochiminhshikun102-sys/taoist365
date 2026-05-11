"use client";

import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

export function LongTabPresenceNote() {
  const { worldDensity, browserReality, structuralSilence, worldQuietPermanence } = useWorldRuntime();
  const { longTab, forgottenTab, backgroundBrowser } = browserReality;
  const qi = worldQuietPermanence.quietInternet;
  const h = dailyIndex(`${structuralSilence.dayKey}:ltab-qi`, 100);
  const quietExtra =
    h % 4 === 0
      ? qi.stableUrlRuntimeLine
      : h % 4 === 1
        ? qi.persistentPageRuntimeLine
        : h % 4 === 2
          ? qi.browserDefaultnessLine
          : qi.hostnamePermanenceLine;
  return (
    <div className="space-y-2 rounded-xl border border-border-subtle/8 bg-background/12 px-4 py-3 sm:px-5">
      <p className="text-[0.6rem] tracking-[0.06em] text-text-muted/42">Long tab</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/48">{worldDensity.longTabPresenceLine}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/46">{longTab.tabPersistenceLine}</p>
      <p className="text-[0.65rem] leading-[1.58] text-text-muted/44">{longTab.browserCornerPresence}</p>
      <p className="text-[0.65rem] leading-[1.58] text-text-muted/42">{forgottenTab.forgottenButAliveLine}</p>
      <p className="text-[0.65rem] leading-[1.58] text-text-muted/40">{backgroundBrowser.backgroundResidencyLine}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/44">{worldDensity.browserFamiliarityLine}</p>
      <p className="text-[0.62rem] leading-[1.55] text-text-muted/36">{quietExtra}</p>
    </div>
  );
}
