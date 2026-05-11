import { dailyIndex } from "@/lib/living-day-key";
import { resolveAmbientRevisitThickness } from "./ambient-revisit-thickness";
import { resolveBrowserMemoryThickening } from "./browser-memory-thickening";
import { resolveHostnameAgingRuntime } from "./hostname-aging-runtime";
import { resolveOldTabResidue } from "./old-tab-residue";
import { resolveQuietReturnRecognition } from "./quiet-return-recognition";

export type InternetSedimentMaturityBundle = {
  dayKey: string;
  sedimentMaturityLine: string;
  browserMemoryThickening: ReturnType<typeof resolveBrowserMemoryThickening>;
  hostnameAging: ReturnType<typeof resolveHostnameAgingRuntime>;
  ambientRevisitThickness: ReturnType<typeof resolveAmbientRevisitThickness>;
  oldTabResidue: ReturnType<typeof resolveOldTabResidue>;
  quietReturnRecognition: ReturnType<typeof resolveQuietReturnRecognition>;
};

export function resolveInternetSedimentMaturityBundle(dayKey: string): InternetSedimentMaturityBundle {
  void dailyIndex(`${dayKey}:ism`, 50);
  return {
    dayKey,
    sedimentMaturityLine: "沉积成熟：记得 hostname 和角落句子，多于记得功能列表。",
    browserMemoryThickening: resolveBrowserMemoryThickening(),
    hostnameAging: resolveHostnameAgingRuntime(),
    ambientRevisitThickness: resolveAmbientRevisitThickness(),
    oldTabResidue: resolveOldTabResidue(),
    quietReturnRecognition: resolveQuietReturnRecognition(),
  };
}
