import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type RitualQuietWindow = {
  thinRitualEcho: boolean;
  ritualQuietLine: string | null;
};

export function resolveRitualQuietWindow(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): RitualQuietWindow {
  const h = dailyIndex(`${dayKey}:ritual-quiet:${age}`, 100);
  const thin = structural.ritualAbsence.drawTraceSparse || structural.structuralAbsence.hideRitualTrace;
  const thinRitualEcho = thin && h > 48;
  return {
    thinRitualEcho,
    ritualQuietLine: thinRitualEcho ? "Ritual traces stay back today—room does not rehearse itself." : null,
  };
}
