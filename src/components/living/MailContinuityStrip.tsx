"use client";

import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

export function MailContinuityStrip() {
  const { structuralSilence, worldMaturity, worldQuietPermanence, worldAiNativeInfrastructure } = useWorldRuntime();
  const h = dailyIndex(`${structuralSilence.dayKey}:mail-cont`, 100);
  const t = worldMaturity.trueMail;
  const ma = worldQuietPermanence.mailThreadAging;
  const lines = [
    t.longThreadSedimentLine,
    t.slowReplyRealityLine,
    t.unevenCorrespondenceLine,
    t.shelfRevisitLine,
    t.mailPausesLine,
    t.oldThreadReopenLine,
  ];
  const pick = lines[h % lines.length]!;
  const agingLines = [
    ma.oldThreadRuntimeLine,
    ma.slowReopenRuntimeLine,
    ma.subjectFamiliarityLine,
    ma.mailDefaultingLine,
    ma.unevenReplyRuntimeLine,
    ma.shelfAgingRuntimeLine,
    ma.threadBackgroundingLine,
    ma.quietHumanReplyLine,
  ];
  const agingPick = agingLines[h % agingLines.length]!;
  const thinMailSecond =
    worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning.combinedProseBias > 0.52;
  return (
    <div className="mt-8 rounded-xl border border-border-subtle/14 bg-background/30 px-5 py-4">
      <p className="text-[0.65rem] uppercase tracking-[0.1em] text-text-muted/48">Slow thread</p>
      <p className="mt-2 text-[0.62rem] leading-[1.58] text-text-muted/44">{pick}</p>
      {h % 2 === 0 && !thinMailSecond ? (
        <p className="mt-2 text-[0.58rem] leading-[1.52] text-text-muted/38">{agingPick}</p>
      ) : null}
      <p className="mt-2 text-[0.58rem] leading-[1.5] text-text-muted/36">{t.noServicePipelineLine}</p>
    </div>
  );
}
