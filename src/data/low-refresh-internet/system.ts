import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { FatigueLevel } from "@/data/runtime-retirement-system/world-fatigue-runtime";
import { dailyIndex } from "@/lib/living-day-key";
import { resolveAmbientStaticRuntime } from "./ambient-static-runtime";
import { resolveBrowserReturnLag } from "./browser-return-lag";
import { resolveNonUpdatePresence } from "./non-update-presence";
import { resolveOldPagePresence } from "./old-page-presence";
import { resolvePassiveBrowserRefresh } from "./passive-browser-refresh";
import { resolveSlowRefreshRuntime } from "./slow-refresh-runtime";

export type LowRefreshInternetBundle = {
  dayKey: string;
  refreshLagLine: string;
  oldPageStillOpenLine: string;
  unchangedButAliveLine: string;
  lowRefreshComfortLine: string;
  slowRefresh: ReturnType<typeof resolveSlowRefreshRuntime>;
  ambientStatic: ReturnType<typeof resolveAmbientStaticRuntime>;
};

export function resolveLowRefreshInternetBundle(
  structuralSilence: StructuralSilenceBundle,
  fatigueLevel: FatigueLevel,
): LowRefreshInternetBundle {
  const dayKey = structuralSilence.dayKey;
  const h = dailyIndex(`${dayKey}:low-ref`, 100);
  const tired = fatigueLevel === "tired" || fatigueLevel === "resting" || fatigueLevel === "almostAbsent";
  const variant = h % 2 === 0 ? "地址栏没变，句子也懒得换。" : "像常年打开的静态页。";
  return {
    dayKey,
    refreshLagLine: resolveBrowserReturnLag().returnLagLine,
    oldPageStillOpenLine: resolveOldPagePresence().oldPageLine,
    unchangedButAliveLine: tired ? `内容几乎不动，地址还活着。${variant}` : `改动很少。${variant}`,
    lowRefreshComfortLine: resolveNonUpdatePresence().nonUpdateLine + " " + resolvePassiveBrowserRefresh().passiveRefreshLine,
    slowRefresh: resolveSlowRefreshRuntime(),
    ambientStatic: resolveAmbientStaticRuntime(),
  };
}
