"use client";

import { useMemo, useState } from "react";
import { stepTimingTokens } from "@/design-system/tokens/step-timing";
import { RitualContinuityFooter } from "@/components/ritual/RitualContinuityFooter";
import { MyPathPresence } from "@/components/ritual/MyPathPresence";
import { RitualShelf } from "@/components/ritual/RitualShelf";
import { FlowCorner } from "@/components/ritual/FlowCorner";
import { SeasonalPresence } from "@/components/ritual/SeasonalPresence";
import { QuietHumanPresence } from "@/components/ritual/QuietHumanPresence";
import { OffFramePresence } from "@/components/ritual/OffFramePresence";
import { dailyGuidanceContent } from "@/data/guidance-content/system";
import { ritualObjectLayer } from "@/data/ritual-object-layer/system";
import { RitualLivingSlice } from "@/components/living/RitualLivingSlice";
import { GentleOrderingFoot } from "@/components/commerce/GentleOrderingFoot";
import { gentleCommercePresence } from "@/data/gentle-commerce-presence/system";
import { pickInventory } from "@/data/ritual-inventory/system";
import { dailyIndex, getLivingDayKey } from "@/lib/living-day-key";

export function DailyGuidanceLiveExperience() {
  const [phase, setPhase] = useState<
    "arrival" | "guidance" | "action" | "pause" | "completion" | "return"
  >("arrival");

  const guidanceFocus = useMemo(() => {
    const key = getLivingDayKey(new Date());
    return dailyGuidanceContent.focusLines[dailyIndex(`${key}-focus`, dailyGuidanceContent.focusLines.length)];
  }, []);

  const gentleAction = useMemo(() => {
    const key = getLivingDayKey(new Date());
    return dailyGuidanceContent.actionLines[dailyIndex(`${key}-action`, dailyGuidanceContent.actionLines.length)];
  }, []);

  const pausePromptLine = useMemo(() => {
    const key = getLivingDayKey(new Date());
    return dailyGuidanceContent.pausePrompts[
      dailyIndex(`${key}-pause`, dailyGuidanceContent.pausePrompts.length)
    ];
  }, []);

  const buttonLabel = "Next";

  const onAdvance = () => {
    if (phase === "arrival") {
      setPhase("guidance");
      return;
    }

    if (phase === "guidance") {
      setPhase("action");
      return;
    }

    if (phase === "action") {
      setPhase("pause");
      return;
    }

    if (phase === "pause") {
      setPhase("completion");
      return;
    }

    if (phase === "completion") {
      setPhase("return");
    }
  };

  const onReset = () => {
    setPhase("arrival");
  };
  const dailyShelfItems = pickInventory("tea-cup-warmth", "linen-sheet-edge", "folded-paper-note");

  return (
    <main className="room-section-y-standard relative mx-auto w-full max-w-4xl px-5 sm:px-10">
      <section className="taoist-ritual-shell living-surface-inset relative min-h-[min(72svh,52rem)] rounded-2xl border border-border-subtle/38 bg-surface p-7 shadow-none sm:p-9">
        <h1 className="max-w-2xl text-3xl leading-[1.32] text-foreground sm:text-4xl">Daily note</h1>
        <p className="mt-6 max-w-2xl text-base leading-9 text-text-secondary">A few steps—optional.</p>
        <RitualLivingSlice ritual="dailyGuidance" />

        <div className="mt-11 rounded-xl border taoist-quiet-field border-border-subtle/24 bg-surface px-5 py-5 sm:px-5 sm:py-6">
          <p className="text-sm leading-8 text-text-secondary">
            {phase === "arrival"
              ? "Start."
              : phase === "guidance"
                ? "One note for today."
                : phase === "action"
                  ? "One small action."
                  : phase === "pause"
                    ? "Optional pause."
                    : phase === "completion"
                      ? "Can stop here."
                      : "Come back later if useful."}
          </p>
        </div>

        <div className="mt-10 border-t border-border-subtle/30 pt-10">
          <p className="text-xs text-text-muted/82">Things nearby</p>
          <p className="mt-3 text-sm leading-8 text-text-secondary">{ritualObjectLayer.dailyGuidance.anchorLine}</p>
          <RitualShelf items={dailyShelfItems} />
          <p className="mt-4 text-sm leading-8 text-text-secondary">{gentleCommercePresence.dailyGuidance.line}</p>
          <div className="mt-2 space-y-1">
            {gentleCommercePresence.dailyGuidance.bringIntoLife.map((line, index) => (
              <p
                key={line}
                className={`text-xs leading-7 text-text-muted/90 ${index > 0 ? "hidden sm:block" : ""}`}
              >
                {line}
              </p>
            ))}
            <GentleOrderingFoot />
          </div>
        </div>
        <SeasonalPresence seasonalKey="dailyGuidance" moment="early-morning" />

        {phase === "guidance" || phase === "action" || phase === "pause" || phase === "completion" || phase === "return" ? (
          <div
            className="mt-9 rounded-lg border border-border-subtle/32 bg-surface px-4 py-4 text-sm leading-8 text-text-secondary"
            style={{ transitionDuration: `${stepTimingTokens.revealCadenceMs.firstLayer}ms` }}
          >
            {guidanceFocus}
          </div>
        ) : null}

        {phase === "action" || phase === "pause" || phase === "completion" || phase === "return" ? (
          <div
            className="mt-9 rounded-lg border border-border-subtle/30 bg-surface px-4 py-4 text-sm leading-8 text-text-secondary"
            style={{ transitionDuration: `${stepTimingTokens.revealCadenceMs.secondLayer}ms` }}
          >
            {gentleAction}
          </div>
        ) : null}

        {phase === "pause" || phase === "completion" || phase === "return" ? (
          <div
            className="mt-9 rounded-xl border border-border-subtle/36 bg-surface px-5 py-6"
            style={{ transitionDuration: `${stepTimingTokens.betweenStepPauseMs}ms` }}
          >
            <p className="text-sm leading-8 text-text-secondary">{pausePromptLine}</p>
          </div>
        ) : null}

        {phase === "pause" || phase === "completion" || phase === "return" ? (
          <FlowCorner corner="dailyGuidance" />
        ) : null}
        {phase === "return" ? <MyPathPresence ritual="dailyGuidance" /> : null}
        {phase === "return" ? (
          <QuietHumanPresence presenceKey="dailyGuidance" />
        ) : null}
        {phase === "return" ? (
          <div className="hidden sm:block">
            <OffFramePresence frameKey="dailyGuidance" />
          </div>
        ) : null}

        {phase === "completion" || phase === "return" ? (
          <div className="mt-9 rounded-xl border taoist-quiet-field border-border-subtle/26 bg-surface px-5 py-6">
            <p className="text-sm leading-8 text-text-secondary">
              {dailyGuidanceContent.completionLines[0]}
            </p>
          </div>
        ) : null}

        {phase === "return" ? (
          <RitualContinuityFooter current="daily-guidance" onCloseForNow={onReset} />
        ) : (
          <button
            type="button"
            onClick={onAdvance}
            className="taoist-quiet-action mt-10 rounded-lg border border-border-subtle/26 px-5 py-2.5 text-sm text-text-secondary transition hover:text-foreground"
          >
            {buttonLabel}
          </button>
        )}

        {phase !== "return" ? (
          <p className="mt-10 text-xs leading-7 text-text-muted/85">{dailyGuidanceContent.completionLines[1]}</p>
        ) : null}
      </section>
    </main>
  );
}
