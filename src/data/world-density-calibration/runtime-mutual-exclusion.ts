import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type RuntimeMutualExclusion = {
  /** 压低 guidance 残留句权重（组件可读作少叠一句） */
  suppressGuidanceResidueLayer: boolean;
  /** 压低 mail 沉积句叠层 */
  suppressMailSedimentLayer: boolean;
  /** 压低人类痕迹旁白密度 */
  suppressHumanTraceDensity: boolean;
  /** 压低 ritual 旁迹 */
  suppressRitualTraceDensity: boolean;
};

export function resolveRuntimeMutualExclusion(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
  inertia: WorldInertiaBundle,
): RuntimeMutualExclusion {
  const h = dailyIndex(`${dayKey}:mutex:${age}`, 100);
  const strongObjectSilence = structural.objectFade.foregroundObjects.length < 3;
  const highInertia = inertia.silenceDensity.explanatoryDensity === "minimal";
  const heavyAir = dailyIndex(`${dayKey}:room-air-heavy`, 10) > 6;

  return {
    suppressGuidanceResidueLayer: heavyAir && h > 40,
    suppressMailSedimentLayer: strongObjectSilence && h > 35,
    suppressHumanTraceDensity: highInertia && h > 38,
    suppressRitualTraceDensity: structural.ritualAbsence.drawTraceSparse && h > 42,
  };
}
