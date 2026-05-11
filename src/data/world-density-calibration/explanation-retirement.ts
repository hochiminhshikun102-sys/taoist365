import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type ExplanationRetirement = {
  retireObjectCatalogIntro: boolean;
  retireGuidanceStateExplainer: boolean;
  retireMailShelfWelcome: boolean;
  retireRitualTeachingTone: boolean;
  silentFamiliarityLine: string | null;
};

export function resolveExplanationRetirement(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): ExplanationRetirement {
  const s = dailyIndex(`${dayKey}:expl-ret:${age}`, 100);
  const min = structural.explanationFatigue;

  const retireObjectCatalogIntro = min.objects === "minimal" && s > 38;
  const retireGuidanceStateExplainer = min.guidance === "minimal" && s > 42;
  const retireMailShelfWelcome = min.mail === "minimal" && s > 40;
  const retireRitualTeachingTone = min.ritual === "minimal" && s > 44;

  const silentLine =
    retireObjectCatalogIntro || retireMailShelfWelcome
      ? "Some explanations have retired—default is that you already live here."
      : null;

  return {
    retireObjectCatalogIntro,
    retireGuidanceStateExplainer,
    retireMailShelfWelcome,
    retireRitualTeachingTone,
    silentFamiliarityLine: silentLine,
  };
}
