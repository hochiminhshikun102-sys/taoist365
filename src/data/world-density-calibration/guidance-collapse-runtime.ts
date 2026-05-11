import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export type GuidanceCollapse = {
  ultraThinSession: boolean;
  hideNoticingBlock: boolean;
  hideRoutesEntirely: boolean;
  hidePauseClosure: boolean;
};

export function resolveGuidanceCollapse(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
  inertia: WorldInertiaBundle,
): GuidanceCollapse {
  const h = dailyIndex(`${dayKey}:guid-collapse:${age}`, 100);
  const thin = structural.guidanceFragmentation.weatherOnlyMode || structural.guidanceFragmentation.singleLineMode;
  const ultraThinSession = thin && (h > 62 || !inertia.guidanceMinimal.showRoutes);

  return {
    ultraThinSession,
    hideNoticingBlock: ultraThinSession || structural.guidanceFragmentation.weatherOnlyMode,
    hideRoutesEntirely: ultraThinSession || !inertia.guidanceMinimal.showRoutes,
    hidePauseClosure: ultraThinSession && h > 70,
  };
}
