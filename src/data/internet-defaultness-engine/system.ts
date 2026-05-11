import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { ambientOpenUrlLine } from "./ambient-open-url";
import { browserDefaultPresenceLine } from "./browser-default-presence";
import { hostnameFamiliarityEngineLine } from "./hostname-familiarity-engine";
import { longBrowserResidueLine } from "./long-browser-residue";
import { nonEventUrlMemoryLine } from "./non-event-url-memory";
import { passiveBookmarkRuntimeLine } from "./passive-bookmark-runtime";
import { quietPageReturnLine } from "./quiet-page-return";
import { siteBackgroundLongevityLine } from "./site-background-longevity";
import { urlShapeMemoryLine } from "./url-shape-memory";

export type InternetDefaultnessEngineBundle = {
  dayKey: string;
  urlDefaultnessBias: number;
  hostnameFamiliarityEngineLine: string;
  urlShapeMemoryLine: string;
  browserDefaultPresenceLine: string;
  ambientOpenUrlLine: string;
  passiveBookmarkRuntimeLine: string;
  longBrowserResidueLine: string;
  quietPageReturnLine: string;
  nonEventUrlMemoryLine: string;
  siteBackgroundLongevityLine: string;
};

export function resolveInternetDefaultnessEngineBundle(aging: WorldAgingBundle): InternetDefaultnessEngineBundle {
  const m = worldAgeStateMap[aging.ageStateId];
  const urlDefaultnessBias = Math.min(0.95, m.stillnessWeight * 0.52 + m.silenceWeight * 0.28);
  return {
    dayKey: aging.dayKey,
    urlDefaultnessBias,
    hostnameFamiliarityEngineLine: hostnameFamiliarityEngineLine(),
    urlShapeMemoryLine: urlShapeMemoryLine(),
    browserDefaultPresenceLine: browserDefaultPresenceLine(),
    ambientOpenUrlLine: ambientOpenUrlLine(),
    passiveBookmarkRuntimeLine: passiveBookmarkRuntimeLine(),
    longBrowserResidueLine: longBrowserResidueLine(),
    quietPageReturnLine: quietPageReturnLine(),
    nonEventUrlMemoryLine: nonEventUrlMemoryLine(),
    siteBackgroundLongevityLine: siteBackgroundLongevityLine(),
  };
}
