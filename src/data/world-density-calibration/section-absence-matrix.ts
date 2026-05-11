import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type DensitySectionKey =
  | "home-material-cluster"
  | "home-low-signal-strip"
  | "home-human-rhythm-opening"
  | "daily-residual-inner"
  | "mail-density-band"
  | "objects-material-band"
  | "guidance-arrival-density-extra"
  | "desk-density-band";

export type SectionAbsenceMatrix = Record<DensitySectionKey, boolean>;

/** true = 今天该 section 缺席（世界不放出来），不是 loading。 */
export function resolveSectionAbsenceMatrix(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): SectionAbsenceMatrix {
  const base = dailyIndex(`${dayKey}:sec-abs:${age}`, 100);
  const pe = structural.pageEnergy;
  const thin = pe === "thin" || pe === "empty" || pe === "residual" || pe === "faded";

  const bump = thin ? 18 : 0;

  return {
    "home-material-cluster": base + bump > 72,
    "home-low-signal-strip": base + bump > 82 || !structural.ambientVisibility.showHomeLowSignalStrip,
    "home-human-rhythm-opening": base > 74 || structural.structuralAbsence.hideHomeAside,
    "daily-residual-inner": base > 70 || structural.structuralAbsence.hideDailyResidualBlock,
    "mail-density-band": base > 76,
    "objects-material-band": base > 71,
    "guidance-arrival-density-extra": base > 73,
    "desk-density-band": base > 75,
  };
}

export function sectionAbsent(matrix: SectionAbsenceMatrix, key: DensitySectionKey): boolean {
  return matrix[key] === true;
}
