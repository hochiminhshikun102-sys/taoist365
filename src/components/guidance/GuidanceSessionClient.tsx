"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  guidanceEntryStates,
  getGuidanceEntryById,
  guidanceRhythm,
  guidanceRouting,
  pauseLanguage,
  sessionWeatherById,
  type GuidanceEntryState,
} from "@/data/guidance-operating-layer/system";
import { microPresenceForIndex, microPresenceFragments } from "@/data/guidance-operating-layer/micro-presence";
import { guidanceTemporalContinuity } from "@/data/living-presence-runtime/system";
import { guidanceRhythmContinuity } from "@/data/human-rhythm-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Phase = "select" | "pause" | "routes";

function hashSeed(): number {
  if (typeof window === "undefined") return 0;
  return Math.floor(Date.now() / 86_400_000) % microPresenceFragments.length;
}

export function GuidanceSessionClient() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("select");
  const [entry, setEntry] = useState<GuidanceEntryState | null>(null);
  const [linesShown, setLinesShown] = useState(1);
  const [pauseIdx, setPauseIdx] = useState(0);
  const [microIdx, setMicroIdx] = useState(0);

  const stateParam = searchParams.get("state");
  const {
    presence,
    rhythm,
    aging,
    inertia,
    lowSignalHumanity,
    structuralSilence,
    worldDensity,
    worldRegulation,
    browserReality,
    runtimeRetirement,
    antiSystemSelfAwareness,
    worldQuietPermanence,
    worldPostProductContinuity,
    worldAiNativeInfrastructure,
  } = useWorldRuntime();
  const gd = worldQuietPermanence.guidanceDissolution;
  const gq = worldPostProductContinuity.guidanceQuiet;
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;
  const gps = browserReality.guidancePassiveSurface;
  const gr = runtimeRetirement.guidanceRetirement;
  const roomClimateNote = useMemo(() => {
    if (!entry) return null;
    return guidanceTemporalContinuity(presence.worldId, entry.weatherId, presence.dayKey);
  }, [entry, presence.worldId, presence.dayKey]);
  const roomLifeRhythmNote = useMemo(() => {
    if (!entry) return null;
    return guidanceRhythmContinuity(presence.worldId, entry.weatherId, presence.dayKey);
  }, [entry, presence.worldId, presence.dayKey]);

  useEffect(() => {
    if (!stateParam) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const pre = getGuidanceEntryById(stateParam);
      if (!pre) return;
      setEntry(pre);
      setPhase("pause");
      setLinesShown(1);
    });
    return () => {
      cancelled = true;
    };
  }, [stateParam]);

  const weather = useMemo(() => {
    if (!entry) return null;
    return sessionWeatherById[entry.weatherId];
  }, [entry]);

  const objectLine = useMemo(() => {
    if (!entry?.objectCoordinateKey) return null;
    return guidanceRouting.objectCoordinates[entry.objectCoordinateKey];
  }, [entry]);

  const select = useCallback((e: GuidanceEntryState) => {
    setEntry(e);
    setLinesShown(1);
    setPhase("pause");
  }, []);

  const clear = useCallback(() => {
    setEntry(null);
    setPhase("select");
    setLinesShown(1);
  }, []);

  const lowSignalMax = lowSignalHumanity.guidanceFalloff.allowSecondRound ? 2 : 1;
  const fragmentMax = structuralSilence.guidanceFragmentation.singleLineMode ? 1 : 2;
  const gc = worldDensity.guidanceCollapse;
  let maxLinesRaw = Math.min(guidanceRhythm.maxNoticingLines, inertia.guidanceMinimal.maxLines, lowSignalMax, fragmentMax);
  if (worldRegulation.crossRuntimeSuppression.tightenGuidanceCollapse) {
    maxLinesRaw = Math.min(maxLinesRaw, 1);
  }
  if (worldRegulation.narrativeOverflow.overflowAuditLine) {
    maxLinesRaw = Math.min(maxLinesRaw, 1);
  }
  if (gps.maxNoticingHardCap !== null) {
    maxLinesRaw = Math.min(maxLinesRaw, gps.maxNoticingHardCap);
  }
  if (gr.forceZeroNoticing) {
    maxLinesRaw = 0;
  }
  if (gd.noticingUpperBound !== null) {
    maxLinesRaw = Math.min(maxLinesRaw, gd.noticingUpperBound);
  }
  if (gq.noticingHardCap !== null) {
    maxLinesRaw = Math.min(maxLinesRaw, gq.noticingHardCap);
  }
  if (st.guidanceStackWeatherOnly) {
    maxLinesRaw = 0;
  }
  const maxLines = gc.hideNoticingBlock ? 0 : maxLinesRaw;
  const skipRoutes =
    gc.hideRoutesEntirely ||
    gps.hideRoutes ||
    gr.ultraMinimalRoom ||
    gd.dissolveRoutes ||
    gq.forceRoutesRetirement ||
    st.guidanceStackHardNoRoutes;
  const hidePauseBlock =
    gc.hidePauseClosure ||
    gps.hideClosureBlock ||
    gd.dissolveClosureCopy ||
    gq.hideSoftClosure ||
    st.guidanceStackHardNoClosure;

  const showMoreLine = useCallback(() => {
    setLinesShown((n) => Math.min(maxLines, n + 1));
  }, [maxLines]);

  const goRoutes = useCallback(() => {
    const salt = entry?.id.length ?? 0;
    setPauseIdx((hashSeed() + salt) % pauseLanguage.endings.length);
    setMicroIdx((hashSeed() + 3 + salt) % microPresenceFragments.length);
    setPhase("routes");
  }, [entry]);

  const visibleLines = entry ? entry.noticingLines.slice(0, Math.min(linesShown, maxLines)) : [];

  const guidanceBreathThin = ["thinner", "faded", "almostStill", "residualOnly"].includes(
    worldRegulation.breathing.breathingMode,
  );
  const guidanceFootAttention = worldRegulation.attentionWithdrawal.withdrawalStrength > 0.52;
  const guidanceFootAntiPerf = dailyIndex(`${structuralSilence.dayKey}:guidance-anti-perf`, 100) % 17 === 0;
  const showGuidanceRegulationFoot =
    guidanceBreathThin || guidanceFootAttention || guidanceFootAntiPerf || antiSystemSelfAwareness.showAntiMetaFooter;

  return (
    <div className="space-y-10">
      {phase === "select" ? (
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/52">Which feeling is nearest</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {guidanceEntryStates.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => select(e)}
                className="min-h-[3.25rem] rounded-lg border border-border-subtle bg-surface px-4 py-3 text-left text-sm leading-snug text-text-secondary transition hover:border-border-default hover:bg-white active:scale-[0.99]"
              >
                {e.label}
              </button>
            ))}
          </div>
          <p className="mt-8 text-xs leading-7 text-text-muted/55">
            <Link href="/guidance" className="underline-offset-4 hover:text-text-secondary hover:underline">
              Back to arrival
            </Link>
            {" · "}
            <Link href="/" className="underline-offset-4 hover:text-text-secondary hover:underline">
              {guidanceRhythm.homeCta}
            </Link>
          </p>
        </div>
      ) : null}

      {phase === "pause" && entry ? (
        gr.ultraMinimalRoom ? (
          <div className="taoist-ritual-shell rounded-2xl border border-border-subtle bg-surface px-5 py-6 sm:px-7">
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/50">Room weather</p>
            {weather ? (
              <p className="mt-2 text-xs text-text-muted/58">
                <span className="text-text-muted/70">{weather.label} — </span>
                {weather.roomLine}
              </p>
            ) : null}
            {!gr.hideEntryLabel ? <p className="mt-4 text-xs text-text-muted/52">{entry.label}</p> : null}
            <p className="mt-5 text-sm leading-7 text-text-muted/60">{browserReality.reopen.reopenLine}</p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex rounded-lg border border-border-subtle/22 px-4 py-2.5 text-xs text-text-muted transition hover:text-text-secondary"
              >
                {gps.minimalExitLabel}
              </Link>
            </div>
          </div>
        ) : (
          <div className="taoist-ritual-shell rounded-2xl border border-border-subtle bg-surface px-5 py-6 sm:px-7">
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/50">Room weather</p>
            {weather ? (
              <p className="mt-2 text-xs text-text-muted/58">
                <span className="text-text-muted/70">{weather.label} — </span>
                {weather.roomLine}
              </p>
            ) : null}
            {structuralSilence.guidanceFragmentation.weatherOnlyMode ? (
              <p className="mt-3 text-[0.68rem] leading-6 text-text-muted/50">{lowSignalHumanity.guidanceFalloff.line}</p>
            ) : null}
            {roomClimateNote &&
            !worldDensity.mutualExclusion.suppressGuidanceResidueLayer &&
            !gps.hideClimateRhythmLayers ? (
              <p className="mt-3 text-[0.68rem] leading-6 text-text-muted/50">
                {roomClimateNote}
                <span className="block pt-1 text-[0.62rem] text-text-muted/40">
                  Same day as Home, not memory of you.
                </span>
              </p>
            ) : null}
            {roomLifeRhythmNote &&
            !worldDensity.mutualExclusion.suppressHumanTraceDensity &&
            !gps.hideClimateRhythmLayers ? (
              <p className="mt-3 text-[0.68rem] leading-6 text-text-muted/52">
                {roomLifeRhythmNote}
                <span className="block pt-1 text-[0.62rem] text-text-muted/40">
                  Life nearby · {rhythm.atmosphereSummary}
                </span>
              </p>
            ) : null}
            {!worldDensity.explanationRetirement.retireGuidanceStateExplainer &&
            !worldRegulation.understatement.guidanceUnderstatement ? (
              <p className="mt-3 text-[0.68rem] leading-6 text-text-muted/48">{aging.guidanceFatigueLine}</p>
            ) : null}
            {worldRegulation.narrativeOverflow.overflowAuditLine ? (
              <p className="mt-3 text-[0.62rem] leading-6 text-text-muted/44">{worldRegulation.narrativeOverflow.overflowAuditLine}</p>
            ) : null}
            {!structuralSilence.guidanceFragmentation.weatherOnlyMode && maxLines > 0 ? (
              <p className="mt-5 text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/48">Noticing</p>
            ) : null}
            <p className="mt-1 text-xs text-text-muted/55">{entry.label}</p>
            {gps.passiveOpenGuidance && maxLines === 0 ? (
              <p className="mt-5 text-sm leading-7 text-text-muted/62">{browserReality.reopen.noNeedToFinishLine}</p>
            ) : null}
            {!structuralSilence.guidanceFragmentation.weatherOnlyMode && maxLines > 0 ? (
              <ul className="mt-5 space-y-5">
                {visibleLines.map((line) => (
                  <li key={line} className="text-base leading-8 text-text-secondary sm:text-[1.05rem] sm:leading-9">
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {linesShown < maxLines && maxLines > 0 && !gps.hideContinueReflection ? (
                <button
                  type="button"
                  onClick={showMoreLine}
                  className="rounded-lg border border-border-subtle bg-surface px-4 py-2.5 text-left text-xs text-text-secondary transition hover:border-border-default hover:bg-white active:scale-[0.99]"
                >
                  {guidanceRhythm.continueReflectionCta}
                </button>
              ) : null}
              {skipRoutes ? (
                <Link
                  href="/"
                  className="rounded-lg border border-border-subtle/22 px-4 py-2.5 text-left text-xs text-text-muted transition hover:text-text-secondary"
                >
                  {gps.passiveOpenGuidance ? gps.minimalExitLabel : "Back to site"}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={goRoutes}
                  className="rounded-lg border border-border-subtle/26 px-4 py-2.5 text-left text-xs text-text-muted transition hover:text-text-secondary"
                >
                  {lowSignalHumanity.guidanceFalloff.allowRoute ? guidanceRhythm.proceedToRoutesCta : "Enough for now"}
                </button>
              )}
            </div>
            {!hidePauseBlock ? (
              <p className="mt-6 text-[0.65rem] leading-6 text-text-muted/48">{pauseLanguage.routingFooter}</p>
            ) : null}
            {!hidePauseBlock ? (
              <p className="mt-2 text-[0.65rem] leading-6 text-text-muted/46">{lowSignalHumanity.guidanceFalloff.line}</p>
            ) : null}
          </div>
        )
      ) : null}

      {phase === "routes" && entry ? (
        <div className="space-y-8">
          <div className="taoist-ritual-shell rounded-2xl border border-border-subtle bg-surface px-5 py-6 sm:px-7">
            <p className="text-sm leading-7 text-text-secondary">
              {inertia.guidanceMinimal.showRoutes && structuralSilence.ambientVisibility.showGuidanceRoutes
                ? guidanceRouting.softIntro
                : inertia.guidanceMinimal.minimalNoticing}
            </p>
            {inertia.guidanceMinimal.showRoutes && structuralSilence.ambientVisibility.showGuidanceRoutes ? (
              <ul className="mt-5 space-y-2.5">
                {entry.softRoutes.map((r) => (
                  <li key={r.href + r.label}>
                    <Link
                      href={r.href}
                      className="text-sm text-text-secondary underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {objectLine ? (
              <p className="mt-8 text-sm leading-8 text-text-muted/78">
                Objects on this domain sometimes answer plainly—{objectLine}—not a cart prompt.
              </p>
            ) : null}
          </div>

          <div className="taoist-quiet-field rounded-xl border border-border-subtle bg-surface px-5 py-5 sm:px-6">
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/50">Pause</p>
            <p className="mt-3 text-sm leading-8 text-text-secondary">{pauseLanguage.endings[pauseIdx]}</p>
            <p className="mt-4 text-sm leading-7 text-text-muted/72">{microPresenceForIndex(microIdx)}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clear}
              className="rounded-lg border border-border-subtle/28 px-4 py-2.5 text-xs text-text-muted transition hover:text-text-secondary"
            >
              {guidanceRhythm.newStateCta}
            </button>
            <Link
              href="/"
              className="rounded-lg border border-border-subtle/22 px-4 py-2.5 text-xs text-text-muted transition hover:text-text-secondary"
            >
              {guidanceRhythm.homeCta}
            </Link>
            <Link
              href="/guidance"
              className="rounded-lg border border-border-subtle/18 px-4 py-2.5 text-xs text-text-muted transition hover:text-text-secondary"
            >
              Arrival
            </Link>
          </div>
        </div>
      ) : null}

      {showGuidanceRegulationFoot ? (
        <div className="border-t border-border-subtle/14 pt-8">
          {guidanceBreathThin ? (
            <p className="text-[0.62rem] leading-[1.58] text-text-muted/38">{worldRegulation.breathing.worldBreathingLine}</p>
          ) : null}
          {guidanceFootAttention ? (
            <p className="mt-2 text-[0.62rem] leading-[1.58] text-text-muted/38">
              {worldRegulation.attentionWithdrawal.nonUrgencyLine}
            </p>
          ) : null}
          {guidanceFootAntiPerf ? (
            <p className="mt-2 text-[0.6rem] leading-[1.55] text-text-muted/34">{worldRegulation.antiPerformanceReminder}</p>
          ) : null}
          {antiSystemSelfAwareness.showAntiMetaFooter ? (
            <p className="mt-2 text-[0.6rem] leading-[1.55] text-text-muted/34">{antiSystemSelfAwareness.antiMetaReminder}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
