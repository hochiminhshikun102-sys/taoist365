"use client";

import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Surface = "home" | "objects" | "guidance-session";

const THIN_BREATH: ReadonlySet<string> = new Set(["thinner", "faded", "almostStill", "residualOnly"]);

type Props = {
  surface: Surface;
};

/** Deterministic low-frequency lines: breathing, attention withdrawal, anti-performance — not a feed. */
export function WorldRegulationPresenceStrip({ surface }: Props) {
  const { structuralSilence, worldRegulation, antiSystemSelfAwareness } = useWorldRuntime();
  const { breathing, attentionWithdrawal, antiPerformanceReminder, worldRestraintLine } = worldRegulation;
  const h = dailyIndex(`${structuralSilence.dayKey}:wr-strip:${surface}`, 100);
  const thin = THIN_BREATH.has(breathing.breathingMode);
  const showAntiPerf = h % 15 === 0;
  const attnLine =
    attentionWithdrawal.withdrawalStrength > 0.5
      ? (
          [
            attentionWithdrawal.nonUrgencyLine,
            attentionWithdrawal.lowPressurePresenceLine,
            attentionWithdrawal.backgroundPersistenceLine,
          ] as const
        )[h % 3]
      : null;

  return (
    <div className="space-y-2 text-[0.62rem] leading-[1.58] text-text-muted/42">
      {thin ? <p>{breathing.worldBreathingLine}</p> : null}
      {breathing.breathingMode === "residualOnly" ? <p className="text-text-muted/38">{worldRestraintLine}</p> : null}
      {attnLine ? <p>{attnLine}</p> : null}
      {showAntiPerf ? <p className="text-text-muted/38">{antiPerformanceReminder}</p> : null}
      {antiSystemSelfAwareness.showAntiMetaFooter ? (
        <p className="text-text-muted/36">{antiSystemSelfAwareness.antiMetaReminder}</p>
      ) : null}
    </div>
  );
}
