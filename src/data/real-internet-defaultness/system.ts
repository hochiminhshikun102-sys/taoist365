import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";
import { backgroundSiteRealityLine } from "./background-site-reality";
import { defaultBrowserPlaceLine } from "./default-browser-place";
import { internetPlainnessLine } from "./internet-plainness-runtime";
import { nonPerformativeInternetLine } from "./non-performative-presence";
import { ordinaryPresenceLine } from "./ordinary-url-runtime";

export type RealInternetDefaultnessBundle = {
  dayKey: string;
  ordinaryPresenceLine: string;
  defaultBrowserPlaceLine: string;
  nonPerformativeInternetLine: string;
  backgroundSiteRealityLine: string;
  internetPlainnessLine: string;
};

export function resolveRealInternetDefaultnessBundle(
  structuralSilence: StructuralSilenceBundle,
): RealInternetDefaultnessBundle {
  const dayKey = structuralSilence.dayKey;
  void dailyIndex(`${dayKey}:rid`, 30);
  return {
    dayKey,
    ordinaryPresenceLine: ordinaryPresenceLine(),
    defaultBrowserPlaceLine: defaultBrowserPlaceLine(),
    nonPerformativeInternetLine: nonPerformativeInternetLine(),
    backgroundSiteRealityLine: backgroundSiteRealityLine(),
    internetPlainnessLine: internetPlainnessLine(),
  };
}
